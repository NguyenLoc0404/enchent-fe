import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store, select } from "@ngrx/store";
import { AuthActions } from "./auth-types";
import { tap } from "rxjs/operators";
import { Router } from "@angular/router";
import { AppState } from "../reducers";

@Injectable()
export class AuthEffects {
    login$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(AuthActions.login),
            tap(action => localStorage.setItem('user', JSON.stringify(action.user)))
        );
    }, { dispatch: false });

    logout$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(AuthActions.logout),
            tap(() => {
                localStorage.removeItem('user');
                this.router.navigateByUrl('/logout')
            })
        );
    }, { dispatch: false });

    constructor(private actions$: Actions, private router: Router, private store: Store<AppState>) {

        const userProfile = localStorage.getItem('user');
        if (userProfile) {
            this.router.navigateByUrl('courses');
            this.store.dispatch(AuthActions.login({ user: JSON.parse(userProfile) }))
        }


        // const login$ = this.actions$.pipe(
        //     ofType(AuthActions.login),
        //     tap(action => {
        //         if (action.type == "[Login Page] User Login") {
        //             localStorage.setItem('user', JSON.stringify(action.user));
        //         }
        //     }),
        // );
        // login$.subscribe();
    }
}