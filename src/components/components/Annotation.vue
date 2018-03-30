<template>
    <div id="target" onmousemove="move();"  style="width: 200px; height: auto;">
      <i-input  v-model=word type="textarea" autosize="true" readonly="true" ></i-input>

        <i-input type="textarea" v-if="word.length > 0" v-model="annotation" autosize="true"></i-input>
      <i-button type="primary"  @click="annotate">批注</i-button>
    </div>
</template>

<script>
  export default {
    props: ['word', 'paperId', 'fileId'],
    data () {
      return {
        annotation: '',
      }
    },
    methods: {
      move(e){
        var div = document.getElementById("target");
        div.style.left=e.clientX+"px";
        div.style.right=e.clientY+"px";

    },
      annotate() {
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
          url: 'user/check',
          method: 'post',
          data: formData,
        }).then(function (response) {
          this.$emit('annotationPostListener');
        })
      }
    },
  }
</script>
<style scoped>

</style>
