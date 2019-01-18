<template>
	<div class="destine-wrap">
		<head-top :depart="depart" :dest="dest" :departCode="departCode" :destCode="destCode" :goPage="goPage" :isShowTopMsg="isShowTopMsg" :activityTitle="activityTitle"></head-top>
		<div class="destine-container" id="destine" v-if="flightInfoMsg">
			<div class="destine-top" :class="{'destine_top':noticeArr.length>0 && chosenBackTrip!=true}">
				<div class="destine-infor">
					<span class="voyage" v-if="!flightInfoLength&&!isDouble"></span>
					<span class="voyageform" v-if="chosenGoTrip&&isDouble"></span>
					<span class="voyagedesc" v-if="chosenBackTrip&&isDouble"></span>
					<span>{{flightInfoMsg.departureTime | strDate}} {{weekInfor | weekFilter}}</span>
				</div>
				<div class="top-container clearfix">
					<div class="start-place">
						<!-- <p>{{flightInfoMsg.departureTime | strDate}}</p> -->
						<p class="time">{{flightInfoMsg.departureTime | strTime}}</p>
						<p>{{flightInfoMsg.departureAirport.flightName}}{{flightInfoMsg.departureAirport.code}}</p>
					</div>
					<div class="middle">
						<p class="long-time">约{{flytimeHour}}时{{flytimeMinute}}分</p>
						<p class="jt"></p>
						<p class="across" v-if="flightInfoMsg.stopCount && flightInfoMsg.stopCount!=0">经停</p>
					</div>
					<div class="end-place"> 
						<!-- <p>{{flightInfoMsg.arrivalTime | strDate}}</p> -->
						<p class="time">{{flightInfoMsg.arrivalTime | strTime}}<i class="d30" v-if="flightInfoMsg.dateTag">+1</i></p>
						<p>{{flightInfoMsg.arrivalAirport.flightName}}{{flightInfoMsg.arrivalAirport.code}}</p>
					</div>
				</div>
				<div class="flex-xy">
					<p class="info-msg">
						<span class="air-icon"><airlines-logo :logoKind="flightInfoMsg.carrierCode"></airlines-logo></span>
						<span class="flight-compony">{{flightInfoMsg.carrierName}}{{flightInfoMsg.flightNo}}</span>
						<span class="flight-compony">{{flightInfoMsg.mealType | mealType}}</span>
						<span class="small_size">{{flightInfoMsg.code}}
						<i v-if="flightInfoMsg.airplaneType!=null&&flightInfoMsg.airplaneType!=''">({{flightInfoMsg.airplaneType}})</i>  
						</span>
						<span class="flight-msg" @click="flightMessage"></span>
					</p>
					<p class="xy_flex share-msg" v-if="flightInfoMsg.isCodeShare">
						<span class="share-icon"></span>
						<span class="share-air-logo"><airlines-logo :logoKind="flightInfoMsg.shareCarrierCode"></airlines-logo></span>
						<span class="share">实际乘坐：<i>{{flightInfoMsg.shareCarrierName}}{{flightInfoMsg.shareFlightNo}}</i></span>
					</p>
				</div>
				<div class="xy_flex luggage" v-if="flightInfoMsg.carrierCode=='9C'">
					<p><i></i>部分价格无免费托运行李，详情请查看行李额说明</p>
				</div>
				<div class="xy_flex share-flight" v-if="flightInfoMsg.isCodeShare">
					<p>本航班为共享航班,请按实际乘坐的航空公司柜台办理值机。</p>
				</div>
				<div class="notice_container" v-if="noticeArr.length>0 && chosenBackTrip!=true">
					<div class="orderline"></div>
	                <notice-swiper :noticeArr="noticeArr"></notice-swiper>
	            </div>
			</div>
			<div class="destine-msg">
				<div class="seat" v-for="(seat,index) in flightInfoMsg.seats" :key="index" v-if="seat.vstLags!='1'">
					<div :class="{'one':seat.tagPackage!=null}">
						<div class="seat-price" :class="{'one':seat.tagPackage!=null}">
							<p class="p-price" v-if="seat.tagPackage!=null&&seat.tagPackage[0].vstPrice=='true'">
								<span class="yuan">¥</span>
								<span class="price" v-if="knockOrReduced">{{+seat.parPrice-(-seat.tagPackage[0].tagPrice)}}</span>
								<span class="price" v-if="!knockOrReduced">{{+seat.parPrice-(-seat.tagPackage[0].tagPrice)-(+seat.promotion || 0)}}</span>
							</p>
							<p class="p-price" v-else>
								<span class="yuan">¥</span>
								<span class="price" v-if="knockOrReduced">{{+seat.parPrice}}</span>
								<span class="price" v-if="!knockOrReduced">{{+seat.parPrice-(+seat.promotion || 0)}}</span>
							</p>
							<p class="seat-label" v-if="seat.official">
								<span class="air-flag" ><airlines-flag :flagKind="flightInfoMsg.carrierCode"></airlines-flag></span>
							</p>
						</div>
						<i class="passerLine" v-if="seat.tagPackage!=null&&seat.tagPackage[0].vstPrice!='true'"></i>
						<i class="passerLine1" v-if="seat.tagPackage!=null&&seat.tagPackage[0].vstPrice=='true'"></i>
						<div class="channel" v-if="seat.tagPackage!=null&&seat.tagPackage[0].vstPrice!='true'">
							<div :class="{'two':i>0}"  v-for="(tagPackage,i) in seat.tagPackage" :key="i">
								<p class="icon">{{tagPackage.name}}</p>
								<p class="title" @click="clickPackage(tagPackage)"><span>{{tagPackage.tagContent}}</span><i></i></p>
								<div class="seat-button"  @click="orderedClick(seat,index,tagPackage)">
									预订
								</div>
							</div>
							<div class="ordinary">
								<p>普通预订</p>
								<div class="seat-button" @click="orderedClick(seat,index)">
									预订
								</div>
							</div>
						</div>
						<div class="channel channel1" v-else-if="seat.tagPackage!=null&&seat.tagPackage[0].vstPrice=='true'">
							<div class="ordinary1">
								<p class="icon">
									{{seat.tagPackage[0].name}}
								</p>
								<span class="title" @click="clickPackage(seat.tagPackage[0])"><span>{{seat.tagPackage[0].tagContent}}</span><i></i></span>
								
								<div class="seat-button"  @click="orderedClick(seat,index,seat.tagPackage[0])">
									预订
								</div>
							</div>
						</div>
						<div class="seat-button" v-else @click="orderedClick(seat,index)">
							{{!isDouble ? '预订' : (chosenGoTrip&&!chosenBackTrip) ? '选去程' : '预订'}}
						</div>
					</div>
					<div class="flight_desc">
						<p class="p-desc">
							<span class="p-seat" v-if="seat.tagPackage!=null&&seat.tagPackage[0].vstPrice=='true'">{{seat.desc}}</span>
							<span class="p-seat" v-else-if="seat.name.indexOf('0.0折')>=0">{{seat.name.substr(0,seat.name.indexOf('0.0折'))}}</span>
							<span class="p-seat" v-else>{{seat.name}}</span>
							<span class="endorse" @click="endorseClick(seat,index)"><i></i>退改行李说明<em></em></span>
							<span class="icon">
								<span class="subtraction" v-for="(item,index) in seat.salesPromotion" :key="index" v-if="index<2">{{item | activityType}}</span>
								<span class="subtraction" v-if="seat.promotion > 0&& knockOrReduced" v-show="seat.salesPromotion!=null && seat.salesPromotion.length <2">立减{{seat.promotion}}元</span>
								<span class="subtraction" v-if="seat.promotion > 0&& !knockOrReduced" v-show="seat.salesPromotion!=null && seat.salesPromotion.length <2">已减{{seat.promotion}}元</span>
								
								<span class="subtraction yu" v-if="seat.inventoryCount<9">剩{{seat.inventoryCount}}张</span>
							</span>
						</p>
					</div>
					<!-- <div class="seat-label" v-if="seat.official">
						<span class="air-flag"><airlines-flag :flagKind="flightInfoMsg.carrierCode"></airlines-flag></span>
					</div> -->
				</div>
				<div class="add_tranvel" @click="toCarTrans">
					<div class="left"></div>
					<div class="right">
						<p>没找到想要的？</p>
						<span>填写出行需求单，由客服为您提供定制服务</span>
					</div>
					<i></i>
				</div>
			</div>
		</div>

		<!-- 弹框 -->
		<div class="matte" v-if="isShowMsg" @click="closePop($event)">
			<div class="message-wrap">
				<div class="messageInfo">
					<div class="title">机型信息</div>
					<div class="content">
						<table>
							<tr><td>机型</td><td>{{flightInfoMsg.name.substr(0,2)}}{{flightInfoMsg.code}}</td></tr>
							<tr><td>类型</td><td>{{flightInfoMsg.airplaneType}}</td></tr>
							<tr><td>最少座位数</td><td>{{flightInfoMsg.minSeats}}</td></tr>
							<tr><td>最多座位数</td><td>{{flightInfoMsg.maxSeats}}</td></tr>
						</table>
						<!-- <p class="con">
							<span class="type">机型</span>
							<span class="val">{{flightInfoMsg.name.substr(0,2)}}{{flightInfoMsg.code}}</span>
						</p>
						<p class="con">
							<span class="type">类型</span>
							<span class="val">{{flightInfoMsg.airplaneType}}</span>
						</p>
						<p class="con">
							<span class="type">最少座位数</span>
							<span class="val">{{flightInfoMsg.minSeats}}</span>
						</p>
						<p class="con">
							<span class="type">最多座位数</span>
							<span class="val">{{flightInfoMsg.maxSeats}}</span>
						</p> -->
					</div>
				</div>
				<div class="close" @click="closePop($event)">
					<span>确定</span>
					<!-- <i class="close-msg ti"></i>
					<em class="close-msg tem"></em> -->
				</div>
			</div>
		</div>
		<!--券包-->
		<div class="matte" v-if="showPackage" @click="showPackage=false">
			<div class="package-wrap">
				<div class="package">
					<div class="titleBG">{{showPackageSetail.name}}</div>
					<div class="packageConten">
						<p :class="{'one':showPackageSetail.desc.length==1}" v-for="(item,index) in showPackageSetail.desc" :key="index"><i></i><span>{{item}}</span></p>
					</div>
					<div class="packageDetail">
						<p v-html="showPackageSetail.serviceContent"></p>
						<p v-html="showPackageSetail.tgqRule"></p>
					</div>
				</div>
				<div class="close" @click="showPackage=false">
					<span>确定</span>
				</div>
			</div>
		</div>
		<!-- 退改签 -->
		<change-back :ticketRuleDetailListdesc="ticketRuleDetailListdesc" :ticketRuleDetailListdet="ticketRuleDetailListdet" v-if="changeBackClose" :changeBackClose="changeBackClose" :knockOrReduced="knockOrReduced" :goLuggageDesc="goLuggageDesc" :carrierCode="flightInfoMsg.carrierCode" :flightSeat="flightSeat" @onChangeBack="onChangeBack" @onSubmit="onSubmitOrder"></change-back>

		<!-- <luggage-desc :goLuggageDesc="goLuggageDesc" :backLuggageDesc="backLuggageDesc" :flightInfoLength="flightInfoLength" :luggageDescClose="luggageDescClose" @onClickLuggage="onClickLuggage"></luggage-desc> -->

		<alert-tip v-if="showMessage" :tipContent="message" :leftButton="leftButton"></alert-tip>
		<noticeswiper-detail v-if="noticeDetail!=''"></noticeswiper-detail>
	</div>
