import { Component, OnInit, Inject, PLATFORM_ID, inject } from '@angular/core';
import { Navbar } from '../../navbar/navbar';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [Navbar, CommonModule],
  templateUrl: './payment.html',
  styleUrl: './payment.css',
})
export class PaymentPage implements OnInit {
  private snackBar = inject(MatSnackBar);
  bookingDetails: any;
  isProcessing: boolean = false;

  constructor(
    private router: Router,
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.bookingDetails = history.state;
      console.log('Received Booking Details:', this.bookingDetails);
    }
  }

  onPaymentHover() {
    if (this.isProcessing) return;
    this.isProcessing = true;

    const paymentData = {
      bookingId: this.bookingDetails.bookingId, 
      amount: this.bookingDetails.price,
      paymentMethod: 'UPI', 
      status:'SUCCESS'
    };

    this.http.post('http://localhost:8081/payment/process', paymentData)
      .subscribe({
        next: (res) => {
          console.log('Payment stored successfully:', res);
          
          setTimeout(() => {
            this.snackBar.open("Payment Successful! ✅ Booking Confirmed.", 'Close', {duration: 3000});
            this.router.navigate(['/customer-dashboard']);
          }, 1500);
        },
        error: (err) => {
          this.isProcessing = false;
          console.error('Payment Error:', err);
          this.snackBar.open("Payment Failed. Please try again.", 'Close', {duration: 3000});
        }
      });
  }
}