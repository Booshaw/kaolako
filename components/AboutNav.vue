<template>
  <div class="about-wrapper">
    <ul class="about-box">
      <li>
        <nuxt-link to="/about/us">关于我们</nuxt-link>
      </li>
      <li>
        <nuxt-link to="/about/cooperate">企业合作</nuxt-link>
      </li>
      <li>
        <nuxt-link to="/about/job">人才招聘</nuxt-link>
      </li>
      <li>
        <nuxt-link to="/about/recruit">讲师招聘</nuxt-link>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
 
}
</script>
<style lang="stylus">
.about-wrapper
  padding 6px
  margin-top 32px
  .about-box
    li
      margin-bottom 16px
      font-size 13px
</style>
