import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import * as fromRoot from '../../app.reducer'

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.css']
})
export class SidenavListComponent implements OnInit/* , OnDestroy */{
  @Output() closeSidenav = new EventEmitter<void>()
  isAuth$: Observable<boolean>
  //subscription: Subscription
  constructor(private authService: AuthService,
  private store : Store<fromRoot.State>) {

  }
  ngOnInit(){
    // this.subscription = this.authService.authChange.subscribe(
    //   authS => {
    //     this.isAuth=authS
    //     }
    //   )
    this.isAuth$=this.store.select(fromRoot.getIsAuth)
  }
  onLogout() {
    this.authService.logout()
    this.onClose();
  }
/*   ngOnDestroy(): void {
      this.subscription.unsubscribe()
  } */
  onClose() {
    this.closeSidenav.emit();

  }

}
