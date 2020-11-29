import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BookService } from '@shared/services/book.service';
import { ToastrService } from 'ngx-toastr';
import { ManageBookDialogComponent } from '../manage-book-dialog/manage-book-dialog.component';

@Component({
  selector: 'app-manage-book-list',
  templateUrl: './manage-book-list.component.html'
})
export class ManageBookListComponent implements OnInit {

  books: any[];
  filterBooks: any[];
  filterString: string;

  columns: any[];
  isLoading: boolean;

  constructor(private _dialog: MatDialog, private _toastr: ToastrService, private _bookService: BookService) {
  }

  ngOnInit(): void {
    this.columns = [

      { header: 'ISBN', field: 'isbn' },
      { header: 'Nombre', field: 'nombre' },
      { header: 'Cantidad libros', field: 'cantidadDisponible' },
      { header: 'Libros disponibles', field: 'cantidadTotal' },
      {
        header: 'Opciones',
        field: 'option',
        width: '120px',
        pinned: 'right',
        type: 'button',
        buttons: [
          {
            icon: 'restore_from_trash',
            tooltip: 'Eliminar',
            type: 'icon',
            click: record => this.removeRow(record),
          },
          {
            icon: 'remove_red_eye',
            tooltip: 'Ver prestamos',
            type: 'icon',
            click: record => null,
          }
        ],
      },
    ];

    this.loadBooks();
  }

  get total() {
    return this.filterBooks?.length;
  }

  loadBooks() {
    this.books = [];
    this.filterBooks = [];
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

      this.books = resp.data;
      this.filterBooks = this.books;
      this.isLoading = false;

    });
  }

  editRow(record) {

  }
  removeRow(record) {
    const dialogRef = this._dialog.open(ManageBookDialogComponent, {
      width: '800px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && result.status) {
        
      }
    });
  }

  onClickAdd(record) {
    let title: string = "Agregar";
    let update: boolean = false;
    if (record != null) {
      title = "Editar"
      update = true;
    }

    const dialogRef = this._dialog.open(ManageBookDialogComponent, {
      width: '800px',
      data: {
        update: update,
        title: title,
        category: record
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && result.status) {
        this.loadBooks();
      }
    });
  }

  onSearch(event: string) {

    const cad = event.toUpperCase();

    if (!cad) {
      return;
    }

    this.filterBooks = this.books
      .filter(row => row.isbn?.includes(cad) || row.nombre?.toUpperCase().includes(cad));
  }

}
