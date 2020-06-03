<style lang="less">
  @import '~@/assets/less/common.less';
@import './normalTable.less';


</style>
<style scoped>
	.normalTable /deep/ .el-main{
		padding: 10px 0 0 0;
	}
</style>
<template>
  <el-container class='normalTable common'>
    <el-header class='normalTable-header' height='72' >
      <div ref="formSearchbar" style="text-align: right;margin-right: 20px;">
        <el-button type="primary" size="small" @click="dialogVisible = true">选择列</el-button>
      </div>
    </el-header>
    <el-main class='normalTable-main'>
      <el-table style="width: 100%" ref='tableRef' :data="filterSource" border stripe :height='tableHeight' highlight-current-row
        @selection-change='handleTableSelect' row-key="id"
        :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
          <el-table-column v-for="(item, index) in columns" :key="item.key" :prop="item.prop" :label="item.label" :min-width="item.minWidth" align="center"></el-table-column>
          <el-table-column fixed="right"  label="操作" width="150" align='center'>1
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

    <el-dialog :visible.sync="dialogVisible" width="800px" top='5vh' @close="dialogClose">
      <choosen-columns ref="choosenColumns"  @choosen="choosened"></choosen-columns>
    </el-dialog>

  </el-container>
</template>

<script>
  import { mapState } from 'vuex';
  import my from '@/assets/js/my'
  import utils from '@/assets/js/utils'
  import formSearchbar from '@/components/wzp/wzpHeader/formSearchbar'
  import pageFooter from '@/components/wzp/wzpFooter/pageFooter'

  import choosenColumns from './templates/choosenColumns'

  export default {
    components: {
      'page-footer': pageFooter,
      'form-searchbar': formSearchbar,
      'choosen-columns': choosenColumns
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
        columns: [],
        selectionNow: [],//表格当前选中
        tableHeight: 0,//表格高度
      }
    },
    methods: {
      init() {
        utils.POST({
          url: '/api/getChooseColumns',
          success: (res) => {
            this.columns = res.data;
            this.$store.dispatch("wzp/setPrimaryColumns", res.data)
            this.$nextTick(()=> {
              this.$refs.tableRef.doLayout();
              this.getData();
            })
          },
          error: () => {

          },
          finally: () => {

          }
        })
      },
      getData() {
        utils.POST({
          url: '/api/getChooseData',
          success: (res) => {
            this.dataSource = res.data;
            this.total = res.data.length;
            this.filterMethod();
          },
          error: () => {

          },
          finally: () => {

          }
        })
      },
      /* 弹窗关闭事件
      */
      dialogClose() {
        //this.$refs.choosenColumns.clear();
      },
      /* 选择列后显示列
      */
      choosened(arr) {
        this.columns = arr;
        this.$nextTick(()=> {
          this.$refs.tableRef.doLayout()
        })

        this.dialogVisible = false;
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
        //this.dialogVisible = true
      },
      /* table编辑
       */
      handleEdit (opts) {
        //this.fileVisible = true
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
        this.tableHeight = await utils.calHeightMethod(this.mainContentHeight, this.$refs.formSearchbar.offsetHeight, this.$refs.normalTableFooter.$el.offsetHeight)
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
        mainContentHeight: state=> state.resize.mainContentHeight,

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
