<template>
  <div style="height:100%">
    <iframe :src='"/static/viewer/web/viewer.html?file=./testpdf/1707.04873"+".pdf"' width="100%" height="100%" scrolling="no"></iframe>
  </div>
</template>

<script>
  import store from '../vuex/store.js'
    export default {
        name: "show-p-d-f",
      methods: {
        getParams () {
          return store.getters.temp;
        }
      }
    }
</script>

<style scoped>

</style>
