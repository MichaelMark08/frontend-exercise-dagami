import { createSelector } from '@ngrx/store';

import { getAppState } from '../reducers/main.reducer';

export const getEmployeeState = createSelector(
    getAppState,
    (state) => state.employeeState
);

export const getEmployeesListState = createSelector(
    getEmployeeState,
    state => state.employees
);