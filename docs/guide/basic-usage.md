# 基本用法

## 简单表格

最基础的表格用法只需要提供 `columns` 和 `data` 两个属性：

```vue
<template>
  <Lubanno7UniverSheet
    :columns="columns"
    :data="data"
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
      // 列配置
      columns: [
        { prop: 'name', label: '姓名', width: 120 },
        { prop: 'age', label: '年龄', width: 80 },
        { prop: 'email', label: '邮箱', width: 200 }
      ],
      // 表格数据
      data: [
        { name: '张三', age: 25, email: 'zhangsan@example.com' },
        { name: '李四', age: 30, email: 'lisi@example.com' },
        { name: '王五', age: 28, email: 'wangwu@example.com' }
      ]
    }
  }
}
</script>
```

## 自定义样式

通过 `config` 属性可以自定义表格的样式：

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
      columns: [
        { prop: 'name', label: '姓名', width: 120 },
        { prop: 'age', label: '年龄', width: 80 },
        { prop: 'email', label: '邮箱', width: 200 }
      ],
      data: [
        { name: '张三', age: 25, email: 'zhangsan@example.com' },
        { name: '李四', age: 30, email: 'lisi@example.com' }
      ],
      // 样式配置
      config: {
        // 容器样式
        styleOptions: {
          width: '100%',
          height: '500px'
        },
        // 通用单元格样式
        commonStyle: {
          fontSize: 14,
          backgroundColor: '#ffffff',
          borderColor: '#e0e0e0',
          color: '#333333'
        },
        // 表头样式
        headerStyle: {
          backgroundColor: '#f5f5f5',
          fontWeight: 'bold'
        },
        // 缩放比例
        zoom: 1.2
      }
    }
  }
}
</script>
```

## 数据更新监听

监听数据变化并处理更新：

```vue
<template>
  <Lubanno7UniverSheet
    :columns="columns"
    :data="tableData"
    @updateData="handleDataUpdate"
    @cellClick="handleCellClick"
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
      columns: [
        { prop: 'id', label: 'ID', width: 80 },
        { prop: 'name', label: '姓名', width: 120 },
        { prop: 'score', label: '分数', width: 80 }
      ],
      tableData: [
        { id: 1, name: '张三', score: 85 },
        { id: 2, name: '李四', score: 92 }
      ]
    }
  },
  methods: {
    handleDataUpdate(event) {
      console.log('数据更新:', event)
      
      // 更新本地响应式数据
      const { changedRowIndex, newValue, changedColumn } = event
      this.tableData[changedRowIndex][changedColumn] = newValue
      
      // 调用 API 保存到服务器
      this.saveToServer(event)
    },
    handleCellClick(event) {
      console.log('单元格点击:', event)
      // 实现自定义点击逻辑
    },
    async saveToServer(updateData) {
      try {
        const response = await fetch('/api/save-data', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(updateData)
        })
        if (response.ok) {
          console.log('数据保存成功')
        }
      } catch (error) {
        console.error('保存失败:', error)
      }
    }
  }
}
</script>
```

## 动态数据

实现动态加载和更新数据：

```vue
<template>
  <div>
    <button @click="loadData">加载数据</button>
    <button @click="addRow">添加行</button>
    
    <Lubanno7UniverSheet
      ref="tableRef"
      :columns="columns"
      :data="data"
      :config="config"
      @tableInitialized="handleTableInit"
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
      // 表格实例引用
      columns: [
        { prop: 'id', label: 'ID', width: 80 },
        { prop: 'name', label: '姓名', width: 120 },
        { prop: 'createTime', label: '创建时间', width: 150 }
      ],
      data: [], // 初始空数据
      config: {
        styleOptions: {
          height: '400px'
        },
        autoRefreshOnPropChange: true // 启用自动刷新
      }
    }
  },
  methods: {
    // 模拟加载数据
    async loadData() {
      // 模拟 API 请求延迟
      setTimeout(() => {
        this.data = [
          { id: 1, name: '用户1', createTime: '2024-01-01' },
          { id: 2, name: '用户2', createTime: '2024-01-02' }
        ]
      }, 500)
    },
    // 添加新行
    addRow() {
      const newRow = {
        id: this.data.length + 1,
        name: `新用户${this.data.length + 1}`,
        createTime: new Date().toISOString().split('T')[0]
      }
      this.data.push(newRow)
    },
    // 表格初始化完成回调
    handleTableInit(event) {
      console.log('表格初始化完成', event)
      // 执行初始化后操作（如加载默认数据）
      this.loadData()
    }
  }
}
</script>
```

## 基本配置选项

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
      columns: [
        { prop: 'name', label: '姓名', width: 120 },
        { prop: 'age', label: '年龄', width: 80 }
      ],
      data: [
        { name: '张三', age: 25 },
        { name: '李四', age: 30 }
      ],
      // 完整配置选项
      config: {
        // 语言设置
        locale: 'zh-CN',
        
        // 行操作权限
        allowInsertRow: true,
        allowDeleteRow: true,
        
        // 自动刷新开关
        autoRefreshOnPropChange: false,
        
        // 显示控制
        showHeader: true,    // 显示表头
        showToolbar: true,   // 显示工具栏
        showFooter: true,    // 显示底部
        
        // 提示文本
        loadingMessage: '数据加载中...',
        emptyDataText: '暂无数据',
        
        // 容器样式
        styleOptions: {
          width: '100%',
          height: '600px'
        }
      }
    }
  }
}
</script>
```

## 只读模式

将表格设置为只读模式：

```vue
<template>
  <Lubanno7UniverSheet
    :columns="readonlyColumns"
    :data="data"
    :config="readonlyConfig"
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
      // 只读列配置
      readonlyColumns: [
        { prop: 'name', label: '姓名', editor: { type: 'readonly' } },
        { prop: 'age', label: '年龄', editor: { type: 'readonly' } },
        { prop: 'email', label: '邮箱', editor: { type: 'readonly' } }
      ],
      data: [
        { name: '张三', age: 25, email: 'zhangsan@example.com' },
        { name: '李四', age: 30, email: 'lisi@example.com' }
      ],
      // 只读模式配置
      readonlyConfig: {
        allowInsertRow: false,
        allowDeleteRow: false,
        readonlyCellStyle: {
          backgroundColor: '#f9f9f9',
          fontWeight: 'normal'
        }
      }
    }
  }
}
</script>
```

这些基本用法涵盖了日常使用中的大部分场景。接下来可以查看[配置选项](/guide/configuration)了解更多高级功能。