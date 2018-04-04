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
    computed: {
      paperDelete(){
        return this.$store.state.app.paperDelete;
      },
      paperUpdate() {
        return this.$store.state.app.paperUpdate;
      }
    },
    watch: {
      paperDelete(val){
        this.pageList();
      },
      paperUpdate(val) {
        this.pageList();
      }
    },
    data() {
      return {
        dataCount: 40,
        pageNum: 1,
        pageSize: 10,
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
                  paperStatus: params.row.paperStatus
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
            paperStatus: '待评审'
          },
          {
            number: 2,
            paperName: 24,
            paperAuthor: 'London No. 1 Lake Park',
            paperStatus: '正在评审'
          },
          {
            number: 3,
            paperName: 30,
            paperAuthor: 'Sydney No. 1 Lake Park',
            paperStatus: '已定稿'
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
        let _this = this;
        this.$axios.get('/paper/list').then(function (response) {
          let data = response.data.data;
          _this.papers = [];
          if (Object.keys(response.data.data).length !== 0 && data.length !== 0) {
            let i = 1;
            data.forEach(function (paper) {
              let item = {
                number: i,
                id: paper.paperId,
                paperName: paper.paperTitle,
                paperAuthor: paper.paperAuthor
              };
              switch (paper.paperStatus) {
                case 0:
                  item.paperStatus = '未进入评审阶段';
                  break;
                case 1:
                  item.paperStatus = '等待评审';
                  break;
                case 2:
                  item.paperStatus = '评审中';
                  break;
                case 3:
                  item.paperStatus = '已定稿';
                  break;
                default:
                  break;
              }
              _this.papers.push(item);
              ++i;
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
