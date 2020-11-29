import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '@shared/shared.module';
import { MaterialModule } from 'app/material.module';
import { ManageBookDialogComponent } from './manage-book-dialog/manage-book-dialog.component';
import { ManageBookListComponent } from './manage-book-list/manage-book-list.component';
import { ManageBookRoutingModule } from './manage-book-routing.module';
import { ManageBookDeleteComponent } from './manage-book-delete/manage-book-delete.component';

const COMPONENTS = [ManageBookListComponent, ManageBookDialogComponent];
const COMPONENTS_DYNAMIC = [];

@NgModule({
  imports: [
    SharedModule,
    MaterialModule,
    ReactiveFormsModule,
    ManageBookRoutingModule
  ],
  declarations: [
    ...COMPONENTS,
    ...COMPONENTS_DYNAMIC,
    ManageBookDeleteComponent
  ],
  entryComponents: COMPONENTS_DYNAMIC
})
export class ManageBookModule { }
