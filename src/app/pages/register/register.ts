import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';

import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';   
import { MatButtonModule } from '@angular/material/button'; 
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-register',
  standalone: true,
  templateUrl: './register.html',
  styleUrl: './register.css',
  imports: [
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,        
    RouterModule,
    ReactiveFormsModule
  ]
})
export class Register {

  private snackBar = inject(MatSnackBar);
  registerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      address: ['', Validators.required],
      number: ['', [
        Validators.required,
        Validators.pattern('^[0-9]{10}$') 
      ]],
      role: ['ROLE_USER'] 
    });
  }

  onSubmit() {

    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched(); 
      return;
    }

    const formValue = this.registerForm.value;

    const payload = {
      name: formValue.name,
      email: formValue.email,
      password: formValue.password,
      address: formValue.address,
      number: Number(formValue.number), 
      role: formValue.role
    };

    this.http.post('http://localhost:8081/api/users/register', payload)
      .subscribe({
        next: (res) => {
          console.log("SUCCESS", res);
          this.snackBar.open("Registered successfully", 'Close', {duration: 3000});

          this.router.navigate(['/']);
        },
        error: (err) => {
          console.error("ERROR", err);

          if (err.error?.message) {
            this.snackBar.open(err.error.message, 'Close', {duration: 3000});
          } else {
            this.snackBar.open(err.error.message, 'Close', {duration: 3000});
          }
        }
      });
  }
}