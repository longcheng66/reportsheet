<template>
  <div class="work-order-management">
    <!-- 顶部导航 -->
    <div class="navigation">
      <div class="nav-item active">报工</div>
      
    </div>

    <!-- 产品信息区域 -->
    <div class="product-info-section">
      <div class="info-row">
        <div class="info-item">
          <label>生产车间</label>
<select class="input-field" v-model="productInfo.workshop">
            <option value="">请选择车间</option>
            <option value="一部/压铸车间">一部/压铸车间</option>
            <option value="一部/金工车间">一部/金工车间</option>
            <option value="一部/表面车间">一部/表面车间</option>
            <option value="一部/刮刀车间">一部/刮刀车间</option>
            <option value="一部/包装车间">一部/包装车间</option>
            <option value="一部/其它">一部/其它</option>
            <option value="一部/仓库">一部/仓库</option>
            <option value="二部/金工车间">二部/金工车间</option>
            <option value="二部/表面车间">二部/表面车间</option>
            <option value="二部/刮刀车间">二部/刮刀车间</option>
            <option value="二部/包装车间">二部/包装车间</option>
          </select>
          

        </div>
        <div class="info-item">
          <label>班次</label>
          <input type="text" placeholder="请输入班次" class="input-field" v-model="productInfo.shift" />
        </div>
        
        <div class="info-item">
          <label>报工日期</label>
          <input type="date" placeholder="请选择日期" class="input-field" v-model="productInfo.reportDate" />
        </div>
        <div class="info-item">
          <label>制表人</label>
          <input type="text" placeholder="请输入制表人" class="input-field" v-model="productInfo.preparer" />
        </div>
      </div>
      <div class="info-actions">
        <button class="btn-confirm" @click="handleProductInfoConfirm">确认</button>
      </div>
    </div>

    <!-- 工序明细表格 -->
    <div class="process-details">
      <div class="process-header">
        <h3>工序明细</h3>
        <button class="add-process-btn" @click="handleAddProcess">添加记录</button>
      </div>
      <table class="process-table">
        <thead>
          <tr>
            <th>订单单号</th>
            <th>产品名称</th>
            <th>工序名称</th>
            <th>作业员</th>
            <th>订单数</th>
            <th>产出数</th>
            <th>投入工时</th>
            <th>计件工时</th>
            <th>计时工时</th>
            <th>开工日期</th>
            <th>完工日期</th>
            <th>Card</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item,index) in processdetail" :key="index">
            <td>{{item.sorder}}</td>
            <td>{{item.productdesc}}</td>
            <td>{{item.processname}}</td>
            <td>{{item.productop}}</td>
            <td>{{item.dataone}}</td>
            <td>{{item.datatwo}}</td>
            <td>{{item.inputtime}}</td>
            <td>{{item.recordingtime}}</td>
            <td>{{item.hourlyhours}}</td>
            <td>{{item.gowork}}</td>
            <td>{{item.offduty}}</td>
            <td>{{item.card}}</td>
            <td class="operation-column">
              <div class="operation-buttons">
                <button class="operation-btn edit" @click="handleEdit(index)">修改</button>
                <button class="operation-btn delete" @click="handleDelete(index)">删除</button>
                
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- 底部按钮 -->
    <div class="bottom-actions">
      
      <button class="btn-save" @click="handleSaveDraft">保存报表</button>
    </div>
  </div>

    <!-- 添加工序弹窗 -->
    <div class="dialog-overlay" v-if="showDialog">
      <div class="dialog-content">
        <div class="dialog-header">
          <h3>添加工序</h3>
          <button class="close-btn" @click="handleCloseDialog">×</button>
        </div>
        <div class="dialog-body">
          <div class="form-section">
            <div class="form-row">
              <div class="form-item">
                <label>订单单号</label>
                <input type="text" class="input-field" placeholder="请输入订单单号" v-model="formData.sorder" @blur="handleOrderQuery" />
              </div>
              <div class="form-item">
                <label>产品名称</label>
                <input type="text" class="input-field" placeholder="请输入产品名称" v-model="formData.productdesc" />
              </div>
              <div class="form-item">
                <label>工序名称</label>
                <input type="text" class="input-field" placeholder="请输入工序名称" v-model="formData.processname" />
              </div>
              <div class="form-item">
                <label>作业员</label>
                <input type="text" class="input-field" placeholder="请输入作业员" v-model="formData.productop" />
              </div>
              <div class="form-item">
                <label>订单数</label>
                <input type="text" class="input-field" placeholder="请输入订单数" v-model="formData.dataone" />
              </div>

              <div class="form-item">
                <label>产出数</label>
                <input type="text" class="input-field" placeholder="请输入产出数" v-model="formData.datatwo" @blur="validateOutputData" />
              </div>

              <div class="form-item">
                <label>投入工时</label>
                <input type="text" class="input-field" placeholder="请输入" v-model="formData.inputtime" />
              </div>

              <div class="form-item">
                <label>计件工时</label>
                <input type="text" class="input-field" placeholder="请输入" v-model="formData.recordingtime" />
              </div>
              <div class="form-item">
                <label>计时工时</label>
                <input type="text" class="input-field" placeholder="请输入" v-model="formData.hourlyhours" />
              </div>
              
               <div class="form-item">
                <label>开工日期</label>
                <input type="datetime-local" class="input-field" v-model="formData.gowork"/>
              </div>
              <div class="form-item">
                <label>完工日期</label>
                <input type="datetime-local" class="input-field" v-model="formData.offduty"/>
              </div>

              <div class="form-item" v-show="ok">
                <label>Card</label>
                <!-- 添加了readonly属性，使其变为只读状态 -->
                <input type="text" class="input-field" placeholder="请输入" v-model="formData.card" readonly />
              </div>
            </div>


            <div class="form-row">
             
            </div>
          </div>
          
        </div>
        <div class="dialog-footer">
          <button class="btn-cancel" @click="handleCloseDialog">取消</button>
          <button class="btn-confirm" @click="handleConfirm">确定</button>
        </div>
      </div>
    </div>
