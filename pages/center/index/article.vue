<template>
  <section class="c-container">
    <div class="c-content">
      <div class="item" v-for="(item, index) in personalInfo.timeLineList" :key="index" >
        <div class="aricle-lwrap" v-if="item.type === 1">
          <h3 class="item-title" @click="selectItem(item)">{{item.title}}</h3>
          <!--text-->
          <div class="item-digest-wrapper">
            <div class="img-link" v-if="item.image" @click="selectItem(item)">
              <img :src="item.image" alt="考拉课">
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
.c-container
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
  .no-result
    position absolute
    top 30%
    left 50%
    width 100%
    transform translate(-50%, -50%)
</style>