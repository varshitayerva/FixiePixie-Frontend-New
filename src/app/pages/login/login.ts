import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';

import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';   
import { MatButtonModule } from '@angular/material/button'; 

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
  imports: [
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    RouterModule,
    ReactiveFormsModule,
    HttpClientModule
  ]
})
export class Login {

  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit() {

    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    const payload = this.loginForm.value;

    this.http.post('http://localhost:2002/api/users/login', payload)
      .subscribe({
        next: (res: any) => {

          console.log("LOGIN SUCCESS", res);

          const token = res.data.token;
          const role = res.data.role;

          const userId = res.data.userId;
          localStorage.setItem('userId',userId)
          localStorage.setItem('token', token);

          localStorage.setItem('role', role);

          console.log("role"+role)
          if (role === 'ROLE_USER') {
            this.router.navigate(['/customer-dashboard']);
          } else if(role === 'ROLE_ADMIN') {
            console.log("Help")
            this.router.navigate(['/provider-dashboard']);
            console.log("Help")
          }
        },
        error: (err) => {
          console.error("LOGIN ERROR", err);

          if (err.error?.message) {
            alert(err.error.message);
          } else {
            alert("Invalid email or password");
          }
        }
      });
  }
}