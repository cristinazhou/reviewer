<template>
    <div>
        <Button v-if="isCollected === true" type="primary" @click.native='uncollect' size="small">取消收藏</Button>
        <Button v-else type="primary" @click.native='collect' size="small">收藏</Button>
        <Button type="primary" @click.native='paperFileRender' size="small">最新文件</Button>
    </div>
</template>
<script>
  import ModalFile from '@/components/modals/ModalFile.vue'
  export default {
    props: ['paperId', 'isCollected'],
    data(){
      return {
        modalFile: false,
      };
    },
    methods: {
      paperFileRender(){
        let paperId = this.paperId;
        this.$Modal.confirm({
          render: function (h) {
            return h(ModalFile, {
              props: {
                paperId: paperId,
                url: '/paper/files'
              }
            })
          }
        })
      },
      collect(){
        let store = this.$store;
        let massage = this.$Message;
        this.$axios.get('/public_paper/collect/'+this.paperId).then(function (response) {
          massage.success("收藏成功！");
          store.commit('paperCollect');
        });
      },
      uncollect(){
        let store = this.$store;
        let massage = this.$Message;
        this.$axios.get('/public_paper/uncollect?paperId=' + this.paperId).then(function (response) {
          massage.success("取消收藏成功！");
          store.commit('paperUnCollect');
        });
      },
    }
  };
</script>