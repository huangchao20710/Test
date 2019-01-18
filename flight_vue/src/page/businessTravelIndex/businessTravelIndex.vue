 <template>
    <div class="business_travel_container">
        <header class="business_header">
            <div class="header_top">
                <div class="header_top_title y_flex">
                    <div @click="goBack">
                        <span class="white_back"></span>
                    </div>
                    <span class="center_title">驴妈妈企业差旅</span>
                    <span class="header_logo" @click="toMyOrder"></span>
                    <span class="header_logo tip" @click="openTips"></span>
                </div>
            </div>
        </header>
        <div class="business_list_wrap">
            <div>
                <div class="header_back"></div>
                <div class="business_list_container">
                    <div class="header_business_kind y_flex">
                        <div class="business_kind_container xy_flex">
                            <div class="business_kind_Logo" @click="toFlight">
                                <div></div>
                                <p>机票</p>
                            </div>
                        </div>
                        <div class="business_kind_container xy_flex">
                            <div class="business_kind_Logo" @click="toTrain">
                                <div></div>
                                <p>火车票</p>
                            </div>
                        </div>
                    </div>
                    <div class="business_no_container" v-if="flightList.length==0 && waitList.length==0 && finishLoad">
                        <div class="xy_flex">
                            <div>
                                <div class="business_no_logo"></div>
                                <p>还没差旅订单</p>
                            </div>
                        </div>
                    </div>
                    <div class="wait_for_deal_container" v-if="waitList.length>0">
                        <div class="list_title y_flex">
                            <p>待我审批:{{waitList.length}}</p>
                            <p @click="toApproveClick">查看全部</p>
                            <span class="point_right_arrow"></span>
                        </div>
                        <div class="wait_for_deal_list">
                            <ul class="wait_for_deal_list_wrap clearfix">
                                <li class="wait_for_deal_list_item" :class="{'wait_for_deal_list_item_one': waitList.length == 1}" v-for="(item,index) in waitList" :key="index" @click="businessOrderDetail(item,'waitOrder')">
                                    <div v-if="item.orderListType == 'flight'">
                                        <div class="list_logo">
                                            <div class="flight_list_logo"></div>
                                        </div>
                                        <div class="wait_for_deal_list_content" :class="{'wait_for_deal_list_one': waitList.length == 1}">
                                            <div class="y_flex between_x_flex">
                                                <div>{{item.travelAccountDto.staffName}}<span class="endorse y_flex" v-if="item.orderTypeStr!=null&&(item.orderTypeStr.indexOf('改签')!=-1 || item.orderTypeStr.indexOf('变更')!=-1)">改签</span></div>
                                                <div class="wait_time y_flex" :class="{'wait_time_20': item.restTime <= 20 && item.restTime >10,'wait_time_10': item.restTime <= 10}" v-if="item.restTime > 0">{{item.restTime}}分钟后自动取消</div>
                                            </div>
                                            <div class="y_flex between_x_flex">
                                                <div>
                                                    {{item.flightTime | businessDateFormate}} {{item.depCityName}}
                                                    <span v-if="item.returnFlightNo==''" class="trip_kind"></span>
                                                    <span v-if="item.returnFlightNo!=''" class="trip_double"></span>
                                                    {{item.arrCityName}}
                                                </div>
                                                <div>￥{{item.orderAmount}}</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div v-if="item.orderListType == 'train'">
                                        <div class="list_logo">
                                            <div class="train_list_logo"></div>
                                        </div>
                                        <div class="wait_for_deal_list_content" :class="{'wait_for_deal_list_one': waitList.length == 1}">
                                            <div class="y_flex between_x_flex">
                                                <div>{{item.contact}}<span class="endorse y_flex" v-if="item.orderType=='CTMT'">改签</span></div>
                                                <div class="wait_time y_flex" :class="{'wait_time_20': item.restTime <= 20 && item.restTime >10,'wait_time_10': item.restTime <= 10}" v-if="item.restTime > 0">{{item.restTime}}分钟后自动取消</div>
                                            </div>
                                            <div class="y_flex between_x_flex">
                                                <div>
                                                    {{item.startdate | businessDateFormate}} {{item.fromstation}}
                                                    <span class="trip_kind"></span>
                                                    {{item.tostation}}
                                                </div>
                                                <div>￥{{item.paidAmount}}</div>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="recent_list_container" v-if="flightList.length>0">
                        <div class="list_title y_flex">
                            <p>最近订单</p>
                            <p @click="toAllOrders">查看全部</p>
                            <span class="point_right_arrow"></span>
                        </div>
                        <ul class="recent_list_container">
                            <li class="recent_list_item clearfix" v-for="(item,index) in flightList" :key="index" v-if="index<5" @click="businessOrderDetail(item,'order')">
                                <div v-if="item.orderListType == 'flight'">
                                    <div class="list_logo">
                                        <div class="flight_list_logo"></div>
                                    </div>
                                    <div class="recent_list_item_mid">
                                        <p>{{item.flightOrderListFlightInfos[0].depName}}{{item.flightOrderListFlightInfos[0].departureTermainalBuilding.code}}<span class="black_single_arrow"></span>{{item.flightOrderListFlightInfos[0].arrName}}{{item.flightOrderListFlightInfos[0].arrivalTerminalBuilding.code}}</p>
                                        <p>{{item.flightOrderListFlightInfos[0].carrier.name}}{{item.flightOrderListFlightInfos[0].flightNo}} {{item.flightOrderListFlightInfos[0].seatClassName}}{{item.passengerCount}}人</p>
                                        <p>{{item.showDepTime}} <span class="takeover_one_day">- {{item.flightOrderListFlightInfos[0].arrTime.substring(11,16)}}<span v-if="item.takeoverOneDay">+1天</span></span></p>
                                    </div>
                                    <div class="recent_list_item_right">
                                        <p :class="{'fail_order': item.orderStatus == '已取消' || item.orderStatus == '改签失败' || item.orderStatus == '占座失败'}">{{item.orderStatus}}</p>
                                        <p>￥{{item.receivableAmount}}</p>
                                    </div>
                                    <div class="recent_list_item_bottom clearfix" v-if="item.flightOrderListFlightInfos[0].returnFlightNo !=''">
                                        <div class="order_line"></div>
                                        <div class="recent_list_item_mid">
                                            <p>{{item.flightOrderListFlightInfos[0].returnDepAirportName}}{{item.flightOrderListFlightInfos[0].returnDepartureTermainalBuilding.code}}<span class="black_single_arrow"></span>{{item.flightOrderListFlightInfos[0].returnArrAirportName}}{{item.flightOrderListFlightInfos[0].returnArrivalTerminalBuilding.code}}</p>
                                            <p>{{item.flightOrderListFlightInfos[0].carrier.name}}{{item.flightOrderListFlightInfos[0].returnFlightNo}} {{item.flightOrderListFlightInfos[0].returnSeatClassName}}{{item.passengerCount}}人</p>
                                            <p>{{item.showReturnTime}} <span class="takeover_one_day">- {{item.flightOrderListFlightInfos[0].returnArrTime.substring(11,16)}}<span v-if="item.returnoverOneDay">+1天</span></span></p>
                                        </div>
                                    </div>
                                </div>
                                <div v-if="item.orderListType == 'train'">
                                    <div class="list_logo">
                                        <div class="train_list_logo"></div>
                                    </div>
                                    <div class="recent_list_item_mid">
                                        <p>{{item.fromstation}}<span class="black_single_arrow"></span>{{item.tostation}}</p>
                                        <p>{{item.trains}} {{item.seatname}} {{item.headcounts}}人</p>
                                        <p>{{item.showDepTime}} <span class="takeover_one_day">- {{item.totime}}<span v-if="item.takeoverOneDay != 0">+{{item.takeoverOneDay}}天</span></span></p>
                                    </div>
                                    <div class="recent_list_item_right">
                                        <p :class="{'fail_order': item.frontorderstate == '已取消' || item.frontorderstate == '改签失败' || item.frontorderstate == '占座失败'}">{{item.frontorderstate}}</p>
                                        <p>￥{{item.paidAmount}}</p>
                                    </div>
                                    <!-- <div class="recent_list_item_bottom clearfix" v-if="item.frontorderstate!=null&&(item.frontorderstate.indexOf('改签')!=-1 || item.frontorderstate.indexOf('变更')!=-1)">
                                        <div class="order_line"></div>
                                        <div class="recent_list_item_mid">
                                            <p>成都  上海</p>
                                            <p>K290 高级动卧2人</p>
                                            <p>2017/10/2周日 08: 31 <span>-21:34+1天</span></p>
                                        </div>
                                    </div> -->
                                </div>
                            </li>
                            <div class="business_loaded" v-if="flightList.length<5">
                                <p>已显示完全部差旅订单</p>
                            </div>
                        </ul>
                    </div>
                </div>
                
            </div>
        </div>
        <alert-tip :tipContent="message" :leftButton="leftButton" v-if="showAlert" @closeAlert="returnGo"></alert-tip>
    </div>
