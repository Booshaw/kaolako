<template>
  <div class="footer">
    <div class="container">
      <div class="footer-wrapper idx-width">
        <transition name="fade">
          <div class="show-weixin" v-show="show">
          <p class="text">扫描二维码</p>
          <p class="text">关注考拉课堂官方微信</p>
          <img src="~/static/weixin-public.png" alt="考拉课题官方微信">
        </div>
        </transition>
      </div>
      <div class="footer-link">
        <router-link to="/about/us">关于我们</router-link>
        <router-link to="/about/cooperate">企业合作</router-link>
        <router-link to="/about/job">人才招聘</router-link>
        <router-link to="/about/recruit">教师招聘</router-link>
      </div>
      <div class="footer-copright">
        <p class="cop">© 2017 kaolako.com  蜀ICP备16007197号</p>
        <span class="text" @mouseover="weiXinHighLight" @mouseout="weiXinHideHighLight">官方微信</span>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: 'footer',
  data () {
    return {
      show: false,
      weiXinSelected: false,
      weiBoSelected: false
    }
  },
  methods: {
    weiXinHighLight () {
      this.show = true
      this.weiXinSelected = true
    },
    weiXinHideHighLight () {
      this.show = false
      this.weiXinSelected = false
    },
    weiBoHighLight () {
      this.weiBoSelected = true
    },
    weiBoHideHighLight () {
      this.weiBoSelected = false
    }
  }
}
</script>
<style lang="stylus">
  .router-link-active
    text-decoration: none
  .footer
    height 80px
    padding 27px 0
    .container
      position relative
      margin 0 auto
      width 80%
      // padding-left 10%
      .footer-wrapper
        position absolute
        width auto
        right 0
        bottom 0
      .idx-width
        width 20%
        margin 0 auto
      .show-weixin
        position absolute
        right 0
        bottom 16px
        background #FFF
        box-shadow 4px 4px 2px #ccc
        img
          width 160px
          height 160px
        .text
          font-size 12px
        a
          &:hover
            .icon-weixin
              color red
      .footer-link
        text-align center
        border none
        padding 0
        margin 0 auto
        a
          display inline-block
          font-size 14px
          margin 0 10px
          color #99a1a6
          text-decoration none
      .footer-copright
        font-size 12px
        padding-bottom 16px
        text-align center
        margin-top 8px
        color #93999f
        line-height 24px
        .cop
          display inline-block
          margin-right 16px
</style>