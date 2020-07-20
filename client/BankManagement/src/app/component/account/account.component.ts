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
  isLoaded: boolean;
  title: string;

  constructor(
    private matDialog: MatDialog,
    private accountService: AccountService
  ) {
    this.fields = [
      {
        label: 'FullName',
        field: 'fullName',
        width: '200'
      },
      {
        label: 'Email',
        field: 'email',
        width: '150'
      },
      {
        label: 'Account Number',
        field: 'accountNumber',
        width: '150'
      },
      {
        label: 'Balance',
        field: 'balance',
        width: '150',
      },
      {
        label: 'Gender',
        field: 'gender',
        width: '150',
      },
      {
        label: 'Age',
        field: 'age',
        width: '150',
      },
      {
        label: 'City',
        field: 'city',
        width: '150',
      },
      {
        label: 'Address',
        field: 'address',
        width: '150',
      }
    ];
    this.title = 'List bank account';
  }

  ngOnInit() {
    this.getAccounts();
  }

  openModal($event: any) {
    this.matDialogRef = this.matDialog.open(DialogComponent, {
      data: {
        action: 'add'
      },
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
    this.query.page = value;
    this.getAccounts();
  }

  search(event: any) {
    Object.keys(event).forEach((key) => (event[key] == null) && delete event[key]);
    this.query = event;
    this.getAccounts();
  }

  reloadData() {
    this.getAccounts();
  }

}
