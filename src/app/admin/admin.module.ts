import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CarComponent } from './car/car.component';
import { BookingComponent } from './booking/booking.component';
import { DriverComponent } from './driver/driver.component';
import { ContactComponent } from './contact/contact.component';
import { AdminSidebarComponent } from '../shared/admin-sidebar/admin-sidebar.component';


@NgModule({
  declarations: [
    DashboardComponent,
    CarComponent,
    BookingComponent,
    DriverComponent,
    ContactComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
