<template>
    <div>
        <Button type="primary" @click.native='detail' size="small">详情</Button>
        <Button type="primary" size="small">删除批注</Button>
    </div>
</template>

<script>
  export default {
    name: 'ButtonMyAnnotation',
    props: [
      'paperId',
      'fileId',
//      'annotationId'
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