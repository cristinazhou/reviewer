<template>
    <div>
        <Button type="primary" @click.native='collect' size="small">收藏</Button>
        <Button type="primary" @click.native='paperFileRender' size="small">最新文件</Button>
    </div>
</template>
<script>
  import ModalFile from '@/components/modals/ModalFile.vue'
  export default {
    props: ['paperId'],
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
                url: '/paper/user_list'
              }
            })
          }
        })
      },
      collect(){
        let store = this.$store;
        let massage = this.$Message;
        this.$axios.get('/public_paper/collect?paperId=' + this.paperId).then(function (response) {
          massage.success("收藏成功！");
          store.$emit('paperCollect');
        });
      },
    }
  };
</script>