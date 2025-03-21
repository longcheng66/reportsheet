<template>
  <div class="login-container">
    
    <div class="login-box">
<!-- //齿轮标签 -->
      <div class="settings-icon" @click="goToIPConfig">
      <i class="gear-icon"><img src="@/assets/gear.png" alt="" style="width: 30px; height: 30px;"></i>
    </div>

      <h2 class="login-title">系统登录</h2>
      <div class="login-form">
        <div class="form-item">
          <label>用户名</label>
          <input type="text" v-model="loginForm.username" placeholder="请输入用户名" class="input-field" />
        </div>
        <div class="form-item">
          <label>密码</label>
          <input type="password" v-model="loginForm.password" placeholder="请输入密码" class="input-field" />
        </div>
        <div class="form-actions">
          <button class="login-btn" @click="handleLogin">登录</button>
        </div>
      </div>
      <div class="version">版本:1.8.1</div>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue';
import { Login } from '../api/login';
import { useRouter } from 'vue-router';

const router = useRouter();

// 登录表单数据
const loginForm = reactive({
  username: '',
  password: '',
  verifyCode: '123456' // 默认验证码
});

// 跳转到IP配置页面
const goToIPConfig = () => {
  router.push('/ip-config');
};

// 登录处理函数
const handleLogin = async () => {
  try {
    // 表单验证
    if (!loginForm.username) {
      alert('请输入用户名');
      return;
    }
    if (!loginForm.password) {
      alert('请输入密码');
      return;
    }
    
    // 调用登录接口
    const response = await Login(loginForm);
    
    // 登录成功，存储token
    localStorage.setItem('token', response.data.token);
    
    // 跳转到首页
    router.push('/home');
  } catch (error) {
    console.error('登录失败:', error);
    alert('登录失败，请检查用户名和密码');
  }
};
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f5f5f5;
}

.login-box {
  width: 400px;
  padding: 30px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  /* 固定齿轮在右上角 */
  position: relative;
}

.login-title {
  text-align: center;
  margin-bottom: 30px;
  color: #333;
  font-size: 24px;
}

.login-form {
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
  margin-top: 10px;
}

.login-btn {
  width: 100%;
  padding: 10px;
  background-color: #1890ff;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.login-btn:hover {
  background-color: #40a9ff;
}

.settings-icon {
  position: absolute;
  top: 20px;
  right: 20px;
  cursor: pointer;
  color: #d9d9d9;
  z-index: 180;
}

.gear-icon {
  /* font-size: 24px; */
  color: #1890ff;
  transition: transform 0.3s ease;
}

.gear-icon:hover {
  transform: rotate(90deg);
}

.version{
  margin-top: 20px;
  text-align: center; 
}
</style>