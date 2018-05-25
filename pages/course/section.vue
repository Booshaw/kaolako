<template>
  <section class="s-container">
    <!-- <kaola-nav></kaola-nav> -->
    <div class="s-header">
      <div class="box">
        <span @click.stop="backSection" class="back"><Icon type="chevron-left"></Icon></span>
        <h1 class="s-title">{{title}}</h1>
        <Button type="ghost" size="small" shape="circle" class="next-bt" @click.stop="toNextVideo">下一小节</Button>
      </div>
    </div>
    <div class="main">
      <div class="video-player-box"
        :playsinline="playsinline"
        @play="onPlayerPlay($event)"
        @pause="onPlayerPause($event)"
        @ended="onPlayerEnded($event)"
        @loadeddata="onPlayerLoadeddata($event)"
        @waiting="onPlayerWaiting($event)"
        @playing="onPlayerPlaying($event)"
        @timeupdate="onPlayerTimeupdate($event)"
        @canplay="onPlayerCanplay($event)"
        @canplaythrough="onPlayerCanplaythrough($event)"
        @ready="playerReadied"
        @statechanged="playerStateChanged($event)"
        v-video-player:myVideoPlayer="playerOptions">
      </div>
      <div class="recommand">
        <Tabs>
          <TabPane label="评论">
            <div class="chapter">
            </div>
          </TabPane>
        </Tabs>
      </div>
    </div>
    <kaola-foo></kaola-foo>
  </section>
</template>
<script>
// import KaolaNav from '~/components/KaolaNav.vue'
import KaolaFoo from '~/components/KaolaFoo.vue'
import Service from '~/plugins/axios'
  export default {
    data () {
      return {
        // component options
        playsinline: true,
        
        // videojs options
        playerOptions: {
          muted: false,
          fluid: true,
          aspectRatio: '16:9',
          language: 'zh-CH',
          playbackRates: [0.7, 1.0, 1.5, 2.0],
          sources: [
            // {
            //   // type: 'video/mp4',
            //   src: 'http://1256488328.vod2.myqcloud.com/153f9c6evodgzp1256488328/36d06aab7447398156195013724/3apDn9gajpMA.mp4'
            // }
          ], // 播放视频资源
          // poster: "./static/videoBG.jpeg",
          controlBar: {
          timeDivider: true,
          durationDisplay: true,
          remainingTimeDisplay: false,
          fullscreenToggle: true  //全屏按钮
        }
        },
        // 播放下一小节
        nextVideoId: '', // 下一小节videoId
        title: '', // 标题
        nextBox: false
      }
    },  
    // asyncData () {
    //   return Service.post(`http://api.kaolako.com/kaola/web/course/detail`)
    //   .then((res) => {
    //     return {
    //       // playerOptions: res.data.data.sectionVideo.playerOptions,
    //       sectionInformation: res.data.data.sectionVideo.information}
    //   })
    // },
    created() {
      this._getVideoDetail()
    },
    methods: {
      _getVideoDetail() {
      return Service.post(
        `http://api.kaolako.com/kaola/web/course/episode`,
        {
          id: 1
        }
      ).then(res => {
        console.log(res)
        if (res.data.code === '200') {
          this.title = res.data.data.title
          this.playerOptions.sources = res.data.data.playSet
        } else {
          this.$Notice.error({
            title: res.data.message
          })
        }
      })
    },
      backSection() {
        this.$router.back(-1)
      },
      // _initWidth() {
      //   this.playerOptions.width = document.documentElement.clientWidth
      //   console.log(this.playerOptions.width)
      // },
      // listen event
      onPlayerPlay(player) {
        // console.log('player play!', player)
        this.nextBox = false
      },
      onPlayerPause(player) {
        // console.log('player pause!', player)
      },
      onPlayerEnded(player) {
        // console.log('player ended!', player)
        this.nextBox = true
      },
      onPlayerLoadeddata(player) {
        // console.log('player Loadeddata!', player)
      },
      onPlayerWaiting(player) {
        // console.log('player Waiting!', player)
      },
      onPlayerPlaying(player) {
        // console.log('player Playing!', player)
      },
      onPlayerTimeupdate(player) {
        // console.log('player Timeupdate!', player.currentTime())
      },
      onPlayerCanplay(player) {
        // console.log('player Canplay!', player)
      },
      onPlayerCanplaythrough(player) {
        // console.log('player Canplaythrough!', player)
      },
      // or listen state event
      playerStateChanged(playerCurrentState) {
        // console.log('player current update state', playerCurrentState)
      },
      // player is ready
      playerReadied(player) {
        // console.log('example 01: the player is readied', player)
      },
      toNextVideo() {
        this.$router.push({
          path: '/',
          id: this.nextVideoId
        })
      }
    },
    components: {
      // KaolaNav,
      KaolaFoo
    }
  }
</script>

<style lang="stylus">
  .s-container
    position relative
    width 100%
    display flex
    flex-direction column
    .s-header
      position absolute
      width 100%
      background-color #14191e
      text-align left
      z-index 999
      opacity 0.2
      &:hover
        opacity 1
      .box
        width 80%
        margin 0 auto
        padding 0 16px
        font-size 12px
        color #ffffff
        overflow hidden
        @media screen and (max-width: 440px)
          width 100%
        .back
          padding 8px
          display inline-block
          cursor pointer
        .s-title
          display inline-block
          font-size 14px
          margin-left 16px
          span
            margin 0 8px
            color #787d82
            font-size 12px
        .next-bt
          color #ffffff
          margin 0 0 0 50px
    .main
      flex 1
      .video-player-box
        position relative
      .video-js .vjs-big-play-button
        position absolute
        top 50%
        left 50%
        transform translate(-50%, -50%)
      .recommand
        width 80%
        margin 32px auto
</style>