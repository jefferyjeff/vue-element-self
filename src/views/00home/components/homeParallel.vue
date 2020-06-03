<style lang="less">

</style>
<template>
  <div class='home-parallel common-home-margintop boxShadow1' style="background: #fff;">
    <echarts ref="echartsRef" width="100%" height="100%" id="homeParallel" :options="options"></echarts>
  </div>
</template>

<script>
  import my from '@/assets/js/my';
  import utils from '@/assets/js/utils';
  import echarts from "@/components/echarts/echarts";
  import myEcharts from 'echarts';
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
      echartResize() {
        this.$refs.echartsRef.echartResize();
      },
      init() {
        this.options = {
          backgroundColor: '',
          title: {
            backgroundColor: "red",
            text: "测试列表",
            textStyle: {
              color: "#409EFF",
              fontStyle: "normal",
              align: "right",
              verticalAlign: "bottom",
              width: "100",
              height: "100"
            }
          },
          legend: {
            top: 20,
            icon: 'rect',
            itemWidth: 14,
            itemHeight: 5,
            itemGap: 13,
            data: ['产量', '销量'],
            right: '4%',
            textStyle: {
              fontSize: 12,
              color: '#67C23A'
            }
          },
          tooltip: {
            trigger: "axis",
            confine: false,
            formatter: function(params, ticket, callback) {
              let str = params[0].name + "<br/>";
              for(let i=0;i<params.length;i++){
                str += params[i].seriesName + " : "+ params[i].data;
                if(i!=(params.length-1)){
                  str+= "<br/>"
                }
              }
              return str
            },
            axisPointer: {
              type: 'cross',
              label: 'test1'
            }
          },
          grid: { 
            top: 70,
            left: '2%',
            right: '2%',
            bottom: '2%',
            containLabel: true,
          },
          xAxis: [{
            type: 'category',
            boundaryGap: false,
            axisLine: {
              lineStyle: {
                color: '#57617B'
              }
            },
            data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
          }],
          yAxis: [{
            type: 'value',
            name: '(万)',
            axisTick: {
              show: false
            },
            axisLine: {
              lineStyle: {
                color: '#57617B'
              }
            },
            axisLabel: {
              margin: 10,
              textStyle: {
                fontSize: 14
              }
            },
            splitLine: {
              lineStyle: {
                color: '#D6D6D6'
              }
            }
          }],
          series: [
            {
              name: '产量',
              type: 'line',
              stack: '总量',
              smooth: true,
              itemStyle: {
                normal: {
                  areaStyle: {
                    type: 'default',
                    color: new myEcharts.graphic.LinearGradient(0, 0, 0, 1, //变化度
                      [{
                        offset: 0,
                        color: '#3ebf9b'
                      }, {
                        offset: 0.5,
                        color: '#267268'
                      }, {
                        offset: 1,
                        color: '#14323f'
                      }]),
                  },
                  lineStyle: { 
                    color: '#349e85'
                  }
                },
              },
              areaStyle: {},
              data: [220, 182, 191, 134, 150, 120, 110, 125, 145, 164, 180, 175]
            },
            {
              name: '销量',
              type: 'line',
              areaStyle: {
                normal: {
                  color: new myEcharts.graphic.LinearGradient(
                    0, 0, 0, 1,
                    [{
                        offset: 0,
                        color: 'rgba(12,180,250, 1)'
                      },
                      {
                        offset: 1,
                        color: 'rgba(63, 208, 249, 0)'
                      }
                    ]
                  )
                }
              },
              data: [120, 212, 221, 164, 180, 150, 170, 175, 285, 204, 220, 215],
            }
          ]
        };
        this.$refs.echartsRef.initEchart(this.options)
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
