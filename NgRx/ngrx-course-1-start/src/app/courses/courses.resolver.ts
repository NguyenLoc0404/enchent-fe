import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { AppState } from "../reducers";
import { finalize, first, tap } from "rxjs/operators";
import { loadAllCourses } from "./course.action";

@Injectable()
export class CoursesResolver implements Resolve<any> {
    loading = false
    constructor(private store: Store<AppState>) {

    }
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
        return this.store
            .pipe(
                tap((resolve: any) => {
                    console.log('resolve',resolve);
                    if (!this.loading && resolve.courses.ids.length == 0) {
                        this.loading = true;
                        this.store.dispatch(loadAllCourses());
                    }
                }),
                first(),
                finalize(() => this.loading = false)
            )
    }
}