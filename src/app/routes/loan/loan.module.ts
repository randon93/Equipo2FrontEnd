import { DatePipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '@shared/shared.module';
import { MaterialModule } from 'app/material.module';
import { LoanDetailComponent } from './loan-detail/loan-detail.component';
import { LoanListComponent } from './loan-list/loan-list.component';
import { LoanRoutingModule } from './loan-routing.module';

const COMPONENTS = [LoanListComponent, LoanDetailComponent];
const COMPONENTS_DYNAMIC = [];

@NgModule({
  imports: [
    SharedModule,
    MaterialModule,
    ReactiveFormsModule,
    LoanRoutingModule
  ],
  declarations: [
    ...COMPONENTS,
    ...COMPONENTS_DYNAMIC
  ],
  entryComponents: COMPONENTS_DYNAMIC,
  providers: [DatePipe],
})
export class LoanModule { }
