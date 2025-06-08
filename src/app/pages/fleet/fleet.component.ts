import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BookingFormComponent } from '../booking/booking-form/booking-form.component';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-fleet',
  templateUrl: './fleet.component.html',
  styleUrls: ['./fleet.component.css']
})
export class FleetComponent implements OnInit {
  AllCars: any;


  constructor(
         private modalService: NgbModal,
         private api:ApiService
  )
  {}
  ngOnInit(): void {
    this.Getcar();
  }
  steps = [
    { number: 1, iconClass: 'fas fa-car fa-3x text-warning', description: 'Choose your car' },
    { number: 2, iconClass: 'fas fa-file-alt fa-3x text-warning', description: 'Fill out the booking form' },
    { number: 3, iconClass: 'fas fa-check-circle fa-3x text-warning', description: 'Confirm your rental' },
    { number: 4, iconClass: 'fas fa-smile fa-3x text-warning', description: 'Enjoy your ride!' }
  ];

  cars = [
    { name: 'Honda City', image: 'assets/cars/Honda city.jpg' },
    { name: 'Innova', image: 'assets/cars/innova.jpg' },
    { name: 'Ertiga', image: 'assets/cars/ertiga2.webp' },
    { name: 'Dzire', image: 'assets/cars/dzire.png' },
    { name: 'Toyota Etios', image: 'assets/cars/hero1.png' },
    { name: 'Crysta', image: 'assets/cars/crysta.jpg' },
    { name: 'Audi', image: 'assets/cars/audi.png' },
    { name: 'Jaguar', image: 'assets/cars/jaguar.jpg' },
    { name: 'BMW', image: 'assets/cars/bmw2.avif' },
    { name: 'Mercedes', image: 'assets/cars/hero.png' },
    { name: 'Fortuner', image: 'assets/cars/jaguar.jpg' },
    { name: 'Nissan', image: 'assets/cars/toyotaetios.jpg' },
    { name: 'Kia Seltos', image: 'assets/cars/jaguar.jpg' }
  ];

  isSmallScreen(): boolean {
  return window.innerWidth < 768;
}
 
OnSubmit(){
  this.modalService.open(BookingFormComponent,{ backdrop: 'static',windowClass: 'main_add_popup', keyboard: true, centered: true })
}


 Getcar(){
    debugger;
      this.api.GetCars().subscribe({next: (res:any) => {
        console.log('Carstype:', res);
          
        this.AllCars=res.data;

       
      }
      
    });
  }
}
