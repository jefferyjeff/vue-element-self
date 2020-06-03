/* 封装的echarts api,未完成,项目暂无使用
 */
let echart = {};

echart.title = function(opts) {
  return {
    text: opts.text,
    textStyle: {
      color: opts.tsColor || "#333",
      fontWeight: opts.tsFontWeight || "normal",
      fontStyle: opts.tsFontStyle || "normal",
      fontSize: opts.tsFontSize || 18,
      align: opts.tsAlign || "center",
      verticalAlign: opts.tsVerticalAlign || ""
    }
  }
}
echart.legend = function(opts) {
  return {

  }
}
echart.grid = function(opts) {
  if(!opts) opts= {};
  return {
    show: opts.show || false,//是否显示坐标网格
    zlevel: opts.zlevel || 0,//相当于z-index,会创建层级,内存消耗大
    z: opts.z || 2,//控制图形前后顺序,相当于zlevel,但不会创建层级
    left: opts.left || "10%",
    top: opts.top || 60,
    right: opts.right || "10%",
    bottom: opts.bottom || 60,
    width: opts.width || "auto",
    height: opts.height || "auto",
    containLabel: opts.containLabel || true,//区域是否包含坐标轴的刻度标签
    backgroundColor: opts.backgroundColor || "transparent",//网格背景,前提先show为true
    borderColor: opts.backgroundColor || "#ccc",//show为true
    borderWidth: opts.borderWidth || 1,//show为true
    shadowBlur: opts.shadowBlur || 10,//number,图形阴影的模糊大小,配合shadowColor且show为true
    shadowColor: opts.shadowColor || 'rgba(0, 0, 0, 0.5)',//阴影颜色, show为true
    shadowOffsetX: opts.shadowOffsetX || 0,//阴影水平方向上的偏移距离
    shadowOffsetY: opts.shadowOffsetY || 0//阴影垂直方向上的偏移距离
  }
}
/* 直角坐标系 grid 中的 x 轴
  1. type: value: 数值轴，适用于连续数据.
      category:适用于离散的类目数据，为该类型时必须通过 data 设置类目数据
      time: 时间轴，适用于连续的时序数据，与数值轴相比时间轴带有时间的格式化，在刻度计算上也有所不同，例如会根据跨度的范围来决定使用月，星期，日还是小时范围的刻度。
      log: 对数轴。适用于对数数据。
  2. 类目轴中 boundaryGap 可以配置为 true 和 false。默认为 true，这时候刻度只是作为分隔线，标签和数据点都会在两个刻度之间的带(band)中间。
      非类目轴，包括时间，数值，对数轴，boundaryGap是一个两个值的数组，分别表示数据最小值和最大值的延伸范围，可以直接设置数值或者相对的百分比，在设置 min 和 max 后无效
  3. min: number, string, function
      min: function(value) {
          return value.min - 20;
      }
  4. interval: 具体参考https://www.w3cschool.cn/echarts_tutorial/echarts_tutorial-xn9c2cm9.html,没有放在里面
  5. axisLine中的lineStyle默认值就以 axisLine.xxx为主
 */
