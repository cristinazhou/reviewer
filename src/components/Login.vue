<template>
    <div class="content-wrapper">
        <div class="login-container">
            <div class="login-meta"
            <p>Reviewer 文档评阅系统</p>
        </div>
        <div class="login-form" @keyup.enter="doLogin">
            <p>系统登录</p>
            <label style="margin-bottom: 0">
                <input type="text" v-model="username" placeholder="用户名">
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
    name: "Login",
    data() {
      return {
        username: "",
        password: "",
        token: ""
      };
    },
    methods: {
      checkValidity() {
        let isValid = true;
        if (!this.username) {
          this.$Message.error('用户名不能为空');
          return false;
        }
        if (!this.password) {
          this.$Message.error('密码不能为空');
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
        if (this.checkValidity()) {
          var router = this.$router;
          this.$axios.post('/user/login', {
            userName: this.username,
            userPassword: this.password
          }).then(function (response) {
            if (response.data.meta.success) {
              localStorage.setItem("token", response.data.data.token);
              router.push({path: "/layout2"});
            } else {
              this.$Message.error(response.data.meta.message);
            }
          }).catch(function (error) {
            this.$Message.error(error);
          });
        }
      },
      doRegister() {
        this.$router.push({path: "/register"});
      }
    }
  };
</script>


<style scoped lang="scss" type="text/scss">
    @import '../style/login.scss';


</style>
