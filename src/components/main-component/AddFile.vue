<template>
    <div>
        <form  class="file">

            <input type="file" @change="getFile($event)" />


            <button @click="submitForm($event)">上传</button>
        </form>
    </div>
</template>

<script>
  export default {

    data(){
      return {
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
          data: formData,})
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
<style scoped lang="scss" type="text/css">
  @import '../../style/input.scss';
</style>



