 <template>
    <div class="airport_transportation_container">
        <head-top :depart="title"></head-top>
        <div class="header_back" @click="goBack"></div>
        <div class="airport_transportation_wrap margin">
            <div class="send_container">
                <div class="flight_info_container y_flex between_x_flex common_style" @click="spreadPickAbove">
                    <div class="flight_info">
                        <div class="y_flex transition_kind">
                            <p v-if="aboveInfo.sceneType == 'SJ'">送我去机场</p>
                            <p v-if="aboveInfo.sceneType == 'JJ'">来机场接我</p>
                            <p>{{aboveInfo.airportName}}{{aboveInfo.terminalCode}}航站楼</p>
                        </div>
                        <div class="plane_info" v-if="aboveInfo.planeTime != undefined">{{aboveInfo.planeCode}} 预计约{{aboveInfo.planeTime.substring(0,16)}}
                            <span v-if="aboveInfo.sceneType == 'SJ'">起飞</span>
                            <span v-if="aboveInfo.sceneType == 'JJ'">到达</span>
                        </div>
                    </div>
                    <div class="picker_container y_flex right_flex">
                        <div class="picker" :class="{'picked':aboveInfo.able}"></div>
                    </div>    
                </div>
                <ul class="picker_menu_container">
                    <li class="picker_menu_item y_flex common_style" @click="chooseAddress('above')">
                        <p v-if="aboveInfo.sceneType == 'SJ'">出发</p>
                        <p v-if="aboveInfo.sceneType == 'JJ'">送至</p>
                        <p class="placeholderStyle" v-if="aboveInfo.sceneType == 'SJ' && aboveInfo.poiInfo.address == '' && aboveAddress == ''">请选择出发地点</p>
                        <p class="placeholderStyle" v-if="aboveInfo.sceneType == 'JJ' && aboveInfo.poiInfo.address == '' && aboveAddress == ''">请选择送达地点</p>
                        <p class="ellipsis" v-if="aboveAddress != ''">{{aboveAddress.area}}{{aboveAddress.location}}</p>
                        <p class="ellipsis" v-if="aboveAddress 
                        == '' && aboveInfo.poiInfo != undefined">{{aboveInfo.poiInfo.address}}</p>
                        <span class="point_right_arrow"></span>
                    </li>
                    <li class="picker_menu_item y_flex common_style" v-if="aboveInfo.sceneType == 'SJ'" @click="openPicker">
                        <p>用车时间</p>
                        <p class="placeholderStyle" v-if="aboveInfo.useTime == '' && timeResult.date == undefined">请选择用车时间<br/>
                            <span class="time_tip">建议提前2小时到达机场，以免误机</span></p>
                        <p v-if="timeResult.date == undefined">{{aboveInfo.useTime | showTransferTime}}</p>
                        <p v-if="timeResult.date != undefined">
                            {{timeResult.date}} {{timeResult.hour}}:{{timeResult.minutes}}<br/>
                            <span class="time_tip">建议提前2小时到达机场，以免误机</span>
                        </p>
                        <span class="point_right_arrow"></span>
                    </li>
                    <li class="picker_menu_item y_flex common_style car_type_container">
                        <p>车型选择</p>
                        <div class="y_flex" @click="pickCar('above')" v-show="!aboveCarNone">
                            <div class="y_flex between_x_flex car_type" v-if="aboveInfo.car && showAboveCar == null">
                                <div>
                                    <p>{{aboveInfo.car.vehicleName}}</p>
                                    <p>{{aboveInfo.car.productName}}</p>
                                </div>
                                <div>
                                    <span>&#165;</span>{{aboveInfo.car.salePrice}}
                                </div>
                            </div>
                            <div class="y_flex between_x_flex car_type" v-if="showAboveCar != null">
                                <div>
                                    <p>{{showAboveCar.vehicleName}}</p>
                                    <p>{{showAboveCar.productName}}</p>
                                </div>
                                <div>
                                    <span>&#165;</span>{{showAboveCar.salePrice}}
                                </div>
                            </div>
                            <div class="y_flex car_type placeholderStyle" v-if="aboveInfo.car == null && showAboveCar == null">请选择车型</div>
                            <span class="point_right_arrow"></span>
                        </div>
                        <div v-show="aboveCarNone">暂无可用车型</div>
                    </li>
                </ul>
            </div>
            <div class="send_container" v-if="transferInfo.double">
                <div class="flight_info_container y_flex between_x_flex common_style" @click="spreadPickBelow">
                    <div class="flight_info">
                        <div class="y_flex transition_kind">
                            <p v-if="belowInfo.sceneType == 'SJ'">送我去机场</p>
                            <p v-if="belowInfo.sceneType == 'JJ'">来机场接我</p> 
                            <p>{{belowInfo.airportName}}{{belowInfo.terminalCode}}航站楼</p>
                        </div>
                        <div class="plane_info" v-if="belowInfo.planeTime != undefined">{{belowInfo.planeCode}} 预计{{belowInfo.planeTime.substring(0,16)}}
                            <span v-if="belowInfo.sceneType == 'SJ'">起飞</span>
                            <span v-if="belowInfo.sceneType == 'JJ'">到达</span></div>
                    </div>
                    <div class="picker_container y_flex right_flex">
                        <div class="picker" :class="{'picked':belowInfo.able}"></div>
                    </div>    
                </div>
                <ul class="picker_menu_container">
                    <li class="picker_menu_item y_flex common_style" @click="chooseAddress('below')">
                        <p v-if="belowInfo.sceneType == 'SJ'">出发</p>
                        <p v-if="belowInfo.sceneType == 'JJ'">送至</p>
                        <p class="placeholderStyle" v-if="belowInfo.sceneType == 'SJ' && belowInfo.poiInfo.address == '' && belowAddress == ''">请选择出发地点</p>
                        <p class="placeholderStyle" v-if="belowInfo.sceneType == 'JJ' && belowInfo.poiInfo.address == '' && belowAddress == ''">请选择送达地点</p>
                        <p class="ellipsis" v-if="belowAddress != ''">{{belowAddress.area}}{{belowAddress.location}}</p>                        
                        <p class="ellipsis" v-if="belowAddress == '' && belowInfo.poiInfo != undefined">{{belowInfo.poiInfo.address}}</p>                        
                        <span class="point_right_arrow"></span>
                    </li>
                    <li class="picker_menu_item y_flex common_style" v-if="belowInfo.sceneType == 'SJ'" @click="openPicker">
                        <p>用车时间</p>
                        <p class="placeholderStyle" v-if="belowInfo.useTime == '' && timeResult.date == undefined">请选择用车时间<br/>
                            <span class="time_tip">建议提前2小时到达机场，以免误机</span></p>
                        <p v-if="timeResult.date == undefined">{{belowInfo.useTime | showTransferTime}}</p>
                        <p v-if="timeResult.date != undefined">{{timeResult.date}} {{timeResult.hour}}:{{timeResult.minutes}}<br/>
                            <span class="time_tip">建议提前2小时到达机场，以免误机</span></p>
                        <span class="point_right_arrow"></span>
                    </li>
                    <li class="picker_menu_item y_flex common_style car_type_container">
                        <p>车型选择</p>
                        <div class="y_flex" @click="pickCar('below')" v-show="!belowCarNone">
                            <div class="y_flex between_x_flex car_type" v-if="belowInfo.car && showBelowCar == null">
                                <div>
                                    <p>{{belowInfo.car.vehicleName}}</p>
                                    <p>{{belowInfo.car.productName}}</p>
                                </div>
                                <div>
                                    <span>&#165;</span>{{belowInfo.car.salePrice}}
                                </div>
                            </div>
                            <div class="y_flex between_x_flex car_type" v-if="showBelowCar != null">
                                <div>
                                    <p>{{showBelowCar.vehicleName}}</p>
                                    <p>{{showBelowCar.productName}}</p>
                                </div>
                                <div>
                                    <span>&#165;</span>{{showBelowCar.salePrice}}
                                </div>
                            </div>
                            <div class="y_flex car_type placeholderStyle" v-if="belowInfo.car == null && showBelowCar == null">请选择车型</div>
                            <span class="point_right_arrow"></span>
                        </div>
                        <div v-show="belowCarNone">暂无可用车型</div>
                    </li>
                </ul>
            </div>
        </div>
        <div class="transition_state" v-if="(!transferInfo.double && aboveInfo.able && !aboveCarNone) || (transferInfo.double && ((aboveInfo.able && !aboveCarNone) || (belowInfo.able && !belowCarNone)))" v-show="refundState[0] != '' || refundState[1] != ''">
            <span class="y_flex" @click="openState">
                <img src="//m.lvmama.com/flight/image/illustrate_icon.png" alt="">
                退改说明
            </span>
        </div>
        <div class="submit_button_container xy_flex">
            <div class="submit_button xy_flex" @click="submitTransfer">完成</div>
        </div>
        <!-- 退改说明展开 -->
        <div class="mask" v-show="showState && (refundState[0] != '' || refundState[1] != '')" @click="closeState"></div>
        <div class="transition_state_container" v-show="showState && (refundState[0] != '' || refundState[1] != '')">
            <div class="toggle_title_container y_flex" v-if="transferInfo.double && (refundState[0] != '' || refundState[1] != '')">
                <div class="xy_flex" @click="toggleRefundState('0')" :class="{'mark_picked': showRefundState == refundState[0]}" v-if="refundState[0] != ''">{{refundState[0].title}}</div>
                <div class="xy_flex" @click="toggleRefundState('1')" :class="{'mark_picked': showRefundState == refundState[1]}" v-if="refundState[1] != ''">{{refundState[1].title}}</div>
                <!-- <span class="mark_underline"></span> -->
            </div>
            <div class="refund_state_container" v-if="showRefundState != ''">
                <div class="refund_contant">
                    <div class="refund_item_container" v-for="item in showRefundState.content">
                        <div class="refund_item_title" :class="{'bigSize':item.title == '预订须知'}">
                            <strong :class="{'bigSize':item.title == '预订须知'}">{{item.title}}</strong>
                        </div>
                        <div class="refund_item_detail">
                            <span v-html="item.content"></span>
                        </div>
                    </div>
                </div>
            </div>
            <!-- <div class="refund_state_container" v-if="refundState.length > 1 && refundState[1].show && this.transferInfo.double">
                <div class="refund_contant">
                    <div class="refund_item_container" v-for="item in refundState[1].content">
                        <div class="refund_item_title" :class="{'bigSize':item.title == '预订须知'}">
                            <strong :class="{'bigSize':item.title == '预订须知'}">{{item.title}}</strong>
                        </div>
                        <div class="refund_item_detail">
                            <span v-html="item.content"></span>
                        </div>
                    </div>
                </div>
            </div> -->
            <div class="submit_button_container xy_flex">
                <div class="submit_button xy_flex" @click="closeState">确定</div>
            </div>
        </div>
        <time-picker v-if="planeTime" v-show="timePickerStatus" :result="timeResult" :startTime="planeTime"></time-picker>
        <alert-tip :tipContent='alertContent' v-show="showTip" :leftButton="leftButton" @rightHandler="rightHandler" @closeAlert="showTip = false" :rightButton="rightButton"></alert-tip>
    </div>
