<template>
    <Dropdown transfer trigger="click" @on-click="judge">
        <Button size="small" type="primary">操作
            <Icon type="arrow-down-b"></Icon>
        </Button>
        <Dropdown-menu slot="list">
            <Dropdown-item name="annotationCreate">添加</Dropdown-item>
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
        switch (name) {
          case 'annotationCreate':
            break;
          case 'annotationSearch':
            break;
          case 'annotationDelete':
            break;
          default:
            break;
        }
      }
    }
  }
</script>