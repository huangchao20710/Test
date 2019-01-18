 <template>
    <div class="insurance_list_container">
        <head-top :depart="title"></head-top>
        <div class="insurance_list_wrap">
            <ul class="insurance_kind_container" v-for="(insuranceKind,index) in showInsuranceList" :key="index" v-if="insuranceKind.show">
                <li class="insurance_kind_title">{{insuranceKind.title}}</li>
                <li class="insurance_item_container y_flex between_x_flex" v-for="(insuranceItem,insuranceIndex) in insuranceKind.list" :key="insuranceIndex">
                    <div class="y_flex">
                        <p>{{insuranceItem.insuranceClass.name}}<span v-if="insuranceItem.insuranceRemark != '不需要'">-</span>{{insuranceItem.insuranceRemark}}<span class="insurance_ask" v-if="insuranceItem.insuranceRemark != '不需要'" @click="showDetail(insuranceItem)"></span><span v-if="insuranceItem.insuranceRemark == '不需要'">（安全出行，给自己和家人一份保障）</span></p>
                    </div>
                    <div class="y_flex right_flex" :class="{'insurance_none_width':insuranceItem.insuranceRemark == '不需要'}">
                        <span class="single_picker" :class="{'single_picked': insuranceItem.picked}" @click="pickInsurance(insuranceItem,insuranceIndex,index)"></span>
                        <p v-if="insuranceItem.insuranceRemark != '不需要' && insuranceItem.insurancePrice != 0 && !doubleLength"><span>￥{{insuranceItem.insurancePrice}}</span>/份 ×{{isLength}}</p>
                        <p v-if="insuranceItem.insuranceRemark != '不需要' && insuranceItem.insurancePrice != 0 && doubleLength"><span>￥{{insuranceItem.insurancePrice}}</span>/份 ×{{isLength*2}}</p>
                        <p v-if="insuranceItem.insuranceRemark != '不需要' && insuranceItem.insurancePrice == 0" class="font">免费赠</p>
                    </div>
                </li>
            </ul>
        </div>
        <div class="submit_button_container xy_flex">
            <div class="submit_button xy_flex" @click="finishPick">确 定</div>
        </div>
        <insurance-detail-panel :detailInfo="insuranceDetailObj" :insuranceSlideUp="showInsuranceDetail" @closeDetail="closeInsuranceDetail" :isShowInsuranceDetail="showInsurance"></insurance-detail-panel>
        <alert-tip :tipContent="message" :leftButton="leftButton" :rightButton="rightButton" v-if="showMessage" @closeAlert="closeAlert" @rightHandler="rightHandler"></alert-tip>
  </div>
</template>

