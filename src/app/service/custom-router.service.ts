import { Injectable } from '@angular/core';
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class CustomRouterService {

  constructor(private router: Router) { }

  redirect(url: string): void {
    this.router.navigate([url]);
  }
}
