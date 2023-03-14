export interface Person {
  key: string;
  name: string;
  sex: 'man' | 'female';
  age: number;
  address: string;
  idCode: string;
  phone: number;
}

export interface ColumnsList {
  name: string; //columns枚举key
  value: string; //columns枚举value
  default: boolean; //初始值
  required?: boolean; //是否必选列
  fixed?: 'left' | 'right'; //必选列位置
  width: number;
}
