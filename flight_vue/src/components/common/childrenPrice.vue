<template>
    <div class="childrenDesc" v-show="childrenPriceClose" v-if="singleFlight != null || doubleFlight != null">
        <div class="luggageDescWord">
            <p class="title xy_flex">儿童婴儿购票说明</p>
            
            <div v-if="(singleFlight.childrenSalePrice<=0 && doubleFlight==null) || (doubleFlight!=null && (singleFlight.childrenSalePrice<=0 || doubleFlight.childrenSalePrice<=0))">
                <p>抱歉，该报价不支持购买儿童票/婴儿票，您可尝试其他支持儿童婴儿票的报价。</p>
            </div>
            <div v-if="!((singleFlight.childrenSalePrice<=0 && doubleFlight==null) || (doubleFlight!=null && (singleFlight.childrenSalePrice<=0 || doubleFlight.childrenSalePrice<=0)))">
                <p class="y_flex">
                    <span>儿童票价：￥{{singleFlight.childrenSalePrice}}<i v-if="doubleFlight!=null && doubleFlight.childrenSalePrice>0">+￥{{doubleFlight!=null?doubleFlight.childrenSalePrice:""}}</i></span>
                    <span>机建燃油：￥{{singleFlight.childrenPrice}}<i v-if="doubleFlight!=null && doubleFlight.childrenPrice>0">+￥{{doubleFlight.childrenPrice}}</i></span>
                </p>
                <p>婴儿票（14天-2岁，按航班起飞当天的实际年龄计算）</p>
                <p>当前不支持婴儿票预定，由于每个航班的婴儿票可售座位有限，如需购买婴儿票请提前向航空公司申请。</p>
                <p>儿童票（2岁-12岁，按航班起飞当天的实际年龄计算）</p>
                <p>1.票价：航线标准价的50%，不收民航基金，燃油费为成人的50%。</p>
                <p>2.儿童乘机需要成人陪同，1名成人可携带1-2名儿童。</p>
                <p>3.无身份证的儿童，证件类型可选身份证（填写户口本身份证号）、护照。</p>
                <p>4.成人儿童必须购买同一舱等的机票。</p>
            </div>
        </div>
        <div class="submit_button_container xy_flex">
            <div class="submit_button xy_flex" @click="showChildrenPrice">确定</div>
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
            'singleFlight',//去程信息
            'doubleFlight',//返程儿信息
            'childrenPriceClose',//是否展示true展示false 不展示
         ],
         methods:{
           showChildrenPrice(){
                this.$emit('onClickChildren',false);
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
   .childrenDesc{
        @include wh(100%,75%);
        background-color: #fff;
        position: absolute;
        top: 25%;
        left: 0;
        z-index: 1000;
        padding-bottom: 0.98rem;
        border-top-left-radius: 5px;
        border-top-right-radius: 5px;
        overflow: hidden;
        .luggageDescWord{
            @include wh(100%,100%);
            background: #fff;
            position: absolute;
            top: 0;
            left: 0;
            color: #000;            
            .title{
                font-size: .34rem;
                width: 100%;
                height: 1.26rem;
                color: #333;
                margin-top: .1rem;
                font-weight: 600;
            }
            > div{
                padding: 0 .3rem;
                box-sizing: border-box;
                color: #666;
                font-size: .26rem;
                > p{
                    line-height: .42rem;
                    font-size: 0.28rem;
                    > span{
                        margin-right: .3rem;
                    }
                }
                > p:nth-child(2),> p:nth-child(4){
                    color: #fe3c71;
                    margin-top: .15rem;
                }
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