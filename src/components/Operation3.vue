<template>
  <Dropdown style="margin-left: 20px" transfer trigger="click" @on-click="judge">
    <i-button type="primary">操作
      <Icon type="arrow-down-b"></Icon>
    </i-button>
    <Dropdown-menu slot="list">
      <Dropdown-item name="not_review" >删除</Dropdown-item>
      <Dropdown-item name="reviewing" >下载</Dropdown-item>
      <Dropdown-item>详情</Dropdown-item>
    </Dropdown-menu>
  </Dropdown>

</template>
<script>
  export default {
    data(){
      return{

      };
    }
  };

</script>
