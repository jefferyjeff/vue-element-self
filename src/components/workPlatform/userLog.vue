<style scoped>
  .userlog-scrollbar /deep/ .el-scrollbar__view, ul{
    height: 100%;/* 不添加height会是0 */
  }
  .userlog-scrollbar /deep/ .el-scrollbar__wrap{
    overflow-x:hidden;/* 消除el-scrollbar横向滚动条 */
  }
  .userlog /deep/ .el-card__header{
      padding: 0
  }

</style>
<template>
  <el-card class="userlog">
    <div slot="header" class="userlog-header">
      <span>日志</span>
      <el-button type="primary" icon="el-icon-plus" style="float: right; padding: 6px 10px" @click="logShow = true"></el-button>
    </div>
    <div style="height: 100%;">
      <el-scrollbar class='userlog-scrollbar'>
        <div v-for="(item, index) in userLog" :key="item.id" class="userlog-each">
          <el-popover ref="logPopover" placement="right-end" width="200" trigger="click" :content="item.content">
            <div slot="reference">
              <div class="common-title-word">{{item.title}}</div>
              <div class="common-default-word">{{formatDate(item.date)}}</div>
            </div>
          </el-popover>
          <el-divider></el-divider>
        </div>
      </el-scrollbar>
    </div>
    <div>

    </div>

    <el-dialog
      title="新增日志"
      :visible.sync="logShow"
      width="40%">
      <el-row :gutter="20">
        <el-col :span="4" class="common-form-label">标题:</el-col>
        <el-col :span="19">
          <el-input size="small"></el-input>
        </el-col>
      </el-row>
      <el-row :gutter="20" class="mt20">
        <el-col :span="4" class="common-form-label">内容:</el-col>
        <el-col :span="19">
          <el-input size="small"></el-input>
        </el-col>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button @click="logShow = false" size="small">取 消</el-button>
        <el-button type="primary" @click="saveLog" size="small">确 定</el-button>
      </span>
    </el-dialog>
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
        userLog: [],
        logShow: false
      }
    },
    methods: {

      init() {
        utils.POST({
          url: '/api/getUserLog',
          success: (res) => {
            this.userLog = res.data;
           
          },
          error: () => {

          },
          finally: () => {

          }
        })
      },
      /* 格式化日期
       */
      formatDate(date) {
        return utils.dateformat(date)
      },
      saveLog() {
        this.logShow = false;
        utils.messSuccess("日志已保存", this)
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
