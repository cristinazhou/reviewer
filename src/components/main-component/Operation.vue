<template>
  <Dropdown style="margin-left: 20px" transfer trigger="click" @on-click="judge">
    <i-button type="primary">
      操作
      <Icon type="arrow-down-b"></Icon>
    </i-button>

    <Dropdown-menu slot="list">
      <Dropdown-item  name="1">收藏</Dropdown-item>
      <Dropdown-item name="2">批注</Dropdown-item>
      <Dropdown-item name="doing">审阅中</Dropdown-item>
      <Dropdown-item name="done">定稿</Dropdown-item>
    </Dropdown-menu>
  </Dropdown>

</template>
<script>
  export default {

    data(){
      return{
       // message:''

      };
    },
    methods:{
      judge(name) {
        if (name === '1')
        {
          alert(this.props.message)
            //alert(111)
        }

                }

    }

  };

</script>
