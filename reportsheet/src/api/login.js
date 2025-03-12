import { request } from "@/utils/request";

//封装登录接口
export const Login = async (departmentData) => {
  try {
    // 假设你要调用创建部门的 API
    const response = await request.post('/api/v1/system/login', departmentData);

    // 返回响应数据
    return response.data;  
  } catch (error) {
    console.error('创建部门失败:', error);
    // 重新抛出错误以供上层处理
    throw error;  
  }
};
