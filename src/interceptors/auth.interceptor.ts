// interceptors/auth.interceptor.ts
import { HttpInterceptorFn } from '@angular/common/http';

// interceptors/auth.interceptor.ts
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('token');

  // Check if token exists and isn't the literal string "undefined" or "null"
  if (token && token !== 'undefined' && token !== 'null') {
    const authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    return next(authReq);
  }

  console.warn("No token found in localStorage for request:", req.url);
  return next(req);
};