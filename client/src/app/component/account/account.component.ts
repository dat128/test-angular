import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';
import { Account } from 'src/app/model/account';
import { AccountService } from 'src/app/service/account/account.service';
import { NgxSpinnerService } from 'ngx-spinner';

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
    private accountService: AccountService,
    private spinner: NgxSpinnerService
  ) {
    this.fields = [
      {
        label: 'FullName',
        field: 'fullName',
        style: {
          'text-align': 'left',
        }
      },
      {
        label: 'Email',
        field: 'email',
        style: {
          'text-align': 'left',
        }
      },
      {
        label: 'Account Number',
        field: 'accountNumber',
        style: {
          'text-align': 'center',
        }
      },
      {
        label: 'Balance',
        field: 'balance',
        style: {
          'text-align': 'center',
        }
      },
      {
        label: 'Gender',
        field: 'gender',
        style: {
          'text-align': 'left',
        }
      },
      {
        label: 'Age',
        field: 'age',
        style: {
          'text-align': 'center',
        }
      },
      {
        label: 'City',
        field: 'city',
        style: {
          'text-align': 'left',
        }
      },
      {
        label: 'Address',
        field: 'address',
        style: {
          'text-align': 'left',
        }
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
    this.matDialogRef.afterClosed().subscribe(result => {
      if (result === 'success') {
          this.getAccounts();
      }
    });
  }

  getAccounts() {
    this.spinner.show();
    this.accountService.getListAccounts(this.query).subscribe(data => {
      if (data.success) {
        this.accounts = data.data.map(
          item => {
            return { ...item, balance: item.balance.toLocaleString() };
          }
        );
        this.page = data.page;
        this.total = data.total;
        this.isLoaded = true;
      }
      this.spinner.hide();
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