</template>

<script>
    import { lQuery } from '../../plugins/lQuery'
    import { mapActions,mapState } from 'vuex'
    import headTop from '../../components/header/head'
    import timePicker from '../../components/common/transfer-time-picker-component'
    import alertTip from '../../components/common/alertTip'
    import { animate,formatIOSDate,weekFormat,setStore,getStore } from '../../config/mUtils.js'
    import { getTransferProducts,getTransferProductDetail } from '../../service/getData'
    let map = new BMap.Map("allmap");
    let localSearch = new BMap.LocalSearch(map);

    export default {
        data(){
            return{
                title: '',
                spreadAboveHeight: '3.76rem',
                spreadBelowHeight: '2.36rem',
                planeTime: '',
                timeResult: {},
                timePickerStatus: false,
                aboveInfo: '',
                belowInfo: '',
                abovePoiInfo: '',//上半部分地址经纬度
                belowPoiInfo: '',//下半部分地址经纬度
                aboveParam: {
                    "scene": '',
                    "locationCode": '',
                    "terminalCode": '',
                    "poiInfo": {
                        "name": "",
                        "address": "",
                        "longitude": '',
                        "latitude": ''
                    },
                    "useTime": '',
                    "locationType": "AIRPORT"
                },//上半部分车型请求参数
                belowParam: {
                    "scene": '',
                    "locationCode": '',
                    "terminalCode": '',
                    "poiInfo": {
                        "name": "",
                        "address": "",
                        "longitude": '',
                        "latitude": ''
                    },
                    "useTime": '',
                    "locationType": "AIRPORT"
                },//下半部分车型请求参数
                alertContent: '',//弹框内容
                showTip: false,//弹框展示
                goCity: true,//判断是否是出发城市
                refundState: ['',''],
                showRefundState: '',
                showState: false,
                aboveCarNone: false,//上半部分没有车型
                belowCarNone: false,//下半部分没有车型
                rightButton: '',
                leftButton: '知道了'
            }
        },
        props: [
            
        ],
        components: {
            headTop,
            timePicker,
            alertTip
        },
        created() {
            
        },
        mounted(){
            
        },
        methods: {
            ...mapActions([
                'initData',
                'initNoStorageData'
            ]),
            spreadPickAbove() {
                if (this.aboveInfo.able) {
                    this.aboveInfo.able = false;
                    animate(lQuery('.picker_menu_container')[0],{height: '0'});
                } else {
                    this.aboveInfo.able = true;
                    animate(lQuery('.picker_menu_container')[0],{height: this.spreadAboveHeight});
                };
            },
            spreadPickBelow() {
                if (this.belowInfo.able) {
                    this.belowInfo.able = false;
                    animate(lQuery('.picker_menu_container')[1],{height: '0'});
                } else {
                    this.belowInfo.able = true;
                    animate(lQuery('.picker_menu_container')[1],{height: this.spreadBelowHeight});
                }
            },
            //打开时间选择
            openPicker() {
                this.timePickerStatus = true;
            },
            //处理选择时间传过来的值,获取时间戳
            getTimeResultStamp(time) {
                let date = time.date.split(' ')[0].replace(/-/g,'/');
                return new Date(`${date} ${time.hour}:${time.minutes}`).getTime();
            },
            chooseAddress(kind) {
                if (this.transferInfo.double) {
                    if (this.transferInfo.go) {
                        if (kind == 'above') {
                            this.$router.push(`/${this.$parent.baseUrlPath}/transferAddressSearch/${kind}/send`);
                        } else {
                            this.$router.push(`/${this.$parent.baseUrlPath}/transferAddressSearch/${kind}/pick`);
                        }
                    } else {
                        if (kind == 'above') {
                            this.$router.push(`/${this.$parent.baseUrlPath}/transferAddressSearch/${kind}/pick`);
                        } else {
                            this.$router.push(`/${this.$parent.baseUrlPath}/transferAddressSearch/${kind}/send`);
                        }
                    }
                } else {
                    if (this.transferInfo.go) {
                        this.$router.push(`/${this.$parent.baseUrlPath}/transferAddressSearch/${kind}/send`);
                    } else {
                        this.$router.push(`/${this.$parent.baseUrlPath}/transferAddressSearch/${kind}/pick`);
                    }
                }
            },
            //上半部分获取经纬度
            searchAboveLocation(address,callBack) {
                let keyword = address;
                // this.$parent.showLoading = true;
                localSearch.setSearchCompleteCallback((res) => {
                    if (res.getPoi(0) == undefined) {
                        this.abovePoiInfo = '';
                        callBack('noAboveCar');
                    } else {
                        this.abovePoiInfo = res.getPoi(0).point;
                        callBack(this.abovePoiInfo);
                    }
                    // this.$parent.showLoading = false;
                });
                localSearch.search(keyword);
            },
            //下半部分获取经纬度
            searchBelowLocation(address,callBack) {
                let keyword = address;
                // this.$parent.showLoading = true;
                localSearch.setSearchCompleteCallback((res) => {
                    if (res.getPoi(0) == undefined) {
                        this.belowPoiInfo = '';
                        callBack('noBelowCar');
                    } else {
                        this.belowPoiInfo = res.getPoi(0).point;
                        callBack(this.belowPoiInfo);
                    }
                    // this.$parent.showLoading = false;
                });
                localSearch.search(keyword);
            },
            getAboveChosenCar(newArr) {
                for (let i = 0; i < newArr.length; i++) {
                    if (this.transferInfo.double) {
                        if (this.transferInfo.go) {
                            if (this.showAboveCar != null) {
                                if (this.showAboveCar.vehicleName == newArr[i].vehicleName) {
                                    let obj = {
                                        key: 'transferAboveSelectedCar',
                                        val: newArr[i]
                                    };
                                    newArr[i].picked = true;
                                    try{
                                        this.initData(obj);
                                    }catch(e){}
                                }
                            } else {
                                if (this.transferInfo.goData.send.car != null) {
                                    if (this.transferInfo.goData.send.car.vehicleName == newArr[i].vehicleName) {
                                        let obj = {
                                            key: 'transferAboveSelectedCar',
                                            val: newArr[i]
                                        };
                                        newArr[i].picked = true;
                                        try{
                                            this.initData(obj);
                                        }catch(e){}
                                    }
                                }
                            };
                        } else {
                            if (this.showAboveCar != null) {
                                if (this.showAboveCar.vehicleName == newArr[i].vehicleName) {
                                    let obj = {
                                        key: 'transferAboveSelectedCar',
                                        val: newArr[i]
                                    };
                                    newArr[i].picked = true;
                                    try{
                                        this.initData(obj);
                                    }catch(e){}
                                }
                            } else {
                                if (this.transferInfo.arrivalData.pick.car != null) {
                                    if (this.transferInfo.arrivalData.pick.car.vehicleName == newArr[i].vehicleName) {
                                        let obj = {
                                            key: 'transferAboveSelectedCar',
                                            val: newArr[i]
                                        };
                                        newArr[i].picked = true;
                                        try{
                                            this.initData(obj);
                                        }catch(e){}
                                    }
                                }
                            };
                        };
                    } else {
                        if (this.transferInfo.go) {
                            if (this.showAboveCar != null) {
                                if (this.showAboveCar.vehicleName == newArr[i].vehicleName) {
                                    let obj = {
                                        key: 'transferAboveSelectedCar',
                                        val: newArr[i]
                                    };
                                    newArr[i].picked = true;
                                    try{
                                        this.initData(obj);
                                    }catch(e){}
                                }
                            } else {
                                if (this.transferInfo.goData.send.car != null) {
                                    if (this.transferInfo.goData.send.car.vehicleName == newArr[i].vehicleName) {
                                        let obj = {
                                            key: 'transferAboveSelectedCar',
                                            val: newArr[i]
                                        };
                                        newArr[i].picked = true;
                                        try{
                                            this.initData(obj);
                                        }catch(e){}
                                    }
                                }
                            }
                        } else {
                            if (this.showAboveCar != null) {
                                if (this.showAboveCar.vehicleName == newArr[i].vehicleName) {
                                    let obj = {
                                        key: 'transferAboveSelectedCar',
                                        val: newArr[i]
                                    };
                                    newArr[i].picked = true;
                                    try{
                                        this.initData(obj);
                                    }catch(e){}
                                }
                            } else {
                                if (this.transferInfo.arrivalData.pick.car != null) {
                                    if (this.transferInfo.arrivalData.pick.car.vehicleName == newArr[i].vehicleName) {
                                        let obj = {
                                            key: 'transferAboveSelectedCar',
                                            val: newArr[i]
                                        };
                                        newArr[i].picked = true;
                                        try{
                                            this.initData(obj);
                                        }catch(e){}
                                    }
                                }
                            }
                        };
                    }
                }
            },
            getBelowChosenCar(newArr) {
                for (let i = 0; i < newArr.length; i++) {
                    if (this.transferInfo.go) {
                        if (this.showBelowCar != null) {
                            if (this.showBelowCar.vehicleName == newArr[i].vehicleName) {
                                let obj = {
                                    key: 'transferBelowSelectedCar',
                                    val: newArr[i]
                                };
                                newArr[i].picked = true;
                                try{
                                    this.initData(obj);
                                }catch(e){}
                            }
                        } else {
                            if (this.transferInfo.goData.pick.car != null) {
                                if (this.transferInfo.goData.pick.car.vehicleName == newArr[i].vehicleName) {
                                    let obj = {
                                        key: 'transferBelowSelectedCar',
                                        val: newArr[i]
                                    };
                                    newArr[i].picked = true;
                                    try{
                                        this.initData(obj);
                                    }catch(e){}
                                }
                            }
                        };
                    } else {
                        if (this.showBelowCar != null) {
                            if (this.showBelowCar.vehicleName == newArr[i].vehicleName) {
                                let obj = {
                                    key: 'transferBelowSelectedCar',
                                    val: newArr[i]
                                };
                                newArr[i].picked = true;
                                try{
                                    this.initData(obj);
                                }catch(e){}
                            }
                        } else {
                            if (this.transferInfo.arrivalData.send.car != null) {
                                if (this.transferInfo.arrivalData.send.car.vehicleName == newArr[i].vehicleName) {
                                    let obj = {
                                        key: 'transferBelowSelectedCar',
                                        val: newArr[i]
                                    };
                                    newArr[i].picked = true;
                                    try{
                                        this.initData(obj);
                                    }catch(e){}
                                }
                            }
                        };
                    };
                }
            },
            //上半部分获取车型
            getAboveCarType(param) {
                this.$parent.showLoading = true;
                getTransferProducts(param).then((res) => {
                    if (+res.code === 1) {
                        this.aboveCarNone = false;
                        let allCars = JSON.parse(JSON.parse(res.data));
                        allCars.map((item, index) => {
                            item.picked = false;
                        })
                        this.getAboveChosenCar(allCars);
                        let obj = {
                            key: 'transferAboveCars',
                            val: allCars
                        };
                        try{
                            this.initData(obj);
                        }catch(e){}
                    } else {
                        this.aboveCarNone = true;
                    }
                    this.$parent.showLoading = false;
                })
            },
            //下半部分获取车型
            getBelowCarType(param) {
                this.$parent.showLoading = true;
                getTransferProducts(param).then((res) => {
                    if (+res.code === 1) {
                        this.belowCarNone = false;
                        let allCars = JSON.parse(JSON.parse(res.data));
                        allCars.map((item, index) => {
                            item.picked = false;
                        })
                        this.getBelowChosenCar(allCars);
                        let obj = {
                            key: 'transferBelowCars',
                            val: allCars
                        };
                        try{
                            this.initData(obj);
                        }catch(e){}
                    } else {
                        this.belowCarNone = true;
                    }
                    this.$parent.showLoading = false;
                })
            },
            pickCar(kind) {
                this.rightButton = '';
                this.leftButton = '知道了';
                if (this.transferInfo.double) {
                    if (this.transferInfo.go) {
                        if (kind === 'above') {
                            if (this.aboveParam.poiInfo.latitude === '' && this.aboveInfo.poiInfo.latitude === '') {
                                this.alertContent = '请选择地点';
                                this.showTip = true;
                                return;
                            }
                            if (this.aboveParam.useTime === '' && this.aboveInfo.useTime === '') {
                                this.alertContent = '请选择用车时间';
                                this.showTip = true;
                                return;
                            }
                        } else {
                            if (this.belowParam.poiInfo.latitude === '' && this.belowInfo.poiInfo.latitude === '') {
                                this.alertContent = '请选择地点';
                                this.showTip = true;
                                return;
                            }
                        }
                    } else {
                        if (kind === 'above') {
                            if (this.aboveParam.poiInfo.latitude === '' && this.aboveInfo.poiInfo.latitude === '') {
                                this.alertContent = '请选择地点';
                                this.showTip = true;
                                return;
                            }
                        } else {
                            if (this.belowParam.poiInfo.latitude === '' && this.belowInfo.poiInfo.latitude === '') {
                                this.alertContent = '请选择地点';
                                this.showTip = true;
                                return;
                            }
                            if (this.belowParam.useTime === '' && this.belowInfo.useTime === '') {
                                this.alertContent = '请选择用车时间';
                                this.showTip = true;
                                return;
                            }
                        }
                        
                    }
                } else {
                    if (kind === 'above') {
                        if (this.aboveParam.poiInfo.latitude === '' && this.aboveInfo.poiInfo.latitude === '') {
                            this.alertContent = '请选择地点';
                            this.showTip = true;
                            return;
                        }
                        if (this.aboveParam.useTime === '' && this.aboveInfo.useTime === '') {
                            this.alertContent = '请选择用车时间';
                            this.showTip = true;
                            return;
                        }
                    }
                }
                if (this.transferInfo.double) {
                    let aboveCarObj = {
                        key: 'transferAboveSelectedCar',
                        val: ''
                    };
                    let belowCarObj = {
                        key: 'transferBelowSelectedCar',
                        val: ''
                    };
                    if (this.transferInfo.go) {
                        aboveCarObj.val = this.transferInfo.goData.send.car;
                        belowCarObj.val = this.transferInfo.goData.pick.car;
                    } else {
                        aboveCarObj.val = this.transferInfo.arrivalData.pick.car;
                        belowCarObj.val = this.transferInfo.arrivalData.send.car;
                    }
                    if (this.showAboveCar == null) {
                        try{
                            this.initNoStorageData(aboveCarObj);
                        }catch(e){}
                    }
                    if (this.showBelowCar == null) {
                        try{
                            this.initNoStorageData(belowCarObj);
                        }catch(e){}
                    }
                } else {
                    let carObj = {
                        key: 'transferAboveSelectedCar',
                        val: ''
                    };
                    if (this.transferInfo.go) {
                        carObj.val = this.transferInfo.goData.send.car;
                    } else {
                        carObj.val = this.transferInfo.arrivalData.pick.car;
                    }
                    if (this.showAboveCar == null) {
                        try{
                            this.initNoStorageData(carObj);
                        }catch(e){}
                    }
                }
                this.$router.push(`/${this.$parent.baseUrlPath}/transferCarType/${kind}`);
            },
            submitTransfer() {
                // if (this.transferInfo.go) {
                //     this.transferInfo.goData.send.useTime = this.aboveParam.useTime;
                // } else {
                //     this.transferInfo.arrivalData.send.useTime = this.belowParam.useTime;
                // }
                this.rightButton = '';
                this.leftButton = '知道了';
                if (this.transferInfo.double) {
                    if (this.transferInfo.go) {
                        if (this.aboveCarNone) {
                            this.alertContent = '暂无可用车型，请选择其它出发地';
                            this.showTip = true;
                            return;
                        } else {
                            if (this.transferInfo.goData.send.able) {
                                if (this.showAboveCar != null) {
                                    this.transferInfo.goData.send.car = this.showAboveCar;
                                } else {
                                    if (this.transferInfo.goData.send.car == null) {
                                        this.alertContent = '请选择送机车型';
                                        this.showTip = true;
                                        return;
                                    }
                                }
                            }
                        }
                        this.transferInfo.goData.send.poiInfo = this.aboveParam.poiInfo;
                        this.transferInfo.goData.send.useTime = this.aboveParam.useTime;
                        if (this.belowCarNone) {
                            this.alertContent = '暂无可用车型，请选择其它出发地';
                            this.showTip = true;
                            return;
                        } else {
                            if (this.transferInfo.goData.pick.able) {
                                if (this.showBelowCar != null) {
                                    this.transferInfo.goData.pick.car = this.showBelowCar;
                                } else {
                                    if (this.transferInfo.goData.pick.car == null) {
                                        this.alertContent = '请选择接机车型';
                                        this.showTip = true;
                                        return;
                                    }
                                }
                            }
                        }
                        this.transferInfo.goData.pick.poiInfo = this.belowParam.poiInfo;
                        this.transferInfo.goData.pick.useTime = this.belowParam.useTime;
                    } else {
                        if (this.aboveCarNone) {
                            this.alertContent = '暂无可用车型，请选择其它出发地';
                            this.showTip = true;
                            return;
                        } else {
                            if (this.transferInfo.arrivalData.pick.able) {
                                if (this.showAboveCar != null) {
                                    this.transferInfo.arrivalData.pick.car = this.showAboveCar;
                                } else {
                                    if (this.transferInfo.arrivalData.pick.car == null) {
                                        this.alertContent = '请选择接机车型';
                                        this.showTip = true;
                                        return;
                                    }
                                }
                            }
                        }
                        this.transferInfo.arrivalData.pick.poiInfo = this.aboveParam.poiInfo;
                        this.transferInfo.arrivalData.pick.useTime = this.aboveParam.useTime;
                        if (this.belowCarNone) {
                            this.alertContent = '暂无可用车型，请选择其它出发地';
                            this.showTip = true;
                            return;
                        } else {
                            if (this.transferInfo.arrivalData.send.able) {
                                if (this.showBelowCar != null) {
                                    this.transferInfo.arrivalData.send.car = this.showBelowCar;
                                } else {
                                    if (this.transferInfo.arrivalData.send.car == null) {
                                        this.alertContent = '请选择送机车型';
                                        this.showTip = true;
                                        return;
                                    }
                                }
                            }
                        }
                        this.transferInfo.arrivalData.send.poiInfo = this.belowParam.poiInfo;
                        this.transferInfo.arrivalData.send.useTime = this.belowParam.useTime;
                    }
                } else {
                    if (this.transferInfo.go) {
                        if (this.transferInfo.goData.send.able) {
                            if (this.aboveCarNone) {
                                this.alertContent = '暂无可用车型，请选择其它出发地';
                                this.showTip = true;
                                return;
                            } else {
                                if (this.showAboveCar != null) {
                                    this.transferInfo.goData.send.car = this.showAboveCar;
                                } else {
                                    if (this.transferInfo.goData.send.car == null) {
                                        this.alertContent = '请选择送机车型';
                                        this.showTip = true;
                                        return;
                                    }
                                }
                            }
                        }
                        this.transferInfo.goData.send.poiInfo = this.aboveParam.poiInfo;
                        this.transferInfo.goData.send.useTime = this.aboveParam.useTime;
                    } else {
                        if (this.transferInfo.arrivalData.pick.able) {
                            if (this.aboveCarNone) {
                                this.alertContent = '暂无可用车型，请选择其它出发地';
                                this.showTip = true;
                                return;
                            } else {
                                if (this.showAboveCar != null) {
                                    this.transferInfo.arrivalData.pick.car = this.showAboveCar;
                                } else {
                                    if (this.transferInfo.arrivalData.pick.car == null) {
                                        this.alertContent = '请选择接机车型';
                                        this.showTip = true;
                                        return;
                                    }
                                }
                            }
                        }
                        this.transferInfo.arrivalData.pick.poiInfo = this.aboveParam.poiInfo;
                        this.transferInfo.arrivalData.pick.useTime = this.aboveParam.useTime;
                    }
                }
                let transferObj = {
                    key: 'transferInfo',
                    val: this.transferInfo
                };
                try{
                    this.initData(transferObj);
                }catch(e){}
                this.$router.push(`/${this.$parent.baseUrlPath}/orderForm`);
            },
            openState() {
                this.showState = true;
                if (this.refundState[0] != '') {
                    this.showRefundState = this.refundState[0];
                } else {
                    this.showRefundState = this.refundState[1];
                }
            },
            closeState() {
                this.showState = false;
            },
            toggleRefundState(num) {
                if (num == 0) {
                    this.showRefundState = this.refundState[0];
                } else {
                    this.showRefundState = this.refundState[1];
                }
            },
            goBack() {
                if (this.transferInfo.double) {
                    if (this.transferInfo.go) {
                        if (this.aboveAddress != '') {
                            if (this.transferInfo.goData.send.poiInfo.address != '') {
                                if (this.transferInfo.goData.send.poiInfo.address != `${this.aboveAddress.area}${this.aboveAddress.location}`) {
                                    this.alertContent = '信息尚未保存，是否确认返回';
                                    this.rightButton = '确认';
                                    this.leftButton = '取消';
                                    this.showTip = true;
                                    return;
                                }
                            } else {
                                this.alertContent = '信息尚未保存，是否确认返回';
                                this.rightButton = '确认';
                                this.leftButton = '取消';
                                this.showTip = true;
                                return;
                            }
                        }
                        if (this.belowAddress != '') {
                            if (this.transferInfo.goData.pick.poiInfo.address != '') {
                                if (this.transferInfo.goData.pick.poiInfo.address != `${this.belowAddress.area}${this.belowAddress.location}`) {
                                    this.alertContent = '信息尚未保存，是否确认返回';
                                    this.rightButton = '确认';
                                    this.leftButton = '取消';
                                    this.showTip = true;
                                    return;
                                }
                            } else {
                                this.alertContent = '信息尚未保存，是否确认返回';
                                this.rightButton = '确认';
                                this.leftButton = '取消';
                                this.showTip = true;
                                return;
                            }
                        }
                        if (this.aboveParam.useTime != '') {
                            if (this.transferInfo.goData.send.useTime != '') {
                                if (this.transferInfo.goData.send.useTime != this.aboveParam.useTime) {
                                    this.alertContent = '信息尚未保存，是否确认返回';
                                    this.rightButton = '确认';
                                    this.leftButton = '取消';
                                    this.showTip = true;
                                    return;
                                }
                            } else {
                                this.alertContent = '信息尚未保存，是否确认返回';
                                this.rightButton = '确认';
                                this.leftButton = '取消';
                                this.showTip = true;
                                return;
                            }
                        }
                        if (this.transferInfo.goData.send.able) {
                            if (this.showAboveCar != null) {
                                if (this.transferInfo.goData.send.car != null) {
                                    if (this.transferInfo.goData.send.car.vehicleName != this.showAboveCar.vehicleName) {
                                        this.alertContent = '信息尚未保存，是否确认返回';
                                        this.rightButton = '确认';
                                        this.leftButton = '取消';
                                        this.showTip = true;
                                        return;
                                    }
                                } else {
                                    this.alertContent = '信息尚未保存，是否确认返回';
                                    this.rightButton = '确认';
                                    this.leftButton = '取消';
                                    this.showTip = true;
                                    return;
                                }
                            }
                        }
                        if (this.transferInfo.goData.pick.able) {
                            if (this.showBelowCar != null) {
                                if (this.transferInfo.goData.pick.car != null) {
                                    if (this.transferInfo.goData.pick.car.vehicleName != this.showBelowCar.vehicleName) {
                                        this.alertContent = '信息尚未保存，是否确认返回';
                                        this.rightButton = '确认';
                                        this.leftButton = '取消';
                                        this.showTip = true;
                                        return;
                                    }
                                } else {
                                    this.alertContent = '信息尚未保存，是否确认返回';
                                    this.rightButton = '确认';
                                    this.leftButton = '取消';
                                    this.showTip = true;
                                    return;
                                }
                            }
                        }
                    } else {
                        if (this.aboveAddress != '') {
                            if (this.transferInfo.arrivalData.pick.poiInfo.address != '') {
                                if (this.transferInfo.arrivalData.pick.poiInfo.address != `${this.aboveAddress.area}${this.aboveAddress.location}`) {
                                    this.alertContent = '信息尚未保存，是否确认返回';
                                    this.rightButton = '确认';
                                    this.leftButton = '取消';
                                    this.showTip = true;
                                    return;
                                }
                            } else {
                                this.alertContent = '信息尚未保存，是否确认返回';
                                this.rightButton = '确认';
                                this.leftButton = '取消';
                                this.showTip = true;
                                return;
                            }
                        }
                        if (this.belowAddress != '') {
                            if (this.transferInfo.arrivalData.send.poiInfo.address != '') {
                                if (this.transferInfo.arrivalData.send.poiInfo.address != `${this.belowAddress.area}${this.belowAddress.location}`) {
                                    this.alertContent = '信息尚未保存，是否确认返回';
                                    this.rightButton = '确认';
                                    this.leftButton = '取消';
                                    this.showTip = true;
                                    return;
                                }
                            } else {
                                this.alertContent = '信息尚未保存，是否确认返回';
                                this.rightButton = '确认';
                                this.leftButton = '取消';
                                this.showTip = true;
                                return;
                            }
                        }
                        if (this.belowParam.useTime != '') {
                            if (this.transferInfo.arrivalData.send.useTime != '') {
                                if (this.transferInfo.arrivalData.send.useTime != this.belowParam.useTime) {
                                    this.alertContent = '信息尚未保存，是否确认返回';
                                    this.rightButton = '确认';
                                    this.leftButton = '取消';
                                    this.showTip = true;
                                    return;
                                }
                            } else {
                                this.alertContent = '信息尚未保存，是否确认返回';
                                this.rightButton = '确认';
                                this.leftButton = '取消';
                                this.showTip = true;
                                return;
                            }
                        }
                        if (this.transferInfo.arrivalData.pick.able) {
                            if (this.showAboveCar != null) {
                                if (this.transferInfo.arrivalData.pick.car != null) {
                                    if (this.transferInfo.arrivalData.pick.car.vehicleName != this.showAboveCarvehicleName) {
                                        this.alertContent = '信息尚未保存，是否确认返回';
                                        this.rightButton = '确认';
                                        this.leftButton = '取消';
                                        this.showTip = true;
                                        return;
                                    }
                                } else {
                                    this.alertContent = '信息尚未保存，是否确认返回';
                                    this.rightButton = '确认';
                                    this.leftButton = '取消';
                                    this.showTip = true;
                                    return;
                                }
                            }
                        }
                        if (this.transferInfo.arrivalData.send.able) {
                            if (this.showBelowCar != null) {
                                if (this.transferInfo.arrivalData.send.car != null) {
                                    if (this.transferInfo.arrivalData.send.car.vehicleName != this.showBelowCar.vehicleName) {
                                        this.alertContent = '信息尚未保存，是否确认返回';
                                        this.rightButton = '确认';
                                        this.leftButton = '取消';
                                        this.showTip = true;
                                        return;
                                    }
                                } else {
                                    this.alertContent = '信息尚未保存，是否确认返回';
                                    this.rightButton = '确认';
                                    this.leftButton = '取消';
                                    this.showTip = true;
                                    return;
                                }
                            }
                        }
                    }
                } else {
                    if (this.transferInfo.go) {
                        if (this.aboveAddress != '') {
                            if (this.transferInfo.goData.send.poiInfo.address != '') {
                                if (this.transferInfo.goData.send.poiInfo.address != `${this.aboveAddress.area}${this.aboveAddress.location}`) {
                                    this.alertContent = '信息尚未保存，是否确认返回';
                                    this.rightButton = '确认';
                                    this.leftButton = '取消';
                                    this.showTip = true;
                                    return;
                                }
                            } else {
                                this.alertContent = '信息尚未保存，是否确认返回';
                                this.rightButton = '确认';
                                this.leftButton = '取消';
                                this.showTip = true;
                                return;
                            }
                        }
                        
                        if (this.aboveParam.useTime != '') {
                            if (this.transferInfo.goData.send.useTime != '') {
                                if (this.transferInfo.goData.send.useTime != this.aboveParam.useTime) {
                                    this.alertContent = '信息尚未保存，是否确认返回';
                                    this.rightButton = '确认';
                                    this.leftButton = '取消';
                                    this.showTip = true;
                                    return;
                                }
                            } else {
                                this.alertContent = '信息尚未保存，是否确认返回';
                                this.rightButton = '确认';
                                this.leftButton = '取消';
                                this.showTip = true;
                                return;
                            }
                        }
                        if (this.transferInfo.goData.send.able) {
                            if (this.showAboveCar != null) {
                                if (this.transferInfo.goData.send.car != null) {
                                    if (this.transferInfo.goData.send.car.vehicleName != this.showAboveCar.vehicleName) {
                                        this.alertContent = '信息尚未保存，是否确认返回';
                                        this.rightButton = '确认';
                                        this.leftButton = '取消';
                                        this.showTip = true;
                                        return;
                                    }
                                } else {
                                    this.alertContent = '信息尚未保存，是否确认返回';
                                    this.rightButton = '确认';
                                    this.leftButton = '取消';
                                    this.showTip = true;
                                    return;
                                }
                            }
                        }
                    } else {
                        if (this.aboveAddress != '') {
                            if (this.transferInfo.arrivalData.pick.poiInfo.address != '') {
                                if (this.transferInfo.arrivalData.pick.poiInfo.address != `${this.aboveAddress.area}${this.aboveAddress.location}`) {
                                    this.alertContent = '信息尚未保存，是否确认返回';
                                    this.rightButton = '确认';
                                    this.leftButton = '取消';
                                    this.showTip = true;
                                    return;
                                }
                                
                            } else {
                                this.alertContent = '信息尚未保存，是否确认返回';
                                this.rightButton = '确认';
                                this.leftButton = '取消';
                                this.showTip = true;
                                return;
                            }
                        }
                        if (this.transferInfo.arrivalData.pick.able) {
                            if (this.showAboveCar != null) {
                                if (this.transferInfo.arrivalData.pick.car != null) {
                                    if (this.transferInfo.arrivalData.pick.car.vehicleName != this.showAboveCar.vehicleName) {
                                        this.alertContent = '信息尚未保存，是否确认返回';
                                        this.rightButton = '确认';
                                        this.leftButton = '取消';
                                        this.showTip = true;
                                        return;
                                    }
                                } else {
                                    this.alertContent = '信息尚未保存，是否确认返回';
                                    this.rightButton = '确认';
                                    this.leftButton = '取消';
                                    this.showTip = true;
                                    return;
                                }
                            }
                        }
                    }
                }
                this.$router.push(`/${this.$parent.baseUrlPath}/orderForm`);
            },
            rightHandler() {
                this.$router.push(`/${this.$parent.baseUrlPath}/orderForm`);
                let aboveAddressObj = {
                    key: 'transferAboveAddress',
                    val: ''
                };
                let belowAddressObj = {
                    key: 'transferBelowAddress',
                    val: ''
                };
                this.timeResult = {};
                try{
                    this.initNoStorageData(aboveAddressObj);
                }catch(e){}
                try{
                    this.initNoStorageData(belowAddressObj);
                }catch(e){}
                let aboveCarObj = {
                    key: 'transferAboveSelectedCar',
                    val: null
                };
                let belowCarObj = {
                    key: 'transferBelowSelectedCar',
                    val: null
                };
                try{
                    this.initNoStorageData(aboveCarObj);
                }catch(e){}
                try{
                    this.initNoStorageData(belowCarObj);
                }catch(e){}
                this.aboveParam = {
                    "scene": '',
                    "locationCode": '',
                    "terminalCode": '',
                    "poiInfo": {
                        "name": "",
                        "address": "",
                        "longitude": '',
                        "latitude": ''
                    },
                    "useTime": '',
                    "locationType": "AIRPORT"
                };
                this.belowParam = {
                    "scene": '',
                    "locationCode": '',
                    "terminalCode": '',
                    "poiInfo": {
                        "name": "",
                        "address": "",
                        "longitude": '',
                        "latitude": ''
                    },
                    "useTime": '',
                    "locationType": "AIRPORT"
                };
                this.showTip = false;
            }
        },
        activated() {
            if (this.transferInfo.double) {
                if (this.transferInfo.go) {
                    this.title = `${this.transferInfo.goCity.name}接送机`;
                    this.aboveInfo = this.transferInfo.goData.send;
                    this.belowInfo = this.transferInfo.goData.pick;
                    this.planeTime = this.aboveInfo.planeTime;
                    this.spreadAboveHeight = '3.76rem';
                    this.spreadBelowHeight = '2.36rem';
                    if (this.goCity == false) {
                        let aboveAddressObj = {
                            key: 'transferAboveAddress',
                            val: ''
                        };
                        let belowAddressObj = {
                            key: 'transferBelowAddress',
                            val: ''
                        };
                        try{
                            this.initNoStorageData(aboveAddressObj);
                        }catch(e){}
                        try{
                            this.initNoStorageData(belowAddressObj);
                        }catch(e){}
                        let aboveCarObj = {
                            key: 'transferAboveSelectedCar',
                            val: null
                        };
                        let belowCarObj = {
                            key: 'transferBelowSelectedCar',
                            val: null
                        };
                        try{
                            this.initNoStorageData(aboveCarObj);
                        }catch(e){}
                        try{
                            this.initNoStorageData(belowCarObj);
                        }catch(e){}
                        this.refundState.splice(0,1,'');
                        this.refundState.splice(1,1,'');
                        this.aboveParam = {
                            "scene": '',
                            "locationCode": '',
                            "terminalCode": '',
                            "poiInfo": {
                                "name": "",
                                "address": "",
                                "longitude": '',
                                "latitude": ''
                            },
                            "useTime": '',
                            "locationType": "AIRPORT"
                        };
                        this.belowParam = {
                            "scene": '',
                            "locationCode": '',
                            "terminalCode": '',
                            "poiInfo": {
                                "name": "",
                                "address": "",
                                "longitude": '',
                                "latitude": ''
                            },
                            "useTime": '',
                            "locationType": "AIRPORT"
                        };
                    }
                    this.goCity = true;
                    this.belowParam.useTime = new Date(formatIOSDate(this.belowInfo.planeTime)).getTime();
                    if (this.aboveInfo.able) {
                        document.querySelectorAll('.picker_menu_container')[0].style.height = '3.76rem';
                    } else {
                        document.querySelectorAll('.picker_menu_container')[0].style.height = 0;
                    }
                    if (this.belowInfo.able) {
                        document.querySelectorAll('.picker_menu_container')[1].style.height = '2.36rem';
                    } else {
                        document.querySelectorAll('.picker_menu_container')[1].style.height = 0;
                    }
                } else {
                    this.title = `${this.transferInfo.arrivalCity.name}接送机`;
                    this.aboveInfo = this.transferInfo.arrivalData.pick;
                    this.belowInfo = this.transferInfo.arrivalData.send;
                    this.spreadAboveHeight = '2.36rem';
                    this.spreadBelowHeight = '3.76rem';
                    this.planeTime = this.belowInfo.planeTime;
                    if (this.goCity == true) {
                        let aboveAddressObj = {
                            key: 'transferAboveAddress',
                            val: ''
                        };
                        let belowAddressObj = {
                            key: 'transferBelowAddress',
                            val: ''
                        };
                        try{
                            this.initNoStorageData(aboveAddressObj);
                        }catch(e){}
                        try{
                            this.initNoStorageData(belowAddressObj);
                        }catch(e){}
                        let aboveCarObj = {
                            key: 'transferAboveSelectedCar',
                            val: null
                        };
                        let belowCarObj = {
                            key: 'transferBelowSelectedCar',
                            val: null
                        };
                        try{
                            this.initNoStorageData(aboveCarObj);
                        }catch(e){}
                        try{
                            this.initNoStorageData(belowCarObj);
                        }catch(e){}
                        this.refundState.splice(0,1,'');
                        this.refundState.splice(1,1,'');
                        this.aboveParam = {
                            "scene": '',
                            "locationCode": '',
                            "terminalCode": '',
                            "poiInfo": {
                                "name": "",
                                "address": "",
                                "longitude": '',
                                "latitude": ''
                            },
                            "useTime": '',
                            "locationType": "AIRPORT"
                        };
                        this.belowParam = {
                            "scene": '',
                            "locationCode": '',
                            "terminalCode": '',
                            "poiInfo": {
                                "name": "",
                                "address": "",
                                "longitude": '',
                                "latitude": ''
                            },
                            "useTime": '',
                            "locationType": "AIRPORT"
                        };
                    }
                    this.goCity = false;
                    this.aboveParam.useTime = new Date(formatIOSDate(this.aboveInfo.planeTime)).getTime();
                    if (this.aboveInfo.able) {
                        document.querySelectorAll('.picker_menu_container')[0].style.height = '2.36rem';
                    } else {
                        document.querySelectorAll('.picker_menu_container')[0].style.height = 0;
                    }
                    if (this.belowInfo.able) {
                        document.querySelectorAll('.picker_menu_container')[1].style.height = '3.76rem';
                    } else {
                        document.querySelectorAll('.picker_menu_container')[1].style.height = 0;
                    }
                }
                this.aboveParam.scene = this.aboveInfo.sceneType;
                this.aboveParam.locationCode = this.aboveInfo.locationCode;
                this.aboveParam.terminalCode = this.aboveInfo.terminalCode;
                // this.aboveParam.poiInfo = this.aboveInfo.poiInfo;
                // this.aboveParam.useTime = this.aboveInfo.useTime;
                this.belowParam.scene = this.belowInfo.sceneType;
                this.belowParam.locationCode = this.belowInfo.locationCode;
                this.belowParam.terminalCode = this.belowInfo.terminalCode;
                // this.belowParam.poiInfo = this.belowInfo.poiInfo;
                // this.belowParam.useTime = this.belowInfo.useTime;
                if (this.aboveAddress == '') {
                    if (this.aboveInfo.poiInfo.latitude != '' && this.aboveInfo.useTime != '') {
                        this.aboveParam.poiInfo = this.aboveInfo.poiInfo;
                        this.aboveParam.useTime = this.aboveInfo.useTime;
                        this.getAboveCarType(this.aboveParam);
                    }
                }
                if (this.belowAddress == '') {
                    if (this.belowInfo.poiInfo.latitude != '' && this.belowInfo.useTime != '') {
                        this.belowParam.poiInfo = this.belowInfo.poiInfo;
                        this.belowParam.useTime = this.belowInfo.useTime;
                        this.getBelowCarType(this.belowParam);
                    }
                }
                if (this.transferInfo.go) {
                    if ((this.showAboveCar != null || this.aboveInfo.car != null) && (this.transferInfo.goData.send.poiInfo.latitude != '' || this.aboveParam.poiInfo.latitude != '') && !this.aboveCarNone) {
                        this.refundState.splice(0,1,'');
                        let vendorCodes = [],vehicleCodes = [],tempPoiInfo = '';
                        if (this.showAboveCar != null) {
                            vendorCodes.push(this.showAboveCar.vendorCode);
                            vehicleCodes.push(this.showAboveCar.vehicleCode);
                        } else {
                            vendorCodes.push(this.aboveInfo.car.vendorCode);
                            vehicleCodes.push(this.aboveInfo.car.vehicleCode);
                        }
                        if (this.aboveParam.poiInfo.location != '') {
                            tempPoiInfo = this.aboveParam.poiInfo;
                        } else {
                            if (this.transferInfo.goData.send.poiInfo.latitude != '') {
                                tempPoiInfo = this.transferInfo.goData.send.poiInfo;
                            }
                        }
                        let param = {
                            'scene': 'SJ',//场景JJ(“接机”),SJ(“送机”)
                            'locationCode': this.transferInfo.goData.send.locationCode,//位置code（如：如机场id，或者火车站的id）
                            'terminalCode': this.transferInfo.goData.send.terminalCode,//航站楼名称(一个机场对应多航站楼的，建议传入航站楼名称，否则可能不准确；一个机场不区分航站楼的可以不传；位置code不为机场类型的可以不用传)
                            'poiInfo': tempPoiInfo,
                            'useTime': new Date(this.transferInfo.goData.send.planeTime.replace(/-/g,'/')).getTime(),//用车时间
                            'locationType': 'AIRPORT',// 位置类型，枚举：AIRPORT（机场），STATION（火车站），BIZ_AREA（商圈），HOTEL（酒店）
                            'vendorCodes': vendorCodes,
                            'vehicleCodes': vehicleCodes,
                        };
                        getTransferProductDetail(param).then((res) => {
                            if (+res.code === 1) {
                                let result = JSON.parse(JSON.parse(res.data));
                                let state = {};
                                state.title = this.transferInfo.goData.send.vasProductName;
                                state.content = result.orderLimits.concat(result.attentions);
                                state.show = true;
                                this.refundState.splice(0,1,state);
                            } else {
                                this.refundState.splice(0,1,'');
                            }
                        });
                    }
                } else {
                    if ((this.showAboveCar != null || this.aboveInfo.car != null) && (this.transferInfo.arrivalData.pick.poiInfo.latitude != '' || this.aboveParam.poiInfo.latitude != '') && !this.aboveCarNone) {
                        this.refundState.splice(0,1,'');
                        let vendorCodes = [],vehicleCodes = [],tempPoiInfo = '';
                        if (this.showAboveCar != null) {
                            vendorCodes.push(this.showAboveCar.vendorCode);
                            vehicleCodes.push(this.showAboveCar.vehicleCode);
                        } else {
                            vendorCodes.push(this.aboveInfo.car.vendorCode);
                            vehicleCodes.push(this.aboveInfo.car.vehicleCode);
                        }
                        if (this.aboveParam.poiInfo.latitude != '') {
                            tempPoiInfo = this.aboveParam.poiInfo;
                        } else {
                            if (this.transferInfo.arrivalData.pick.poiInfo.latitude != '') {
                                tempPoiInfo = this.transferInfo.arrivalData.pick.poiInfo;
                            }
                        }
                        let param = {
                            'scene': 'JJ',//场景JJ(“接机”),SJ(“送机”)
                            'locationCode': this.transferInfo.arrivalData.pick.locationCode,//位置code（如：如机场id，或者火车站的id）
                            'terminalCode': this.transferInfo.arrivalData.pick.terminalCode,//航站楼名称(一个机场对应多航站楼的，建议传入航站楼名称，否则可能不准确；一个机场不区分航站楼的可以不传；位置code不为机场类型的可以不用传)
                            'poiInfo': tempPoiInfo,
                            'useTime': this.aboveParam.useTime,//用车时间
                            'locationType': 'AIRPORT',// 位置类型，枚举：AIRPORT（机场），STATION（火车站），BIZ_AREA（商圈），HOTEL（酒店）
                            'vendorCodes': vendorCodes,
                            'vehicleCodes': vehicleCodes,
                        };
                        getTransferProductDetail(param).then((res) => {
                            if (+res.code === 1) {
                                let result = JSON.parse(JSON.parse(res.data));
                                let state = {};
                                state.title = this.transferInfo.arrivalData.pick.vasProductName;
                                state.content = result.orderLimits.concat(result.attentions);
                                state.show = true;
                                this.refundState.splice(0,1,state);
                            } else {
                                this.refundState.splice(0,1,'');
                            }
                        });
                    }
                }
                if (this.transferInfo.go) {
                    if ((this.showBelowCar != null || this.belowInfo.car != null) && (this.transferInfo.goData.pick.poiInfo.latitude != '' || this.belowParam.poiInfo.latitude != '') && !this.belowCarNone) {
                        this.refundState.splice(1,1,'');
                        let vendorCodes = [],vehicleCodes = [],tempPoiInfo = '';
                        if (this.showBelowCar != null) {
                            vendorCodes.push(this.showBelowCar.vendorCode);
                            vehicleCodes.push(this.showBelowCar.vehicleCode);
                        } else {
                            vendorCodes.push(this.belowInfo.car.vendorCode);
                            vehicleCodes.push(this.belowInfo.car.vehicleCode);
                        }
                        if (this.belowParam.poiInfo.latitude != '') {
                            tempPoiInfo = this.belowParam.poiInfo;
                        } else {
                            if (this.transferInfo.goData.pick.poiInfo.latitude != '') {
                                tempPoiInfo = this.transferInfo.goData.pick.poiInfo;
                            }
                        }
                        let param = {
                            'scene': 'JJ',//场景JJ(“接机”),SJ(“送机”)
                            'locationCode': this.transferInfo.goData.pick.locationCode,//位置code（如：如机场id，或者火车站的id）
                            'terminalCode': this.transferInfo.goData.pick.terminalCode,//航站楼名称(一个机场对应多航站楼的，建议传入航站楼名称，否则可能不准确；一个机场不区分航站楼的可以不传；位置code不为机场类型的可以不用传)
                            'poiInfo': tempPoiInfo,
                            'useTime': this.belowParam.useTime,//用车时间
                            'locationType': 'AIRPORT',// 位置类型，枚举：AIRPORT（机场），STATION（火车站），BIZ_AREA（商圈），HOTEL（酒店）
                            'vendorCodes': vendorCodes,
                            'vehicleCodes': vehicleCodes,
                        };
                        getTransferProductDetail(param).then((res) => {
                            if (+res.code === 1) {
                                let result = JSON.parse(JSON.parse(res.data));
                                let state = {};
                                state.title = this.transferInfo.goData.pick.vasProductName;
                                state.content = result.orderLimits.concat(result.attentions);
                                state.show = false;
                                this.refundState.splice(1,1,state);
                            } else {
                                this.refundState.splice(1,1,'');
                            }
                        });
                    }
                } else {
                    if ((this.showBelowCar != null || this.belowInfo.car != null) && (this.transferInfo.arrivalData.send.poiInfo.latitude != '' || this.belowParam.poiInfo.latitude != '') && !this.belowCarNone) {
                        this.refundState.splice(1,1,'');
                        let vendorCodes = [],vehicleCodes = [],tempPoiInfo = '';
                        if (this.showBelowCar != null) {
                            vendorCodes.push(this.showBelowCar.vendorCode);
                            vehicleCodes.push(this.showBelowCar.vehicleCode);
                        } else {
                            vendorCodes.push(this.belowInfo.car.vendorCode);
                            vehicleCodes.push(this.belowInfo.car.vehicleCode);
                        }
                        if (this.belowParam.poiInfo.latitude != '') {
                            tempPoiInfo = this.belowParam.poiInfo;
                        } else {
                            if (this.transferInfo.arrivalData.send.poiInfo.latitude != '') {
                                tempPoiInfo = this.transferInfo.arrivalData.send.poiInfo;
                            }
                        }
                        let param = {
                            'scene': 'SJ',//场景JJ(“接机”),SJ(“送机”)
                            'locationCode': this.transferInfo.arrivalData.send.locationCode,//位置code（如：如机场id，或者火车站的id）
                            'terminalCode': this.transferInfo.arrivalData.send.terminalCode,//航站楼名称(一个机场对应多航站楼的，建议传入航站楼名称，否则可能不准确；一个机场不区分航站楼的可以不传；位置code不为机场类型的可以不用传)
                            'poiInfo': tempPoiInfo,
                            'useTime': new Date(this.transferInfo.arrivalData.send.planeTime.replace(/-/g,'/')).getTime(),//用车时间
                            'locationType': 'AIRPORT',// 位置类型，枚举：AIRPORT（机场），STATION（火车站），BIZ_AREA（商圈），HOTEL（酒店）
                            'vendorCodes': vendorCodes,
                            'vehicleCodes': vehicleCodes,
                        };
                        getTransferProductDetail(param).then((res) => {
                            if (+res.code === 1) {
                                let result = JSON.parse(JSON.parse(res.data));
                                let state = {};
                                state.title = this.transferInfo.arrivalData.send.vasProductName;
                                state.content = result.orderLimits.concat(result.attentions);
                                state.show = false;
                                this.refundState.splice(1,1,state);
                            } else {
                                this.refundState.splice(1,1,'');
                            }
                        });
                    }
                }
            } else {
                this.refundState.splice(0,1,'');
                this.refundState.splice(1,1,'');
                this.aboveCarNone = false;
                this.belowCarNone = false;
                if (this.transferInfo.go) {
                    this.title = `${this.transferInfo.goCity.name}送机`;
                    this.aboveInfo = this.transferInfo.goData.send;
                    this.planeTime = this.aboveInfo.planeTime;
                    this.spreadAboveHeight = '3.76rem';
                    if (this.goCity == false) {
                        let aboveAddressObj = {
                            key: 'transferAboveAddress',
                            val: ''
                        };
                        let belowAddressObj = {
                            key: 'transferBelowAddress',
                            val: ''
                        };
                        try{
                            this.initNoStorageData(aboveAddressObj);
                        }catch(e){}
                        try{
                            this.initNoStorageData(belowAddressObj);
                        }catch(e){}
                        let aboveCarObj = {
                            key: 'transferAboveSelectedCar',
                            val: null
                        };
                        let belowCarObj = {
                            key: 'transferBelowSelectedCar',
                            val: null
                        };
                        try{
                            this.initNoStorageData(aboveCarObj);
                        }catch(e){}
                        try{
                            this.initNoStorageData(belowCarObj);
                        }catch(e){}
                        this.aboveParam = {
                            "scene": '',
                            "locationCode": '',
                            "terminalCode": '',
                            "poiInfo": {
                                "name": "",
                                "address": "",
                                "longitude": '',
                                "latitude": ''
                            },
                            "useTime": '',
                            "locationType": "AIRPORT"
                        };
                        this.belowParam = {
                            "scene": '',
                            "locationCode": '',
                            "terminalCode": '',
                            "poiInfo": {
                                "name": "",
                                "address": "",
                                "longitude": '',
                                "latitude": ''
                            },
                            "useTime": '',
                            "locationType": "AIRPORT"
                        };
                    }
                    this.goCity = true;
                    if (this.aboveInfo.able) {
                        lQuery('.picker_menu_container').css('height','3.76rem');
                    } else {
                        lQuery('.picker_menu_container').css('height','0rem');
                    }
                } else {
                    this.title = `${this.transferInfo.arrivalCity.name}接机`;
                    this.aboveInfo = this.transferInfo.arrivalData.pick;
                    this.spreadAboveHeight = '2.36rem';
                    this.aboveParam.useTime = new Date(formatIOSDate(this.aboveInfo.planeTime)).getTime();
                    if (this.goCity == true) {
                        let aboveAddressObj = {
                            key: 'transferAboveAddress',
                            val: ''
                        };
                        let belowAddressObj = {
                            key: 'transferBelowAddress',
                            val: ''
                        };
                        try{
                            this.initNoStorageData(aboveAddressObj);
                        }catch(e){}
                        try{
                            this.initNoStorageData(belowAddressObj);
                        }catch(e){}
                        let aboveCarObj = {
                            key: 'transferAboveSelectedCar',
                            val: null
                        };
                        let belowCarObj = {
                            key: 'transferBelowSelectedCar',
                            val: null
                        };
                        try{
                            this.initNoStorageData(aboveCarObj);
                        }catch(e){}
                        try{
                            this.initNoStorageData(belowCarObj);
                        }catch(e){}
                        this.aboveParam = {
                            "scene": '',
                            "locationCode": '',
                            "terminalCode": '',
                            "poiInfo": {
                                "name": "",
                                "address": "",
                                "longitude": '',
                                "latitude": ''
                            },
                            "useTime": '',
                            "locationType": "AIRPORT"
                        };
                        this.belowParam = {
                            "scene": '',
                            "locationCode": '',
                            "terminalCode": '',
                            "poiInfo": {
                                "name": "",
                                "address": "",
                                "longitude": '',
                                "latitude": ''
                            },
                            "useTime": '',
                            "locationType": "AIRPORT"
                        };
                    }
                    this.goCity = false;
                    if (this.aboveInfo.able) {
                        lQuery('.picker_menu_container').css('height','2.36rem');
                    } else {
                        lQuery('.picker_menu_container').css('height','0rem');
                    }
                }
                this.aboveParam.scene = this.aboveInfo.sceneType;
                this.aboveParam.locationCode = this.aboveInfo.locationCode;
                this.aboveParam.terminalCode = this.aboveInfo.terminalCode;
                if (this.aboveAddress == '') {
                    if (this.aboveInfo.poiInfo.latitude != '' && this.aboveInfo.useTime != '') {
                        this.aboveParam.poiInfo = this.aboveInfo.poiInfo;
                        this.aboveParam.useTime = this.aboveInfo.useTime;
                        this.getAboveCarType(this.aboveParam);
                    }
                }
                if (this.transferInfo.go) {
                    if ((this.showAboveCar != null || this.aboveInfo.car != null) && (this.transferInfo.goData.send.poiInfo.latitude != '' || this.aboveParam.poiInfo.latitude != '') && !this.aboveCarNone) {
                        let vendorCodes = [],vehicleCodes = [],tempPoiInfo = '';
                        if (this.showAboveCar != null) {
                            vendorCodes.push(this.showAboveCar.vendorCode);
                            vehicleCodes.push(this.showAboveCar.vehicleCode);
                        } else {
                            vendorCodes.push(this.aboveInfo.car.vendorCode);
                            vehicleCodes.push(this.aboveInfo.car.vehicleCode);
                        }
                        if (this.aboveParam.poiInfo.latitude != '') {
                            tempPoiInfo = this.aboveParam.poiInfo;
                        } else {
                            if (this.transferInfo.goData.send.poiInfo.latitude != '') {
                                tempPoiInfo = this.transferInfo.goData.send.poiInfo;
                            }
                        }
                        let param = {
                            'scene': 'SJ',//场景JJ(“接机”),SJ(“送机”)
                            'locationCode': this.transferInfo.goData.send.locationCode,//位置code（如：如机场id，或者火车站的id）
                            'terminalCode': this.transferInfo.goData.send.terminalCode,//航站楼名称(一个机场对应多航站楼的，建议传入航站楼名称，否则可能不准确；一个机场不区分航站楼的可以不传；位置code不为机场类型的可以不用传)
                            'poiInfo': tempPoiInfo,
                            'useTime': new Date(this.transferInfo.goData.send.planeTime.replace(/-/g,'/')).getTime(),//用车时间
                            'locationType': 'AIRPORT',// 位置类型，枚举：AIRPORT（机场），STATION（火车站），BIZ_AREA（商圈），HOTEL（酒店）
                            'vendorCodes': vendorCodes,
                            'vehicleCodes': vehicleCodes,
                        };
                        getTransferProductDetail(param).then((res) => {
                            if (+res.code === 1) {
                                let result = JSON.parse(JSON.parse(res.data));
                                let state = {};
                                state.title = this.transferInfo.goData.send.vasProductName;
                                state.content = result.orderLimits.concat(result.attentions);
                                state.show = true;
                                this.refundState.splice(0,1,state);
                            } else {
                                this.refundState.splice(0,1,'');
                            }
                        });
                    }
                } else {
                    if ((this.showAboveCar != null || this.aboveInfo.car != null) && (this.transferInfo.arrivalData.pick.poiInfo.latitude != '' || this.aboveParam.poiInfo.latitude != '') && !this.aboveCarNone) {
                        this.refundState.splice(0,1,'');
                        let vendorCodes = [],vehicleCodes = [],tempPoiInfo = '';
                        if (this.showAboveCar != null) {
                            vendorCodes.push(this.showAboveCar.vendorCode);
                            vehicleCodes.push(this.showAboveCar.vehicleCode);
                        } else {
                            vendorCodes.push(this.aboveInfo.car.vendorCode);
                            vehicleCodes.push(this.aboveInfo.car.vehicleCode);
                        }
                        if (this.aboveParam.poiInfo.latitude != '') {
                            tempPoiInfo = this.aboveParam.poiInfo;
                        } else {
                            if (this.transferInfo.arrivalData.pick.poiInfo.latitude != '') {
                                tempPoiInfo = this.transferInfo.arrivalData.pick.poiInfo;
                            }
                        }
                        let param = {
                            'scene': 'JJ',//场景JJ(“接机”),SJ(“送机”)
                            'locationCode': this.transferInfo.arrivalData.pick.locationCode,//位置code（如：如机场id，或者火车站的id）
                            'terminalCode': this.transferInfo.arrivalData.pick.terminalCode,//航站楼名称(一个机场对应多航站楼的，建议传入航站楼名称，否则可能不准确；一个机场不区分航站楼的可以不传；位置code不为机场类型的可以不用传)
                            'poiInfo': tempPoiInfo,
                            'useTime': this.aboveParam.useTime,//用车时间
                            'locationType': 'AIRPORT',// 位置类型，枚举：AIRPORT（机场），STATION（火车站），BIZ_AREA（商圈），HOTEL（酒店）
                            'vendorCodes': vendorCodes,
                            'vehicleCodes': vehicleCodes,
                        };
                        getTransferProductDetail(param).then((res) => {
                            if (+res.code === 1) {
                                let result = JSON.parse(JSON.parse(res.data));
                                let state = {};
                                state.title = this.transferInfo.arrivalData.pick.vasProductName;
                                state.content = result.orderLimits.concat(result.attentions);
                                state.show = true;
                                this.refundState.splice(0,1,state);
                            } else {
                                this.refundState.splice(0,1,'');
                            }
                        });
                    }
                }
            }
        },
        beforeRouteLeave(to,from,next) {
            if (to.path.indexOf('orderForm') != -1) {
                if (this.transferInfo.double) {
                    if (this.transferInfo.go) {
                        if (this.transferInfo.goData.send.car == null) {
                            this.transferInfo.goData.send.able = false;
                        };
                        if (this.transferInfo.goData.pick.car == null) {
                            this.transferInfo.goData.pick.able = false;
                        };
                    } else {
                        if (this.transferInfo.arrivalData.pick.car == null) {
                            this.transferInfo.arrivalData.pick.able = false;
                        };
                        if (this.transferInfo.arrivalData.send.car == null) {
                            this.transferInfo.arrivalData.send.able = false;
                        };
                    };
                } else {
                    if (this.transferInfo.go) {
                        if (this.transferInfo.goData.send.car == null) {
                            this.transferInfo.goData.send.able = false;
                        };
                    } else {
                        if (this.transferInfo.arrivalData.pick.car == null) {
                            this.transferInfo.arrivalData.pick.able = false;
                        };
                    };
                }
            }
            next(true);
        },
        watch: {
            aboveAddress(newVal,oldVal) {
                if (newVal != oldVal && newVal != '') {
                    this.aboveCarNone = false;
                    this.searchAboveLocation(`${newVal.area}${newVal.location}`,(res) => {
                        if (res == 'noAboveCar') {
                            this.aboveCarNone = true;
                            this.abovePoiInfo = '';
                            // this.aboveInfo.poiInfo.latitude = '';
                            // this.aboveInfo.poiInfo.longitude = '';
                            this.aboveParam.poiInfo.name = '';
                            this.aboveParam.poiInfo.address = '';
                            this.aboveParam.poiInfo.longitude = '';
                            this.aboveParam.poiInfo.latitude = '';
                            return;
                        } else {
                            this.aboveCarNone = false;
                            this.abovePoiInfo = res;
                            // this.aboveInfo.poiInfo.latitude = res.lat;
                            // this.aboveInfo.poiInfo.longitude = res.lng;
                            this.aboveParam.poiInfo.name = newVal.location;
                            this.aboveParam.poiInfo.address = `${newVal.area}${newVal.location}`;
                            this.aboveParam.poiInfo.longitude = res.lng;
                            this.aboveParam.poiInfo.latitude = res.lat;
                            if (this.aboveParam.useTime != '') {
                                this.getAboveCarType(this.aboveParam);
                            }
                        }
                    });
                }
            },
            belowAddress(newVal,oldVal) {
                if (newVal != oldVal && newVal != '') {
                    this.belowCarNone = false;
                    this.searchBelowLocation(`${newVal.area}${newVal.location}`,(res) => {
                        if (res == 'noBelowCar') {
                            this.belowCarNone = true;
                            this.belowPoiInfo = '';
                            // this.belowInfo.poiInfo.latitude = '';
                            // this.belowInfo.poiInfo.longitude = '';
                            this.belowParam.poiInfo.name = '';
                            this.belowParam.poiInfo.address = '';
                            this.belowParam.poiInfo.longitude = '';
                            this.belowParam.poiInfo.latitude = '';
                            return;
                        } else {
                            this.belowCarNone = false;
                            this.belowPoiInfo = res;
                            // this.belowInfo.poiInfo.latitude = res.lat;
                            // this.belowInfo.poiInfo.longitude = res.lng;
                            this.belowParam.poiInfo.name = newVal.location;
                            this.belowParam.poiInfo.address = `${newVal.area}${newVal.location}`;
                            this.belowParam.poiInfo.longitude = res.lng;
                            this.belowParam.poiInfo.latitude = res.lat;
                            if (this.belowParam.useTime != '') {
                                this.getBelowCarType(this.belowParam);
                            }
                        }
                    });
                }
            },
            goCity(newVal,oldVal) {
                if (newVal != oldVal) {
                    this.timeResult.date = undefined;
                    // let aboveAddressObj = {
                    //     key: 'transferAboveAddress',
                    //     val: ''
                    // };
                    // let belowAddressObj = {
                    //     key: 'transferBelowAddress',
                    //     val: ''
                    // };
                    let aboveCarObj = {
                        key: 'transferAboveSelectedCar',
                        val: null
                    };
                    let belowCarObj = {
                        key: 'transferBelowSelectedCar',
                        val: null
                    };
                    try{
                        this.initNoStorageData(aboveCarObj);
                    }catch(e){}
                    try{
                        this.initNoStorageData(belowCarObj);
                    }catch(e){}
                }
            },
            timeResult(newVal,oldVal) {
                if (newVal != oldVal) {
                    if (this.transferInfo.double) {
                        if (this.transferInfo.go) {
                            this.aboveParam.useTime = this.getTimeResultStamp(newVal);
                            // this.aboveInfo.useTime = this.getTimeResultStamp(newVal);
                            if (this.aboveParam.poiInfo.latitude != '') {
                                this.getAboveCarType(this.aboveParam);
                            }
                        } else {
                            this.belowParam.useTime = this.getTimeResultStamp(newVal);
                            // this.belowInfo.useTime = this.getTimeResultStamp(newVal);
                            if (this.belowParam.poiInfo.latitude != '') {
                                this.getBelowCarType(this.belowParam);
                            }
                        }
                    } else {
                        this.aboveParam.useTime = this.getTimeResultStamp(newVal);
                        // this.aboveInfo.useTime = this.getTimeResultStamp(newVal);
                        if (this.aboveParam.poiInfo.latitude != '') {
                                this.getAboveCarType(this.aboveParam);
                            }
                    }
                }
            }
        },
        computed: mapState({
            aboveAddress: state => state.transferAboveAddress,
            belowAddress: state => state.transferBelowAddress,
            transferInfo: state => state.transferInfo,
            showAboveCar: state => state.transferAboveSelectedCar,
            showBelowCar: state => state.transferBelowSelectedCar,
        }),
       
    }
