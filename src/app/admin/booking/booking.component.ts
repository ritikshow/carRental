import { Component, OnInit, TemplateRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {

  searchTerm = '';
  currentPage = 1;
  pageSize = 5;
  Booking :any[]=[]
  viewData:any;

  constructor(
    private api:ApiService,
    private modalService: NgbModal
  ){}
   ngOnInit(): void {
    this.GetAllBooking();
  }

  get filteredData() {
    const term = this.searchTerm.toLowerCase();
    return this.Booking.filter(item =>
      item.name.toLowerCase().includes(term) ||
      item.phone_no.toLowerCase().includes(term) ||
      item.bookingId.toString().includes(term)
    );
  }

  get paginatedData() {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.filteredData.slice(start, start + this.pageSize);
  }
  previousPage() {
    if (this.currentPage > 1) this.currentPage--;
  }
  nextPage() {
    if ((this.currentPage * this.pageSize) < this.filteredData.length) this.currentPage++;
  }

  editItem(item: any) {
    console.log('Edit', item);
  }

  deleteItem(item: any) {
    if (confirm(`Are you sure to delete "${item.name}"?`)) {
      this.Booking = this.Booking.filter(x => x !== item);
    }
  }
  
  GetAllBooking(){

    this.api.GetAllBooking().subscribe({next:(res:any)=>{
         this.Booking=res.data;
    }})
  }

 ViewItem(item: any,content:any){
  this.viewData=item
 this.modalService.open(content, { backdrop: 'static', windowClass: 'main_add_popup', keyboard: true, centered: true, })
}
   


  createBookingType() {
    console.log('Open Create Booking Modal');
  }
}