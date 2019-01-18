 <template>
    <div class="airport_infos_container">
        <head-top :depart="travelHelperChosenAirport.name" :centerHandlerPath="centerHandlerPath"></head-top>
        <div class="airport_menu_title">
            <ul class="y_flex">
                <li class="xy_flex" :class="{'titleActive':showMenu=='airportBus'}" @click="clickMenu('airportBus')" >机场交通</li>
                <li class="xy_flex" :class="{'titleActive':showMenu=='airportTel'}" @click="clickMenu('airportTel')">机场电话</li>
                <li class="xy_flex" :class="{'titleActive':showMenu=='airportCompanyTel'}" @click="clickMenu('airportCompanyTel')">航司电话</li>
                <li class="active_line"></li>
            </ul>
        </div>
        <div class="menu_content_container margin">
            <div class="airport_trafic_container" v-if="showMenu == 'airportBus'">
                <div class="airport_trafic_item" v-for="(item,index) in airportBusMenu">
                    <div class="airport_bus_menu menu_common_style y_flex between_x_flex" :class="{'airport_bus_active': item.spread}"  @click="spreadAirportContent(item)">
                        <div class="y_flex">
                            <div class="airport_bus_icon"><span class="busimages"></span></div>
                            <div>{{item.title}}</div>
                        </div>
                        <div class="airport_infos_arrow" :class="{'airport_infos_arrow_active': item.spread}"></div>
                    </div>
                    <div class="airport_bus_content content_common_style" v-show="item.spread && index == 0">
                        <div class="bus_direction y_flex">
                            <div class="xy_flex" :class="{'active':toAirportDirection}" @click="toggleBusDirection('toAirport')">去机场</div>
                            <div class="xy_flex" :class="{'active':!toAirportDirection}" @click="toggleBusDirection('toCenter')">去市区</div>
                        </div>
                        <ul class="bus_infos" v-if="showBusInfos.length>0">
                            <li></li>
                            <li class="y_flex between_x_flex" v-for="(item,index) in showBusInfos" @click="toBusDetail(item)">
                                <div class="bus_routes">
                                    <p class="y_flex">{{item.startingStation}}-{{item.terminalStation}}</p>
                                    <p class="y_flex" v-if="item.serviceTimeInfo.indexOf('0.') == -1">{{item.serviceTimeInfo}}</p>
                                </div>
                                <div class="bus_price">
                                    <span class="point_right_arrow"></span>
                                    <span>{{item.priceInfo.replace(/元/,"")}}</span>
                                    <span>&#165;</span>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="airport_tel_container margin" v-if="showMenu == 'airportTel'">
                <ul class="airport_tel_wrap">
                    <li class="airport_tel_item y_flex between_x_flex" v-for="(item,index) in airportTelInfos">
                        <div>
                            <p>{{item.serviceType}}</p>
                            <p>{{item.telephone}}</p>
                        </div>
                        <a class="phone_icon" :href="`tel:${item.telephone}`"></a>
                    </li>
                </ul>
            </div>
            <div class="airport_tel_container margin" v-if="showMenu == 'airportCompanyTel'">
                <ul class="airport_tel_wrap">
                    <li class="airport_tel_item y_flex between_x_flex" v-for="(item,index) in airportCompanyTelInfos">
                        <div>
                            <div class="airline_logo_container">
                                <airlines-logo :logoKind="item.logo"></airlines-logo>
                            </div>
                            <div class="airline_name_container">
                                <p>{{item.name}}</p>
                                <p>{{item.tel}}</p>
                            </div>
                        </div>
                        <a class="phone_icon" :href="`tel:${item.tel}`"></a>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
    import { lQuery } from '../../plugins/lQuery'

    import headTop from '../../components/header/head'
    import airlinesLogo from '../../components/common/airlinesLogo'
    import { animate } from '../../config/mUtils.js'
    import { mapActions,mapState } from 'vuex'
    import { getAirportBuses,getAirportServices } from '../../service/getData'
    export default {
        data(){
            return{
                depart: '机场服务',
                airportBusMenu: [
                    {
                        title: '机场大巴',
                        iconUrl: '//m.lvmama.com/flight/image/airportBus.png',
                        spread: true
                    }
                    // ,
                    // {
                    //     title: '机场快轨',
                    //     iconUrl: '//m.lvmama.com/flight/static/img/airportRailway.png',
                    //     spread: false
                    // },
                    // {
                    //     title: '出租车',
                    //     iconUrl: '//m.lvmama.com/flight/static/img/airportTaxi.png',
                    //     spread: false
                    // }
                ],
                airportCompanyTelInfos: [
                    {
                        name: '中国国际航空公司',
                        tel: '95583',
                        logo: 'CA'
                    },
                    {
                        name: '中国南方航空公司',
                        tel: '95539',
                        logo: 'CZ'
                    },
                    {
                        name: '中国东方航空公司',
                        tel: '95530',
                        logo: 'MU'
                    },
                    {
                        name: '海南航空公司',
                        tel: '95339',
                        logo: 'HU'
                    },
                    {
                        name: '深圳航空公司',
                        tel: '95080',
                        logo: 'ZH'
                    },
                    {
                        name: '四川航空公司',
                        tel: '400-830-0999',
                        logo: '3U'
                    },
                    {
                        name: '上海航空公司',
                        tel: '95530',
                        logo: 'FM'
                    },
                    {
                        name: '厦门航空公司',
                        tel: '95557',
                        logo: 'MF'
                    },
                    {
                        name: '山东航空公司',
                        tel: '95369',
                        logo: 'SC'
                    },
                    {
                        name: '春秋航空公司',
                        tel: '95524',
                        logo: '9C'
                    },
                    {
                        name: '金鹏航空公司',
                        tel: '950719',
                        logo: 'Y8'
                    },
                    {
                        name: '联合航空公司',
                        tel: '400-102-6666',
                        logo: 'KN'
                    },
                    {
                        name: '吉祥航空公司',
                        tel: '400-700-600',
                        logo: 'HO'
                    },
                    {
                        name: '首都航空公司',
                        tel: '9507-1999',
                        logo: 'JD'
                    },
                    {
                        name: '天津航空公司',
                        tel: '950-710',
                        logo: 'GS'
                    },
                    {
                        name: '重庆航空公司',
                        tel: '95539',
                        logo: 'OQ'
                    },
                    {
                        name: '昆明航空公司',
                        tel: '400-887-6737',
                        logo: 'KY'
                    }//航司电话
                ],
                showMenu: 'airportBus',
                airportTelInfos: '',//机场电话
                toAirportDirection: true,
                showBusInfos: '',//展示的机场大巴信息
                allBusInfos: '',//所有的大巴信息
                centerHandlerPath: `/${this.$parent.baseUrlPath}/searchAirport`
            }
        },
        props: [
            
        ],
        computed: {
            ...mapState([
                'allAirportsInfo',
                'locationInfo',
                'travelHelperChosenAirport'
            ])
        },
        components: {
            headTop,
            airlinesLogo
        },
        methods: {
            ...mapActions([
                'initData'
            ]),
            clickMenu(type) {
                this.showMenu = type;
                if (type === 'airportBus') {
                    lQuery('.active_line').css('left','11%');
                    
                } else if (type === 'airportTel') {
                    lQuery('.active_line').css('left','44%');
                } else if (type === 'airportCompanyTel') {
                    lQuery('.active_line').css('left','78%');
                }
                
            },
            spreadAirportContent(item) {
                item.spread = !item.spread;
            },
            toggleBusDirection(kind) {
                if (kind === 'toAirport') {
                    this.toAirportDirection = true;
                    let allBusInfos = this.allBusInfos,
                        tempArr = [];
                    for (var i = 0; i < allBusInfos.length; i++) {
                        if (allBusInfos[i].direction == '去机场') {
                            tempArr.push(allBusInfos[i]);
                        }
                    }
                    this.showBusInfos = tempArr;
                } else if (kind === 'toCenter') {
                    this.toAirportDirection = false;
                    let allBusInfos = this.allBusInfos,
                        tempArr = [];
                    for (var i = 0; i < allBusInfos.length; i++) {
                        if (allBusInfos[i].direction == '去市区') {
                            tempArr.push(allBusInfos[i]);
                        }
                    }
                    this.showBusInfos = tempArr;
                }
            },
            toBusDetail(item) {
                let busLine = [];
                if ((item.routeInfo.indexOf('停靠') == -1 && item.routeInfo.indexOf('。') != -1 && item.routeInfo.indexOf('——') == -1 && item.routeInfo.indexOf('--') == -1)|| item.routeInfo == '直达') {
                    busLine.push(item.routeInfo)
                } else if (item.routeInfo.indexOf('停靠') != -1) {
                    if (item.routeInfo.indexOf('：') != -1) {
                        item.routeInfo = item.routeInfo.substring(item.routeInfo.indexOf('：')+1);
                    } else {
                        item.routeInfo = item.routeInfo.substring(item.routeInfo.indexOf(':')+1);
                    }
                    busLine.push(item.routeInfo)
                } else if (((item.routeInfo.indexOf('、') != -1 && item.routeInfo.indexOf('——') == -1 && item.routeInfo.indexOf('--') == -1 && item.routeInfo.indexOf('----') == -1) && item.routeInfo.indexOf('—') == -1  && item.routeInfo.indexOf('-') == -1) 
                    || item.routeInfo.indexOf('——') != -1
                    || (item.routeInfo.indexOf('--') != -1 && item.routeInfo.indexOf('。') == -1) 
                    || item.routeInfo.indexOf('----') != -1 
                    || item.routeInfo.indexOf('—') != -1 
                    || item.routeInfo.indexOf('-') != -1) {
                    item.routeInfo = item.routeInfo.replace(/——|--|----|—|-|、/g,'|').split('|');
                    busLine = item.routeInfo
                } else if (item.routeInfo.indexOf('。') != -1 && item.routeInfo.indexOf('--') != -1) {
                    item.routeInfo = item.routeInfo.replace(/--/g,'|').split('|');
                    busLine = item.routeInfo
                } else {
                    busLine.push(item.routeInfo)
                };
                item.busStations = busLine;
                let busDetailObj = {
                    key: 'airportBusDetail',
                    val: item
                };
                try{
                    this.initData(busDetailObj);
                }catch(e){}
                this.$router.push(`/${this.$parent.baseUrlPath}/airportBusDetail`);
            }
        },
        created() {
            //根据定位选择所在城市的一个机场
            if (this.travelHelperChosenAirport == '') {
                let allAirportsInfo = this.allAirportsInfo;
                for (let i = 0; i < allAirportsInfo.length; i++) {
                    if (allAirportsInfo[i].city.name.indexOf(this.locationInfo.cityName) == 0) {
                        console.log(`${allAirportsInfo[i].city.name}:${this.locationInfo.cityName}`)
                        let chosenObj = {
                            key: 'travelHelperChosenAirport',
                            val: allAirportsInfo[i]
                        };
                        try{
                            this.initData(chosenObj);
                        }catch(e){}
                        break;
                    } else {
                        let chosenObj = {
                            key: 'travelHelperChosenAirport',
                            val: {
                                name:'虹桥机场',
                                code: 'SHA'
                            }
                        };
                        try{
                            this.initData(chosenObj);
                        }catch(e){}
                    }
                }
            }
        },
        activated() {
            let airportCode = this.travelHelperChosenAirport.code;
            this.toAirportDirection = true;
            getAirportBuses(airportCode).then((res) => {
                if (+res.code === 1) {
                    this.allBusInfos = res.data;
                    let allBusInfos = this.allBusInfos,
                        tempArr = [];
                    for (var i = 0; i < allBusInfos.length; i++) {
                        if (allBusInfos[i].direction == '去机场') {
                            tempArr.push(allBusInfos[i]);
                        }
                    }
                    this.showBusInfos = tempArr;
                }
            });
            getAirportServices(airportCode).then((res) => {
                if (+res.code === 1) {
                    this.airportTelInfos = res.data;
                }
            });

        },
        mounted(){
            
        }
    }
