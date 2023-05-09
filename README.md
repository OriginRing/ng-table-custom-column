# 自定义表格列

## 实现环境

- angular 14
- angular/cdk 14
- ng-zorro-antd 14

## 运行

```shell
git clone https://github.com/OriginRing/ng-table-custom-column.git
cd ng-table-custom-column
npm install
npm run start
```

## 实现原理

参考 ag-grid 表格实现原理使用位移进行列排序，同时在保证不破坏 ng-zorro-antd table 写法的情况下实现该效果。

采用 `flex` 布局，对 `flex` 容器内每个模块进行分配，利用 `order` 属性进行排序

支持使用 `nzScroll` 和 虚拟滚动

## 效果

预览地址：[ng-table-custom-column](https://stackblitz.com/github/OriginRing/ng-table-custom-column)

![img](https://github.com/OriginRing/ng-table-custom-row/blob/master/src/assets/image.png)
