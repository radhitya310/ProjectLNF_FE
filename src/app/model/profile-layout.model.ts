export class ReqProfileLayoutModel {
    Username: string;
    constructor() { 
        this.Username = "";
    }
}

export class ResProfileLayoutModel {
    Likes: number;
    TotalFollowers: number;
    FullName: string;
    MUserId: number;
    Username: string;        
    UrlProfilePicture: string;
    Bio: string;
    constructor() { 
        this.FullName = "";
        this.MUserId = 0;
        this.Username = "";
        this.Likes = 0;
        this.TotalFollowers = 0;
        this.UrlProfilePicture = "";
        this.Bio = "";
    }
}