</template>

<script>
	import { lQuery } from '../../plugins/lQuery'
	import { mapActions,mapState } from 'vuex'
	import { getflightInfo,getNotice,toBooking,getLvUser,getLvUserByCookie,getFlightTicketRule,getCouponSwitch } from '../../service/getData'
	import airlinesLogo from '../../components/common/airlinesLogo'
	import airlinesFlag from '../../components/common/airlinesFlag'
	import headTop from '../../components/header/head'
	import noticeSwiper from '../../components/common/notice-swiper-component'
	import changeBack from '../../components/common/changeBackDest'
	// import luggageDesc from '../../components/common/luggageDesc'
	import alertTip from '../../components/common/alertTip'
	import { addZero,formatIOSDate,weekFormat,getTimes,setStore,getStore,removeStore,getBookingSource,isClient,getLvSessionId,jumpLogin,getStatisticsType,getElementTag,getDataWeek,getNoticeSource } from '../../config/mUtils'
	import noticeswiperDetail from '../../components/common/notice-swiper-detail'

	export default{
		data(){
			return {
				goPage:"toFlightList",
				noticeArr:[],
				depart:'',
				dest:'',
				departCode:'',
				destCode:'',
				finish:false,
				flightInfoMsg:'',
				flytimeHour:'',
				flytimeMinute:'',
				noticeAjaxObj:'',
				deptDate:'',
				destDate:'',
				scrollLocation:'',
				audltSalePrice:'',
				childrenSalePrice:'',
				inventoryCount:'',
				promsList:'',
				promotion:0,
				// chosenBackTrip:false,
				isShowMsg:false,
				ticketRuleDetailListdesc:'',
				ticketRuleDetailListdet:'',
				changeBackClose:false,
				goLuggageDesc:'',//去程信息
	            backLuggageDesc:'',//返程信息
	            flightInfoLength:false,//是否往返 true 代表往返 false 代表单程
	            luggageDescClose:false,
				rightMenu: '反馈意见',
            	headerGoPath: `/${this.$parent.baseUrlPath}/feedBack`,
            	message:'',//弹框内容
            	showMessage:false,//是否展示弹框
            	leftButton:'',//弹框按钮名称
            	flightSeat:null,//选中的舱位明细
            	isShowTopMsg:false,//舱位列表是否展示滑动头部
				activityTitle:'',//滑动头部信息
				weekInfor:'',
				showPackage:false,
				showPackageSetail:'',
			}
		},

		components:{
			headTop,
			noticeSwiper, 
			airlinesLogo,
			airlinesFlag,
			changeBack,
			// luggageDesc,
			noticeswiperDetail,
			alertTip,
		},

		props:[],

		methods:{
			...mapActions([
				'initData'
			]),
			getInfo(from,to,flightNo,departureDate,preLowestSalePrice,routeType,bookingSource,flightTripTs,equipmentNo){
				let infoMsg,that=this;
				this.$parent.showLoading = true;
				getflightInfo(from,to,flightNo,departureDate,preLowestSalePrice,routeType,bookingSource,flightTripTs,equipmentNo).then((res) => {
						this.$parent.showLoading = false;
						if (res.code == 1 ) {
							infoMsg = res.data;
							//获取通知参数
							getNotice(getNoticeSource(),'SEAT_LIST_PAGE',String(new Date(`${this.departDate.year}/${addZero(this.departDate.month)}/${addZero(this.departDate.date)}`).getTime()),this.departureCity.code,this.arrivalCity.code,infoMsg.carrierCode).then((res) => {
							if (+res.code === 1) {
								this.noticeArr = res.data;
							}
							});
							for (let i = 0; i < infoMsg.seats.length; i++) {
								let salesPromotion = [];
								let tagDESC=[];
								let promotionList=[];
								if(infoMsg.seats[i].tagMains!=null&&infoMsg.seats[i].tagMains.length>0){
									infoMsg.seats[i].tagPackage=[];
									let vstLags=false;
									for(let k=0;k<infoMsg.seats[i].tagMains.length;k++){
										if(infoMsg.seats[i].tagMains[k].type=="BUSINESS"){
											if(infoMsg.seats[i].tagMains[k].businessType=="INSURANCE"){
												infoMsg.seats[i].tagMains[k].tagPrice = infoMsg.seats[i].tagMains[k].insuranceInfoVo.insurancePrice;
											}else if(infoMsg.seats[i].tagMains[k].businessType=="TICKET"){
												infoMsg.seats[i].tagMains[k].tagPrice = infoMsg.seats[i].tagMains[k].clientUserVasCouponVo.saleChannelPrices[0].channelSalePrice;
											}
											if(infoMsg.seats[i].tagMains[k].vstPrice=='true'){
												vstLags=true;
											}
											infoMsg.seats[i].tagPackage.push(infoMsg.seats[i].tagMains[k]);
										}else if(infoMsg.seats[i].tagMains[k].type=="DESC"){
											tagDESC.push(infoMsg.seats[i].tagMains[k].name);
										}else if(infoMsg.seats[i].tagMains[k].type=="PROMOTION"){
											// if(infoMsg.seats[i].tagMains[k].tagContent.split("|")[0]){
												promotionList.push(infoMsg.seats[i].tagMains[k].tagContent);
											// }
										}
									}
									if(infoMsg.seats[i].tagPackage.length==0 || (this.isDouble && this.chosenGoTrip&&!this.chosenBackTrip)){
										infoMsg.seats[i].tagPackage=null;
									}
									if((this.isDouble|| this.businessTravel)&&vstLags){
										infoMsg.seats[i].tagPackage=null;
										infoMsg.seats[i].vstLags=1;
									}
								}
								if (infoMsg.seats[i].special == true) {
									salesPromotion.push("TEHUI");
								}
								if(promotionList.length>0){
									salesPromotion=salesPromotion.concat(promotionList);
								}
								// for (let p = 0; p < that.promotionList.length; p++) {
								// 	if(that.promotionList[p].activityName.indexOf("|")>0){
								// 		if(that.promotionList[p].allAirlineValid == false&&that.promotionList[p].activityRuleDto.length>0){
								// 			if(JSON.stringify(that.promotionList[p].activityRuleDto).indexOf(infoMsg.carrierName)!=-1){
								// 				let flightNo="";
								// 				for(let j=0;j<that.promotionList[p].activityRuleDto.length;j++){
								// 					if(that.promotionList[p].activityRuleDto[j].flightNo!=null&&that.promotionList[p].activityRuleDto[j].flightNo!=''){
								// 						flightNo=flightNo+that.promotionList[p].activityRuleDto[j].flightNo;
								// 					}else{
								// 						flightNo="";
								// 						continue;
								// 					}
								// 				}
								// 				if(flightNo==""){
								// 					if(that.promotionList[p].suppSaleTypes.indexOf(infoMsg.seats[i].saleType) != -1){
								// 						salesPromotion.push(that.promotionList[p].activityName.split("|")[0]);
								// 					}	
								// 				}else{
								// 					if(flightNo.indexOf(infoMsg.flightNo)!=-1){
								// 						if(that.promotionList[p].suppSaleTypes.indexOf(infoMsg.seats[i].saleType) != -1){
								// 							salesPromotion.push(that.promotionList[p].activityName.split("|")[0]);
								// 						}
								// 					}
								// 				}
								// 			}

								// 		}else{
								// 			if(that.promotionList[p].suppSaleTypes.indexOf(infoMsg.seats[i].saleType) != -1){
								// 				salesPromotion.push(that.promotionList[p].activityName.split("|")[0]);
								// 			}
								// 		}
								// 	}
								// }
								if(tagDESC.length>0){
									salesPromotion=salesPromotion.concat(tagDESC);
								}
								if (salesPromotion.length > 0) {
									infoMsg.seats[i].salesPromotion = salesPromotion;
								}
							}
							if(this.flightInformation.checkType!=null){
								for (let i = infoMsg.seats.length-1; i >=0; i--) {
									if(this.flightInformation.checkType.indexOf("/")>-1){
										let selects=this.flightInformation.checkType.split("/");
										if(infoMsg.seats[i].name.indexOf(selects[0])==-1&&infoMsg.seats[i].name.indexOf(selects[1])==-1){
											infoMsg.seats.splice(i,1);
										}
									}else{
										if(infoMsg.seats[i].name.indexOf(this.flightInformation.checkType)==-1){
											infoMsg.seats.splice(i,1);
										}
									}
									
								}
							}
								
							this.flightInfoMsg = infoMsg;
							this.weekInfor = new Date(formatIOSDate(this.flightInfoMsg.departureTime)).getDay();
							this.flytimeHour = parseInt(this.flightInfoMsg.flytime / 60);
							this.flytimeMinute = this.flightInfoMsg.flytime % 60;
							setStore("bookinguuid",infoMsg.uuid);
							// 这里面获取实时
					        this.$nextTick(() => {
					        	this.$parent.showLoading = false;
					        	if(this.flightInfoMsg) {
					        		lQuery('#destine')[0].addEventListener('scroll',this.watchScrollLocation);
					        	}
					        });

						}
					},()=>{
						this.$parent.showLoading = false;
					});
			},

			orderedClick(seat,indexNum,tagPackage){
				removeStore("flightClick");
				removeStore("packageInfo",this);
				let tempKangLvobj = {
					key: "isKangLvUser",
					val: null
				};
				try {
					this.initData(tempKangLvobj);
				} catch (e) {}
				if(getStore('selectuserid')!="" && getStore('selectuserid')!=null){
                    getElementTag("航班仓位_已登录用户","航班仓位");
                }else{
                    getElementTag("航班仓位_游客用户","航班仓位");
                }
                if(getStore("goFlight")=="share"){
                    getElementTag("机票_订单填写页_航班（特价机票城市列表）","舱位列表");
                }
                getElementTag("舱位列表_("+indexNum+")","机票舱位列表");
				let that=this;
				getCouponSwitch().then((data)=>{
					setStore("getCouponSwitch",data.data);
				})
				if (this.isDouble) {
					//往返
					if (this.chosenGoTrip&&!this.chosenBackTrip) {
						let bookFlightStr={};
						bookFlightStr.inventoryCount=seat.inventoryCount;
						bookFlightStr.promsList=seat.promsList;
						bookFlightStr.flytimeHour=this.flytimeHour;
						bookFlightStr.flytimeMinute=this.flytimeMinute;
						bookFlightStr.crossDay=!(this.flightInfoMsg.departureTime.split(' ')[0] === this.flightInfoMsg.arrivalTime.split(' ')[0]);
						bookFlightStr.mealType=this.flightInfoMsg.mealType;
						if(this.knockOrReduced==true){
							let obj ={
	                        	key:'selectSalesPrice',
	                        	val: seat.parPrice
		                        };
	                        try{
								this.initData(obj);
							}catch(e){}
						}else{
							let obj ={
	                        	key:'selectSalesPrice',
	                        	val: +seat.parPrice-(+seat.promotion || 0)
	                        };
                        	try{
								this.initData(obj);
							}catch(e){}
						}

                        let orderRequest = this.saveRequest('go',this.flightInfoMsg,seat);
                        let headInfoStr = this.saveHeadInfo();

                        if(this.knockOrReduced==true){
                        	setStore('forJudgeRoundTripSpecialPrice_go',JSON.stringify(orderRequest.parPrice));
							
						}else{
							setStore('forJudgeRoundTripSpecialPrice_go',JSON.stringify(orderRequest.parPrice-seat.promotion));
						}
                        

                        setStore('flightInfo_go',JSON.stringify(bookFlightStr));
                        setStore('flight_headInfo_go',JSON.stringify(headInfoStr));
                        setStore('orderBookingDetailRequests_go',JSON.stringify(orderRequest));

                        // this.chosenBackTrip = true;
                        let obj ={
                        	key:'chosenBackTrip',
                        	val: true
                        };
                        try{
							this.initData(obj);
						}catch(e){}
                        setStore("sureBack",true);
						// this.$router.push("/vflight/flightList/"+this.arrivalCity.code+'/'+this.departureCity.code);
						this.$router.push(this.arrivalCity.code+'-'+this.departureCity.code);
					}else if (this.chosenGoTrip&&
						this.chosenBackTrip){
						if(tagPackage!=null){
							let tag={};
							tag.tagdesc=tagPackage.tagContent;
							tag.businessType=tagPackage.businessType;
							tag.vstPrice=tagPackage.vstPrice;
							tag.tagPrice=tagPackage.tagPrice;
							if(tagPackage.businessType=="TICKET"){
								tag.id=tagPackage.clientUserVasCouponVo.id;
							}else if(tagPackage.businessType=="INSURANCE"){
								tag.id=tagPackage.insuranceInfoVo.insuranceClass.id;
								tag.insuranceTypeName=tagPackage.insuranceInfoVo.insuranceTypeName;
							}
							if(tag.vstPrice=='true'){
								removeStore('worthCoupons',this);
							}
							let packageInfo = {
								key: "packageInfo",
								val: tag
							};
							try {
								this.initData(packageInfo);
							} catch (e) {}
						}
						let infoArray=[],headInfoArry=[],orderRequestParam=[];
						let orderRequest=this.saveRequest("back",this.flightInfoMsg,seat),
							headInfo=this.saveHeadInfo();
						headInfoArry.push(JSON.parse(getStore('flight_headInfo_go')));
                        headInfoArry.push(headInfo);
						orderRequestParam.push(JSON.parse(getStore('orderBookingDetailRequests_go')));
                        orderRequestParam.push(orderRequest);
						
						this.inventoryCount=seat.inventoryCount;
						this.promsList=seat.promsList;

						if(this.knockOrReduced==true){
                        	setStore('forJudgeRoundTripSpecialPrice',Number(getStore("forJudgeRoundTripSpecialPrice_go"))+Number(orderRequest.parPrice));
						}else{
							setStore('forJudgeRoundTripSpecialPrice',Number(getStore("forJudgeRoundTripSpecialPrice_go"))+Number(orderRequest.parPrice-seat.promotion));
						}
						
						let uuid=getStore('bookinguuid')!=null && getStore('bookinguuid')!="undefined"&&getStore('bookinguuid')!=''?getStore('bookinguuid'):"";
						that.$parent.showLoading = true;
						that.$parent.jumpLoading = true;
						toBooking(orderRequestParam.length == 2 ? "RT" : "OW",orderRequestParam,getBookingSource(),getStore('selectuserid'),getStore('selectid'),getStore('selectusername'),uuid,getStore('equipmentNo')||'').then((data) => {
							that.$parent.showLoading = false;
							that.$parent.jumpLoading = false;
							setStore('formTime',new Date().getTime());
				          if (+data.code === 1) {
				          	if(that.knockOrReduced==true){
				          		that.audltSalePrice = JSON.parse(data.data)[0].seats[0].parPrice;
				          	}else{
				          		that.audltSalePrice=(+JSON.parse(data.data)[0].seats[0].parPrice)-(+JSON.parse(data.data)[0].seats[0].promotion);
				          	}
				          	var chajia=that.audltSalePrice - JSON.parse(getStore("flightInfo_go")).audltSalePrice;
				            if(chajia>10 || chajia<-10){
				            	setStore("chajia",true);
				            }
				            if(JSON.parse(data.data)[0].seats.length>1){
                                that.childrenSalePrice = (+JSON.parse(data.data)[0].seats[1].salesPrice);
                            }else{
                                that.childrenSalePrice = 0;
                            }
                            that.promotion=JSON.parse(data.data)[0].seats[0].promotion;
	                        let bookFlightStrGo = that.saveBookInfo(JSON.parse(data.data)[0],"go");

	                        
	                        if(that.knockOrReduced==true){
				          		that.audltSalePrice = JSON.parse(data.data)[1].seats[0].parPrice;
	                        	var chajia=that.audltSalePrice - (seat.parPrice);
				          	}else{
				          		that.audltSalePrice=(+JSON.parse(data.data)[1].seats[0].parPrice)-(+JSON.parse(data.data)[1].seats[0].promotion);
				          		var chajia=that.audltSalePrice - (seat.parPrice - seat.promotion);
			          		}
			          		if(chajia>10 || chajia<-10){
				            	setStore("chajia",true);
				            }
				            if(JSON.parse(data.data)[1].seats.length>1){
                                that.childrenSalePrice = (+JSON.parse(data.data)[1].seats[1].salesPrice);
                            }else{
                                that.childrenSalePrice = 0;
                            }
                            that.promotion=(+JSON.parse(data.data)[1].seats[0].promotion);
	                        let bookFlightStrBack = that.saveBookInfo(JSON.parse(data.data)[1],"back");

				            infoArray.push(bookFlightStrGo);
	                        infoArray.push(bookFlightStrBack);
				            setStore("flightInfo",infoArray);  
				            setStore('flight_headInfo',headInfoArry);  
				            let toBookingRequestParam = that.saveToBookingRequest(JSON.parse(data.data));
				            setStore("orderBookingDetailRequests",toBookingRequestParam);
				            if(isClient()==1){
								that.login_destine();
				            }else{
								that.web_login_destine();
				            }
				            // that.$router.push("/flight/orderForm");
				          }else{
				          	//tobooking失败
				          	getElementTag("舱位列表_("+indexNum+")_error","机票舱位列表");
				          	that.showAlert("该舱位已售完，在为您获取新的舱位信息列表");
				          	that.getInfoNew();
				          }
				        },()=>{
				        	getElementTag("舱位列表_("+indexNum+")_error","机票舱位列表");
				          	that.showAlert("请求超时");
				          	that.getInfoNew();
				        });
							
					}
				}else{
					if(tagPackage!=null){
						let tag={};
						tag.tagdesc=tagPackage.tagContent;
						tag.businessType=tagPackage.businessType;
						tag.vstPrice=tagPackage.vstPrice;
						tag.tagPrice=tagPackage.tagPrice;
						if(tagPackage.businessType=="TICKET"){
							tag.id=tagPackage.clientUserVasCouponVo.id;
						}else if(tagPackage.businessType=="INSURANCE"){
							tag.id=tagPackage.insuranceInfoVo.insuranceClass.id;
							tag.insuranceTypeName=tagPackage.insuranceInfoVo.insuranceTypeName;
						}
						if(tag.vstPrice=='true'){
							removeStore('worthCoupons',this);
						}
						let packageInfo = {
							key: "packageInfo",
							val: tag
						};
						try {
							this.initData(packageInfo);
						} catch (e) {}
					}
					//单程
					let infoArray=[],headInfoArry=[],orderRequestParam=[];
					let orderRequest=this.saveRequest("go",this.flightInfoMsg,seat),
						headInfo=this.saveHeadInfo();
					headInfoArry[0] = headInfo;
					orderRequestParam[0] = orderRequest;
					setStore("flight_headInfo",headInfoArry);
					
					this.inventoryCount=seat.inventoryCount;
					this.promsList=seat.promsList;
					//获取通知参数
					let uuid=getStore('bookinguuid')!=null && getStore('bookinguuid')!="undefined"&&getStore('bookinguuid')!=''?getStore('bookinguuid'):"";
					that.$parent.showLoading = true;
					that.$parent.jumpLoading = true;
			        toBooking(orderRequestParam.length == 2 ? "RT" : "OW",orderRequestParam,getBookingSource(),getStore('selectuserid'),getStore('selectid'),getStore('selectusername'),uuid,getStore('equipmentNo')||'').then((data) => {
			        	setStore('formTime',new Date().getTime());
			        	that.$parent.showLoading = false;
			        	that.$parent.jumpLoading = false;
			        	if (+data.code === 1) {
							
				            if(that.knockOrReduced==true){
				          		that.audltSalePrice = JSON.parse(data.data)[0].seats[0].parPrice;
	                        	var chajia=that.audltSalePrice - (seat.parPrice);
				          	}else{
				          		that.audltSalePrice=(+JSON.parse(data.data)[0].seats[0].parPrice)-(+JSON.parse(data.data)[0].seats[0].promotion);
				          		var chajia=that.audltSalePrice - (seat.parPrice - seat.promotion);
			          		}
				          	if(chajia>10 || chajia<-10){
				            	setStore("chajia",true);
				            }
			             	if(JSON.parse(data.data)[0].seats.length>1){
	                            that.childrenSalePrice = (+JSON.parse(data.data)[0].seats[1].salesPrice);
	                        }else{
	                            that.childrenSalePrice = 0;
	                        }
							that.promotion=(+JSON.parse(data.data)[0].seats[0].promotion);
							let info=JSON.parse(data.data)[0];
							if(tagPackage!=null && tagPackage.vstPrice=='true'){
								info.seats[0].flightReimburseType = 'NO_REIMBURSE';
							}
	                        let bookFlightStr = that.saveBookInfo(info);
				            infoArray[0]=bookFlightStr;
				            setStore("flightInfo",infoArray);    
				            let toBookingRequestParam = that.saveToBookingRequest(JSON.parse(data.data));
				            setStore("orderBookingDetailRequests",toBookingRequestParam);
				            if(isClient()==1){
								that.login_destine();
				            }else{
								that.web_login_destine();
				            }
				            // that.$router.push("/flight/orderForm");
			          }else{
			          	//tobooking失败
			          	getElementTag("舱位列表_("+indexNum+")_error","机票舱位列表");
			          	that.showAlert("该舱位已售完，在为您获取新的舱位信息列表");
			          	that.getInfoNew();
			          }
			        },()=>{
			        	getElementTag("舱位列表_("+indexNum+")_error","机票舱位列表");
			          	that.showAlert("请求超时");
			          	that.getInfoNew();
			        });

					
				}

			},
			//弹框
			showAlert(val){
				let that=this;
				that.message=val;
	          	that.showMessage=true;
	          	setTimeout(function(){
	          		that.showMessage=false;
	          	},2000);
			},
			login_destine(){
				this.$parent.showLoading = true;
				this.$parent.jumpLoading = true;
				getLvSessionId().then((res) => {
					if(res==null || res==undefined || res==""){
						this.$parent.showLoading = false;
						this.$parent.jumpLoading = false;
						jumpLogin();
						removeStore("selectuserid",this);
                        removeStore("selectusername",this);
                        removeStore("selectid",this);
                        return;
					}
					getLvUser(res).then((data) => {
						this.$parent.showLoading = false;
						this.$parent.jumpLoading = false;
			            let userid = data.data.userId;
	                    let username = data.data.userName;
	                    let userNo = data.data.id;
	                    if(userid!='' && userid!=null){
	                        setStore("selectuserid",userid);
	                        setStore("selectusername",username);
	                        setStore("selectid",userNo);
	                        this.$router.push(`/${this.$parent.baseUrlPath}/orderForm`);
	                    }else{
	                        removeStore("selectuserid",this);
	                        removeStore("selectusername",this);
	                        removeStore("selectid",this);
	                        jumpLogin();
	                    }
			        },()=>{
						this.$parent.showLoading = false;
						this.$parent.jumpLoading = false;
					});
				})
				
			},
			web_login_destine(){
				getLvUserByCookie().then((data) => {
		            let userid = data.data.userId;
                    let username = data.data.userName;
                    let userNo = data.data.id;
                    if(userid!='' && userid!=null){
                        setStore("selectuserid",userid);
                        setStore("selectusername",username);
                        setStore("selectid",userNo);
                        this.$router.push(`/${this.$parent.baseUrlPath}/orderForm`);
                    }else{
                        removeStore("selectuserid",this);
                        removeStore("selectusername",this);
                        removeStore("selectid",this);
                        jumpLogin();
                    }
		        });
			},
			//拼接tobooking
			saveRequest(type,val,seat){
				let orderBookingDetail = {};
	            orderBookingDetail.flightTripType = (type=="go")?"DEPARTURE":"RETURN";  //	DEPARTURE("去程"),RETURN("回程");（必填）
	            orderBookingDetail.flightNo = val.flightNo;
	            orderBookingDetail.departureDate = val.departureTime.substring(0,10);
	            orderBookingDetail.departureAirportCode = val.departureAirport.airportCode;
	            orderBookingDetail.arrivalAirportCode = val.arrivalAirport.airportCode;
	            orderBookingDetail.seatClassCode = seat.seatClassCode;  //仓位code（必填）
	            orderBookingDetail.parPrice = seat.parPrice;
	            orderBookingDetail.policyId = seat.policyId;  //政策id（必填）
	            orderBookingDetail.carrierCode = val.carrierCode;
	            orderBookingDetail.salesPrice= seat.salePrice;
	            orderBookingDetail.saleType= seat.saleType;
	            orderBookingDetail.segmentFlag= seat.segmentFlag;
	            orderBookingDetail.shoppingId= seat.shoppingId;
	            return orderBookingDetail;
			},
			//拼接填写页头部信息
			saveHeadInfo(){
				let headInfo = {};
	            headInfo.departureDate = this.flightInfoMsg.departureTime.substring(0,10);
	            headInfo.week = weekFormat(headInfo.departureDate);
	            headInfo.carrierName = this.flightInfoMsg.carrierName;
	            headInfo.flightNo = this.flightInfoMsg.flightNo;
	            headInfo.arrivalTime = this.flightInfoMsg.arrivalTime;
	            headInfo.departureTime = this.flightInfoMsg.departureTime;
	            return headInfo;
			},
			//tobooking 返回拼接下单参数
			saveToBookingRequest(data){
				let toBookingDetail = [];
	            if(data && data.length) {
	                for(let i = 0; i < data.length; i++){
	                    let orderBookingDetail = {};
	                    orderBookingDetail.flightTripType = (i == 0) ? "DEPARTURE" : "RETURN";  //	DEPARTURE("去程"),RETURN("回程");（必填）
	                    orderBookingDetail.flightNo = data[i].flightNo;
	                    orderBookingDetail.departureDate = data[i].departureDate;
	                    orderBookingDetail.departureAirportCode = data[i].departureAirportCode;
	                    orderBookingDetail.arrivalAirportCode = data[i].arrivalAirportCode;
	                    orderBookingDetail.seatClassCode = data[i].seats[0].seatClassCode;  //仓位code（必填）
	                    orderBookingDetail.parPrice = data[i].seats[0].parPrice;
	                    orderBookingDetail.policyId = data[i].seats[0].pricePolicyId;  //政策id（必填）
	                    orderBookingDetail.carrierCode = data[i].carrierCode;
	                    orderBookingDetail.salesPrice = data[i].seats[0].salesPrice;//成人销售价
	                    orderBookingDetail.saleType = data[i].seats[0].saleType;//类型
	                    orderBookingDetail.segmentFlag= data[i].seats[0].segmentFlag;
	                    orderBookingDetail.shoppingId= data[i].seats[0].shoppingId;
	                    if(data[i].seats.length>1){
	                        orderBookingDetail.childSalePrice = data[i].seats[1].salesPrice;//儿童销售价
	                        orderBookingDetail.childParPrice = data[i].seats[1].parPrice;//儿童票面价
	                        orderBookingDetail.childSegmentFlag = data[i].seats[1].segmentFlag;//类型
	                    }else{
	                        orderBookingDetail.childSalePrice = 0;//儿童销售价
	                        orderBookingDetail.childParPrice = 0;//儿童票面价
	                    }
	                    toBookingDetail[i] = orderBookingDetail;
	                }
	            }
	            return toBookingDetail;
			},
			saveBookInfo(data,type){
				let bookFlight = {'departureAirport': {}, 'arrivalAirport': {}};
				if(data) {
	                //出发地信息
	                bookFlight.departureAirport.flightName = data.departureAirportName;
	                bookFlight.departureAirport.cityName = data.departureCityName;
	                bookFlight.departureAirport.code = data.departureTermainalBuilding;
	                bookFlight.departureAirport.departureAirportCode = data.departureAirportCode;
	                //目的地信息
	                bookFlight.arrivalAirport.flightName = data.arrivalAirportName;
	                bookFlight.arrivalAirport.cityName = data.arrivalCityName;
	                bookFlight.arrivalAirport.code = data.arrivalTerminalBuilding;
	                bookFlight.arrivalAirport.arrivalAirportCode = data.arrivalAirportCode;
	                //航空公司名
	                bookFlight.carrierName = data.carrierName;
	                //飞行时长
	                bookFlight.flytimeHour = type == "go"?JSON.parse(getStore("flightInfo_go")).flytimeHour: this.flytimeHour;
	                bookFlight.flytimeMinute = type == "go"?JSON.parse(getStore("flightInfo_go")).flytimeMinute: this.flytimeMinute;
	                //出发和到达时间
	                bookFlight.departureTime = data.departureTime;
	                bookFlight.arrivalTime = data.arrivalTime;
	                bookFlight.crossDay = type == "go"?JSON.parse(getStore("flightInfo_go")).crossDay: !(this.flightInfoMsg.departureTime.split(' ')[0] === this.flightInfoMsg.arrivalTime.split(' ')[0]);
	                //餐饮信息
	                bookFlight.mealType = type == "go"?JSON.parse(getStore("flightInfo_go")).mealType: this.flightInfoMsg.mealType;
	                //机型信息
	                if(data.airplane!=null && data.airplane!=''){
	                    bookFlight.airplaneType = data.airplane.airplaneType;
	                    bookFlight.code = data.airplane.code;
	                    bookFlight.name = data.airplane.name;
	                    bookFlight.minSeats = data.airplane.minSeats;
	                    bookFlight.maxSeats = data.airplane.maxSeats;
	                }
	                bookFlight.audltSalePrice = this.audltSalePrice;
	                bookFlight.promotion = this.promotion;
	                bookFlight.childrenSalePrice =  this.childrenSalePrice;
	                bookFlight.flightNo = data.flightNo;
	                //舱位票面价
	                bookFlight.parPrice = data.seats[0].flightTicketPriceDto.parPrice;
	                //剩余舱位数
	                bookFlight.inventoryCount = type == "go"?JSON.parse(getStore("flightInfo_go")).inventoryCount: this.inventoryCount;
	                //基建燃油
	                bookFlight.childrenTaxs = data.fuelsurTaxs.CHILDREN;
	                bookFlight.childrenFees = data.airportFees.CHILDREN;
	                bookFlight.adultTaxs = data.fuelsurTaxs.ADULT;
	                bookFlight.adultFees = data.airportFees.ADULT;
	                //经停
	                bookFlight.across = data.stopCount > 0 ? true : false;
	                //优惠信息
	                bookFlight.proms = type == "go"?JSON.parse(getStore("flightInfo_go")).proms:this.promsList;
	                //退改签
	                bookFlight.ticketRuleSimples= data.seats[0].ticketRuleSimples;
	                //航司图标
	                bookFlight.carrierCode= data.carrierCode;
	                //舱位
	                bookFlight.seatClassName = data.seats[0].seatClassName;
	                //是否为国航
	                bookFlight.saleType = data.saleType;
	                bookFlight.segmentFlag = data.seats[0].segmentFlag;
	                bookFlight.shoppingId = data.seats[0].shoppingId;
	                bookFlight.departureDate = getDataWeek(data.departureDate);
	                //乘机人数量控制
	                bookFlight.passengerNum = data.seats[0].passengerNum;
	                if(data.seats[0].passengerNum!=null && data.seats[0].passengerNum!=""){
	                	let passengerNum=data.seats[0].passengerNum;
	                	//表示成人数量可以带儿童数量(成人)
	                	bookFlight.adultNumber=passengerNum.substring(passengerNum.indexOf("A")+1,passengerNum.indexOf("C"));
	                	//表示成人数量可以带儿童数量(儿童)
	                	bookFlight.childrenNumber=passengerNum.substring(passengerNum.indexOf("C")+1,passengerNum.indexOf("Amin"));
	                	//最少成人人数
	                	bookFlight.minAdultNumber=passengerNum.substring(passengerNum.indexOf("Amin")+4,passengerNum.indexOf("Amax"));
	                	//最大成人人数
	                	bookFlight.maxAdultNumber=passengerNum.substring(passengerNum.indexOf("Amax")+4,passengerNum.indexOf("Cmin"));
	                	//最少儿童人数
	                	bookFlight.minChildrenNumber=passengerNum.substring(passengerNum.indexOf("Cmin")+4,passengerNum.indexOf("Cmax"));
	                	//最大儿童人数
	                	bookFlight.maxChildrenNumber=passengerNum.substring(passengerNum.indexOf("Cmax")+4,passengerNum.indexOf("Tmin"));
	                	//最少总人数
	                	bookFlight.minPassenger=passengerNum.substring(passengerNum.indexOf("Tmin")+4,passengerNum.indexOf("Tmax"));
	                	//最大总人数
	                	bookFlight.maxPassenger=passengerNum.substring(passengerNum.indexOf("Tmax")+4,passengerNum.length);
	                }
	                //乘机人年龄控制
	                bookFlight.passengerAge = data.seats[0].passengerAge;
	                if(data.seats[0].passengerAge!=null && data.seats[0].passengerAge!=""){
	                	let passengerAge=data.seats[0].passengerAge;
	                	//表示最小成人年龄
	                	bookFlight.minAdultAge=passengerAge.substring(passengerAge.indexOf("A")+1,passengerAge.lastIndexOf("A"));
	                	//表示最大成人年龄
	                	bookFlight.maxAdultAge=passengerAge.substring(passengerAge.lastIndexOf("A")+1,passengerAge.indexOf("C"));
	                	//表示最小儿童年龄
	                	bookFlight.minChildrenAge=passengerAge.substring(passengerAge.indexOf("C")+1,passengerAge.lastIndexOf("C"));
	                	//表示最大儿童年龄
	                	bookFlight.maxChildrenNumber=passengerAge.substring(passengerAge.lastIndexOf("C")+1,passengerAge.length);
	                }
	                //共享航班
	                bookFlight.isCodeShare = data.isCodeShare;
	                //共享航班号 
	                bookFlight.shareFlightNo = data.shareFlightNo;
	                //共享航班名字
	                bookFlight.shareCarrierName = data.shareCarrierName;
	                //共享航班航司代码
	                bookFlight.shareCarrierCode = data.shareCarrierCode;
	                //发票
	                bookFlight.flightReimburseType = data.seats[0].flightReimburseType;
					//保险配置
					bookFlight.bookingInsuranceShowType = data.bookingInsuranceShowType||1;
					//总则条款
					bookFlight.carrierArticleDto = data.carrierArticleDtos || null;
					//是否需要勾选同意总则
					bookFlight.bookingNotes = data.seats[0].bookingNotes;
					//舱等
					bookFlight.seatClassCode = data.seats[0].seatClassCode;
            	}
            	 return bookFlight;
			},
			//监听滚动位置
	        watchScrollLocation(){
	        	this.scrollLocation = lQuery('#destine')[0].scrollTop;
	        },
		    toFeedBack(){
            	this.$router.push(`/${this.$parent.baseUrlPath}/feedBack`);
            },

            flightMessage(){
            	this.isShowMsg = true;
            },

            closePop(e){
            	e.stopPropagation();
            	this.isShowMsg = false;
            },

			clickPackage(val){
				if(val.businessType=='TICKET'){
					let showPackageSetail={};
					showPackageSetail.name=val.clientUserVasCouponVo.productName;
					showPackageSetail.id=val.clientUserVasCouponVo.id;
					showPackageSetail.serviceContent="<p style='font-weight:600'>使用说明</p>"+val.clientUserVasCouponVo.serviceContent;
					showPackageSetail.tgqRule="<p style='font-weight:600'>退改说明</p>"+val.clientUserVasCouponVo.tgqRule;
					showPackageSetail.businessType=val.businessType;
					showPackageSetail.desc=[];
					if(val.clientUserVasCouponVo.vasCouponName1!=null &&val.clientUserVasCouponVo.vasCouponName1!=""){
						showPackageSetail.desc.push(val.clientUserVasCouponVo.vasCouponName1);	
					}
					if(val.clientUserVasCouponVo.vasCouponName2!=null &&val.clientUserVasCouponVo.vasCouponName2!=""){
						showPackageSetail.desc.push(val.clientUserVasCouponVo.vasCouponName2);	
					}
					if(val.clientUserVasCouponVo.vasCouponName3!=null &&val.clientUserVasCouponVo.vasCouponName3!=""){
						showPackageSetail.desc.push(val.clientUserVasCouponVo.vasCouponName3);	
					}
					this.showPackageSetail=showPackageSetail;
				}else if(val.businessType=="INSURANCE"){
					let showPackageSetail={};
					showPackageSetail.name=val.insuranceInfoVo.insuranceClass.name;
					showPackageSetail.id=val.insuranceInfoVo.insuranceClass.id;
					showPackageSetail.serviceContent="<p style='font-weight:600'>保险说明</p>"+val.insuranceInfoVo.insuranceClass.desc;
					showPackageSetail.tgqRule='';
					showPackageSetail.businessType=val.businessType;
					showPackageSetail.desc=[];
					showPackageSetail.desc.push(val.insuranceInfoVo.insuranceClass.name+" "+val.insuranceInfoVo.insuranceRemark);
					this.showPackageSetail=showPackageSetail;
				}
				this.showPackage = true;
			},

            getTicketRule(flightNo,carrierCode,seatClassCode,departureDate,deptAirportCode,destAirportCode,policyId,saletype,segmentFlag){
            	getFlightTicketRule(flightNo,carrierCode,seatClassCode,departureDate,deptAirportCode,destAirportCode,policyId,saletype,segmentFlag).then((res) => {
            			this.$parent.showLoading = false;
            			if (res.code==1) {
            				if(res.data.remark!=null && res.data.remark!=""){
								let remark={};
								remark.detailFeeDesc=res.data.remark;
								remark.detailFeeType="RM";
								remark.detailFeeTypeName="备注";
								res.data.simpleDetails.push(remark);
							}
            				this.ticketRuleDetailListdesc=res.data.simpleDetails;
            				// if(this.flightInfoMsg.carrierCode=='9C'){
            				// 	this.goLuggageDesc=res.data.luggageDesc;
            				// }else{
            					this.goLuggageDesc=res.data;
            				// }
            				
            				this.changeBackClose = true;
            			}
            	},()=>{
            		that.$parent.showLoading = false;
            	})
            },

            //退改说明
            endorseClick(seat,indexNum){
            	let flightNo = this.flightInfoMsg.flightNo,
            		carrierCode = this.flightInfoMsg.carrierCode,
            		seatClassCode = seat.seatClassCode,
            		departureDate = this.deptDate,
            		deptAirportCode = this.flightInfoMsg.departureAirport.airportCode,
            		destAirportCode = this.flightInfoMsg.arrivalAirport.airportCode,
            		policyId = seat.policyId,
            		saletype = seat.saleType,
					segmentFlag = seat.segmentFlag;
				if(seat.tagPackage!=null&&seat.tagPackage[0].vstPrice=='true'){
					seat.flightReimburseType="";
				}
            	this.flightSeat=seat;
            	this.flightSeat.indexNum=indexNum;
            	this.$parent.showLoading = true;
            	this.getTicketRule(flightNo,carrierCode,seatClassCode,departureDate,deptAirportCode,destAirportCode,policyId,saletype,segmentFlag);
            	
            },

            onChangeBack(){
            	this.changeBackClose = false;
            },
            onSubmitOrder(data){
            	this.changeBackClose = false;
            	if(data!=""){
            		this.orderedClick(data,data.index);
            	}
            },
			toCarTrans(){
				getElementTag("详情页引入","需求单填写页");
				setStore("goin",'flight');
				window.location.href="//m.lvmama.com/car/TravelDemand/flight/?goin=flight&hideAppHeader=1";
			},
            //行李额说明
            popTicketInfo(seat){
            	let flightNo = this.flightInfoMsg.flightNo,
            		carrierCode = this.flightInfoMsg.carrierCode,
            		seatClassCode = seat.seatClassCode,
            		departureDate = `${this.departDate.year}-${addZero(this.departDate.month)}-${addZero(this.departDate.date)}`,
            		deptAirportCode = this.flightInfoMsg.departureAirport.airportCode,
            		destAirportCode = this.flightInfoMsg.arrivalAirport.airportCode,
            		policyId = seat.policyId,
            		saletype = seat.saleType,
            		segmentFlag = seat.segmentFlag;

            	this.getTicketRule(flightNo,carrierCode,seatClassCode,departureDate,deptAirportCode,destAirportCode,policyId,saletype,segmentFlag);

	            if (this.isDouble) {
	            	this.flightInfoLength = true;//是否往返 true 代表往返 false 代表单程
	            }
	            this.luggageDescClose = true;
            },

            onClickLuggage(){
            	this.luggageDescClose = false;
            },
            getInfoNew(){
				let from,
					to,
					flightNo = this.flightInformation.flightNo,
					departureDate = this.deptDate,
					preLowestSalePrice = this.flightInformation.salesParPrice,
					routeType = this.isDouble ? 'RT' : 'OW',
					bookingSource = getBookingSource(),
					flightTripTs = this.isDouble&&this.chosenGoTrip&&!this.chosenBackTrip ? 'DEPARTURE' : this.isDouble&&this.chosenBackTrip ? 'RETURN' : '',
					equipmentNo = getStore("equipmentNo");

					if (!this.isDouble) {
						from = this.departureCity.code;
						to = this.arrivalCity.code;
					}else{
						if (this.chosenGoTrip&&!this.chosenBackTrip) {
							from = this.departureCity.code;
							to = this.arrivalCity.code;
						}else if(this.chosenGoTrip&&this.chosenBackTrip){
							from = this.arrivalCity.code;
							to = this.departureCity.code;
						}
					}
				this.getInfo(from,to,flightNo,departureDate,preLowestSalePrice,routeType,bookingSource,flightTripTs,equipmentNo);
		},

		},

		computed:{
			...mapState([
				'departureCity',
				'arrivalCity',
				'flightInformation',
				'departDate',
				'backDate',
				'isDouble',
				'chosenBackTrip',
				'chosenGoTrip',
				'knockOrReduced',
				'promotionList',
				'noticeDetail',
				'businessTravel'
			])
		},

		mounted(){

		},

		created(){
			
		},

		activated(){
			this.flightInfoMsg="";
			this.isShowTopMsg=false;
			removeStore("sureBack");
			removeStore("chajia",this);
			removeStore("isworthCoupons",this);
			removeStore("insuranceListInfo",this);
			removeStore("productsGo",this);
            removeStore("productsBack",this);
			removeStore("scrollTop",this);
			removeStore("orderRemark",this);
			if (this.chosenGoTrip&&!this.chosenBackTrip) {
				this.depart=this.departureCity.name;
				this.dest=this.arrivalCity.name;
				this.departCode=this.departureCity.code;
				this.destCode=this.arrivalCity.code;
				this.deptDate = `${this.departDate.year}-${addZero(this.departDate.month)}-${addZero(this.departDate.date)}`;
				this.destDate = `${this.backDate.year}-${addZero(this.backDate.month)}-${addZero(this.backDate.date)}`;
			}else if(this.chosenGoTrip&&this.chosenBackTrip){
				this.depart=this.arrivalCity.name;
				this.dest=this.departureCity.name;
				this.departCode=this.arrivalCity.code;
				this.destCode=this.departureCity.code;
				this.deptDate = `${this.backDate.year}-${addZero(this.backDate.month)}-${addZero(this.backDate.date)}`;
				this.destDate = `${this.departDate.year}-${addZero(this.departDate.month)}-${addZero(this.departDate.date)}`;
			}
			
			this.getInfoNew();

	        getStatisticsType('机票-舱位列表页','FlightSeatList');
		},
		watch:{
			scrollLocation(newVal,oldVal){
        		if (newVal>100 ) {
        			this.isShowTopMsg = true;
            		this.activityTitle = {
            			date:`${addZero(this.departDate.month)}月${addZero(this.departDate.date)}日`,
            			week:weekFormat(new Date(formatIOSDate(this.flightInfoMsg.departureTime)).getDay()),
            			time:`${getTimes(this.flightInfoMsg.departureTime)}-${getTimes(this.flightInfoMsg.arrivalTime)}`
            		};
        		}else{
        			this.isShowTopMsg = false;
            		this.activityTitle = {
            			date: '',
            			week: '',
            			time: ''
            		};
        		}
        	}

		}
	}
