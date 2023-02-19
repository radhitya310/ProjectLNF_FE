export class ReqPostCommentModel {
    SortBy: string;
    TPostId: number
    CurrentPage: number
    PageSize: number
    constructor() { 
        this.SortBy = "";
        this.TPostId = 0;
        this.CurrentPage = 0;
        this.PageSize = 0;
    }
}

export class ResPostCommentModel {
    TCommentId: number;
    FullName: string;
    CommentTime: Date | any;
    Comment: string;
    TotalLikes: number;
    UrlProfilePicture: string;
    Username: string;
    constructor() { 
        this.TCommentId = 0;
        this.FullName = "";
        this.Comment = "";
        this.TotalLikes = 0;
        this.Username = "";
        this.UrlProfilePicture = "";
    }
}