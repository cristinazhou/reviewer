<template>
    <div>
        <Button type="primary" size="small" @click.native="paperUpdate">提交</Button>
        <Button type="primary" size="small" @click.native="paperDelete">删除</Button>
        <Button type="primary" size="small" @click.native="paperFileRender">所有文件</Button>
    </div>
</template>
<script>
  import ModalFile from '@/components/modals/ModalFile.vue'
  export default {
    props: [
      'paperId',
      'paperStatus'
    ],
    components: {
      ModalFile: ModalFile
    },
    data(){
      return {
        modalFile: false
      }
    },
    methods: {
      paperFileRender(){
        let paperId = this.paperId;
        this.$Modal.confirm({
          render: function (h) {
            return h(ModalFile, {
              props: {
                paperId: paperId,
                url: '/paper/user_list'
              }
            })
          }
        })
      },
      paperUpdate() {
        let paperId = this.paperId;
        let teacherId = this.teacherId;
        let paperStatus = this.paperStatus + 1;
        let store = this.$store;
        this.$axios({
          url: '/paper_review/submit_paper/'+paperId+'/'+teacherId,
          method: 'post',
         
        }).then(function (response) {
          this.$Message('论文提交成功');
          store.commit('paperUpdate');
        })
      },
      paperDelete() {
        let paperId = this.paperId;
        let store = this.$store;
        this.$axios({
          url: '/paper/delete/'+paperId,
          method: 'post',
          
        }).then(function (response) {
          this.$Message('论文删除成功');
          store.commit('paperDelete');
        })
      },
    }
  }
</script>

<style scoped>

</style>