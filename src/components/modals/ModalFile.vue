<template>
    <Table :columns="columns" :data="files"></Table>
</template>
<script>
  import DropDownFile from '@/components/dropdowns/DropDownFile.vue'
  export default {
    name: 'ModalFile',
    props: ['paperId', 'url'],
    components: {
      DropDownFile: DropDownFile
    },
    data (){
      return {
        files: [
          {
            fileId: 12,
            fileName: '123123',
          }
        ],
        columns: [
          {
            type: 'selection',
            width: 60,
            align: 'center'
          },
          {
            title: '序号',
            width: 60,
            key: 'fileId'
          },
          {
            title: '文件名',
            key: 'fileName'
          },
          {
            title: '操作',
            key: 'op',
            render: function (h, params) {
              return h(DropDownFile, {
                props: {
                  fileId: params.row.fileId
                }
              })
            }
          }
        ],
      }
    },
    mounted(){
      let _this = this;
      this.$axios({
        url: _this.url+'/'+_this.paperId,
        method: 'get',

      }).then(function (response) {
        let data = response.data.data;
        _this.files = [];
        if (Object.keys(response.data.data).length !== 0 && data.length !== 0) {
          data.forEach(function (file) {
            _this.files.push({
              fileId: file.id,
              fileName: file.fileName
            })
          });
        }
      })
    },
  }
</script>
<style scoped>

</style>