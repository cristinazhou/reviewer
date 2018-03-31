<template>
    <div>
      <Input v-model=value  placeholder="请输入文件名" style="width: 200px"/>
      <i-button type="primary"  @click="search">搜索</i-button>


      <form  class="file">

            <input type="file" @change="getFile($event)" />
            <button @click="submitForm($event)">上传</button>
        </form>
      <Table :columns="columns" :data="fileSet">
      </Table>
      <Page :total="dataCount"
            :current="pageNum"
            :page-size="pageSize"
            show-elevator show-sizer show-total
            placement="top"
      <!--@on-change="handlePage" @on-page-size-change='handlePageSize'>-->
      </Page>
    </div>
</template>

<script>
  import Operation3 from '../components/Operation3.vue'
  import store from '../vuex/store'
  export default {
    components: {
      Operation3,
    },

    data(){
      return {
        value:'',
        file: '',
        columns:[{
          title:'序号',
          key:'number'

        },{
          title:'文件名',
          key:'fileName'
        },{
          title:'操作',
          key:'operation3',
          render: function (h, params) {
            return h(Operation3,{
              props:{
               fileId:params.row.id
              }
            })
          }

        }],
        fileSet:[]
      };
    },
    computed:{
      count(){
        return this.$store.state.count;
      }

    },

    methods: {


      getFile(event) {
        this.file = event.target.files[0];
      },
      submitForm(event) {
        event.preventDefault();
        let file = this.file;
        let formData = new FormData();
        formData.append('file', file);
//        formData.append('Content-Type', 'application/json;charset=UTF-8');

        this.$axios({
          method: 'post',
          url: '/file/upload',
          data: formData,})
          .then(function (response) {

          if (response.status === 200) {

              /*这里做处理*/
          }
        })
      },
      search(){
        this.$axios.get('/file/all_search?keyWords='+this.value)
          .then(function(response){
            let data=response.data.data;
            if (data) {
              data.forEach(function (file) {
                fileSet.push({
                  id: file.id,
                  name: file.paperTitle,
                  author: file.paperAuthor,
                  owner:file.paperOwner,
                  status: file.ispublic
                })
              })
            }
          })


      },
      list(){
        let fileSet =this.fileSet;
        this.$axios({
          method:'get',
          url:'/file/user_list'
        })
          .then(function (response) {
            let data = response.data.data;
            if (data) { var i=0
              data.forEach(function (file) {
                fileSet.push({
                  number:i,
                  id:file.id,
                  username:file.user.userName,
                  fileName:file.fileName

              });
                i++;
            }

          )
      }
    })}},
    created() {
      this.list();
    }



  };
</script>
<style lang="scss" type="text/scss">
  /*@import '~@/style/input.scss';*/
</style>



