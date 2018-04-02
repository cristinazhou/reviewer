<template>
    <div class="container-collapse">
        <Collapse value="annotation.id" v-for="annotation in annotations">
            <Panel name="annotation.id">原文: {{ annotation.word }}
                <p slot="content">批注: {{ annotation.comment }}
                    <Button @click.native="annotationDelete(annotation.id)" size="small" type="primary"
                            style="float: right;">删除批注
                    </Button>
                </p>
            </Panel>
        </Collapse>
    </div>
</template>

<script>
  import DropDownFile from '@/components/dropdowns/DropDownFile.vue'
  export default {
    name: 'ModulePDFAnnotation',
    props: {
      annotations: {
        type: Array,
        default () {
          return [];
        }
      },
    },
    data () {
      return {}
    },
    methods: {
      annotationDelete(annotationId){
        let msg = this.$Message;
        let store = this.$store;
        this.$axios({
          url: 'annotation/delete',
          method: 'post',
          data: {
            annotationId: annotationId,
          }
        }).then(function (response) {
          msg.success('批注删除成功');
          store.commit('annotationDelete');
        })
      }
    },
  };
</script>
<style lang="scss" type="text/scss">
</style>
