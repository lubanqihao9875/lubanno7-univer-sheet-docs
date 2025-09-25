# 组件属性

Lubanno7 Univer Sheet 组件接受以下 Props：

## columns
- **类型**: `Array`
- **必需**: `true`
- **描述**: 表格列配置数组

定义表格的列结构，每个列对象包含以下属性：

```js
const columns = [
  {
    prop: 'name',        // 字段名（必需）
    label: '姓名',        // 列标题（必需）
    width: 120,          // 列宽度（可选）
    children: [],        // 子列（嵌套表头用）
    editor: {}           // 编辑器配置（可选）
  }
]
```

## data
- **类型**: `Array`
- **必需**: `true`
- **描述**: 表格数据数组

表格显示的数据，每个对象代表一行：

```js
const data = [
  { name: '张三', age: 25, email: 'zhangsan@example.com' },
  { name: '李四', age: 30, email: 'lisi@example.com' }
]
```

## config
- **类型**: `Object`
- **必需**: `false`
- **描述**: 表格配置对象

包含所有可配置的选项，用于控制表格的外观和行为，默认值如下：
```js
{
  locale: 'zh-CN',
  darkMode: false,
  autoRefreshOnPropChange: false,
  loadingMessage: '数据加载中...',
  theme: 'defaultTheme',
  headerOptions: {
    show: true,          
    showToolbar: true,   
    ribbonType: 'default' 
  },
  footerOptions: {
    show: true,          
    showStatisticBar: false, 
    showZoomSlider: true    
  },
  showContextMenu: true, 
  selectOptions: {
    selectValidationErrorInfo: '无效只是警告，该输入不在下拉列表中，但实际可以输入',
    selectValidationErrorStop: '请从下拉列表中选择一个值',
    selectValidationRenderMode: 'arrow' 
  },
  checkboxOptions: {
    checkboxValidationError: '请选择有效的复选框值',
    checkedValue: 1,
    uncheckedValue: 0
  },
  emptyDataText: '暂无数据',
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
  permissionOptions: {
    allowInsertRow: true,
    allowDeleteRow: true
  },
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
  zoom: 1,
  scrollBehavior: 'stop-at-boundary',
  styleOptions: {
    width: '100%',
    height: '500px'
  },
  wheelNumberControl: {
    mode: 'editOnly',
    isCellAllowed: true,
    step: 1,
    shiftStep: 10
  },
  commonStyle: {
    defaultRowHeight: 20,
    defaultColumnWidth: 80,
    backgroundColor: '#fff',
    borderColor: '#ccc',
    borderType: 'all', 
    borderStyleType: 'thin', 
    horizontalAlign: 'left', 
    verticalAlign: 'middle', 
    wrapStrategy: 'overflow',
    padding: {
      top: 0,
      right: 0,
      bottom: 0,
      left: 8
    },
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
  headerStyle: {
    headerRowHeight: 20,
    backgroundColor: '#cfe2f3',
    color: '#000',
    fontSize: 12,
    fontWeight: 'normal'
  },
  readonlyCellStyle: {
    backgroundColor: '#eee',
    color: '#000',
    fontWeight: 'normal'
  },
  selectCellStyle: {
    backgroundColor: '#fff',
    color: '#000',
    fontWeight: 'normal'
  },
  checkboxCellStyle: {
    backgroundColor: '#fff',
    color: '#0078d4',
    fontWeight: 'normal'
  }
}
```