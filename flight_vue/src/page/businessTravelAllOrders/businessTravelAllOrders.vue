 <template>
    <div class="business_travel_container">
        <head-top :depart="depart" :goPage="goPage"></head-top>
        <div class="business_list_container">
            <div class="header_business_kind y_flex">
                <div class="business_kind_container xy_flex" @click="getOrders('flight')">
                    <div class="business_kind_Logo">
                        <p class="xy_flex">机票</p>
                        <i v-if="type=='flight'"></i>
                    </div>
                </div>
                <div class="business_kind_container xy_flex" @click="getOrders('train')">
                    <div class="business_kind_Logo">
                        <p class="xy_flex">火车票</p>
                        <i v-if="type=='train'"></i>
                    </div>
                </div>
            </div>
            <div class="business_no_container" v-if="noBusiness">
                <div class="xy_flex">
                    <div>
                        <div class="business_no_logo"></div>
                        <p>还没差旅订单</p>
                    </div>
                </div>
            </div>
            <ul class="recent_list_container" id="content-ul">
                <li class="recent_list_item clearfix" v-for="(item,index) in orderList" @click="businessOrderDetail(item)" :id="'content-li'+index">
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
                        <div class="recent_list_item_bottom clearfix" v-if="item.flightOrderListFlightInfos[0].returnFlightNo != ''">
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
                            <p>{{item.showDepTime}} <span class="takeover_one_day">- {{item.totime}}<span v-if="item.takeoverOneDay">+1天</span></span></p>
                        </div>
                        <div class="recent_list_item_right">
                            <p :class="{'fail_order': item.orderStatus == '已取消' || item.orderStatus == '改签失败' || item.orderStatus == '占座失败'}">{{item.frontorderstate}}</p>
                            <p>￥{{item.paidAmount}}</p>
                        </div>
                        <!-- <div class="recent_list_item_bottom clearfix">
                            <div class="order_line"></div>
                            <div class="recent_list_item_mid">
                                <p>成都  上海</p>
                                <p>K290 高级动卧2人</p>
                                <p>2017/10/2周日 08: 31 <span>-21:34+1天</span></p>
                            </div>
                        </div> -->
                    </div>
                </li>
                <div class="business_loaded" v-if="isLoaded">
                    <p>已显示完全部差旅订单</p>
                </div>
            </ul>
            
        </div>
        
        <!-- <alert-tip :tipContent="message" :leftButton="leftButton" v-if="showAlert" @closeAlert="returnGo"></alert-tip> -->
    </div>
</template>

