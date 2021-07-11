import * as Store from '@ngrx/store';
import { EmployeeModel } from '../models/employee.model';

export enum EmployeeActionTypes {
    GetEmployeesList = 'Get Employees List',
    GetEmployeesListSuccess = 'Get Employees List Success',
    GetEmployeesListFailed = 'Get Employees List Failed',
    AddEmployee = 'Add Employee',
    AddEmployeeFailed = 'Add Employee Failed',
    DeleteEmployee = 'Delete Employee',
    DeleteEmployeeFailed = 'Delete Employee Failed',
}

export class GetEmployeesList implements Store.Action {
    readonly type = EmployeeActionTypes.GetEmployeesList;
    constructor() { }
}

export class GetEmployeesListSuccess implements Store.Action {
    readonly type = EmployeeActionTypes.GetEmployeesListSuccess;
    constructor(public employees: EmployeeModel[]) { }
}

export class GetEmployeesListFailed implements Store.Action {
    readonly type = EmployeeActionTypes.GetEmployeesListFailed;
    constructor(public error: string) { }
}

export class AddEmployee implements Store.Action {
    readonly type = EmployeeActionTypes.AddEmployee;
    constructor(public employee: EmployeeModel) { }
}

export class AddEmployeeFailed implements Store.Action {
    readonly type = EmployeeActionTypes.AddEmployeeFailed;
    constructor(public error: string) { }
}

export class DeleteEmployee implements Store.Action {
    readonly type = EmployeeActionTypes.DeleteEmployee;
    constructor(public id: string) { }
}

export class DeleteEmployeeFailed implements Store.Action {
    readonly type = EmployeeActionTypes.DeleteEmployeeFailed;
    constructor(public error: string) { }
}

export type EmployeeActions =
    GetEmployeesList | GetEmployeesListSuccess | GetEmployeesListFailed
    | AddEmployee | AddEmployeeFailed | DeleteEmployee | DeleteEmployeeFailed;
