import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Navbar } from '../../navbar/navbar';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, RouterModule, Navbar],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export class Profile {
  user = {
    name: 'Jane Doe',
    role: 'Customer',
    email: 'jane.doe@example.com',
    phone: '+91 98765 43210',
    location: 'Bangalore, India',
    joined: 'March 2024',
    about: 'I love using FixiePixie for booking trusted home services quickly and reliably.',
  };

  stats = [
    { label: 'Completed Bookings', value: '18' },
    { label: 'Upcoming Services', value: '2' },
    { label: 'Saved Addresses', value: '3' },
  ];
}
