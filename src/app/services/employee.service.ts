import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import * as _ from 'lodash';

import { EmployeeModel } from '../models/employee.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private BASE_API_PATH: string = 'http://tworks-exercise-api.herokuapp.com';
  private EMPLOYEE_LIST_API_PATH: string = '/employee/list';
  private ADD_EMPLOYEE_API_PATH: string = '/employee/add';
  private DELETE_EMPLOYEE_API_PATH: string = '/employee/delete/{id}';

  private DEFAULT_ERROR_MESSAGE: string = 'Oops! Something went wrong';

  constructor(
    private http: HttpClient,
  ) { }

  getEmployees(): Observable<EmployeeModel[]> {
    return this.http.get(`${this.BASE_API_PATH}${this.EMPLOYEE_LIST_API_PATH}`).pipe(
      map(response => (<EmployeeModel[]> response)),
      catchError((error) => {
        console.log('error: ', error)
        return throwError(this.DEFAULT_ERROR_MESSAGE);
      })
    );
  }

  addEmployee(employee: EmployeeModel): Observable<EmployeeModel> {
    return this.http.post(`${this.BASE_API_PATH}${this.ADD_EMPLOYEE_API_PATH}`, employee).pipe(
      map(response => (<EmployeeModel> response)),
      catchError((error) => {
        console.log('error: ', error)
        return throwError(this.DEFAULT_ERROR_MESSAGE);
      })
    );
  }

  deleteEmployee(id: string): Observable<any> {
    return this.http.delete(`${this.BASE_API_PATH}${this.DELETE_EMPLOYEE_API_PATH}/${id}`).pipe(
      map(response => (response)),
      catchError((error) => {
        console.log('error: ', error)
        return throwError(this.DEFAULT_ERROR_MESSAGE);
      })
    );
  }

}
