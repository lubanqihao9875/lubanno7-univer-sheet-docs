# 事件

本章节将介绍 Lubanno7UniverSheet 组件的事件系统。

## 事件监听

Lubanno7UniverSheet 提供了一个简单的事件系统，可以通过 `on` 方法注册事件监听器，通过 `off` 方法移除事件监听器。

### 注册事件监听器

```js
sheet.on(eventName, handler)
```

### 移除事件监听器

```js
// 移除特定的事件处理函数
sheet.off(eventName, handler)

// 移除某个事件的所有监听器
sheet.off(eventName)
```

## 可用事件

### tableInitialized

表格初始化完成时触发

```js
sheet.on('tableInitialized', () => {
  console.log('表格初始化完成')
})
```

### updateData

单元格数据更新时触发。

```js
sheet.on('updateData',(params) => {
  console.log('数据更新:', params)
  // 可以在这里同步数据到后端
})
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

### insertRow

通过右键菜单或快捷键插入行时触发。

```js
sheet.on('insertRow', (params) => {
  console.log('插入行:', params)
})
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
sheet.on('deleteRow', (params) => {
  console.log('删除行:', params)
})
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
sheet.on('rowInserted', (params) => {
  console.log('行已插入:', params)
})
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
sheet.on('rowUpdated', (params) => {
  console.log('行已更新:', params)
})
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

### cellClick

单元格点击时触发。

```js
sheet.on('cellClick', (params) => {
  console.log('单元格点击:', params)
})
```

**事件参数**：
```js
{
  clickRow: {},              // 点击的行数据
  clickRowIndex: 0,          // 行索引
  clickColumn: 'name',       // 列名
  clickColumnIndex: 0,       // 列索引
  value: '单元格值'             // 单元格当前值
}
```

### forbiddenAction

执行被禁止的操作时触发，用于用户提示。

```js
sheet.on('forbiddenAction', (params) => {
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
})
```

**事件参数**：
```js
{
  type: 'copyHeaderForbidden' // 禁止操作的类型
}
```

**禁止操作类型**：
- `copyHeaderForbidden` - 禁止复制表头
- `deleteRowInHeaderForbidden` - 禁止删除表头行
- `editHeaderForbidden` - 禁止编辑表头
- `editReadonlyCellForbidden` - 禁止编辑只读单元格
- `insertRowInHeaderForbidden` - 禁止在表头插入行
- `mergeCellForbidden` - 禁止合并单元格
- `moveColsForbidden` - 禁止移动列
- `moveFromHeaderForbidden` - 禁止移动表头
- `moveFromHeaderRowForbidden` - 禁止移动表头行
- `moveReadOnlyCellForbidden` - 禁止移动只读单元格
- `moveToHeaderForbidden` - 禁止移动到表头
- `moveToHeaderRowForbidden` - 禁止移动到表头行
- `pasteHeaderForbidden` - 禁止粘贴到表头
- `pasteReadonlyCellForbidden` - 禁止粘贴到只读单元格
- `unmergeCellForbidden` - 禁止取消合并单元格
- `autoFillFromHeaderForbidden` - 禁止从表头开始自动填充
- `autoFillToHeaderForbidden` - 禁止填充到表头
- `autoFillReadOnlyCellForbidden` - 禁止填充只读单元格
- `clearHeaderContentForbidden` - 禁止清除表头内容
- `clearReadonlyCellContentForbidden` - 禁止清除只读单元格内容

## 事件优先级

当多个事件监听器注册到同一个事件时，它们将按照注册的顺序依次执行。如果您需要确保某个监听器先于其他监听器执行，请确保先注册该监听器。