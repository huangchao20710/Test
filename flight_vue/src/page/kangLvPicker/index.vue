 <template>
	<div class="insurance_list_container">
        <head-top :depart="title"></head-top>
        <div class="insurance_list_wrap">
          <div class="card_container">
          <div class="card_backGround"></div>
          <div class="card_wrap">
            <div>驴行家卡包</div>
            <div class="card_price_container"><span>&#165;</span><span>{{totalPrice}}</span><span>&#165;{{totalPrice*2.5}}</span></div>
          </div>
        </div>
          <ul class="insurance_kind_container" v-for="(insuranceKind,index) in allInsuranceInfo" :key="index">
              <li class="insurance_kind_title">安全专属{{index | kangLvInsuranceNameFilter}}: {{insuranceKind.title}}</li>
              <li class="insurance_item_container y_flex between_x_flex" v-for="(insuranceItem,insuranceIndex) in insuranceKind.list" :key="insuranceIndex">
                  <div class="y_flex">
                      <p>{{insuranceItem.insuranceClass.name}}<span>-</span>{{insuranceItem.insuranceRemark}}<span class="insurance_ask" @click="showDetail(insuranceItem,'insurance')"></span></p>
                  </div>
                  <div class="y_flex right_flex" @click="chooseInsurance(insuranceItem,insuranceIndex,index)">
                      <div class="single_picker_container">
                            <span class="single_picker" :class="{'single_picked': insuranceItem.picked}"></span>
                      </div>
                      <p v-if="!isDouble && insuranceItem.insurancePrice != 0"><span>&#165;{{insuranceItem.insurancePrice}}</span>/份 ×{{selectedPersons.length > 0? selectedPersons.length: 1}}</p>
                      <p v-if="isDouble && insuranceItem.insurancePrice != 0"><span>&#165;{{insuranceItem.insurancePrice}}</span>/份 ×{{selectedPersons.length*2 > 0? selectedPersons.length*2: 2}}</p>
                      <p v-if="insuranceItem.insurancePrice == 0">免费赠</p>
                  </div>
              </li>
          </ul>
          <ul class="insurance_kind_container">
              <li class="insurance_kind_title">特惠专享</li>
              <li class="insurance_item_container y_flex between_x_flex" v-for="(item,index) in worthCoupons" :key="index">
                  <div class="y_flex">
                      <p>{{item.productName}}<span>-</span>{{item.productDesc}}<span class="insurance_ask" @click="showDetail(item,'worthCoupon')"></span></p>
                  </div>
                  <div class="y_flex right_flex" @click="chooseCoupon(item,index)">
                        <div class="single_picker_container">
                              <span class="single_picker" :class="{'single_picked': item.picked}"></span>
                        </div>
                      <p v-if="item.saleChannelPrices[0].channelSalePrice != 0"><span>&#165;{{item.saleChannelPrices[0].channelSalePrice}}</span>/份 ×1</p>
                      <p v-if="item.saleChannelPrices[0].channelSalePrice == 0">免费赠</p>
                  </div>
              </li>
          </ul>
        </div>
        <div class="insurance_detail_container" v-show="isShowDetail && detailType != ''">
            <div v-if="detailType == 'insurance'" class="insurance_title">{{insuranceDetail.insuranceTypeName}}</div>
            <div v-if="detailType == 'worthCoupon'" class="insurance_title">{{insuranceDetail.productName}}</div>
            <div v-if="detailType == 'insurance'" class="insurance_introduction" v-html="insuranceDetail.insuranceDesc"></div>
            <div v-if="detailType == 'worthCoupon'" class="coupon_list_title">规则说明</div>
            <div v-if="detailType == 'worthCoupon'" class="insurance_introduction" v-html="insuranceDetail.serviceContent"></div>
            <div v-if="detailType == 'worthCoupon'" class="coupon_list_title">退改说明</div>
            <div v-if="detailType == 'worthCoupon'" class="insurance_introduction" v-html="insuranceDetail.tgqRule"></div>
            <p v-if="detailType == 'insurance' && insuranceDetail.insuranceFile!=null && insuranceDetail.insuranceFile!='' && insuranceDetail.insuranceUrl!=null && insuranceDetail.insuranceUrl!=''" @click="toinsurance">详情请查看<em style="color:#4997e7">{{insuranceDetail.insuranceFile}}</em></p>
            <div class="close_detail xy_flex">
                <img src="//m.lvmama.com/flight/image/bigX.png" alt="" @click="closeDetail">
            </div>
        </div>
        <div class="submit_button_container xy_flex" v-show="!isShowDetail">
            <div class="submit_button xy_flex" @click="submitInsurance">确定</div>
        </div>
        <alert-tip v-if="showMessage" :tipContent="message" :leftButton="leftButton" :rightButton="rightButton" @closeAlert="closeAlert" @rightHandler="rightHandler" ></alert-tip>
	</div>
