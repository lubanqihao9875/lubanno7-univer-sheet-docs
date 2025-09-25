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

```js
import Lubanno7UniverSheet from 'lubanno7-univer-sheet'
import 'lubanno7-univer-sheet/lib/index.css'

export default {
  components: {
    Lubanno7UniverSheet
  }
  // ...
}
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