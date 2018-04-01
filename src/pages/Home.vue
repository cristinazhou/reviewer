<template>
    <div class="layout">
        <Sider :style="{position: 'fixed', height: '100vh', left: 0, overflow: 'auto'}">
            <Menu active-name="1-2" theme="dark" width="auto" :open-names="['1']">
                <Submenu name="1">
                    <template slot="title">
                        <Icon type="ios-navigate"></Icon>
                        公开论文
                    </template>
                    <MenuItem name="1-1" @click.native="paperSearch">搜索论文</MenuItem>
                </Submenu>
                <Submenu name="2">
                    <template slot="title">
                        <Icon type="ios-keypad"></Icon>
                        个人中心
                    </template>
                    <MenuItem name="2-1" @click.native="myPaper">我的论文</MenuItem>
                    <MenuItem name="2-2" @click.native="myAnnotation">我的批注</MenuItem>
                    <MenuItem name="2-3" @click.native="myCollection">我的收藏</MenuItem>
                </Submenu>
                <Submenu name="3">
                    <template slot="title">
                        <Icon type="ios-analytics"></Icon>
                        论文评审
                    </template>
                    <MenuItem name="3-1" @click.native="paperUnreviewed">未评审</MenuItem>
                    <MenuItem name="3-2" @click.native="paperReviewing">正在评审</MenuItem>
                    <MenuItem name="3-3" @click.native="paperReviewed">已定稿</MenuItem>
                </Submenu>
                <Submenu name="4">
                    <template slot="title">
                        <Icon type="ios-analytics"></Icon>
                        新建论文
                    </template>
                    <MenuItem name="4-2" @click.native="fileCreate">文件管理</MenuItem>
                    <MenuItem name="4-1" @click.native="paperCreate">上传论文</MenuItem>

                </Submenu>
            </Menu>
        </Sider>
        <Layout :style="{marginLeft: '200px'}">

            <Header :style="{background: '#fff', boxShadow: '0 2px 3px 2px rgba(0,0,0,.1)'}">
                <Row type="flex" justify="end" align="middle" class="user-dropdown-innercon">
                    <Dropdown transfer trigger="click" @on-click="handleClickUserDropDown">
                        <a href="javascript:void(0)">
                            <span class="main-user-name">{{ userName.length ? userName : 'test' }}</span>
                            <Icon type="arrow-down-b"></Icon>
                        </a>
                        <DropdownMenu slot="list">
                            <DropdownItem name="logout" divided>退出登录</DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                    <Avatar :src="avatorPath" style="background: #619fe7;margin-left: 10px;"></Avatar>
                </Row>
            </Header>
            <Content :style="{padding: '0 16px 16px'}">
                <div :style="{margin: '16px 0'}">
                </div>
                <Card>
                    <div style="height: 600px">
                        <router-view/>
                    </div>
                </Card>
            </Content>
        </Layout>
    </div>
</template>
<script>
  export default {
    data() {
      return {
        userName: localStorage.getItem("userName") ? localStorage.getItem("username") : '',
        avatorPath : ''
      }
    },
    methods: {
      myAnnotation() {
        this.$router.push({name: "myAnnotation"});
      },
      myCollection() {
        this.$router.push({name: "myCollection"});
      },
      paperCreate() {
        this.$router.push({name: "paperCreate"});
      },
      paperSearch() {
        this.$router.push({name: "paperSearch"});
      },
      myPaper() {
        this.$router.push({name: "myPaper"});
      },
      paperUnreviewed() {
        this.$router.push({name: "paperUnreviewed"});
      },
      paperReviewing() {
        this.$router.push({name: "paperReviewing"});
      },
      paperReviewed(){
        this.$router.push({name: 'paperReviewed'});
      },
      fileCreate() {
        this.$router.push({name: "myFile"});
      },
      handleClickUserDropDown(name) {
        if (name === 'logout') {
          this.$axios.get('/user/exit?userName=' + this.userName)
            .then(function (response) {
              localStorage.removeItem('token');
              this.$router.push({name: "login"});
            })
        }
      }
    }
  }
</script>
<style scoped>
    .layout {
        border: 1px solid #d7dde4;
        background: #f5f7f9;
        position: relative;
        border-radius: 4px;
        overflow: hidden;
    }
</style>
