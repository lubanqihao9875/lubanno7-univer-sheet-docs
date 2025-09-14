# 嵌套表头

Lubanno7 Univer Sheet 支持多层嵌套表头，可以创建复杂的表格结构来满足各种业务需求。

## 基本嵌套表头

通过在列配置中使用 `children` 属性来创建嵌套表头：

```vue
<template>
  <Lubanno7UniverSheet
    :columns="columns"
    :data="data"
    :config="config"
  />
</template>

<script>
import Lubanno7UniverSheet from 'lubanno7-univer-sheet'
import 'lubanno7-univer-sheet/lib/index.css'

export default {
  components: {
    Lubanno7UniverSheet
  },
  data() {
    return {
      // 嵌套表头配置
      columns: [
        {
          label: '基本信息',
          children: [
            { prop: 'name', label: '姓名', width: 100 },
            { prop: 'age', label: '年龄', width: 80 },
            { prop: 'gender', label: '性别', width: 80 }
          ]
        },
        {
          label: '联系方式',
          children: [
            { prop: 'phone', label: '电话', width: 120 },
            { prop: 'email', label: '邮箱', width: 200 }
          ]
        },
        {
          label: '工作信息',
          children: [
            { prop: 'department', label: '部门', width: 120 },
            { prop: 'position', label: '职位', width: 120 },
            { prop: 'salary', label: '薪资', width: 100 }
          ]
        }
      ],
      // 表格数据
      data: [
        {
          name: '张三',
          age: 28,
          gender: '男',
          phone: '13800138000',
          email: 'zhangsan@example.com',
          department: '技术部',
          position: '前端工程师',
          salary: 15000
        },
        {
          name: '李四',
          age: 32,
          gender: '女',
          phone: '13900139000',
          email: 'lisi@example.com',
          department: '产品部',
          position: '产品经理',
          salary: 18000
        }
      ],
      // 配置项
      config: {
        styleOptions: {
          height: '400px'
        }
      }
    }
  }
}
</script>
```

## 多层嵌套表头

支持更深层次的嵌套结构：

```js
columns: [
  {
    label: '个人信息',
    children: [
      {
        label: '基础信息',
        children: [
          { prop: 'name', label: '姓名', width: 100 },
          { prop: 'age', label: '年龄', width: 80 }
        ]
      },
      {
        label: '详细信息',
        children: [
          { prop: 'idCard', label: '身份证', width: 150 },
          { prop: 'address', label: '地址', width: 200 }
        ]
      }
    ]
  },
  {
    label: '业务数据',
    children: [
      {
        label: '销售数据',
        children: [
          { prop: 'q1Sales', label: 'Q1销售额', width: 100 },
          { prop: 'q2Sales', label: 'Q2销售额', width: 100 }
        ]
      },
      {
        label: '绩效数据',
        children: [
          { prop: 'score', label: '评分', width: 80 },
          { prop: 'rank', label: '排名', width: 80 }
        ]
      }
    ]
  }
]
```

## 混合表头结构

可以在同一个表格中混合使用嵌套和非嵌套的列：

```js
columns: [
  // 单独的列
  { prop: 'id', label: 'ID', width: 60 },
  
  // 嵌套列
  {
    label: '用户信息',
    children: [
      { prop: 'name', label: '姓名', width: 120 },
      { prop: 'email', label: '邮箱', width: 180 }
    ]
  },
  
  // 另一个单独的列
  { prop: 'status', label: '状态', width: 100 },
  
  // 另一个嵌套列
  {
    label: '统计数据',
    children: [
      { prop: 'loginCount', label: '登录次数', width: 100 },
      { prop: 'lastLogin', label: '最后登录', width: 150 }
    ]
  }
]
```

## 表头样式定制

可以为嵌套表头定制专门的样式：

```js
config: {
  // 表头样式
  headerStyle: {
    backgroundColor: '#4a90e2',
    fontWeight: 'bold'
  },
  
  // 通用样式
  commonStyle: {
    fontSize: 13,
    borderColor: '#ddd'
  },
  
  styleOptions: {
    height: '500px'
  }
}
```

## 注意事项

1. **性能考虑**：过深的嵌套可能会影响渲染性能，建议控制在 3 层以内
2. **列宽设置**：确保为每个叶子节点列设置适当的宽度
3. **数据对应**：确保数据中的字段名与叶子节点的 `prop` 属性一致

## 最佳实践

1. **逻辑分组**：根据业务逻辑对相关列进行分组
2. **标题命名**：使用清晰、简洁的表头标题
3. **宽度控制**：合理分配列宽，避免表格过宽
4. **层级控制**：避免过多层级，保持结构清晰
5. **数据验证**：确保数据结构与表头结构匹配

接下来可以查看[单元格编辑器](/guide/cell-editors)了解如何为不同的单元格配置编辑器。