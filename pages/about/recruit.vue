<template>
  <section class="container">
    <kaola-nav></kaola-nav>
    <div class="main">
      <Row>
        <i-col span="4">
          <about-nav></about-nav>
        </i-col>
        <i-col span="20">
          <div class="recruit">
            <h1 class="title">讲师招聘</h1>
            <div class="recruit-lists">
              <ul>
                <li class="recruit-list" v-for="(item,index) in aboutrecruit" :key="index">
                <p class="recruit-info"> {{item.recruitInfo}} </p>
              </li>
              </ul>
              <ul>
              <li v-for="(item,index) in recruitLists" :key="index">
                <p class="recruit-recruitRequirements" v-html="item. recruitRequirements "> </p>
                <p class="recruit-responsibilities" v-html="item.recruitResponsibilities "> </p>
                <p class="recruit-responsibilities" v-html="item. Requirements "> </p>
              </li>
            </ul>
            </div>
            <p class="service">咨询热线：028—61110668 61110669</p>
          </div>
        </i-col>
      </Row>
    </div>
    <kaola-foo></kaola-foo>
  </section>
</template>

<script>
// import AppLogo from '~/components/AppLogo.vue'
import KaolaNav from '~/components/KaolaNav.vue'
import KaolaFoo from '~/components/KaolaFoo.vue'
import AboutNav from '~/components/AboutNav.vue'
export default {
  data () {
    return {
      aboutrecruit: [
        {
          recruitInfo: '想试水尝尝网络讲师的滋味？快加入慕课网讲师队伍吧！ '
        }
      ],
      recruitLists: [
        {
          recruitRequirements: '我们希望你',
          recruitResponsibilities: '有一颗为学员奉献的心，有一颗追求理想的心，有一颗不断完善、进步的心<br> '
        },
        {
          recruitRequirements: '合作通道',
          recruitResponsibilities: '详见老师账户个人页面<br> '
        }
      ]
    }
  },
  components: {
    // AppLogo,
    KaolaNav,
    KaolaFoo,
    AboutNav
  }
}
</script>
<style lang="stylus">
  .recruit
    width 80%
    margin 0 auto
    text-align left
    .title
      font-size 16px
      line-height 49px
      font-weight 400
      color #363d40
      margin-bottom 2.1em
      border-bottom 1px solid #eceff0
    .recruit-lists
      .recruit-list
        list-style none
        font-size 12px
        color #60686b
        line-height 31px
        margin-bottom 28
    .recruit-derection
      margin-top 28px
      font-size 20px
      padding 10px 0
    .recruit-recruitRequirements{
      font-size 14px
      margin 28px 0
      padding-left 14px
      color rgb(240,20,20)
    }
    .recruit-responsibilities{
      font-size 12px
      line-height 24px
      padding-left 40px
    }
    .service{
      margin-top 28px
      font-size 14px
      color #60686b
      text-align center
    }
</style>
