<style lang="less">
  @import "~@/assets/less/common.less";
 .waterfull{
    position: relative;
    width: 100%;
    overflow-y: auto;
    height: 100%;
    &-box{
      position: absolute;
      top: 100%;
      left: 100%;
      width: 0;
      height: 0;
      overflow:hidden;
      &-column{
        float: left
      }
    }
  }
</style>
<style scoped>

</style>
<template>
<div class="waterfull" ref="waterfull">
  <div class="waterfull-box">
    <slot></slot>
  </div>
</div>
</template>

<script>
  import my from '@/assets/js/my';
  import utils from '@/assets/js/utils';
  export default {
    props: {
      col: {//每行列数
        type: Number,
        default: 2
      },
      width: Number,//自定义宽度
      marginWidth: {//间隔
        type: Number,
        default: 10
      },
      data:{//数据
      	type:Array,
      	default:[]
      },
    },
    components: {

    },
    data() {
      return {
        root: null,//waterfull根节点
        columns: []
      }
    },
    methods: {
      init() {
        this.root = this.$refs.waterfull;
        let col = parseInt(this.col);//Number化col
        //遍历col新增div
        for(let i=0; i<col; i++){
          let cdiv = document.createElement('div');
          cdiv.className = "waterfull-box-column";//赋值class
          if(this.width){
            //若设定了width
            cdiv.style.width = this.width + "px";
            if(i != 0){
              //第一个不添加left
              cdiv.marginLeft = this.marginWidth + "px";
              console.log('cdiv',cdiv)
            }
          }else{
            if(i!=0){
              cdiv.style.marginLeft = this.marginWidth + "px";
            }
            cdiv.style.width = "calc("+(100/col + "%") + " - " + this.marginWidth + "px)";
          }
          this.root.appendChild(cdiv)
          this.columns.push(cdiv)
        }
        this.resize();
      },
      async resize(elements){
        let self = this;
        elements = this.$slots.default;
        //console.log("1")
        for(let i=0; i< elements.length; i++) {
          let imgs = elements[i].elm.getElementsByTagName('img');
          //console.log(imgs)
          let newImg = new Image();
          newImg.src = imgs[0].src;
         // console.log('imgs[0].src',newImg.src)
         // console.log("3", newImg.complete)
          //if (newImg.complete) {
            await self.append(elements[i].elm)
          //}
        }
      },
      /* 把waterfull-box下的slot对象加入到新建的div(waterfull-box-column)中
      */
      async append(dom) { //append dom element
       console.log("2")
        let self = this
        if (this.columns.length > 0) {
          let min = this.columns[0];//min先定义为第一列
          for (let i = 1; i < this.columns.length; i++) {//从第二列开始遍历
            //每次得到dom都会比较所有列中哪列高度最短,把dom添加进哪列
            //console.log('^^^^^^^^^^^^^^^^^^^^^')
            //console.log(self.getHeight(min), self.getHeight(self.columns[i]))
            //console.log('************************')
            if (await self.getHeight(min) > await self.getHeight(self.columns[i])) {
              min = self.columns[i]
            }
          }
          min && min.appendChild(dom);//
        }
      },
      async getHeight(dom) {
        return dom.offsetHeight
      },
    },
    mounted() {
      //this.init();

    },
    computed: {

    },
    watch: {
      //可以监听路由信息
      $route(to, from, next) {

      },
      data(newVal, oldVal) {
        console.log('new', newVal)
        console.log('old', oldVal)
        // this.$nextTick(()=> {
        //    this.resize()
        // })

      }
    },
    created() {

    },
  }
</script>
