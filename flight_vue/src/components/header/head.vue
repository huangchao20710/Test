<template>
    <div class="header y_flex between_x_flex">
        <div class="back_container y_flex" @click="goBack()">
            <span class="back"></span>
        </div>
        <div class="centerTitle xy_flex up_flex" @click="centerHandler">
            <p class="y_flex" v-if="!isDouble && !(showOrderTopMsg && this.flightInfo.length==2)">
                <span class="title_word" :class="{'orderDetail':bookingData!=null,'changeColor':backTravelHelper}">{{depart}}<p v-if="bookingData!=null" class="booking">{{bookingData}}预订</p></span>
                <span class="single_icon_wrap xy_flex">
                    <span class="single_icon" v-if="dest != ''"></span>
                </span>
                <span>{{dest}}</span>
                <i v-if="centerHandlerPath != ''" class="click_mark"></i>
            </p>
            <p class="y_flex" v-if="showOrderTopMsg && this.flightInfo.length==1">
                <span class="activity_title">{{orderFromTitle.date}}</span>
                <span class="activity_title act">{{orderFromTitle.time}}</span>
            </p>
            <p class="y_flex doubleHeadIcon" v-if="showOrderTopMsg && this.flightInfo.length==2">
                <i class="inbound"></i>
                <span class="activity_title">{{orderFromTitle.city}} {{orderFromTitle.date}} <b v-show="timeDisplay">{{orderFromTitle.time}}</b></span>
            </p>
            <p class="y_flex doubleHeadIcon" v-if="showOrderTopMsg && this.flightInfo.length==2">
                <i class="outbound"></i>
                <span class="activity_title">{{doubleOrderFromTitle.city}} {{doubleOrderFromTitle.date}} <b v-show="timeDisplay">{{doubleOrderFromTitle.time}}</b></span>
            </p>
            <p class="y_flex" v-if="isDouble&&!chosenBackTrip && !showOrderTopMsg">
                <span v-if="(goPage == 'isFlightList' || pathArr.indexOf('destine') != -1)&&isDouble">选去程：</span>
                <span class="title_word">{{depart}}</span>
                <span class="single_icon_wrap">
                    <span class="single_icon" v-if="dest != ''"></span>
                </span>
                <span>{{dest}}</span>
                <i v-if="centerHandlerPath != ''" class="click_mark"></i>
            </p>
            <p class="y_flex" v-if="isDouble&&chosenBackTrip && !showOrderTopMsg">
                <span v-if="(goPage == 'isFlightList' || pathArr.indexOf('destine') != -1)&&isDouble">选返程：</span>
                <span class="title_word">{{depart}}</span>
                <span class="single_icon_wrap" :class="{'single_icon_doublewrap':dest != '' && goPage == 'toDestine'}">
                    <span class="single_icon" v-if="dest != '' && goPage != 'toDestine'"></span>
                    <span class="singledouble_icon" v-if="dest != '' && goPage == 'toDestine'"></span>
                    
                </span>
                <span>{{dest}}</span>
                <i v-if="centerHandlerPath != ''" class="click_mark"></i>
            </p>
            <p class="y_flex" v-if="isShowTopMsg">
                <span class="activity_title">{{activityTitle.date}}</span>
                <span class="activity_title act">{{activityTitle.week}}</span>
                <span class="activity_title act">{{activityTitle.time}}</span>
            </p>
            <p class="y_flex grey" v-if="isShowDate">
                <span class="activity_title">{{lowPriceMoent.fromDate}}</span>
                <span class="activity_title">{{lowPriceMoent.toDate}}</span>
            </p>
        </div>
        <div class="finish_container xy_flex">
            <div class="finish" v-bind:class="{'minfontsize':!isDouble&&lowPriceName!=''&&lowPriceName!=null}" @click="goLowList" v-show="!isDouble&&!businessTravel">{{lowPriceName}}</div>
            <div class="finish" @click="goAhead" :class="{'businessTravelHelper':goPage=='businessTravelHelper','noDouble':isDouble&&goPage=='isFlightList','businessTravel':goPage=='businessTravelMy' || goPage=='businessTravelAdd' || goPage=='businessTravelUpdate','noContent':lowPriceName==''||lowPriceName==null || businessTravel,'minfontsize':!isDouble&&lowPriceName!=''&&lowPriceName!=null&&!businessTravel}" >{{rightMenu}}</div><!--:class="{'businessTravel':goPage=='businessTravel' || goPage=='businessTravelAdd'}" 'noContent':lowPriceName==''||lowPriceName==null,-->
        </div>
        <div class="loadingSource"></div>
    </div>