</template>

<script>
import headTop from "../../components/header/head";
import alertTip from "../../components/common/alertTip";
import { mapActions, mapState } from "vuex";
import { setStore, getStore } from "../../config/mUtils";
export default {
  data() {
    return {
      title: "康旅卡用户专享",
      insuranceDetailObj: {}, //保险详情
      showInsuranceDetail: false, //是否展示保险详情
      showInsurance: false,
      isShowDetail: false,
      insuranceDetail: "", //保险说明
      detailType: "", //详情类型
      totalPrice: 0, //总价
      worthCoupons: [],
      showMessage: false,
      message: '康驴卡驴行家专属，不能取消，可任选其一',//
      leftButton: '',//
      rightButton: '',//
    };
  },
  props: [],
  computed: {},
  components: {
    headTop,
    alertTip
  },
  created() {},
  activated() {
    this.worthCoupons = JSON.parse(getStore('worthCoupons'));
    this.countPrice();
  },
  mounted() {},
  methods: {
    ...mapActions(["initData"]),
    //选择保险
    chooseInsurance(insuranceItem, insuranceIndex, arrIndex) {
      if (insuranceItem.picked) {
            this.showMessage = true;
            setTimeout(() => {
              this.showMessage = false;
            }, 2000);
            return;
      } else {
            this.allInsuranceInfo[arrIndex].list.map((item, index) => {
              item.picked = false;
            });
            insuranceItem.picked = true;
            this.allInsuranceInfo[arrIndex].list.splice(
              insuranceIndex,
              1,
              insuranceItem
            );
            this.countPrice();
      }
    },
    closeAlert() {
      // this.showMessage = false;
    },
    rightHandler() {},
    //选择优惠券
    chooseCoupon(coupon, couponIndex) {
      if (coupon.picked) {
            let findAmount = 0;
            this.worthCoupons.map((item, index) => {
              if (item.picked) {
                    findAmount += 1;
              }
            });
            if (findAmount <= 1) {
                  this.showMessage = true;
                  setTimeout(() => {
                    this.showMessage = false;
                  }, 2000);
                  return;
            } else {
                  coupon.picked = false;
                  this.worthCoupons.splice(couponIndex, 1, coupon);
            }
      } else {
            coupon.picked = true;
            this.worthCoupons.splice(couponIndex, 1, coupon);
      }
      this.countPrice();
    },
    //确定保险
    submitInsurance() {
      let insuranceObj = {
        key: "insuranceListInfo",
        val: this.allInsuranceInfo
      };
      try {
        this.initData(insuranceObj);
      } catch (error) {}
      setStore('worthCoupons',JSON.stringify(this.worthCoupons));
      this.$router.go(-1);
    },
    //展示保险详情
    showDetail(item, type) {
      this.detailType = type;
      this.insuranceDetail = item;
      this.isShowDetail = true;
    },
    closeDetail() {
      this.isShowDetail = false;
    },
    //计算价格
    countPrice() {
      this.totalPrice = 0;
      this.allInsuranceInfo.map((kindItem, kindIndex) => {
        kindItem.list.map((insuranceItem, insuranceIndex) => {
          if (insuranceItem.picked) {
            this.totalPrice += +insuranceItem.insurancePrice;
          }
        });
      });
      if (this.isDouble) {
            this.totalPrice = this.totalPrice * (this.selectedPersons.length*2 > 0 ?this.selectedPersons.length*2 : 2);
      } else {
            this.totalPrice = this.totalPrice * (this.selectedPersons.length > 0 ?this.selectedPersons.length : 1);
      }
      this.worthCoupons.map((item, index) => {
        if (item.picked) {
          this.totalPrice += +item.saleChannelPrices[0].channelSalePrice;
        }
      });
    },
    //查看保险文件
    toinsurance() {
      let that = this;
      if (
        navigator.userAgent.indexOf("Mobile") > 0 &&
        (navigator.userAgent.indexOf("iPhone OS") > 0 ||
          navigator.userAgent.indexOf("iPad") > 0) &&
        navigator.userAgent.indexOf("LVMM") > 0
      ) {
        NativeUtil.lvCommon("lvJSGoClass", {
          className: "SystemWebbrower",
          url: that.insuranceDetail.insuranceUrl
        });
      } else {
        window.open(that.insuranceDetail.insuranceUrl);
      }
    },
  },
  computed: {
    ...mapState({
      allInsuranceInfo: state => state.insuranceListInfo,
      selectedPersons: state => state.selectedPersons,
      isDouble: state => state.isDouble
    })
  }
};
</script>

