<template>
	<div class="changeFlightList">
		<head-top :depart="depart" :dest="dest"></head-top>
		<div class="panels y_flex between_x_flex">
			<div class="timeLeft" @click="prevClick" v-bind:class="{'gray': prevChangeColor}">
				<span>前一天</span>
			</div> 
			<div class="timeContent" @click="toSelectDate">
					<span>{{departDate.month | addZero}}-{{departDate.date | addZero}} {{departDate.day}}</span>
			</div>
			<div class="timeRight" @click="nextClick" v-bind:class="{'nextGray': nextChangeColor}">
				<span>后一天</span>
			</div>
		</div>
		<div class="isScroll"  v-if="!showNoFlight && flightList.length > 0">
			<div class="flight_list_content">
				<div class="title">以下是航空公司提供的可改期航班及价格</div>
				<change-list v-for="item in flightList" :flightList="item"  :flightArrList="flightList"></change-list>
			</div>
			<div class="wantFlight" @click="toApplyfor">获取更多方案</div>
		</div>
		<div class="noFlight" v-if="showNoFlight">
			<div class="errorTop">
				<i></i>
				<p>很抱歉，暂无可改签航班</p>
				<div class="wantFlight" @click="toApplyfor">获取更多方案</div>
			</div>
			
		</div>
	</div>
