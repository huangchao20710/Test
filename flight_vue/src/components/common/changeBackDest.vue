<template>
    <div class="changeBack" v-if="changeBackClose">
        <div class="rulesMask" @click="showChangeBack"></div>
        <div class="rulesDetail">
            <div class="xy_flex">
                <p  @click="changeType('back')" :class="{'weight':show==1}">退改签规则<i v-if="show==1"></i></p>
                <p  @click="changeType('lugg')" :class="{'weight':show==3}">行李及其他须知<i v-if="show==3"></i></p>
            </div>
            <div class="theRulesLine"></div>
            <div class="rulesConter" v-if="show==1">
                <div>
                    <p class="icon" v-if="ticketRuleDetailListdet!=null && ticketRuleDetailListdet!=''"></p>
                    <div class="title"><i></i><span>成人退改签规则</span></div>
                    <table>
                        <tr v-for="ticketRuleDetailsetsc in ticketRuleDetailListdesc">
                            <td>{{ticketRuleDetailsetsc.detailFeeTypeName}}</td>
                            <td v-html="ticketRuleDetailsetsc.detailFeeDesc"></td>
                        </tr>
                    </table>
                    <p>具体退改及签转规则以航司审核为准。</p>
                    <div class="title two"><i></i><span>儿童退改签规则</span></div>
                    <p>儿童退改签请联系客服10106060-1-6</p>
                </div>
                <div v-if="ticketRuleDetailListdet!=null && ticketRuleDetailListdet!=''">
                    <p class="icon back"></p>
                    <div class="title"><i></i><span>成人退改签规则</span></div>
                    <table>
                        <tr v-for="ticketRuleDetailsetsc in ticketRuleDetailListdet">
                            <td>{{ticketRuleDetailsetsc.detailFeeTypeName}}</td>
                            <td v-html="ticketRuleDetailsetsc.detailFeeDesc"></td>
                        </tr>
                    </table>
                    <p>具体退改及签转规则以航司审核为准。</p>
                    <div class="title two"><i></i><span>儿童退改签规则</span></div>
                    <p>儿童退改签请联系客服10106060-1-6</p>
                </div>
            </div>
            <div class="rulesConter" v-if="show==3">
                <div>
                    <!-- <p class="icon"></p> -->
                    <div class="title"><i></i><span>行李须知</span></div>
                    <table v-if="(freeConsignMemo!=''||freeCarryMemo!='') && carrierCode!='9C' ">
                        <tr v-if="freeConsignMemo!='' && carrierCode!='9C'">
                            <td>托运行李</td>
                            <td>{{freeConsignMemo}}</td>
                        </tr>
                        <tr v-if="freeCarryMemo!='' && carrierCode!='9C'">
                            <td>随身携带</td>
                            <td>{{freeCarryMemo}}</td>
                        </tr>
                    </table>
                    <p v-if="freeConsignMemo!='' && (carrierCode=='9C')" v-html="freeConsignMemo"></p>
                    <p>具体以航司规则为准。</p>

                    <div class="title two" v-if="flightSeat!=null"><i></i><span>报销凭证</span></div>
                    <p v-if="flightReimburseType!=''&&flightSeat!=null">提供 “{{flightReimburseType}}”</p>
                    <p v-if="flightReimburseType==''&&flightSeat!=null">不提供报销凭证</p>

                    <div class="title two" v-if="ticketInstruction!='' && flightSeat!=null"><i></i><span>购票说明</span></div>
                    <p>{{ticketInstruction}}</p>
                </div>
            </div>
        </div>
        <div class="rulesButtom">
            <span  @click="showChangeBack">确定</span>
        </div>
        <!-- <div class="footer">
            <span v-if="knockOrReduced">￥{{+flightSeat.parPrice}}</span>
            <span v-if="!knockOrReduced">￥{{+flightSeat.parPrice-(+flightSeat.promotion || 0)}}</span>
            <div @click="submitOrder">预订</div>
        </div> -->
    </div>
