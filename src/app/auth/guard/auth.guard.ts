import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { StorageService } from '../services/storage/storage.service';
import { Route } from '@angular/router';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
    let userToken = StorageService.getToken(); 
    const router = inject(Router);

    if (userToken == null) {
        alert("Please login , redirecting to login page");
        router.navigate(['login']);
        return false;
    }
    return true;
};



