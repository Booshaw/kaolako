<template>
  <section class="container">
    <kaola-nav></kaola-nav>
    <div class="main">
      <div class="head-wrapper">
        <div class="bread">
          <h2 class="title">课程标题课程标题课程标题课程标题课程标题课程标题</h2>
          <div class="course-intro">
            <ul>
              <li class="btn"> <p>开始学习</p> </li>
              <li> <p>学习人数</p> <p>{{section.view}}</p> </li>
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
              <p class="desc">课程简介课程简介课程简介课程简介课程简介课程简介课程简介课程简介课程简介课程简介课程简介课程简介课程简介课</p>
              <Tabs value="section">
                <TabPane label="章节" name="section">
                  <div class="chapter">
                     <Collapse v-model="valueItem">
                        <Panel v-for="(item, index) in section.sectionList" :key="index">
                          <h3>第{{index + 1}}章 {{item.actionTitle}}</h3>
                          <ul slot="content">
                            <li v-for="(i, index1) in item.list" :key="index1" class="item" @click="toSectionDetail(i)"> <span><Icon type="arrow-right-b"></Icon></span> <span>{{index + 1}}-{{index1 + 1}}</span> <span>{{i.title}}</span> ({{i.time}}) <Button class="btn-learn" size="small" type="error">开始学习</Button></li>
                          </ul>
                        </Panel>
                    </Collapse>
                  </div>
                </TabPane>
                <TabPane label="详情" name="information">
                  <img :src="section.information" alt="">
                </TabPane>
              </Tabs>
            </div>
          </i-col>
          <i-col :lg="6" :md="6" :sm="24" :xs="24">
            <div class="note-wrapper">
              <h4 class="t-tips">讲师提示</h4>
              <div class="teacher-intro">
                <img :src="section.teacherInfo.avatar" :alt="section.teacherInfo.name">
                <span class="t-name">{{section.teacherInfo.name}}</span>
              </div>
              <div class="course-info-tip">
                <p>{{section.courseNotes.notes}}</p>
              </div>
            </div>
          </i-col>
        </Row>
      </div>
    </div>
    <kaola-footer></kaola-footer>
  </section>
</template>

<script>
// import AppLogo from '~/components/AppLogo.vue'
import KaolaNav from '~/components/KaolaNav.vue'
import KaolaFooter from '~/components/KaolaFooter.vue'
import Service from '~/plugins/axios'
export default {
  data () {
    return {
      valueItem: [],
      section: {}
    }
  },
  asyncData () {
    return Service.get(`https://easy-mock.com/mock/5ac20177470d657aa5c1dd51/kaolako/homePage`)
    .then((res) => {
      return { 
        section: res.data.data.section}
    })
  },
  methods: {
    initValue(arr) {
      for (let i = 0; i < this.section.sectionList.length; i++) {
        this.valueItem.push(i.toString())
      }
    },
    toSectionDetail(i) {
      this.$router.push({
        path: '/course/sectionDetail',
        query: {
          id: i.id
        }
      })
    }
  },
  created() {
    this.initValue()
  },
  components: {
    // AppLogo,
    KaolaNav,
    KaolaFooter
  }
}
</script>
<style lang="stylus">
.container
  margin-top 60px
  display flex
  flex-direction column
  height 100%
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
          .btn
            background #f01414
            color #ffffff
            padding 16px 12px 16px
            border-radius 12px
            font-size 16px
            line-height 16px
            font-weight 700
            cursor pointer
            border none
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
          h3
            display inline-block
            position relative
            // height 53px
            // line-height 65px
            font-size 16px
            color #07111b
            font-weight 700
            cursor pointer
          .icon
            margin-right 12px
            color #93999f
            font-size 16px
            line-height 65px
          .item
            padding 8px 16px
            background-color #f3f5f7
            margin 4px auto
            cursor pointer
            &:hover
              background #2b333b
              color #ffffff
              .btn-learn
                display block
            .btn-learn
              display none
              float right
            span
              padding-right 6px
      .note-wrapper
        margin-bottom 28px
        padding 0 24px 24px
        border-bottom 1px solid #d9dde1
        text-align left
        .t-tips
          font-weight 700
          font-size 16px
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
