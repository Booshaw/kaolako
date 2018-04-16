<template>
  <section class="t-wrapper">
    <kaola-nav class="nav"></kaola-nav>    
    <div class="main">
      <div class="c-category">
        <Tabs value="all" size="small">
          <TabPane label="全部" name="all"></TabPane>
          <TabPane :label="item.categoryName" :name="index.toString()" v-for="(item, index) in courseCategoryList" :key="index">
            <ul class="item-box">
              <li v-for="(i, index1) in item.children" :key="index1">{{i.categoryName}}</li>
            </ul>
          </TabPane>
        </Tabs>
      </div>
      <div class="teacher">
        <div class="teacher-wrapper">
          <!-- <h3 class="title">考拉精英名师</h3> -->
          <Row>
            <i-col :lg="4" :md="8" :sm="12" :xs="12" v-for="(t, index4) in teacherList" :key="index4">
              <div class="teacher-intro" @click.stop="toTeacherInfo(t)">
                <img :src="t.avatar" :alt="t.speciality" class="avatar">
                <h2 class="name">{{t.name}}</h2>
                <h3 class="spec">{{t.speciality}}</h3>
                <p class="intro">{{t.introduction}}</p>
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
      teacherList: [],
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
          this.teacherList = res.data.data.teacherList
          this.pageShow = true
          this.courseCategoryList = res.data.data.courseCategoryList
        }
      })
    },
    toTeacherInfo(t) {
      this.$router.push({
        path: '/teacher/detail',
        query: { id: t.id}
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
.t-wrapper
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
      margin 32px auto 16px
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
    .teacher
      width 80%
      margin 0 auto
      .teacher-wrapper
        margin 0 auto
        padding 16px
        .title
          position relative
          margin 16px
          color #ffffff
          font-size 18px
          letter-spacing 4.6px
          line-height 32px
          font-weight 600
          text-align center
        .teacher-intro
          position relative
          margin 32px 4px
          background rgba(255,255,255,0.8)
          box-shadow 0 4px 8px 0 rgba(7,17,27,0.5)
          border-radius 6px
          height 256px
          padding 8px
          transition all linear
          cursor pointer
          &:hover
            background #ffffff
            .avatar
              width 60px
              height 60px
              left 55%
              // margin-left 10px
              transition all 0.3s
            .name
              opacity 0
            .spec
              opacity 0
            .intro
              height 208px
              top -96px
              transition all 0.3s
              padding-top 16px
          .avatar
            position absolute
            top -16px
            left 50%
            text-align center
            margin-left -48px
            width 96px
            height 96px
            border-radius 50%
          .name
            margin-top 76px
            font-size 16px
            line-height 24px
            white-space nowrap
            color #07111b
            font-weight 700
            -webkit-line-clamp 1
          .spec
            font-size 12px
            color #4d555d
            height 24px
            line-height 24px
            margin-bottom 8px
          .intro
            position relative
            top 0
            font-size 12px
            line-height 24px
            color #4d555d
            height 96px
            -webkit-line-clamp 3
            text-align justify
            padding 0 16px
            overflow hidden
  .footer
    flex 0 0 auto
  .ivu-rate
    font-size 12px
</style>