<script>
    import headTop from '../../components/header/head'
    import { lQuery } from '../../plugins/lQuery'
    import { mapActions,mapState } from 'vuex'
    import { getFlightBusinessTravel,getTrainBusinessTravel } from '../../service/getData'
    import { formatIOSDate,weekFormat,setStore,getStore,removeStore,loadMore } from '../../config/mUtils'
    import alertTip from '../../components/common/alertTip'
    export default {
        data(){
            return{
            	depart:'全部差旅订单',
                type: 'flight',
                goPage:'backIndex',
                noBusiness: false,
                orderList: [],
                flightListData: [],
                trainListData: [],
                userId:getStore('selectuserid'),
                flightPage:1,
                trainPage:1,
                scrollLocation:'',
                isRequest:true,
                isLoaded:false,
            }
        },
        props: [
            
        ],
        components: {
            headTop,
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
                        if (arr[i].flightOrderListFlightInfos[0].returnFlightNo != "") {
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
                            arr[i].takeoverOneDay = true;
                        } else {
                            arr[i].takeoverOneDay = false;
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

            businessOrderDetail(item){
                if(item.orderListType == 'flight'){
                    this.$router.push(`/${this.$parent.baseUrlPath}/orderDetail/${item.orderMainId}/${item.orderId}?backBusinessAllOrders=true`);
                }else{
                    location.href='//m.lvmama.com/train/orderDetail/'+item.orderid+'?backBusinessAllOrders=true';
                }
                setStore('backBusinessAllOrders',true);
            },

            concatFlightData(arr){
                for (var i = 0; i < arr.length; i++) {
                    this.orderList.push(arr[i]); 
                }
                let allArr = this.orderList;
                this.orderList = this.sortByTime(allArr);
                let obj = {
                    key:'businessOrders',
                    val:this.orderList
                }
                try{
                    this.initData(obj);
                }catch(e){}
            },

            getData(type){
                if (type == 'flight') {
                    this.$parent.showLoading = true;
                    this.noBusiness = false;
                    this.isLoaded = false;
                    getFlightBusinessTravel(this.userId,this.flightPage,10).then((data) => {
                        this.$parent.showLoading = false;
                        this.isRequest = true;
                        if (data.code == 1) {
                            if (data.data.length>0) {
                                if (data.data.length<10) {
                                    this.isRequest = false;
                                    this.isLoaded = true;
                                }
                                for (var i = 0; i < data.data.length; i++) {
                                    data.data[i].orderListType = 'flight';
                                }
                                this.flightListData = data.data;
                                this.concatFlightData(this.flightListData);
                            }else{
                                this.isRequest = false;
                                if (this.orderList.length==0) {
                                    this.noBusiness = true;
                                }else{
                                    this.isLoaded = true;
                                }
                            }
                        }else{
                            this.noBusiness = true;
                            this.isLoaded = false;
                            this.orderList = [];
                        }
                    },()=>{
                        this.noBusiness = true;
                        this.$parent.showLoading = false;
                        this.isRequest = true;
                        this.isLoaded = false;
                    });
                }else{
                    this.$parent.showLoading = true;
                    this.noBusiness = false;
                    this.isLoaded = false;
                    getTrainBusinessTravel(this.userId,this.trainPage,10).then((data) => {
                        this.$parent.showLoading = false;
                        this.isRequest = true;
                        if (data.code == 1) {
                            if (data.data.travelOrderList.length>0) {
                                if (data.data.travelOrderList.length<10) {
                                    this.isRequest = false;
                                    this.isLoaded = true;
                                }
                                for (var i = 0; i < data.data.travelOrderList.length; i++) {
                                    data.data.travelOrderList[i].orderListType = 'train';
                                }
                                this.trainListData = data.data.travelOrderList;
                                this.concatFlightData(this.trainListData);
                            }else{
                                this.isRequest = false;
                                if (this.orderList.length==0) {
                                    this.noBusiness = true;
                                }else{
                                    this.isLoaded = true;
                                }
                            }
                        }else{
                            this.noBusiness = true;
                            this.isLoaded = false;
                            this.orderList = [];
                        }
                    },()=>{
                        this.noBusiness = true;
                        this.$parent.showLoading = false;
                        this.isRequest = true;
                        this.isLoaded = false;
                    });
                }
            },

            getOrders(type){
                this.type = type;
                if (type == 'flight') {
                    this.orderList = [];
                    this.flightPage = 1;
                    this.getData('flight');
                }else{
                    this.orderList = [];
                    this.trainPage = 1;
                    this.getData('train');
                }
            },

            //监听滚动位置
            watchScrollLocation(){
                this.scrollLocation = document.getElementById('content-ul').scrollTop;
            },
            
        },
        activated(){
            this.orderList = [];
            this.flightListData = [];
            this.trainListData = [];
            this.flightPage = 1;
            this.trainPage = 1;
            this.type = 'flight';
            this.isRequest = true;
            this.noBusiness = false;
            this.isLoaded = false;
            this.userId = getStore('selectuserid');
            this.getData(this.type);
            // this.type = '';
           this.$nextTick(() => {
                document.getElementById('content-ul').addEventListener('scroll',this.watchScrollLocation);
            });
        },
        mounted(){

        },
        computed:{
            ...mapState([
                    // 'businessOrders'
                ])
        },
        watch: {
            scrollLocation(newVal,oldVal){
            try{
                if (newVal+document.getElementById('content-ul').clientHeight>document.getElementsByClassName('recent_list_item')[0].offsetHeight*this.orderList.length&&this.isRequest == true) {
                        this.isRequest = false;
                        if (this.type == 'flight') {
                            this.flightPage = this.flightPage+1;
                        }else{
                            this.trainPage = this.trainPage+1;
                        }
                        this.getData(this.type);
                }
            }catch(e){
                ;
            }
                
            }
        }
    }
</script>

<style lang="scss" scoped>
@import '../../style/mixin';
    .business_travel_container {
        position: relative;
        @include wh(100%,100%);
        background: #efeff6;
        .black_single_arrow {
            display: inline-block;
            @include wh(.26rem,.06rem);
            background: url('//m.lvmama.com/flight/image/blackSingleArrow.png') 0 0 no-repeat;
            background-size: 100% 100%;
            margin-bottom: .08rem;
        }

        .business_list_container {
            width: 100%;
            position: absolute;
            top: 0.9rem;
            left: 0;
            bottom: 0rem;
            .business_no_container {
                @include heightByAbsolute(1.48rem,0);
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
            .header_business_kind {
                height: 0.75rem;
                background: #fff;
                // @include borderRadius(.1rem);
                // margin: 0.2rem 0.2rem 0 0.2rem;
                .business_kind_container {
                    @include wh(49.5%,0.6rem);
                    .business_kind_Logo {
                        position: relative;
                        > div {
                            @include wh(1.1rem,1.1rem);
                            background: url('//m.lvmama.com/flight/image/businessKindFlight.png') 0 0 no-repeat;
                            background-size: 100% 100%;
                        }
                        > p {
                            width: 100%;
                            text-align: center;
                            @include sc(.32rem,#000);
                        }
                        > i{
                            position: absolute;
                            background: -webkit-linear-gradient(left, #fe686c, #fd3c71);
                            background: -webkit-gradient(left, #fe686c, #fd3c71);
                            @include wh(100%,2px);
                            bottom: 0;
                            left: 0;
                            top: .55rem;
                        }
                    }
                }
                .business_kind_container:last-child {
                    // border-left: 2px solid #ddd;
                    .business_kind_Logo {
                        > div {
                            background: url('//m.lvmama.com/flight/image/businessKindTrain.png') 0 0 no-repeat;
                            background-size: 100% 100%;
                        }
                    }
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
            .recent_list_container {
                position: relative;
                overflow: hidden;
                overflow-y: scroll;
                -webkit-overflow-scrolling: touch;
                height: 90%;
                width: 100%;
                padding: 0.2rem 0.2rem 0 0.2rem;
                .recent_list_item {
                    position: relative;
                    background: #fff;
                    @include borderRadius(.1rem);
                    margin-bottom: .2rem;
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
            .bottom{
                height: 1rem;
                line-height: 1rem;
                text-align: center;
                position: relative;
                bottom: 1rem;
            }
            
        }


    }
</style>
