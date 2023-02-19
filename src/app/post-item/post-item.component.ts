import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ResBindCategoryModel } from '../model/bind-category.model';
import { EnviUrl } from '../constant/EnviURL';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { UserDataModel } from '../model/user-data.model';
import { ReqPostItemModel } from '../model/post-item.model';

@Component({
  selector: 'app-post-item',
  templateUrl: './post-item.component.html',
  styleUrls: ['./post-item.component.css']
})
export class PostItemComponent implements OnInit {
  imgThumbnailBase64: string | any;
  public isLostFoundClicked = false;
  showSpinner = false;
  resBindCategory: Array<ResBindCategoryModel> = new Array<ResBindCategoryModel>();
  selectedCategoryValue: number | any;
  form: FormGroup;
  userDataModel: UserDataModel = new UserDataModel();
  listImageBase64: Array<string> = new Array<string>(5);
  listImage: Array<File> = new Array<File>(5);  
  imageThumbnail: File | any;
  imgUpload: File | any;
  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private router: Router,
    private EnviUrl: EnviUrl) {
      this.form = this.fb.group({
      PostTitle: [''],
      PostDescription: [''],
      MUserId: 0,
      MLostOrFoundId: 0,
      PostImage: this.fb.array([
        ['']
      ]),
      MCategoryId: 0,
      UserName: ['']
    }) 
  }

  omit_special_char(event: any) {
    var k;
    k = event.charCode;
    return (k != 43);
  }

  async ngOnInit() {
    this.isLostFoundClicked = false;
    this.initCategory();
  }

  initForm(type: any){
    this.isLostFoundClicked = true;
    if(type == "Lost"){

    }else if(type == "Found"){

    }
  }
  revertModal(){
    this.isLostFoundClicked = false;
  }

  initCategory(){
    this.http.post(this.EnviUrl.BindCategory, {}).subscribe(
      (response: any) => {
        this.resBindCategory = response;      
      });
  }

  onUploadImageThumbnail(e: any){
    if(e.target.files){
      this.imageThumbnail = e.target.files;
      console.log(this.imageThumbnail.item(0));
      var reader = new FileReader();      
      reader.readAsDataURL(e.target.files[0]);
      reader.onload=(event:any)=>{
        this.imgThumbnailBase64 = event.target.result;        
      }      
    }
  }

  onUploadImage(e: any){
    if(e.target.files){
      for (var i = 0, len = this.listImage.length; i < len; i++) {
        if (!this.listImage[i]) {
          this.listImage[i] = e.target.files;          
          break;
        }
      }      
      var reader = new FileReader();      
      reader.readAsDataURL(e.target.files[0]);
      reader.onload=(event:any)=>{
        for (var i = 0, len = this.listImageBase64.length; i < len; i++) {
          if (!this.listImageBase64[i]) {
            this.listImageBase64[i] = event.target.result;
            break;
          }
        }
      }      
    }
  }

  cancelImage(index: any) {
    let flag = false;
    for (var i = 0, len = this.listImageBase64.length; i < len; i++) {
      if ((i == index && i != this.listImageBase64.length) || (flag && i != this.listImageBase64.length - 1)) {
        this.listImageBase64[i] = this.listImageBase64[i + 1];
        this.listImageBase64[i + 1] = '';
        flag = true;
      }else if(i == index && i == this.listImageBase64.length - 1){
        this.listImageBase64[i] = '';
      }
    }
    flag = false;
    for (var i = 0, len = this.listImage.length; i < len; i++) {
      let file: File | any;
      if ((i == index && i != this.listImage.length) || (flag && i != this.listImageBase64.length - 1)) {
        this.listImage[i] = this.listImage[i + 1];
        this.listImage[i + 1] = file;
        flag = true;
      }else if(i == index && i == this.listImage.length - 1){
        this.listImage[i] = file;
      }
    }
  }

  cancelImageThumbnail(){
    this.imageThumbnail = '';
    this.imgThumbnailBase64 = '';
  }

  postItem(){
    let reqPostItem: ReqPostItemModel = new ReqPostItemModel();    
    this.userDataModel = JSON.parse(AuthService.GetLocalStorage("user"));
    this.showSpinner = true;
    const formData = new FormData();    
    formData.append("PostTitle", this.form.get('PostTitle')?.value);
    formData.append("PostDescription", this.form.get('PostDescription')?.value);
    formData.append("MUserId", this.userDataModel.MUserId.toLocaleString());
    formData.append("MLostOrFoundId", "1");
    formData.append("MCategoryId", this.form.get('MCategoryId')?.value);
    formData.append("UserName", this.userDataModel.Username);    
    formData.append('PostImage', this.imageThumbnail.item(0));
    console.log(this.imageThumbnail.item(0));
    for (var i = 0, len = this.listImage.length; i < len; i++) {
      if (this.listImage[i]) {
        this.imgUpload = this.listImage[i];
        formData.append('PostImage', this.imgUpload.item(0));
      }      
    }
    this.http.post(this.EnviUrl.PostItem, formData).subscribe(
      (response) => {
        this.showSpinner = false;
      }
    )
  }
}
