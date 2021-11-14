import { Injectable } from '@angular/core';
import {User} from "../model/User";
import CryptoJS from "crypto-js";

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private readonly PASSPHRASE: string;
  private readonly USER: string;
  private readonly TOKEN: string;

  constructor() {
    this.PASSPHRASE = 'mitskevich';
    this.USER = 'currentUser';
    this.TOKEN = 'currentToken';
  }

  set currentUser(userId: string) {
    const encrypted = CryptoJS.AES.encrypt(userId, this.PASSPHRASE, 256);
    localStorage.setItem(this.USER, encrypted.toString());
  }

  get currentUser(): string {
    if (localStorage[this.USER]) {
      const decrypted = CryptoJS.AES.decrypt(localStorage.getItem(this.USER), this.PASSPHRASE, 256);
      return decrypted.toString(CryptoJS.enc.Utf8);
    }
  }

  set currentToken(token: string) {
    localStorage.setItem(this.TOKEN, JSON.stringify(token));
  }

  get currentToken(): string {
    return JSON.parse(localStorage.getItem(this.TOKEN));
  }
  static isEmpty(): boolean {
    return localStorage.length === 0;
  }

  static clear(): void {
    localStorage.removeItem('currentToken');
    localStorage.removeItem('currentUser');
  }
}
