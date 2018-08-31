<style scoped>
.layout{
    border: 1px solid #d7dde4;
    background: #f5f7f9;
    position: relative;
    border-radius: 4px;
    overflow: hidden;
}
.layout-logo{
    width: 100px;
    height: 30px;
    border-radius: 3px;
    float: left;
    position: relative;
    top: 15px;
    left: 20px;
}
.layout-nav{
    width: 600px;
    margin: 0 auto;
    margin-right: 20px;
}
</style>



<template>
<div class="layout">
        <Layout>
            <Header>
                <Menu mode="horizontal" theme="dark" active-name="1">
                    <div class="layout-logo"></div>
                    <div class="layout-nav">
                        <MenuItem name="1" v-on:click.native="importgz">
                            <Icon type="ios-navigate"></Icon>
                            管理工具
                        </MenuItem>
                        <MenuItem name="2" v-on:click.native="gosystemset">
                            <Icon type="ios-keypad"></Icon>
                            系统设置
                        </MenuItem>
                        <MenuItem name="3">
                            <Icon type="ios-analytics"></Icon>
                            预留菜单
                        </MenuItem>
                        <MenuItem name="4">
                            <Icon type="ios-paper"></Icon>
                            预留菜单
                        </MenuItem>
                        <MenuItem name="5" v-on:click.native="setout">
                            <Icon type="ios-paper"></Icon>
                            退出登录
                        </MenuItem>
                    </div>
                </Menu>
            </Header>
            <Layout>
                <Sider hide-trigger :style="{background: '#fff'}">
                    <Menu active-name="1-1" theme="light" width="auto" :open-names="['1']">
                        <Submenu name="1">
                            <template slot="title">
                                <Icon type="ios-navigate"></Icon>
                                薪酬导入
                            </template>
                            <MenuItem name="1-1" v-on:click.native="importgz">上传薪酬文件</MenuItem>
                            <MenuItem name="1-2" v-on:click.native="importtask">未处理导入信息</MenuItem>
                        </Submenu>
                        <Submenu name="2">
                            <template slot="title">
                                <Icon type="ios-navigate"></Icon>
                                发票登记
                            </template>
                            <MenuItem name="2-1" v-on:click.native="menu002001">发票台帐管理</MenuItem>
                            <MenuItem name="2-2" v-on:click.native="menu002002">发票自动查验</MenuItem>
                        </Submenu>
                    </Menu>
                </Sider>
                <Layout :style="{padding: '0 24px 24px'}">
                    <Breadcrumb :style="{margin: '24px 0'}">
                        <BreadcrumbItem>小饭盒</BreadcrumbItem>
                    </Breadcrumb>
                    <Content :style="{padding: '24px', minHeight: '280px', background: '#fff'}">
                    <router-view></router-view>
                    </Content>
                </Layout>
            </Layout>
        </Layout>
    </div>



</template>


<script>

export default {
  methods:{
   setout(){
   sessionStorage.clear();
   window.location.href='/#/login';
   },
   gosystemset(){
   window.location.href='/#/adminmain/adminsystem';
   },
   importgz(){
   window.location.href='/#/adminmain';
   },
   importtask(){
   window.location.href='/#/adminmain/importtask';
   },
   menu002001(){
   window.location.href='/#/adminmain/menu002001';
   },
   menu002002(){
   window.location.href='/#/adminmain/menu002002';
   }
   }
  }
</script>
