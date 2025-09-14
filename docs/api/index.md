# 组件属性

## Props

### columns

- **类型**: `Array<Column>`
- **必需**: `true`
- **说明**: 表格列配置数组

#### Column 类型定义

```typescript
interface Column {
  prop: string              // 列数据字段名
  label: string             // 列显示标题
  width?: number            // 列宽度（像素）
  children?: Column[]       // 子列（嵌套表头）
  editor?: Editor | Function // 单元格编辑器
}
```

#### Editor 类型定义

```typescript
interface Editor {
  type: 'readonly' | 'select'
  
  // select 类型专用
  options?: string[]        // 下拉选项
  multiple?: boolean        // 是否支持多选
  allowInput?: boolean      // 是否允许输入不在列表中的值
  selectValidationError?: string // 验证错误信息
}
```

#### 列配置示例

```js
columns: [
  // 基础列
  { prop: 'name', label: '姓名', width: 120 },
  
  // 只读列
  { 
    prop: 'id', 
    label: 'ID', 
    width: 80,
    editor: { type: 'readonly' }
  },
  
  // 下拉选择列
  {
    prop: 'status',
    label: '状态',
    width: 100,
    editor: {
      type: 'select',
      options: ['待处理', '进行中', '已完成'],
      allowInput: false
    }
  },
  
  // 动态编辑器
  {
    prop: 'department',
    label: '部门',
    width: 120,
    editor: ({ row, rowIndex }) => {
      if (row.level === 'manager') {
        return {
          type: 'select',
          options: ['技术部', '产品部', '运营部'],
          allowInput: false
        }
      }
      return { type: 'readonly' }
    }
  },
  
  // 嵌套表头
  {
    label: '联系方式',
    children: [
      { prop: 'phone', label: '电话', width: 120 },
      { prop: 'email', label: '邮箱', width: 200 }
    ]
  }
]
```

### data

- **类型**: `Array<Record<string, any>>`
- **必需**: `true`
- **说明**: 表格数据数组

#### 数据示例

```js
data: [
  {
    id: 1,
    name: '张三',
    age: 28,
    department: '技术部',
    status: '在职',
    phone: '13800138000',
    email: 'zhangsan@example.com'
  },
  {
    id: 2,
    name: '李四',
    age: 32,
    department: '产品部',
    status: '在职',
    phone: '13900139000',
    email: 'lisi@example.com'
  }
]
```

### config

- **类型**: `Config`
- **必需**: `false`
- **默认值**: 见默认配置
- **说明**: 表格配置选项

#### Config 类型定义

```typescript
interface Config {
  // 基础配置
  sheetName?: string
  allowInsertRow?: boolean
  allowDeleteRow?: boolean
  autoRefreshOnPropChange?: boolean
  
  // UI配置
  showHeader?: boolean
  showToolbar?: boolean
  showFooter?: boolean
  zoom?: number
  
  // 样式配置
  styleOptions?: StyleOptions
  commonStyle?: CommonStyle
  headerStyle?: HeaderStyle
  readonlyCellStyle?: CellStyle
  selectCellStyle?: CellStyle
  
  // 交互配置
  wheelNumberControl?: WheelNumberControl
  
  // 提示信息
  loadingMaskColor?: string
  loadingMessage?: string
  emptyDataText?: string
  
  // 性能配置
  batchSize?: number
  
  // 验证信息
  selectValidationErrorInfo?: string
  selectValidationErrorStop?: string
  
  // 操作提示
  messages?: Messages
}
```

#### StyleOptions 类型定义

```typescript
interface StyleOptions {
  width?: string
  height?: string
  [key: string]: any  // 支持任意 CSS 属性
}
```

#### CommonStyle 类型定义

```typescript
interface CommonStyle {
  defaultRowHeight?: number
  defaultColumnWidth?: number
  fontSize?: number
  backgroundColor?: string
  borderColor?: string
  color?: string
}
```

#### HeaderStyle 类型定义

```typescript
interface HeaderStyle {
  backgroundColor?: string
  fontWeight?: string | number
}
```

#### CellStyle 类型定义

```typescript
interface CellStyle {
  backgroundColor?: string
  fontWeight?: string | number
}
```

#### WheelNumberControl 类型定义

