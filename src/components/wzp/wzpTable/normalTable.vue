<style lang="less">
  @import '~@/assets/less/common.less';
@import './normalTable.less';


</style>
<style scoped>
  .normalTable /deep/ .el-main{
  	padding: 0;
  }
</style>
<template>
  <el-container class='normalTable common'>
    <el-header class='normalTable-header' height='72'>
     <!-- <one-line ref='oneLineRef' moreSearch @on-search="searchClick" @on-refresh='refreshClick'></one-line> -->
     <form-searchbar ref="formSearchbar"></form-searchbar>
    </el-header>
    <el-main class='normalTable-main'>
      <el-table style="width: 100%" ref='tableRef' :data="filterSource" border stripe :height='tableHeight' highlight-current-row
        @selection-change='handleTableSelect' row-key="id"
        :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
        <el-table-column reserve-selection
              type="selection"
              width="55">
            </el-table-column>
        <el-table-column type='index' label="序号" min-width="60" align='center' :index='indexMethod'></el-table-column>
        <el-table-column prop="date" label="编号" min-width="200">
        </el-table-column>
        <el-table-column prop="name" label="姓名" min-width="200">
        </el-table-column>
        <el-table-column prop="address" label="地址">
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="150" align='center'>
          <template slot-scope="scope">
            <el-button type="primary" icon="el-icon-tickets" circle @click='handleDetail(scope)'></el-button>
            <el-button type="warning" icon="el-icon-edit" circle @click='handleEdit(scope)'></el-button>
            <el-popconfirm
              title="确定删除吗" placement='top'
              popper-class='normalTable-main-popconfirm'
              @onConfirm='handleDelete(scope)'>
              <el-button type="danger" icon="el-icon-delete" circle  slot="reference"></el-button>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
    </el-main>
    <el-footer class='normalTable-footer' ref="normalTableFooter">
      <el-pagination background layout='total, prev, pager, next, sizes, jumper' :total='total' :current-page='pageNum'
        :page-size='size' :page-sizes='pageSizeOpts' @size-change='sizeChange' @current-change='currentChange'
        @prev-click='prevClick' @next-click='nextClick'>
      </el-pagination>
    </el-footer>

    <el-dialog :visible.sync="dialogVisible" top='5vh'>
      <normal-form ref='normalFormRef' @onCancel='dialogVisible = false'></normal-form>
    </el-dialog>
    <el-dialog :visible.sync="fileVisible" top='1vh'>
      <file-form ref='fileFormRef' @onCancel='fileVisible = false' fileUpload ></file-form>
    </el-dialog>
  </el-container>
</template>

<script>
  import { mapState } from 'vuex';
  import my from '@/assets/js/my'
  import utils from '@/assets/js/utils'
  import formSearchbar from '@/components/wzp/wzpHeader/formSearchbar'
  import pageFooter from '@/components/wzp/wzpFooter/pageFooter'

  import normalForm from '@/components/wzp/wzpForm/normalForm'
  import fileForm from '@/components/wzp/wzpForm/fileForm'

  export default {
    components: {
      'page-footer': pageFooter,
      'normal-form': normalForm,
      'file-form': fileForm,
      'form-searchbar': formSearchbar
    },
    data() {
      return {
        total: 0,
        pageNum: 1,
        size: 10,
        pageSizeOpts: [10, 20, 30],
        dataSource: [],
        filterSource: [],
        dialogVisible: false,
        fileVisible: false,

        selectionNow: [],//表格当前选中
        tableHeight: 0,//表格高度
      }
    },
    methods: {
      init() {

        for (let i = 0; i < 21; i++) {
          let args = {
            id: i,
            date: i,
            name: 'java' + i,
            address: '',
            visible: false,

          }
          if(i===3){
            args.children = [];
            for (let j = 1; j < 3; j++) {
              let args2 = {
                id: i + '-' + j,
                date: i + '-' + j,
                name: 'java' + i + '-' + j,
                address: '',
                visible: false
              }
              args.children.push(args2)
            }
          }
          this.dataSource.push(args)
        }
        this.total = this.dataSource.length
        this.filterMethod()
      },
      //****************************** 分页 *******************************************
      currentChange(page) {
        this.pageNum = page
        this.filterMethod()
      },
      sizeChange(size) {
        this.size = size
        this.filterMethod()
      },
      prevClick(page) {
        this.filterMethod()
      },
      nextClick(page) {
        this.filterMethod()
      },

      filterMethod() {
        this.filterSource = this.dataSource.slice((this.pageNum - 1) * this.size, this.pageNum * this.size)
      },
      /* 搜索
       */
      searchClick() {

      },
      /* 重置
       */
      refreshClick() {

      },
//******************** table *******************************
      /* table序号计算
       */
      indexMethod(index) {
        return index + (this.pageNum - 1) * this.size + 1
      },
      /* tabel select
      */
      handleTableSelect(val) {
        this.selectionNow = val
      },
      handleDetail (scope) {
        this.dialogVisible = true
      },
      /* table编辑
       */
      handleEdit (opts) {
        this.fileVisible = true
      },
      /* 删除
      */
      handleDelete (scope) {
        this.delMethod(this.dataSource, scope.row.id)
        this.total = this.dataSource.length
        if(this.total%this.size === 0 && this.pageNum != 1 && Math.floor(this.total/this.size)<this.pageNum) {
          /* Math.floor(that.total/that.size)为总页码
            总页码<当前页码表示 31时，删除最后一页最后一条，当前页码是4，删完后计算总页码为3，所以page--
            若在其他页码删除时，总是小于总页码的，所以page无需--
          */
          this.pageNum--;
        }
        this.filterMethod()
        this.$message({
          message: '已删除',
          type: 'success'
        });
      },
      /* 递归要删除的元素
      */
      delMethod (dataSource, id) {
        let index = dataSource.findIndex((val, index, arr)=> {
          if(val.id === id){
            return val.id === id
          }else if(val.children){
            this.delMethod(val.children, id);
          }
        })
        dataSource.splice(index, 1)
      },
      /* 用来计算table的height
       */
      async setTableHeight() {
        this.tableHeight = await utils.calHeightMethod(this.mainContentHeight, this.$refs.formSearchbar.$el.offsetHeight, this.$refs.normalTableFooter.$el.offsetHeight)
      }
    },
    mounted() {
      let that = this
      that.init();
      this.$nextTick(()=> {
        this.setTableHeight();

      })
    },
    computed: {
      ...mapState({
        mainContentHeight: state => state.resize.mainContentHeight,
      }),
    },

    watch: {
      // 可以监听路由信息
      $route(to, from, next) {

      },
      /* 监听main-content宽度变化
      */
      mainContentHeight(val) {
         this.setTableHeight();
      }
    },
    created() {

    }
  }
</script>
