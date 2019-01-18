<template>
	<div class="passenger-list" v-if="messageListInfo && kind == 'passenger'">
		<div class="passenger" v-for="(item,index) in messageListInfo" :key="index">
			<div class="y_flex" >
				<p class="passenger-update" @click="editPassenger(item)"></p>
				<p class="passenger-left" @click="selectedPassenger(item,index)">
					<span class="multi_picker chose-icon" v-if="item.isChecked!=-1" v-bind:class="{'multi_picked':item.isChecked==true}"></span>
					<span class="passenger-msg">{{item.receiverName}} {{item.peopleType | passengerType}}</span>
					<span class="passenger-msg cardNo" v-if="item.isChecked!=-1">{{item.certType | certificateTypeFilter}}：{{item.certNo}}</span>
					<span class="passenger-errorMsg cardNo" v-if="item.isChecked==-1">信息待完善，请点击补充</span>
				</p>
			</div>
			<div class="orderline"></div>
		</div>
	</div>
	<div class="passenger-list address_list" v-else>
		<div class="passenger" v-for="(item,index) in messageListInfo" :key="index">
			<div class="y_flex" >
				<p class="passenger-update" @click="editAddress(item)"></p>
				<p class="passenger-left" @click="chooseAddress(item)">
					<span class="multi_picker chose-icon" :class="{'multi_picked': item.isChecked}"></span>
					<span class="passenger-msg">{{item.recipientName}} {{item.mobileNumber}}</span>
					<span class="passenger-msg cardNo">{{item.province}}{{item.city}}{{item.county}}{{item.address}}</span>
				</p>
			</div>
			<div class="orderline"></div>
		</div>
	</div>
</template>

