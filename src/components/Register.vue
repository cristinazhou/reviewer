<template>
    <div class="content-wrapper">
        <div class="login-container">
            <div class="login-meta">

                <p>Reviewer 文档评阅系统</p>
            </div>
            <div class="register-form">
                <p>系统注册</p>
                <Select v-model="selected" style="width:240px">
                    <Option v-for="item in roleList" :value="item.value" :key="item.value">{{
                        item.label }}
                    </Option>
                </Select>
                <input type="text" v-model="username" placeholder="用户名"></input>
                <label style="margin-top: 0">
                    <input type="password" v-model="password" placeholder="密码"></input>
                    <input type="password" v-model="password1" placeholder="确认密码"></input>
                </label>
                <button @click="doLogin">返回登陆</button>
                <button @click="doRegister">注册</button>
            </div>
        </div>
    </div>
</template>

<script>
  export default {
    name: "Login",
    data() {
      return {
        username: "",
        password: "",
        password1: '',
        roleList: [],
        selected: 'student',
      };
    },
    methods: {
      getRole(){
        let roleList = this.roleList;
        this.$axios.get('/user/get_role').then(function (response) {
          if (response.data.meta.success) {
            let data = response.data;
            let roles = data.data;
            for (let i = 0; i < roles.length; ++i) {
              let role = roles[i];
              roleList.push({
                value: role.roleName,
                label: role.roleName,
              });
            }
          }
        });
        this.selected = 1;
      },
      checkValidity() {
        let isValid = true;
        if (!this.username) {
          this.$Message.error('用户名不能为空');

          return false;
        }
        if (!this.password || !this.password1) {
          this.$Message.error('密码不能为空');
          isValid = false;
        }

        if (this.password !== this.password1) {
          this.$Message.error('密码不一致');
          isValid = false;
        }

        if (!/^[-a-zA-Z0-9_]{2,30}$/.test(this.username)) {
          this.$Message.error('奇怪的用户名');
          isValid = false;
        }

        if (this.password.length < 3) {
          this.$Message.error('密码长度太短');
          isValid = false;
        }

        return isValid;
      },
      doLogin() {
        this.$router.push({path: "/"});
      },
      doRegister() {
        if (this.checkValidity()) {
          let router = this.$router;
          let message = this.$Message;
          var jsonStr = {"userName":this.username,"userPassword":this.password,"role":{"roleName":this.selected}}
          this.$axios({
            method:'post',
            url:'/user/register',

            headers:{'Content-Type': 'application/json'},

            data: JSON.stringify(jsonStr)
          })
            .then(function (response) {
              //alert(response.data.meta.message)
            if (response.data.meta.success===true) {
              message.success("注册成功");

              router.push({path:'/'});
            }
          }).catch(function (error) {
            //message.error(error);
          })
        }
      }
    },
    created () {
      this.getRole();
    }
  };
</script>


<style scoped lang="scss" type="text/scss">
    @import '../style/login.scss';

</style>
