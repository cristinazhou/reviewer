<template>
<div>
  <i-form :model="formLeft" label-position="left" :label-width="100">
    <Form-item label="论文名称">
      <i-input :value.sync="formLeft.input1"></i-input>
    </Form-item>
    <Form-item label="论文作者">
      <i-input :value.sync="formLeft.input2"></i-input>
    </Form-item>
    <Form-item label="文件列表">
      <!--<i-select :model.sync="model1" style="width:200px">-->
        <!--<i-option v-for="item in cityList" :value="item.value">{{ item.label }}</i-option>-->
      <!--</i-select>-->
    </Form-item>
    <Form-item label="操作">
      <i-button type="primary" @click='show' size="small" >预览文件</i-button>
    </Form-item>
  </i-form>


</div>
</template>

<script>
    export default {
      data () {
        return {
          formLeft: {
            input1: '',
            input2: '',
            input3: ''
          }

        }
      },
      methods:{
        show(){
          this.$router.push({path:'/showpdf'})
        }
      }

    }
</script>

<style scoped>

</style>
