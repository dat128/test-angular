import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountService } from 'src/app/service/account/account.service';
import { Account } from 'src/app/model/account';
import { Constant } from 'src/app/common/constant';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {
  name: string;
  formAccount: FormGroup;
  account: Account;
  submitted: boolean;
  dataForm: any;
  constructor(
    private toastrService: ToastrService,
    public accountService: AccountService,
    public formBuilder: FormBuilder,
    private _mdr: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) data: string
  ) {
    this.dataForm = data;
    this.account = new Account();
    this.formAccount = this.formBuilder.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern(Constant.PATTERN.EMAIL)]],
      balance: ['', [Validators.required, Validators.pattern(Constant.PATTERN.DOUBLE)]],
      gender: ['', Validators.required],
      accountNumber: ['',
      [Validators.required, Validators.pattern(Constant.PATTERN.NUMBER), Validators.maxLength(18), Validators.minLength(10)]],
      age: ['',
      [Validators.required, Validators.pattern(Constant.PATTERN.NUMBER)]],
      city: ['', Validators.required],
      address: ['', Validators.required],
    });
  }

  ngOnInit() {
    if (this.dataForm.action === 'view' || this.dataForm.action === 'edit') {
      this.getAccount();
    }
  }

  initForm() {
    // this.formAccount = this.formBuilder.group({
    //   fullName: [this.account.fullName || '', Validators.required],
    //   email: [this.account.email || '', [Validators.required, Validators.pattern(Constant.PATTERN.EMAIL)]],
    //   balance: [this.account.balance || '', [Validators.required, Validators.pattern(Constant.PATTERN.NUMBER)]],
    //   gender: [this.account.gender || '', Validators.required],
    //   accountNumber: [this.account.accountNumber || '',
    //   [Validators.required, Validators.pattern(Constant.PATTERN.NUMBER), Validators.maxLength(18), Validators.minLength(10)]],
    // });
  }

  get f() { return this.formAccount.controls; }

  closeDialog(status) {
    this._mdr.close(status);
  }

  onSubmit() {
    this.submitted = true;
    if (!this.formAccount.invalid) {
      this.account = this.formAccount.value;
      if (this.dataForm.action === 'add') {
        this.createAccount();
      } else {
        this.editAccount();
      }
    }
  }

  getAccount() {
    this.accountService.getAccount(this.dataForm.item._id).subscribe(data => {
      if (data.success) {
        this.formAccount.patchValue(data.data);
      }
    });
  }

  createAccount() {
    this.accountService.createAccount(this.account).subscribe(data => {
      if (data.success) {
        this.toastrService.success(data.message);
        this.closeDialog('success');
      } else {
        this.toastrService.error(data.message || 'Error! An error occurred. Please try again later');
      }
    });
  }

  editAccount() {
    this.accountService.updateAccount(this.dataForm.item._id, this.account).subscribe(data => {
      if (data.success) {
        this.toastrService.success(data.message);
        this.closeDialog('success');
      } else {
        this.toastrService.error(data.message || 'Error! An error occurred. Please try again later');
      }
    });
  }

  deleteAccount() {
    this.accountService.deleteAccount(this.dataForm.item._id).subscribe(data => {
      if (data.success) {
        this.toastrService.success(data.message);
        this.closeDialog('success');
      } else {
        this.toastrService.error(data.message || 'Error! An error occurred. Please try again later');
      }
    });
  }

}