</script>

<style lang="scss" scoped>
	@import '../../style/mixin';
	.destine-wrap{
		position: relative;
	    background: #eeeef5;
	    @include wh(100%,100%);
	    .destine-container{
	    	@include heightByAbsolute(0.9rem,0);
	    	overflow: hidden;
			overflow-y: scroll;
			.destine-top.destine_top{
				padding: 0.2rem 0 0;
			}
			.destine-top{
				@include borderRadius(0.1rem);
				background: #fff;
			    font-size: 0.26rem;
			    margin: 0.2rem .2rem .1rem;
			    padding: 0.2rem 0;
			    text-align: center;
				.destine-infor{
					text-align: left;
					padding: 0 .2rem;
					position: relative;
					.voyage{
						@include wh(.52rem,.28rem);
						@include ct();
						background: url('//m.lvmama.com/flight/image/oneway.png') no-repeat;
						background-size: 100%;
					}
					.voyageform{
						@include wh(.52rem,.28rem);
						@include ct();
						background: url('//m.lvmama.com/flight/image/doubleGo.png') no-repeat;
						background-size: 100%;
					}
					.voyagedesc{
						@include wh(.52rem,.28rem);
						@include ct();
						background: url('//m.lvmama.com/flight/image/doubleFrom.png') no-repeat;
						background-size: 100%;
					}
					>span:last-child{
						margin-left: .6rem;
					}
				}
			    .top-container{
			    	@include w(100%);
			    	padding: .2rem .2rem 0;
			    	> div {
			    		float: left;
			    	}
				    .start-place{
				    	width: 30%;
	    				.time{
	    					font-size: 0.48rem;
						}
						p:nth-child(1){
							@include sc(0.48rem,#333333);
						}
						p:nth-child(2){
							@include sc(0.24rem,#666666);
							margin-top: .1rem;
						}
				    }
				    .middle{
				    	width: 37%;
	    				margin-top: 0.15rem;
						position: relative;
	    				.long-time{
	    					@include sc(0.2rem,#999999);
	    				}
	    				.jt{
						    @include wh(1.6rem,0.2rem);
						    @include cl;
						    background: url('//m.lvmama.com/flight/image/newjiantou.png') no-repeat;
						    background-size: 100%;
	    				}
	    				.across{
	    					@include sc(0.2rem,#999);
	    					padding-top: 0.2rem;
	    				}
				    }
				    .end-place{
				    	width: 30%;
	    				.time{
	    					font-size: 0.48rem;
	    					position: relative;
	    					.d30{
    							@include sc(0.24rem,#666666);
    							@include ct;
	    					}
						}
						p:nth-child(1){
							@include sc(0.48rem,#333333);
						}
						p:nth-child(2){
							@include sc(0.24rem,#666666);
							margin-top: .1rem;
						}
				    }
				}
				.flex-xy{
					font-size: 0.26rem;
    				padding-top: 0.2rem;
    				.info-msg{
	    				.air-icon{
	    					@include wh(0.26rem,0.26rem);
						    display: inline-block;
							margin-right: 0.1rem;
							vertical-align: -.03rem;
	    				}
	    				.flight-compony{
	    					display: inline-block;
							padding-right: 0.2rem;
							@include sc(0.24rem,#666666);
						}
						.small_size{
							@include sc(0.24rem,#666666);
						}
	    				.flight-compony:after{
	    					@include wh(0.2rem,0.16rem);
	    					content: "";
						    display: inline-block;
						    border-right: 1px solid #ddd;
	    				}
	    				.flight-msg{
	    					@include wh(0.3rem,0.26rem);
	    					background: url('//m.lvmama.com/flight/image/planeTypeIcon.png')
	    						 no-repeat bottom left;
						    background-size: 0.24rem;
						    display: inline-block;
							margin-left: 0.1rem;
							vertical-align: -.03rem;
	    				}

	    			}
	    			.share-msg{
	    				font-size: 0.24rem;
    					padding-top: 0.2rem;
    					.share-icon{
    						@include wh(0.2rem,0.2rem);
    						background: url('//m.lvmama.com/flight/image/change_icon.png')
	    						 no-repeat;
						    background-size: 100%;
						    display: inline-block;
						    margin-right:0.1rem; 
    					}
    					.share-air-logo{
    						@include wh(0.26rem,0.26rem);
						    display: inline-block;
						    margin-right: 0.1rem;
    					}
    					.share{
    						color: #9f9f9f;
    						> i{
    							color: #666;
    						}
    					}
	    			}
				}
				.luggage{
    				@include sc(0.24rem,#ccc);
    				padding-top: 0.2rem;
					>p{
						position: relative;
						color: #ccc;
						>i{
							@include wh(.26rem ,.29rem);
							@include ct;
							background: url(//m.lvmama.com/flight/image/prompt.png) no-repeat 50%;
							background-size: .25rem;
							left: -.3rem;
						}
					}
	    		}
				.share-flight{
					@include sc(0.24rem,#666666);
					padding-top: 0.2rem;
					margin-top: 0.2rem;
					border-top: 1px dashed #ccc;
				}
				.notice_container{
				    @include wh(100%,0.6rem);
				    @include sc(0.28rem,#666666);
				    -webkit-box-sizing: border-box;
				    box-sizing: border-box;
				    overflow: hidden;
				    margin-top: 0.2rem;
				    // padding: 0 0.2rem;
				}
				.swiper-container-notice{
					border-radius: 0 0 .1rem .1rem;
				}
			}
			.destine-msg{
				.seat{
					@include borderRadius(0.1rem);
					font-size: 0.28rem;
					background: #fff;
				    margin: 0.1rem .2rem;
				    padding: 0.2rem;
				    position: relative;
					padding-left: 0;
				    // height: 1.4rem;
					.line{
						margin-left: .2rem !important;
						margin-top: .1rem !important;
    					width: 97%;
					}
					.lines{
						margin-top: .1rem !important;
					}
					>div{
						position: relative;
						margin-bottom: .2rem;
						font-size: 0;
					}
					>div.one{
						margin-bottom: .05rem;
					}
					.flight_desc{
						margin-bottom: 0;
						margin-left: .2rem;
						@include topline();
						.p-desc{
							position: relative; 
							margin: .15rem 0 0;
							padding: .05rem 0;
							.p-seat{
								@include sc(0.24rem,#999999);
							}
							.endorse{
								@include sc(0.24rem,#999999);
								margin-left: 0.1rem;
								position: relative;
								i{
									display: inline-block;
									width: 0.02rem;
									height: 0.2rem;
									background: #bbbbbb;
									margin-right:0.12rem;
									vertical-align: inherit;
								}
							}
							em{
								@include wh(.12rem,.2rem);
								@include ct();
								background: url('//m.lvmama.com/flight/image/herf_arrow.png') no-repeat;
								background-size: 100%;
								right: -.2rem;
								margin-top: 1px;
							}
							.icon{
								right: 0;
								position: absolute;
							}
							.subtraction{
					    		@include sc(0.2rem,#FF8800);
							    border: 1px solid #FFB92B;
							    border-radius: 3px;
							    padding: 0 0.05rem;
							    margin-left: 0.1rem;
								line-height: .32rem;
    							display: inline-block;
							}
							.subtraction.yu{
								@include sc(0.2rem,#FF5465);
							    border: 1px solid #FFA5AE;
							}
						}
					}
					.passerLine{
						position: absolute;
						@include wh(1px,92%);
						background: url('//m.lvmama.com/flight/image/passerLine.png');
						background-size: 100%;
						margin-left: 29%;
						margin-top: 1%;
					}
					.passerLine1{
						position: absolute;
						@include wh(1px,50%);
						background: url('//m.lvmama.com/flight/image/passerLine.png');
						background-size: 100%;
						margin-left: 29%;
						margin-top: 3%;
					}
					.channel.channel1{
						margin: .15rem 0 .2rem;
						 > div .title{
							 vertical-align: sub;
							> span{
								max-width: 37%;
								line-height: .28rem;
							}
						 } 
					}
					.channel{
						width: 71%;
						font-size: 0;
						display: inline-block;
						margin-left: 29% !important;
						>div{
							// height: 1rem;
							font-size: .26rem;
							margin-left: .2rem;
							margin-top: 0 !important;
							position: relative;
							@include bottomline();
							padding-bottom: .2rem;
							.icon{
								@include sc(.2rem,#fff);
								padding: 0 .1rem;
								line-height: .34rem;
								display: inline-block;
								background: #FFB92B;
								border-radius: 3px;
								text-align: center;
							}
							.title{
								// @include sc(.26rem,#FF6600);
								position: relative;
								// white-space: nowrap;
								// overflow: hidden;
								// text-overflow: ellipsis;
								margin-top: .1rem;
								width: 100%;
								>span{
									@include sc(.26rem,#FF6600);
									white-space: nowrap;
									overflow: hidden;
									text-overflow: ellipsis;
									display: inline-block;
									max-width: 65%;
								}
								>i{
									@include wh(.16rem,.24rem);
									@include ct();
									background: url('//m.lvmama.com/flight/image/package_arrow.png') no-repeat;
									background-size: 100% 100%;
									margin-left: .1rem;
								}
							}
						}
						>div.two{
							padding-top: .15rem;
						}
						.ordinary{
							line-height: 1rem;
							@include sc(.26rem,#666);
							border:0;
							padding-bottom: 0;
						}
						.ordinary1{
							@include sc(.26rem,#666);
							border:0;
							padding-bottom: 0;
						}
					}
				    .seat-price{
						width: 29%;
						display: inline-block;
						text-align: center;
					    .p-price{
							padding-left: .4rem;
    						float: left;
					    	.yuan{
					    		@include sc(0.32rem,#ff6600);
					    		padding-top: 0.09rem;
					    	}
					    	.price{
					    		@include sc(0.48rem,#ff6600);
					    	}
					    }
						
				    }
					.seat-price.one{
						transform: translateY(-50%);
						top: 50%;
						position: absolute;
					}
				    .seat-label{
				    	.air-flag{
				    		@include wh(1.46rem,0.42rem);
				    		display: inline-block;
						    // position: absolute;
						    right: 1.6rem;
						    top: 0.5rem;
							margin: 0.1rem 0;
				    	}
				    }
				    .seat-button{
					    @include ct;
					    right: 0;
					    // .course-button{
					    	width:1.2rem;
					    	@include sc(0.26rem,#fff);
					    	@include borderRadius(100px);
					    	display: inline-block;
						    line-height: 0.48rem;
						    text-align: center;
						    background-image: linear-gradient(-90deg, #FF6600 0%, #FF8800 98%);
					    // }
					    // .surplus-button{
						//     @include wh(1.2rem,0.75rem);
						//     border: 1px solid #ff6600;
						//     background: #fff;
						//     border-radius: 0.1rem;
						//     float: right;
						//     position: relative;
						//     display: inline-block;
						//     .course{
						//     	@include wh(1.18rem,0.45rem);
						//     	@include sc(0.28rem,#fff);
						//     	display: block;
						// 	    line-height: 0.45rem;
						// 	    background-image: linear-gradient(-90deg, #FF6600 0%, #FF8800 98%);
						// 	    text-align: center;
						// 	    position: relative;
						// 	    top: -0.01rem;
						// 	    right: 0.01rem;
						// 	    border-top-left-radius: 0.08rem;
						// 	    border-top-right-radius: 0.08rem;
						//     }
						//     .surplus{
						//     	@include wh(1.16rem,0.28rem);
						//     	@include sc(0.2rem,#ff6600);
						// 	    line-height: 0.28rem;
						// 	    border-bottom-left-radius: 0.08rem;
						// 	    border-bottom-right-radius: 0.08rem;
						// 	    background-color: #fff;
						// 	    text-align: center;
						// 	    display: block;
						// 	    position: relative;
						// 	    top: -0.04rem;
						// 	    right: 0;
						//     }
					    // }
				    }
				}
				.add_tranvel{
					height:1.38rem;
					background: #fff;
					margin:0 0.2rem;
					position: relative;
					margin-top: 0.2rem;
					border-radius: 3px;
					margin-bottom: 0.4rem;
					.left{
						@include wh(0.76rem,0.76rem);
						@include ct;
						background:url('//m.lvmama.com/flight/image/customize.png') no-repeat;
						background-size: 100% 100%;
						left:0.2rem;
					}
					.right{
						@include ct;
						left:15%;
						p{
							@include sc(0.26rem,#333333);
						}
						span{
							@include sc(0.22rem,#999999);
						}
					}
					i{
						display: block;
						@include wh(0.26rem,0.16rem);
						@include ctr(90deg);
						background:url('//m.lvmama.com/flight/image/up_arrow.png') no-repeat;
						background-size: 100% 100%;
						right:0.2rem;
					}
				}
			}
	    }
	    .orderline{
	    	@include orderline();
	    }
	    .matte{
	    	width: 100%;
		    height: 100%;
		    background-color: rgba(0,0,0,0.5);
		    position: fixed;
		    top: 0;
		    left: 0;
		    z-index: 8;
	    	.message-wrap{
	    		width: 100%;
				height:6.68rem;
	    		background-color: #fff;
			    border-radius: 6px 6px 0 0;
			    position: absolute;
			    bottom: 0;
			    margin-top: 0;
			    overflow: initial;
	    		.messageInfo{
	    			position: relative;
				    background-color: #fff;
				    overflow: hidden;
				    padding: 0.3rem;
				    border-radius: 0.12rem;
	    			.title{
	    				padding: .2rem 0 .3rem;
						color: inherit;
						font-size: .32rem;
						font-weight: 400;
						text-align: center;
	    			}
	    			.content{
						table{
							height: .6rem;
							line-height: .6rem;
							border-collapse: collapse;
							width: 100%;
							border: 1px solid #e4e4e4;
							margin: 0 0 .2rem;
							>tr{
								border: 1px solid #f3f3f3;
								@include sc(0.28rem,#666);
								>td:first-child{
									width: 30%;
									text-align: center;
									border: 1px solid #f3f3f3;
								}
								>td:last-child{
									border: 1px solid #f3f3f3;
									width: 70%;
									padding-left: .2rem;
								}
							}
							
							
						}
	    			}
	    		}
	    	}
			.package-wrap{
				width: 100%;
				height:9.3rem;
	    		background-color: #fff;
			    border-radius: 6px 6px 0 0;
			    position: absolute;
			    bottom: 0;
			    margin-top: 0;
			    overflow: initial;
				.package{
					position: relative;
				    background-color: #fff;
				    overflow: hidden;
				    padding: 0.3rem;
				    border-radius: 0.12rem;
					height:87%;
					.titleBG{
						@include wh(100%,1.04rem);
						background: url('//m.lvmama.com/flight/image/packageBG.png') center no-repeat;
						background-size: 100%;
						@include sc(.36rem,#fff);
						line-height: 1.04rem;
						text-align: center;
					}
					.packageConten{
						width: 100%;
						min-height: 1.4rem;
						background: #FEF6F1;
						box-shadow: 0 4px 4px 0 rgba(210,210,210,0.50);
						color:#666;
						padding: .2rem;
						border-radius: 0 0 5px 5px;
						position: relative;
						>p{
							margin-bottom: .1rem;
							position: relative;
							>i{
								@include wh(.32rem,.28rem);
								background: url('//m.lvmama.com/flight/image/packageIcon.png') center no-repeat;
								background-size: 100%;
								position: absolute;
								@include ct();
							}
							>span{
								color: #666;
								margin-left: .4rem;
								display: inline-block;
							}
						}
						>p:last-child{
							margin-bottom: 0;
						}
						>p.one{
							@include ct();
						}
					}
					.packageDetail{
						margin-top: .3rem;
						overflow-y: scroll;
						position: relative;
						height: 5.56rem;height: 5.56rem;
						padding-bottom: 2rem;
						>p{
							@include sc(.26rem,#2A2A2A);
							line-height: .44rem;
						}
					}
				}
			}
			.close{
				width: 6.9rem;
				height: 0.88rem;
				text-align: center;
				line-height: 0.88rem;
				border-radius: 100px;
				background: linear-gradient(137deg, #FE686C, #FD3C71);
				position: absolute;
				bottom: 0.25rem;
				left:50%;
				transform: translateX(-50%);
				span{
					@include sc(0.36rem,#fff);
				}
			}
	    }
	}
</style>