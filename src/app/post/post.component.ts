import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { EnviUrl } from '../constant/EnviURL';
import { ReqCreateCommentModel, ResCreateCommentModel } from '../model/create-comment.model';
import { ReqLikesModel, ResLikesModel } from '../model/likes.model';
import { ReqPostCommentModel, ResPostCommentModel } from '../model/post-comment.model';
import { ReqPostGetLayoutModel, ResPostGetLayoutModel } from '../model/post-get-layout.model';
import { ReqPostReplyCommentModel, ResPostReplyCommentModel } from '../model/post-reply-comment.model';
import { UserDataModel } from '../model/user-data.model';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  resPostGetLayout: Array<ResPostGetLayoutModel> = new Array<ResPostGetLayoutModel>();
  resPostCommentLayout: Array<ResPostCommentModel> = new Array<ResPostCommentModel>();
  resPostReplyCommentLayout: Array<ResPostReplyCommentModel> = new Array<ResPostReplyCommentModel>();
  resLikes: ResLikesModel = new ResLikesModel();
  resCreateComment: ResCreateCommentModel = new ResCreateCommentModel();
  public showNotFound = false;
  public isLogin = false;
  public isCreateComment = false;
  public currentPage = 0;
  public isPostLiked = false;
  sessionId: string | any;
  userData: UserDataModel = new UserDataModel();
  text: string = '';

  constructor(
    private http: HttpClient,
    private router: Router,
    private EnviUrl: EnviUrl,
    private titleService: Title,
    private cookieService: CookieService
  ) { }

  async ngOnInit() {
    this.getPostLayout();
    this.sessionId = AuthService.GetCookie(this.cookieService, "sessionid");
    var decryptedCookie = AuthService.GetCookie(this.cookieService, "user");
    if (decryptedCookie != '' && decryptedCookie != null)
      this.userData = JSON.parse(decryptedCookie);
    if (this.sessionId != null && this.sessionId != "") {
      let localSession = AuthService.GetLocalStorage("sessionid");
      if (localSession == this.sessionId)
        this.isLogin = true;
    }
  }

  async likePost(doLike: string = "") {
    let url = this.router.url;
    let reqLikes: ReqLikesModel = new ReqLikesModel();
    if (this.userData != null)
      reqLikes.MUserId = this.userData.MUserId;
    else
      reqLikes.MUserId = 0;
    reqLikes.SessionId = this.sessionId;
    reqLikes.TPostId = this.resPostGetLayout[0].TPostId;
    reqLikes.DoLike = doLike;

    this.http.post(this.EnviUrl.LikePost, { reqLikes }).subscribe(
      (response: any) => {
        this.resLikes = response;
        if (doLike == "1")
          this.resPostGetLayout[0].Likes = this.resLikes.TotalLikes;
        this.isPostLiked = this.resLikes.IsLiked == "1" ? true : false;
      });
  }

  async getPostLayout() {
    let url = this.router.url;
    let reqPostGetLayout: ReqPostGetLayoutModel = new ReqPostGetLayoutModel();
    reqPostGetLayout.PostUrlSlug = url;

    this.http.post(this.EnviUrl.PostGetLayout, { reqPostGetLayout }).subscribe(
      (response: any) => {
        this.resPostGetLayout = response;
        this.titleService.setTitle(this.resPostGetLayout[0].PostTitle + ' | Ketemu');
        this.getComment();
        this.likePost("0");
      });
  }

  async getComment() {
    this.currentPage = this.currentPage + 1;
    let reqPostComment: ReqPostCommentModel = new ReqPostCommentModel();
    reqPostComment.CurrentPage = this.currentPage;
    reqPostComment.PageSize = 20;
    reqPostComment.TPostId = this.resPostGetLayout[0].TPostId;
    if (this.userData != null) {
      reqPostComment.MUserId = this.userData.MUserId;
    }

    this.http.post(this.EnviUrl.PostComment, { reqPostComment }).subscribe(
      (response: any) => {
        this.resPostCommentLayout = response;
      });
  }

  async getReplyComment(index: number = 0, TCommentId: number = 0) {
    if (this.resPostCommentLayout[index].PostReplyComment == null && this.resPostCommentLayout[index].isSeeReplyComment == false) {
      let reqPostReplyComment: ReqPostReplyCommentModel = new ReqPostReplyCommentModel();
      reqPostReplyComment.CurrentPage = reqPostReplyComment.CurrentPage + 1;
      reqPostReplyComment.PageSize = 20;
      reqPostReplyComment.TParentCommentId = TCommentId;

      this.http.post(this.EnviUrl.PostReplyComment, { reqPostReplyComment }).subscribe(
        (response: any) => {
          this.resPostReplyCommentLayout = response;
          this.resPostCommentLayout[index].PostReplyComment = this.resPostReplyCommentLayout;
          this.resPostCommentLayout[index].isSeeReplyComment = true;
        });
    } else if (this.resPostCommentLayout[index].PostReplyComment != null && this.resPostCommentLayout[index].isSeeReplyComment == false) {
      this.resPostCommentLayout[index].isSeeReplyComment = true;
    } else {
      this.resPostCommentLayout[index].isSeeReplyComment = false;
    }
  }

  async createComment(isParent: boolean, index: number = 0, subIndex: number = 0, isSubReply: boolean = false) {

    let reqCreateComment: ReqCreateCommentModel = new ReqCreateCommentModel();
    if (isParent == true) {
      this.isCreateComment = true;
      reqCreateComment.CommentText = this.text;
      reqCreateComment.ParentCommentId = 0;
    }else if(isSubReply){
      reqCreateComment.CommentText = this.resPostCommentLayout[index].PostReplyComment[subIndex].CommentReply;
      reqCreateComment.ParentCommentId = this.resPostCommentLayout[index].TCommentId;
      this.resPostCommentLayout[index].PostReplyComment[subIndex].isCreateComment = true;
      this.resPostCommentLayout[index].PostReplyComment[subIndex].isReply = false;
    }
    else {
      reqCreateComment.CommentText = this.resPostCommentLayout[index].CommentReply;
      reqCreateComment.ParentCommentId = this.resPostCommentLayout[index].TCommentId;
      this.resPostCommentLayout[index].isCreateComment = true;
      this.resPostCommentLayout[index].isReply = false;
    }
    reqCreateComment.MUserId = this.userData.MUserId;
    reqCreateComment.TPostId = this.resPostGetLayout[0].TPostId;
    reqCreateComment.SessionId = '';

    this.http.post(this.EnviUrl.CreateComment, { reqCreateComment }).subscribe(
      (response: any) => {
        setTimeout(() => {
          this.resCreateComment = response;
          if (isParent == true) {
            this.isCreateComment = false;
            var newCmt = new ResPostCommentModel();
            newCmt.Comment = this.text;
            newCmt.CommentTime = this.resCreateComment.CommentTime;
            newCmt.TCommentId = this.resCreateComment.TCommentId;
            newCmt.FullName = this.userData.FullName;
            newCmt.TotalLikes = 0;
            newCmt.CommentTimestamp = this.resCreateComment.CommentTimestamp;
            newCmt.UrlProfilePicture = this.userData.UrlProfilePicture;
            newCmt.Username = this.userData.Username;
            this.resPostCommentLayout.unshift(newCmt);
            this.text = '';
          }else{
            var newReplyCmt = new ResPostReplyCommentModel();
            this.resPostCommentLayout[index].isCreateComment = false;            
            newReplyCmt.CommentTime = this.resCreateComment.CommentTime;
            newReplyCmt.TCommentId = this.resCreateComment.TCommentId;
            newReplyCmt.FullName = this.userData.FullName;
            newReplyCmt.TotalLikes = 0;
            newReplyCmt.CommentTimestamp = this.resCreateComment.CommentTimestamp;
            newReplyCmt.UrlProfilePicture = this.userData.UrlProfilePicture;
            newReplyCmt.Username = this.userData.Username;
            this.resPostCommentLayout[index].TotalReply += 1;
            
            if(this.resPostCommentLayout[index].PostReplyComment == null){
              newReplyCmt.Comment = this.resPostCommentLayout[index].CommentReply;
              var listNewReplyCmt = new Array<ResPostReplyCommentModel>();
              listNewReplyCmt.push(newReplyCmt);
              this.resPostCommentLayout[index].PostReplyComment = listNewReplyCmt;
              this.resPostCommentLayout[index].CommentReply = '';
            }else if(isSubReply){
              newReplyCmt.Comment = this.resPostCommentLayout[index].PostReplyComment[subIndex].CommentReply;
              this.resPostCommentLayout[index].PostReplyComment[subIndex].isCreateComment = false;
              this.resPostCommentLayout[index].PostReplyComment.push(newReplyCmt);
              this.resPostCommentLayout[index].PostReplyComment[subIndex].CommentReply = '';
            }else{
              newReplyCmt.Comment = this.resPostCommentLayout[index].CommentReply;
              this.resPostCommentLayout[index].PostReplyComment.push(newReplyCmt);
            }
            this.resPostCommentLayout[index].isSeeReplyComment = true;
            reqCreateComment.CommentText = '';
          }
        }, 2000);

      });
  }

  isLiked() {
    if (!this.isPostLiked)
      this.isPostLiked = true;
    else
      this.isPostLiked = false;
  }
}