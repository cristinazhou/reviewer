<template>
    <i-button type="primary" @click='list' size="small">取消收藏</i-button>
    <Dropdown style="margin-left: 20px" transfer trigger="click" @on-click="judge">
        <i-button type="primary">最新文件<Icon type="arrow-down-b"></Icon></i-button>
        <Dropdown-menu slot="list">
            <Dropdown-item name="files">下载</Dropdown-item>
            <Dropdown-item name="detail">详情</Dropdown-item>
            <!--打开pdf-->
        </Dropdown-menu>
    </Dropdown>
</template>
<script>
  export default {
    props: ['paperStatus', 'paperId'],
    data(){
      return {};
    },
    methods: {
      judge(name) {
        switch (name) {
          case 'collect' : {
            let massage = this.$Message;
            this.$axios.get('/public_paper/collect?paperId=' + this.paperId)
              .then(function (response) {
                massage.success("收藏成功！");
              });
            break;
          }
          default:
            break;
        }
      }
    }
  };
</script>