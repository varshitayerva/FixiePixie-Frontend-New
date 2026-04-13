import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

export const authGuard: CanActivateFn = () => {

  const router = inject(Router);

  if (typeof window === 'undefined') return true;

  const token = localStorage.getItem('token');

  console.log("GUARD TOKEN:", token);

  if (!token) {
    router.navigateByUrl('/');
    return false;
  }

  return true;
};