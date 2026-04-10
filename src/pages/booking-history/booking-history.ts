import { Component, OnInit, inject, PLATFORM_ID, ChangeDetectorRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { Navbar } from '../../navbar/navbar';

export interface BookingResponseDTO {
  id: number;
  date: string;
  serviceId: number;
  status: string;
  userId: number;
  timeSlot: string;

  userName: string,
  userNumber:string
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
  // Matches your @GetMapping("/{userId}") and @DeleteMapping("/{id}") on port 2003
  private readonly BOOKING_API = 'http://localhost:8081/bookings';

  // Add 'userName' and 'userNumber' to the array
displayedColumns: string[] = ['userName', 'userNumber', 'serviceId', 'date', 'time_slot', 'status', 'action'];
  bookings: BookingResponseDTO[] = [];
  loading = false;
  error: string | null = null;

  private userId: string | null = null;

  readonly serviceMap: Record<number, { name: string; icon: string }> = {
    1: { name: 'Electrician',  icon: 'electrical_services' },
    2: { name: 'Plumber',      icon: 'plumbing' },
    3: { name: 'Cleaning',     icon: 'cleaning_services' },
    4: { name: 'Carpenter',    icon: 'carpenter' },
    5: { name: 'Painter',      icon: 'format_paint' },
  };

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.userId = localStorage.getItem('userId');
      if (this.userId) {
        this.fetchUserBookings();
      } else {
        this.error = 'User not logged in.';
      }
    }
  }

  // GET /bookings/{userId}
fetchUserBookings(): void {
    this.loading = true;
    this.http.get<BookingResponseDTO[]>(`${this.BOOKING_API}/${this.userId}`)
      .subscribe({
        next: (data) => {
          this.bookings = data;
          this.loading = false;
          this.cdr.detectChanges(); // 2. Manually trigger a check
        },
        error: (err) => {
          this.loading = false;
          this.cdr.detectChanges(); // 3. Also here to clear the loading state
        }
      });
  }
  // DELETE /bookings/{id}  — shown only for PENDING_PAYMENT rows (matches your backend guard)
  cancelBooking(id: number): void {
    if (!confirm('Are you sure you want to cancel this booking?')) return;

    this.http.delete(`${this.BOOKING_API}/${id}`, { responseType: 'text' })
      .subscribe({
        next: () => this.fetchUserBookings(),
        error: (err) => console.error('Cancel failed:', err)
      });
  }

  serviceName(serviceId: number): string {
    return this.serviceMap[serviceId]?.name ?? `Service #${serviceId}`;
  }

  serviceIcon(serviceId: number): string {
    return this.serviceMap[serviceId]?.icon ?? 'build';
  }

  statusClass(status: string): string {
    const map: Record<string, string> = {
      CONFIRMED:       'confirmed',
      PENDING:         'pending',
      PENDING_PAYMENT: 'pending-payment',
      CANCELLED:       'cancelled',
    };
    return map[status?.toUpperCase()] ?? 'pending';
  }

  statusLabel(status: string): string {
    const map: Record<string, string> = {
      PENDING_PAYMENT: 'Pending Payment',
      CONFIRMED:       'Confirmed',
      PENDING:         'Pending',
      CANCELLED:       'Cancelled',
    };
    return map[status?.toUpperCase()] ?? status;
  }
}