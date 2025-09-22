# 事件处理

Lubanno7 Univer Sheet 提供了丰富的事件系统，让你能够监听表格的各种操作并执行相应的业务逻辑。

## 主要事件列表

### 数据相关事件

| 事件名 | 说明 | 参数 |
|--------|------|------|
| `updateData` | 单元格数据更新时触发 | `UpdateDataEvent` |

### 行操作事件

| 事件名 | 说明 | 参数 |
|--------|------|------|
| `insertRow` | 插入行时触发 | `InsertRowEvent` |
| `deleteRow` | 删除行时触发 | `DeleteRowEvent` |
| `rowInserted` | 行插入完成时触发 | `RowInsertedEvent` |
| `rowUpdated` | 行更新完成时触发 | `RowUpdatedEvent` |

### 交互事件

| 事件名 | 说明 | 参数 |
|--------|------|------|
| `cellClick` | 单元格点击时触发 | `CellClickEvent` |
| `tableInitialized` | 表格初始化完成时触发 | `InitEvent` |
| `forbiddenAction` | 操作被禁止时触发 | `ForbiddenActionEvent` |

## 数据更新事件

### updateData 事件

当用户编辑单元格并确认更改时触发：

```vue
<template>
  <Lubanno7UniverSheet
    :columns="columns"
    :data="data"
    @updateData="handleDataUpdate"
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
        { prop: 'status', label: '状态', width: 100 },
        { prop: 'completedAt', label: '完成时间', width: 150 }
      ],
      data: [
        { name: '任务1', status: '进行中', completedAt: '' }
      ]
    }
  },
  methods: {
    handleDataUpdate(event) {
      console.log('数据更新事件:', event)
      
      // 事件参数结构
      const {
        changedRow,          // 更新后的完整行数据
        changedRowIndex,     // 行索引
        changedColumn,       // 更新的列名
        changedColumnIndex,  // 列索引
        oldValue,           // 旧值
        newValue,           // 新值
        currentTableData    // 当前所有表格数据
      } = event
      
      // 业务逻辑处理
      if (changedColumn === 'status') {
        this.handleStatusChange(changedRow, oldValue, newValue)
      }
      
      // 保存到服务器
      this.saveToServer(changedRow, changedRowIndex)
    },
    
    handleStatusChange(row, oldStatus, newStatus) {
      if (newStatus === '已完成') {
        // 自动设置完成时间
        row.completedAt = new Date().toISOString()
        console.log('已自动设置完成时间')
      }
      
      if (oldStatus === '进行中' && newStatus === '暂停') {
        // 记录暂停原因
        const reason = prompt('请输入暂停原因:')
        if (reason) {
          row.pauseReason = reason
        }
      }
    },
    
    async saveToServer(rowData, rowIndex) {
      try {
        const response = await fetch('/api/update-row', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            id: rowData.id,
            data: rowData,
            index: rowIndex
          })
        })
        
        if (response.ok) {
          console.log('数据保存成功')
          this.showNotification('数据已保存', 'success')
        } else {
          console.error('保存失败')
          this.showNotification('保存失败，请重试', 'error')
        }
      } catch (error) {
        console.error('保存出错:', error)
        this.showNotification('网络错误', 'error')
      }
    },
    
    showNotification(message, type) {
      // 实现通知逻辑
      console.log(`[${type}] ${message}`)
    }
  }
}
</script>
```

## 行操作事件

### 插入行事件

