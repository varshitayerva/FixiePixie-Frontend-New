import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from "@angular/router";
import { Navbar } from '../../navbar/navbar';
@Component({
  selector: 'app-booking',
  imports: [FormsModule,Navbar],
  templateUrl: './booking.html',
  styleUrl: './booking.css',
})
export class Booking {
  service: any;

  selectedDate: string = '';
  selectedSlot: string = '';

  constructor(private router: Router) {
    const nav = this.router.getCurrentNavigation();
    this.service = nav?.extras?.state?.['service'];
  }

  bookService() {

    const booking = {
      serviceId: this.service.id,
      serviceName: this.service.name,
      price: this.service.price,
      date: this.selectedDate,
      slot: this.selectedSlot,
      status: 'PENDING'
    };

    console.log('Booking Created:', booking);

    // redirect to payment with booking
    this.router.navigate(['/payment'], {
      state: { booking }
    });
  }
}
