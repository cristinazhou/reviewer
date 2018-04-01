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
  import ButtonMyAnnotation from '@/components/buttons/ButtonMyAnnotation.vue'
  export default {
    components: {
      ButtonMyAnnotation: ButtonMyAnnotation
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
            title: '最新文件名',
            key: 'fileName'
          },
          {
            title: '操作',
            key: 'op',
            render: function (h) {
              return h(ButtonMyAnnotation, {
                props: {}
              });
            }
          }
        ],
        data1: [
          {
            number: 1,
            paperName: '人脸识别系统',
            paperAuthor: 'leon yang'
          }
        ]
      }
    },
    method: {
      pageList: function () {
        let data1 = this.data1;
        this.$axios({
          method: 'get',
          url: '/annotation/user_list'
        }).then(function (response) {
          let data = response.data.data;
          if (data) {
            data.forEach(function (paper) {
              data1.push({
                id: paper.paperId,
                name: paper.paperName,
                author: paper.paperAuthor,
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