</template>

<script setup>
import { ref, reactive, watch } from 'vue';
import { submitWorkOrder } from '../api/index';
import { queryOrder } from '../api/queryOrder.js';


const showDialog = ref(false);
// 添加编辑状态标识和当前编辑行索引
const isEditing = ref(false);
const currentEditIndex = ref(-1);

// 产品信息响应式数据
const productInfo = reactive({
  workshop: '',
  shift: '',
  reportDate: '',
  preparer: ''
});

// 监听workshop变化，保存到localStorage
watch(() => productInfo.workshop, (newValue) => {
  if (newValue) {
    localStorage.setItem('selectedWorkshop', newValue);
  }
});

// 表头信息确认
const handleProductInfoConfirm = () => {
  console.log('产品信息已确认：', productInfo);
  // 这里可以添加其他处理逻辑
  
  // 构建产品信息数据
  const productInfoData = {
    area: productInfo.workshop,
    workingshift: productInfo.shift,
    shijian: productInfo.reportDate,
    reportname: productInfo.preparer
  };
  
  // 发送产品信息到后端
  submitWorkOrder(productInfoData)
    .then(response => {
      console.log('产品信息提交成功：', response);
      // 可以添加成功提示
    })
    .catch(error => {
      console.error('产品信息提交失败：', error);
      // 可以添加错误处理
    });
    alert('保存成功')
};
//构建产品信息数据源


// 添加新的表单数据对象
const formData = reactive({
  sorder: '',
  productdesc: '',
  processname: '',
  productop: '',
  dataone:'',
  datatwo: '',
  inputtime: '',
  recordingtime: '',
  hourlyhours: '',
  gowork: '',
  offduty: '',
  startDate: '',
  endDate: '',
  card:''
});

const handleAddProcess = () => {
  isEditing.value = false;
  currentEditIndex.value = -1;
  showDialog.value = true;
};

// 添加修改按钮点击事件处理函数
const handleEdit = (index) => {
  isEditing.value = true;
  currentEditIndex.value = index;
  
  // 填充表单数据
  const currentItem = processdetail[index];
  Object.keys(formData).forEach(key => {
    if (key in currentItem) {
      formData[key] = currentItem[key];
    }
  });
  
  // 打开弹窗
  showDialog.value = true;
};

const handleCloseDialog = () => {
  showDialog.value = false;
  // 重置表单数据
  Object.keys(formData).forEach(key => {
    formData[key] = '';
  });
};


