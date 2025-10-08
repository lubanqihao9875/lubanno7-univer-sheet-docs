# 属性

本章节将介绍 Lubanno7UniverSheet 组件的属性参数。

## 构造函数参数

创建 Lubanno7UniverSheet 实例时需要传入以下参数：

```js
const sheet = new Lubanno7UniverSheet(container, {
  columns,
  data,
  config
})
```

### container

- **类型**: `HTMLElement`
- **必填**: 是
- **描述**: 表格容器 DOM 元素，表格将渲染在此容器内。

### columns

- **类型**: `Array`
- **必填**: 是
- **描述**: 列配置数组，定义表格的列结构。

每个列对象包含以下属性：

| 属性 | 类型 | 必填 | 描述 |
| --- | --- | --- | --- |
| prop | String | 是 | 列数据字段名，对应数据对象的属性名 |
| label | String | 是 | 列标题，显示在表头 |
| width | Number | 否 | 列宽度，单位为像素 |
| children | Array | 否 | 子列数组，用于创建嵌套表头 |
| editor | Object/Function | 否 | 单元格编辑器配置 |

#### editor 配置

editor 可以是对象或函数：

- 当为对象时，直接定义编辑器配置
- 当为函数时，接收 `{ row, rowIndex, column, columnIndex }` 参数，返回编辑器配置对象

编辑器类型及其配置：

1. **只读编辑器**

```js
{
  type: 'readonly'
}
```

2. **下拉选择编辑器**

```js
{
  type: 'select',
  options: ['选项1', '选项2', '选项3'], // 下拉选项数组
  multiple: false, // 是否允许多选
  allowInput: false, // 是否允许输入非选项值
  selectValidationError: '请从下拉列表中选择一个值' // 自定义验证错误信息
}
```

3. **复选框编辑器**

```js
{
  type: 'checkbox',
  checkedValue: 1, // 选中值
  uncheckedValue: 0, // 未选中值
  checkboxValidationError: '请选择有效的复选框值' // 自定义验证错误信息
}
```

### data

- **类型**: `Array`
- **必填**: 是
- **描述**: 表格数据数组，每个对象表示一行数据。

数据对象的属性名应与列配置中的 `prop` 对应：

```js
const data = [
  { id: 1, name: '张三', age: 25 },
  { id: 2, name: '李四', age: 30 }
]
```

### config

- **类型**: `Object`
- **必填**: 否
- **描述**: 表格配置选项，包含样式、功能等配置。

表格配置包含以下部分：

#### 基础配置

##### locale

- **类型**: `String`
- **默认值**: `'zh-CN'`
- **可选值**: `'zh-CN'`, `'en-US'`
- **描述**: 设置表格的语言环境。

```js
const config = {
  locale: 'zh-CN'
}
```

##### darkMode

- **类型**: `Boolean`
- **默认值**: `false`
- **描述**: 是否启用暗黑模式。

```js
const config = {
  darkMode: true
}
```

##### loadingMessage

- **类型**: `String`
- **默认值**: `'数据加载中...'`
- **描述**: 加载提示文本。

```js
const config = {
  loadingMessage: '正在加载表格数据，请稍候...'
}
```

##### theme

- **类型**: `String`
- **默认值**: `'defaultTheme'`
- **可选值**: `'defaultTheme'`, `'greenTheme'`
- **描述**: 表格主题。

```js
const config = {
  theme: 'greenTheme'
}
```

##### emptyDataText

- **类型**: `String`
- **默认值**: `'暂无数据'`
- **描述**: 空数据提示文本。

```js
const config = {
  emptyDataText: '没有找到匹配的数据'
}
```

##### zoom

- **类型**: `Number`
- **默认值**: `1`
- **描述**: 表格缩放比例，1 表示 100%。

```js
const config = {
  zoom: 1.2 // 放大到 120%
}
```

##### scrollBehavior

