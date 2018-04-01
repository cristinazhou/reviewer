<template>
    <div>
        <Button type="primary" @click.native='paperUnCollect' size="small">取消收藏</Button>
        <Dropdown style="margin-left: 20px" transfer trigger="click" @on-click="judge">
            <Button size="small" type="primary">其他操作
                <Icon type="arrow-down-b"></Icon>
            </Button>
            <Dropdown-menu slot="list">
                <Dropdown-item name="files">下载</Dropdown-item>
                <Dropdown-item name="detail">详情</Dropdown-item>
            </Dropdown-menu>
        </Dropdown>
    </div>
</template>
<script>
  export default {
    props: [
      'paperId',
      'fileId',
    ],
    data(){
      return {};
    },
    methods: {
      paperUnCollect() {
        let paperId = this.paperId;
        let msg = this.$Message;
        let store = this.$store;
        this.$axios({
          method: 'post',
          url: '/public_paper/uncollect',
          data: {
            paperId: paperId
          }
        }).then(function (response) {
          msg.success('取消收藏成功');
          store.$emit('paperUncollect');
        })
      },
      judge(name){
        switch (name) {
          case 'detail':
            let fileId = this.fileId;
            this.$router.push({
              name: 'PDFShow',
              query: {
                fileId: fileId
              }
            });
            break;
          case 'download':
            this.$axios.get('/file/download?fileId=' + this.fileId).then(function (response) {
            });
            break;
            break;
          default:
            break;
        }
      }
    }
  };
</script>