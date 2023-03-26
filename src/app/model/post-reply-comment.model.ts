export class ReqPostReplyCommentModel {
    SortBy: string;
    TParentCommentId: number;
    CurrentPage: number;
    PageSize: number;
    constructor() { 
        this.SortBy = "";
        this.TParentCommentId = 0;
        this.CurrentPage = 0;
        this.PageSize = 0;
    }
}

export class ResPostReplyCommentModel {
    TCommentId: number;
    FullName: string;
    CommentTime: Date | any;
    Comment: string;
    TotalLikes: number;
    TotalReply: number;
    UrlProfilePicture: string;
    Username: string;
    CommentTimestamp: string;
    isReply: boolean;
    isCreateComment: boolean;
    CommentReply: string;
    CurrentPage: number;
    constructor() { 
        this.TCommentId = 0;
        this.FullName = "";
        this.Comment = "";
        this.TotalReply = 0;
        this.TotalLikes = 0;
        this.Username = "";
        this.UrlProfilePicture = "";
        this.CommentTimestamp= "";
        this.isReply = false;
        this.isCreateComment = false;
        this.CommentReply = '';
        this.CurrentPage = 0;
    }
}