</template>
<script>
import { lQuery } from '../../plugins/lQuery'
import { mapActions,mapState } from 'vuex'
    export default{
        data(){
            return{
                "show":1,
                "flightReimburseType":'',
                "freeConsignMemo":'',
                "freeCarryMemo":'',
                "ticketInstruction":'',//购票说明
                "clickType":false,
            }
        },
         props: [
            'ticketRuleDetailListdesc',//去程退改签
            'ticketRuleDetailListdet',//返程退改期
            'changeBackClose',//是否展示退改签 true展示false 不展示
            'flightSeat',
            'goLuggageDesc',
            'knockOrReduced',//已减 立减
            'carrierCode',
         ],
         methods:{
           showChangeBack(){
                // if(this.clickType==false){
                    this.$emit('onChangeBack',false);
                // }
                // this.clickType=false;
           },
           changeType(type){
                // this.clickType=true;
                type=="back"?this.show=1:this.show=3;
           },
           submitOrder(){
                this.$emit('onSubmit',this.flightSeat);
           },
           initShow(){
            console.log("changeBackDest");
            this.flightReimburseType="";
            this.freeConsignMemo="";
            this.freeCarryMemo="";
            this.ticketInstruction="";
            // this.clickType=false;
            if(this.goLuggageDesc!=null && this.goLuggageDesc.luggageInfo==null && JSON.stringify(this.goLuggageDesc).indexOf("T:")!=-1 && JSON.stringify(this.goLuggageDesc).indexOf("S:")!=-1){
                let desc=this.goLuggageDesc,
                    descList=this.goLuggageDesc.split("S:");
                if(descList[0].split("T:")[1]!="null" && descList[0].split("T:")[1]!=""){
                    this.freeConsignMemo=descList[0].split("T:")[1];//托运
                }
                if(descList[1]!="null" && descList[1]!=""){
                    this.freeCarryMemo=descList[1];//托运
                }
                return;
            }
            
            if(this.flightSeat!=null){
                if(this.flightSeat.flightReimburseType=="ITINERARY_AND_INVOICE"){
                    this.flightReimburseType="行程单 + 差额发票";
                }else if(this.flightSeat.flightReimburseType=="INVOICE"){
                    this.flightReimburseType="差额发票";
                }else if(this.flightSeat.flightReimburseType=="ITINERARY"){
                    this.flightReimburseType="行程单";
                }
                if(this.flightSeat.passengerNum!=null && this.flightSeat.passengerNum!=""){
                    let num={},passengerNum=this.flightSeat.passengerNum;
                        //表示成人数量可以带儿童数量(成人)
                        num.adultNumber=passengerNum.substring(passengerNum.indexOf("A")+1,passengerNum.indexOf("C"));
                        //表示成人数量可以带儿童数量(儿童)
                        num.childrenNumber=passengerNum.substring(passengerNum.indexOf("C")+1,passengerNum.indexOf("Amin"));
                        //最少成人人数
                        num.minAdultNumber=passengerNum.substring(passengerNum.indexOf("Amin")+4,passengerNum.indexOf("Amax"));
                        //最大成人人数
                        num.maxAdultNumber=passengerNum.substring(passengerNum.indexOf("Amax")+4,passengerNum.indexOf("Cmin"));
                        //最少儿童人数
                        num.minChildrenNumber=passengerNum.substring(passengerNum.indexOf("Cmin")+4,passengerNum.indexOf("Cmax"));
                        //最大儿童人数
                        num.maxChildrenNumber=passengerNum.substring(passengerNum.indexOf("Cmax")+4,passengerNum.indexOf("Tmin"));
                        //最少总人数
                        num.minPassenger=passengerNum.substring(passengerNum.indexOf("Tmin")+4,passengerNum.indexOf("Tmax"));
                        //最大总人数
                        num.maxPassenger=passengerNum.substring(passengerNum.indexOf("Tmax")+4,passengerNum.length);
                        this.ticketInstruction=`总人数最多${num.maxPassenger};成人最多${num.maxAdultNumber};儿童最多${num.maxChildrenNumber}（每个成人只能携带0`;
                        if(num.maxChildrenNumber>0){
                            this.ticketInstruction=this.ticketInstruction+"~"+num.childrenNumber+"个儿童）";
                        }else{
                            this.ticketInstruction=this.ticketInstruction+"个儿童）";
                        }
                }
            }
            if(this.carrierCode=="9C"){
                if(this.flightSeat==null||this.flightSeat==''){
                    if(this.goLuggageDesc!=null && this.goLuggageDesc!=''){
                        this.freeConsignMemo=this.goLuggageDesc;
                    }
                }else{
                    if(this.goLuggageDesc!=null && this.goLuggageDesc.luggageDesc!=null && this.goLuggageDesc.luggageDesc!=''){
                        this.freeConsignMemo=this.goLuggageDesc.luggageDesc;
                    }
                }
            }else{
                if(this.goLuggageDesc!=null && this.goLuggageDesc.luggageInfo!=null && this.goLuggageDesc.luggageInfo!=''){
                    if(this.goLuggageDesc.luggageInfo.freeConsignAmount!=null && this.goLuggageDesc.luggageInfo.freeConsignAmount!=''){
                        this.freeConsignMemo=`免费托运${this.goLuggageDesc.luggageInfo.freeConsignAmount}${this.goLuggageDesc.luggageInfo.luggageConsignType=='BY_WEIGHT'?'KG':'件'}`;
                    }
                    if(this.goLuggageDesc.luggageInfo.freeConsignAmount==0){
                        this.freeConsignMemo=`无免费托运行李额`;
                    }
                    if(this.goLuggageDesc.luggageInfo.freeCarryMemo!='' && this.goLuggageDesc.luggageInfo.freeCarryMemo!=null){
                        this.freeCarryMemo=this.goLuggageDesc.luggageInfo.freeCarryMemo;
                    }
                    if(this.goLuggageDesc.luggageInfo.freeConsignMemo!='' && this.goLuggageDesc.luggageInfo.freeConsignMemo!=null){
                        this.freeConsignMemo=this.freeConsignMemo+","+this.goLuggageDesc.luggageInfo.freeConsignMemo;
                    }
                }
            }
            
           },
         },
        computed:{
            ...mapState([
              
            ])
        },
        created(){
            this.initShow();
        },
        activated() {
            this.initShow();
            
        }


    }
