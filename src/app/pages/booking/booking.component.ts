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
  Bookingtypes:any
  //bookingTypes = ['One Way', 'Round Trip'];
  //carTypes = ['SUV', 'Sedan', 'Hatchback', 'Luxury'];

  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    
   
  ) {}

  ngOnInit(): void {

    this.bookingForm = this.fb.group({
      cartype: ['', Validators.required],
      BookingType: ['', Validators.required],
      Phone_no: ['', Validators.required, ],
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

     this.BookingType()
     this.Getcar();
    
    
  }

  onSubmit(): void {
    if (this.bookingForm.valid) {
      console.log('Booking Data:', this.bookingForm.value);
       const formDataRaw = this.bookingForm.value;

    const formData = new FormData();
    formData.append('Name', formDataRaw.Name);
    formData.append('Email', formDataRaw.Email);
    formData.append('cartype', formDataRaw.cartype);
     formData.append('Phone_no', formDataRaw.Phone_no);
    formData.append('BookingType', formDataRaw.BookingType);
    formData.append('PickupLocation', formDataRaw.PickupLocation);
    formData.append('PickupDate', formDataRaw.PickupDate);
    formData.append('PickupTime',  formDataRaw.PickupTime);
    formData.append('DropLocation', formDataRaw.DropLocation);
    formData.append('Dropdate',formDataRaw.Dropdate);
    formData.append('Droptime',  formDataRaw.Droptime);
    formData.append('BookingDate',formDataRaw.BookingDate);
    formData.append('CompanyEnabled', formDataRaw.CompanyEnabled);
    formData.append('CompanyName', formDataRaw.CompanyName);
    formData.append('CompanyDescription', formDataRaw.CompanyDescription);

      this.api.CreateBooking(formData).subscribe({next:(res:any)=>{
        console.log("Booking:",res)
          this.bookingForm.reset();
      }});
      // send to API
    }
  }


  
  Getcar(){
    debugger;
      this.api.GetCars().subscribe({next: (res:any) => {
        console.log('Carstype:', res);
        this.AllCars=res.data;
      }
    });
  }

  BookingType(){

     this.api.GetBookingType().subscribe({next: (res:any) => {
        console.log('Carstype:', res);
        this.Bookingtypes=res.data;
      }
    });
  }
}