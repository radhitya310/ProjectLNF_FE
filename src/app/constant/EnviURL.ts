import { Injectable } from "@angular/core";
import { UrlConfigService } from "../services/urlconfig.service";

@Injectable()

export class EnviUrl{

    constructor(private configEnv: UrlConfigService) {
    }
    public env = this.configEnv.getConfig();

    public RecommendedLostPost = this.env.lnfUrl + 'api/request/RecommendedLostPost';
    public PostGetLayout = this.env.lnfUrl + 'api/request/PostGetLayout';
    public ProfileLayout = this.env.lnfUrl + 'api/request/ProfileLayout';
    public UserPosts = this.env.lnfUrl + 'api/request/UserPosts';
    public PostComment = this.env.lnfUrl + 'api/request/PostComment';
    public SearchPost = this.env.lnfUrl + 'api/request/SearchPost'
    public SearchHistory = this.env.lnfUrl + 'api/request/SearchHistory'
    public DeleteRecentSearch = this.env.lnfUrl + 'api/request/DeleteRecentSearch'
    public HomeBanner = this.env.lnfUrl + 'api/request/HomeBanner'
    public AuthUser = this.env.lnfUrl + 'api/request/AuthUser'
    public CheckSession = this.env.lnfUrl + 'api/request/CheckSession'
    public BindCategory = this.env.lnfUrl + 'api/request/BindCategory'
    public PostItem = this.env.lnfUrl + 'api/request/PostItem'
    public LikePost = this.env.lnfUrl + 'api/request/LikePost'   
}