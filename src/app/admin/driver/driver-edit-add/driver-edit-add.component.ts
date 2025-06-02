import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-driver-edit-add',
  templateUrl: './driver-edit-add.component.html',
  styleUrls: ['./driver-edit-add.component.css']
})
export class DriverEditAddComponent implements OnInit {

    DriverForm:FormGroup =new FormGroup({});


   constructor(
    private formBuilder: FormBuilder,
   
  ) { }

  ngOnInit(): void {
    this.DriverForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      age: ['', Validators.required],
      address: ['']
    });
  }

Submit(){
    if(this.DriverForm.valid){
      console.log(this.DriverForm.value)
    }
  }
  
 
}
