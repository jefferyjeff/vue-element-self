let my = {};

my.c = function(val, text){
  console.log(text?text: "", val)
}

/* 工作台的项目状态
 */
my.eventStatus= [
  {label: "项目设计", value: 0, color: "#DEB887"},
  {label: "demo制作", value: 1, color: "	#9932CC"},
  {label: "开发进行中", value: 2, color: "#409EFF"},
  {label: "测试阶段", value: 3, color: "#E6A23C"},
  {label: "bug处理阶段", value: 4, color: "#F56C6C"},
  {label: "上线", value: 5, color: "#67C23A"},
  {label: "已关闭", value: 6, color: "#909399"},
]

my.smallweb = 'smallweb';
my.mobile = 'mobile';
my.web = 'web';

my.dateLabel = ["年", "月", "日", "时", "分", "秒"]


my.eventData = [
  {
    id: 0,
    title: "Vue",
    url: "/static/imgs/vuejs.jpg",
    content: "是一套用于构建用户界面的渐进式框架"
  },
  {
    id: 1,
    title: "React",
    url: "/static/imgs/react.jpg",
    content: "是一个用于构建用户界面的 JavaScript 库"
  },
  {
    id: 2,
    title: "Node",
    url: "/static/imgs/node.jpg",
    content: "是一个基于 Chrome V8 引擎 的JavaScript 运行时"
  },
  {
    id: 3,
    title: "Ant Design",
    url: "/static/imgs/antd.jpg",
    content: "是基于 Ant Design 设计体系的 React UI 组件库，主要用于研发企业级中后台产品"
  },
  {
    id: 4,
    title: "支付宝",
    url: "/static/imgs/zfb.jpg",
    content: "球领先的独立第三方支付平台"
  },
  {
    id: 5,
    title: "Bootstrap",
    url: "/static/imgs/bs.jpg",
    content: "是Twitter推出的一个用于前端开发的开源工具包"
  }
]
/* 权限
 */
my.roleList = [
  {id: 0, name: '管理', roles: [10,11,12,13,20,21,22,23,30,31,32,33,40,41,42,43]},
  {id: 1, name: '二级管理', roles: [10,11,12,20,21,22,30,31,32,40,41,42]},
  {id: 2, name: '操作员', roles: [10,11,20,21,30,31,40,41]}
]
my.roleArr = [
  {
    id: 1,
    name: '权限页面1',
    auths: [
      {id: 10, name: '浏览'},
      {id: 11, name: '新增'},
      {id: 12, name: '编辑'},
      {id: 13, name: '删除'}
    ]
  },{
    id: 2,
    name: '权限页面2',
    auths: [
      {id: 20, name: '浏览'},
      {id: 21, name: '新增'},
      {id: 22, name: '编辑'},
      {id: 23, name: '删除'}
    ]
  },
  {
    id: 3,
    name: '权限页面3',
    auths: [
      {id: 30, name: '浏览'},
      {id: 31, name: '新增'},
      {id: 32, name: '编辑'},
      {id: 33, name: '删除'}
    ]
  }, {
    id: 4,
    name: '权限页面4',
    auths: [
      {id: 40, name: '浏览'},
      {id: 41, name: '新增'},
      {id: 42, name: '编辑'},
      {id: 43, name: '删除'}
    ]
  }
]


my.area = [
  {label: "黄浦区", value: "0"},
  {label: "徐汇区", value: "1"},
  {label: "长宁区", value: "2"},
  {label: "静安区", value: "3"},
  {label: "普陀区", value: "4"},
  {label: "虹口区", value: "5"},
  {label: "杨浦区", value: "6"},
  {label: "闵行区", value: "7"},
  {label: "宝山区", value: "8"},
  {label: "浦东新区", value: "9"},
  {label: "金山区", value: "10"},
  {label: "松江区", value: "11"},
  {label: "青浦区", value: "12"},
  {label: "奉贤区", value: "13"},
  {label: "嘉定区", value: "14"},
  {label: "崇明区", value: "15"}
]

/* 可选列表格columns
 */
my.chooseColumns = [
  {
    key: 0,
    prop: "name",
    label: "姓名",
    minWidth: 150,
  },{
    key: 1,
    prop: "age",
    label: "年龄",
    minWidth: 80,
  },{
    key: 2,
    prop: "address",
    label: "住址",
    minWidth: 200,
  },{
    key: 3,
    prop: "dept",
    label: "部门",
    minWidth: 150,
  },{
    key: 4,
    prop: "position",
    label: "职位",
    minWidth: 150,
  },{
    key: 5,
    prop: "mobile",
    label: "手机",
    minWidth: 180,
  },{
    key: 6,
    prop: "email",
    label: "邮箱",
    minWidth: 180,
  },{
    key: 7,
    prop: "wx",
    label: "微信",
    minWidth: 180,
  },{
    key: 8,
    prop: "beginDate",
    label: "开始时间",
    minWidth: 200,
  },{
    key: 9,
    prop: "endDate",
    label: "结束时间",
    minWidth: 200,
  },{
    key: 10,
    prop: "remark",
    label: "备注",
    minWidth: 150,
  },
]
export default my;
