<style lang="less">
  @import '~@/assets/less/common.less';
  @import './wzpImgUpload.less';
</style>
<!--
@uploadSubmit : 文件单独上传
uploadButton(false): 单独上传按钮显示
fileDetail(true): 图片预览图标
fileDe(true): 图片删除图标
 -->
<template>
<div class='wzpUpload common'>
  <el-row>
    <el-form-item label="上传文件" prop="uploadList">
      <el-upload action="#" multiple
        style="float:left;margin-right:10px; width: 60px;height: 60px"
        :before-upload='beforeUpload'>
        <i slot="default" class="el-icon-plus"></i>
      </el-upload>
      <template v-show='form.uploadList'>
        <div class="wzpUpload-uploadList" v-for="(item, index) in form.uploadList" :key='index'>
          <img :src="item.url" alt="" style='width: 100%; height: 100%'>
          <div class="wzpUpload-uploadListCover" v-show='fileDetail || fileDel'>
            <el-icon class="el-icon-view" v-show='fileDetail' @click.native="handleView(item.url)"></el-icon>
            <el-icon class="el-icon-delete" v-show='fileDel' @click.native="handleRemove(item)"></el-icon>
          </div>
        </div>
      </template>
    </el-form-item>
  </el-row>
  <el-row v-show='uploadButton'><!-- class='common-search-row-marginTop' -->
    <el-form-item label="">
      <el-button @click='uploadSubmitMethod' icon='el-icon-upload2' size='small'>上传</el-button>
    </el-form-item>
  </el-row>


  <el-dialog :visible.sync="viewImg" width="600px" top='5vh'>
      <img style='width:100%;height: 500px' :src="imageUrl" alt="" />
  </el-dialog>

</div>
</template>

<script>
  import my from '@/assets/js/my'
  import utils from '@/assets/js/utils'

  export default {
    props: {
      form: {
      	type: Object
      },
      uploadButton: {
        type: Boolean,
        default() { return false}
      },
      fileDetail: {
        type: Boolean,
        default() { return true}
      },
      fileDel: {
        type: Boolean,
        default() { return true}
      },
    },
    components: {

    },
    data() {
      return {
        imageUrl: '',
        file: null,
        viewImg: false,//预览弹窗
      }
    },
    methods: {
      init() {


      },
      /* 单独上传
      */
      uploadSubmitMethod() {
        this.$emit('uploadSubmit')
      },
      /* 上传前，进行文件大小，类型判断，采用this.$message进行error提示
      */
      beforeUpload (file) {
        this.file = file
        let fileUrl = utils.getObjectURL(file);
        let str = {
          url: fileUrl,
          name: file.name,
          file: file
        }
        this.form.uploadList.push(str)
        return false
      },
      /* 预览
      */
      handleView (url) {
        this.viewImg = true
        this.imageUrl = url
      },
      /* 上传前删除
      */
      handleRemove(file) {
        let index = this.form.uploadList.findIndex(val => val.file.uid === file.file.uid)
        this.form.uploadList.splice(index, 1)
      },
    },
    mounted() {
      this.init()

    },
    computed: {

    },

    watch: {
      // 可以监听路由信息
      $route(to, from, next) {

      },
      uploadList (val) {
        this.$emit('uploadList', val)
      }

    },
    created() {

    }
  }
</script>
