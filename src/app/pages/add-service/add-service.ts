import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Navbar } from '../../navbar/navbar';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSnackBarModule } from '@angular/material/snack-bar';
@Component({
  selector: 'app-add-service',
  standalone: true,
  imports: [FormsModule, Navbar,MatSnackBarModule],
  templateUrl: './add-service.html',
  styleUrl: './add-service.css',
})
export class AddService implements OnInit {
  private snackBar = inject(MatSnackBar);
  serviceName: string = '';
  price: number = 0;
  description: string = '';
  category: string = '';

  userId!: string;

  constructor(
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.userId = localStorage.getItem("userId") || '';
  }

  
  addService() {

    if (!this.serviceName || !this.price || !this.description || !this.category) {
      this.snackBar.open('Please fill all fields', 'Close', {duration: 3000});
      return;
    }

    const payload = {
      serviceName: this.serviceName,   
      price: this.price,
      description: this.description,
      category: this.category,
      providerId: this.userId 
    };

    this.http.post('http://localhost:8081/api/services', payload)
      .subscribe({
        next: (res) => {
          console.log("SERVICE ADDED", res);
          this.snackBar.open('Service Added Successfully ✅', 'Close', {duration: 3000});

          this.router.navigate(['/provider-dashboard']);
        },
        error: (err) => {
          console.error("ERROR", err);

          if (err.error?.message) {
            this.snackBar.open(err.error.message, 'Close', {duration: 3000});
          } else {
            this.snackBar.open("Failed to add service", 'Close', {duration: 3000});
          }
        }
      });
  }
}