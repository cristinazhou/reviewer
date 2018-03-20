<template>
  <div>
    <Input v-model="value" placeholder="请输入论文名" style="width: 200px"/>

    <button @click="">搜索</button>
    <Table :columns="columns1" :data="data2"></Table>
    <Page :total="dataCount"
          :current="pageNum"
          :page-size="pageSize"
          show-elevator show-sizer show-total
          placement="top" @on-change="handlePage" @on-page-size-change='handlePageSize'></Page>
  </div>
</template>
<script>
  import Operation from './Operation.vue'
  export default {
    props: ['message'],

    components:{
      Operation

    },
    data() {
      return {
        message:"hello",
        columns1: [
          {
            title: '论文名称',
            key: 'name'
          },
          {
            title: '论文作者',
            key: 'author'
          },
          {
            title: '操作',
            key: 'operation',
            render(){

              return <Operation  ></Operation>;
            }
          }

        ],
        data2: []
      }
    },
    methods: {
      pageList: function () {
        let data2 = this.data2;

        this.$axios({
          method: 'post',
          url: '/public_paper/list'
        }).then(function (response) {
          let data = response.data.data;
          if (data) {
            data.forEach(function (paper) {
              data2.push({
                id: paper.paperId,
                name: paper.paperName,
                author: paper.paperAuthor,
                status: paper.status,
              })
            })
          } else {
            for (let i = 0; i < 5; ++i) {
              data2.push({
                id: i,
                name: 'Fxxk',
                author: 'ZHOUDI',
                status: "1",

              })
            }
          }
        })
      }
    },
    created() {
      this.pageList()
    }
  };
</script>
