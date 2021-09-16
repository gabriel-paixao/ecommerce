import { Component, Input, OnInit, Output,EventEmitter } from '@angular/core';

@Component({
  selector: 'app-pager',
  templateUrl: './pager.component.html',
  styleUrls: ['./pager.component.scss']
})
export class PagerComponent implements OnInit {

  @Input() totalCount: number = 0;
  @Input() pageSize: number = 0;
  @Output() pageChanged: EventEmitter<number> = new EventEmitter<number>();

  constructor() { }

  ngOnInit(): void {
  }

  //Public Methods
  public onPageChanged(event: any): void {
    this.pageChanged.emit(event.page);
  }
}
