# 配置选项

Lubanno7 Univer Sheet 提供了丰富的配置选项来满足不同的需求。所有配置都通过 `config` 属性传入。

## 基础配置

```js
config: {
  // 工作表名称
  sheetName: 'Sheet1',
  
  // 权限控制
  allowInsertRow: true,        // 是否允许插入行
  allowDeleteRow: true,        // 是否允许删除行
  
  // 自动刷新
  autoRefreshOnPropChange: false,  // 当 props 变化时是否自动刷新
  
  // UI 显示
  showHeader: true,            // 显示表格头部
  showToolbar: true,          // 显示工具栏
  showFooter: true,           // 显示底部状态栏
  
  // 缩放比例
  zoom: 1.0,                  // 表格缩放比例 (0.5 - 2.0)
  
  // 性能配置
  batchSize: 500              // 批处理大小
}
```

## 样式配置

### 容器样式

```js
config: {
  styleOptions: {
    width: '100%',             // 容器宽度
    height: '500px',           // 容器高度
    border: '1px solid #ccc',  // 边框样式
    borderRadius: '4px',       // 圆角
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)'  // 阴影
  }
}
```

### 通用单元格样式

```js
config: {
  commonStyle: {
    defaultRowHeight: 28,         // 默认行高
    defaultColumnWidth: 100,      // 默认列宽
    fontSize: 14,                 // 字体大小
    backgroundColor: '#ffffff',   // 背景色
    borderColor: '#e1e1e1',      // 边框颜色
    color: '#333333'             // 字体颜色
  }
}
```

### 表头样式

```js
config: {
  headerStyle: {
    backgroundColor: '#f5f7fa',  // 表头背景色
    fontWeight: 'bold'           // 表头字体粗细
  }
}
```

### 只读单元格样式

```js
config: {
  readonlyCellStyle: {
    backgroundColor: '#f9f9f9',  // 只读单元格背景色
    fontWeight: 'normal'         // 字体粗细
  }
}
```

### 下拉选择单元格样式

```js
config: {
  selectCellStyle: {
    backgroundColor: '#fff7e6',  // 下拉单元格背景色
    fontWeight: 'normal'         // 字体粗细
  }
}
```

## 交互配置

### 鼠标滚轮数字控制

```js
config: {
  wheelNumberControl: {
    mode: 'editOnly',           // 模式: 'editOnly' | 'selected'
    isCellAllowed: true,        // 是否允许滚轮控制 (布尔值或函数)
    step: 1,                    // 普通步长
    shiftStep: 10               // Shift + 滚轮步长
  }
}
```

支持函数形式的 `isCellAllowed`：

```js
config: {
  wheelNumberControl: {
    mode: 'selected',
    isCellAllowed: ({ row, rowIndex, column, cellCol }) => {
      // 只允许 age 列使用滚轮控制
      return column.prop === 'age'
    },
    step: 1,
    shiftStep: 5
  }
}
```

## 提示信息配置

```js
config: {
  // 加载相关
  loadingMaskColor: '#3498db',
  loadingMessage: '数据加载中...',
  emptyDataText: '暂无数据',
  
  // 数据验证提示
  selectValidationErrorInfo: '输入值不在下拉列表中，但可以继续输入',
  selectValidationErrorStop: '请从下拉列表中选择一个有效值',
  
  // 操作提示信息
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

## 完整配置示例

```js
config: {
  // 基础设置
  sheetName: 'EmployeeSheet',
  allowInsertRow: true,
  allowDeleteRow: true,
  autoRefreshOnPropChange: true,
  
  // UI设置
  showHeader: true,
  showToolbar: true,
  showFooter: false,
  zoom: 1.1,
  
  // 样式设置
  styleOptions: {
    width: '100%',
    height: '600px',
    border: '1px solid #ddd',
    borderRadius: '6px'
  },
  
  commonStyle: {
    defaultRowHeight: 32,
    defaultColumnWidth: 120,
    fontSize: 13,
    backgroundColor: '#ffffff',
    borderColor: '#e0e0e0',
    color: '#2c3e50'
  },
  
  headerStyle: {
    backgroundColor: '#34495e',
    fontWeight: 'bold'
  },
  
  readonlyCellStyle: {
    backgroundColor: '#ecf0f1',
    fontWeight: 'normal'
  },
  
  selectCellStyle: {
    backgroundColor: '#fff3cd',
    fontWeight: 'normal'
  },
  
  // 交互设置
  wheelNumberControl: {
    mode: 'editOnly',
    isCellAllowed: ({ column }) => {
      return ['age', 'salary', 'score'].includes(column.prop)
    },
    step: 1,
    shiftStep: 10
  },
  
  // 提示信息
  loadingMessage: '正在加载员工数据...',
  emptyDataText: '没有员工数据',
  
  // 性能优化
  batchSize: 300
}
```

## 配置优先级

配置的合并遵循深度合并规则：

1. 用户传入的 `config` 会与默认配置进行深度合并
2. 用户配置的优先级高于默认配置
3. 嵌套对象会递归合并，而不是完全替换

```js
// 默认配置
defaultConfig: {
  commonStyle: {
    fontSize: 12,
    backgroundColor: '#fff'
  }
}

// 用户配置
userConfig: {
  commonStyle: {
    fontSize: 14  // 只覆盖 fontSize，backgroundColor 保持默认值
  }
}

// 最终配置
finalConfig: {
  commonStyle: {
    fontSize: 14,           // 来自用户配置
    backgroundColor: '#fff'  // 来自默认配置
  }
}
```

接下来可以查看[嵌套表头](/guide/nested-headers)了解如何实现复杂的表头结构。