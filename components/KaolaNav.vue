<template>
  <div class="j-nav-wrapper">
    <div class="j-nav" ref="menuButton" @click="toggleNavMobile">
      <row>
        <i-col span="20" class="title-wrapper">
          <span class="logo-mobile">LOGO</span>
        </i-col>
        <i-col span="4">
          <Icon type="android-menu"></Icon>
        </i-col>
      </row>
    </div>
    <transition name="slide">
      <div class="nav-items" v-show="toggleNav" ref="toggle">
        <ul class="ul-wrapper">
          <router-link class="logo border-1px" to="/" tag="li" @click.native="hiddenNav">LOGO</router-link>
          <router-link class="border-1px" to="/" exact tag="li" @click.native="hiddenNav">首页</router-link>
          <nuxt-link class="border-1px" to="/course" tag="li" @click.native="hiddenNav">课程</nuxt-link>
          <router-link class="border-1px" to="/teacher" tag="li" @click.native="hiddenNav">师资</router-link>
          <router-link class="border-1px" to="/article" tag="li" @click.native="hiddenNav">手记</router-link>
          <router-link class="login border-1px" to="/login" tag="li" @click.native="toInfoPage">
          <span v-if="!token">登录</span>
            <Icon type="person"></Icon>
          </router-link>
          <router-link class="regin border-1px" to="/regist" tag="li" @click.native="hiddenNav" v-if="!token">注册</router-link>
          <li @click="logout" v-if="token">退出</li>
        </ul>
      </div>
  </transition>
  </div>
</template>
<script>
export default {
  data() {
    return {
      toggleNav: false,
      token: 'token',
      navWidth: ''
    }
  },
  mounted() {
    this.show()
    // this.toInfoPage()
  },
  methods: {
    toInfoPage() {
    },
    logout() {
    },
    hiddenNav() {
      let width =
        window.innerWidth ||
        document.documentElement.clientWidth ||
        document.body.clientWidth
      if (width < 1200) {
        this.toggleNav = false
      }
    },
    toggleNavMobile() {
      this.toggleNav = !this.toggleNav
    },
    show() {
      let width =
        window.innerWidth ||
        document.documentElement.clientWidth ||
        document.body.clientWidth
      console.log(width)
      if (width >= 1200) {
        this.toggleNav = true
      }
    }
  }
}
</script>
<style lang="stylus">
@import '~assets/stylus/mixin'
.j-nav-wrapper
  position fixed
  z-index 100
  // fixed top
  top 0
  width 100%
  margin 0 auto
  height 60px
  color #5a5366
  padding 16px 0
  background-color #ffffff
  box-shadow 4px 4px 4px 0 rgba(7, 17, 27, 0.1)
  @media screen and (max-width: 1200px)
    padding-top 16px
  .j-nav
    // position absolute
    display none
    // height 3rem
    @media screen and (max-width: 1200px)
      display block
    .logo-mobile
      font-size 32px
      color #61dfe1
      line-height 32px
    .icon-toggle
      width 32px
      height 32px
      // vertical-align -0.6rem
      color #61dfe1
      fill currentColor
      // overflow hidden
      // display block
      @media screen and (max-width: 1200px)
        display block
        // margin-top 0.5rem
  .nav-items
    // background-color #61dfe1
    @media screen and (max-width: 1200px)
      background-color #ffffff
      // top 2rem
    .ul-wrapper
      width 80%
      margin 0 auto
      display flex
      align-items center
      @media screen and (max-width: 1500px)
        width 95%
      @media screen and (max-width: 1200px)
        width 100%
        margin 0 auto
        display block
      li
        display inline-block
        margin-top 0
        padding 6px 16px 0
        font-size 16px
        color #5a5e66
        line-height 16px
        cursor pointer
        @media screen and (max-width: 1200px)
          display block
          text-align center
          background-color #ffffff
          color #999999
          // border-bottom 1px solid #eeeeee
          border-bottom-1px #eeeeee
          padding 1rem
        &.nuxt-link-exact-active, .nuxt-link-active
          color #61dfe1
          // border-bottom: 2px solid #f01414
      .logo
        padding-left 90px
        padding-right 100px
        color #61dfe1
        font-size 32px
        background-color #ffffff
        // float left
        @media screen and (max-width: 1200px)
          display none
      .login
        margin-left 90px
        @media screen and (max-width: 1300px)
          margin-left 48px
        @media screen and (max-width: 1200px)
          margin-left 0
        .j-icon
          width 32px
          height 32px
          // vertical-align -0.6rem
          color #61dfe1
          fill currentColor
          // overflow hidden
      .regin
        @media screen and (max-width: 1200px)
          margin-left 0
// .slide-enter-active, .slide-leave-active
//   transition all 0.3s
// .slide-enter, .slide-leave-to
//   transform translate3d(100%, 0, 0)
</style>
