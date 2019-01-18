<template>
	<div class="endorse">
		<head-top :depart="title"></head-top>
		<backtochange-flight v-if="flightDetail!=''" :flightDetail="flightDetail"></backtochange-flight>
		<div class="endorse-container" v-show="flightDetail!=''" :style="{'height':ecHeight}">
		    <div class="endorse-item-container">
		        <div class="endorse-title">
		            <p class="one" v-if="changeBack == 'ct'">选择需要改签的乘客</p>
		            <p class="one" v-if="changeBack == 'rt'||changeBack == 'rtz'">选择需要退票的乘客</p>
		        </div>
		        <div class="passager-prompt">
					<i></i>
					<p v-if="changeBack == 'ct'">友情提示：儿童不能单独乘机，请确保改签后同行的儿童有成人陪同。</p>
					<p v-else>友情提示：儿童不能单独乘机，请确保退票后同行的儿童有成人陪同。</p>
				</div>
		        <div class="passager-wrap">
		            <ul>
		                <li v-for="(item,index) in passagers " @click="pickPassager(index)">
		                    <span class="endorse-item-type" v-bind:class="{'hui_type':item.passengerType == '儿童'}">
								<p>{{item.passengerType}}票</p>
								<p>{{index+1}}</p>
							</span>
		                    <span class="endorse-item-info">
		                        <p>{{item.passengerName}}</p>
		                        <p>{{item.passengerIDCardType}} {{item.passengerIDCardNo}}</p>
		                    </span>
							<span class="endorse-item-pick">
		                    	<i class="picker" :class="{'picked': item.picked==true}"></i>
		                    </span>
		                </li>
		            </ul>
		        </div>
		        <div class="orderline"></div>
		        <div class="endorse-title">
		            <p class="two">联系手机<span>{{contactNumber}}</span></p>
		        </div>
		    </div>

		    <div v-if="changeBack == 'ct'&&flightDetail!=''" class="endorse-item-container">
		        <div class="endorse-title" @click="openEndorseDatePicker()">
		            <p class="ct">改签日期
		                <span :class="{'bbb':endorseDate=='请选择您要改签的日期'}">{{endorseDate}}</span>
		                <span class="point_right_arrow endorse-arrow"></span>
		            </p>
		        </div>
		    </div>

		    <section v-if="(changeBack == 'rt'||changeBack == 'rtz') && departureAirportCode" class="endorse-item-container">
		        <div class="endorse-title" @click="showReasonPicker">
		            <p class="reason_input"><span class="luckyselector">{{areaResult.name}}</span>
		            <span class="point_right_arrow endorse-arrow"></span></p>
		        </div>
		    </section>

		    <!-- <section v-show="changeBack == 'ct'" class="endorse-item-container">
		        <div class="endorse-remark-container">
		            <textarea placeholder="备注" class="endorse-remark" name="" v-model="endorseRemark"></textarea>
		        </div>
		    </section> -->

		    <section v-show="(changeBack == 'rt'||changeBack == 'rtz') && areaResult.name=='其他'" class="endorse-item-container">
		        <div class="endorse-remark-container">
		            <textarea placeholder="请填写原因" class="endorse-remark" name=""  v-model="endorseRemark1"></textarea>
		        </div>
		    </section>

		    <!-- <p v-if="changeBack == 'ct'" class="childAttention">特别提醒：如有儿童，请在备注中填写有儿童随行</p> -->

		    <div v-if="endorsePrice!='' && endorsePrice!=null && endorsePrice!='NaN' && changeBack != 'ct'" class="endorse-item-container">
		        <div class="endorse-title">
		            <p class="two" v-if="changeBack == 'ct'">改签费用</p>
		            <p class="two" v-if="changeBack == 'rt'||changeBack == 'rtz'">退票费用</p>
		        </div>
		        <div class="orderline"></div>
		        <div class="endorse-rule">
		            <p v-for="(item,index) in endorsePrice" :key="index" v-if="changeBack != 'ct' && item.feeAmount!=''&& item.feeAmount!=null &&item.feeAmount!='null'">
						{{item.detailFeeDesc}}<em v-if="item.detailFeeDesc!=''">:</em>
						<span v-if="item.feeAmount != '0' && item.feeAmount != '9999'">{{item.feeAmount}}RMB/人</span>
						<span v-if="item.feeAmount == '9999'">{{changeBack == 'ct'?'不得改签':'不得退票'}}</span>
						<span v-if="item.feeAmount == '0'">{{changeBack == 'ct'?'免费改签':'免费退票'}}</span></p>
		            <p v-if="endorsePrice">具体费用以最终审核为准</p>
		        </div>
		    </div>
		    <div v-if="(endorsePrice=='' || endorsePrice==null || endorsePrice=='NaN')&& changeBack != 'ct'" class="endorse-item-container">
		        <div class="endorse-title">
		            <p class="two" v-if="changeBack == 'ct'">改签费用</p>
		            <p class="two" v-if="changeBack == 'rt'||changeBack == 'rtz'">退票费用</p>
		        </div>
		        <div class="orderline"></div>
		        <div class="endorse-rule">
		            <p>具体退改费以最终审核为准</p>
		        </div>
		    </div>

		    <!-- <p class="attention" v-if="changeBack == 'ct'">*请保持联系手机畅通，客服会尽快联系您，确认改签信息</p> -->
		    <p class="attention" v-if="changeBack == 'rt'||changeBack == 'rtz'">*请保持手机畅通，如最终审核费用出现偏差时，客服会尽快联系您</p>
			<p class="attention" v-if="changeBack == 'rt'||changeBack == 'rtz'">*退票提交后，将无法撤销，请认真核对申退信息</p>
		</div>

		<footer class="endorse-footer" v-show="changeBack == 'rt'||changeBack == 'rtz'">
		    <a href="tel:10106060,1,6" v-if="!changePhone" class="contact-service"><span class="contact-service-icon"></span><span class="contact-service-span">客服</span></a>
			<a href="tel:10106060" v-if="changePhone" class="contact-service"><span class="contact-service-icon"></span><span class="contact-service-span">客服</span></a>
			<div class="submit-endorse" @click="submitEndorse()">提交申请</div>
		</footer>

		<!--提交弹框 -->
		<div class="matte" v-show="showDialog"> 
		    <div class="submitDialog endorseDialog">
		        <div class="content">
		            <p v-if="!fail">提交成功！</p>
		            <p v-if="fail">提交失败，给您带来不便，您还可联系客服进行操作</p>
		        </div>
		        <div class="line1"></div>
		        <div v-if="!fail" class="backButton" @click="backToDetail()">知道了</div>
		        <div v-if="fail" class="backButton" @click="submitAgain()">知道了</div>
		    </div>
		</div>

		<div class="matte" v-show="endorseConditions"> 
		    <div class="small-pop">
		        {{condition}}
		    </div>
		</div>
		<div class="swiper-container-detail" v-if="showMUdetail">
			<div class="rulesMask" @click="hideMUdetail"></div>
			<div class="matteDetailValue">
			<div class="title">东航病退说明</div>
			<div class="container">
				<p>
					旅客因健康原因不宜乘机而申请退票，需在航班起飞前提出退票申请，并提供由国内二级甲等以上医院填写，或由国外诊所或医院（医疗中心）出具的下列两类文件之一：<br>
					1.在飞行期间不适宜乘机且盖章的《诊断证明书》。<br>
					2.能够证明旅客在客票列明的航班飞行期间不适宜乘机的真实有效的诊疗证明原件及复印件（如诊断书、病历、住院证明等）和医疗机构收费票据及复印件（如挂号、门急诊、住院）。<br>

					患病旅客按“自愿退票”办理，免收退票手续费；若其同行旅客（最多限两位）同时申请退票，须附患病旅客的客票（或《行程单》）复印件及相关证明复印件，按自愿退票办理，免收退票手续费。<br>

					申请身故旅客的客票退票，需要出示身故旅客死亡证明复印件，按自愿退票办理，免收退票手续费；若其同行旅客（最多限两位）同时申请退票，按自愿退票办理，免收退票手续费。<br>

					若上述特殊旅客（包括同行旅客）持不得退票的客票退票，由东航直属售票处按“可退客票”的自愿退票规定办理，免收退票手续费。
					</p>
			</div>
			<div class="buttom">
				<span @click="hideMUdetail">确定</span>
			</div>
			</div>
		</div>
		<reason-picker :show="reasonStatus" :result="areaResult" :optionsContent="reasonData" :flightDetail="flightDetail" v-if="reasonData.length>0" ></reason-picker>
		<alert-tip v-if="showAlert" :tipContent="message" :title="alertTitle" :leftButton="leftButton" :rightButton="rightButton" @closeAlert="close" @rightHandler="sure"></alert-tip>
	</div>
