import { Component, OnInit } from '@angular/core';
import {AppointmentService} from "../service/appointment.service";
import {Appointment} from "../model/Appointment";
import {StorageService} from "../service/storage.service";
import {UserService} from "../service/user.service";

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.css']
})
export class AppointmentComponent implements OnInit {

  appointments: Appointment[];

  constructor(private appointmentService: AppointmentService,
              private storageService: StorageService,
              private userService: UserService) { }

  async ngOnInit(): Promise<void> {
    if (this.storageService.currentUser) {
      let userId = this.storageService.currentUser;
      let user = await this.userService.getUserById(userId);
      this.appointments = await this.appointmentService.getAppointmentsByOwnerId(user.owner.id);
    }
  }

  cancelAppointment(index: number): void {
    let appointment = this.appointments[index];
    this.appointmentService.deleteAppointment(appointment.id).subscribe(response => {
      console.log(response);
      this.appointments.splice(index, 1);
    });
  }
}
