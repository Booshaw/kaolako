<template>
  <section class="c-container">
    <div class="c-content">
      <h2 class="title">认证须知</h2>
      <div class="identify-box">
        <Button type="error" size="large" @click="identifyModel = !identifyModel">开始认证</Button>
      </div>
      <ul>
        <li>1、实名认证可以提升你在尚课的个人信息安全等级,同事能更好的体验尚课的各项服务</li>
        <li>2、我们将在你提交身份认证后的7个工作日内完成审核,审核结果将以短信形式通知你</li>
        <li>3、实名认证后将无法修改和删除,请谨慎填写</li>
        <li>4、你需要准备手持身份证正面的照片,请确保照片清晰可见,严禁PS</li>
        <li>5、实名认证可以提升你在尚课的个人信息安全等级,同事能更好的体验尚课的各项服务</li>
        <li>6、我们会确保你提供的信息处于严格保密状态,不会被泄露</li>
        <li>7、如存在恶意乱填信息者,将永久冻结账号</li>
      </ul>
    </div>
    <Modal
      v-model="identifyModel"
      title="身份认证"
      @on-ok="uploadInformation"
      transfer>
      <Form :label-width="80">
        <FormItem label="认证类型">
          <i-select :model.sync="type" size="small">
            <i-option value= 2>老师认证</i-option>
            <i-option value= 1>用户认证</i-option>
          </i-select>
        </FormItem>
        <FormItem label="姓名:">
          <i-input v-model="realname"></i-input>
        </FormItem>
        <FormItem label="身份证号码:">
          <i-input v-model="idCard"></i-input>
        </FormItem>
        <FormItem label="主讲科目:">
          <i-input v-model="speciality"></i-input>
        </FormItem>
        <FormItem label="个人简介:">
          <i-input v-model="description" type="textarea" :autosize="{minRows: 2,maxRows: 5}" :maxlength="200"></i-input>
        </FormItem>
      </Form>
      <Upload
            :with-credentials="true"
            :show-upload-list="true"
            :default-file-list="defaultList"
            :on-success="handleSuccess"
            :max-size="20480"
            :on-error="handleError"
            :on-format-error="handleFormatError"
            :on-exceeded-size="handleMaxSize"
            :before-upload="handleBeforeUpload"
            action="http://api.kaolako.com/kaola/common/file/upload">
            <div style="padding: 20px 0">
                <Icon type="ios-cloud-upload" size="52" style="color: #3399ff;cursor:pointer;"></Icon>
                <p>请上传手持身份证照片,确保所有信息清晰可见</p>
            </div>
          </Upload>
    </Modal>
    <div class="no-result" v-if="noResult">
      <p>暂无任何动态</p>
    </div>
  </section>
</template>
<script>
import {uploadIdentification} from '~/api/api'
export default {
  data () {
    return {
      personalInfo: {},
      noResult: false,
      identifyModel: false,
      defaultList: [],
      type: 2, // 认证类型
      realname: '', // 姓名
      idCard: '', // 身份证
      speciality: '', // 主讲科目
      description: '', // 个人简介
      image: [], // 身份证照片
    }
  },
  created() {
  },
  methods: {
    // 文件上传
    handleBeforeUpload() { // 上传前钩子
    },
    handleFormatError() { // 格式化检查钩子
    },
    handleMaxSize(file) {
      this.$Notice.warning({
        title: '文件超出限制大小',
        desc: '文件  ' + file.name + '不能超过20M.'
      })
    },
    handleSuccess(res, file) { // 文件上传成功钩子
      if (res.code === '200') {
        this.image.push(res.data.id)
        console.log(this.image)        
        this.$Notice.success({
          title: '操作提示',
          desc: '上传成功',
          duration: 5
        })
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
    },
    uploadInformation() {
      let params = {
        type: this.type,
        realName: this.realname,
        image: this.image,
        idCard: this.idCard,
        introduction: this.introduction,
        speciality: this.speciality
      }
      uploadIdentification(params).then(res => {
        if(res.code === '200') {
          this.$Notice.info({
            thitle: res.message,
            desc: false
          })
        } else {
          this.$Notice.error({
            title: res.message,
            desc: false
          })
        }
      })
    }
  },
  components: {
  }
}
</script>
<style lang="stylus">
.c-container
  position relative
  height 100%
  width 100%
  padding 16px
  .c-content
    width 60%
    margin 0 auto
    @media screen and (max-width: 440px)
      width 100%
    .title
      font-size 14px
      color #80848f
      text-align left
      padding 16px
      border-bottom 1px solid #eeeeee
    .identify-box
      margin 32px
    li
      text-align left
      font-size 14px
      color #80848f
      line-height 28px
  .no-result
    position absolute
    top 30%
    left 50%
    width 100%
    transform translate(-50%, -50%)
</style>