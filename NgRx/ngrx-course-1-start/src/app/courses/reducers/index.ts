import { isDevMode } from '@angular/core';
import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createReducer,
  createSelector,
  MetaReducer,
  on
} from '@ngrx/store';
import { Course } from '../model/course';
import { CoursesActions } from '../action-types';
import { EntityState } from '@ngrx/entity';

export interface CourseState extends EntityState<Course>{
  courses: Course[]
}

export const coursesFeatureKey = 'courses';

export const intialCourseState: CourseState = {
  courses: undefined
}

export const courseReducer = createReducer(
  intialCourseState,
  on(CoursesActions.allCoursesLoaded, (state, action) => {
    return {
      courses: action['courses']
    }
  }),
  on(CoursesActions.loadAllCourses, (state, action) => state)
)


