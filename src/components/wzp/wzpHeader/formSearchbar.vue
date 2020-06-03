<style lang="less">
  @import "~@/assets/less/common.less";

</style>
<style scoped>
  .formSearchbar /deep/ .el-card__body{
    padding: 10px;
  }
</style>
<template>
<el-card class="formSearchbar">
  <el-row :gutter="15">
    <el-col :xs="12" :sm="12" :md="12" :lg="5" :xl="3" class="common-search-col">
      <div class="common-col-label2">状态:</div>
      <el-select v-model="search.status" placeholder="请选择" size="small" style="width: 100%">
          <!-- <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option> -->
        </el-select>
     <!-- <el-input  size="small"></el-input> -->
    </el-col>
    <el-col :xs="12" :sm="12" :md="12" :lg="5" :xl="4" class="common-search-col">
      <div class="common-col-label3">用户名:</div>
      <el-input  size="small"></el-input>
    </el-col>
    <!-- <el-col :xs="12" :sm="12" :md="12" :lg="5" :xl="4" class="common-search-col">
      <div class="common-col-label2">地址:</div>
      <el-input  size="small"></el-input>
    </el-col> -->
    <el-col :xs="12" :sm="12" :md="12" :lg="7" :xl="6" class="common-search-col">
      <div class="common-col-label4">起止日期:</div>
      <el-date-picker size="small" style="width: 100%;"
            v-model="search.date"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
    </el-col>
    <el-col :xs="{span:6,offset:18}" :sm="{span:5,offset:19}" :md="{span:5,offset:19}" :lg="{span:4, offset:0}" :xl="{span:4, offset: 0}">
      <el-button type="primary" icon="el-icon-search" size="small"></el-button>
      <el-button type="warning" icon="el-icon-refresh-left" size="small"></el-button>
      <el-button type="success" icon="el-icon-document-add" size="small"></el-button>
    </el-col>
    <!-- <el-col :xs="8" :sm="8" :md="8" :lg="7" :xl="5" style="display: flex;flex-direction: row;">
      <div class="common-col-label4">开始日期:</div>
      <el-input  size="small"></el-input>
    </el-col> -->
  </el-row>
</el-card>
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
        search: {
          status: "",
          date: ""
        }
      }
    },
    methods: {
      init() {

      },
      aaa() {
        invoice.getTaxDiskInformation({
          data: data,
          success: (res) => {
            myUtil.c("", res);
          },
          error: (e) => {
            myUtil.e("", e);
          },
          finally: () => {

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
