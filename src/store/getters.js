
const getters = {
  sidebar: state => state.app.sidebar,
  perRouter: state => state.permission.perRouter,
  device: state => state.app.device,//屏幕显示类型
}
export default getters
