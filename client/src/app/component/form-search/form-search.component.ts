import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Constant } from 'src/app/common/constant';

@Component({
  selector: 'app-form-search',
  templateUrl: './form-search.component.html',
  styleUrls: ['./form-search.component.css']
})
export class FormSearchComponent implements OnInit {
  @Output() openEvent = new EventEmitter();
  @Output() searchEvent = new EventEmitter();

  searchForm: FormGroup;
  submitted: boolean;

  constructor(
    public formBuilder: FormBuilder,
  ) {
    this.searchForm = this.formBuilder.group({
      fullName: [''],
      accountNumber: [''],
      minBalance: ['', [Validators.pattern(Constant.PATTERN.DOUBLE)]],
      maxBalance: ['', [Validators.pattern(Constant.PATTERN.DOUBLE)]],
      email: [''],
      city: [''],
      age: ['', [Validators.pattern(Constant.PATTERN.NUMBER)]],
      address: [''],
      gender: [''],
    });
  }

  ngOnInit() {
  }

  get f() { return this.searchForm.controls; }

  search(event: any) {
    this.submitted = true;
    if (!this.searchForm.invalid) {
      this.searchEvent.emit(this.searchForm.value);
    }
  }

  open() {
    this.openEvent.emit();
  }

}
