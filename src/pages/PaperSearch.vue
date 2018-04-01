<template>
    <div>
        <div>
            <Input v-model="value" placeholder="请输入论文名" style="width: 200px"/>
            <i-button type="primary" @click="search">搜索</i-button>
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
            key: 'name'
          },
          {
            title: '论文作者',
            key: 'author'
          },
          {
            title: '论文所有者',
            key: 'owner'
          },
          {
            title: '操作',
            key: 'operation',
            render: function (h, params) {
              return h(ButtonPaperSearch, {
                props: {
                  paperId: params.row.paperId,
                  fileId: params.row.fileId
                }
              })
            }
          }
        ],
        papers: []
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
        let papers = this.papers;
        let key = this.key;
        this.$axios({
          method: 'post',
          data: {
            key: key
          },
          url: '/public_paper/list?pageNo=' + this.pageNum + '&pageSize=' + this.pageSize
        }).then(function (response) {
          let data = response.data.data;
          if (data) {
            let i = 1;
            data.forEach(function (paper) {
              papers.push({
                number: i,
                paperId: paper.id,
                name: paper.paperTitle,
                author: paper.paperAuthor,
                owner: paper.paperOwner,
                fileId: paper.file.fileId
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
