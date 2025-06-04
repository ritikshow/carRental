import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  trigger,
  transition,
  style,
  animate
} from '@angular/animations';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css'],
  animations: [
    trigger('slideInUp', [
      transition(':enter', [
        style({ transform: 'translateY(100%)', opacity: 0 }),
        animate('600ms ease-out', style({ transform: 'translateY(0)', opacity: 1 }))
      ])
    ])
  ]
})
export class BookingComponent implements OnInit {
  bookingForm!: FormGroup;
  AllCars:any
  bookingTypes = ['One Way', 'Round Trip'];
  carTypes = ['SUV', 'Sedan', 'Hatchback', 'Luxury'];

  constructor(
    private fb: FormBuilder,
    private api: ApiService
  ) {}

  ngOnInit(): void {
    this.bookingForm = this.fb.group({
      cartype: ['', Validators.required],
      BookingType: ['', Validators.required],
      Phone_no: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      Name: ['', Validators.required],
      Email: ['', [Validators.required, Validators.email]],
      PickupLocation: ['', Validators.required],
      PickupDate: ['', Validators.required],
      PickupTime: ['', Validators.required],
      DropLocation: ['', Validators.required],
      Dropdate: ['', Validators.required],
      Droptime: ['', Validators.required],
      BookingDate: ['', Validators.required],
      CompanyEnabled: [false],
      CompanyName: [''],
      CompanyDescription: ['']
    });

    this.bookingForm.get('CompanyEnabled')?.valueChanges.subscribe(enabled => {
      const nameControl = this.bookingForm.get('CompanyName');
      const descControl = this.bookingForm.get('CompanyDescription');
      if (enabled) {
        nameControl?.setValidators([Validators.required]);
        descControl?.setValidators([Validators.required]);
      } else {
        nameControl?.clearValidators();
        descControl?.clearValidators();
      }
      nameControl?.updateValueAndValidity();
      descControl?.updateValueAndValidity();
    });

     this.Getcar();
    
  }

  onSubmit(): void {
    if (this.bookingForm.valid) {
      console.log('Booking Data:', this.bookingForm.value);
      // send to API
    }
  }

  Getcar(){
    debugger;
      this.api.GetCars().subscribe({next: (res:any) => {
        console.log('Cars:', res);
        this.AllCars=res.data;
       
      }
      
    });
  }
}
