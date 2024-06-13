import { CanActivateFn } from '@angular/router';
import { ApiService } from '../serices/api.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Inject, inject } from '@angular/core';

export const authGuard: CanActivateFn = () => {
  const api = inject(ApiService)
  const router = inject(Router)
  const toastr = inject(ToastrService)
  if (api.isLoggedIn()) {
    return true
  } else {
    toastr.warning("please Login First")
    router.navigateByUrl('/log')
    return false
  }
};
