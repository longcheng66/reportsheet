import { request } from "@/utils/request";
//封装订单查询接口
export const queryOrder = async (orderId) => {
        try {
          // 使用encodeURIComponent对OrderId进行编码，确保特殊字符（如#）能被正确处理
          const encodedOrderId = encodeURIComponent(orderId);
          // 从WorkOrderManagement.vue组件获取的车间信息
          const area = "一部/包装车间"; // 默认值，实际使用时可从参数传入
          const lineField = "包装_一部"; // 默认值，实际使用时可从参数传入
          
          // 构建完整的查询URL，包含所有必要参数
          const response = await request.get(`/api/v1/baogong/orderquery?Area=${encodeURIComponent(area)}&OrderId=${encodedOrderId}&LineField=${encodeURIComponent(lineField)}`);
          return response.data;
        } catch (error) {
          console.error('订单查询失败:', error);
          throw error;
        }
      };
      
// export const queryOrder = async () => {
//         try {
//           // 使用encodeURIComponent对OrderId进行编码，确保特殊字符（如#）能被正确处理

//           const response = await request.get('/api/v1/baogong/orderquery');
//           return response.data;
//         } catch (error) {
//           console.error('订单查询失败:', error);
//           throw error;
//         }
//       };
      
      