
<style scoped></style>
<template>
  <el-form :model="form" :rules="rules" ref="form" label-width="100px" >
    <el-form-item label="姓名:" prop="name">
      <el-input v-model="form.name" size="small"></el-input>
    </el-form-item>
    <el-row :gutter="20">
      <el-col :span="12">
        <el-form-item label="年龄:" prop="age">
          <el-input v-model="form.age" size="small"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="性别:" prop="gender">
          <el-select v-model="form.gender" placeholder="请选择" size="small">
            <el-option label="男" value="0" ></el-option>
            <el-option label="女" value="1" ></el-option>
          </el-select>
        </el-form-item>
      </el-col>
    </el-row>
    <el-form-item label="地址:" prop="address">
      <el-input v-model="form.address" size="small">
        <template slot="prepend">
          <el-select v-model="form.area"  size="small" style="width: 100px;">
            <el-option v-for="(item, index) in area" :key="item.value"  :value="item.label">{{item.label}}</el-option>
          </el-select>
        </template>
      </el-input>
    </el-form-item>
    <el-form-item style="text-align: center;">
      <el-button type="primary" @click="submitForm('form')">下一步</el-button>

    </el-form-item>
    <!-- <el-form-item label="活动名称" prop="name">
      <el-input v-model="ruleForm.name"></el-input>
    </el-form-item>
    <el-form-item label="活动区域" prop="region">
      <el-select v-model="ruleForm.region" placeholder="请选择活动区域">
        <el-option label="区域一" value="shanghai"></el-option>
        <el-option label="区域二" value="beijing"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="活动时间" required>
      <el-col :span="11">
        <el-form-item prop="date1">
          <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.date1" style="width: 100%;"></el-date-picker>
        </el-form-item>
      </el-col>
      <el-col class="line" :span="2">-</el-col>
      <el-col :span="11">
        <el-form-item prop="date2">
          <el-time-picker placeholder="选择时间" v-model="ruleForm.date2" style="width: 100%;"></el-time-picker>
        </el-form-item>
      </el-col>
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
      <el-button @click="resetForm('ruleForm')">重置</el-button>
    </el-form-item> -->
  </el-form>

</template>

<script>
  import my from '@/assets/js/my';
  import utils from '@/assets/js/utils';
  export default {
    props: {
      // xxx: {
      //   type: xxx,
      //   default: xxx
      //   default: function() {
      //     console.log("propE default invoked.");
      //     return { message: "I am from propE." };
      //   }
      // }
    },
    components: {

    },
    data() {
      return {
        area: my.area,
        form: {
          name: "",
          age: 0,
          gender: "0",
          address: "",
          area: ""
        },
        rules: {
          name: [{ required: true, message: '请输入姓名', trigger: 'change' }],
          age: [{ required: true, message: '请输入年龄', trigger: 'change' }],
          gender: [{ required: true, message: '请选择性别', trigger: 'change' }],
          address: [{ required: true, message: '请输入地址', trigger: 'change' }],
        }
      }
    },
    methods: {
      init() {

      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$emit("next");
            this.$store.dispatch("form/setForm", this.form);
          } else {
            utils.messError('submit error', this);
            return false;
          }
        });
      },
      resetForm() {
        this.$refs.form.resetFields();
      }
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
