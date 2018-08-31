<template>
<div>
<Upload
        :before-upload="handlebeforeUpload"
        :format="['xls','xlsx']"
        multiple
        type="drag"
        action="//file.com">
        <div style="padding: 20px 0">
            <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
            <p>点击或者拖拽上传</p>
        </div>
    </Upload>
<div>
        <Row>
        <Col>
        <Button v-on:click="importdata">确定并查看工资信息</Button>
        <Button v-on:click="uploaddata">确定并上传工资信息</Button>
        <DatePicker type="month" placeholder="选择工资归属月份" style="width: 200px" @on-change="getDate"></DatePicker>
        </Col>
        </Row>
        <Row style="margin-top:30px;">
        <Col>
        <v-table
            is-horizontal-resize
            style="width:100%"
            :height="320"
            :columns="columns"
            :table-data="tableData"
            :is-loading="isLoading"
            row-hover-color="#eee"
            row-click-color="#edf7ff"
            :cell-edit-done="cellEditDone"
            :select-change="delSelect"
            >
           </v-table>
        </Col>
        </Row>
</div>
</div>
</template>
<script>
var socket;
var cache= new Array();
    export default {
        data () {
                return {
                    isLoading: false,
                    gzinfortable: false,
                    tableData:'',
                    columns:'',
                    tmp:'',
                    dateValue:null//日期
                }
           },
        methods: {
           handlebeforeUpload(file){
                this.isLoading = true;
                if (!file.size) {
		           alert('请上传文件！');
		           return;
	               };
                var fileInfo={
                   "user":sessionStorage.onlineuser,
			       "name":file.name,
			       "size":file.size,
	               };
                var serviceip=this.baseUrl()+"/managertool/receiveexcel";
	            openSocket(serviceip);
	            setTimeout(function(){
	               fileUpload(file,fileInfo);
	               setTimeout(function(){
		                  this.$options.methods.importdata();
		                }, 1000);
	               }, 1000);
           },
           cellEditDone(newValue,oldValue,rowIndex,rowData,field){
                this.tableData[rowIndex][field] = newValue;
                // 接下来处理你的业务逻辑，数据持久化等...
            },
           importdata(){
                this.isLoading = false;
	            this.columns=cache[0];
                this.tableData=cache[1];
                console.info(cache);
           },
           delSelect(selection,rowData){
                alert(selection.length);
                console.info(selection);
                for(var i=0; i<selection.length;i++){
                   for(var j=0; j<this.tableData.length;j++){
                       if(JSON.stringify(selection[i])==JSON.stringify(this.tableData[j])){
                           this.tableData.splice(j,1) 
                       }
                   } 
                }
           },
           getDate(month){
               this.dateValue = month;
           },
           uploaddata(){
               var uploadinfo={};
               uploadinfo['uploader']=sessionStorage.onlineuser;
               uploadinfo['date']=this.dateValue;
               uploadinfo['xmb']=sessionStorage.userlimit;
               uploadinfo['datainfo']=this.tableData;
               cache= new Array();
               this.tableData='';
               this.columns='';
               this.dateValue=null;
               var serviceip=this.baseUrl()+"/managertool/receiveexcel";
               openSocket(serviceip);
               setTimeout(function(){
                 uploadInfor(uploadinfo);
                 }, 1000);
           }

        }
}
function fileUpload(file,info){
    var returndata= new Array();
    var columns = new Array();
    columns.push({width: 60,titleAlign: 'center',columnAlign:'center',type: 'selection'})//开启多选
    var tdatas= new Array();
	send(JSON.stringify(info));
	socket.onmessage=function(evt){
    var myreceiveData = JSON.parse(evt.data);
    if(myreceiveData.hasOwnProperty("size")){
      var startbyte=parseInt(myreceiveData.size);
      var stopbyte=startbyte+file.size;
      if(startbyte<=file.size && stopbyte>=file.size){
          stopbyte=file.size;
        };
      if(startbyte>=file.size && stopbyte>=file.size){
          stopbyte=file.size;
        };
      if(startbyte == stopbyte){
			  alert("文件上传成功!");
		   }else {
			  readBlob(file,startbyte,stopbyte);
		  };
	  return 0;
      //window.location.href='/#/adminmain';
      }
    else if(myreceiveData.hasOwnProperty("log")){
        alert(myreceiveData['log']);
    }
    else{
        var tmpreceiveData={};
        //开始将同一个人的sheet表数据连接
        for(var key in myreceiveData){
           for(var ikey in myreceiveData){
               if(myreceiveData[key]['姓名']==myreceiveData[ikey]['姓名']){
                  tmpreceiveData[key]=myreceiveData[key];
                  //alert(JSON.stringify(tmpreceiveData));
                  for(var valuekey  in myreceiveData[ikey]){
                      if(valuekey!='姓名'){
                          if(valuekey in tmpreceiveData[key]){
                              if(tmpreceiveData[key][valuekey] != ''){
                              tmpreceiveData[key][valuekey]=parseFloat(tmpreceiveData[key][valuekey]).toFixed(2).toString();
                              }
                              }
                          else{tmpreceiveData[key][valuekey]='';}
                      }
                  }
               }
           }
        }
        //比较取最长的作为表头数据
        var numbtli=0;
        var numbtlj=0;
        for(var key in tmpreceiveData){
           numbtli=0;
           for(var ikey in tmpreceiveData[key]){
              numbtli++;
           }
           if(numbtli>numbtlj){numbtlj=numbtli;}
        }
        //找到最长作为表头设置表头
        for(var item in tmpreceiveData){
          var tmp=0;
          numbtli=0;
          for(var ikey in tmpreceiveData[item]){
              numbtli++;
           }
          if(numbtli==numbtlj){ 
             for(var jitem in tmpreceiveData[item]){
               var column = {};
               column['field']=jitem;
               column['title']=jitem;
               column['width']=80;
               column['titleAlign']='center';
               column['isEdit']=true;
               column['formatter']=function (rowData,rowIndex,pagingIndex,field) {
                                   return `<span class='cell-edit-color'>${rowData[field]}</span>`};
               column['isResize']=true;
               columns.push(column);
               tmp=tmp+1;
             }
          returndata.push(columns);
          break;
          }
        }
        //设置表数据
        for(var item in tmpreceiveData){
          var tmp=0;
          var tdata = {};
          for(var jitem in tmpreceiveData[item]){
             tdata[jitem]=tmpreceiveData[item][jitem];
             tmp=tmp+1;
          }
          tdatas.push(tdata);
        }
        returndata.push(tdatas);
        cache=returndata;
        //alert(JSON.stringify(cache));
        console.log(cache);
        return returndata;
      }
    }
};

function openSocket(url){
	if(!window.WebSocket){
		window.WebSocket=window.MozWebSocket;
	} 
	if(window.WebSocket){
		socket= new WebSocket(url);
		socket.onopen=onOpen;
		socket.onclose=onClose;
	    }else {
		alert("your browser does not support websocket");
	    }
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
function readBlob(file,opt_startByte, opt_stopByte) {
	if (!file.size) {
		alert('Please select a file!');
		return;
	}
	var start = opt_startByte || 0;
	var stop = opt_stopByte || file.size - 1;
	var reader = new FileReader();
	if (file.webkitSlice) {
		var blob = file.webkitSlice(start, stop);
	} else if (file.mozSlice) {
		var blob = file.mozSlice(start, stop);
	} else if (file.slice) {
		var blob = file.slice(start, stop);
	}
	reader.readAsArrayBuffer(blob);
	reader.onloadend = function(evt) {
		if (evt.target.readyState == FileReader.DONE) { // DONE == 2
			send(reader.result);
		}
	};
};
function uploadInfor(infor){
     send(JSON.stringify(infor));
     socket.onmessage=function(evt){
        alert('上传成功');
     }
}
</script>

