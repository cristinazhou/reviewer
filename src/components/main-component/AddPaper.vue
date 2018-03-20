<template>
  <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
    <FormItem label="论文标题" prop="paperTitle">
      <Input v-model="formValidate.paperTitle" placeholder="Enter your title"/>
    </FormItem>
    <FormItem label="论文作者" prop="paperAuthor">
      <Input v-model="formValidate.paperAuthor" placeholder="Enter your author"/>
    </FormItem>
    <FormItem label="所有者" prop="paperOwner">
      <Input v-model="formValidate.paperOwner" placeholder="Enter your owner"/>
    </FormItem>
    <FormItem label="论文权限" prop="authority">
      <RadioGroup v-model="formValidate.authority">
        <Radio label="true" value="true">公开论文</Radio>
        <Radio label="false" value="false">私有论文</Radio>
      </RadioGroup>
    </FormItem>
    <FormItem >
      <form  class="file">
        <input type="file" @change="getFile($event)" />
        <button @click="submitForm($event)">上传</button>
      </form>
    </FormItem>


    <FormItem>
      <Button type="primary" @click="handleSubmit('formValidate')">Submit</Button>
      <Button type="ghost" @click="handleReset('formValidate')" style="margin-left: 8px">Reset</Button>
    </FormItem>
  </Form>


</template>

<script>
  export default {
    name: "AddPaper",
    data() {
      return {
        formValidate: {
          paperTitle: '',
          paperAuthor: '',
          paperOwner: '',
          authority: '',
          file: ''
        },
        ruleValidate: {
          paperTitle: [
            {required: true, message: 'The title cannot be empty', trigger: 'blur'}
          ],
          paperAuthor: [
            {required: true, message: 'The author cannot be empty', trigger: 'blur'}
          ],
          paperOwner: [
            {required: true, message: 'The owner cannot be empty', trigger: 'blur'}
          ],
          authority: [
            {required: true, message: 'Please select authority', trigger: 'change'}
          ]

        }
      }

    },
    methods: {
      handleSubmit(name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            this.$Message.success('Success!');
          } else {
            this.$Message.error('Fail!');
          }
        })
      },
      handleReset(name) {
        this.$refs[name].resetFields();
      },
      getFile(event) {
        this.file = event.target.files[0];
      },
      submitForm(event) {
        event.preventDefault();
        let file = this.formValidate.file;
        let formData = new FormData();
        formData.append('fileId', this.formValidate.file.fileId);
        formData.append('paperTitle',this.formValidate.paperTitle);
        //alert(formData.get('paperTitle'))
        formData.append('paperAuthor',this.formValidate.paperAuthor);
        formData.append('paperOwner',this.formValidate.paperOwner);
        formData.append('ispublic',this.formValidate.authority);
//        formData.append('Content-Type', 'application/json;charset=UTF-8');

        this.$axios({
          method: 'post',
          url: '/paper/create',
          data:formData,})
          .then(function (response) {
            alert(111)
            if (response.status === 200) {
              alert(111)
              /*这里做处理*/
            }
          })
      }
    }


  };
</script>