</template>
<script>
	import headTop from '../../components/header/head'
	import alertTip from '../../components/common/alertTip'
	import changeList from '../../components/common/changeList'
	import { mapActions,mapState } from 'vuex'
	import { addZero,weekFormat,getBookingSource,formatIOSDate} from '../../config/mUtils'
	import { CTMTSearch } from '../../service/getData'

	export default{
		data(){
			return{
				depart:"",
				dest:"",
				prevChangeColor:false,
				nextChangeColor:false,
				flightList:[],
				flightDetail:[],
				isTime:'',
				nowTime:'',
				showNoFlight:false,
			}
		},
		components: {
			  headTop,
			  changeList
	
		},
		computed:{
			 ...mapState([
				'departDate',
				'nowDateStamp',//当前时间戳
				'endorseInfo',
				'allMonthInfos',
            ])
		},
		methods:{
			...mapActions([
	            'initData'
			]),
			getFlightListInfo(fromCode,toCode,departureDate,orderId,carrierCode) {
				this.$parent.showLoading = true;
				this.showNoFlight=false;
				this.flightList = [];
                CTMTSearch(fromCode,toCode,departureDate,orderId,carrierCode,getBookingSource()).then((res) => {
					
					this.$parent.showLoading = false;
                	this.flightList = [];
					let flightList = [];
					if(res.code == 1){
						if(res.data.flightSearchFlightInfos.length>0){
							let allList = res.data.flightSearchFlightInfos;
							for(let i=0;i<allList.length;i++){
								for(let j=0;j<allList[i].ctmtSeats.length;j++){
									let obj = {
										departureTime:allList[i].departureTime,
										arrivalTime:allList[i].arrivalTime,
										flyTime:allList[i].flyTime,
										departureAirportName:allList[i].departureAirportName,
										departureTermainalBuilding:allList[i].departureTermainalBuilding,
										arrivalAirportName:allList[i].arrivalAirportName,
										arrivalTerminalBuilding:allList[i].arrivalTerminalBuilding,
										carrierName:allList[i].carrierName,
										carrierCode:allList[i].carrierCode,
										flightNo:allList[i].flightNo,
										airplaneCode:allList[i].airplaneCode,
										airplaneType:allList[i].airplaneType,
										name:allList[i].name,
										seatClassName:allList[i].ctmtSeats[j].name,
										isCodeShare:allList[i].isCodeShare,
										shareCarrierName:allList[i].shareCarrierName || '',
										shareFlightNo:allList[i].shareFlightNo || '',
										ctmtFee:allList[i].ctmtSeats[j].ctmtFee,
										gapPrice:allList[i].ctmtSeats[j].gapFee,
										shareCarrierCode:allList[i].shareCarrierCode,
										stopType:allList[i].stopType,
										minSeats:allList[i].minSeats,
										maxSeats:allList[i].maxSeats,
										seatClassCode:allList[i].ctmtSeats[j].seatClassCode,
									}
									flightList.push(obj);
									
								}                       		
							}
							this.flightList = flightList;
						}else{
							this.showNoFlight = true;
						}
					}else{
						this.showNoFlight = true;
					}
					
				},()=>{
                	this.$parent.showLoading = false;
                	this.flightList = [];
                	this.flightListInfor = [];
                })
				
            },
			toApplyfor(){
				let endorseInfo = this.endorseInfo;
				endorseInfo.changeInfo='';
				let obj ={
                    key: 'endorseInfo',
                    val: endorseInfo
                }
                try{
                    this.initData(obj);
                }catch(e){}
				this.$router.push(`/${this.$parent.baseUrlPath}/applyforEndorse`);
			},
			//前一天后一天方法
            preNextDay(type){
            	let currentTime = `${this.departDate.year}-${this.departDate.month}-${this.departDate.date}`;
				
	           	let formattingTime = new Date(formatIOSDate(currentTime)),
					msTime = formattingTime.getTime(),
					beforeTime = msTime - 1 * 24 * 60 * 60 * 1000,//前一天的毫秒数
					afterTime = msTime + 1 * 24 * 60 * 60 * 1000,//后一天的毫秒数
					afterDate =	new Date(afterTime),
					afterYear = afterDate.getFullYear(),
					afterMonth = afterDate.getMonth() + 1,
					afterDay = afterDate.getDate(),
					afterWeek = weekFormat(afterDate.getDay()),
					beforeDate = new Date(beforeTime),
					beforeYear = beforeDate.getFullYear(),
					beforeMonth = beforeDate.getMonth()+1,
					beforeDay = beforeDate.getDate(),
					beforeWeek = weekFormat(beforeDate.getDay()),

					nowDate = new Date(this.nowDateStamp),
					nowDateYear = nowDate.getFullYear(),
					nowDateMonth = nowDate.getMonth()+1,
					nowDateDay = nowDate.getDate(),
					nowNewDate = `${nowDateYear}-${nowDateMonth}-${nowDateDay}`;
	           	    if(type=="prev"){
	           	  		let obj = {
				            key: 'departDate',
				            val:{
				            	year: beforeYear,
						        month: beforeMonth,
						        date: beforeDay,
						        day: beforeWeek
				            }
			            }
						try{
							this.initData(obj);
						}catch(e){}
		        
	           	    }else if(type=="next"){
						let obj = {
							key: 'departDate',
							val:{
								year: afterYear,
								month: afterMonth,
								date: afterDay,
								day: afterWeek
							}
						}
						try{
							this.initData(obj);
						}catch(e){}
			            
					}
					  //判断前一天是否需要置灰
	           	    if(nowNewDate == `${this.departDate.year}-${this.departDate.month}-${this.departDate.date}`){
	           	   		this.prevChangeColor = true;
	           	   		
	           	    }else{
	           	   		this.prevChangeColor = false;
	           	   		
	           	    }
	           	   //返程判断前一天需要置灰
	           	    if(this.chosenBackTrip){
	           	   		if(this.departDate.year == this.backDate.year && this.departDate.month == this.backDate.month && this.departDate.date == this.backDate.date){
	           	   			this.prevChangeColor = true;
	           	   		}else{
	           	   			this.prevChangeColor = false;
	           	   		}

	           	    }
	           	   //判断后一天需要置灰
	           	 	let allMonthInfos = this.allMonthInfos,
	           	 		allLength = allMonthInfos.length-1,
	           	 		ninetyLast = allMonthInfos[allLength],
	           	 		ninetyMonth = ninetyLast.month,
	           	 		ninetyYear = ninetyLast.year,
	           	 		lastDays = "";
	           	 		if(ninetyMonth == "2"){
	           	 			lastDays = this.judgeFebruary(ninetyYear);
	           	 		}else if(ninetyMonth != "2"){
	           	 			lastDays = this.judgeMonthDays(ninetyMonth);
	           	 		}
	           	 		
	           	 		
	           	 		if(`${this.departDate.year}-${this.departDate.month}-${this.departDate.date}` == `${ninetyYear}-${ninetyMonth}-${lastDays}`){
	           	 			this. nextChangeColor = true;
	           	 		}else{
	           	 			this. nextChangeColor = false;
	           	 		}
	           	
			},
			//判断二月天数
            judgeFebruary(Year) {
	            	
	                let isLeapYear = (Year % 4 === 0) && ((Year % 100 !== 0) || (Year % 400 === 0)) ? true : false;
	                if (isLeapYear) {
	                    return 29;
	                } else {
	                    return 28;
	                }
	         },
	          //判断其它月份天数
	         judgeMonthDays(month) {
	                if (month == 1 || month == 3 || month == 5 || month == 7 || month == 8 || month == 10 || month == 12) {
	                    return 31;
	                } else if (month == 4 || month == 6 || month == 9 || month == 11) {
	                    return 30;
	                } else {
	                    return this.judgeFebruary(this.ninetyYear);
	                }
	          },
			//点击前一天
            prevClick(){
            	let nowTime = new Date().getTime();
            	this.nowTime = nowTime;

            	if(this.prevChangeColor == true){
            		return;
            	}
            	
	           	this.preNextDay("prev");
				this.isTime = `${this.departDate.year}-${this.departDate.month}-${this.departDate.date}`;
            	this.getFlightListInfo(this.flightDetail.departureCityCode,this.flightDetail.arrivalCityCode,this.isTime,this.flightDetail.orderId,this.flightDetail.carrierCode);
            },
            //点击后一天
            nextClick(){
            	let nowTime = new Date().getTime();
            	this.nowTime = nowTime;

            	if(this.nextChangeColor == true){
            		return;
            	}
            	this.preNextDay("next");
            	let departcityCode = this.$route.params.goCityCode;
				let arrivalCityCode = this.$route.params.backCityCode;
				this.isTime = `${this.departDate.year}-${this.departDate.month}-${this.departDate.date}`;

            	this.getFlightListInfo(this.flightDetail.departureCityCode,this.flightDetail.arrivalCityCode,this.isTime,this.flightDetail.orderId,this.flightDetail.carrierCode);
			},
			//跳转日期页
            toSelectDate(){
				this.$router.push(`/${this.$parent.baseUrlPath}/datePicker/departDate/changeFlightList`);
            },
		},
		created(){

  		},
  		activated(){
			this.preNextDay();
			this.flightDetail=this.endorseInfo.flightDetail
			this.depart=this.flightDetail.departureCityName;
			this.dest=this.flightDetail.arrivalCityName;
			this.isTime = `${this.departDate.year}-${this.departDate.month}-${this.departDate.date}`;
			this.getFlightListInfo(this.flightDetail.departureCityCode,this.flightDetail.arrivalCityCode,this.isTime,this.flightDetail.orderId,this.flightDetail.carrierCode);
		},
		mounted(){
           
        },
	}
