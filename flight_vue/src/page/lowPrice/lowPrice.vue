<template>
	<div class="lowPrice">
		<head-top  :depart="title" :goPage="goPage"></head-top>
		<div class="article specialTicket-wrap" :class="{'overf':showMonth}">
			<div class="lowprice-search">
				<div>
					<span><router-link to="/flight/cityPicker/departureCity/lowPrice">出发：{{departureCity.name}}<span></span></router-link></span>
					<span><router-link to="/flight/cityPicker/arrivalCity/lowPrice">到达：{{arrivalCity.name}}<span></span></router-link></span>
					<span @click="showDepartDate()" :class="{'actity-special':showMonth}">日期：{{selectedMonth.value}}<span :class="{'daoSanjiao':showMonth}"></span></span>
				</div>
			</div>
			<div class="matte" v-if="showMonth" @click="showDepartDate()"></div>
			<div class="chooseMonth" v-if="showMonth">
				<div :class="{'selected':selectedMonth.key==month.key}" v-for="(month,index) in monthList" :key="index" @click="selectMonthClick(month,index)" >{{month.value}}</div>
			</div>
			<div class="showHistogramList" v-if="specialFlightList != null &&specialFlightList.length>0">
				<p id="currentMonth">{{currentMonth}}</p>
				<div class="showHistogram">
					<ul class="lowestPriceList">
						<li class="lowestPrice" v-for="lowprice in lowpriceList" :class="{'lowest':minPrice==lowprice.price,'differ':lowprice.hidePink==false}" @click="searchFlight(lowprice)">
							<span>{{lowprice.date}}</span>
							<span class="week">{{lowprice.week.substring(1,2)}}</span>
							<b v-if="lowprice.hidePink==false">{{lowprice.month.substring(3,5)}}</b>
							<div v-show="lowprice.hidePink!=false">
								<span class="eachLowprice">&#165;{{lowprice.price}}</span>
								<div class="maxLowprice">
									<div class="eachLowpriceHeight"></div>
								</div>
							</div>
						</li>
					</ul>
				</div>
				<div class="labelLow">
					<span>&yen;{{minPrice}}</span>
				</div>
			</div>
			<div class="lowprice-container">
				<p v-show="specialFlightList != null &&specialFlightList.length>0">低价航班</p>
				<div class="ineffectiveness" v-if="noFLight && specialFlightList.length<=0">
					<img class="specialTicket-empty" src="//m.lvmama.com/flight/image/empty.png">
					<p class="specialTicket-error">很抱歉，没有找到符合筛选条件的航班<br>您可以修改筛选条件试试</p>
				</div>
				<div v-show="specialFlightList != null &&specialFlightList.length>0">
					<div v-for="(specialFlight,index) in flightList" :key="index" v-if="index<8" @click="searchFlight(specialFlight)">
						<div class="flight-left">
							<div class="top">
								<span class="flight-date">{{specialFlight.deptDate}}</span>
								<span class="flight-week">{{specialFlight.week}}</span>
							</div>
							<div class="middle">
								<span>{{specialFlight.departureTime.substring(11,16)}}</span>
								<i></i>
								<span>{{specialFlight.arriveTime.substring(11,16)}}</span>
							</div>
							<div class="bottom">
								<i><airlines-logo :logoKind="specialFlight.carrierCode"></airlines-logo></i>
								{{specialFlight.carrierName}}{{specialFlight.flightNO}}
								<span v-if="specialFlight.seatClassType=='Y' ">经济舱</span>
								<span v-if="specialFlight.seatClassType=='C' ">公务舱</span>
								<span v-if="specialFlight.seatClassType=='F' ">头等舱</span>
							</div>
						</div>
						<div class="flight-right">
							<span><i>&yen;</i>{{specialFlight.parPrice}}<i>起</i></span>
						</div>
					</div>
					<p>*以实际购买价格为准</p>
				</div>
			</div>
		</div>		
	</div>
	
