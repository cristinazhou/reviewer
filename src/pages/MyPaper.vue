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
  import ButtonMyPaper from '@/components/buttons/ButtonMyPaper.vue'
  export default {
    components: {
      ButtonMyPaper
    },
    data() {
      return {
        columns: [
          {
            title: '序号',
            key: 'number',
            className: 'number-width'
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
            title: '论文状态',
            key: 'paperStatus',
            className: 'status-color'
          },
          {
            title: '操作',
            key: 'op',
            render: function (h, params) {
              return h(ButtonMyPaper, {
                props: {
                  paperId: params.row.id,
                  paperStatus: params.row.paperStatus,
//                  paperFiles:
                }
              })
            }
          }
        ],
        papers: [
          {
            number: 1,
            paperName: 18,
            paperAuthor: 'New York No. 1 Lake Park',
            status: '待评审'
          },
          {
            number: 2,
            paperName: 24,
            paperAuthor: 'London No. 1 Lake Park',
            status: '正在评审'
          },
          {
            number: 3,
            paperName: 30,
            paperAuthor: 'Sydney No. 1 Lake Park',
            status: '已定稿  '
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
        this.$axios.get('/paper/list').then(function (response) {
          let data = response.data.data;
          if (data) {
            data.forEach(function (paper) {
              papers.push({
                id: paper.paperId,
                paperName: paper.paperTitle,
                paperAuthor: paper.paperAuthor,
                paperStatus: paper.paperStatus,
                //单独请求
                paperFiles: paper.files
              })
            })
          }
        })
      }
    },
    created()
    {
      this.pageList()
    }
  }
  ;
</script>
<style>
    .ivu-table td.number-width {
        width: 120px;
    }
</style>
