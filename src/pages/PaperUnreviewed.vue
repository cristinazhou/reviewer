<template>
    <div>
        <Table :columns="columns" :data="papers"></Table>
        <Page :total="dataCount"
              :current="pageNum"
              :page-size="pageSize"
              show-elevator show-sizer show-total
              placement="top" @on-change="handlePage" @on-page-size-change='handlePageSize'></Page>


    </div>
</template>
<script>
  import ButtonPaperReviewing from '@/components/buttons/ButtonPaperReviewing.vue'
  export default {
    components: {
      ButtonPaperReviewing: ButtonPaperReviewing
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
            key: 'op',
            render: function (h, params) {
              return h(ButtonPaperReviewing, {})
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
    methods: {}
  }
</script>

