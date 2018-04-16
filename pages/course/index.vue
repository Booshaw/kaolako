<template>
  <section class="c-wrapper">
    <kaola-nav class="nav"></kaola-nav>    
    <div class="main">
      <div class="c-category">
        <Tabs value="all" size="small" :animated="false">
          <TabPane label="全部" name="all"> </TabPane>
          <TabPane :label="item.categoryName" :name="index.toString()" v-for="(item, index) in courseCategoryList" :key="index">
            <ul class="item-box">
              <li v-for="(i, index1) in item.children" :key="index1">{{i.categoryName}}</li>
            </ul>
          </TabPane>
        </Tabs>
      </div>
      <div class="content">
        <div class="content-wrapper">
          <Row>
            <i-col :lg="6" :md="6" :sm="12" :xs="12" v-for="(item, index) in courseList" :key="index">
              <div class="box" @click="toCourseDetail(item)">
                <div class="category-box">
                  <div class="category-gradient">
                  </div>
                  <img class="category-img" :src="item.img" :alt="item.title">
                  <div class="category-info">
                    <img :src="item.avatar" :alt="item.avatar">
                    <span>{{item.author}}</span>
                  </div>
                </div>
                <div class="categor-intro-box">
                  <p class="course-title">{{item.title}}</p>
                  <div class="evaluation-box">
                    <Icon type="ios-person-outline"></Icon>
                    <span>{{item.count}}</span>
                    <Rate show-text disabled v-model="item.rate">
                      <span style="color: #f5a623">{{item.rate}}</span>
                    </Rate>
                  </div>
                  <div class="desc">
                    <p>{{item.description}}</p>
                  </div>
                </div>
              </div>
            </i-col>
          </Row>
        </div>
      </div>
      <!--pageNav-->
      <div class="pages-wrapper" v-if="pageShow">
        <Page :total="totalRecord" size="small" transfer show-elevator show-sizer @on-change="pageNum" @on-page-size-change="pageSizeNum"></Page>
      </div>
    </div>
    <kaola-footer class="footer"></kaola-footer>
  </section>
</template>
<script>
import KaolaNav from '~/components/KaolaNav.vue'
import KaolaFooter from '~/components/KaolaFooter.vue'
import Service from '~/plugins/axios'
export default {
  data () {
    return {
      totalRecord: 100,
      pageShow: false,
      page: 1,
      pageSize: 12,
      courseList: [],
      courseCategoryList: []
    }
  },
  // asyncData() {
  //   return Service.get(`homePage`)
  //   .then((res) => {
  //     return {
  //       courseCategoryList: res.data.data.courseCategoryList,
  //       courseList: res.data.data.courseList
  //     }
  //   })
  // },
  created() {
    this._getCourseList()
  },
  methods: {
    _getCourseList() {
      return Service.get(`https://easy-mock.com/mock/5ac20177470d657aa5c1dd51/kaolako/homePage`)
      .then((res) => {
        console.log(res)
        if (res.data.code === 200) {
          this.courseList = res.data.data.courseLists
          this.pageShow = true
          this.courseCategoryList = res.data.data.courseCategoryList
        }
      })
    },
    toCourseDetail(item) {
      this.$router.push({
        path: '/course/courseDetail',
        query: {id: item.id}
      })
    },
    pageNum(page) { // 分页插件获取点击page页码
      this.page = page
      this._getCourseList()
    },
    pageSizeNum(size) {
      this.pageSize = size
      this._getCourseList()
    },
  },
  components: {
    // AppLogo,
    KaolaNav,
    KaolaFooter
  }
}
</script>
<style lang="stylus">
.c-wrapper
  position relative
  height 100%
  display flex
  flex-direction column
  .nav
    flex 0
  .main
    margin-top 60px
    flex 1 0 auto
    .c-category
      width 80%
      margin 32px auto
      text-align left
      @media screen and (max-width: 440px)
        width 100%
        padding 16px
      .item-box
        padding-left 16px
        li
          display inline-block
          margin 8px
          font-size 12px
    .content
      width 80%
      margin 16px auto
      @media screen and (max-width:440px)
        width 100%
        padding 16px
      .content-wrapper
        margin 32px 0
        .style-title
          font-size 20px
          text-align left
          margin-bottom 16px
          white-space normal
          overflow hidden
          text-overflow ellipsis
        .box
          margin 8px
          overflow hidden
          &:hover
            cursor pointer
          .category-box
            position relative
            transition .3s all linear
            height 130px
            max-height 148px
            background-color #eeeeee
            border-radius 12px
            .category-gradient
              position absolute
              z-index 0
              background-image linear-gradient(-180deg, rgba(7,17,27,0) 0%, rgba(7,17,27,0.6) 97%)
              border-radius 12px
              left 0
              bottom 0
              right 0
              height 64px
            .category-img
              border-radius 12px
              height 132px
              width 100%
            .category-info
              position absolute
              left 16px
              right 16px
              bottom 16px
              height 36px
              text-align left
              img
                width 36px
                height 36px
                border-radius 50%
                margin-right 14px
                margin-bottom -8px
              span
                padding-bottom 8px
                font-size 14px
                color #ffffff
                line-height 18px
                text-shadow 0 2px 4px rgba(7,17,27,0.5)
                font-weight 700
          .categor-intro-box
            position relative
            padding 0 12px
            min-height 112px
            .course-title
              font-size 16px
              line-height 24px
              font-weight 700
              max-height 48px
              margin-top 16px
              transition 0.3s all linear
              word-break break-all
              word-wrap break-word
              overflow hidden
              display -webkit-box
              -webkit-line-clamp 2
              -webkit-box-orient vertical
              color #2b333b
              text-align left
            .evaluation-box
              font-size 14px
              text-align left
              padding 12px 0
              span
                padding 0 8px
                color #93999f
            .desc
              margin-top 4px
              font-size 12px
              color #93999f
              max-height 48px
              line-height 24px
              word-break break-all
              word-wrap break-word
              overflow hidden
              transition .3s all linear
              text-overflow -o-ellipsis-lastline
              display -webkit-box
              -webkit-line-clamp 2
              -webkit-box-orient vertical
              text-align left
  .footer
    flex 0 0 auto
  .ivu-rate
    font-size 12px
</style>
