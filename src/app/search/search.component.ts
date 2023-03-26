import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { EnviUrl } from '../constant/EnviURL';
import { ReqPostCommentModel, ResPostCommentModel } from '../model/post-comment.model';
import { ReqPostGetLayoutModel, ResPostGetLayoutModel } from '../model/post-get-layout.model';
import { ReqSearchPostModel, ResSearchPostModel } from '../model/search-post.model';
import { ResBindCategoryModel } from '../model/bind-category.model';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  sub: Subscription | undefined;
  query: string = '';
  type: string = '';
  test: string = '';
  selectedValue: number = 0;
  category: number = 0;
  rbLostChecked: boolean = false;
  rbFoundChecked: boolean = false;
  lostText: string | undefined = 'Lost';
  foundText: string | undefined = 'Found';
  resSearchPostModel: Array<ResSearchPostModel> = new Array<ResSearchPostModel>();
  resBindCategory: Array<ResBindCategoryModel> = new Array<ResBindCategoryModel>();
  public showOverlay = true;  
  totalCount: number = 0;
  totalPage: Array<number> = new Array<number>();
  pages: number = 0;
  currentPage: number = 0;
  sortBy: any = {
    'Tanggal Posting': ' PostDate DESC',
    'Total Likes': ' TotalLikes DESC'
  }
  sortValue: string = '';
  
  //#region DEFINE VARIABLE DEFAULT
  pageSize: number = 15;
  //#endregion

  constructor(
    private Activatedroute: ActivatedRoute,
    private http: HttpClient,
    private router: Router,
    private EnviUrl: EnviUrl
  ) { }

  Object = Object;
  ngOnInit() {
    this.initCategory();
    this.sub = this.Activatedroute.queryParamMap
      .subscribe(params => {
        this.showOverlay = true;
        this.query = params.get('q') || '';
        this.type = params.get('type') || '';
        this.category = Number(params.get('cat')) || 0;
        this.currentPage = Number(params.get('page')) || 1;
        this.rbChange(this.type, true);
        this.rbCatChange(this.category,true);
        this.sortValue = 'Tanggal Posting';
        this.getPostByParam('');
        this.showOverlay = false;
      });
  }

  async rbChange(evt: string, isInit: any = null) {    
    this.showOverlay = true;
    await new Promise(f => setTimeout(f, 200));
    if (evt.toString() == "Lost") {
      this.rbLostChecked = true;
      this.rbFoundChecked = false;
      this.type = "Lost";
    } else if (evt.toString() == "Found") {
      this.rbLostChecked = false;
      this.rbFoundChecked = true;
      this.type = "Found";
    }

    if (isInit == null) {
      this.router.navigate(
        ['/search'],
        { queryParams: { q: this.query, type: this.type, cat: this.category } }
      );
    }
  }

  async rbCatChange(ix: any, isInit: any = null) {
    if(isInit == null)
      this.test = 'masuk';
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
        ['/search'],
        { queryParams: { q: this.query, type: this.type, cat: this.category } }
      );
    }
  }

  paginationClicked(pages: number){
    this.router.navigate(
      ['/search'],
      { queryParams: { q: this.query, type: this.type, page: pages} }
    );    
  }

  async getPostByParam(sort: string) {
    this.totalPage = new Array<number>();
    let reqSearchPostModel: ReqSearchPostModel = new ReqSearchPostModel();
    reqSearchPostModel.PageSize = this.pageSize;
    reqSearchPostModel.CurrentPage = this.currentPage;
    reqSearchPostModel.Query = this.query;
    reqSearchPostModel.Type = this.type;
    reqSearchPostModel.Category = this.category;
    if(sort == '')
      reqSearchPostModel.SortBy = 'TPostId';
    else
      reqSearchPostModel.SortBy = sort;
    this.http.post(this.EnviUrl.SearchPost, { reqSearchPostModel }).subscribe(
      (response: any) => {
        this.resSearchPostModel = response;
        this.totalCount = this.resSearchPostModel[0].PostCount;
        this.pages = Math.ceil(this.totalCount / this.pageSize);
        console.log (this.resSearchPostModel);
        for(let i = 0; i < this.pages; i++){
          this.totalPage.push(i + 1);
        }
      });
  }

  createRange(number: any){
    // return new Array(number);
    return new Array(number).fill(0)
      .map((n, index) => index + 1);
  }
  
  async sort(key: any, val: any){
    this.showOverlay = true;
    this.sortValue = key;
    this.getPostByParam(val);
    await new Promise(f => setTimeout(f, 200));
    this.showOverlay = false;
  }

  async initCategory(){
    this.http.post(this.EnviUrl.BindCategory, {}).subscribe(
      (response: any) => {
        this.resBindCategory = response;
      });
  }
  
}

@Pipe({name: 'keys'})
export class KeysPipe implements PipeTransform {
  transform(value :any, args:string[]) : any {
    let keys = [];
    for (let key in value) {
      keys.push({key: key, value: value[key]});
    }
    return keys;
  }
}