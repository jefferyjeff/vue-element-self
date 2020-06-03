<style lang="less">

</style>
<template>
  <div class='home-content-echart boxShadow1'>
    <echarts ref="echartsRef" width="100%" height="100%" :options="options" id="homePie" class="homePie"></echarts>
  </div>
</template>

<script>
  import my from '@/assets/js/my';
  import utils from '@/assets/js/utils';
  import echarts from "@/components/echarts/echarts"
  export default {
    components: {
      echarts
    },
    data() {
      return {
        options: {}

      }
    },
    methods: {
      init() {
        this.options = {
          title: {
            text: '兴趣爱好',
            top: 0,
            textStyle: {
              color: '#ccc',
              align: "left"
            }
          },
          legend: {
            left: 'center',
            bottom: '10',
            data: ['计算机', '电影', '游戏', '旅游', '其他']//++
          },
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)'
          },
          series: [{
            name: '我的兴趣',
            type: 'pie',
            radius: '55%',
            center: ['50%', '50%'],
            data: [{//++
                value: 25,
                name: '计算机',
              },
              {
                value: 20,
                name: '电影',
              },
              {
                value: 15,
                name: '游戏',
              },
              {
                value: 23,
                name: '旅游',
              },
              {
                value: 17,
                name: '其他',
              }
            ].sort(function(a, b) {
              return a.value - b.value;
            }),
            roseType: 'radius',
            label: {
              formatter: '{b}: {d}'
            },
            animationType: 'scale',
            animationEasing: 'elasticOut',
            animationDelay: function(idx) {
              return Math.random() * 200;
            }
          }]
        };
        this.$refs.echartsRef.initEchart(this.options)
      },
      /* echarts resize
       */
      echartResize() {
        this.$refs.echartsRef.echartResize();
      }
    },
    mounted() {
      this.init();
    },
    computed: {

    },
    watch: {
      //可以监听路由信息
      $route(to, from, next) {

      }
    },
    created() {

    },
  }
</script>
