import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.css']
})

export class AdminHeaderComponent  implements OnInit   {
  Name:any
constructor(private router: Router) {}
  ngOnInit(): void {
    this.Name=sessionStorage.getItem('Name');
  }


  logout() {
    sessionStorage.clear();
    this.router.navigate(['/login']);
  }
}
