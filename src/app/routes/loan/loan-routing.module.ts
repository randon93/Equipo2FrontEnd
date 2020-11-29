import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoanDetailComponent } from './loan-detail/loan-detail.component';
import { LoanListComponent } from './loan-list/loan-list.component';

const routes: Routes = [
  {
    path: '', component: LoanListComponent,
    data: { titleI18n: 'loan' }
  },
  {
    path: 'detalles', component: LoanDetailComponent,
    data: { titleI18n: 'loan' }
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoanRoutingModule { }
