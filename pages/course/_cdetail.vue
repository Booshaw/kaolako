<template>
  <section class="c-detail-container">
    <kaola-nav></kaola-nav>
    <div class="main">
      <div class="head-wrapper">
        <div class="bread">
 
          <h2 class="title">{{section.title}}</h2>
          <div class="course-intro">
            <ul>
              <li class="btn">开始学习</li>
              <li> <p>学习人数</p> <p>{{section.viewCount}}</p> </li>
              <li> <p>课程时长</p> <p>{{section.duration}}</p> </li>
              <li> <p>综合评分</p> <p>{{section.rate}}</p> </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="course-info">
        <Row>
          <i-col :lg="18" :md="18" :sm="24" :xs="24">
            <div class="info">
              <!-- <p class="desc">{{section.description}}</p> -->
              <Tabs value="section">
                <TabPane label="章节" name="section">
                  <div class="chapter">
                     <!-- <Collapse v-model="valueItem">
                        <Panel v-for="(item, index) in section.sectionList" :key="index">
                          <h3>第{{index + 1}}章 {{item.title}}</h3>
                          <ul slot="content">
                            <li v-for="(i, index1) in item.children" :key="index1" class="item" @click="toSectionDetail(i)"> <span><Icon type="arrow-right-b"></Icon></span> <span>{{index + 1}}-{{index1 + 1}}</span> <span>{{i.title}}</span> ({{i.duration}}) <Button class="btn-learn" size="small" type="error">开始学习</Button></li>
                          </ul>
                        </Panel>
                    </Collapse> -->
                    <div v-for="(item, index) in section.sectionList" :key="index" class="item-box">
                      <h3><span style="margin-right:16px">第{{index+1}}章</span>{{item.title}}</h3>
                      <ul>
                        <li v-for="(i, index1) in item.children" :key="index1" @click="toSectionDetail(i)">
                          <span class="play-icon"><Icon type="arrow-right-b"></Icon></span> <span>{{index + 1}}-{{index1 + 1}}</span> <span>{{i.title}}</span> ({{i.duration}})
                        </li>
                      </ul>
                    </div>
                  </div>
                </TabPane>
                <TabPane label="详情" name="information">
                  <img :src="section.information" alt="" class="img-responsive">
                </TabPane>
              </Tabs>
            </div>
          </i-col>
          <i-col :lg="6" :md="6" :sm="24" :xs="24">
            <div class="note-wrapper">
              <h4 class="t-tips">讲师提示</h4>
              <!-- <div class="teacher-intro">
                <img :src="section.teacherInfo.avatar" :alt="section.teacherInfo.name">
                <span class="t-name">{{section.teacherInfo.name}}</span>
              </div>
              <div class="course-info-tip">
                <p>{{section.courseNotes.notes}}</p>
              </div> -->
            </div>
          </i-col>
        </Row>
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
  data () {
    return {
      valueItem: [],
      section: {},
      sectionListLength: 0
    }
  },
  // asyncData ({query}) {
  //   return Service.post(`http://api.kaolako.com/kaola/web/course/detail`)
  //   .then((res) => {
  //     console.log(res)
  //     return { 
  //       section: res.data.data}
  //   })
  // },
  methods: {
    _getCourseDetail() {
      return Service.post(
        `http://api.kaolako.com/kaola/web/course/detail`,
        {
          id: this.$route.query.id
        }
      ).then(res => {
        if (res.data.code === '200') {
          this.section = res.data.data
          this.sectionListLength = res.data.data.sectionList.length
        }
        console.log(this.sectionListLength)
      })
    },
    _initValue() {
      for (let i = 0; i < this.sectionListLength; i++) {
        this.valueItem.push(i.toString())
      }
      console.log(this.valueItem)
    },
    toSectionDetail(i) {
      this.$router.push({
        path: '/course/section',
        query: {
          id: i.id
        }
      })
    }
  },
  created() {
    this._getCourseDetail()
    // this._initValue()
  },
  mounted() {
    // this._initValue()
    // this._getCourseDetail()
  },
  components: {
    // AppLogo,
    KaolaNav,
    KaolaFoo
  }
}
</script>
<style lang="stylus">
.c-detail-container
  margin-top 60px
  display flex
  flex-direction column
  height 100%
  background-color #F8FAFC
  .main
    flex 1
    .head-wrapper
      background-color #5FC3E4
      background-image linear-gradient(160deg, #E55D87, #5FC3E4)
      .bread
        width 80%
        margin 0 auto
        text-align left
        @media screen and (max-width: 440px)
          width 100%
        .title
          padding 32px
          line-height 31px
          font-weight 700
          font-size 32px
          color #ffffff
          @media screen and (max-width: 440px)
            font-size 24px
            line-height 28px
        .course-intro
          padding 0 0 32px 32px
          li
            display inline-block
            margin-right 16px
            padding 0 16px
            font-size 12px
            line-height 16px
            color #fff
            @media screen and (max-width: 440px)
              padding 0 8px
              margin-right 8px
            p
              text-align center
          .btn
            background #e53935
            color #ffffff
            padding 16px 12px 16px
            border-radius 12px
            font-size 16px
            line-height 16px
            font-weight 700
            cursor pointer
            border none
            &:hover
              background #f44336
    .course-info
      width 80%
      margin 32px auto
      @media screen and (max-width: 440px)
        width 100%
      .info
        font-size 14px
        text-align left
        color #4d555d
        line-height 28px
        word-break break-all
        padding 16px
        // margin-bottom 16px
        .desc
          margin-bottom 32px
        .chapter
          padding 16px 0 0 16px
          @media screen and (max-width: 440px)
            padding 8px 0 0 8px
          .item-box
            padding 24px 30px 24px
            background #ffffff
            border-radius 8px
            margin-bottom 16px
            transition .3s all linear
            &:hover
              box-shadow 0 8px 16px 0 rgba(7,17,27,0.1)
            h3
              position relative
              text-align left
              color #07111b
              line-height 32px
              margin-bottom 8px
              font-size 16px
            li
              position relative
              height 48px
              padding 0 32px 0 10px
              font-size 14px
              box-sizing border-box
              transition .3s all linear
              overflow hidden
              color #93999F
              &:hover
                background-color #F8FAFC
                border-radius 4px
                cursor pointer
                color #07111b
            .play-icon
              margin-right 12px
              color #D9DDE1
              font-size 14px
              line-height 48px
        .img-responsive
          display block
          margin 0 auto
          width 100%
      .note-wrapper
        margin-bottom 28px
        padding 0 24px 24px
        border-bottom 1px solid #d9dde1
        text-align left
        .t-tips
          font-weight 700
          font-size 16px
          padding 4px
        .teacher-intro
          padding 24px 0 20px
          img
            width 60px
            height 60px
            border-radius 50%
            vertical-align middle 
          .t-name
            display inline-block
            font-size 16px
            font-weight 700
            color #07111b
            text-align center
            padding-left 12px
        .course-info-tip
          position relative
          padding 24px
          background-color #edf1f2
          color #4d555d
          margin-bottom 12px
          border-radius 8px
          &:before
            content ''
            display block
            position absolute
            left 25px
            top -10px
            width 0
            height 0
            border 10px solid transparent
            border-top 0 none
            border-bottom-color #edf1f2
  .ivu-tabs-nav .ivu-tabs-tab
    font-size 18px
  .ivu-tabs-nav .ivu-tabs-tab-active
    color #f01414
  .ivu-tabs-ink-bar
    background-color #f01414
  .ivu-collapse
    border none
    background-color transparent
  .ivu-collapse>.ivu-collapse-item>.ivu-collapse-header
    padding-left 16px
</style>
