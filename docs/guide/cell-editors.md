# 单元格编辑器

Lubanno7 Univer Sheet 支持多种类型的单元格编辑器，可以为不同的数据类型提供最适合的编辑体验。

## 编辑器类型

### 默认编辑器

不指定编辑器时，单元格使用默认的文本编辑器：

```js
const column = {
  prop: 'name',
  label: '姓名'
  // 默认使用文本编辑器
}
```

### 只读编辑器

设置单元格为只读状态：

```js
const column = {
  prop: 'id',
  label: 'ID',
  editor: { type: 'readonly' }
}
```

### 下拉选择编辑器

提供预设选项的下拉选择：

```js
const column = {
  prop: 'status',
  label: '状态',
  editor: {
    type: 'select',
    options: ['在职', '离职', '请假'],           // 必需：选项列表
    multiple: false,                          // 可选：是否多选，默认 false
    allowInput: false,                        // 可选：是否允许输入，默认 false
    selectValidationError: '请选择有效选项'     // 可选：验证错误消息
  }
}
```

#### 多选模式

```js
const column = {
  prop: 'skills',
  label: '技能',
  editor: {
    type: 'select',
    options: ['JavaScript', 'Vue', 'React', 'Node.js'],
    multiple: true  // 启用多选
  }
}
```

#### 允许输入模式

```js
const column = {
  prop: 'city',
  label: '城市',
  editor: {
    type: 'select',
    options: ['北京', '上海', '广州', '深圳'],
    allowInput: true,  // 允许输入不在列表中的值
    selectValidationError: '建议从列表选择，也可输入其他城市'
  }
}
```

### 复选框编辑器

用于布尔值或特定值的选择：

```js
const column = {
  prop: 'isActive',
  label: '是否激活',
  editor: {
    type: 'checkbox',
    checkedValue: 1,                          // 可选：选中时的值，默认 1
    uncheckedValue: 0,                        // 可选：未选中时的值，默认 0
    checkboxValidationError: '请选择有效值'    // 可选：验证错误消息
  }
}
```

#### 布尔值复选框

```js
const column = {
  prop: 'enabled',
  label: '启用',
  editor: {
    type: 'checkbox',
    checkedValue: true,
    uncheckedValue: false
  }
}
```

#### 字符串值复选框

```js
const column = {
  prop: 'status',
  label: '完成状态',
  editor: {
    type: 'checkbox',
    checkedValue: '已完成',
    uncheckedValue: '未完成'
  }
}
```

## 动态编辑器配置

编辑器配置可以根据行数据动态变化：

```js
columns: [
  {
    prop: 'level',
    label: '等级',
    width: 100,
    editor: ({ row, rowIndex, column, columnIndex }) => {
      // 根据部门动态设置等级选项
      if (row.department === '技术部') {
        return {
          type: 'select',
          options: ['初级工程师', '中级工程师', '高级工程师', '技术专家'],
          allowInput: false
        }
      } else if (row.department === '管理部') {
        return {
          type: 'select',
          options: ['主管', '经理', '总监'],
          allowInput: false
        }
      } else {
        return {
          type: 'select',
          options: ['员工', '主管', '经理'],
          allowInput: false
        }
      }
    }
  }
]
```

## 条件编辑器

根据条件设置不同的编辑器类型：

```js
columns: [
  {
    prop: 'salary',
    label: '薪资',
    width: 120,
    editor: ({ row }) => {
      // 只有HR和财务可以编辑薪资
      if (['HR', '财务'].includes(row.department)) {
        return null // 默认可编辑
      } else {
        return { type: 'readonly' }
      }
    }
  },
  {
    prop: 'performanceScore',
    label: '绩效评分',
    width: 120,
    editor: ({ row, rowIndex }) => {
      // 试用期员工不能编辑绩效
      if (row.status === '试用期') {
        return { type: 'readonly' }
      }
      
      // 根据级别设置不同的评分选项
      if (row.level === '高级工程师') {
        return {
          type: 'select',
          options: ['A+', 'A', 'B+', 'B'],
          allowInput: false
        }
      } else {
        return {
          type: 'select',
          options: ['A', 'B', 'C'],
          allowInput: false
        }
      }
    }
  }
]
```

## 编辑器最佳实践

1. **合理使用只读**：对于系统生成的字段（如ID、创建时间）设置为只读
2. **动态选项**：根据业务逻辑动态设置下拉选项
3. **用户体验**：为下拉选择提供清晰的选项描述
4. **数据一致性**：在编辑器配置中保持数据的一致性约束
5. **性能考虑**：避免在编辑器函数中进行复杂的计算

接下来可以查看[事件处理](/guide/events)了解如何处理表格的各种事件。