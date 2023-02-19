import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { EnviUrl } from '../constant/EnviURL';
import { ReqPostCommentModel, ResPostCommentModel } from '../model/post-comment.model';
import { ReqPostGetLayoutModel, ResPostGetLayoutModel } from '../model/post-get-layout.model';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  resPostGetLayout: Array<ResPostGetLayoutModel> = new Array<ResPostGetLayoutModel>();
  resPostCommentLayout: Array<ResPostCommentModel> = new Array<ResPostCommentModel>();
  public showNotFound = false;
  public isLogin = false;
  public currentPage = 0;
  public isPostSaved = false;
  sessionId: string | any;

  constructor(
    private http: HttpClient,
    private router: Router,
    private EnviUrl: EnviUrl, 
    private titleService:Title,
    private cookieService: CookieService
  ) { }

  async ngOnInit() {
    this.getPostLayout();
    this.sessionId = AuthService.GetCookie(this.cookieService, "sessionid");

    if (this.sessionId != null && this.sessionId != "") {
      let localSession = AuthService.GetLocalStorage("sessionid");
      if (localSession == this.sessionId)
        this.isLogin = true;
    }
  }
  
  async getPostLayout(){
    let url = this.router.url;
    let reqPostGetLayout: ReqPostGetLayoutModel = new ReqPostGetLayoutModel();
    reqPostGetLayout.PostUrlSlug = url;

    this.http.post(this.EnviUrl.PostGetLayout, {reqPostGetLayout}).subscribe(
      (response: any) => {
        this.resPostGetLayout = response;
        this.titleService.setTitle(this.resPostGetLayout[0].PostTitle + ' | Ketemu');
        this.getComment();
      });
  }

  async getComment(){
    this.currentPage = this.currentPage + 1;
    let url = this.router.url;
    let reqPostComment: ReqPostCommentModel = new ReqPostCommentModel();
    reqPostComment.CurrentPage = this.currentPage;
    reqPostComment.PageSize = 20;
    reqPostComment.TPostId = this.resPostGetLayout[0].TPostId;    

    this.http.post(this.EnviUrl.PostComment, {reqPostComment}).subscribe(
      (response: any) => {
        this.resPostCommentLayout = response;
      });
  }
  isSaved(){
    if(!this.isPostSaved)
      this.isPostSaved = true;
    else
      this.isPostSaved = false;
  }
}