//binding@blur=handleOrderQuery，用于监听元素失去焦点的事件。
//处理订单查询
const handleOrderQuery = async () => {
  if (!formData.sorder || formData.sorder.trim() === '') {
    return;
  }
  
  try {
    // 调用订单查询API
    const response = await queryOrder(formData.sorder);
    console.log('订单查询结果：', response);
    
    // 如果查询成功，自动填充相关字段
    //response.Code里面code要大写
    if (response && response.Code === 200 && response.data) {
      // 根据API返回的数据结构填充表单
      formData.productdesc = response.data.Productdesc3 || '';
      formData.processname = response.data.Area3 || '';
      formData.dataone = response.data.Ordercount || '';
      formData.card = response.data.Card || '';
      
      // 数据校验：检查已报工数据与产出数的关系
      if (response.data.Aleadybanding) {
        // 对订单数进行余量处理：乘以1.5%再加30
        const orderCount = parseFloat(formData.dataone) || 0;
        const marginOrderCount = orderCount * 1.015 + 30;
        
        // 获取已报工数据
        const reportedCount = parseFloat(response.data.Aleadybanding) || 0;
        
        // 如果已报工数据大于产出数，提示用户
        if (reportedCount > parseFloat(formData.datatwo || 0)) {
          alert('警告：已报工数据大于产出数，请检查数据！');
          console.warn('数据异常：已报工数据大于产出数', {
            已报工数据: reportedCount,
            产出数: formData.datatwo,
            订单数: orderCount,
            订单数余量处理后: marginOrderCount
          });
        }
        
        // 如果已报工数据大于订单数余量处理后的值，也提示用户
        if (reportedCount > marginOrderCount) {
          alert('警告：已报工数据超过订单数余量上限，请检查数据！');
          console.warn('数据异常：已报工数据超过订单数余量上限', {
            已报工数据: reportedCount,
            订单数: orderCount,
            订单数余量处理后: marginOrderCount
          });
        }
      }
    } else {
      console.warn('订单查询未返回有效数据');
      console.log(response);
    }
  } catch (error) {
    console.error('订单查询失败：', error);
    // 可以添加错误提示
  }
};

// 验证产出数据
const validateOutputData = async () => {
  if (!formData.dataone || !formData.datatwo) {
    return;
  }
  
  try {
    // 解析订单数和产出数
    const orderCount = parseFloat(formData.dataone) || 0;
    const outputCount = parseFloat(formData.datatwo) || 0;
    
    // 对订单数进行余量处理：乘以1.5%再加30
    const marginOrderCount = orderCount * 1.015 + 30;
    
    // 如果产出数大于订单数余量处理后的值，提示用户
    if (outputCount > marginOrderCount) {
      alert(`警告：产出数(${outputCount})超过订单数余量上限(${marginOrderCount.toFixed(2)})，请检查数据！`);
      console.warn('数据异常：产出数超过订单数余量上限', {
        产出数: outputCount,
        订单数: orderCount,
        订单数余量处理后: marginOrderCount
      });
    }
    
    // 如果有订单查询结果，检查已报工数据
    if (formData.sorder) {
      const response = await queryOrder(formData.sorder);
      if (response && response.Code === 200 && response.data && response.data.Aleadybanding) {
        const reportedCount = parseFloat(response.data.Aleadybanding) || 0;
        
        // 如果已报工数据大于产出数，提示用户
        if (reportedCount > outputCount) {
          alert(`警告：已报工数据(${reportedCount})大于产出数(${outputCount})，请检查数据！`);
          console.warn('数据异常：已报工数据大于产出数', {
            已报工数据: reportedCount,
            产出数: outputCount
          });
        }
      }
    }
  } catch (error) {
    console.error('产出数据验证失败：', error);
  }
};



// 将表单数据转换为JSON格式
const convertFormToJson = () => {
  //JSON.stringify(json)功能: 将一个 json 对象转换成为 json 字符串
  return JSON.stringify({
    area: "二部/包装车间",
    workingshift: productInfo.shift,
    shijian: productInfo.reportDate,
    reportname: productInfo.preparer,
    productdata: [
      {
        "0": {
          line: "包装_二部",
          productop: formData.productop,
          sorder: formData.sorder,
          productname: formData.productdesc,
          productdesc: formData.processname,
          orderqty: formData.dataone,
          okqty: formData.datatwo,
          ngqty: "0",
          bfqty: "0",
          costtime: formData.inputtime,
          piecetime: formData.recordingtime,
          perhourtime: formData.hourlyhours,
          starworktime: formData.gowork,
          endworktime: formData.offduty,
          card: formData.card
        }
      }
    ]
  }, null, 2);
};


