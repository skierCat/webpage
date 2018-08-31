<template>
<div></div>
</template>


<script>
if(sessionStorage.onlineuser){
	window.location.href='/#/adminmain';
}
else{
	window.location.href='/#/login';
}
</script>
