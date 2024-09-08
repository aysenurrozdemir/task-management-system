import {Component, OnDestroy, OnInit} from '@angular/core';
import {environment} from "../../../environments/environment";
import {Router, RouterLink} from "@angular/router";
import {AuthorizationService} from "../../core/services/authorization.service";
import {FormsModule} from "@angular/forms";
import {ApiService} from "../../api.service";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
    standalone: true,
  imports: [
    RouterLink,
    FormsModule
  ]
})
export class LoginComponent implements OnInit, OnDestroy {
    username: string = '';
    password: string = '';

    apiRoot = environment.domainForLocalhost;
    constructor(private router: Router,
                private authService: AuthorizationService,
                private apiService: ApiService) {
    }

    ngOnDestroy(): void {
        localStorage.setItem('userName', JSON.stringify(this.username));
    }

    ngOnInit(): void {
        if (this.authService.isAuthenticated()) {
            this.router.navigate(['/dashboard']);
        }

    }

    login() {
        localStorage.setItem('userName', JSON.stringify(this.username));
        if (this.username && this.password) {
            const mockToken = 'dummy-token';
            localStorage.setItem('token', mockToken);
            const fullPath = `${this.apiRoot}dashboard`;
            this.router.navigate(['/task-management']);
        }else {
            console.error('Username and password are required');
        }
    }
}