```vue
<script>
export default {
  methods: {
    handleInsertRow(event) {
      console.log('插入行事件:', event)
      
      const {
        insertRows,           // 插入的行数据数组
        insertRowStartIndex,  // 插入开始索引
        insertRowEndIndex,    // 插入结束索引
        currentTableData     // 当前所有表格数据
      } = event
      
      // 为新插入的行设置默认值
      insertRows.forEach((row, index) => {
        const actualIndex = insertRowStartIndex + index
        
        // 设置默认值
        row.id = this.generateId()
        row.status = '草稿'
        row.createdAt = new Date().toISOString()
        row.createdBy = this.getCurrentUser().name
        
        console.log(`为第 ${actualIndex} 行设置默认值`)
      })
      
      // 通知服务器
      this.notifyServer('rows_inserted', {
        rows: insertRows,
        startIndex: insertRowStartIndex,
        endIndex: insertRowEndIndex
      })
    },
    
    handleDeleteRow(event) {
      console.log('删除行事件:', event)
      
      const {
        deleteRows,           // 删除的行数据数组
        deleteRowStartIndex,  // 删除开始索引
        deleteRowEndIndex,    // 删除结束索引
        currentTableData     // 当前所有表格数据
      } = event
      
      // 确认删除
      const confirmDelete = confirm(`确定要删除 ${deleteRows.length} 行数据吗？`)
      if (!confirmDelete) {
        // 这里需要实现撤销删除的逻辑
        return
      }
      
      // 记录删除日志
      deleteRows.forEach(row => {
        this.logOperation('delete', row)
      })
      
      // 通知服务器删除
      this.deleteFromServer(deleteRows.map(row => row.id))
    },
    
    // 辅助方法
    generateId() {
      return Date.now().toString(36) + Math.random().toString(36).substr(2)
    },
    
    getCurrentUser() {
      // 实际项目中应从登录信息获取
      return { name: '当前用户' }
    },
    
    notifyServer(action, data) {
      console.log(`通知服务器: ${action}`, data)
      // 实际项目中应发送API请求
    },
    
    logOperation(type, data) {
      console.log(`[${type}]`, data)
      // 实际项目中应记录到日志系统
    },
    
    deleteFromServer(ids) {
      console.log('删除服务器数据:', ids)
      // 实际项目中应发送删除请求
    }
  }
}
</script>
```

### 手动行操作事件

通过组件方法手动操作时的事件：

```vue
<script>
export default {
  methods: {
    handleRowInserted(event) {
      const { insertedRows, insertedRowStartIndex } = event
      
      console.log('手动插入行完成:', insertedRows)
      
      // 可以在这里执行插入后的额外逻辑
      insertedRows.forEach((row, index) => {
        const actualIndex = insertedRowStartIndex + index
        
        // 发送通知
        this.sendNotification(`新增第 ${actualIndex + 1} 行数据`)
        
        // 记录操作日志
        this.auditLog('INSERT_ROW', {
          rowIndex: actualIndex,
          rowData: row,
          operator: this.getCurrentUser().name,
          timestamp: new Date()
        })
      })
    },
    
    handleRowUpdated(event) {
      const { index, oldRow, newRow } = event
      
      console.log('行数据更新完成:', {
        index,
        changes: this.getChanges(oldRow, newRow)
      })
      
      // 记录变更日志
      this.auditLog('UPDATE_ROW', {
        rowIndex: index,
        oldData: oldRow,
        newData: newRow,
        changes: this.getChanges(oldRow, newRow),
        operator: this.getCurrentUser().name,
        timestamp: new Date()
      })
    },
    
    getChanges(oldRow, newRow) {
      const changes = {}
      Object.keys(newRow).forEach(key => {
        if (oldRow[key] !== newRow[key]) {
          changes[key] = {
            from: oldRow[key],
            to: newRow[key]
          }
        }
      })
      return changes
    },
    
    // 辅助方法
    sendNotification(message) {
      console.log('通知:', message)
    },
    
    auditLog(action, data) {
      console.log(`[审计日志] ${action}:`, data)
    },
    
    getCurrentUser() {
      return { name: '当前用户' }
    }
  }
}
</script>
```

## 交互事件

### 单元格点击事件

