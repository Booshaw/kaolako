<template>
  <div class="treatment-wrapper">
    <kaola-nav></kaola-nav>
    <div class="top-box">
      <div class="c-category-box">
        <Row>
          <i-col :lg="10" :md="10" :xs="0" offset="2">
            <h1 class="title"> <span class="icon"><Icon type="ios-book"></Icon></span> 尚干货 <span class="slogn">轻松考试<Icon type="link"></Icon>为梦想加油</span>  </h1>
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
      <div class="category-list" v-if="categoryList && categoryList.length">
        <ul>
          <li v-for="(item, index) in categoryList" :key="index" :class="{selectCategoryClass: item.id === categoryCurrent}" @click.stop="selectCategory(item)" class="category-li">{{item.name}}</li>
          <!-- <li @click.stop="moreCategory = !moreCategory" class="arrow" v-if="categoryList.length && moreCategoryIcon && categoryList.length > 6"><Icon type="chevron-down"></Icon></li> -->
        </ul>
      </div>
      <div class="tag-list" v-if="tagList && tagList.length">
        <ul>
          <li v-for="(item, index) in tagList" :key="index" :class="{selectTagClass: item.id === tagCurrent}" @click.stop="selectTag(item)" class="tag-li">{{item.name}}</li>
          <!-- <li @click.stop="moreTag = !moreTag" class="arrow"><Icon type="chevron-down"></Icon></li>           -->
        </ul>
      </div>
    </div>
    <div class="main">
      <Row>
        <i-col :lg="18" :md="18" :sm="24" :xs="24">
          <div class="box">
            <article-list :articleList="articleList" @select="selectArticle"></article-list>
            <div v-if="!articleList.length" class="no-result">
              <p>哦豁,暂无数据</p>
            </div>
            <div class="pages-wrapper" v-if="pageShow && articleList.length">
              <Page :total="totalRecord" size="small" transfer show-elevator show-sizer @on-change="pageNum" @on-page-size-change="pageSizeNum"></Page>
            </div>
            <div v-if="loading">
              <Spin fix>
                <Icon type="load-c" size=18 class="icon-load"></Icon>
                <div>Loading</div>
              </Spin>
            </div>
          </div>
        </i-col>
        <i-col :lg="6" :md="6" :sm="24" :xs="24">
          <div class="adv">
            <div class="publish">
              <p class="btn-publish" @click="toPublish">发布手记</p>
            </div>
            <div v-if="pop && pop.length">
              <h2 class="text">精选推荐</h2>
            <pop-list :popList="pop" @select="selectArticle"></pop-list>
            </div>
          </div>
        </i-col>
      </Row>
    </div>
    <kaola-foo></kaola-foo>
  </div>
</template>
<script>
import ArticleList from '~/components/articleList.vue'
import PopList from '~/components/popList.vue'
import KaolaNav from '~/components/KaolaNav.vue'
import KaolaFoo from '~/components/KaolaFoo.vue'
import Service from '~/plugins/axios'
export default {
  data() {
    return {
      loading: false,
      noResult: false, // 查询无数据
      articles: [],
      totalRecord: null,
      page: 1,
      pageSize: 10,
      pageShow: false,
      articleList: [],
      pop: [],
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
  created() {
    this._getCategoryTag() // 获取文章分类,标签
    this._getArticleList() // 获取文章列表
  },
  methods: {
    _getCategoryTag() {
      return Service.post(`http://api.kaolako.com/kaola/common/dict/get`, {
        dictType: ['articleCategory', 'articleTag']
      }).then(res => {
        if ((res.code = '200')) {
          this.categoryList = res.data.data.articleCategory
          this.tagList = res.data.data.articleTag
        }
      })
    },
    _getArticleList() {
      this.noResult = false
      this.loading = true
      return Service.post(`http://api.kaolako.com/kaola/web/article/list`, {
        category: this.categoryCurrent,
        tag: this.tagCurrent,
        page: this.page,
        pageSize: this.pageSize
      }).then(res => {
        if (res.data.code === '200') {
          this.articleList = res.data.data.pageData
          // this.tagList = res.data.data.tagList
          // this.categoryList = res.data.data.categoryList
          this.pop = res.data.data.pageData.slice(0, 10)
          this.totalRecord = res.data.data.totalRecord
          this.loading = false
          this.pageShow = true  
          // this.courseCategoryList = res.data.data.courseCategoryList
        } else {
          this.loading = false
          this.noResult = true
        }
      })
    },
    selectArticle(item) {
      this.$router.push({
        path: `/article/detail`,
        query: { id: item.id }
      })
    },
    pageNum(page) {
      this.page = page
      this._getArticleList()
    },
    pageSizeNum(size) {
      this.pageSize = size
      this._getArticleList()
    },
    toPublish() {
      this.$router.push({
        path: '/article/publish'
      })
    },
    selectCategory(item) {
      this.categoryCurrent = item.id
      this._getArticleList()
    },
    selectTag(item) {
      this.tagCurrent = item.id 
      this._getArticleList()
    }
  },
  components: {
    ArticleList,
    KaolaNav,
    KaolaFoo,
    PopList
  }
}
</script>
<style lang="stylus">
.treatment-wrapper
  position relative
  height 100%
  display flex
  flex-direction column
  margin-top 32px
  .top-box
    margin-top 28px
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
          padding 0 10px
          line-height 32px
          margin 0 8px 8px 0
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
  .main
    flex 1
    width 80%
    margin 32px auto
    @media screen and (max-width: 440px)
      width 100%
    .box
      margin-right 32px
      text-align left
      // padding 16px
      @media screen and (max-width: 440px)
        margin-right 0
      .c-category
        margin 32px auto
        text-align left
        @media screen and (max-width: 440px)
          width 100%
          // padding 16px
        .item-box
          padding-left 16px
          li
            display inline-block
            margin 8px
            font-size 12px
      .no-result
        text-align center
        padding 25% 0
        color #c3cbd6
      .pages-wrapper
        margin-top 32px
        text-align center
    .adv
      position relative
      margin 32px 0
      padding 0 8px
      text-align left
      // border 1px solid #999999
      .publish
        padding 16px
        margin-bottom 16px
        background url('/static/usernotloginbg.png') center
        border-radius 8px
        text-align center
        .btn-publish
          display inline-block
          margin 16px auto
          padding 16px 24px
          color #ffffff
          background-color #f53d3d
          font-size 16px
          text-align center
          border-radius 8px
          &:hover
            cursor pointer
            background-color #f20d0d
      .text
        color #14191e
        height 3.5rem
        line-height 3rem
        border-bottom 1px solid #b7bbbf
        font-size 1rem
        font-weight 700
  .ivu-tabs-mini .ivu-tabs-tab
    padding 8px
</style>
