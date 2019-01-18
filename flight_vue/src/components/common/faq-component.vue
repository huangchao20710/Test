<template>
    <div class="faq">
        <div class="header">
            <span class="back" @click="back"></span>
            查看解决方案
        </div>
        <div class="answer-wrapper" v-if="faqType==1">
            <div class="ques-answer">
                <div class="order-question">
                <p>机票点进去预订，为什么票价会变？</p>
                </div>
                <div class="order-line"></div>
                <div class="order-answer">
                    <p>机票的供需关系、时间因素等均影响着机票的价格，在一分钟内都是有可能发生变化。尤其是活动的低价票，由于抢购的人较多，市场调整价格的速度跟不上页面的更新。导致用户看到的价格与实际需要支付的价格有些区别，所以建议您在下单后尽快支付。以免价格的变化。</p>
                </div>
            </div>
        </div>

        <div class="answer-wrapper" v-if="faqType==2">
            <div class="ques-answer">
                <div class="order-question">
                <p>为什么无法支付？</p>
                </div>
                <div class="order-line"></div>
                <div class="order-answer">
                    <p>系统因繁忙无法支付，您可以尝试重新下一单。为了防止恶意占座，如您一天内多次提交订单不支付，系统会自动限制您当天的购票资格。</p>
                </div>
            </div>
        </div>

        <div class="answer-wrapper" v-if="faqType==3">
            <div class="ques-answer">
                <div class="order-question">
                <p>如何办理登机？</p>
                </div>
                <div class="order-line"></div>
                <div class="order-answer">
                    <p>建议您提前2小时到机场，成人或儿童均需携带预订机票时的登记证件，到指定柜台办理登机。</p>
                </div>
            </div>
        </div>

    </div>
</template>
<script>
import { lQuery } from '../../plugins/lQuery'
import { mapActions,mapState } from 'vuex'
    export default{
        data(){
            return{
            }
        },
         props: [
            'faqType',//展示内容
         ],
         methods:{
           back(){
                this.$parent.showFaq=false;
            }
         },
        computed:{
            ...mapState([
              
            ])
        },
        created(){
           
            
        },


    }
</script>
<style lang="scss" scoped>
   @import '../../style/mixin';
   .faq{
        @include wh(100%,100%);
        background-color: #eeeef5;
        position: absolute;
        top: 0;
        left: 0;
        z-index: 1000;
        padding-bottom: 0.98rem;
        .header{
            @include wh(100%,.94rem);
            @include sc(.38rem,#000);
            line-height: .74rem;
            text-align: center;
            position: absolute;
            top: 0;
            left: 0;
            z-index: 5;
            padding: .1rem 0;
            background-color: #fff;
            .back {
                left: 0;
                top: 0;
                background: url('//m.lvmama.com/flight/image/arrow.png') .3rem .28rem no-repeat;
                background-size: .2rem .38rem;
                z-index: 2;
                @include wh(1.6rem,.94rem);
                position: absolute;
            }
        }
        .answer-wrapper{
            padding: 0 .2rem;
            margin-top: 1.1rem;
            .ques-answer{
                background-color: #fff;
                border-radius: .1rem;
                padding: 0 0 .2rem .2rem;
                .order-question{
                    height: .7rem;
                    line-height: .7rem;
                }
                .order-line{
                    @include orderline();
                }
                .order-answer{
                    padding: .2rem .1rem 0 0;
                    >p{
                        color:#666;
                    }
                }
            }
            
        }
   }
   
</style>