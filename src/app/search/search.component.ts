import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { EnviUrl } from '../constant/EnviURL';
import { ReqPostCommentModel, ResPostCommentModel } from '../model/post-comment.model';
import { ReqPostGetLayoutModel, ResPostGetLayoutModel } from '../model/post-get-layout.model';
import { ReqSearchPostModel, ResSearchPostModel } from '../model/search-post.model';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  sub: Subscription | undefined;
  query: string = '';
  type: string | undefined;
  rbLostChecked: boolean = false;
  rbFoundChecked: boolean = false;
  lostText: string | undefined = 'Lost';
  foundText: string | undefined = 'Found';
  resSearchPostModel: Array<ResSearchPostModel> = new Array<ResSearchPostModel>();
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
    this.sub = this.Activatedroute.queryParamMap
      .subscribe(params => {
        this.showOverlay = true;
        this.query = params.get('q') || '';
        this.type = params.get('type') || '';
        this.currentPage = Number(params.get('page')) || 1;
        this.rbChange(this.type, true);
        this.sortValue = 'Tanggal Posting';
        this.getPostByParam('');
        this.showOverlay = false;
      });
  }

  async rbChange(evt: string, isInit: any = null) {    
    this.showOverlay = true;
    await new Promise(f => setTimeout(f, 200));
    if (evt.toString() == "Lost") {
      this.rbLostChecked = true
      this.rbFoundChecked = false
      this.type = "Lost";
    } else if (evt.toString() == "Found") {
      this.rbLostChecked = false
      this.rbFoundChecked = true
      this.type = "Found";
    }

    if (isInit == null) {
      this.router.navigate(
        ['/search'],
        { queryParams: { q: this.query, type: this.type } }
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