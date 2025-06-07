import { Component } from '@angular/core';

@Component({
  selector: 'app-fleet',
  templateUrl: './fleet.component.html',
  styleUrls: ['./fleet.component.css']
})
export class FleetComponent {
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

}
