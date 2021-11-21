import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {User} from "../model/User";
import {Owner} from "../model/Owner";
import {OwnerService} from "../service/owner.service";
import {StorageService} from "../service/storage.service";
import {UserService} from "../service/user.service";
import {loginValidator, MustMatch, phoneValidator} from "../service/validators";
import {Router} from "@angular/router";
import {Constants} from "../constant/Constants";
import {CustomRouterService} from "../service/custom-router.service";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  ownerForm: FormGroup;
  owner: Owner;
  requiredFieldMessage = Constants.REQUIRED_FIELD_MESSAGE;
  wrongEmailMessage = Constants.WRONG_EMAIL_MESSAGE;
  passwordsAreNotEqualMessage = Constants.PASSWORDS_ARE_NOT_EQUAL_MESSAGE;

  constructor(private formBuilder: FormBuilder,
              private ownerService: OwnerService,
              private storageService: StorageService,
              private userService: UserService,
              private router: CustomRouterService) { }

  ngOnInit(): void {
    this.ownerForm = this.formBuilder.group({
      lastName: ['', [Validators.required]],
      firstName: ['', [Validators.required]],
      patronymic: ['', [Validators.required]],
      address: ['', [Validators.required]],
      phone: ['', [Validators.required, phoneValidator(/^(\+375|80) (29|25|44|33) (\d{3}) (\d{2}) (\d{2})$/)]],
      email: ['', [Validators.required, loginValidator(/^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i, /[a-zA-Z0-9]+/)]],
      password: ['', [Validators.required]],
      passwordRepeat: ['', [Validators.required]],
    }, {validators: MustMatch('password', 'passwordRepeat')});
    this.owner = new Owner();
    this.owner.user = new User();
  }

  addOwner(): void {
    if (this.ownerForm.valid) {
      this.owner.firstName = this.ownerForm.get('firstName').value;
      this.owner.lastName = this.ownerForm.get('lastName').value;
      this.owner.patronymic = this.ownerForm.get('patronymic').value;
      this.owner.address = this.ownerForm.get('address').value;
      this.owner.phone = this.ownerForm.get('phone').value;
      this.owner.email = this.ownerForm.get('email').value;
      this.owner.user.email = this.ownerForm.get('email').value;
      this.owner.user.password = this.ownerForm.get('password').value;
      this.ownerService.createOwner(this.owner).subscribe(response => {
        this.router.redirect('homepage');
      });
    }
  }
}
