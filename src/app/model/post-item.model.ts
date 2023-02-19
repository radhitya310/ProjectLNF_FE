export class ReqPostItemModel {
    PostTitle: string;
    PostDescription: string;
    MUserId: number;
    MLostOrFoundId: number;
    MCategoryId: number;
    UserName: string;
    PostImage: string[] = [];
    constructor() {
        this.PostTitle = "";
        this.PostDescription = "";
        this.MUserId = 0;
        this.MLostOrFoundId = 0;
        this.MCategoryId = 0;
        this.UserName = "";
    }
}