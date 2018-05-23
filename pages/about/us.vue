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
            <h1 class="title">关于我们</h1>
            <ul class="us-lists">
              <li class="us-list" v-for="(item,index) in aboutUs" :key="index">
                <p class="us-question"> {{item.question}} </p>
                <p class="us-answer" v-html="item.answer"></p>
              </li>
            </ul>
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
      aboutUs: [
        {
          title: '关于我们',
          question: '什么是考拉课堂（KAOLAKO）',
          answer: '考拉课堂让真正有能力的老师直接和有需求的学员对接<br>教育培训行业更多的话语权在培训机构手里，无论培训机构规模做得多大，始终是以自身利益最大化为目标，从而最大程度压榨培训老师和学员的利益。'
        },
        {
          title: '关于我们',
          question: '考拉课堂是什么',
          answer: '专注做好公考教育的KAOLAKO，符合互联网发展潮流接地气儿的KAOLAKO。我们免费，我们只教有用的，我们专心做教育。'
        },
        {
          title: '关于我们',
          question: '为什么做KAOLAKO',
          answer: '致力于公考行业教与学的最优解决方案的研究，用互联网思维改变我们的学习。'
        },
        {
          title: '关于我们',
          question: '考拉课要做的：',
          answer: '免费：免费的考情、免费的考资、免费的软件、免费的答疑、免费的基础体系课程。<br>透明：平台所有老师均是实力派老师，不仅仅是因为简历的包装，更是老师的教研成果：经验、图书、课程的质量评价建立在看得见的基础之上。<br>自由：所谓萝卜青菜，各有所爱；学员可以从自身的价值观来判定平台的老师对不对你胃口，无论付费还是不付费，一切的选择均是学员自由的选择。<br>让学员能学到知识，让老师能体现价值，把更多的剩余价值让渡给老师和学员'
        },
        {
          title: '关于我们',
          question: '考拉课是谁',
          answer: 'KAOLAKO隶属于四川考拉巴巴教育咨询科技有限公司，是一家从事O2O教学的教育企业。'
        },
        {
          title: '关于我们',
          question: '考拉课使命',
          answer: '情感和名利：师者，传道授业解惑也！作为老师，我们希望通过我们的知识和经验帮助到更多的人进步，桃李满天下是对老师的最大的褒奖。但是名利要吗？肯定要！两个原则：一是一分耕耘，就必须一份收获；二是问之内心，已尽力，更无愧。<br>价值和尊重：作为受过深层次教育的老师，我们不过多关心金钱和名利，更关心的是的一份事业能否体现出自我价值的实现以及社会的尊重。<br>秉承“开拓、创新、公平、分享”的精神，将互联网特性全面的应用在教育领域，致力于为教育工作者及求学者打造一站在线互动学习的教育品牌。'
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
.container
  margin-top 60px
  display flex
  flex-direction column
  min-height 100%
  .main
    flex 1
    .us
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
</style>
