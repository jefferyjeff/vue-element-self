<style lang="less">
  @import "~@/assets/less/common.less";

</style>
<style lang="less" scoped></style>
<template>
<el-form :model="formInLogin" :rules="rules" ref="formInLogin">
  <el-form-item prop="username">
    <el-input
      type="text"
      placeholder="请输入内容"
      v-model="formInLogin.username"
      prefix-icon="el-icon-user">
    </el-input>
  </el-form-item>
  <el-form-item prop="password">
    <el-input
      type="text"
      placeholder="请输入密码"
      v-model="formInLogin.password"
      prefix-icon="el-icon-lock">
    </el-input>
  </el-form-item>
    <el-form-item style="text-align: center;">
      <el-button type="primary" @click="submitForm('formInLogin')" :loading="loading">登录</el-button>

    </el-form-item>
</el-form>
</template>

<script>
  import my from '@/assets/js/my';
  import utils from '@/assets/js/utils';
  export default {
    components: {

    },
    data() {
      const validateUser = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入用户名'));
        } else {
          callback();
        }
      }
      const validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          callback();
        }
      }
      return {
        formInLogin: {
          username: "",
          password: ""
        },
        rules: {
          username: [{ validator: validateUser, trigger: 'blur' }],
          password: [{ validator: validatePass, trigger: 'blur' }],
        },
        passwordType: "password",
        loading: false
      }
    },
    methods: {
      init() {

      },
      submitForm(name) {

        this.$refs[name].validate((valid)=> {
          if(valid){
            let that = this;
            that.loading = true;
            utils.messSuccess({message: "校验成功"}, this);
            setTimeout(()=> {
              that.$router.push({
                name: "home"
              })
              that.loading = false;
            }, 2000);
          }else{
            utils.messError({message: "校验失败"}, this)
          }
        })
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
