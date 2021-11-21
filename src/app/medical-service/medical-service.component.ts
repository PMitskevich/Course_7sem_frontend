import { Component, OnInit } from '@angular/core';
import {Specialization} from "../model/Specialization";
import {SpecializationService} from "../service/specialization.service";
import {User} from "../model/User";
import {ActivatedRoute, Router} from "@angular/router";
import {StorageService} from "../service/storage.service";
import {UserService} from "../service/user.service";
import {CustomRouterService} from "../service/custom-router.service";
import {element} from "protractor";

@Component({
  selector: 'app-medical-service',
  templateUrl: './medical-service.component.html',
  styleUrls: ['./medical-service.component.css']
})
export class MedicalServiceComponent implements OnInit {

  specializations: Specialization[] = [];
  user: User;

  constructor(private specializationService: SpecializationService,
              private router: CustomRouterService,
              private storageService: StorageService,
              private userService: UserService,
              private route: ActivatedRoute) { }

  async ngOnInit(): Promise<void> {
    const routeParams = this.route.snapshot.paramMap;
    let specializationId = routeParams.get('specializationId');
    if (specializationId) {
      let specialization = await this.specializationService.getSpecializationById(specializationId);
      this.specializations.push(specialization);
    } else {
      this.specializations = await this.specializationService.getAllSpecializations();
    }
    let userId = this.storageService.currentUser;
    if (userId) {
      this.user = await this.userService.getUserById(userId);
      this.user.isAuthenticated = true;
    }
  }

  deleteSpecialization(specializationId: string): void {
    this.specializations.forEach((element, index) => {
      if (element.id === specializationId) {
        this.specializations.splice(index, 1);
      }
    })
    this.specializationService.deleteSpecialization(specializationId).subscribe();
  }

  createSpecialization(): void {
    this.router.redirect('specialization/addSpecialization');
  }

  redirect(url: string): void {
    this.router.redirect(url);
  }
}
