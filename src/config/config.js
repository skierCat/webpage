export default {
  install(Vue,options)
  {

    Vue.prototype.baseUrl = function () {
       return 'ws://hoontu.iask.in';
    };
    Vue.prototype.getTitle = {
      title:'',
      isBack: true,
      isAdd:  false,
    }
  }
}
