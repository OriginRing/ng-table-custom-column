import { Directive, ElementRef, Input, OnChanges, SimpleChanges } from '@angular/core';

import { ColumnsList } from '../interfaces/table';

@Directive({
  selector: '[appTableStyle]'
})
export class TableStyleDirective implements OnChanges {
  @Input() public columnList: ColumnsList[] = [];
  @Input() public type: string = '';

  constructor(private el: ElementRef) {}

  ngOnChanges(changes: SimpleChanges): void {
    const { columnList, type } = changes;
    if (columnList || type) {
      this.columnList.forEach((v, i) => {
        if (v.value === this.type) {
          this.el.nativeElement.style.order = i;
          this.el.nativeElement.style.flex = `1 1 ${v.width}px`;
        }
      });
    }
  }
}
