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

  user: User;

  constructor(private router: Router,
              private dialog: MatDialog,
              private storageService: StorageService,
              private userService: UserService) { }

  ngOnInit(): void {
    if (this.storageService.currentUser && this.storageService.currentToken) {
      let currentUserId = this.storageService.currentUser;
      this.userService.getUserById(currentUserId).subscribe(user => {
        this.user = user;
      });
      this.user.isAuthenticated = true;
    } else {
      this.user = new User();
    }
  }

  redirect(url: string): void {
    this.router.navigate([url]);
  }

  logout(): void {
    this.userService.logout();
    StorageService.clear();
    this.user.isAuthenticated = false;
    this.router.navigate(['']);
  }

  openSignInDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {user: this.user};
    this.dialog.open(SignInComponent, dialogConfig);
  }
}
