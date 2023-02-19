import { Component, OnInit } from '@angular/core';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router, RouterEvent } from '@angular/router';

@Component({
  selector: 'app-main-navbar-layout',
  templateUrl: './main-navbar-layout.component.html',
  styleUrls: ['./main-navbar-layout.component.css']
})
export class MainNavbarLayoutComponent implements OnInit {

  public showOverlay = false;
  public previousUrl = '';
  public currentUrl = '';
  public isPopState = false;
  constructor(public router: Router) {

    this.router.events.subscribe((event: any) => {
      this.navigationInterceptor(event)
    })
  }

  ngOnInit(): void {
  }

  async navigationInterceptor(event: RouterEvent) {
    if (event instanceof NavigationStart) {
      this.showOverlay = true;
      if (event.navigationTrigger === 'popstate') {
        console.log("Masuk if");
      } else {
        this.isPopState = true;
      }
      return;
    }
    if (event instanceof NavigationEnd) {
      this.showOverlay = false;
      if (this.isPopState) {
        console.log("previous before = " + this.previousUrl);
        this.previousUrl = this.currentUrl;
        console.log("previous after = " + this.previousUrl);
        this.isPopState = false;
      }
      console.log("current before = " + this.currentUrl);
      this.currentUrl = this.router.url;
      console.log("current after = " + this.currentUrl);
      if (this.previousUrl != this.currentUrl)
        window.scrollTo(0, 0)
      console.log("update");
    }

    // Set loading state to false in both of the below events to hide the spinner in case a request fails
    if (event instanceof NavigationCancel) {
      this.showOverlay = false;
    }
    if (event instanceof NavigationError) {
      this.showOverlay = false;
    }
    
  }
}
