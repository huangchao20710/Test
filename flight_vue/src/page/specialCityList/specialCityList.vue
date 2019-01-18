<template>
	<div class="specialcityList">
		<head-top  :depart="title" :goPage="goPage"></head-top>
		<div class="article specialTicket-wrap" :class="{'overf':showMonth}">
			<div class="lowprice-search">
				<div>
					<span><router-link to="/flight/cityPicker/departureCity/specialcityList">出发：{{departureCity.name}}<span></span></router-link></span>
					<span><router-link to="/flight/cityPicker/arrivalCity/specialcityList">到达：{{arrivalCity.name}}<span></span></router-link></span>
					<span @click="showDepartDate()" :class="{'actity-special':showMonth}">日期：{{selectedMonth.value}}<span :class="{'daoSanjiao':showMonth}"></span></span>
				</div>
			</div>
			<div class="matte" v-if="showMonth" @click="showDepartDate()"></div>
			<div class="chooseMonth" v-if="showMonth">
				<div :class="{'selected':selectedMonth.key==month.key}" v-for="month in monthList" @click="selectMonthClick(month)" ><i v-if="selectedMonth.key==month.key"><em></em></i>{{month.value}}</div>
			</div>
			<div class="lowprice-container">
				<div class="ineffectiveness" v-if="specialFlightList != null && specialFlightList.length<=0">
					<img class="specialTicket-empty" src="//m.lvmama.com/flight/image/empty.png">
					<p class="specialTicket-error">抱歉，查询不到满足条件的航班<br>您可以修改查询条件试试。</p>
				</div>
				<div v-show="specialFlightList != null &&specialFlightList.length>0">
					<div v-for="(specialFlight,index) in flightList" :key="index" v-if="index<8" @click="searchFlight(specialFlight)">
						<div class="flight-left">
							<span class="flight-date">{{specialFlight.deptDate}}</span>
							<span class="flight-week">{{specialFlight.week}}</span>
						</div>
						<div class="flight-right">
							<span><i>&yen;</i>{{specialFlight.parPrice}}<i>起</i></span>
						</div>
					</div>
				</div>
			</div>
		</div>		
	</div>
	
