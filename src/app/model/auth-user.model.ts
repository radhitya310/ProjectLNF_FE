
export class ReqAuthUserModel {
    UserCredential: string | any;
    LoginType: string | any;
    AccessToken: string | any;
    Password: string | any;
    constructor() {
        this.UserCredential = "";
        this.Password = "";
        this.AccessToken ="";
        this.LoginType ="";
    }
}

export class ResAuthUserModel {
    Status: string;
    Message: string;
    ExpiredDt: Date | any;
    SessionId: string;
    MUserId: number;
    Username: string;
    FullName: string; 
    UrlProfilePicture: string;
    Bio: string;
    constructor() {
        this.Message = "";
        this.Status = "";
        this.SessionId = "";
        this.MUserId = 0;
        this.Username = "";
        this.FullName = "";
        this.UrlProfilePicture = "";
        this.Bio = "";
    }
}