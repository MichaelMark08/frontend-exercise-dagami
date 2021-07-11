import { Component, OnInit, OnDestroy } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { Subscription } from 'rxjs';

import { AddEmployee, GetEmployeesList } from '../../actions/employee.action';
import { getEmployeesListState } from '../../selectors/employee.selector';
import { EmployeeState } from '../../reducers/employee.reducer';
import { EmployeeModel } from '../../models/employee.model';
import { filter } from 'rxjs/operators';

@AutoUnsubscribe()
@Component({
  selector: 'employee-add',
  templateUrl: './employee-add.component.html',
  styleUrls: ['./employee-add.component.scss']
})
export class EmployeesAddComponent implements OnInit, OnDestroy {

  employeeList: EmployeeModel[] = [];
  employeeForm = new FormGroup({
    employeeId: new FormControl('', [Validators.required]),
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required])
  });

  employeeList$: Subscription;

  constructor(
    private store: Store<EmployeeState>,
  ) { }

  ngOnInit() {
    this.employeeList$ = this.store.pipe(
      select(getEmployeesListState),
      filter(val => val !== undefined)
    ).subscribe(employeeList => {
      this.employeeList = employeeList || [];
    });

    this.loadEmployeeListData();
  }

  ngOnDestroy() {
  }

  loadEmployeeListData() {
    this.store.dispatch(new GetEmployeesList());
  }

  addEmployee() {
    if (this.employeeForm.valid) {
      let employee: EmployeeModel = new EmployeeModel;
      employee.id = this.employeeForm.value.employeeId;
      employee.firstName = this.employeeForm.value.firstName;
      employee.lastName = this.employeeForm.value.lastName;
      employee.email = this.employeeForm.value.email;
  
      this.store.dispatch(new AddEmployee(employee));
      this.employeeForm.reset();
    }
  }

  isFieldValid(field: string): boolean {
    return this.employeeForm.controls[field]
      && this.employeeForm.controls[field].errors
      && this.employeeForm.controls[field].errors.required
  }

  duplicateValue(field: string): boolean {
    let value = this.employeeForm.value[field];
    return value && this.employeeList.filter(employee => employee.id === value).length > 0
  }

}
