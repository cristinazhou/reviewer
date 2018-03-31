<template>
    <div style="height:100%;width:100%;display:table">
        <div style="float:left;display:table-cell;width:80%;height:100%">
            <iframe ref="annotationIframe" :src='"/static/viewer/web/viewer.html?file=./testpdf/1707.04873"+".pdf"'
                    width="100%" height="100%"
                    scrolling="no"></iframe>
            <Annotation @annotationPostListener="find" ref="annotationBtn" v-show="word.trim().length > 0" :word="word"
                        :paperId="paperId"
                        :fileId="fileId"></Annotation>
        </div>
        <div style="float:right;width:20%;display: table-cell;height:100%">
            <Table :columns="columns" :data="data"></Table>
            <i-button @click="editAnnotationOnTextLayer">添加</i-button>
            <i-button>查询</i-button>
            <i-button>删除</i-button>
        </div>
    </div>
</template>
<script>
  import Annotation from '@/components/Annotation.vue'
  import store from '../vuex/store.js'
  import $ from 'jquery'
  export default {
    name: "show-p-d-f",
    computed: {
      refresh(){
        return this.$store.state.refresh;
      }
    },
    data(){
      return {
        textIframe: null,
        annotation: null,
        word: '',
        paperId: '',
        fileId: '',
        columns: [{
          title: '原文',
          key: 'word'
        }, {
          title: '批注',
          key: 'comment'
        }],
        data: [
          {
            word: '我敲里吗',
            comment: '这个俚语很赞!'
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
      find() {
        let data1 = this.data;
        this.$axios({
          method: 'get',
          url: '/'
        }).then(function (response) {
          let data = response.data.data;
          if (data) {
            data.forEach(function (item) {
              data1.push({
                word: item.word,
                comment: item.comment,
              })
            })
          }
        })
      }, editAnnotationOnTextLayer() {
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
