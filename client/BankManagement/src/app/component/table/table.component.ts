import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  @Input() rows: any;
  @Input() columns: any;
  @Input() page: Number;
  @Input() total: Number;

  @Output() handlePage = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  changePage(event) {
    this.handlePage.emit(event);
  }

}
