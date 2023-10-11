import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = new Router();
  let isLoggedIn = localStorage.getItem('currentUser');
  if (isLoggedIn) {
    return true;
  } else {
    router.navigate(['/login']);
    return false;
  }
};
