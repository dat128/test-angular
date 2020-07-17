import { Component, OnInit, Input } from '@angular/core';
import { Account } from 'src/app/model/account';
import { AccountService } from 'src/app/service/account/account.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  @Input() data: any;
  accounts: Account[];

  constructor(
    private accountService: AccountService
  ) { }

  ngOnInit() {
    this.getAccounts();
  }

  getAccounts() {
    this.accountService.getListAccounts().subscribe(data => {
      if (data.success) {
        this.accounts = data.data;
      }
    });
  }

}
