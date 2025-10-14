# 常见问题

## Q：Lubanno7UniverSheet组件支持异步加载吗？
A：支持异步加载，但组件默认未开启该功能，具体说明如下：

### 一、默认未开启异步加载的核心原因
1. **加载效率本质无提升，反而可能耗时更长**  
异步加载通过 “分批次加载数据” 减少浏览器单帧内的数据处理量，使主线程可分配资源至其他操作，但数据总加载量并未减少；由于单帧内并非以最大化加载速率处理数据，其整体加载耗时通常长于同步加载。

2. **同步与异步加载的逻辑本质不同**  
- 同步加载：表格初始化时一次性加载所有数据，数据与表格初始化过程同步完成；  
- 异步加载：先完成空表格创建，再逐行执行数据加载，与同步加载 “一次性完成初始化与数据加载” 的机制存在本质区别。


### 二、同步与异步加载的适用场景
- **优先选同步加载：小数据量场景**  
经测试验证，同等数据量下，同步加载的速率优于异步加载；若数据量较小，未对页面交互产生影响（如无卡顿、无主线程阻塞等问题），采用同步加载可同时保障效率与用户体验。

- **建议用异步加载：大数据量场景**  
当数据量过大时，同步加载会导致主线程阻塞，进而引发页面无响应；此时开启异步加载，表格可分批次执行数据加载，主线程可并行处理其他操作，有效避免页面卡死问题。

### 三、异步加载的开启方式与参数调整
1. **开启方法**：通过配置`asyncOptions.isAsyncEnabled = true`启用异步加载；  
2. **参数调整**：  
   - `baseBatchSize`：控制单批次加载的数据量，值越小浏览器交互越流畅，但整体加载时间越长，需根据数据量与页面体验平衡设置；  
   - 精细化分步控制参数：组件提供的批次比例控制参数，可通过调整该参数优化加载批次的分配比例，以实现 “交互流畅性” 与 “加载效率” 的最优平衡。

## Q：Lubanno7UniverSheet组件是否支持操作Univer底层？
A：该组件支持对Univer底层的操作，通过主动暴露核心实例与专用方法，降低开发者定制化开发的难度，具体说明如下：

### 一、核心支持能力：暴露底层操作入口
组件通过明确暴露两类核心实例与专用方法，为底层操作提供直接入口：
1. **核心实例暴露**  
   组件对外暴露 `univerInstance` 与 `univerAPIInstance` 两个底层实例，开发者可通过这两个实例直接调用Univer底层的原生能力，实现对表格底层逻辑的深度控制。
2. **专用方法补充**  
   除核心实例外，组件额外暴露与“Univer底层索引操作”直接相关的专用方法，无需开发者自行封装索引转换逻辑，进一步简化底层操作的实现流程。


### 二、实际操作示例：扩展自定义事件（以RowHeaderClick为例）
以下为通过组件暴露的底层能力，扩展“行表头点击（RowHeaderClick）”事件的示例代码，可参考该逻辑实现其他自定义底层操作：
```javascript
// 声明事件销毁器（用于后续资源清理）
let rowHeaderClickDisposable;

// 监听表格初始化完成事件（确保底层实例已就绪）
sheet.on('tableInitialized', () => {
  // 1. 获取组件暴露的底层资源
  const exposed = sheet.getExposed();
  const componentMethods = exposed.methods; // 组件封装的方法
  const univerAPIInstance = exposed.attributes.univerAPIInstance; // 底层Univer API实例

  // 2. 通过底层API实例添加RowHeaderClick事件监听
  rowHeaderClickDisposable = univerAPIInstance.addEvent(
    univerAPIInstance.Event.RowHeaderClick, 
    (event) => {
      const { row } = event; // 获取点击的行索引
      const headerRowCount = componentMethods.getTableHeaderRowCount(); // 获取表头行数

      // 3. 业务逻辑判断：区分点击“表头行”与“数据行”
      if (row < headerRowCount) {
        console.log('触发表头行点击事件');
      } else {
        // 转换为数据行索引（排除表头行）并获取行数据
        const dataRowIndex = row - headerRowCount;
        const rowData = componentMethods.getRowByIndex(dataRowIndex);
        console.log(`触发第${dataRowIndex + 1}行数据行点击事件，数据：`, rowData);
      }
    }
  );
});

// 组件销毁前清理事件监听（需参考Univer官网规范避免内存泄漏）
if (rowHeaderClickDisposable) {
  rowHeaderClickDisposable.dispose();
}
```

### 三、关键注意事项
1. **实例就绪时机**  
   需在 tableInitialized 事件触发后获取底层实例（此时表格底层逻辑已初始化完成），避免因实例未就绪导致的调用失败。
2. **资源清理规范**  
   通过底层 API 添加的事件、监听等资源，需在组件销毁前按 Univer 官网的清理规范执行销毁操作（如示例中的 dispose() 方法），防止内存泄漏。

## Q：何时可获取Lubanno7UniverSheet组件的exposed对象？
A：仅在组件触发`tableInitialized`事件后，通过`sheet.getExposed()`方法可获取到exposed对象，在该事件触发前调用此方法返回`null`。