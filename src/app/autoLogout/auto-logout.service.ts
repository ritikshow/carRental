import { Injectable, NgZone } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AutoLogoutService {
  private timeout: any;
  private readonly AUTO_LOGOUT_TIME = 1 * 60 * 1000; // 30 mins

  constructor(private router: Router, private ngZone: NgZone) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        // Only activate auto logout inside admin routes
        if (event.url.startsWith('/admin') && localStorage.getItem('jwtToken')) {
          this.initListener();
          this.startTimer();
        } else {
          this.clearTimer();
        }
      }
    });
  }

  private initListener() {
    const events = ['click', 'mousemove', 'keydown', 'scroll', 'touchstart'];
    events.forEach(event =>
      window.addEventListener(event, () => this.resetTimer())
    );
  }

  private startTimer() {
    this.timeout = setTimeout(() => this.logout(), this.AUTO_LOGOUT_TIME);
  }

  private resetTimer() {
    this.clearTimer();
    this.startTimer();
  }

  private clearTimer() {
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
  }

  private logout() {
    localStorage.removeItem('jwtToken');
    this.router.navigate(['/login']);
    alert('Logged out due to 30 minutes of inactivity.');
  }
}