</script>
<style lang="scss" scoped>
@import '../../style/mixin';
.changeFlightList{
	@include wh(100%,100%);
	position: relative;
	.panels{
		@include wh(100%,0.8rem);
		@include heightByAbsolute(0.9rem,0);
	    padding: 0 0.2rem;
	    background-color: #ffffff;
	    margin-top: 0;
	    z-index: 2;
		@include topline();
		.timeLeft{
			@include ct();
			@include sc(.22rem,$c33);
			text-align: center;
			padding-left: 0.4rem;
    		padding-right: 0.4rem;
			> span{
				position: relative;
    			display: block;
			}
		}
		.timeLeft:before{
			@include wh(0.12rem,0.12rem);
			@include ctr(45deg);
			content: "";
		    left: 0.06rem;
		    border-left: 1px solid #333;
		    border-bottom: 1px solid #333;
		}
		.gray{
			@include sc(.24rem,#aaa);
			>span{
				color:#aaa;
			}
		}
		.gray:before{
			border-left: 1px solid #aaa;
		    border-bottom: 1px solid #aaa;
		}
		.nextGray{
			>span{
				color:#aaa;
			}
		}
		.nextGray:before{
			border-right: 1px solid #aaa;
		    border-bottom: 1px solid #aaa;
		}
		.timeContent{
			background: url('//m.lvmama.com/flight/image/date_icon.png') no-repeat;
			background-size: 100%;
	        position: relative;
			line-height: 0.56rem;
		    @include wh(3.1rem,0.56rem);
		    margin: 0.14rem auto;
			>span{
				font-size: .24rem;
				color: #fff;
				line-height: .56rem;
				padding-left: .8rem;
			}
		}
		.timeContent:after {
			content: "";
			position: absolute;
			top: .165rem;
			width: 0.12rem;
			height: 0.12rem;
			right: .75rem;
			border-right: 1px solid #fff;
			border-bottom: 1px solid #fff;
			transform: rotate(45deg);
		}
		.timeRight{
			@include ct();
			@include sc(.22rem,$c33);
			text-align: center;
			padding-left: 0.4rem;
    		padding-right: 0.4rem;
    		right: .2rem;
			> span{
				position: relative;
    			display: block;
			}
		}
		.timeRight:before{
			@include wh(0.12rem,0.12rem);
			@include ctr(-45deg);
			content: "";
		    right: 0.06rem;
		    border-right: 1px solid #333;
		    border-bottom: 1px solid #333;
		}
	}
	.isScroll{
    	@include heightByAbsolute(1.88rem,0);
    	overflow: hidden;
    	overflow-y: scroll;
    	.notice_container {
    		margin-top: 0;
    	}
    	.flight_list_content {
    		width: 100%;
    		overflow-x: hidden;
    		padding-bottom: .3rem;
			margin-top: 0.1rem;
			.title{
				@include sc(.24rem,#666);
				margin: .1rem .3rem .2rem;
			}
		}
		.wantFlight{
			@include cl;
			@include sc(.26rem,#666);
			background-color: #FFFFFF;
			border: 1px solid #ddd;
			padding: .12rem .3rem;
			border-radius: 1rem;
			margin-bottom: .6rem;
		}
	}
	.noFlight{
		width: 100%;
		@include center;
		z-index: 3;
		text-align: center;
		i{
			display: inline-block;
			@include wh(0.5rem,0.65rem);
			background: url("//m.lvmama.com/flight/image/search_not_res.png") no-repeat;
			background-size: 100%;
		}
		p{
			@include sc(0.28rem,#333);
			margin: .1rem auto .25rem;
		}
		.wantFlight{
			@include cl;
			@include sc(.26rem,#666);
			background-color: #FFFFFF;
			border: 1px solid #ddd;
			padding: .12rem .3rem;
			border-radius: 1rem;
			margin-bottom: 1rem;
		}
	}
}
</style>