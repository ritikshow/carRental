import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DriverEditAddComponent } from './driver-edit-add/driver-edit-add.component';

@Component({
  selector: 'app-driver',
  templateUrl: './driver.component.html',
  styleUrls: ['./driver.component.css']
})
export class DriverComponent {


  
 constructor(private _dialog :MatDialog){}

 OpenAddEditEmpForm(){
  this._dialog.open(DriverEditAddComponent)
 }
}
