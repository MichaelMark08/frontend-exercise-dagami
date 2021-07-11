import * as _ from 'lodash';

import { EmployeeModel } from '../models/employee.model';
import { EmployeeActionTypes, EmployeeActions } from '../actions/employee.action';

export interface IEmployeeState {
    employees: EmployeeModel[],
    error: string
}

export class EmployeeState implements IEmployeeState {
    employees = [];
    error = "";
}

export function employeeReducer(state = new EmployeeState(), action: EmployeeActions) {
    switch (action.type) {
        case EmployeeActionTypes.GetEmployeesList:
            {
                return _.cloneDeep(state);
            }
        case EmployeeActionTypes.GetEmployeesListSuccess:
            {
                let newState = state;
                newState.employees = action.employees || [];
                newState.error = "";
                return _.cloneDeep(state);
            }
        case EmployeeActionTypes.GetEmployeesListFailed:
            {
                let newState = state;
                newState.employees = [];
                newState.error = action.error || '';
                return _.cloneDeep(state);
            }
        case EmployeeActionTypes.AddEmployee:
            {
                return _.cloneDeep(state);
            }
        case EmployeeActionTypes.AddEmployeeFailed:
            {
                let newState = state;
                newState.employees = [];
                newState.error = action.error || '';
                return _.cloneDeep(state);
            }
        case EmployeeActionTypes.DeleteEmployee:
            {
                return _.cloneDeep(state);
            }
        case EmployeeActionTypes.DeleteEmployeeFailed:
            {
                let newState = state;
                newState.employees = [];
                newState.error = action.error || '';
                return _.cloneDeep(state);
            }
        default:
            {
                return _.cloneDeep(state);
            }
    }
}