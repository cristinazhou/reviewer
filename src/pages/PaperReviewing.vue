<template>
    <div>
        <Table :columns="columns" :data="papers"></Table>
        <Page :total="dataCount"
              :current="pageNum"
              :page-size="pageSize"
              show-elevator show-sizer show-total
              placement="top"
              @on-change="handlePage" @on-page-size-change='handlePageSize'></Page>
    </div>
</template>
<script>
  import ButtonPaperReviewed from '@/components/buttons/ButtonPaperReviewed.vue'
  export default {
    components: {
      ButtonPaperReviewed: ButtonPaperReviewed
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
              return h(ButtonPaperReviewed, {})
            }
          }
        ],
        papers: [
          {
            number: 1,
            paperName: '人脸识别系统',
            paperAuthor: 'leon yang',
          },
          {
            number: 2,
            paperName: '智能家居',
            paperAuthor: 'leon yang',
          },
          {
            number: 3,
            paperName: '自动驾驶XXXX',
            paperAuthor: 'leon yang',
          }
        ]
      }
    },
    methods: {
      handlePage(){

      },
      handlePageSize(){

      },
      pageList: function () {
        let papers = this.papers;
        //根据教师ID获取
        this.$axios({
          method: 'get',
          url: '/',
        }).then(function (response) {
          let data = response.data.data;
          if (data) {
            data.forEach(function (paper) {
              papers.push({
                id: paper.paperId,
                name: paper.paperName,
                author: paper.paperAuthor,
                status: paper.status,
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
