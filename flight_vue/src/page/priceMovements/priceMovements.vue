<template>
	<div class="lowPrice">
		<!-- <head-top  :depart="title" :goPage="goPage"></head-top> -->
		<head-top :depart="depart" :dest="dest" :goPage="goPage" :isShowDate="isShowDate" :lowPriceMoent="lowPriceMoent" :rightMenu="rightMenu" @rightHandler="toEdit"></head-top>
		<div class="article specialTicket-wrap" :class="{'overf':showMonth}">
			<!-- <div class="lowprice-search">
				<div>
					<span><router-link to="/flight/cityPicker/departureCity/lowPrice">出发：{{departureCity.name}}<span></span></router-link></span>
					<span><router-link to="/flight/cityPicker/arrivalCity/lowPrice">到达：{{arrivalCity.name}}<span></span></router-link></span>
					<span @click="showDepartDate()" :class="{'actity-special':showMonth}">日期：{{selectedMonth.value}}<span :class="{'daoSanjiao':showMonth}"></span></span>
				</div>
			</div> -->
			<div class="matte" v-if="showMonth" @click="showDepartDate()"></div>
			<div class="chooseMonth" v-if="showMonth">
				<div :class="{'selected':selectedMonth.key==month.key}" v-for="(month,index) in monthList" :key="index" @click="selectMonthClick(month,index)" >{{month.value}}</div>
			</div>
			<div class="showHistogramList" v-if="specialFlightList != null &&specialFlightList.length>0">
				<!-- <p id="currentMonth">{{currentMonth}}</p> -->
				<div class="showHistogram">
					<ul class="lowestPriceList">
						<li class="lowestPrice" v-for="lowprice in lowpriceList" :class="{'lowest':minPrice==lowprice.price,'differ':lowprice.hidePink==false}" @click="searchFlight(lowprice)">
							
							<b v-if="lowprice.hidePink==false">{{lowprice.month.substring(3,5)}}</b>
							<div v-show="lowprice.hidePink!=false">
								<span class="eachLowprice"><i>&#165;</i>{{lowprice.price}}</span>
								<div class="maxLowprice">
									<div class="eachLowpriceHeight"></div>
								</div>
							</div>
							<span class="date" v-if="lowprice.month.indexOf('~')==-1">{{lowprice.month}}-{{lowprice.date}}</span>
							<span class="week" v-if="lowprice.month.indexOf('~')==-1">周{{lowprice.week.substring(1,2)}}</span>
						</li>
					</ul>
				</div>
				<!-- <div class="labelLow" v-bind:class="{'changeLine':percentNum==''||!lowPriceInfor.lapShow}">
					
				</div> -->
				<!-- <div class="new_label_low between_x_flex" v-if="percentNum!='' && lowPriceInfor.lapShow">
					<span>当前价格&yen;{{currentPrice}}</span>
					<span>{{percentNum}}</span>
				</div> -->
				<div class="new_label_low between_x_flex" v-if="currentPrice&&currentPrice!='查看'">
					<span>当前价格&yen;{{currentPrice}}</span>
					<span>{{percentNum}}</span>
				</div>
				
			</div>
			<div class="lowprice-container">
				<p v-show="specialFlightList != null &&specialFlightList.length>0">低价航班</p>
				<div class="ineffectiveness" v-if="noFLight && specialFlightList.length<=0">
					<img class="specialTicket-empty" src="//m.lvmama.com/flight/image/empty.png">
					<p class="specialTicket-error">抱歉，查询不到满足条件的航班<br>您可以修改查询条件试试。</p>
				</div>
				<div v-show="specialFlightList != null &&specialFlightList.length>0">
					<div v-for="(specialFlight,index) in flightList" :key="index" v-if="index<5" @click="searchFlight(specialFlight)">
						<div class="flight-left">
							<div class="top">
								<span class="flight-date">{{specialFlight.deptDate}}</span>
								<span class="flight-week">{{specialFlight.week}}</span>
							</div>
							<div class="middle">
								<span>{{specialFlight.departureTime | desT}}</span>
								<i></i>
								<span>{{specialFlight.arriveTime}}</span>
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
							<span><i>&yen;</i>{{specialFlight.parPrice}}</span>
						</div>
					</div>
					
					<p>以实际购买价格为准</p>
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
	import { setStore,getStore,removeStore,getBookingSource,getNoticeSource,formatIOSDate,standardDate,weekFormat,deleZero,monthStr,getStatisticsType,getElementTag} from '../../config/mUtils'
	export default {
        data(){
            return{
				depart:'',
				dest:'',
				lowPriceMoent:'',
				isShowDate:true,
				rightMenu:'编辑',
                goPage:'priceMovements',
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
				currentPrice:'',//当前价格
				exptPrice:'',//期望价格
				percentNum:'',//变化的价格
            }
        },
        components: {
            headTop,airlinesLogo
		},
		computed:{
        	...mapState([
        		'departureCity',
        		'arrivalCity',
				'nowDateStamp',
				'lowPriceInfor'
        	])
        },
        created() {

        },
        mounted(){
        	
        },
        methods: {
			 ...mapActions([
	            'initData'
            ]),
        	lowPriceFlight(){    
        		let lowpriceListArr=[],that=this;   
		    	for (let i =0; i <91; i++) {
		    		let lowpriceList={
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
		        for (let a = 0; a < lowpriceListArr.length; a++) {
		        	lowpriceListArr[a].month = lowpriceListArr[a].deptDate.substring(5,7);
		        	lowpriceListArr[a].date = lowpriceListArr[a].deptDate.substring(8,10);
		        	finalLowpriceList.push(lowpriceListArr[a]);
		        	if (a > 0 && lowpriceListArr[a].deptDate.substring(8,10) == '01') {
		        		monthBegin.push(a);
		        		differMounth.push(lowpriceListArr[a].deptDate.substring(5,7));
		        	};
		        	this.differMounth=differMounth;
				};
		        for (let j = 0; j < monthBegin.length; j++) {
		        	monthBegin[j] = monthBegin[j] + j;
		        	let objDiffer = {
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
				let newObj = {
		            key: 'isDouble',
		            val:false
	            }
				try{
					this.initData(newObj);
				}catch(e){}
                let backTripObj = {
                    key: 'chosenBackTrip',
                    val: false
                };
				try{
					this.initData(backTripObj);
				}catch(e){}
				setStore("goFlight","move");
				window.location.href="//m.lvmama.com/"+this.$parent.baseUrlPath+"/"+this.lowPriceInfor.depCode+"-"+this.lowPriceInfor.areCode+"/"+flight.deptDate+"?losc=273014&ict=i";
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
	            	deptCities:this.lowPriceInfor.depCode,
	            	arrCities:`&arrCities=${this.lowPriceInfor.areCode}`,
	            	startDate:this.startDate,
	            	endDate:this.endDate,
	            	topAirLine:'',
	            	topDate:90,
	            	priceLowest:'',
	            	priceHigest:'',
	            	bookingSource:(navigator.userAgent.indexOf('Mobile') > 0&& navigator.userAgent.indexOf('LVMM')>0)?'APP':'WAP',
				}
				console.log(priceObj);
				this.currentPrice = '';
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
							for (let i = 0; i < this.flightList.length; i++) {
								let depT = this.flightList[i].departureTime.split(" ")[1],
								    desT = this.flightList[i].arriveTime.split(" ")[1];
								
								this.flightList[i].departureTime = depT.substring(0,5);
								this.flightList[i].arriveTime = desT.substring(0,5);
								
							}
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
		                	try {
	                    	var o = document.getElementsByClassName("maxLowprice")[0];
	                    	var k = document.getElementsByClassName("lowestPrice")[0];

							var h = o.offsetHeight; //高度
							var x = h/maxPrice;
							var w = k.offsetWidth;	
							var l = k.offsetLeft;
	                        this.perWidth = w + l;					
							document.getElementsByClassName('lowestPriceList')[0].style.width=95*(w+l)+l+"px";
				            for (var j = 0; j < 95; j++) {
								
									var xh = x*that.lowpriceList[j].price;
									that.lowpriceList[j].height=parseInt(xh);
									if(that.lowpriceList[j].price=='查看'){
										that.lowpriceList[j].height =parseInt(x*that.minPrice);
									}
									document.getElementsByClassName('eachLowpriceHeight')[j].style.height=that.lowpriceList[j].height+"px";
									document.getElementsByClassName('eachLowprice')[j].style.bottom=that.lowpriceList[j].height+2+"px";
								
				            	
					    		
							}
							document.getElementsByClassName('labelLow')[0].style.height=parseInt(x*that.minPrice)+"px";
							} catch (e) {
									
								}
				        },100);
					this.currentPrice = this.lowpriceList[0].price;
					this.exptPrice = this.lowPriceInfor.expectationPrice;//期望价格
					//算出变化的价格
					if(this.currentPrice&&this.currentPrice!='查看'){
						let gapPrice = this.currentPrice - this.exptPrice;
						if(gapPrice > 0 ){
							this.percentNum = `比关注时上涨￥${gapPrice}`;
						}else if (gapPrice < 0){
							this.percentNum = '比关注时下降'+'￥'+Math.abs(gapPrice);
						}else if(gapPrice == 0){
							this.percentNum = '无变化';
						}else if(gapPrice=='' || gapPrice==null){
							this.percentNum = '';
						}
						
						console.log(gapPrice);
					}
					 
					
			        },()=>{
			        	this.specialFlightList=[];    
			        });
				}else{
	                //没有符合条件的航班
	                this.specialFlightList=[];
	                this.noFLight = true;
	            };
			},
			toEdit(){
				let obj_depat ={
                        key: 'departureCity',
                        val: {
                            airportCityCode:this.lowPriceInfor.depCode,
                            name:this.lowPriceInfor.depCity,
                            code:this.lowPriceInfor.depCode
                           
                        }
                    }
				try{
					this.initData(obj_depat);
				}catch(e){}
                 let obj_dest ={
                        key: 'arrivalCity',
                        val: {
                            airportCityCode:this.lowPriceInfor.arriCode,
                            name:this.lowPriceInfor.arriCity,
                            code:this.lowPriceInfor.areCode
                           
                        }
                    }
				try{
					this.initData(obj_dest);
				}catch(e){}
				removeStore("chooseDay");
				this.$router.push(`/${this.$parent.baseUrlPath}/addRemind/edit`);
			}
        },
        activated() {
			
			console.log(this.lowPriceInfor.lapShow);
			//获取头部信息
			this.depart = this.lowPriceInfor.depCity;//出发城市
			this.dest = this.lowPriceInfor.arriCity;//出发城市
			this.lowPriceMoent = {
				fromDate:`${this.lowPriceInfor.depTime}至`,
				toDate:`${this.lowPriceInfor.desTime}出发`
			};
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
			getStatisticsType('机票-低价列表','FlightPriceMovements');
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
	}
	>div.overf{
		overflow-x: hidden;
	}
	// .lowprice-search{
	// 	height: 1rem;
	//     position: relative;
	//     background: #fafafa;
	//     >div{
	//     	position: absolute;
	// 	    bottom: .2rem;
	// 	    width: 100%;
	// 	    >span:first-child{
	// 	    	margin-left: .15rem;
	// 	    }
	// 	    >span{
	// 	    	display: inline-block;
	// 		    height: .68rem;
	// 		    line-height: .68rem;
	// 		    border: 1px solid #dfdfdf;
	// 		    border-radius: .1rem;
	// 		    background-color: #fff;
	// 		    font-size: .24rem;
	// 		    color: #000;
	// 		    width: 31%;
	// 		    text-align: center;
			    
	// 		    span{
	// 		    	display: inline-block;
	// 			    width: 0;
	// 			    height: 0;
	// 			    border-width: .08rem .08rem 0;
	// 			    border-color: #9f9f9f transparent;
	// 			    border-style: solid;
	// 			    margin-left: .1rem;
	// 			    margin-bottom: .05rem;
	// 		    }
	// 		    .daoSanjiao {
	// 			    border-width: 0 .08rem .08rem;
	// 			}
	// 	    }
	// 	    >span.actity-special{
	// 	    	height: .9rem;
	// 		    position: absolute;
	// 		    top: 0;
	// 		    z-index: 99;
	// 		    border-bottom: none;
	// 		    border-bottom-left-radius: 0;
	// 		    border-bottom-right-radius: 0;
	// 		    margin-left: .1rem;
	// 	    }
	//     }
	// }
	.matte{
		width: 100%;
	    height: 100%;
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
	    padding: .25rem;
	    font-size: .24rem;
	    color: #000;
	    z-index: 9;
	    >div{
	    	width: 33.3%;
		    float: left;
		    text-align: center;
		    height: .7rem;
		    line-height: .7rem;
	    }
	    >div.selected{
	    	color: #fe3c71;
	    }
	}
	.showHistogramList{
		margin: .1rem .1rem .2rem;
	    border-radius: 5px;
	    background-color: #fff;
	    padding-top: .16rem;
	    position: relative;
	    >p {
		    color: #9f9f9f;
		    text-align: center;
		}
		.lowestPrice:nth-child(1){
			// div:nth-child(1){
			// 	background: #FFEFDF !important;
			// }
			.maxLowprice div{
				background: #ff6600 !important;
			}
		}
		.showHistogram {
		    height: 3.3rem;
		    padding-top: .12rem;
		    line-height: .36rem;
		    overflow-x: auto;
		    -webkit-overflow-scrolling: touch;
		    overflow-scrolling: touch;
		    position: relative;
		    z-index: 3;
			>ul {
			    height: 3.5rem;
			    width: 100rem;
			    overflow-x: auto;
			    position: relative;
			    overflow-y: hidden;
			    >li.lowest>div .eachLowpriceHeight {
				    // background-color: #ff43a6;
					background-color: #F60;
				}
				>li {
				    width: 0.9rem;
				    float: left;
				    text-align: center;
				    position: relative;
				    height: 100%;
				    margin-left: .16rem;
				    >span:first-child {
					    font-size: .24rem;
					    color: #000;
					    display: block;
					}
					>span.week {
						width: 100%;
					    font-size: .2rem;
					    color: #999999;
					    display: block;
						position: absolute;
						bottom:21%;
						left:50%;
						transform: translateX(-50%);
					}
					.date {
						width: 100%;
						position: absolute;
						bottom:31%;
						left:50%;
						transform: translateX(-50%);
						font-size: 0.2rem;
						color:#999999;
					}
					>div {
					    font-size: .24rem;
					    color: #9f9f9f;
					    background-color: #FBEDF1;
					    height: 1.5rem;
					    position: absolute;
					    top: 0.5rem;
					    width: 80%;
					    // border-radius: 3px 3px 0 0;
					    >span {
						    font-size: .2rem;
						    color: #999999;
						    position: absolute;
						    top:-29% !important;
						    left: 50%;
						    width: 100%;
						    -webkit-transform: translateX(-50%);
						    transform: translateX(-50%);
						    >i{
						    	color: #999999;
						    }
						}
						>div{
							height: 1.42rem;
						    position: absolute;
						    bottom: 0;
						    width: 100%;
						    div {
							    background-color: #FE3C71;
							    position: absolute;
							    bottom: 0;
							    width: 100%;
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
		    width: 100%;
		    position: absolute;
		    color: #fff;
		    border-top: 1px #ffe6f3 solid;
		    height: 40px;
		    top:47%;
		    pointer-events: none;
		    z-index: 6;
		    >span {
			    background: url('//m.lvmama.com/flight/image/low-price.png') no-repeat;
			    background-size: cover;
			    width: .85rem;
			    height: .28rem;
			    position: absolute;
			    left: 0;
			    top: 0;
			    -webkit-transform: translateY(-50%);
			    transform: translateY(-50%);
			    text-align: center;
			    font-size: .2rem;
			    line-height: .28rem;
			    color: #fff;
			}
		}
		.changeLine{
			top:60%;
		}
		.new_label_low{
			height: 0.8rem;
			border-top:1px solid #f3f3f3;
			margin:0 0.2rem;
			margin-top:-0.2rem;
			line-height: 0.8rem;
			span{
				@include sc(0.24rem,#000000);
			}
		}
	}
	.lowprice-container{
		margin-top: .2rem;
		.ineffectiveness {
		    text-align: center;
		    margin-top: 1rem;
		    >img{
		    	width: 3.6rem;
		    }
		    >p{
		    	font-size: .3rem;
    			color: #7f7f7f;
		    }
		}
		>p {
		    font-size: .24rem;
		    color: #666666;
		    margin: 0 0 .2rem .2rem;
		}
		>div{
			padding: 0 .1rem 1rem;
			>div{
				height: 1.76rem;
			    line-height: .3rem;
			    position: relative;
			    background-color: #fff;
			    border-radius: .1rem;
			    margin-bottom: .1rem;
			    .flight-left {
				    width: 62%;
				    float: left;
				    padding-left: .2rem;
				    font-size: .3rem;
				    color: #000;
				    .top {
					    font-size: .24rem;
					    color: #9f9f9f;
					    margin: .25rem 0 .18rem;
					    height: .3rem;
					    line-height: .3rem;
					    .flight-date{
							color: #999999;
					    }
					    .flight-week {
						    color: #999999;
						    padding-left: .1rem;
						}
					}
					.middle {
					    font-size: .4rem;
					    color: #333333;
					    margin-bottom: .18rem;
						position: relative;
						width: 80%;
					    >i {
						    height: .3rem;
						    width: 1.12rem;
						    position: absolute;
						    left: 50%;
						    top: .02rem;
						    background: url('//m.lvmama.com/flight/image/list_jt.png') right no-repeat;
						    -webkit-background-size: 100%;
							background-size: 100%;
							transform: translateX(-50%);

						}
						>span:last-child {
						    position: absolute;
    						right: 0;
						}
					}
					.bottom {
					    font-size: .22rem;
					    color: #999999;
					    position: relative;
					    padding-left: .4rem;
					    >i {
						    position: absolute;
						    top: 62%;
						    left: 0;
						    -webkit-transform: translateY(-62%);
						    transform: translateY(-62%);
						    width: .28rem;
						    height: .3rem;
						    -webkit-background-size: contain;
						    background-size: contain;
						}
						>span{
							color: #999999;
						}
						span:last-of-type:before {
						    content: "";
						    display: inline-block;
						    width: .1rem;
						    height: .16rem;
						    border-right: 1px solid #aaa;
						    box-sizing: border-box;
						    margin-right: .12rem;
						}
					}
				}
				.flight-right {
				    width: 31%;
				    height: 1.8rem;
				    line-height: 1.8rem;
				    float: right;
					margin-right: 0.2rem;
				    text-align: right;
				    font-size: .3rem;
				    >span{
				    	font-size: .4rem;
					    color: #ff6600;
						// padding-left: .1rem;
						margin-right: 0.3rem;
					    >i{
					    	font-size: 0.24rem;
					    	color: #fe3c71;
					    }
					    >i:last-child{
					    	color: #ff6600;
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
				font-size: .24rem;
			    color: #9f9f9f;
			    margin: .1rem 0 .3rem .2rem;
			}	
		}

	}
}
</style>
