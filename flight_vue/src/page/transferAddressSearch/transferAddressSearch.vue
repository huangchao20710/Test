 <template>
    <div class="transfer_address_search_container">
        <search-header @get-input="getInput" @get-input-state="getInputState" :placeholderContent="placeholderContent"></search-header>
        <div class="address_search_body_container">
            <div class="now_location_container" v-show="locationInfo.address!=null && locationInfo.address!=''">
                <div class="address_title">当前位置</div>
                <div class="now_location address_item_style y_flex" @click="chooseLocation(locationInfo,'location')">
                    <div class="loaction_icon"></div>
                    <p>{{locationInfo.address}}</p>
                </div>
            </div>
            <div class="search_history_container" v-if="historyLoaction.length > 0">
                <div class="address_title">历史搜索</div>
                <ul class="history_container">
                    <li class="history_item address_item_style y_flex" v-for="item in historyLoaction" @click="chooseLocation(item)">
                        <span class="history_icon"></span>
                        <p>{{item.area}}{{item.location}}</p>
                    </li>
                </ul>
                <div class="address_title xy_flex" @click="clearHistory">清空搜索记录</div>
            </div>
        </div>
        <div class="search_result_container" v-show="allSearchAddress.length > 0">
            <ul>
                <li class="search_item" v-for="item in allSearchAddress" @click="chooseLocation(item)">
                    <p>{{item.area}}</p>
                    <p>{{item.location}}</p>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    import { lQuery } from '../../plugins/lQuery'

    import searchHeader from '../../components/common/searchHeader' 

    import { mapActions,mapState } from 'vuex'
    import { getTransferAddress } from '../../service/getData'

    import {setStore, getStore} from '../../config/mUtils'
    export default {
        data(){
            return{
                placeholderContent: '请输入出发地点',
                isFocus: false,
                allSearchAddress: [],//通过输入找的城市
                historyLoaction: [],//历史记录城市
            }
        },
        props: [
            
        ],
        components: {
            searchHeader
        },
        created() {

        },
        mounted(){
            
        },
        methods: {
            ...mapActions([
                'initNoStorageData'
            ]),
            //获取input的聚焦失焦值
            getInputState(bool){
                this.isFocus = bool;
            },
            getInput(val) {
                let allSearchAddress = [];
                if (val != '') {
                    getTransferAddress(val,'callback','JSON_CALLBACK',(res) => {
                        if(res.s){
                            for(let i = 0;i < res.s.length;i++){
                                let srep=res.s[i].split("$");
                                if(srep[0]!="" && srep[1]!="" &&srep[3]!=""){
                                    let obj = {
                                        'area': srep[0]+srep[1]+srep[2],
                                        'location': srep[3]
                                    };
                                    allSearchAddress.push(obj);
                                }
                            }
                            this.allSearchAddress = allSearchAddress;
                        }
                    })
                } else {
                    this.allSearchAddress = [];
                }
            },
            chooseLocation(item,kind = '') {
                if (kind === 'location') {
                    let tempItem = item;
                    item = {
                        area: tempItem.address.substr(0,tempItem.address.indexOf('区')+1),
                        location: tempItem.address.substr(tempItem.address.indexOf('区')+1)
                    };
                }
                if (this.$route.params.kind == 'above') {
                    let obj = {
                        key: 'transferAboveAddress',
                        val: item
                    };
                    try{
                        this.initNoStorageData(obj);
                    }catch(e){}
                    
                } else {
                    let obj = {
                        key: 'transferBelowAddress',
                        val: item
                    };
                    try{
                        this.initNoStorageData(obj);
                    }catch(e){}
                    
                }
                this.allSearchAddress = [];
                this.$children[0].inputContent = '';
                let findIndex = -1;
                for (let i = 0; i < this.historyLoaction.length; i++) {
                    if (this.historyLoaction[i].location == item.location) {
                        findIndex = i;
                    }
                }
                if (findIndex === -1) {
                    this.historyLoaction.push(item);
                }
                if (this.historyLoaction.length > 5) {
                    this.historyLoaction.splice(0,1);
                }
                setStore('transferAddressHistory',JSON.stringify(this.historyLoaction));
                this.$router.go(-1);
            },
            clearHistory() {
                this.historyLoaction = [];
                setStore('transferAddressHistory',JSON.stringify(this.historyLoaction));
            }
        },
        activated() {
            if (getStore('transferAddressHistory')) {
                this.historyLoaction = JSON.parse(getStore('transferAddressHistory'));
            };
            let pathUrl = this.$route.path;
            if (pathUrl.indexOf('send') != -1) {
                this.placeholderContent = '请输入出发地点';
            } else {
                this.placeholderContent = '请输入送达地点';
            }
        },
        computed: {
            ...mapState([
                'locationInfo',
            ])
        },
        beforeRouteLeave(to,from,next) {
            this.allSearchAddress = [];
            next(true);
        }
    }
</script>

<style lang="scss" scoped>
    @import '../../style/mixin';
    .transfer_address_search_container {
        @include wh(100%,100%);
        position: relative;
        padding-top: 1rem;
        box-sizing: border-box;
        .address_search_body_container {

            .address_title {
                width: 100%;
                padding: .2rem;
                @include sc(.24rem,#666);
            }
            .address_item_style {
                width: 100%;
                background: #fff;
                padding: .3rem;
                color: #000;
                box-sizing: border-box;
            }
            .now_location_container {
                .now_location {
                    .loaction_icon {
                        @include wh(.28rem,.34rem);
                        background: url('//m.lvmama.com/flight/image/locationIcon.png') no-repeat;
                        background-size: 100%;
                        margin: 0 .2rem;
                    }
                }
            }
            .search_history_container {

                .history_container {
                    
                    .history_item {
                        border-bottom: 1px solid #f1f1f1;
                        .history_icon {
                            display: inline-block;
                            @include wh(.34rem,.34rem);
                            background: url('//m.lvmama.com/flight/image/historyAddressIcon.png') no-repeat;
                            background-size: 100%;
                            margin: 0 .2rem;
                        }
                    }
                }
            }
        }
        .search_result_container {
            @include heightByAbsolute(1rem,0);
            overflow-y: scroll;
            background: #fff;
            .search_item {
                padding: .3rem;
                box-sizing: border-box;
                > p:first-child {
                    color: #000;
                }
                > p:nth-child(2) {
                    @include sc(.24rem,#9f9f9f);
                    margin-top: .1rem;
                }
            }
        }
    }
</style>
