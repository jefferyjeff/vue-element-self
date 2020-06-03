<style lang="less">
  @import "~@/assets/less/common.less";
  @import "./workPlatform.less";
</style>
<style scoped>

</style>
<template>
  <div class="workPlatform common">
    <el-row :gutter="20" class="mb20">
      <el-col :xs="8" :sm="8" :md="8" :lg="7" :xl="5" class="workPlatform-col">
        <el-card class="userInfo">
          <el-row :gutter="15" class="userInfo-message mb15">
            <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8" style="height: 100%;">
              <img :src="userInfo!=null?userInfo.avatar: ''" alt="">
            </el-col>
            <el-col :xs="16" :sm="16" :md="16" :lg="16" :xl="16" style="height: 100%;" class="userInfo-info">
              <div class="userInfo-info-name">{{userInfo.username}}</div>
              <div class="userInfo-info-dept">{{userInfo.dept}} | {{userInfo.position}}</div>
            </el-col>
          </el-row>
          <div class="userInfo-middle">
            <div>显示内容1</div>
            <div>显示内容1</div>
            <div>显示内容1</div>
            <div>显示内容1</div>
          </div>
        </el-card>
      </el-col>
      <el-col :xs="16" :sm="16" :md="16" :lg="17" :xl="19" class="workPlatform-col">
        <div class="remind mb15">
          <div>项目组件框架</div>
          <div>
            <el-badge :value="12" class="item">
              <i class="iconfont icon-email-fill email-icon"></i>
            </el-badge>
            <el-badge>
              <i class="iconfont icon-set1 set-icon"></i>
            </el-badge>
          </div>
        </div>
        <div class="workPlatform-events">
          <el-row style="height: 100%">
            <el-col :span="8" v-for="(item, index) in eventData" :key="index" :class="[index!=eventData.length-1?'greylightBorderRight greylightBorderBottom':'']" class="workPlatform-events-each">
              <div class="title">
                <img :src="item.url" alt="" />
                <span class="title-word">{{item.title}}</span>
              </div>
              <div class="remark">
                {{item.content}}
              </div>
            </el-col>
          </el-row>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="20" class="workPlatform-middle">
      <el-col :xs="8" :sm="8" :md="8" :lg="7" :xl="5" style="height: 100%;">
        <user-log ref="userLog"></user-log>
      </el-col>
      <el-col :xs="16" :sm="16" :md="16" :lg="17" :xl="19" style="height: 100%;">
        <el-table :data="tableData" style="width: 100%" height="100%">
          <el-table-column prop="eventname"  label="项目名"  min-width="180" align="center">
          </el-table-column>
          <el-table-column label="开始日期" min-width="180" align="center">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{formatDate(scope.row.beginDate)}}</span>
            </template>
          </el-table-column>
          <el-table-column  label="状态" align="center">
            <template slot-scope="scope">
              <span :style="{color: getStatus(scope.row.status).color}">{{getStatus(scope.row.status).label}}</span>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>


  </div>
</template>

<script>
  import my from '@/assets/js/my';
  import utils from '@/assets/js/utils';
  import userLog from '@/components/workPlatform/userLog';
  
  export default {
    props: {

    },
    components: {
      'user-log': userLog,
      
    },
    data() {
      return {
        userInfo: {},
        eventData: [],
        tableData: []
      }
    },
    methods: {
      init() {
        this.getUserInfo();
        this.getEventInfo();
      },
      getUserInfo() {
        utils.POST({
          url: '/api/getUserInfo',
          success: (res) => {
            this.userInfo = res.data;
            this.tableData = this.userInfo.events;
          },
          error: () => {

          },
          finally: () => {

          }
        })
      },
      getEventInfo() {
        utils.POST({
          url: '/api/getEventInfo',
          success: (res) => {
            this.eventData = res.data;
          },
          error: () => {

          },
          finally: () => {

          }
        })
      },
      formatDate(date) {
        return utils.dateformat(date)
      },
      getStatus(status) {
        return my.eventStatus.find(val => val.value === status)
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
