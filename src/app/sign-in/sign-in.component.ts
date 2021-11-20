import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {User} from "../model/User";
import {AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators} from "@angular/forms";
import {AuthenticationUser} from "../model/AuthenticationUser";
import {UserService} from "../service/user.service";
import {StorageService} from "../service/storage.service";
import {loginValidator} from "../service/validators";


@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  // @ts-ignore
  form: FormGroup;
  user: User;

  constructor(private formBuilder: FormBuilder,
              private dialogRef: MatDialogRef<SignInComponent>,
              @Inject(MAT_DIALOG_DATA) public data: { user },
              private userService: UserService,
              private storageService: StorageService) { }

  ngOnInit(): void {
    this.user = new User();
    this.form = this.formBuilder.group({
      login: new FormControl('', [Validators.required, Validators.minLength(3),
        loginValidator(/^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i, /[a-zA-Z0-9]+/)]),
      password: new FormControl('', [Validators.required])
    });
  }

  get login() {
    return this.form.get('login');
  }

  get password() {
    return this.form.get('password');
  }

  logIn() {
    if (this.form.valid) {
      if (this.user == undefined) {
        this.user = new User();
      }
      this.user.email = this.login.value;
      this.user.password = this.password.value;

      this.userService.signIn(this.user).subscribe(
        response => {
          console.log('Successful authentication');
          let authToken = response.headers.get('Authorization');
          if (authToken != null) {
            this.user.isAuthenticated = true;
            this.storageService.currentToken = response.headers.get('Authorization');
            this.storageService.currentUser = response.body['id'];
            this.data.user.isAuthenticated = true;
          }
          this.dialogRef.close(this.form.value);
        },
        error => {
          this.password.reset();
        }
      );
    }
  }

  close() {
    this.dialogRef.close();
  }

}


