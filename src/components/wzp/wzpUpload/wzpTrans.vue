<style lang="less">
  @import '~@/assets/less/common.less';
  @import './wzpTrans.less';
</style>
<!--
directUpload(false): 不单独上传文件
uploaded(method): 单独上传时,实时传递已传列表的文件arr
 -->
<template>
  <div class='wzpTrans common'>
    <el-form-item label="上传文件" prop="uploadFiles">
      <div class='wzpTrans-left'>
        <div class='wzpTrans-left-header'>
          <span class='wzpTrans-left-header-label'>待传</span>
          <el-button size='mini' style='float: right' v-show='form.uploadFiles.length&&directUpload' @click='handleSubmit'>上传</el-button>
          <el-upload action='#' multiple :before-upload='beforeUpload' style='float: right'>
            <el-button type='primary' size='mini'>选择</el-button>
          </el-upload>
        </div>
        <div class='wzpTrans-left-content'>
          <div class='wzpTrans-left-content-each' v-for='(item, index) in form.uploadFiles' :key='item.uid'>
            <div class='wzpTrans-left-content-each-word'>{{item.name}}</div>
            <div class='wzpTrans-left-content-each-icon' @click='handleDelete(item)'>
              <el-icon class='el-icon-close wzpTrans-left-content-each-icon-css'></el-icon>
            </div>
          </div>
        </div>
      </div>
      <div class='wzpTrans-right' v-show='directUpload'>
        <div class='wzpTrans-left-header'>
          <span class='wzpTrans-left-header-label'>已传</span>
        </div>
        <div class='wzpTrans-left-content'>
          <div class='wzpTrans-left-content-each' v-for='(item, index) in uploadedFiles' :key='item.uid'>
            <div class='wzpTrans-left-content-each-word'>{{item.name}}</div>
            <div class='wzpTrans-left-content-each-icon' @click='handleUploadedDelete(item)'>
              <el-icon class='el-icon-close wzpTrans-left-content-each-icon-css'></el-icon>
            </div>
          </div>
        </div>
      </div>
    </el-form-item>
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
      directUpload: {
        type: Boolean,
        default() { return false}
      },
    },
    components: {

    },
    data() {
      return {
        files: [],
        uploadedFiles: [], //已传文件
      }
    },
    methods: {
      init() {


      },
      beforeUpload(file) {
        this.form.uploadFiles.push(file)
        return false;
      },
      /* 单独上传
       */
      handleSubmit() {
        this.uploadedFiles = utils.deepCopy(this.form.uploadFiles)
        this.form.uploadFiles = []
        this.$emit('uploaded', this.uploadedFiles)//更新父组件传递已传文件列表
      },
      /* 待传删除
       */
      handleDelete(item) {
        let index = this.form.uploadFiles.findIndex(val => val.uid === item.uid)
        this.form.uploadFiles.splice(index, 1)
      },
      /* 已传删除
       */
      handleUploadedDelete(item) {
        let index = this.uploadedFiles.findIndex(val => val.uid === item.uid)
        this.uploadedFiles.splice(index, 1)
        this.$emit('uploaded', this.uploadedFiles)//删除时同同样更新已传文件列表
      }
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
    },
    created() {

    }
  }
</script>
