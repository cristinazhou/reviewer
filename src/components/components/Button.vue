<template>
    <div>
        <i-button type="primary" @click='list' size="small">详情</i-button>
        <i-button type="primary" size="small">查看</i-button>
    </div>
</template>

<script>
  export default {
    name: "button",
    methods: {
      list(){
        this.$router.push({path: '/showpdf'})

      }
    }
  }
</script>

<style scoped>

</style>
