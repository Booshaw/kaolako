<template>
  <div class="treatment-wrapper">
    <kaola-nav></kaola-nav>
    <div class="main">
      <Row>
      <i-col :lg="18" :md="18" :sm="24" :xs="24">
        <div class="box">
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
          <article-list :articleList="articleList" @select="selectArticle"></article-list>
          <div class="pages-wrapper" v-if="pageShow">
            <Page :total="totalRecord" size="small" transfer show-elevator show-sizer @on-change="pageNum" @on-page-size-change="pageSizeNum"></Page>
          </div>
          <!-- <div v-if="!pageShow">
            <Spin fix>
              <Icon type="load-c" size=18 class="icon-load"></Icon>
              <div>Loading</div>
            </Spin>
          </div> -->
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
    <kaola-footer></kaola-footer>
  </div>
</template>
<script>
import ArticleList from '~/components/articleList.vue'
import PopList from '~/components/popList.vue'
import KaolaNav from '~/components/KaolaNav.vue'
import KaolaFooter from '~/components/KaolaFooter.vue'
import Service from '~/plugins/axios'
export default {
  data() {
    return {
      articles: [],
      totalRecord: null,
      page: 1,
      pageSize: 10,
      pageShow: false,
      articleList: [],
      pop: [],
      courseCategoryList: []
    }
  },
  created() {
    this._getArticleList() // 获取文章列表
  },
  methods: {
    _getArticleList() {
      return Service.get(`https://easy-mock.com/mock/5ac20177470d657aa5c1dd51/kaolako/homePage`)
      .then((res) => {
        console.log(res)
        if (res.data.code === 200) {
          this.articleList = res.data.data.articleList
          this.pop = res.data.data.articleList
          this.courseCategoryList = res.data.data.courseCategoryList          
          this.pageShow = true
        }
      })
    },
    selectArticle(item) {
      this.$router.push({
        path: `/article/detail`,
        query: { id: item.id }
      })
    },
    pageNum (page) {
      this.page = page
      this._getArticleList()
    },
    pageSizeNum (size) {
      this.pageSize = size
      this._getArticleList()
    },
    toPublish() {
      this.$router.push({
        path: '/article/publish'
      })
    }
  },
  components: {
    ArticleList,
    KaolaNav,
    KaolaFooter,
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
  .main
    flex 1
    width 80%
    margin 32px auto
    @media screen and (max-width: 440px)
      width 100%
    .box
      margin-right 32px
      text-align left
      padding 16px
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
      .pages-wrapper
        margin-top 32px
        text-align center
      // .icon-load
      //   animation ani-demo-spin 1s linear infinite
      //   @keyframes ani-demo-spin {
      //   from { transform: rotate(0deg);}
      //   50%  { transform: rotate(180deg);}
      //   to   { transform: rotate(360deg);}
      // }
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
