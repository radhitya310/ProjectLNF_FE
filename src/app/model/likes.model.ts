export class ReqLikesModel {
    MUserId: number;
    TPostId: number;
    SessionId: string;
    DoLike: string;
    constructor() {
        this.TPostId = 0;
        this.MUserId = 0;
        this.SessionId = "";
        this.DoLike = "";
    }
}

export class ResLikesModel {
    TotalLikes: string;
    IsLiked: string
    constructor() {
        this.TotalLikes = "";
        this.IsLiked = "";
    }
}