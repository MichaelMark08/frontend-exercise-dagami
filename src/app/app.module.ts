import { BrowserModule } from '@angular/platform-browser';
import { InjectionToken, NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ActionReducerMap, StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';

import { AppEffects } from './app.effects';
import { EmployeeEffect } from './effects/employee.effect';

import { AppState } from './reducers/main.reducer';
import { employeeReducer, EmployeeState } from './reducers/employee.reducer';

import { EmployeeActions } from './actions/employee.action';

import { EmployeesListComponent } from './components/employee-list/employee-list.component';
import { EmployeesAddComponent } from './components/employee-add/employee-add.component';

export const APP_REDUCER_TOKEN = new InjectionToken<ActionReducerMap<AppState>>('App Reducers');

@NgModule({
  declarations: [
    AppComponent,
    EmployeesListComponent,
    EmployeesAddComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    StoreModule.forRoot({}, {}),
    StoreModule.forFeature('EmployeeApp', APP_REDUCER_TOKEN),
    StoreModule.forFeature('EmployeeStore', reducerWrapper),
    EffectsModule.forRoot([AppEffects, EmployeeEffect]),
  ],
  providers : [
    { provide : APP_REDUCER_TOKEN, useFactory : getReducers }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

export function getReducers() : ActionReducerMap<AppState> {
  return { employeeState: employeeReducer };
}

export function reducerWrapper(state: EmployeeState, action: EmployeeActions): EmployeeState {
  return employeeReducer(state, action);
}
