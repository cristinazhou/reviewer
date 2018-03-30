<template>
    <Dropdown style="margin-left: 20px" transfer trigger="click" @on-click="judge">
        <i-button type="primary">操作
            <Icon type="arrow-down-b"></Icon>
        </i-button>
        <Dropdown-menu slot="list">
            <Dropdown-item name="not_review" v-if="paperStatus === 0">开始审核</Dropdown-item>
            <Dropdown-item name="reviewing" v-else-if="paperStatus === 1">审核完成</Dropdown-item>
            <Dropdown-item>批注</Dropdown-item>
          <Dropdown-item>收藏</Dropdown-item>
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
          case 'not_review':
            break;
          case 'reviewing':
            break;

          default:
            break;
        }
      }
    }
  };
</script>
