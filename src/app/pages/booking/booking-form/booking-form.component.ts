import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-booking-form',
  templateUrl: './booking-form.component.html',
  styleUrls: ['./booking-form.component.css']
})
export class BookingFormComponent implements OnInit {
  bookingForm!: FormGroup;
  AllCars:any
  Bookingtype:any
  // carTypes = ['SUV', 'Sedan', 'Hatchback', 'Luxury'];
  // bookingTypes = ['One Way', 'Round Trip'];
  isCompanyEnabled = false;
   
  constructor(private fb: FormBuilder,
     private activeModal: NgbActiveModal,
     private api : ApiService
  ) {}

  ngOnInit(): void {
    this.bookingForm = this.fb.group({
      carType: [''],
      bookingType: [''],
      phone: [''],
      name: [''],
      email: [''],
      pickupLocation: [''],
      pickupDate: [''],
      pickupTime: [''],
      dropLocation: [''],
      dropDate: [''],
      dropTime: [''],
      bookingDate: [''],
      addCompany: [false],
      companyName: [''],
      companyDescription: [''],
        CompanyEnabled: [false],
    });

    // Disable company fields by default
    this.bookingForm.get('companyName')?.disable();
    this.bookingForm.get('companyDescription')?.disable();

    // Watch checkbox
    this.bookingForm.get('addCompany')?.valueChanges.subscribe(() => {
      this.toggleCompanyInfo();
    });
  }

  toggleCompanyInfo() {
    this.isCompanyEnabled = this.bookingForm.get('addCompany')?.value;
    const companyNameCtrl = this.bookingForm.get('companyName');
    const companyDescCtrl = this.bookingForm.get('companyDescription');

    if (this.isCompanyEnabled) {
      companyNameCtrl?.enable();
      companyDescCtrl?.enable();
    } else {
      companyNameCtrl?.disable();
      companyDescCtrl?.disable();
    }
  }

  onSubmit(): void {
    debugger;
    if (this.bookingForm.valid) {
      console.log('Booking Data:', this.bookingForm.value);
       const formDataRaw = this.bookingForm.value;

    const formData = new FormData();
    formData.append('Name', formDataRaw.name);
    formData.append('Email', formDataRaw.email);
    formData.append('cartype', formDataRaw.carType);
     formData.append('Phone_no', formDataRaw.phone);
    formData.append('BookingType', formDataRaw.bookingType);
    formData.append('PickupLocation', formDataRaw.pickupLocation);
    formData.append('PickupDate', formDataRaw.pickupDate);
    formData.append('PickupTime',  formDataRaw.pickupTime);
    formData.append('DropLocation', formDataRaw.dropLocation);
    formData.append('Dropdate',formDataRaw.dropDate);
    formData.append('Droptime',  formDataRaw.dropTime);
    formData.append('BookingDate',formDataRaw.bookingDate);
    formData.append('CompanyEnabled', formDataRaw.CompanyEnabled);
    formData.append('CompanyName', formDataRaw.companyName);
    formData.append('CompanyDescription', formDataRaw.companyDescription);

      this.api.CreateBooking(formData).subscribe({next:(res:any)=>{
        console.log("Booking:",res)
          this.bookingForm.reset();
      }})
      // send to API
    }
  }
   closeModal() {
    this.activeModal.close();
  }

   Getcar(){
    debugger;
      this.api.GetCars().subscribe({next: (res:any) => {
        console.log('Carstype:', res);
        this.AllCars=res.data;
      }
    });
  }

  GetBookingType(){
     this.api.GetBookingType().subscribe({next: (res:any) => {
        console.log('Carstype:', res);
        this.Bookingtype=res.data;
      }
    });
  }
}