import store from '@/store/store';
import my from '@/assets/js/my';

const { body } = document;
const WIDTH = 992; // Bootstrap定义的手机判断宽度
const SMALLWEB = 1366; //小屏

export default {
  data() {
    return {

    }
  },
  watch: {
    $route(route) {
      if (this.device === 'mobile' && this.sidebar.opened) {
        //store.dispatch('app/closeSideBar')
      }
    }
  },
  beforeMount() {
    //监听屏幕宽度变化
    window.addEventListener('resize', this.resizeHandler)
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.resizeHandler)
  },
  mounted() {
    //页面书信时匹配宽度
    this.resizeHandler();
  },
  methods: {
    isType() {
      const rect = body.getBoundingClientRect();
      if((rect.width-1) < SMALLWEB && (rect.width-1)> WIDTH){
        return my.smallweb;
      }else if((rect.width-1) < WIDTH){
        return my.mobile
      }else{
        return my.web;
      }
    },
    resizeHandler() {
      if (!document.hidden) {//判断页面是否正在显示
        const isType = this.isType();//判断屏幕响应宽度范围
        setTimeout(()=> {
          store.dispatch('app/toggleDevice', isType);
        }, 0)
      }
    }
  }
}
