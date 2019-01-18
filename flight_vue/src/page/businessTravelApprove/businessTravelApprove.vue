 <template>
    <div class="business_travel_container">
        <head-top :depart="depart" :goPage="goPage"></head-top>
        <div class="business_no_container" v-if="waitList.length==0">
            <div class="xy_flex">
                <div>
                    <div class="business_no_logo"></div>
                    <p>还没差旅订单</p>
                </div>
            </div>
        </div>
        <div class="business_list_container" v-if="waitList.length>0">
            <div class="wait_for_deal_container">
                <div class="wait_for_deal_list">
                    <ul class="wait_for_deal_list_wrap clearfix">
                        <li class="wait_for_deal_list_item" v-for="(item,index) in waitList" :key="index" @click="businessOrderDetail(item)">
                            <div v-if="item.orderListType == 'flight'">
                                <div class="list_logo">
                                    <div class="flight_list_logo"></div>
                                </div>
                                <div class="wait_for_deal_list_content">
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
                                    <div class="y_flex between_x_flex">
                                        <div class="order_id">订单号 {{item.orderNo}}</div>
                                    </div>
                                </div>
                            </div>
                            <div v-if="item.orderListType == 'train'">
                                <div class="list_logo">
                                    <div class="train_list_logo"></div>
                                </div>
                                <div class="wait_for_deal_list_content">
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
                                    <div class="y_flex between_x_flex">
                                        <div class="order_id">订单号 {{item.orderid}}</div>
                                    </div>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <!-- <alert-tip :tipContent="message" :leftButton="leftButton" v-if="showAlert" @closeAlert="returnGo"></alert-tip> -->
    </div>
</template>

<script>
	import headTop from '../../components/header/head'
    import { lQuery } from '../../plugins/lQuery'
    import { mapActions,mapState } from 'vuex'
    import { getTrainWaitBusinessTravel,getFlightWaitBusinessTravel } from '../../service/getData'
    import { formatIOSDate,weekFormat,setStore,getStore,removeStore } from '../../config/mUtils'
    import alertTip from '../../components/common/alertTip'
    export default {
        data(){
            return{
            	depart:'待我审批',
                noBusiness: false,
                goPage:'backIndex',
                waitList: [],
                flightWaitData: [],
                trainWaitData: [],
                userId: getStore('selectuserid'),
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

            businessOrderDetail(item){
                if (item.orderListType == 'flight') {
                    this.$router.push(`/${this.$parent.baseUrlPath}/orderDetail/${item.orderMainId}/${item.orderId}/travel?backBusinessApprove=true`);
                }else{
                    location.href='//m.lvmama.com/train/orderDetail/'+item.orderid+'/islvProject?backBusinessApprove=true';
                }
                setStore('backBusinessApprove',true);
            },

            concatWaitData(arr){
                for (var i = 0; i < arr.length; i++) {
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
            },

            getData(){
                getFlightWaitBusinessTravel(this.userId,1,1000).then((data) => {
                    if (data.code ==1 && data.data.length>0) {
                        for (var i = 0; i < data.data.length; i++) {
                            data.data[i].orderListType = 'flight';
                        }
                        this.flightWaitData = data.data;
                        this.concatWaitData(this.flightWaitData);
                    }
                    
                });

                getTrainWaitBusinessTravel(this.userId).then((data) => {
                    if (data.code ==1 && data.data.travelOrderList.length>0) {
                        for (var i = 0; i < data.data.travelOrderList.length; i++) {
                            data.data.travelOrderList[i].orderListType = 'train';
                        }
                        this.trainWaitData = data.data.travelOrderList;
                        this.concatWaitData(this.trainWaitData);
                    }
                   
                });
            },

        },

        activated(){
            this.waitList = [];
            this.flightWaitData = [];
            this.trainWaitData = [];
            this.userId = getStore('selectuserid');
            this.getData();
        },
        mounted(){

        },
        computed:{
            ...mapState([
                    // 'businessWaitOrders'
                ])
        },
        watch: {
            
        }
    }
</script>

<style lang="scss" scoped>
@import '../../style/mixin';
    .business_travel_container {
        position: relative;
        @include wh(100%,100%);
        background: #efeff6;
        .business_no_container {
            // @include heightByAbsolute(3.48rem,0);
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
        .business_list_container {
        	@include heightByAbsolute(0.9rem,0);
            overflow: hidden;
            overflow-y: scroll;
            padding: 0.2rem;
            .list_logo {
                @include wh(10%,inherit);
                display: inline-block;
                padding-left: .2rem;
                box-sizing: border-box;
                margin-top: .05rem;
                .flight_list_logo {
                    @include wh(.4rem,.4rem);
                    margin-top: .2rem;
                    background: url('//m.lvmama.com/flight/image/businessKindFlight.png') 0 0 no-repeat;
                    background-size: .4rem .4rem;
                }
                .train_list_logo {
                    @include wh(.4rem,.4rem);
                    margin-top: .2rem;
                    background: url('//m.lvmama.com/flight/image/businessKindTrain.png') 0 0 no-repeat;
                    background-size: .4rem .4rem;
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
                    @include wh(100%,1.9rem);
                        
                     .wait_for_deal_list_wrap {
                        height: inherit;
                        .wait_for_deal_list_item {
                            @include wh(100%,inherit);
                            margin-bottom: 0.2rem;
                            background: #fff;
                            @include borderRadius(.1rem);
                            float: left;
                            margin-right: .1rem;
                            .wait_for_deal_list_content {
                                float: right;
                                @include wh(90%,inherit);
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
                                        padding: 0 0.05rem;
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
                                .order_id {
                                	@include sc(.22rem,#aaa);
                                }
                            }
                            .wait_for_deal_list_content:nth-child(2) {
                                @include sc(.22rem,#666);
                            }
                        }
                     }
                }
            }
            
        }
    }
</style>
