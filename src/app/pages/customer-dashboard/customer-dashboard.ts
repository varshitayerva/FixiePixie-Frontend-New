import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Navbar } from '../../navbar/navbar';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-dashboard',
  standalone:true,
  imports: [MatCardModule,MatButtonModule,RouterModule],
  templateUrl: './customer-dashboard.html',
  styleUrl: './customer-dashboard.css',
})
export class Dashboard {
  constructor(
    private router: Router,
    private cookieService: CookieService
  ) { }
  ngOnInit() {
    const role = this.cookieService.get('role');
    if (role !== 'CUSTOMER') {
      this.router.navigate(['/']);
    }
  }
}
