<template>
    <transition tag="li">
        <div class="list_item" v-show="flightList.isShowItem" @click="chooseFlight(flightList)">
            <div class="list_item_top between_x_flex">
                <div class="list_item_left between_x_flex">
                    <div>
                        <span>{{flightList.departureTime | monthDate}}</span>
                        <span>{{flightList.departureAirportName}}{{flightList.departureTermainalBuilding}}</span>
                    </div>
                    <span class="list_item_arrow">
                         <i class="stopType" v-if="flightList.stopType=='STOPPINT'">经停</i>
                    </span>
                    <div>
                        <span>
                            {{flightList.arrivalTime | monthDate}}
                            <i class="addDay" v-show="flightList.departureTime.split(' ')[0]!=flightList.arrivalTime.split(' ')[0]">+1</i>
                        </span>
                        <span>{{flightList.arrivalAirportName}}{{flightList.arrivalTerminalBuilding}}</span>
                    </div>
                </div>
                <div class="list_item_right" v-if="flightList.showMax!=true">
                    <span v-if="!knockOrReduced"><i>&#165;</i>{{flightList.lowSeats.LowSeat.salesParPrice}}</span>
                    <span v-if="knockOrReduced"><i>&#165;</i>{{flightList.lowSeats.LowSeat.salesParPrice-(-flightList.lowSeats.LowSeat.promotion || 0)}}</span>
                    <span>{{flightList.lowSeats.LowSeat.seatClassName}}</span>
                </div>
                <div class="list_item_right"  v-if="flightList.showMax==true">
                    <span v-if="!knockOrReduced"><i>&#165;</i>{{flightList.lowSeats.superSeat.salesParPrice}}</span>
                    <span v-if="knockOrReduced"><i>&#165;</i>{{flightList.lowSeats.superSeat.salesParPrice-(-flightList.lowSeats.superSeat.promotion || 0)}}</span>
                    <span>{{flightList.lowSeats.superSeat.seatClassName}}</span>
                </div>

            </div>
            <div class="list_item_under">
                <i><airlines-logo :logoKind="flightList.carrierCode"></airlines-logo></i>
                <span class="one">{{flightList.carrierName}}{{flightList.flightNo}}</span>
                <u class="shareFlight" v-if="flightList.isCodeShare==true">共享</u>
                <span class="list_item_icon">{{flightList.airplaneCode}}</span>
                <span v-if="flightList.airplaneType!=''&&flightList.airplaneType!=null">({{flightList.airplaneType}})</span>
                <div v-for="(item,index) in flightList.promotionList" :key="index" class="knock" v-if="index<2">
                    <p>{{item}}</p>
                </div>
                <div v-if="!knockOrReduced && (flightList.promotionList==null || flightList.promotionList.length<2)" class="knock">
                    <p v-if="flightList.lowSeats.LowSeat.promotion>0">已减{{flightList.lowSeats.LowSeat.promotion}}元</p>
                </div>
                <div v-if="knockOrReduced && (flightList.promotionList==null || flightList.promotionList.length<2)" class="knock">
                    <p v-if="flightList.lowSeats.LowSeat.promotion>0">立减{{flightList.lowSeats.LowSeat.promotion}}元</p>
                </div>
            </div>
        </div>
    </transition>
</template>
<script>
import { getFlightList } from '../../service/getData'
import { lQuery } from '../../plugins/lQuery'
import { mapActions,mapState } from 'vuex'
import airlinesLogo from '../common/airlinesLogo'
import { getElementTag,getStore} from '../../config/mUtils'
    export default{
        data(){
            return{
                price:"",
                tripInfo:"去程",
                flightListNew: '',
            }
        },
        props: [ 'flightList','knockOrReduced','flightArrList'],
        components: {
            airlinesLogo
        },
        computed:{
            ...mapState([
                'isDouble',
                'chosenGoTrip',//是否选了去程,去程为true
                'chosenBackTrip'
                
            ])
        },
        methods:{
             ...mapActions([
                'initData'
            ]),
            //点击跳转到舱位页
            chooseFlight(item){
                // if(!this.chosenBackTrip){
                    if(!this.knockOrReduced){
                    let obj ={
                        key: 'flightInformation',
                        val: {
                            departureTime:item.departureTime,
                            arrivalTime:item.arrivalTime,
                            flightNo:item.flightNo,
                            salesParPrice:item.lowSeats.LowSeat.salePrice,
                            carrierName:item.carrierName,
                            checkType:item.checkType
                           
                        }
                    }
                    try{
                        this.initData(obj);
                    }catch(e){}
                }else{
                    let obj ={
                        key: 'flightInformation',
                        val: {
                            departureTime:item.departureTime,
                            arrivalTime:item.arrivalTime,
                            flightNo:item.flightNo,
                            salesParPrice:item.lowSeats.LowSeat.salesParPrice-(-item.lowSeats.LowSeat.promotion),
                            carrierName:item.carrierName,
                            checkType:item.checkType
                        }
                    }
                    try{
                        this.initData(obj);
                    }catch(e){}
                }
                // }
                
                for(let i=0;i<this.flightArrList.length;i++){
                    if(item.flightNo==this.flightArrList[i].flightNo){
                        getElementTag("航班列表_("+i+")","机票航班列表");
                        if(getStore('selectuserid')!="" && getStore('selectuserid')!=null){
                            getElementTag("航班首页_已登录用户","机票首页");
                        }else{
                            getElementTag("航班首页_游客用户","机票首页");
                        }
                        if(getStore("goFlight")=="share"){
                            getElementTag("机票_订单填写页_航班（特价机票城市列表）","航班列表");
                        }
                        break;
                    }
                }
                this.$router.push(`/${this.$parent.$parent.baseUrlPath}/destine`);
                
            }
        },
        // created(){
        //    console.log(this.$parent.$parent.baseUrlPath);
        // }
    }
