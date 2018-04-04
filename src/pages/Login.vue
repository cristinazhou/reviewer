<template>
    <div class="content-wrapper">
        <div class="login-container">
            <div class="login-meta">
                <p>Reviewer 文档评阅系统</p>
            </div>
            <div class="login-form" @keyup.enter="doLogin">
                <p>系统登录</p>
                <label style="margin-bottom: 0">
                    <input type="text" v-model="userName" placeholder="用户名">
                </label>
                <label style="margin-top: 0">
                    <input type="password" v-model="password" placeholder="密码">
                </label>
                <button @click="doRegister">注册</button>
                <button @click="doLogin">登录</button>
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
        token: ""
      };
    },
    methods: {
      checkValidity(userName, password) {
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
        return true;
      },
      doLogin() {
        let userName = this.userName;
        let password = this.password;
        let store = this.$store;
        if (this.checkValidity(userName, password)) {
          let router = this.$router;
          let data = {
            "userName": this.userName,
            "userPassword": this.password
          };
          this.$axios({
            method: 'post',
            url: '/user/login',
            data: data
          }).then(function (response) {
            localStorage.setItem("token", response.data.data.tokn.token);
            store.commit('login', response.data.data.user.role.roleName);
            router.push({name: "home"});
          })
        }
      },
      doRegister() {
        this.$router.push({name: "register"});
      }
    }
  };
</script>

<style scoped lang="scss" type="text/scss">
    @import '~@/style/login.scss';
</style>
