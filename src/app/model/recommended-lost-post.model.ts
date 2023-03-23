export class ReqRecommendedLostPostModel {
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

export class ResRecommendedLostPostModel {
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

// export class ReqRecommendedLostPostModel {
//     MouCustId: number;
//     MouCustNo: string;
//     OriOfficeCode: string;
//     OriOfficeName: string;
//     CrtOfficeCode: string;
//     CrtOfficeName: string;
//     RefNo: string;
//     PlafondAmt: number;
//     MouStat: string;
//     MrMouTypeCode: string;
//     MrRevolvingTypeCode: string;
//     PlafondType: string;
//     StartDt: Date;
//     EndDt: Date;
//     IsRevolving: boolean;
//     IsFreeze: boolean;
//     RowVersion: string;

//     constructor() { 
//         this.MouCustId = 0;
//         this.MouCustNo = "";
//         this.OriOfficeCode = "";
//         this.OriOfficeName = "";
//         this.CrtOfficeCode = "";
//         this.CrtOfficeName = "";
//         this.RefNo = "";
//         this.PlafondAmt = 0;
//         this.MouStat = "";
//         this.MrMouTypeCode = "";
//         this.MrRevolvingTypeCode = "";
//         this.PlafondType = "";
//         this.IsRevolving = false;
//         this.IsFreeze = false;
//         this.RowVersion = ""}
// }