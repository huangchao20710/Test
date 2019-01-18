<template>
    <div class="home_container">
        <div class="home_swiper_container">
            <home-swiper></home-swiper>
            <div class="back_icon" @click="goBack"></div>
            <!-- <div class="index_icon" v-if="!app" @click="goIndex"></div> -->
            <!-- <div class="index_icon" @click="toFeedBack"></div> -->
            <div class="lvmama_ad_icon"></div>
        </div>
        <div class="notice_container" v-show="noticeArr!='' && noticeArr.length>0">
            <notice-swiper :noticeArr="noticeArr"></notice-swiper>
        </div>
        <div class="home_choice_container margin" :class="{'topone':!(noticeArr!='' && noticeArr.length>0)}">
            <div class="y_flex trip_kind_container">
                <div class="singleTrip xy_flex" @click="clickSingleTrip" :class="isDouble?'active':''">单程<i v-if="!isDouble"></i></div>
                <div class="doubleTrip xy_flex" @click="clickDoubleFlight" :class="!isDouble?'active':''">往返<i v-if="isDouble"></i></div>
            </div>
            <div class="pick_city_container y_flex">
                <div class="y_flex">
                    <router-link to="/flight/cityPicker/departureCity/index" class="city_item y_flex" :class="isChangeCity ? 'left_to_right' : ''">{{showDepartureCity.name}}</router-link>
                </div>
                <div class="trip_kind_change_container xy_flex">
                    <div @click="changeCity">
                        <div class="plane_icon"></div>
                        <div class="rotate_icon"></div>
                    </div>
                </div>
                <div class="y_flex right_flex">
                    <router-link to="/flight/cityPicker/arrivalCity/index" class="city_item y_flex right_flex" :class="isChangeCity ? 'right_to_left' : ''">{{showArrivalCity.name}}</router-link>
                </div>
            </div>
            <div class="pick_date_container y_flex">
                <div :class="{'width100':!isDouble}">
                    <router-link class="date_item" to='/flight/datePicker/departDate/home'>
                        <span class="date">{{showDepartDate.month | addZero}}-{{showDepartDate.date | addZero}}</span>
                        <span class="week">{{showDepartDate.day}}</span>
                    </router-link>
                </div>
                <transition name="slide-date">
                    <div class="back_date_container" v-show="isDouble">
                        <router-link class="date_item" to='/flight/datePicker/backDate/home'>
                            <span class="date">{{showBackDate.month | addZero}}-{{showBackDate.date | addZero}}</span>
                            <span class="week">{{showBackDate.day}}</span>
                        </router-link>
                    </div>
                </transition>
            </div>
            <div class="search_botton_container">
                <div class="search_botton xy_flex" @click="toFlightList">
                    <div class="y_flex">
                        <div class="search_icon"></div>搜索
                    </div>
                </div>
            </div>
            <div class="history_container" v-if="tempHistoryArr.length > 0">
                <div class="history_view">
                    <ul id="history_scroll_wrap" class="history_scroll_wrap y_flex">
                        <li class="clcok_icon">
                            <em></em>
                        </li>
                        <li class="history_item y_flex" v-for="(item,index) in tempHistoryArr" @click="chooseHistory(item)">
                            <p class="ellipsis y_flex">{{item.departureCity.name}}</p>
                            <span class="history_trip_kind_icon xy_flex" :class="{'double': item.double}"></span>
                            <p class="ellipsis y_flex">{{item.arrivalCity.name}}</p>
                        </li>
                        <li v-if="tempHistoryArr.length > 0" class="history_item y_flex" @click="clearHistory">清除历史</li>
                    </ul>
                </div>
            </div>
        </div>

        <!-- <div class="special_flight_price_container" @click="toFlightShare">
            <div class="special_flight_price_wrap margin y_flex between_x_flex">
                <div class="y_flex">
                    <div class="flight_icon"></div>
                    <div class="flight_name">国内特价</div>
                    <span class="price_low" v-if="allCityLowPrice!=''&&allCityLowPrice!=null">{{allCityLowPrice}}元起</span>
                    <span class="price_low" v-if="allCityLowPrice==''||allCityLowPrice==null">199元起</span>
                </div>
                <div class="y_flex">
                    <div class="point_right_name">特价机票，有你想要</div>
                    <div class="point_right_arrow"></div>
                </div>
            </div>
        </div> -->
        <div class="special_container" v-if="!businessTravel">
            <div @click="toCar">
                <span></span>
                <span>接送机</span>
                <i></i>
            </div>
            <!-- <div @click="toVIPlounge">
                <span class="gbs"></span>
                <span>贵宾室</span>
                <i></i>
            </div> -->
            <div @click="toGNY">
                <span class="gny"></span>
                <span>国内游</span>
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
            <div @click="showQueryWords" :class="businessTravel?'mt4':''"></div>
        </div>
        <div class="home_bottom_container y_flex">
            <!-- <div class="xy_flex">
                <div class="home_bottom_menu_item" @click="toFeedBack"><img src="//m.lvmama.com/flight/image/footIcon1.png" alt=""></div>
            </div> -->
            <!-- <div class="xy_flex">
                <div class="home_bottom_menu_item" @click="toCouponClick"><img src="//m.lvmama.com/flight/image/footIcon2.png" alt=""></div><i class="going"></i>
            </div> -->
            <div class="xy_flex">
                <div class="home_bottom_menu_item" @click="toTravelHelper"><img src="//m.lvmama.com/flight/image/footIcon4.png" alt=""></div>
            </div>
            <div class="xy_flex">
                <div class="home_bottom_menu_item" @click="toFeedBack"><img src="//m.lvmama.com/flight/image/foot_fade.jpg" alt=""></div>
            </div>
             <div class="xy_flex">
                <div class="home_bottom_menu_item" @click="toLowNotice"><img src="//m.lvmama.com/flight/image/low_price_clock.png" alt=""></div>
            </div>
            <div class="xy_flex">
                <div class="home_bottom_menu_item" @click="toOrderList"><img src="//m.lvmama.com/flight/image/footIcon3.png" alt=""></div>
            </div>
        </div>
        <div class="red_package_container" v-if="couponShow && !businessTravel" @click="showCoupon">
            <span>￥{{queryTotalAmount}}</span>
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
        <noticeswiper-detail v-if="noticeDetail!=''"></noticeswiper-detail>
        <div class="transAlert" @click="closedCoupon"  v-if="showContent">
            <div class="envelopeAlert">
                <p v-if="queryAmount!=''&&queryAmount!=null&&(twoAmount==''||twoAmount==null)">您有一张优惠券可使用！</p>
                <p v-if="queryAmount!=''&&queryAmount!=null&&twoAmount!=''&&twoAmount!=null">您有两张优惠券可使用！</p>
                <div>
                    <div class="Amount">
                        <i>￥</i>
                        <span>{{queryAmount}}</span>
                    </div>
                    <div class="envelopeInfor">
                        <span>{{firstName}}</span>
                        <span>{{fistEndTime.substring(0,10)}}</span>
                    </div>
                </div>
                <div v-bind:class="{'AmountCard':twoAmount!=''&&twoAmount!=null}" v-if="twoAmount!=''&&twoAmount!=null">
                    <div class="Amount">
                        <i>￥</i>
                        <span>{{twoAmount}}</span>
                    </div>
                    <div class="envelopeInfor">
                        <span>{{twoName}}</span>
                        <span>{{twoEndTime.substring(0,10)}}</span>
                    </div>
                </div>
            </div>
            <span></span>
        </div>
        <alert-tip v-if="showAlertMessage" :tipContent="alertMessage" :leftButton="leftButton" @closeAlert="closeAlert"></alert-tip>
    </div>
