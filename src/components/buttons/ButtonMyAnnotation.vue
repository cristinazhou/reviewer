<template>
    <div>
        <Button type="primary" @click.native='detail' size="small">详情</Button>
        <Button type="primary" size="small" @click.native="annotationAllDelete">删除批注</Button>
        <!--删除该文件所有批注-->
    </div>
</template>

<script>
  export default {
    name: 'ButtonMyAnnotation',
    props: [
      'paperId',
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
      }
    }
  }
</script>

<style scoped>

</style>