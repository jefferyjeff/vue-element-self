<style lang="less">
	@import '~@/assets/less/common.less';
	@import "~@/views/login/login.less";
</style>

<template>
	<el-container class="login common">
		<el-card class="login-card">
			<div slot="header" class="clearfix"><span>欢迎登录</span></div>
			<login-template></login-template>
		</el-card>
	</el-container>
</template>

<script>
	import my from '@/assets/js/my';
	import utils from '@/assets/js/utils';
	import loginTemplate from "@/components/login/loginTemplate"
	export default {
		components: {
			"login-template": loginTemplate
		},
		data() {
			return {
				logintab: "first"
			}
		},
		methods: {
			init() {

			},
			handleClick() {

			},
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
