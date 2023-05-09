import { DragDropModule } from '@angular/cdk/drag-drop';
import { registerLocaleData } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import en from '@angular/common/locales/en';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { IconDefinition } from '@ant-design/icons-angular';
import {
  StepBackwardOutline,
  CaretLeftOutline,
  SettingOutline,
  ReloadOutline,
  PlusCircleOutline,
  MinusCircleOutline
} from '@ant-design/icons-angular/icons';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { en_US, NZ_I18N } from 'ng-zorro-antd/i18n';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzModalModule, NzModalService } from 'ng-zorro-antd/modal';
import { NzTableModule } from 'ng-zorro-antd/table';

import { AppComponent } from './app.component';
import { CustomRowComponent } from './components/custom-row/custom-row.component';
import { DirectiveModule } from './directive/directive.module';

registerLocaleData(en);

const icons: IconDefinition[] = [
  StepBackwardOutline,
  CaretLeftOutline,
  SettingOutline,
  PlusCircleOutline,
  MinusCircleOutline,
  ReloadOutline
];

@NgModule({
  declarations: [AppComponent, CustomRowComponent],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NzIconModule.forRoot(icons),
    NzTableModule,
    NzDividerModule,
    NzButtonModule,
    NzGridModule,
    DragDropModule,
    NzModalModule,
    DirectiveModule
  ],
  providers: [{ provide: NZ_I18N, useValue: en_US }, { provide: NzModalService }],
  bootstrap: [AppComponent]
})
export class AppModule {}
