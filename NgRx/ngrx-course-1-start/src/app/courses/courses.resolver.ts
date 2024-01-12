import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Store, select } from "@ngrx/store";
import { Observable } from "rxjs";
import { AppState } from "../reducers";
import { filter, finalize, first, map, tap } from "rxjs/operators";
import { loadAllCourses } from "./course.action";
import { areCoursesLoaded } from "./courses.selectors";
import { CourseEntityService } from "./services/course-entity.service";

@Injectable()
export class CoursesResolver implements Resolve<boolean> {
    loading = false
    constructor(
        private store: Store<AppState>,
        private coursesService: CourseEntityService
        ) {

    }
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        return this.coursesService.getAll()
            .pipe(
                map(courses => !!courses)
            )
        // return this.store
        //     .pipe(
        //         select(areCoursesLoaded),
        //         tap(coursesLoaded => {
        //             if (!this.loading && !coursesLoaded) {
        //                 this.loading = true;
        //                 this.store.dispatch(loadAllCourses());
        //             }
        //         }),
        //         filter(coursesLoaded => coursesLoaded),
        //         first(),
        //         finalize(() => this.loading = false)
        //     )
    }
}