<script>
	import { mapActions,mapState } from 'vuex'
	import { setStore,getStore,removeStore } from '../../config/mUtils'

	export default{
		data(){
			return {
				
			}
		},
		props:[
			'messageListInfo',
			'kind',
		],

		methods:{
			...mapActions([
					'initData'
				]),

			//勾选乘机人
			selectedPassenger(item,index){
				if (item.isChecked!=-1) {
					var flightInfo = JSON.parse(getStore("flightInfo")),
	            		singleFlight = flightInfo[0],
	            		doubleFlight = flightInfo[1];
					var headInfo=JSON.parse(getStore("flight_headInfo")),
	                	departureDate=headInfo[0].departureDate;
	               	var number=0,adultNum=0,childNum=0;

	               	// 判断乘机人数量和剩余航班票数
		            var singleNum = singleFlight.inventoryCount,doubleNum,flightLastNumber;
		            if(flightInfo.length==2){
		                doubleNum = doubleFlight.inventoryCount;
		                if(singleNum>doubleNum){
		                    flightLastNumber=doubleNum;
		                }else{
		                    flightLastNumber=singleNum;
		                }
		            }else{
		                flightLastNumber=singleNum;//剩余舱位数
		            }
		            item.isChecked=!item.isChecked;
		            this.$parent.passengersInfo = this.messageListInfo;

	                if(item.certType=="ID" || item.certType=="ID_CARD"){
		                var year =item.certNo.substring(6, 10),
		                    month = item.certNo.substring(10, 12),
		                    day = item.certNo.substring(12, 14);
		                // 出生日期强制按身份证计算
		                item.birthday=year+"-"+month+"-"+day;
		            }

					// 动态判断乘机人类型（航班出发日期 ：乘客出生日期）
		            var adultDate=Number(item.birthday.substring(0,4))+Number(singleFlight.minAdultAge || 12)+item.birthday.substring(4,10);
		            var childrenDate=Number(item.birthday.substring(0,4))+Number(singleFlight.minChildrenAge || 2)+item.birthday.substring(4,10);
		            var oldDate=Number(item.birthday.substring(0,4))+Number(singleFlight.maxAdultAge || 70)+item.birthday.substring(4,10);
		            var dd=Number(item.birthday.substring(8,10))+14;
		            var babyDate=item.birthday.substring(0,8)+dd;
		            if(childrenDate>departureDate&&departureDate>=babyDate){//婴儿
		                item.isChecked=!item.isChecked;
		            	this.$parent.passengersInfo = this.messageListInfo;
		                this.$parent.tipContent = `友情提示：预订婴儿票（0-${singleFlight.minChildrenAge || 2}岁），请联系航空公司购票！`;
						this.$parent.isShowPop = true;
						setTimeout(() => {
	                   		this.$parent.isShowPop = false;
	                    },2000);
		                return;
		            }
		            if(departureDate<babyDate){
		            	//乘机人年龄不在可售范围内
		                item.isChecked=!item.isChecked;
		            	this.$parent.passengersInfo = this.messageListInfo;
		                this.$parent.tipContent = '乘机人年龄不在可售范围内,请选择其他交通方式。';
						this.$parent.isShowPop = true;
						setTimeout(() => {
	                   		this.$parent.isShowPop = false;
	                    },2000);
		                return;
		            }
		            if(oldDate<=departureDate){//老人
		                item.isChecked=!item.isChecked;
		            	this.$parent.passengersInfo = this.messageListInfo;
		                this.$parent.tipContent = `友情提醒：超过${singleFlight.maxAdultAge || 70}岁的乘机人，请联系航空公司购票！`;
						this.$parent.isShowPop = true;
						setTimeout(() => {
	                   		this.$parent.isShowPop = false;
	                    },2000);
		                return;
		            }

		            for(var i=0; i<this.messageListInfo.length;i++){
		                if(this.messageListInfo[i].isChecked==true){
		                    number=number+1;
		                    var adult = Number(this.messageListInfo[i].birthday.substring(0,4))+Number(singleFlight.minAdultAge || 12)+this.messageListInfo[i].birthday.substring(4,10);
		                    var child = Number(this.messageListInfo[i].birthday.substring(0,4))+Number(singleFlight.minChildrenAge || 2)+this.messageListInfo[i].birthday.substring(4,10);

		                    if (departureDate>adult) {
		                        adultNum=adultNum+1;
		                    }
		                    if (departureDate>=child&&departureDate<adult) {
		                        childNum=childNum+1;
		                    }
		                }else{
		                	// this.$parent.adultNum = adultNum;
		                	// this.$parent.childNum = childNum;
		                }
		            }

					if (item.peopleType == "CHILDREN") {
		                if (adultNum == 0) {
		                    item.isChecked=!item.isChecked;
			            	this.$parent.passengersInfo = this.messageListInfo;
							this.$parent.tipContent = `友情提醒：儿童出行需成人陪同`;
							this.$parent.isShowPop = true;
							setTimeout(() => {
		                   		this.$parent.isShowPop = false;
		                    },2000);
		                    return;
		                } else {
		                    if (singleFlight.childrenSalePrice==0 || (flightInfo.length == 2 && doubleFlight.childrenSalePrice == 0)) {
		                        item.isChecked=!item.isChecked;
				            	this.$parent.passengersInfo = this.messageListInfo;
								this.$parent.tipContent = `该航班暂不支持儿童票购买！`;
								this.$parent.isShowPop = true;
								setTimeout(() => {
			                   		this.$parent.isShowPop = false;
			                    },2000);
		                        return;
		                    }; 
		                };
		            }else{
		            	if (item.isChecked == false && adultNum == 0 && childNum > 0) {
		                    item.isChecked=!item.isChecked;
			            	this.$parent.passengersInfo = this.messageListInfo;
							this.$parent.tipContent = `友情提醒：儿童出行需成人陪同`;
							this.$parent.isShowPop = true;
							setTimeout(() => {
		                   		this.$parent.isShowPop = false;
		                    },2000);
		                    return;
		                }
		            }

					//最多人数
		            if(number>singleFlight.maxPassenger){
						item.isChecked=!item.isChecked;
		            	this.$parent.passengersInfo = this.messageListInfo;
						this.$parent.tipContent = `最多可选${singleFlight.maxPassenger}名乘机人`;
						this.$parent.isShowPop = true;
						setTimeout(() => {
	                   		this.$parent.isShowPop = false;
	                    },2000);
		                return;
		            }else if(doubleFlight!=null && number>doubleFlight.maxPassenger){
		            	item.isChecked=!item.isChecked;
		            	this.$parent.passengersInfo = this.messageListInfo;
						this.$parent.tipContent = `最多可选${doubleFlight.maxPassenger}名乘机人`;
						this.$parent.isShowPop = true;
						setTimeout(() => {
	                   		this.$parent.isShowPop = false;
	                    },2000);
		                return;
		            }
		            //最多成人数
		            if(adultNum>singleFlight.maxAdultNumber){
		            	item.isChecked=!item.isChecked;
		            	this.$parent.passengersInfo = this.messageListInfo;
						this.$parent.tipContent = `该产品最多可选${singleFlight.maxAdultNumber}名成人`;
						this.$parent.isShowPop = true;
						setTimeout(() => {
	                   		this.$parent.isShowPop = false;
	                    },2000);
		                return;
		            }else if(doubleFlight!=null && adultNum>doubleFlight.maxAdultNumber){
						item.isChecked=!item.isChecked;
		            	this.$parent.passengersInfo = this.messageListInfo;
						this.$parent.tipContent = `该产品最多可选${doubleFlight.maxAdultNumber}名成人`;
						this.$parent.isShowPop = true;
						setTimeout(() => {
	                   		this.$parent.isShowPop = false;
	                    },2000);
		                return;
		            }
		            //最多儿童数
		            if(childNum>singleFlight.maxChildrenNumber){
		            	item.isChecked=!item.isChecked;
		            	this.$parent.passengersInfo = this.messageListInfo;
						this.$parent.tipContent = `该产品最多可选${singleFlight.maxChildrenNumber}名儿童`;
						this.$parent.isShowPop = true;
						setTimeout(() => {
	                   		this.$parent.isShowPop = false;
	                    },2000);
		                return;
		            }else if(doubleFlight!=null && childNum>doubleFlight.maxChildrenNumber){
		            	item.isChecked=!item.isChecked;
		            	this.$parent.passengersInfo = this.messageListInfo;
						this.$parent.tipContent = `该产品最多可选${doubleFlight.maxChildrenNumber}名儿童`;
						this.$parent.isShowPop = true;
						setTimeout(() => {
	                   		this.$parent.isShowPop = false;
	                    },2000);
		                return;
		            }
		            //成人最多携带儿童数量
		            if(adultNum>0&&childNum>adultNum*singleFlight.childrenNumber){
		            	item.isChecked=!item.isChecked;
		            	this.$parent.passengersInfo = this.messageListInfo;
						this.$parent.tipContent = `该产品1个成人最多带${singleFlight.childrenNumber}名儿童`;
						this.$parent.isShowPop = true;
						setTimeout(() => {
	                   		this.$parent.isShowPop = false;
	                    },2000);
		                return;
		            }else if(doubleFlight!=null && adultNum>0&&childNum>adultNum*doubleFlight.childrenNumber){
		            	item.isChecked=!item.isChecked;
		            	this.$parent.passengersInfo = this.messageListInfo;
						this.$parent.tipContent = `该产品1个成人最多带${doubleFlight.childrenNumber}名儿童`;
						this.$parent.isShowPop = true;
						setTimeout(() => {
	                   		this.$parent.isShowPop = false;
	                    },2000);
		                return;
		            }
		            if(number>flightLastNumber){
		            	item.isChecked=!item.isChecked;
		            	this.$parent.passengersInfo = this.messageListInfo;
						this.$parent.tipContent = `对不起，当前舱位仅剩${flightLastNumber}张票，请修改乘机人数`;
						this.$parent.isShowPop = true;
						setTimeout(() => {
	                   		this.$parent.isShowPop = false;
	                    },2000);
		                return;
		            }

		            this.$parent.adultNum = adultNum;
		            this.$parent.childNum = childNum;
				}else{
					setStore("editPersonMes",item);
					this.$router.push(`/${this.$parent.$parent.baseUrlPath}/addEditPassenger`);
				}
				
			},

			//编辑乘机人
			editPassenger(item){
				setStore("editPersonMes",item);
				this.$router.push(`/${this.$parent.$parent.baseUrlPath}/addEditPassenger`);
			},

			//选择地址
			chooseAddress(item) {
				if (item.isChecked) {
					item.isChecked = false;
				} else {
					for (let i = 0; i < this.messageListInfo.length; i++) {
						this.$set(this.messageListInfo[i],'isChecked',false);
					};
					item.isChecked = true;
				}
			},

			//编辑地址
			editAddress(item) {
				let obj = {
					key: 'editMailAddress',
					val: item
				};
				try{
					this.initData(obj);
				}catch(e){}
				this.$router.push(`/${this.$parent.$parent.baseUrlPath}/addEditAddress/edit`);
			},

		},

		created(){
			
		},

		activated(){
			console.log(this.messageListInfo);
		},

		mounted(){
			
		},

		computed:{
			...mapState([
				'selectedPersons',
				'commonPersonMes'
			])
		}
	}
