import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  matDialogRef: MatDialogRef<DialogComponent>;

  constructor(
    private matDialog: MatDialog
  ) { }

  ngOnInit() {
  }

  openModal($event: any) {
    this.matDialogRef = this.matDialog.open(DialogComponent, {
      data: 'abc',
      disableClose: false
    });
  }

}
