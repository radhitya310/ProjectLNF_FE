export class ReqSearchHistoryModel {
    Cookie: string;
    Query: string;
    constructor() { 
        this.Cookie = "";
        this.Query = "";
    }
}

export class ResSearchHistoryModel {
    NewCookie: string;
    SearchHist: string;
    constructor() { 
        this.NewCookie = "";
        this.SearchHist = "";
    }
}