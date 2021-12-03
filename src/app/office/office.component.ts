import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Owner} from "../model/Owner";
import {Constants} from "../constant/Constants";
import {loginValidator, phoneValidator} from "../service/validators";
import {OwnerService} from "../service/owner.service";
import {CustomRouterService} from "../service/custom-router.service";

@Component({
  selector: 'app-office',
  templateUrl: './office.component.html',
  styleUrls: ['./office.component.css']
})
export class OfficeComponent implements OnInit {

  ownerForm: FormGroup;
  owner: Owner;
  requiredFieldMessage = Constants.REQUIRED_FIELD_MESSAGE;
  wrongEmailMessage = Constants.WRONG_EMAIL_MESSAGE;
  phoneDoesntMatchPattern = Constants.PHONE_DOESNT_MATCH_PATTERN;

  constructor(private route: ActivatedRoute,
              private formBuilder: FormBuilder,
              private ownerService: OwnerService,
              private router: CustomRouterService) { }

  async ngOnInit(): Promise<void> {
    const routeParams = this.route.snapshot.paramMap;
    let ownerId = routeParams.get('ownerId');
    this.owner = await this.ownerService.getOwnerById(ownerId);
    this.ownerForm = this.getOwnerFormGroup()
  }

  getOwnerFormGroup(): FormGroup {
    return <FormGroup> this.formBuilder.group({
      lastName: [this.owner.lastName, [Validators.required]],
      firstName: [this.owner.firstName, [Validators.required]],
      patronymic: [this.owner.patronymic, [Validators.required]],
      address: [this.owner.address, [Validators.required]],
      phone: [this.owner.phone, [Validators.required, phoneValidator(/^(\+375|80) (29|25|44|33) (\d{3}) (\d{2}) (\d{2})$/)]]
    });
  }

  saveOwner(): void {
    if (this.ownerForm.valid) {
      this.owner.firstName = this.ownerForm.get('firstName').value;
      this.owner.lastName = this.ownerForm.get('lastName').value;
      this.owner.patronymic = this.ownerForm.get('patronymic').value;
      this.owner.address = this.ownerForm.get('address').value;
      this.owner.phone = this.ownerForm.get('phone').value;
      this.ownerService.updateOwner(this.owner).subscribe(response => {
        this.router.redirect('homepage');
      });
    }
  }
}
