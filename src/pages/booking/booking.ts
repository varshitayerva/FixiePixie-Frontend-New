import { Component, OnInit, Inject, PLATFORM_ID, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Navbar } from '../../navbar/navbar';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http'; // 1. Add this
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [FormsModule, Navbar, CommonModule], // 2. Add HttpClientModule
  templateUrl: './booking.html',
  styleUrls: ['./booking.css']
})
export class BookingPage implements OnInit {

  private snackBar = inject(MatSnackBar);
  selectedService: any;
  bookingDate: string = '';
  selectedSlot: string = '';
  slots = ['09:00 AM', '12:00 PM', '03:00 PM', '06:00 PM'];

  // Mock User ID - In a real app, get this from your Auth/Login service
  currentUserId : number = 0;

  constructor(
    private router: Router, 
    private http: HttpClient, // 3. Inject HttpClient
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.currentUserId = Number(localStorage.getItem("userId")); 
      const data = localStorage.getItem('selectedService');
      if (data) this.selectedService = JSON.parse(data);
    }

  }

  proceedToPayment() {
    // 4. Prepare the DTO for your Backend
    const bookingRequestDTO = {
      userId: this.currentUserId,
      serviceId: this.selectedService.id, // Ensure this exists in your catalog data
      date: this.bookingDate,
      status: 'PENDING_PAYMENT',
      timeSlot: this.selectedSlot
    };
    console.log("DTO:", bookingRequestDTO);

    // 5. Call Backend
    this.http.post<any>('http://localhost:8081/bookings', bookingRequestDTO)
      .subscribe({
        next: (response) => {
          console.log("Aaaya")
          console.log('Booking saved in DB:', response);
          
          
          // 6. Redirect to payment with the ID returned from DB
          const finalBooking = {
            ...this.selectedService,
            bookingId: response.id, 
            date: this.bookingDate,
            slot: this.selectedSlot
          };

          console.log("Sid",finalBooking);
          
          
          this.router.navigate(['/payment'], { state: finalBooking });
        },
        error: (err) => {
          this.snackBar.open("Could not initiate booking. Please try again.", 'Close', {duration: 3000});
        }
      });
  }

  // Helper to format time for Spring Boot LocalDateTime
  getSlotTime(slot: string): string {
    if (slot.includes('09:00 AM')) return '09:00:00';
    if (slot.includes('12:00 PM')) return '12:00:00';
    if (slot.includes('03:00 PM')) return '15:00:00';
    if (slot.includes('06:00 PM')) return '18:00:00';
    return '00:00:00';
  }
}