<script>
    import headTop from '../../components/header/head'
    import alertTip from "../../components/common/alertTip";
    import insuranceDetailPanel from "../../components/common/insurance-detail-panel";
    import { mapActions,mapState } from 'vuex'
    import { setStore,getStore } from '../../config/mUtils'
    export default {
    	data(){
            return{
                title: '选择保险',
                rightMenu: '',
                centerHandlerPath: '',
                showInsuranceList: '',//处理好的保险展示信息
                isShowDetail: false,//是否展示保险说明
                insuranceDetail: '',//保险说明
                showMessage: false,//
                message: '',//
                leftButton: '接受',
                rightButton: '',
                insuranceDetailObj: {},
                showInsuranceDetail: false,
                showInsurance: false,
                isLength:'',
                doubleLength:false,
            }
        },
        props: [
            
        ],
        computed: {
            ...mapState([
                'insuranceListInfo',
                'isKangLvUser',
                'orderedPassengers',
                'isDouble',
            ])
        },
        components: {
            headTop,
            alertTip,
            insuranceDetailPanel
        },
        created() {
            
        },
        mounted(){
        	
        },
        methods: {
            ...mapActions([
                'initData'
            ]),
            pickInsurance(insuranceItem, insuranceIndex, arrIndex) {
                this.showInsuranceList[arrIndex].list.map((item, index) => {
                    item.picked = false;
                });
                insuranceItem.picked = true;
                this.showInsuranceList[arrIndex].list.splice(
                    insuranceIndex,
                    1,
                    insuranceItem
                );
            },
            finishPick() {
                this.showInsuranceList.map((oItem,oIndex) => {
                    oItem.list.splice(oItem.list.length - 1,1);
                });
                let insuranceObj = {
                    key: 'insuranceListInfo',
                    val: this.showInsuranceList 
                };
                try{
                    this.initData(insuranceObj);
                }catch(e){}
                
                this.$router.push(`/${this.$parent.baseUrlPath}/orderForm`);
            },
            toinsurance(){
                let that=this;
                if(navigator.userAgent.indexOf('Mobile') > 0 && (navigator.userAgent.indexOf('iPhone OS') > 0 || navigator.userAgent.indexOf('iPad') > 0) && navigator.userAgent.indexOf('LVMM') > 0){
                    NativeUtil.lvCommon("lvJSGoClass",
                        {
                            "className":"SystemWebbrower",
                            "url":this.insuranceDetail.insuranceUrl
                        }
                    )
                }else{
                    window.open(this.insuranceDetail.insuranceUrl);
                }
            },
            showDetail(item) {
                this.insuranceDetailObj = item;
                this.showInsurance = true;
                this.showInsuranceDetail = true;
            },
            closeInsuranceDetail() {
                this.showInsurance = false;
                this.showInsuranceDetail = false;
            },
            closeDetail() {
                this.isShowDetail = false;
            },
            closeAlert() {
                this.showMessage = false;
            },
            rightHandler() {}
        },
        activated() {
            if(this.isDouble){
                this.doubleLength = true;
            }else{
                this.doubleLength = false;
            }
            if(getStore('passlength') > 0 || getStore('passlength') != null){
                this.isLength = getStore('passlength');
            }else{
                this.isLength = 0;
            }
            this.showInsuranceList = JSON.parse(JSON.stringify(this.insuranceListInfo));
            this.showInsuranceList.map((oItem,oIndex) => {
                let findIndex = -1;
                oItem.list.map((iItem,iIndex) => {
                    if (iItem.picked) {
                        findIndex = iIndex;
                    }
                });
                if (findIndex == -1) {
                    oItem.list.push({
                        insuranceType: oItem.list[0].insuranceType,
                        insuranceRemark: "不需要",
                        insuranceClass: {
                            name: ""
                        },
                        picked: true
                    });
                } else {
                    oItem.list.push({
                        insuranceType: oItem.list[0].insuranceType,
                        insuranceRemark: "不需要",
                        insuranceClass: {
                            name: ""
                        },
                        picked: false
                    });
                }
            });
        }
    }
</script>

<style lang="scss" scoped>
    @import '../../style/mixin';
    .insurance_list_container {
    @include wh(100%,100%);
    position: relative;
    .insurance_list_wrap {
        width: 100%;
        @include heightByAbsolute(0.9rem,1.6rem);
        padding: 0 0.2rem;
        box-sizing: border-box;
        overflow-y: scroll;
        -webkit-overflow-scrolling: touch;
        .insurance_kind_container {
        width: 100%;
        background: #fff;
        margin-top: 0.2rem;
        padding: 0 0.2rem;
        padding-top: .1rem;
        @include borderRadius(0.1rem);
        .insurance_kind_title {
            color: #333;
            font-weight: 700;
            // height: .88rem;
            line-height: 0.6rem;
            box-sizing: border-box;
        }
        >li:nth-of-type(2){
            border-top: 0;
        }
        >li:last-child{
            border-bottom: 0;
        }
        .insurance_item_container {
            // border-top: 1px solid #e4e4e4;
            @include topline();
            padding: 0.24rem 0;
            box-sizing: border-box;
            > div:first-child {
            width: 74%;
            > p {
                @include sc(0.26rem,#666);
                line-height: .4rem;
                span {
                color: #aaa;
                }
            }
            }
            > div:nth-child(2) {
                width: 28%;
                > p {
                    @include sc(0.2rem,#666);
                    span {
                    @include sc(0.24rem,#333);
                    }
                }
                >.font{
                    font-size: .24rem;
                }
            }
            .insurance_none_width {
            width: 10% !important;
            }
            .insurance_ask {
            @include wh(0.24rem,0.24rem);
            display: inline-block;
            background: url('//m.lvmama.com/bus/image/insuranceAsk.png') 0 0 no-repeat;
            background-size: 100% 100%;
            margin-left: 0.2rem;
            margin-bottom: -.02rem;
            }
        }
        .insurance_item_container:last-child {
            > div:first-child {
            width: auto;
            }
        }
        }
    }
}
</style>
