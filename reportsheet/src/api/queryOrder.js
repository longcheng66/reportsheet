import { request } from "@/utils/request";
//封装订单查询接口
export const queryOrder = async (orderId) => {
        try {
          // 使用encodeURIComponent对OrderId进行编码，确保特殊字符（如#）能被正确处理
          const encodedOrderId = encodeURIComponent(orderId);
          // 从localStorage获取当前选择的车间
          const area = localStorage.getItem('selectedWorkshop') || '一部/包装车间';
          // 根据车间名称确定LineField参数
          const lineField = area.includes('一部') ? '包装_一部' : '包装_二部';
          
          // 构建完整的查询URL，包含Area、OrderId和LineField参数
          const response = await request.get(`/api/v1/baogong/orderquery?Area=${encodeURIComponent(area)}&OrderId=${encodedOrderId}&LineField=${encodeURIComponent(lineField)}`);
          
          // 确保返回数据中包含Aleadybanding字段，如果不存在则设为0
          if (response.data && response.data.data && response.data.data.Aleadybanding === undefined) {
            response.data.data.Aleadybanding = '0';
          }
          
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
      
      