export class ReqSearchPostModel {
    SortBy: string;
    Query: string
    CurrentPage: number
    PageSize: number
    Type: string
    Category: number
    constructor() { 
        this.SortBy = "";
        this.Query = "";
        this.CurrentPage = 0;
        this.PageSize = 0;
        this.Type = ""
        this.Category = 0;
    }
}

export class ResSearchPostModel {
    TPostId: number;
    PostTitle: string;
    PostDescription: string;
    MUserId: number;
    Username: string;
    TotalLikes: number;
    TotalComment: number;
    ImgUrl: string;
    PostDate: Date | undefined;    
    PostUrlSlug: string;
    PostCount: number;
    PostDateTimestamp: string;
    constructor() { 
        this.TPostId = 0;
        this.PostTitle = "";
        this.PostDescription = "";
        this.MUserId = 0;
        this.Username = "";
        this.TotalLikes = 0;
        this.TotalComment = 0;
        this.ImgUrl = "";
        this.PostUrlSlug = "";      
        this.PostCount = 0;  
        this.PostDateTimestamp = "";
    }
}