<template>
    <div>
        <Button type="primary" @click='list' size="small">详情</Button>
        <Button type="primary" size="small">删除批注</Button>
    </div>
</template>

<script>
  export default {
    name: 'ButtonMyAnnotation',
    props:['paperId', 'annotationId'],
    methods: {
      list(){
        this.$router.push({name: 'PDFShow'})
      }
    }
  }
</script>

<style scoped>

</style>