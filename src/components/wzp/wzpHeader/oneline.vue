<style lang="less">
  @import '~@/assets/less/common.less';
  @import './oneLine.less';
</style>
<template>
<div class='oneLine'>
  <el-card class='oneLine-card'>
    <el-row :gutter='5'>
      <el-col :xs='1' :sm='1' :md="1" :lg="1" :xl="1" class='common-search-label-col2'>类型:</el-col>
      <el-col :xs='3' :sm='3' :md="3" :lg="3" :xl="2">
        <el-select v-model='search.selectValue'  placeholder="请选择">
          <el-option value="环境保护攻略">
            环境保护攻略
          </el-option>
        </el-select>
      </el-col>
      <el-col :xs='2' :sm='2' :md="2" :lg="2" :xl="2" class='common-search-label-col2'>用户名:</el-col>
      <el-col :xs='4' :sm='4' :md="4" :lg="4" :xl="4">
        <el-input v-model='search.inputValue' placeholder=""> </el-input>
      </el-col>
      <el-col :xs='2' :sm='2' :md="2" :lg="2" :xl="2" class='common-search-label-col2'>起止时间:</el-col>
      <el-col :xs='6' :sm="6" :md="6" :lg="6" :xl="4">
        <el-date-picker
              style='width: 100%;'
              v-model="search.dateValue"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期">
            </el-date-picker>
      </el-col>
      <el-col :xs='6' :sm="6" :md="6" :lg="6" :xl="9">
        <el-button type='primary ' icon="el-icon-search" size='small' @click='searchClick'>搜索</el-button>
        <el-button type='warning ' icon="el-icon-refresh-left" size='small' @click='refreshClick'>重置</el-button>
        <el-button type='info' icon="el-icon-more-outline" size='small' @click='moreClick' v-show='moreSearch'
          style='background-color: #48c0a3;border-color: #48c0a3'>更多</el-button>
      </el-col>
    </el-row>
  </el-card>

  <el-drawer :visible.sync="drawer" size="300px" :wrapperClosable='false'>
    <div slot='title' style='color: #409EFF'>更多搜索</div>
    <el-row :gutter='5'>
      <el-col :span='6' class='common-search-label-col2'>部门:</el-col>
      <el-col :span='17'>
        <el-input v-model='search.departValue'></el-input>
      </el-col>
    </el-row>
    <el-row :gutter='5' class='common-search-row-marginTop'>
      <el-col :span='6' class='common-search-label-col2'>管理部门:</el-col>
      <el-col :span='17'>
        <el-input v-model='search.managerValue'></el-input>
      </el-col>
    </el-row>
    <el-row :gutter='5' class='common-search-row-marginTop' style='text-align: right;'>
      <el-col :span='23'>
        <el-button type='primary ' icon="el-icon-search" size='small' @click='searchClick'>搜索</el-button>
      </el-col>
    </el-row>
  </el-drawer>

</div>
</template>

<script>
import my from '@/assets/js/my'
import utils from '@/assets/js/utils'
export default {
  props: {
    moreSearch: {
      type: Boolean,
      default(){return false}
    }
  },
  components: {

  },
  data () {
    return {
      search: {
        selectValue: '',
        inputValue: '',
        dateValue: '',
        managerValue: ''
      },
      drawer: false
    }
  },
  methods: {
    init () {

    },
    /* 搜索
    */
    searchClick () {
      this.drawer = false;
      this.$emit('on-search', this.search)
    },
    /* 重置
    */
    refreshClick: async function () {
      this.search = await this.clearMethod()
      this.$emit('on-refresh', this.search)
    },
    /* 更多
    */
    moreClick: async function () {
      this.search = await this.clearMethod()
      this.drawer = true
    },
    clearMethod () {
      return new Promise((resolve, reject)=> {
        resolve(Object.assign({}, this.$options.data().search))
      })
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


<style>
</style>
