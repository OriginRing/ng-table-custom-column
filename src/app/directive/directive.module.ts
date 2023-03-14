import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { TableStyleDirective } from './table-style.directive';

@NgModule({
  declarations: [TableStyleDirective],
  imports: [CommonModule],
  exports: [TableStyleDirective]
})
export class DirectiveModule {}
