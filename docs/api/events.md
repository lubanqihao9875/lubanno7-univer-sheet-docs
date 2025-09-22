# 事件

## 事件列表

### updateData

当单元格数据被用户修改时触发。

**参数**: `UpdateDataEvent`

```typescript
interface UpdateDataEvent {
  changedRow: Record<string, any>      // 更新后的完整行数据
  changedRowIndex: number              // 行索引
  changedColumn: string                // 更新的列名
  changedColumnIndex: number           // 列索引
  oldValue: any                        // 旧值
  newValue: any                        // 新值
  currentTableData: Array<Record<string, any>> // 当前所有表格数据
}
```

**使用示例**:

```vue
<template>
  <Lubanno7UniverSheet
    @updateData="handleDataUpdate"
  />
</template>

<script>
export default {
  methods: {
    handleDataUpdate(event) {
      console.log('数据更新:', event)
      
      const { changedColumn, newValue, oldValue, changedRow } = event
      
      // 处理特定列的变化
      if (changedColumn === 'status') {
        if (newValue === '已完成') {
          changedRow.completedAt = new Date().toISOString()
        }
      }
      
      // 保存到服务器
      this.saveToServer(changedRow)
    },
    
    saveToServer(rowData) {
      console.log('保存数据到服务器:', rowData)
      // 实现保存逻辑
    }
  }
}
</script>
```

### tableInitialized

表格初始化完成时触发。

**参数**: `InitEvent`

```typescript
interface InitEvent {
  exposed: ExposedMethods  // 表格实例方法和属性
}
```

**使用示例**:

```vue
<template>
  <Lubanno7UniverSheet
    @tableInitialized="handleTableInitialized"
  />
</template>

<script>
export default {
  methods: {
    handleTableInitialized(event) {
      console.log('表格初始化完成')
      
      const { exposed } = event
      
      // 可以访问表格的方法和属性
      const currentData = exposed.methods.getCurrentTableData()
      console.log('当前表格数据:', currentData)
      
      // 设置特殊样式
      exposed.methods.setCellFontColor(0, 'status', '#ff0000')
    }
  }
}
</script>
```

### insertRow

用户通过表格界面插入行时触发。

**参数**: `InsertRowEvent`

```typescript
interface InsertRowEvent {
  insertRows: Array<Record<string, any>>  // 插入的行数据数组
  insertRowStartIndex: number             // 插入开始索引
  insertRowEndIndex: number               // 插入结束索引
  currentTableData: Array<Record<string, any>>  // 当前所有表格数据
}
```

**使用示例**:

```vue
<template>
  <Lubanno7UniverSheet
    @insertRow="handleInsertRow"
  />
</template>

<script>
export default {
  methods: {
    handleInsertRow(event) {
      const { insertRows, insertRowStartIndex } = event
      
      // 为新插入的行设置默认值
      insertRows.forEach((row, index) => {
        row.id = this.generateId()
        row.status = '草稿'
        row.createdAt = new Date().toISOString()
        
        console.log(`第 ${insertRowStartIndex + index} 行已插入`)
      })
      
      // 通知服务器
      this.notifyServer('rows_inserted', insertRows)
    },
    
    generateId() {
      return Date.now().toString(36) + Math.random().toString(36).substr(2)
    },
    
    notifyServer(action, data) {
      console.log(`通知服务器: ${action}`, data)
      // 实现通知逻辑
    }
  }
}
</script>
```

### deleteRow

用户通过表格界面删除行时触发。

**参数**: `DeleteRowEvent`

```typescript
interface DeleteRowEvent {
  deleteRows: Array<Record<string, any>>  // 删除的行数据数组
  deleteRowStartIndex: number             // 删除开始索引
  deleteRowEndIndex: number               // 删除结束索引
  currentTableData: Array<Record<string, any>>  // 当前所有表格数据
}
```

### rowInserted

通过组件方法手动插入行完成时触发。

**参数**: `RowInsertedEvent`

```typescript
interface RowInsertedEvent {
  insertedRows: Array<Record<string, any>>  // 插入的行数据数组
  insertedRowStartIndex: number             // 插入开始索引
  insertedRowEndIndex: number               // 插入结束索引
  currentTableData: Array<Record<string, any>>  // 当前所有表格数据
}
```

### rowUpdated

通过组件方法手动更新行完成时触发。

**参数**: `RowUpdatedEvent`

```typescript
interface RowUpdatedEvent {
  index: number                           // 更新的行索引
  oldRow: Record<string, any>             // 更新前的行数据
  newRow: Record<string, any>             // 更新后的行数据
  currentTableData: Array<Record<string, any>>  // 当前所有表格数据
}
```

### cellClicked

单元格被点击时触发。

**参数**: `CellClickEvent`

```typescript
interface CellClickEvent {
  clickedRow: Record<string, any>  // 点击的行数据
  clickedRowIndex: number          // 行索引
  clickedColumn: string            // 点击的列名
  clickedColumnIndex: number       // 列索引
  value: any                       // 单元格值
}
```

**使用示例**:

```vue
<template>
  <Lubanno7UniverSheet
    @cellClicked="handleCellClicked"
  />
</template>

<script>
export default {
  methods: {
    handleCellClicked(event) {
      const { clickedColumn, clickedRow, value } = event
      
      // 处理特定列的点击
      if (clickedColumn === 'avatar') {
        this.showUserProfile(clickedRow.id)
      }
      
      if (clickedColumn === 'status') {
        this.showStatusHistory(clickedRow.id)
      }
      
      console.log(`点击了 ${clickedColumn} 列，值为: ${value}`)
    },
    
    showUserProfile(userId) {
      console.log(`显示用户 ${userId} 的资料`)
      // 实现显示用户资料逻辑
    },
    
    showStatusHistory(itemId) {
      console.log(`显示项目 ${itemId} 的状态历史`)
      // 实现显示状态历史逻辑
    }
  }
}
</script>
```

### forbiddenAction

操作被禁止时触发。

**参数**: `ForbiddenActionEvent`

```typescript
interface ForbiddenActionEvent {
  type: ForbiddenActionType  // 操作类型
}
```

**使用示例**:

```vue
<template>
  <Lubanno7UniverSheet
    @forbiddenAction="handleForbiddenAction"
  />
</template>

<script>
export default {
  methods: {
    handleForbiddenAction(event) {
      const { type } = event
      console.log(`操作被禁止: ${type}`)
      // 实现禁止操作后的逻辑
    }
  }
}
</script>
```

### ForbiddenActionType

操作被禁止的类型。

```typescript
type ForbiddenActionType = 
  'copyHeaderForbidden' // 复制表头被禁止
  | 'insertRowInHeaderForbidden' // 插入行在表头被禁止
  | 'deleteRowInHeaderForbidden' // 删除行在表头被禁止
  | 'autoFillFromHeaderForbidden' // 从表头自动填充被禁止
  | 'autoFillToHeaderForbidden' // 到表头自动填充被禁止
  | 'autoFillReadOnlyCellForbidden' // 自动填充只读单元格被禁止
  | 'mergeCellForbidden' // 合并单元格被禁止
  | 'unmergeCellForbidden' // 取消合并单元格被禁止
  | 'moveFromHeaderForbidden' // 从表头移动被禁止
  | 'moveToHeaderForbidden' // 到表头移动被禁止
  | 'moveReadOnlyCellForbidden' // 移动只读单元格被禁止
```