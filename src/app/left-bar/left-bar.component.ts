import { Component, OnInit } from '@angular/core';
import {Specialization} from "../model/Specialization";
import {Doctor} from "../model/Doctor";
import {MedicalServiceEntity} from "../model/MedicalServiceEntity";
import {SpecializationService} from "../service/specialization.service";
import {CustomRouterService} from "../service/custom-router.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-left-bar',
  templateUrl: './left-bar.component.html',
  styleUrls: ['./left-bar.component.css']
})
export class LeftBarComponent implements OnInit {
  specializations: Specialization[];

  constructor(private specializationService: SpecializationService,
              private router: Router) { }

  async ngOnInit(): Promise<void> {
    this.specializations = await this.specializationService.getAllSpecializations();
  }

  redirect(url: string) {
    this.router.routeReuseStrategy.shouldReuseRoute = function() { return false; };
    this.router.navigate([url]);
  }
}
