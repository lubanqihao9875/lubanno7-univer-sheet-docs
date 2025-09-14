# 安装

## 环境要求

在开始之前，请确保你的开发环境满足以下要求：

- **Node.js**: >= 14
- **Vue.js**: >= 2.5.17
- **现代浏览器**: Chrome >= 88, Firefox >= 78, Safari >= 14, Edge >= 88

## 包管理器安装

### npm

```bash
npm install lubanno7-univer-sheet
```

## CDN 引入

如果你不使用构建工具，也可以通过 CDN 的方式引入：

```html
<!-- 引入 Vue 2 -->
<script src="https://unpkg.com/vue@2.6.14/dist/vue.js"></script>

<!-- 引入 Lubanno7 Univer Sheet -->
<script src="https://unpkg.com/lubanno7-univer-sheet/dist/lubanno7-univer-sheet.umd.js"></script>
<link rel="stylesheet" href="https://unpkg.com/lubanno7-univer-sheet/lib/index.css">
```

## 样式文件

组件依赖于 Univer 的样式文件，你需要在项目中引入它们：

### 在 main.js 中全局引入

```js
// main.js
import Vue from 'vue'
import App from './App.vue'

// 引入组件
import Lubanno7UniverSheet from 'lubanno7-univer-sheet'
import 'lubanno7-univer-sheet/lib/index.css'

// 全局注册组件
Vue.component('Lubanno7UniverSheet', Lubanno7UniverSheet)

new Vue({
  render: h => h(App)
}).$mount('#app')
```

### 局部引入

如果只在某个组件中使用 Univer Sheet，也可以局部引入：

```js
import Lubanno7UniverSheet from 'lubanno7-univer-sheet'
import 'lubanno7-univer-sheet/lib/index.css'

export default {
  components: {
    Lubanno7UniverSheet
  },
  // ...
}
```

## 验证安装

创建一个简单的测试页面来验证安装是否成功：

```vue
<template>
  <div>
    <h1>Lubanno7 Univer Sheet 测试</h1>
    <Lubanno7UniverSheet
      :columns="columns"
      :data="data"
      :config="{ styleOptions: { height: '300px' } }"
    />
  </div>
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
      columns: [
        { prop: 'name', label: '姓名' },
        { prop: 'age', label: '年龄' }
      ],
      data: [
        { name: '测试用户', age: 25 }
      ]
    }
  }
}
</script>
```

如果能看到一个包含表格的页面，说明安装成功！

## 常见问题

### 样式不显示

如果表格样式显示异常，请检查是否正确引入了 Lubanno7 Univer Sheet 的样式文件：

```js
import 'lubanno7-univer-sheet/lib/index.css'
```

### 构建错误

如果在构建时遇到错误，可能是因为构建工具的配置问题。对于 Vite 用户，可能需要在 `vite.config.js` 中添加配置：

```js
// vite.config.js
export default {
  optimizeDeps: {
    include: ['lubanno7-univer-sheet']
  }
}
```

### 版本兼容性

确保你使用的 Vue 版本与组件兼容：

- Vue 2.x: ✅ 支持
- Vue 3.x: ❌ 不支持