</script>

<style lang="scss" scoped>
    @import '../../style/mixin';
    .airport_transportation_container {
        @include wh(100%,100%);
        .common_style {
            background: #fff;
            padding: .25rem 0;
            box-sizing: border-box;
            margin: 0 .2rem;
        }
        .header_back {
            @include wh(.9rem,.9rem);
            position: absolute;
            top: 0;
            left: 0;
            z-index: 10;
        }
        .airport_transportation_wrap {
            width: 94.7%;
            margin-top: .2rem;
            .send_container {
                width: 100%;
                margin-bottom: .2rem;
                box-shadow: 0 2px 6px 0 rgba(0,0,0,0.05);
                border-radius: 5px;
                background: #fff;
                overflow: hidden;
                .flight_info_container {
                    height: inherit;
                    .flight_info {
                        .transition_kind {
                            > p:first-child {
                                width: 1.6rem;
                                @include sc(.3rem,#000);
                            }
                            > p:last-child {
                                margin-left: .2rem;
                                color: #9f9f9f;
                            }
                        }
                        .plane_info {
                            @include sc(.24rem,#9f9f9f);
                            > span {
                                @include sc(.24rem,#9f9f9f);
                            }
                        }
                    }
                    .picker_container {
                        @include wh(.8rem,.7rem);
                        .picker {
                            @include wh(.36rem,.36rem);
                            position: relative;
                            // margin-right: .2rem;
                            background:url(//m.lvmama.com/flight/image/multiUnPicked.png) no-repeat center;
                            background-size: .35rem .35rem;
                        }
                        .picked {
                            background: url(//m.lvmama.com/flight/image/multiPicked.png) no-repeat center;
                            background-size: .35rem .35rem;
                        }
                    }
                }
                .picker_menu_container {
                    overflow: hidden;
                    .picker_menu_item {
                        border-top: 1px solid #ddd;
                        > p:first-child {
                            width: 1.6rem;
                        }
                        > p:nth-child(2) {
                            width: 5rem;
                        }
                        .time_tip {
                            font-size: .24rem;
                            color: #999999;
                        }
                        .point_right_arrow{
                            width: .178rem;
                            height: .3rem;
                        }
                    }
                    .picker_menu_item:last-child {
                        height: 1.34rem;
                    }
                    .car_type_container {
                        .car_type {
                            width: 5rem;
                            > div:first-child {
                                > p:first-child {
                                    @include sc(.3rem,#000);
                                }
                                > p:last-child {
                                    @include sc(.24rem,#9f9f9f);
                                }
                            }
                            > div:last-child {
                                @include sc(.36rem,#f80);
                                span {
                                    @include sc(.24rem,#f80);
                                }
                            }
                        }   
                    }
                }
            }
        }
        .transition_state {
             > span {
                width: 1.8rem;
                @include sc(.24rem,#999);
                padding-left: .2rem;
                float: right;
                > img {
                    @include wh(.28rem,.28rem);
                    margin-right: .1rem;
                }
            }
        }
        .finish_button {
            @include wh(100%,.9rem);
            color: #fff;
            background: #fe3c71;
            position: absolute;
            left: 0;
            bottom: 0;
        }
        .transition_state_container {
            @include wh(100%,75%);
            position: absolute;
            left: 0;
            top: 25%;
            background: #fff;
            padding: 0 .2rem;
            padding-top: .5rem;
            box-sizing: border-box;
            border-top-left-radius: 5px;
            border-top-right-radius: 5px;
            overflow: hidden;
            z-index: 4;
            .toggle_title_container {
                @include wh(100%,.4rem);
                position: relative;
                font-family: PingFangSC-Light;
                font-size: .3rem;
                color: #333333;
                > div {
                    margin-right: .2rem;
                    border-bottom: 2px solid transparent;
                }
                .mark_picked {
                    font-weight: 600;
                    border-bottom: 2px solid #fe3c71;
                }
                .mark_underline {
                    display: block;
                    @include wh(1rem,2px);
                    background: #fe3c71;
                    position: absolute;
                    left: 0;
                    bottom: 0;
                }
            }
            .refund_state_container {
                @include wh(100%,80%);
                overflow-y: scroll;
                .refund_title {
                    @include sc(.38rem,#000);
                    margin: .2rem 0;
                }
                .refund_contant {
                    padding-top: .2rem;
                    box-sizing: border-box;
                    .refund_item_container {
                        
                        .bigSize {
                            font-size: .38rem;
                            margin-bottom: .2rem;
                        }
                        .refund_item_title {
                        }
                        .refund_item_detail {

                        }
                    }
                }
            }
            .close_refund {
                @include wh(100%,20%);
                > img {
                    @include wh(1rem,1rem);
                }
            }
        }
    }
</style>
