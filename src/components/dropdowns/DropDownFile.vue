<template>
    <Dropdown trigger="click" @on-click="fileOp">
        <Button type="primary" size="small">操作
            <Icon type="arrow-down-b"></Icon>
        </Button>
        <Dropdown-menu slot="list">
            <Dropdown-item name="fileDelete">删除</Dropdown-item>
            <Dropdown-item name="fileDownload">下载</Dropdown-item>
            <Dropdown-item name="fileDetail">详情</Dropdown-item>
        </Dropdown-menu>
    </Dropdown>
</template>
<script>
  export default {
    name: 'DropDownFile',
    props: ['fileId'],
    methods: {
      fileOp(name){
        let message = this.$Message;
        let fileId = this.fileId;
        let store = this.$store;
        switch (name) {
          case 'fileDownload':
            this.$axios.get('/file/download?fileId=' + this.fileId).then(function (response) {
            });
            break;
          case 'fileDelete':
            this.$axios({
              method: 'post',
              url: '/file/delete',
              data: {
                fileId: fileId
              }
            }).then(function (response) {
              message.success('文件删除成功');
              store.$emit('fileDelete')
            });
            break;
          case 'fileDetail':
            let fileId = this.fileId;
            this.$router.push({
              name: 'PDFShow',
              query: {
                fileId: fileId
              }
            });
            break;
          default:
            break;
        }
      },
    }
  }
</script>

<style scoped>

</style>