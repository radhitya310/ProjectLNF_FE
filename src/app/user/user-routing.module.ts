import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditProfileComponent } from './edit-profile/edit-profile.component';


const routes: Routes = [{
  path:'',
  children:[
    {
      path: '',
      redirectTo: '/user/edit-profile',
      pathMatch:'full'
    },
    {
      path: 'edit-profile',
      component: EditProfileComponent,
      data: {title: 'Edit Profie'}
    },
    {
      path: 'push-notification',
      component: EditProfileComponent,
      data: {title: 'Edit Profie'}
    },
    {
      path: 'my-post',
      component: EditProfileComponent,
      data: {title: 'Edit Profie'}
    }
  ]


}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }