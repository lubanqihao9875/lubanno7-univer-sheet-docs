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
        methods.refreshTableData()
      }
    }
  }
}
</script>
```

## 表格控制方法

### refreshTableData()

刷新表格数据，重新渲染当前数据。

```js
// 刷新表格显示
tableMethods.refreshTableData()
```

### recreateTable()

重新创建整个表格实例，用于结构性变更。

```js
// 当列配置发生重大变化时
tableMethods.recreateTable()
```

### refreshTableCommonConfig()

刷新表格通用配置，如样式、权限等。

```js
// 应用新的配置
tableMethods.refreshTableCommonConfig()
```

## 数据操作方法

### getCurrentTableData()

获取当前表格中的所有数据。

**返回值**: `Array<Record<string, any>>`

```js
const currentData = tableMethods.getCurrentTableData()
console.log('当前表格数据:', currentData)
```

### insertRowToEnd(row)

向表格末尾插入一行数据。

**参数**:
- `row`: `Record<string, any>` - 要插入的行数据

```js
const newRow = {
  name: '新员工',
  department: '技术部',
  status: '在职'
}

tableMethods.insertRowToEnd(newRow)
```

### updateRowData(index, rowData, mergeWithExisting)

更新指定索引的行数据。

**参数**:
- `index`: `number` - 行索引
- `rowData`: `Record<string, any>` - 新的行数据
- `mergeWithExisting`: `boolean` - 是否与现有数据合并（默认 `true`）

```js
// 完全替换第一行数据
tableMethods.updateRowData(0, {
  name: '更新后的姓名',
  age: 30
}, false)

// 部分更新第二行数据（合并模式）
tableMethods.updateRowData(1, {
  status: '已离职',
  leaveDate: '2024-01-15'
}, true)
```

## 编辑控制方法

### endEditing()

结束当前的编辑状态。

**返回值**: `Promise<void>`

```js
// 结束编辑并保存
await tableMethods.endEditing()
console.log('编辑已结束')
```

## 样式方法

### setCellFontColor(rowIndex, columnName, color)

设置指定单元格的字体颜色。

**参数**:
- `rowIndex`: `number` - 数据行索引（不包括表头）
- `columnName`: `string` - 列名（对应 `column.prop`）
- `color`: `string` - 颜色值

**返回值**: `boolean` - 是否设置成功

```js
// 设置第一行状态列为红色
const success = tableMethods.setCellFontColor(0, 'status', '#ff0000')

if (success) {
  console.log('字体颜色设置成功')
} else {
  console.log('字体颜色设置失败')
}
```

## 工具方法

### getColumnName(colIndex)

根据列索引获取列名。

**参数**:
- `colIndex`: `number` - 列索引

**返回值**: `string` - 列名

```js
const columnName = tableMethods.getColumnName(2)
console.log('第3列的列名:', columnName)
```

### getColumnIndex(columnName)

根据列名获取列索引。

**参数**:
- `columnName`: `string` - 列名

**返回值**: `number` - 列索引，未找到时返回 -1

```js
const columnIndex = tableMethods.getColumnIndex('status')
console.log('status列的索引:', columnIndex)
```

### getRowIndexByFilter(filter)

根据过滤条件获取第一个匹配行的索引。

**参数**:
- `filter`: `Record<string, any>` - 过滤条件对象

**返回值**: `number` - 行索引，未找到时返回 -1

```js
// 查找第一个状态为"已完成"的行
const rowIndex = tableMethods.getRowIndexByFilter({
  status: '已完成'
})

if (rowIndex !== -1) {
  console.log('找到匹配行，索引:', rowIndex)
}
```

### getRowIndexByFilterAll(filter)

根据过滤条件获取所有匹配行的索引数组。

**参数**:
- `filter`: `Record<string, any>` - 过滤条件对象

**返回值**: `number[]` - 匹配行的索引数组

```js
// 查找所有技术部员工
const rowIndices = tableMethods.getRowIndexByFilterAll({
  department: '技术部'
})

console.log('技术部员工行索引:', rowIndices)

// 为所有技术部员工设置特殊颜色
rowIndices.forEach(index => {
  tableMethods.setCellFontColor(index, 'department', '#0066cc')
})
```

## 方法调用注意事项

1. **初始化时机**: 大部分方法只有在 `tableInitialized` 事件触发后才可用
2. **异步操作**: `endEditing()` 是异步方法，需要使用 `await`
3. **数据同步**: 方法操作后可能需要调用 `refreshTableData()` 来更新显示
4. **错误处理**: 建议为方法调用添加 try-catch 错误处理
5. **性能考虑**: 批量操作时避免频繁调用刷新方法