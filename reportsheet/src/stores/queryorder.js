import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { queryOrder } from '@/api/queryOrder';

export const useQueryOrderStore = defineStore('queryOrder', () => {
  const Productdesc3 = ref()
  const Area3 = ref()
  const Ordercount = ref()

  const getqueryorder = async()=>{
        //async表示这是一个异步函数
        //const res用于存储API返回的数据
       const res = await queryOrder()
       console.log(res)
       //使用扩展运算符将res.data.result中的每个元素添加到categoryList.value数组中
       Productdesc3.value = [...res.data.result]
       Area3 .value = [...res.data.result]
       Ordercount .value = [...res.data.result]
 }

//   const getOrderList = async (page, limit) => {
//     const res = await queryOrder(page, limit)
//     orderList.value = res.data.records
//     orderListCount.value = res.data.total
//   }
  return { Productdesc3, Area3, Ordercount, getqueryorder }
})