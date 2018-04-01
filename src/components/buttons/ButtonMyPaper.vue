<template>
    <div>
        <Button type="primary" size="small" @click.native="paperUpdate">提交</Button>
        <Button type="primary" size="small" @click.native="paperDelete">删除</Button>
        <Button type="primary" size="small" @click.native="paperFileRender">所有文件</Button>
    </div>
</template>
<script>
  import ModalFile from '@/components/modals/ModalFile.vue'
  export default {
    props: [
      'paperId',
      'paperStatus',
//      'paperFiles',
    ],
    components: {
      ModalFile: ModalFile
    },
    data(){
      return {
        modalFile: false,
        paperFiles: [{
          fileId: 3,
          fileName: "123",
        }]
      }
    },
    methods: {
      paperFileRender(){
        let paperFiles = this.paperFiles;
        this.$Modal.confirm({
          render: (h) => {
            return h(ModalFile, {
              props: {
                files: paperFiles,
              }
            })
          }
        })
      },
      paperUpdate() {
        let paperId = this.paperId;
        let paperStatus = this.paperStatus + 1;
        this.$axios({
          url: '',
          method: 'post',
          data: {
            paperId: paperId,
            paperStatus: paperStatus,
          }
        }).then(function (response) {
          this.$Message('论文提交成功')
        })
      },
      paperDelete() {
        let paperId = this.paperId;
        this.$axios({
          url: '',
          method: 'post',
          data: {
            paperId: paperId,
          }
        }).then(function (response) {
          this.$Message('论文删除成功')
        })
      },
      instance (type) {
        const title = '文件列表';
        switch (type) {
          case 'info':
            let data1 = this.data1
            let columns4 = this.columns4
            this.$Modal.confirm({
              render: (h) => {
                return h('i-table', {
                  props: {
                    columns: columns4,
                    data: data1
                  },
                  on: {
                    Input: (val) => {
                      this.createName = val
                    }
                  }
                })
              }
            })
            break;

        }
      },
    }
  }
</script>

<style scoped>

</style>