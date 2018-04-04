<template>
    <div>
        <div style="width:50%">
            <Input v-model=value placeholder="请输入文件名" style="width: 200px"/><br>
            <i-button type="primary" @click="search">搜索</i-button>
        </div>
        <div style="width: ">
            <form class="file">
                <input type="file" @change="getFile($event)"/>

            </form>
            <i-button type="primary" @click="submitForm($event)">上传</i-button>
        </div>
        <Table :columns="columns" :data="fileSet">
        </Table>
        <Page :total="dataCount"
              :current="pageNum"
              :page-size="pageSize"
              show-elevator show-sizer show-total
              placement="top"
              @on-change="handlePage" @on-page-size-change='handlePageSize'>
        </Page>
    </div>
</template>

<script>
  import DropDownFile from '@/components/dropdowns/DropDownFile.vue'

  export default {
    components: {
      DropDownFile: DropDownFile
    },
    computed: {
      fileDelete() {
        return this.$store.state.app.fileDelete;
      },
      fileCreate() {
        return this.$store.state.app.fileCreate;
      }
    },
    watch: {
      fileDelete(val) {
        this.pageList();
      },
      fileCreate(val) {
        this.pageList();
      }
    },
    data() {
      return {
        dataCount: 40,
        pageNum: 1,
        pageSize: 10,
        value: '',
        file: '',
        columns: [{
          title: '序号',
          key: 'number'
        }, {
          title: '文件名',
          key: 'fileName'
        }, {
          title: '操作',
          key: 'operation3',
          render: function (h, params) {
            return h(DropDownFile, {
              props: {
                fileId: params.row.id
              }
            })
          }
        }],
        fileSet: []
      };
    },
    methods: {
      handlePage() {

      },
      handlePageSize() {

      },
      getFile(event) {
        this.file = event.target.files[0];
      },
      submitForm(event) {
        let message = this.$Message;
        let store = this.$store;
        event.preventDefault();
        let file = this.file;
        let formData = new FormData();
        if (typeof file === 'undefined') {
          this.$Message.error('文件不能为空');
        } else {
          formData.append('file', file);
          this.$axios({
            method: 'post',
            url: '/file/upload',
            data: formData
          }).then(function (response) {
            message.success('文件上传成功');
            store.commit('fileCreate');
          })
        }
      },
      search() {
        let _this = this;
        this.$axios.get('/file/user_search?keyWords=' + this.value).then(function (response) {
          let data = response.data.data;
          _this.fileSet = [];
          if (Object.keys(response.data.data).length !== 0 && data.length !== 0) {
            let i = 1;
            data.forEach(function (file) {
                _this.fileSet.push({
                  number: i,
                  id: file.id,
                  fileName: file.fileName
                });
                ++i;
              }
            )
          }
        })
      },
      pageList() {
        let _this = this;
        this.$axios({
          method: 'get',
          url: '/user/files',
        }).then(function (response) {
          let data = response.data.data;
          _this.fileSet = [];
          if (Object.keys(response.data.data).length !== 0 && data.length !== 0) {
            let j = 1;
            data.forEach(function (file) {
              _this.fileSet.push({
                number: j,
                id: file.id,
                fileName: file.fileName
              });
              ++j;
            });
          }
        })
      }
    },
    created() {
      this.pageList();
    }
  };
</script>
<style lang="scss" type="text/scss">
    @import '~@/style/input.scss';
</style>



