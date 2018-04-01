<template>
    <div style="height:100%;width:100%;display:table">
        <div style="float:left;display:table-cell;width:80%;height:100%">
            <iframe ref="annotationIframe" :src='"http://localhost:8080?file=./testpdf/1707.04873"+".pdf"'
                    width="100%" height="100%"
                    scrolling="no"></iframe>
            <ModalAnnotation @annotationCreate="find" ref="annotationBtn" v-show="word.trim().length > 0" :word="word"
                             :paperId="paperId"
                             :fileId="fileId"></ModalAnnotation>
        </div>
        <div style="float:right;width:20%;display: table-cell;height:100%">
            <Table :columns="columns" :data="annotations"></Table>
        </div>
    </div>
</template>
<script>
  import ModalAnnotation from '@/components/modals/ModalAnnotation.vue'
  import ButtonPDFAnnotation from '@/components/buttons/ButtonPDFAnnotation.vue'
  import $ from 'jquery'
  export default {
    data(){
      return {
        textIframe: null,
        annotation: null,
        word: '',
        paperId: '',
        fileId: '',
        columns: [
          {
            title: '原文',
            key: 'word'
          },
          {
            title: '批注',
            key: 'comment'
          },
          {
            title: '操作',
            key: 'annotationOp',
            render: function (h) {
              return h(ButtonPDFAnnotation, {
                props: {
                  annotationId: ''
                }
              })
            }
          }
        ],
        annotations: [
          {
            word: '我敲里吗',
            comment: '这个俚语很赞!'
          }
        ]
      };
    },
    components: {
      ModalAnnotation: ModalAnnotation,
      ButtonPDFAnnotation: ButtonPDFAnnotation
    },
    methods: {
      find() {
        let annotations = this.annotations;
        this.$axios({
          method: 'get',
          url: '/'
        }).then(function (response) {
          let data = response.data.data;
          if (data) {
            data.forEach(function (item) {
              annotations.push({
                word: item.word,
                comment: item.comment
              })
            })
          }
        })
      },
      annotationCreate() {
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
      annotationSearch() {
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
      annotationDelete() {
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
          this.word = selectedText;
          let curNode = event.currentTarget;
          let x = $(curNode).offset().top;
          let y = $(curNode).offset().left;
          this.annotation = this.$refs.annotationBtn;
          let annotationBtn = this.annotation;
          $(annotationBtn.$el).offset({top: x, left: y});
        }
      },
    },
  };
</script>

<style scoped>

</style>