</script>

<style lang="scss" scoped>
@import '../../style/mixin';
	.passenger-list{
		width: 100%;
		.orderline{
			@include orderline();
		}
		.passenger{
			width: 100%;
			.passenger-left{
				height: auto;
				position: relative;
				padding: 0.2rem 0;
				width: 82%;
				.chose-icon{
					@include ct;
					right: -.5rem;
					width: .4rem;
					height: .4rem;
					display: block;
					background: url(//m.lvmama.com/flight/image/multiUnPicked.png) no-repeat center;
					background-size: .36rem;
				}
				.chose-icon.multi_picked {
					background: url(//m.lvmama.com/flight/image/multiPicked.png) no-repeat center;
					background-size: .36rem;
				}
				// .chose-icon:before{
				// 	@include wh(0.06rem,0.16rem);
				// 	content: "";
				//     border-right: 1px solid #aaa;
				//     border-bottom: 1px solid #aaa;
				//     transform: rotate(45deg) translate(-50%,-50%);
				//     position: absolute;
				//     left: 24%;
				//     top: 45%;
				// }
				// .selected{
				// 	background-color: #32c671;
    			// 	border-color: #32c671!important;
				// }
				// .selected:before{
				// 	border-color: #fff;
				// }
				.passenger-msg{
					@include sc(0.26rem,#333);
					display: block;
				}
				.passenger-errorMsg{
					@include sc(0.24rem,#999);
					display: block;
				}
				.cardNo{
					padding-top: 0.08rem;
					font-size: .24rem;
					color: #666 !important;
				}
			}
			.passenger-update{
				@include wh(0.4rem,0.4rem);
				background: url('//m.lvmama.com/flight/image/newupdatePer.png') no-repeat;
			    background-size: 100%;
			    margin-right: 0.3rem;
			}
		}
	}
	// .address_list {
	// 	.passenger-msg {
	// 		color: #666 !important;
	// 	}
	// 	// .address_detail {
	// 	// 	font-size: .22rem !important;
	// 	// 	color: #aaa !important;
	// 	// }
	// }
</style>