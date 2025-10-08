# 高级配置

本章节将介绍 Lubanno7UniverSheet 组件的高级配置选项和用法。

## 完整配置结构

Lubanno7UniverSheet 的配置选项非常丰富，以下是完整的配置结构：

```js
const config = {
  // 语言设置
  locale: 'zh-CN', // 可选值：'zh-CN', 'en-US'
  
  // 暗黑模式
  darkMode: false,
  
  // 加载提示文本
  loadingMessage: '数据加载中...',
  
  // 主题
  theme: 'defaultTheme', // 可选值：'defaultTheme', 'greenTheme'
  
  // 头部选项
  headerOptions: {
    show: true,          
    showToolbar: true,   
    ribbonType: 'default' // 可选 'default' 或 'simple'
  },
  
  // 底部选项
  footerOptions: {
    show: true,          
    showStatisticBar: false, 
    showZoomSlider: true    
  },
  
  // 是否展示右键上下文菜单
  showContextMenu: true,
  
  // 下拉选择配置
  selectOptions: {
    selectValidationErrorInfo: '无效只是警告，该输入不在下拉列表中，但实际可以输入', 
    selectValidationErrorStop: '请从下拉列表中选择一个值', 
    selectValidationRenderMode: 'arrow' // 可选值：'text', 'arrow', 'custom'
  },
  
  // 复选框配置
  checkboxOptions: {
    checkboxValidationError: '请选择有效的复选框值', 
    checkedValue: 1, 
    uncheckedValue: 0 
  },
  
  // 空数据提示文本
  emptyDataText: '暂无数据', 
  
  // 异步加载选项
  asyncOptions: {
    isAsyncEnabled: false, 
    baseBatchSize: 500, 
    loadHeaderBatchRatio: 1, 
    mergeHeaderBatchRatio: 1, 
    setColWidthBatchRatio: 1, 
    loadDataBatchRatio: 1, 
    updateReadonlyCellStylesBatchRatio: 1, 
    setCellDataValidationBatchRatio: 1 
  },
  
  // 权限选项
  permissionOptions: {
    allowInsertRow: true, 
    allowDeleteRow: true 
  },
  
  // 插件配置
  plugins: {
    filter: {
      enabled: true 
    },
    sort: {
      enabled: true 
    },
    findReplace: {
      enabled: true 
    }
  },
  
  // 缩放比例
  zoom: 1,
  
  // 滚动行为
  scrollBehavior: 'stop-at-boundary', // 可选值：'stop-at-boundary', 'prevent-always'
  
  // 样式选项
  styleOptions: {
    width: '100%',
    height: '500px'
    // 可以添加其他自定义样式，例如：'border': '1px solid #ccc'
  },
  
  // 鼠标滚轮数字控制
  wheelNumberControl: {
    mode: 'disabled', // 可选值：'disabled', 'editOnly', 'selected'
    isCellAllowed: true, 
    step: 1, 
    shiftStep: 10 
  },
  
  // 通用样式
  commonStyle: {
    defaultRowHeight: 20, 
    defaultColumnWidth: 80, 
    backgroundColor: '#fff', 
    borderColor: '#ccc', 
    borderType: 'all', // 可选值：'horizontal', 'vertical', 'all', 'none'
    borderStyleType: 'thin', // 可选值：'none', 'thin', 'dashed', 'medium', 'mediumDashed', 'thick'
    horizontalAlign: 'left', // 可选值：'left', 'center', 'right'
    verticalAlign: 'middle', // 可选值：'top', 'middle', 'bottom'
    wrapStrategy: 'overflow', // 可选值：'wrap', 'overflow', 'clip'
    padding: null, // 格式为{t: top, r: right, b: bottom, l: left}
    color: '#000', 
    fontSize: 12, 
    fontWeight: 'normal', 
    rowHeader: {
      width: 50, 
      hidden: false 
    },
    columnHeader: {
      height: 20, 
      hidden: false 
    }
  },
  
  // 表头样式
  headerStyle: {
    headerRowHeight: null, // 默认使用 commonStyle.defaultRowHeight
    backgroundColor: null, // 默认使用 commonStyle.backgroundColor
    color: null, // 默认使用 commonStyle.color
    fontSize: null, // 默认使用 commonStyle.fontSize
    fontWeight: null // 默认使用 commonStyle.fontWeight
  },
  
  // 只读单元格样式
  readonlyCellStyle: {
    backgroundColor: null, // 默认使用 commonStyle.backgroundColor
    color: null, // 默认使用 commonStyle.color
    fontWeight: null // 默认使用 commonStyle.fontWeight
  },
  
  // 下拉选择单元格样式
  selectCellStyle: {
    backgroundColor: null, // 默认使用 commonStyle.backgroundColor
    color: null, // 默认使用 commonStyle.color
    fontWeight: null // 默认使用 commonStyle.fontWeight
  },
  
  // 复选框单元格样式
  checkboxCellStyle: {
    backgroundColor: null, // 默认使用 commonStyle.backgroundColor
    color: null, // 默认使用 commonStyle.color
    fontWeight: null // 默认使用 commonStyle.fontWeight
  }
}
```

