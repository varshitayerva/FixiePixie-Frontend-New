import { Component, OnInit, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common'; // Import this
import { CookieService } from 'ngx-cookie-service';
import { Router, RouterModule } from "@angular/router";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar implements OnInit {
  role: string | null = null;
  private platformId = inject(PLATFORM_ID);

  constructor(
    private router: Router,
    private cookieService: CookieService
  ) {}

  ngOnInit(): void {
    // Run once on load
    this.updateRole();
  }

  // Instead of ngDoCheck, use a method or a getter
  updateRole() {
    if (isPlatformBrowser(this.platformId)) {
      this.role = localStorage.getItem('role');
    }
  }

  logout() {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('role');
      localStorage.removeItem('token');
      localStorage.removeItem('userId');
      this.role = null;
      this.router.navigate(['/login']);
    }
  }
}