import { ChangeDetectorRef, Component, OnInit, OnDestroy, ViewChild, AfterViewInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';

import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { NzTableComponent } from 'ng-zorro-antd/table';

import { CustomRowComponent } from './components/custom-row/custom-row.component';
import { ColumnsList, Person } from './interfaces/table';

const list: Person[] = [
  {
    key: 1,
    name: 'John Brown',
    sex: 'man',
    age: 23,
    address: 'New York No. 1 Lake Park',
    idCode: '123123123123123123123123',
    phone: 123123123123
  },
  {
    key: 2,
    name: 'Jim Green',
    sex: 'man',
    age: 42,
    address: 'London No. 1 Lake Park',
    idCode: '123123123123123123123123',
    phone: 234234234234
  },
  {
    key: 3,
    name: 'Joe Alacksss',
    sex: 'female',
    age: 34,
    address: 'Sidney No. 1 Lake Park',
    idCode: '123123123123123123123123',
    phone: 345345345
  },
  {
    key: 4,
    name: 'Joe Black',
    sex: 'female',
    age: 65,
    address: 'Sidney No. 1 Lake Park',
    idCode: '123123123123123123123123',
    phone: 345345345
  },
  {
    key: 5,
    name: 'Joe Clack',
    sex: 'female',
    age: 21,
    address: 'Sidney No. 1 Lake Park',
    idCode: '123123123123123123123123',
    phone: 345345345
  },
  {
    key: 6,
    name: 'Joe Dlack',
    sex: 'female',
    age: 12,
    address: 'Sidney No. 1 Lake Park',
    idCode: '123123123123123123123123',
    phone: 345345345
  },
  {
    key: 7,
    name: 'Joe Elack',
    sex: 'female',
    age: 34,
    address: 'Sidney No. 1 Lake Park',
    idCode: '123123123123123123123123',
    phone: 345345345
  },
  {
    key: 8,
    name: 'Joe Flack',
    sex: 'female',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    idCode: '123123123123123123123123',
    phone: 345345345
  },
  {
    key: 8,
    name: 'Joe Black',
    sex: 'female',
    age: 43,
    address: 'Sidney No. 1 Lake Park',
    idCode: '123123123123123123123123',
    phone: 345345345
  },
  {
    key: 8,
    name: 'Joe Black',
    sex: 'female',
    age: 21,
    address: 'Sidney No. 1 Lake Park',
    idCode: '123123123123123123123123',
    phone: 345345345
  },
  {
    key: 8,
    name: 'Joe Hlack',
    sex: 'female',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    idCode: '123123123123123123123123',
    phone: 345345345
  },
  {
    key: 9,
    name: 'Joe Black',
    sex: 'female',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    idCode: '123123123123123123123123',
    phone: 345345345
  }
];

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit, AfterViewInit, OnDestroy {
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
  listOfData: Person[] = [];
  loading = false;
  type: number = 0;

  @ViewChild('virtualTable', { static: false }) nzTableComponent?: NzTableComponent<Person>;
  private destroy$ = new Subject<void>();
  listOfDataVirtual: Person[] = [];

  public modalRef: NzModalRef | undefined;

  sortFn = (a: Person, b: Person): number => a.age - b.age;

  constructor(private nzModalService: NzModalService, private cdr: ChangeDetectorRef) {}

  public getShow(value: string): boolean {
    return this.columnList.filter(item => item.value === value)[0].default;
  }

  scrollToIndex(index: number): void {
    this.nzTableComponent?.cdkVirtualScrollViewport?.scrollToIndex(index);
  }

  trackByIndex(_: number, data: Person): number {
    return data.key;
  }

  setTableType(type: number): void {
    this.type = type;
    this.reload();
    this.cdr.markForCheck();
  }

  reload(): void {
    this.listOfData = [];
    this.loading = true;
    setInterval(() => {
      this.loading = false;
      this.listOfData = list;
      this.cdr.markForCheck();
    }, 3000);
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

  ngOnInit(): void {
    this.loading = true;
    setInterval(() => {
      this.loading = false;
      this.listOfData = list;
    }, 3000);

    const data: Person[] = [];
    for (let i = 0; i < 20000; i++) {
      data.push({
        key: i,
        name: `John Brown${i}`,
        sex: 'man',
        age: 10 + i,
        address: 'New York No. 1 Lake Park',
        idCode: '123123123123123123123123',
        phone: 123123123123
      });
    }
    this.listOfDataVirtual = data;
  }

  ngAfterViewInit(): void {
    this.nzTableComponent?.cdkVirtualScrollViewport?.scrolledIndexChange
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: number) => {
        console.log('scroll index to', data);
      });
  }

  ngOnDestroy(): void {
    this.modalRef?.close();
    this.destroy$.next();
    this.destroy$.complete();
  }
}
