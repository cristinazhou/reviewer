<template>
  <div style="height:100%;width:100%;display:table">
    <div style="float: left;width:20%;display: table-cell;height:100%">
      <Table :columns="columns" :data="data"></Table>

      <i-button>添加</i-button>

    </div>
  <div style="float:right;display:table-cell;width:80%;height:100%">
    <iframe :src='"/static/viewer/web/viewer.html?file=./testpdf/1707.04873"+".pdf"' width="100%" height="100%" scrolling="no"></iframe>
  </div>
  </div>
</template>

<script>
  import store from '../vuex/store.js'
    export default {
        name: "show-p-d-f",
      data(){
          return{
        columns:[{
          title:'原文',
          key:'word'
        },
          {
            title:'批注',
            key:'comment'
          }] ,
            data:[
              {
                word:1,
                comment:2
              }
            ]


      };
          },

      methods: {
        getParams () {
          return store.getters.temp;
        }
      }
    }
</script>

<style scoped>

</style>
