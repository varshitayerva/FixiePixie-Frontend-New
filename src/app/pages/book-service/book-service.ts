import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-book-service',
  imports: [MatCardModule,MatFormFieldModule,MatInputModule,MatButtonModule,MatSelectModule,MatDatepickerModule,MatNativeDateModule,RouterModule],
  templateUrl: './book-service.html',
  styleUrl: './book-service.css',
})
export class BookService {}
