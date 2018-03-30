<style>
    .ivu-table td.state-color {

    }

    .ivu-table td.number-width {
        width: 120px;
    }
</style>
<template>
    <div>
        <Table :columns="columns1" :data="data2"></Table>
        <Page :total="dataCount"
              :current="pageNum"
              :page-size="pageSize"
              show-elevator show-sizer show-total
              placement="top" @on-change="handlePage" @on-page-size-change='handlePageSize'></Page>


    </div>
</template>
<script>

  export default {

    data() {
      return {
        columns1: [
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
            key: 'state',
            className: 'state-color'
          },
          {
            title: '操作',
            key: 'operate'
          }
        ],
        data2: [
          {
            number: 1,
            paperName: 18,
            paperAuthor: 'New York No. 1 Lake Park',

            state: '待评审'
          },
          {
            number: 2,
            paperName: 24,
            paperAuthor: 'London No. 1 Lake Park',

            state: '正在评审'
          },
          {
            number: 3,
            paperName: 30,
            paperAuthor: 'Sydney No. 1 Lake Park',
            state: '已定稿  '
          },
        ]
      }
    },
    methods: {
      pageList: function () {
        let data2 = this.data2;

        this.$axios({
          method: 'get',
          url: '/user_paper/list'
        }).then(function (response) {
          let data = response.data.data;
          //非空对象但对象里面没东西的情况需要考虑进去
          if (data) {
            data.forEach(function (paper) {
              data2.push({
                id: paper.paperId,
                paperName: paper.paperName,
                paperAuthor: paper.paperAuthor,
                state: paper.status,
              })
            })
          }
        })
      }
    },
    created() {
      this.pageList()
    }
  };
</script>