<style lang="scss" scoped>
@import "../../style/mixin";
.insurance_list_container {
  @include wh(100%,100%);
  position: relative;
  .insurance_list_wrap {
    .card_container {
      width: 100%;
      height: 2rem;
      position: relative;
      margin-bottom: 2.6rem;
      .card_backGround {
        width: 100%;
        height: 1.77rem;
        background: url("//m.lvmama.com/flight/image/cardBg.png") 0 0 no-repeat;
        background-size: 100% 100%;
      }
      .card_wrap {
        width: 6.33rem;
        height: 3.62rem;
        background: url("//m.lvmama.com/flight/image/card.png") 0 0 no-repeat;
        background-size: 100% 100%;
        position: absolute;
        top: 0.7rem;
        left: 50%;
        transform: translateX(-50%);
        padding-top: 0.46rem;
        box-sizing: border-box;
        > div:first-child {
          width: 100%;
          text-align: center;
          font-size: 0.42rem;
          color: #5e5e5e;
        }
        .card_price_container {
          margin-top: 0.15rem;
          text-align: center;
          > span {
            display: inline-block;
            color: #ffb33c;
          }
          > span:first-child {
            font-size: 0.32rem;
            margin-right: 0.1rem;
          }
          > span:nth-child(2) {
            font-size: 0.84rem;
            margin-right: 0.15rem;
          }
          > span:last-child {
            font-size: 0.32rem;
            text-decoration: line-through;
            color: #b4b4b4;
          }
        }
      }
    }
    width: 100%;
    @include heightByAbsolute(0.9rem,1.6rem);
    padding: 0 0.2rem;
    box-sizing: border-box;
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
    .insurance_kind_container {
      width: 100%;
      background: #fff;
      margin-top: 0.2rem;
      padding: 0 0.2rem;
      @include borderRadius(0.1rem);
      .insurance_kind_title {
        color: #333;
        font-weight: 700;
        height: 0.88rem;
        line-height: 0.88rem;
        box-sizing: border-box;
      }
      .insurance_item_container {
        border-top: 1px solid #e4e4e4;
        padding: 0.24rem 0;
        box-sizing: border-box;
        .single_picker_container {
            width: .44rem;
        }
        > div:first-child {
          width: 74%;
          > p {
            @include sc(0.26rem,#666);
            line-height: 0.4rem;
            span {
              color: #aaa;
            }
          }
        }
        > div:nth-child(2) {
          width: 26%;
          > p {
            @include sc(0.2rem,#666);
            span {
              @include sc(0.24rem,#333);
            }
          }
        }
        .insurance_ask {
          @include wh(0.44rem,0.24rem);
          display: inline-block;
          background: url("//m.lvmama.com/bus/image/insuranceAsk.png") 0 0
            no-repeat;
          background-size: .24rem .24rem;
          margin-left: 0.2rem;
          margin-bottom: -0.02rem;
        }
      }
      .insurance_item_container:last-child {
        > div:first-child {
          width: auto;
        }
      }
    }
  }
  .insurance_detail_container {
    @include wh(100%,100%);
    position: absolute;
    top: 0;
    left: 0;
    background: #fff;
    padding: 0 5%;
    padding-top: 20px;
    padding-bottom: 2rem;
    overflow-x: hidden;
    overflow-y: scroll;
    box-sizing: border-box;
    .insurance_title {
      @include sc(0.36rem,#000);
      line-height: 0.38rem;
      border-bottom: 1px solid #ddd;
      padding-bottom: 0.2rem;
    }
    .coupon_list_title {
      font-size: 0.36rem;
      color: #333;
      line-height: 0.36rem;
      padding-top: 0.3rem;
      padding-bottom: 0.2rem;
      box-sizing: border-box;
    }
    .close_detail {
      width: 100%;
      height: 2rem;
      position: absolute;
      bottom: 0;
      left: 0;
      img {
        @include wh(1rem,1rem);
      }
    }
  }
}
</style>
