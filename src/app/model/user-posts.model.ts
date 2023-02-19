export class ReqUserPostsModel {
    MUserId: number;
    constructor() { 
        this.MUserId = 0;
    }
}

export class ResUserPostsModel {
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
    }
}