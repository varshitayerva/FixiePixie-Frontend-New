import { Component } from '@angular/core';
import { Navbar } from '../../navbar/navbar';

@Component({
  selector: 'app-payment',
  imports: [Navbar],
  standalone:true,
  templateUrl: './payment.html',
  styleUrl: './payment.css',
})
export class Payment {}
