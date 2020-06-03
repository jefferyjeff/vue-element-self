<style lang="less">

</style>
<template>
  <div class='home-content-echart boxShadow1'>
    <echarts ref="echartsRef" width="100%" height="100%" :options="options" id="homeRadar" class="homeRadar"></echarts>
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
          backgroundColor: '#161627',
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)'
          },
          radar: {

            indicator: [{
                name: '体力',
                max: 100
              },
              {
                name: '耐力',
                max: 100
              },
              {
                name: '智力',
                max: 100
              },
              {
                name: '力量',
                max: 100
              },
              {
                name: '敏捷',
                max: 100
              },
              {
                name: '魔力',
                max: 100
              }
            ],
            shape: 'circle',
            splitNumber: 5,
            name: {
              textStyle: {
                color: 'rgb(238, 197, 102)'
              }
            },
            splitLine: {
              lineStyle: {
                color: [
                  'rgba(238, 197, 102, 0.1)', 'rgba(238, 197, 102, 0.2)',
                  'rgba(238, 197, 102, 0.4)', 'rgba(238, 197, 102, 0.6)',
                  'rgba(238, 197, 102, 0.8)', 'rgba(238, 197, 102, 1)'
                ].reverse()
              }
            },
            splitArea: {
              show: false
            },
            axisLine: {
              lineStyle: {
                color: 'rgba(238, 197, 102, 0.5)'
              }
            },

          },
          series: [{
              name: '北京',
              type: 'radar',
              lineStyle: {
                normal: {
                  width: 1,
                  opacity: 0.5
                },
              },
              data: [[90, 85, 90, 80, 70, 60]],
              symbol: 'none',
              itemStyle: {
                color: '#DAA520'
              },
              areaStyle: {
                normal: {
                  color: "#FFDEAD",
                  opacity: 0.3,
                }
              }
            },
          ]
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
