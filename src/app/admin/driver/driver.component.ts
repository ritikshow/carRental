import { Component, OnInit,ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DriverEditAddComponent } from './driver-edit-add/driver-edit-add.component';
import { ApiService } from 'src/app/services/api.service';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';

@Component({
  selector: 'app-driver',
  templateUrl: './driver.component.html',
  styleUrls: ['./driver.component.css']
})
export class DriverComponent implements OnInit {

  displayedColumns: string[] = ['driverID', 'name', 'phone', 'gmail','action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

ngOnInit(): void {
    this.getAllDriver();
  }

  constructor(
    private _dialog: MatDialog,
    private api: ApiService
  ) { }
  

  OpenAddEditEmpForm() {
  const dialogRef = this._dialog.open(DriverEditAddComponent);
    dialogRef.afterClosed().subscribe({
      next:(val)=>{
        if(val){
          this.getAllDriver();
        }
      }
    })
  }

  
  OpeneditformEmpForm(data:any) {
  this._dialog.open(DriverEditAddComponent,{
    data
  });
  
  }


 applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getAllDriver() {
    this.api.GetAllDriver().subscribe({
      next: (Data) => {
      this.dataSource = new MatTableDataSource(Data.data);
      this.dataSource.sort=this.sort;
      this.dataSource.paginator= this.paginator;
      }
    });
  }

  DeleteDriverbyid(id:number){

    this.api.DeleteDriverbyId(id).subscribe({next:(res:any)=>{
alert(res.message)
     
    }
    });
  }
}
