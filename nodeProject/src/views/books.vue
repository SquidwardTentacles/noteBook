<template>
  <div class="books">
    <p class="title">图书管理</p>
    <div class="titlebox flexbox between">
      <div @click="addbook">添加图书</div>
    </div>
    <div class="table-box">
      <el-table :data="tableData"
                border
                style="width: 100%">
        <el-table-column align="center"
                         type="index"
                         label="序号"
                         width="80">
        </el-table-column>
        <el-table-column v-for="(item, index) in tableOptiions"
                         :key="index"
                         align="center"
                         :prop="item.prop"
                         :label="item.label">
        </el-table-column>
        <el-table-column label="操作"
                         align="center">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)"
                       type="text"
                       size="small">编辑</el-button>
            <el-button type="text"
                       @click="delectData(scope.row)"
                       size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div id="main"></div>
      <div class="fexbox between">
        <p>这是第{{ this.$store.state.count }}次访问</p>
        <p>当前站点注册总人数 ：{{ this.$store.state.totalUser }}人</p>
      </div>
    </div>
    <div class="booksEdit">
      <el-dialog title="收货地址"
                 :visible.sync="dialogTableVisible">
        <div class="dialoginput">
          <div class="flexbox j-center">
            <span>名称 : </span>
            <el-input placeholder="请输入书籍名称"
                      v-model="dialogData.name"
                      clearable>
            </el-input>
          </div>
          <div class="flexbox j-center">
            <span>作者 : </span>
            <el-input placeholder="请输入书籍作者"
                      v-model="dialogData.auther"
                      clearable>
            </el-input>
          </div>
          <div class="flexbox j-center">
            <span>分类 : </span>
            <el-input placeholder="请输入书籍所属分类"
                      v-model="dialogData.category"
                      clearable>
            </el-input>
          </div>
          <div class="flexbox j-center">
            <span>简介 : </span>
            <el-input placeholder="请输入书籍简介"
                      v-model="dialogData.descrption"
                      clearable>
            </el-input>
          </div>
          <div class="flexbox j-end">
            <el-button type="primary"
                       @click="updateEdit">提交</el-button>
            <el-button @click="cancel">取消</el-button>
          </div>
        </div>
      </el-dialog>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      tableData: [],
      editBook: {},
      dialogTableVisible: false,
      dialogData: {},
      insertid: 0,
      tableOptiions: [
        { prop: "auther", label: "作者" },
        { prop: "category", label: "类型" },
        { prop: "descrption", label: "简介" }
      ]
    };
  },
  mounted () {
    this.initdata();
    this.getEcharts();
  },
  methods: {
    getEcharts () {
      // 基于准备好的dom，初始化echarts实例
      var myChart = this.echarts.init(document.getElementById("main"));
      // 绘制图表
      let data = genData(50);
      function genData (count) {
        var nameList = [
          "赵",
          "钱",
          "孙",
          "李",
          "周",
          "吴",
          "郑",
          "王",
          "冯",
          "陈",
          "褚",
          "卫",
          "蒋",
          "沈",
          "韩",
          "杨",
          "朱",
          "秦",
          "尤",
          "许",
          "何",
          "吕",
          "施",
          "张",
          "孔",
          "曹",
          "严",
          "华",
          "金",
          "魏",
          "陶",
          "姜",
          "戚",
          "谢",
          "邹",
          "喻",
          "柏",
          "水",
          "窦",
          "章",
          "云",
          "苏",
          "潘",
          "葛",
          "奚",
          "范",
          "彭",
          "郎",
          "鲁",
          "韦",
          "昌",
          "马",
          "苗",
          "凤",
          "花",
          "方",
          "俞",
          "任",
          "袁",
          "柳",
          "酆",
          "鲍",
          "史",
          "唐",
          "费",
          "廉",
          "岑",
          "薛",
          "雷",
          "贺",
          "倪",
          "汤",
          "滕",
          "殷",
          "罗",
          "毕",
          "郝",
          "邬",
          "安",
          "常",
          "乐",
          "于",
          "时",
          "傅",
          "皮",
          "卞",
          "齐",
          "康",
          "伍",
          "余",
          "元",
          "卜",
          "顾",
          "孟",
          "平",
          "黄",
          "和",
          "穆",
          "萧",
          "尹",
          "姚",
          "邵",
          "湛",
          "汪",
          "祁",
          "毛",
          "禹",
          "狄",
          "米",
          "贝",
          "明",
          "臧",
          "计",
          "伏",
          "成",
          "戴",
          "谈",
          "宋",
          "茅",
          "庞",
          "熊",
          "纪",
          "舒",
          "屈",
          "项",
          "祝",
          "董",
          "梁",
          "杜",
          "阮",
          "蓝",
          "闵",
          "席",
          "季",
          "麻",
          "强",
          "贾",
          "路",
          "娄",
          "危"
        ];
        var legendData = [];
        var seriesData = [];
        var selected = {};
        for (var i = 0; i < 50; i++) {
          name =
            Math.random() > 0.65
              ? makeWord(4, 1) + "·" + makeWord(3, 0)
              : makeWord(2, 1);
          legendData.push(name);
          seriesData.push({
            name: name,
            value: Math.round(Math.random() * 100000)
          });
          selected[name] = i < 6;
        }

        return {
          legendData: legendData,
          seriesData: seriesData,
          selected: selected
        };

        function makeWord (max, min) {
          var nameLen = Math.ceil(Math.random() * max + min);
          var name = [];
          for (var i = 0; i < nameLen; i++) {
            name.push(
              nameList[Math.round(Math.random() * nameList.length - 1)]
            );
          }
          return name.join("");
        }
      }
      myChart.setOption({
        title: {
          text: "同名数量统计",
          subtext: "纯属虚构",
          x: "center"
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          type: "scroll",
          orient: "vertical",
          right: 10,
          top: 20,
          bottom: 20,
          data: data.legendData,

          selected: data.selected
        },
        series: [
          {
            name: "姓名",
            type: "pie",
            radius: "55%",
            center: ["40%", "50%"],
            data: data.seriesData,
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
    initdata () {
      this.axios.get("/search").then(res => {
        if (res.data.errcode == 0) {
          this.tableData = res.data.data;
        } else {
          this.$message.error(res.data.message);
        }
      });
    },
    handleClick (item) {
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
    updateEdit () {
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
    cancel () {
      this.dialogTableVisible = false;
      this.dialogData = {};
    },
    delectData (item) {
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
        .catch(() => { });
    },
    addbook () {
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
