<template>
  <div class="ip-config-container">
    <div class="ip-config-box">
      <h2 class="ip-config-title">服务器IP配置</h2>
      <div class="ip-config-form">
        <div class="form-item">
          <label>服务器地址</label>
          <input type="text" v-model="serverIP" placeholder="请输入服务器IP地址" class="input-field" />
        </div>
        <div class="form-actions">
          <button class="save-btn" @click="saveIPConfig">保存</button>
          <button class="cancel-btn" @click="goBack">返回</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { request } from '../utils/request';

const router = useRouter();
const serverIP = ref('');

// 组件挂载时获取当前IP配置
onMounted(() => {
  // 从localStorage获取保存的IP地址，如果没有则使用request中的默认值
  const savedIP = localStorage.getItem('serverIP');
  if (savedIP) {
    serverIP.value = savedIP;
  } else {
    // 从request.js中获取默认baseURL
    const baseURL = request.defaults.baseURL;
    if (baseURL) {
      // 提取IP地址部分
      const match = baseURL.match(/https?:\/\/(.*?)(?::|\/)/);
      if (match && match[1]) {
        serverIP.value = match[1];
      } else {
        serverIP.value = baseURL;
      }
    }
  }
});

// 保存IP配置
const saveIPConfig = () => {
  if (!serverIP.value) {
    alert('请输入服务器IP地址');
    return;
  }
  
  try {
    // 保存到localStorage
    localStorage.setItem('serverIP', serverIP.value);
    
    // 更新axios实例的baseURL
    const protocol = request.defaults.baseURL.startsWith('https') ? 'https' : 'http';
    const port = request.defaults.baseURL.match(/:([0-9]+)/);
    const portNumber = port ? port[1] : '8809'; // 默认端口
    
    request.defaults.baseURL = `${protocol}://${serverIP.value}:${portNumber}`;
    
    alert('IP配置已保存');
    router.push('/');
  } catch (error) {
    console.error('保存IP配置失败:', error);
    alert('保存失败，请重试');
  }
};

// 返回登录页
const goBack = () => {
  router.push('/');
};
</script>

<style scoped>
.ip-config-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f5f5f5;
}

.ip-config-box {
  width: 400px;
  padding: 30px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}

.ip-config-title {
  text-align: center;
  margin-bottom: 30px;
  color: #333;
  font-size: 24px;
}

.ip-config-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-item {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.form-item label {
  font-size: 14px;
  color: #333;
}

.input-field {
  padding: 10px;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  font-size: 14px;
  width: 100%;
}

.input-field:focus {
  border-color: #1890ff;
  outline: none;
  box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);
}

.form-actions {
  display: flex;
  gap: 10px;
  margin-top: 10px;
}

.save-btn, .cancel-btn {
  flex: 1;
  padding: 10px;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.save-btn {
  background-color: #1890ff;
  color: white;
}

.save-btn:hover {
  background-color: #40a9ff;
}

.cancel-btn {
  background-color: #f5f5f5;
  color: #333;
  border: 1px solid #d9d9d9;
}

.cancel-btn:hover {
  background-color: #e6e6e6;
}
</style>