<template>
  <div class="p-wrapper">
    <kaola-nav></kaola-nav>
    <div class="main">
      <div class="bg">
        <h2>发布手记</h2>
      </div>
      <div class="container" v-if="tagList && tagList.length">
        <div class="title">
          <span>标题</span>
          <i-input v-model="title" placeholder="请输入标题"></i-input>
        </div>
        <div class="title">
          <span>正文</span>
          <div class="quill-editor"
            :content="content"
            @change="onEditorChange($event)"
            @blur="onEditorBlur($event)"
            @focus="onEditorFocus($event)"
            @ready="onEditorReady($event)"
            v-quill:myQuillEditor="editorOption">
          </div>
        </div>
        <div class="title">
          <span>分类</span>
          <ul>
            <li v-for="(item, index) in categoryList" :key="index" @click="selectCategory(item)" :class="{selectTagClass: item.id === categoryCurrent}">{{item.name}}</li>
          </ul>
        </div>
        <div class="title">
          <span>标签</span> <span>{{tagCurrent.length}}/3(最多选三个)</span>
          <ul>
            <li v-for="(item, index) in tagList" :key="index" @click="selectTagGrou(item)" :class="{selectTagClass: (tagCurrent.indexOf(item.id))!== -1}">{{item.name}}</li>
          </ul>
        </div>
        <div class="title">
          <span>文章封面</span>
          <Upload
            :with-credentials="true"
            :show-upload-list="false"
            :default-file-list="defaultList"
            :on-success="handleSuccess"
            :max-size="20480"
            :on-error="handleError"
            :on-format-error="handleFormatError"
            :on-exceeded-size="handleMaxSize"
            :before-upload="handleBeforeUpload"
            action="http://api.kaolako.com/kaola/common/file/upload">
            <div class="logo-img">
              <img height="400" width="220" :src="thumbnailUrl" alt="手记缩略图" v-if="thumbnailUrl">
              <div v-else>上传手记封面图</div>
              <div class="upload-list-cover">
                <Icon type="camera"></Icon>
                <!-- <span type="ios-trash-outline" @click.native="uploadLogo()">上传Logo</span> -->
              </div>
            </div>
          </Upload>
        </div>
        <div>
          <Button type="error" :loading="loading" @click="updateArticleDetail">
            <span v-if="!loading">发布手记</span>
            <span v-else>Loading...</span>
          </Button>
        </div>
      </div>
    </div>
    <kaola-foo></kaola-foo>
  </div>
