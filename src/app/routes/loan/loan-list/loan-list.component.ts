import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MtxGridColumn } from '@ng-matero/extensions';
import { BookService } from '@shared/services/book.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-loan-list',
  templateUrl: './loan-list.component.html'
})
export class LoanListComponent implements OnInit {

  loans: any[];

  columns: MtxGridColumn[];
  isLoading: boolean;

  constructor(private _dialog: MatDialog, private _router: Router, private _toastr: ToastrService, private _datePipe: DatePipe, private _bookService: BookService) {
  }

  ngOnInit(): void {
    this.columns = [

      { header: 'Libro', field: 'isbn' },
      { header: 'Cliente', field: 'nombre' },
      { header: 'Bibliotecario', field: 'cantidad_libros' },
      {
        header: 'Fecha de prestamo', field: 'fecha_prestamo', formatter: (data: any) => {
          return this._datePipe.transform(data.start_date, 'yyyy-dd-MM H:mm')
        }
      },
      {
        header: 'Fecha entrega', field: 'fecha_entrega', formatter: (data: any) => {
          return this._datePipe.transform(data.start_date, 'yyyy-dd-MM H:mm')
        }
      },
      {
        header: 'Fecha entregado', field: 'fecha_entregado', formatter: (data: any) => {
          return this._datePipe.transform(data.start_date, 'yyyy-dd-MM H:mm')
        }
      },

      { header: 'Observacion', field: 'libros_disponibles' },
      {
        header: 'Opciones',
        field: 'option',
        width: '120px',
        pinned: 'right',
        type: 'button',
        buttons: [
          {
            icon: 'remove_red_eye',
            tooltip: 'Editar evaluacion',
            type: 'icon',
            click: record => this.removeRow(record),
          },
          {
            icon: 'watch_later',
            tooltip: 'Presentar evaluacion',
            type: 'icon',
            click: record => this.removeRow(record),
          },
          {
            icon: 'watch_later',
            tooltip: 'Presentar evaluacion',
            type: 'icon',
            click: record => this.removeRow(record),
          }
        ],
      },
    ];

    this.loadBooks();
  }

  get total() {
    return this.loans?.length;
  }

  loadBooks() {
    this.loans = [];
    this.isLoading = true;
    this._bookService.allBooks().subscribe(resp => {
      if (!resp.status) {
        this.isLoading = false;
        return;
      }

      if (!resp.data || !Array.isArray(resp.data)) {
        this.isLoading = false;
        return;
      }

      this.loans = resp.data;
      this.isLoading = false;

    });
  }

  editRow(record) {

  }
  removeRow(record) {

  }

  onClickAdd() {
    this._router.navigate(['/prestamos/detalles'], { state: { register: false } });
  }


}
