<template>
    <div>

        <Table height="567" :columns="columns" :data="collections"></Table>
        <Page :total="dataCount"
              :current="pageNum"
              :page-size="pageSize"
              show-elevator show-sizer show-total
              placement="top" @on-change="handlePage" @on-page-size-change='handlePageSize'></Page>
    </div>
</template>

<script>
  import ButtonMyCollection from '@/components/buttons/ButtonMyCollection.vue'
  export default {
    components: {
      ButtonMyCollection: ButtonMyCollection
    },
    data(){
      return {
        columns: [
          {
            title: '序号',
            key: 'number'
          },
          {
            title: '论文名称',
            key: 'paperName'
          },
          {
            title: '论文作者',
            key: 'paperAuthor'
          },
          {
            title: '操作',
            key: 'op',
            render: function (h, params) {
              return h(ButtonMyCollection, {
                props: {
                  paperId: params.row.paperId,
                  fileId: params.row.fileId
                }
              });
            }
          }
        ],
        collections: []
      }
    },
    methods: {
      pageList() {
        let collections = this.collections;
        this.$axios({
          method: 'get',
          url: '/individual_center/collect_list'
        })
          .then(function (response) {
            let data = response.data.data;
            if (data) {
              let i = 1;
              data.forEach(function (paper) {
                collections.push({
                  number: i,
                  id: paper.id,
                  paperName: paper.paperOwner,
                  paperAuthor: paper.paperAuthor,
                  status: paper.isPublic,
                  fileName: paper.file.fileName,
                  fileId: paper.file.fileId
                });
                ++i;
              })
            }
          })
      }
    },
    created(){
      this.pageList()
    }
  }
</script>

<style scoped>

</style>
