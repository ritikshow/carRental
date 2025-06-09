import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-master-booking-type',
  templateUrl: './master-booking-type.component.html',
  styleUrls: ['./master-booking-type.component.css']
})
export class MasterBookingTypeComponent implements OnInit {

  searchTerm = '';
  currentPage = 1;
  pageSize = 12;
  bookingTypeForm!: FormGroup;
   bookingTypes: any[] = [];
   
  constructor(
    private api: ApiService,
    private fb: FormBuilder,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.getallBookingType();
    this.bookingTypeForm = this.fb.group({
      type: ['', Validators.required]
    });
  }

  get filteredData() {
    const term = this.searchTerm.toLowerCase();
    return this.bookingTypes.filter(item =>
      item.type.toLowerCase().includes(term) ||
      item.bookingTypeId.toString().includes(term)
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
    // Optionally populate the form here and open modal for editing
  }

  deleteBookingType(item: any) {
       this.api.DeleteById(item.bookingTypeId).subscribe({next:(res:any)=>{
          
      this.getallBookingType()
       }})
  }

  createBookingType(content: TemplateRef<any>) {
    this.bookingTypeForm.reset();
    this.modalService.open(content, { backdrop: 'static', windowClass: 'main_add_popup', keyboard: true, centered: true });
  }
   
  getallBookingType(){
    this.api.GetBookingType().subscribe({next:(res:any)=>{
      this.bookingTypes = res.data || [];
    }})
  }


  onSubmit(): void {
    debugger
    if (this.bookingTypeForm.valid) {
      const formDataRaw = this.bookingTypeForm.value;
      const formData = new FormData();
      formData.append('type', this.bookingTypeForm.get('type')?.value);
      console.log('Form Submitted:', formData);
      this.api.CreateBookingType(formData).subscribe({
        next: (res: any) => {
          console.log("Booking:", res)
          this.bookingTypeForm.reset();
        }
      });
      this.close();
      this.getallBookingType()
    }
  }

  close(){
    this.modalService.dismissAll();
  }

}
