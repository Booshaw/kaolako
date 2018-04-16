<template>
  <section class="container">
    <kaola-nav></kaola-nav>
    <div class="main">
      <Row>
        <i-col span="4">
          <about-nav></about-nav>
        </i-col>
        <i-col span="20">
          <div class="us">
            <h1 class="title">企业合作</h1>
            <ul class="coopreate-lists">
              <li class="coopreate-list" v-for="(item,index) in aboutCoopreate" :key="index">
                <p class="us-question" v-html="item.derection"></p>
                <p class="us-answer" v-html="item.derectionInfo"></p>
              </li>
            </ul>
          </div>
        </i-col>
      </Row>
    </div>
    <kaola-footer class="j-footer"></kaola-footer>
  </section>
</template>

<script>
// import AppLogo from '~/components/AppLogo.vue'
import KaolaNav from '~/components/KaolaNav.vue'
import KaolaFooter from '~/components/KaolaFooter.vue'
import AboutNav from '~/components/AboutNav.vue'
export default {
  data () {
    return {
      aboutCoopreate: [
        {
          title: '企业合作',
          derection: '讲师合作',
          derectionInfo: '欢迎公考行业讲师入驻'
        },
         {
          title: '企业合作',
          derection: '机构合作',
          derectionInfo: '1、提供名师约课系统 <br>2、提供第三方运营软件服务<br>3、详询个人账户机构申请通道'
        }
      ]
    }
  },
  components: {
    // AppLogo,
    KaolaNav,
    KaolaFooter,
    AboutNav
  }
}
</script>
<style lang="stylus">
.container
  margin-top 60px
  display flex
  flex-direction column
  min-height 100%
  width 100%
  .main
    flex-grow 1
    flex 1 0 auto
    width 80%
    margin 0 auto
    .us
      width 80%
      padding 16px 32px
      font-size 16px
      text-align left
      .title
        font-size 16px
        line-height 49px
        font-weight 400
        color #363d40
        margin-bottom 32px
        border-bottom 1px solid #eceff0
      .us-lists
        padding-left 40px
        .us-list
          font-size 14px
          color #303538
          margin-bottom 28px
          .us-question
            font-size 14px
            line-height 28px
            font-weight 400
          .us-answer
            font-size 12px
            line-height 24px
  .j-footer
    flex 0 0 auto
</style>
