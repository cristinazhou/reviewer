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
                <input type="text" v-model="userName" placeholder="用户名"/>
                <label style="margin-top: 0">
                    <input type="password" v-model="password" placeholder="密码"/>
                    <input type="password" v-model="passwordRepeat" placeholder="确认密码"/>
                </label>
                <button @click="doLogin">返回登陆</button>
                <button @click="doRegister">注册</button>
            </div>
        </div>
    </div>
</template>

<script>
  export default {
    data() {
      return {
        userName: "",
        password: "",
        passwordRepeat: '',
        roleList: [
          {
            value: 'student',
            label: 'student',
          }
        ],
        selected: 'student',
      };
    },
    methods: {
      checkValidity(userName, password, passwordRepeat) {
        if (!userName) {
          this.$Message.error('用户名不能为空');
          return false;
        }
        if (!password) {
          this.$Message.error('密码不能为空');
          return false;
        }
        if (!/^[-a-zA-Z0-9_]{2,30}$/.test(userName)) {
          this.$Message.error('奇怪的用户名');
          return false;
        }
        if (password.length < 3) {
          this.$Message.error('密码长度太短');
          return false;
        }

        if (password !== passwordRepeat) {
          this.$Message.error('密码不一致');
          return false;
        }
        return true;
      },
      getRole(){
        let _this = this;
        this.$axios.get('/user/roles').then(function (response) {
          if (response.data.meta.success) {
            //有bug
            let data = response.data;
            _this.roleList = [];
            let roles = data.data;
            for (let i = 0; i < roles.length; ++i) {
              let role = roles[i];
              _this.roleList.push({
                value: role.roleName,
                label: role.roleName,
              });
            }
          }
        });
        this.selected = 'student';
      },
      doLogin() {
        this.$router.push({name: "login"});
      },
      doRegister() {
        let userName = this.userName;
        let password = this.password;
        let passwordRepeat = this.passwordRepeat;
        if (this.checkValidity(userName, password, passwordRepeat)) {
          let router = this.$router;
          let message = this.$Message;
          let data = {
            "userName": this.userName,
            "userPassword": this.password,
            "role": {
              "roleName": this.selected
            }
          };
          this.$axios({
            method: 'post',
            url: '/user/register',
            data: data
          }).then(function (response) {
            message.success("注册成功");
            router.push({name: 'login'});
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
    @import '~@/style/login.scss';

</style>