</script>

<style lang="scss" scoped>
    @import '../../style/mixin';
    .airport_infos_container {
        @include wh(100%,100%);
        background-color: #eeeef5;
        .airport_infos_arrow {
            @include wh(.5rem,.5rem);
            background: url('//m.lvmama.com/flight/image/airportMenuarrow1.png') no-repeat center;
            background-size: .3rem .3rem;
            transition-duration: .3s;
        }
        .airport_infos_arrow_active {
            transform: rotateZ(180deg);
        }
        .airport_menu_title {
            @include wh(100%,.8rem);
            background: #fff;
            box-shadow: 0 1px 1px #bbb;
            > ul {
                @include wh(100%,100%);
                position: relative;
                > li {
                    @include wh(33%,inherit);
                    font-size: .3rem;
                }
                .active_line {
                    @include wh(10%,2px);
                    position: absolute;
                    left: 11%;
                    bottom: 0;
                    transition-duration: .3s;
                    background-image: linear-gradient(-90deg, #FD3C71 0%, #FF7F6A 100%);
                    border-radius: 1px;
                }
                .titleActive{
                    font-weight: bold;
                }
            }
        }
        .menu_content_container {
            // @include heightByAbsolute(1.9rem,0);
            @include wh(100%,85%);
            margin-top: 0.2rem;
            overflow-y: scroll;
            .phone_icon {
                @include wh(.54rem,.54rem);
                display: block;
                background: url('//m.lvmama.com/flight/image/airportNumberIcon.png') no-repeat;
                background-size: 99% 99%;
                margin-right: .2rem;
            }
            .airline_logo_container {
                @include wh(.25rem,.25rem);
                position: absolute;
            }
            .airline_name_container{
                margin-left: 0.38rem;
            }
            .airport_trafic_container {
                .airport_trafic_item {
                    margin-bottom: .2rem;
                }
                width: 100%;
                padding: 0 .2rem;
                .menu_common_style {
                    @include wh(100%,1.1rem);
                    background: #fff;
                    @include borderRadius(.1rem);
                    box-shadow: 0 1px 1px #bbb;
                    padding: 0 .2rem;
                    box-sizing: border-box;
                    box-shadow: 0 2px 6px 0 rgba(0,0,0,0.05);
                }
                .airport_bus_active{
                    @include borderRadius(.1rem .1rem 0 0);
                    box-shadow: none;
                }
                .airport_bus_icon {
                    @include wh(.5rem,.5rem);
                    margin-right: .2rem;
                    position: relative;
                    .busimages{
                        @include wh(100%,100%);
                        position: absolute;
                        background: url('//m.lvmama.com/flight/image/airportBus.png');
                        display: inline-block;
                        background-size: 100%;

                    }
                }
                .content_common_style {
                    background: #fff;
                    @include borderRadius(0 0 .1rem .1rem);
                    box-sizing: border-box;
                    margin-top: 0.03rem;
                }
                .airport_bus_content {

                    .bus_direction {
                        @include wh(100%,1rem);
                        padding: 0 0.2rem;
                        font-size: 0.24rem;
                        > div {
                            @include wh(1.8rem,.64rem);
                            margin-right: .2rem;
                            background-color: #F5F5F5;
                            border-radius: .6rem;
                        }
                        .active {                           
                            border: 1px solid #FF8800;
                            color: #FF8800;
                            background-color: #FFFFFF;
                            font-weight: bold;
                        }
                    }
                    .bus_infos {
                        width: 100%;
                        background-color: #FBFBFD;
                        @include borderRadius(0 0 0.1rem 0.1rem);
                        > li {
                            // width: 100%;
                            margin: 0 .2rem;
                            padding: .2rem 0;
                            box-sizing: border-box;
                            // border-bottom: 1px solid #f1f1f1;
                            @include bottomline();
                            .bus_routes {
                                width: 75%;
                                > p:nth-child(1) {
                                    margin-bottom: .1rem;
                                }
                            }
                            .bus_price {
                                width: 25%;
                                text-align: right;
                                line-height: .4rem;
                                span {
                                    color: #FF6600;
                                    float: right;
                                }
                                span:last-child {
                                    font-size: .2rem;
                                }
                                .point_right_arrow {
                                    margin-top: .1rem;
                                }
                            }
                        }
                        > li:first-child{
                            transform: rotate(-180deg);
                            background-image: linear-gradient(-180deg, #FBFBFD 0%, #EEEEF5 100%);
                            @include wh(100%,0.4rem);
                            padding: .2rem;
                            margin: 0;
                            border:0;
                        }
                        > li:nth-child(2){
                            padding-top:0;
                        }
                        > li:last-child {
                            border-bottom: none;
                        }
                    }
                }
            }
            .airport_tel_container {
                width: 95%;
                background: #fff;
                @include borderRadius(.1rem);
                .airport_tel_wrap {
                    width: 100%;
                    .airport_tel_item {
                        position: relative;
                        @include wh(100%,1.3rem);
                        // border-bottom: 1px solid #ddd;
                        @include bottomline();
                        line-height: 0.42rem;
                        padding-left: .2rem;
                        div>p:last-child{
                            font-size: 0.24rem;
                            color: #999999;
                        }
                    }
                    li:last-child {
                        border: none;
                    }
                } 
            }
        }
    }
</style>
