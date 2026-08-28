// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境
const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const { action, payload } = event;

  switch (action) {
    case 'login':
      // 返回用户 OpenID，用于绑定
      return { openid: wxContext.OPENID }
      
    case 'bindCouple':
      // 情侣绑定逻辑 (将来在这里实现写库)
      return { success: true, partnerId: payload.partnerId }
      
    case 'syncMenu':
      // 同步菜单逻辑
      return { success: true }
      
    default:
      return { error: 'Unknown action' }
  }
}
