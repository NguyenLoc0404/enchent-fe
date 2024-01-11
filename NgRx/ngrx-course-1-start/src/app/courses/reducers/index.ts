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
import { compareCourses, Course } from '../model/course';
import { CoursesActions } from '../action-types';
import { createEntityAdapter, EntityState } from '@ngrx/entity';

export interface CoursesState extends EntityState<Course> {
}
export const adapter = createEntityAdapter<Course>({
  sortComparer: compareCourses
});

export const initialCourseState = adapter.getInitialState();

export const coursesReducer = createReducer(
  initialCourseState,
  on(CoursesActions.allCoursesLoaded, (state, action) => {
    return adapter.addMany(action.courses, state)
  })
)

export const { selectAll } = adapter.getSelectors();
