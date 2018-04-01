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
      let url = this.url;
      let paperId = this.paperId;
      let files = this.files;
      this.$axios({
        url: url,
        method: 'get',
        data: {
          paperId: paperId
        }
      }).then(function (response) {
        let data = response.data.data;
        if (data) {
          data.forEach(function (file) {
            files.push({
              fileId: file.id,
              fileName: file.fileName,
            })
          });
        }
      })
    },
  }
</script>
<style scoped>

</style>