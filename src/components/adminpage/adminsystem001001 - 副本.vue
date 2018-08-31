<template>
<div>
<Row>
  <Col span="12" style="margin-top:30px">
  当前使用项目部：{{model13}}
  </Col>
</Row>
<Row>
  <Col span="12" style="margin-top:30px">
  <Select
                v-model="model13"
                @on-change="setSession"
                filterable
                remote
                :remote-method="remoteMethod1"
                :loading="loading1">
                <Option v-for="(option, index) in options1" :value="option.value" :key="index">{{option.label}}</Option>
            </Select>
  </Col>
</Row>
</div>
</template>

<script>
var socket;
var selectdata=[];
    export default {
        data () {
            return {
                model13: sessionStorage.userlimit,
                loading1: false,
                options1: [],
                list: [],
            }
        },
        methods: {
            remoteMethod1 (query) {
                var infoconn={
                     "user":sessionStorage.onlineuser
                    };
                var serviceip=this.baseUrl()+"/sysset/limit";
                openSocket(serviceip);
                setTimeout(function(){
                   getxmb(infoconn);
                   }, 1000);
                this.list=selectdata[1];
                if (query !== '') {
                    this.loading1 = true;
                    setTimeout(() => {
                        this.loading1 = false;
                        const list = this.list.map(item => {
                            return {
                                value: item,
                                label: item
                            };
                        });
                        this.options1 = list.filter(item => item.label.toLowerCase().indexOf(query.toLowerCase()) > -1);
                    }, 200);
                } else {
                    this.options1 = [];
                }
            },
            setSession(){
                 console.log(selectdata)
                 for(var i=0;i<this.list.length;i++){
                     if(this.list[i].toString()==this.model13.toString()){
                        sessionStorage.userlimit=selectdata[0][i];
                     }
                 }
                //sessionStorage.userlimit=selectdata[0][i];
            }
        }
    }
function openSocket(url){
  if(!window.WebSocket){
    window.WebSocket=window.MozWebSocket;
  } 
  if(window.WebSocket){
    socket= new WebSocket(url);
    socket.onopen=onOpen;
    socket.onclose=onClose;
    }
    else{
       alert("your browser does not support websocket");}
};
function onOpen(event){
  console.log("websocket is opened");
};
function onClose(event){
  console.log("websocket is closed");
};
function send(message){
  if(!window.WebSocket){
    return;
  }
  if(socket.readyState==WebSocket.OPEN){
    socket.send(message);
  }else{
    console.log("the socket is not open");
  }
};
function getxmb(info){
  var list=[];
  var idlist=[];
  selectdata=[];
  send(JSON.stringify(info));
  socket.onmessage=function(evt){
        var myreceiveData = JSON.parse(evt.data);
        for(var i=0;i<myreceiveData.length;i++){
            for(var j=0;j<myreceiveData[i].length;j++){
                if(j%2!=0){
                   list.push(myreceiveData[i][j]);
                   idlist.push(myreceiveData[i][j-1]);
                }
            }
        selectdata.push(idlist);
        selectdata.push(list);
        }
    }
};
</script>
