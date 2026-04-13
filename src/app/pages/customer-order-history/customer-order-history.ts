import { Component, OnInit, inject, PLATFORM_ID, ChangeDetectorRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { Navbar } from '../../navbar/navbar';

import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { ReviewDialog } from '../../review-dialog/review-dialog';

export interface CustomerBookingDTO {
  id: number;
  userName: string;
  serviceName: string;
  serviceId: number;
  date: string;
  status: string;
  timeSlot: string;


  rating?: number,
  comment?: string
}

@Component({
  selector: 'app-customer-order-history',
  standalone: true,
  imports: [CommonModule, MatTableModule,
    MatTableModule,
    Navbar,
    MatSnackBarModule,
    MatDialogModule,
    FormsModule],
  templateUrl: './customer-order-history.html',
  styleUrl: './customer-order-history.css',
})
export class CustomerOrderHistory implements OnInit {

  private http = inject(HttpClient);
  private platformId = inject(PLATFORM_ID);
  private cdr = inject(ChangeDetectorRef);
  private snackBar = inject(MatSnackBar);


  private readonly API = 'http://localhost:8081/bookings';

  bookings: CustomerBookingDTO[] = [];
  displayedColumns = ['serviceName', 'date', 'status', 'action'];

  loading = false;
  error: string | null = null;

  private userId: string | null = null;
  private dialog = inject(MatDialog);

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.userId = localStorage.getItem('userId');

      if (this.userId) {
        this.fetchBookings();
      } else {
        this.error = 'User not logged in';
      }
    }
  }

  fetchBookings() {
    this.loading = true;

    this.http.get<CustomerBookingDTO[]>(`${this.API}/${this.userId}`)
      .subscribe({
        next: (res) => {
  this.bookings = res || [];
  this.bookings.forEach(b => {
    const key = `review_${this.userId}_${b.serviceId}`;
    const saved = localStorage.getItem(key);

    if (saved) {
      const review = JSON.parse(saved);
      b.rating = review.rating;
      b.comment = review.comment;
    }
  });

  this.loading = false;
  this.cdr.detectChanges();
},
        error: (err) => {
          console.error(err);
          this.error = "Failed to load bookings";
          this.loading = false;
          this.cdr.detectChanges();
        }
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

  openReview(booking: CustomerBookingDTO) {

    const dialogRef = this.dialog.open(ReviewDialog, {
      width: '400px',
      data: booking
    });

    dialogRef.afterClosed().subscribe((result: { rating: any; comment: any; }) => {
      if (!result) return;

      const payload = {
        userId: this.userId,
        providerServiceId: booking.serviceId,
        rating: result.rating,
        comment: result.comment
      };

      this.http.post<any>('http://localhost:8081/review/give', payload)
        .subscribe({
          next: (res) => {

            booking.rating = res.rating;
            booking.comment = res.comment;

            const key = `review_${this.userId}_${booking.serviceId}`;
            localStorage.setItem(key, JSON.stringify({
              rating: res.rating,
              comment: res.comment
            }));

            this.snackBar.open('Review submitted ✅', 'Close', {
              duration: 3000
            });
          },
          error: () => {
            this.snackBar.open('Failed ❌', 'Close', {
              duration: 3000
            });
          }
        });

    });
  }
}