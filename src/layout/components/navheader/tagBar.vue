<style lang="less">
  @import "~@/assets/less/common.less";
</style>
<style scoped>
  .scroll-container /deep/ .el-scrollbar__wrap{
    height: 50px;
  }
</style>
<template>
  <div class="tagbar">
    <el-scrollbar ref="scrollTag" :vertical="false" class="scroll-container" @wheel.native.prevent="handleScroll">
      <router-link v-for="tag in tagViews" ref="tag" :key="tag.name" :to="{ path: tag.path, fullPath: tag.fullPath }" tag="span" class="each-tag"
        :class="isActive(tag)?'activeClass':''" @click.native="tagClick(tag)">
        {{ tag.title }}
        <span v-show="!tag.meta.fixed" class="el-icon-close each-icon" @click.prevent.stop="closeSelectedTag(tag)" />
      </router-link>
    </el-scrollbar>
    <div class="tagbar-close">
      <el-dropdown @command="handleCommand" trigger="click">
        <el-button  size="small" style="text-align: right;">
          关闭标签<i class="el-icon-arrow-down el-icon--right"></i>
        </el-button>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="other">关闭其他</el-dropdown-item>
          <el-dropdown-item command="all">关闭全部</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>

    </div>
  </div>
</template>

<script>
  import {
    mapState
  } from 'vuex';
  import path from 'path';
  import my from '@/assets/js/my';
  import utils from '@/assets/js/utils';

  const tagAndTagSpacing = 4;
  export default {
    props: {

    },
    components: {

    },
    data() {
      return {

      }
    },
    methods: {
      /* 初始化是tagbar要添加router中meta为fixed的tag固定显示,目前是只有home
       */
      init() {
        const tags = this.filterTags(this.perRouter);
        for (let tag of tags) {
          if (tag.name) { //必须存在name
            this.$store.dispatch("app/addTagsView", tag);
          }
        }
      },
      /* 过滤出meta为fixed的tag
       */
      filterTags(routes, basePath) {
        let tags = [];
        routes.forEach((route) => {
          if (route.meta && route.meta.fixed) {
            let tagPath = path.resolve(basePath ? basePath : "/", route.path)
            tags.push({
              fullPath: tagPath,
              path: tagPath,
              name: route.name,
              meta: { ...route.meta
              }
            })
          }
          if (route.children) {
            /* 这里basePath要预防有二级以上路由存在,不能直接传route.path,否则到达三级路由时得到的tagPath只会是本级和前一级的path的resolve
              一级:/wzp,二级: tableStyle, 三级: normal-table
              直接route.path只会得到/tableStyle/normal-table
            */
            const tempTags = this.filterTags(route.children, path.resolve(basePath ? basePath : "/", route.path))
            if (tempTags.length >= 1) {
              tags = [...tags, ...tempTags];
            }
          }
        })
        return tags
      },
      /* 添加tag
      */
      addTags() {
        if(this.$route.name){
          this.$store.dispatch("app/addTagsView", this.$route).then(()=> {
            //确保先add了tag,否则该方法$route.path和router-link的tag中的path对应不上
            this.moveToCurrentTag();//监听路由切换去操作tag
          });
        }
        return false
      },
      tagClick(tag) {
        this.$router.push({
          path: tag.path
        })
      },
      closeSelectedTag(tag) {
        this.$store.dispatch("app/deleteTag", {tag, nowPath: this.$route.path}).then((res)=> {
          if(res){
            this.isActive(res);
            this.$router.push({
              path: res.path
            })
          }

        })
      },
      isActive(tag) {
        return tag.path === this.$route.path
      },
      /* tag滚轮事件
      */
      handleScroll(e) {
        const eventDelta = e.wheelDelta || -e.deltaY * 40
        const $scrollWrapper = this.scrollWrapper;//获得el-scrollbar__wrap的html
        $scrollWrapper.scrollLeft = $scrollWrapper.scrollLeft + eventDelta / 4;
      },
      /* 监听路由切换
          1. 跳转页面
          2. 从ref获得的tags中找到对应的tag,再去moveToTarget()中判断tag位置
      */
      moveToCurrentTag() {
        const tags = this.$refs.tag;//获得所有tag
        this.$router.push({
          path: this.$route.path
        })
        for(let item of tags){
            if(this.$route.path === item.to.path){
              this.moveToTarget(item)
            }
        }
      },
      /* 继续按tag显示位置
      */
      moveToTarget(currentTag) {
        const $container = this.$refs.scrollTag.$el;//获得el-scrollbar组件
        const $containerWidth = $container.offsetWidth//el-scrollbar组件宽度
        const $scrollWrapper = this.scrollWrapper;//从computed中获得el-scrollbar下wrap组件
        const tagList = this.$refs.tag;//获得tag的列表

        let firstTag = null
        let lastTag = null
        // 赋值firstTag,lastTag
        if (tagList.length > 0) {
          firstTag = tagList[0]
          lastTag = tagList[tagList.length - 1]
        }
        if (firstTag === currentTag) {
          //若是选中tag是第一个(首页),left为0
          $scrollWrapper.scrollLeft = 0;
        } else if (lastTag === currentTag) {
          /* 选中tag是最后一个,left为
            1. 不超出 $scrollWrapper.scrollWidth === $containerWidth,所以scrollLeft为0
            2. 超出时,$scrollWrapper.scrollWidth是总的tags宽度(不要看页面上的box内数值),$containerWidth是固定显示的宽度,所以相减能得出多余的left
          */
          $scrollWrapper.scrollLeft = $scrollWrapper.scrollWidth - $containerWidth
        } else {
          // find preTag and nextTag
          const currentIndex = tagList.findIndex(item => item === currentTag);//找到tag在tags中index
          const prevTag = tagList[currentIndex - 1];//赋值它前一个和后一个tag
          const nextTag = tagList[currentIndex + 1];
          //后tag的left + 后tag的width + 常量
          const afterNextTagOffsetLeft = nextTag.$el.offsetLeft + nextTag.$el.offsetWidth/2 + tagAndTagSpacing;//next显示一半即可
          //前tag的left - 常量
          const beforePrevTagOffsetLeft = prevTag.$el.offsetLeft - tagAndTagSpacing
          if (afterNextTagOffsetLeft > $scrollWrapper.scrollLeft + $containerWidth) {
            /* 若afterNextTagOffsetLeft > scrollWrapper的left + 固定显示的宽度
               那就以选中tag的nextTag作为显示的最后一项,$scrollWrapper的left以afterNextTagOffsetLeft - 固定宽度 显示
            */
            $scrollWrapper.scrollLeft = afterNextTagOffsetLeft - $containerWidth
          } else if (beforePrevTagOffsetLeft < $scrollWrapper.scrollLeft) {
            /* beforePrevTagOffsetLeft < $scrollWrapper的left
              就以选中tag的前一项置为固定显示的第一项进行显示
            */
            $scrollWrapper.scrollLeft = beforePrevTagOffsetLeft
          }
        }
      },
      /* dropdown关闭标签
      */
      handleCommand(command) {
        if(command === "other"){
          //关闭其他
          this.$store.dispatch("app/closeOtherTags", this.$route.path)
        }else if(command === "all"){
          //关闭全部
          this.$store.dispatch("app/closeAllTags").then(()=> {
            my.c(this.tagViews,'this.tagViews')
            this.$router.push({
              path: this.tagViews[0].path
            })
          });
        }
      }
    },
    mounted() {
      this.init();
      this.addTags();
    },
    computed: {
      ...mapState({
        tagViews: state => state.app.tagViews,
        perRouter: state => state.permission.perRouter,
      }),
      /* 返回el-scrollbar__wrap的html
      */
      scrollWrapper() {
        return this.$refs.scrollTag.$refs.wrap
      }
    },
    watch: {
      //可以监听路由信息
      $route(to, from, next) {
        this.addTags();
      }
    },
    created() {

    },
  }
</script>