</template>
<script>
import KaolaNav from '~/components/KaolaNav.vue'
import KaolaFoo from '~/components/KaolaFoo.vue'
import { getCategoryTag, uploadArticle } from '~/api/api'
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      title: '', // 文章标题
      tagList: [], // 标签列表
      categoryList: [], // 分类列表
      tagCurrent: [], // 选中标签列表
      loading: false, // 发布手记加载中
      thumbnail: '', // 缩略图id
      thumbnailUrl: '', // 缩略图url
      categoryCurrent: 0,
      defaultList: [],
      content: '<p>I am Example</p>',
      editorOption: {
        // some quill options
        modules: {
          toolbar: [
            ['bold', 'italic', 'underline', 'strike'],
            ['blockquote', 'code-block'],
            [{ header: 1 }, { header: 2 }],
            [{ list: 'ordered' }, { list: 'bullet' }],
            [{ script: 'sub' }, { script: 'super' }],
            [{ indent: '-1' }, { indent: '+1' }],
            [{ direction: 'rtl' }],
            [{ size: ['small', false, 'large', 'huge'] }],
            [{ header: [1, 2, 3, 4, 5, 6, false] }],
            [{ font: [] }],
            [{ color: [] }, { background: [] }],
            [{ align: [] }],
            ['clean'],
            ['link', 'image', 'video']
          ]
          // history: {
          //   delay: 1000,
          //   maxStack: 50,
          //   userOnly: false
          // },
          // imageDrop: true,
          // imageResize: {
          //   displayStyles: {
          //     backgroundColor: 'black',
          //     border: 'none',
          //     color: 'white'
          //   },
          //   modules: [ 'Resize', 'DisplaySize', 'Toolbar' ]
          // }
        }
      }
    }
  },
  created() {
    this._getCategoryTag() // 获取文章标签列表
    console.log(this.cookie)
  },
  computed: {
    // selectTag(item) {
    //   let isSelect = false
    //   this.tagCurrent.forEach((value) => {
    //     if (value === item.id) {
    //       isSelect = true
    //     }
    //   })
    //   return {
    //     selectTagClass: true
    //   }
    // }
    ...mapGetters({
      cookie: 'cookie'
    })
  },
  methods: {
    _getCategoryTag() {
      let params = {
        dictType: ['articleCategory', 'articleTag']
      }
      getCategoryTag(params).then(res => {
        if ((res.code = '200')) {
          this.categoryList = res.data.articleCategory.slice(1)
          this.tagList = res.data.articleTag.slice(1)
        }
      })
    },
    selectTagGrou(item) {
      let index = this.tagCurrent.indexOf(item.id)
      if (index === -1) {
        this.tagCurrent.push(item.id)
      } else {
        this.tagCurrent.splice(index, 1)
      }
      this.tagCurrent = Object.assign(this.tagCurrent.slice(0, 3))
      console.log(this.tagCurrent)
    },
    updateArticleDetail() {
      this.loading = true
      let params = {
        title: this.title,
        thumbnail: this.thumbnail,
        category: this.categoryCurrent,
        tag: this.tagCurrent,
        content: this.content
      }
      uploadArticle(params).then(res => {
        console.log(res)
        if (res.code === '200') {
          this.loading = false
          this.$Notice.info({
            title: '操作成功',
            desc: false
          })
        } else if (res.code === '403') {
          this.$router.replace({
            path: '/login',
            query: { redirect: this.$router.currentRoute.fullPath }
          })
        }
      })
    },
    selectCategory(item) {
      this.categoryCurrent = item.id
      // console.log(item)
    },
    onEditorBlur(editor) {
      // console.log('editor blur!', editor)
    },
    onEditorFocus(editor) {
      // console.log('editor focus!', editor)
    },
    onEditorReady(editor) {
      // console.log('editor ready!', editor)
    },
    onEditorChange({ editor, html, text }) {
      // console.log('editor change!', editor, html, text)
      this.content = html
    },

    // 文件上传
    handleBeforeUpload() {
      // 上传前钩子
    },
    handleFormatError() {
      // 格式化检查钩子
    },
    handleMaxSize(file) {
      this.$Notice.warning({
        title: '文件超出限制大小',
        desc: '文件  ' + file.name + '不能超过20M.'
      })
    },
    handleSuccess(res, file) {
      // 文件上传成功钩子
      if (res.code === '200') {
        this.$Notice.success({
          title: '缩略图上传',
          desc: false,
          duration: 3
        })
        this.thumbnailUrl = res.data.url
        this.thumbnail = res.data.id
      } else {
        this.$Notice.error({
          title: '上传失败',
          desc: `${res.message}`,
          duration: 5
        })
      }
    },
    handleError(res, file) {
      this.$Notice.error({
        title: '上传失败',
        desc: `${res.message}`,
        duration: 5
      })
    }
  },
  components: {
    KaolaNav,
    KaolaFoo
  }
}
</script>
<style lang="stylus">
.p-wrapper
  position relative
  display flex
  flex-direction column
  margin-top 32px
  background-color #f8fafc
  .main
    flex 1
    margin 32px auto
    .bg
      height 120px
      width 100%
      // background-color #5FC3E4
      // background-image linear-gradient(160deg, #E55D87, #5FC3E4)
      h2
        display inline-block
        font-size 24px
        color #07111B
        margin-top 16px
        font-weight 700
        padding 16px 0 32px
        text-align center
    .container
      width 80%
      margin 0 auto
      background #ffffff
      box-shadow 0 8px 16px 0 rgba(7, 17, 27, 0.05)
      padding 32px
      border-radius 8px
      @media screen and (max-width: 440px)
        width 100%
      .title
        position relative
        margin 16px 0 32px
        text-align left
        span
          font-size 14px
          line-height 28px
          color #002500
          margin-right 8px
        li
          display inline-block
          margin 8px 8px 0 0
          background rgba(7, 17, 27, 0.05)
          color #4D555D
          padding 0 12px
          height 24px
          line-height 24px
          cursor pointer
          border-radius 12px
          &:hover
            background rgba(7, 17, 27, 0.1)
            color #07111b
        .selectTagClass
          color #ffffff
          background #93999F
          &:hover
            color #ffffff
            background #93999F
        .logo-img
          position relative
          display inline-block
          width 400px
          height 220px
          text-align center
          line-height 120px
          border 1px solid transparent
          // border-radius 50%
          overflow hidden
          background #f8f8f9
          box-shadow 0 1px 1px rgba(0, 0, 0, 0.2)
          cursor pointer
          img
            width 100%
            height 100%
          &:hover
            .upload-list-cover
              display block
          .upload-list-cover
            display none
            position absolute
            color #ffffff
            font-size 2rem
            top 0
            bottom 0
            left 0
            right 0
            background rgba(0, 0, 0, 0.6)
      .quill-editor
        min-height 200px
        max-height 400px
        overflow-y auto
</style>