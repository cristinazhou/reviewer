<template>
  <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
    <FormItem label="论文标题" prop="paperTitle">
      <Input v-model="formValidate.paperTitle" placeholder="Enter your title"></Input>
    </FormItem>
    <FormItem label="论文作者" prop="paperAuthor">
      <Input v-model="formValidate.paperAuthor" placeholder="Enter your author"></Input>
    </FormItem>
    <FormItem label="论文链接" prop="paperLink">
      <Input v-model="formValidate.paperLink" placeholder="Enter your link"></Input>
    </FormItem>

    <FormItem label="Date">
      <Row>
        <Col span="11">
        <FormItem prop="date">
          <DatePicker type="date" placeholder="Select date" v-model="formValidate.date"></DatePicker>
        </FormItem>
        </Col>
        <Col span="2" style="text-align: center">
        -</Col>
        <Col span="11">
        <FormItem prop="time">
          <TimePicker type="time" placeholder="Select time" v-model="formValidate.time"></TimePicker>
        </FormItem>
        </Col>
      </Row>
    </FormItem>
    <FormItem label="论文状态" prop="state">
      <RadioGroup v-model="formValidate.state">
        <Radio label="undo">未提交评审</Radio>
        <Radio label="doing">正在评审</Radio>
        <Radio label="done">已定稿</Radio>
      </RadioGroup>
    </FormItem>
    <FormItem label="论文权限" prop="authority">
      <RadioGroup v-model="formValidate.authority">
        <Radio label="public">公开论文</Radio>
        <Radio label="private">私有论文</Radio>
      </RadioGroup>
    </FormItem>
    <FormItem prop="upload">
      <Upload
        multiple
        type="drag"
        action="//jsonplaceholder.typicode.com/posts/">
        <div style="padding: 20px 0">
          <Icon type="ios-cloud-upload" size="60" style="color: #3399ff"></Icon>
          <p>Click or drag files here to upload</p>
        </div>
      </Upload>

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
          paperLink: '',
          state: '',
          authority: '',
          date: '',
          time: '',
          upload: ''
        },
        ruleValidate: {
          paperTitle: [
            {required: true, message: 'The title cannot be empty', trigger: 'blur'}
          ],
          paperAuthor: [
            {required: true, message: 'The author cannot be empty', trigger: 'blur'}
          ],
          paperLink: [
            {required: true, message: 'The city cannot be empty', trigger: 'blur'}
          ],
          state: [
            {required: true, message: 'Please select state', trigger: 'change'}
          ],
          authority: [
            {required: true, message: 'Please select authority', trigger: 'change'}
          ],
          date: [
            {required: true, type: 'date', message: 'Please select the date', trigger: 'change'}
          ],
          time: [
            {required: true, type: 'date', message: 'Please select time', trigger: 'change'}
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
      }
    }


  };
</script>



