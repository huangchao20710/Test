<template>
    <div class="theRules" v-if="changeBackClose">
        <div class="rulesMask" @click="showChangeBack"></div>
        <div class="rulesDetail">
            <div class="xy_flex">
                <p  @click="changeType('back')" :class="{'weight':show==1}">退改签规则<i v-if="show==1"></i></p>
                <p  @click="changeType('child')" :class="{'weight':show==2}">儿童票/婴儿票<i v-if="show==2"></i></p>
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
            <div class="rulesConter" v-if="show==2">
                <div>
                    <div class="title"><i></i><span>儿童婴儿购票说明</span></div>
                    <table >
                        <tr v-if="(singleFlight.childrenSalePrice<=0 && doubleFlight==null) || (doubleFlight!=null && (singleFlight.childrenSalePrice<=0 || doubleFlight.childrenSalePrice<=0))">
                            <td>儿童票</td>
                            <td>
                                抱歉，该报价不支持购买儿童票/婴儿票，您可尝试其他支持儿童婴儿票的报价。
                            </td>
                        </tr>
                        <tr v-if="!((singleFlight.childrenSalePrice<=0 && doubleFlight==null) || (doubleFlight!=null && (singleFlight.childrenSalePrice<=0 || doubleFlight.childrenSalePrice<=0)))">
                            <td>儿童票</td>
                            <td>
                                票价：￥{{singleFlight.childrenSalePrice-(showPackageName?-packageInfo.tagPrice:0)-(-(doubleFlight!=null && doubleFlight.childrenSalePrice>0?doubleFlight.childrenSalePrice:0))}}/人<i v-if="doubleFlight!=null && doubleFlight.childrenSalePrice>0">(去程￥{{singleFlight.childrenSalePrice}}，返程￥{{doubleFlight.childrenSalePrice}})</i><br>
                                机建燃油费：￥{{singleFlight.childrenPrice-(-(doubleFlight!=null && doubleFlight.childrenPrice>0?doubleFlight.childrenPrice:0))}}/人<i v-if="doubleFlight!=null && doubleFlight.childrenPrice>0">(去程￥{{singleFlight.childrenPrice}}，返程￥{{doubleFlight.childrenPrice}})</i><br>
                                1.儿童票（2岁-12岁，按航班起飞当天的实际年龄计算）；<br>
                                2.票价：航线标准价的50%，不收民航基金，燃油费为成人的50%；<br>
                                3.儿童乘机需要成人陪同，1名成人可携带1-2名儿童；<br>
                                4.无身份证的儿童，证件类型可选身份证（填写户口本身份证号）、护照；<br>
                                5.成人儿童必须购买同一舱等的机票；<br>
                            </td>
                        </tr>
                        <tr>
                            <td>婴儿票</td>
                            <td>
                                1.婴儿票（14天-2岁，按航班起飞当天的实际年龄计算）；<br>
                                2.当前不支持婴儿票预定，由于每个航班的婴儿票可售座位有限，如需购买婴儿票请提前向航空公司申请；
                            </td>
                        </tr>
                    </table>
                </div>
            </div>
            <div class="rulesConter" v-if="show==3">
                <div>
                    <p class="icon" v-if="doubleFlight!=null && doubleFlight!=''"></p>
                    <div class="title"><i></i><span>行李须知</span></div>
                    <table v-if="(GOfreeConsignMemo!=''||GOfreeCarryMemo!='') && goLuggageDesc.carrierCode!='9C' ">
                        <tr v-if="GOfreeConsignMemo!='' && goLuggageDesc.carrierCode!='9C'">
                            <td>托运行李</td>
                            <td>{{GOfreeConsignMemo}}</td>
                        </tr>
                        <tr v-if="GOfreeCarryMemo!='' && goLuggageDesc.carrierCode!='9C'">
                            <td>随身携带</td>
                            <td>{{GOfreeCarryMemo}}</td>
                        </tr>
                    </table>
                    <p v-if="GOfreeConsignMemo!='' && (goLuggageDesc.carrierCode=='9C')" v-html="GOfreeConsignMemo"></p>
                    <p class="act_rule">具体以航司规则为准。</p>

                    <div class="title two"><i></i><span>报销凭证</span></div>
                    <p class="act_rule" v-if="flightReimburseType!=''">提供 “{{flightReimburseType}}”</p>
                    <p class="act_rule" v-if="flightReimburseType==''">不提供报销凭证</p>

                    <div class="title two" v-if="ticketInstruction!='' && show"><i></i><span>购票说明</span></div>
                    <p class="act_rule">{{ticketInstruction}}</p>
                </div>
                <div v-if="BACKfreeConsignMemo!='' || BACKfreeCarryMemo!='' || ticketInstructionBACK!=''">
                    <p class="icon back"></p>
                    <div class="title"><i></i><span>行李须知</span></div>
                    <table v-if="(BACKfreeConsignMemo!=''||BACKfreeCarryMemo!='') && backLuggageDesc.carrierCode!='9C'">
                        <tr v-if="BACKfreeConsignMemo!='' && backLuggageDesc.carrierCode!='9C'">
                            <td>托运行李</td>
                            <td>{{BACKfreeConsignMemo}}</td>
                        </tr>
                        <tr v-if="BACKfreeCarryMemo!=''  && backLuggageDesc.carrierCode!='9C'">
                            <td>随身携带</td>
                            <td>{{BACKfreeCarryMemo}}</td>
                        </tr>
                    </table>
                    <p v-if="BACKfreeConsignMemo!='' && (backLuggageDesc.carrierCode=='9C')" v-html="BACKfreeConsignMemo"></p>
                    <p class="act_rule">具体以航司规则为准。</p>

                    <div class="title two"><i></i><span>报销凭证</span></div>
                    <p class="act_rule" v-if="flightReimburseType!=''">提供 “{{flightReimburseType}}”</p>
                    <p class="act_rule" v-if="flightReimburseType==''">不提供报销凭证</p>

                    <div class="title two" v-if="ticketInstructionBACK!='' && show"><i></i><span>购票说明</span></div>
                    <p class="act_rule">{{ticketInstructionBACK}}</p>
                </div>
            </div>
        </div>
        <div class="rulesButtom">
            <span  @click="showChangeBack">确定</span>
        </div>

    </div>
