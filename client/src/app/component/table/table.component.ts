import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../account/dialog/dialog.component';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  matDialogRef: MatDialogRef<DialogComponent>;
  @Input() rows: any;
  @Input() titleTable: string;
  @Input() columns: any;
  @Input() page: number;
  @Input() total: number;
  @Input() pageSize: number;

  @Output() handlePage = new EventEmitter();
  @Output() removeSucc = new EventEmitter();

  role: string;
  constructor(
    private matDialog: MatDialog,
  ) { }

  ngOnInit() {
    this.role = JSON.parse(localStorage.getItem('user')).role;
  }

  changePage(event) {
    this.handlePage.emit(event);
  }

  openModal(item: any, action: string) {
    this.matDialogRef = this.matDialog.open(DialogComponent, {
      data: {
        action,
        item,
        page: this.page,
      },
      disableClose: false
    });
    this.matDialogRef.afterClosed().subscribe(result => {
      if (result === 'success') {
        this.removeSucc.emit();
      }
    });
  }
}
