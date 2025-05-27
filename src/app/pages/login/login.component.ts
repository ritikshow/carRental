import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

 constructor(
  private api: ApiService,
  private router: Router
) {}
  ngOnInit(): void {
    
  }

  onSubmit(username: string, password: string): void {
  username = username.trim();
  password = password.trim();

  if (!username || !password) {
    alert('Please enter both username and password.');
    return;
  }

  const loginData = {
    username: username,
    password: password
  };

  debugger;
  this.api.login(loginData).subscribe({
    next: (response: any) => {
      console.log('Login success:', response);
      // Save token, redirect, etc.
      localStorage.setItem('jwtToken', response.token); // in login component/service

      //  const token = response.token;
      //   localStorage.setItem('jwtToken', token); 
        this.router.navigate(['/admin/dashboard']);

    },
    
  });
}

}
