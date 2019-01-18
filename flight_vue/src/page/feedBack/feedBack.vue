 <template>
    <div class="feedBack_container">
        <head-top path="/vflight" :depart="depart" :goPage="goPage"></head-top>
        <div class="feedBack_reason" @click="showReasonPicker"> <!-- y_flex between_x_flex -->
            <div> <!-- class="y_flex" -->
                <div class="item_title new_item">问题种类(机票)</div>
                <p class="reason_input y_flex placeholderStyle" v-if="areaResult.name == undefined">请选择您碰到的问题种类</p>
                <p class="reason_input y_flex" v-else>{{areaResult.name}}</p>
                <div class="new_arrow"></div>
            </div>
        </div>
        <div class="orderLine"></div>
        <div class="feedBack_improve_container">
            <textarea class="improve_idea" placeholder="您的意见是对我们产品改进最大的支持" v-model="improveContent"></textarea>
        </div>
        <div class="orderLine"></div>
        <div class="feedBack_phone feedBack_reason">
            <div> <!-- class="y_flex" -->
                <div class="item_title special">联系手机</div>
                <input class="reason_input" type="tel" placeholder="您的意见，我们将慎重对待" v-model="telNo" maxlength="11" @focus="getFun" @blur="closeFun">
                <div class="clearContainer xy_flex" v-show="telNo&&isFocus">
                    <i @click="clearContent"></i>
                </div>
            </div>
        </div>
        <reason-picker :show="reasonStatus" :result="areaResult" :title="title" :optionsContent="reasonData"></reason-picker>
        <div class="submit" @click="submitInfor">提 交</div>
        <!-- <p class="qqNumber">紧急问题请加VIP用户QQ群:661267001</p> -->
        <alert-tip :tipContent="message" :leftButton="leftButton" v-if="showAlert" @closeAlert="returnGo"></alert-tip>
    </div>
</template>

