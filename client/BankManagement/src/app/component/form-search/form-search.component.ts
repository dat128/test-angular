import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-search',
  templateUrl: './form-search.component.html',
  styleUrls: ['./form-search.component.css']
})
export class FormSearchComponent implements OnInit {
  @Output() openEvent = new EventEmitter();

  searchForm: FormGroup;

  constructor(
    public formBuilder: FormBuilder,
  ) {
    this.searchForm = this.formBuilder.group({
      fullName: [''],
      accountNumber: [''],
      balance: [''],
      email: [''],
      gender: [''],
    });
  }

  ngOnInit() {
  }

  open() {
    this.openEvent.emit();
  }

}
