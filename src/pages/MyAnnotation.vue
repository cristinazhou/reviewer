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
      refresh(){
        return this.$store.state.app.annotationDelete;
      }
    },
    watch: {
      refresh(val){
        this.pageList();
      }
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
        let papers = this.papers;
        this.$axios({
          method: 'get',
          url: '/annotation/user_list'
        }).then(function (response) {
          let data = response.data.data;
          if (data) {
            data.forEach(function (file) {
              let i = 1;
              file.push({
                number: i,
                id: file.id,
                fileName: file.fileName,
                paperId: file.paperId,
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
