import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  constructor(
    private router: Router
  ) {}

  async ngOnInit() {

  }
  async gotoEditProfile(){
    this.router.navigate(['/user/edit-profile']);
  }
  async gotoPushNotification(){
    this.router.navigate(['/user/push-notification']);
  }
  async gotoMyPost(){
    this.router.navigate(['/user/my-post']);
  }
}
