<style lang="less">
@import '~@/assets/less/common.less';
@import './normalTable.less';


</style>

<template>
<div></div>
</template>

<script>
import my from '@/assets/js/my'
import utils from '@/assets/js/utils'
import oneLine from '@/components/wzp/wzpHeader/oneLine'
import pageFooter from '@/components/wzp/wzpFooter/pageFooter'

export default {
  components: {
    'one-line': oneLine,
    'page-footer': pageFooter
  },
  data () {
    return {
      headName: 'oneLine',
      total: 100
    }
  },
  methods: {
    init () {

    },
    /* 搜索
    */
    searchClick () {

    },
    /* 重置
    */
    refreshClick () {

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
