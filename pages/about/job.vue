<template>
  <section class="container">
    <kaola-nav></kaola-nav>
    <div class="main">
      <Row>
        <i-col span="4">
          <about-nav></about-nav>
        </i-col>
        <i-col span="20">
          <div class="job">
            <h1 class="title">人才招聘</h1>
            <div class="job-lists">
              <ul>
                <li class="job-list" v-for="(item,index) in aboutJob" :key="index">
                <p class="job-info" v-html="item.jobInfo"></p>
                <p class="job-info" v-html="item.jobJoinUs"></p>
              </li>
              </ul>
              <ul>
              <li v-for="(item,index) in jobLists" :key="index">
                <p class="job-derection" v-html="item.jobDerection "> </p>
                <p class="job-name" v-html="item.name "> </p>
                <p class="job-responsibilities" v-html="item.jobResponsibilities "> </p>
                <p class="job-jobRequirements" v-html="item. jobRequirements "> </p>
                <p class="job-responsibilities" v-html="item. Requirements "> </p>
              </li>
            </ul>
            </div>
          </div>
        </i-col>
      </Row>
    </div>
    <kaola-footer></kaola-footer>
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
      aboutJob: [
        {
          jobInfo: '亲，很高兴在这里与你相遇，能在这里找到我，说明你对小考拉足够喜爱足够上心，多谢你的厚爱！<br>小考拉现在拿出最大诚意急寻合作战友。自上线以来，考拉课网受到广大程序员的各种喜爱，小考拉除内心窃喜以外，深知自己肩上责任重大，只有做出更好的课程，拿出更好的产品体验，才能对得起各位同学的喜爱。<br>小考拉虽不是富二代，但家底也算殷实，来到考拉课，我们绝不会亏待大家，不低于bat的待遇、五险一金、免费零食这些基本保障，大家都能享受到。不过你这么有追求，相信你更看重我们年轻的活力，积极向上的精气神，以及想做一番事业的决心和勇气。  '
        },
        {
          jobJoinUs: '怎么可以加入我们，为更多宝宝服务呢？<br>1、我是个人才，直接投递简历至邮箱：348742261@qq.com<br>2、我是个名师，直接在账户个人页面申请开通<br>3、我是好机构，直接在账户个人页面申请开通'
        }
      ],
      jobLists: [
        {
          jobDerection: '运营中心',
          name: '文案策划',
          jobResponsibilities: '教育培训类产品包装文案策划；<br> 广告创意策划及文案撰写；<br>协助团队共同完成相关推广计划的实施；<br>具有扎实的文字功底，能够独立完成品牌故事、广告文案、各类软文、产品宣传推广方案等各类宣传文案的策划和撰写；<br>具有良好的沟通能力、执行能力、协调能力和团队合作精神。',
          jobRequirements: '职位要求',
          Requirements: '广告、新闻媒体、中文等相关专业本科以上学历，3年以上文案撰稿工作经验（教育、广告和媒体行业经验者优先）；<br>有大型活动、网络营销成功案例者优先考虑；<br>热爱创意和写作，善于发现，并以独到的文笔加以描述、包装；<br>面试时请自带案例作品。'
        },
        {
          name: '活动策划',
          jobResponsibilities: '根据考拉课堂的产品定位和市场需求，制定相应的线上活动的活动营销方案；<br> 策划考拉课堂的各类网络活动方案、创意点、主题营销、口碑营销、视频营销等活动方案；<br>组织、监督、跟踪执行各类活动的推广执行，实现营运指标；<br>跟踪、分析各种推广活动的实施效果，并及时提出合理化调整；<br>分析、检测竞争对手活动。',
          jobRequirements: '职位要求',
          Requirements: '有2年以上策划经验，熟悉活动的运营和各类活动的策划技巧；<br>拥有较强的选题策划能力和较强的市场分析判断能力；<br>注重细节，具有较强的执行力和应变力；<br>具有相关口碑营销、主题营销、视频营销活动策划成功案例者优先；<br>面试时请携带相关成功案例。'
        },
          {
          name: '文案策划',
          jobResponsibilities: '教育培训类产品包装文案策划；<br> 广告创意策划及文案撰写；<br>协助团队共同完成相关推广计划的实施；<br>具有扎实的文字功底，能够独立完成品牌故事、广告文案、各类软文、产品宣传推广方案等各类宣传文案的策划和撰写；<br>具有良好的沟通能力、执行能力、协调能力和团队合作精神。',
          jobRequirements: '职位要求',
          Requirements: '广告、新闻媒体、中文等相关专业本科以上学历，3年以上文案撰稿工作经验（教育、广告和媒体行业经验者优先）；<br>有大型活动、网络营销成功案例者优先考虑；<br>热爱创意和写作，善于发现，并以独到的文笔加以描述、包装；<br>面试时请自带案例作品。'
        },
          {
          jobDerection: '内容中心',
          name: '后期制作（全职、兼职、实习生）',
          jobResponsibilities: '负责品牌及产品的影视宣传片的创意设计，制作包装；<br> 对于课程的内容呈现方式提出创意性提案，并负责课程视频的后期制作等工作，为用户提供良好的学习体验；<br>负责对外活动的现场拍摄，及后期剪辑、包装工作；<br>负责课程的精剪工作。<br>具有良好的沟通能力、执行能力、协调能力和团队合作精神。',
          jobRequirements: '职位要求',
          Requirements: '大专以上学历，1年或以上行业工作经验；<br>精通After Effects、Premiere等后期制作软件，了解后期各种软件协同工作的流程，熟练掌握音频软件、三维后期合成、跟踪软件、各类插件的使用<br>熟练操作PS、AI等辅助软件；<br>能够严谨的管理项目文件，擅长与团队协作；热爱动画，掌握动画原理，熟练使用各种动画技巧，能很好的把控动画整体节奏及运动规律；<br>具备良好的镜头感，能够与团队协同完成高质量的动画作品。<br>备注:带作品面试，待遇优厚具体看能力面谈！'
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
  .main
    flex 1
  .job
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
    .job-lists
      .job-list
        list-style none
        font-size 12px
        color #60686b
        line-height 31px
        margin-bottom 28
    .job-derection
      margin-top 28px
      font-size 20px
      padding 10px 0
      border-bottom 1px solid #eceff0
    .job-name
      font-size 14px
      margin 10px 0
      padding-left 14px
      color rgb(240,20,20)
    .job-jobRequirements
      font-size 14px
      margin-top 18px
      padding-left 40px
    .job-responsibilities
      font-size 12px
      line-height 24px
      padding-left 40px
    .resume
      margin-top 28px
      font-size 14px
      color rgb(240,20,20)
      text-align center
</style>