// 处理保存草稿按钮点击事件
const handleSaveDraft = () => {
  // 构建完整的表单数据，包括产品信息和工序明细
  const draftData = {
    area: productInfo.workshop,
    workingshift: productInfo.shift,
    shijian: productInfo.reportDate,
    reportname: productInfo.preparer,
    productdata: processdetail.map((item, index) => {
      // 拆分订单号
      const orderParts = item.sorder.split('#');
      const sorder = orderParts[1] || ''; // 获取第二部分作为订单号
      const productname = orderParts[2] || ''; // 获取第三部分作为产品编号

      return {
        [index]: {
          line: productInfo.workshop,
          productop: item.productop,
          sorder: sorder,
          productname: productname,
          productdesc: item.productdesc,
          orderqty: item.dataone,
          okqty: item.datatwo,
          ngqty: "0",
          bfqty: "0",
          costtime: item.inputtime,
          piecetime: item.recordingtime,
          perhourtime: item.hourlyhours,
          starworktime: item.gowork,
          endworktime: item.offduty,
          card: item.card
        }
      };
    })
  };

  // 发送草稿数据到后端API
  submitWorkOrder(draftData)
    .then(response => {
      console.log('草稿保存成功：', response);
      // 可以添加成功提示
    })
    .catch(error => {
      console.error('草稿保存失败：', error);
      // 可以添加错误处理
    });

    alert('保存成功');
};


const handleConfirm = () => {
  // 数据校验：检查产出数与订单数的关系
  const orderCount = parseFloat(formData.dataone) || 0;
  const outputCount = parseFloat(formData.datatwo) || 0;
  
  // 对订单数进行余量处理：乘以1.5%再加30
  const marginOrderCount = orderCount * 1.015 + 30;
  
  // 如果产出数大于订单数余量处理后的值，提示用户
  if (outputCount > marginOrderCount) {
    const confirmSubmit = confirm('警告：产出数超过订单数余量上限，是否继续提交？');
    if (!confirmSubmit) {
      return; // 用户取消提交
    }
  }
  
  // 拆分订单号
  const orderParts = formData.sorder.split('#');
  const sorder = orderParts[1] || ''; // 获取第二部分作为订单号
  const productname = orderParts[2] || ''; // 获取第三部分作为产品编号

  // 获取JSON格式的表单数据
  const formDataJson = JSON.stringify({
    area: "二部/包装车间",
    workingshift: productInfo.shift,
    shijian: productInfo.reportDate,
    reportname: productInfo.preparer,
    productdata: [
      {
        "0": {
          line: "包装_二部",
          productop: formData.productop,
          sorder: sorder,
          productname: productname,
          productdesc: formData.productdesc,
          orderqty: formData.dataone,
          okqty: formData.datatwo,
          ngqty: "0",
          bfqty: "0",
          costtime: formData.inputtime,
          piecetime: formData.recordingtime,
          perhourtime: formData.hourlyhours,
          starworktime: formData.gowork,
          endworktime: formData.offduty,
          card: formData.card
        }
      }
    ]
  }, null, 2);

  if (isEditing.value && currentEditIndex.value >= 0) {
    // 更新现有工序数据
    processdetail[currentEditIndex.value] = {
      ...processdetail[currentEditIndex.value],
      sorder: formData.sorder,
      productdesc: formData.productdesc,
      processname: formData.processname,
      productop: formData.productop,
      dataone: formData.dataone,
      datatwo: formData.datatwo,
      inputtime: formData.inputtime,
      recordingtime: formData.recordingtime,
      hourlyhours: formData.hourlyhours,
      gowork: formData.gowork,
      offduty: formData.offduty,
      card: formData.card
    };
  } else {
    // 创建新的工序数据对象
    const newProcess = {
      id: processdetail.length + 1,
      sorder: formData.sorder,
      productdesc: formData.productdesc,
      processname: formData.processname,
      productop: formData.productop,
      dataone: formData.dataone,
      datatwo: formData.datatwo,
      inputtime: formData.inputtime,
      recordingtime: formData.recordingtime,
      hourlyhours: formData.hourlyhours,
      gowork: formData.gowork,
      offduty: formData.offduty,
      card: formData.card
    };

    // 添加到工序明细数组
    processdetail.push(newProcess);
  }

  // 发送数据到后端API
  const jsonData = JSON.parse(formDataJson);
  submitWorkOrder(jsonData)
    .then(response => {
      console.log('报工数据提交成功：', response);
      // 可以添加成功提示或其他逻辑
    })
    .catch(error => {
      console.error('报工数据提交失败：', error);
      // 可以添加错误处理逻辑
    });

  // 关闭弹窗并重置表单
  handleCloseDialog();
};

//工序明细
const processdetail = reactive([])



//删除按钮
/**
 * 删除工序明细中的指定项
 * @param {number} index - 要删除的工序在数组中的索引位置
 * @description 通过数组的splice方法删除processdetail数组中指定索引位置的工序项
 */

