import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { AppState } from "../reducers";
import { concatMap, map } from "rxjs/operators";
import { CoursesActions } from "./action-types";
import { CoursesHttpService } from "./services/courses-http.service";

@Injectable()
export class CoursesEffects {
    loadCourses$ = createEffect(() => this.actions$
        .pipe(
            ofType(CoursesActions.loadAllCourses),
            concatMap(action => this.coursesHttpService.findAllCourses()),
            map(courses => CoursesActions.allCoursesLoaded({ courses }))
        ));
    saveCourse$ = createEffect(() => this.actions$
        .pipe(
            ofType(CoursesActions.courseUpdated),
            concatMap(action => this.coursesHttpService.saveCourse(action.course.id,action.course.changes)),
        ),
        { dispatch: false}
        );

    constructor(
        private actions$: Actions,
        private store: Store<AppState>,
        private coursesHttpService: CoursesHttpService) {
    }
}