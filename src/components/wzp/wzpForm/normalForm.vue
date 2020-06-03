<style lang="less">
@import '~@/assets/less/common.less';
@import './form.less';

</style>

<template>
<div class="form-normal">
  <el-form ref="form" :model="form" label-width="80px" :rules="rules">
    <el-row :gutter='10'>
      <el-col :span='11' >
        <el-form-item label="编号" prop="code">
          <el-input v-model="form.code" size="small"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span='11'>
        <el-form-item label="用户名" prop="name">
          <el-input v-model="form.name" size="small"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span='11'>
        <el-form-item label="部门" prop="depart">
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
        <el-form-item label="性别" prop="gender">
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
      <el-form-item label="性格" prop="character">
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
      <el-form-item label="是否开始" prop="delivery">
        <el-switch v-model="form.delivery"></el-switch>
      </el-form-item>
    </el-row>
    <el-row>
      <el-form-item style='text-align: center;' label-width='0'>
        <el-button type="primary" @click="onSubmit('form')">提交</el-button>
        <el-button @click='onCancel'>取消</el-button>
      </el-form-item>
    </el-row>

  </el-form>
  <!-- <el-row>
    <el-col :xs='1' :sm='1' :md="1" :lg="1" :xl="1" class='common-search-label-col2'>类型:</el-col>
    <el-col :xs='3' :sm='3' :md="3" :lg="3" :xl="2">
      <el-input></el-input>
    </el-col>
  </el-row> -->
</div>
</template>

<script>
import my from '@/assets/js/my'
import utils from '@/assets/js/utils'
export default {
  components: {

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
    };
    return {
      form: {
        code: '',
        name: '',
        depart: '',
        gender: '',
        time: '',
        character: ['开心'],
        desc: '',
        delivery: false
      },
      rules: {
        desc: [{ validator: checkDesc, trigger: 'change' }],
        time: [{ validator: checkTime, trigger: 'change' }],
        code: [{ required: true, message: '请填写编号', trigger: 'blur'}],
        name: [{ required: true, message: '请填写用户民', trigger: 'blur'}],
        depart: [{ required: true, message: '请选择部门', trigger: 'change'}],
        gender: [{ required: true, message: '请选择性别', trigger: 'change'}],
        character: [{ required: true, message: '请选择性格', trigger: 'change'}],
        desc: [{ required: true, message: '请填写形式', trigger: 'blur'}],
      },
      dataArr: [{label: '软件', value: 'ruanjian'}, {label: '销售', value: 'xiaoshou'}],
      characterArr: [{label: '开心', value: 'kaixin'}, {label: '活泼', value: 'huopo'}, {label: '沉默', value: 'chenmo'}]
    }
  },
  methods: {
    init () {

    },
    onSubmit(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          utils.messSuccess("submit", this);
          
        } else {
          utils.messError("FAILED", this);
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

    }
  },
  created () {

  }
}
</script>
