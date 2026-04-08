import { Component } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Navbar } from '../../navbar/navbar';
@Component({
  selector: 'app-booking-history',
  imports: [MatTableModule,MatButtonModule,RouterModule,CommonModule,Navbar],
  templateUrl: './booking-history.html',
  styleUrl: './booking-history.css',
})
export class BookingHistory {
  columns: string[] = ['service', 'date', 'status', 'action'];

bookings = [
  { service: 'Electrician', date: '2026-04-10', status: 'CONFIRMED' },
  { service: 'Plumber', date: '2026-04-12', status: 'PENDING' },
  { service: 'Cleaning', date: '2026-04-15', status: 'CANCELLED' }
];
}
