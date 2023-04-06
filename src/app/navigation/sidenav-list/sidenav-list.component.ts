import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.css']
})
export class SidenavListComponent implements OnInit, OnDestroy{
  @Output() closeSidenav = new EventEmitter<void>()
  isAuth = false
  subscription: Subscription
  constructor(private authService: AuthService) {

  }
  ngOnInit(){
    this.subscription = this.authService.authChange.subscribe(
      authS => {
        this.isAuth=authS
        }
      )
  }
  onLogout() {
    this.authService.logout()
    this.onClose();
  }
  ngOnDestroy(): void {
      this.subscription.unsubscribe()
  }
  onClose() {
    this.closeSidenav.emit();

  }

}