</template>
<script>
	import headTop from '../../components/header/head'
	import { mapState,mapActions } from 'vuex'
	import { getStore,setStore,addZero,switchDateFormate,removeStore} from '../../config/mUtils'
	import { getFlightTicketRuleCharge,orderCombinedDetail,ctmtapply,RTVTApply} from '../../service/getData'
	import reasonPicker from '../../components/common/scroll-menu-component'
	import alertTip from '../../components/common/alertTip'
	import backtochangeFlight from '../../components/common/backtochange-flight-component'

	export default {
        data(){
            return{
				title: '',
				alertTitle:'',
                reasonStatus: false,
                orderId:'',
                orderMainId:'',
                changeBack:'',
                endorseDate:'请选择您要改签的日期',
                endorsePrice:'',
                contactNumber:'',
                passagers:'',
                departureAirportCode:'',
                arrivalAirportCode:'',
                picked:[],
                pickedPassagers:'',
                condition:'',
                endorseConditions:false,
                showDialog:false,
                fail:'',
                endorseRemark:'',
                endorseRemark1:'',
                orTodate:false,
                areaResult: {},
                reasonData: [],
				passengerIdTicketNo: [],
				changePhone:false,
				showAlert:false,
				message:'',
				leftButton:'',
				rightButton:'',
				applyRefundType:'',
				endorseReason:'',
				flightDetail:'',
				fee:'',
				ecHeight:'',
				showMUdetail:false,
            }
        },
        components: {
            headTop,
			reasonPicker,
			alertTip,
        	backtochangeFlight
        },
        created() {

        },
        mounted(){
        	
        },
        methods: {
        	...mapActions([
	        	'initData',//初始化时间
	        ]),
        	showReasonPicker() {
                this.reasonStatus = true;
            },
        	//将价格转化为整数方便比较
        	getInit(obj) {
				for (var i = 0; i < obj.length; i++) {
					if(obj[i].feeAmount!=null && obj[i].feeAmount!='' && obj[i].feeAmount!="null"){
						obj[i].feeAmount = parseInt(obj[i].feeAmount)+"";
					}
				}
				return obj;
			},
			//选择乘客函数
			pickPassager(index) {
				this.passagers[index].picked = !this.passagers[index].picked;

				let pickedPassagers = [];
				this.passengerIdTicketNo = [];
				for (var i = 0; i < this.passagers.length; i++) {
					if (this.passagers[i].picked==true) {
						pickedPassagers.push(this.passagers[i]);
						this.passengerIdTicketNo.push(this.passagers[i].ticketNo);
					}
					this.pickedPassagers=pickedPassagers;
				}
				setStore('passengerIdTicketNo',this.passengerIdTicketNo);
			},
			getOrderDetailIds(obj) {//改签orderId获取函数
	        	var arr = [];	
	        	for (var i = 0; i < obj.length; i++) {
	        		var a = {'orderDetailId': obj[i].orderDetailId};
	        		arr.push(a);
	        	}
	        	return arr;
	        },
	        getOrderDetailIds_arr(obj) {//退票oederId获取函数
	        	var arr = [];
	        	for (var i = 0; i < obj.length; i++) {
	        		arr.push(obj[i].orderDetailId);
	        	}
	        	return String(arr);
	        },
			submitEndorse() {//提交改签退票信息
	        	let userName = getStore('selectusername');
	        	let that=this;
				if (this.changeBack == 'ct') {//改签
                    if (this.pickedPassagers==null||this.pickedPassagers.length < 1) {
                        this.condition = '请选择改签人';
                        this.endorseConditions = true;
						 setTimeout(function(){
                            that.endorseConditions = false;   
                        },2000)
                    }else if (this.endorseDate == '请选择您要改签的日期') {
						 this.condition = '请选择您要改签的日期';
						 this.endorseConditions = true;
						 setTimeout(function(){
							 that.endorseConditions = false;
						 },2000)
					}else{
						this.showAlert = true;
						this.alertTitle='';
						this.message = '将对您选中乘客的机票进行改签，确定改签吗？';
						this.leftButton = '取消';
						this.rightButton = '确定';
                    }

				} else if(this.changeBack == 'rt'|| this.changeBack == 'rtz') {//主单退票，子单退票
	                let endorseReason = "";
	                if (this.pickedPassagers==null || this.pickedPassagers.length < 1) {
	                    this.condition = '请选择退票人';
	                    this.endorseConditions = true;
							setTimeout(function(){
	                        that.endorseConditions = false;   
	                    },2000)
	                } else {
						if(this.areaResult.name=="航班变动或取消(需审核相关航班信息)"){
							var applyRefundType=0;
							endorseReason=this.areaResult.name;
						}else if(this.areaResult.name=="因身体原因，无法乘机"){
							var applyRefundType=1;
							endorseReason=this.areaResult.name;
						}else if(this.areaResult.name=="我要改变行程计划，我不想飞了"){
							var applyRefundType=2;
							endorseReason=this.areaResult.name;
						}else if(this.areaResult.name=="填错名字，选错日期，选错航班"){
							var applyRefundType=3;
							endorseReason=this.areaResult.name;
						}else if(this.areaResult.name=="其他"){
							var applyRefundType=4;
							endorseReason=this.endorseRemark1;
							if(endorseReason == "" || endorseReason == null){
								this.condition = '请输入退票原因';
								this.endorseConditions = true;
								setTimeout(function(){
									that.endorseConditions = false;
								},2000)
								return;
							}
						}else{
							this.condition = '请选择退票原因';
							this.endorseConditions = true;
							setTimeout(function(){
								that.endorseConditions = false;
							},2000)
							return;
						}
						this.message = '退票申请成功以后，将不能更改，是否确认退票？';
						if(applyRefundType==2||applyRefundType==3||applyRefundType==4){
							this.message = '申请提交后不可撤销，将尽快为您取消机位、处理退款';
						}
						this.showAlert = true;
						this.alertTitle='';
						this.leftButton = '取消';
						this.rightButton = '确定';
						this.applyRefundType = applyRefundType;
						this.endorseReason = endorseReason;
    				}
                }	                  
			},
			submitClick(){
				let userName = getStore('selectusername');
				this.fail = "";
				this.showAlert = false;
				this.$parent.showLoading = true;
				if (this.changeBack == 'ct') {//改签
					let endorseDate=new Date(this.endorseDate.split('-').join('/')).getTime();
					let flightOrderTicketCTMTVoList=JSON.stringify(this.getOrderDetailIds(this.pickedPassagers));
					let flightOrderTicketCTMTVo=JSON.parse(flightOrderTicketCTMTVoList);
					let param = {
						'orderId':this.orderId,//
						'applySource': 'LVMAMA_H5',
						'operApply': userName,
						'ctmtDepartureDate': endorseDate,
						'remark': this.endorseRemark,
						'flightOrderTicketCTMTVoList': flightOrderTicketCTMTVo
					};
					param=JSON.stringify(param).replace(/\\"/g,"'");
					ctmtapply(param).then((res) => {
						this.$parent.showLoading = false;
						// this.showDialog = true;
						// this.showAlert = false;
						if (res.code == '1') {
							this.fail = false;
							this.alertTitle='提交成功！';
							this.message = '请保持联系手机畅通，客服会尽快联系您';
							this.pickedPassagers='';
						} else {
							this.fail = true;
							this.alertTitle='';
							this.message = '提交失败，给您带来不便，您还可联系客服进行操作';
						}
						this.leftButton = '知道了';
						this.rightButton = '';
						this.showAlert = true;
					})
				}else if(this.changeBack == 'rt'|| this.changeBack == 'rtz') {//主单退票，子单退票
					let orderDetailIds=this.getOrderDetailIds_arr(this.pickedPassagers);
					RTVTApply(this.orderId,orderDetailIds,userName,this.applyRefundType,this.endorseReason,this.fee).then((res) => {
						this.$parent.showLoading = false;
						// this.showDialog = true;
						// this.showAlert = false;
						if (res.code == '1') {
							this.message = '提交成功！';
							this.fail = false;
							this.pickedPassagers='';
							setStore('passengerIdTicketNo',[]);
						} else {
							this.fail = true;
							this.message = '提交失败，给您带来不便，您还可联系客服进行操作';
							
						}
						this.alertTitle='';
						this.leftButton = '知道了';
						this.rightButton = '';
						this.showAlert = true;
					})
				}
			},
			close(){
				if(this.fail === false){
					this.$router.go(-1);
				}
				this.showAlert = false;
			},
			hideMUdetail(){
				this.showMUdetail=false;
			},
			sure(){
				this.submitClick();
			},
			openEndorseDatePicker(){
				if (this.pickedPassagers==null||this.pickedPassagers.length < 1) {
					this.condition = '请选择改签人';
					this.endorseConditions = true;
					setTimeout(()=>{
						this.endorseConditions = false;   
					},2000)
					return;
				}
				this.orTodate=true;
				let isDouble = {
		            key: 'isDouble',
		            val: false
		        };
				try{
					this.initData(isDouble);
				}catch(e){}
				let endorseInfo={};
				endorseInfo.flightDetail=this.flightDetail;
				endorseInfo.pickedPassagers = this.pickedPassagers;
				let endorseObj = {
		            key: 'endorseInfo',
		            val: endorseInfo
		        };
				try{
					this.initData(endorseObj);
				}catch(e){}
				this.$router.push(`/${this.$parent.baseUrlPath}/datePicker/departDate/endorse`);
			},
			backToDetail(){
				this.showDialog = false;
				this.showAlert = false;
				this.$router.go(-1);
	        },
	        submitAgain (){
				this.showDialog = false;
				this.showAlert = false;
	        }
        },
        activated() {
			removeStore('endorseInfo',this);
			this.reasonData=[];
			this.fee = '';
			this.fail = "";
			this.flightDetail="";
			this.ecHeight='';
			this.showMUdetail='';

            this.orderId=this.$route.params.orderId!=null?this.$route.params.orderId.replace(/\,/g,''):"";
            this.orderMainId=this.$route.params.orderMainId!=null?this.$route.params.orderMainId.replace(/\,/g,''):"";
            this.changeBack=this.$route.params.type;
            if (this.changeBack== 'ct') {
            	this.title='申请改签'
            }else{
            	this.title='申请退票'
            }
			this.areaResult.name="请选择退票原因";
			this.$parent.showLoading = true;
			if(this.changeBack != 'ct'){
				getFlightTicketRuleCharge(this.orderId).then((res) => {
					if (+res.code === 1) {
						if (res.message != '没有数据') {
							if (this.changeBack == 'ct') {//改签
								if(res.data.ctPrice!=null && res.data.ctPrice!="null"){
									this.endorsePrice = this.getInit(res.data.ctPrices);
								}else{
									this.endorsePrice = '';
								}
							} else if(this.changeBack == 'rt') {//退票
								if(res.data.rtPrice!=null && res.data.rtPrice!="null"){
									this.fee=res.data.rtPrice;
								}
								if(res.data.rtPrices!=null && res.data.rtPrices!="null"){
									this.endorsePrice = this.getInit(res.data.rtPrices);
								}else{
									this.endorsePrice = '';
								}
							}        		
						}
					}
				})
			}
            orderCombinedDetail(this.orderId,this.orderMainId).then((res) => {
				this.$parent.showLoading = false;
                if (+res.code === 1) {
                    this.contactNumber = res.data.cellphone;
            		let passagers = res.data.orderDetatil;
					let passagersAll=[];
					let flightDetail={};
					flightDetail.flightTripType=res.data.flightTripType;
					flightDetail.depName=res.data.depName;
					flightDetail.departureTerminalCode=res.data.departureTerminalCode;
					flightDetail.arrName=res.data.arrName;
					flightDetail.arrivalTerminalCode=res.data.arrivalTerminalCode;
					flightDetail.seatClassName=res.data.seatClassName;
					flightDetail.depTime=switchDateFormate(res.data.depTime).split(' ')[0]+" "+switchDateFormate(res.data.depTime).split(' ')[2];
					flightDetail.orderId=res.data.orderId;
					flightDetail.orderMainId=res.data.orderMainId;
					flightDetail.carrierCode=res.data.carrierCode;
					flightDetail.departureCityCode=res.data.departureCityCode;
					flightDetail.departureCityName=res.data.departureCityName;
					flightDetail.arrivalCityName=res.data.arrivalCityName;
					flightDetail.arrivalCityCode=res.data.arrivalCityCode;
					flightDetail.contactNumber=this.contactNumber;
					
					this.flightDetail=flightDetail;
					this.departureAirportCode = res.data.departureCityCode;
            		this.arrivalAirportCode = res.data.arrivalCityCode;
            		// if(res.data.saleType=="CAofficial"){
						this.reasonData=[
							{'code': 2,name: '我要改变行程计划，我不想飞了'},
		                    {'code': 3,name: '填错名字，选错日期，选错航班'},
		                    {'code': 4,name: '其他'},
		                    {'code': 0,name: '航班变动或取消(需审核相关航班信息)'},
		                ]
					// }else{
					// 	this.reasonData=[
		            //         {'code': 0,name: '航班变动或取消(需审核相关航班信息)'},
		            //         {'code': 1,name: '因身体原因，无法乘机'},
		            //         {'code': 2,name: '我要改变行程计划，我不想飞了'},
		            //         {'code': 3,name: '填错名字，选错日期，选错航班'},
		            //         {'code': 4,name: '其他'},
		            //     ]
					// }
					if (this.changeBack == 'ct') {//改签
						for (var i = 0; i < passagers.length; i++) {
							if (passagers[i].isCanCTMT) {
								passagersAll.push(passagers[i]);
							}
						}
					} else if(this.changeBack == 'rt') {//主单退票
						for (var i = 0; i < passagers.length; i++) {
							if (passagers[i].isCanRTVT) {
								passagersAll.push(passagers[i]);
							}
						}
					}else if(this.changeBack == 'rtz') {//子单退票
						let iscmt=-1,cmt =res.data.ctmtOrderDetails;
						if(cmt.length>0){
							for(var i=0;i<cmt.length;i++){
								if(cmt[i].orderId==this.orderId){
									iscmt=i;
								}
							}
						}
						if(iscmt!=-1){
							let cmtDetatil=cmt[iscmt].ticketDetatil;
							for (var i = 0; i < cmtDetatil.length; i++) {
								if (cmtDetatil[i].isCanRTVT) {
									passagersAll.push(cmtDetatil[i]);
								}
							}
						}else{
							for (var i = 0; i < passagers.length; i++) {
								if (passagers[i].isCanRTVT) {
									passagersAll.push(passagers[i]);
								}
							}
						}

					}
					for (var i = 0; i < passagersAll.length; i++) {
						passagersAll[i].picked=false;
					}
					let pickedPassagersArr = JSON.parse(getStore('passengerIdTicketNo'));
					if (pickedPassagersArr && pickedPassagersArr.length > 0) {
						for (let i = 0; i < pickedPassagersArr.length; i++) {
							for (let j = 0; j < passagersAll.length; j++) {
								if (pickedPassagersArr[i] == passagersAll[j].ticketNo) {
									passagersAll[j].picked = true;
								}
							}
						}
					}else{
						this.pickedPassagers='';
					}
					this.passagers=passagersAll;
				}
				this.$nextTick(() => {
					let H=document.querySelectorAll('body')[0].clientHeight- document.querySelectorAll('.endorse-footer')[0].clientHeight - document.querySelectorAll('.header')[0].clientHeight - document.querySelectorAll('.backtochange')[0].clientHeight;
					this.ecHeight= H - 40 + 'px';
				});
            });
			// if (this.orTodate==true) {
			// 	let departDate = JSON.parse(getStore('departDate'));
			// 	this.endorseDate=departDate.year+"-"+addZero(departDate.month)+"-"+addZero(departDate.date);
			// }else{
				this.endorseDate='请选择您要改签的日期'
			// };
			this.changePhone=false;
			if(new Date().getHours()<9||new Date().getHours()>=20){
				this.changePhone=true;
			}
	    },
        computed:{
	        ...mapState([
	            'departDate',
	        ])
        }
    }
</script>
<style lang="scss" scoped>
    @import '../../style/mixin';
	.endorse{
		width: 100%;
	    height: 100%;
		position: relative;
		.bbb{
			color: #BBB !important;
		}
		.orderline {
		    display: block;
		    background: url('//m.lvmama.com/flight/image/orderline.png') 0 bottom repeat-x #fff;
		    background-size: auto 0.2rem;
		    margin: 0 3%;
		    width: 94%;
		    height: 1px !important;
		    padding: 0!important;
		    border-bottom: none!important;
		}
		>.endorse-container{
			width: 100%;
		    position: absolute;
		    left: 0;
		    // top: 0.94rem;
		    overflow-y: auto;
		    .endorse-item-container {
			    margin: 0 .2rem;
			    background: #fff;
			    border-radius: 3px;
			    margin-top: 0.2rem;
				.endorse-title {
				    width: 100%;
				    height: 0.84rem;
				    line-height: 0.84rem;
				    padding-left: 0.2rem;
				    color: #666;
					font-size: 0.24rem;
					position: relative;
					.ct{
						font-size: .3rem;
					}
					.one{
						color: #333;
						font-size: .28rem;
						font-family: PingFang-SC-Medium;
						font-weight: 600;
					}
					.two{
						color:#666;
						>span{
							font-size: .28rem;
						}
					}
				    span {
					    margin-left: 0.3rem;
					}
					.endorse-arrow {
					   @include ct();
					    right: .2rem;
					}
					.luckyselector {
					    color: #000000;
					    margin-left: 0;
					    width: 71%!important;
					    padding: 0 0.1rem;
					    height: 0.84rem;
					    line-height: 0.84rem;
					    border: 0px #ccc solid;
					    display: inline-block;
					    box-sizing: border-box;
					    font-size: 0.28rem;
					}
				}
				.passager-prompt{
					position: relative;
					padding-left: .2rem;
					margin-bottom: .1rem;
					>i{
						width: .3rem;
						height: .3rem;
						display: inline-block;
						background: url('//m.lvmama.com/flight/image/passagerPrompt.png') no-repeat;
						background-size: .24rem .24rem;
						vertical-align: top;
						margin-top: .05rem;
					}
					>p{
						font-size: .24rem;
						color: #666666;
						width: 90%;
						display: inline-block;
					}
				}
				.passager-wrap{
					li{
						width: 100%;
					    height: 1.14rem;
					    padding: 0.15rem 0;
						position: relative;
						padding-left: 0.2rem;
					    > span {
						    display: block;
						    float: left;
						    height: 100%;
						    >i{
						    	@include wh(0.4rem,0.4rem);
								@include center;
								display: block;
								background: url('//m.lvmama.com/flight/image/multiUnPicked.png') no-repeat center;
								background-size: .36rem .36rem;
						    }
						    >.picked {
							    background: url('//m.lvmama.com/flight/image/multiPicked.png') no-repeat center;
                        		background-size: .36rem .36rem;
							}				    
						}
						>.endorse-item-pick {
						    width: 10%;
						    text-align: center;
							position: absolute;
							right: 0;
							top: 0;
						}
						.endorse-item-info {
						    width: 70%;
						    color: #000;
						    >p:first-child {
							    font-size: 0.28rem;
							}
							>p:last-child {
								font-size: 0.26rem;
								color:#999;
								margin-top: .1rem;
							}
						}
						.endorse-item-type {
							width: 13%;
							text-align: center;
							border: 1px solid #5CA2F8;
							border-radius: 0.06rem;
							margin-right: 0.2rem;
							height: 0.8rem;
							>p:nth-child(1){
								background: #5CA2F8;
								color: #fff;
								font-size: 0.2rem;
								border-top-left-radius: initial;
								border-top-right-radius: initial;
							}
							>p:nth-child(2){
								color: #5CA2F8;
								margin-top: 6%;
							}
						}
						.hui_type{
							border:1px solid #FF8800;
							p:nth-child(1){
								background: #FF8800;
							}
							p:nth-child(2){
								color: #FF8800;
								margin-top: 6%;
							}
						}
					}
				}
				.endorse-remark-container {
				    width: 100%;
				    height: 2rem;
				    padding: 0 0.2rem;
				    .endorse-remark {
					    width: 85%;
					    border: none;
					    resize: none;
					    height: 78%;
					    font-size: 0.28rem;
					    overflow-y: hidden;
					    outline: none;
					    margin-top: 0.3rem;
					}
					.endorse-remark::input-placeholder{
						color: #BBB;
					}
					.endorse-remark::-webkit-input-placeholder{
						color: #BBB;
					}
					.endorse-remark::-moz-placeholder{
						color: #BBB;
					}
					.endorse-remark::-ms-placeholder{
						color: #BBB;
					}
					.endorse-remark::-o-placeholder{
						color: #BBB;
					}
				}
				.endorse-rule {
				    color: #333;
				    font-size: 0.28rem;
				    padding: 0.2rem;
				    >p{
				    	margin-top: 0.12rem;
				    }
				}
			}
			.attention {
			    padding-left: 0.3rem;
			    color: #a7a7a7;
			    font-size: 0.24rem;
			    margin-top: 0.2rem;
			}
			.childAttention {
			    padding-left: 0.3rem;
			    color: red;
			    font-size: 0.24rem;
			    margin-bottom: 0.2rem;
			}
		}
		.endorse-footer {
		    position: absolute;
		    left: 0;
		    bottom: 0;
		    width: 100%;
		    height: 1rem;
		    font-size: 0.34rem;
		    > a,>div {
			    display: block;
			    float: left;
			    text-align: center;
			    height: 1rem;
			    display: -webkit-box;
			    display: -moz-box;
			    display: -ms-flexbox;
			    display: -webkit-flex;
			    display: flex;
			    -webkit-box-pack: center;
			    -moz-justify-content: center;
			    -webkit-justify-content: center;
			    justify-content: center;
			    -webkit-box-align: center;
			    -moz-align-items: center;
			    -webkit-align-items: center;
			    align-items: center;
			    color: #fff;
			    .contact-service-icon {
				    display: inline-block;
				    width: 0.36rem;
				    height: 0.32rem;
				    background: url('//m.lvmama.com/flight/image/contact.png?v=1') no-repeat;
				    background-size: 0.36rem 0.32rem;
					top: .2rem;
     				@include cl();
				}
				.contact-service-span {
					@include cl();
					bottom: .1rem;
					color: #888;
					font-size: .24rem;
				}
			}
			.contact-service {
			    width: 20%;
			    background: #FFF;
				position: relative;
			}
			.submit-endorse {
			    width: 80%;
				background-image: linear-gradient(90deg,#FE686C ,#FD3C71);
			}
		}
		.matte {
		    width: 100%;
		    height: 100%;
		    background-color: rgba(0, 0, 0, 0.5);
		    position: fixed;
		    top: 0;
		    left: 0;
		    z-index: 8;
		    .small-pop {
			    position: absolute;
			    top: 50%;
			    left: 50%;
			    -webkit-transform: translate(-50%, -50%);
			    transform: translate(-50%, -50%);
			    width: 6rem;
			    height: 0.9rem;
			    line-height: 0.9rem;
			    color: #fff;
			    font-size: 0.28rem;
			    text-align: center;
			    border-radius: 4px;
			    z-index: 4;
			    background-color: rgba(0, 0, 0, .5);
			    padding: 0 0.1rem;
			}
			.submitDialog {
			    background-color: #fff;
			    width: 68%;
			    height: 25%;
			    position: absolute;
			    top: 50%;
			    left: 50%;
			    transform: translate(-50%, -50%);
			    -webkit-transform: translate(-50%, -50%);
			    border-radius: 8px;
			    .content {
				        text-align: center;
					    height: 70%;
					    padding: .4rem .4rem .8rem;
				    p {
					    font-size: 0.36rem;
					    padding-bottom: 0.3rem;
					    color: #000;
					}
				}
				.backButton {
				    font-size: 0.32rem;
				    color: #FF8800;
				    position: absolute;
				    bottom: 0;
				    width: 100%;
				    height: 0.8rem;
				    text-align: center;
				    line-height: .8rem;
				}
			}
			.endorseDialog {
			    height: auto !important;
			    .line1 {
				    width: 100%;
				    height: 0.01rem;
					// border-top: 1px solid #ccc;
					@include bottomline();
				    position: absolute;
				    bottom: 0.74rem;
				    left: 0;
				}
			}
	   }
	    .swiper-container-detail {
			width: 100%;
			height: 100%;
			position: absolute;
			top: 0;
			z-index: 999;
			font-size: .3rem;
			.rulesMask{
				@include wh(100%,100%);
				background-color: rgba(0, 0, 0, 0.5);
				position: fixed;
				top: 0;
				left: 0;
				z-index: 20;
			}
			.matteDetailValue{
				@include wh(100%,10.68rem);
				bottom: 0;
				position: absolute;
				overflow-y: scroll;
				left: 0;
				z-index: 20;
				background-color: #fff;
				transition: all 0.2s ease-in 0s;
				border-radius: 5px 5px 0 0;
				.title{
					@include sc(.32rem,#333);
					margin: .38rem 0;
					text-align: center;
				}
				.container{
					height: 9.5rem;
					overflow-y: auto;
					position: relative;
					padding: 0 .4rem 2.56rem;
					text-align: left;
					>p{
					@include sc(.24rem,#666);
					display: initial;
					}
				}
				.buttom{
					height: 2.56rem;
					width: 100%;
					position: absolute;
					bottom: 0;
					background: linear-gradient(-180deg,rgba(255,255,255,0) 0,#FFF 50%);
					>span{
					bottom: .28rem;
					text-align: center;
					position: absolute;
					left: 2.5%;
					line-height: .88rem;
					background: linear-gradient(90deg,#FE686C 0,#FD3C71 100%);
					border-radius: 100px;
					@include sc(.36rem,#fff);
					@include wh(95%,.88rem);
					}
				}
			}
		}
	}
</style>