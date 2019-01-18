<template>
    <div class="luggageDesc" v-show="luggageDescClose">
        <div class="ticket-rule-detail">
            <div class="title" v-if="detail">行李及购票须知</div>
            <div class="title" v-if="!detail">行李额说明</div>
            <div class="flightTypes" v-show="flightInfoLength==true && (GOfreeConsignMemo!='' || GOfreeCarryMemo!='' || ticketInstruction!=''||BACKfreeConsignMemo!='' || BACKfreeCarryMemo!='' || ticketInstructionBACK!='')">
                <span @click="changeType('go')" v-if="GOfreeConsignMemo!='' || GOfreeCarryMemo!='' || ticketInstruction!=''">去程</span>
                <span @click="changeType('back')" v-if="BACKfreeConsignMemo!='' || BACKfreeCarryMemo!='' || ticketInstructionBACK!=''">返程</span>
                <i :class="{'flightTypesBottomTransform':!show}"></i>
            </div>
            <div class="flightBX" v-if="carrierCode=='' || carrierCode==null">
                报销凭证
                <span v-if="flightReimburseType!=''">提供 “{{flightReimburseType}}”</span>
                <span v-if="flightReimburseType==''">不提供报销凭证</span>
            </div>
            <div class="flightGD" v-if="(GOfreeConsignMemo!='' || GOfreeCarryMemo!='') && show ">行李规定</div>
            <div class="flightGD" v-if="(BACKfreeConsignMemo!='' || BACKfreeCarryMemo!='') && !show">行李规定</div>

            <p class="back-change" v-if="GOfreeConsignMemo!='' && show && goLuggageDesc.carrierCode!='9C' && carrierCode!='9C'" :class="{'back-solid':GOfreeCarryMemo==''}">
                <span class="changeName">托运行李</span>
                <span class="back-change-detail">{{GOfreeConsignMemo}}</span>
            </p>
             <p class="back-change back-solid" v-if="GOfreeCarryMemo!='' && show  && goLuggageDesc.carrierCode!='9C'&& carrierCode!='9C'">
                <span class="changeName">随身携带</span>
                <span class="back-change-detail">{{GOfreeCarryMemo}}</span>
            </p>
            <p v-if="GOfreeConsignMemo!='' && (goLuggageDesc.carrierCode=='9C' || carrierCode=='9C')" class="carrierCode" v-html="GOfreeConsignMemo"></p>

            <p class="back-change" v-if="BACKfreeConsignMemo!='' && !show  && goLuggageDesc.carrierCode!='9C'&& carrierCode!='9C'" :class="{'back-solid':BACKfreeCarryMemo==''}">
                <span class="changeName">托运行李</span>
                <span class="back-change-detail">{{BACKfreeConsignMemo}}</span>
            </p>
             <p class="back-change back-solid" v-if="BACKfreeCarryMemo!='' && !show  && goLuggageDesc.carrierCode!='9C'&& carrierCode!='9C'">
                <span class="changeName">随身携带</span>
                <span class="back-change-detail">{{BACKfreeCarryMemo}}</span>
            </p>
            <p v-if="BACKfreeConsignMemo!='' && backLuggageDesc.carrierCode=='9C'" class="carrierCode" v-html="BACKfreeConsignMemo"></p>

            <div class="flightSM" v-if="ticketInstruction!='' && show">
                <div>购票说明</div> 
                <div >{{ticketInstruction}}</div>
            </div>
            <div class="flightSM" v-if="ticketInstructionBACK!='' && !show">
                <div>购票说明</div> 
                <div >{{ticketInstructionBACK}}</div>
            </div>
        </div>
        <div class="flightStateClose xy_flex" @click="showluggageDesc">
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
                "GOfreeConsignMemo":'',
                "GOfreeCarryMemo":'',
                "BACKfreeConsignMemo":'',
                "BACKfreeCarryMemo":'',
                "ticketInstruction":'',//购票说明
                "ticketInstructionBACK":'',//购票说明
                "flightReimburseType":'',
                "detail":true,
            }
        },
         props: [
            'goLuggageDesc',//去程信息
            'backLuggageDesc',//返程信息
            'flightInfoLength',//是否往返 true 代表往返 false 代表单程
            'luggageDescClose',//是否展示true展示false 不展示
            'carrierCode',
            'businessTravel',//是否是差旅
            
         ],
         methods:{
           showluggageDesc(){
                this.$emit('onClickLuggage',false);
           },
           changeType(type){
                type=="go"?this.show=true:this.show=false;
           },
           initShow(){
            console.log("111");
            this.detail=true;
            this.show=true;
            this.GOfreeConsignMemo='';
            this.GOfreeCarryMemo='';
            this.BACKfreeConsignMemo='';
            this.BACKfreeCarryMemo='';
            this.ticketInstruction='';//购票说明
            this.ticketInstructionBACK='';//购票说明
            this.flightReimburseType='';
            if(this.goLuggageDesc!=null && this.goLuggageDesc.luggageInfo==null && JSON.stringify(this.goLuggageDesc).indexOf("T:")!=-1 && JSON.stringify(this.goLuggageDesc).indexOf("S:")!=-1){
                let desc=this.goLuggageDesc,
                    descList=this.goLuggageDesc.split("S:");
                if(descList[0].split("T:")[1]!="null" && descList[0].split("T:")[1]!=""){
                    this.GOfreeConsignMemo=descList[0].split("T:")[1];//托运
                }
                if(descList[1]!="null" && descList[1]!=""){
                    this.GOfreeCarryMemo=descList[1];//托运
                }
                this.detail=false;
                return;
            }
            if(this.carrierCode!="" && this.carrierCode!=null && this.goLuggageDesc!=null){
                this.GOfreeConsignMemo=this.goLuggageDesc;
                this.detail=false;
                return;
            }
                if(this.goLuggageDesc!=null || this.backLuggageDesc!=null){
                    // if(this.businessTravel!=null && this.businessTravel!='' && this.businessTravel==true){
                    //     this.reimburse=false;
                    // }else 
                    if(this.goLuggageDesc.flightReimburseType=='NO_REIMBURSE' || (this.backLuggageDesc!=null && this.backLuggageDesc.flightReimburseType=="NO_REIMBURSE")){
                        this.reimburse=false;
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
            ...mapState([
               
            ]),
            
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
   .luggageDesc{
        @include wh(100%,100%);
        background-color: #fff;
        position: absolute;
        top: 0;
        left: 0;
        z-index: 99;
        padding-bottom: 0.98rem;
        .ticket-rule-detail{
            @include wh( 92%,85%);
            margin: 0 auto;
            margin-top: 20px;
            overflow-y: scroll;
            .title{
                @include sc(0.36rem,#000);
                line-height: 0.38rem;
                font-weight: normal;
                padding-bottom: 0.7rem;
                border-bottom: 1px solid #DDD;
            }
            .flightTypes{
                border-bottom: 1px solid #DDD;
                position: relative;
                padding-top: .25rem;
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
            .flightBX{
                color: #666;
                padding: .25rem 0;
                border-bottom: 1px solid #ddd;
                >span{
                    color: #000;
                    margin-left: .2rem;
                }
            }
            .flightGD{
                padding-top: .35rem;
                border-bottom: 1px solid #DDD;
                padding-bottom: .15rem;
            }
            .flightSM{
                padding: .3rem 0;
                >div:first-child{
                    float: left;
                }
                >div:last-child{
                    padding-left: 20%;
                }
            }
            .carrierCode{
                line-height: normal;
                padding: .3rem 0;
                border-bottom: 1px dashed #DDD;
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
            >p.back-solid{
                border-bottom: 1px solid #ddd;
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