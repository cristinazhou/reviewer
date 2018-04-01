<template>
    <div>
        <Button type="primary" @click.native='paperCollect' size="small">取消收藏</Button>
        <Dropdown style="margin-left: 20px" transfer trigger="click" @on-click="judge">
            <i-button type="primary">最新文件
                <Icon type="arrow-down-b"></Icon>
            </i-button>
            <Dropdown-menu slot="list">
                <Dropdown-item name="files">下载</Dropdown-item>
                <Dropdown-item name="detail">详情</Dropdown-item>
                <!--打开pdf-->
            </Dropdown-menu>
        </Dropdown>
    </div>
</template>
<script>
  export default {
    props: ['paperStatus', 'paperId'],
    data(){
      return {};
    },
    methods: {
      paperCollect() {
        let paperId = this.paperId;
        let message = this.$Message;
        this.$axios({
          method: 'post',
          url: '/public_paper/uncollect',
          data: {
            paperId: paperId
          }
        }).then(function (response) {
          message.success('取消收藏成功');
        })
      },
    }
  };
</script>