</template>

<script>
import { lQuery } from '../../plugins/lQuery'

import { getStatisticsType,getElementTag,getStore,setStore,removeStore,weekFormat,isClient,orderDetailHref,animate,getRequest,monthFormat,addZero,formatIOSDate,getLvSessionId,getNoticeSource } from '../../config/mUtils'

import { mapActions,mapState } from 'vuex'

import homeSwiper from '../../components/common/home-swiper-component'
import noticeSwiper from '../../components/common/notice-swiper-component'
import alertTip from '../../components/common/alertTip'
import noticeswiperDetail from '../../components/common/notice-swiper-detail'

import { getNotice } from '../../service/getData'

import { getInsurance,getLowestPriceForFlight,getLvUser,getLvUserByCookie,getCouponListOld,getFlightCities,LowSubscription } from '../../service/getData'

export default {
    data(){
        return{
            showDepartDate: '',//展示的出发时间
            showBackDate: '',//展示的返程时间
            showDepartureCity: '',//展示的出发城市
            showArrivalCity: '',//展示的到达城市
            rotateNum: 1,//旋转圈数
            isChangeCity: false,//是否交换出发城市
            noticeArr: '',
            isShowQueryWords: false,
            tempHistoryArr: [],//临时搜索记录
            backTrip:false,
            queryCoupon:[],//优惠券
            queryTotalAmount:'',//优惠券总额
            firstName:'',
            fistEndTime:'',
            twoName:'',
            twoEndTime:'',
            queryAmount:'',
            twoAmount:'',
            couponShow:false,
            showContent:false,
            showAlertMessage: false,//弹框提示
            alertMessage: '',//弹框提示信息
            leftButton: '',
            app:true,//是否为app端
        }
    },
    components:{
        homeSwiper,
        noticeSwiper,
        alertTip,
        noticeswiperDetail
    },
    created() {
        removeStore('getUrl',this);
        removeStore('departureAirportCode',this);//起飞时间
        removeStore('departureAirportName',this);//出发机场
        removeStore('arrivalAirportName',this);//到达机场
        removeStore('AirModels',this);//机型
        removeStore('seatClassType',this);//舱位
        removeStore('carrierName',this);//航司
        removeStore("toPage",this);
        removeStore("formHome",this);
        removeStore("homeTo",this);
        removeStore("backHome",this);//是否从舱位页过来
        removeStore("goFlight",this);//跳转航班列表页标记
        removeStore("sureBack",this);
        removeStore("worthCoupons",this);
        removeStore("isSelectFCity");//清空勾选城市的标记
        removeStore("isSelectTCity");//清空勾选城市的标记
        removeStore("selectDay");//清空勾选日期的标记
        removeStore("invincibleList",this);
        removeStore("rightInsurance",this);
        removeStore("trafficTransfer",this);
        removeStore("airportVipLounge",this);
        removeStore("goin");
        removeStore("iFlightJumpType");
        removeStore("iFlightClick");
        //初始化出发日期，如果有缓存，拿缓存，下面初始化返程时间同理
        // if (this.departDate == '') {
            if (getStore('departDate')) {
                let sotreDate = JSON.parse(getStore('departDate'));
                let obj = {
                    key: 'departDate',
                    val: ''
                }
                if (+this.nowDateStamp > +new Date(`${sotreDate.year}/${sotreDate.month}/${sotreDate.date}`).getTime()) {
                    let tomorrow = new Date(+this.nowDateStamp + 24 * 60 * 60 * 1000);
                    obj.val = {
                        year: tomorrow.getFullYear(),
                        month: tomorrow.getMonth() + 1,
                        date: tomorrow.getDate(),
                        day: weekFormat(tomorrow.getDay())
                    }
                    // console.log(obj.val)
                } else {
                    obj.val = sotreDate;
                }
                try{
                    this.initData(obj);
                }catch(e){}
            } else {
                let tomorrow = new Date(+this.nowDateStamp + 24 * 60 * 60 * 1000);
                let tomorrowObj = {
                    year: tomorrow.getFullYear(),
                    month: tomorrow.getMonth() + 1,
                    date: tomorrow.getDate(),
                    day: weekFormat(tomorrow.getDay())
                }
                let obj = {
                    key: 'departDate',
                    val: tomorrowObj
                }
                try{
                    this.initData(obj);
                }catch(e){}
            };
        // };
        if (this.backDate == '') {
            if (getStore('backDate')) {
                let departDate = JSON.parse(getStore('departDate')),
                    backDate = JSON.parse(getStore('backDate'));
                let departDateStamp = new Date(`${departDate.year}/${departDate.month}/${departDate.date}`).getTime(),
                    backDateStamp = new Date(`${backDate.year}/${backDate.month}/${backDate.date}`).getTime();
                if (backDateStamp < departDateStamp) {
                    let turnBack = new Date(+departDateStamp + 3 * 24 * 60 * 60 * 1000);
                    let backObj = {
                        year: turnBack.getFullYear(),
                        month: turnBack.getMonth() + 1,
                        date: turnBack.getDate(),
                        day: weekFormat(turnBack.getDay())
                    }
                    let obj = {
                        key: 'backDate',
                        val: backObj
                    }
                    try{
                        this.initData(obj);
                    }catch(e){}
                } else {
                    let obj = {
                        key: 'backDate',
                        val: JSON.parse(getStore('backDate'))
                    }
                    try{
                        this.initData(obj);
                    }catch(e){}
                }

            } else {
                let turnBack = new Date(+this.nowDateStamp + 3 * 24 * 60 * 60 * 1000);
                let backObj = {
                    year: turnBack.getFullYear(),
                    month: turnBack.getMonth() + 1,
                    date: turnBack.getDate(),
                    day: weekFormat(turnBack.getDay())
                }
                let obj = {
                    key: 'backDate',
                    val: backObj
                }
                try{
                    this.initData(obj);
                }catch(e){}
            }
        };
        if (getStore('departureCity')) {
            let obj = {
                key: 'departureCity',
                val: JSON.parse(getStore('departureCity'))
            };
            try{
                this.initData(obj);
            }catch(e){}
        } else {
            
        };
        if (getStore('arrivalCity')) {
            let obj = {
                key: 'arrivalCity',
                val: JSON.parse(getStore('arrivalCity'))
            };
            try{
                this.initData(obj);
            }catch(e){}
        };
        positionUtil.getLocalPosition((position) => {
            console.log(position)
            let locationObj = {
                key: 'locationInfo',
                val: position
            };
            try{
                this.initData(locationObj);
            }catch(e){}
        })
    },
    mounted(){
        
    },
    activated(){
        console.log("log");
        let changeFlightCity=getRequest();
        //分销wap调起APP
        if(location.search!="") {
            if (location.href.indexOf('themeactivity')!=-1 &&  changeFlightCity["cpsId"]!=null &&  changeFlightCity["cpsId"]!='') {
                document.cookie = "cpsId=" +  changeFlightCity["cpsId"] + ";path=/;domain=.lvmama.com";
            } else if ( changeFlightCity["callLvAPP"] == 1 && getCookie("cpsId") != null && getCookie("cpsId") != '') {
                if(isClient()!=1){
                    location.href = "lvmama://m.lvmama.com/flight/?themeactivity&cpsId=" + getCookie("cpsId");
                }
            }
        }
        // 改变目的地
        if(changeFlightCity["dest"]!=null&&(changeFlightCity["destCode"]!=null || changeFlightCity["destcode"]!=null)){
            let arrivalObj = {
                key: 'arrivalCity',
                val:{
                    name:getRequest().dest,
                    code:getRequest().destCode || getRequest().destcode
                }
            };
                try{
                    this.initData(arrivalObj);
                }catch(e){}
        }
        // 改变出发地
        if(changeFlightCity["depart"]!=null&&(changeFlightCity["departCode"]!=null || changeFlightCity["departcode"]!=null)){
            let departObj = {
                key: 'departureCity',
                val:{
                    name:getRequest().depart,
                    code:getRequest().departCode || getRequest().departcode
                }
            };
                try{
                    this.initData(departObj);
                }catch(e){}
        }
        //改变单程往返
        if(changeFlightCity["doubleTrip"]!=null){
            let isDouble=changeFlightCity["doubleTrip"];
            changeFlightCity["doubleTrip"]=="true"?isDouble=true:isDouble=false;
            let obj = {
                key: 'isDouble',
                val: isDouble
            };
                try{
                    this.initData(obj);
                }catch(e){}
        }
        //单程往返时间
        if(changeFlightCity["goTripDate"]!=null){
            let goTripDate= changeFlightCity["goTripDate"];
            let obj = {
              year: goTripDate.substring(0,4),
              month: goTripDate.substring(5,7),
              date: goTripDate.substring(8,10),
              day: weekFormat(new Date(formatIOSDate(goTripDate)).getDay())
            }
            if(goTripDate.substring(5,6)==0){
                obj.month=goTripDate.substring(6,7)
            }
            if(goTripDate.substring(8,9)==0){
                obj.date=goTripDate.substring(9,10)
            }
            let departDate = {
              key: 'departDate',
              val: obj
           }
            try {
                this.initData(departDate);
             }catch(e){}
        }
        if(changeFlightCity["backTripDate"]!=null){
            let backTripDate= changeFlightCity["backTripDate"];
            let obj = {
              year: backTripDate.substring(0,4),
              month: backTripDate.substring(5,7),
              date: backTripDate.substring(8,10),
              day: weekFormat(new Date(formatIOSDate(backTripDate)).getDay())
            }
            if(backTripDate.substring(5,6)==0){
                obj.month=backTripDate.substring(6,7)
            }
            if(backTripDate.substring(8,9)==0){
                obj.date=backTripDate.substring(9,10)
            }
            let backDate = {
              key: 'backDate',
              val: obj
           }
                try{
                    this.initData(backDate);
                }catch(e){}
        }
        if(changeFlightCity["firstChannel"]!=null){
            var ropRequest={};
            ropRequest.mobileBrand=changeFlightCity["firstChannel"];
            ropRequest.idfa=changeFlightCity["lvidfa"];
            ropRequest.idfaappVersion=changeFlightCity["lvversion"];
            ropRequest.idfaSource='';
            ropRequest.idfaSourceRemark='';
            ropRequest.activeTime=changeFlightCity["clientTimestamp"];
            ropRequest.uuid=changeFlightCity["udid"];
            setStore("flightRopRequest",ropRequest);
        }else{
            removeStore("flightRopRequest");
        }


        if (this.isDouble == '') {
            let obj = {
                key: 'isDouble',
                val: false
            };
                try{
                    this.initData(obj);
                }catch(e){}
        }
        let goFlightList = {
            key: 'goFlightList',
            val: true
        }
            try{
                this.initData(goFlightList);
            }catch(e){}
        removeStore("toPage",this);
        removeStore("formHome",this);
        removeStore("homeTo",this);
        removeStore('getUrl',this);
        removeStore('departureAirportCode',this);//起飞时间
        removeStore('departureAirportName',this);//出发机场
        removeStore('arrivalAirportName',this);//到达机场
        removeStore('AirModels',this);//机型
        removeStore('seatClassType',this);//舱位
        removeStore('carrierName',this);//航司
        removeStore("isScrollTop",this);
        removeStore("sureBack",this);
        removeStore("backHome",this);//是否从舱位页过来
        removeStore("goFlight",this);//跳转航班列表页标记
        removeStore("worthCoupons",this);
        removeStore('remindFrom');
        removeStore("isSelectFCity");//清空勾选城市的标记
        removeStore("isSelectTCity");//清空勾选城市的标记
        removeStore("selectDay");//清空勾选日期的标记
        removeStore("invincibleList",this);
        removeStore("rightInsurance",this);
        removeStore("trafficTransfer",this);
        removeStore("airportVipLounge",this);
        removeStore("goin");
        removeStore("iFlightJumpType");
        removeStore("iFlightClick");
        this.showDepartDate = this.departDate;
        this.showBackDate = this.backDate;
        this.showDepartureCity = this.departureCity;
        this.showArrivalCity = this.arrivalCity;

        // let startTimeStamp = +this.nowDateStamp+24*60*60*1000,
        //     startTime = new Date(startTimeStamp),
        //     startYear = startTime.getFullYear(),//获取当前年份
        //     startMonth = startTime.getMonth()+1,//获取当前月份
        //     startDate = startTime.getDate(),//获取当前日期
        //     start = `${startYear}-${startMonth}-${startDate}`,
        //     endTimeStamp = +this.nowDateStamp+90*24*60*60*1000,
        //     endTime = new Date(endTimeStamp),
        //     endYear = endTime.getFullYear(),
        //     endMonth = endTime.getMonth()+1,
        //     endDate = endTime.getDate(),
        //     end = `${endYear}-${endMonth}-${endDate}`;//90天以后的日期
        // let obj = {
        //     key: 'daysPrice',
        //     departureAirportCode: this.departureCity.code,
        //     arrivalAirportCode: this.arrivalCity.code,
        //     startDate: start,
        //     endDate: end
        // }
        // this.saveDaysPrice(obj)

        //判断有没有登录
        let userid = '';
        if(isClient() == 1){
            this.app=true;
            //app登录
            getLvSessionId().then((data) => {
                if(data==null || data=="" || data==undefined){
                       
                }else{
                    getLvUser(data).then((res) => {
                        if(res.code == 1){
                            if(res.data.userId!=''&&res.data.userId!=null){
                                    userid = res.data.userId;
                                    this.getCoupon(userid);
                            }
                        }
                    });
                }
            })
        }else{
            this.app=false;
            //wap登录
           getLvUserByCookie().then((res) => {
                if(res.code == 1){
                    if(res.data.userId!=''&&res.data.userId!=null){
                         userid = res.data.userId;
                         this.getCoupon(userid);
                   }
                }
           }) 
        }

        this.tempHistoryArr = JSON.parse(JSON.stringify(this.searchHistoryArr));
        //获取通知参数
        getNotice(getNoticeSource(),'FLIGHT_INDEX_PAGE',String(new Date().getTime()),this.departureCity.code,this.arrivalCity.code).then((res) => {
          if (+res.code === 1) {
            this.noticeArr = res.data;
          }
        });
        if(location.pathname.indexOf("businessTravel")!=-1){
            let businessTravel = {
              key: 'businessTravel',
              val: true
           }
        try{
            this.initData(businessTravel);
        }catch(e){}
        }else{
            removeStore("businessTravel",this);
            let businessTravel = {
              key: 'businessTravel',
              val: false
           }
        try{
            this.initData(businessTravel);
        }catch(e){}
        }
        this.getAllCites();
        getStatisticsType('机票-查询首页','FlightSearch')
    },
    methods:{
        ...mapActions([
            'initData',//初始化时间
            'saveDaysPrice',//将日历价格存至state
        ]),
        closeAlert(){
            this.showAlertMessage = false;
            this.alertMessage = "";
            this.leftButton="";
        },
        getCoupon(userid){
        //调取首页优惠券接口
        if(userid!= ''&& userid!= null){
            getCouponListOld(10000,userid).then((res) => {
                if(res.code == 1 && res.data.length>0){
                    let allCouponList_new = res.data,
                        allCouponList = [],
                        arr = [];
                    for (let i = 0; i < allCouponList_new.length; i++) {
                         if(allCouponList_new[i].couponCategory == "ACTIVITY"){
                            allCouponList.push(allCouponList_new[i]);
                            arr.push(allCouponList_new[i].discountAmount);
                            this.couponShow = true;
                        }
                    }
                    //排序
                    arr.sort(function(a,b){
                        return b-a
                    });
                    this.queryAmount=arr[0];//最大的金额
                    this.twoAmount=arr[1];
                    this.queryTotalAmount = this.queryAmount-(-this.twoAmount || 0);


                    for (let i = 0; i < allCouponList.length; i++) {
                       if(arr[0] == allCouponList[i].discountAmount && this.firstName == ''){
                            this.firstName = allCouponList[i].couponName;
                            this.fistEndTime = allCouponList[i].endTime;
                            console.log(this.firstName);
                            continue;
                       }else if(arr[1] == allCouponList[i].discountAmount){
                           this.twoName = allCouponList[i].couponName;
                           this.twoEndTime = allCouponList[i].endTime;
                       }
                       if(this.firstName!=null && this.twoName!=null && this.firstName!="" && this.twoName!=""){
                            break;
                        }
                    };
                }

            })
        }
        },
        //点击返回箭头
        goIndex(){
           window.location.href = "//m.lvmama.com";
        },
        goBack(){
             if (isClient() == 1) {
                if(this.businessTravel==true){
                    if(location.href.indexOf("businessTravelold")!=-1){
                         this.$router.push(`/${this.$parent.baseUrlPath}/businessTravelQuery?type=back`);
                    }else{
                         this.$router.push(`/${this.$parent.baseUrlPath}/businessTravelIndex`);
                    }
                   
                }else{
                    window.location.href = "//m.lvmama.com/flight?method=backToNativePrev";
                }
            } else {
                if(this.businessTravel==true){
                    if(location.href.indexOf("businessTravelold")!=-1){
                         this.$router.push(`/${this.$parent.baseUrlPath}/businessTravelQuery?type=back`);
                    }else{
                         this.$router.push(`/${this.$parent.baseUrlPath}/businessTravelIndex`);
                    }
                }else{
                    window.location.href = "//m.lvmama.com";
                }
                // else{
                    // window.location.href = history.go(-1);
                // }
            }
        },
        //点击单程
        clickSingleTrip(){
            let obj = {
                key: 'isDouble',
                val: false
            };
            try{
                this.initData(obj);
            }catch(e){}

            this.backTrip = false;
            let backTripObj = {
                key: 'chosenBackTrip',
                val: this.backTrip
            };
            try{
                this.initData(backTripObj);
            }catch(e){}
        },
        //点击往返
        clickDoubleFlight(){
            let that=this;
            // if (this.backDate == '') {
                if (getStore('backDate')) {
                    let departDate = JSON.parse(getStore('departDate')),
                        backDate = JSON.parse(getStore('backDate'));
                    let departDateStamp = new Date(`${departDate.year}/${departDate.month}/${departDate.date}`).getTime(),
                        backDateStamp = new Date(`${backDate.year}/${backDate.month}/${backDate.date}`).getTime();
                    if (backDateStamp < departDateStamp) {
                        let turnBack = new Date(+departDateStamp + 3 * 24 * 60 * 60 * 1000);
                        let backObj = {
                            year: turnBack.getFullYear(),
                            month: turnBack.getMonth() + 1,
                            date: turnBack.getDate(),
                            day: weekFormat(turnBack.getDay())
                        }
                        that.showBackDate = backObj;
                        let obj = {
                            key: 'backDate',
                            val: backObj
                        }
                        try{
                            that.initData(obj);
                        }catch(e){}
                    } else {
                        let obj = {
                            key: 'backDate',
                            val: JSON.parse(getStore('backDate'))
                        }
                        try{
                            that.initData(obj);
                        }catch(e){}
                    }   

                } else {
                    let turnBack = new Date(+that.nowDateStamp + 3 * 24 * 60 * 60 * 1000);
                    let backObj = {
                        year: turnBack.getFullYear(),
                        month: turnBack.getMonth() + 1,
                        date: turnBack.getDate(),
                        day: weekFormat(turnBack.getDay())
                    }
                    that.showBackDate = backObj;
                    let obj = {
                        key: 'backDate',
                        val: backObj
                    }
                    try{
                        that.initData(obj);
                    }catch(e){}
                }
            // };
            let obj = {
                key: 'isDouble',
                val: true
            };
            try{
                this.initData(obj);
            }catch(e){}

            this.backTrip = false;
            let backTripObj = {
                key: 'chosenBackTrip',
                val: this.backTrip
            };
            try{
                this.initData(backTripObj);
            }catch(e){}
        },
        //跳转航班列表页
        toSearchFlight(){
            getElementTag("机票频道页_B区_"+this.departureCity.name+"_"+this.arrivalCity.name+"_"+this.showDepartDate.year+"-"+this.showDepartDate.month+"-"+this.showDepartDate.date+"_"+this.showBackDate.year+"-"+this.showBackDate.month+"-"+this.showBackDate.date,"机票频道页");
            if(getStore('selectuserid')!="" && getStore('selectuserid')!=null){
                getElementTag("航班首页_已登录用户","机票首页");
            }else{
                getElementTag("航班首页_游客用户","机票首页");
            }
            //清空接送机信息
            let transferObj = {
                key: 'transferInfo',
                val: ''
            };
            try{
                this.initData(transferObj);
            }catch(e){}
            removeStore("transferInfo",this);
            //搜索记录
            let historyArr = this.tempHistoryArr;
            if (historyArr.length > 0) {
                let index = -1;
                for (let i = 0; i < historyArr.length; i++) {
                    if (historyArr[i].departureCity.code == this.showDepartureCity.code && historyArr[i].arrivalCity.code == this.showArrivalCity.code && historyArr[i].double == this.isDouble) {
                        index = i;
                    };
                }
                if (index == -1) {
                    let historyObj = {
                        departureCity: this.showDepartureCity,
                        arrivalCity: this.showArrivalCity,
                        double: this.isDouble
                    };
                    historyArr.unshift(historyObj);
                }
                if (historyArr.length > 7) {
                    historyArr.splice(7,1);
                }
                this.tempHistoryArr = historyArr;
            } else {
                let historyObj = {
                    departureCity: this.showDepartureCity,
                    arrivalCity: this.showArrivalCity,
                    double: this.isDouble
                };
                historyArr.unshift(historyObj);
                if (historyArr.length > 5) {
                    historyArr.splice(7,1);
                }
                this.tempHistoryArr = historyArr;
            }
            let tempHistoryArrObj = {
                key: 'searchHistoryArr',
                val: this.tempHistoryArr
            };
            try{
                this.initData(tempHistoryArrObj);  
            }catch(e){}
            let chosenBackTrip ={
                key:'chosenBackTrip',
                val: false
            };
            try{
                this.initData(chosenBackTrip);
            }catch(e){}
            let chosenGoTrip ={
                key:'chosenGoTrip',
                val: true
            };
            try{
                this.initData(chosenGoTrip);
            }catch(e){}
            

            // this.$router.push(`/vflight/flightList/${this.showDepartureCity.code}/${this.showArrivalCity.code}`);
            setStore("backHome",true);
            this.$router.push(`${this.showDepartureCity.code}-${this.showArrivalCity.code}`);
        },
        //弹框相同城市
        alertTheSameCity(){
            this.alertMessage = '出发地和目的地不能相同';
            this.showAlertMessage = true;
            this.leftButton="";
            setTimeout(() => {
                this.showAlertMessage = false;
            },2000);
            return;
        },
        //点击搜索到机票列表页
        toFlightList(){
            let that=this;
            if(this.showDepartureCity.name!=this.showArrivalCity.name){
                if(getStore("flightAllCities")!=null && getStore("flightAllCities")!='undefined' && JSON.parse(getStore("flightAllCities")).length>0){
                    let flightAllCities=JSON.parse(getStore("flightAllCities")),d=false,a=false;
                    for(let i=0;i<flightAllCities.length;i++){
                        if(flightAllCities[i].name==this.showDepartureCity.name){
                            this.showDepartureCity.code=flightAllCities[i].code;
                            d=true;
                        }else if(flightAllCities[i].name==this.showArrivalCity.name){
                            this.showArrivalCity.code=flightAllCities[i].code;
                            a=true;
                        }
                        if(d==true && a==true){
                            break;
                        }
                    }
                    if(d==true && a==true){
                        this.toSearchFlight();
                    }else{
                        this.alertTheSameCity();
                        return;
                    }
                }else{
                    this.$parent.showLoading = true;
                    getFlightCities().then((res) => {
                        this.$parent.showLoading = false;
                        let allCities = res.data.allCitys;
                        try {
                            if(allCities.length>0){
                                setStore("flightAllCities",allCities);
                            }
                        } catch (error) {
                            this.toSearchFlight();
                            return;
                        }
                        let d=false,a=false;
                        for(let i=0;i<allCities.length;i++){
                            if(allCities[i].name==this.showDepartureCity.name){
                                this.showDepartureCity.code=allCities[i].code;
                                d=true;
                            }else if(allCities[i].name==this.showArrivalCity.name){
                                this.showArrivalCity.code=allCities[i].code;
                                a=true;
                            }
                            if(d==true && a==true){
                                break;
                            }
                        }
                        if(d==true && a==true){
                            this.toSearchFlight();
                        }else{
                            this.alertTheSameCity();
                            return;
                        }
                    },()=>{
                        this.$parent.showLoading = false;
                        this.toSearchFlight();
                        return;
                    });
                }
            }else{
                this.alertTheSameCity();
                return;
            }
            // if (this.departureCity.code == this.arrivalCity.code) {
            //     if(this.showDepartureCity.name!=this.showArrivalCity.name){
            //         if(getStore("flightAllCities")!=null && getStore("flightAllCities")!='undefined' && JSON.parse(getStore("flightAllCities")).length>0){
            //             let flightAllCities=JSON.parse(getStore("flightAllCities")),d=false,a=false;
            //             for(let i=0;i<flightAllCities.length;i++){
            //                 if(flightAllCities[i].name==this.showDepartureCity.name){
            //                     this.showDepartureCity.code=flightAllCities[i].code;
            //                     d=true;
            //                 }else if(flightAllCities[i].name==this.showArrivalCity.name){
            //                     this.showArrivalCity.code=flightAllCities[i].code;
            //                     a=true;
            //                 }
            //                 if(d==true && a==true){
            //                     break;
            //                 }
            //             }
            //             if(d==true && a==true){
            //                 this.toSearchFlight();
            //             }else{
            //                 this.alertTheSameCity();
            //                 return;
            //             }
            //         }else{
            //             this.$parent.showLoading = true;
            //             getFlightCities().then((res) => {
            //                 this.$parent.showLoading = false;
            //                 let allCities = res.data.allCitys;
            //                 try {
            //                     if(allCities.length>0){
            //                         setStore("flightAllCities",allCities);
            //                     }
            //                 } catch (error) {
            //                     that.alertTheSameCity();
            //                     return;
            //                 }
            //                 let d=false,a=false;
            //                 for(let i=0;i<allCities.length;i++){
            //                     if(allCities[i].name==this.showDepartureCity.name){
            //                         this.showDepartureCity.code=allCities[i].code;
            //                         d=true;
            //                     }else if(allCities[i].name==this.showArrivalCity.name){
            //                         this.showArrivalCity.code=allCities[i].code;
            //                         a=true;
            //                     }
            //                     if(d==true && a==true){
            //                         break;
            //                     }
            //                 }
            //                 if(d==true && a==true){
            //                     this.toSearchFlight();
            //                 }else{
            //                     this.alertTheSameCity();
            //                     return;
            //                 }
            //             },()=>{
            //                 this.$parent.showLoading = false;
            //                 this.alertTheSameCity();
            //                 return;
            //             });
            //         }
            //     }else{
            //         this.alertTheSameCity();
            //         return;
            //     }
            // }else{
            //     this.toSearchFlight();
            // }
            
        },
        //点击历史记录
        chooseHistory(item) {
            getElementTag("机票频道页_C区_历史记录","机票频道页");
            this.showDepartureCity = item.departureCity;
            this.showArrivalCity = item.arrivalCity;
            let departureObj = {
                key: 'departureCity',
                val: this.showDepartureCity
            };
            try{
                this.initData(departureObj);
            }catch(e){}
            let arrivalObj = {
                key: 'arrivalCity',
                val: this.showArrivalCity
            };
            try{
                this.initData(arrivalObj);
            }catch(e){}
            let doubleObj = {
                key: 'isDouble',
                val: item.double
            };
            try{
                this.initData(doubleObj);
            }catch(e){}
        },
        //清除历史
        clearHistory() {
            this.tempHistoryArr = [];
            let historyObj = {
                key: 'searchHistoryArr',
                val: this.tempHistoryArr
            };
            try{
                this.initData(historyObj);
            }catch(e){}
        },
        goDestine(){
            this.$router.push(`/${this.$parent.baseUrlPath}/destine`);
        },

        changeCity() {
            this.rotateNum ++;
            lQuery('.rotate_icon').css('transform',`rotateZ(${180*this.rotateNum}deg)`);
            this.isChangeCity = !this.isChangeCity;
            let tempDepartureCity = this.showDepartureCity,
                tempArrivalCity = this.showArrivalCity;
            this.showDepartureCity = tempArrivalCity;
            this.showArrivalCity = tempDepartureCity;
            let tempDepartObj = {
                key: 'departureCity',
                val: tempArrivalCity
            };
            try{
                this.initData(tempDepartObj);
            }catch(e){}
            let tempArrivalObj = {
                key: 'arrivalCity',
                val: tempDepartureCity
            };
            try{
                this.initData(tempArrivalObj);
            }catch(e){}
            setTimeout(() => {
                this.isChangeCity = !this.isChangeCity
            },250);
        },
        toFeedBack(){
            getElementTag("机票频道页_D区_011_我要吐槽","机票频道页");
            this.$router.push(`/${this.$parent.baseUrlPath}/feedBack/index`);
        },
        toOrderList() {
            getElementTag("机票频道页_D区_013_机票订单","机票频道页");
            orderDetailHref();
        },
        toTravelHelper() {
            getElementTag("机票频道页_D区_014_行程助手","机票频道页");
            this.$router.push(`/${this.$parent.baseUrlPath}/travelHelper`);
        },
        toCouponClick() {
            getElementTag("机票频道页_D区_012_领券中心","机票频道页");
            window.location.href = "//zt1.lvmama.com/hongbao2/index/499A8A0EA0C23250?lvStatisticCode=3zhTiy6l";
        },
        showQueryWords() {
            this.isShowQueryWords = true;
        },
        hideQueryWords() {
            this.isShowQueryWords = false;
        },
        showCoupon(){
            this.showContent = true;
        },
        closedCoupon(){
             this.showContent = false;
        },
        toFlightShare(){
            getElementTag("机票_机票首页_特价机票","机票频道页");
            setStore("homeTo","1");
            this.$router.push(`/${this.$parent.baseUrlPath}/flightShare`);
            setStore("formHome","1");
        },
        toCarTranvel(){
            getElementTag("品类首页引入","需求单填写页");
            setStore("goin",'flight');
            window.location.href="//m.lvmama.com/car/TravelDemand/flight/?goin=flight&hideAppHeader=1";
        },
        toGNY(){
            getElementTag("机票_机票首页_国内游","机票频道页");
            if(isClient()==1) {
                NativeUtil.goClass("RouteGny",{})
            }else{
                setStore("goin",'flight');
                window.location.href="https://m.lvmama.com/destroute/";
            }
        },
        toVIPlounge(){
            getElementTag("机票_机票首页_贵宾室","机票频道页");
            // this.alertMessage = "小驴提醒：贵宾室功能将在近期开放，敬请期待！";
            // this.leftButton="知道了";
            // this.showAlertMessage = true;
            // return;
            if(isClient()==1) {
                let nua=navigator.userAgent,lvves=0;
                if(navigator.userAgent.indexOf('Android')!=-1){
                    lvves=nua.substring(nua.indexOf("LVMM/")+5,nua.lastIndexOf("(")-1);
                }else{
                    lvves=nua.substring(nua.indexOf("LVMM/")+5,nua.length);
                }
                if(lvves!=null && lvves.replace(/\s/g,'').split('.')[0]>7&&(lvves.replace(/\s/g,'').split('.')[1]>0 || lvves.replace(/\s/g,'').split('.')[2]>=8)){
                   setStore("goin",'flight');
                   window.location.href="//m.lvmama.com/VIPlounge/?goin=flight&hideAppHeader=1";
                }else{
                    this.alertMessage = "小驴提醒：您的版本较低，请将驴妈妈APP版本升级到最新版本8.0.8，即可使用贵宾室功能哦！";
                    this.showAlertMessage = true;
                    this.leftButton="知道了";
                }
            } else {
                setStore("goin",'flight');
                window.location.href="//m.lvmama.com/VIPlounge/?goin=flight&hideAppHeader=1";
            }
        },
        toCar(){
            getElementTag("机票_机票首页_接送机","机票频道页");
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
         //判断低价订阅有没有数据
        async lowSubs(){
            try {
                let res = await LowSubscription();
                if(res.code == '1'){
                    if(res.data!=undefined && res.data.length>0){
                        this.$router.push(`/${this.$parent.baseUrlPath}/lowPriceRemind`);
                    }else{
                        this.$router.push(`/${this.$parent.baseUrlPath}/addRemind/add`);
                    }

                }else{
                    this.$router.push(`/${this.$parent.baseUrlPath}/addRemind/add`);
                }
            } catch (error) {
                
            }
        },
        toLowNotice(){
            getElementTag("机票频道页_D区_015_低价提醒","机票频道页");
            //判断有没有登录
            this.$parent.showLoading = true;
             if(isClient() == 1){
                    getLvSessionId().then((data) => {
                        if(data==null || data==undefined || data==""){
                             this.$parent.showLoading = false;
                             this.$router.push(`/${this.$parent.baseUrlPath}/lowPriceRemind`);
                            return;
                        }
                        getLvUser(data).then((res) => {
                            this.$parent.showLoading = false;
                            if(res.code == 1){
                                this.lowSubs();
                            }else{
                                this.$router.push(`/${this.$parent.baseUrlPath}/lowPriceRemind`);
                            }
                        });
                        }, ()=> {
                            this.$parent.showLoading = false;
                        })
                }else{
                    //wap登录
                    getLvUserByCookie().then((res) => {
                        this.$parent.showLoading = false;
                        if(res.code == 1){
                            this.lowSubs();
                        }else{
                            this.$router.push(`/${this.$parent.baseUrlPath}/lowPriceRemind`);
                        }
                    }, ()=> {
                        this.$parent.showLoading = false;
                    }) 
                }

        },
        //调城市接口
        getAllCites(){
            getFlightCities().then((res) => {
                let allCities = res.data.allCitys;
                try {
                    if(allCities.length>0){
                        setStore("allCities",allCities);
                    }
                } catch (error) {
                    
                }
                
            });
        },
    },


    computed:{
        ...mapState([
            'departDate',
            'backDate',
            'departureCity',
            'arrivalCity',
            'nowDateStamp',
            'noticeDetail',
            'searchHistoryArr',
            'isDouble',
            'allCityLowPrice',
            'businessTravel',//差旅
        ])
    },
    // created(){
    //     //清除车次列表页的排序缓存
    //     removeStore('departureAirportCode');//起飞时间
    //     removeStore('departureAirportName');//出发机场
    //     removeStore('arrivalAirportName');//到达机场
    //     removeStore('AirModels');//机型
    //     removeStore('seatClassType');//舱位
    //     removeStore('carrierName');//航司
    // }

}

</script>

<style lang="scss" scoped>
    @import '../../style/mixin';
   .home_container{
        @include wh(100%,100%);
        .home_swiper_container {
            .swiper-container{
                height: 100%;
            }
            @include wh(100%,2.42rem);
            overflow: hidden;
            position: relative;
            .back_icon {
                @include wh(1rem,1rem);
                background: url(//m.lvmama.com/flight/image/back_button.png) no-repeat center;
                background-size: .6rem;
                position: absolute;
                top: 0;
                left: 0;
                z-index: 2;
            }
            .index_icon {
                @include wh(0.6rem,0.6rem);
                background: url(//m.lvmama.com/flight/image/feedback.png) no-repeat;
                background-size: .6rem;
                position: absolute;
                top: 0.16rem;
                right: 0.12rem;
                z-index: 2;
            }
            .lvmama_ad_icon {
                @include wh(.46rem,.2rem);
                background: url('//m.lvmama.com/flight/image/guangg.png') center;
                background-size: 100%;
                position: absolute;
                left: 0;
                bottom: .1rem;
                z-index: 2;
            }
        }
        .notice_container {
            @include wh(100%,.6rem);
            box-sizing: border-box;
            @include sc(.28rem,#666);
            overflow: hidden;
            margin-top: -.1rem;
        }
        .home_choice_container.topone{
            margin-top: -.1rem;
        }
        .home_choice_container {
            width: 100%;
            // margin: .05rem auto 0;
            background: #fff;
            box-shadow: 0 0 10px rgba(191, 181, 181, 0.75);
            // @include borderRadius(.1rem);
            padding: 0 .2rem .34rem;
            box-sizing: border-box;
            .trip_kind_container {
                width: 106%;
                margin-left: -3%;
                border-top-left-radius: .1rem;
                border-top-right-radius: .1rem;
                height: .9rem;
                @include sc(.34rem,#898989);
                background-color : #ffffff;
                // border-bottom: 1px solid #f1f1f1;
                @include bottomline();
                > div {
                    width: 50%;
                    height: 105%;
                    @include sc(.3rem,#000000);
                }
                .singleTrip {
                    // background: url('//m.lvmama.com/flight/image/single.png') 0 0 no-repeat;
                    // background-size: 100% 110%;
                    position: relative;
                    i{
                        display: block;
                        @include wh(0.6rem,.06rem);
                        background: url('//m.lvmama.com/flight/image/rectangle.png') 0 0 no-repeat;
                        background-size: 100% 110%;
                        @include cl;
                        bottom:0;
                    }
                }
                .doubleTrip {
                    // background: url('//m.lvmama.com/flight/image/double0.png') 0 0 no-repeat;
                    // background-size: 100% 110%;
                    position: relative;
                    i{
                        display: block;
                        @include wh(0.6rem,.06rem);
                        background: url('//m.lvmama.com/flight/image/rectangle.png') 0 0 no-repeat;
                        background-size: 100% 110%;
                        @include cl;
                        bottom:0;
                    }
                }
                .active{
                    background: none;
                    @include sc(.3rem,#000000);
                    
                }
            }
            .pick_city_container {
                @include wh(100%,1.16rem);
                @include sc(.4rem,#000);
                > div {
                    @include wh(35%,inherit);
                    // border-bottom: 1px solid #f1f1f1;
                    @include bottomline();
                   .city_item {
                        @include wh(100%,inherit);
                        font-size: 0.38rem;
                   } 
                }
                .left_to_right {
                  transform: translateX(6.1rem);
                  transition-duration: .3s;
                }
                .right_to_left {
                  transform: translateX(-6.1rem);
                  transition-duration: .3s;
                }
                .trip_kind_change_container {
                    @include wh(30%,inherit);
                    border: none;
                    position: relative;
                    // .plane_icon {
                    //     @include wh(.4rem,.4rem);
                    //     @include center;
                    //     background: url('//m.lvmama.com/flight/image/img.png') no-repeat -3.67rem -16.16rem;
                    //     background-size: 6rem;
                    // }
                    .rotate_icon {
                        @include wh(.52rem,.52rem);
                        background: url('//m.lvmama.com/flight/image/trainChange.png') no-repeat;
                        background-size: 100% 100%;
                        transition-duration: .7s;
                    }
                }
            }
            .pick_date_container {
               @include wh(100%,1rem);
                // border-bottom: 1px solid #f1f1f1;
                @include bottomline();
               color: #000;
               font-weight: normal; 
               > div {
                    width: 50%;
                .date {
                    font-size: .38rem;
                }
                .week{
                    font-size: .24rem;
                }
               }
               >div.width100{
                   width: 100%;
               }
               .back_date_container {
                text-align: right;
               } 
               .date_item {
                display: block;
                @include wh(100%,inherit);
               }
            }
            .search_botton_container {
                @include wh(100%,0.9rem);
                // padding: .3rem 0;
                margin-top: 0.4rem;
                box-sizing: border-box;
                .search_botton {
                    @include wh(100%,.9rem);
                    @include borderRadius(1rem);
                    background: linear-gradient(137deg,#FE686C,#FD3C71);
                    > div {
                        color: #fff;
                        font-size: 0.36rem;
                    }
                    .search_icon {
                        @include wh(.34rem,.34rem);
                        background: url('//m.lvmama.com/flight/image/img.png') no-repeat -5.66rem -3.57rem;
                        background-size: 6rem;
                        margin-right: .1rem;
                    }
                }
            }
            .history_container {
                @include wh(200%,.38rem);
                margin-top: 0.34rem;
                .history_view {
                    @include wh(6.9rem,.6rem);
                    position: relative;
                    overflow: hidden;
                    overflow-x: scroll;
                    -webkit-overflow-scrolling: touch;
                    .history_scroll_wrap {
                        position: absolute;
                        .history_item {
                            min-width: 1.6rem;
                            @include sc(.24rem,#999999);
                            margin-right: .25rem;
                            > p {
                                max-width: .8rem;
                                @include sc(.24rem,#9f9f9f);
                            }
                            .history_trip_kind_icon {
                                @include wh(.4rem,.28rem);
                                background: url('//m.lvmama.com/flight/image/img.png') -2.74rem -14.49rem no-repeat;
                                background-size: 6rem;
                            }
                            .double {
                                background: url('//m.lvmama.com/flight/image/img.png') -2.74rem -14.49rem no-repeat;
                                // background: url('//m.lvmama.com/flight/image/img.png') -2.74rem -15.15rem no-repeat;
                                background-size: 6rem;
                            }
                        }
                        .clcok_icon{
                            em{
                                display: block;
                                @include wh(0.32rem,.32rem);
                                background: url("//m.lvmama.com/flight/image/homeHistoryIcon.png") no-repeat;
                                background-size: 100% 100%;
                                margin-right: 0.1rem;
                            }
                        }
                    }
                }
            }
        }
        .special_container{
            @include wh(100%,1.46rem);
            background-color: #FFF;
            position: relative;
            font-size: 0;
            margin: .2rem 0 .3rem;
            >div{
                @include wh(25%,1.46rem);
                display: inline-block;
                font-size: .28rem;
                text-align: center;
                position: relative;
                >span:first-child{
                    @include wh(.42rem,.32rem);
                    // @include center;
                    @include cl;
                    top:30%;
                    background: url('//m.lvmama.com/flight/image/jsj.png') no-repeat;
                    background-size: 100%;
                    
                }
                >span.gbs:first-child{
                    background: url('//m.lvmama.com/flight/image/gbs.png') no-repeat;
                    background-size: 100%;
                }
                >span.fxdjIcon:first-child{
                    background: url('//m.lvmama.com/flight/image/fxdj.png') no-repeat;
                    background-size: 100%;
                    // left: 0.45rem;
                }
                >span.gny:first-child{
                    background: url('//m.lvmama.com/flight/image/gny.png') no-repeat;
                    background-size: 100%;
                    // left: 0.45rem;
                }
                >span.xqdjIcon:first-child{
                    background: url('//m.lvmama.com/flight/image/is_travel.png') no-repeat;
                    background-size: 100%;
                    // left: 0.45rem;
                }
                >span:nth-of-type(2){
                    display: block;
                    margin-top: 43%;
                //    @include cl;
                //    bottom: 20%;
                   @include sc(0.24rem,#666666);
                }
                >span.fxdj:nth-of-type(2){
                    // margin-left: -.25rem;
                }
                .is_new{
                    display: block;
                    @include wh(0.5rem,0.24rem);
                    background: url('//m.lvmama.com/flight/image/new.png') no-repeat;
                    background-size: 100% 100%;
                    position: absolute;
                    right: 14%;
                    top: 20%;
                }
                >i{
                    @include wh(1px,.4rem);
                    @include ct();
                    background: url('//m.lvmama.com/flight/image/passerLine.png') no-repeat;
                    background-size: 100%;
                    right: 0;
                }
            }
            
        }
        // .special_flight_price_container {
        //     @include wh(100%,1.04rem);
        //     margin: .2rem 0;
        //     .special_flight_price_wrap {
        //         height:inherit;
        //         @include borderRadius(.1rem);
        //         margin: 0 .1rem;
        //         padding: 0 .2rem;
        //         box-sizing: border-box;
        //         background: #fff;
        //         .flight_icon {
        //             @include wh(.64rem,.64rem);
        //             background: url('//m.lvmama.com/flight/image/sale_flightIcon.png') no-repeat;
        //             background-size: 100% 100%;
        //             margin-right: .1rem;
        //         }
        //         .price_low {
        //             display: inline-block;
        //             @include wh(auto,.35rem);
        //             @include sc(0.22rem,#fff);
        //             line-height: 0.35rem;
        //             background: #ff4500;
        //             border-radius: 15px;
        //             padding: 0 0.1rem;
        //             margin-left: 0.1rem;
        //         }
        //     }
        // }
        .lv_logo_container {
            @include wh(100%,.7rem);
            > div {
                @include wh(3rem,inherit);
                background: url('//m.lvmama.com/flight/image/lvtu.png') no-repeat;
                background-size: 100% 100%;
            }
            .mt4{
                margin-top: .4rem;
            }
        }
        
        .home_bottom_container {
            @include wh(100%,1.2rem);
            background: #fff;
            position: absolute;
            left: 0;
            bottom: 0;
            > div {
                @include wh(25%,1rem);
                position: relative;
                .home_bottom_menu_item {
                    @include wh(.8rem,.8rem);
                }
                // >div:nth-child(1){
                //         img{
                //             @include wh(0.52rem,.44rem);
                //         }
                // }
                .going{
                    display: inline-block;
                     @include wh(.6rem,.28rem);
                    background: url('//m.lvmama.com/flight/image/lang.png') no-repeat;
                    background-size: 100%;
                    position: absolute;
                    right: 4%;
                    top: .1rem;
                }
            }
        }
        .slide-date-enter-active {
            transition: all .3s ease;
        }
        .slide-date-leave-active {
            transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
        }
        .slide-date-enter,.slide-date-leave-to {
            transform: translateX(10px);
            opacity: 0;
        }
        .red_package_container {
            @include wh(1.26rem,1.06rem);
            background: url('//m.lvmama.com/flight/image/coupon1.png') no-repeat;
            background-size: 100% 100%;
            position: absolute;
            right: .4rem;
            bottom: 1.2rem;
            animation: query_couponAnimation 1.5s linear 1s 1 alternate;
            span{
              @include center;
              top:60%;
              @include sc(0.22rem,#F7CC2D);
            }
        }
        .query_word_mask {
            @include wh(100%,100%);
            background: rgba(0,0,0,.6);
            position: absolute;
            top: 0;
            left: 0;
            z-index: 5;
            .query_word_container {
                @include wh(100%,auto);
                padding: 0 .4rem;
                box-sizing: border-box;
                position: absolute;
                left:50%;
                bottom:0;
                transform: translateX(-50%);
                background: #fff;
                border-radius: 0.1rem 0.1rem 0 0;
                // @include borderRadius(.1rem);
                .bk_icon{
                    display: inline-block;
                    width: 100%;
                    height: 1.66rem;
                    background: url('//m.lvmama.com/flight/image/background_icon.png') no-repeat;
                    background-size: 100% 100%;
                    position: absolute;
                    left: 0;
                    i{
                        display: inline-block;
                        width: 0.32rem;
                        height: 0.32rem;
                        background: url('//m.lvmama.com/flight/image/closeIcon.png') no-repeat;
                        background-size: 100% 100%;
                        position: absolute;
                        right: 0.2rem;
                        top: 24%;
                    }
                }
                .query_word_title {
                    padding: .35rem 0;
                    div {
                        @include wh(5rem,.6rem);
                        background: url('//m.lvmama.com/flight/image/select.png') no-repeat;
                        background-size: 100% 100%;
                    }
                }
                .query_word_item {
                    > div:first-child {
                        @include sc(.28rem,#333333);
                        margin-top: .2rem;
                        margin-bottom: .1rem;
                        font-weight: 600;
                    }
                    .query_word_icon {
                        @include wh(.08rem,.08rem);
                        background:#666666;
                        border-radius: 50%;
                        margin-right: .1rem;
                    }
                }
                .query_word_item:last-child{
                    margin-bottom: 0.4rem;
                }
            }

        }
        @keyframes query_couponAnimation {
            0% {
                -webkit-transform: rotateZ(-25deg);
                transform: rotateZ(-25deg);
            }
            10% {
                -webkit-transform: rotateZ(25deg);
                transform: rotateZ(25deg);
            }
            20% {
                -webkit-transform: rotateZ(-20deg);
                transform: rotateZ(-20deg);
            }
            30% {
                -webkit-transform: rotateZ(20deg);
                transform: rotateZ(20deg);
            }
            40% {
                -webkit-transform: rotateZ(-15deg);
                transform: rotateZ(-15deg);
            }
            50% {
                -webkit-transform: rotateZ(15deg);
                transform: rotateZ(15deg);
            }
            60% {
                -webkit-transform: rotateZ(-10deg);
                transform: rotateZ(-10deg);
            }
            70% {
                -webkit-transform: rotateZ(10deg);
                transform: rotateZ(10deg);
            }
            80% {
                -webkit-transform: rotateZ(-5deg);
                transform: rotateZ(-5deg);
            }
            90% {
                -webkit-transform: rotateZ(5deg);
                transform: rotateZ(5deg);
            }
            100% {
                -webkit-transform: rotateZ(0deg);
                transform: rotateZ(0deg);
            }
        }
        .transAlert{
             @include wh(100%,100%);
             background:rgba(0,0,0,0.5);
             position:absolute;
             top:0;
             left:0;
             z-index:3;
             >span{
                display:inline-block;
                @include wh(0.56rem,0.56rem);
                background:url("//m.lvmama.com/flight/image/couponClosed.png") no-repeat;
                background-size:100%;
                @include cl;
                bottom: 15%;
             }
        }
        .envelopeAlert{
            @include wh(7.26rem,10.1rem);
            background:url("//m.lvmama.com/flight/image/new_lv.png") no-repeat;
            background-size:100%;
            @include center;
            top:40%;
            p{
               @include center;
               top:58%;
               color:#fff;
            }
            >div{
                @include wh(5.62rem,1.55rem);
                background:url("//m.lvmama.com/flight/image/couponBk.png") no-repeat;
                background-size:100%;
                @include center;
                top:70%;
            }
            .Amount{
                position: absolute;
                left: 4%;
                top: 50%;
                transform: translateY(-50%);
                i{
                    @include sc(0.28rem,#ef3617);
                }
                span{
                    @include sc(0.44rem,#ef3617);
                    font-weight: 600;
                    margin-left: -0.08rem;
                }
            }
            .envelopeInfor{
                position:absolute;
                left:31%;
                top:50%;
                transform:translateY(-50%);
                span{
                   display: block;
                   @include sc(0.26rem,#000);
                   font-weight: 600;
                }
                span:nth-child(2){
                    color:#666;
                    font-weight:100;
                }
            }
            .AmountCard{
                top:88%;
            }
            

        }
   }
</style>
