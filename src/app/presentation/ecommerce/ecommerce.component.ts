import { Component, ViewChild, inject } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Router } from '@angular/router';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-main',
  templateUrl: './ecommerce.component.html',
  styleUrls: ['./ecommerce.component.scss']
})
export class EcommerceComponent {
  @ViewChild('drawer') drawer!: MatSidenav;

  toggleDrawer() {
    this.drawer.toggle();
  }
  private breakpointObserver = inject(BreakpointObserver);
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  userName: string | null;

  constructor(private router: Router) {
    this.userName ='';
    this.setUserName();
  }
  setUserName(){
    this.userName = localStorage.getItem('username') != 'undefined' ? localStorage.getItem('username') : null;
  }

  logout() {
    localStorage.removeItem('username');
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    this.router.navigate(['/']);
    this.setUserName();
  }
}