- **类型**: `String`
- **默认值**: `'stop-at-boundary'`
- **可选值**: `'stop-at-boundary'`, `'prevent-always'`
- **描述**: 滚动行为设置。

```js
const config = {
  scrollBehavior: 'stop-at-boundary'
}
```

##### showContextMenu

- **类型**: `Boolean`
- **默认值**: `true`
- **描述**: 是否显示右键上下文菜单。

```js
const config = {
  showContextMenu: true
}
```

#### 布局配置

##### styleOptions

- **类型**: `Object`
- **默认值**: `{ width: '100%', height: '500px' }`
- **描述**: 表格容器样式选项。

```js
const config = {
  styleOptions: {
    width: '800px',
    height: '600px'
    // 可以添加其他自定义样式，例如：'border': '1px solid #ccc'
  }
}
```

##### headerOptions

- **类型**: `Object`
- **默认值**: `{ show: true, showToolbar: true, ribbonType: 'default' }`
- **描述**: 表格头部选项。

| 属性 | 类型 | 默认值 | 描述 |
| --- | --- | --- | --- |
| show | Boolean | true | 是否显示整个头部 |
| showToolbar | Boolean | true | 是否显示头部中的工具栏 |
| ribbonType | String | 'default' | 头部功能区类型，可选 'default' 或 'simple' |

```js
const config = {
  headerOptions: {
    show: true,
    showToolbar: true,
    ribbonType: 'simple'
  }
}
```

##### footerOptions

- **类型**: `Object`
- **默认值**: `{ show: true, showStatisticBar: false, showZoomSlider: true }`
- **描述**: 表格底部选项。

| 属性 | 类型 | 默认值 | 描述 |
| --- | --- | --- | --- |
| show | Boolean | true | 是否显示整个底部 |
| showStatisticBar | Boolean | false | 是否显示底部的统计信息栏 |
| showZoomSlider | Boolean | true | 是否显示底部的缩放滑块 |

```js
const config = {
  footerOptions: {
    show: true,
    showStatisticBar: true,
    showZoomSlider: true
  }
}
```

#### 样式配置

##### commonStyle

- **类型**: `Object`
- **描述**: 通用样式配置。

| 属性 | 类型 | 默认值 | 描述 |
| --- | --- | --- | --- |
| defaultRowHeight | Number | 20 | 默认行高 |
| defaultColumnWidth | Number | 80 | 默认列宽 |
| backgroundColor | String | '#fff' | 背景颜色 |
| borderColor | String | '#ccc' | 边框颜色 |
| borderType | String | 'all' | 边框类型，可选 'horizontal', 'vertical', 'all', 'none' |
| borderStyleType | String | 'thin' | 边框样式类型，可选 'none', 'thin', 'dashed', 'medium', 'mediumDashed', 'thick' |
| horizontalAlign | String | 'left' | 水平对齐方式，可选 'left', 'center', 'right' |
| verticalAlign | String | 'middle' | 垂直对齐方式，可选 'top', 'middle', 'bottom' |
| wrapStrategy | String | 'overflow' | 文本换行策略，可选 'wrap', 'overflow', 'clip' |
| padding | Number/null | null | 内边距，null 表示自动根据对齐方式设置 |
| color | String | '#000' | 文本颜色 |
| fontSize | Number | 12 | 字体大小 |
| fontWeight | String | 'normal' | 字体粗细 |
| rowHeader | Object | ```{ width: 50, hidden: false }``` | 行表头配置 |
| columnHeader | Object | ```{ height: 20, hidden: false }``` | 列表头配置 |

```js
const config = {
  commonStyle: {
    defaultRowHeight: 24,
    defaultColumnWidth: 100,
    backgroundColor: '#f5f7fa',
    borderColor: '#dcdfe6',
    borderType: 'all',
    borderStyleType: 'thin',
    horizontalAlign: 'center',
    verticalAlign: 'middle',
    wrapStrategy: 'wrap',
    color: '#333',
    fontSize: 14,
    fontWeight: 'normal',
    rowHeader: {
      width: 60,
      hidden: false
    },
    columnHeader: {
      height: 24,
      hidden: false
    }
  }
}
```

