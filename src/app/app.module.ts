import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { BaseLayoutComponent } from './base-layout/base-layout.component';
import { AppRoutingModule } from './app-routing.module';
import { MainNavbarLayoutComponent } from './main-navbar-layout/main-navbar-layout.component';
import { UserComponent } from './user/user.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { PostItemComponent } from './post-item/post-item.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { ChatComponent } from './chat/chat.component';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { EnviUrl } from './constant/EnviURL';
import { UrlConfigService } from './services/urlconfig.service';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { HttpConfigInterceptor } from './interceptor/hhtpconfig.interceptor';
import { ErrorDialogService } from './error-page/error-dialog/error-dialog.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Overlay } from '@angular/cdk/overlay';
import { PostComponent } from './post/post.component';
import { SearchComponent } from './search/search.component';
import { GoogleInitOptions, GoogleLoginProvider } from '@abacritt/angularx-social-login';
import { SocialLoginModule, SocialAuthServiceConfig } from '@abacritt/angularx-social-login';
import { RegisterComponent } from './register/register.component';
import { AutosizeModule } from 'ngx-autosize';

const enviConfig = (config: UrlConfigService) => {
  return () => {
    return config.loadConfig();
  }
}
const googleLoginOptions: GoogleInitOptions = {
  oneTapEnabled: false
};
@NgModule({
  declarations: [
    AppComponent,
    BaseLayoutComponent,
    MainNavbarLayoutComponent,
    UserComponent,
    NavBarComponent,
    PostItemComponent,
    LoginComponent,
    ProfileComponent,
    ChatComponent,
    HomeComponent,
    PostComponent,
    SearchComponent,
    RegisterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    CommonModule,
    MatDialogModule,
    SocialLoginModule,
    AutosizeModule
  ],
  providers: [
    EnviUrl,
    UrlConfigService,
    {
      provide: APP_INITIALIZER, useFactory: enviConfig, multi: true, deps: [UrlConfigService]
    },
    { provide: HTTP_INTERCEPTORS, useClass: HttpConfigInterceptor, multi: true },
    ErrorDialogService,
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '924376956472-b7vv4r2rsek5li52ihavvo4jrsairbmh.apps.googleusercontent.com', googleLoginOptions
            )
          }
        ],
        onError: (err) => {
          console.error(err);
        }
      } as SocialAuthServiceConfig,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
