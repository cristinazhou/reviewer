<template>
    <div>

        <Table height="567" :columns="columns" :data="data1"></Table>
        <Page :total="dataCount"
              :current="pageNum"
              :page-size="pageSize"
              show-elevator show-sizer show-total
              placement="top" @on-change="handlePage" @on-page-size-change='handlePageSize'></Page>


    </div>
</template>

<script>
  import Button from '../components/Button.vue'
  export default {
    components: {
      Button
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
            title: '论文作者',
            key: 'paperAuthor'
          },
          {
            title: '操作',
            key: 'operation',
            render(){
              return <Button></Button>
            }
          }
        ],
        data1: []
      }
    },
    methods: {
      pageList() {
        let data1 = this.data1;
        this.$axios({
          method:'get',
          url:'/individual_center/collect_list'
        })
          .then(function (response) {
            let i=0;
          let data = response.data.data;
          if (data) {
            data.forEach(function (paper) {
              data1.push({
                number: paper[i].id,
                paperName: paper[i].paperOwner,
                paperAuthor: paper[i].paperAuthor,
                status: paper[i].ispublic
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

<style scoped>

</style>
