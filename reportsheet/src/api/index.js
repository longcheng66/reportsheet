import { request } from "@/utils/request";

// 封装报工接口
export const submitWorkOrder = async (data) => {
  try {
    // 使用 axios 请求时，确保 Content-Type 为 application/json
    const response = await request.post('/api/v1/baogong/baogong', data, {
      headers: {
        'Content-Type': 'application/json',  // 明确指定上传的是 JSON 格式数据
      },
    });

    // 返回响应数据
    return response.data;  
  } catch (error) {
    console.error('上传报表失败', error);
    // 重新抛出错误以供上层处理
    throw error;  
  }
};

