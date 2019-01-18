 <template>
    <div class="order-success">
        <head-top :depart="title" :goPage="goPage"></head-top>  
        <div class="orderSuccessInfo">
            <div class="orderLine"></div>
            <div class="tishi">
                <p class="tishi-icon"><img src="//m.lvmama.com/flight/image/returnSuccess.png"></p>
                <p class="tishi-success">支付成功</p>
                <p class="tishi-notice" v-if="!show">预计会在30分钟之内出票完成,出票成功会短信通知到您</p>
                <p class="tishi-notice" v-if="show">支付成功后，约1小时左右出票，请耐心等待</p>
                <div>
                    <span @click="orderDetailClick()" v-if="orderDetail.arrName!=null">订单详情</span>
                    <span @click="orderDetailClick()" v-if="orderDetail.arrName==null">订单列表</span>
                    <span @click="backTripClick()" v-if="orderDetail.flightTripType=='单程'">返程预订</span>
                </div>
            </div>
            <div class="theEntrance" @click="toCar">
                <div class="jsz">
                    <i></i>
                    <div>
                        <p>接送机</p>
                        <p>专车接送，伴您出行</p>
                    </div>
                </div>
            </div>
            <!-- <div class="vip">
                <div @click="showVipDetail()">
                    <div><span></span><span>驴妈妈交通VIP用户群</span></div>
                </div>    
            </div> -->
            <div class="ticket-tj" v-if="tickList!=null && tickList.length>0">最优推荐</div>
            <div class="recommend" v-for="(ticket,index) in tickList" :key="index" v-if="index<5">
                <div class="content" @click="ticketClick(ticket,index)">
                    <div class="bgImg"><img :src="ticket.imageUrl"/></div>
                    <div class="introduce">
                        <p class="destination">{{ticket.productName}}</p>
                        <p class="coupon" v-show="tickets.cashBack>0 && tickets.cashBack!=''"><span>优惠</span><span>返&#165;{{tickets.cashBack}}</span></p>
                        <p class="nocoupon" v-show="tickets.cashBack<=0 || tickets.cashBack==''"></p>
                        <p class="satisfy">{{ticket.applauseRate}}满意</p>
                        <p class="satisfy"><span>{{ticket.cityName}}</span><span>{{ticket.provinceName}}</span><span>{{ticket.star}}</span></p>
                    </div>
                    <div class="price">
                        <p><span><i>&#165;</i>{{ticket.sellPrice}}<em>起</em></span></p>
                        <!-- <p class="cost-price">&#165;{{ticket.marketPrice}}</p> -->
                        <p class="range">{{ticket.distance}}</p>
                    </div>
                </div>
            </div>
        </div>
        
        <!-- 优惠券弹框开始 -->
        <div class="showCoupon" v-show="showCoupon" >
            <div class="lvBk">
                <p>恭喜获得一张优惠券！</p>
                <div class="obtainBk">
                    <div class="left">
                        <i>&yen;</i>
                        <span>50</span>
                    </div>
                    <div class="right">
                        <p>机票满2000减50</p>
                        <p>{{endTime}}到期</p>
                    </div>
                </div>
                <div class="conponButton" @click="goHome">立即使用</div>
                <span @click="closeCoupon"></span>
            </div>
        </div>
        <!-- 优惠券弹框结束 -->

        <!-- <vip-component v-if="showVip"></vip-component> -->
        <alert-tip v-if="showAlertMessage" :tipContent="alertMessage" :leftButton="leftButton" @closeAlert="closeAlert"></alert-tip>
    </div>
</template>