echart.xAxis = function(opts) {
  if(!opts) opts= {};
  return {
    show: opts.show || true,//是否显示 x 轴
    gridIndex: opts.gridIndex || 0,//x 轴所在的 grid 的索引，默认位于第一个 grid  &不懂&
    position: opts.position || "bottom",//x 轴的位置 top, bottom
    offset: opts.offset || 0,//X 轴相对于默认位置的偏移，在相同的 position 上有多个 X 轴的时候有用。
    type: opts.type || "category",
    name: opts.name || "ddd",//x轴名称
    nameLocation: opts.nameLocation || "end",//name显示位置. start, middle, end
    nameTextStyle: echart.textStyle(opts.nameTextStyle),
    nameGap: opts.nameGap || 15,//坐标轴名称与轴线之间的距离
    nameRotate: opts.nameRotate || null,//坐标轴名字旋转，角度值。
    inverse : opts.inverse || false,//是否是反向坐标轴
    boundaryGap: opts.boundaryGap || [false,false],//坐标轴两边留白策略，类目轴和非类目轴的设置和表现不一样。
    min: opts.min || null,//坐标轴刻度最小值 number, string, function
    max: opts.max || null,//坐标轴刻度最大值
    scale: opts.scale || false,//只在数值轴中（type: 'value'）有效.在设置 min 和 max 之后该配置项无效
    splitNumber: opts.splitNumber || 5,//坐标轴的分割段数，需要注意的是这个分割段数只是个预估值，最后实际显示的段数会在这个基础上根据分割后坐标轴刻度显示的易读程度作调
    minInterval: opts.minInterval || 0,//自动计算的坐标轴最小间隔大小
    maxInterval: opts.maxInterval || 0,//自动计算的坐标轴最大间隔大小.在时间轴（（type: 'time'））可以设置成 3600 * 24 * 1000 保证坐标轴分割刻度最大为一天
    logBase: opts.logBase || 10,//对数轴的底数，只在对数轴中（type: 'log'）有效
    silent: opts.silent || false,//坐标轴是否是静态无法交互
    triggerEvent: opts.triggerEvent || false,//坐标轴的标签是否响应和触发鼠标事件，默认不响应
    axisLine: echart.axisLine(opts.axisLine),//设置x坐标轴轴线
    axisTick: echart.axisTick(opts.axisTick),//坐标轴刻度设置
    axisLabel: echart.axisLabel(opts.axisLabel),//坐标轴刻度标签的相关设置
  }
}
echart.yAxis = function(opts) {
  return {

  }
}
echart.series = function(opts) {
  return {

  }
}

//********************************* 自定义封装eecharts ********************************************************

/* 封装样式
  backgroundColor: { //当使用图片的时候，可以使用 width 或 height 指定高宽，也可以不指定自适应。
      image: 'xxx/xxx.png'
      // 这里可以是图片的 URL，
      // 或者图片的 dataURI，
      // 或者 HTMLImageElement 对象，
      // 或者 HTMLCanvasElement 对象。
  }
*/
echart.textStyle = function(opts) {
  if(!opts) opts= {};
  return {
    color: opts.color || "",//name颜色
    fontStyle: opts.fontStyle || "normal",//文字字体的风格
    fontWeight: opts.fontWeight || "normal ",//文字粗细
    fontFamily: opts.fontFamily || "sans-serif",//文字的字体系列
    fontSize: opts.fontSize || 12,
    align: opts.align || "auto",//文字水平对齐方式,left,center,right
    verticalAlign: opts.verticalAlign || "auto",//文字垂直对齐方式.top,middle,bottom
    lineHeight: opts.lineHeight || "",//number
    backgroundColor: opts.backgroundColor || "transparent",//文字块背景色, object,string
    borderColor: opts.borderColor || "transparent",//文字块边框颜色
    borderWidth: opts.borderWidth || 0,//文字块边框宽度
    borderRadius: opts.borderRadius || 0,//文字块的圆角
    padding: opts.padding || 0,//文字块的内边距,同css的padding :number, Array
    shadowColor: opts.shadowColor || "transparent",//文字块的背景阴影颜色
    shadowBlur: opts.shadowBlur || 0,//文字块的背景阴影长度
    shadowOffsetX: opts.shadowOffsetX || 0,//文字块的背景阴影 X 偏移
    shadowOffsetY: opts.shadowOffsetY || 0,//文字块的背景阴影 Y 偏移
    width: opts.width || "",//文字块的宽度 backgroundColor为inage时指定用.不包含 padding
    height: opts.height || "",//文字块的高度
    textBorderColor: opts.textBorderColor || "transparent",//文字本身的描边颜色
    textBorderWidth: opts.textBorderWidth || 0,//文字本身的描边宽度
    textShadowColor: opts.textShadowColor || "transparent",//文字本身的阴影颜色
    textShadowBlur: opts.textShadowBlur || 0,//文字本身的阴影长度
    textShadowOffsetX: opts.textShadowOffsetX || 0,//文字本身的阴影 X 偏移
    textShadowOffsetY: opts.textShadowOffsetY || 0,//文字本身的阴影 Y 偏移
  }
}
/* 坐标轴线样式
 */
