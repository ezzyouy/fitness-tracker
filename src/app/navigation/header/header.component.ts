import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output
} from '@angular/core'
import { Store } from '@ngrx/store'
import { Observable, Subscription } from 'rxjs'
import { AuthService } from 'src/app/auth/auth.service'
import * as fromRoot from '../../app.reducer'
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Output() sidenavToggle = new EventEmitter<void>()
  isAuth$: Observable<boolean>
  //authSubscription: Subscription
  constructor(
    private authService: AuthService,
    private store:Store<fromRoot.State>
  ) { }

  // ngOnDestroy () {
  //   this.authSubscription.unsubscribe()
  // }

  ngOnInit () {
    // this.authSubscription = this.authService.authChange.subscribe(
    //   authStatus => {
    //     this.isAuth = authStatus
    //   }
    // )
    this.isAuth$=this.store.select(fromRoot.getIsAuth)
  }
  onToggle () {
    this.sidenavToggle.emit()
  }
  onLogout() {
    this.authService.logout()
  }
}
