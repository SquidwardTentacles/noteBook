<template>
  <div class="books">
    <p class="title">图书管理</p>
    <div class="table-box">
      <el-table :data="tableData" border style="width: 100%">
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
            <el-button type="text" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <el-dialog title="收货地址" :visible.sync="dialogTableVisible">
      <el-table :data="gridData">
        <el-table-column
          property="date"
          label="日期"
          width="150"
        ></el-table-column>
        <el-table-column
          property="name"
          label="姓名"
          width="200"
        ></el-table-column>
        <el-table-column property="address" label="地址"></el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tableData: [],
      editBook: {}
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
    }
  }
};
</script>
<style lang="scss" scoped>
.books {
  .table-box {
    width: 100%;
  }
}
</style>
