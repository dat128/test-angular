import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';
import { Account } from 'src/app/model/account';
import { AccountService } from 'src/app/service/account/account.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  matDialogRef: MatDialogRef<DialogComponent>;
  accounts: Account[];
  fields: any[];
  page: Number;
  total: Number;

  constructor(
    private matDialog: MatDialog,
    private accountService: AccountService
  ) {
    this.fields = [
      {
        label: 'FullName',
        field: 'fullName',
      },
      {
        label: 'Email',
        field: 'email'
      },
      {
        label: 'Account Number',
        field: 'accountNumber'
      },
      {
        label: 'Balance',
        field: 'balance'
      },
      {
        label: 'Gender',
        field: 'gender'
      }
    ];
  }

  ngOnInit() {
    this.getAccounts();
  }

  openModal($event: any) {
    this.matDialogRef = this.matDialog.open(DialogComponent, {
      data: 'abc',
      disableClose: false
    });
  }

  getAccounts() {
    this.accountService.getListAccounts().subscribe(data => {
      if (data.success) {
        this.accounts = data.data;
        this.page = data.page;
        this.total = data.total;
      }
    });
  }

  changePage(value) {
    console.log(value);
    // this.page = value;
  }

}
