<template>
  <section class="c-i-container">
    <div class="c-content">
      <div class="item" v-for="(item, index) in personalInfo.timeLineList" :key="index" >
        <div class="aricle-lwrap" v-if="item.type === 1">
          <h3 class="item-title" @click="selectItem(item)">{{item.title}}</h3>
          <!--text-->
          <div class="item-digest-wrapper">
            <div class="img-link" v-if="item.image" @click="selectItem(item)">
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
        <div class="box" @click="toCourseDetail(item)" v-else>
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
              <span>{{item.count}}</span>
              <Rate show-text disabled v-model="item.rate">
                <span style="color: #f5a623">{{item.rate}}</span>
              </Rate>
            </div>
            <div class="desc">
              <p>{{item.description}}</p>
            </div>
          </div>
          <span class="time">{{item.createdTime}}</span>
        </div>
      </div>
    </div>
    <div class="no-result" v-if="noResult">
      <p>暂无任何动态</p>
    </div>
  </section>
</template>
<script>
import Service from '~/plugins/axios'
export default {
  data () {
    return {
      personalInfo: {},
      noResult: false
    }
  },
  created() {
    this._getList()
  },
  methods: {
    _getList() {
      return Service.get(`https://easy-mock.com/mock/5ac20177470d657aa5c1dd51/kaolako/homePage`)
      .then((res) => {
        if (res.data.code === 200) {
        this.personalInfo = res.data.data.personalInfo
      } else {
        this.noResult = true
      }
      })
    },
    selectItem() {},
    toCourseDetail() {}
  },
  components: {
  }
}
</script>
<style lang="stylus">
.c-i-container
  position relative
  height 100%
  width 100%
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
            no-wrap(4,2rem)
            @media screen and (max-device-width: 420px)
              line-height 1.5rem
              no-wrap(4,1.5rem)  
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
        padding 16px
        background-color #f8f8f9
        border-radius 8px
        &:hover
          cursor pointer
        .category-box
          position relative
          transition .3s all linear
          height 130px
          max-height 148px
          background-color #eeeeee
          border-radius 12px
          width 237px
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
  .no-result
    position absolute
    top 30%
    left 50%
    width 100%
    transform translate(-50%, -50%)
</style>