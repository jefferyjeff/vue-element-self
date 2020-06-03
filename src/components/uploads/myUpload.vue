<style lang="less">
	.myUpload{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  &-before, &-after{
    width: 47%;
    &-header{
      border-bottom: 1px solid #E6E6E6;
    }
  }
  .each{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    &-name{
        white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
          word-break: break-all;
    }
    i{
      color: #ed4014;
      font-size: 23px;
      margin-right: 10px;
      cursor: pointer;
    }
    &:hover{
      background-color: #F9F9F9;
    }
  }
  &-middle{
    overflow-y: auto;
    overflow-x: hidden;
  }
}
</style>
<style scoped>
	.myUpload /deep/ .el-card__body{
    padding: 10px;
  }
</style>
<template>
	<div class="myUpload">
		<el-card class="myUpload-before">
			<el-row :gutter="10" class="myUpload-before-header">
				<el-col :span="5">待传</el-col>
				<el-col :span="10">
					<el-upload action="//" :before-upload="handleUpload" multiple>
						<el-button icon="ios-cloud-upload-outline" size="mini">加载</el-button>
					</el-upload>
				</el-col>
				<el-col :span="6">
					<el-button type="primary" class="upload-button" size="mini" @click="uploadFileMethod" :disabled='uploadFile.length===0'
					 :loading="uplodLoading">上传</el-button>
				</el-col>
			</el-row>
			<div class="myUpload-middle" :style="{height: cardHeight + 'px'}">
				<div v-for="(file, index) in uploadFile" :key="index" class="each">
					<el-col :span="20" class="each-name">{{file.name}}</el-col>
					<el-col :span="4">
						<i class='iconfont icon-close' @click="deleteUploadMethod(index, 0)" />
					</el-col>

				</div>
			</div>
		</el-card>
		<el-card class="myUpload-after">
			<div class="myUpload-before-header">已传列表</div>

			<div class="card-middle" :style="{height: cardHeight + 'px'}">
				<div v-for="(file, index) in loadedFile" :key="index" class="each">
					<el-col :span="20" class="each-name">{{file.name}}</el-col>
					<el-col :span="4">
						<el-popover ref="pop" v-model="visible[index]" placement="top" width="160">
							<p>确定删除吗？</p>
							<div style="text-align: right; margin: 0">
								<el-button size="mini" type="text" @click="close(index)">取消</el-button>
								<el-button type="primary" size="mini" @click="deleteUploadMethod(index, 1)">确定</el-button>
							</div>
							<i slot="reference" class='iconfont icon-close' @click="visible[index] = true" />
						</el-popover>

					</el-col>

				</div>
			</div>
		</el-card>

	</div>
</template>

<script>
	import my from '@/assets/js/my';
	import utils from '@/assets/js/utils';
	import myUpload from './myUpload';
	export default {
		props: {
			cardHeight: {
				type: Number,
				default: 250
			}
		},
		components: {

		},
		data() {
			return {
				fileDisabled: false,
				uploadFile: [], //待传文件
				loadedFile: [], //已传文件
				fileError: false, //记录上传错误
				fileErrorWord: '', //记录上传前错误文字
				uplodLoading: false, //上传按钮loading
				visible: []
			}
		},
		methods: {
			init() {

			},
			handleUpload(file) {
				if (file.size >= my.fileLimit) { //单个文件大于100M就不push进数组
					this.fileError = true;
					this.fileErrorWord = "所选文件中单个文件大于100M。已移出待传列表, 请重新选择";
					return false
				}
				this.fileError = false;
				this.uploadFile.push(file);
				return false;
			},
			uploadFileMethod() {
				let that = this;
				this.uplodLoading = true;
				setTimeout(() => {
					this.uplodLoading = false;
					utils.messSuccess("已上传", this);
					this.loadedFile = this.uploadFile;
					this.uploadFile = []
				}, 2000)

				return;
				// //以下是正式时的请求
				// let formData = new FormData();
				// for(let i=0;i<that.uploadFile.length;i++){
				//   formData.append("files",that.uploadFile[i]);
				// }
				// utils.messageInfo(that,'开始上传...', 0.5)
				// myUpload.uploading({
				//   data: formData,
				//   success: (res)=> {
				//     utils.messageSuccess(that)
				//     my.c('工作记录上传记录', res);
				//     return
				//     let failedUploadFileNames = res.data.failedUploadFileNames;
				//     if(failedUploadFileNames.length!=0){
				//       that.fileError = true;
				//       //文件上传错误
				//       let str = "文件";
				//       for(let i=0; i<failedUploadFileNames.length; i++) {
				//         if(i<failedUploadFileNames.length-1){
				//           str += '"' +failedUploadFileNames[i] + '",'
				//         }else{
				//           str += '"' +failedUploadFileNames[i] + '"上传错误，请重新上传'
				//         }
				//       }
				//       that.fileErrorWord = str;
				//       that.closeAlertMethod();
				//     }
				//     let uploadedIds = res.data.uploadedIds;

				//     for(let i=0;i<uploadedIds.length;i++){

				//        that.loadedRecord.push(uploadedIds[i]);
				//     }
				//     //这里不能直接 === uploadedIds，否则edit传来保存的ids会被覆盖        
				//     //循环请求文件信息放入已传文件列表
				//     for(let i=0;i<uploadedIds.length;i++) {
				//       record.getAffixInfo({
				//         data: {id: uploadedIds[i]},
				//         success: function(res) {
				//            my.c("获取已上传文件", res);
				//            let result = res.data;
				//            let args = {
				//              id: result.id,
				//              fileName: result.fileName
				//            }
				//            that.loadedRecordFile.push(args)
				//         },
				//         error: function(e) {

				//         },
				//         finally: function(){

				//         }
				//       })
				//     }
				//     that.uploadRecord = [];//清空本组件待传列表
				//   },
				//   error: (e)=> {
				//     my.e('工作记录上传记录', e);
				//   },
				//   finally: ()=> {

				//   }
				// })
			},
			deleteUploadMethod(index, num) {
				if (num === 0) {
					//待传删除
					this.uploadFile.splice(index, 1);
				} else if (num === 1) {
					//已传删除
					this.loadedFile.splice(index, 1);
					this.visible[index] = false;
				}

			},
			close(index) {
				let arr = JSON.parse(JSON.stringify(this.visible));
				arr[index] = false;
				this.visible = arr

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
