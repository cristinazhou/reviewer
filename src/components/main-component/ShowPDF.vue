<template>
    <div style="height:100%;width:100%;display:table">
        <div style="float: left;width:20%;display: table-cell;height:100%">
            <Table :columns="columns" :data="data"></Table>
            <i-button @click="editAnnotationOnTextLayer">添加</i-button>
        </div>
        <div style="float:right;display:table-cell;width:80%;height:100%">
            <iframe ref="annotationIframe" :src='"/static/viewer/web/viewer.html?file=./testpdf/1707.04873"+".pdf"'
                    width="100%" height="100%"
                    scrolling="no"></iframe>
            <Annotation ref="annotationBtn" v-show="text.trim().length > 0" :text="text" :paperId="paperId"
                        :fileId="fileId"></Annotation>
        </div>
    </div>
</template>

<script>
  import Annotation from './Annotation.vue'
  import store from '../vuex/store.js'
  import $ from 'jquery'
  export default {
    name: "show-p-d-f",
    data(){
      return {
        textIframe: null,
        annotation: null,
        text: '',
        paperId: '',
        fileId: '',
        columns: [{
          title: '原文',
          key: 'word'
        },
          {
            title: '批注',
            key: 'comment'
          }],
        data: [
          {
            word: 1,
            comment: 2
          }
        ]
      };
    },
    components: {
      Annotation: Annotation
    },
    methods: {
      getParams () {
        return store.getters.temp;
      },
      editAnnotationOnTextLayer() {
        this.textIframe = this.$refs.annotationIframe;
        let textIframe = this.textIframe;
        let pages = $(textIframe.contentWindow.document).find(".page");
        if (pages.length) {
          for (let i = 0; i < pages.length; ++i) {
            let textLayer = $(pages[i]).children(".textLayer")[0];
            let divs = $(textLayer).find("div");
            if (divs.length) {
              for (let i = 0; i < divs.length; ++i) {
                $(divs[i]).off('mouseup', this.textSelect);
                $(divs[i]).on('mouseup', this.textSelect);
              }
            }
          }
        }
      },
      textSelect(event) {
        let selectedText = this.textIframe.contentWindow.getSelection().toString();
        if (selectedText !== null && selectedText.length > 0) {
          this.text = selectedText;
          let curNode = event.currentTarget;
          let x = $(curNode).offset().top;
          let y = $(curNode).offset().left;
          this.annotation = this.$refs.annotationBtn;
          let annotationBtn = this.annotation;
          $(annotationBtn.$el).offset({top: x, left: y});
        }
      },
    },
  }
</script>

<style scoped>

</style>