const handleDelete = (index) => {
  processdetail.splice(index, 1);
};
</script>

<style scoped>
.work-order-management {
  padding: 20px;
  background-color: #f5f5f5;
}

.navigation {
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
}

.nav-item {
  padding: 10px 20px;
  cursor: pointer;
}

.nav-item.active {
  color: #1890ff;
  border-bottom: 2px solid #1890ff;
}

.product-info-section {
  background-color: white;
  padding: 20px;
  border-radius: 4px;
  margin-bottom: 20px;
}

.info-actions {
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
}

.info-row {
  display: flex;
  gap: 20px;
  margin-bottom: 15px;
}

.info-item {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin:10px;
}

.info-item label {
  font-size: 14px;
  color: #333;
}

.input-field {
  padding: 8px;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  width: 100%;
}

.input-field:disabled {
  background-color: #f5f5f5;
  cursor: not-allowed;
}

.process-details,
.bom-details {
  background-color: white;
  padding: 20px;
  border-radius: 4px;
  margin-bottom: 20px;
}

.process-table,
.bom-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 15px;
}

.process-table th,
.process-table td,
.bom-table th,
.bom-table td {
  border: 1px solid #d9d9d9;
  padding: 12px 8px;
  text-align: left;
}

.process-table th,
.bom-table th {
  background-color: #fafafa;
  font-weight: 500;
}

.bom-header {
  margin-bottom: 15px;
  color: #666;
}

.bottom-actions {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 30px;
}

.btn-cancel,
.btn-save {
  padding: 8px 24px;
  border-radius: 4px;
  cursor: pointer;
  border: none;
  font-size: 14px;
}

.btn-cancel {
  background-color:rgb(212, 212, 212);
  color: #666;
}

.btn-save {
  background-color: #1890ff;
  color: white;
}

/* 操作按钮样式 */
.action-buttons {
  display: flex;
  gap: 8px;
  justify-content: center;
}

.action-btn {
  padding: 4px 8px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s;
}

.operation-column {
  min-width: 60px;
}

.operation-buttons {
  display: flex;
  gap: 12px;
  justify-content: center;
}

.operation-btn {
  padding: 6px 9px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.3s;
}

.operation-btn.edit {
  background-color: #1890ff;
  color: white;
}

.operation-btn.edit:hover {
  background-color: #40a9ff;
}

.operation-btn.delete {
  background-color: #ff4d4f;
  color: white;
}

.operation-btn.delete:hover {
  background-color: #ff7875;
}
.view-btn {
  background-color: #e6f7ff;
  color: #1890ff;
}

.view-btn:hover {
  background-color: #bae7ff;
}

.edit-btn {
  background-color: #f6ffed;
  color: #52c41a;
}

.edit-btn:hover {
  background-color: #d9f7be;
}

.delete-btn {
  background-color: #fff1f0;
  color: #ff4d4f;
}

.delete-btn:hover {
  background-color: #ffa39e;
}

.process-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.add-process-btn {
  padding: 8px 16px;
  background-color: #1890ff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  display: flex;
  align-items: center;
  transition: all 0.3s;
}

.add-process-btn:hover {
  background-color: #40a9ff;
}

/* 弹窗样式 */
.dialog-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.dialog-content {
  background-color: white;
  border-radius: 8px;
  width: 80%;
  max-width: 1200px;
  max-height: 90vh;
  overflow-y: auto;
}

.dialog-header {
  padding: 16px 24px;
  border-bottom: 1px solid #f0f0f0;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.close-btn {
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  color: #999;
}

.dialog-body {
  padding: 24px;
}

.form-section {
  margin-bottom: 24px;
}

.form-row {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  margin-bottom: 16px;
}

.form-item {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin:10px;
}

.form-item label {
  font-size: 14px;
  color: #333;
}

.form-item .input-field {
  width: 100%;
  margin-bottom: 8px;
}

.table-section {
  margin-top: 24px;
}

.detail-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 12px;
}

.detail-table th,
.detail-table td {
  border: 1px solid #f0f0f0;
  padding: 12px;
}

.table-input {
  width: 100%;
  padding: 4px 8px;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
}

.dialog-footer {
  padding: 16px 24px;
  border-top: 1px solid #f0f0f0;
  display: flex;
  justify-content: flex-end;
  gap: 12px;
}

.btn-confirm {
  background-color: #1890ff;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
}

.btn-confirm:hover {
  background-color: #40a9ff;
}
</style>