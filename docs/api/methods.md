# 方法

本章节将介绍 Lubanno7UniverSheet 组件的方法 API。

## 实例方法

以下方法可以直接通过表格实例调用：

### on(eventName, handler)

- **描述**: 注册事件监听器
- **参数**:
  - `eventName` (String): 事件名称
  - `handler` (Function): 事件处理函数
- **返回值**: 表格实例，支持链式调用
- **示例**:

```js
sheet.on('cellClick', (params) => {
  console.log('点击的单元格:', params)
})
```

### off(eventName, handler)

- **描述**: 移除事件监听器
- **参数**:
  - `eventName` (String): 事件名称
  - `handler` (Function, 可选): 事件处理函数，如果不提供则移除该事件的所有监听器
- **返回值**: 表格实例，支持链式调用
- **示例**:

```js
// 移除特定的事件处理函数
sheet.off('cellClick', handleCellClick)

// 移除某个事件的所有监听器
sheet.off('cellClick')
```

### getExposed()

- **描述**: 获取表格暴露的属性和方法
- **参数**: 无
- **返回值**: 包含 `attributes` 和 `methods` 的对象
- **示例**:

```js
const exposed = sheet.getExposed()
const api = exposed.methods
const univerInstance = exposed.attributes.univerInstance
```

### dispose()

- **描述**: 销毁表格实例，释放资源
- **参数**: 无
- **返回值**: 无
- **示例**:

```js
sheet.dispose()
```

## 暴露的方法

以下方法通过 `getExposed().methods` 获取：

```js
const api = sheet.getExposed().methods
```

### 数据获取方法

#### getTableData()

- **描述**: 获取表格所有数据
- **参数**: 无
- **返回值**: 数据对象数组
- **示例**:

```js
const tableData = api.getTableData()
```

#### getRowByIndex(index)

- **描述**: 根据索引获取某一行数据
- **参数**:
  - `index` (Number): 行索引，从 0 开始
- **返回值**: 行数据对象，如果索引无效则返回 null
- **示例**:

```js
const rowData = api.getRowByIndex(1)
```

#### getRowByFilter(filter)

- **描述**: 根据筛选条件获取符合条件的第一行数据
- **参数**:
  - `filter` (Object): 筛选条件对象，属性名为列字段名，属性值为筛选值
- **返回值**: 符合条件的行数据对象，如果没有符合条件的行则返回 null
- **示例**:

```js
const row = api.getRowByFilter({ status: '已完成' })
```

#### getRowByFilterAll(filter)

- **描述**: 根据筛选条件获取所有符合条件的行数据
- **参数**:
  - `filter` (Object): 筛选条件对象，属性名为列字段名，属性值为筛选值
- **返回值**: 符合条件的行数据对象数组
- **示例**:

```js
const rows = api.getRowByFilterAll({ isVip: 1 })
```

#### getRowIndexByFilter(filter)

- **描述**: 根据筛选条件获取符合条件的第一行索引
- **参数**:
  - `filter` (Object): 筛选条件对象
- **返回值**: 行索引，如果没有符合条件的行则返回 -1
- **示例**:

```js
const rowIndex = api.getRowIndexByFilter({ name: '张三' })
```

#### getRowIndexByFilterAll(filter)

- **描述**: 根据筛选条件获取所有符合条件的行索引
- **参数**:
  - `filter` (Object): 筛选条件对象
- **返回值**: 行索引数组
- **示例**:

```js
const rowIndices = api.getRowIndexByFilterAll({ isVip: 1 })
```

#### getTableHeaderRowCount()

- **描述**: 获取表格的表头行数
- **参数**: 无
- **返回值**: 表头行数
- **示例**:

```js
const headerRowCount = api.getTableHeaderRowCount()
```

#### getTableDataRowCount()

- **描述**: 获取表格的数据行数
- **参数**: 无
- **返回值**: 数据行数
- **示例**:

```js
const dataRowCount = api.getTableDataRowCount()
```

