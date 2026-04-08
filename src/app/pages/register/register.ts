import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';   
import { MatButtonModule } from '@angular/material/button'; 
import { RouterModule } from '@angular/router';            

@Component({
  selector: 'app-register',
  standalone:true,
  imports: [
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,     
    MatButtonModule,    
    RouterModule
  ],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {}
