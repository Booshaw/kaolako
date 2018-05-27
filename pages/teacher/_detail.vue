<template>
  <section class="container">
    <kaola-nav></kaola-nav>
    <div class="main">
      <div class="head-wrapper">
        <div class="box">
          <img :src="teacherInfo.avatar" :alt="teacherInfo.nickName">
          <span class="nick-name">{{teacherInfo.nickName}}</span>
          <span class="gender" :class="{female: teacherInfo.gender === '女'}"><Icon type="female" v-if="teacherInfo.gender === '女'"></Icon><Icon type="male" v-else></Icon></span>
          <span>{{teacherInfo.introduction}}</span>
        </div>
      </div>
      <Row class="content-wrapper">
        <i-col :lg="18" :md="18" :sm="24" :xs="24">
          <div class="c-content">
            <div class="item" v-for="(i, index1) in teacherInfo.timeLineList" :key="index1" >
              <div class="aricle-lwrap" v-if="i.type === 1">
                <h3 class="item-title" @click="selectItem(i)">{{i.title}}</h3>
                <!--text-->
                <div class="item-digest-wrapper">
                  <div class="img-link" @click="selectItem(i)">
                    <img :src="i.thumbnailUrl" :alt="i.title">
                  </div>
                  <p class="item-digest">
                    {{i.summary}}
                  </p>
                </div>
                <div class="item-btm">
                  <ul class="l">
                    <li class="hd-pic">{{i.author}}</li>
                    <li class="pass-time">{{i.publishTime}}</li>
                    <li class="count">{{i.viewCount}}浏览</li>
                    <li class="count">{{i.categoryName}}</li>
                    <li class="count" v-for="(n, index2) in i.tag" :key="index2">{{n.name}}</li>
                  </ul>
                </div>
                <span class="time">{{i.createdTime}}</span>
              </div>
              <div class="box" @click="toCourseDetail(i)" v-else>
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
                <span class="time">{{i.createdTime}}</span>
              </div>
            </div>
          </div>
          <div class="no-result" v-if="noResult">
            <p>暂无任何动态</p>
          </div>
        </i-col>
        <i-col :lg="6" :md="6" :sm="24" :xs="24">
          <div class="order-box" v-for="(item, index) in teacherInfo.order" :key="index">
            <ul>
              <!-- <li>
                <Icon type="person"></Icon> <span>{{item.teacher}}</span>
              </li> -->
              <li>
                <Icon type="pie-graph"></Icon> <span>{{item.category}}</span>
              </li>
              <li>
                <Icon type="ios-location"></Icon> <span>{{item.address}}</span>
              </li>              
              <li>
                <Icon type="ios-telephone"></Icon> <span>{{item.phone}}</span>
              </li>              
              <li>
                <Icon type="calendar"></Icon> <span>{{item.startDate}} <span>到</span>{{item.endDate}}</span>
              </li>              
              <li>
                <Icon type="speakerphone"></Icon> <span>{{item.description}}</span>
              </li>
            </ul>
          </div>
        </i-col>
      </Row>
      <div v-if="loading">
        <Spin fix>
          <Icon type="load-c" size=18 class="icon-load"></Icon>
          <div>Loading</div>
        </Spin>
      </div>
    </div>
    <kaola-foo></kaola-foo>
  </section>
</template>
<script>
// import AppLogo from '~/components/AppLogo.vue'
import KaolaNav from '~/components/KaolaNav.vue'
import KaolaFoo from '~/components/KaolaFoo.vue'
import Service from '~/plugins/axios'
export default {
  data() {
    return {
      noResult: false, // 未查询到数据
      current: 0,
      teacherInfo: {},
      loading: false,
      page: 1,
      pageSize: 10
    }
  },
  created() {
    this._getList()
  },
  methods: {
    _getList() {
      this.loading = true
      return Service.post(`http://api.kaolako.com/kaola/web/teacher/detail`, {
        page: this.page,
        pageSize: this.pageSize,
        id: this.$route.query.id
      }).then(res => {
        if (res.data.code === '200') {
          console.log(res.data.data)
          this.teacherInfo = res.data.data
          console.log(this.teacherInfo)
          this.loading = false
        }
      })
    },
    selectItem(item) {
      this.$router.push({
        path: `/article/detail`,
        query: { id: item.id }
      })
    },
    toCourseDetail(item) {
      this.$router.push({
        path: '/course/courseDetail',
        query: { id: item.id }
      })
    }
  },
  components: {
    KaolaNav,
    KaolaFoo
  }
}
</script>
<style lang="stylus">
@import '~assets/stylus/mixin'
// .page-enter-active, .page-leave-active {
// transition: opacity .4s, transform .4s;
// transform-style: preserve-3d;
// backface-visibility: hidden;
// opacity: 1;
// }
// .page-enter, .page-leave-active {
// opacity: 0.5;
// transform: rotateY(100deg);
// }
.container
  position relative
  text-align center
  margin-top 60px
  display flex
  flex-direction column
  height 100%
  // background #f8f8f9
  .main
    position relative
    flex 1
    .head-wrapper
      padding 32px
      // background-image linear-gradient(160deg, #E55D87, #5FC3E4)
      background url('~static/temp1.png') center top no-repeat #000000
      text-align left
      min-height 140px
      vertical-align top
      img
        vertical-align middle
        margin 0 16px
        border-radius 50%
        width 80px
        height 80px
        background #ffffff
      .nick-name
        color #ffffff
        font-size 24px
        line-height 28px
        text-align left
        margin-left 16px
      .gender
        top -8px
        font-size 14px
        color #0091ea
        padding 0 4px
      .female
        color #e91e63
    .content-wrapper
      width 80%
      margin 16px auto
      @media screen and (max-width: 440px)
        width 100%
      .c-content
        padding 16px
        .item
          position relative
          padding-left 3rem
          padding-bottom 2rem
          border-left 1px solid #f01414
          // background #ffffff
          margin 0 16px
          text-align left
          @media screen and (max-width: 440px)
            padding-top 48px
          .time
            position absolute
            left 0
            top 16px
            margin-left -112px
            line-height 16px
            font-size 16px
            color #818c8f
            @media screen and (max-width: 440px)
              margin-left 0px
              padding-left 8px
            &:before
              content ''
              display block
              position absolute
              left 108px
              width 8px
              height 8px
              border-radius 50%
              background-color #f01414
              @media screen and (max-width: 440px)
                left -4px
          .aricle-lwrap
            // border-bottom 1px solid #d9dde1
            background #f8f8f9
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
          .box
            // margin 8px
            overflow hidden
            border-bottom 1px solid #d9dde1
            padding 16px 0
            &:hover
              cursor pointer
            .category-box
              position relative
              transition 0.3s all linear
              height 130px
              max-height 148px
              background-color #eeeeee
              border-radius 12px
              width 237px
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
                  text-shadow 0 2px 4px rgba(7, 17, 27, 0.5)
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
                transition 0.3s all linear
                text-overflow -o-ellipsis-lastline
                display -webkit-box
                -webkit-line-clamp 2
                -webkit-box-orient vertical
                text-align left
      .order-box
        margin 16px
        // background #80818f
        box-shadow 0 2px 4px rgba(7, 17, 27, 0.5)
        text-align left
        color #80848f
        padding 16px
        border-radius 8px
        li
          margin-bottom 16px
          border-bottom 1px solid #e9eaec
          padding 8px
          span
            margin 0 8px
</style>