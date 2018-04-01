<template>
    <Dropdown transfer trigger="click" @on-click="judge">
        <Button size="small" type="primary">操作
            <Icon type="arrow-down-b"></Icon>
        </Button>
        <Dropdown-menu slot="list">
            <Dropdown-item name="annotationSearch">查询</Dropdown-item>
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
          case 'annotationSearch':
            //这里需要在列表中查找，暂时先不写，涉及到DOM操作，是输入框
            break;
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