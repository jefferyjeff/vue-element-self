<style lang="less">
@import '~@/assets/less/common.less';
@import './form.less';
</style>
<!--
imgUpload(false): 不显示上传图片
fileUpload(false): 不显示上传文件
directUpload(false): 不单独上传文件
 -->
<template>
<div class="form-normal">
  <el-form ref="form" :model="form" label-width="80px" :rules="rules">
    <el-row :gutter='10'>
      <el-col :span='11' >
        <el-form-item label="编号">
          <el-input v-model="form.code" size="small"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span='11'>
        <el-form-item label="用户名">
          <el-input v-model="form.name" size="small"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span='11'>
        <el-form-item label="部门">
          <el-select v-model="form.depart" placeholder="请选择" style='width: 100%;' size="small">
              <el-option
                v-for="item in dataArr"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
        </el-form-item>
      </el-col>
      <el-col :span='11'>
        <el-form-item label="性别">
          <el-radio-group v-model="form.gender">
            <el-radio label="M">男</el-radio>
            <el-radio label="F">女</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-form-item label="工作年限" prop="time">
        <el-date-picker style='width: 100%;' size="small"
          v-model="form.time"
          type="datetimerange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期">
        </el-date-picker>
      </el-form-item>
    </el-row>
    <el-row>
      <el-form-item label="性格">
        <el-checkbox-group v-model="form.character" @change='checkChange'>
          <el-checkbox v-for='(item, index) in characterArr' :key='item.value'
            :label='item.label'>
          </el-checkbox>
        </el-checkbox-group>
      </el-form-item>
    </el-row>
    <el-row>
      <el-form-item label="活动形式" prop="desc">
        <el-input type="textarea" v-model="form.desc" size="small"></el-input>
      </el-form-item>
    </el-row>
    <el-row>
      <el-form-item label="文件">
        <my-upload ref="myUpload"></my-upload>
      </el-form-item>

    </el-row>
    <el-row>
      <el-form-item style='text-align: center;' label-width='0'>
        <el-button type="primary" @click="onSubmit('form')">提交</el-button>
        <el-button @click='onCancel'>取消</el-button>
      </el-form-item>
    </el-row>
  </el-form>
</div>
</template>

<script>
import my from '@/assets/js/my'
import utils from '@/assets/js/utils'
import wzpImgUpload from '@/components/wzp/wzpUpload/wzpImgUpload'
import wzpFileUpload from '@/components/wzp/wzpUpload/wzpFileUpload'
import wzpTrans from '@/components/wzp/wzpUpload/wzpTrans'
import myUpload from '@/components/uploads/myUpload'
export default {
  props: {
    imgUpload: {
      type: Boolean,
      default() {return false}
    },
    fileUpload: {
      type: Boolean,
      default() {return false}
    },
    directUpload: {
      type: Boolean,
      default() {return false}
    }
  },
  components: {
    'wzp-img-upload': wzpImgUpload,
    'wzp-file-upload': wzpFileUpload,
     'wzp-trans': wzpTrans,
     'my-upload': myUpload
  },
  data () {
    const checkDesc = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入数据'));
      } else {
        callback();
      }
    }
    const checkTime = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请选择时间'));
      } else {
        callback();
      }
    }
    const checkUploadList = (rule, value, callback) => {

      if (value.length === 0) {
        callback(new Error('请选择文件'));
      } else {
        callback();
      }
    };
    const checkUploadFiles = (rule, value, callback) => {

      if (value.length === 0) {
        callback(new Error('请选择文件'));
      } else {
        callback();
      }
    };
    return {
      form: {
        code: '',
        name: '',
        depart: '',
        bodys: '',
        time: '',
        character: ['开心'],
        desc: '',
        uploadList: [],
        uploadFiles: []
      },
      rules: {
        desc: [{ validator: checkDesc, trigger: 'change', required: true}],
        time: [{ validator: checkTime, trigger: 'change', required: true}],
        uploadList: [{ validator: checkUploadList, trigger: 'change', required: true}],
        uploadFiles: [{ validator: checkUploadFiles, trigger: 'change', required: true}],
      },
      dataArr: [{label: '软件', value: 'ruanjian'}, {label: '销售', value: 'xiaoshou'}],
      characterArr: [{label: '开心', value: 'kaixin'}, {label: '活泼', value: 'huopo'}, {label: '阴沉', value: 'yinchen'}]
    }
  },
  methods: {
    init () {

    },
    onSubmit(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          utils.messSuccess("submit success", this);
        } else {
          utils.messError("submit error", this);
          return false;
        }
      });
    },
    /* 取消
    */
    onCancel () {
      this.$emit('onCancel');
      this.$refs.form.resetFields()
    },
    /* checkbox
    */
    checkChange(val) {
      console.log(val)
    },
    /* wzpTrans已传文件列表传递，最后提交时需要使用
      @params:
        files: 已传文件数组
    */
    uploadedMethod() {

    }

  },
  mounted () {
    this.init()
  },
  computed: {

  },
  watch: {
    // 可以监听路由信息
    $route (to, from, next) {

    },
    /* 文件上传两个校验change时不会继续校验，所以error信息不会即时消失，这里监听他们手动消除error
    */
    'form.uploadList' (val) {
      console.log(val.length)
      if(val.length!=0){
        this.$refs.form.clearValidate('uploadList')
      }
    },
    'form.uploadFiles' (val) {
      if(val.length!=0)
      this.$refs.form.clearValidate('uploadFiles')
    }
  },
  created () {

  }
}
</script>
