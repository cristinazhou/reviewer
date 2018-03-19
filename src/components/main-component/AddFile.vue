<template>

<div>
<form>
  <input type="text" value="" v-model="name" placeholder="请输入用户名">
  <!--<input type="text" value="" v-model="age" placeholder="请输入年龄">-->
  <input type="file"  @change="getFile($event)">
  <button @click="submitForm($event)">提交</button>


</form>
</div>
</template>

<script>
  export default {

    data(){
      return{
        name: '',
        age: '',
        file: ''
      };
      },
      methods: {
        getFile(event) {
          this.file = event.target.files[0];
          //alert(this.file);
        },
        submitForm(event) {
          // alert(this.file)
          event.preventDefault();
          let formData = new FormData();
           formData.append('name', this.name);
          // formData.append('age', this.age);
          formData.append('file', this.file);
           alert(formData.file)
          // let config = {
          //   headers: {
          //     'Content-Type': 'multipart/form-data'
          //   }
          // }

          this.$axios({
            method: 'post',
            url: '/file/upload',


            data:{
              file:formData,
              "Content-Type": 'application/json;charset=UTF-8'  ,
              "X-Token":localStorage.getItem("token")
          }})
            .then(function (response) {
              alert(111)
              if (response.status === 200) {
                alert(111)
                /*这里做处理*/
              }
            })
        }
      }


  };
</script>



