 <template>
    <div class="insurance_detail_container">
	    <div class="mask" @click="closeMask"></div>
        <transition name="slide-up">
            <div class="insurance_wrap" v-if="faqType==1">
                <div class="detail_title">机票点进去预订，为什么票价会变？</div>
                <div class="detail_words">机票的供需关系、时间因素等均影响着机票的价格，在一分钟内都是有可能发生变化。尤其是活动的低价票，由于抢购的人较多，市场调整价格的速度跟不上页面的更新。导致用户看到的价格与实际需要支付的价格有些区别，所以建议您在下单后尽快支付。以免价格的变化。</div>
            </div>
            <div class="insurance_wrap" v-if="faqType==2">
                <div class="detail_title">为什么无法支付？</div>
                <div class="detail_words">系统因繁忙无法支付，您可以尝试重新下一单。为了防止恶意占座，如您一天内多次提交订单不支付，系统会自动限制您当天的购票资格。</div>
            </div>
            <div class="insurance_wrap" v-if="faqType==3">
                <div class="detail_title">如何办理登机？</div>
                <div class="detail_words">建议您提前2小时到机场，成人或儿童均需携带预订机票时的登记证件，到指定柜台办理登机。</div>
            </div>
            <div class="insurance_wrap" v-if="coupon!=null&&coupon!=''">
                <div class="detail_title cp">{{coupon.name}}</div>
                <div class="detail_words">有效期：{{coupon.endTime}}</div>
                <div class="detail_words">优惠券编号：{{coupon.code}}</div>
            </div>
        </transition>
        <div class="submit_button_container xy_flex">
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
    
    faqType: {
      type: String,
      default: ''
    },

    coupon: {
      type: Object,
      default: null
    },
    
  },
  methods: {
    close() {
      this.$emit("closeDetail");
    },
    closeMask() {
      this.$parent.showFaq = false;
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
  z-index: 12;
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
    .cp{
      line-height: 0.5rem;
      padding: .2rem 0.5rem;
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
