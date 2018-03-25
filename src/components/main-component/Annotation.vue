<template>
    <div style="width: 200px; height: auto;">
        <i-button type="primary" size="small" @click="annotate">批注</i-button>
        <p>{{ word }}</p>
        <textarea v-if="word.length > 0" v-model="annotation"></textarea>
    </div>
</template>

<script>
  import store from '../vuex/store.js'
  export default {
    props: ['word', 'paperId', 'fileId'],
    data () {
      return {
        annotation: '',
      }
    },
    methods: {
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
          url: '',
          method: 'post',
          data: formData,
        }).then(function (response) {
          alert("批注成功");
        })
      }
    },
    onCreated() {

    }
  }
</script>
<style scoped>

</style>