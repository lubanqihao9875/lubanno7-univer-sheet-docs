# 快速开始

## 安装

### 使用 npm

```bash
npm install lubanno7-univer-sheet
```

### 使用 yarn

```bash
yarn add lubanno7-univer-sheet
```

### 使用 pnpm

```bash
pnpm add lubanno7-univer-sheet
```

## 基本使用

### 1. 全局注册组件

```js
// main.js
import Vue from 'vue'
import App from './App.vue'
import Lubanno7UniverSheet from 'lubanno7-univer-sheet'
import 'lubanno7-univer-sheet/lib/index.css'

// 全局注册组件
Vue.component('Lubanno7UniverSheet', Lubanno7UniverSheet)

new Vue({
  render: h => h(App)
}).$mount('#app')
```

### 2. 局部引入组件

```vue
<template>
  <div>
    <Lubanno7UniverSheet
      :columns="columns"
      :data="data"
      :config="config"
      @updateData="handleUpdateData"
      @cellClick="handleCellClick"
    />
  </div>
</template>

<script>
import Lubanno7UniverSheet from 'lubanno7-univer-sheet'
import 'lubanno7-univer-sheet/lib/index.css'

export default {
  // 局部注册组件
  components: {
    Lubanno7UniverSheet
  },
  // 数据定义
  data() {
    return {
      // 列配置
      columns: [
        { prop: 'id', label: 'ID', width: 80 },
        { prop: 'name', label: '姓名', width: 120 },
        { prop: 'age', label: '年龄', width: 80 },
        { prop: 'department', label: '部门', width: 150 },
        { prop: 'email', label: '邮箱', width: 200 },
        { prop: 'status', label: '状态', width: 100 }
      ],
      // 表格数据
      data: [
        {
          id: 1,
          name: '张三',
          age: 28,
          department: '技术部',
          email: 'zhangsan@example.com',
          status: '在职'
        },
        {
          id: 2,
          name: '李四',
          age: 32,
          department: '市场部',
          email: 'lisi@example.com',
          status: '在职'
        },
        {
          id: 3,
          name: '王五',
          age: 26,
          department: '人事部',
          email: 'wangwu@example.com',
          status: '离职'
        }
      ],
      // 配置选项
      config: {
        styleOptions: {
          width: '100%',
          height: '400px'
        },
        commonStyle: {
          fontSize: 14
        },
        headerStyle: {
          backgroundColor: '#f0f0f0',
          fontWeight: 'bold'
        }
      }
    }
  },
  // 事件处理方法
  methods: {
    handleUpdateData(event) {
      console.log('数据更新:', event)
      // event 包含更新的详细信息：
      // - changedRow: 更新后的行数据
      // - changedRowIndex: 行索引
      // - changedColumn: 更新的列名
      // - oldValue: 旧值
      // - newValue: 新值
      // - currentTableData: 当前所有表格数据
    },
    handleCellClick(event) {
      console.log('单元格点击:', event)
      // event 包含点击的详细信息：
      // - clickedRow: 点击的行数据
      // - clickedRowIndex: 行索引
      // - clickedColumn: 点击的列名
      // - value: 单元格值
    }
  }
}
</script>
```

## 最小化示例

如果你只是想快速体验组件，可以使用这个最小化的示例：

```vue
<template>
  <Lubanno7UniverSheet
    :columns="[
      { prop: 'name', label: '姓名' },
      { prop: 'age', label: '年龄' }
    ]"
    :data="[
      { name: '张三', age: 25 },
      { name: '李四', age: 30 }
    ]"
  />
</template>

<script>
import Lubanno7UniverSheet from 'lubanno7-univer-sheet'
import 'lubanno7-univer-sheet/lib/index.css'

export default {
  components: {
    Lubanno7UniverSheet
  }
}
</script>
```

这样你就已经成功集成了 Lubanno7 Univer Sheet 组件！接下来，你可以查看[配置选项](/guide/configuration)来了解更多定制化的功能。