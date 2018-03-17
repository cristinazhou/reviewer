<style scoped>
    .layout {
        border: 1px solid #d7dde4;
        background: #f5f7f9;
        position: relative;
        border-radius: 4px;
        overflow: hidden;
    }

    .layout-header-bar {
        background: #fff;
        box-shadow: 0 1px 1px rgba(0, 0, 0, .1);
    }
</style>
<template>
    <div class="layout">
        <Sider :style="{position: 'fixed', height: '100vh', left: 0, overflow: 'auto'}">
            <Menu active-name="1-2" theme="dark" width="auto" :open-names="['1']">
                <Submenu name="1">
                    <template slot="title">
                        <Icon type="ios-navigate"></Icon>
                        公开论文
                    </template>
                    <MenuItem name="1-1" @click.native="search">搜索论文</MenuItem>
                </Submenu>
                <Submenu name="2">
                    <template slot="title">
                        <Icon type="ios-keypad"></Icon>
                        我的论文
                    </template>
                    <MenuItem name="2-1" @click.native="mypaper">我的收藏</MenuItem>
                    <MenuItem name="2-2">我的批注</MenuItem>
                    <MenuItem name="2-3">私有论文</MenuItem>
                </Submenu>
                <Submenu name="3">
                    <template slot="title">
                        <Icon type="ios-analytics"></Icon>
                        论文评审
                    </template>
                    <MenuItem name="3-1" @click.native="unreviewer">未评审</MenuItem>
                    <MenuItem name="3-2">正在评审</MenuItem>
                    <MenuItem name="3-3">已定稿</MenuItem>
                </Submenu>
                <Submenu name="4">
                    <template slot="title">
                        <Icon type="ios-analytics"></Icon>
                        新建论文
                    </template>
                    <MenuItem name="4-1" @click.native="info">上传论文</MenuItem>
                  <MenuItem name="4-2" @click.native="addfile">上传文件</MenuItem>

                </Submenu>
            </Menu>
        </Sider>
        <Layout :style="{marginLeft: '200px'}">
            <Header :style="{background: '#fff', boxShadow: '0 2px 3px 2px rgba(0,0,0,.1)'}">
                <div>
                    <Row type="flex" justify="end" align="middle" class="user-dropdown-innercon">
                        <Dropdown transfer trigger="click" @on-click="handleClickUserDropdown">
                            <a href="javascript:void(0)">
                                <span class="main-user-name">{{ userName }}</span>
                                <Icon type="arrow-down-b"></Icon>
                            </a>
                            <DropdownMenu slot="list">
                                <DropdownItem name="loginout" divided>退出登录</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                        <Avatar :src="avatorPath" style="background: #619fe7;margin-left: 10px;"></Avatar>
                    </Row>
                </div>
            </Header>
            <Content :style="{padding: '0 16px 16px'}">
                <div :style="{margin: '16px 0'}">
                    <!--<breadcrumb-nav>哈哈哈-->
                    <!--</breadcrumb-nav>-->
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
        userName: localStorage.getItem("username"),
        avatorPath: ''
      }
    },
    computed: {
      currentPath() {

      }
    },
    methods: {
      init() {
      },
      info() {
        this.$router.push({path: "/addPaper"});
      },
      search() {
        this.$router.push({path: "/search"});
      },
      mypaper() {
        this.$router.push({path: "/mypaper"});
      },
      unreviewer() {
        this.$router.push({path: "/unreviewer"});
      },
      addfile() {
        this.$router.push({path: "/addfile"});
      },
      handleClickUserDropdown(name) {
        if (name === 'loginout') {
          localStorage.removeItem('token');
          this.$router.push({path: "/"});
        }
      }
    },

    mounted() {
      this.init();
    }
  }

</script>
