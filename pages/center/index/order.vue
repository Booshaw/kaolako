<template>
  <section class="c-container">
    <div class="c-content">
      <h2 class="title">发布预约 <span @click="checkAddOrder"><Icon type="plus-circled">添加预约</Icon></span> </h2>
      <Row>
        <i-col :lg="8" :md="12" :sm="24" :xs="24" v-for="(item, index) in order" :key="index">
          <div class="box">
            <ul>
              <li>
                <Icon type="person"></Icon> <span>{{item.teacher}}</span>
              </li>
              <li>
                <Icon type="pie-graph"></Icon> <span>{{item.category}}</span>
              </li>
              <li>
                <Icon type="ios-location"></Icon> <span>{{item.address}}</span>
              </li>              
              <li>
                <Icon type="ios-telephone"></Icon> <span>{{item.phone}}</span>
              </li>              
              <li>
                <Icon type="calendar"></Icon> <span>{{item.startDate | parseTime()}} <span>到</span>{{item.endDate | parseTime()}}</span>
              </li>              
              <li>
                <Icon type="speakerphone"></Icon> <span>{{item.description}}</span>
              </li>
            </ul>
            <div class="handle">
              <!-- <span><Icon type="edit" @click="changeOrder"></Icon></span> -->
              <span @click="deleteOrder(index)"><Icon type="android-delete"></Icon></span>
            </div>
          </div>
        </i-col>
      </Row>
    </div>
    <Modal
      v-model="addOrderModal"
      title="发布课程预约"
      @on-ok="addOrder"
      transfer>
      <Form :label-width="80">
        <FormItem label="姓名:">
          <i-input v-model="addOrderData.teacher"></i-input>
        </FormItem>
        <FormItem label="主讲科目:">
          <i-input v-model="addOrderData.category"></i-input>
        </FormItem>
        <FormItem label="地址:">
          <i-input v-model="addOrderData.address"></i-input>
        </FormItem>        
        <FormItem label="电话:">
          <i-input v-model="addOrderData.phone"></i-input>
        </FormItem>
        <FormItem label="约课时间:">
          <DatePicker v-model="addOrderData.startDate" placeholder="开始日期" style="width: 40%"></DatePicker>
          <DatePicker v-model="addOrderData.endDate" placeholder="结束日期" style="width: 40%"></DatePicker>
        </FormItem>
        <FormItem label="说明:">
          <span style="text-align:left">{{addOrderData.description.length}}/200</span>
          <i-input v-model="addOrderData.description" type="textarea" :autosize="{minRows: 2,maxRows: 5}" :maxlength="200"></i-input>
        </FormItem>
      </Form>
    </Modal>
  </section>
</template>
<script>
import Service from '~/plugins/axios'
import { getOrderList, uploadOrder, deleteOrder } from '~/api/api'
export default {
  data() {
    return {
      addOrderModal: false,
      defaultList: [],
      name: '', // 姓名
      idCard: '', // 身份证
      description: '', // 个人简介
      image: [], // 身份证照片
      order: [], // 预约信息
      addOrderData: {
        id: '',
        teacher: '',
        category: '',
        address: '',
        phone: '',
        startDate: '',
        endDate: '',
        description: ''
      } // 添加预约课程信息
    }
  },
  created() {
    this._getList()
  },
  methods: {
    _getList() {
      getOrderList().then(res => {
        if (res.code === '200') {
          this.order = res.data
        }
      })
    },
    checkAddOrder() {
      if (this.order.length < 3) {
        this.addOrderModal = !this.addOrderModal
        let obj = Object.assign(this.addOrderData)
      } else {
        this.$Notice.error({
          title: '最多只能发布三个预约信息',
          desc: false
        })
      }
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
    addOrder() {
      let obj = Object.assign(this.addOrderData)      
      let params = this.order.length < 3 ? obj : {}
      uploadOrder(params).then(res => {
        if (res.code === '200') {
          this.$Notice.info({
            title: res.message,
            desc: false
          })
          this._getList()
          this.addOrderModal = false
        } else {
          this.$Notice.error({
            title: res.message,
            desc: false
          })
        }
      })
    },
    deleteOrder(index) {
      this.$set(this.order[index], 'delete', 1)
      let params = this.order[index]
      deleteOrder(params).then(res => {
        if (res.code === '200') {
          this._getList()
          this.$Notice.info({
            title: res.message,
            desc: false
          })
        }
      })
    }
  },
  filters: {
    parseTime(time, cFormat) {
      if (arguments.length === 0) {
        return null
      }
      if (typeof time === 'string') {
        return time.slice(0, 10)
      }
      const format = cFormat || '{y}-{m}-{d}'
      let date
      if (typeof time === 'object') {
        date = time
      } else {
        if (('' + time).length === 10) time = parseInt(time) * 1000
        date = new Date(time)
      }
      const formatObj = {
        y: date.getFullYear(),
        m: date.getMonth() + 1,
        d: date.getDate(),
        h: date.getHours(),
        i: date.getMinutes(),
        s: date.getSeconds(),
        a: date.getDay()
      }
      const timeStr = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
        let value = formatObj[key]
        if (key === 'a')
          return ['一', '二', '三', '四', '五', '六', '日'][value - 1]
        if (result.length > 0 && value < 10) {
          value = '0' + value
        }
        return value || 0
      })
      return timeStr
    }
  },
  components: {}
}
</script>
<style lang="stylus">
.c-container
  position relative
  height 100%
  width 100%
  background-color #f8f8f9
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
      span
        cursor pointer
        color #2d8cf0
    .box
      margin 16px
      // background #80818f
      box-shadow 0 2px 4px rgba(7, 17, 27, 0.5)
      text-align left
      color #80848f
      padding 16px
      border-radius 8px
      font-size 14px
      li
        margin-bottom 16px
        border-bottom 1px solid #e9eaec
        padding 8px
        span
          margin 0 8px
      .handle
        text-align right
        color #ed3f14
        span
          margin 0 8px
          cursor pointer
  .no-result
    position absolute
    top 30%
    left 50%
    width 100%
    transform translate(-50%, -50%)
</style>