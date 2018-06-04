<template>
  <section class="l-container">
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
          <a class="wechat-login" href="https://open.weixin.qq.com/connect/qrconnect?appid=wx0f96c2fcb159e3f7&redirect_uri=http://api.kaolako.com/kaola/weixin/login/callback&response_type=code&scope=snsapi_login&state=ToyNBdMpCa#wechat_redirect">微信登录</a>
          <!-- <Button type="info" size="large" @click.stop="wechatHandleClick" style="margin-left:10px">微信登录</Button> -->
        </Form>
        <div>
          <ul class="text">
            <li>忘记密码</li>
            <li class="wechat-login-a"> <a href="https://open.weixin.qq.com/connect/qrconnect?appid=wx0f96c2fcb159e3f7&redirect_uri=http://api.kaolako.com/kaola/weixin/login/callback&response_type=code&scope=snsapi_login&state=ToyNBdMpCa#wechat_redirect">注册暂未开放,点击微信登录</a> </li>
          </ul>
          </div>
      </div>
    </div>
    <kaola-foo></kaola-foo>
  </section>
</template>
<script>
// import AppLogo from '~/components/AppLogo.vue'
import KaolaNav from '~/components/KaolaNav.vue'
import KaolaFoo from '~/components/KaolaFoo.vue'
import Service from '~/plugins/axios'
import { mapMutations } from 'vuex'
export default {
  data () {
      return {
        username: '',
        password: '',
        cookie: 'cooki',
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
  mounted() {
    this.$store.commit('setCookie', this.cookie)
    // console.log(this.cookie)
  },
  methods: {
    login() {
      return Service.post('http://kaola.eaon.win:8080/kaola/login',
      {
        username: this.username,
        password: this.password
      })
      .then(res => {
        if(res.data.code === '200') {
          // this.$Notice.info('操作成功')
          this.$store.commit('login')
          // this.cookie = res.headers.Cookie
          this.$router.push({
            path: '/center'
          })
          // console.log(`${res.data}res的headers`)
          // this.$store.commit('login/sigin',this.cookie)
        }
      })
    },
    wechatHandleClick() {
    },
  },
  computed: {

  },
  components: {
    KaolaNav,
    KaolaFoo
  }
}
</script>
<style lang="stylus">
.l-container
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
      width 30%
      // margin 48px auto
      // background #ffffff
      border-radius 8px
      box-shadow 0 2px 4px rgba(7,17,27,0.1)
      padding 32px
      text-align center
      color #ffffff
      .wechat-login
        display inline-block
        margin 0 16px
        padding 8px 12px
        background-color #0fcd1d
        border-radius 4px
        color #ffffff
      .text
        margin-top 16px
        font-size 12px
        color #ffffff
        li
          display inline
          margin-left 1rem
        .wechat-login-a
          a
            color #ffffff
  .ivu-form .ivu-form-item-label
    color #ffffff
  .ivu-input
    color #ffffff
    background transparent
</style>