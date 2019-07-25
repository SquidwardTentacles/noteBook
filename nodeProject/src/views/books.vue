<template>
  <div class="books">
    <div class="titlebox flexbox j-end">
      <p class="title">图书管理</p>
      <div @click="addbook">添加图书</div>
    </div>
    <div class="table-box">
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column align="center" type="index" label="序号" width="80">
        </el-table-column>
        <el-table-column align="center" prop="name" label="名称">
        </el-table-column>
        <el-table-column align="center" prop="auther" label="作者">
        </el-table-column>
        <el-table-column align="center" prop="category" label="类型">
        </el-table-column>
        <el-table-column align="center" prop="descrption" label="简介">
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
      insertid: 0
    };
  },
  mounted() {
    this.initdata();
  },
  methods: {
    initdata() {
      this.axios.get("/search").then(res => {
        if (res.data.errcode == 0) {
          this.tableData = res.data.data;
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