</template>
<script>
import { mapActions,mapState } from 'vuex'
import { setStore,getStore,removeStore,orderDetailHrefNew,isClient,getUrlParam,wapHref } from '../../config/mUtils'


    export default{
        data(){
            return{
                backTrip:true,
                pathArr: '',
                orderFromTitle:{},
                doubleOrderFromTitle:{},
                timeDisplay:false,
            }
        },
         props: {
            'depart': {
                type: String,
            },
            'dest': {
                type: String,
                default: ''
            },
            'rightMenu': {
                type: String,
                default: ''
            },
            'lowPriceName':{
                type: String,
                default: ''
            },
            'centerHandlerPath': {
                type: String,
                default: ''
            },
            'goPage':{
                type: String,
                default: ''
            },
            'departCode':{
                type: String,
                default: ''
            },
            'destCode':{
                type: String,
                default: ''
            },
            'isShowTopMsg':{
                type: Boolean,
                default: false
            },
             'isShowDate':{
                type: Boolean,
                default: false
            },
            'activityTitle': {
                date: '',
                week: '',
                time: ''
            },
             'lowPriceMoent': {
                formDate: '',
                toDate: ''
            },
            'showOrderTopMsg':{
                type: Boolean,
                default: false
            },
            'flightInfo':{
                // type: String,
                default: ''
            },
            'bookingData':{
                type: String,
                default:null
            },
            'backTravelHelper':{
                type: Boolean,
                default: false
            }


            

         },
         components:{
            
        },
        computed:{
            ...mapState([
                
            ]),
            
        },
         methods:{
            ...mapActions([
                'initData'
            ]),
            goBack(){
                console.log(this.goPage);
                if(this.goPage == 'isFlightList'){
                    if(getStore("backHome")!=null){
                        if(getStore("goFlight")!=null){
                            //低价走势
                            if (NativeUtil.isLVMM && NativeUtil.isGreaterThan('7.10.5')  && document.cookie.indexOf('closeMultipleWebView=true') === -1) {
                                    NativeUtil.lvCommon('lvJSBackPage', { 'animate': '1' })    
                                }else{
                                    if(getStore("goFlight")=="low"){
                                        this.$router.push(`/${this.$parent.$parent.baseUrlPath}/lowPrice`);
                                    }else if(getStore("goFlight")=="share"){
                                        this.$router.push(`/${this.$parent.$parent.baseUrlPath}/flightShare`);
                                    }else if(getStore("goFlight")=="special"){
                                        this.$router.push(`/${this.$parent.$parent.baseUrlPath}/specialcityList`);
                                    }else if(getStore("goFlight")=="map"){
                                        this.$router.push(`/${this.$parent.$parent.baseUrlPath}/flightMap`);
                                    }else if(getStore("goFlight")=="move"){
                                        this.$router.push(`/${this.$parent.$parent.baseUrlPath}/priceMovements`);
                                    }else{
                                        if(this.isDouble){
                                            this.backTrip = false;
                                            let obj ={
                                                key:'chosenBackTrip',
                                                val: this.backTrip
                                            };
                                            try{
                                                this.initData(obj);
                                            }catch(e){}
                                    }
                                    if(this.businessTravel==true){
                                            this.$router.push(`/${this.$parent.$parent.baseUrlPath}/businessTravel`);
                                        }else{
                                            // this.$router.push(`/${this.$parent.$parent.baseUrlPath}/home`);
                                            window.location.href="//m.lvmama.com/iflight/main/?hideAppHeader=1";
                                        }
                                    }
                                }
                            
                        }else{
                            if(this.isDouble){
                                this.backTrip = false;
                                let obj ={
                                    key:'chosenBackTrip',
                                    val: this.backTrip
                                };
                                try{
                                    this.initData(obj);
                                }catch(e){}
                           }
                           if(this.businessTravel==true){
                                this.$router.push(`/${this.$parent.$parent.baseUrlPath}/businessTravel`);
                            }else{
                                // this.$router.push(`/${this.$parent.$parent.baseUrlPath}/home`);
                                window.location.href="//m.lvmama.com/iflight/main/?hideAppHeader=1";
                            }
                        }
                    }else{
                        if(this.isDouble){
                            this.backTrip = false;
                            let obj ={
                                key:'chosenBackTrip',
                                val: this.backTrip
                            };
                            try{
                                this.initData(obj);
                            }catch(e){}
                            if(this.businessTravel==true){
                                this.$router.push(`/${this.$parent.$parent.baseUrlPath}/businessTravel`);
                            }else{
                                // this.$router.push(`/${this.$parent.$parent.baseUrlPath}/home`);
                                window.location.href="//m.lvmama.com/iflight/main/?hideAppHeader=1";
                            }
                            
                       }else{
                            if(isClient() == 1 && location.href.indexOf("from=nativePage")!=-1) {
                                window.NativeUtil && NativeUtil.lvCommon('lvJSBackPage', { 'animate': '1' });
                            }else{
                                // if(getStore("goFlight")=="low"){
                                //     this.$router.go(-1); 
                                //     return;
                                // }
                                if (NativeUtil.isLVMM && NativeUtil.isGreaterThan('7.10.5')  && document.cookie.indexOf('closeMultipleWebView=true') === -1) {
                                    NativeUtil.lvCommon('lvJSBackPage', { 'animate': '1' })    
                                } else {
                                    this.$router.go(-1); 
                                }
                            }
                            
                       }
                        
                    }

                }else if(this.goPage == 'toDestine'){
                    this.$emit('showSpecial');
                }else if(this.goPage == 'toFlightList'){
                    setStore("backHome",true);
                    this.$router.push(this.departCode+"-"+this.destCode);
                }else if(this.goPage == 'priceMovements'){
                    this.$router.push(`/${this.$parent.$parent.baseUrlPath}/lowPriceRemind`);
                }else if(this.goPage == 'toOrderForm'){
                    this.$router.push(`/${this.$parent.$parent.baseUrlPath}/orderForm`);
                }else if(this.goPage == 'toShare'){
                    this.$router.push(`/${this.$parent.$parent.baseUrlPath}/flightShare`);
                }else if(this.goPage == 'businessTravelUpdate'){
                    this.$router.push(`/${this.$parent.$parent.baseUrlPath}/businessTravelMy`);
                }else if(this.goPage == 'businessTravelSuccess'){
                    this.$router.push(`/${this.$parent.$parent.baseUrlPath}/businessTravelIndex`);
                }else if(this.goPage == 'businessTravelMy'){
                    this.$router.push(`/${this.$parent.$parent.baseUrlPath}/businessTravelIndex`);
                }else if(this.goPage == "orderDetail"){
                    if(location.search.indexOf("backBusinessAllOrders")!=-1){
                        this.$router.push(`/${this.$parent.$parent.baseUrlPath}/businessTravelAllOrders`);
                    }else if(location.search.indexOf("backBusinessIndex")!=-1){
                        this.$router.push(`/${this.$parent.$parent.baseUrlPath}/businessTravelIndex`);
                    }else if(location.search.indexOf("backBusinessApprove")!=-1){
                        this.$router.push(`/${this.$parent.$parent.baseUrlPath}/businessTravelApprove`);
                    }else{
                        orderDetailHrefNew();
                    }
                }else if(this.goPage == "travelHelper"){
                    this.$router.push(`/${this.$parent.$parent.baseUrlPath}/travelHelper`);
                }else if(this.goPage == "remindFrom"){
                    if(getStore("remindFrom")!=null && getStore("remindFrom")!=''){
                        setStore("backHome",true);
                        this.$router.push(`/${this.$parent.$parent.baseUrlPath}/${getStore("remindFrom")}`);
                    }else{
                        // this.$router.push(`/${this.$parent.$parent.baseUrlPath}/home`);
                        window.location.href="//m.lvmama.com/iflight/main/?hideAppHeader=1";
                    }
                }else if(this.goPage == "travelTo"){
                    if(this.businessTravel==true){
                        this.$router.push(`/${this.$parent.$parent.baseUrlPath}/businessTravel`);
                    }else{
                        window.location.href="//m.lvmama.com/iflight/main/?hideAppHeader=1";
                        // this.$router.push(`/${this.$parent.$parent.baseUrlPath}/home`);
                    }
                }else if(this.goPage == "backIndex"){
                    this.$router.push(`/${this.$parent.$parent.baseUrlPath}/businessTravelIndex`);
                }else if(this.goPage == "waitIndex"){
                    this.$router.push(`/${this.$parent.$parent.baseUrlPath}/businessTravelApprove`);
                }else if(this.goPage == "allIndex"){
                    this.$router.push(`/${this.$parent.$parent.baseUrlPath}/businessTravelAllOrders`);
                }else if(this.goPage == "businessTravelQuery"){
                    if (isClient() == 1) {
                        window.location.href = "//m.lvmama.com/flight?method=backToAppIndex";
                    } else {
                        window.location.href = "//m.lvmama.com";
                    }
                }else if(this.goPage == "orderSuccess"){
                    if (isClient() == 1) {
                        window.location.href = "//m.lvmama.com/flight?method=backToAppIndex";
                    } else {
                        wapHref();
                    }
                }else if(this.goPage == "feek"){
                    let obj = {
                        key: 'goFlightList',
                        val: true
                    }
                    try{
                        this.initData(obj);
                    }catch(e){}
                    setStore("backHome",true);
                    if(window.location.pathname.split('/').reverse()[0]=="index" && !this.businessTravel){
                        if(isClient() == 1 && location.href.indexOf("from=nativePage")!=-1) {
                            window.NativeUtil && NativeUtil.lvCommon('lvJSBackPage', { 'animate': '1' });
                        }else{
                            if (NativeUtil.isLVMM && NativeUtil.isGreaterThan('7.10.5')  && document.cookie.indexOf('closeMultipleWebView=true') === -1) {
                                NativeUtil.lvCommon('lvJSBackPage', { 'animate': '1' })    
                            } else {
                                this.$router.go(-1); 
                            }
                        }
                    }else{
                        this.$router.go(-1);
                    }
                }else if(this.goPage == 'businessTravelAdd'){
                    setStore("businessToAdd",true);
                    if(getUrlParam("CC")!=null && getUrlParam("CC")!=''&&isClient()==1){
                         window.location.href = "//m.lvmama.com/flight?method=backToAppIndex";
                    }else{
                        this.$router.go(-1);
                    }
                }else{
                    this.$router.go(-1);
                }
              
                if(this.goPage != 'toFlightList'){
                    if(this.goPage == "remindFrom"&&getStore("remindFrom")!=null && getStore("remindFrom")!=''){
                    }else{
                        removeStore("backHome",this);
                    }
                    
                }
                //返回remove新增的乘机人缓存和编辑的乘机人
                removeStore("flight_addPerson_info",this);
                removeStore("editPersonMes",this);
                //清除所有进入航班列表页标记
                // removeStore("goFlight");
            },
            goAhead() {
                this.$emit('rightHandler')
            },
            goLowList(){
                this.$emit('lowHandler')
            },
            centerHandler() {
                this.$router.push(this.centerHandlerPath);
            },
           
         },
        computed:{
            ...mapState([
                'isDouble',
                'businessTravel',
                'chosenGoTrip',//是否选了去程,去程为true
                'chosenBackTrip'//选了返程
            ])
        },
        created(){
            if (screen.width>350) {
                this.timeDisplay=true;
            }else{
                this.timeDisplay=false;
            }
            this.pathArr = this.$route.path.split('/');
            if(this.flightInfo!=null && this.flightInfo!=''){
                this.orderFromTitle = {
                        city:`${this.flightInfo[0].departureAirport.cityName}-${this.flightInfo[0].arrivalAirport.cityName}`,
                        date:this.flightInfo[0].departureDate,
                        time:`${this.flightInfo[0].departureTime}-${this.flightInfo[0].arrivalTime}`
                    };
                    console.log(this.orderFromTitle);
                if(this.flightInfo.length==2){
                    this.doubleOrderFromTitle = {
                        city:`${this.flightInfo[1].departureAirport.cityName}-${this.flightInfo[1].arrivalAirport.cityName}`,
                        date:this.flightInfo[1].departureDate,
                        time:`${this.flightInfo[1].departureTime}-${this.flightInfo[1].arrivalTime}`
                    };
                }
            }     
        },
        activated() {
            if (screen.width>350) {
                this.timeDisplay=true;
            }else{
                this.timeDisplay=false;
            }
            this.pathArr = this.$route.path.split('/');
            this.isTravelHelper = false;
            if(this.flightInfo!=null && this.flightInfo!=''){
                this.orderFromTitle = {
                        city:`${this.flightInfo[0].departureAirport.cityName}-${this.flightInfo[0].arrivalAirport.cityName}`,
                        date:this.flightInfo[0].departureDate,
                        time:`${this.flightInfo[0].departureTime}-${this.flightInfo[0].arrivalTime}`
                    };
                    console.log(this.orderFromTitle);
                if(this.flightInfo.length==2){
                    this.doubleOrderFromTitle = {
                        city:`${this.flightInfo[1].departureAirport.cityName}-${this.flightInfo[1].arrivalAirport.cityName}`,
                        date:this.flightInfo[1].departureDate,
                        time:`${this.flightInfo[1].departureTime}-${this.flightInfo[1].arrivalTime}`
                    };
                }
            }
            
            
        }
    }
