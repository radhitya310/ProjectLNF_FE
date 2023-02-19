import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { lastValueFrom, Observable } from "rxjs";


@Injectable()

export class UrlConfigService {
    private appConfig: any;
    constructor(private _http: HttpClient){ }

    async loadConfig() {
      const _getEnvi = this._http.get('/assets/config/urlConfig.json');
      this.appConfig = await lastValueFrom(_getEnvi);
      return this.appConfig;
    }

    getConfig() {
        return this.appConfig;
    }
}