```vue
<script>
export default {
  methods: {
    handleCellClick(event) {
      const {
        clickedRow,          // 点击的行数据
        clickedRowIndex,     // 行索引
        clickedColumn,       // 点击的列名
        clickedColumnIndex,  // 列索引
        value              // 单元格值
      } = event
      
      console.log('单元格点击:', {
        row: clickedRowIndex,
        column: clickedColumn,
        value
      })
      
      // 特殊列的点击处理
      if (clickedColumn === 'avatar') {
        // 点击头像列时显示大图
        this.showUserAvatar(clickedRow.avatar)
      }
      
      if (clickedColumn === 'status') {
        // 点击状态列时显示状态历史
        this.showStatusHistory(clickedRow.id)
      }
      
      if (clickedColumn === 'actions') {
        // 点击操作列时显示上下文菜单
        this.showContextMenu(event, clickedRow)
      }
      
      // 记录点击统计
      this.recordClickStats(clickedColumn, clickedRowIndex)
    },
    
    // 辅助方法
    showUserAvatar(avatarUrl) {
      console.log('显示头像大图:', avatarUrl)
      // 实现显示大图逻辑
    },
    
    showStatusHistory(id) {
      console.log('显示状态历史:', id)
      // 实现显示状态历史逻辑
    },
    
    showContextMenu(event, row) {
      console.log('显示上下文菜单:', row)
      // 实现显示上下文菜单逻辑
    },
    
    recordClickStats(column, rowIndex) {
      console.log(`记录点击统计: 列=${column}, 行=${rowIndex}`)
      // 实现记录统计逻辑
    }
  }
}
</script>
```

### 表格初始化事件

```vue
<script>
export default {
  methods: {
    handleTableInitialized(event) {
      console.log('表格初始化完成:', event)
      
      const { exposed } = event
      
      // 可以通过 exposed 访问表格方法和属性
      const {
        attributes: {
          univerInstance,       // Univer 核心实例
          univerAPIInstance,    // Univer API 实例
          defaultConfig        // 默认配置
        },
        methods: {
          getCurrentTableData,  // 获取当前表格数据
          endEditing,          // 结束编辑
          setCellFontColor,    // 设置单元格字体颜色
          // ... 其他方法
        }
      } = exposed
      
      // 初始化完成后的操作
      this.performPostInitOperations(exposed)
    },
    
    async performPostInitOperations(exposed) {
      try {
        // 1. 加载初始数据
        const initialData = await this.loadInitialData()
        
        // 2. 应用特殊样式
        this.applySpecialStyles(exposed)
        
        // 3. 设置自动保存
        this.setupAutoSave(exposed)
        
        // 4. 注册快捷键
        this.registerShortcuts(exposed)
        
        console.log('表格初始化后处理完成')
      } catch (error) {
        console.error('初始化后处理失败:', error)
      }
    },
    
    applySpecialStyles(exposed) {
      // 为特定条件的单元格设置特殊颜色
      const currentData = exposed.methods.getCurrentTableData()
      
      currentData.forEach((row, rowIndex) => {
        // 过期项目标红
        if (row.status === 'expired') {
          exposed.methods.setCellFontColor(rowIndex, 'status', '#ff0000')
        }
        
        // 重要项目标蓝
        if (row.priority === 'high') {
          exposed.methods.setCellFontColor(rowIndex, 'priority', '#0066cc')
        }
      })
    },
    
    // 其他辅助方法
    async loadInitialData() {
      console.log('加载初始数据')
      // 实现加载数据逻辑
      return []
    },
    
    setupAutoSave(exposed) {
      console.log('设置自动保存')
      // 实现自动保存逻辑
    },
    
    registerShortcuts(exposed) {
      console.log('注册快捷键')
      // 实现注册快捷键逻辑
    }
  }
}
</script>
```

### 操作被禁止事件

```vue
<script>
export default {
  methods: {
    handleForbiddenAction(event) {
      const { type } = event
      
      console.log('操作被禁止:', type)
    }
  }
}
</script>
```

## 事件组合使用

### 完整的数据流管理

