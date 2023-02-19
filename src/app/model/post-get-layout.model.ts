export class ReqPostGetLayoutModel {
    PostUrlSlug: string;
    constructor() { 
        this.PostUrlSlug = "";
    }
}

export class ResPostGetLayoutModel {
    TPostId: number;
    PostTitle: string;
    PostDescription: string;
    MUserId: number;
    Username: string;
    FullName: string;
    Likes: number;
    TotalComment: number;
    ImgUrl: string[] = [];
    PostDate: Date | undefined;
    PostUrlSlug: string;
    UrlProfilePicture: string;
    Bio: string;
    constructor() { 
        this.TPostId = 0;
        this.PostTitle = "";
        this.PostDescription = "";
        this.MUserId = 0;
        this.Username = "";
        this.FullName = "";
        this.Likes = 0;
        this.TotalComment = 0;
        this.PostUrlSlug = "";
        this.UrlProfilePicture = "";
        this.Bio = "";
    }
}