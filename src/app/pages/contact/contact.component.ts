import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule } from '@angular/forms';
import { from } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';


@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  ContactForm:FormGroup =new FormGroup({});

  constructor(
     private formBuilder: FormBuilder,
     private api :ApiService
  )
  {}
    
  ngOnInit(): void {
    this.ContactForm=this.formBuilder.group({
      firstName:[''],
      lastName:[''],
      email:[''],
      phone:[''],
      location:[''],
      city:[''],
      region:[''],
      postalCode:[''],
      country:[''],
      message:['']
    });
  }

  onSubmit() {
    debugger;
    console.log("Data",this.ContactForm.value)
      const form = this.ContactForm.value;

    const obj = {
      First: form.first,
      lastName: form.lastName,
      email: form.email,
      phone: form.phone,
      addresses: [
        {
          location: form.location,
          city: form.city,
          region: form.region,
          postalCode: form.postalCode,
          country: form.country
        }
      ],
      isDeleted: false
    };
       this.api.CreateContact(obj).subscribe({
      next: (res) => {
        alert("Contact submitted successfully!");
        this.ContactForm.reset();
      }
    });
    }
}

