import { Directive, ElementRef, Input, OnChanges, Renderer2, SimpleChanges } from '@angular/core';

import { ColumnsList } from '../interfaces/table';

@Directive({
  selector: '[appTableStyle]'
})
export class TableStyleDirective implements OnChanges {
  @Input() public columnList: ColumnsList[] = [];
  @Input() public type: string = '';

  // 开启 nzScroll 时, 重新计算固定th的位置
  @Input() public isScroll: boolean = false;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnChanges(changes: SimpleChanges): void {
    const { columnList, type } = changes;
    if (columnList || type) {
      this.columnList.forEach((v, i) => {
        if (v.value === this.type) {
          this.renderer.setStyle(this.el.nativeElement, 'order', i);
          this.renderer.setStyle(this.el.nativeElement, 'flex', `1 1 ${v.width}px`);
          if (this.isScroll) {
            if (v.value === 'name') {
              /**
               * 这里只处理了 两个 nzLef，多个 nzLeft，nzRight 同理
               * ······
               * 这里停掉了 name 的自适应宽度，主要是方便固定 sex 的位置
               * 你也可以不使用这种方式，获取 name 的宽度，给 sex 设置 left,但该样式必须要有!important，防止 zorro 计算的left影响
               */
              this.renderer.setStyle(this.el.nativeElement, 'flex', `0 0 ${v.width}px`);
            }
          }
        }
      });
    }
  }
}
