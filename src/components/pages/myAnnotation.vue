<template>
    <div>
        <Table :columns="columns" :data="data1"></Table>
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
        data1: [
          {
            number: 1,
            paperName: '人脸识别系统',
            paperAuthor: 'leon yang',
          },
        ]
      }
    },
    method: {
      pageList: function () {
        let data1 = this.data1;
        //根据教师ID获取
        this.$axios({
          method: 'post',
          url: '/',
          data: {
            teacherName: this.username,

          }

        }).then(function (response) {
          let data = response.data.data;
          if (data) {
            data.forEach(function (paper) {
              data1.push({
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

<style scoped>

</style>
