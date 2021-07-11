import { Component, OnInit, OnDestroy } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

import { GetEmployeesList } from '../../actions/employee.action';
import { getEmployeesListState } from '../../selectors/employee.selector';
import { EmployeeState } from '../../reducers/employee.reducer';
import { EmployeeModel } from '../../models/employee.model';

@AutoUnsubscribe()
@Component({
  selector: 'employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeesListComponent implements OnInit, OnDestroy {

  employeeList: EmployeeModel[] = [];

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

}
