<style lang="less">
  @import "~@/assets/less/common.less";
  @import "./user.less";
</style>
<style scoped>
  .user /deep/ .user-main{
    padding: 0;
  }
</style>
<template>
  <div class="user">
    <el-container class='user common'>
      <el-header class='user-header' height='72'>
        <form-searchbar ref="formSearchbar"></form-searchbar>
      </el-header>
      <el-main class='user-main'>
        <el-table style="width: 100%" ref='tableRef' :data="filterSource" border stripe :height='tableHeight' class="dataTable"
          highlight-current-row @selection-change='handleTableSelect' row-key="id" :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
          <el-table-column reserve-selection type="selection" width="55" align="center">
          </el-table-column>
          <el-table-column prop="username" label="姓名" width="200" align="center">
          </el-table-column>
          <el-table-column prop="age" label="年龄" width="150" align="center">
          </el-table-column>
          <el-table-column prop="dept" label="部门" align="center">
          </el-table-column>
          <el-table-column prop="mobile" label="手机" width="180" align="center">
          </el-table-column>
          <el-table-column prop="email" label="邮箱" width="180" align="center">
          </el-table-column>
          <el-table-column prop="beginDate" label="开始时间" align="center">
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="150" align='center'>
            <template slot-scope="scope">
              <el-button type="primary" icon="el-icon-tickets" circle @click='handleDetail(scope)'></el-button>
              <el-button type="warning" icon="el-icon-edit" circle @click='handleEdit(scope)'></el-button>
              <el-popconfirm title="确定删除吗" placement='top' popper-class='user-main-popconfirm' @onConfirm='handleDelete(scope)'>
                <el-button type="danger" icon="el-icon-delete" circle slot="reference"></el-button>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
      </el-main>
      <el-footer class='user-footer' ref="userFooter" height="80px">
        <el-pagination background layout='total, prev, pager, next, sizes, jumper' :total='total' :current-page='page'
          :page-size='limit' :page-sizes='pageSizeOpts' @size-change='sizeChange' @current-change='currentChange'
          @prev-click='prevClick' @next-click='nextClick'>
        </el-pagination>
      </el-footer>
    </el-container>
  </div>
</template>

<script>
  import {
    mapState,
  } from 'vuex';
  import my from '@/assets/js/my';
  import utils from '@/assets/js/utils';
  import formSearchbar from '@/components/wzp/wzpHeader/formSearchbar';
  import pageFooter from '@/components/wzp/wzpFooter/pageFooter';
	
  export default {
    props: {

    },
    components: {
      'page-footer': pageFooter,
      'form-searchbar': formSearchbar
    },
    data() {
      return {
        total: 0,
        page: 1,
        limit: 10,
        pageSizeOpts: [10, 20, 30],
        dataSource: [],
        filterSource: [],
        fileVisible: false,
        selectionNow: [], //表格当前选中
        tableHeight: 0, //表格高度
      }
    },
    methods: {
      init() {
        utils.POST({
          url: '/api/getUserList',
          success: (res) => {
            this.dataSource = res.data;
            this.total = this.dataSource.length;
            this.filterMethod()
          },
          error: () => {

          },
          finally: () => {

          }
        })
      },
      //****************************** 分页 *******************************************
      filterMethod() {
        this.filterSource = this.dataSource.slice((this.page - 1) * this.limit, this.page * this.limit);
      },
      currentChange(page) {
        this.page = page;
        this.filterMethod()
      },
      sizeChange(size) {
        this.limit = size
        this.filterMethod()
      },
      prevClick(page) {
        this.filterMethod()
      },
      nextClick(page) {
        this.filterMethod()
      },

      //******************** table *******************************
      /* table序号计算
       */
      indexMethod(index) {
        return index + (this.page - 1) * this.limit + 1
      },
      /* tabel select
       */
      handleTableSelect(val) {
        this.selectionNow = val
      },
      handleDetail(scope) {
        
      },
      /* table编辑
       */
      handleEdit(opts) {
       
      },
      /* 删除
       */
      handleDelete(scope) {
        this.delMethod(this.dataSource, scope.row.id)
        this.total = this.dataSource.length
        if (this.total % this.size === 0 && this.page != 1 && Math.floor(this.total / this.size) < this.page) {
          this.page--;
        }
        this.filterMethod()
        this.$message({
          message: '已删除',
          type: 'success'
        });
      },
      /* 递归要删除的元素
       */
      delMethod(dataSource, id) {
        let index = dataSource.findIndex((val, index, arr) => {
          if (val.id === id) {
            return val.id === id
          } else if (val.children) {
            this.delMethod(val.children, id);
          }
        })
        dataSource.splice(index, 1)
      },
      /* 用来计算table的height
       */
      async setTableHeight() {
        this.tableHeight = await utils.calHeightMethod(this.mainContentHeight, this.$refs.formSearchbar.$el.offsetHeight,
          this.$refs.userFooter.$el.offsetHeight)
      }

    },
    mounted() {
      let that = this
      that.init();
      this.$nextTick(() => {
        this.setTableHeight();
      })

    },
    computed: {
      ...mapState({
        mainContentHeight: state => state.resize.mainContentHeight,
      }),
    },
    watch: {
      //可以监听路由信息
      $route(to, from, next) {

      },
      /* 监听main-content宽度变化
       */
      mainContentHeight(val) {
        this.setTableHeight();
      }
    },
    created() {

    },
  }
</script>
