<template>
<div>
<div id='particles' class="header">
<vue-particles 
    color="#fff" 
    :particleOpacity="0.7" 
    :particlesNumber="80" 
    shapeType="circle" 
    :particleSize="2" 
    linesColor="#fff" 
    :linesWidth="0" 
    :lineLinked="true" 
    :lineOpacity="0.4" 
    :linesDistance="80" 
    :moveSpeed="1" 
    :hoverEffect="true" 
    hoverMode="gray" 
    :clickEffect="true" 
    clickMode="push" 
    class="lizi" > 
    </vue-particles>
</div>
<div style="position:absolute; margin-left:70%;margin-top:10%;width:300px;height:550px;" id='loginbox'>
<Tabs value="loginpane_1">
<TabPane label="用户名登录" name="loginpane_1">
    <div style="margin-left:30px;">
    <div>
        <Input prefix="ios-contact" placeholder="请输入手机号、用户名" style="width: auto"  clearable  v-model="user" />
        <br>
        <br>
    </div>
    <div>
        <Input type="password" prefix="ios-key" placeholder="请输入密码" style="width: auto" v-model="pwd"  />
        <br>
        <br>
    </div>
    <div>
        <Button shape="circle" v-on:click="loginIn" >登录</Button>
        <br>
        <br>
    </div>
    </div>
</TabPane>
<TabPane label="微信登录" name="loginpane_2">
</TabPane>
</Tabs>
</div>
</div>
</template>

<script>
import router from '@/router'
export default {
  name: 'MemberLoginpage',
  data:{
  user:'',
  pwd:''
  },
  methods:{
   loginIn:function(){
    var checkdata={};
    checkdata.user=this.user;
    checkdata.pwd=this.pwd;
    var temp=[];
    temp.push(checkdata);
    var packdata=JSON.stringify(temp);
    if ("WebSocket" in window) {
     var serviceip=this.baseUrl()+"/login";
     var ws= new WebSocket(serviceip);
     ws.onopen=function(){ws.send(packdata);};
     ws.onmessage=function(evt){
     var mysessionData = JSON.parse(evt.data);
     sessionStorage.onlineuser=mysessionData.onlineuser;
     sessionStorage.time=mysessionData.time;
     sessionStorage.mininame=mysessionData.mininame;
     sessionStorage.userlimit=mysessionData.userlimit;
     sessionStorage.userlevel=mysessionData.level;
     window.location.href='/#/adminmain';
         };
       }
     }
    }
  }
</script>
<style>
#particles{
  position: absolute; 
  top: 0; 
  right: 0; 
  bottom: 0; 
  left: 0;
  width: 100%;
  height: 100%;
  background-image: radial-gradient(rgba(4,4,3,0.5),rgba(4,4,4,4)); 
  background-position: 50% 50%;
}
</style>





