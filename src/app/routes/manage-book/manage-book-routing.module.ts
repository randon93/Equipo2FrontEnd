import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ManageBookListComponent } from './manage-book-list/manage-book-list.component';

const routes: Routes = [
  {
    path: '', component: ManageBookListComponent,
    data: { title: 'manageBook', titleI18n: 'manageBook' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManageBookRoutingModule { }
