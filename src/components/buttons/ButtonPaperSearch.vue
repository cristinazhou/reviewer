<template>
    <div>
        <Button type="primary" @click.native='collect' size="small">收藏</Button>
        <Dropdown transfer trigger="click" @on-click="judge">
            <Button type="primary" size="small">最新文件
                <Icon type="arrow-down-b"></Icon>
            </Button>
            <Dropdown-menu slot="list">
                <Dropdown-item name="download">下载</Dropdown-item>
                <Dropdown-item name="detail">详情</Dropdown-item>
            </Dropdown-menu>
        </Dropdown>
    </div>
</template>
<script>
  export default {
    props: ['paperId'],
    data(){
      return {};
    },
    methods: {
      collect(){
        let massage = this.$Message;
        this.$axios.get('/public_paper/collect?paperId=' + this.paperId)
          .then(function (response) {
            massage.success("收藏成功！");
          });
      },
      judge(name) {
        switch (name) {
          case 'download' : {

            break;
          }
          case 'detail' : {

            break;
          }
          default:
            break;
        }
      }
    }
  };
</script>