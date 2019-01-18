 <template>
    <div class="travel_helper_container">
        <div class="travel_helper_menu_container" v-show="!showFlightGuide">
            <head-top path="/vflight" :depart="depart" :goPage="goPage"></head-top>
            <!-- <div class="weather_container"></div> -->
            <div class="menu_container margin">
                <ul>
                    <li class="common_item_style y_flex between_x_flex" @click="toFlightSchedule">
                        <div class="y_flex">
                            <div class="item_icon_container"></div>
                            <div class="menu_title" >
                                <p>航班动态</p>
                                <p>查看航班动态，跟踪航班信息</p>
                            </div>
                        </div>
                        <div class="point_right_arrow"></div>
                    </li>
                    <li class="common_item_style y_flex between_x_flex" @click="toAirportInfos">
                        <div class="y_flex">
                            <div class="item_icon_container"></div>
                            <div class="menu_title">
                                <p>机场服务</p>
                                <p>机场电话，机场交通信息，航司电话</p>
                            </div>
                        </div>
                        <div class="point_right_arrow"></div>
                    </li>
                    <li class="common_item_style y_flex between_x_flex" @click="toLowPrice">
                        <div class="y_flex">
                            <div class="item_icon_container"></div>
                            <div class="menu_title">
                                <p>低价走势</p>
                                <p>查看机票价格走势</p>
                            </div>
                        </div>
                        <div class="point_right_arrow"></div>
                    </li>
                    <li class="common_item_style y_flex between_x_flex" @click="openFlightGuide">
                        <div class="y_flex">
                            <div class="item_icon_container"></div>
                            <div class="menu_title">
                                <p>乘机指南</p>
                                <p>获取乘机指南</p>
                            </div>
                        </div>
                        <div class="point_right_arrow"></div>
                    </li>
                </ul>
            </div>
        </div>
        <div class="flight_guide_container" v-show="showFlightGuide">
            <div class="header y_flex between_x_flex">
                <div class="back_container y_flex" @click="closeGuide">
                    <span class="back">
                    </span>
                </div>
                <div class="centerTitle y_flex">
                    <p class="y_flex">
                        <span>乘机指南</span>
                    </p>
                </div>
            </div>
            <div class="flight_guide_wrap">
                <img src="//m.lvmama.com/flight/image/planeTips.jpg" alt="">
            </div>
        </div>
        
    </div>
</template>
<script>
    import { lQuery } from '../../plugins/lQuery'
    import headTop from '../../components/header/head'
    import { getStatisticsType,getElementTag} from '../../config/mUtils'
    import { getAirportsOfCountry } from '../../service/getData'
    import { mapActions,mapState } from 'vuex'
    export default {
        data(){
            return{
                depart: '行程助手',
                goPage:'travelTo',
                dest: '',
                showFlightGuide: false,//展示乘机指南
                flightGuideTitle: '乘机指南'
            }
        },
        props: [
            
        ],
        components: {
            headTop,
        },
        computed: {
            ...mapState([
                'locationInfo',
            ])
        },
        methods: {
            ...mapActions([
                'initData'
            ]),
            openFlightGuide() {
                this.showFlightGuide = true;
            },
            toAirportInfos() {
                this.$router.push(`/${this.$parent.baseUrlPath}/airportInfos`);
                getElementTag("机票行程助手-机场服务","行程助手页");
            },
            toLowPrice(){
                this.$router.push(`/${this.$parent.baseUrlPath}/lowPrice`);
                getElementTag("机票行程助手-低价指示","行程助手页");
            },
            toFlightSchedule(){
                this.$router.push(`/${this.$parent.baseUrlPath}/flightSchedule`);
                getElementTag("机票频道页_D区_014_航班动态","机票频道页");
            },
            closeGuide() {
                this.showFlightGuide = false;
                getElementTag("机票行程助手-机场服务","行程助手页");
            }
        },
        created() {
            getAirportsOfCountry().then((res) => {
                if (+res.code === 1) {
                    let allAirportsObj = {
                        key: 'allAirportsInfo',
                        val: res.data
                    };
                    try{
                        this.initData(allAirportsObj);
                    }catch(e){}
                }
            });
        },
        mounted(){
            // lQuery('.title_word').css('color','#fff');
        },
        activated() {
            this.showFlightGuide = false;
            getStatisticsType('机票-行程助手页','FlightTravelHelper');
        }
    }
</script>

<style lang="scss" scoped>
@import '../../style/mixin';
    .travel_helper_container {
        @include wh(100%,100%);
        background: #eeeef5;
        .travel_helper_menu_container {

            .header {
                .back {
                    width: .25rem;
                    height: .25rem;
                    border-right: 1px solid #fff;
                    border-bottom: 1px solid #fff;
                    transform: rotateZ(135deg);
                }
            }
            .weather_container {

            }
            .menu_container {
                @include wh(95%,auto);
                .item_icon_container {
                    @include wh(.7rem,.7rem);
                    background: url('//m.lvmama.com/flight/image/travelHelperIcon1.png') no-repeat;
                    background-size: 100% 100%;
                    margin-right: .2rem;
                }
                li:nth-child(2) {
                    .item_icon_container {
                        // background-position-x: -.7rem;
                        background: url('//m.lvmama.com/flight/image/travelHelperIcon2.png') no-repeat;
                        background-size: 100% 100%;
                    }
                }
                li:nth-child(3) {
                    .item_icon_container {
                        // background-position-x: -1.4rem;
                        background: url('//m.lvmama.com/flight/image/travelHelperIcon3.png') no-repeat;
                        background-size: 100% 100%;
                    }
                }
                li:nth-child(4) {
                    .item_icon_container {
                        // background-position-x: -2.1rem;
                        background: url('//m.lvmama.com/flight/image/travelHelperIcon4.png') no-repeat;
                        background-size: 100% 100%;
                    }
                }
                .menu_title {
                    > p:first-child {
                        @include sc(.3rem,#333);
                        margin-bottom: .1rem;
                    }
                    >p:nth-child(2) {
                        @include sc(.24rem,#666);
                    }
                }
                .common_item_style {
                    @include wh(100%,1.3rem);
                    background: #fff;
                    @include borderRadius(.1rem);
                    padding-left: .3rem;
                    padding-right: .2rem;
                    box-sizing: border-box;
                    margin-top: .2rem;
                    box-shadow: 0 2px 6px 0 rgba(0,0,0,0.05);
                }
            }
        }
        .flight_guide_container {
            @include wh(100%,100%);
            position: relative;
            .header{
                @include wh(100%,0.9rem);
                background:$fc;
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
                    @include center;
                    > p {
                        > span{
                            font-size: 0.36rem;
                        }
                    }
               }
                
            }
            .flight_guide_wrap {
                @include heightByAbsolute(.9rem,0);
                overflow-y: scroll;
                img {
                    height: auto;
                }
            }
        }
        
    }
</style>
