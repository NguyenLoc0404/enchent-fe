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
import { createEntityAdapter, EntityState } from '@ngrx/entity';

export interface CourseState extends EntityState<Course>{
}
export const adapter = createEntityAdapter<Course>();

export const initialCourseState = adapter.getInitialState();

export const coursesReducer = createReducer(
  initialCourseState,
  on(CoursesActions.allCoursesLoaded, (state, action) => {
    console.log('state adapter',state);
    console.log('action',action);
    return adapter.addMany(action.courses,state)
  })
)