</template>
<script>
// import { lQuery } from '../../plugins/lQuery'
// import { mapActions,mapState } from 'vuex'
    export default{
        data(){
            return{
                "show":1,
                "GOfreeConsignMemo":'',
                "GOfreeCarryMemo":'',
                "BACKfreeConsignMemo":'',
                "BACKfreeCarryMemo":'',
                "ticketInstruction":'',//购票说明
                "ticketInstructionBACK":'',//购票说明
                "flightReimburseType":'',
            }
        },
         props: [
            'ticketRuleDetailListdesc',//去程退改签
            'ticketRuleDetailListdet',//返程退改期
            'changeBackClose',//是否展示退改签 true展示false 不展示
            'singleFlight',//去程信息
            'doubleFlight',//返程儿信息
            'goLuggageDesc',//去程行李信息
            'backLuggageDesc',//返程行李信息
            'showPackageName',//是否套餐价
            'packageInfo',//套餐信息
         ],
         methods:{
           showChangeBack(){
                this.$emit('onChangeBack',false);
           },
           changeType(type){
                if(type=="back"){
                    this.show=1;
                }else if(type=="child"){
                    this.show=2;
                }else{
                    this.show=3;
                }
           },
           initShow(){
                this.GOfreeConsignMemo='';
                this.GOfreeCarryMemo='';
                this.BACKfreeConsignMemo='';
                this.BACKfreeCarryMemo='';
                this.ticketInstruction='';//购票说明
                this.ticketInstructionBACK='';//购票说明
                this.flightReimburseType='';
               if(this.goLuggageDesc!=null || this.backLuggageDesc!=null){
                    if(this.goLuggageDesc.flightReimburseType=='NO_REIMBURSE' || (this.backLuggageDesc!=null && this.backLuggageDesc.flightReimburseType=="NO_REIMBURSE")){
                        // this.reimburse=false;
                    }else{
                        if(this.backLuggageDesc==null){
                            if(this.goLuggageDesc.flightReimburseType=='ITINERARY_AND_INVOICE'){
                                this.flightReimburseType="行程单 + 差额发票";
                            }else if(this.goLuggageDesc.flightReimburseType=='INVOICE'){
                                this.flightReimburseType="差额发票";
                            }else if(this.goLuggageDesc.flightReimburseType=='ITINERARY'){
                                this.flightReimburseType="行程单";
                            }
                        }else{
                            if(this.goLuggageDesc.flightReimburseType=='ITINERARY_AND_INVOICE' && this.backLuggageDesc.flightReimburseType=='ITINERARY_AND_INVOICE'){
                                this.flightReimburseType="行程单 + 差额发票";
                            }else if(this.goLuggageDesc.flightReimburseType=='INVOICE' && this.backLuggageDesc.flightReimburseType=='INVOICE'){
                                this.flightReimburseType="差额发票";
                            }else if(this.goLuggageDesc.flightReimburseType=='ITINERARY' && this.backLuggageDesc.flightReimburseType=='ITINERARY'){
                                this.flightReimburseType="行程单";
                            }else if((this.goLuggageDesc.flightReimburseType=='ITINERARY_AND_INVOICE' && this.backLuggageDesc.flightReimburseType=='INVOICE')||(this.backLuggageDesc.flightReimburseType=='ITINERARY_AND_INVOICE' && this.goLuggageDesc.flightReimburseType=='INVOICE')){
                                this.flightReimburseType="差额发票";
                            }else if((this.goLuggageDesc.flightReimburseType=='ITINERARY_AND_INVOICE' && this.backLuggageDesc.flightReimburseType=='ITINERARY')||(this.backLuggageDesc.flightReimburseType=='ITINERARY_AND_INVOICE' && this.goLuggageDesc.flightReimburseType=='ITINERARY')){
                                this.flightReimburseType="行程单";
                            }else if((this.goLuggageDesc.flightReimburseType=='ITINERARY' && this.backLuggageDesc.flightReimburseType=='INVOICE')||(this.goLuggageDesc.flightReimburseType=='INVOICE' && this.backLuggageDesc.flightReimburseType=='ITINERARY')){
                                
                            }
                        }
                    }
                }

                if(this.goLuggageDesc!=null && this.goLuggageDesc.passengerNum!=null && this.goLuggageDesc.passengerNum!=""){
                    let num={},passengerNum=this.goLuggageDesc.passengerNum;
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
                if(this.backLuggageDesc!=null && this.backLuggageDesc.passengerNum!=null && this.backLuggageDesc.passengerNum!=""){
                    let num={},passengerNum=this.backLuggageDesc.passengerNum;
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
                        this.ticketInstructionBACK=`总人数最多${num.maxPassenger};成人最多${num.maxAdultNumber};儿童最多${num.maxChildrenNumber}（每个成人只能携带0`;
                        if(num.maxChildrenNumber>0){
                            this.ticketInstructionBACK=this.ticketInstructionBACK+"~"+num.childrenNumber+"个儿童）";
                        }else{
                            this.ticketInstructionBACK=this.ticketInstructionBACK+"个儿童）";
                        }
                }
                if(this.goLuggageDesc!=null && this.goLuggageDesc!='' && this.goLuggageDesc.carrierCode=='9C'){
                    if(this.goLuggageDesc.luggageDesc!=null && this.goLuggageDesc.luggageDesc!=""){
                        this.GOfreeConsignMemo=this.goLuggageDesc.luggageDesc;
                    }
                }else{
                    if(this.goLuggageDesc!=null && this.goLuggageDesc!='' && this.goLuggageDesc.luggageInfo!=null && this.goLuggageDesc.luggageInfo!=""){
                        if(this.goLuggageDesc.luggageInfo.freeConsignAmount==0){
                            this.GOfreeConsignMemo=`无免费托运行李额`;
                        }else{
                            this.GOfreeConsignMemo=`免费托运${this.goLuggageDesc.luggageInfo.freeConsignAmount}${this.goLuggageDesc.luggageInfo.luggageConsignType=='BY_WEIGHT'?'KG':'件'}`;
                        }
                        
                        if(this.goLuggageDesc.luggageInfo.freeCarryMemo!=''){
                            this.GOfreeCarryMemo=this.goLuggageDesc.luggageInfo.freeCarryMemo || '';
                        }
                        if(this.goLuggageDesc.luggageInfo.freeConsignMemo!=''){
                            this.GOfreeConsignMemo=this.GOfreeConsignMemo+","+this.goLuggageDesc.luggageInfo.freeConsignMemo;
                        }
                    }
                }
                if(this.backLuggageDesc!=null && this.backLuggageDesc!='' && this.backLuggageDesc.carrierCode=='9C'){
                    if(this.backLuggageDesc.luggageDesc!=null && this.backLuggageDesc.luggageDesc!=""){
                        this.BACKfreeConsignMemo=this.backLuggageDesc.luggageDesc;
                    }
                }else{
                    if(this.backLuggageDesc!=null && this.backLuggageDesc!='' && this.backLuggageDesc.luggageInfo!=null && this.backLuggageDesc.luggageInfo!=""){
                        if(this.backLuggageDesc.luggageInfo.freeConsignAmount==0){
                            this.BACKfreeConsignMemo=`无免费托运行李额`;
                        }else{
                            this.BACKfreeConsignMemo=`免费托运${this.backLuggageDesc.luggageInfo.freeConsignAmount}${this.backLuggageDesc.luggageInfo.luggageConsignType=='BY_WEIGHT'?'KG':'件'}`;
                        }
                       
                        if(this.backLuggageDesc.luggageInfo.freeCarryMemo!=''){
                            this.BACKfreeCarryMemo=this.backLuggageDesc.luggageInfo.freeCarryMemo || '';
                        }
                        if(this.backLuggageDesc.luggageInfo.freeConsignMemo!=''){
                            this.BACKfreeConsignMemo=this.BACKfreeConsignMemo+","+this.backLuggageDesc.luggageInfo.freeConsignMemo;
                        }
                    }
                }
           }
         },
        computed:{
            // ...mapState([
              
            // ])
        },
        created(){
            console.log(this.goLuggageDesc);
            this.initShow();
        },
        activated() {
             console.log(this.goLuggageDesc);
            this.initShow();
        }


    }
</script>
<style lang="scss" scoped>
   @import '../../style/mixin';
    .theRules{
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
                        bottom: -.21rem;
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
                    .act_rule{
                        margin-bottom: 0.3rem;
                        font-size: 0.24rem;
                        color: #333;
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
                                color: #333;
                            }
                            >td:first-child{
                                text-align: center;
                                line-height: .6rem;
                                width: 25%;
                                font-size: .24rem;
                                color: #333;
                            }
                            >td:nth-child(2){
                                padding: .2rem;
                                font-size: .24rem;
                                color: #333;
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
    }
   
</style>