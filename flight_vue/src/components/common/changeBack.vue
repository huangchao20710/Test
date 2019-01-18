<template>
    <div class="changeBack" v-if="changeBackClose">
        <div class="ticket-rule-detail">
            <div class="title">退改签规则</div>
            <div class="flightTypes" v-show="ticketRuleDetailListdet!=''">
                <span @click="changeType('go')">去程</span>
                <span @click="changeType('back')">返程</span>
                <i :class="{'flightTypesBottomTransform':!show}"></i>
            </div>
            <p class="back-change" v-show="show" v-for="ticketRuleDetailsetsc in ticketRuleDetailListdesc">
                <span class="changeName">{{ticketRuleDetailsetsc.detailFeeTypeName}}</span>
                <span class="back-change-detail" v-html="ticketRuleDetailsetsc.detailFeeDesc"></span>
            </p>
            <p class="back-change" v-show="!show" v-for="ticketRuleDetailsetsc in ticketRuleDetailListdet">
                <span class="changeName">{{ticketRuleDetailsetsc.detailFeeTypeName}}</span>
                <span class="back-change-detail" v-html="ticketRuleDetailsetsc.detailFeeDesc"></span>
            </p>
            <p class="child">儿童退改签请联系客服<span>10106060-1-6</span></p>
        </div>
        <div class="flightStateClose xy_flex" @click="showChangeBack">
            <span></span>
        </div>
    </div>
</template>
<script>
import { lQuery } from '../../plugins/lQuery'
import { mapActions,mapState } from 'vuex'
    export default{
        data(){
            return{
                "show":true,
            }
        },
         props: [
            'ticketRuleDetailListdesc',//去程退改签
            'ticketRuleDetailListdet',//返程退改期
            'changeBackClose',//是否展示退改签 true展示false 不展示
         ],
         methods:{
           showChangeBack(){
                this.$emit('onChangeBack',false);
           },
           changeType(type){
                type=="go"?this.show=true:this.show=false;
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
   .changeBack{
        @include wh(100%,100%);
        background-color: #fff;
        position: absolute;
        top: 0;
        left: 0;
        z-index: 1000;
        padding-bottom: 0.98rem;
        .ticket-rule-detail{
            @include wh( 6.7rem,80%);
            margin: 0 auto;
            margin-top: 20px;
            overflow-y: scroll;
            .title{
                @include sc(0.36rem,inherit);
                line-height: 0.38rem;
                font-weight: normal;
                padding-bottom: 0.2rem;
            }
            .flightTypes{
                border-bottom: 1px solid #DDD;
                position: relative;
                > span{
                    display: inline-block;
                    height: .56rem;
                    line-height: .56rem;
                    margin-right: .4rem;
                }
                > i{
                    @include heightByAbsolute("",0);
                    @include wh( .56rem,2px);
                    border-top: 2px solid #fe3c71;
                    transition: all .4s;
                }
                .flightTypesBottomTransform{
                    transform: translateX(1.05rem);
                }
            }
            .back-change{
                border-bottom: 1px dashed #DDD;
                .changeName{
                    display: inline-block;
                    vertical-align: top;
                    color: #666;
                    padding-top: .3rem;
                    width: 30%;
                }
                .back-change-detail{
                    display: inline-block;
                    width: 68%;
                    padding: .3rem 0;
                    padding-left: 0.3rem;
                    border-left: 1px dashed #ddd;
                    line-height: normal;
                }
            }
            .child{
                line-height: 0.6rem;
                > span{
                    color: #007aff;
                    display: inline-block;
                }
            }
            > p{
                font-size: 0.28rem;
            }
        }
        .flightStateClose{
            @include wh( 100%,2rem);
            position: fixed;
            bottom: 0;
            box-sizing: border-box;
            > span{
                @include wh( 1rem,1rem);
                background: url('//m.lvmama.com/flight/image/bigX.png') 0 0 no-repeat;
                background-size: 1rem 1rem;
                display: inline-block;
            }
        }
   }
   
</style>