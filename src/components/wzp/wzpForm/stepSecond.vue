
<style scoped></style>
<template>
  <el-form :model="form" :rules="rules" ref="form" label-width="100px" >
    <el-form-item label="电话:" prop="phone">
      <el-input v-model="form.phone" size="small"></el-input>
    </el-form-item>
    <el-row :gutter="20">
      <el-col :span="12">
        <el-form-item label="手机:" prop="mobile">
          <el-input v-model="form.mobile" size="small"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="邮箱:" prop="email">
          <el-input v-model="form.email" size="small"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-form-item label="微信:" prop="wx">
      <el-input v-model="form.wx" size="small"></el-input>
    </el-form-item>
    <el-form-item label="QQ:" prop="qq">
      <el-input v-model="form.qq" size="small"></el-input>
    </el-form-item>
    <el-form-item style="text-align: center;">
      <el-button type="primary" @click="submitForm('form')" :loading='submitLoading'>提交</el-button>
      <el-button @click="previous" :disabled="submitLoading">上一步</el-button>
    </el-form-item>

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
        submitLoading: false,
        form: {
          phone: "",
          mobile: "",
          email: "",
          wx: "",
          qq: "",
        },
        rules: {
          phone: [{ required: true, message: '请输入电话', trigger: 'change' }],
          mobile: [{ required: true, message: '请输入手机', trigger: 'change' }],
          email: [{ required: true, message: '请选择邮箱', trigger: 'change' }],
          wx: [{ required: true, message: '请输入微信', trigger: 'change' }],
          qq: [{ required: true, message: '请输入QQ', trigger: 'change' }],
        }
      }
    },
    methods: {
      init() {

      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$store.dispatch("form/setForm", this.form);
            this.submitLoading = true;
            setTimeout(()=> {
              this.$emit("next");
              this.submitLoading = false;
            }, 2000);


          } else {
            utils.messError('submit error', this);
            return false;
          }
        });
      },
      previous() {
        this.$emit("previous")
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
