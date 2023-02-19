import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from '../services/auth.service';
import { EnviUrl } from '../constant/EnviURL';
import { ReqAuthUserModel, ResAuthUserModel } from '../model/auth-user.model';
import * as Forge from 'node-forge';
import { UserDataModel } from '../model/user-data.model';
import { SocialAuthService, SocialUser } from "@abacritt/angularx-social-login";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  isLoggedIn: boolean = false;
  userName: string | undefined;
  password: string | any;
  publicKey: string | any;
  resAuthUser: ResAuthUserModel = new ResAuthUserModel();
  userData: UserDataModel = new UserDataModel();
  public showOverlay = false;
  loginForm = this.fb.group({
    username: [''],
    password: [''],
  });
  user: SocialUser | any;
  loggedIn: boolean = false;
  sessionId: string | any;

  constructor(
    private router: Router,
    private authService: AuthService,
    private cookieService: CookieService,
    private fb: FormBuilder,
    private http: HttpClient,
    private EnviUrl: EnviUrl,
    private socialAuthService: SocialAuthService) { }

  ngOnInit(){
    this.sessionId = AuthService.GetCookie(this.cookieService, "sessionid");
    
    if (this.sessionId != null && this.sessionId != "") {
      let localSession = AuthService.GetLocalStorage("sessionid");
      if (localSession != this.sessionId)
        this.logout();
      this.router.navigate(['']);
    }

    this.socialAuthService.authState.subscribe((user) => {
      let reqAuthUser: ReqAuthUserModel = new ReqAuthUserModel();
      this.user = user;
      this.loggedIn = (user != null);
      reqAuthUser.UserCredential = user.email;
      reqAuthUser.AccessToken = user.idToken;
      reqAuthUser.LoginType = "gauth";
      console.log(user.idToken);
      this.http.post(this.EnviUrl.AuthUser, { reqAuthUser }).subscribe(
        (response: any) => {
          this.resAuthUser = response;
          this.userData.MUserId = this.resAuthUser.MUserId;
          this.userData.FullName = this.resAuthUser.FullName;
          this.userData.Username = this.resAuthUser.Username;
          this.userData.UrlProfilePicture = this.resAuthUser.UrlProfilePicture;
          this.userData.Bio = this.resAuthUser.Bio;
          AuthService.SetLocalStorage("sessionid", this.resAuthUser.SessionId);
          AuthService.SetLocalStorage("user", JSON.stringify(this.userData));
          AuthService.SetCookie(this.cookieService, "sessionid", this.resAuthUser.SessionId);
          AuthService.SetCookie(this.cookieService, "user", JSON.stringify(this.userData));
          this.router.navigate(['']);
        });
    });
  }

  async logout() {
    const prev = this.router.routeReuseStrategy.shouldReuseRoute;
    this.cookieService.delete('sessionid', '/', 'localhost', false, 'Lax');
    this.cookieService.delete('user', '/', 'localhost', false, 'Lax');
    localStorage.removeItem('sessionid');
    localStorage.removeItem('user');
    document.location.href = '';
    this.socialAuthService.signOut();    
    setTimeout(() => {
      this.router.routeReuseStrategy.shouldReuseRoute = prev;
    }, 1);
  }

  async onClickSubmit() {
    this.showOverlay = true;
    this.userName = this.loginForm.value.username?.toString();
    this.password = this.loginForm.value.password?.toString();

    let reqAuthUser: ReqAuthUserModel = new ReqAuthUserModel();

    this.publicKey = this.authService.getPublicKey();
    reqAuthUser.UserCredential = this.userName;
    const rsa = Forge.pki.publicKeyFromPem(this.publicKey);
    let encrypted = rsa.encrypt(this.password.toString())
    var b64Encoded = Forge.util.encode64(encrypted);
    reqAuthUser.Password = b64Encoded;
    reqAuthUser.LoginType = "password";
    this.http.post(this.EnviUrl.AuthUser, { reqAuthUser }).subscribe(
      (response: any) => {
        this.resAuthUser = response;
        this.userData.MUserId = this.resAuthUser.MUserId;
        this.userData.FullName = this.resAuthUser.FullName;
        this.userData.Username = this.resAuthUser.Username;
        this.userData.UrlProfilePicture = this.resAuthUser.UrlProfilePicture;
        this.userData.Bio = this.resAuthUser.Bio;
        AuthService.SetLocalStorage("sessionid",this.resAuthUser.SessionId);
        AuthService.SetLocalStorage("user",JSON.stringify(this.userData));
        AuthService.SetCookie(this.cookieService, "sessionid", this.resAuthUser.SessionId);
        AuthService.SetCookie(this.cookieService, "user", JSON.stringify(this.userData));
        this.router.navigate(['']);
      });
  }
}
