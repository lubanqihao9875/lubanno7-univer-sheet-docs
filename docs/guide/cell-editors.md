# 单元格编辑器

Lubanno7 Univer Sheet 支持多种类型的单元格编辑器，可以为不同的数据类型提供最适合的编辑体验。

## 编辑器类型

### 1. 只读编辑器

将单元格设置为只读，用户无法编辑内容：

```js
columns: [
  { 
    prop: 'id', 
    label: 'ID', 
    width: 80,
    editor: { type: 'readonly' }
  },
  { 
    prop: 'createdAt', 
    label: '创建时间', 
    width: 150,
    editor: { type: 'readonly' }
  }
]
```

### 2. 下拉选择编辑器

提供预定义的选项供用户选择：

```js
columns: [
  {
    prop: 'status',
    label: '状态',
    width: 120,
    editor: {
      type: 'select',
      options: ['待审核', '已通过', '已拒绝'],
      multiple: false,           // 是否支持多选
      allowInput: false,         // 是否允许输入不在列表中的值
      selectValidationError: '请选择有效状态'
    }
  },
  {
    prop: 'tags',
    label: '标签',
    width: 150,
    editor: {
      type: 'select',
      options: ['重要', '紧急', '普通', '低优先级'],
      multiple: true,            // 支持多选
      allowInput: true,          // 允许自定义输入
      selectValidationError: '标签格式不正确'
    }
  }
]
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