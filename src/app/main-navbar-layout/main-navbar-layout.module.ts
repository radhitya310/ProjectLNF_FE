import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainNavbarLayoutRoutingModule } from './main-navbar-layout-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [],
  imports: [
    MainNavbarLayoutRoutingModule,
    ReactiveFormsModule,
    CommonModule,
    FormsModule
  ]
})
export class MainNavbarLayoutModule { }