##### headerStyle

- **类型**: `Object`
- **描述**: 表头样式配置。

| 属性 | 类型 | 默认值 | 描述 |
| --- | --- | --- | --- |
| headerRowHeight | Number/null | null | 表头行高，null 表示使用 commonStyle.defaultRowHeight |
| backgroundColor | String/null | null | 背景颜色，null 表示使用 commonStyle.backgroundColor |
| color | String/null | null | 文本颜色，null 表示使用 commonStyle.color |
| fontSize | Number/null | null | 字体大小，null 表示使用 commonStyle.fontSize |
| fontWeight | String/null | null | 字体粗细，null 表示使用 commonStyle.fontWeight |

```js
const config = {
  headerStyle: {
    headerRowHeight: 30,
    backgroundColor: '#e6f7ff',
    color: '#1890ff',
    fontSize: 14,
    fontWeight: 'bold'
  }
}
```

##### readonlyCellStyle

- **类型**: `Object`
- **描述**: 只读单元格样式配置。

| 属性 | 类型 | 默认值 | 描述 |
| --- | --- | --- | --- |
| backgroundColor | String/null | null | 背景颜色，null 表示使用 commonStyle.backgroundColor |
| color | String/null | null | 文本颜色，null 表示使用 commonStyle.color |
| fontWeight | String/null | null | 字体粗细，null 表示使用 commonStyle.fontWeight |

```js
const config = {
  readonlyCellStyle: {
    backgroundColor: '#f5f5f5',
    color: '#999',
    fontWeight: 'normal'
  }
}
```

##### selectCellStyle

- **类型**: `Object`
- **描述**: 下拉选择单元格样式配置。

| 属性 | 类型 | 默认值 | 描述 |
| --- | --- | --- | --- |
| backgroundColor | String/null | null | 背景颜色，null 表示使用 commonStyle.backgroundColor |
| color | String/null | null | 文本颜色，null 表示使用 commonStyle.color |
| fontWeight | String/null | null | 字体粗细，null 表示使用 commonStyle.fontWeight |

```js
const config = {
  selectCellStyle: {
    backgroundColor: '#f0f9eb',
    color: '#67c23a',
    fontWeight: 'normal'
  }
}
```

##### checkboxCellStyle

- **类型**: `Object`
- **描述**: 复选框单元格样式配置。

| 属性 | 类型 | 默认值 | 描述 |
| --- | --- | --- | --- |
| backgroundColor | String/null | null | 背景颜色，null 表示使用 commonStyle.backgroundColor |
| color | String/null | null | 文本颜色，null 表示使用 commonStyle.color |
| fontWeight | String/null | null | 字体粗细，null 表示使用 commonStyle.fontWeight |

```js
const config = {
  checkboxCellStyle: {
    backgroundColor: '#f0f9eb',
    color: '#67c23a',
    fontWeight: 'normal'
  }
}
```

#### 功能配置

##### selectOptions

- **类型**: `Object`
- **描述**: 下拉选择配置。

| 属性 | 类型 | 默认值 | 描述 |
| --- | --- | --- | --- |
| selectValidationErrorInfo | String | '无效只是警告，该输入不在下拉列表中，但实际可以输入' | 下拉选择验证警告信息 |
| selectValidationErrorStop | String | '请从下拉列表中选择一个值' | 下拉选择验证错误信息 |
| selectValidationRenderMode | String | 'arrow' | 下拉选择渲染模式，可选 'text', 'arrow', 'custom' |

```js
const config = {
  selectOptions: {
    selectValidationErrorInfo: '输入的值不在选项列表中',
    selectValidationErrorStop: '请从下拉列表中选择一个有效值',
    selectValidationRenderMode: 'arrow'
  }
}
```

##### checkboxOptions

