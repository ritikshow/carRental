import { Component, OnInit, TemplateRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BookingFormComponent } from '../booking/booking-form/booking-form.component';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-fleet',
  templateUrl: './fleet.component.html',
  styleUrls: ['./fleet.component.css']
})
export class FleetComponent implements OnInit {
  AllCars: any[] = [];
  path: string = 'https://rirajtik-001-site1.ktempurl.com/api';
  BaseUrl: string = '';

  constructor(
    private modalService: NgbModal,
    private api: ApiService
  ) {}

  ngOnInit(): void {
    this.BaseUrl = this.path.replace(/^(.*:\/\/[^\/]+)\/.*/, '$1');
    //this.Getcar();
    this.AllCars = [
      {
        carName: 'innova_crysta',
        carModel: 'Toyota Innova Crysta',
        imagePath: 'assets/cars/innova.jpg'
      },
      {
        carName: 'honda_city',
        carModel: 'Honda City ZX',
        imagePath: 'assets/cars/Honda city.jpg'
      },
      {
        carName: 'maruti_ertiga',
        carModel: 'Maruti Suzuki Ertiga',
        imagePath: 'assets/cars/ertiga2.webp'
      },
      {
        carName: 'mahindra_xuv500',
        carModel: 'Mahindra XUV500',
        imagePath: 'assets/cars/download.jpg'
      },
      {
        carName: 'hyundai_verna',
        carModel: 'Hyundai Verna SX',
        imagePath: 'assets/cars/dzire.png'
      },
      {
        carName: 'kia_seltos',
        carModel: 'Kia Seltos GTX',
        imagePath: 'assets/cars/crystaf.webp'
      },
      {
        carName: 'mg_hector',
        carModel: 'MG Hector Sharp',
        imagePath: 'assets/cars/porsche.webp'
      },
      {
        carName: 'toyota_etios',
        carModel: 'Toyota Etios',
        imagePath: 'assets/cars/toyotaetios.jpg'
      },
      {
        carName: 'audi_a4',
        carModel: 'Audi A4',
        imagePath: 'assets/cars/audi.png'
      },
      {
        carName: 'bmw_5_series',
        carModel: 'BMW 5 Series',
        imagePath: 'assets/cars/bmw1.avif'
      }
    ];
  }

  steps = [
    { number: 1, iconClass: 'fas fa-car fa-3x text-warning', description: 'Choose your car' },
    { number: 2, iconClass: 'fas fa-file-alt fa-3x text-warning', description: 'Fill out the booking form' },
    { number: 3, iconClass: 'fas fa-check-circle fa-3x text-warning', description: 'Confirm your rental' },
    { number: 4, iconClass: 'fas fa-smile fa-3x text-warning', description: 'Enjoy your ride!' }
  ];

  isSmallScreen(): boolean {
    return window.innerWidth < 768;
  }

  // OnSubmit(): void {
  //   this.modalService.open(BookingFormComponent, {
  //     backdrop: 'static',
  //     windowClass: 'main_add_popup',
  //     keyboard: true,
  //     centered: true
  //   });
  // }

  onBookNow(car: any): void {
    const carid = car.carId // fallback to car.id if carId is not present
    const modalRef = this.modalService.open(BookingFormComponent, {
      backdrop: 'static',
      windowClass: 'main_add_popup',
      keyboard: true,
      centered: true
    });
    modalRef.componentInstance.carId = carid;
  }

//  Getcar() {
//   this.api.GetCars().subscribe({
//     next: (res: any) => {
//       this.AllCars = res?.data || [];

//       this.AllCars.forEach(car => {
//         if (car?.imagePath && car.imagePath !== 'null') {
//           const match = car.imagePath.match(/Uploads[\\/].*/);
//           const relativePath = match ? match[0].replace(/\\/g, '/') : '';
//           car.imagePath = `${this.BaseUrl}/${relativePath}`;
//         } else {
//           car.imagePath = 'assets/cars/default.jpg'; // fallback image
//         }
//       });
//     },
//     error: err => {
//       console.error('Failed to load cars:', err);
//     }
//   });
// }

openTariffDetails(car: any, template: TemplateRef<any>): void {
  this.modalService.open(template, {
    centered: true,
    size: 'lg'
  });
}   
}
