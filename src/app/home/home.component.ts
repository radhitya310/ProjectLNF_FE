import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { EnviUrl } from '../constant/EnviURL';
import { VariableConstant } from '../constant/VariableConstant';
import { ResHomeBannerModel } from '../model/home-banner.model';
import { ReqRecommendedLostPostModel, ResRecommendedLostPostModel } from '../model/recommended-lost-post.model';
import { ReqLikesModel, ResLikesModel } from '../model/likes.model';
import { UserDataModel } from '../model/user-data.model';
import { AuthService } from '../services/auth.service';
import { ReqRecommendedFoundPostModel, ResRecommendedFoundPostModel } from '../model/recommended-found-post.model';
import { ResBindCategoryModel } from '../model/bind-category.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css','./home.component.switch.css']
})

export class HomeComponent implements OnInit {
  sub: Subscription | undefined;
  isChecked = false;
  category: number = 0;
  postId: number = 0;
  resRecommendedLostPost: Array<ResRecommendedLostPostModel> = new Array<ResRecommendedLostPostModel>();
  resRecommendedFoundPost: Array<ResRecommendedFoundPostModel> = new Array<ResRecommendedFoundPostModel>();
  resHomeBanner: Array<ResHomeBannerModel> = new Array<ResHomeBannerModel>();
  resBindCategory: Array<ResBindCategoryModel> = new Array<ResBindCategoryModel>();
  resLikes: ResLikesModel = new ResLikesModel();
  public static ReturnObj = "ReturnObject";
  public isPostLiked = false;
  sessionId: string | any;
  public showOverlay = true;
  public showBtnLostSpinner = false;
  public showBtnFoundSpinner = false;
  userData: UserDataModel = new UserDataModel();
  
  constructor(
    private Activatedroute: ActivatedRoute,
    private http: HttpClient,
    private EnviUrl: EnviUrl, 
    private router: Router,
    private cookieService: CookieService
    ) {     
  }
  
  Object = Object;  
  ngOnInit() {
    var decryptedCookie = AuthService.GetCookie(this.cookieService, "user");
    if(decryptedCookie != '' && decryptedCookie != null)
      this.userData = JSON.parse(decryptedCookie);
    this.sub = this.Activatedroute.queryParamMap
      .subscribe(params => {
        this.showOverlay = true;
        this.category = Number(params.get('cat'));
        this.rbCatChange(this.category,true);
        this.loadHomeBanner();
        this.initCategory();
        this.getLostPostRecommendation();
        this.getFoundPostRecommendation();
        this.showOverlay = false;
      });
  }

  async getLostPostRecommendation(){
    let reqRecommendedLostPost: ReqRecommendedLostPostModel = new ReqRecommendedLostPostModel();
    reqRecommendedLostPost.TotalItemPerPage = 20;
    reqRecommendedLostPost.page = 1;
    reqRecommendedLostPost.Category = this.category;
    this.http.post(this.EnviUrl.RecommendedLostPost, {reqRecommendedLostPost}).subscribe(
      (response: any) => {
        this.resRecommendedLostPost = response;
        this.showOverlay = false;
      });
  }

  async getFoundPostRecommendation(){
    let reqRecommendedFoundPost: ReqRecommendedFoundPostModel = new ReqRecommendedFoundPostModel();
    reqRecommendedFoundPost.TotalItemPerPage = 20;
    reqRecommendedFoundPost.page = 1;
    reqRecommendedFoundPost.Category = this.category;
    this.http.post(this.EnviUrl.RecommendedFoundPost, {reqRecommendedFoundPost}).subscribe(
      (response: any) => {
        this.resRecommendedFoundPost = response;
        this.showOverlay = false;
      });
  }

  async loadLostNextPage() {
    this.showBtnLostSpinner = true;
  }

  async loadFoundNextPage() {
    this.showBtnFoundSpinner = true;
  }

  async loadPost(url : string, id : number){
    let navigateTo;    
    navigateTo = "lost/" + url + "_idx_" + id;
    this.router.navigate([navigateTo]);
  }

  async loadHomeBanner(){
    this.http.post(this.EnviUrl.HomeBanner, {}).subscribe(
      (response: any) => {
        this.resHomeBanner = response;        
      });
  }  
  
  async rbCatChange(ix: any, isInit: any = null) {
    if(isInit == null)
    this.showOverlay = true;
    await new Promise(f => setTimeout(f, 1000));
    
    this.resBindCategory.forEach(item => {
      if(item.MCategoryId == ix){
        item.isChecked = true;
        this.category = item.MCategoryId;
      }        
      else
        item.isChecked = false;
    })
    
    if (isInit == null) {
      this.router.navigate(
        ['/'],
        { queryParams: { cat: this.category } }
      );
    }
  }

  async likePost(doLike: string = "", TPostId : number) {
    let url = this.router.url;
    let reqLikes: ReqLikesModel = new ReqLikesModel();
    this.postId = TPostId;
    if (this.userData != null)
      reqLikes.MUserId = this.userData.MUserId;
    else
      reqLikes.MUserId = 0;
    reqLikes.SessionId = this.sessionId;
    reqLikes.TPostId = this.postId;
    reqLikes.DoLike = doLike;

    this.http.post(this.EnviUrl.LikePost, { reqLikes }).subscribe(
      (response: any) => {
        this.getLostPostRecommendation();
        this.getFoundPostRecommendation();
      });
  }

  initCategory(){
    this.http.post(this.EnviUrl.BindCategory, {}).subscribe(
      (response: any) => {
        this.resBindCategory = response;      
      });
  }
  
  isLiked() {
    if (!this.isPostLiked)
      this.isPostLiked = true;
    else
      this.isPostLiked = false;
  }
}