</template>
<script>
	import headTop from '../../components/header/head'
	import { mapState,mapActions } from 'vuex'
	import airlinesLogo from '../../components/common/airlinesLogo'
	import { getLowestPriceNewFlight} from '../../service/getData'
	import { setStore,getStore,getBookingSource,getNoticeSource,formatIOSDate,standardDate,weekFormat,monthStr,getStatisticsType,getElementTag} from '../../config/mUtils'
	export default {
        data(){
            return{
                title: '城市列表',
                goPage:'toShare',
                showMonth:false,
                startDate:'',
                endDate:'',
                selectedMonth1:null,
                specialFlightList:null,
                flightList:[],
                monthList:[],
                selectedMonth:'',
            }
        },
        components: {
            headTop,airlinesLogo
        },
        created() {
        	this.selectedMonth='';
        },
        mounted(){
        	
        },
        methods: {
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

	        selectMonthClick(month){
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
	            getElementTag("机票_特价机票城市列表页_搜索框","机票特价机票城市列表页");
        	},
        	showDepartDate(){
        		if(this.departureCity.code!=this.arrivalCity.code){
        			this.showMonth=!this.showMonth;
        		}	            
	        },
        	searchFlight(flight){
	            if(flight.height==0){
	                return;
	            }
	            getElementTag("机票_特价机票城市列表页_航班","机票特价机票城市列表页");
	            setStore("goFlight","special");
	            // this.$router.push(`/vflight/flightList/${this.departureCity.code}/${this.arrivalCity.code}/${flight.deptDate}`);
	            window.location.href="//m.lvmama.com/"+this.$parent.baseUrlPath+"/"+this.departureCity.code+"-"+this.arrivalCity.code+"/"+flight.deptDate+"?losc=238037&ict=i";
	        },
	        getPrice() {
	        	let monthDay = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
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
            		this.$parent.showLoading = true;
                	getLowestPriceNewFlight(priceObj).then((val) => {
                		this.$parent.showLoading = false;
	            		this.specialFlightList=[];
	            		if (val&&val.data[0]&&val.data[0].flightDailyPriceOfCityDtoList.length>0) {
	            			let specialFlightList = val.data[0].flightDailyPriceOfCityDtoList;
		                    let flightList=specialFlightList;
		                    function sortNumber(a,b){
								return a - b
							}
							var priceArray = [];
		                    for (var i = 0; i < specialFlightList.length; i++) {
		                        specialFlightList[i].week = weekFormat(new Date(formatIOSDate(specialFlightList[i].deptDate)).getDay());
		                        priceArray.push(specialFlightList[i].parPrice);
		                        priceArray.sort(sortNumber);
								

		                    }
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
		                }else{
		                    //没有符合条件的航班
		                    this.specialFlightList=[];
		                }		      
			        },()=>{
			        	this.$parent.showLoading = false;
			        	this.specialFlightList=[];
			        });
				}else{
	                //没有符合条件的航班
	                this.specialFlightList=[];
	            };
            }
        },
        activated() {
        	this.selectedMonth='';
        	this.selectedMonth1=null;
        	this.specialFlightList=null;
            this.getPrice();
            // this.flightList=this.specialFlightList;
            getStatisticsType('机票特价机票城市列表页','FlightSpecialTicket');
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
.specialcityList{
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
	.lowprice-search{
		height:3.4rem;
		position: relative;
	    background: url('//m.lvmama.com/flight/image/flight_new.png') no-repeat;
	    background-size: 100%;
	    margin-top: 0;
	    >div{
	    	position: absolute;
		    bottom: .2rem;
		    width: 100%;
		    >span:first-child{
		    	margin-left: .15rem;
		    }
		    >span{
		    	display: inline-block;
			    height: .68rem;
			    line-height: .68rem;
			    // border: 1px solid #dfdfdf;
			    border-radius: .1rem;
			    background-color: #fff;
			    font-size: .24rem;
			    color: #000;
			    width: 31%;
			    text-align: center;
			    span{
			    	display: inline-block;
				    width: 0;
				    height: 0;
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
		    >span.actity-special {
			    height: .9rem;
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
		width: 100%;
	    height: 100%;
	    background-color: rgba(0,0,0,.5);
	    position: fixed;
	    top: 0;
	    left: 0;
	    margin-top: 4.5rem;
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
	    	width: 32.3%;
		    float: left;
		    text-align: center;
		    height: .7rem;
		    line-height: .7rem;
			margin-right: 0.1rem;
			margin-bottom: 0.1rem;
			border:1px solid #cccccc;
			position: relative;
			border-radius: 0.06rem;
			i{
				display: inline-block;
				width: .3rem;
				height: .3rem;
				position: absolute;
				right: 0;
				bottom: 0;
				border-bottom: .3rem solid #f80;
				border-left: .3rem solid transparent;
				em{
					display: inline-block;
					content: "";
					width: .1rem;
					height: .15rem;
					border-bottom: 1px solid #fff;
					border-right: 1px solid #fff;
					transform: rotate(45deg);
					-webkit-transform: rotate(45deg);
					position: relative;
					right: .14rem;
    				bottom: 0.16rem;
				}
			}
	    }
		div:nth-child(2n+3){
			margin-right: 0;
		}
	    >div.selected{
	    	// color: #d30775;
			border:1px solid #ff8800;
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
		>div{
			padding: 0 .1rem 1rem;
			>div{
				height: 1.1rem;
			    line-height: 1.1rem;
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
				    .flight-week {
					    color: #9f9f9f;
					    padding-left: .1rem;
					}
				}
				.flight-right {
				    width: 31%;
				    height: 1.1rem;
				    line-height: 1.1rem;
				    float: left;
				    text-align: right;
				    font-size: .3rem;
				    >span{
				    	font-size: .4rem;
					    color: #ff6600;
					    padding-left: .1rem;
						font-weight: 600;
					    >i{
					    	font-size: 0.24rem;
					    	color: #ff6600;
					    }
					    >i:last-child{
					    	color: #9f9f9f;
					    }
				    }
				}
			}
			>div:after {
			    content: "";
			    width: .16rem;
			    height: .16rem;
			    border-right: 1px solid #b3b3b3;
			    border-bottom: 1px solid #b3b3b3;
			    position: absolute;
			    right: .2rem;
			    top: 50%;
			    -webkit-transform: rotate(-45deg) translateY(-50%);
			    transform: rotate(-45deg) translateY(-50%);
			}
			>p{
				font-size: .24rem;
			    color: #9f9f9f;
			    margin: .1rem 0 .3rem .2rem;
			}	
		}

	}
}
</style>
