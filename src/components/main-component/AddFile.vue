<template>
  <Upload action="/file/upload" headers="">
    <div style="padding: 20px 0">
      <Icon type="ios-cloud-upload" size="60" style="color: #3399ff"></Icon>
      <p>Click or drag files here to upload</p>
    </div>
  </Upload>
</template>

<script>
 export default {
   data(){
     return {
     }
   },
   computed:{
     file:function(){
       return document.getElementsByTagName("Upload").name;
     },
     token:function(){
       return localStorage.getItem("token");
     }

   },
   methods:{
   }
 };


</script>
