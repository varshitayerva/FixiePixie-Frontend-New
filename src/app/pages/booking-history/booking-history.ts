import { Component, OnInit, inject, PLATFORM_ID, ChangeDetectorRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { Navbar } from '../../navbar/navbar';

export interface BookingResponseDTO {
  id: number;
  userId: number;
  serviceId: number;
  date: string;
  status: string;
  timeSlot: string;
  serviceName: string;      
  customerName: string;     
  customerNumber: string;   
  customerAddress: string;  
}

export interface ReviewDTO {
  id: number;
  userName: string;
  rating: number;
  comment: string;
  providerServiceId: number;
}


@Component({
  selector: 'app-booking-history',
  standalone: true,
  imports: [MatTableModule, MatButtonModule, RouterModule, CommonModule, Navbar],
  templateUrl: './booking-history.html',
  styleUrl: './booking-history.css',
})
export class BookingHistory implements OnInit {
  private http = inject(HttpClient);
  private platformId = inject(PLATFORM_ID);
  private cdr = inject(ChangeDetectorRef);

  private readonly BOOKING_API = 'http://localhost:8081/bookings/provider-view';
  private readonly REVIEW_API = 'http://localhost:8081/review/provider-services';
  displayedColumns: string[] = ['customerName', 'serviceName', 'date', 'rating', 'status', 'action'];
  bookings: BookingResponseDTO[] = [];
  loading = false;
  error: string | null = null;

  ratingsMap: Map<number, number> = new Map();

  private providerId: string | null = null;

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.providerId = localStorage.getItem('userId'); 
      if (this.providerId) {
        this.fetchProviderBookings();
      } else {
        this.error = 'Provider not logged in.';
      }
    }
  }

fetchProviderBookings(): void {
  this.loading = true;
  this.http.get<BookingResponseDTO[]>(`${this.BOOKING_API}/${this.providerId}`)
    .subscribe({
      next: (data) => {
        this.bookings = data || [];

        if (this.bookings.length > 0) {
          this.fetchRatings(); 
        }

        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Fetch failed:', err);
        this.loading = false;
        this.error = "Could not load bookings.";
        this.cdr.detectChanges();
      }
    });
}
  cancelBooking(id: number): void {
    if (!confirm('Are you sure you want to cancel this customer booking?')) return;

    this.http.delete(`http://localhost:8081/bookings/${id}`, { responseType: 'text' })
      .subscribe({
        next: () => this.fetchProviderBookings(),
        error: (err) => console.error('Cancel failed:', err)
      });
  }

  statusClass(status: string): string {
    const map: Record<string, string> = {
      CONFIRMED: 'confirmed',
      PENDING_PAYMENT: 'pending-payment',
      CANCELLED: 'cancelled',
    };
    return map[status?.toUpperCase()] ?? 'pending';
  }

  statusLabel(status: string): string {
    return status?.replace('_', ' ') || status;
  }

  fetchRatings(): void {
    const ids = [...new Set(this.bookings.map(b => b.serviceId))];

    this.http.post<ReviewDTO[]>(this.REVIEW_API, ids).subscribe(reviews => {
      reviews.forEach(r => {
        this.ratingsMap.set(r.providerServiceId, r.rating);
      });
      this.cdr.detectChanges();
    });
  }
  getRating(serviceId: number): number | null {
    return this.ratingsMap.get(serviceId) || null;
  }
}