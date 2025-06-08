import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-booking-form',
  templateUrl: './booking-form.component.html',
  styleUrls: ['./booking-form.component.css']
})
export class BookingFormComponent implements OnInit {
  bookingForm!: FormGroup;
  carTypes = ['SUV', 'Sedan', 'Hatchback', 'Luxury'];
  bookingTypes = ['One Way', 'Round Trip'];
  isCompanyEnabled = false;
   
  constructor(private fb: FormBuilder,
     private activeModal: NgbActiveModal,
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
      companyDescription: ['']
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

  onSubmit() {
    if (this.bookingForm.valid) {
      console.log(this.bookingForm.value);
    }
  }

   closeModal() {
    this.activeModal.close();
  }
}