import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { Register } from './pages/register/register';
import { Dashboard } from './pages/customer-dashboard/customer-dashboard';
import { BookService } from './pages/book-service/book-service';
import { BookingHistory } from './pages/booking-history/booking-history';
import { ProviderDashboard } from './pages/provider-dashboard/provider-dashboard';
import { PaymentPage } from './pages/payment/payment';
import { BookingPage } from './pages/booking/booking';
import { AddService } from './pages/add-service/add-service';
import { Profile } from './pages/profile/profile';
import { authGuard } from './auth-guard';


export const routes: Routes = [



  // PUBLIC
  { path: '', component: Login },
  { path: 'register', component: Register },

  // 🔒 CUSTOMER ROUTES
  { path: 'customer-dashboard', component: Dashboard, canActivate: [authGuard] },
  { path: 'bookservice', component: BookService, canActivate: [authGuard] },
  { path: 'bookhistory', component: BookingHistory, canActivate: [authGuard] },

  // 🔒 PROVIDER ROUTES
  { path: 'provider-dashboard', component: ProviderDashboard, canActivate: [authGuard] },
  { path: 'add-service', component: AddService, canActivate: [authGuard] },

  // 🔒 PAYMENT
  { path: 'booking', component: BookingPage, canActivate: [authGuard] },
  { path: 'payment', component: PaymentPage, canActivate: [authGuard] },

  {path:'profile', component:Profile, canActivate:[authGuard]},

  // FALLBACK
  { path: '**', redirectTo: '' }
];