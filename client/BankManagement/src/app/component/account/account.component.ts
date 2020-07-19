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
  page: number;
  total: number;
  query: any = {};
  isLoaded: boolean = false;

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
    this.accountService.getListAccounts(this.query).subscribe(data => {
      if (data.success) {
        this.accounts = data.data;
        this.page = data.page;
        this.total = data.total;
        this.isLoaded = true;
      }
    });
  }

  changePage(value: number) {
    this.query.page = value
    this.getAccounts();
  }

  search(event: any) {
    Object.keys(event).forEach((key) => (event[key] == null) && delete event[key]);;
    this.query = event;
    console.log(event)
    this.getAccounts();
  }

}
