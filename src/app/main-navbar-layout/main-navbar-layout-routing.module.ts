import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatComponent } from '../chat/chat.component';
import { PageNotFoundComponent } from '../error-page/page-not-found/page-not-found.component';
import { HomeComponent } from '../home/home.component';
import { PostItemComponent } from '../post-item/post-item.component';
import { PostComponent } from '../post/post.component';
import { ProfileComponent } from '../profile/profile.component';
import { SearchComponent } from '../search/search.component';
import { UserComponent } from '../user/user.component';

const routes: Routes = [
  {
    path: 'user',
    component: UserComponent,
    loadChildren: () => import('src/app/user/user.module').then(m => m.UserModule)
  }, //user
  {
    path: '',
    component: HomeComponent,
    title: 'Ketemu | Belum nemu tag line'
  },
  {
    path: 'post-item',
    component: PostItemComponent,
    title: 'Post'
  },
  {
    path: 'p',
    children: [
      {
        path: '**',
        component: ProfileComponent
      }
    ]
  },
  {
    path: 'chat',
    component: ChatComponent,
    title: 'chat'
  },
  {
    path: 'lost',
    children: [
      {
        path: '**',
        component: PostComponent
      }
    ]
  },
  {
    path: 'found',
    children: [
      {
        path: '**',
        component: PostComponent
      }
    ]
  },
  {
    path: 'search',
    children: [
      {
        path: '**',
        component: SearchComponent
      }
    ]
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainNavbarLayoutRoutingModule { }