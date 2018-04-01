<template>
    <Table :columns="columns" :data="files"></Table>
</template>
<script>
  import DropDownFile from '@/components/dropdowns/DropDownFile.vue'
  export default {
    name: 'ModalFile',
    props:['files'],
    components: {
      DropDownFile: DropDownFile
    },
    data (){
      return {
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
    }
  }
</script>
<style scoped>

</style>