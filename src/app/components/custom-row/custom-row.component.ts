import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';

import { NzModalRef } from 'ng-zorro-antd/modal';

import { ColumnsList } from '../../interfaces/table';

@Component({
  selector: 'app-custom-row',
  templateUrl: './custom-row.component.html',
  styleUrls: ['./custom-row.component.less']
})
export class CustomRowComponent implements OnInit {
  @Input() columnList: ColumnsList[] = [];

  title: ColumnsList[] = [];
  footer: ColumnsList[] = [];
  fix: ColumnsList[] = [];
  notFix: ColumnsList[] = [];

  getColumnList: ColumnsList[] = [];

  constructor(private nzModalRef: NzModalRef, private cdr: ChangeDetectorRef) {}

  drop(event: CdkDragDrop<ColumnsList[]>): void {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
    }
    this.fix = this.fix.map(item => {
      item.default = true;
      return item;
    });
    this.notFix = this.notFix.map(item => {
      item.default = false;
      return item;
    });
    this.cdr.markForCheck();
  }

  ngOnInit(): void {
    this.title = this.columnList.filter(item => item.fixed === 'left' && item.required);
    this.footer = this.columnList.filter(item => item.fixed === 'right' && item.required);
    this.fix = this.columnList.filter(item => item.default && !item.required);
    this.notFix = this.columnList.filter(item => !item.default && !item.required);
  }

  canvas(): void {
    this.nzModalRef.triggerCancel().then();
  }

  setCustom(): void {
    this.getColumnList = [...this.title, ...this.fix, ...this.notFix, ...this.footer];
    this.nzModalRef.triggerOk().then();
  }

  deleteCustom(value: ColumnsList, index: number): void {
    value.default = false;
    this.notFix = [...this.notFix, value];
    this.fix.splice(index, 1);
    this.cdr.markForCheck();
  }

  addCustom(value: ColumnsList, index: number): void {
    value.default = true;
    this.fix = [...this.fix, value];
    this.notFix.splice(index, 1);
    this.cdr.markForCheck();
  }
}
