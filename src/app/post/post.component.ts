import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { EnviUrl } from '../constant/EnviURL';
import { ReqLikesModel, ResLikesModel } from '../model/likes.model';
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
  resLikes: ResLikesModel = new ResLikesModel();
  public showNotFound = false;
  public isLogin = false;
  public currentPage = 0;
  public isPostLiked = false;
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
  
  async likePost(doLike: string = ""){
    let url = this.router.url;
    let reqLikes: ReqLikesModel = new ReqLikesModel();
    reqLikes.MUserId = this.resPostGetLayout[0].MUserId;
    reqLikes.SessionId = "";
    reqLikes.TPostId = this.resPostGetLayout[0].TPostId;
    reqLikes.DoLike = doLike;

    this.http.post(this.EnviUrl.LikePost, {reqLikes}).subscribe(
      (response: any) => {
        this.resLikes = response;
        if(doLike == "1")
          this.resPostGetLayout[0].Likes = this.resLikes.TotalLikes;
        this.isPostLiked = this.resLikes.IsLiked == "1" ? true : false;
      });
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
        this.likePost("0");
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

  isLiked(){
    if(!this.isPostLiked)
      this.isPostLiked = true;
    else
      this.isPostLiked = false;
  }
}
