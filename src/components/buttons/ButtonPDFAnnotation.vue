<template>
    <Dropdown transfer trigger="click" @on-click="judge">
        <Button size="small" type="primary">操作
            <Icon type="arrow-down-b"></Icon>
        </Button>
        <Dropdown-menu slot="list">
            <Dropdown-item name="annotationDelete">删除</Dropdown-item>
        </Dropdown-menu>
    </Dropdown>
</template>
<script>
  export default {
    props: ['annotationId'],
    methods: {
      judge(name) {
        let msg = this.$Message;
        let annotationId = this.annotationId;
        let store = this.$store;
        switch (name) {
          case 'annotationDelete':
            this.$axios({
              url: '',
              method: 'post',
              data: {
                annotationId: annotationId
              }
            }).then(function (response) {
              msg.success('批注删除成功');
              store.commit('annotationDelete');
            });
            break;
          default:
            break;
        }
      }
    }
  }
</script>