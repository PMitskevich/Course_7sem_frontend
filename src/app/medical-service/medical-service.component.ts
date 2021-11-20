import { Component, OnInit } from '@angular/core';
import {Specialization} from "../model/Specialization";
import {SpecializationService} from "../service/specialization.service";
import {User} from "../model/User";
import {Router} from "@angular/router";
import {StorageService} from "../service/storage.service";
import {UserService} from "../service/user.service";

@Component({
  selector: 'app-medical-service',
  templateUrl: './medical-service.component.html',
  styleUrls: ['./medical-service.component.css']
})
export class MedicalServiceComponent implements OnInit {

  specializations: Specialization[];
  user: User;

  constructor(private specializationService: SpecializationService,
              private router: Router,
              private storageService: StorageService,
              private userService: UserService) { }

  async ngOnInit(): Promise<void> {
    this.specializations = await this.specializationService.getAllSpecializations();
    let userId = this.storageService.currentUser;
    if (userId) {
      this.user = await this.userService.getUserById(userId);
      this.user.isAuthenticated = true;
    }
    console.log(this.user && this.user.isAuthenticated && this.user.role === 'ADMIN');
  }

  redirect(url: string): void {
    this.router.navigate([url]);
  }

  deleteSpecialization(specializationId: string): void {
    this.specializationService.deleteSpecialization(specializationId).subscribe();
  }

  createSpecialization(): void {
    this.redirect('specialization/addSpecialization');
  }
}
