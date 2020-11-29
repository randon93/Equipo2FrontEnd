import { Component, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BookService } from '@shared/services/book.service';
import { ToastrService } from 'ngx-toastr';

interface Parameters {
  update: boolean;
  title: string;
  category:
  {
    id: number,
    isbn: string,
    nombre: string
  }
}

@Component({
  selector: 'app-manage-book-dialog',
  templateUrl: './manage-book-dialog.component.html',
})
export class ManageBookDialogComponent implements OnInit, OnDestroy {

  reactiveForm: FormGroup;
  @ViewChild('reactiveFormView', { static: false }) reactiveFormView: NgForm;

  title: string = this.data.title;


  constructor(
    public dialogRef: MatDialogRef<ManageBookDialogComponent>,
    private fb: FormBuilder,
    private _toastr: ToastrService,
    private _bookService: BookService,
    @Inject(MAT_DIALOG_DATA) public data: Parameters) { }

  ngOnInit(): void {

    this.reactiveForm = this.fb.group({
      id: [null],
      isbn: ['', [Validators.required]],
      nombre: ['', [Validators.required]],
    });

    if (this.data.update) {
      this.reactiveForm.patchValue(this.data.category);
    }
  }

  ngOnDestroy(): void {
  }

  onSubmitReactiveForm(): void {
    if (this.reactiveForm.invalid) {
      this._toastr.error('Diligencie todos los campos')
      return;
    }

    const { id, nombre, isbn } = this.reactiveForm.getRawValue();

    // actualizar libro
    if (this.data.update) {
      this._bookService.update({ id, nombre, isbn }).subscribe(resp => {
        this._toastr.success(resp.message);
        this.dialogRef.close({ status: true });
      }, error => {
        this._toastr.error(error.error);
      });
    } else {
      this._bookService.register({ nombre, isbn }).subscribe(resp => {
        this._toastr.success(resp.message);
        this.dialogRef.close({ status: true });
      }, error => {
        this._toastr.error(error.error);
      });
    }
  }

  onClickClose(): void {
    this.dialogRef.close({ status: false });
  }
  onClickSave(): void {
    this.reactiveFormView.ngSubmit.emit();
  }
}
