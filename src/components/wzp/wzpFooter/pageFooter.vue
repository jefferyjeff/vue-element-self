<style lang="less">
  @import '~@/assets/less/common.less';
  @import './pageFooter.less';
</style>
<template>
  <div class='pageFooter'>
    <el-pagination background :layout='layout'
      :total='total'
      :current-page='current'
      :page-size='size'
      :page-sizes='pageSizeOpts' @size-change='sizeChange'
      @current-change='currentChange' @prev-click='prevClick' @next-click='nextClick'>
    </el-pagination>

  </div>
</template>

<script>
  import my from '@/assets/js/my'
  import utils from '@/assets/js/utils'
  export default {
    props: {
      layout: {
        type: String,
        default () {
          return 'total, pager'
        }
      },
      total: {
        type: Number,
        default () {
          return 0
        }
      },
      current: {
        type: Number,
        default () {
          return 1
        }
      },
      size: {
        type: Number,
        default () {
          return 10
        }
      },
      pageSizeOpts: {
        type: Array,
        default () {
          return [10, 20, 30]
        }
      },

    },
    components: {

    },
    data() {
      return {

      }
    },
    methods: {
      init() {

      },
      currentChange (page) {
        console.log(page)
        this.$emit('current-change', page)
      },
      sizeChange (size) {

      },
      prevClick (page) {
    console.log(page)
      },
      nextClick (page) {
console.log(page)
      }


    },
    mounted() {
      this.init()
    },
    computed: {

    },
    watch: {
      // 可以监听路由信息
      $route(to, from, next) {

      }
    },
    created() {

    }
  }
</script>


<style>
</style>
