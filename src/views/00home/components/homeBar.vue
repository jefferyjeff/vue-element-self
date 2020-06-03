<style lang="less">

</style>
<template>
	<div class='home-bar boxShadow1' ref="homeBar">
		<echarts ref="echartsRef" :width="width" :height="height" id="homeBar" :options="options"></echarts>
	</div>
</template>

<script>
	import my from '@/assets/js/my';
	import utils from '@/assets/js/utils';
	import echart from '@/assets/js/echart';
	import echarts from "@/components/echarts/echarts"


	const animationDuration = 1000
	export default {
		components: {
			echarts
		},
		data() {
			return {
				options: {},
				width: "100%",
				height: "300px"

			}
		},
		methods: {
			init() {
				let title = echart.title({
					text: 'hahah',
				});
				let grid = echart.grid({
					show: true
				})
				let xAxis = echart.xAxis();
				this.options = {
					backgroundColor: "#fff",
					title: {
						text: "my",
						textStyle: {
							color: "#E6A23C"
						}
					},
					tooltip: {
						trigger: 'axis',
						axisPointer: {
							type: 'shadow'
						},
						formatter: (params, ticket, cb) => {
							return params[0].name + "<br/>" + params[0].marker + "   " + params[0].value
						}
					},
					grid: {
						left: 10,
						right: 10,
						bottom: 10,
						top: 50,
						containLabel: true
					},
					xAxis: {
						type: 'category',
						data: ['N', 'V', 'R', 'E', 'J', 'C', 'H'],
						axisTick: {
							alignWithLabel: true
						},
						axisLine: {
							lineStyle: {
								color: "#409EFF"
							}
						}
					},
					yAxis: [{
						type: 'value',
						axisTick: {
							show: false
						},
						axisLine: {
							lineStyle: {
								color: "#409EFF"
							}
						}
					}],
					series: [{
						name: 'pageA',
						type: 'bar',
						stack: 'vistors',
						barWidth: '60%',
						label: {
							normal: {
								show: true,
								position: "insideBottom",
								color: '#fff',
							}
						},
						data: [{
								value: 79,
								name: "N",
								itemStyle: {
									color: "#409EFF"
								}
							},
							{
								value: 52,
								name: "V",
								itemStyle: {
									color: "#E6A23C"
								}
							},
							{
								value: 20,
								name: "R",
								itemStyle: {
									color: "#F56C6C"
								}
							},
							{
								value: 34,
								name: "E",
								itemStyle: {
									color: "#67C23A"
								}
							},
							{
								value: 39,
								name: "VU",
								itemStyle: {
									color: "#909399"
								}
							},
							{
								value: 50,
								name: "VU",
								itemStyle: {
									color: "#909399"
								}
							},
							{
								value: 30,
								name: "VU",
								itemStyle: {
									color: "#909399"
								}
							},
						],
						animationDuration
					}, ]
				}
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
			let that = this;
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
