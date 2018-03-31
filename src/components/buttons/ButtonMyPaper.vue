<template>
    <div>
        <i-button type="primary" @click='update' size="small">提交</i-button>
        <i-button type="primary" @click='delete' size="small">删除</i-button>
        <Dropdown style="margin-left: 20px" transfer trigger="click" @on-click="judge">
            <i-button type="primary">所有文件
                <Icon type="arrow-down-b"></Icon>
            </i-button>
            <Dropdown-menu slot="list">
                <Dropdown-item name="files">下载</Dropdown-item>
                <Dropdown-item name="delete">删除</Dropdown-item>
                <Dropdown-item name="detail">详情</Dropdown-item>
                <!--打开pdf-->
            </Dropdown-menu>
        </Dropdown>
    </div>
</template>
<script>
  import {Modal} from 'iview'
  export default {
//    props: ['paperId', 'paperStatus'],
//    data(){
//      return {
//        modal1: false,
//        columns4: [
//          {
//            type: 'selection',
//            width: 60,
//            align: 'center'
//          },
//          {
//            title: '序号',
//            width: 60,
//            key: 'fileId'
//          },
//          {
//            title: '文件名',
//            key: 'label'
//          }
//        ],
//        data1: this.getTempData()
//      }
//    },
//    methods: {
//      getTempData () {
//        var tempData = [];
//        this.$axios({
//          method: 'get',
//          url: '/file/user_list',
//
//        })
//          .then(function (response) {
//            for (let i = 0; i < response.data.data.length; i++) {
//
//              tempData.push({
//                key: i,
//                label: response.data.data[i].fileName,
//                fileId: response.data.data[i].id,
//              });
//            }
//          })
//        return tempData;
//      },
//      instance (type) {
//        const title = '文件列表';
//        //const content = ' <i-button type="primary"  size="small">显示</i-button><i-table border :columns="columns4" :data="data1"></i-table>';
//        switch (type) {
//          case 'info':
//            let data1 = this.data1
//            let columns4 = this.columns4
//            this.$Modal.confirm({
//              render: (h) => {
//                return h('i-table', {
//                  props: {
//                    columns: columns4,
//                    data: data1
//                  },
//                  on: {
//                    Input: (val) => {
//                      this.createName = val
//                    }
//                  }
//                })
//              }
//            })
//            break;
//
//        }
//
//      }
//      ,
//      addfile(){
//        this.$axios({
//          method: 'get',
//          url: '/paper/addPDF',
//          data: {
//            paperId: this.paperId
//            // fileId:
//          }
//        })
//
//      },
//      update(){
//
//      },
//      del(){
//        this.$axios.get('/paper/delete?paperId=' + this.paperId)
//
//      }
//    }
  }
</script>

<style scoped>

</style>