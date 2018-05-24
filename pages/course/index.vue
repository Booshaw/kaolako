<template>
  <section class="c-wrapper">
    <kaola-nav class="nav"></kaola-nav>    
    <div class="main">
      <!-- <div class="c-category">
        <Tabs value="all" size="small" :animated="false">
          <TabPane label="全部" name="all"> </TabPane>
          <TabPane :label="item.categoryName" :name="index.toString()" v-for="(item, index) in courseCategoryList" :key="index">
            <ul class="item-box">
              <li v-for="(i, index1) in item.children" :key="index1">{{i.categoryName}}</li>
            </ul>
          </TabPane>
        </Tabs>
      </div> -->
      <div class="c-category-box">
        <Row>
          <i-col :lg="10" :md="10" :xs="0" offset="2">
            <h1 class="title"> <span class="icon"><Icon type="ios-flower"></Icon></span> 考拉课堂 <span class="slogn">轻松考试<Icon type="link"></Icon>为梦想加油</span>  </h1>
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
          <li v-for="(item, index) in categoryList" :key="index" :class="{selectCategoryClass: item.id === categoryCurrent}" @click.stop="selectCategory(item)" class="category-li">{{item.name}}</li>
          <!-- <li @click.stop="moreCategory = !moreCategory" class="arrow" v-if="categoryList.length && moreCategoryIcon && categoryList.length > 6"><Icon type="chevron-down"></Icon></li> -->
        </ul>
      </div>
      <!-- <div class="tag-list">
        <ul>
          <li v-for="(item, index) in tagList" :key="index" :class="{selectTagClass: item.id === tagCurrent}" @click.stop="selectTag(item)" class="tag-li">{{item.name}}</li>
        </ul>
      </div> -->
      <div class="content">
        <div class="content-wrapper">
          <ul>
            <li v-for="(item, index) in courseList" :key="index" class="item">
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
                    <span>{{item.viewCount}}</span>
                    <Rate show-text disabled v-model="item.rate">
                      <span style="color: #f5a623">{{item.rate}}</span>
                    </Rate>
                  </div>
                  <div class="desc">
                    <p>{{item.description}}</p>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div v-if="loading">
        <Spin fix>
          <Icon type="load-c" size=18 class="icon-load"></Icon>
          <div>Loading</div>
        </Spin>
      </div>
      <div v-if="!courseList.length" class="no-result">
        <p>哦豁,暂无数据</p>
      </div>
      <!--pageNav-->
      <div class="pages-wrapper" v-if="pageShow">
        <Page :total="totalRecord" size="small" transfer show-elevator show-sizer @on-change="pageNum" @on-page-size-change="pageSizeNum"></Page>
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
      clientWidth: null, // 浏览器宽度
      totalRecord: 100,
      pageShow: false, //分页显示
      noResult: false, // 查询无数据
      loading: false, // 加载
      page: 1,
      pageSize: 12,
      courseList: [],
      courseCategoryList: [],
      search: '', // 搜索内容
      categoryList: [], // 分类列表
      categoryCurrent: 0, // 选择的分类
      moreCategoryIcon: false, // 更多分类icon
      moreCategory: false, // 更多分类显示
      tagList: [], // 标签分类
      moreTagIcon: false, // 更多标签icon
      tagCurrent: 0, // 选择的标签
      moreTag: false // 更多标签显示
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
    this._getCategoryTag()
  },
  mounted() {
    this.getWidth()
    this.initMoreArrow()
  },
  methods: {
     _getCategoryTag() {
      return Service.post(`http://api.kaolako.com/kaola/common/dict/get`, {
        dictType: ['courseCategory']
      }).then(res => {
        if ((res.code = '200')) {
          this.categoryList = res.data.data.courseCategory
        }
      })
    },
    _getCourseList() {
      this.noResult = false
      this.loading = true
      return Service.post(`http://api.kaolako.com/kaola/web/course/list`, {
        category: this.categoryCurrent,
        page: this.page,
        pageSize: this.pageSize
      }).then(res => {
        if (res.data.code === '200') {
          this.courseList = res.data.data.pageData
          this.totalRecord = res.data.data.totalRecord
          this.loading = false
          this.pageShow = true
        } else{
          this.noResult = true
        }
      })
    },
    toCourseDetail(item) {
      this.$router.push({
        path: '/course/courseDetail',
        query: { id: item.id }
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
    },
    selectCategory(item) {
      this.categoryCurrent = item.id
      console.log(this.categoryCurrent)
      this._getCourseList()
    },
    getWidth() {
      let width =
        window.innerWidth ||
        document.documentElement.clientWidth ||
        document.body.clientWidth
      // console.log(this.clientWidth)
      this.clientWidth = width
      if (width <= 680) {
        ;(this.moreTagIcon = true), (this.moreCategoryIcon = true)
      }
      // console.log(this.moreCategoryIcon)
    },
    initMoreArrow() {
      console.log(this.clientWidth)
      console.log(`长度为${this.categoryList}`)
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
    .content
      width 80%
      margin 16px auto
      @media screen and (max-width: 440px)
        width 100%
        padding 16px
      .content-wrapper
        margin 32px 0
        text-align left
        .style-title
          font-size 20px
          text-align left
          margin-bottom 16px
          white-space normal
          overflow hidden
          text-overflow ellipsis
        .item
          display inline-block
          width 25%
          @media screen and (max-width:440px)
            width 50%
          &:hover
            box-shadow 0 4px 8px 0 rgba(7, 17, 27, 0.1)
            border-radius 8px
          .box
            margin 12px 12px 36px
            overflow hidden
            &:hover
              cursor pointer
            .category-box
              position relative
              transition 0.3s all linear
              height 130px
              max-height 148px
              background-color #eeeeee
              border-radius 12px
              .category-gradient
                position absolute
                z-index 0
                background-image linear-gradient(-180deg, rgba(7, 17, 27, 0) 0%, rgba(7, 17, 27, 0.6) 97%)
                border-radius 12px
                left 0
                bottom 0
                right 0
                height 64px
              .category-img
                border-radius 12px
                height 132px
                display block
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
                  font-size 12px
                  color #ffffff
                  line-height 18px
                  text-shadow 0 2px 4px rgba(7, 17, 27, 0.5)
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
                transition 0.3s all linear
                text-overflow -o-ellipsis-lastline
                display -webkit-box
                -webkit-line-clamp 2
                -webkit-box-orient vertical
                text-align left
    .no-result
      text-align center
      padding 25% 0
      color #c3cbd6      
  .footer
    flex 0 0 auto
  .ivu-rate
    font-size 12px
</style>
