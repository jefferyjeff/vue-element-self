<style lang="less">
  @import "~@/assets/less/common.less";

</style>
<style scoped>
  .headerCalendar /deep/ .el-calendar-table .el-calendar-day{
    height: 30px;
  }
</style>
<template>
<div class="navheader">
  <div class="navheader-collapse">
    <i class='el-icon-s-fold main-header-icon'
      :style="{transform: 'rotateZ(' + (isCollapse ? '-180' : '0') + 'deg)'}"
      @click='collapseClick'/>
  </div>
  <div class="navheader-right">

    <div v-show="showHeaderSearch" style="display: flex;align-items: center;">
      <i class="iconfont icon-search1 searchIcon" @click="showSearch=!showSearch"></i>
			<el-select v-model="searchWord" filterable placeholder="请选择"  :class="['navheader-right-select', showSearch?'selectWidth': '']">
				<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
				</el-option>
			</el-select>
    </div>
    <el-popover placement="top-start" title="日历" width="400" trigger="hover" v-show="showCalendar">
      <el-calendar v-model="nowDate" class="headerCalendar"></el-calendar>
      <div slot="reference">
        <i class="el-icon-date" style="color: #409EFF;margin-left: 10px;font-size:30px;"></i>
      </div>
     
      </el-button>
    </el-popover>
    <el-dropdown class="main-header-user" trigger="click" style="margin-left: 10px;">
      <div class="avatar-wrapper">
        <img src="https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif" alt="" style="width: 45px;height: 45px;">
        <i class="el-icon-caret-bottom" />
      </div>
      <el-dropdown-menu slot="dropdown">
        
        <el-dropdown-item divided @click.native="logout">
          <span style="display:block;">退出</span>
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</div>
</template>

<script>
  import { mapGetters } from 'vuex';
  import my from '@/assets/js/my';
  import utils from '@/assets/js/utils';

  export default {
    props: {
      showDate: {
        type: Boolean,
        default() {
          return true
        }
      },
      showHeaderSearch: {
        type: Boolean,
        default() {
          return false
        }
      }
    },
    components: {

    },
    data() {
      return {
        nowDate: new Date(),
        options: [],
        searchWord: "",
        showSearch: true
      }
    },
    methods: {
      init() {

      },
      getOptions(route, baseTitle) {

      },
      collapseClick() {
        this.$store.dispatch("app/siderBarCollapse");
      },
      logout() {
        this.$router.push({
          name: 'login'
        })
      }
    },
    mounted() {
      this.init();

    },
    computed: {
      ...mapGetters([
        'sidebar',
        'device',
        'perRouter'
      ]),
      isCollapse() {
        return !this.sidebar.opened
      },
      showCalendar() {
        //mobile不显示calendar
        if(this.device != my.mobile && this.showDate){
          return this.showDate;
        }else{
          return false;
        }
      },

    },
    watch: {
      //可以监听路由信息
      $route(to, from, next) {

      },
      
    },
    created() {

    },
  }
</script>