## 异步加载大数据

当表格数据量较大时，可以启用异步加载功能，分批加载数据，提高性能：

```js
const config = {
  asyncOptions: {
    isAsyncEnabled: true, // 启用异步加载
    baseBatchSize: 500, // 基础批次大小
    loadDataBatchRatio: 1 // 加载数据的批次比率
  }
}

const sheet = new Lubanno7UniverSheet(container, {
  columns,
  data: largeDataArray, // 大数据数组
  config
})
```

## 自定义样式

Lubanno7UniverSheet 提供了丰富的样式配置选项，可以自定义表格的外观：

```js
const config = {
  theme: 'greenTheme', // 使用绿色主题
  
  commonStyle: {
    defaultRowHeight: 24,
    defaultColumnWidth: 100,
    backgroundColor: '#f5f7fa',
    borderColor: '#dcdfe6',
    borderType: 'all',
    borderStyleType: 'thin',
    horizontalAlign: 'center',
    verticalAlign: 'middle',
    color: '#333',
    fontSize: 14
  },
  
  headerStyle: {
    backgroundColor: '#e6f7ff',
    color: '#1890ff',
    fontWeight: 'bold'
  },
  
  readonlyCellStyle: {
    backgroundColor: '#f5f5f5',
    color: '#999'
  }
}
```

## 鼠标滚轮数字控制

Lubanno7UniverSheet 支持使用鼠标滚轮调整数字单元格的值：

```js
const config = {
  wheelNumberControl: {
    mode: 'disabled', // ''disabled'：禁用；editOnly'：仅在编辑状态下生效；'selected'：选中状态下也生效
    isCellAllowed: true, // 是否允许所有单元格使用滚轮控制
    step: 1, // 普通步长
    shiftStep: 10 // 按住Shift键时的步长
  }
}
```

也可以通过函数动态控制哪些单元格允许使用滚轮调整：

```js
const config = {
  wheelNumberControl: {
    mode: 'selected',
    isCellAllowed: ({ row, rowIndex, column, columnIndex }) => {
      // 只允许数量和价格列使用滚轮调整
      return column.prop === 'quantity' || column.prop === 'price'
    },
    step: 1,
    shiftStep: 10
  }
}
```

## 插件配置

Lubanno7UniverSheet 内置了多种插件，可以根据需要启用或禁用：

```js
const config = {
  plugins: {
    filter: {
      enabled: true // 启用筛选功能
    },
    sort: {
      enabled: true // 启用排序功能
    },
    findReplace: {
      enabled: true // 启用查找替换功能
    }
  }
}
```

## 权限控制

可以通过权限选项控制用户对表格的操作权限：

```js
const config = {
  permissionOptions: {
    allowInsertRow: true, // 允许插入行
    allowDeleteRow: false // 禁止删除行
  }
}
```

## 自定义单元格字体颜色

可以通过 API 设置指定单元格的字体颜色：

```js
const api = sheet.getExposed()

// 设置第一行"price"列的字体颜色为红色
api.methods.setCellFontColor(0, 'price', '#ff0000')
```

## 结束编辑状态

在某些场景下，可能需要手动结束表格的编辑状态：

```js
const api = sheet.getExposed()

// 结束当前编辑状态(异步)
await api.methods.endEditing()
```

## 获取表格结构信息

