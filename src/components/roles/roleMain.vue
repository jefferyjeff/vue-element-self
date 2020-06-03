<style scoped></style>
<template>
  <div class="role-main">
    <div class="header">
      <el-button type="primary" size="small" @click="testClick('新增')">新增</el-button>
      <el-button type="success" size="small" @click="testClick('保存')">保存</el-button>
      <el-button type="danger" size="small" @click="testClick('删除')">删除</el-button>
    </div>
    <div class="content" v-show="roleCheckArr.length!=0">
      <el-row class="content-header">
        <el-col :span="2">&nbsp;</el-col>
        <el-col :span="8" class="content-name">权限名</el-col>
        <el-col :span="14" class="content-word">内容</el-col>
      </el-row>

      <el-row v-for="(item, index) in roleArr" :key="item.id" class="content-header">
        <el-col :span="2">
          <el-checkbox v-model="checkAllArr[index]"  @change="handleCheckAllChange(item, index, $event)"></el-checkbox>
        </el-col>
        <el-col :span="8" class="content-name">{{item.name}}</el-col>
        <el-col :span="14" class="content-word">
          <el-checkbox-group v-model="roleCheckArr" @change="handleCheckedCitiesChange($event, item, index)">
            <el-checkbox v-for="(child, index2) in item.auths" :key="child.id" :label="child.id">
              <span>{{child.name}}</span>
            </el-checkbox>
          </el-checkbox-group>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
  import {
    mapState,
  } from 'vuex';
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
        roleArr: [],
        checkAllArr: [], //true, true, true, true
        roleCheckArr: [],
      }
    },
    methods: {
      init() {
        utils.POST({
          url: '/api/getRoleArr',
          success: (res) => {
            this.roleArr = res.data;
          },
          error: () => {

          },
          finally: () => {

          }
        })
      },

      handleCheckAllChange(item, index, bool) {
        this.checkAllArr[index] = bool;
        if (bool) {
          for (let i = 0; i < item.auths.length; i++) {
            if (utils.isContainedOne(this.roleCheckArr, item.auths[i].id)) {} else {
              this.roleCheckArr.push(item.auths[i].id)
            }
          }
        } else {
          for (let i = 0; i < item.auths.length; i++) {
            let index = this.roleCheckArr.findIndex((val) => item.auths[i].id === val);
            this.roleCheckArr.splice(index, 1)
          }
        }
        my.c(this.checkAllArr)
      },
      handleCheckedCitiesChange(data, opts, index) {
        let roleArr = this.getSignList(opts);
        let arr = JSON.parse(JSON.stringify(this.checkAllArr));//element的checkbox子选项无法直接通过判断更新全选checkbox,必须是重新赋值才行
        let bool = utils.isContained(data, roleArr); //判断已选择的data是否包含roleArr
        if (bool) {
          arr[index] = true;
        } else {
          arr[index] = false;
        }
        this.checkAllArr = arr
      },
      /* 把数据红的权限标志整合进数组中
       */
      getSignList(opts) {
        let arr = []
        for (let i = 0; i < opts.auths.length; i++) {
          arr.push(opts.auths[i].id)
        }
        return arr;
      },
      /* 测试按钮
      */
      testClick(text) {
        if(text === "新增"){
          utils.messInfo('您点击了' + text, this)
        }else if(text === "保存"){
          utils.messSuccess('您点击了' + text, this)
        }else if(text === "删除"){
          utils.messError('您点击了' + text, this)
        }

      }

    },
    mounted() {
      this.init();

    },
    computed: {
      ...mapState({
        roles: state => state.permission.roles,
      }),
    },
    watch: {
      //可以监听路由信息
      $route(to, from, next) {

      },
      roles(val){
        this.roleCheckArr = val;
        for (let i = 0; i < this.roleArr.length; i++) {
          this.handleCheckedCitiesChange(this.roleCheckArr, this.roleArr[i], i)
        }
      }
    },
    created() {

    },
  }
</script>
