export class UserDataModel {
    MUserId: number;
    Username: string;
    FullName: string;
    UrlProfilePicture: string;
    Bio: string
    constructor() { 
        this.MUserId = 0;
        this.Username = "";
        this.FullName = "";
        this.UrlProfilePicture = "";
        this.Bio = "";
    }
}