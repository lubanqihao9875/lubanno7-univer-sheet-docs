# 方法

组件通过 `exposed` 对象提供了丰富的方法来控制表格行为。这些方法在 `tableInitialized` 事件触发后可用。

## 获取方法实例

```vue
<template>
  <Lubanno7UniverSheet
    ref="tableRef"
    :columns="columns"
    :data="data"
    @tableInitialized="handleTableInit"
  />
</template>

<script>
export default {
  data() {
    return {
      columns: [],
      data: [],
      tableMethods: null
    }
  },
  methods: {
    handleTableInit(event) {
      this.tableMethods = event.exposed.methods
      // 现在可以调用表格方法了
    },
    
    someFunction() {
      if (this.$refs.tableRef && this.$refs.tableRef.exposed) {
        const methods = this.$refs.tableRef.exposed.methods
        methods.recreateTable()
      }
    }
  }
}
</script>
```

## 数据获取方法

### getTableData()

获取当前表格的所有数据。

```js
// 返回值：Array
const data = this.tableAPI.methods.getTableData()
console.log(data) // [{ name: '张三', age: 25 }, ...]
```

### getRowByIndex(index)

根据索引获取指定行数据。

- **参数**: `index` (number) - 行索引（从 0 开始）
- **返回值**: `object | null` - 行数据对象，索引无效时返回 null

```js
const row = this.tableAPI.methods.getRowByIndex(0)
console.log(row) // { name: '张三', age: 25 }
```

### getRowByFilter(filter)

根据筛选条件获取第一个匹配的行。

- **参数**: `filter` (object) - 筛选条件对象
- **返回值**: `object | null` - 匹配的行数据，无匹配时返回 null

```js
const row = this.tableAPI.methods.getRowByFilter({ name: '张三' })
console.log(row) // { name: '张三', age: 25 }
```

### getRowByFilterAll(filter)

根据筛选条件获取所有匹配的行。

- **参数**: `filter` (object) - 筛选条件对象
- **返回值**: `Array` - 匹配的行数据数组

```js
const rows = this.tableAPI.methods.getRowByFilterAll({ age: 25 })
console.log(rows) // [{ name: '张三', age: 25 }, ...]
```

### getRowIndexByFilter(filter)

根据筛选条件获取第一个匹配行的索引。

- **参数**: `filter` (object) - 筛选条件对象
- **返回值**: `number` - 行索引，无匹配时返回 -1

```js
const index = this.tableAPI.methods.getRowIndexByFilter({ name: '张三' })
console.log(index) // 0
```

### getRowIndexByFilterAll(filter)

根据筛选条件获取所有匹配行的索引数组。

- **参数**: `filter` (object) - 筛选条件对象
- **返回值**: `Array<number>` - 匹配行的索引数组

```js
const indices = this.tableAPI.methods.getRowIndexByFilterAll({ age: 25 })
console.log(indices) // [0, 2, 5]
```

## 表格信息方法

### getTableHeaderRowCount()

获取表头行数。

```js
const headerRows = this.tableAPI.methods.getTableHeaderRowCount()
console.log(headerRows) // 1 或更多（嵌套表头）
```

### getTableDataRowCount()

获取数据行数。

```js
const dataRows = this.tableAPI.methods.getTableDataRowCount()
console.log(dataRows) // 实际数据行数
```

### getTableRowCount()

获取总行数（表头 + 数据）。

```js
const totalRows = this.tableAPI.methods.getTableRowCount()
console.log(totalRows) // 表头行数 + 数据行数
```

### getTableColumnCount()

获取总列数。

```js
const columnCount = this.tableAPI.methods.getTableColumnCount()
console.log(columnCount) // 扁平化后的列数
```

## 行操作方法

### insertRowBefore(index, rowData)

在指定索引前插入行。

- **参数**:
  - `index` (number) - 插入位置索引
  - `rowData` (object) - 新行数据

```js
this.tableAPI.methods.insertRowBefore(1, {
  name: '新用户',
  age: 28
})
```

### insertRowAfter(index, rowData)

在指定索引后插入行。

- **参数**:
  - `index` (number) - 插入位置索引
  - `rowData` (object) - 新行数据

```js
this.tableAPI.methods.insertRowAfter(1, {
  name: '新用户',
  age: 28
})
```

### insertRowToEnd(rowData)

在表格末尾插入行。

- **参数**: `rowData` (object) - 新行数据

```js
this.tableAPI.methods.insertRowToEnd({
  name: '新用户',
  age: 28
})
```

### updateRow(index, rowData, mergeWithExisting)

更新指定索引的行数据。

- **参数**:
  - `index` (number) - 行索引
  - `rowData` (object) - 新的行数据
  - `mergeWithExisting` (boolean) - 是否与现有数据合并，默认 true

```js
// 部分更新（合并）
this.tableAPI.methods.updateRow(0, { age: 26 })

// 完全替换
this.tableAPI.methods.updateRow(0, { name: '李四', age: 26 }, false)
```

### deleteRow(index)

删除指定索引的行。

- **参数**: `index` (number) - 要删除的行索引

```js
this.tableAPI.methods.deleteRow(0)
```

## 工具方法

### getColumnName(columnIndex)

根据列索引获取列名。

- **参数**: `columnIndex` (number) - 列索引
- **返回值**: `string` - 列的 prop 属性值

```js
const columnName = this.tableAPI.methods.getColumnName(0)
console.log(columnName) // 'name'
```

### getColumnIndex(columnName)

根据列名获取列索引。

- **参数**: `columnName` (string) - 列的 prop 属性值
- **返回值**: `number` - 列索引，未找到时返回 -1

```js
const columnIndex = this.tableAPI.methods.getColumnIndex('name')
console.log(columnIndex) // 0
```

### endEditing()

结束当前单元格的编辑状态。

```js
await this.tableAPI.methods.endEditing()
```

### setCellFontColor(rowIndex, columnName, color)

设置指定单元格的字体颜色。

- **参数**:
  - `rowIndex` (number) - 数据行索引
  - `columnName` (string) - 列名
  - `color` (string) - 颜色值（如 '#ff0000'）
- **返回值**: `boolean` - 设置是否成功

```js
const success = this.tableAPI.methods.setCellFontColor(0, 'name', '#ff0000')
console.log(success) // true 或 false
```

## 方法调用注意事项

1. **初始化时机**: 大部分方法只有在 `tableInitialized` 事件触发后才可用
2. **异步操作**: `endEditing()` 是异步方法，需要使用 `await`
3. **数据同步**: 可以调用 `recreateTable()` 方法来刷新表格数据，确保数据与 UI 同步
4. **错误处理**: 建议为方法调用添加 try-catch 错误处理
5. **性能考虑**: 批量操作时避免频繁调用刷新方法