</template>
<script>
	import headTop from '../../components/header/head'
	import { mapState,mapActions } from 'vuex'
	import airlinesLogo from '../../components/common/airlinesLogo'
	import { getLowestPriceForFlight,getLowestPriceNewFlight} from '../../service/getData'
	import { setStore,getStore,getBookingSource,getNoticeSource,formatIOSDate,standardDate,weekFormat,monthStr,getStatisticsType,getElementTag} from '../../config/mUtils'
	export default {
        data(){
            return{
                title: '低价走势',
                goPage:'travelHelper',
                showMonth:false,
                startDate:'',
                endDate:'',
                specialFlightInfor:'',
                specialFlightList:[],
                lowpriceList:[],
                minPrice:'',
                flightList:[],
                monthList:[],
                selectedMonth:'',
                currentMonth:'',
                monthIndex:'',
                perWidth:'',
                isLoadEnd:'',
				wrapWidth:'',
				differMounth:'',
				noFLight: false,
            }
        },
        components: {
            headTop,airlinesLogo
        },
        created() {

        },
        mounted(){
        	
        },
        methods: {
        	lowPriceFlight(){    
        		let lowpriceListArr=[];   
		    	for (var i =0; i <91; i++) {
		    		var lowpriceList={
				    	"deptDate":"",
				    	"week":"",
				    	"price":"查看",
				    	"height":""
					}
					
		        	lowpriceList.deptDate=standardDate(this.nowDateStamp+i*24*60*60*1000);
		    		lowpriceList.week =weekFormat(new Date(formatIOSDate(lowpriceList.deptDate)).getDay());
		        	lowpriceListArr.push(lowpriceList);
		        }
		        let finalLowpriceList = [];
		        let monthBegin = [];
		        let differMounth = [];
		        for (var a = 0; a < lowpriceListArr.length; a++) {
		        	lowpriceListArr[a].month = lowpriceListArr[a].deptDate.substring(5,7);
		        	lowpriceListArr[a].date = lowpriceListArr[a].deptDate.substring(8,10);
		        	finalLowpriceList.push(lowpriceListArr[a]);
		        	if (a > 0 && lowpriceListArr[a].deptDate.substring(8,10) == '01') {
		        		monthBegin.push(a);
		        		differMounth.push(lowpriceListArr[a].deptDate.substring(5,7));
		        	};
		        	this.differMounth=differMounth;
		        };
		        for (var j = 0; j < monthBegin.length; j++) {
		        	monthBegin[j] = monthBegin[j] + j;
		        	var objDiffer = {
	        			"deptDate":"",
				    	"week":"",
				    	"price":"0",
				    	"height":"0",
				    	"month": finalLowpriceList[monthBegin[j]-1].month+"~"+finalLowpriceList[monthBegin[j]].month,
				    	"date": "",
				    	"hidePink":false
	        		};
	        		finalLowpriceList.splice(monthBegin[j],0,objDiffer);
		        };
		        this.lowpriceList = finalLowpriceList;
	    	},

	    	getDaysInMonth(year, month) {
                return ((month === 2) && (year % 4 === 0) && ((year % 100 !== 0) || (year % 400 === 0))) ? 29  : monthDay[month]
        	},

        	getDayPrice(){
	            var monthArr=[0];
	            var date = this.nowDateStamp+90*24*60*60*1000;
	            var newDate = new Date(date);
	            var nowDate = new Date(this.nowDateStamp);
	            var nowMonth= nowDate.getMonth()+1;
	            var newMonth = newDate.getMonth()+1;
	            if (nowMonth<=newMonth) {
	                while(nowMonth<=newMonth){
	                    monthArr.push(nowMonth);
	                    nowMonth++;
	                }
	            }else{
	                while(nowMonth<=12){
	                    monthArr.push(nowMonth);
	                    nowMonth++;
	                }
	                var i = 1;
	                while(i<=newMonth){
	                    monthArr.push(i);
	                    i++;
	                }
	            }
	            return monthArr;
	        },

	        selectMonthClick(month,index){
	            this.monthIndex = index;
	            let startDate ='';
	            this.showMonth=false;
	            this.selectedMonth = month;
	            this.selectedMonth1 = month.key > 9 ? month.key: '0' + month.key;
	            this.flightList =[]
	            if (month.key==0) {
	                this.flightList=this.specialFlightList;
	            }else{	            	
	                var nowMonth = new Date(this.nowDateStamp).getMonth()+1;
	                if (month.key<nowMonth) {//选中的月份小于当前的月份，则年份+1
	                    startDate = new Date(this.nowDateStamp).getFullYear()+1+'-'+month.key+'-'+'01';
	                }else if(month.key>nowMonth){//选中的月份大于当前的月份，则是当年
	                    startDate = new Date(this.nowDateStamp).getFullYear()+'-'+month.key+'-'+'01';
	                }else if(month.key==nowMonth){//选中的月份等于当前的月份，则是当前月
	                    startDate = standardDate(this.nowDateStamp);
	                }
	                for (var i = 0; i < this.specialFlightList.length; i++) {
		             	var selectMonth=new Date(formatIOSDate(this.specialFlightList[i].deptDate)).getMonth();

		             	if(new Date(formatIOSDate(startDate)).getMonth()==selectMonth){
		             		this.flightList.push(this.specialFlightList[i])
		             	}
		             }
	            }
        	},
        	showDepartDate(){
        		if(this.departureCity.code!=this.arrivalCity.code){
        			this.showMonth=!this.showMonth;
        		}
	            
	        },
	        scrollToMon(index){
	            if (index == 1 || index == 0) {
	                document.querySelectorAll('.showHistogram')[0].scrollLeft = 0;
	                this.currentMonth = this.lowpriceList[0].month+'月';
	            } else {                
	                document.querySelectorAll('.showHistogram')[0].scrollLeft = document.querySelectorAll('.differ')[index-2].offsetLeft +this.perWidth;

	                this.currentMonth = this.differMounth[index-2]+'月';
	            }
	            document.getElementById("currentMonth").innerHTML = this.currentMonth;
	        },
	        loadend(){
            	this.isLoadEnd = true;
	            if (document.querySelectorAll('.differ')[0].offsetLeft > document.querySelectorAll('.showHistogram')[0].clientWidth) {
	                this.currentMonth = this.lowpriceList[0].month;
	            } else {
	                this.currentMonth = this.lowpriceList[0].month + '~' + this.differMounth[0];
	            }
	            document.getElementById("currentMonth").innerHTML = this.currentMonth+'月';
        	},
        	searchFlight(flight){
	            if(flight.height==0){
	                return;
	            }
				setStore("goFlight","low");
				window.location.href="//m.lvmama.com/"+this.$parent.baseUrlPath+"/"+this.departureCity.code+"-"+this.arrivalCity.code+"/"+flight.deptDate;
	            // this.$router.push(`/${this.$parent.baseUrlPath}/${this.departureCity.code}-${this.arrivalCity.code}/${flight.deptDate}`);
	        },
	        getPrice() {
	        	let monthDay = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
	        	this.lowPriceFlight();
	            this.startDate=standardDate(this.nowDateStamp);
	            this.endDate=standardDate(new Date(this.nowDateStamp+90*24*60*60*1000));
	            this.monthList = monthStr(this.getDayPrice());
	            if (this.monthList && this.monthList.length>0 && this.selectedMonth=='') {
		            this.selectedMonth = this.monthList[0];
		        }
	            let priceObj={
	            	deptCities:this.departureCity.code,
	            	arrCities:`&arrCities=${this.arrivalCity.code}`,
	            	startDate:this.startDate,
	            	endDate:this.endDate,
	            	topAirLine:'',
	            	topDate:90,
	            	priceLowest:'',
	            	priceHigest:'',
	            	bookingSource:(navigator.userAgent.indexOf('Mobile') > 0&& navigator.userAgent.indexOf('LVMM')>0)?'APP':'WAP',
	            }
            	if (this.departureCity.code!=this.arrivalCity.code) {
            		this.specialFlightList=[];	   
            		getLowestPriceNewFlight(priceObj).then((val) => {
	            		this.specialFlightList=[];
	            		this.$parent.showLoading = true;
	            		if (val.data.length == 1) {        
	            			let rows=val.data;          	
		                	this.specialFlightInfor = rows[0];
		                    let specialFlightList = rows[0].flightDailyPriceOfCityDtoList;
		                    let flightList=specialFlightList;
		                    function sortNumber(a,b){
								return a - b
							}
							var priceArray = [];
		                    for (var i = 0; i < specialFlightList.length; i++) {
		                        specialFlightList[i].week = weekFormat(new Date(specialFlightList[i].deptDate).getDay());
		                        priceArray.push(specialFlightList[i].parPrice);
		                        priceArray.sort(sortNumber);
								
		                        for (var j = 0; j < this.lowpriceList.length; j++) {
		                        	if(this.lowpriceList[j].deptDate==specialFlightList[i].deptDate){
		                        		this.lowpriceList[j].price=specialFlightList[i].parPrice;
		                        		break;
		                        	}                  		
		                        };
		                    }

		              		var maxPrice=priceArray[specialFlightList.length-1];
							this.minPrice=priceArray[0];
		                    if (this.selectedMonth1 != undefined && this.selectedMonth1 != 0) {
		                        flightList = [];
		                        for (var a = 0; a < specialFlightList.length; a++) {
		                            if (specialFlightList[a].deptDate.substring(5,7) == this.selectedMonth1) {
		                                flightList.push(specialFlightList[a]);
		                            }
		                        }
		                    }
		                    this.flightList=flightList;
		                    this.specialFlightList=specialFlightList;
		                    this.$nextTick(() => {
				            	this.loadend();
				        	});
				        	this.$parent.showLoading = false;
				        	this.noFLight = true;
		                }else{
		                    //没有符合条件的航班
		                    this.specialFlightList=[];
		                    this.$parent.showLoading = false;
		                    this.noFLight = true;
		                }
		                let that=this;
		                setTimeout(function(){
		                	
	                    	var o = document.getElementsByClassName("maxLowprice")[0];
	                    	var k = document.getElementsByClassName("lowestPrice")[0];

							var h = o.offsetHeight; //高度
							var x = h/maxPrice;
							var w = k.offsetWidth;	
							var l = k.offsetLeft;
	                        this.perWidth = w + l;					
							document.getElementsByClassName('lowestPriceList')[0].style.width=95*(w+l)+l+"px";
				            for (var j = 0; j < 95; j++) {
								try {
									var xh = x*that.lowpriceList[j].price;
									that.lowpriceList[j].height=parseInt(xh);
									if(that.lowpriceList[j].price=='查看'){
										that.lowpriceList[j].height =parseInt(x*that.minPrice);
									}
									document.getElementsByClassName('eachLowpriceHeight')[j].style.height=that.lowpriceList[j].height+"px";
									document.getElementsByClassName('eachLowprice')[j].style.bottom=that.lowpriceList[j].height+2+"px";
								} catch (e) {
									
								}
				            	
					    		
							}
							document.getElementsByClassName('labelLow')[0].style.height=parseInt(x*that.minPrice)+"px";
				        },100);
	            	
			        },()=>{
			        	this.specialFlightList=[];    
			        });
				}else{
	                //没有符合条件的航班
	                this.specialFlightList=[];
	                this.noFLight = true;
	            };
            }
        },
        activated() {
        	this.specialFlightList=null;
        	this.noFLight = false;
            this.getPrice();
			this.$nextTick(() => {
				let that = this;
	            document.querySelectorAll('.specialTicket-wrap')[0].addEventListener('touchstart',function(e){
	            	let wrapWidth = document.querySelectorAll('.showHistogram')[0].clientWidth;
	                // if(this.isLoadEnd) {
	                	let differMounth=that.differMounth;
	                    var leftArr = document.querySelectorAll('.differ');
	                    document.querySelectorAll('.showHistogram')[0].addEventListener('touchmove', function(e){
	                        if (leftArr.length == 2) {
	                            if(e.currentTarget.scrollLeft < leftArr[0].offsetLeft - wrapWidth){
	                                that.currentMonth = that.lowpriceList[0].month;
	                            } else if (e.currentTarget.scrollLeft > leftArr[0].offsetLeft - wrapWidth + that.perWidth && e.currentTarget.scrollLeft < leftArr[0].offsetLeft) {
	                                that.currentMonth = that.lowpriceList[0].month + '~' + differMounth[0];
	                            } else if (e.currentTarget.scrollLeft > leftArr[0].offsetLeft && e.currentTarget.scrollLeft < leftArr[1].offsetLeft - wrapWidth) {
	                                that.currentMonth = differMounth[0];
	                            } else if (e.currentTarget.scrollLeft > leftArr[1].offsetLeft - wrapWidth + that.perWidth && e.currentTarget.scrollLeft < leftArr[1].offsetLeft) {
	                                that.currentMonth = differMounth[0] + '~' + differMounth[1];
	                            } else if (e.currentTarget.scrollLeft > leftArr[1].offsetLeft) {
	                                that.currentMonth = differMounth[1];
	                            };
	                        } else if (leftArr.length == 3) {
	                            if(e.currentTarget.scrollLeft < leftArr[0].offsetLeft - wrapWidth){
	                                that.currentMonth = that.lowpriceList[0].month;
	                            } else if (e.currentTarget.scrollLeft > leftArr[0].offsetLeft - wrapWidth + that.perWidth && e.currentTarget.scrollLeft < leftArr[0].offsetLeft) {
	                                that.currentMonth = that.lowpriceList[0].month + '~' + differMounth[0];
	                            } else if (e.currentTarget.scrollLeft > leftArr[0].offsetLeft && e.currentTarget.scrollLeft < leftArr[1].offsetLeft - wrapWidth) {
	                                that.currentMonth = differMounth[0];
	                            } else if (e.currentTarget.scrollLeft > leftArr[1].offsetLeft - wrapWidth + that.perWidth && e.currentTarget.scrollLeft < leftArr[1].offsetLeft) {
	                                that.currentMonth = differMounth[0] + '~' + differMounth[1];
	                            } else if (e.currentTarget.scrollLeft > leftArr[1].offsetLeft && e.currentTarget.scrollLeft < leftArr[2].offsetLeft - wrapWidth) {
	                                that.currentMonth = differMounth[1];
	                            } else if (e.currentTarget.scrollLeft > leftArr[2].offsetLeft - wrapWidth + that.perWidth && e.currentTarget.scrollLeft < leftArr[2].offsetLeft) {
	                                that.currentMonth = differMounth[1] + '~' + differMounth[2];
	                            } else if (e.currentTarget.scrollLeft > leftArr[2].offsetLeft) {
	                                that.currentMonth = differMounth[2];
	                            };
	                        }
	                        that.differMounth=differMounth;
	                        // console.log(that.currentMonth)
	                         if(that.currentMonth.indexOf("月")!=-1){
	                            document.getElementById("currentMonth").innerHTML = that.currentMonth;
	                        }else{
	                            document.getElementById("currentMonth").innerHTML = that.currentMonth+'月';
	                        }
	                    }, false)
	                // }
	            });
	        
	        })
			getStatisticsType('机票-低价走势','FlightLowpriceTrend');
	    },
        watch: {
        	monthIndex(newVal,oldVal) {
        		if (newVal == undefined ) {
                
            	} else {
	                if (newVal != oldVal) {
	                    this.scrollToMon(newVal);
	                }
            	}
            }
        },
        computed:{
        	...mapState([
        		'departureCity',
        		'arrivalCity',
        		'nowDateStamp'
        	])
        }
    }
