<template>
  <section class="container">
    <kaola-nav></kaola-nav>
    <div class="main">
      <div class="head-wrapper">
        <div class="box">
          <img :src="personalInfo.avatar" :alt="personalInfo.nickName">
          <span class="nick-name">{{personalInfo.nickName}}</span>
          <span class="gender" :class="{female: personalInfo.gender === '女'}"><Icon type="female" v-if="personalInfo.gender === '女'"></Icon><Icon type="male" v-else></Icon></span>
        </div>
      </div>
      <div class="nav">
        <nuxt-link :to="`${item.path}`" tag="li" v-for="(item, index) in navList" :key="index">
          <span class="tab-link">{{item.navTitle}}</span>
        </nuxt-link>
      </div>
      <div class="content">
        <nuxt-child/>
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
      current: 0,
      navList: [
        {
          navTitle: "首页",
          path: "/center"
        },
        {
          navTitle: "课程",
          path: "/center/course"
        },
        {
          navTitle: "手记",
          path: "/center/article"
        },
        {
          navTitle: "认证",
          path: "/center/identification"
        },
        {
          navTitle: "预约",
          path: "/center/order"
        }
      ],
      personalInfo: {}
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
      }
      })
    }
  },
  components: {
    KaolaNav,
    KaolaFooter
  }
}
</script>
<style lang="stylus">
.page-enter-active, .page-leave-active {
  transition: opacity .4s, transform .4s;
  transform-style: preserve-3d;
  backface-visibility: hidden;
  opacity: 1;
}
.page-enter, .page-leave-active {
  opacity: 0.5;
  transform: rotateY(100deg);
}
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
    .nav
      margin 32px auto
      li
        display inline-block
        margin 0 32px
        font-size 16px
        @media screen and (max-width: 440px)
          margin 0 8px
        &:hover
          color #f01414
          cursor pointer
        span
          padding 8px
        &.nuxt-link-exact-active, .nuxt-link-active
          .tab-link
            color #f01414
            border-bottom: 2px solid #f01414
    .content
      font-size 16px
      height 100%
      width 100%
</style>