<template>
   <div class="j-slider-wrapper">
      <Carousel autoplay v-model="sliderStart" loop>
        <CarouselItem v-for="(item, index) in banner" :key="index" >
           <img class="img-responsive" :src="item.img" alt="">
        </CarouselItem>
    </Carousel>
   </div>
</template>
<script>
export default {
  props: {
    banner: {
      type: Array
    }
  },
  data() {
    return {
      sliderStart: 0
    }
  }
}
</script>
<style lang="stylus">
.j-slider-wrapper
  display block
  width 100%
  .img-responsive
    display block
    width 100%
    height 100%
    margin 0 auto
    text-align center
</style>