```vue
<template>
  <div>
    <div class="table-status">
      <span>数据状态: {{ dataStatus }}</span>
      <span>最后更新: {{ lastUpdate }}</span>
    </div>
    
    <Lubanno7UniverSheet
      ref="tableRef"
      :columns="columns"
      :data="tableData"
      :config="config"
      @updateData="handleDataUpdate"
      @insertRow="handleInsertRow"
      @deleteRow="handleDeleteRow"
      @cellClick="handleCellClick"
      @tableInitialized="handleTableInit"
      @forbiddenAction="handleForbiddenAction"
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
      dataStatus: 'ready',
      lastUpdate: '',
      columns: [
        { prop: 'name', label: '名称', width: 150 },
        { prop: 'status', label: '状态', width: 100 },
        { prop: 'amount', label: '金额', width: 100 },
        { prop: 'assignee', label: '负责人', width: 120 }
      ],
      tableData: [
        { name: '项目1', status: '进行中', amount: 5000, assignee: '张三' }
      ],
      config: {
        styleOptions: {
          height: '400px'
        }
      },
      saveTimer: null
    }
  },
  methods: {
    // 数据更新处理
    async handleDataUpdate(event) {
      this.dataStatus = 'saving'
      
      try {
        await this.saveData(event)
        this.dataStatus = 'saved'
        this.lastUpdate = new Date().toLocaleTimeString()
        
        // 触发相关业务逻辑
        await this.triggerBusinessLogic(event)
        
      } catch (error) {
        this.dataStatus = 'error'
        console.error('保存失败:', error)
        this.showErrorNotification('保存失败')
      }
    },
    
    // 业务逻辑触发器
    async triggerBusinessLogic(event) {
      const { changedColumn, changedRow, newValue } = event
      
      // 状态变更触发工作流
      if (changedColumn === 'status') {
        await this.triggerWorkflow(changedRow, newValue)
      }
      
      // 金额变更触发审批
      if (changedColumn === 'amount' && newValue > 10000) {
        await this.requestApproval(changedRow)
      }
      
      // 负责人变更发送通知
      if (changedColumn === 'assignee') {
        await this.sendAssigneeNotification(changedRow, newValue)
      }
    },
    
    // 自动保存设置
    setupAutoSave() {
      return () => {
        if (this.saveTimer) clearTimeout(this.saveTimer)
        
        this.saveTimer = setTimeout(async () => {
          if (this.dataStatus === 'modified') {
            const currentData = this.$refs.tableRef.exposed.methods.getCurrentTableData()
            await this.batchSaveData(currentData)
            this.dataStatus = 'saved'
          }
        }, 3000) // 3秒后自动保存
      }
    },
    
    // 其他事件处理方法
    handleInsertRow(event) {
      console.log('插入行事件:', event)
      this.dataStatus = 'modified'
      this.setupAutoSave()()
    },
    
    handleDeleteRow(event) {
      console.log('删除行事件:', event)
      this.dataStatus = 'modified'
      this.setupAutoSave()()
    },
    
    handleCellClick(event) {
      console.log('单元格点击事件:', event)
    },
    
    handleTableInit(event) {
      console.log('表格初始化事件:', event)
    },
    
    handleForbiddenAction(event) {
      const { type } = event
      
      console.log('操作被禁止:', type)
    },
    
    // 辅助方法
    async saveData(event) {
      console.log('保存数据:', event)
      // 实现保存数据逻辑
    },
    
    async batchSaveData(data) {
      console.log('批量保存数据:', data)
      // 实现批量保存逻辑
    },
    
    async triggerWorkflow(row, status) {
      console.log('触发工作流:', row, status)
      // 实现工作流触发逻辑
    },
    
    async requestApproval(row) {
      console.log('请求审批:', row)
      // 实现请求审批逻辑
    },
    
    async sendAssigneeNotification(row, assignee) {
      console.log('发送负责人通知:', row, assignee)
      // 实现发送通知逻辑
    },
    
    showErrorNotification(message) {
      alert(`错误: ${message}`)
    }
  }
}
</script>
```

## 事件最佳实践

1. **异步处理**：事件处理函数应当支持异步操作
2. **错误处理**：为所有事件处理添加错误捕获
3. **性能考虑**：避免在事件处理中执行耗时操作
4. **数据一致性**：确保事件处理不会破坏数据一致性
5. **用户反馈**：为用户操作提供适当的反馈
6. **日志记录**：记录关键事件的操作日志

接下来可以查看 [API 参考](/api/) 了解组件的完整接口文档。