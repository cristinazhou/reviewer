<template>
    <div id="target" style="width: 200px; height: auto;">
        <Input v-model=word type="textarea" autosize="true" readonly="true"/>
        <Input type="textarea" v-if="word.length > 0" v-model="annotation" autosize="true"/>
        <Button type="primary" @click="annotate">批注</Button>
    </div>
</template>

<script>
  export default {
    props: ['word', 'paperId', 'fileId'],
    data () {
      return {
        annotation: ''
      }
    },
    methods: {
      move(e){
        let div = document.getElementById("target");
        div.style.left = e.clientX + "px";
        div.style.right = e.clientY + "px";
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
          url: '/annotation/save',
          method: 'post',
          data: formData,
        }).then(function (response) {
          this.$emit('annotationCreate');
        })
      }
    },
  }
</script>
<style scoped>

</style>
