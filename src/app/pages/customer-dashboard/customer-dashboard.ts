import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Navbar } from '../../navbar/navbar';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterModule, CommonModule, Navbar],
  templateUrl: './customer-dashboard.html',
  styleUrl: './customer-dashboard.css'
})
export class Dashboard implements OnInit {

  services: any[] = [];
  id:any;
  constructor(private http: HttpClient, private cdr: ChangeDetectorRef, private router: Router) { }

  ngOnInit(): void {
    this.getServices();
  }

  goToBooking(service: any) {
    localStorage.setItem('selectedService', JSON.stringify(service));

    this.router.navigate(['/booking']);
  }

  getServices() {
    this.http.get<any[]>('http://localhost:8083/api/services')
      .subscribe({
        next: (res) => {
          this.services = res;
          this.cdr.detectChanges(); 
        },
        error: (err) => {
          
        }
      });
  }

  selectService(service: any) {
    localStorage.setItem('selectedService', JSON.stringify(service));
  }

  getIcon(category: string): string {
    switch (category) {
      case 'ELECTRICAL': return 'electrical_services';
      case 'CLEANING': return 'cleaning_services';
      case 'HOME_SERVICE': return 'home';
      default: return 'build';
    }
  }
}