</template>

<script>
    import { lQuery } from '../../plugins/lQuery'
    import { mapActions,mapState } from 'vuex'
    import { getFlightBusinessTravel,getFlightWaitBusinessTravel,getTrainBusinessTravel,getTrainWaitBusinessTravel,getLvUser,getLvUserByCookie,getValidateAccount } from '../../service/getData'
    import { formatIOSDate,weekFormat,setStore,getStore,removeStore,isClient,getLvSessionId,jumpLogin } from '../../config/mUtils'
    import alertTip from '../../components/common/alertTip'
    export default {
        data(){
            return{
                userId: '',
                message:'',
                leftButton:'',
                noBusiness: false,
                showAlert:false,
                flightList: [],
                waitList: [],
                flightListData: [],
                flightWaitData: [],
                trainListData: [],
                trainWaitData: [],
                onlyOneItemWidth: 6.4,
                finishLoad: false,
                toAdd:false,
            }
        },
        props: [
            
        ],
        components: {
            alertTip
        },
        created() {
            
        },
        methods: {
            ...mapActions([
                'initData'
            ]),

            sortByTime(arr) {
                let timeArr = [];
                for (let i = 0; i < arr.length; i++) {
                    if (arr[i].orderListType == 'flight') {
                        arr[i].orderCreateTimeStamp = new Date(formatIOSDate(arr[i].orderCreateTime)).getTime();
                        arr[i].showDepTime = `${formatIOSDate(arr[i].flightOrderListFlightInfos[0].depTime).substring(0,10)} ${weekFormat(new Date(formatIOSDate(arr[i].flightOrderListFlightInfos[0].depTime)).getDay())} ${formatIOSDate(arr[i].flightOrderListFlightInfos[0].depTime).substring(11,16)}`;
                        if (new Date(formatIOSDate(arr[i].flightOrderListFlightInfos[0].arrTime).substring(0,10)).getTime() > new Date(formatIOSDate(arr[i].flightOrderListFlightInfos[0].depTime).substring(0,10)).getTime()) {
                            arr[i].takeoverOneDay = true;
                        } else {
                            arr[i].takeoverOneDay = false;
                        }
                        if (arr[i].flightOrderListFlightInfos[0].returnFlightNo !='') {
                            arr[i].showReturnTime = `${formatIOSDate(arr[i].flightOrderListFlightInfos[0].returnDepTime).substring(0,10)} ${weekFormat(new Date(formatIOSDate(arr[i].flightOrderListFlightInfos[0].returnDepTime)).getDay())} ${formatIOSDate(arr[i].flightOrderListFlightInfos[0].returnDepTime).substring(11,16)}`;
                            if (new Date(formatIOSDate(arr[i].flightOrderListFlightInfos[0].returnArrTime).substring(0,10)).getTime() > new Date(formatIOSDate(arr[i].flightOrderListFlightInfos[0].returnDepTime).substring(0,10)).getTime()) {
                                arr[i].returnoverOneDay = true;
                            } else {
                                arr[i].returnoverOneDay = false;
                            }
                        }
                    } else if (arr[i].orderListType == 'train') {
                        arr[i].orderCreateTimeStamp = new Date(formatIOSDate(arr[i].createdate)).getTime();
                        arr[i].showDepTime = `${formatIOSDate(arr[i].startdate)} ${weekFormat(new Date(formatIOSDate(arr[i].startdate)).getDay())} ${arr[i].fromtime}`;
                        if (new Date(formatIOSDate(arr[i].arrivedate)).getTime() > new Date(formatIOSDate(arr[i].startdate)).getTime()) {
                            arr[i].takeoverOneDay = Math.floor((new Date(formatIOSDate(arr[i].arrivedate)).getTime() - new Date(formatIOSDate(arr[i].startdate)).getTime())/86400000);
                            console.log(`overOneDay:${Math.floor((new Date(formatIOSDate(arr[i].arrivedate)).getTime() - new Date(formatIOSDate(arr[i].startdate)).getTime())/86400000)}`)
                        } else {
                            arr[i].takeoverOneDay = 0;
                        }
                    }
                    timeArr.push(arr[i].orderCreateTimeStamp);
                }
                timeArr = this.sortNum(timeArr);
                let returnArr = [];
                for (let i = 0; i < timeArr.length; i++) {
                    for (let j = 0; j < arr.length; j++) {
                        if (timeArr[i] == arr[j].orderCreateTimeStamp) {
                            returnArr.unshift(arr[j]);
                            arr.splice(j,1);
                            break;
                        }
                    }
                }
                return returnArr;
            },
            getRestTime(limitTime){
                let nowTimeStamp = new Date().getTime(),
                    limitTimeStamp = new Date(formatIOSDate(limitTime)).getTime();
                let restTimeStamp = limitTimeStamp - nowTimeStamp;
                return Math.round(restTimeStamp/1000/60);
            },
            sortLeastTime(arr) {
                let tempArr = [];
                for (let i = 0; i < arr.length; i++) {
                    tempArr.push(arr[i].restTime);
                }
                tempArr = this.sortNum(tempArr);
                let returnArr = [];
                for (let i = 0; i < tempArr.length; i++) {
                    for (let j = 0; j < arr.length; j++) {
                        if (tempArr[i] == arr[j].restTime) {
                            returnArr.push(arr[j]);
                            arr.splice(j,1);
                            break;
                        }
                    }
                }
                return returnArr;
            },
            //从小到大排序
            sortNum(arr) {
                for (let j = arr.length -1; j > 0; j--) {
                    for (let i = 0; i < j; i++) {
                        if (arr[i] > arr[i+1]) {
                            let temp = arr[i];
                            arr.splice(i,1,arr[i+1]);
                            arr.splice(i+1,1,temp);
                        }
                    };
                }
                return arr;
            },
            toMyOrder() {
                if(this.toAdd!=true){
                    this.$router.push(`/${this.$parent.baseUrlPath}/businessTravelMy`);
                }else{
                    this.$router.push(`/${this.$parent.baseUrlPath}/businessTravelAdd`);
                }
            },
            openTips() {
                this.$router.push(`/${this.$parent.baseUrlPath}/businessTravelHelper/index`);
            },
            toFlight() {
                if (this.message) {
                    this.showAlert = true;
                    this.leftButton = '知道了';
                }else if(this.toAdd==true){
                    this.$router.push(`/${this.$parent.baseUrlPath}/businessTravelAdd`);
                }else{
                    this.$router.push(`/${this.$parent.baseUrlPath}/businessTravel`);
                }
                
            },
            toTrain() {
                if (this.message) {
                    this.showAlert = true;
                    this.leftButton = '知道了';
                }else if(this.toAdd==true){
                    this.$router.push(`/${this.$parent.baseUrlPath}/businessTravelAdd`);
                }else{
                    location.href="//m.lvmama.com/train/?isBusinessTravel=true&newBusinessTravel=true";
                }
            },
            concatFlightData(arr){
                for (let i = 0; i < arr.length; i++) {
                    this.flightList.push(arr[i]);
                }
                let allListArr = this.flightList;
                this.flightList = this.sortByTime(allListArr).slice(0,5);
                this.$parent.showLoading = false;
                let obj = {
                    key:'businessOrders',
                    val:this.flightList
                }
                try{
                    this.initData(obj);
                }catch(e){}
            },
            concatWaitData(arr){
                for (let i = 0; i < arr.length; i++) {
                    this.waitList.push(arr[i]);
                }
                let allListArr = this.waitList;

                for (let i = 0; i < allListArr.length; i++) {
                    if (allListArr[i].orderListType == 'flight') {
                        allListArr[i].restTime = this.getRestTime(formatIOSDate(allListArr[i].limitTime));
                    } else {
                        allListArr[i].restTime = this.getRestTime(formatIOSDate(allListArr[i].finalPaymentTime));
                    }
                }
                this.waitList = this.sortLeastTime(allListArr);
                let obj = {
                    key:'businessWaitOrders',
                    val:this.waitList
                }
                try{
                    this.initData(obj);
                }catch(e){}
                this.$nextTick(() => {
                    // this.finishLoad = true;
                    this.$parent.showLoading = false;
                    if (this.waitList.length == 1) {
                        this.onlyOneItemWidth = 7.1;
                    }else{
                        this.onlyOneItemWidth = 6.4;
                    }
                    lQuery('.wait_for_deal_list_wrap').css('width',`${this.onlyOneItemWidth*this.waitList.length}rem`);
                });
            },
            getData(){
                this.$parent.showLoading = true;
                setTimeout(() => {
                    this.finishLoad = true;
                },300);
                 getFlightBusinessTravel(this.userId,1,10).then((data) => {
                    if (data.code == 1 && data.data.length>0) {
                        for (var i = 0; i < data.data.length; i++) {
                            data.data[i].orderListType = 'flight';
                        }
                        this.flightListData = data.data;
                        this.concatFlightData(this.flightListData);
                    }else{
                        this.flightListData = [];
                        this.concatFlightData(this.flightListData);
                    }
                    
                },()=>{
                    this.$parent.showLoading = false;
                });

                getFlightWaitBusinessTravel(this.userId,1,1000).then((data) => {
                    if (data.code ==1 && data.data.length>0) {
                        for (var i = 0; i < data.data.length; i++) {
                            data.data[i].orderListType = 'flight';
                        }
                        this.flightWaitData = data.data;
                        this.concatWaitData(this.flightWaitData);
                    }else{
                        this.flightWaitData = [];
                        this.concatWaitData(this.flightWaitData);
                    }
                    
                },()=>{
                    this.$parent.showLoading = false;
                });

                getTrainBusinessTravel(this.userId,1,10).then((data) => {
                    if (data.code == 1 && data.data.travelOrderList.length>0) {
                        for (var i = 0; i < data.data.travelOrderList.length; i++) {
                            data.data.travelOrderList[i].orderListType = 'train';
                        }
                        this.trainListData = data.data.travelOrderList;
                        this.concatFlightData(this.trainListData);
                    }else{
                        this.trainListData = [];
                        this.concatFlightData(this.trainListData);
                    }
                    
                },()=>{
                    this.$parent.showLoading = false;
                });

                getTrainWaitBusinessTravel(this.userId).then((data) => {
                    if (data.code ==1 && data.data.travelOrderList.length>0) {
                        for (var i = 0; i < data.data.travelOrderList.length; i++) {
                            data.data.travelOrderList[i].orderListType = 'train';
                        }
                        this.trainWaitData = data.data.travelOrderList;
                        this.concatWaitData(this.trainWaitData);
                    }else{
                        this.trainWaitData = [];
                        this.concatWaitData(this.trainWaitData);
                    }
                   
                },()=>{
                    this.$parent.showLoading = false;
                });
            },

            validateAccount(){
                this.message = '';
                getValidateAccount().then((data) => {
                    if (data.code == 1) {
                         this.toAdd=false;
                        this.getData();
                    }else if(data.code == -2){
                        this.toAdd=false;
                        this.message = data.message;
                        this.showAlert = true;
                        this.leftButton = '知道了';
                    }else if(data.code == -3){
                        this.toAdd=false;
                        this.message = '您的账户暂时无法正常使用，请与贵公司相关负责人进行确认';
                        this.showAlert = true;
                        this.leftButton = '知道了';
                    }else{
                        let businessTravelUser = {
                                key: 'businessTravelUser',
                                val: ''
                            };
                        try{
                            this.initData(businessTravelUser);
                        }catch(e){}
                        removeStore("businessTravelUser",this);
                        if(this.toAdd!=true){
                            this.$router.push(`/${this.$parent.baseUrlPath}/businessTravelAdd`);
                        }
                    }
                });
            },
            
            toApproveClick(){
                this.$router.push(`/${this.$parent.baseUrlPath}/businessTravelApprove`);
            },

            toAllOrders(){
                this.$router.push(`/${this.$parent.baseUrlPath}/businessTravelAllOrders`);
            },

            businessOrderDetail(item,type){
                if (item.orderListType == 'flight') {
                    if (type == 'waitOrder') {
                        this.$router.push(`/${this.$parent.baseUrlPath}/orderDetail/${item.orderMainId}/${item.orderId}/travel?backBusinessIndex=true`);
                    }else{
                        this.$router.push(`/${this.$parent.baseUrlPath}/orderDetail/${item.orderMainId}/${item.orderId}?backBusinessIndex=true`);
                    }
                }else{
                    if (type == 'waitOrder') {
                        location.href='//m.lvmama.com/train/orderDetail/'+item.orderid+'/islvProject?backBusinessIndex=true';
                    }else{
                        location.href='//m.lvmama.com/train/orderDetail/'+item.orderid+'?backBusinessIndex=true';
                    }
                }
                setStore('backBusinessIndex',true);
            },

            getLogin(){
                if(isClient() == 1){
                    getLvSessionId().then((data) => {
                        if(data==null || data=="" || data==undefined){
                            jumpLogin();
                            removeStore("selectuserid",this);
                            return;
                        }
                        this.$parent.showLoading = true;
                        getLvUser(data).then((res) => {
                            this.$parent.showLoading = false;
                            this.userId=res.data.userId;
                            if(res.data.userId!=null && res.data.userId!=undefined && res.data.userId!=""){
                                setStore("selectuserid",this.userId);
                                this.validateAccount();
                            }else{
                                jumpLogin();
                                removeStore("selectuserid",this);
                            }
                        },()=>{
                            this.$parent.showLoading = false;
                            jumpLogin();
                            removeStore("selectuserid",this);
                        });
                    },()=>{
                        this.$parent.showLoading = false;
                        removeStore("selectuserid",this);
                   })
                }else{
                    //wap登录
                    this.$parent.showLoading = true;
                    getLvUserByCookie().then((res) => {
                        this.$parent.showLoading = false;
                        this.userId=res.data.userId;
                        if(res.data.userId!=null && res.data.userId!=undefined && res.data.userId!=""){
                            setStore("selectuserid",this.userId);
                            this.validateAccount();
                        }else{
                            jumpLogin();

                            removeStore("selectuserid",this);
                        }
                    },()=>{
                        this.$parent.showLoading = false;
                        removeStore("selectuserid",this);
                    }) 
                }
            },
            returnGo(){
                this.showAlert = false;
            },
            goBack() {
                if(isClient()==1){
                    try{
                        window.location.href = "//m.lvmama.com/flight?method=backToAppIndex";
                    }catch(e){
                        window.location.href = "//m.lvmama.com";
                    }
                    
                }else{
                    window.location.href = "//m.lvmama.com";
                }
                
            }
            
        },
        activated(){
            this.userId = '';
            this.noBusiness = false;
            this.finishLoad = false;
            this.toAdd=false;
            this.message='';
            this.flightList = [];
            this.waitList = [];
            this.flightListData = [];
            this.flightWaitData = [];
            this.trainListData = [];
            this.trainWaitData = [];
            let obj = {
                key:'businessOrders',
                val:this.flightList
            }
            try{
                this.initData(obj);
            }catch(e){}
            let waitObj = {
                key:'businessWaitOrders',
                val:this.waitList
            }
            try{
                this.initData(waitObj);
            }catch(e){}
            if(getStore("businessToAdd")!=null){
                this.toAdd=true;
            }
            removeStore("businessToAdd");
            this.getLogin();
            // this.getData();
        },
        mounted(){
            
        },
        watch: {
            
        }
    }
