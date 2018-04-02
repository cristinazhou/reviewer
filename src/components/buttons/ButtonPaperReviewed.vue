<template>
    <div>
        <Button type="primary" @click='list' size="small">提交</Button>
        <Dropdown style="margin-left: 20px" transfer trigger="click" @on-click="judge">
            <Button size="small" type="primary">文件操作
                <Icon type="arrow-down-b"></Icon>
            </Button>
            <Dropdown-menu slot="list">
                <Dropdown-item name="create">增加文件</Dropdown-item>
                <Dropdown-item name="download">下载</Dropdown-item>
                <Dropdown-item name="detail">详情</Dropdown-item>
                <Dropdown-item name="delete">删除</Dropdown-item>
            </Dropdown-menu>
        </Dropdown>
    </div>
</template>

<script>
  export default {
    methods: {
      list(){

      },
      judge(){
//        let fileId = this.fileId;
//        this.$router.push({
//          name: 'PDFShow',
//          query: {
//            fileId: fileId
//          }
//        });
      }
    }
  }
</script>

<style scoped>

</style>