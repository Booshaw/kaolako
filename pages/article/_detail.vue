<template>
  <div class="article-detal-wrapper">
    <kaola-nav></kaola-nav>
    <div class="head-wrapper">
      <div class="adv" v-if="showAdv">
        <span>动态广告位</span>
        <div class="hidden" @click.stop="hiddenAdv">
          关闭
        </div>
      </div>
      <row>
        <i-col :lg="17" :md="17" :sm="24" :offset="1">
          <div class="head-top">
            <div class="detail-path">
              <span class="bread-link" @click.stop="back">手记/</span>
            </div>
            <div class="detail-title-wrapper">
              <h3 class="detail-title">{{article.title}}</h3>
              <div class="dc-profile">
                <ul>
                  <li>{{article.publishTime}}</li>
                  <li>{{article.viewCount}}浏览</li>
                  <li v-for="(i, index) in article.tag" :key="index">{{i.name}}</li>
                </ul>
              </div>
            </div>
          </div>
        </i-col>
        <i-col :lg="6" :md="6" :sm="0" :xs="0">
          <div class="head-adv"></div>
        </i-col>
      </row>
    </div>
    <div class="detail-content">
      <row>
        <i-col :lg="18" :md="18" :sm="24">
          <div class="content-wrapper" v-html="article.content">
          </div>
          <div v-if="!article.content" class="no-result">
            <p>哦豁,你要的文章飞走了</p>
          </div>
          <div v-if="loading">
            <Spin fix>
              <Icon type="load-c" size=18 class="icon-load"></Icon>
              <div>Loading</div>
            </Spin>
          </div>
        </i-col>
        <i-col :lg="6" :md="6" :sm="6" :xs="0">
          <div class="adv" >
            <div v-if="pop && pop.length">
              <h2 class="text">精选推荐</h2>
            <pop-list :popList="pop" @select="selectPop"></pop-list>
            </div>
          </div>
        </i-col>
      </row>
    </div>
    <kaola-foo></kaola-foo>
  </div>
</template>
<script>
// import ArticleList from '~/components/articleList.vue'
import PopList from '~/components/popList.vue'
import KaolaNav from '~/components/KaolaNav.vue'
import KaolaFoo from '~/components/KaolaFoo.vue'
import {getArticleList,getArticle} from '~/api/api'
export default {
  data() {
    return {
      article: {},
      showAdv: false,
      pop: [],
      loading: false,
      noResult: false
    }
  },
  created() {
    this._getArticle()
    // this._getArticleList()
    this._getPop()
  },
  methods: {
    // _getArticle() {
    //   this.loading = true
    //   return Service.post(`http://api.kaolako.com/kaola/web/article/get`, {
    //     id: this.$route.query.id
    //   }).then(res => {
    //     if (res.data.code === '200') {
    //       this.article = res.data.data
    //       // this.pop = res.data.data
    //       this.pageShow = true
    //       this.loading = false
    //     } else {
    //       this.loading = false
    //       this.noResult = true
    //     }
    //   })
    // },
    _getArticle() {
      this.loading = true
      let params = { id: this.$route.query.id }
      getArticle(params).then(res => {
        if (res.code === '200') {
          this.article = res.data
          // this.pop = res.data.data
          this.pageShow = true
          this.loading = false
        } else {
          this.loading = false
          this.noResult = true
        }
      })
    },
    _getPop() {
      let params = {
        category: 0,
        tag: 0,
        page: 1,
        pageSize: 10
      }
      getArticleList(params).then(res => {
        if (res.code === '200') {
          this.pop = res.data.pageData.slice(0, 10)
        }
      })
    },
    hiddenAdv() {
      this.showAdv = !this.showAdv
      console.log(this.showAdv)
    },
    back() {
      this.$router.go(-1)
    },
    toDetail(item) {
      this.$router.push({
        path: `/article/detail`,
        query: { id: item.id }
      })
      this._getArticle()
    },
    selectPop(item) {
      // console.log(item)
      this.$router.push({
        path: `/article/detail`,
        query: { id: item.id }
      })
    }
  },
  components: {
    KaolaNav,
    KaolaFoo,
    PopList
  }
}
</script>
<style lang="stylus">
@import '~assets/stylus/mixin'
.article-detal-wrapper
  .head-wrapper
    margin-top 3.75rem
    background #f3f5f7
    box-shadow 0px 2px 10px 0px rgba(0, 0, 0, 0.1), 0 1px rgba(0, 0, 0, 0.1)
    .adv
      background #f01414
      line-height 8rem
      color #ffffff
      .hidden
        position absolute
        top 0.5rem
        right 0.5rem
        cursor pointer
    .head-top
      width 80%
      padding 1rem 0
      // margin-left 15%
      text-align left
      @media screen and (max-width: 440px)
        width 100%
      .detail-path
        font-size 0.625rem
        color #93999f
        line-height 1.5rem
        .bread-link
          cursor pointer
          &:hover
            color #ec1500
      .detail-title-wrapper
        .detail-title
          font-weight 700
          line-height 3rem
          margin 0.625rem 0
          word-wrap break-word
          word-break break-all
          font-size 1.5rem
          color #333
          overflow hidden
          text-overflow ellipsis
          -webkit-line-clamp 2
          -webkit-box-orient vertical
        .dc-profile
          font-size 0.625rem
          color #93999f
          line-height 1.25rem
          li
            display inline
            margin-right 0.5rem
    .head-adv
      line-height 5rem
  .detail-content
    width 80%
    margin 0 auto
    @media screen and (max-width: 440px)
      width 100%
    .content-wrapper
      margin 2rem auto
      padding 32px 16px
      text-indent 2em
      font-size 0.875rem
      letter-spacing 1.5px
      word-wrap break-word
      color #333
      line-height 2rem
      text-align left
    .adv
      position relative
      margin-top 5rem
      text-align left
      padding-right 1rem
      // border 1px solid #999999
      h2
        color #14191e
        height 56px
        line-height 49px
        border-bottom 1px solid #b7bbbf
        font-size 16px
        font-weight 700
      h3
        margin-top 1rem
        font-size 1rem
        color #14191e
        line-height 24px
        no-wrap(2, 1.5rem)
        &:hover
          color #f01414
          cursor pointer
      li
        line-height 1.5
        max-height 15em
        word-break break-all
        border-bottom 1px solid #d9dde1
      .show-box
        margin 5px 0 1rem
        color #b5b9bc
        font-size 0.625rem
        line-height 1rem
  .no-result
    text-align center
    padding 25% 0
    color #c3cbd6
</style>
