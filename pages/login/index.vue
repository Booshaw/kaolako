<template>
  <section class="container">
    <kaola-nav></kaola-nav>
    <div class="main">
      <div class="login-wrapper">
        <Form :label-width="60" ref="formInline">
          <FormItem label="用户名" prop="username">
            <i-input v-model="username" placeholder="用户名"></i-input>
          </FormItem>
          <FormItem label="密码" prop="password">
            <i-input v-model="password" placeholder="密码" type="password"></i-input>  
          </FormItem>
          <Button type="primary" size="large" @click.stop="login">登录</Button>
        </Form>
        <div>
          <ul class="text">
            <li>忘记密码</li>
            <li>马上注册</li>
          </ul>
          </div>
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
import { mapMutations } from 'vuex'
export default {
  data () {
      return {
        username: '',
        password: '',
        cookie: 'cookie',
        // ruleInline: {
        //   username: [
        //     { required: true, message: '请输入用户名', trigger: 'blur' }
        //   ],
        //   password: [
        //     { required: true, message: '请输入密码.', trigger: 'blur' },
        //     { type: 'string', min: 6, message: '密码不得少于6位', trigger: 'blur' }
        //   ]
        // }
      }
  },
  created() {
    this.$store.commit('login/login',this.cookie)    
  },
  methods: {
    login() {
      return Service.post('http://kaola.eaon.win:8080/kaola/login',
      {
        username: this.username,
        password: this.password
      })
      .then(res => {
        if(res.status === '200') {
          this.$Notice.info('操作成功')
          this.cookie = res.headers.Cookie
          console.log(res.headers)
          this.$store.commit('login/login',this.cookie)
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
    background #009a61 url('~static/about.png') no-repeat bottom
    .login-wrapper
      position absolute
      top 30%
      left 50%
      transform translate(-50%, -30%)
      width 45%
      // margin 48px auto
      // background #ffffff
      border-radius 8px
      box-shadow 0 2px 4px rgba(7,17,27,0.1)
      padding 32px
      text-align center
      color #ffffff
      .text
        margin-top 16px
        font-size 12px
        color #ffffff
        li
          display inline
          margin-left 1rem
  .ivu-form .ivu-form-item-label
    color #ffffff
  .ivu-input
    color #ffffff
    background transparent
</style>