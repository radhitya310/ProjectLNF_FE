import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { of } from 'rxjs';
import { delay, tap } from 'rxjs/operators';
import * as CryptoJS from 'crypto-js';
import { EnviUrl } from '../constant/EnviURL';
import { HttpClient } from '@angular/common/http';
import { ReqAuthUserModel, ResAuthUserModel } from '../model/auth-user.model';
import * as Forge from 'node-forge';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  publicKey = `-----BEGIN PUBLIC KEY-----
  MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAxYrJpiiMsB9omrgQlgDy
  MjhJnwyEMrZvuRJrtzkPpW4bYQGPOmUR8JZ+gNz9UgIP6rdBHxJyGmt3G2zyZmqN
  7S2Elwq7aykkd1FnIfJhVFQBDnGHnTYJx/8Qe0lHdiVz1UMby0z6oOtfdpsnjgfT
  9pOmve9zjOkhMzW/p7uG3KrxW8eWbh/peLEVD1M0+4j4e5nXahJ3V0QJxaMpWBZR
  XVJ2IsMUg8V8jTpatweedx+5ZL8xiGk7J8BacbJLUF2cXUud9grq9UGtCqE7429K
  kvwSa6bj7AWILfY1Td2HJ36GrAB9Hkv/dIK4dh8puaBOWubXbpX07WrksaCXih55
  AQIDAQAB
  -----END PUBLIC KEY-----`;
  isUserLoggedIn: boolean = false;
  resAuthUser: ResAuthUserModel = new ResAuthUserModel();

  getPublicKey(): string {
    return this.publicKey;
  }

  public static logout(): void {
    localStorage.removeItem('sessionid');
    localStorage.removeItem('user');
  }

  public static SetLocalStorage(key: string, value: string) {
    return localStorage.setItem(key, this.EncryptString(value, "ketemubarangkamu"));
  }

  public static GetLocalStorage(key: any) {
    return this.DecryptString(localStorage.getItem(key), "ketemubarangkamu");
  }

  public static SetCookie(cookieService: CookieService, key: string, value: string) {
    cookieService.set(key, this.EncryptString(value, "ketemubarangkamu"));
    //cookieService.set(key, value);
  }

  public static GetCookie(cookieService: CookieService, key: string) {
    var value = cookieService.get(key);
    if (value == undefined || value.trim() == '') return null;
    return this.DecryptString(value, "ketemubarangkamu");
    //return value;
  }

  private static EncryptString(plaintext: string, chipperKey: string = "") {
    if (chipperKey == undefined || chipperKey.trim() == '') return plaintext;
    var chipperKeyArr = CryptoJS.enc.Utf8.parse(chipperKey);
    var iv = CryptoJS.lib.WordArray.create([0x00, 0x00, 0x00, 0x00]);
    var encrypted = CryptoJS.AES.encrypt(plaintext, chipperKeyArr, { iv: iv });
    var result = CryptoJS.enc.Base64.stringify(encrypted.ciphertext);
    return result;
  }

  private static DecryptString(chipperText: string | any, chipperKey: string) {
    if (
      chipperKey == undefined || chipperKey.trim() == '' ||
      chipperText == undefined || chipperText.trim() == ''
    ) return chipperText;
    var chipperKeyArr = CryptoJS.enc.Utf8.parse(chipperKey);
    var iv = CryptoJS.lib.WordArray.create([0x00, 0x00, 0x00, 0x00]);
    var decrypted = CryptoJS.AES.decrypt(chipperText, chipperKeyArr, { iv: iv });
    var plainText: any = decrypted.toString(CryptoJS.enc.Utf8);
    return plainText;
  }

  constructor(
    private http: HttpClient,
    private EnviUrl: EnviUrl,
    private cookieService: CookieService
  ) { }
}