<script>
    import { lQuery } from '../../plugins/lQuery'

    import headTop from '../../components/header/head'
    import alertTip from '../../components/common/alertTip'
    // import vipComponent from '../../components/common/vip-component'
    import {orderDetailHref,standardDate,isClient,getStore,setStore,removeStore,getElementTag,getRequest,getLvSessionId,getZNSource, getCookie} from '../../config/mUtils'
    import { mapActions,mapState } from 'vuex'
    import { searchTicket,orderCombinedDetail,sendCoupon,orderMainIdByorderDetail,smartRecForBigTraffic,getFlightCities,getLvUser,getLvUserByCookie,recfeedback} from '../../service/getData'
    
    export default {
        data(){
            return{
               title: '订单支付成功', 
               goPage: 'orderSuccess',
               show:false,
               orderId:'',
               orderMainId:'',
               orderDetailId:'',
               tickList:'',
               tickets:'',
               orderDetail:'',
               showVip:false,
               showCoupon:false,
               endTime:'',
                showAlertMessage: false,//弹框提示
                alertMessage: '',//弹框提示信息
                leftButton: '',
                userId:'',
                locationInfo:''
            }
        },
        props: [
            
        ],
        components: {
            headTop,
            alertTip,
            // vipComponent
        },
        created() {

        },
        mounted(){
            
        },
        methods: {
            showVipDetail(){
                this.showVip = !this.showVip;
            },
            getSearchTicketNew(code){
                let changeFlightCity=getRequest();
                let info ={};
                    info.userNo=this.userId.userId;
                    info.udid=changeFlightCity["udid"]!=null?changeFlightCity["udid"]:'';
                    info.customerId=this.userId.id;
                    info.destId=code;
                    info.channelCode='TRAFFICPAYED';
                    info.firstChannel=getZNSource();
                    info.globalLatitude=this.locationInfo!=''?this.locationInfo.latitude:'';
                    info.globalLongitude=this.locationInfo!=''?this.locationInfo.longitude:'';
                    info.recCategoryId='00';
                smartRecForBigTraffic(info).then((res)=>{
                    if (+res.code === 1) {
                        let tickets=res.data;
                        if (tickets.recommendList!=null && tickets.recommendList.length>0) {
                            for(let i=0;i<tickets.recommendList.length;i++){
                                tickets.recommendList[i].recBatchId=tickets.recBatchId;
                            }
                            this.tickList = tickets.recommendList;
                        }
                    }
                })
            },
            searchTicketMes(cityName){
                let that=this;
                getFlightCities().then((res)=>{
                    let allCities = res.data.allCitys;
                    try {
                        if(allCities.length>0){
                            for(let i=0;i<allCities.length;i++){
                                if(cityName == allCities[i].code){
                                    that.getSearchTicketNew(allCities[i].destId);
                                    break;
                                }
                            }
                        }
                    } catch (error) {
                        
                    }
                })
                // searchTicket(cityName).then((res) => {
                //     if (+res.code === 1) {
                //         let tickets=res.data;
                //         if (tickets.tickList!=null && tickets.tickList.length>0) {
                //             this.tickList = tickets.tickList;
                //         }
                //         this.tickets=tickets;
                //     }
                // })
            },
            orderDetailClick(){
                if (this.orderDetail.arrName!=null) {
                    //跳订单详情
                    if(this.orderDetailId!=''&&this.orderDetailId!=null){
                        this.$router.push('/'+this.$parent.baseUrlPath+'/orderDetail/'+this.orderMainId+'/'+this.orderDetailId);
                    }else{
                        this.$router.push('/'+this.$parent.baseUrlPath+'/orderDetail/'+this.orderMainId+'/'+this.orderId);
                    }
                    
                }else{
                    //跳订单列表
                    orderDetailHref();
                }
            },
            closeAlert(){
                this.showAlertMessage = false;
                this.alertMessage = "";
                this.leftButton="";
            },
            // 接送机跳转
            toCar(){
                getElementTag("机票_接送机","机票支付成功页");
                removeStore('isFlightSend',this);
                removeStore('isTrainSend',this);
                removeStore('locationInfo',this);
                removeStore('sendMachineArrderss',this);
                removeStore('pickUpArrderss',this);
                removeStore('sendMach',this);
                removeStore('pickUp',this);
                removeStore('takeoffCity',this);
                removeStore('LandingCity',this);
                removeStore('nowDateStamp',this);
                removeStore('theAirport',this);
                removeStore('theDeliveryStation',this);
                removeStore('thePickupStation',this);
                removeStore('chooseDate',this);
                removeStore('selectedFlight',this);
                removeStore('selectedType',this);
                removeStore('userCarInfor',this);
                if(isClient()==1) {
                    let nua=navigator.userAgent,lvves=0;
                    if(navigator.userAgent.indexOf('Android')!=-1){
                        lvves=nua.substring(nua.indexOf("LVMM/")+5,nua.lastIndexOf("(")-1);
                    }else{
                        lvves=nua.substring(nua.indexOf("LVMM/")+5,nua.length);
                    }
                    if(lvves!=null && lvves.replace(/\s/g,'').split('.')[0]>7&& (lvves.replace(/\s/g,'').split('.')[1]>0 || lvves.replace(/\s/g,'').split('.')[2]>=7)){
                        setStore("goin",'flight');
                        window.location.href="//m.lvmama.com/car/flightIndex?goin=flight&hideAppHeader=1";
                    }else{
                        this.alertMessage = "小驴提醒：您的版本较低，请将驴妈妈APP版本升级到最新版本8.0.7，即可使用接送机功能哦！";
                        this.showAlertMessage = true;
                        this.leftButton="知道了";
                    }
                } else {
                    setStore("goin",'flight');
                    window.location.href="//m.lvmama.com/car/flightIndex?goin=flight&hideAppHeader=1";
                }
            },
            //门票跳转
            ticketClick(id,index){
                let info={};
                    info.user_id=this.userId.userId;
                    info.product_id=id.productId;
                    info.scene_type='rec_traffic_pated';
                    info.device_id=getCookie('BSFIT_DEVICEID');
                    info.cid=this.userId.id;
                    info.mobile_flag=getZNSource();
                    info.rec_banner=index;
                    info.rec_batch_id=id.recBatchId;
                    info.token='F72DC6DE0E60476E98F87E3CCD5B2925';

                recfeedback(info).then((res)=>{
                    
                })
                window.location.href = id.h5DetailUrl;
                // if(isClient()==1){
                //     try {
                //         let toAPPName="TicketDetailActivity";
                //         if(getNoticeSource()=="IOS"){
                //             toAPPName="PlaceDetailViewController";
                //         }
                //         NativeUtil.lvCommon("lvJSGoClass",
                //             {
                //                 "className":toAPPName,
                //                 "productId":id
                //             }
                //         )
                //     } catch (error) {
                //         NativeUtil.goClass("Place",{"animate":"1","tabClassName":"","tabAnimate":"1","needLogin":"0"});
                //     }
                // }else{
                //     window.location.href = "//m.lvmama.com/ticket/piao-"+id+'?losc=138769';
                // }
                
            },
            //返程预订 跳转至航班列表页
            backTripClick(){
                let newTime=this.orderDetail.depTime+24*60*60*3*1000;
                let fromTime=standardDate(newTime);
                window.location.href="//m.lvmama.com/"+this.$parent.baseUrlPath+"/"+this.orderDetail.arrivalCityCode+"-"+this.orderDetail.departureCityCode+"/"+fromTime+"?losc=121179";
            },
            closeCoupon(){
                this.showCoupon = false;
            },

             //返回首页
            goHome(){
                if(isClient() == 1){
                    window.location.href = `//m.lvmama.com/${this.$parent.baseUrlPath}?method=backToAppIndex`;
                }else{
                    window.location.href = `//m.lvmama.com/${this.$parent.baseUrlPath}/`;
                }
            },
            initDetail(){
                if(this.orderId==null || this.orderId==''){
                    orderMainIdByorderDetail(this.orderMainId).then((response) => {
                        if (+response.code === 1) {
                            let orderDetail = response.data;
                            for(let i=0;i<orderDetail.length;i++){
                                if(orderDetail[i].orderType!='CTMT'&&orderDetail[i].orderType!='RTVT'){
                                    if(orderDetail[i].flightTripType=='DEPARTURE'){
                                        this.searchTicketMes(orderDetail[i].arrCityCode);
                                        break;
                                    }
                                }
                            }
                        }
                    })
                }else{
                    orderCombinedDetail(this.orderId,this.orderMainId).then((response) => {
                        if (+response.code === 1) {
                            let orderDetail = response.data;
                            this.searchTicketMes(orderDetail.arrivalCityCode);
                            if(orderDetail.saleType=='GWPolicy'||orderDetail.saleType=='OpenPlatform'||orderDetail.saleType=='Special'){
                                this.show=true;
                            }
                            this.orderDetail = orderDetail;
                            if(this.orderDetail.ctmtOrderDetails.length>0){
                                let flag=false;
                                for(let i=0;i<this.orderDetail.ctmtOrderDetails.length;i++){
                                    if(this.orderDetail.ctmtOrderDetails[i].orderId==this.orderDetail.orderId){
                                        flag=true;
                                        break;
                                    }
                                }
                                if(flag==false){
                                    this.orderDetailId="";
                                }
                            }
                        }
                    })
                }
                
                sendCoupon('10296').then((response) => {
                    let today = this.nowDateStamp;
                    let hmendTime=today+3*24*60*60*1000;
                    this.endTime=standardDate(hmendTime)
                    if(response.data.couponCode!='' && response.data.couponCode!=undefined){
                        this.showCoupon=true;
                    }
                })
            },
            
        },
        activated() {
            removeStore('goin',this);
            this.orderId=this.$route.params.orderMainId!=null?this.$route.params.orderMainId.replace(/\,/g,''):"";
            this.orderMainId=this.$route.params.orderId!=null?this.$route.params.orderId.replace(/\,/g,''):"";
            this.orderDetailId='';
            this.userId='';
            this.locationInfo='';
            if(getStore('flight_orderDetailID')!=null || getStore('flight_orderDetailID')!=""){
                this.orderDetailId=getStore('flight_orderDetailID');
            }
            removeStore("flight_orderDetailID");
            positionUtil.getLocalPosition((position) => {
                this.locationInfo=position;
            })
            if(isClient() == 1){
                this.isAPP=true;
                getLvSessionId().then((data) => {
                    if(data==null || data=="" || data==undefined){
                        return;
                    }
                    getLvUser(data).then((res) => {
                        this.$parent.showLoading = false;
                        this.userId=res.data;
                        if(res.data.userId!=null && res.data.userId!=undefined && res.data.userId!=""){
                            this.initDetail();
                        }
                    });
                },()=>{
                    this.$parent.showLoading = false;
               })
            }else{
                //wap登录
                getLvUserByCookie().then((res) => {
                    this.$parent.showLoading = false;
                    this.userId=res.data;
                    if(res.data.userId!=null && res.data.userId!=undefined && res.data.userId!=""){
                        this.initDetail();
                    }
                },()=>{
                    this.$parent.showLoading = false;
                }) 
            }
            
        },
        
        computed:{
            ...mapState([
                'nowDateStamp'
            ])
        }
    }
