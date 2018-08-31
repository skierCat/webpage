import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import MemberMainpage from '@/components/Member_Mainpage'
import MemberLoginpage from '@/components/Member_Loginpage'
import MemberAdminmain from '@/components/Member_Adminmain'
import AdminHome from '@/components/adminpage/adminhome'
import AdminSystem001 from '@/components/adminpage/adminsystem001001'
import AdminManagertool001 from '@/components/managertool/xinchouguanli/importtask'
import AdminManagermenu002001 from '@/components/managertool/menu002/menu002001'
import AdminManagermenu002002 from '@/components/managertool/menu002/menu002002'
Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/login',
      name: 'MemberLoginpage',
      component: MemberLoginpage
    },
    {
      path: '/admin',
      name: 'MemberMainpage',
      component: MemberMainpage
    },
    {
      path: '/adminmain',
      component: MemberAdminmain,
      children:[
      {path:'',component:AdminHome},
      {path:'adminsystem',component:AdminSystem001},
      {path:'importtask',component:AdminManagertool001},
      {path:'menu002001',component:AdminManagermenu002001},
      {path:'menu002002',component:AdminManagermenu002002}
      ]
    }
  ]
})
