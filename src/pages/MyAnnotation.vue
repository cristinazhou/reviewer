<template>
    <div>
        <Table height="567" :columns="columns" :data="papers"></Table>
        <Page :total="dataCount"
              :current="pageNum"
              :page-size="pageSize"
              show-elevator show-sizer show-total
              placement="top" @on-change="handlePage" @on-page-size-change='handlePageSize'></Page>
    </div>
</template>

<script>
  import ButtonMyAnnotation from '@/components/buttons/ButtonMyAnnotation.vue'
  export default {
    components: {
      ButtonMyAnnotation: ButtonMyAnnotation
    },
    computed: {
      annotationAllDelete(){
        return this.$store.state.app.annotationAllDelete;
      }
    },
    watch: {
      annotationAllDelete(val){
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
            title: '文件名称',
            key: 'paperAuthor'
          },
          {
            title: '操作',
            key: 'op',
            render: function (h, params) {
              return h(ButtonMyAnnotation, {
                props: {
                  paperId: params.row.paperId,
                  fileId: params.row.fileId
                }
              });
            }
          }
        ],
        papers: [
          {
            number: 1,
            paperName: '人脸识别系统',
            paperAuthor: 'leon yang'
          }
        ]
      }
    },
    methods: {
      handlePage(){

      },
      handlePageSize(){

      },
      pageList() {
        let _this = this;
        this.$axios({
          method: 'get',
          url: '/annotation/list'
        }).then(function (response) {
          let data = response.data.data;
          _this.papers = [];
          if (Object.keys(data).length !== 0 && data.length !== 0) {
            data.forEach(function (file) {
              let i = 1;
              _this.papers.push({
                number: i,
                id: file.id,
                fileName: file.fileName,
                paperId: file.id,
                paperName: file.paper.paperTitle
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
