
export class ReqCreateCommentModel {
    SessionId: string | any;
    MUserId: number;
    TPostId: number;
    CommentText: string | any;
    ParentCommentId: number;
    constructor() {
        this.SessionId = "";
        this.MUserId = 0;
        this.TPostId = 0;
        this.CommentText = "";
        this.ParentCommentId = 0;
    }
}

export class ResCreateCommentModel {
    Status: string;
    TCommentId: number;
    CommentTime: Date | any;
    CommentTimestamp: string;
    constructor() {
        this.Status = "";
        this.TCommentId = 0;
        this.CommentTimestamp = "";
    }
}