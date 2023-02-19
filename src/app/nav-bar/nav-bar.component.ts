import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NavigationCancel, NavigationEnd, NavigationError, Router, RouterEvent } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ReqSearchHistoryModel, ResSearchHistoryModel } from '../model/search-history.model';
import { AuthService } from '../services/auth.service';
import { EnviUrl } from '../constant/EnviURL';
import { UserDataModel } from '../model/user-data.model';
import { SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  @ViewChild('searchBar') searchBar: any;
  cookieValue: string | any;
  showSuggestion: boolean = false;
  resSearchHistory: Array<ResSearchHistoryModel> = new Array<ResSearchHistoryModel>();
  userDataModel: UserDataModel = new UserDataModel();
  sessionId: string | any;
  btnPostRef: string | any;
  user: SocialUser | any;
  loggedIn: boolean = false;

  constructor(
    private router: Router,
    private http: HttpClient,
    private EnviUrl: EnviUrl,
    private cookieService: CookieService,
    private socialAuthService: SocialAuthService) {
    this.router.events.subscribe((event: any) => {
      this.navigationInterceptor(event)
    })
  }

  async navigationInterceptor(event: RouterEvent) {
    let url = this.router.url;
    this.showSuggestion = false;
    if (event instanceof NavigationEnd && !url.includes("search")) {
      this.searchBar.nativeElement.value = "";
    }
    
    if (event instanceof NavigationEnd) {
      this.sessionId = AuthService.GetCookie(this.cookieService, "sessionid");
    }

    if (event instanceof NavigationCancel && !url.includes("search")) {
      this.searchBar.nativeElement.value = "";
    }
    if (event instanceof NavigationError && !url.includes("search")) {
      this.searchBar.nativeElement.value = "";
    }
  }

  async ngOnInit() {    
    this.sessionId = AuthService.GetCookie(this.cookieService, "sessionid");
    
    if (this.sessionId != null && this.sessionId != "") {
      let localSession = AuthService.GetLocalStorage("sessionid");
      if (localSession != this.sessionId)
        this.logout();
      // this.http.post(this.EnviUrl.CheckSession, { reqSearchHistoryModel }).subscribe(
      //   (response: any) => {
      //     this.resSearchHistory = response;
      //   });
    }
    
    this.userDataModel = JSON.parse(AuthService.GetLocalStorage("user"));

    if (this.sessionId == null || this.sessionId == "") {
      this.cookieValue = AuthService.GetCookie(this.cookieService, "_ush_non");
      this.btnPostRef = "/login";
    } else {
      this.cookieValue = AuthService.GetCookie(this.cookieService, "_ush");
    }

    if (this.cookieValue != null || this.cookieValue != "") {
      let reqSearchHistoryModel: ReqSearchHistoryModel = new ReqSearchHistoryModel();
      reqSearchHistoryModel.Cookie = this.cookieValue;

      this.http.post(this.EnviUrl.SearchHistory, { reqSearchHistoryModel }).subscribe(
        (response: any) => {
          this.resSearchHistory = response;
        });
    } else {
      this.showSuggestion = false;
    }
  }

  async gotoHome() {
    this.router.navigate(['/']);
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

  initSearchBar(searchValue: any): void {
    if (this.sessionId == null) {
      this.cookieValue = AuthService.GetCookie(this.cookieService, "_ush_non");
    } else {
      this.cookieValue = AuthService.GetCookie(this.cookieService, "_ush");
    }

    if (this.cookieValue == null || this.cookieValue == "") {
      this.showSuggestion = false;
    } else {
      this.showSuggestion = true;
    }
  }

  async search(val: string) {
    if (this.sessionId == null) {
      this.cookieValue = AuthService.GetCookie(this.cookieService, "_ush_non");
      // AuthService.SetCookie(this.cookieService, "_ush_non", JSON.stringify(this.cookieValue));
    } else {
      this.cookieValue = AuthService.GetCookie(this.cookieService, "_ush");
      // AuthService.SetCookie(this.cookieService, "_ush", JSON.stringify("Markonah"));
    }

    let reqSearchHistoryModel: ReqSearchHistoryModel = new ReqSearchHistoryModel();
    reqSearchHistoryModel.Cookie = this.cookieValue;
    reqSearchHistoryModel.Query = val;
    this.http.post(this.EnviUrl.SearchHistory, { reqSearchHistoryModel }).subscribe(
      (response: any) => {
        this.resSearchHistory = response;
        if (this.sessionId == null) {
          AuthService.SetCookie(this.cookieService, "_ush_non", this.resSearchHistory[0].NewCookie);
        } else {
          AuthService.SetCookie(this.cookieService, "_ush", this.resSearchHistory[0].NewCookie);
        }
      });

    this.router.navigate(
      ['/search'],
      { queryParams: { q: val, type: "Lost" } }
    );
  }

  hideSearchBar(): void {
    this.showSuggestion = false;
  }

  async historyClicked(q: any) {
    this.router.navigate(
      ['/search'],
      { queryParams: { q: q, type: "Lost" } }
    );
    this.searchBar.nativeElement.value = q;
  }

  deleteRecentSearch(q: any): void {
    if (this.sessionId == null) {
      this.cookieValue = AuthService.GetCookie(this.cookieService, "_ush_non");
      // AuthService.SetCookie(this.cookieService, "_ush_non", JSON.stringify(this.cookieValue));
    } else {
      this.cookieValue = AuthService.GetCookie(this.cookieService, "_ush");
      // AuthService.SetCookie(this.cookieService, "_ush", JSON.stringify("Markonah"));
    }
    let reqSearchHistoryModel: ReqSearchHistoryModel = new ReqSearchHistoryModel();
    reqSearchHistoryModel.Cookie = this.cookieValue;
    reqSearchHistoryModel.Query = q;
    this.http.post(this.EnviUrl.DeleteRecentSearch, { reqSearchHistoryModel }).subscribe(
      (response: any) => {
        this.resSearchHistory = response;
        if (this.resSearchHistory.length > 0) {
          if (this.sessionId == null) {
            AuthService.SetCookie(this.cookieService, "_ush_non", this.resSearchHistory[0].NewCookie);
          } else {
            AuthService.SetCookie(this.cookieService, "_ush", this.resSearchHistory[0].NewCookie);
          }
        } else {
          if (this.sessionId == null) {
            AuthService.SetCookie(this.cookieService, "_ush_non", "");
          } else {
            AuthService.SetCookie(this.cookieService, "_ush", "");
          }
        }
      });
  }
}
