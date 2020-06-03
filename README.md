# wzp-element-self


## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run all tests
npm test
```
## 说明
项目是Vue+element-ui为主开发,参考了Vue-element-admin布局。图表基于echarts。今后还会更新更多的应用页面，欢迎大家提出意见建议,我会及时修改让这个项目日趋健壮
## 目录结构
<font color=#FFA500>assets</font> : iconfont, 各种less, 项目总less样式<br/>
<font color=#FFA500>components</font> : 各种组件<br/>
<font color=#FFA500>element</font> ： element-ui组件的按需加载<br/>
<font color=#FFA500>layout</font> ：主页面的布局<br/>
<font color=#FFA500>mock</font> ：模拟请求数据<br/>
<font color=#FFA500>router</font> ：总路由,路由守卫<br/>
<font color=#FFA500>store</font> ：vuex<br/>
<font color=#FFA500>views</font> ：主要页面

## 关于页面

### 1. 表格
```
表格在组件上设定了height,可以根据页面自适应,并让横向滚动条始终显示在可见区域
```
### 2. 权限管理
```
目前是前台封装了权限数据,数据在my.js中
```
### 3. 路由切换
```
路由切换使用了transform动画,普通和步骤表单是在同一页面进行切换，所以没有动画显示
```
