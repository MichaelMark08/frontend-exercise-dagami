import { Injectable } from '@angular/core';
import * as Effects from '@ngrx/effects';
import { Action } from '@ngrx/store';
import * as _ from 'lodash';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import {
    EmployeeActionTypes,
    GetEmployeesList,
    GetEmployeesListSuccess,
    GetEmployeesListFailed,
    AddEmployee,
    AddEmployeeFailed,
    DeleteEmployee,
    DeleteEmployeeFailed,
} from '../actions/employee.action';
import { EmployeeService } from '../services/employee.service';

@Injectable()
export class EmployeeEffect {

    constructor (
        private actions$: Effects.Actions,
        private employeeService: EmployeeService
    ) {}

    @Effects.Effect()
    getEmployeesList$ : Observable<Action> = this.actions$.pipe(
        Effects.ofType<GetEmployeesList>(EmployeeActionTypes.GetEmployeesList),
        switchMap(() => {
            return this.employeeService.getEmployees().pipe(
                map(data => (new GetEmployeesListSuccess(data))),
                catchError((err) => (of(new GetEmployeesListFailed(err)))),
            )
        })
    )

    @Effects.Effect()
    addEmployee$ : Observable<Action> = this.actions$.pipe(
        Effects.ofType<AddEmployee>(EmployeeActionTypes.AddEmployee),
        switchMap(action => {
            return this.employeeService.addEmployee(action.employee).pipe(
                map(data => (new GetEmployeesList())),
                catchError((err) => (of(new AddEmployeeFailed(err)))),
            )
        })
    )

    @Effects.Effect()
    deleteEmployee$ : Observable<Action> = this.actions$.pipe(
        Effects.ofType<DeleteEmployee>(EmployeeActionTypes.DeleteEmployee),
        switchMap(action => {
            return this.employeeService.deleteEmployee(action.id).pipe(
                map(data => (new GetEmployeesList())),
                catchError((err) => (of(new DeleteEmployeeFailed(err)))),
            )
        })
    )

}