</script>
<style lang="scss" scoped>
   @import '../../style/mixin';
   .slide-in-enter-active {
        animation: popInRight 0.5s both;
    }

    @-webkit-keyframes popInRight {
        from {
            -webkit-transform: translate3d(100%, 0, 0);
            transform: translate3d(100%, 0, 0);
            opacity: 0;
        }
        to {
            -webkit-transform: translate3d(0, 0, 0);
            transform: translate3d(0, 0, 0);
            opacity: 1;
        }
    }

   .list_item{
        height:auto;
        background:#fff;
        margin:0 0.1rem;
        margin-bottom:0.1rem;
        border-radius: 0.12rem;
        padding-bottom: 0.2rem;
        .list_item_top{
            @include w(100%);
            padding:0.2rem 0.2rem 0.1rem 0.2rem;
            box-sizing: border-box;
            .list_item_left{
                @include w(72%);
                position:relative;
                .addDay{
                    @include sc(0.24rem,#666);
                }
                div:nth-child(3){
                    width:33%;
                }
            }
            .list_item_right{
                @include w(27%);
                font-size: 0.4rem;
                position:relative;
                span{
                    color:#FF6600;
                    margin-left: 0.6rem;
                    float: right; 
                    font-weight: 600;
                    >i{
                       @include sc(.26rem,#FF6600);
                    }
                }
                span:nth-child(2){
                    @include sc(.22rem,#999);
                    display: block;
                    float: right;
                    font-weight: normal;
                }
            }
            .list_item_left div span:nth-child(1){
                @include sc(0.4rem,#000);
            }
             .list_item_left div span:nth-child(2){
                @include sc(0.26rem,#999);
            }
            span{
                display:block;
            }
            .list_item_arrow{
                @include wh(1.12rem,.3rem);
                background: url('//m.lvmama.com/flight/image/list_jt.png') no-repeat;
                -webkit-background-size: 100%;
                background-size: 100%;
                @include center;
                left:46%;
                .stopType{
                    @include sc(0.22rem,#4997e7);
                    position: absolute;
	                left: 50%;
                    top:38%;
                    -webkit-transform: translate(-50%,-50%);
                    transform: translate(-50%,-50%);
                    background-color: #ffffff;
                }
            }
        }
        .list_item_under{
            width:100%;
            padding-left: 0.2rem;
            box-sizing: border-box;
            position: relative;
            i{
                display: inline-block;
                @include wh(.28rem,.28rem);
                @include ct();
            }
            span.one{
                margin-left: .35rem;
            }
            span{
                @include sc(0.22rem,#999);
            }
            .shareFlight{
                text-decoration: none;
                color: #4997E7;
                font-size: .22rem;
            }
            .list_item_icon:before{
                content: "";
                display: inline-block;
                @include wh(.1rem,.16rem);
                border-right: 1px solid #aaa;
                box-sizing: border-box;
                margin-right: .12rem;
            }
            p{
                display: inline-block;
                width:auto;
                padding:0 3px;
                line-height: 0.32rem;
                @include sc(0.2rem, #FF8800);
                border:1px solid #FFB92B;
                margin-left: 0.1rem;
                border-radius: 0.04rem;
            }
            .knock{
                display: inline-block;
            }
        }
   }
   
   
</style>