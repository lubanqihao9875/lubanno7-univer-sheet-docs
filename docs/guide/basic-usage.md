# 基础用法

本章节将介绍 Lubanno7UniverSheet 组件的基础用法。

## 创建表格

创建表格需要提供三个核心参数：容器元素、列配置和数据。

```js
const container = document.getElementById('sheet-container')

// 列配置
const columns = [
  { prop: 'name', label: '姓名', width: 120 },
  { prop: 'age', label: '年龄', width: 80 },
  { prop: 'address', label: '地址', width: 200 }
]

// 数据
const data = [
  { name: '张三', age: 25, address: '北京市朝阳区' },
  { name: '李四', age: 30, address: '上海市浦东新区' },
  { name: '王五', age: 28, address: '广州市天河区' }
]

// 创建表格实例
const sheet = new Lubanno7UniverSheet(container, {
  columns,
  data,
  config: {} // 可选配置
})
```

## 嵌套表头

Lubanno7UniverSheet 支持嵌套表头，通过在列配置中使用 `children` 属性实现：

```js
const columns = [
  { 
    label: '个人信息', 
    children: [
      { prop: 'name', label: '姓名', width: 120 },
      { prop: 'age', label: '年龄', width: 80 }
    ] 
  },
  { 
    label: '联系方式', 
    children: [
      { prop: 'address', label: '地址', width: 200 },
      { prop: 'phone', label: '电话', width: 150 }
    ] 
  }
]
```

## 单元格编辑器

Lubanno7UniverSheet 支持多种单元格编辑器类型，通过列配置中的 `editor` 属性设置：

### 只读单元格

```js
const columns = [
  { 
    prop: 'id', 
    label: 'ID', 
    width: 80,
    editor: { type: 'readonly' } // 设置为只读
  },
  // 其他列...
]
```

### 下拉选择框

```js
const columns = [
  { 
    prop: 'status', 
    label: '状态', 
    width: 100,
    editor: { 
      type: 'select', 
      options: ['待处理', '处理中', '已完成'], 
      allowInput: false // 是否允许输入非选项值
    }
  },
  // 其他列...
]
```

### 复选框

```js
const columns = [
  { 
    prop: 'isActive', 
    label: '是否激活', 
    width: 100,
    editor: { 
      type: 'checkbox', 
      checkedValue: 1, // 选中值
      uncheckedValue: 0 // 未选中值
    }
  },
  // 其他列...
]
```

### 动态编辑器配置

编辑器配置也可以是一个函数，根据行数据动态返回配置：

```js
const columns = [
  { 
    prop: 'price', 
    label: '价格', 
    width: 100,
    editor: ({ row, rowIndex, column, columnIndex }) => {
      // 根据行数据动态决定是否为只读
      if (row.isVip) {
        return { type: 'readonly' }
      }
      return null // 默认可编辑
    }
  },
  // 其他列...
]
```

## 事件监听

Lubanno7UniverSheet 提供了完善的事件系统，可以监听各种表格事件：

```js
// 监听单元格点击事件
sheet.on('cellClick', (params) => {
  console.log('点击的单元格:', params)
})

// 监听数据更新事件
sheet.on('updateData', (params) => {
  console.log('更新的数据:', params)
})

// 监听行插入事件
sheet.on('insertRow', (params) => {
  console.log('插入的行:', params)
})

// 监听行删除事件
sheet.on('deleteRow', (params) => {
  console.log('删除的行:', params)
})

// 移除事件监听
sheet.off('cellClick')
```

## 获取表格数据

可以通过表格实例的 `getExposed()` 方法获取暴露的 API，然后调用相应方法获取表格数据：

```js
const api = sheet.getExposed()

// 获取表格所有数据
const tableData = api.methods.getTableData()

// 获取指定行数据
const rowData = api.methods.getRowByIndex(1)

// 根据条件获取行数据
const filteredRow = api.methods.getRowByFilter({ status: '已完成' })
```

## 操作表格数据

通过暴露的 API 可以对表格数据进行增删改操作：

```js
const api = sheet.getExposed()

// 在指定位置前插入行
api.methods.insertRowBefore(1, { name: '赵六', age: 35, address: '深圳市南山区' })

// 在指定位置后插入行
api.methods.insertRowAfter(2, { name: '钱七', age: 40, address: '杭州市西湖区' })

// 在表格末尾插入行
api.methods.insertRowToEnd({ name: '孙八', age: 45, address: '成都市武侯区' })

// 更新指定行数据
api.methods.updateRow(0, { age: 26 }, true) // 第三个参数为 true 表示合并现有数据

// 删除指定行
api.methods.deleteRow(3)
```

## 导出数据

Lubanno7UniverSheet 支持将表格数据导出为 JSON 或 CSV 格式：

```js
const api = sheet.getExposed()

// 导出为 JSON
api.methods.exportToJson('table-data.json')

// 导出为 CSV
api.methods.exportToCsv('table-data.csv')
```

## 销毁表格

当不再需要表格时，应该调用 `dispose` 方法销毁表格实例，释放资源：

```js
// 调用dispose方法销毁表格实例
sheet.dispose()
```

在下一章节，我们将介绍 Lubanno7UniverSheet 的高级配置选项。