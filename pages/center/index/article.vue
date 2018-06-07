<template>
  <section class="c-article-container">
    <div class="c-content">
      <div class="item" v-for="(item, index) in personalInfo" :key="index" >
        <div class="aricle-lwrap">
          <h3 class="item-title" @click="toArticleDetail(item)">{{item.title}}</h3>
          <!--text-->
          <div class="item-digest-wrapper">
            <div class="img-link" v-if="item.image" @click="toArticleDetail(item)">
              <img :src="item.image" alt="尚课">
            </div>
            <p class="item-digest">
              {{item.summary}}
            </p>
          </div>
          <div class="item-btm">
            <ul class="l">
              <li class="hd-pic">{{item.author}}</li>
              <li class="pass-time">{{item.publishTime}}</li>
              <li class="count">{{item.viewCount}}浏览</li>
              <li class="count">{{item.categoryName}}</li>
              <li class="count" v-for="(i, index1) in item.tag" :key="index1">{{i.name}}</li>
            </ul>
          </div>
          <span class="time">{{item.createdTime}}</span>
        </div>
      </div>
       <div class="pages-wrapper" v-if="personalInfo && personalInfo.length">
        <Page :total="totalRecord" size="small" transfer @on-change="pageNum" @on-page-size-change="pageSizeNum"></Page>
      </div>
    </div>
    <div v-if="loading">
      <Spin fix>
        <Icon type="load-c" size=18 class="icon-load"></Icon>
        <div>Loading</div>
      </Spin>
    </div>
    <div class="no-result" v-if="noResult">
      <p>暂无任何动态</p>
    </div>
  </section>
</template>
<script>
import { getCenterIndex } from '~/api/api'
export default {
  data() {
    return {
      personalInfo: [],
      noResult: false,
      loading: false
    }
  },
  created() {
    this._getList()
  },
  methods: {
    _getList() {
      let params = {
        type: 1,
        page: 1,
        pageSize: 10
      }
      this.loading = true
      getCenterIndex(params).then(res => {
        if (res.code === '200') {
          this.personalInfo = res.data.pageData
          this.totalRecord = res.data.totalRecord
          this.loading = false
        } else if (res.code === '403') {
          this.$router.replace({
            path: '/login'
          })
        } else {
          this.loading = false
          this.noResult = true
          this.$Notice.error({
            title: res.message,
            desc: false
          })
        }
      })
    },
    toArticleDetail(item) {
      this.$router.push({
        path: `/article/detail`,
        query: { id: item.id }
      })
    },
    pageNum(page) {
      // 分页插件获取点击page页码
      this.page = page
      this._getList()
    },
    pageSizeNum(size) {
      this.pageSize = size
      this._getList()
    }
  },
  components: {}
}
</script>
<style lang="stylus">
.c-article-container
  position relative
  height 100%
  width 100%
  background-color #f8f8f9
  padding 16px
  .c-content
    width 60%
    margin 0 auto
    @media screen and (max-width: 440px)
      width 100%
    .item
      position relative
      padding-left 3rem
      padding-bottom 2rem
      border-left 1px solid #f01414
      // background #ffffff
      margin 0 16px
      text-align left
      .time
        position absolute
        left 0
        top 16px
        margin-left -112px
        line-height 16px
        font-size 16px
        color #818c8f
        &:before
          content ''
          display block
          position absolute
          left 108px
          width 8px
          height 8px
          border-radius 50%
          background-color #f01414
      .aricle-lwrap
        // border-bottom 1px solid #d9dde1
        background #ffffff
        padding 8px 16px
        border-radius 8px
        .item-title
          padding 24px 0 8px
          font-size 18px
          font-weight 700
          line-height 24px
          color #14191e
          cursor pointer
          display inline-block
          &:hover
            color #ec1500
        .item-digest-wrapper
          margin-top 12px
          display flex
          // flex-direction row
          align-items center
          overflow hidden
          .img-link
            float left
            cursor pointer
            flex 0 0 200px
            width 200px
            margin-right 16px
            @media screen and (max-device-width: 440px)
              flex 0 0 150px
            img
              width 200px
              height 130px
              @media screen and (max-device-width: 420px)
                width 150px
                height 92px
          .item-digest
            // padding-right 0.5rem
            font-size 0.875rem
            line-height 2rem
            color #787d82
            margin-top -5px
            no-wrap(4, 2rem)
            @media screen and (max-device-width: 420px)
              line-height 1.5rem
              no-wrap(4, 1.5rem)
        .item-btm
          font-size 14px
          color #93999f
          line-height 18px
          padding 16px 0 18px
          @media screen and (max-width: 440px)
            font-size 12px
          .l
            text-align left
            .hd-pic
              display inline
              margin-right 1rem
            .pass-time
              display inline
              margin-right 1.25rem
            .count
              display inline
              margin-right 1.25rem
  .no-result
    position absolute
    top 30%
    left 50%
    width 100%
    transform translate(-50%, -50%)
</style>