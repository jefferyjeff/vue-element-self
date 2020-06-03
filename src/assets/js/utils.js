import axios from 'axios';
import my from './my';
let utils = {};

utils.ajaxUrl = "https://www.test.com";

utils.ajax = axios.create({
  baseURL: utils.ajaxUrl,
  timeout: 30000
});

utils.POST = function(args) {
  utils.ajax({
    url: args.url,
    data: args.data == undefined ? null : args.data,
    method: 'post',
    dataType: args.dataType == undefined ? "json" : args.dataType,
    headers: args.headers == undefined ? {
      'Content-Type': 'application/x-www-form-urlencoded'
    } : args.headers,
    params: args.params == undefined ? null : args.params,
    responseType: args.responseType == undefined ? null : args.responseType,
    onUploadProgress: args.onUploadProgress == undefined ? null : args.onUploadProgress,
  }).then((res) => {
    let result = utils.checkAjaxData(res.data);
    utils.isSuccess(result).then((res) => {
      args.success(res)
    }).catch((e) => {
      args.error(e); 
    })
  }).catch((e) => {
    args.error(e);
  }).finally(() => {
    args.finally()
  })
}
utils.GET = function(args) {
  utils.ajax({
    url: args.url,
    method: 'get',
    dataType: args.dataType == undefined ? "json" : args.dataType,
    headers: args.headers == undefined ? {
      'Content-Type': 'application/x-www-form-urlencoded'
    } : args.headers,
    params: args.params == undefined ? null : args.params,
    responseType: args.responseType == undefined ? null : args.responseType,
  }).then((res) => {
    args.success(res)
  }).catch((e) => {
    args.error(e); 
  }).finally(() => {
    args.finally()
  })
};
/* 根据数据类型判断数据的校验
 */
utils.checkAjaxData = function(opts) {
  if (opts != undefined || opts != null) {
    for (let i in opts) {
      let text = utils.checkType(opts[i])
      if (text === 'object') {
        opts[i] = utils.checkAjaxData(opts[i]);
      } else if (text === 'number') {

      } else if (text === 'string') {

      } else if (text === 'array') {
        opts[i] = utils.checkAjaxData(opts[i]);
      } else if (text === 'undefined') {
        opts[i] = "";
      } else if (text === 'null') {
        opts[i] = "";
      }
    }
  }
  return opts;
}
/* 判断数据类型
 */
utils.checkType = function(obj) {
  let toString = Object.prototype.toString;
  let map = {
    '[object Boolean]': 'boolean',
    '[object Number]': 'number',
    '[object String]': 'string',
    '[object Function]': 'function',
    '[object Array]': 'array',
    '[object Date]': 'date',
    '[object RegExp]': 'regExp',
    '[object Undefined]': 'undefined',
    '[object Null]': 'null',
    '[object Object]': 'object'
  };
  return map[toString.call(obj)];
}
/* 判断请求返回状态码
 */
utils.isSuccess = function(res) {
  return new Promise((resolve, reject) => {
    if (res.code === 20000) {
      resolve(res);
    } else if (res.code === 30000) {
      reject(res.message)
    } else if (res.code === 50014) {
      reject("授权过期")
    }
  })
}
/* 计算表格显示高度
  @params:
   mainContent: router-view显示高度
   header: 页面搜索头部
   footer: 底部分页高度
 */
utils.calHeightMethod = function(mainContent, header, footer) {
  return mainContent - header - footer - 30;
}

//得到图片路径
utils.getObjectURL = function(file) {
  let url = null;
  if (window.createObjectURL != undefined) {
    url = window.createObjectURL(file);
  } else if (window.URL != undefined) { // mozilla(firefox)
    url = window.URL.createObjectURL(file);
  } else if (window.webkitURL != undefined) { // webkit or chrome
    url = window.webkitURL.createObjectURL(file);
  }
  return url;
}
//年月日 时分秒
utils.dateformat = function dateformat(value) {
  if (value != undefined) {
    let date = new Date(value);
    let month;
    let da;
    let hour;
    let minutes;
    let second;
    let str;
    if ((date.getMonth() + 1) < 10) {
      month = "0" + (date.getMonth() + 1);
    } else {
      month = date.getMonth() + 1;
    }
    if ((date.getDate()) < 10) {
      da = "0" + date.getDate();
    } else {
      da = date.getDate();
    }
    if ((date.getHours()) < 10) {
      hour = "0" + date.getHours();
    } else {
      hour = date.getHours();
    }
    if ((date.getMinutes()) < 10) {
      minutes = "0" + date.getMinutes();
    } else {
      minutes = date.getMinutes();
    }
    if ((date.getSeconds()) < 10) {
      second = "0" + date.getSeconds();
    } else {
      second = date.getSeconds();
    }
    return date.getFullYear() + '-' + month + '-' + da + ' ' + hour + ':' + minutes + ':' + second;
  } else {
    return '';
  }
};


