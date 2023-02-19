import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EnviUrl } from '../constant/EnviURL';
import { ReqProfileLayoutModel, ResProfileLayoutModel } from '../model/profile-layout.model';
import { ReqUserPostsModel, ResUserPostsModel } from '../model/user-posts.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  resProfileLayout: ResProfileLayoutModel = new ResProfileLayoutModel();
  resUserPosts: Array<ResUserPostsModel> = new Array<ResUserPostsModel>();
  constructor(
    private http: HttpClient,
    private router: Router,
    private EnviUrl: EnviUrl,
  ) { }

  async ngOnInit(): Promise<void> {
    this.getPostLayout();    
  }

  getPostLayout(){
    let url = this.router.url;
    let reqProfileLayout: ReqProfileLayoutModel = new ReqProfileLayoutModel();
    
    reqProfileLayout.Username = url.split('/')[2];

    this.http.post(this.EnviUrl.ProfileLayout, {reqProfileLayout}).subscribe(
      (response: any) => {
        this.resProfileLayout = response;
        
        this.getUserPosts();
      });
  }
  getUserPosts() {
    let reqUserPosts: ReqUserPostsModel = new ReqUserPostsModel();
    reqUserPosts.MUserId = this.resProfileLayout.MUserId;

    this.http.post(this.EnviUrl.UserPosts, { reqUserPosts }).subscribe(
      (response: any) => {
        this.resUserPosts = response;
      });
  }
}