export class ReqRecommendedFoundPostModel {
    page: number;
    Location: string;
    Cookies: string;
    TotalItemPerPage: number;
    // PostTypeId: number;
    constructor() { 
        this.page = 0;
        this.Location = "";
        this.Cookies = "";
        this.TotalItemPerPage = 20;
        // this.PostTypeId = 0;
    }
}

export class ResRecommendedFoundPostModel {
    TPostId: number;
    PostTitle: string;
    PostDescription: string;
    MUserId: number;
    Username: string;
    TotalLikes: number;
    TotalComment: number;
    ImgUrl: string;
    PostDate: Date | undefined;    
    PostDateTimestamp: string;
    PostUrlSlug: string;    
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
        this.PostDateTimestamp = "";
    }
}