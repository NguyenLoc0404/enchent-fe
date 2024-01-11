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
  allCoursesLoaded: boolean
}
export const adapter = createEntityAdapter<Course>({
  sortComparer: compareCourses
});

export const initialCourseState = adapter.getInitialState(
  { allCoursesLoaded: false }
);

export const coursesReducer = createReducer(
  initialCourseState,
  on(CoursesActions.allCoursesLoaded, (state, action) => {
    return adapter.addMany(action.courses, { ...state, allCoursesLoaded: true })
  }),
  on(CoursesActions.courseUpdated, (state, action) => {
    return adapter.updateOne(action.course, state)
  }),
)

export const { selectAll } = adapter.getSelectors();
