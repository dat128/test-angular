import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {
  name: String;
  formAccount: FormGroup;
  constructor(
    public formBuilder: FormBuilder,
    private _mdr: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) data: string
  ) {
    this.name = data;
    this.formAccount = this.formBuilder.group({
      fullName: [''],
      accountNumber: [''],
      balance: [''],
      email: [''],
      gender: [''],
    });
  }

  ngOnInit() {
  }

  CloseDialog() {
    this._mdr.close(false);
  }

}
