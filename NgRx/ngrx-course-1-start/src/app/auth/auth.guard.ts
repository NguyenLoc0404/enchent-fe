import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { Store, select } from "@ngrx/store";
import { isLoggedIn } from "./auth.selectors";
import { tap } from "rxjs/operators";
import { AppState } from "../reducers";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private store: Store<AppState>,
        private router: Router
        ) {

    }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        return this.store
        .pipe(
            select(isLoggedIn),
            tap(loggedIn => {
                console.log('loggedIn',loggedIn);
                if(!loggedIn)
                    this.router.navigateByUrl('/login')
            })
            )
    }
}