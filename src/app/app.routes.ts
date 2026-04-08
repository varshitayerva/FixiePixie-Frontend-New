import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { Register } from './pages/register/register';
import { Dashboard } from './pages/dashboard/dashboard';
import { BookService } from './pages/book-service/book-service';
import { BookingHistory } from './pages/booking-history/booking-history';

export const routes: Routes = [
    {
        path:'', component:Login
    },
    {
        path:'register', component:Register
    },
    {
        path:'dashboard', component:Dashboard
    },
    {
        path:'bookservice', component:BookService
    },
    {
        path:'bookhistory', component:BookingHistory
    }
];
