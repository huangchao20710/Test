<template>
    <div class="homeCompo">
        <div class="special_container">
            <div @click="toCar">
                <span></span>
                <span>接送机</span>
                <i></i>
            </div>
            <div @click="toVIPlounge">
                <span class="gbs"></span>
                <span>贵宾室</span>
                <i></i>
            </div>
            <div @click="toFlightShare">
                <span class="fxdjIcon"></span>
                <span class="fxdj">发现低价</span>
                <i></i>
            </div>
            <div @click="toCarTranvel">
                <span class="xqdjIcon"></span>
                <span class="fxdj">出行定制</span>
                <em class="is_new"></em>
            </div>
        </div>
        <div class="lv_logo_container xy_flex" >
            <div @click="showQueryWords"></div>
        </div>
        <div class="query_word_mask" v-if="isShowQueryWords" @click="hideQueryWords">
            <div class="query_word_container">
                <span class="bk_icon">
                    <i></i>
                </span>
                <div class="query_word_title xy_flex">
                    <div></div>
                </div>
                <div class="query_word_item">
                    <div class="y_flex">
                        <span class="query_word_icon"></span>
                        出行保障
                    </div>
                    <div>客人出票后若因驴妈妈或供应商原因无法乘机，保障赔付</div>
                </div>
                <div class="query_word_item">
                    <div class="y_flex">
                        <span class="query_word_icon"></span>
                        航协认证
                    </div>
                    <div>100%航空运输协会认证资格</div>
                </div>
                <div class="query_word_item">
                    <div class="y_flex">
                        <span class="query_word_icon"></span>
                        500万+用户的选择
                    </div>
                    <div>迄今服务过500万+的用户，获得良好的口碑</div>
                </div>
                <div class="query_word_item">
                    <div class="y_flex">
                        <span class="query_word_icon"></span>
                        24小时服务
                    </div>
                    <div>24小时客服热线，机票业务人员24小时配合处理相关问题</div>
                </div>
                <div class="query_word_item">
                    <div class="y_flex">
                        <span class="query_word_icon"></span>
                        标准退改
                    </div>
                    <div>严格按照航空公司标准办理退改签，不擅收任何差价</div>
                </div>
                <div class="query_word_item">
                    <div class="y_flex">
                        <span class="query_word_icon"></span>
                        保险护航
                    </div>
                    <div>多样险种，为您保驾护航</div>
                </div>
            </div>
        </div>
        <div class="alet_container" v-show="showAlertMessage">
            <div class="tip_text_container">
                <div class="tip_text xy_flex">小驴提醒：您的版本较低，请将驴妈妈APP版本升级到最新版本8.0.7，即可使用接送机功能哦！</div>
                <div class="click_button_double y_flex click_button_single">
                    <div class="xy_flex" @click="closeTip">知道了</div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import { lQuery } from '../../plugins/lQuery'
    import {getElementTag,isClient} from '../../config/mUtils'
    export default {
        data(){
            return{
                isShowQueryWords: false,
                showAlertMessage: false,
            }
        },
        props: {
            
        },
        components: {
            
        },
        created() {

        },
        mounted(){
            
        },
        methods: {
            showQueryWords() {
                this.isShowQueryWords = true;
            },
            hideQueryWords() {
                this.isShowQueryWords = false;
            },
            toCar(){
                getElementTag("机票_机票首页_接送机","机票频道页");
                localStorage.removeItem('isFlightSend');
                localStorage.removeItem('isTrainSend');
                localStorage.removeItem('locationInfo');
                localStorage.removeItem('sendMachineArrderss');
                localStorage.removeItem('pickUpArrderss');
                localStorage.removeItem('sendMach');
                localStorage.removeItem('pickUp');
                localStorage.removeItem('takeoffCity');
                localStorage.removeItem('LandingCity');
                localStorage.removeItem('nowDateStamp');
                localStorage.removeItem('theAirport');
                localStorage.removeItem('theDeliveryStation');
                localStorage.removeItem('thePickupStation');
                localStorage.removeItem('chooseDate');
                localStorage.removeItem('selectedFlight');
                localStorage.removeItem('selectedType');
                localStorage.removeItem('userCarInfor');
                if(isClient()==1) {
                    let nua=navigator.userAgent,lvves=0;
                    if(navigator.userAgent.indexOf('Android')!=-1){
                        lvves=nua.substring(nua.indexOf("LVMM/")+5,nua.lastIndexOf("(")-1);
                    }else{
                        lvves=nua.substring(nua.indexOf("LVMM/")+5,nua.length);
                    }
                    if(lvves!=null && lvves.replace(/\s/g,'').split('.')[0]>7&& (lvves.replace(/\s/g,'').split('.')[1]>0 || lvves.replace(/\s/g,'').split('.')[2]>=7)){
                        localStorage.setItem("goin",'flight');
                        window.location.href="//m.lvmama.com/car/flightIndex?goin=flight&hideAppHeader=1";
                    }else{
                        this.showAlertMessage = true;
                    }
                } else {
                    localStorage.setItem("goin",'flight');
                    window.location.href="//m.lvmama.com/car/flightIndex?goin=flight&hideAppHeader=1";
                }
            },
            toVIPlounge(){
                getElementTag("机票_机票首页_贵宾室","机票频道页");
                if(isClient()==1) {
                    let nua=navigator.userAgent,lvves=0;
                    if(navigator.userAgent.indexOf('Android')!=-1){
                        lvves=nua.substring(nua.indexOf("LVMM/")+5,nua.lastIndexOf("(")-1);
                    }else{
                        lvves=nua.substring(nua.indexOf("LVMM/")+5,nua.length);
                    }
                    if(lvves!=null && lvves.replace(/\s/g,'').split('.')[0]>7&&(lvves.replace(/\s/g,'').split('.')[1]>0 || lvves.replace(/\s/g,'').split('.')[2]>=8)){
                    localStorage.setItem("goin",'flight');
                    window.location.href="//m.lvmama.com/VIPlounge/?goin=flight&hideAppHeader=1";
                    }else{
                        this.showAlertMessage = true;
                    }
                } else {
                    localStorage.setItem("goin",'flight');
                    window.location.href="//m.lvmama.com/VIPlounge/?goin=flight&hideAppHeader=1";
                }
            },
            toFlightShare(){
                getElementTag("机票_机票首页_特价机票","机票频道页");
                localStorage.setItem("homeTo","1");
                window.location.href="//m.lvmama.com/flight/flightShare";
                localStorage.setItem("formHome","1");
            },
            toCarTranvel(){
                getElementTag("品类首页引入","需求单填写页");
                localStorage.setItem("goin",'flight');
                window.location.href="//m.lvmama.com/car/TravelDemand/flight/?goin=flight&hideAppHeader=1";
            },
            closeTip(){
                 this.showAlertMessage = true;
            }
        },
        activated() {
            localStorage.removeItem("toPage");
            localStorage.removeItem("formHome");
            localStorage.removeItem("homeTo");
            localStorage.removeItem('getUrl');
            localStorage.removeItem('departureAirportCode');//起飞时间
            localStorage.removeItem('departureAirportName');//出发机场
            localStorage.removeItem('arrivalAirportName');//到达机场
            localStorage.removeItem('AirModels');//机型
            localStorage.removeItem('seatClassType');//舱位
            localStorage.removeItem('carrierName');//航司
            localStorage.removeItem("isScrollTop");
            localStorage.removeItem("sureBack");
            localStorage.removeItem("backHome");//是否从舱位页过来
            localStorage.removeItem("goFlight");//跳转航班列表页标记
            localStorage.removeItem("worthCoupons");
            localStorage.removeItem('remindFrom');
            localStorage.removeItem("isSelectFCity");//清空勾选城市的标记
            localStorage.removeItem("isSelectTCity");//清空勾选城市的标记
            localStorage.removeItem("selectDay");//清空勾选日期的标记
            localStorage.removeItem("invincibleList");
            localStorage.removeItem("rightInsurance");
            localStorage.removeItem("trafficTransfer");
            localStorage.removeItem("airportVipLounge");
            localStorage.removeItem("goin");
            localStorage.removeItem("flightRopRequest");
        }
    }
