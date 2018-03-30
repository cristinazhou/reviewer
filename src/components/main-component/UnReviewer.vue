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
    export default {
      data(){
        return{
          columns:[
            {
              title:'序号',
              key:'number'
            },
            {
              title:'论文名称',
              key:'paperName'
            },
            {
              title:'论文作者',
              key:'paperAuthor'
            },
            {
              title:'操作',
              key:'operation',
              render(){
                return <i-button size="small" type="primary">开始评审</i-button>
              }
            }
          ],
          data1:[
            {
              number:1,
              paperName:'人脸识别系统',
              paperAuthor:'leon yang',
            },
            {
              number:2,
              paperName:'智能家居',
              paperAuthor:'leon yang',
            },
            {
              number:3,
              paperName:'自动驾驶XXXX',
              paperAuthor:'leon yang',
            }
          ]
        }
      }

    }
</script>

