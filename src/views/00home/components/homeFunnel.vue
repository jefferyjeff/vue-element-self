<style lang="less">

</style>
<template>
  <div class='home-content-echart boxShadow1'>
    <echarts ref="echartsRef" width="100%" height="100%" :options="options" id="homeFunnel" class="homeFunnel"></echarts>
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
            text: '漏斗图',
          },
          tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c}%"
          },
          series: [{
            name: '漏斗图',
            type: 'funnel',
            left: '10%',
            top: 60,
            bottom: 60,
            width: '80%',
            min: 0,
            max: 100,
            minSize: '0%',
            maxSize: '100%',
            sort: 'descending',
            gap: 2,
            label: {
              show: true,
              position: 'inside'
            },
            labelLine: {
              length: 10,
              lineStyle: {
                width: 1,
                type: 'solid'
              }
            },
            itemStyle: {
              borderColor: '#fff',
              borderWidth: 1
            },
            emphasis: {
              label: {
                fontSize: 20
              }
            },
            data: [{
                value: 60,
                name: '访问'
              },
              {
                value: 60,
                name: '咨询'
              },
              {
                value: 20,
                name: '订单'
              },
              {
                value: 60,
                name: '点击'
              },
              {
                value: 100,
                name: '展现'
              }
            ]
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
      $route(to, from, next) {

      }
    },
    created() {

    },
  }
</script>