#### getTableRowCount()

- **描述**: 获取表格的总行数（表头行数 + 数据行数）
- **参数**: 无
- **返回值**: 总行数
- **示例**:

```js
const totalRowCount = api.getTableRowCount()
```

#### getTableColumnCount()

- **描述**: 获取表格的总列数
- **参数**: 无
- **返回值**: 总列数
- **示例**:

```js
const totalColumnCount = api.getTableColumnCount()
```

#### getColumnName(colIdx)

- **描述**: 根据列索引获取列字段名
- **参数**:
  - `colIdx` (Number): 列索引，从 0 开始
- **返回值**: 列字段名
- **示例**:

```js
const columnName = api.getColumnName(2)
```

#### getColumnIndex(columnName)

- **描述**: 根据列字段名获取列索引
- **参数**:
  - `columnName` (String): 列字段名
- **返回值**: 列索引，如果未找到则返回 -1
- **示例**:

```js
const columnIndex = api.getColumnIndex('name')
```

### 数据操作方法

#### insertRowBefore(index, rowData)

- **描述**: 在指定索引前插入行
- **参数**:
  - `index` (Number): 行索引，从 0 开始
  - `rowData` (Object): 行数据对象
- **返回值**: 无
- **示例**:

```js
api.insertRowBefore(1, { name: '赵六', age: 35 })
```

#### insertRowAfter(index, rowData)

- **描述**: 在指定索引后插入行
- **参数**:
  - `index` (Number): 行索引，从 0 开始
  - `rowData` (Object): 行数据对象
- **返回值**: 无
- **示例**:

```js
api.insertRowAfter(2, { name: '钱七', age: 40 })
```

#### insertRowToEnd(rowData)

- **描述**: 在表格末尾插入行
- **参数**:
  - `rowData` (Object): 行数据对象
- **返回值**: 无
- **示例**:

```js
api.insertRowToEnd({ name: '孙八', age: 45 })
```

#### updateRow(index, rowData, mergeWithExisting)

- **描述**: 更新指定索引的行数据
- **参数**:
  - `index` (Number): 行索引，从 0 开始
  - `rowData` (Object): 行数据对象
  - `mergeWithExisting` (Boolean, 可选): 是否与现有数据合并，默认为 true
- **返回值**: 无
- **示例**:

```js
// 合并现有数据
api.updateRow(0, { age: 26 }, true)

// 替换现有数据
api.updateRow(0, { name: '张三', age: 26 }, false)
```

#### deleteRow(index)

- **描述**: 删除指定索引的行
- **参数**:
  - `index` (Number): 行索引，从 0 开始
- **返回值**: 无
- **示例**:

```js
api.deleteRow(3)
```

### 样式和状态方法

#### setCellFontColor(rowDataIdx, columnName, color)

- **描述**: 设置指定单元格的字体颜色
- **参数**:
  - `rowDataIdx` (Number): 行索引，从 0 开始
  - `columnName` (String): 列字段名
  - `color` (String): 颜色值，如 '#ff0000'
- **返回值**: 布尔值，表示操作是否成功
- **示例**:

```js
api.setCellFontColor(0, 'name', '#ff0000')
```

#### endEditing()

- **描述**: 结束当前编辑状态(异步)
- **参数**: 无
- **返回值**: 无
- **示例**:

```js
await api.endEditing()
```

### 导出方法

#### exportToJson(filename)

- **描述**: 导出表格数据为 JSON 格式
- **参数**:
  - `filename` (String): 导出的文件名
- **返回值**: 布尔值，表示操作是否成功
- **示例**:

```js
api.exportToJson('table-data.json')
```

#### exportToCsv(filename)

- **描述**: 导出表格数据为 CSV 格式
- **参数**:
  - `filename` (String): 导出的文件名
- **返回值**: 布尔值，表示操作是否成功
- **示例**:

```js
api.exportToCsv('table-data.csv')
```