/* 深度拷贝函数
 */
utils.deepCopy = function(data) {
  let t = this.typeMethod(data),
    o, i, ni;
  // console.log('t',t)
  if (t === 'array') {
    o = [];
  } else if (t === 'object') {
    o = {};
  } else {
    return data;
  }
  if (t === 'array') {
    for (i = 0, ni = data.length; i < ni; i++) {
      o.push(this.deepCopy(data[i]));
    }
    return o;
  } else if (t === 'object') {
    for (i in data) {
      o[i] = this.deepCopy(data[i]);
    }
    return o;
  }
}



/* element组件封装
 */
//message
utils.messInfo = function(mes, vm, opts) {
  utils.message({
    type: "info",
    message: mes,
    ...opts
  }, vm)
}
utils.messSuccess = function(mes, vm, opts) {
  utils.message({
    type: "success",
    message: mes,
    ...opts
  }, vm)
}
utils.messWarn = function(mes, vm, opts) {
  utils.message({
    type: "warning",
    message: mes,
    ...opts
  }, vm)
}
utils.messError = function(mes, vm, opts) {
  utils.message({
    type: "error",
    message: mes,
    ...opts
  }, vm)
}
utils.message = function(opts, vm) {
  vm.$message({
    type: opts.type,
    duration: opts.duration ? opts.duration : 3000,
    showClose: opts.showClose ? opts.showClose : false,
    center: opts.center ? opts.center : false,
    offset: opts.offset ? opts.offset : 20,
    message: opts.message
  });
}

/* 请求json => form格式数据
 */
utils.jsonToQueryString = function(json) {
  console.log('json', json)
  return Object.keys(json).map(function(key) {
    return encodeURIComponent(key) + '=' +
      encodeURIComponent(json[key]);
  }).join('&');
};
utils.jsonChange = function(opts) {
  if (typeof opts != "string") return;
  let obj = JSON.parse(opts);
  for (let key in obj) {

  }
}
/* 请求form => json格式数据
 */
utils.queryStringToJson = function(str) {
  let obj = {};
  let pairs = str.split('&');
  let d = decodeURIComponent;
  let name, value;
  $.each(pairs, function(i, pair) {
    pair = pair.split('=');
    name = d(pair[0]);
    value = d(pair[1]);
    obj[name] = value;
  });
  return obj;
}

/* 校验数组是否包含某个元素
  @params
    aa: Array
    bb: String
 */
utils.isContainedOne = function(aa, bb) {
  let flag = false
  for (let i = 0; i < aa.length; i++) {
    if (bb === aa[i]) {
      flag = true;
    }
  }
  if (!flag) {
    return flag
  }
  return true
}
/* 判断一个数组是否包含另一个数组
  @prams:
    aa: [1,2,3]
    bb: 被包含数组 [1,2]
 */
utils.isContained = function(aa, bb) {
  if (!(aa instanceof Array) || !(bb instanceof Array) || ((aa.length < bb.length))) {
    return false;
  }
  for (let i = 0; i < bb.length; i++) {
    let flag = false;
    for (let j = 0; j < aa.length; j++) {
      if (aa[j] == bb[i]) {
        flag = true;
        break;
      }
    }
    if (flag == false) {
      return flag;
    }
  }
  return true;
}
// /*针对XSS的转义
//  */
// utils.HTMLEncode = function(str) {
//   return (
//   if(typeof str = "object"){
//     for(let key in object){
//       return utils.HTMLEncode(object[key])
//     }
//   }else if(typeof str = "string"){
//     return str.replace(/&/g, "&amp;")
//       .replace(/</g, "&lt;")
//       .replace(/>/g, "&gt;")
//       .replace(/"/g, "&quot;")
//       .replace(/'/g, "&#x27;")
//       .replace(/\//g, "&#x2F;")
//       .replace(/ /g, "&nbsp;");
//   })
// }
// //反转义
// utils.HTMLDecode = function(str) {
//   return str.replace(/&amp;/g, "&")
//     .replace(/&lt;/g, "<")
//     .replace(/&gt;/g, ">")
//     .replace(/&quot;/g, "\"")
//     .replace(/&#x27;/g, "\'")
//     .replace(/&#x2F;/g, "/")
//     .replace(/&nbsp;/g, " ");
// }

export default utils;
