# 快速开始

本章节将帮助你快速上手 Lubanno7UniverSheet 组件。

## 介绍

Lubanno7UniverSheet 是一个基于 [Univer](https://univer.ai/) 引擎的现代化表格组件，提供了丰富的功能和灵活的配置选项，适用于各种复杂的数据展示和编辑场景。

### 特性

- **高性能渲染**：基于 Univer 引擎，提供流畅的表格操作体验
- **丰富的功能**：支持数据验证、排序、筛选、查找替换等多种功能
- **灵活的配置**：提供多种配置选项，满足不同业务场景需求
- **多框架支持**：支持任何能运行ES模块的JavaScript环境，可轻松集成到各种前端框架及原生开发项目中
- **事件系统**：完善的事件监听机制，方便业务逻辑扩展
- **数据导出**：支持导出为 JSON、CSV 格式
- **单元格样式**：支持自定义单元格样式，包括只读、下拉选择、复选框等

### 适用场景

Lubanno7UniverSheet 适用于以下场景：

- 复杂数据的展示和编辑
- 需要表格操作功能的管理系统
- 数据录入和验证场景

### 技术架构

Lubanno7UniverSheet 基于 Univer 引擎开发，采用模块化设计，主要包含以下核心模块：

- **核心引擎**：负责表格的渲染和基础操作
- **数据处理**：处理表格数据的增删改查
- **事件系统**：提供完善的事件监听机制
- **样式系统**：处理表格样式的设置和更新
- **导出功能**：支持数据导出为不同格式

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

## 引入

::: code-group

```jsx [React]
import React, { useEffect, useRef } from 'react'
import Lubanno7UniverSheet from 'lubanno7-univer-sheet'
import 'lubanno7-univer-sheet/lib/lubanno7-univer-sheet.css'

const TableComponent = () => {
  const sheetContainer = useRef(null)
  const sheetInstance = useRef(null)
  
  useEffect(() => {
    if (containerRef.current) {
      const columns = [/* 列配置 */]
      const data = [/* 数据 */]
      const config = {/* 配置 */}
      
      sheetInstance.current = new Lubanno7UniverSheet(sheetContainer.current, {
        columns,
        data,
        config
      })
      
    return () => {
      if (sheetInstance.current) {
        sheetInstance.current.dispose()
      }
    }
  }, [])
  
  return <div ref={sheetContainer} />
}

export default TableComponent
```

```vue [Vue3]
<template>
  <div style="width: 100%; height: 500px;">
    <div ref="sheetContainer"></div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import Lubanno7UniverSheet from 'lubanno7-univer-sheet'
import 'lubanno7-univer-sheet/lib/index.css'

const sheetContainer = ref(null)
let sheetInstance = null

const columns = [/* 列配置 */]
const data = [/* 数据 */]
const config = {/* 配置 */}

onMounted(() => {
  sheetInstance = new Lubanno7UniverSheet(sheetContainer.value, {
    columns,
    data,
    config
  })
})

onBeforeUnmount(() => {
  if (sheetInstance) {
    sheetInstance.dispose()
  }
})
</script>
```

```js [JS]
import Lubanno7UniverSheet from 'lubanno7-univer-sheet'
import 'lubanno7-univer-sheet/lib/index.css'

document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('sheet-container')
  
  const sheet = new Lubanno7UniverSheet(container, {
    columns: [/* 列配置 */],
    data: [/* 数据 */],
    config: {/* 配置 */}
  })

  window.addEventListener('beforeunload', () => {
    sheet.dispose()
  })
})
```

:::

## 基本示例

下面是一个完整的基本示例：

```jsx
import React, { useEffect, useRef } from 'react'
import Lubanno7UniverSheet from 'lubanno7-univer-sheet'
import 'lubanno7-univer-sheet/lib/index.css'

const SheetExample = () => {
  const sheetContainer = useRef(null)
  const sheetInstance = useRef(null)
  
  useEffect(() => {
    if (sheetContainer.current) {
      // 列配置
      const columns = [
        { prop: 'name', label: '姓名', width: 120 },
        { prop: 'age', label: '年龄', width: 80 },
        { prop: 'address', label: '地址', width: 200 }
      ]
      
      // 数据
      const data = [
        { name: '张三', age: 25, address: '北京市朝阳区' },
        { name: '李四', age: 30, address: '上海市浦东新区' },
        { name: '王五', age: 28, address: '广州市天河区' }
      ]
      
      // 创建表格实例
      sheetInstance.current = new Lubanno7UniverSheet(sheetContainer.current, {
        columns,
        data,
        config: {
          styleOptions: {
            width: '100%',
            height: '500px'
          }
        }
      })
      
      // 获取表格暴露的API
      const api = sheetInstance.current.getExposed()
      
      // 使用API操作表格
      console.log('表格数据:', api.methods.getTableData())
    }
    
    return () => {
      if (sheetInstance.current) {
        sheetInstance.current.dispose()
      }
    }
  }, [])
  
  return (
    <div ref={sheetContainer} />
  )
}

export default SheetExample
```

## 核心概念

使用 Lubanno7UniverSheet 时，需要了解以下核心概念：

### 容器元素

表格组件需要一个 DOM 容器元素来渲染，这个容器元素需要设置宽高。

### 列配置

`columns` 参数定义了表格的列结构，每个列对象包含以下属性：

- `prop`: 列数据字段名
- `label`: 列标题
- `width`: 列宽度（可选）
- `children`: 子列数组（用于嵌套表头，可选）
- `editor`: 单元格编辑器配置（可选）

### 数据

`data` 参数是一个对象数组，每个对象表示一行数据，对象的属性名应与列配置中的 `prop` 对应。

### 配置选项

`config` 参数包含表格的各种配置选项，如样式、功能等。详细配置请参考 [高级配置](/guide/advanced-config) 章节。