 <template>
    <div class="insurance_detail_container" v-show="insuranceSlideUp">
	    <div class="mask" v-show="insuranceSlideUp" @click="closeMask"></div>
        <transition name="slide-up">
            <div class="insurance_wrap" v-show="insuranceSlideUp && isShowInsuranceDetail" v-if="detailInfo.insuranceClass != undefined">
                <div class="detail_title">{{detailInfo.insuranceClass.name}}</div>
                <div class="detail_words" v-html="detailInfo.insuranceClass.desc"></div>
            </div>
        </transition>
        <div class="submit_button_container xy_flex" v-show="insuranceSlideUp">
            <div class="submit_button xy_flex" @click="close">确定</div>
        </div>
    </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  mounted() {},
  props: {
    insuranceSlideUp: {
      type: Boolean,
      default: false
    },
    detailInfo: {
      type: Object,
      default: {}
    },
    isShowInsuranceDetail: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    close() {
      this.$emit("closeDetail");
    },
    closeMask() {
      this.$parent.showInsurance = false;
      this.$parent.showInsuranceDetail = false;
    //   setTimeout(() => {
    //     this.$parent.showInsuranceDetail = false;
    //   }, 200);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../style/mixin";
.insurance_detail_container {
  @include wh(100%,100%);
  position: absolute;
  top: 0;
  left: 0;
  .insurance_wrap {
    @include wh(100%,80%);
    background: #fff;
    position: absolute;
    left: 0;
    bottom: 0;
    z-index: 3;
    border-top-left-radius: 0.2rem;
    border-top-right-radius: 0.2rem;
    padding: 0 0.3rem;
    padding-top: 0.3rem;
    padding-bottom: 1.6rem;
    box-sizing: border-box;
    border-bottom: 1px solid #efefef;
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
    .detail_title {
      @include sc(0.32rem,#333);
      margin-bottom: 0.2rem;
      text-align: center;
      line-height: 0.32rem;
      padding: .2rem 0;
    }
    .detail_words {
      @include sc(0.24rem,#666);
      line-height: 0.4rem;
    }
  }
  .submit_button_container {
    @include wh(100%,1.6rem);
    position: absolute;
    left: 0;
    bottom: 0;
    z-index: 5;
    background: linear-gradient(
      -180deg,
      rgba(255, 255, 255, 0) 0%,
      #ffffff 50%
    );
    .submit_button {
      @include wh(94.7%,1rem);
      @include sc(0.36rem,#FFF);
      @include borderRadius(0.5rem);
      background: linear-gradient(-90deg, #fd3c71 0%, #fe686c 100%);
    }
  }
}
</style>