echart.axisLine = function(opts){
  if(!opts) opts= {};
  return {
    show: opts.show || true,//是否显示坐标轴轴线
    onZero: opts.onZero || true,// 轴或者 Y 轴的轴线是否在另一个轴的 0 刻度上，只有在另一个轴为数值轴且包含 0 刻度时有效。
    onZeroAxisIndex: opts.onZeroAxisIndex || 0,//当有双轴时，可以用这个属性手动指定，在哪个轴的 0 刻度上。
    lineStyle: echart.lineStyle(opts.lineStyle)
  }
}
/* 坐标轴刻度设置
 */
echart.axisTick = function(opts){
  if(!opts) opts= {};
  return {
    show: opts.show || true,//是否显示坐标轴刻度
    alignWithLabel: opts.alignWithLabel || false ,//就是让坐标刻度在柱子之间对称.类目轴中在 boundaryGap 为 true 的时候有效，可以保证刻度线和标签对齐。
    interval: opts.interval || "auto",//number, Function,坐标轴刻度的显示间隔，在类目轴中有效。默认同 axisLabel.interval 一样,(index:number, value: string) => boolean
    inside: opts.inside || false,//坐标轴刻度是否朝内，默认朝外。
    length: opts.length || 5,//坐标轴刻度的长度
    lineStyle: echart.lineStyle(opts.lineStyle)
  }
}
/* 坐标轴刻度标签的相关设置
1)interval: 0:强制显示所有标签
            1，表示『隔一个标签显示一个标签』，如果值为 2，表示隔两个标签显示一个标签，以此类推
            function: (index:number, value: string) => boolean    ,第一个参数是类目的 index，第二个值是类目名称，如果跳过则返回 false。
2)formatter: https://www.w3cschool.cn/echarts_tutorial/echarts_tutorial-3imb2cpz.html
3)color: (val: string) => Color
          
 */
echart.axisLabel = function(opts){
  if(!opts) opts= {};
  return {
    show: opts.show || true,//是否显示刻度标签
    interval: opts.interval || "auto",//坐标轴刻度标签的显示间隔，在类目轴中有效。
    inside: opts.inside || false,//刻度标签是否朝内，默认朝外。
    rotate: opts.rotate || 0,//刻度标签旋转的角度，在类目轴的类目标签显示不下的时候可以通过旋转防止标签之间重叠,旋转的角度从 -90 度到 90 度。
    margin: opts.margin || 8,//刻度标签与轴线之间的距离
    formatter: opts.formatter || null,//刻度标签的内容格式器，支持字符串模板和回调函数两种形式。
    showMinLabel: opts.showMinLabel || null,//是否显示最小 tick 的 label。可取值 true, false, null。默认自动判定（即如果标签重叠，不会显示最小 tick 的 label）。
    showMaxLabel: opts.showMaxLabel || null,//是否显示最大 tick 的 label。可取值 true, false, null。默认自动判定（即如果标签重叠，不会显示最大 tick 的 label）。
    ...echart.textStyle(opts)
    // color: opts.color || "",//刻度标签文字的颜色，默认取 axisLine.lineStyle.color。支持回调函数
    // fontStyle: opts.fontStyle || "normal",//'normal','italic','oblique'
    // fontWeight: opts.fontWeight || "normal ",//'normal','bold','bolder','lighter',100 | 200 | 300 | 400...
    // fontFamily: opts.fontFamily || "sans-serif",//
    // fontSize: opts.fontSize || 12,
    // align: opts.align || "auto",//'left','center','right'
  }
}
/* 封装坐标轴的lineStyle
 */
echart.lineStyle = function(opts){
  if(!opts) opts= {};
  return {//x坐标轴轴线的样式
      color: opts.color || "#333",
      width: opts.width || 1,//坐标轴线线宽
      type: opts.type || "solid",//坐标轴线线的类型. solid, dashed, dotted
      shadowBlur: opts.shadowBlur || 0,//图形阴影的模糊大小,该属性配合 shadowColor,shadowOffsetX, shadowOffsetY 一起设置图形的阴影效果
      shadowColor: opts.shadowColor || "#333",//阴影颜色
      shadowOffsetX: opts.shadowOffsetX || 0,//阴影水平方向上的偏移距离。
      shadowOffsetY: opts.shadowOffsetY || 0,//阴影垂直方向上的偏移距离。
      opacity: opts.opacity || 1//图形透明度
    }
}




export default echart;
