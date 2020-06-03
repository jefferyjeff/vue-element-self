<style lang="less">
  .chooseColumns{
    &-transfer{
      display: flex;
      flex-direction: row;
      justify-content: center;
    }
    &-button{
      text-align: center;
    }
  }
</style>
<style scoped></style>
<template>
<div class="chooseColumns">
  <div class="chooseColumns-transfer">
    <el-transfer ref="columnTransfer" v-model="choosenData" :data="primaryColumns" :titles="titles" ></el-transfer>
  </div>
  <div class="chooseColumns-button mt20">
    <el-button @click="saveColumns" type="success">确定</el-button>
  </div>

</div>
</template>

<script>
  import { mapState, mapGetters } from 'vuex';
  import my from '@/assets/js/my';
  import utils from '@/assets/js/utils';
  export default {
    props: {

    },
    components: {

    },
    data() {
      return {
        choosenData: [],
        titles: ['所有列', '显示列']
      }
    },
    methods: {
      init() {

      },
      saveColumns() {
        let arr = [];
        if(this.choosenData.length === 0) {
          this.$emit("choosen", this.primaryColumns);
          return;
        }
        for(let i=0;i<this.choosenData.length;i++){
          let index = this.primaryColumns.findIndex(val => this.choosenData[i] === val.key);
          arr.push(this.primaryColumns[index])
        }
        this.$emit("choosen", arr)
      },
      clear() {
        this.choosenData = []
      }

    },
    mounted() {
      this.init();

    },
    computed: {
      ...mapState({
        primaryColumns: state => state.wzp.primaryColumns
      }),


    },
    watch: {
      $route(to, from, next) {

      }
    },
    created() {

    },
  }
</script>