<script>
    import reasonPicker from '../../components/common/scroll-menu-component'
    import headTop from '../../components/header/head'
    import { feedbackCreate,getLvUser,getLvUserByCookie } from '../../service/getData'
    import { isClient,getNoticeSource,getLvSessionId,checkMobile } from '../../config/mUtils'
    import alertTip from '../../components/common/alertTip'
    import { mapActions,mapState } from 'vuex'

    export default {
        data(){
            return{
                depart: '反馈意见',
                goPage:'feek',
                reasonStatus: false,
                areaResult: {},
                title: '问题种类',
                reasonData: [
                    {'code': 0,name: '价格问题'},
                    {'code': 1,name: '儿童票、婴儿票'},
                    {'code': 2,name: '无目的地的航线'},
                    {'code': 3,name: '剩余票量变动'},
                    {'code': 4,name: '保险'},
                    {'code': 5,name: '下单失败'},
                    {'code': 6,name: '特价机票'},
                    {'code': 7,name: '报销凭证'},
                    {'code': 8,name: '退改签'},
                    {'code': 9,name: '餐食'},
                    {'code': 10,name: '其他'},
                ],
                improveContent: '',//改进意见
                telNo: '',//手机号码
                message:'您的宝贵意见小驴已经收到了！',
                leftButton:'返回',
                showAlert:false,
                userId:'',
                userName:'',
                isFocus:false
            }
        },
        props: [
            
        ],
        components: {
            headTop,
            reasonPicker,
            alertTip
        },
        computed:{
            ...mapState([
                'businessTravel',
            ])
        },
        methods: {
            // ...mapActions([
	        //     'initData'
			// ]),
            showReasonPicker() {
                this.reasonStatus = true;
            },
            submitInfor(){
                var problemKind = "";
                if (this.areaResult.name == '请选择您碰到的问题种类') {
                    problemKind = '';
                }else if(this.areaResult.name == '价格问题'){
                    problemKind = 'FLIGHT_PRICE_PROBLEM';
                }else if(this.areaResult.name == '儿童票、婴儿票'){
                    problemKind = 'FLIGHT_CHILDREN_TICKET';
                }else if(this.areaResult.name == '无目的地的航线'){
                    problemKind = 'FLIGHT_NO_ARRIVAL_AIRLINE';
                }else if(this.areaResult.name == '剩余票量变动'){
                    problemKind = 'FLIGHT_INVENTORY_ALTERATE';
                }else if(this.areaResult.name == '保险'){
                    problemKind = 'FLIGHT_INSURANCE_PROBLEM';
                }else if(this.areaResult.name == '下单失败'){
                    problemKind = 'FLIGHT_ORDER_FAIL';
                }else if(this.areaResult.name == '特价机票'){
                    problemKind = 'FLIGHT_SPECIAL_TICKET';
                }else if(this.areaResult.name == '报销凭证'){
                    problemKind = 'FLIGHT_REIMBURSE_VOUCHER';
                }else if(this.areaResult.name == '退改签'){
                    problemKind = 'FLIGHT_REFUND_TICKET';
                }else if(this.areaResult.name == '餐食'){
                    problemKind = 'FLIGHT_MEALS_PROBLEM';
                }else if(this.areaResult.name == '其他'){
                    problemKind = 'FLIGHT_OTHERS';
                }

                if(isClient() == 1){
                    var typeBefore = 'FLIGHT_APP_';
                }else{
                    var typeBefore = 'FLIGHT_WAP_';
                }
                let path = window.location.pathname.split('/').reverse()[0],
                    platFormType = typeBefore+path.toUpperCase();
                if(this.telNo!="" && !checkMobile(this.telNo)){
                    let that=this;
                    this.message = "请输入正确的手机号码";
                    this.leftButton = "";
                    this.showAlert = true;
                    setTimeout(function(){that.showAlert=false;},2000);
                    return;
                }
                //调提交反馈意见接口
                console.log(problemKind);
                if(problemKind!=''&&problemKind!=null&&this.improveContent!=''&&this.improveContent!=null){
                    feedbackCreate(this.improveContent,this.telNo,problemKind,platFormType,getNoticeSource().toUpperCase(),this.userId,this.userName).then((res) => {
                        if(res.code == 1 && res.data){
                            this.message = "您的宝贵意见小驴已经收到了！";
                            this.leftButton = "返回";
                            this.showAlert = true;
                        }
                    })
                }else{
                    if(problemKind==''||problemKind==null){
                        this.message = "请选择一个对应的问题种类进行反馈";
                    }else if(this.improveContent==''||this.improveContent==null){
                        this.message = "请填写吐槽内容";
                    }
                    this.leftButton = "知道了";
                    this.showAlert = true;
                }
                
            },
            returnGo(){
                
                if(this.leftButton == "知道了"){
                    this.showAlert = false;
                }else{
                    this.showAlert = false;
                    if(window.location.pathname.split('/').reverse()[0]=="index" && !this.businessTravel){
                        if(isClient() == 1 && location.href.indexOf("from=nativePage")!=-1) {
                            window.NativeUtil && NativeUtil.lvCommon('lvJSBackPage', { 'animate': '1' });
                        }else{
                            if (NativeUtil.isLVMM && NativeUtil.isGreaterThan('7.10.5')  && document.cookie.indexOf('closeMultipleWebView=true') === -1) {
                                NativeUtil.lvCommon('lvJSBackPage', { 'animate': '1' })    
                            } else {
                                this.$router.go(-1); 
                            }
                        }
                    }else{
                        this.$router.go(-1);
                    }
                }
               
            },
            getFun(){
                this.isFocus = true;
            },
            closeFun(){
                let that = this;
                setTimeout(function(){
                    that.isFocus = false;
                },50);
                
            },
            clearContent(){
                this.isFocus = false;
                this.telNo = '';
            }


            

        },
        activated(){
            //判断有没有登录
            if(isClient() == 1){
                //app登录
               //  getLvUser(getLvSessionId()).then((res) => {
               //      if(res.code == 1){
               //          this.userId = res.data.userId;
               //          this.userName = res.data.userName;
               //          this.telNo = res.data.mobileNumber;
               //      }
               // }) 
                getLvSessionId().then((data) => {
                    if(data!=null && data!=undefined && data!=""){
                        getLvUser(data).then((res) => {
                            if(res.code == 1){
                                this.userId = res.data.userId;
                                this.userName = res.data.userName;
                                this.telNo = res.data.mobileNumber;
                            }
                        });
                    }
                })
            }else{
                //wap登录
               getLvUserByCookie().then((res) => {
                    if(res.code == 1){
                        this.userId = res.data.userId;
                        this.userName = res.data.userName;
                        this.telNo = res.data.mobileNumber;
                    }
               }) 
            }

        },
        mounted(){

        },
        watch: {
            $route(to,from) {
                if (to.path.indexOf('feedBack') != -1) {
                    this.improveContent = '';
                    this.areaResult = {};
                    this.showAlert = false;
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
@import '../../style/mixin';
    .feedBack_container {
        @include wh(100%,100%);
        .orderLine{
            @include orderline();
        }
        .feedBack_reason {
            height:.88rem;
            background: #fff;
            padding: 0 .2rem;
            position: relative;
            margin: .2rem .2rem 0 .2rem;
            border-radius: 5px 5px 0 0;
            > div:first-child {
                @include wh(100%,inherit);
                .item_title {
                    width: 35%;
                    display: inline-block;
                    @include sc(0.28rem,#666666);
                }
                .special{
                    width: 20%;
                }
                .new_item{
                    float: left;
                    line-height: 0.88rem;
                }
                .new_arrow{
                    @include ct;
                    right: 0.2rem;
                    top: 49%;
                    @include wh(0.14rem,0.2rem);
                    background: url("//m.lvmama.com/flight/image/pointer.png") no-repeat;
                    background-size: 100%;
                   
                }
            }
            .reason_input {
                @include wh(55%,inherit);
                font-size: .28rem;
            }
        }
        .feedBack_improve_container {
            height: 4.1rem;
            padding: .2rem .2rem 0;
            box-sizing: border-box;
            background: #fff;
            margin: 0 .2rem;
            .improve_idea {
                resize: none;
                @include wh(100%,100%);
                font-size: .28rem;
            }
        }
        .feedBack_phone {
            margin-top: 0;
            position: relative;
            border-radius: 0 0 5px 5px;
            position:relative;
            .clearContainer {
                @include wh(.5rem,inherit);
                position:absolute;
                right:0.2rem;
                top:50%;
                transform: translateY(-50%); 
                > i {
                    display: inline-block;
                    @include wh(0.28rem,0.28rem);
                    background:url("//m.lvmama.com/flight/image/cancle.png") no-repeat;
                    background-size: 100%;
                }
            }
        }
        .submit{
            height:0.9rem;
            line-height: 0.9rem;
            text-align: center;
            background-image: linear-gradient(90deg, #FE686C 0%, #FD3C71 100%);
            margin:0.8rem 0.2rem 0 0.2rem;
            border-radius: 100px;
            @include sc(0.36rem,#fff);
        }
        .qqNumber{
            float: right;
            margin-right: 0.25rem;
            margin-top: 0.2rem;
            color: #000;
        }

    }
</style>
