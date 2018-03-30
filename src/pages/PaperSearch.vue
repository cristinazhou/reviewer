  <template>
    <div>
        <div style="">
            <!--此处输入框的model是否绑定了？-->
            <Input v-model="value" placeholder="请输入论文名" style="width: 200px"/>
            <i-button type="primary" @click="search">搜索</i-button>
            <Table height="531" :columns="columns1" :data="data2">
            </Table>
        </div>
        <div style="border:1px">
            <Page :total="dataCount"
                  :current="pageNum"
                  :page-size="pageSize"
                  show-elevator show-sizer
                  placement="top" @on-change="handlePage" @on-page-size-change='handlePageSize'></Page>
        </div>
    </div>
</template>
<script>
  import Operation from '../components/Operation.vue'
  export default {
    components: {
      Operation,
    },
    data() {
      return {
        dataCount: 40,
        pageNum: 1,
        pageSize: 10,
        value: '',
        key: '',
        columns1: [
          {
            title: '序号',
            key: 'id'
          },
          {
            title: '论文名称',
            key: 'name'
          },
          {
            title: '论文作者',
            key: 'author'
          },
          {
            title: '论文所有者',
            key: 'owner'
          },
          {
            title: '操作',
            key: 'operation',
            render: function (h, params) {
              return h(Operation, {
                props: {
                  paperId: params.row.id,
                  paperStatus: params.row.status,
                }
              })
            }
          }
        ],
        data2: []
      }
    },
    methods: {
      handlePage(value){
        this.pageNum = value;
        data2 = [];
        this.pageList();

      },
      handlePageSize(value){
        this.pageSize = value;
        this.pageList();
      },
      pageList: function () {
        let data2 = this.data2;
        let key = this.key;
        this.$axios({
          method: 'get',
          data: {
            key: key,
          },
          url: '/public_paper/list?pageNo=' + this.pageNum + '&pageSize=' + this.pageSize
        }).then(function (response) {
          let data = response.data.data;
          if (data) {
            data.forEach(function (paper) {
              data2.push({
                id: paper.id,
                name: paper.paperTitle,
                author: paper.paperAuthor,
                owner: paper.paperOwner,
                status: paper.ispublic
              })
            })
          }
        })
      },
      search() {
        //只有在搜索的时候把搜索框的value绑定一次到key上
        this.key = this.value;
        this.pageList();
      }
    },
    created() {
    }
  };
</script>
