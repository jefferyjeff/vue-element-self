import server from '@/assets/js/server';
import my from '@/assets/js/my';

const Mock = require('mockjs');
const Random = Mock.Random;


const userWZP = function() {
  let data = {
    username: "WZP",//姓名
    dept: "软件部",//部门
    position: "前端工程师",//职位
    avatar: '/static/imgs/header.jpg',//头像
    events: []
  };
  for(let i=0;i< 15;i++){
    let events = {
      id: i,
      eventname: "项目" + i,
      beginDate: new Date().getTime() - Math.random().toFixed(2)*1000,
      status: Math.floor(Math.random()*6)
    }
    data.events.push(events);
  }
  return server.successData(20000, data, "操作成功", true)
}

const userLog = function() {
  let data = [];
  for(let i=0;i<21;i++){
    let args = {
      id: i,
      title: '日志标题'+ i,
      content: '日志内容' + i,
      date: new Date().getTime() + Math.random().toFixed(2)*1000
    }
    data.push(args)
  }
  return server.successData(20000, data, "操作成功", true)
}

const waterData = function() {
  let data = [];
  const imgArr = ['200', '220', '240', '280', '300', '400']
  Math.ceil(Math.random()*6);
  for(let i=0;i< 100;i++){
    let args = {
      id: i,
      url: "/static/test/test" + imgArr[Math.ceil(Math.random()*5)] + ".jpg",
      title: '瀑布流图片'+ i,
      content: 'hahahahahah'+ i
    }
    data.push(args);
  }
  return server.successData(20000, data, "操作成功", true)
}
const eventData = function() {
  return server.successData(20000, my.eventData, "操作成功", true)
}

const userList = function() {
  let data = [];
  const depart = ['软件部', '人力资源部', '销售部', '宣传部', '编辑部', '管理部']
  for(let i=0;i< 31;i++){
    let args = {
      id: i,
      username: 'www'+ i,
      dept: depart[Math.ceil(Math.random()*5)],
      age: 20 + i,
      mobile: '13111111111',
      email: 'xxxx@xxxx.com',
      beginDate: new Date().getTime() - Math.random().toFixed(2)*1000
    }
    data.push(args)
  }
  return server.successData(20000, data, "操作成功", true)
}

const roleList = function() {
  return server.successData(20000, my.roleList, "操作成功", true)
}
const roleArr = function() {
  return server.successData(20000, my.roleArr, "操作成功", true)
}

const chooseColumns = function() {
  return server.successData(20000, my.chooseColumns, "操作成功", true)
}
const chooseData = function() {
  let data = [];
  const depart = ['软件部', '人力资源部', '销售部', '宣传部', '编辑部', '管理部'];
  const position = ['软件开发', 'WEB开发', '移动端开发', 'Android开发', 'IOS开发', 'C#开发'];
  for(let i=0;i< 31;i++){
    let args = {
      id: i,
      name: 'www'+ i,
      age: 20 + i,
      address: "浦东新区",
      dept: depart[Math.ceil(Math.random()*5)],
      position: position[Math.ceil(Math.random()*5)],
      mobile: '13111111111',
      email: 'xxxx@xxxx.com',
      wx: 'xxxxxx'+ i,
      beginDate: new Date().getTime() - Math.random().toFixed(2)*1000,
      endDate: new Date().getTime() + Math.random().toFixed(2)*3000,
      remark: "数据"+ i
    }
    data.push(args)
  }
  return server.successData(20000, data, "操作成功", true)
}

Mock.mock('https://www.test.com/api/getUserInfo', userWZP);
Mock.mock('https://www.test.com/api/getUserLog', userLog);
Mock.mock('https://www.test.com/api/getWaterData', waterData);
Mock.mock('https://www.test.com/api/getEventInfo', eventData);
Mock.mock('https://www.test.com/api/getUserList', userList);//人员管理
//获得权限
Mock.mock('https://www.test.com/api/getRoleList', roleList);//权限名列表
Mock.mock('https://www.test.com/api/getRoleArr', roleArr);//基础权限列表
Mock.mock('https://www.test.com/api/getChooseColumns', chooseColumns);//选择列名
Mock.mock('https://www.test.com/api/getChooseData', chooseData);//选择列名页数据
