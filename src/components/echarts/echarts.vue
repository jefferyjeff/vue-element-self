<template>
	<div :id="id" :class="className" :style="{height:height,width:'width'}" />
</template>

<script>
	import my from '@/assets/js/my';
	import utils from '@/assets/js/utils';
	require('echarts/theme/macarons'); //使用macarons主题
	import echarts from 'echarts';
	export default {
		props: {
			className: {
				type: String,
				default: 'chart'
			},
			id: {
				type: String,
				default: 'chart'
			},
			width: {
				type: String,
				default: '100%'
			},
			height: {
				type: String,
				default: '200px'
			},
			options: {
				type: Object,
				default: {}
			}
		},
		components: {

		},
		data() {
			return {
				chart: null //图表实例
			}
		},
		methods: {
			/* 初始化图表
			 */
			initEchart(options) {
				this.chart = echarts.init(document.getElementById(this.id), "macarons")
				this.chart.setOption(options);
			},
			echartResize() {
				this.chart.resize()
			}

		},
		mounted() {

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