```typescript
interface WheelNumberControl {
  mode?: 'editOnly' | 'selected'
  isCellAllowed?: boolean | Function
  step?: number
  shiftStep?: number
}
```

#### Messages 类型定义

```typescript
interface Messages {
  insertRowError?: string
  deleteRowError?: string
  autoFillFromHeaderError?: string
  autoFillToHeaderError?: string
  mergeCellError?: string
  unmergeCellError?: string
  moveHeaderError?: string
  moveToHeaderError?: string
  copyHeaderError?: string
  readonlyCellAutoFillError?: string
  readonlyCellMoveError?: string
}
```

## 默认配置

```js
defaultConfig: {
  // 基础配置
  sheetName: 'Sheet',
  allowInsertRow: true,
  allowDeleteRow: true,
  autoRefreshOnPropChange: false,
  
  // UI配置
  showHeader: true,
  showToolbar: true,
  showFooter: true,
  zoom: 1,
  
  // 样式配置
  styleOptions: {
    width: '100%',
    height: '500px'
  },
  
  commonStyle: {
    defaultRowHeight: 20,
    defaultColumnWidth: 80,
    backgroundColor: '#fff',
    borderColor: '#ccc',
    color: '#000',
    fontSize: 12
  },
  
  headerStyle: {
    backgroundColor: '#cfe2f3',
    fontWeight: 'normal'
  },
  
  readonlyCellStyle: {
    backgroundColor: '#eee',
    fontWeight: 'normal'
  },
  
  selectCellStyle: {
    backgroundColor: '#fff',
    fontWeight: 'normal'
  },
  
  // 交互配置
  wheelNumberControl: {
    mode: 'editOnly',
    isCellAllowed: true,
    step: 1,
    shiftStep: 10
  },
  
  // 提示信息
  loadingMaskColor: '#3498db',
  loadingMessage: '数据加载中...',
  emptyDataText: '暂无数据',
  
  // 性能配置
  batchSize: 500,
  
  // 验证信息
  selectValidationErrorInfo: '无效只是警告，该输入不在下拉列表中，但实际可以输入',
  selectValidationErrorStop: '请从下拉列表中选择一个值',
  
  // 操作提示
  messages: {
    insertRowError: '表头区域不可插入行',
    deleteRowError: '表头行不可删除',
    autoFillFromHeaderError: '不可从表头行开始自动填充',
    autoFillToHeaderError: '不可填充至表头行',
    mergeCellError: '不支持合并单元格',
    unmergeCellError: '不支持取消单元格合并',
    moveHeaderError: '表头行不可移动',
    moveToHeaderError: '不可移动内容至表头区域',
    copyHeaderError: '表头行不可复制',
    readonlyCellAutoFillError: '区域包含只读单元格无法自动填充',
    readonlyCellMoveError: '区域包含只读单元格无法移动数据'
  }
}
```

## 配置示例

### 完整配置示例

```js
config: {
  // 基础设置
  sheetName: 'EmployeeData',
  allowInsertRow: true,
  allowDeleteRow: false,
  autoRefreshOnPropChange: true,
  
  // UI设置
  showHeader: true,
  showToolbar: false,
  showFooter: true,
  zoom: 1.2,
  
  // 样式设置
  styleOptions: {
    width: '100%',
    height: '600px',
    border: '2px solid #4a90e2',
    borderRadius: '8px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
  },
  
  commonStyle: {
    defaultRowHeight: 32,
    defaultColumnWidth: 120,
    fontSize: 14,
    backgroundColor: '#ffffff',
    borderColor: '#e1e5e9',
    color: '#2d3748'
  },
  
  headerStyle: {
    backgroundColor: '#4a90e2',
    fontWeight: 'bold'
  },
  
  readonlyCellStyle: {
    backgroundColor: '#f7fafc',
    fontWeight: 'normal'
  },
  
  selectCellStyle: {
    backgroundColor: '#fff3cd',
    fontWeight: 'normal'
  },
  
  // 交互设置
  wheelNumberControl: {
    mode: 'selected',
    isCellAllowed: ({ column }) => {
      return ['age', 'salary', 'score'].includes(column.prop)
    },
    step: 1,
    shiftStep: 5
  },
  
  // 自定义提示
  loadingMessage: '正在加载员工数据...',
  emptyDataText: '暂无员工信息',
  
  // 性能优化
  batchSize: 300
}
```