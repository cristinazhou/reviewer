<template>
    <router-view id="app"></router-view>
</template>

<script>
  export default {
    name: 'App',
    computed: {
      responseFailed(){
        return this.$store.state.app.responseFailed;
      },
      responseErrMsg () {
        return this.$store.state.app.responseErrMsg;
      }
    },
    watch: {
      responseFailed(val){
        if (val !== false) {
          this.$Message.error('请求无效：' + val);
          this.$store.commit('responseFailed', false);
        }
      },
      responseErrMsg(val) {
        if (val.length > 0) {
          this.$Message.error('操作失败' + val);
          this.$store.commit('responseErrMsg', '');
        }
      }
    },
  }
</script>
<style type="text/scss" lang="scss">
    @import "~@/style/normalize.scss";
</style>
