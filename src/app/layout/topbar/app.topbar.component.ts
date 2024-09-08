import {Component, ElementRef, HostListener, OnInit, ViewChild} from '@angular/core';
import {MenuItem} from 'primeng/api';
import {LayoutService} from "../app.layout.service";
import {Router, RouterLink} from "@angular/router";
import {AuthorizationService} from "../../core/services/authorization.service";
import {CommonModule, NgClass, NgIf, NgOptimizedImage} from "@angular/common";
import {AvatarModule} from "primeng/avatar";
import {ToolbarModule} from "primeng/toolbar";
import {Button} from "primeng/button";
import {hideSidebar, showSidebar} from "../../store/sidebarVisible/sidebar-visible.action";
import {Store} from "@ngrx/store";
import {MenubarModule} from "primeng/menubar";
import {BadgeModule} from "primeng/badge";
import {InputTextModule} from "primeng/inputtext";
import {RippleModule} from "primeng/ripple";
import {MenuModule} from "primeng/menu";

@Component({
    selector: 'app-topbar',
    standalone: true,
    imports: [
        NgClass,
        RouterLink,
        NgIf,
        AvatarModule,
        ToolbarModule,
        MenuModule,
        Button,
        MenubarModule, BadgeModule, AvatarModule, InputTextModule, RippleModule, CommonModule, NgOptimizedImage
    ],
    templateUrl: './app.topbar.component.html',
})
export class AppTopBarComponent implements OnInit{
    sidebarVisible: boolean = false;
    items: MenuItem[] | undefined;
    userName: string | undefined;
    constructor(private store: Store,
                private router: Router,
                private authService: AuthorizationService) {
    }

      toggleSidebar() {
        if (this.sidebarVisible) {
          this.store.dispatch(hideSidebar());
        } else {
          this.store.dispatch(showSidebar());
        }
        // this.sidebarVisible = !this.sidebarVisible;
      }
        ngOnInit() {
          const userNameStorage = localStorage.getItem('userName');
          const userName = userNameStorage ? JSON.parse(userNameStorage) : [];
            if(userName && userName !== '' ){
              this.userName =  userName.toUpperCase();
            }else{
              this.userName = 'Welcome'
            }

          this.items = [
            {
              label: 'Dashboard',
              icon: 'pi pi-home',
              command: () => this.router.navigate(['/dashboard'])
            },
            {
              label: 'Task List Kanban',
              icon: 'pi pi-star',
              command: () => this.router.navigate(['/task-management'])
            },
            {
              label: 'Task List Table',
              icon: 'pi pi-star',
              command: () => this.router.navigate(['/task-list-table'])
            },
            {
              label: 'Profile',
              icon: 'pi pi-envelope',
              command: () => this.router.navigate(['/'])
            }
          ];
        }

  logout(): void {
    return this.authService.removeAuthentication();
  }
}