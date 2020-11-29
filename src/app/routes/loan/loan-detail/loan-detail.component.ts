import { Component, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { DateAdapter } from '@angular/material/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NavigationStart, Router } from '@angular/router';
import { BookService } from '@shared/services/book.service';
import { LoanService } from '@shared/services/loan.service';
import { PersonService } from '@shared/services/person.service';
import { ToastrService } from 'ngx-toastr';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-evaluation-detail',
  templateUrl: './loan-detail.component.html',
})
export class LoanDetailComponent implements OnInit, OnDestroy {

  reactiveForm: FormGroup;
  @ViewChild('reactiveFormView', { static: false }) reactiveFormView: NgForm;

  register: boolean = false;
  prestamoId: number;
  createdUser = false;
  books: any[];

  constructor(
    private _dialog: MatDialog,
    private _fb: FormBuilder,
    private _dateAdapter: DateAdapter<any>,
    private _toastr: ToastrService,
    private _router: Router,
    private _loanService: LoanService, private _personService: PersonService, private _bookService: BookService) {

    this._router.events
      .pipe(filter((event) => (event instanceof NavigationStart)))
      .subscribe((event: NavigationStart) => {

        event.navigationTrigger;

        if (event.restoredState) {
          this._router.getCurrentNavigation().extras.state = event.restoredState;
          console.warn('restoring navigation id:', event.restoredState.navigationId);
        }
        console.groupEnd();
      });

    const { state } = this._router.getCurrentNavigation().extras;

    if (!state) {
      this._router.navigate(['/prestamos']);
      return;
    }

    this.register = state.register;

    if (this.register) {
    } else {
    }
  }

  loadBooks() {
    this._bookService.allBooks().subscribe(resp => {
      if (!resp.status) {
        return;
      }
      this.books = resp.data;
    });
  }

  ngOnInit(): void {

    this.reactiveForm = this._fb.group({
      libro_id: ['', [Validators.required]],
      documento: ['', [Validators.required]],
      nombres: ['', [Validators.required]],
      apellidos: ['', [Validators.required]],
      direccion: ['', [Validators.required]],
      telefono: ['', [Validators.required]],
      observacion: ['', [Validators.required]],

    });

  }

  ngOnDestroy(): void {

  }

  onValidDocument() {
    this.createdUser = true;
  }

  onClickClose() {

  }

  onClickSave() {

  }
}
