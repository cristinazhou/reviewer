<template>
    <div draggable="true" id="modalAnnotation" @dragstart="dragStart($event)" @dragend="dragEnd($event)"
         style="width: 40%; height: auto;border-radius: 8px;box-shadow: 0 0 30px #8c939d">
        <Tooltip content="关闭" style="float:right" placement="top">
            <Icon @click.native="modalClose" type="close-circled" size="30" color="grey"
                  style="cursor: pointer"></Icon>
        </Tooltip>
        <Input autosize v-model=word type="textarea"/>
        <Input rows="4" placeholder="请输入批注" type="textarea" v-show="word.length > 0" v-model="annotation"/>
        <Button @click="annotate" style="border-bottom-left-radius: 8px">批注</Button>
    </div>
</template>

<script>
  import $ from 'jquery'
  export default {
    props: ['word', 'paperId', 'fileId'],
    data () {
      return {
        modalX: '',
        modalY: '',
        eStartX: '',
        eStartY: '',
        eCurX: '',
        eCurY: '',
        annotation: ''
      }
    },
    methods: {
      modalClose(){
        let modal = $("#modalAnnotation");
        modal.css('display', 'none');
      },
      dragStart(event){
        let e = event || window.event;
        let modal = $("#modalAnnotation");
        this.modalX = modal.offset().left;
        this.modalY = modal.offset().top;
        this.eStartX = e.clientX;
        this.eStartY = e.clientY;
      },
      dragEnd(event){
        let e = event || window.event;
        this.eCurX = e.clientX;
        this.eCurY = e.clientY;
        let modal = $("#modalAnnotation");
        let modalX = this.modalX;
        let modalY = this.modalY;
        let offsetX = this.eCurX - this.eStartX;
        let offsetY = this.eCurY - this.eStartY;
        modal.offset({top: modalY + offsetY, left: modalX + offsetX});
      },
      annotate() {
        let msg = this.$Message;
        let word = this.word;
        let formData = new FormData();
        let annotation = this.annotation;
        let paperId = this.paperId;
        let fileId = this.fileId;
        formData.append('word', word);
        formData.append('paperId', paperId);
        formData.append('fileId', fileId);
        formData.append('annotation', annotation);
        this.$axios({
          url: '/annotation/save',
          method: 'post',
          data: formData,
        }).then(function (response) {
          msg.success('批注添加成功');
          this.commit('annotationCreate');
        })
      }
    },
  }
</script>
<style scoped>

</style>