可以通过 API 获取表格的结构信息：

```js
const api = sheet.getExposed()

// 获取表头行数
const headerRowCount = api.methods.getTableHeaderRowCount()

// 获取数据行数
const dataRowCount = api.methods.getTableDataRowCount()

// 获取总行数
const totalRowCount = api.methods.getTableRowCount()

// 获取总列数
const totalColumnCount = api.methods.getTableColumnCount()
```

## 访问底层 Univer 实例

在某些高级场景下，可能需要直接访问底层的 Univer 实例：

```js
const api = sheet.getExposed()

// 获取 Univer 实例
const univerInstance = api.attributes.univerInstance

// 获取 Univer API 实例
const univerAPIInstance = api.attributes.univerAPIInstance
```

::: tip 提示
通过 getExposed() 方法获取的 Univer 实例和 Univer API 实例提供了更灵活的底层操作能力，可用于高级定制和功能扩展，例如：监听原生 Univer 提供而组件未直接暴露的事件、调用底层 API 实现更复杂的数据处理、自定义表格渲染逻辑等。
:::

## 完整示例

以下是一个包含多种高级配置的完整示例：

```js
const container = document.getElementById('sheet-container')

// 列配置
const columns = [
  { 
    prop: 'id', 
    label: 'ID', 
    width: 80,
    editor: { type: 'readonly' }
  },
  { 
    prop: 'name', 
    label: '姓名', 
    width: 120 
  },
  { 
    prop: 'age', 
    label: '年龄', 
    width: 80 
  },
  { 
    prop: 'status', 
    label: '状态', 
    width: 100,
    editor: { 
      type: 'select', 
      options: ['待处理', '处理中', '已完成'], 
      allowInput: false
    }
  },
  { 
    prop: 'isVip', 
    label: 'VIP', 
    width: 80,
    editor: { 
      type: 'checkbox', 
      checkedValue: 1, 
      uncheckedValue: 0 
    }
  }
]

// 数据
const data = [
  { id: 1, name: '张三', age: 25, status: '待处理', isVip: 1 },
  { id: 2, name: '李四', age: 30, status: '处理中', isVip: 0 },
  { id: 3, name: '王五', age: 28, status: '已完成', isVip: 1 }
]

// 高级配置
const config = {
  locale: 'zh-CN',
  theme: 'defaultTheme',
  headerOptions: {
    show: true,
    showToolbar: true,
    ribbonType: 'default'
  },
  footerOptions: {
    show: true,
    showStatisticBar: true,
    showZoomSlider: true
  },
  showContextMenu: true,
  plugins: {
    filter: { enabled: true },
    sort: { enabled: true },
    findReplace: { enabled: true }
  },
  permissionOptions: {
    allowInsertRow: true,
    allowDeleteRow: true
  },
  styleOptions: {
    width: '100%',
    height: '500px'
  },
  commonStyle: {
    defaultRowHeight: 24,
    defaultColumnWidth: 100,
    backgroundColor: '#fff',
    borderColor: '#dcdfe6',
    borderType: 'all',
    borderStyleType: 'thin',
    horizontalAlign: 'left',
    verticalAlign: 'middle',
    color: '#333',
    fontSize: 14
  },
  headerStyle: {
    backgroundColor: '#f5f7fa',
    fontWeight: 'bold'
  },
  wheelNumberControl: {
    mode: 'selected',
    isCellAllowed: ({ column }) => column.prop === 'age',
    step: 1,
    shiftStep: 5
  }
}

// 创建表格实例
const sheet = new Lubanno7UniverSheet(container, {
  columns,
  data,
  config
})

// 监听事件
sheet.on('tableInitialized', () => {
  console.log('表格初始化完成')
  
  const api = sheet.getExposed()
  
  // 设置VIP用户的姓名为红色
  data.forEach((row, index) => {
    if (row.isVip === 1) {
      api.methods.setCellFontColor(index, 'name', '#ff0000')
    }
  })
})

sheet.on('cellClick', (params) => {
  console.log('点击的单元格:', params)
})

sheet.on('updateData', (params) => {
  console.log('更新的数据:', params)
})
```

在下一章节，我们将详细介绍 Lubanno7UniverSheet 的 API 参考。