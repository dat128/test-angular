import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  @Input() rows: any;
  @Input() columns: any;
  @Input() page: number;
  @Input() total: number;
  @Input() pageSize: number;

  @Output() handlePage = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  changePage(event) {
    this.handlePage.emit(event);
  }

}