</script>

<style lang="scss" scoped>
    @import '../../style/mixin';
.lowPrice{
	height: 100%;
	>div.article{
		height: 100%;
	    -webkit-overflow-scrolling: touch;
	    overflow-scrolling: touch;
	    position: relative;
		overflow-y: auto;
		background-color: #eeeef5;
	}
	>div.overf{
		overflow-x: hidden;
	}
	.lowprice-search{
		height: 0.8rem;
	    position: relative;
	    background: #ffffff;
	    >div{
	    	position: absolute;
		    bottom: .1rem;
		    width: 100%;
		    >span:first-child{
		    	margin-left: .15rem;
		    }
		    >span{
		    	display: inline-block;
				line-height: .68rem;
				border: 1px solid #dfdfdf;
				@include borderRadius(.1rem);
				@include wh(2.24rem,.68rem);
				background-color: #fff;
				@include sc(.24rem,#000);
				text-align: center;
				margin-right: 0.1rem;
			    
			    span{
			    	display: inline-block;
				    @include wh(0,0);
				    border-width: .08rem .08rem 0;
				    border-color: #9f9f9f transparent;
				    border-style: solid;
				    margin-left: .1rem;
				    margin-bottom: .05rem;
			    }
			    .daoSanjiao {
				    border-width: 0 .08rem .08rem;
				}
		    }
		    >span.actity-special{
		    	height: .8rem;
			    position: absolute;
			    top: 0;
			    z-index: 99;
			    border-bottom: none;
			    border-bottom-left-radius: 0;
			    border-bottom-right-radius: 0;
			    margin-left: .1rem;
		    }
	    }
	}
	.matte{
		@include wh(100%,100%);
	    background-color: rgba(0,0,0,.5);
	    position: fixed;
	    top: 0;
	    left: 0;
	    margin-top: 3rem;
    	z-index: 8;
	}
	.chooseMonth {
	    position: absolute;
	    background-color: #fff;
	    border-top: 1px solid #dfdfdf;
	    width: 100%;
	    margin-top: 0;
		padding: 0.2rem;
    	padding-right: 0;
		@include sc(.24rem,#333);
	    z-index: 9;
	    >div{
			@include wh(31%,.8rem);
			float: left;
			text-align: center;
			line-height: .8rem;
			border: 1px solid #ccc;
			margin: 0 2% .2rem 0;
			border-radius: .06rem;
	    }
	    >div.selected{
	    	border-color: #f80;
	    }
	}
	.showHistogramList{
		margin: .1rem .1rem .2rem;
	    border-radius: 5px;
	    background-color: #fff;
	    padding-top: .16rem;
	    position: relative;
	    >p {
			@include sc(.2rem,#333);
			text-align: center;
		}
		.showHistogram {
		    height: 2.88rem;
		    padding-top: .15rem;
		    line-height: .36rem;
		    overflow-x: auto;
		    -webkit-overflow-scrolling: touch;
		    overflow-scrolling: touch;
		    position: relative;
		    z-index: 3;
			>ul {
				@include wh(100rem,2.72rem);
			    overflow-x: auto;
			    position: relative;
			    overflow-y: hidden;
			    >li.lowest>div .eachLowpriceHeight {
				    background-color: #FF6600;
				}
				>li {
					@include wh(.68rem,100%);
				    float: left;
				    text-align: center;
				    position: relative;
				    margin-left: .16rem;
				    >span:first-child {
						@include sc(.2rem,#333);
					    display: block;
					}
					>span.week {
						@include sc(.2rem,#999);
					    display: block;
					}
					>div {
						@include sc(.24rem,#9f9f9f);
						@include wh(100%,1.78rem);
					    background-color: #FBEDF1;
					    position: absolute;
					    bottom: 0;
					    border-radius: 3px 3px 0 0;
					    >span {
							@include sc(.2rem,#999);
							@include w(100%);
							@include cl();
						    bottom: 23px;						    
						}
						>div{
							@include wh(100%,1.42rem);
						    position: absolute;
						    bottom: 0;
						    div {
							    background-color: #FE3C71;
							    position: absolute;
							    bottom: 0;
							    @include w(100%);
							    border-radius: 3px 3px 0 0;
							}
						}
					}
					b{
						font-weight: bold;
					}
				}
			}
		}
		.labelLow {
			@include wh(100%,40px);
		    position: absolute;
		    color: #fff;
		    border-top: 1px #ff8800 dashed;
		    bottom: 0;
		    pointer-events: none;
		    z-index: 6;
		    >span {
			    background: url('//m.lvmama.com/flight/image/low-price.png') no-repeat;
			    background-size: cover;
			    position: absolute;
			    left: 0;
			    top: 0;
			    -webkit-transform: translateY(-50%);
			    transform: translateY(-50%);
				text-align: center;
				@include sc(.2rem,#fff);
				@include wh(.85rem,.28rem);
			    line-height: .28rem;
			}
		}
	}
	.lowprice-container{
		margin-top: .2rem;
		.ineffectiveness {
		    text-align: center;
		    margin-top: 3.8rem;
		    >img{
		    	width:0.5rem;
		    }
		    >p{
		    	@include sc(.28rem,#333);
		    }
		}
		>p {
		    @include sc(.24rem,#666);
		    margin: 0 0 .2rem .2rem;
		}
		>div{
			padding: 0 .1rem 1rem;
			>div{
				@include h(1.76rem);
			    line-height: .3rem;
			    position: relative;
			    background-color: #fff;
			    border-radius: .1rem;
			    margin-bottom: .1rem;
			    .flight-left {
					@include w(66%);
				    float: left;
					padding-left: .2rem;
					@include sc(.3rem,#000);
				    .top {
					    @include sc(.22rem,#999);
					    margin: .25rem 0 .18rem;
					    height: .3rem;
					    line-height: .3rem;
					    .flight-date{
							color: #9f9f9f;
					    }
					    .flight-week {
						    color: #9f9f9f;
						    padding-left: .1rem;
						}
					}
					.middle {
						@include sc(.4rem,#000);
					    margin-bottom: .27rem;
					    position: relative;
					    >i {
							@include wh(1.3rem,.2rem);
							position: absolute;
							left: 1.6rem;
							top: .02rem;
						    background: url('//m.lvmama.com/flight/image/jiantou.png') right no-repeat;
						    -webkit-background-size: 1.3rem;
						    background-size: 1.3rem;
						}
						>span:last-child {
						    padding-left: 2.3rem;
						}
					}
					.bottom {
						@include sc(.22rem,#9f9f9f);
					    position: relative;
					    padding-left: .4rem;
					    >i {
						    position: absolute;
						    top: 62%;
						    left: 0;
						    -webkit-transform: translateY(-62%);
							transform: translateY(-62%);
							@include wh(.28rem,.3rem);
						    -webkit-background-size: contain;
						    background-size: contain;
						}
						>span{
							color: #9f9f9f;
						}
						span:last-of-type:before {
						    content: "";
							display: inline-block;
							@include wh(.1rem,.16rem);
						    border-right: 1px solid #aaa;
						    box-sizing: border-box;
						    margin-right: .12rem;
						}
					}
				}
				.flight-right {
					@include wh(31%,1.8rem);
				    line-height: 1.8rem;
				    float: left;
				    text-align: right;
				    font-size: .3rem;
				    >span{
				    	@include sc(.4rem,#FF6600);
					    padding-left: .1rem;
						font-weight: 600;
					    >i{
							@include sc(.24rem,#FF6600);
					    }
					    >i:last-child{
					    	color: #9f9f9f;
					    }
				    }
				}
			}
			// >div:after {
			//     content: "";
			//     width: .16rem;
			//     height: .16rem;
			//     border-right: 1px solid #aaa;
			//     border-bottom: 1px solid #aaa;
			//     position: absolute;
			//     right: .2rem;
			//     top: 50%;
			//     -webkit-transform: rotate(-45deg) translateY(-50%);
			//     transform: rotate(-45deg) translateY(-50%);
			// }
			>p{
				@include sc(.22rem,#999);
			    margin: .2rem 0 .3rem .2rem;
			}	
		}

	}
}
</style>
