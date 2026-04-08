import { Component } from '@angular/core';
import { BookService } from '../book-service/book-service';
import { Navbar } from "../../navbar/navbar";
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterModule } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-provider-dashboard',
  imports: [MatCardModule, MatButtonModule, RouterModule],
  templateUrl: './provider-dashboard.html',
  styleUrl: './provider-dashboard.css',
})


export class ProviderDashboard {
  constructor(
    private router: Router,
    private cookieService: CookieService
  ) { }
  ngOnInit() {
    const role = this.cookieService.get('role');
    if (role !== 'PROVIDER') {
      this.router.navigate(['/']);
    }
  }
}
