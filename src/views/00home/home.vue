<style lang="less">
@import '~@/assets/less/common.less';
@import "~@/views/00home/home.less";

</style>

<template>
<div class='home common'>
  <div class='home-header'>
    <el-row :gutter='20' class='home-header-row'>
      <el-col :xs="12" :sm="12" :md="12" :lg="6" :xl="6" class='home-header-col'>
        <div class='home-header-div'>
          <i class="el-icon-s-custom home-header-icon" style="color: #409EFF"></i>
          <div class="home-header-word">
            <div class="label">人员管理</div>
            <div>所有人员的管理</div>
          </div>
        </div>
      </el-col>
      <el-col :xs="12" :sm="12" :md="12" :lg="6" :xl="6" class='home-header-col'>
        <div class='home-header-div'>
          <i class="el-icon-s-order home-header-icon" style="color: #E6A23C"></i>
          <div class="home-header-word">
            <div class="label">记录文案</div>
            <div>记录了一揽子文案</div>
          </div>
        </div>
      </el-col>
      <el-col :xs="12" :sm="12" :md="12" :lg="6" :xl="6" class='home-header-col'>
        <div class='home-header-div'>
          <i class="el-icon-star-on home-header-icon" style="color: #F56C6C"></i>
          <div class="home-header-word">
            <div class="label">关注事项</div>
            <div>关注时事新闻</div>
          </div>
        </div>
      </el-col>
      <el-col :xs="12" :sm="12" :md="12" :lg="6" :xl="6" class='home-header-col'>
        <div class='home-header-div'>
          <i class="el-icon-s-comment home-header-icon" style="color: #67C23A"></i>
          <div class="home-header-word">
            <div class="label">消息推送</div>
            <div>推送给所有人</div>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
  <home-parallel ref="homeParallelRef"></home-parallel>
  <div class="home-content">
    <el-row :gutter="20" style="height: 100%;">
      <el-col :xs="24" :sm="24" :md="24" :lg="8" :xl="8" class="grid-col">
        <div class="home-content-grid">
          <home-pie ref="homePieRef"></home-pie>
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :md="24" :lg="8" :xl="8" class="grid-col">
        <div class="home-content-grid">
          <home-radar ref="homeRadarRef"></home-radar>
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :md="24" :lg="8" :xl="8" class="grid-col">
        <div class="home-content-grid">
          <home-bar ref="homeBarRef"></home-bar>
        </div>
      </el-col>

    </el-row>
  </div>
</div>
</template>

<script>
import my from '@/assets/js/my';
import utils from '@/assets/js/utils';
import homeParallel from './components/homeParallel';
import homePie from './components/homePie';
import homeBar from './components/homeBar';
import homeRadar from './components/homeRadar';
import homeFunnel from './components/homeFunnel';

export default {
  components: {
    'home-parallel': homeParallel,
    'home-pie': homePie,
    'home-bar': homeBar,
    'home-radar': homeRadar,
    'home-funnel': homeFunnel,
  },
  data () {
    return {

    }
  },
  methods: {
    init () {

    }

  },
  mounted () {
    this.init();
    /* echarts的resize必须使用setTimeout,否则不生效
       多图表必须放在同一个onresize中，否则时会有一个生效
    */
    setTimeout(()=> {
      window.onresize = () => {
        this.$refs.homeParallelRef.echartResize();
        this.$refs.homeBarRef.echartResize();
        this.$refs.homePieRef.echartResize();
        this.$refs.homeRadarRef.echartResize();
      }
    }, 200);
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
