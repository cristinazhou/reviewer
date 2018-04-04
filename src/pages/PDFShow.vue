<template>
    <div style="height:100%;width:100%;">
        <div style="float:left;width:70%;height:100%">
            <iframe ref="annotationIframe" :src="pdfUrl"
                    width="100%" height="100%"
                    scrolling="no"></iframe>
            <ModalAnnotation @annotationCreate="annotationGet" ref="modalAnnotation"
                             v-show="word.trim().length > 0"
                             :word="word"
                             :paperId="paperId"
                             :fileId="fileId"></ModalAnnotation>
        </div>
        <div style="float:right;width:30%;height:100%">
            <Button v-if="annotationMode === false" size="small"
                    @click.native="annotationModeSwitch(annotationMode)">开启批注模式
            </Button>
            <Button v-else size="small" @click.native="annotationModeSwitch(annotationMode)">关闭批注模式</Button>
            <Input v-model="keyWord" @keyup.enter.native="annotationSearch(keyWord)" placeholder="搜索关键字"
                   icon="search"/>
            <ModulePDFAnnotation :annotations="annotations"></ModulePDFAnnotation>
        </div>
    </div>
</template>
<script>
  import ModalAnnotation from '@/components/modals/ModalAnnotation.vue'
  import ButtonPDFAnnotation from '@/components/buttons/ButtonPDFAnnotation.vue'
  import ModulePDFAnnotation from '@/components/modules/ModulePDFAnnotation.vue'
  import $ from 'jquery'
  export default {
    components: {
      ModalAnnotation: ModalAnnotation,
      ButtonPDFAnnotation: ButtonPDFAnnotation,
      ModulePDFAnnotation: ModulePDFAnnotation
    },
    computed: {
      annotationDelete(){
        return this.$store.state.app.annotationDelete;
      },
      annotationCreate(){
        return this.$store.state.app.annotationCreate;
      }
    },
    watch: {
      annotationDelete(val){
        this.pageList();
      },
      annotationCreate(val){
        this.pageList();
      }
    },
    data(){
      return {
        keyWord: '',
        DEFAULT_URL: '',
        annotationMode: false,
        textIframe: null,
        annotation: null,
        word: '',
        paperId: '',
        fileId: '',
        annotations: [
          {
            id: 1,
            word: '我敲里吗',
            comment: '这个俚语很赞!'
          },
          {
            id: 2,
            word: '我敲里吗来来??',
            comment: '这个俚语也很赞!'
          }
        ]
      };
    },
    methods: {
      annotationSearch(keyWord){
        if (keyWord.trim().length > 0) {
          let containerCollapse = $(".container-collapse")[0];
          let collapseChildren = $(containerCollapse).children("div");
          if (collapseChildren.length) {
            for (let i = 0; i < collapseChildren.length; ++i) {
              let item = $(collapseChildren[i]).find(".ivu-collapse-item")[0];
              let nodeHeader = $(item).children(".ivu-collapse-header")[0];
              let nodeContent = $(item).children(".ivu-collapse-content")[0];
              let nodeContentBox = $(nodeContent).children(".ivu-collapse-content-box")[0];

              let word = $(nodeHeader).text().trim().substr(4,);
              let comment = $($(nodeContentBox).children("p")[0]['childNodes'][0]).text().trim().substr(4,);
              if (word.indexOf(keyWord) !== -1 || comment.indexOf(keyWord) !== -1) {
                $(item).addClass("collapse-item-active");
                $(nodeContent).css("display", "block");
              } else {
                $(item).removeClass("collapse-item-active");
                $(nodeContent).css("display", "none");
              }
            }
          }
        }
      },
      init(){
        let _this = this;
        this.$axios({
          url: '/file/pdf/' + _this.$route.query.fileId,
          method: 'get',
        }).then(function (response) {
          let rawLength = response.length;
          let array = new Uint8Array(new ArrayBuffer(rawLength));
          for (let i = 0; i < rawLength; i++) {
            array[i] = response.charCodeAt(i) & 0xff;
          }
          _this.DEFAULT_URL = array;
        });
      },
      annotationGet() {
        let _this = this;
        this.$axios({
          method: 'get',
          url: '/'
        }).then(function (response) {
          let data = response.data.data;
          _this.annotations = [];
          if (Object.keys(response.data.data).length !== 0 && data.length !== 0) {
            data.forEach(function (item) {
              _this.annotations.push({
                id: item.id,
                word: item.word,
                comment: item.comment
              })
            })
          }
        })
      },
      annotationModeSwitch(mode) {
        this.annotationMode = !mode;
        this.word = '';
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
                if (!mode) {
                  $(divs[i]).on('mouseup', this.textSelect);
                }
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
          let x = $(curNode).offset().left;
          let y = $(curNode).offset().top;
          this.annotation = this.$refs.modalAnnotation;
          let annotationBtn = this.annotation.$el;
          if ($(annotationBtn).css('display') === 'none') {
            $(annotationBtn).css('display', 'block');
          }
          $(annotationBtn).offset({top: y, left: x});
        }
      },
    },
    mounted() {
      this.init();
    }
  };
</script>

<style scoped>

</style>
