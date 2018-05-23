<template>
  <section class="container">
    <kaola-nav></kaola-nav>
    <div class="main">
      <div class="banner-wrapper">
        <div class="banner-content">
          <banner :banner="bannerList"></banner>
        </div>
      </div>
      <div class="content">
        <div class="content-wrapper" v-for="(item, index) in courseList" :key="index">
          <h2 class="style-title">{{item.styleTitle}}</h2>
          <Row>
            <i-col :lg="6" :md="6" :sm="12" :xs="12" v-for="(i, index1) in item.list" :key="index1">
              <div class="box" @click="toCourseDetail(i)">
                <div class="category-box">
                  <div class="category-gradient">
                  </div>
                  <img class="category-img" :src="i.img" :alt="i.title">
                  <div class="category-info">
                    <img :src="i.avatar" :alt="i.avatar">
                    <span>{{i.author}}</span>
                  </div>
                </div>
                <div class="categor-intro-box">
                  <p class="course-title">{{i.title}}</p>
                  <div class="evaluation-box">
                    <Icon type="ios-person-outline"></Icon>
                    <span>{{i.count}}</span>
                    <Rate show-text disabled v-model="i.rate">
                      <span style="color: #f5a623">{{i.rate}}</span>
                    </Rate>
                  </div>
                  <div class="desc">
                    <p>{{i.description}}</p>
                  </div>
                </div>
              </div>
            </i-col>
          </Row>
        </div>
        <div class="article-wrapper">
          <Row>
            <i-col :lg="12" :md="12" :sm="24" :xs="24">
              <h2 class="type">热门手记</h2>
              <ul class="article-box">
                <li v-for="(i,index2) in article.most" :key="index2" class="item"> <span class="tag">{{i.tag}}</span> <span class="title">{{i.title}}</span> </li>
              </ul>
            </i-col>
            <i-col :lg="12" :md="12" :sm="24" :xs="24">
              <h2 class="type">最新手记</h2>
               <ul class="article-box">
                <li v-for="(j,index3) in article.latest" :key="index3" class="item"> <span class="tag">{{j.tag}}</span> <span class="title">{{j.title}}</span> </li>
              </ul>
            </i-col>
          </Row>
        </div>
      </div>
      <div class="teacher">
        <div class="teacher-wrapper">
          <h3 class="title">考拉精英名师</h3>
          <Row>
            <i-col :lg="4" :md="8" :sm="12" :xs="12" v-for="(t, index4) in teacherList" :key="index4">
              <div class="teacher-intro">
                <img :src="t.avatar" :alt="t.speciality" class="avatar">
                <h2 class="name">{{t.name}}</h2>
                <h3 class="spec">{{t.speciality}}</h3>
                <p class="intro">{{t.introduction}}</p>
              </div>
            </i-col>
          </Row>
        </div>
      </div>
    </div>
    <kaola-foo></kaola-foo>
  </section>
</template>

<script>
// import AppLogo from '~/components/AppLogo.vue'
import KaolaNav from '~/components/KaolaNav.vue'
import Banner from '~/components/banner.vue'
import KaolaFoo from '~/components/KaolaFoo.vue'
 import Service from '~/plugins/axios'
export default {
  // name: 'index',
  // fetch({ store }) {
  //   return Promise.all([
  //     store.dispatch('loadHotArticles'),
  //     store.dispatch('loadAnnouncements')
  //   ])
  // },
  data () {
    return {
      sliderStart: 0,
      bannerList: []
    }
  },

  asyncData () {
    return Service.get(`https://easy-mock.com/mock/5ac20177470d657aa5c1dd51/kaolako/homePage`)
    .then((res) => {
      // console.log(res.data.data)
      return { 
        bannerList: res.data.data.bannerList,
        courseList: res.data.data.courseList,
        article: res.data.data.articles,
        teacherList: res.data.data.teacherList}
    })
  },
  methods: {
    toCourseDetail(i) {
      console.log(i)
      this.$router.push({
        path: '/course/courseDetail',
        query: { id: i.id }

      })
    }
  },


  // computed: {
  //   article() {
  //     return this.$store.state.article.list
  //   },
  //   annuouncement() {
  //     return this.$store.state.annuouncement
  //   }
  // },
  components: {
    // AppLogo,
    KaolaNav,
    Banner,
    KaolaFoo
  }
}
</script>
<style lang="stylus">
.container
  position relative
  text-align center
  margin-top 60px
  display flex
  flex-direction column
  height 100%
  .main
    flex 1
    .banner-wrapper
      position: relative
      width: 100%
      height: 0
      padding-top: 35%
      overflow: hidden
      .banner-content
          position: absolute
          top: 0
          left: 0
          width: 100%
          height: 100%
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
      .article-wrapper
        text-align left
        padding 8px
        // margin 16px
        .type
          font-size 18px
          font-weight 700
          padding 8px
        .article-box
          background #f8f8f9
          border-radius 4px
          padding 8px
          margin 0 8px
          .item
            margin 8px 0
            font-size 16px
            max-height 48px
            line-height 24px
            word-break break-all
            word-wrap break-word
            display inline-block
            overflow hidden
            transition .3s all linear
            text-overflow -o-ellipsis-lastline
            display -webkit-box
            -webkit-line-clamp 1
            -webkit-box-orient vertical
            text-align left
            &:hover
              color #ed3f14
              cursor pointer
              text-decoration underline
            .tag
              display inline-block
              margin-right 16px
              border 1px solid #dddee1
              padding 4px 6px
              font-size 14px
              line-height 14px
              border-radius 8px
              color #80848f
    .teacher
      background url('/static/eliteTbg.jpg') center center no-repeat #f3f5f7
      background-size cover
      // height 25rem
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
  .ivu-rate
    font-size 12px
</style>
