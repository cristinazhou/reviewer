<template>
    <div>
        <Button type="primary" @click.native='detail' size="small">详情</Button>
        <Button type="primary" size="small" @click.native="annotationAllDelete">删除所有批注</Button>
    </div>
</template>

<script>
  export default {
    name: 'ButtonMyAnnotation',
    props: [
      'fileId'
    ],
    methods: {
      detail(){
        let fileId = this.fileId;
        this.$router.push({
          name: 'PDFShow',
          query: {
            fileId: fileId
          }
        })
      },
      annotationAllDelete(){
        let fileId = this.fileId;
        let msg = this.$Message;
        let store = this.$store;
        this.$axios({
          method: 'post',
          url: '/',
          data: {
            fileId: fileId
          }
        }).then(function (response) {
          msg.success('该文件所有批注删除成功');
          store.commit('annotationAllDelete');
        })
      }
    }
  }
</script>

<style scoped>

</style>