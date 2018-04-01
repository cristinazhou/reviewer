<template>
    <Dropdown style="margin-left: 20px" transfer trigger="click" @on-click="judge">
        <i-button type="primary">操作
            <Icon type="arrow-down-b"></Icon>
        </i-button>
        <Dropdown-menu slot="list">
            <Dropdown-item name="delete">删除</Dropdown-item>
            <Dropdown-item name="download">下载</Dropdown-item>
            <Dropdown-item name="detail">详情</Dropdown-item>
        </Dropdown-menu>
    </Dropdown>
</template>
<script>
  export default {
    props: ['fileId'],
    data(){
      return {};
    },
    methods: {
      judge(name){
        switch (name) {
          case "download" : {
            this.$axios.get('/file/download?fileId=' + this.fileId).then(function (response) {

            });
            break;
          }
          case "delete" : {
            let message = this.$Message;
            this.$Modal.confirm({
              title: '确认对话框标题',
              content: '<p>删除该文件?</p>',
              onOk: () => {
                this.$axios.get('/file/delete?fileId=' + this.fileId)
                  .then(function (response) {
                    message.info('删除成功');
                  });
              },
              onCancel: () => {
                this.$Message.info('取消删除');
              }
            });
            break;
          }
          case "detail" : {
            let fileId = this.fileId;
            this.$router.push({
              name: 'PDFShow',
              query: {
                fileId: fileId
              }
            });
            break;
          }
        }
      }
    }
  };

</script>