<template>
    <div>
        <div>
            <Input @keyup.enter.native="search" v-model="value" placeholder="请输入论文名" style="width: 200px"/>
            <Button type="primary" @click.native="search">搜索</Button>
            <Table height="531" :columns="columns" :data="papers"></Table>
        </div>
        <div style="border:1px">
            <Page :total="dataCount"
                  :current="pageNum"
                  :page-size="pageSize"
                  show-elevator show-sizer
                  placement="top" @on-change="handlePage" @on-page-size-change='handlePageSize'></Page>
        </div>
    </div>
</template>
<script>
  import ButtonPaperSearch from '@/components/buttons/ButtonPaperSearch.vue'
  export default {
    components: {
      ButtonPaperSearch
    },
    data() {
      return {
        dataCount: 40,
        pageNum: 1,
        pageSize: 10,
        value: '',
        key: '',
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
            title: '论文所有者',
            key: 'paperOwner'
          },
          {
            title: '操作',
            key: 'op',
            render: function (h, params) {
              return h(ButtonPaperSearch, {
                props: {
                  paperId: params.row.paperId,
                  isCollected: params.row.isCollected
                }
              })
            }
          }
        ],
        papers: [
          {
            number: 1,
            paperId: 23,
            paperName: 'eeafd',
            paperAuthor: '123123',
            paperOwner: '123123'
          }
        ]
      }
    },
    methods: {
      handlePage(value){
        this.pageNum = value;
        data2 = [];
        this.pageList();
      },
      handlePageSize(value){
        this.pageSize = value;
        this.pageList();
      },
      pageList: function () {
        let _this = this;
        this.$axios.get('/public_paper/search?keyWords='+_this.key+'&pageNo=' + this.pageNum + '&pageSize=' + this.pageSize)
          .then(function (response) {
          let data = response.data.data.list;
          _this.papers = [];
          if (Object.keys(data).length !== 0 && data.length !== 0) {
            let i = 1;
            data.forEach(function (paper) {
              _this.papers.push({
                number: i,
                paperId: paper.id,
                paperName: paper.paperTitle,
                paperAuthor: paper.paperAuthor,
                paperOwner: paper.paperOwner,
                isCollected: paper.isCollected
              });
              ++i;
            })
          }
        })
      },
      search() {
        this.key = this.value;
        this.pageList();
      }
    },
    created() {
    }
  };
</script>
