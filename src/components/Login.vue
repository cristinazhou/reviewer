<template>
  <div class="content-wrapper">
    <div class="login-container">
      <div class="login-meta">

        <p>Reviewer 文档评阅系统</p>
      </div>
      <div class="login-form" @keyup.enter="doLogin">
        <p>系统登录</p>
        <label>
          <Select v-model="model1" style="width:240px">
            <Option v-for="item in roleList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>

          <input type="text" v-model="username" placeholder="用户名"></input>
        </label>
        <label>
          <input type="password" v-model="password" placeholder="密码"></input>
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
        roleList: [
          {
            value: '1',
            label: 'student'
          },
          {
            value: '2',
            label: 'teacher'
          },
          {
            value: '3',
            label: 'administrator'
          }

        ],
        model1: ''

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

        if (this.password.legend < 3) {
          this.$Message.error('密码长度太短');
          isValid = false;
        }

        return isValid;
      },
      doLogin() {
        if (this.checkValidity()) {
          window.localStorage.setItem("username", this.username);

          this.$router.push({path: "/layout2"});
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
