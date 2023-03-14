import { ChangeDetectorRef, Component, OnDestroy } from '@angular/core';

import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';

import { CustomRowComponent } from './components/custom-row/custom-row.component';
import { ColumnsList, Person } from './interfaces/table';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnDestroy {
  columnList: ColumnsList[] = [
    {
      name: '名称',
      value: 'name',
      default: true,
      required: true,
      fixed: 'left',
      width: 150
    },
    {
      name: '年龄',
      value: 'age',
      default: true,
      required: false,
      width: 100
    },
    {
      name: '性别',
      value: 'sex',
      default: true,
      required: false,
      width: 100
    },
    {
      name: '地址',
      value: 'address',
      default: false,
      required: false,
      width: 200
    },
    {
      name: '联系方式',
      value: 'phone',
      default: false,
      required: false,
      width: 200
    },
    {
      name: '身份证',
      value: 'idCode',
      default: true,
      required: false,
      width: 200
    },
    {
      name: '操作',
      value: 'action',
      default: true,
      required: true,
      fixed: 'right',
      width: 150
    }
  ];
  listOfData: Person[] = [
    {
      key: '1',
      name: 'John Brown',
      sex: 'man',
      age: 23,
      address: 'New York No. 1 Lake Park',
      idCode: '123123123123123123123123',
      phone: 123123123123
    },
    {
      key: '2',
      name: 'Jim Green',
      sex: 'man',
      age: 42,
      address: 'London No. 1 Lake Park',
      idCode: '123123123123123123123123',
      phone: 234234234234
    },
    {
      key: '3',
      name: 'Joe Alacksss',
      sex: 'female',
      age: 34,
      address: 'Sidney No. 1 Lake Park',
      idCode: '123123123123123123123123',
      phone: 345345345
    },
    {
      key: '3',
      name: 'Joe Black',
      sex: 'female',
      age: 65,
      address: 'Sidney No. 1 Lake Park',
      idCode: '123123123123123123123123',
      phone: 345345345
    },
    {
      key: '3',
      name: 'Joe Clack',
      sex: 'female',
      age: 21,
      address: 'Sidney No. 1 Lake Park',
      idCode: '123123123123123123123123',
      phone: 345345345
    },
    {
      key: '3',
      name: 'Joe Dlack',
      sex: 'female',
      age: 12,
      address: 'Sidney No. 1 Lake Park',
      idCode: '123123123123123123123123',
      phone: 345345345
    },
    {
      key: '3',
      name: 'Joe Elack',
      sex: 'female',
      age: 34,
      address: 'Sidney No. 1 Lake Park',
      idCode: '123123123123123123123123',
      phone: 345345345
    },
    {
      key: '3',
      name: 'Joe Flack',
      sex: 'female',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
      idCode: '123123123123123123123123',
      phone: 345345345
    },
    {
      key: '3',
      name: 'Joe Black',
      sex: 'female',
      age: 43,
      address: 'Sidney No. 1 Lake Park',
      idCode: '123123123123123123123123',
      phone: 345345345
    },
    {
      key: '3',
      name: 'Joe Black',
      sex: 'female',
      age: 21,
      address: 'Sidney No. 1 Lake Park',
      idCode: '123123123123123123123123',
      phone: 345345345
    },
    {
      key: '3',
      name: 'Joe Hlack',
      sex: 'female',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
      idCode: '123123123123123123123123',
      phone: 345345345
    },
    {
      key: '3',
      name: 'Joe Black',
      sex: 'female',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
      idCode: '123123123123123123123123',
      phone: 345345345
    }
  ];

  public modalRef: NzModalRef | undefined;

  sortFn = (a: Person, b: Person): number => a.age - b.age;

  constructor(private nzModalService: NzModalService, private cdr: ChangeDetectorRef) {}

  public getShow(value: string): boolean {
    return this.columnList.filter(item => item.value === value)[0].default;
  }

  settingCustom(): void {
    this.modalRef = this.nzModalService.create({
      nzTitle: '列表设置',
      nzContent: CustomRowComponent,
      nzMaskClosable: false,
      nzClosable: false,
      nzComponentParams: {
        columnList: JSON.parse(JSON.stringify(this.columnList))
      },
      nzWidth: 800,
      nzOnOk: instance => {
        this.columnList = instance.getColumnList;
        this.cdr.markForCheck();
      }
    });
  }

  ngOnDestroy(): void {
    this.modalRef?.close();
  }
}
