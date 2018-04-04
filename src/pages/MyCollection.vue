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
    computed: {
      paperCollect(){
        return this.$store.state.app.paperCollect;
      },
      paperUncollect() {
        return this.$store.state.app.paperUncollect;
      }
    },
    watch: {
      paperCollect(val){
        this.pageList();
      },
      paperUncollect(val) {
        this.pageList();
      }
    },
    data(){
      return {
        dataCount: 40,
        pageNum: 1,
        pageSize: 10,
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
                }
              });
            }
          }
        ],
        collections: [
          {
            number: 1,
            id: 23,
            paperName: '233',
            paperAuthor: '12312313',
            status: '123123'
          }
        ]
      }
    },
    methods: {
      handlePageSize(){

      },
      handlePage(){

      },
      pageList() {
        let _this = this;
        this.$axios({
          method: 'get',
          url: '/collection/list'
        }).then(function (response) {
          _this.collections = [];
          let data = response.data.data;
          if (Object.keys(response.data.data).length !== 0 && data.length !== 0) {
            let i = 1;
            data.forEach(function (paper) {
              _this.collections.push({
                number: i,
                id: paper.id,
                paperName: paper.paperTitle,
                paperAuthor: paper.paperAuthor,
                status: paper.isPublic
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
