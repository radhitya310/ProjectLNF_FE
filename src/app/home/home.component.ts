import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EnviUrl } from '../constant/EnviURL';
import { VariableConstant } from '../constant/VariableConstant';
import { ResHomeBannerModel } from '../model/home-banner.model';
import { ReqRecommendedLostPostModel, ResRecommendedLostPostModel } from '../model/recommended-lost-post.model';
import { ResBindCategoryModel } from '../model/bind-category.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css','./home.component.switch.css']
})

export class HomeComponent implements OnInit {
  isChecked = false;
  resRecommendedLostPost: Array<ResRecommendedLostPostModel> = new Array<ResRecommendedLostPostModel>();
  resRecommendedFoundPost: Array<ResRecommendedLostPostModel> = new Array<ResRecommendedLostPostModel>();
  resHomeBanner: Array<ResHomeBannerModel> = new Array<ResHomeBannerModel>();
  resBindCategory: Array<ResBindCategoryModel> = new Array<ResBindCategoryModel>();
  public static ReturnObj = "ReturnObject";
  public showOverlay = true;
  public showBtnLostSpinner = false;
  public showBtnFoundSpinner = false;
  constructor(
    private http: HttpClient,
    private EnviUrl: EnviUrl, 
    private router: Router
    ) {     
  }
    
  async ngOnInit() {
    this.getLostPostRecommendation();
    this.getFoundPostRecommendation();
    this.loadHomeBanner();
    this.initCategory();
  }

  async getLostPostRecommendation(){
    let reqRecommendedLostPost: ReqRecommendedLostPostModel = new ReqRecommendedLostPostModel();
    reqRecommendedLostPost.TotalItemPerPage = 20;
    reqRecommendedLostPost.page = 1;
    this.http.post(this.EnviUrl.RecommendedLostPost, {}).subscribe(
      (response: any) => {
        this.resRecommendedLostPost = response;
        this.showOverlay = false;
      });
  }

  async getFoundPostRecommendation(){
    let reqRecommendedFoundPost: ReqRecommendedLostPostModel = new ReqRecommendedLostPostModel();
    reqRecommendedFoundPost.TotalItemPerPage = 20;
    reqRecommendedFoundPost.page = 1;
    this.http.post(this.EnviUrl.RecommendedLostPost, {}).subscribe(
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

  initCategory(){
    this.http.post(this.EnviUrl.BindCategory, {}).subscribe(
      (response: any) => {
        this.resBindCategory = response;      
      });
  }
}
