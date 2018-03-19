<template>
    <div>
        <form>
            <input type="text" value="" v-model="name" placeholder="请输入用户名">
            <!--<input type="text" value="" v-model="age" placeholder="请输入年龄">-->
            <input type="file" @change="getFile($event)">
            <button @click="submitForm($event)">提交</button>
        </form>
    </div>
</template>

<script>
  export default {

    data(){
      return {
        name: '',
        age: '',
        file: ''
      };
    },
    methods: {
      getFile(event) {
        this.file = event.target.files[0];
      },
      submitForm(event) {
        event.preventDefault();
        let file = this.file;
        let formData = new FormData();
        formData.append('file', file);
//        formData.append('Content-Type', 'application/json;charset=UTF-8');

        this.$axios({
          method: 'post',
          url: '/file/upload',
          data: formData,
        }).then(function (response) {
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



