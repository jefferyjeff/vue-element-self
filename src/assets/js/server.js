/* 配合mock模拟后台返回信息
 */
let server = {};


server.successData = function(code, data, message, success){
  return {
    code, data, message, success
  }
}

export default server;
