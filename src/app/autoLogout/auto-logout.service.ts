import { Injectable, NgZone } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AutoLogoutService {
  private timeout: any;
  private readonly AUTO_LOGOUT_TIME = 1 * 60 * 1000; // 5 minutes (adjust as needed)
  private listenersInitialized = false;

  constructor(private router: Router, private ngZone: NgZone) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const isAdminRoute = event.urlAfterRedirects.startsWith('/admin');
        const hasToken = !!localStorage.getItem('jwtToken');

        if (isAdminRoute && hasToken) {
          if (!this.listenersInitialized) {
            this.initListeners();
            this.listenersInitialized = true;
          }
          this.resetTimer();
        } else {
          this.clearTimer();
        }
      }
    });
  }

  private initListeners(): void {
    const events = ['click', 'mousemove', 'keydown', 'scroll', 'touchstart'];

    events.forEach(event =>
      window.addEventListener(event, () => this.resetTimer())
    );
  }

  private startTimer(): void {
    this.timeout = this.ngZone.runOutsideAngular(() =>
      setTimeout(() => this.ngZone.run(() => this.logout()), this.AUTO_LOGOUT_TIME)
    );
  }

  private resetTimer(): void {
    this.clearTimer();
    this.startTimer();
  }

  private clearTimer(): void {
    if (this.timeout) {
      clearTimeout(this.timeout);
      this.timeout = null;
    }
  }

  private logout(): void {
    localStorage.removeItem('jwtToken');
    alert('You have been logged out due to inactivity.');
    this.router.navigate(['/login']);
  }
}