</script>

<style scoped>

    .special_container{
        width:100%;
        height: 73px;
        background-color: #FFF;
        position: relative;
        font-size: 0;
        margin: 10px 0 15px;
    }
    .special_container>div{
        width:25%;
        height: 73px;
        display: inline-block;
        font-size: 14px;
        text-align: center;
        position: relative;
    }
    .special_container>div>span:first-child{
        width:21px;
        height: 16px;
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        -webkit-transform: translateX(-50%);
        top:30%;
        background: url('//m.lvmama.com/flight/image/jsj.png') no-repeat;
        background-size: 100%;                    
    }
    .special_container>div>span.gbs:first-child{
        background: url('//m.lvmama.com/flight/image/gbs.png') no-repeat;
        background-size: 100%;
    }
    .special_container>div>span.fxdjIcon:first-child{
        background: url('//m.lvmama.com/flight/image/fxdj.png') no-repeat;
        background-size: 100%;
    }
    .special_container>div>span.xqdjIcon:first-child{
        background: url('//m.lvmama.com/flight/image/is_travel.png') no-repeat;
        background-size: 100%;
    }
    .special_container>div>span:nth-of-type(2){
        display: block;
        margin-top: 42px;
        font-size:12px;
        color:#666666;
    }
    .special_container>div .is_new{
        display: block;
        width:25px;
        height: 12px;
        background: url('//m.lvmama.com/flight/image/new.png') no-repeat;
        background-size: 100% 100%;
        position: absolute;
        right: 14%;
        top: 20%;
    }
    .special_container>div>i{
        width:1px;
        height: 20px;
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        -webkit-transform: translateY(-50%);
        background: url('//m.lvmama.com/flight/image/passerLine.png') no-repeat;
        background-size: 100%;
        right: 0;
    }
    .lv_logo_container {
        width: 100%;
        height: 35px;
    }
    .lv_logo_container> div {
        width:150px;
        height: inherit;
        background: url('//m.lvmama.com/flight/image/lvtu.png') no-repeat;
        background-size: 100% 100%;
    }
    .lv_logo_container.mt4{
        margin-top: 20px;
    }

    .query_word_mask {
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,.6);
        position: absolute;
        top: 0;
        left: 0;
        z-index: 5;
    }
    .query_word_container {
        width: 100%;
        height: auto;
        padding: 0 20px;
        box-sizing: border-box;
        position: absolute;
        left:50%;
        bottom:0;
        transform: translateX(-50%);
        background: #fff;
        border-radius: 5px 5px 0 0;
    }
    .bk_icon{
        display: inline-block;
        width: 100%;
        height: 83px;
        background: url('//m.lvmama.com/flight/image/background_icon.png') no-repeat;
        background-size: 100% 100%;
        position: absolute;
        left: 0;
    }
    .bk_icon i{
        display: inline-block;
        width: 16px;
        height: 16px;
        background: url('//m.lvmama.com/flight/image/closeIcon.png') no-repeat;
        background-size: 100% 100%;
        position: absolute;
        right: 10px;
        top: 24%;
    }
    .query_word_title {
        padding: 17px 0;
    }
    .query_word_title div {
        width: 250px;
        height: 30px;
        background: url('//m.lvmama.com/flight/image/select.png') no-repeat;
        background-size: 100% 100%;
    }
    .query_word_item{
        font-size: 14px;
    }
    .query_word_item> div:first-child {
        font-size:14px;
        color:#333333;
        margin-top: 10px;
        margin-bottom: 5px;
        font-weight: 600;
    }
    .query_word_icon {
        width: 4px;
        height: 4px;
        background:#666666;
        border-radius: 50%;
        margin-right: 5px;
    }
    .query_word_item:last-child{
        margin-bottom: 20px;
    }
    .alet_container{
    	position: absolute;
    	top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 100;
        background: rgba(0,0,0,.6);
    }
    .tip_text_container{
        position: absolute;
        top: 50%;
        left: 50%;
        -webkit-transform: translate(-50%, -50%);
        transform: translate(-50%, -50%);
        width: 5.4rem;
        height: auto;
        background: #fff;
        -webkit-border-radius: 14px;
        -moz-border-radius: 14px;
        -ms-border-radius: 14px;
        -o-border-radius: 14px;
        border-radius: 14px;
    }
    .tip_text {
        line-height: 25px;
        padding: 15px 10px 15px;
        box-sizing: border-box;
        color: #666;
        text-align: center;
    }
    .click_button_double {
        width: 100%;
        height: 45px;
        font-size: 16px;
        border-top: 1px solid #ddd;
    }
    .click_button_single > div {
        width:100%;
        height: inherit;
        color: #FF8800 !important;
        border-right: none;
    }
</style>