# 配置选项

Lubanno7 Univer Sheet 提供了丰富的配置选项来满足不同的需求。所有配置都通过 `config` 属性传入。

## 基础配置

### 语言和主题

```js
config: {
  // 语言设置
  locale: 'zh-CN', // 'zh-CN' | 'en-US'
  
  // 主题设置
  theme: 'defaultTheme', // 'defaultTheme' | 'greenTheme'
  
  // 深色模式
  darkMode: false
}
```

### 尺寸配置

```js
config: {
  styleOptions: {
    width: '100%',     // 表格宽度
    height: '500px'    // 表格高度
  },
  
  // 缩放比例
  zoom: 1, // 0.5 - 2.0
  
  commonStyle: {
    defaultRowHeight: 20,      // 默认行高
    defaultColumnWidth: 80,    // 默认列宽
    fontSize: 12               // 字体大小
  }
}
```

### 界面元素控制

```js
config: {
  headerOptions: {
    show: true,            // 是否显示头部
    showToolbar: true,     // 是否显示工具栏
    ribbonType: 'default'  // 'default' | 'simple'
  },
  
  footerOptions: {
    show: true,              // 是否显示底部
    showStatisticBar: false, // 是否显示统计栏
    showZoomSlider: true     // 是否显示缩放滑块
  },
  
  showContextMenu: true,     // 是否显示右键菜单
  
  commonStyle: {
    rowHeader: {
      width: 50,           // 行号宽度
      hidden: false        // 是否隐藏行号
    },
    columnHeader: {
      height: 20,          // 列头高度
      hidden: false        // 是否隐藏列头
    }
  }
}
```

## 样式配置

### 通用样式

```js
config: {
  commonStyle: {
    backgroundColor: '#fff',           // 背景颜色
    color: '#000',                    // 文字颜色
    borderColor: '#ccc',              // 边框颜色
    borderType: 'all',                // 'horizontal' | 'vertical' | 'all' | 'none'
    borderStyleType: 'thin',          // 'thin' | 'dashed' | 'medium' | 'thick'
    horizontalAlign: 'left',          // 'left' | 'center' | 'right'
    verticalAlign: 'middle',          // 'top' | 'middle' | 'bottom'
    wrapStrategy: 'overflow',         // 'wrap' | 'overflow' | 'clip'
    fontWeight: 'normal',
    padding: {
      top: 0,
      right: 0,
      bottom: 0,
      left: 8
    }
  }
}
```

### 表头样式

```js
config: {
  headerStyle: {
    headerRowHeight: 20,
    backgroundColor: '#cfe2f3',
    color: '#000',
    fontSize: 12,
    fontWeight: 'normal'
  }
}
```

### 特殊单元格样式

```js
config: {
  // 只读单元格样式
  readonlyCellStyle: {
    backgroundColor: '#eee',
    color: '#000',
    fontWeight: 'normal'
  },
  
  // 下拉选择单元格样式
  selectCellStyle: {
    backgroundColor: '#fff',
    color: '#000',
    fontWeight: 'normal'
  },
  
  // 复选框单元格样式
  checkboxCellStyle: {
    backgroundColor: '#fff',
    color: '#0078d4',
    fontWeight: 'normal'
  }
}
```

## 功能配置

### 权限设置

```js
config: {
  permissionOptions: {
    allowInsertRow: true,  // 允许插入行
    allowDeleteRow: true   // 允许删除行
  }
}
```

### 插件配置

```js
config: {
  plugins: {
    filter: {
      enabled: true        // 启用筛选功能
    },
    sort: {
      enabled: true        // 启用排序功能
    },
    findReplace: {
      enabled: true        // 启用查找替换功能
    }
  }
}
```

### 交互配置

```js
config: {
  // 滚轮数字控制
  wheelNumberControl: {
    mode: 'editOnly',      // 'editOnly' | 'selected'
    isCellAllowed: true,   // 是否允许滚轮控制
    step: 1,               // 普通步长
    shiftStep: 10          // 按住 Shift 时的步长
  },
  
  // 滚动行为
  scrollBehavior: 'stop-at-boundary', // 'stop-at-boundary' | 'prevent-always'
  
  // 自动刷新
  autoRefreshOnPropChange: false       // 属性变化时是否自动刷新
}
```

### 异步加载配置

```js
config: {
  asyncOptions: {
    isAsyncEnabled: false,                    // 是否启用异步加载
    baseBatchSize: 500,                       // 基础批次大小
    loadHeaderBatchRatio: 1,                  // 加载表头批次比例
    mergeHeaderBatchRatio: 1,                 // 合并表头批次比例
    setColWidthBatchRatio: 1,                 // 设置列宽批次比例
    loadDataBatchRatio: 1,                    // 加载数据批次比例
    updateReadonlyCellStylesBatchRatio: 1,    // 更新只读样式批次比例
    setCellDataValidationBatchRatio: 1        // 设置数据验证批次比例
  }
}
```

## 提示文本配置

```js
config: {
  loadingMessage: '数据加载中...',        // 加载提示文本
  emptyDataText: '暂无数据',              // 空数据提示文本
  
  selectOptions: {
    selectValidationErrorInfo: '无效只是警告，该输入不在下拉列表中，但实际可以输入',
    selectValidationErrorStop: '请从下拉列表中选择一个值',
    selectValidationRenderMode: 'arrow'   // 'text' | 'arrow' | 'custom'
  },
  
  checkboxOptions: {
    checkboxValidationError: '请选择有效的复选框值',
    checkedValue: 1,        // 选中值
    uncheckedValue: 0       // 未选中值
  }
}
```

## 完整配置示例

```js

config: {
  locale: 'zh-CN',
  theme: 'defaultTheme',
  darkMode: false,
  
  styleOptions: {
    width: '100%',
    height: '600px'
  },
  
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
  
  commonStyle: {
    fontSize: 14,
    defaultRowHeight: 24,
    backgroundColor: '#ffffff',
    borderColor: '#e1e5e9',
    horizontalAlign: 'left',
    verticalAlign: 'middle'
  },
  
  headerStyle: {
    backgroundColor: '#f5f7fa',
    fontSize: 14,
    fontWeight: 'bold'
  },
  
  permissionOptions: {
    allowInsertRow: true,
    allowDeleteRow: true
  }
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