</script>

<style lang="scss" scoped>
@import '../../style/mixin';
    .business_travel_container {
        @include wh(100%,100%);
        background: #efeff6;
        .black_single_arrow {
            display: inline-block;
            @include wh(.26rem,.06rem);
            background: url('//m.lvmama.com/flight/image/blackSingleArrow.png') 0 0 no-repeat;
            background-size: 100% 100%;
            margin-bottom: .08rem;
        }
        .business_header {
            @include wh(100%,1.08rem);
            position: relative;
            .header_top {
                @include wh(100%,1.08rem);
                background: -webkit-gradient(left, #545464, #363640);
                background: -webkit-linear-gradient(left, #545464, #363640);
                // background: linear-gradient(left,#545464,#363640);
                .header_top_title {
                    @include wh(100%,1.08rem);
                    > div {
                        @include wh(.9rem,1.08rem);
                    }
                    .white_back {
                        @include wh(.21rem,.37rem);
                        display: inline-block;
                        background: url('//m.lvmama.com/flight/image/whiteGoBack.png') 0 0 no-repeat;
                        background-size: 100% 100%;
                        position: absolute;
                        left: .3rem;
                    }
                    .header_logo {
                        @include wh(.36rem,.36rem);
                        display: inline-block;
                        background: url('//m.lvmama.com/flight/image/businessHeaderLogo.png') -.36rem 0 no-repeat;
                        background-size: .72rem .36rem;
                        position: absolute;
                        right: 1.18rem;
                        // right: .3rem;
                    }
                    .tip {
                        background-position: 0 0;
                        position: absolute;
                        right: .3rem;
                    }
                    span {
                        @include sc(.36rem,#fff);
                        top: 50%;
                        transform: translateY(-50%);
                    }
                    .center_title {
                        @include center;
                    }
                }
                
            }
        }   
        .business_list_wrap {
            width: 100%;
            @include heightByAbsolute(1.08rem,0);
            overflow-y: scroll;
            > div {
                @include wh(100%,100%);
                position: relative;
                .header_back {
                    @include wh(100%,1.2rem);
                    background: -webkit-gradient(left, #545464, #363640);
                    background: -webkit-linear-gradient(left, #545464, #363640);
                    // background: linear-gradient(left,#545464,#363640);
                    position: absolute;
                    top: 0;
                    left: 0;
                    z-index: 1;
                }
                .business_list_container {
                    width: 94.6%;
                    position: absolute;
                    top: 0;
                    left: 2.7%;
                    z-index: 2;
                    .header_business_kind {
                        @include wh(100%,2.4rem);
                        background: #fff;
                        @include borderRadius(.1rem);
                        .business_kind_container {
                            @include wh(49.5%,1.6rem);
                            .business_kind_Logo {
                                > div {
                                    @include wh(1.1rem,1.1rem);
                                    background: url('//m.lvmama.com/flight/image/businessKindFlight.png') 0 0 no-repeat;
                                    background-size: 100% 100%;
                                }
                                > p {
                                    width: 100%;
                                    text-align: center;
                                    @include sc(.32rem,#000);
                                    margin-top: .2rem;
                                }
                            }
                        }
                        .business_kind_container:last-child {
                            border-left: 2px solid #ddd;
                            .business_kind_Logo {
                                > div {
                                    background: url('//m.lvmama.com/flight/image/businessKindTrain.png') 0 0 no-repeat;
                                    background-size: 100% 100%;
                                }
                            }
                        }
                    }
                    .business_no_container {
                        @include wh(100%,8rem);
                        > div {
                            @include wh(100%,100%);
                            .business_no_logo {
                                @include wh(3.12rem,3.12rem);
                                background: url('//m.lvmama.com/flight/image/businessNo.png') 0 0 no-repeat;
                                background-size: 100% 100%;
                            }
                            p {
                                width: 100%;
                                text-align: center;
                                color: #aaa;
                                margin-top: .6rem;
                            }
                        }
                    }
                    .list_title {
                        margin-top: .4rem;
                        margin-bottom: .3rem;
                        > p {
                            color: #666;
                        }
                        > p:nth-child(2) {
                            font-size: .24rem;
                            position: absolute;
                            right: .24rem;
                        }
                        .point_right_arrow {
                            position: absolute;
                            right: 0;
                            margin-top: .03rem;
                        }
                    }
                    .list_logo {
                        @include wh(.6rem,inherit);
                        display: inline-block;
                        padding-left: .2rem;
                        box-sizing: border-box;
                        margin-top: .05rem;
                        .flight_list_logo {
                            @include wh(.41rem,.41rem);
                            margin-top: .2rem;
                            background: url('//m.lvmama.com/flight/image/businessKindFlight.png') 0 0 no-repeat;
                            background-size: .39rem .39rem;
                        }
                        .train_list_logo {
                            @include wh(.41rem,.41rem);
                            margin-top: .2rem;
                            background: url('//m.lvmama.com/flight/image/businessKindTrain.png') 0 0 no-repeat;
                            background-size: .39rem .39rem;
                        }
                    }
                    .trip_kind {
                        @include wh(.4rem,.28rem);
                        display: inline-block;
                        background: url('//m.lvmama.com/flight/image/img.png') -2.74rem -14.49rem no-repeat;
                        background-size: 6rem;
                    }
                    .trip_double {
                        @include wh(.4rem,.28rem);
                        display: inline-block;
                        background: url('//m.lvmama.com/flight/image/img.png') -2.74rem -15.1rem no-repeat;
                        background-size: 6rem;
                    }
                    .wait_for_deal_container {
                        width: 100%;
                        .wait_for_deal_list {
                            @include wh(100%,1.4rem);
                                overflow-y: hidden;
                                overflow-x: scroll;
                                -webkit-overflow-scrolling: touch;
                             .wait_for_deal_list_wrap {
                                height: inherit;
                                .wait_for_deal_list_item {
                                    @include wh(6.3rem,inherit);
                                    background: #fff;
                                    @include borderRadius(.1rem);
                                    float: left;
                                    margin-right: .1rem;
                                    .wait_for_deal_list_content {
                                        float: right;
                                        @include wh(5.6rem,inherit);
                                        padding-right: .2rem;
                                        box-sizing: border-box;
                                        display: inline-block;
                                        > div {
                                            @include wh(100%,auto);
                                            margin-top: .15rem;
                                        }
                                        > div:first-child {
                                            font-size: .28rem;
                                            margin-top: .2rem;
                                            .endorse {
                                                margin-left: .15rem;
                                                font-size: .18rem;
                                                color: #ec702d;
                                                display: inline-block;
                                                border: 1px solid #ec702d;
                                                padding: 0 0.05rem 0 0.05rem;
                                                height: 0.35rem;
                                                line-height: 0.35rem;
                                            }
                                        }
                                        .wait_time {
                                            @include wh(auto,0.4rem);
                                            background: #f9931f;
                                            @include sc(.18rem,#fff);
                                            // padding: .08rem .2rem;
                                            @include borderRadius(.24rem);
                                            line-height: 0.4rem;
                                            padding: 0 0.2rem;
                                        }
                                        .wait_time_20 {
                                            background: #f3572a !important;
                                        }
                                        .wait_time_10 {
                                            background: #ee1a26 !important;
                                        }
                                    }
                                    .wait_for_deal_list_one {
                                        width: 6.4rem !important;
                                    }
                                    .wait_for_deal_list_content:nth-child(2) {
                                        @include sc(.22rem,#666);
                                    }
                                }
                                .wait_for_deal_list_item_one {
                                    width: 7.1rem !important;
                                }
                             }
                        }
                    }
                    .recent_list_container {
                        width: 100%;
                        .recent_list_item {
                            position: relative;
                            background: #fff;
                            @include borderRadius(.1rem);
                            margin-bottom: .1rem;
                            .list_logo {
                                float: left;
                                margin-top: .1rem;
                            }
                            .recent_list_item_mid {
                                float: left;
                                margin: .3rem 0;
                                padding-left: .1rem;
                                box-sizing: border-box;
                                > p {
                                    @include sc(.22rem,#666);
                                    margin-top: .2rem;
                                }
                                > p:first-child {
                                    @include sc(.28rem,#000);
                                    margin-bottom: .1rem;
                                    margin-top: 0;
                                }
                                .takeover_one_day {
                                    color: #aaa;
                                    > span {
                                        color: #aaa;
                                    }
                                }
                            }
                            .recent_list_item_right {
                                position: absolute;
                                top: 50%;
                                right: 0%;
                                transform: translate(0%,-90%);

                                float: right;
                                margin: .3rem 0;
                                padding-right: .2rem;
                                box-sizing: border-box;
                                > p {
                                    @include sc(.22rem,#666);
                                    text-align: right;
                                    margin-top: .2rem;
                                }
                                > p:first-child {
                                    @include sc(.28rem,#000);
                                }
                                .fail_order {
                                    color: #ec702d !important;
                                }
                            }
                            .recent_list_item_bottom {
                                float: left; 
                                padding-left: .6rem;
                                box-sizing: border-box;
                                .order_line {
                                    @include wh(4.5rem,1px);
                                    border-top: 1px solid #ddd;
                                    float: left; 
                                }
                            }
                        }
                        .business_loaded{
                            height: 1rem;
                            line-height: 1rem;
                            text-align: center;
                        }
                    }
                }
            }
        }
                    
    }
</style>
