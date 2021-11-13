import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {SignInComponent} from "../sign-in/sign-in.component";
import {User} from "../model/User";
import {StorageService} from "../service/storage.service";
import {UserService} from "../service/user.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isAuthenticated: boolean;

  constructor(private router: Router,
              private dialog: MatDialog,
              private storageService: StorageService,
              private userService: UserService) { }

  ngOnInit(): void {
    if (this.storageService.currentUser) {
      this.isAuthenticated = true;
    }
  }

  redirect(url: string): void {
    this.router.navigate([url]);
  }

  logout(): void {
    this.userService.logout();
    StorageService.clear();
    this.router.navigate(['']);
  }

  openSignInDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    this.dialog.open(SignInComponent, dialogConfig);
  }
}