</script>
<style lang="scss" scoped>
@import '../../style/mixin';
    .header{
        @include wh(100%,0.9rem);
        background:#fff;
        position: relative;
        .back_container {
            @include wh(.9rem,.9rem);
            padding-left: .2rem;
            box-sizing: border-box;
            .back{
               @include wh(0.2rem,0.38rem);
               display: block;
                background: url('//m.lvmama.com/flight/image/arrow.png') no-repeat;
                background-size: 100%;  
            }
        }
        .centerTitle {
            width: 5rem;
            @include center;
            > p {
                height: .36rem;
                > span{
                    display: block;
                    height: .36rem;
                    line-height: .36rem;
                    font-size: 0.36rem;
                }
                .activity_title{
                    color: #999;
                    font-size: 0.2rem;
                    b{
                        font-weight: normal;
                    }
                }
                .act{
                    padding-left: 0.1rem;
                }
                > span.orderDetail{
                    text-align: center;
                    line-height: .06rem;
                    font-size: .28rem;
                    >p{
                        line-height: .62rem;
                        font-size: .22rem;
                    }
                }
                >span.changeColor{
                    color:#000 !important;
                }
                .single_icon_wrap {
                    padding-top: .15rem;
                    .single_icon{
                        display: block;
                        @include wh(0.3rem,0.08rem);
                        background: url('//m.lvmama.com/flight/image/arrowHeader.png') no-repeat;
                        -webkit-background-size: 100%;
                        background-size: 100%;
                        margin: 0 0.2rem;
                    }
                    .singledouble_icon{
                        display: block;
                        @include wh(0.3rem,0.2rem);
                        background: url('//m.lvmama.com/flight/image/doublejt.png') no-repeat;
                        -webkit-background-size: 100%;
                        background-size: 100%;
                        margin: 0 0.2rem;
                    }
                }
                >span.single_icon_doublewrap{
                    padding-top: .08rem;
                }
                .click_mark {
                    display: block;
                    border-left: 5px solid transparent;
                    border-right: 5px solid transparent;
                    border-top: 5px solid #000;
                    margin-left: .12rem;
                }
            }
            >.grey{
                .activity_title{
                    color:#999;
                }
            }
            >.doubleHeadIcon{
                font-size: 0.24rem;
                color: #000000;
                line-height: 0.34rem;
                position: relative;
                >i {
                    display: inline-block;
                    width: 0.3rem;
                    height: 0.3rem;
                    background-image: url('//m.lvmama.com/flight/image/img.png');
                    background-size: 6rem;
                    position: absolute;
                    top: 0.01rem;
                }
                >.inbound{
                    background-position: -4.62rem -10.22rem;
                }
                >.outbound{
                    background-position: -4.62rem -10.9rem;
                }
                >span{
                    margin-left: 0.36rem;
                    color: #000;
                    b{
                        font-weight: normal;
                    }
                }
            }
       }
        
       .finish_container {
            @include wh(auto,inherit);
            padding-right: .2rem;
            box-sizing: border-box;
            .finish{
                width: 30%;
                margin-right: -50%;
                color:#666;
                line-height: 0.25rem;
                // @include sc(0.22rem,#000000);
            }
            .minfontsize{
                @include sc(0.22rem,#666666);
            }
            div:nth-child(1){
                margin-right: 0.06rem;
            }
            .noDouble{
                width: 100%;
                margin-right: 0;                
            }
            .noContent{
                width: inherit;
                margin-left: -67%;
            }
       }
       .businessTravel{
            @include wh(0.36rem,0.36rem);
            background: url('//m.lvmama.com/flight/image/businessTravel_heardIcon.png') no-repeat;
            -webkit-background-size: 100%;
            background-size: 100%;
        }
        .businessTravelHelper{
            @include wh(0.36rem,0.36rem);
            background: url('//m.lvmama.com/flight/image/businessTravel_mobile.png') no-repeat;
            -webkit-background-size: 100%;
            background-size: 100%;
        }
       .loadingSource {
            @include wh(100%,2px);
            position: absolute;
            bottom: -2px;
            left: -100%;
            display: none;
            background-color: #fe3c71;
            z-index: 10;
       }
    }
</style>

<!-- <head-top path="/orderForm" :depart="depart" :dest="dest" :rightMenu="rightMenu" @rightHandler="headerGoHandler"></head-top> 
depart: 必传，
dest：可选，一般用于有目的地的时候
rightMenu：右边的文字，例如：反馈意见，完成等，没有就不要传
rightHandler：右边的按钮点击事件
-->