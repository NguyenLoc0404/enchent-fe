import {Component, OnInit} from '@angular/core';
import {select, State, Store} from "@ngrx/store";
import {Observable} from "rxjs";
import {NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router} from '@angular/router';
import { isLoggedIn, isLoggedOut } from './auth/auth.selectors';
import { AuthActions } from './auth/auth-types';
import { AppState } from './reducers';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

    loading = true;
    isLoggedIn$ : Observable<boolean>;
    isLoggedOut$ : Observable<boolean>;
    constructor(private router: Router, private store: Store<AppState>) {

    }

    ngOnInit() {

      this.router.events.subscribe(event  => {
        switch (true) {
          case event instanceof NavigationStart: {
            this.loading = true;
            break;
          }

          case event instanceof NavigationEnd:
          case event instanceof NavigationCancel:
          case event instanceof NavigationError: {
            this.loading = false;
            break;
          }
          default: {
            break;
          }
        }
      });
      // this.isLoggedIn$ = this.store.pipe(map(state => !!state["auth"].user))
      // this.isLoggedOut$ = this.store.pipe(map(state => !state["auth"].user))
      // this.isLoggedIn$ = this.store.pipe(select(state => !!state["auth"].user))
      // this.isLoggedOut$ = this.store.pipe(select(state => !state["auth"].user))
      
      this.isLoggedIn$ = this.store.pipe(select(isLoggedIn))
      this.isLoggedOut$ = this.store.pipe(select(isLoggedOut))
    }

    logout() {
      this.store.dispatch(AuthActions.logout())
    }

}
