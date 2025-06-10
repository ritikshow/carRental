import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent implements OnInit {
 searchTerm = '';
  currentPage = 1;
  pageSize = 5;
 AllCars: any[] = [];
  carForm!: FormGroup;
  ViewData:any;
  isSubmitted = false;
  path: string = 'https://rirajtik-001-site1.ktempurl.com/api';
  BaseUrl: string = '';

  selectedFile: File | null = null;
  previewUrl: string | ArrayBuffer | null = null;

  constructor(
    private modalService: NgbModal,
    private fb: FormBuilder,
    private http: HttpClient,
    private api: ApiService
  ) {}

  ngOnInit(): void {
    this.BaseUrl = this.path.replace(/^(.*:\/\/[^\/]+)\/.*/, '$1');
    this.Getcar();
    this.carForm = this.fb.group({
      carName: ['', Validators.required],
      carModel: ['', Validators.required],
      description: ['']
    });
  }




  OpenCarForm(content: any) {
    this.carForm.reset();
    this.isSubmitted = false;
    this.previewUrl = null;
    this.selectedFile = null;

    this.modalService.open(content, {
      ariaLabelledBy: 'modal-basic-title',
      keyboard: false,
      backdrop: 'static',
      windowClass: 'main_add_popup',
      centered: true
    }).result.then(() => {}, () => {});
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files?.[0] ?? null;

    if (this.selectedFile) {
      const reader = new FileReader();
      reader.onload = () => {
        this.previewUrl = reader.result;
      };
      reader.readAsDataURL(this.selectedFile);
    } else {
      this.previewUrl = null;
    }
  }

 ViewItem(item:any,content:any){
  const car = item;

      if (car) {
        if (car.imagePath && car.imagePath !== 'null') {
          const match = car.imagePath.match(/Uploads[\\/].*/);
          const relativePath = match ? match[0].replace(/\\/g, '/') : '';
          car.imagePath = `${this.BaseUrl}/${relativePath}`;
        } else {
          car.imagePath = 'assets/cars/default.jpg'; // fallback image
        }

        this.ViewData = car; // You can use this.Car instead of this.AllCars if it's just one
      } else {
        this.ViewData = null;
      }

 console.log(this.ViewData)
 this.modalService.open(content,{ backdrop: 'static', windowClass: 'main_add_popup', keyboard: true, centered: true, })
 }

 closeModal(){
  this.modalService.dismissAll();

 }

   editItem(item: any) {
    console.log('Edit', item);
  }

  deleteItem(item: any) {
        
  }

  get filteredData() {
  const term = this.searchTerm.toLowerCase();
  return this.AllCars.filter(item =>
    item.carId.toString().toLowerCase().includes(term) ||  // Fixed line
    item.carModel.toLowerCase().includes(term) ||
    item.carName.toLowerCase().includes(term)
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



  onSubmit(): void {
    this.isSubmitted = true;
    if (this.carForm.invalid) return;

    const formData = new FormData();
    formData.append('CarName', this.carForm.get('carName')?.value);
    formData.append('CarModel', this.carForm.get('carModel')?.value);
    formData.append('Description', this.carForm.get('description')?.value || '');
    if (this.selectedFile) {
      formData.append('ImageFile', this.selectedFile);
    }

    this.api.CreateCar(formData).subscribe({
      next: (res: any) => {
        alert('Car added successfully!');
        this.modalService.dismissAll(); // close modal on success
        this.carForm.reset();
        this.isSubmitted = false;
        this.previewUrl = null;
        this.selectedFile = null;
      },
      error: (err) => {
        alert('Failed to add car. Please try again.');
        console.error(err);
      }
    });
  }

  Getcar(){
  
      this.api.GetCars().subscribe({next: (res:any) => {
        console.log('Carstype:', res);
        debugger
        this.AllCars= res.data || [];
       console.log("Data",this.AllCars)
      }
    });
  }
  
}
