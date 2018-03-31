<template>
  <div>
    <i-button type="primary" @click='update' size="small">修改</i-button>
    <i-button type="primary" @click='addfile' size="small">提交</i-button>
    <i-button type="primary" @click='del' size="small">删除</i-button>
  </div>
</template>

<script>
    export default {
      props:['paperId','paperStatus'],
        name: "personal-button",
      methods:{
          addfile(){
            this.$axios({
              method:'get',
              url:'/paper/addPDF',
              data:{
                paperId:this.paperId
               // fileId:
              }
            })

          },
        update(){

        },
        del(){
            this.$axios.get('/paper/delete?paperId='+this.paperId)

        }
      }
    }
</script>

<style scoped>

</style>
