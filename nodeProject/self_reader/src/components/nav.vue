<template>
  <div class="nav">
    <div class="topnav">
      <div class="inbox flexbox between">
        <div class="leftnav">
          <img src="../assets/images/logo-zh.svg"
               alt="">
        </div>
        <div class="right-nav">
          <ul class="flexbox f-end">
            <li>主页</li>
            <li>模板</li>
            <li>教程</li>
            <li>下载 IOS APP</li>
            <li>博客</li>
            <li>会员福利</li>
          </ul>
        </div>
      </div>
    </div>
    <div class="imgBack">
      <div class="absolute-book flexbox">
        <div class=" flexbox j-center">
          <h2>全部视频模板</h2>
          <p>- 轻松制作精彩视频 -</p>
        </div>
      </div>
    </div>
    <div class="nav-father">
      <div class="navtap width">
        <ul class="flexbox between">
          <li v-for="(item, index) in navtopData"
              @mouseenter="navActive=index"
              @mouseleave="navActive=0"
              :class="{'active':navActive===index}"
              :key="index">{{item.title}}</li>
        </ul>
      </div>
    </div>
    <div class="width choose">
      <ul class="flexbox j-start">
        <li class="title">内容：</li>
        <li>
          <el-dropdown>
            <span class="el-dropdown-link">
              全部<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>纯图片</el-dropdown-item>
              <el-dropdown-item>纯视频</el-dropdown-item>
              <el-dropdown-item>两者皆有</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </li>
        <li class="title">权限：</li>
        <li>
          <el-dropdown>
            <span class="el-dropdown-link">
              全部<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>免费</el-dropdown-item>
              <el-dropdown-item>会员</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </li>
        <li class="title">类型：</li>
        <li>
          <el-dropdown>
            <span class="el-dropdown-link">
              全部<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>自由模板</el-dropdown-item>
              <el-dropdown-item>固定模板</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </li>
        <li class="title">比例：</li>
        <li>
          <el-dropdown>
            <span class="el-dropdown-link">
              全部<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>16×9</el-dropdown-item>
              <el-dropdown-item>9×16</el-dropdown-item>
              <el-dropdown-item>1×1</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </li>
      </ul>
    </div>
    <div class="width chooseContent flexbox">
      <ul class="flexbox j-start">
        <li v-for="(item, index) in listData"
            @mouseenter="contentId=index"
            @mouseleave="contentId=-1"
            :key="index">
          <div class="widthbox">
            <div class="inbox"
                 v-show="contentCompate(index)">
              <div class="img">
                <img :src="item.cover_thumb_url"
                     alt=""
                     srcset="">
              </div>
              <div class="title flexbox between">
                <span>{{item.title}}</span>
                <span>自由模板</span>
              </div>
            </div>

            <div class="videoBox"
                 v-show="uncontentCompuate(index)">
              <video :src="item.low_video_url"
                     autoplay="autoplay"></video>
              <div class="title">
                <P>使用</P>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'navbar',
  // props: {
  //   msg: String
  // },
  data () {
    return {
      navtopData: [
        { title: '全部' }, { title: '潮流时尚' },
        { title: '婚礼爱情' },
        { title: '商业宣传' },
        { title: '家庭相册' },
        { title: '生日祝福' },
        { title: '节日问候' },
        { title: '旅行时光' },
        { title: '晚会典礼' },
        { title: '毕业留恋' },
        { title: '通用' },
      ],
      navActive: 0,
      listData: [],
      contentId: -1,
      requestCount: 0,
      scrollSave: 0
    }
  },
  mounted () {
    for (let i = 0; i < 2; i++) {
      this.initData(i++)
    }
    window.addEventListener('scroll', this.handleScroll, true)
  },
  computed: {
    contentCompate (index) {
      return index => {
        return this.contentId !== index
      }
    },
    uncontentCompuate (index) {
      return (index) => {
        return this.contentId === index
      }
    }
  },
  methods: {
    handleScroll (e) {
      var scrollTop = e.target.documentElement.scrollTop || e.target.body.scrollTop;
      let scroll = scrollTop - this.scrollSave;
      this.scrollSave = scrollTop
      // if (scroll > 0) {
      //   console.log('top');
      //   this.requestCount++
      //   this              .initData(this.requestCount)

      // }
      console.log(window.innerHeight);

      // if (scrollTop >= 200) {
      // }
    },
    initData (i) {
      this.requestCount = i
      this.axios.get(`/api/themes?language=zh&&page=${this.requestCount}`).then(res => {
        let rback = res.data
        if (rback.status === '1') {
          this.listData = this.listData.concat(rback.data.list)
        } else {
          this.$message.error('请求失败')
        }
      })
        .catch(err => {
          console.log(err);

        })
    }
  },
}
</script>
<style lang="less">
.nav {
  .topnav {
    height: 45px;
    margin: 0 auto;
    position: fixed;
    background-color: #fff;
    width: 100%;
    top: 0;
    .inbox {
      margin: 0 auto;
      width: 1200px;
      .leftnav {
        width: 40%;
        img {
          display: block;
          width: 115px;
          height: 45px;
        }
      }
      .right-nav {
        li {
          padding: 0 30px;
          border-right: 1px solid #ccc;
          &:nth-last-child(1) {
            border: none;
          }
        }
      }
    }
  }
  .imgBack {
    .absolute-book {
      color: #fff;
      height: 235px;
      background: url("../assets/images/all.jpg") center center no-repeat;
      width: 100%;
      margin-top: 10px;
      div {
        flex-direction: column;
        h2 {
          font-size: 60px;
          line-height: 64px;
        }
        p {
          font-size: 20px;
          margin-top: 20px;
        }
      }
    }
  }
  .nav-father {
    width: 100%;
    border-bottom: 1px solid #ccc;
    .navtap {
      ul {
        li {
          height: 60px;
          display: flex;
          align-items: center;
          font-size: 16px;
          cursor: pointer;
          margin: 0 10px;
          padding: 0 15px;
          border-bottom: 2px solid transparent;
          &.active {
            border-color: #52a7ff;
            color: #52a7ff;
          }
        }
      }
    }
  }
  .choose {
    ul {
      margin-top: 10px;
      li {
        height: 30px;
        display: flex;
        align-items: center;
        &:nth-child(even) {
          cursor: pointer;
        }
        &.title {
          padding-left: 20px;
        }
        .el-dropdown-link {
          width: 80px;
          height: 30px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-left: 5px;
          background-color: #f4f5f9;
          border: 1px solid #e8e8e7;
        }
      }
    }
  }
  .chooseContent {
    ul {
      width: 100%;
      margin-top: 10px;
      flex-wrap: wrap;
      li {
        margin-top: 20px;
        cursor: pointer;
        width: 25%;
        box-sizing: border-box;
        position: relative;
        z-index: 1000;
        .widthbox {
          width: 90%;
          .inbox {
            .img {
              width: 100%;
              img {
                width: 100%;
              }
            }
          }
          .title {
            width: 100%;
            padding: 0 20px;
            box-sizing: border-box;
            font-size: 14px;
            height: 50px;
            box-shadow: 0 2px 8px rgba(153, 153, 153, 0.3);
          }
          .videoBox {
            width: 100%;
            video {
              width: 100%;
            }
            .title {
              display: inline-block;
              margin-top: -3px;
              background: linear-gradient(to right, #689cf9, #f9bbdd);
              line-height: 50px;
              color: #fff;
              font-size: 20px;
              p {
                text-align: center;
              }
            }
          }
        }
      }
    }
  }
}
</style>


