import * as Store from '@ngrx/store';
import { IEmployeeState, EmployeeState, employeeReducer } from './employee.reducer';

export interface AppState {
    employeeState: IEmployeeState;
}

export const appState = {
    employeeState: new EmployeeState,
}

export const appReducers = Store.combineReducers({
    employeeState: employeeReducer,
});

export const getAppState = Store.createFeatureSelector<AppState>('EmployeeApp');