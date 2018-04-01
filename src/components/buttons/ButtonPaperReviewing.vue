<template>
    <div>
        <Button type="primary" @click='list' size="small">提交</Button>
        <!--如果角色是老师-->
        <Button type="primary" @click='list' size="small">???</Button>
        <Dropdown style="margin-left: 20px" transfer trigger="click" @on-click="judge">
            <Button size="small" type="primary">文件
                <Icon type="arrow-down-b"></Icon>
            </Button>
            <Dropdown-menu slot="list">
                <Dropdown-item name="create">增加文件</Dropdown-item>
                <Dropdown-item name="download">下载</Dropdown-item>
                <Dropdown-item name="detail">详情</Dropdown-item>
                <Dropdown-item name="delete">删除</Dropdown-item>
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