import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MtxGridColumn } from '@ng-matero/extensions';
import { BookService } from '@shared/services/book.service';
import { LoanService } from '@shared/services/loan.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-loan-list',
  templateUrl: './loan-list.component.html'
})
export class LoanListComponent implements OnInit {

  loans: any[];

  columns: MtxGridColumn[];
  isLoading: boolean;

  constructor(private _dialog: MatDialog, private _router: Router, private _toastr: ToastrService, private _datePipe: DatePipe, private _loanService: LoanService) {
  }

  ngOnInit(): void {
    this.columns = [
      {
        header: 'Libro', field: 'libroDomain', formatter: (data: any) => {
          return `${data.libroDomain?.isbn} - ${data.libroDomain?.nombre}`;
        }
      },

      {
        header: 'Cliente', field: 'usuarioDomainCliente', formatter: (data: any) => {
          return `${data.usuarioDomainCliente?.correo}`;
        }
      },
      {
        header: 'Bibliotecario', field: 'usuarioDomainBiblioteca', formatter: (data: any) => {
          return `${data.usuarioDomainBiblioteca?.correo}`;
        }
      },
      {
        header: 'Fecha de prestamo', field: 'fechaPrestamo', formatter: (data: any) => {
          return this._datePipe.transform(data.fechaPrestamo, 'yyyy-dd-MM H:mm')
        }
      },
      {
        header: 'Fecha entrega', field: 'fechaEntrega', formatter: (data: any) => {
          return this._datePipe.transform(data.fechaEntrega, 'yyyy-dd-MM H:mm')
        }
      },
      {
        header: 'Fecha entregado', field: 'fechaEntregado', formatter: (data: any) => {
          return this._datePipe.transform(data.fechaEntregado, 'yyyy-dd-MM H:mm')
        }
      },

      { header: 'Observacion', field: 'observaciones' },
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

    this.loadLoans();
  }

  get total() {
    return this.loans?.length;
  }

  loadLoans() {
    this.loans = [];
    this.isLoading = true;
    this._loanService.allLoans().subscribe(resp => {
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
    this._router.navigate(['/prestamos/detalles'], { state: { register: true } });
  }


}
