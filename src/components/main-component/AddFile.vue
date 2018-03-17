<template>
    <Upload action="http://localhost:8080/file/upload">
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
        token: localStorage.getItem('token'),
      }
    },
    computed: {
      file: function () {
        return document.getElementsByTagName("Upload").name;
      },
    },
    methods: {},
    created() {
      document.cookie = 'X-CSRF-TOKEN' + this.token;
    }
  };


</script>
