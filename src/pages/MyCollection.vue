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
  import ButtonCollection from '@/components/buttons/ButtonCollection.vue'
  export default {
    components: {
      ButtonCollection: ButtonCollection
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
            render: function (h) {
              return h(ButtonAnnotation, {
                props: {}
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
            let i = 0;
            let data = response.data.data;
            if (data) {
              data.forEach(function (paper) {
                collections.push({
                  number: paper[i].id,
                  paperName: paper[i].paperOwner,
                  paperAuthor: paper[i].paperAuthor,
                  status: paper[i].ispublic
                })
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
