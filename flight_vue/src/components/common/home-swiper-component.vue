<template>
  <swiper :options="swiperOption" ref="mySwiper">
    <!-- slides -->
    <swiper-slide v-for="(item, index) in imgUrl" :key="index">
      <a :href="item.url">
        <img :src="item.large_image" alt="">
      </a>
    </swiper-slide>
    <!-- Optional controls -->
    <div class="swiper-pagination"  slot="pagination"></div>
  </swiper>
</template>

<script>
import { getSwiperInfos } from "../../service/getData";
import { getBookingSource } from "../../config/mUtils";
import { mapActions, mapState } from "vuex";
import { lQuery } from "../../plugins/lQuery";
import { swiper, swiperSlide } from "vue-awesome-swiper";

export default {
  data() {
    return {
      imgUrl: "",
      swiperOption: {
        //以下配置不懂的，可以去swiper官网看api，链接http://www.swiper.com.cn/api/
        // notNextTick是一个组件自有属性，如果notNextTick设置为true，组件则不会通过NextTick来实例化swiper，也就意味着你可以在第一时间获取到swiper对象，<br>　　　　　　　　假如你需要刚加载遍使用获取swiper对象来做什么事，那么这个属性一定要是true
        // notNextTick: true,
        // swiper configs 所有的配置同swiper官方api配置
        autoplay: 3000,
        initialSlide: 0,
        autoplayDisableOnInteraction : false,
        direction: "horizontal",
        grabCursor: true,
        setWrapperSize: true,
        autoHeight: true,
        pagination: ".swiper-pagination",
        paginationClickable: true,
        mousewheelControl: true,
        observeParents: true,
        loop: false,
        // 如果自行设计了插件，那么插件的一些配置相关参数，也应该出现在这个对象中，如下debugger
        debugger: true
      }
    };
  },
  methods: {},
  created() {},
  mounted() {},
  components: { swiper, swiperSlide },
  activated() {
    //获取swiper信息
    if (this.$route.path.indexOf("home") != -1 || location.pathname=="/flight/businessTravel" || location.pathname=="/flight/businessTravelold") {
      getSwiperInfos().then(res => {
        if (+res.code === 1) {
          this.imgUrl = res.datas[0].infos;
        }
      });
    } else if (this.$route.path.indexOf("serviceDetail") != -1) {
      this.imgUrl = this.serviceDetail.productImgs;
      for (let i = 0; i < this.imgUrl.length; i++) {
        this.imgUrl[i].large_image =
          "//pics.lvjs.com.cn/pics/" + this.imgUrl[i].imgPath;
      }
    }
  },
  computed: {
    ...mapState(["serviceDetail"])
  }
};
</script>

<style  lang="scss" scoped>

</style>