</script>
<style lang="scss" scoped>
   @import '../../style/mixin';
   .changeBack{
        .rulesMask{
            @include wh(100%,100%);
            background-color: rgba(0, 0, 0, 0.5);
            position: fixed;
            top: 0;
            left: 0;
            z-index: 20;
        }
        .theRulesLine{
            @include orderline();
            margin: .2rem 2.5% 0 !important;
            width: 95%;
        }
        .rulesDetail{
            @include wh(100%,10.68rem);
            bottom: 0;
            position: absolute;
            // overflow-y: scroll;
            left: 0;
            z-index: 21;
            background-color: #fff;
            transition: all 0.2s ease-in 0s;
            border-radius: 5px 5px 0 0;
            >div:first-child{
                margin-top: .5rem;
                .weight{
                    font-weight: 600;
                }
                >p{
                    @include sc(.3rem,#333);
                    width: 33%;
                    text-align: center;
                    position: relative;
                    >i{
                        @include wh(1.2rem,2px);
                        background-image: linear-gradient(90deg, #FF7F6A 0%, #FD3C71 100%);
                        border-radius: 1px;
                        position: absolute;
                        left: 25%;
                        bottom: -.2rem;
                    }
                }
                
            }
            .rulesConter{
                position: relative;
                margin: 0 .2rem .5rem .2rem;
                overflow: scroll;
                height: 8.56rem;
                padding-bottom: 2.25rem;
                .icon{
                    @include wh(.52rem,.28rem);
                    background: url(//m.lvmama.com/flight/image/doubleGo.png) no-repeat;
                    background-size: 100%;
                    top:0%;
                    position: relative;
                    transform: translateY(-50%);
                }
                .icon.back{
                    background: url(//m.lvmama.com/flight/image/doubleFrom.png) no-repeat;
                    background-size: 100%;
                }
                >div{
                    margin-top: .2rem;
                    position: relative;
                    margin-bottom: .5rem;
                    .title{
                        margin-bottom: .2rem;
                        position: relative;
                        >i{
                            @include wh(5px,5px);
                            @include ct();
                            border: 1px #666 solid;
                            background-color: #666;
                            border-radius: 100px;
                        }
                        >span{
                            @include sc(.28rem,#000);
                            font-weight: 600;
                            margin-left: .2rem;
                        }
                    }
                    .title.two{
                        margin-top: .2rem;
                    }
                    table{
                        border-collapse: collapse;
                        width: 100%;
                        border: 1px #E4E4E4 solid;
                        margin: 0 0 .2rem;
                        >tr{
                            border: 1px #E4E4E4 solid;
                            >td{
                                border: 1px #E4E4E4 solid;
                                font-size: .24rem;
                            }
                            >td:first-child{
                                text-align: center;
                                line-height: .6rem;
                                width: 25%;
                                font-size: .24rem;
                            }
                            >td:nth-child(2){
                                padding: .2rem;
                                color: #666;
                            }
                        }
                    }
                    p{
                        font-size: .24rem;
                    }
                }
                
            }
        }
        .rulesButtom{
            z-index: 21;
            height: 2.56rem;
            width: 100%;
            position: absolute;
            bottom: 0;
            background: -webkit-linear-gradient(top, rgba(255, 255, 255, 0) 0, #FFF 50%);
            background: linear-gradient(-180deg, rgba(255, 255, 255, 0) 0, #FFF 50%);
            >span{
                bottom: .28rem;
                text-align: center;
                position: absolute;
                left: 2.5%;
                line-height: .88rem;
                background: -webkit-linear-gradient(left, #FE686C 0, #FD3C71 100%);
                background: linear-gradient(90deg, #FE686C 0, #FD3C71 100%);
                border-radius: 100px;
                font-size: 0.36rem;
                color: #fff;
                width: 95%;
                height: 0.88rem;
            }
        }
        // .footer{
        //     @include sc( .3rem,#fff);
        //     @include wh( 100%,.98rem);
        //     position: absolute;
        //     bottom: 0;
        //     left: 0;
        //     z-index: 17;
        //     background-color: #3c3c3c;
        //     line-height: .98rem;
        //     >span{
        //         color: #d30775;
        //         width: 60%;
        //         float: left;
        //         padding-left: .2rem;
        //         position: relative;
        //     }
        //     >div{
        //         @include sc( .3rem,#fff);
        //         @include wh( 40%,100%);
        //         border: none;
        //         float: right;
        //         background-color: #d30775;
        //         text-align: center;
        //         -webkit-transform: translateZ(0);
        //         transform: translateZ(0);
        //     }
        // }
   }
   
</style>