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
        <FormItem>
            <Transfer
                    :data="dataLeft"
                    :target-keys="targetKeys"
                    :list-style="listStyle"
                    :render-format="render3"
                    :operations="['To left','To right']"
                    filterable
                    @on-change="handleChange3">
                <div :style="{float: 'right', margin: '5px'}">
                    <Button type="ghost" size="small" @click="reloadMockData">Refresh</Button>
                </div>
            </Transfer>
            <!--<form  class="file">-->
            <!--<input type="file" @change="getFile($event)" />-->
            <!--<button @click="submitForm($event)">上传</button>-->
            <!--</form>-->
        </FormItem>
        <FormItem>
            <i-button type="primary" @click="handleSubmit('formValidate')">Submit</i-button>
        </FormItem>
    </Form>


</template>

<script>
  export default {
    name: "AddPaper",
    data() {
      return {
        listStyle: {},
        dataCount: 40,
        pageNum: 1,
        pageSize: 10,
        formValidate: {
          paperTitle: '',
          paperAuthor: '',
          paperOwner: '',
          authority: '',
          file: ''
        },
        dataLeft: this.getMockData(),
        targetKeys: this.getTargetKeys(),
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
      getMockData () {
        var mockData = [];
        this.$axios({
          method: 'get',
          url: '/file/user_list'
        }).then(function (response) {
            if (response.status === 200) {
              for (let i = 0; i < response.data.data.length; i++) {
                mockData.push({
                  key: i,
                  label: response.data.data[i].fileName,
                  fileId: response.data.data[i].id,
                  //disabled: Math.random() * 3 < 1
                });
              }

            } else {
              console.log('error');
            }

          })
        return mockData;
      },
      getTargetKeys () {
        return this.getMockData()
          .filter(() => Math.random() * 2 > 1)
          .map(item => item.key);
      },
      handleChange3 (newTargetKeys) {
        this.targetKeys = newTargetKeys;
      },
      render3 (item) {
        return item.label;
      },
      reloadMockData () {
        this.dataLeft = this.getMockData();
        this.targetKeys = this.getTargetKeys();
      },
      handleReset(name) {
        this.$refs[name].resetFields();
      },
      handleSubmit (name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            this.$axios.get('/paper/create',{
              params:{
                paperTitle: this.formValidate.paperTitle,
                paperAuthor: this.formValidate.paperAuthor,
                isPublic: this.formValidate.authority,
                fileId: this.targetKeys[0].fileId

              }})
              .then(function(response){
                message.success('论文新建成功');
              })
          } else {
            this.$Message.error('表单验证失败!');
          }
        })
      }


      }
  };
</script>



