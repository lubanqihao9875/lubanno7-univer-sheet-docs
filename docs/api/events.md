# 事件

Lubanno7 Univer Sheet 提供了丰富的事件系统，让您可以响应用户操作和数据变化。

## 事件监听

通过 `@事件名` 或 `v-on:事件名` 的方式监听事件：

```vue
<template>
  <Lubanno7UniverSheet
    :columns="columns"
    :data="data"
    @tableInitialized="handleTableInitialized"
    @updateData="handleDataUpdate"
    @cellClick="handleCellClick"
  />
</template>
```

## 核心事件

### tableInitialized

表格初始化完成时触发。这是最重要的事件，提供组件方法的访问入口。

```js
handleTableInitialized({ exposed }) {
  // exposed 包含组件的属性和方法
  this.tableAPI = exposed
  
  // 访问 Univer 实例
  console.log(exposed.attributes.univerInstance)
  
  // 调用组件方法
  const data = exposed.methods.getTableData()
}
```

**事件参数**：
```js
{
  exposed: {
    attributes: {
      defaultConfig: {},          // 默认配置
      univerInstance: {},         // Univer 核心实例
      univerAPIInstance: {}       // Univer API 实例
    },
    methods: {
      getTableData: Function,     // 所有可用方法
      insertRowAfter: Function,
      // ... 其他方法
    }
  }
}
```

## 数据变化事件

### updateData

单元格数据更新时触发。

```js
handleDataUpdate(params) {
  console.log('数据更新:', params)
  // 可以在这里同步数据到后端
}
```

**事件参数**：
```js
{
  changedRow: {},           // 变更后的行数据
  changedRowIndex: 0,       // 行索引
  changedColumn: 'name',    // 变更的列名
  changedColumnIndex: 0,    // 列索引
  oldValue: '原值',          // 原始值
  newValue: '新值',          // 新值
  currentTableData: []      // 当前所有数据
}
```

## 行操作事件

### insertRow

通过右键菜单或快捷键插入行时触发。

```js
handleInsertRow(params) {
  console.log('插入行:', params)
}
```

**事件参数**：
```js
{
  insertRows: [],              // 插入的行数据数组
  insertRowStartIndex: 0,      // 插入开始位置
  insertRowEndIndex: 0,        // 插入结束位置
  currentTableData: []         // 当前所有数据
}
```

### deleteRow

通过右键菜单或快捷键删除行时触发。

```js
handleDeleteRow(params) {
  console.log('删除行:', params)
}
```

**事件参数**：
```js
{
  deleteRows: [],              // 删除的行数据数组
  deleteRowStartIndex: 0,      // 删除开始位置
  deleteRowEndIndex: 0,        // 删除结束位置
  currentTableData: []         // 当前所有数据
}
```

### rowInserted

通过组件方法插入行时触发。

```js
handleRowInserted(params) {
  console.log('行已插入:', params)
}
```

**事件参数**：
```js
{
  insertedRows: [],            // 插入的行数据数组
  insertedRowStartIndex: 0,    // 插入开始位置
  insertedRowEndIndex: 0,      // 插入结束位置
  currentTableData: []         // 当前所有数据
}
```

### rowUpdated

通过组件方法更新行时触发。

```js
handleRowUpdated(params) {
  console.log('行已更新:', params)
}
```

**事件参数**：
```js
{
  index: 0,                    // 更新的行索引
  oldRow: {},                  // 更新前的行数据
  newRow: {},                  // 更新后的行数据
  currentTableData: []         // 当前所有数据
}
```

## 交互事件

### cellClick

单元格点击时触发。

```js
handleCellClick(params) {
  console.log('单元格点击:', params)
}
```

**事件参数**：
```js
{
  clickedRow: {},              // 点击的行数据
  clickedRowIndex: 0,          // 行索引
  clickedColumn: 'name',       // 列名
  clickedColumnIndex: 0,       // 列索引
  value: '单元格值'             // 单元格当前值
}
```

### forbiddenAction

执行被禁止的操作时触发，用于用户提示。

```js
handleForbiddenAction(params) {
  console.log('操作被禁止:', params)
  
  // 根据类型显示不同提示
  switch (params.type) {
    case 'copyHeaderForbidden':
      this.$message.warning('不能复制表头')
      break
    case 'pasteReadonlyCellForbidden':
      this.$message.warning('不能粘贴到只读单元格')
      break
    // ... 其他类型
  }
}
```

**事件参数**：
```js
{
  type: 'copyHeaderForbidden' // 禁止操作的类型
}
```

**禁止操作类型**：
- `copyHeaderForbidden` - 禁止复制表头
- `pasteHeaderForbidden` - 禁止粘贴到表头
- `pasteReadonlyCellForbidden` - 禁止粘贴到只读单元格
- `insertRowInHeaderForbidden` - 禁止在表头插入行
- `deleteRowInHeaderForbidden` - 禁止删除表头行
- `autoFillFromHeaderForbidden` - 禁止从表头开始自动填充
- `autoFillToHeaderForbidden` - 禁止填充到表头
- `autoFillReadOnlyCellForbidden` - 禁止填充只读单元格
- `mergeCellForbidden` - 禁止合并单元格
- `unmergeCellForbidden` - 禁止取消合并单元格
- `moveFromHeaderForbidden` - 禁止移动表头
- `moveToHeaderForbidden` - 禁止移动到表头
- `moveReadOnlyCellForbidden` - 禁止移动只读单元格
- `clearHeaderContentForbidden` - 禁止清除表头内容
- `clearReadonlyCellContentForbidden` - 禁止清除只读单元格内容