<template>
  <div class="books">
    <p class="title">图书管理</p>
    <div class="titlebox flexbox between">
      <div @click="addbook">添加图书</div>
    </div>
    <div class="table-box">
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column align="center" type="index" label="序号" width="80">
        </el-table-column>
        <el-table-column
          v-for="(item, index) in tableOptiions"
          :key="index"
          align="center"
          :prop="item.prop"
          :label="item.label"
        >
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small"
              >编辑</el-button
            >
            <el-button type="text" @click="delectData(scope.row)" size="small"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <div id="main"></div>
    </div>
    <div class="booksEdit">
      <el-dialog title="收货地址" :visible.sync="dialogTableVisible">
        <div class="dialoginput">
          <div class="flexbox j-center">
            <span>名称 : </span>
            <el-input
              placeholder="请输入书籍名称"
              v-model="dialogData.name"
              clearable
            >
            </el-input>
          </div>
          <div class="flexbox j-center">
            <span>作者 : </span>
            <el-input
              placeholder="请输入书籍作者"
              v-model="dialogData.auther"
              clearable
            >
            </el-input>
          </div>
          <div class="flexbox j-center">
            <span>分类 : </span>
            <el-input
              placeholder="请输入书籍所属分类"
              v-model="dialogData.category"
              clearable
            >
            </el-input>
          </div>
          <div class="flexbox j-center">
            <span>简介 : </span>
            <el-input
              placeholder="请输入书籍简介"
              v-model="dialogData.descrption"
              clearable
            >
            </el-input>
          </div>
          <div class="flexbox j-end">
            <el-button type="primary" @click="updateEdit">提交</el-button>
            <el-button @click="cancel">取消</el-button>
          </div>
        </div>
      </el-dialog>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tableData: [],
      editBook: {},
      dialogTableVisible: false,
      dialogData: {},
      insertid: 0,
      tableOptiions: [
        { prop: "name", label: "名称" },
        { prop: "auther", label: "作者" },
        { prop: "category", label: "类型" },
        { prop: "descrption", label: "简介" }
      ]
    };
  },
  mounted() {
    this.initdata();
  },
  methods: {
    getEcharts() {
      // 基于准备好的dom，初始化echarts实例
      var myChart = this.echarts.init(document.getElementById("main"));

      myChart.setOption({
        // title: {
        //   text: "站点用户访问来源",
        //   subtext: "纯属虚构",
        //   x: "center"
        // },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          orient: "vertical",
          left: "left",
          data: ["站点注册人数", "当前账号访问次数", "书籍总数"]
        },
        label: {
          normal: {
            position: "inner"
          }
        },
        series: [
          {
            name: "访问来源",
            type: "pie",
            radius: "55%",
            center: ["50%", "60%"],
            data: [
              {
                value: this.$store.getters.getTotalUser,
                name:
                  "站点注册人数" +
                  "(" +
                  this.$store.getters.getTotalUser +
                  "人)"
              },
              {
                value: this.$store.getters.getCount,
                name:
                  "当前账号访问次数" + "(" + this.$store.getters.getCount + ")"
              },
              {
                value: this.tableData.length,
                name: "书籍总数" + "(" + this.tableData.length + ")"
              }
            ],
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            }
          }
        ]
      });
    },
    initdata() {
      this.axios.get(`/search?user=${this.$route.query.user}`).then(res => {
        if (res.data.errcode == 0) {
          this.tableData = res.data.data;
          this.getEcharts();
        } else {
          this.$message.error(res.data.message);
        }
      });
    },
    handleClick(item) {
      this.editBook = item;
      this.dialogTableVisible = true;
      this.axios.get(`/searchBookById?id=${item.id}`).then(res => {
        if (res.data.errcode === 0) {
          this.dialogData = res.data.data;
        } else {
          this.$message.error(res.data.message);
        }
      });
    },
    updateEdit() {
      let url = "";
      if (!this.insertid) {
        // insertid为0 就是提交编辑 否则就是新增
        url = "/updateEdit";
      } else {
        url = "/insertBooks";
        this.dialogData.user = this.$store.getters.getusername;
      }
      this.axios.put(url, this.dialogData).then(res => {
        if (res.data.errcode === 0) {
          this.$message.success(res.data.message);
          this.dialogTableVisible = false;
          this.dialogData = {};
          this.initdata();
        } else {
          this.$message.error(res.data.message);
        }
      });
    },
    cancel() {
      this.dialogTableVisible = false;
      this.dialogData = {};
    },
    delectData(item) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.axios
            .delete(`/deleteBook?id=${item.id}`)
            .then(res => {
              if (res.data.errcode === 0) {
                this.$message.success(res.data.message);
                this.initdata();
              } else {
                this.$message.error(res.data.message);
              }
            })
            .catch(err => {
              console.log(err);
            });
        })
        .catch(() => {});
    },
    addbook() {
      this.dialogTableVisible = true;
      this.dialogData = {};
      this.insertid = 1;
    }
  }
};
</script>
<style lang="scss" scoped>
.books {
  .table-box {
    width: 100%;
    margin-top: 10px;
  }
  #main {
    width: 700px;
    height: 500px;
  }
  .titlebox {
    .title {
      margin-right: 50%;
      transform: translateX(50%);
    }
    button {
      margin-right: 10px;
      padding: 5px 10px;
    }
    div {
      padding: 5px 20px;
      font-size: 14px;
      background-color: lightgreen;
      color: #fff;
      border-radius: 5px;
      cursor: pointer;
    }
  }
  .dialoginput {
    width: 95%;
    margin: 0 auto;
    span {
      width: 70px;
    }
    .flexbox {
      margin-bottom: 10px;
    }
  }
}
</style>
<style lang="scss">
.books {
  .booksEdit {
    .el-dialog {
      width: 500px;
    }
  }
}
</style>