</script>

<style lang="scss" scoped>
    @import '../../style/mixin';
    .order-success{
        width: 100%;
        height: 100%;
        position: relative;
        .orderLine{
            @include orderlineFFF();
        }
        >.orderSuccessInfo{
            width: 100%;
            position: absolute;
            top: 0.88rem;
            left: 0;
            bottom: 0;
            -webkit-overflow-scrolling: touch;
            overflow: hidden;
            overflow-y: scroll;
            .tishi {
                @include wh(100%,5.04rem);
                font-size: .38rem;
                text-align: center;
                line-height: .86rem;
                margin-top: 0;
                padding: 0 .2rem;
                background-color: #fff;
                .tishi-icon {
                    line-height: .76rem;
                    padding: .8rem 0 .2rem;
                    img {
                        @include wh(1.1rem,1.1rem);
                    }
                }
                .tishi-success {
                    @include sc(.4rem,#333);
                    line-height: .5rem;
                }
                .tishi-notice {
                    @include sc(.26rem,#666);
                    line-height: .5rem;
                    margin-top: .15rem;
                }
                >div{
                    padding: 0;
                    margin-top: .4rem;
                    >span {
                        @include wh(3.3rem,.6rem);
                        line-height: .6rem;
                        display: inline-block;
                        border: 1px solid #999;
                       @include sc(.26rem,#999);
                        border-radius: 100px;
                    }
                    >span:first-child{
                        margin-right: 0.12rem;
                    }
                    >span:last-child{
                        margin-left: 0.12rem;
                    }
                }
            }
            .theEntrance{
                @include wh(100%,1.2rem);
                @include borderRadius(0.08rem);
                @include sc(0,#333);
                background-color: #fff;
                position: relative;
                margin-top: .2rem;
                .jsz{
                    width: 50%;
                    display: inline-block;
                    font-size: .3rem;
                    position: relative;
                    height: 100%;
                    >i{
                        @include wh(0.54rem,0.5rem);
                        @include ct;
                        display: inline-block;
                        left: .3rem;
                        background: url("//m.lvmama.com/flight/image/jsj.png") no-repeat center;
                        background-size: 100%;
                    }
                    >div {
                        @include ct;
                        margin-left: 1.2rem;
                        display: inline-block;
                        >p:nth-of-type(2) {
                            @include sc(.22rem,#999);
                        }
                    }
                }
            }
        }
        
        .vip{
            padding: 0 .1rem;
            margin-top: .2rem;
            >div{
                background-color: #fff;
                border-radius: .1rem;
                >div{
                    width: 100%;
                    line-height: .9rem;
                    font-size: .28rem;
                    color: #000;
                    padding-left: .2rem;
                    position: relative;
                    >span:first-child{
                        display: inline-block;
                        width: .38rem;
                        height: .38rem;
                        background: url('//m.lvmama.com/flight/image/qq_icon.png') no-repeat;
                        background-size: .38rem;
                        position: relative;
                        top: .1rem;
                    }
                    >span:last-child{
                        padding-left: .1rem;
                    }
                }
                >div:after {
                    content: "";
                    position: absolute;
                    right: .4rem;
                    top: .32rem;
                    width: .2rem;
                    height: .2rem;
                    border-bottom: 1px solid #666;
                    border-right: 1px solid #666;
                    transform: rotate(-45deg);
                    -webkit-transform: rotate(-45deg);
                }
            }
        }
        .ticket-tj {
            padding: 0 .3rem;
            @include sc(.24rem,#666);
            margin-top: .2rem;
        }
        .recommend:first-child{
            border-top: 0px #E4E4E4 solid;
        }
        .recommend {
            position: relative;
            width: 100%;
            height: 2rem;
            margin-top: .2rem;
            border-top: 1px #E4E4E4 solid;
            >div{
                padding: .3rem;
                background-color: #fff;
                .bgImg{
                    img{
                        @include wh(1.9rem,1.6rem);
                    }
                }
                .introduce {
                    position: absolute;
                    top: .25rem;
                    left: 2.4rem;
                    width: 4.5rem;
                    .destination {
                        @include sc(.28rem,#333);
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                        width: 100%;
                    }
                    .coupon {
                        padding: .08rem 0;
                        >span{
                            display: inline-block;
                            @include wh(.52rem,.34rem);
                            @include sc(.2rem,#FF8800);
                            line-height: .34rem;
                            border: 1px solid #FFB92B;
                            text-align: center;
                        }
                        >span:last-child {
                            width: .8rem;
                            margin-left: .1rem;
                        }
                    }
                    .nocoupon{
                        width: 0.8rem;
                        height: 0.36rem;
                        background: #fff;
                        margin: 0.1rem 0;
                    }
                    .satisfy {
                        @include sc(.24rem,#666);
                        margin-top: .05rem;
                        >span {
                            padding-right: .1rem;
                            @include sc(.24rem,#999);
                        }
                    }
                }
                .price {
                    position: absolute;
                    top: .6rem;
                    right: .3rem;
                    >p>span {
                        font-size: .40rem;
                        color: #FF6600;
                        display: inherit;
                        text-align: right;
                        >i {
                            font-size: .24rem;
                            color: #FF6600;
                        }
                        >em {
                            font-size: .22rem;
                            color: #999;
                            padding-left: .04rem;
                        }
                    }
                    .cost-price {
                        font-size: .20rem;
                        color: #ccc;
                        text-decoration: line-through;
                        text-align: right;
                        padding: .04rem 0;
                    }
                    .range {
                        font-size: .24rem;
                        color: #aaa;
                        text-align: right;
                    }
                }
            }
        }
        .showCoupon{
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,.5);
            position: absolute;
            left: 0;
            top: 0;
            z-index: 101;
            >div{
                width: 7.12rem;
                height: 10.16rem;
                background: url('//m.lvmama.com/flight/image/new_lv.png') no-repeat;
                background-size: cover;
                position: absolute;
                top: 30%;
                left: 50%;
                transform: translate(-50%,-50%);
                >p{
                    color: #fff;
                    position: absolute;
                    top: 56%;
                    right: 23%;
                    font-size: .32rem;
                    font-weight: 600;
                }
                .obtainBk {
                    width: 5.6rem;
                    height: 1.54rem;
                    background: url('//m.lvmama.com/flight/image/couponBk.png') no-repeat;
                    position: absolute;
                    top: 63%;
                    left: 51%;
                    transform: translateX(-50%);
                    background-size: 100% 100%;
                    >div{
                        position: absolute;
                        left: 4%;
                        top: 50%;
                        transform: translateY(-50%);
                    }
                    >.right {
                        left: 39%;
                        p:nth-child(1) {
                            font-size: .26rem;
                            color: #333;
                            font-weight: 600;
                        }
                        p:nth-child(2) {
                            font-size: .26rem;
                            color: #666;
                        }
                    }
                    >.left{
                        i {
                            font-size: .28rem;
                            color: #ef3617;
                        }
                        span {
                            font-size: .44rem;
                            color: #ef3617;
                            font-weight: 600;
                        }
                    }
                }
                .conponButton {
                    width: 3.24rem;
                    height: .97rem;
                    background: #FFD800;
                    position: absolute;
                    bottom: 10.5%;
                    left: 48.5%;
                    transform: translateX(-50%);
                    border-radius: .1rem;
                    line-height: .97rem;
                    text-align: center;
                    color: #7d4f00;
                    font-weight: 600;
                    font-size: .32rem;
                }
                >span {
                    display: inline-block;
                    width: .56rem;
                    height: .56rem;
                    background: url('//m.lvmama.com/flight/image/couponClosed.png') no-repeat;
                    position: absolute;
                    left: 46%;
                    bottom: -10%;
                    background-size: 100% 100%;
                }
            }
        }
    }
</style>
