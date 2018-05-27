<template>
  <section class="t-wrapper">
    <kaola-nav class="nav"></kaola-nav>
    <div class="main">
      <!-- <div class="c-category">
        <Tabs value="all" size="small">
          <TabPane label="全部" name="all"></TabPane>
          <TabPane :label="item.name" :name="index.toString()" v-for="(item, index) in category" :key="index">
            <ul class="item-box">
              <li v-for="(i, index1) in item.children" :key="index1">{{i.name}}</li>
            </ul>
          </TabPane>
        </Tabs>
      </div> -->
      <div class="c-category-box">
        <Row>
          <i-col :lg="10" :md="10" :xs="0" offset="2">
            <h1 class="title"> <span class="icon"><Icon type="ios-flower"></Icon></span> 名师殿堂 <span class="slogn">轻松考试<Icon type="link"></Icon>为梦想加油</span>  </h1>
          </i-col>
          <i-col :lg="12" :md="12" :xs="24">
            <div class="search-box">
              <i-input v-model="search" placeholder="搜索感兴趣的内容">
                <Button slot="append" icon="ios-search"></Button>
              </i-input>
            </div>
          </i-col>
        </Row>
      </div>
      <div class="category-list">
        <ul>
          <li v-for="(item, index) in category" :key="index" :class="{selectCategoryClass: item.id === categoryCurrent}" @click.stop="selectCategory(item)" class="category-li">{{item.name}}</li>
          <!-- <li @click.stop="moreCategory = !moreCategory" class="arrow" v-if="categoryList.length && moreCategoryIcon && categoryList.length > 6"><Icon type="chevron-down"></Icon></li> -->
        </ul>
      </div>
      <div class="teacher">
        <div class="teacher-wrapper">
          <Row>
            <i-col :lg="4" :md="8" :sm="12" :xs="12" v-for="(t, index4) in teacherList" :key="index4">
              <div class="teacher-intro" @click.stop="toTeacherInfo(t)">
                <img :src="t.avatar" :alt="t.speciality" class="avatar">
                <h2 class="name">{{t.realName}}</h2>
                <h3 class="spec">{{t.speciality}}</h3>
                <p class="intro">{{t.introduction}}</p>
              </div>
            </i-col>
          </Row>
        </div>
      </div>
      <div v-if="loading">
        <Spin fix>
          <Icon type="load-c" size=18 class="icon-load"></Icon>
          <div>Loading</div>
        </Spin>
      </div>
      <div v-if="!teacherList.length" class="no-result">
        <p>哦豁,暂无数据</p>
      </div>
      <!--pageNav-->
      <div class="pages-wrapper" v-if="pageShow && teacherList.length">
        <Page :total="totalRecord" size="small" transfer @on-change="pageNum" @on-page-size-change="pageSizeNum"></Page>
      </div>
    </div>
    <kaola-foo class="footer"></kaola-foo>
  </section>
</template>
<script>
import KaolaNav from '~/components/KaolaNav.vue'
import KaolaFoo from '~/components/KaolaFoo.vue'
import Service from '~/plugins/axios'
export default {
  data() {
    return {
      search: '',
      loading: false,
      noResult: false,
      totalRecord: 100,
      pageShow: true,
      page: 1,
      pageSize: 12,
      teacherList: [],
      category: [], // 师资分类列表
      categoryCurrent: 0 // 默认分类
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
    this._getCategory()
    this._getTeacherList()
  },
  methods: {
    _getCategory() {
      return Service.post(`http://api.kaolako.com/kaola/common/dict/get`, {
        dictType: ['courseCategory']
      }).then(res => {
        console.log(res)
        if (res.data.code === '200') {
          this.category = res.data.data.courseCategory
        }
      })
    },
    _getTeacherList() {
      this.noResult = false
      this.loading = true
      return Service.post(`http://api.kaolako.com/kaola/web/teacher/list`, {
        category: this.categoryCurrent
      }).then(res => {
        // console.log(res)
        if (res.data.code === '200') {
          this.teacherList = res.data.data.pageData
          // this.pageShow = true
          this.loading = false
        } else {
          this.pageShow = false
          this.noResult = true
        }
      })
    },
    selectCategory(item) {
      this.categoryCurrent = item.id
      this._getTeacherList()
    },
    toTeacherInfo(t) {
      this.$router.push({
        path: '/teacher/detail',
        query: { id: t.id }
      })
    },
    pageNum(page) {
      // 分页插件获取点击page页码
      this.page = page
      this._getCourseList()
    },
    pageSizeNum(size) {
      this.pageSize = size
      this._getCourseList()
    }
  },
  components: {
    // AppLogo,
    KaolaNav,
    KaolaFoo
  }
}
</script>
<style lang="stylus">
@import '~assets/stylus/mixin'
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
    // .c-category
    // width 80%
    // margin 32px auto 16px
    // text-align left
    // @media screen and (max-width: 440px)
    // width 100%
    // padding 16px
    // .item-box
    // padding-left 16px
    // li
    // display inline-block
    // margin 8px
    // font-size 12px
    .c-category-box
      // height 132px
      background url('/static/sz-header-bk.png') center center no-repeat
      background-size cover
      box-sizing border-box
      .title
        margin 20px 0
        padding 0 20px
        color #ffffff
        font-size 32px
        .icon
          color #ed3f14
          font-size 36px
        .slogn
          font-size 14px
      .search-box
        margin 0 auto
        padding 35px 0
        width 60%
    .category-list
      margin 20px auto
      border-bottom 1px solid #eeeeee
      box-shadow 0 8px 16px 0 rgba(28, 31, 33, 0.1)
      ul
        width 80%
        margin 0 auto
        text-align left
        @media screen and (max-width: 440px)
          width 100%
        .category-li
          display inline-block
          color #07111b
          font-size 16px
          line-height 40px
          font-weight bold
          margin-right 48px
          @media screen and (max-width: 440px)
            margin 0 8px
            font-size 14px
          &:hover
            cursor pointer
            color #f01414
        .arrow
          display inline-block
        .selectCategoryClass
          color #f01414
          &:hover
            color #f01414
      .more-category-box
        text-align left
    .tag-list
      margin 20px 0
      border-bottom 1px solid #eeeeee
      text-align left
      ul
        width 80%
        margin 0 auto
        @media screen and (max-width: 440px)
          width 100%
        .tag-li
          display inline-block
          color #4d555d
          font-size 14px
          padding 0 12px
          line-height 32px
          margin 0 14px 14px 0
          border-radius 16px
          @media screen and (max-width: 440px)
            margin 0 8px
            font-size 14px
          &:hover
            cursor pointer
            background-color #D9DDE1
        .arrow
          display inline-block
          &:hover
            cursor pointer
            color #f01414
        .selectTagClass
          color #ffffff
          background-color #2b333b
          &:hover
            cursor pointer
            background-color #2b333b
      .more-tag-box
        text-align left
        li
          display inline-block
    .teacher
      width 80%
      margin 0 auto
      @media screen and (max-width: 440px)
        width 100%
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
          background rgba(255, 255, 255, 0.8)
          box-shadow 0 4px 8px 0 rgba(7, 17, 27, 0.5)
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
    .no-result
      text-align center
      padding 25% 0
      color #c3cbd6      
  .footer
    flex 0 0 auto
  .ivu-rate
    font-size 12px
</style>
