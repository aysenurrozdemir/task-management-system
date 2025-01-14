import {Injectable} from '@angular/core';

@Injectable({providedIn: 'root'})
export class AuthorizationService {
  private readonly TOKEN_KEY = 'token';

  constructor() {
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  removeAuthentication(): void {
    localStorage.clear();
    location.href = 'https://todolist2-6eb0e.web.app/login';
  }

}
