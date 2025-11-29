import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from 'src/app/services/api.service';
import { StaticDataService } from 'src/app/services/static-data.service';

@Component({
  selector: 'app-booking-form',
  templateUrl: './booking-form.component.html',
  styleUrls: ['./booking-form.component.css']
})
export class BookingFormComponent implements OnInit {
  @Input() bookingData: any; //Reciving the data from adminBooking Componenet
  @Input() carId: number | null = null;
  bookingForm!: FormGroup;
  AllCars:any
  Bookingtypes:any
  isCompanyEnabled = false;
  isEditMode = false;
  editedItemId: number | null = null;
  showForm = false;

  constructor(private fb: FormBuilder,
     private activeModal: NgbActiveModal,
     private api : ApiService,
    private staticService: StaticDataService
  ) {}

  ngOnInit(): void {
    let carsLoaded = false;
    let carDetailLoaded = false;
console.log("Car Id:",this.carId)
    this.Getcar(() => {
      carsLoaded = true;
      if (!this.carId) this.showForm = true;
      if (carsLoaded && carDetailLoaded) this.showForm = true;
    });

    this.GetBookingType();

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

    if (this.carId) {
      // this.api.GetcarById(this.carId).subscribe(res => {
      //   if (res && res.data && res.data.carModel) {
      //     this.bookingForm.patchValue({ carType: res.data.carModel });
      //   }
      //   carDetailLoaded = true;
      //   if (carsLoaded && carDetailLoaded) this.showForm = true;
      // });
      const car = this.staticService.getCarById(this.carId);

if (car && car.carModel) {
  this.bookingForm.patchValue({ carType: car.carModel });
}

carDetailLoaded = true;
if (carsLoaded && carDetailLoaded) this.showForm = true;


    } else {
      carDetailLoaded = true;
    }

    if (this.bookingData != null) {
      this.editBooking();
    }

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


  editBooking() {
  this.isEditMode = true;
  this.editedItemId = this.bookingData.bookingId;

  this.bookingForm.patchValue({

    
    carType: this.bookingData.cartype,           
    bookingType: this.bookingData.bookingType,  
    phone: this.bookingData.phone_no,

    name: this.bookingData.name,
    email: this.bookingData.email,
    pickupLocation: this.bookingData.pickupLocation,
    pickupDate: this.bookingData.pickupDate,
    pickupTime: this.bookingData.pickupTime .split("T")[1],
    dropLocation: this.bookingData.dropLocation,
    dropDate: this.bookingData.dropdate,
    dropTime: this.bookingData.droptime.split("T")[1],
    bookingDate: this.bookingData.bookingDate,
    addCompany: this.bookingData.addCompany,
    companyName: this.bookingData.companyName,
    companyDescription: this.bookingData.companyDescription,
    CompanyEnabled: this.bookingData.CompanyEnabled,
  });
  console.log("Data",this.bookingForm.value)
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

  // Getcar(callback?: () => void) {
  //   this.api.GetCars().subscribe({
  //     next: (res: any) => {
  //       this.AllCars = res.data;
  //       if (callback) callback();
  //     }
  //   });
  // }

  Getcar(callback?: () => void) {
    this.AllCars = this.staticService.getAllCars();
    if (callback) callback();
  }

  GetBookingType(){
  //    this.api.GetBookingType().subscribe({next: (res:any) => {
  //       console.log('Carstype:', res);
  //       this.Bookingtypes=res.data;
  //     }
  //   });
    this.Bookingtypes=this.staticService.getAllBookingTypes();}
}