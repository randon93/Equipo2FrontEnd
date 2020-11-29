import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-manage-book-delete',
  templateUrl: './manage-book-delete.component.html',
  styleUrls: ['./manage-book-delete.component.css']
})
export class ManageBookDeleteComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ManageBookDeleteComponent>,
  ) { }

  ngOnInit(): void {
  }

  onClickClose(): void {
    this.dialogRef.close({ status: false });

  }
  onClickSave(): void {
    this.dialogRef.close({ status: true });
  }

}
