 <template>
    <div class="transfer_car_type_container">
        <head-top :depart="title"></head-top>
        <div class="car_type_container">
            <ul class="car_container margin">
                <li class="car_item y_flex between_x_flex" v-for="(item,index) in carTypes" @click="chooseCar(item)">
                    <div class="car_info_container y_flex">
                        <div class="car_picker" :class="{'car_picker_picked': item.picked}"></div>
                        <div class="car_info">
                            <div class="car_type y_flex">
                                <p>{{item.vehicleName}}</p>
                                <p>{{item.vehicleInfo.passengerDescription}}</p>
                            </div>
                            <div>{{item.vehicleInfo.vehicleDesc}}</div>
                        </div>
                    </div>
                    <div class="car_price">
                        <span>￥</span>
                        <span>{{item.salePrice}}</span>
                        <span>起</span>
                    </div>
                </li>
            </ul>
        </div>
        <alert-tip :tipContent='alertContent' v-show="showTip" :leftButton="leftButton" @rightHandler="closeTip" @closeAlert="leftHandler" :rightButton="rightButton"></alert-tip>
    </div>
</template>

<script>
    import { lQuery } from '../../plugins/lQuery'

    import headTop from '../../components/header/head'
    import alertTip from '../../components/common/alertTip'
    import { mapActions,mapState } from 'vuex'
    import { getTransferProducts } from '../../service/getData'
    export default {
        data(){
            return{
                title: '车型选择',
                carTypes: '',
                alertContent: '',
                showTip: false,
                leftButton: '暂不更换',
                rightButton: '更换',
                chosenCar: null,
            }
        },
        props: [
            
        ],
        components: {
            headTop,
            alertTip
        },
        computed: mapState({
            aboveCarTypes: state => state.transferAboveCars,
            belowCarTypes: state => state.transferBelowCars,
            transferInfo: state => state.transferInfo,
            transferAboveSelectedCar: state => state.transferAboveSelectedCar,
            transferBelowSelectedCar: state => state.transferBelowSelectedCar,
            selectedPersons: state => state.selectedPersons,
        }),
        created() {
            
        },
        mounted(){
            
        },
        methods: {
            ...mapActions([
                'initNoStorageData'
            ]),
            chooseCar(item) {
                this.carTypes.map((item,index) => {
                    item.picked = false;
                });
                item.picked = true;
                this.chosenCar = item;
                if (this.selectedPersons.length > item.vehicleInfo.passengerNumber) {
                    this.alertContent = `您选的${item.vehicleInfo.name}车最大载客数少于乘机人，是否更换其它车型？`;
                    this.showTip = true;
                    return;   
                }
                let obj = {
                    key: '',
                    val: item
                };
       
                if (this.$route.params.kind === 'above') {
                    obj.key = 'transferAboveSelectedCar';   
                } else {
                    obj.key = 'transferBelowSelectedCar';
                }
                try{
                    this.initNoStorageData(obj);
                }catch(e){}
                
                this.$router.go(-1);
            },
            leftHandler() {
                let obj = {
                    key: '',
                    val: this.chosenCar
                };
       
                if (this.$route.params.kind === 'above') {
                    obj.key = 'transferAboveSelectedCar';   
                } else {
                    obj.key = 'transferBelowSelectedCar';
                }
                this.showTip = false;
                try{
                    this.initNoStorageData(obj);
                }catch(e){}
                this.$router.go(-1);
            },
            closeTip() {
                this.showTip = false;
            }
        },
        activated() {
            if (this.$route.params.kind === 'above') {
                this.carTypes = this.aboveCarTypes;
                if (this.transferAboveSelectedCar != null) {
                       for (let i = 0; i < this.carTypes.length; i++) {
                           if (this.carTypes[i].vehicleName == this.transferAboveSelectedCar.vehicleName) {
                               this.$set(this.carTypes[i],'picked',true);
                           } else {
                                this.$set(this.carTypes[i],'picked',false);
                           }
                       }
                   } 
            } else {
                this.carTypes = this.belowCarTypes;
                if (this.transferBelowSelectedCar != null) {
                       for (let i = 0; i < this.carTypes.length; i++) {
                           if (this.carTypes[i].vehicleName == this.transferBelowSelectedCar.vehicleName) {
                               this.$set(this.carTypes[i],'picked',true);
                           } else {
                                this.$set(this.carTypes[i],'picked',false);
                           }
                       }
                   } 
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import '../../style/mixin';
    .transfer_car_type_container {
        @include wh(100%,100%);
        position: relative;
        .car_type_container {
            width: 100%;
            @include heightByAbsolute(1rem,0);
            overflow-y: scroll;
            .car_container {
                width: 97.3%;

                .car_item {
                    @include wh(100%,1.28rem);
                    padding: 0 .2rem;
                    box-sizing: border-box;
                    background: #fff;
                    @include borderRadius(.1rem);
                    margin-bottom: .2rem;
                    .car_info_container {

                        .car_picker {
                            @include wh(.36rem,.36rem);
                            @include borderRadius(100%);
                            border: 1px solid #adadad;
                            position: relative;
                            margin-right: .2rem;
                        }
                        .car_picker:before {
                            content: '';
                            display: block;
                            @include wh(.1rem,.18rem);
                            border-bottom: 1px solid #fff;
                            border-right: 1px solid #fff;
                            position: absolute;
                            top: 45%;
                            left: 20%;
                            -webkit-transform: rotateZ(45deg) translate(-50%,-50%);
                            transform: rotateZ(45deg) translate(-50%,-50%);
                        }
                        .car_picker_picked {
                            background: #FF8800;
                            border-color: #FF8800;
                        }
                        .car_picker_picked:before {
                            border-color: #fff;
                        }
                        .car_info {
                            
                            .car_type {

                                > p:first-child {
                                    @include sc(.3rem,#000);
                                    margin-right: .2rem;
                                }
                                > p:last-child {
                                    @include sc(.24rem,#9f9f9f);
                                }
                            }
                            > div:last-child {
                                @include sc(.22rem,#9f9f9f);
                            }
                        }
                    }
                    .car_price {
                        > span {
                            color: #f80;
                        }
                        > span:nth-child(1) {
                            font-family: PingFangSC-Light;
                            font-size: 0.24rem;
                            color: #FF6600;
                        }
                        > span:nth-child(2) {
                            font-family: PingFangSC-Medium;
                            font-size: 0.4rem;
                            color: #FF6600;
                            margin: 0 -.1rem;
                        }
                        > span:nth-child(3) {
                            font-family: PingFangSC-Regular;
                            font-size: 0.22rem;
                            color: #999999;
                        }
                    }
                }
            }
        }
    }
</style>