- **类型**: `Object`
- **描述**: 复选框配置。

| 属性 | 类型 | 默认值 | 描述 |
| --- | --- | --- | --- |
| checkboxValidationError | String | '请选择有效的复选框值' | 复选框验证错误信息 |
| checkedValue | Number/String/Boolean | 1 | 选中值 |
| uncheckedValue | Number/String/Boolean | 0 | 未选中值 |

```js
const config = {
  checkboxOptions: {
    checkboxValidationError: '请选择一个有效的值',
    checkedValue: true,
    uncheckedValue: false
  }
}
```

##### wheelNumberControl

- **类型**: `Object`
- **描述**: 鼠标滚轮数字控制配置。

| 属性 | 类型 | 默认值 | 描述 |
| --- | --- | --- | --- |
| mode | String | 'disabled' | 控制模式，可选 'disabled'（禁用）, 'editOnly'（仅编辑状态）, 'selected'（选中状态） |
| isCellAllowed | Boolean/Function | true | 是否允许单元格使用滚轮控制，可以是布尔值或函数 |
| step | Number | 1 | 普通步长 |
| shiftStep | Number | 10 | 按住 Shift 键时的步长 |

```js
const config = {
  wheelNumberControl: {
    mode: 'selected',
    isCellAllowed: ({ column }) => column.prop === 'quantity' || column.prop === 'price',
    step: 1,
    shiftStep: 5
  }
}
```

##### asyncOptions

- **类型**: `Object`
- **描述**: 异步加载选项。

| 属性 | 类型 | 默认值 | 描述 |
| --- | --- | --- | --- |
| isAsyncEnabled | Boolean | false | 是否启用异步加载 |
| baseBatchSize | Number | 500 | 基础批次大小 |
| loadHeaderBatchRatio | Number | 1 | 加载表头的批次比率 |
| mergeHeaderBatchRatio | Number | 1 | 合并表头的批次比率 |
| setColWidthBatchRatio | Number | 1 | 设置列宽的批次比率 |
| loadDataBatchRatio | Number | 1 | 加载数据的批次比率 |
| updateReadonlyCellStylesBatchRatio | Number | 1 | 更新只读单元格样式的批次比率 |
| setCellDataValidationBatchRatio | Number | 1 | 设置单元格数据验证的批次比率 |

```js
const config = {
  asyncOptions: {
    isAsyncEnabled: true,
    baseBatchSize: 1000,
    loadHeaderBatchRatio: 1,
    loadDataBatchRatio: 0.5
  }
}
```

##### permissionOptions

- **类型**: `Object`
- **描述**: 权限选项。

| 属性 | 类型 | 默认值 | 描述 |
| --- | --- | --- | --- |
| allowInsertRow | Boolean | true | 是否允许插入行 |
| allowDeleteRow | Boolean | true | 是否允许删除行 |

```js
const config = {
  permissionOptions: {
    allowInsertRow: true,
    allowDeleteRow: false
  }
}
```

##### plugins

- **类型**: `Object`
- **描述**: 插件配置。

| 属性 | 类型 | 默认值 | 描述 |
| --- | --- | --- | --- |
| filter | Object | { enabled: true } | 筛选插件配置 |
| sort | Object | { enabled: true } | 排序插件配置 |
| findReplace | Object | { enabled: true } | 查找替换插件配置 |

```js
const config = {
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
  }
}
```

## 暴露的属性

通过 `getExposed()` 方法可以获取表格暴露的属性和方法：

```js
const exposed = sheet.getExposed()
```

### attributes

暴露的属性对象，包含以下属性：

#### univerInstance

- **类型**: `Object`
- **描述**: Univer 引擎实例，可用于高级自定义操作。

#### univerAPIInstance

- **类型**: `Object`
- **描述**: Univer API 实例，提供对 Univer 引擎的 API 访问。

### methods

暴露的方法对象，包含各种操作表格的方法。详细方法列表请参考 [方法](/api/methods) 章节。