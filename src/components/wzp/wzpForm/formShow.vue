<style lang="less">
  @import '~@/assets/less/common.less';
  @import './form.less';
</style>

<template>
  <div class="form common">
    <template v-if='showWord === "normal-form"'>
      <el-row :gutter="20">
        <el-col :span="12">
          <normal-form ref='normalFormRef'></normal-form>
        </el-col>
        <el-col :span="12">
          <file-form ref='fileFormRef'></file-form>
        </el-col>
      </el-row>
    </template>
    <template v-else-if='showWord === "step-form"'>
      <step-form ref='stepForm'></step-form>
    </template>

</div>
</template>

<script>
import my from '@/assets/js/my'
import utils from '@/assets/js/utils'
import normalForm from './normalForm'
import fileForm from './fileForm'
import stepForm from './stepForm'
export default {
  components: {
    'normal-form': normalForm,
    'file-form': fileForm,
	'step-form': stepForm
  },
  data () {
    return {
      showWord: ''
    }
  },
  methods: {
    init () {
      this.showWord = this.$route.name

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
      this.init()

    }
  },
  created () {

  }
}
</script>
