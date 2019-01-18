<template>
	<div class="flightMap">
		<head-top :depart="title" :goPage="goPage"></head-top>
		<div id="allmap" class="all"></div>
		<div class="searchFoot" v-show="clickCity.name==undefined">
			<span class="map"></span>
			<span class="city">{{departureCity.name}}出发</span>
			<span class="minPriceCity">{{specialPriceCityNumber}}个低价城市</span>
		</div>
		<div class="selected" @click="toPickCondition"></div>
		<div class="dingwei" @click="dingwei"></div>
		<div class="search" v-show="clickCity.name != undefined">
			<div class="max">
			  	<div class="searchDest">
				  	<span>{{fromCity.name}}</span>
				  	<i></i>
					<span>{{clickCity.name}}</span>
				</div>
			  <div class="searchDate">{{clickCity.departDate | flightMapDateFormate}}</div>
			  <div class="searchPrice">
				    <span>￥</span>
				    {{clickCity.price}}
				    <span>起</span>
			  </div>
		  	<div class="searchButton" @click="toSearchFlight">搜索机票</div>
			</div>
		</div>
		<alert-tip v-if="showMessage" :tipContent="message" :leftButton="leftButton"></alert-tip>
	</div>
</template>

<script>
	import headTop from '../../components/header/head'
	import { mapActions,mapState } from 'vuex'
	import { getStore,addZero,removeStore,getNoticeSource,monthFormat,weekFormat,formatIOSDate,deleZero,setStore,getStatisticsType } from '../../config/mUtils'
	import alertTip from '../../components/common/alertTip'
	import { getLowestPriceForFlight,getLowestPriceNewFlight,getLowestPriceNewFlightPrice } from '../../service/getData'

	export default{
		data(){
			return{
                title:"探索低价",
                goPage:"toShare",
                showMessage:false,//是否展示弹框
                leftButton:'',
                message:'',
                map:'',
                fromCity:{},//出发地
                clickCity: {},
                localSearch:"",
                moren: '',
				specialPriceCityNumber: 0,
				clickType:false,
			}
		},
		props:[],

		components:{
			headTop,alertTip
		},

		methods:{
			 ...mapActions([
                'initData'
            ]),
			showPrice(list,startDate,endDate,lowPrice = '',highPrice = ''){
				let to=[],that=this;
	            for(let i=0;i<list.length;i++){
	                if(list[i].code==that.fromCity.code){
	                    continue;
	                }
	                to.unshift(list[i].code);
	            }
	            // var codes = code.join(",");
	            if(to.length==0){
	            	this.specialPriceCityNumber=0;
	            	return;
	            }
				let urlStr = '';
				for (let i = to.length - 1; i >= 0; i--) {
					urlStr += `&arrCities=${to[i]}`
				};
	            let codes = to.join(",");
	            let priceObj = {
	            	deptCities: that.fromCity.code,
	            	arrCities: urlStr,
	            	startDate: startDate,
	            	endDate: endDate,
	            	topAirLine: '',
	            	topDate: '1',
	            	priceLowest: lowPrice,
	            	priceHigest: highPrice,
	            	bookingSource:(navigator.userAgent.indexOf('Mobile') > 0&& navigator.userAgent.indexOf('LVMM')>0)?'APP':'WAP',
	            }
	            getLowestPriceNewFlight(priceObj).then((data) => {
	            // getLowestPriceForFlight(priceObj,'jsonpCallback','lowestPrice', (data) => {
	            	if (data&&data.data[0]&&data.data[0].flightDailyPriceOfCityDtoList.length>0) {
	            		this.specialPriceCityNumber = data.data.length;
                        for(let i=0;i<list.length;i++){
                            if(that.fromCity.code==list[i].code){
                                continue;
                            }
                            for(let j=0;j<data.data.length;j++){
                                if(list[i].name==data.data[j].arrCityName){
                                	
                                    list[i].price=data.data[j].flightDailyPriceOfCityDtoList[0].parPrice;
                                    break;
                                }
                            }
                            that.localSearch.setSearchCompleteCallback(function (searchResult) {
                                let poi = searchResult.getPoi(0);
                                let point = new BMap.Point(poi.point.lng,poi.point.lat);
                                that.map.centerAndZoom(point, 5);
                                that.map.enableScrollWheelZoom(true);
                                let opts = {
                                    position : point,    // 指定文本标注所在的地理位置
                                    offset   : new BMap.Size(0, -30)    //设置文本偏移量
                                }
                                let label = null;
                                for(let i=0;i<list.length;i++){
                                    if(list[i].name==poi.address.substring(0,poi.address.length-1)&& list[i].price!='--'){
                                    	if (highPrice != '') {
                                    		if (list[i].price <= highPrice) {
		                                        label = new BMap.Label("<span style='color:#ff6600;font-size: 15px;'>￥"+list[i].price+"</span><span style='font-size:10px;color:#999'>起</span><br>"+poi.address.substring(0,poi.address.length-1), opts);  // 创建文本标注对象
		                                        break;
                                    		}
                                    	} else {
                                    		label = new BMap.Label("<span style='color:#ff6600;font-size: 15px;'>￥"+list[i].price+"</span><span style='font-size:10px;color:#999'>起</span><br>"+poi.address.substring(0,poi.address.length-1), opts);  // 创建文本标注对象
		                                        break;
                                    	}
                                    }
                                }
                                if (label != null) {
	                                label.setStyle({
	                                    color : "#666",
	                                    border:"1px solid #fff",
	                                    fontSize : "10px",
	                                    height : "36px",
	                                    width : "80px",
	                                    fontFamily:"PingFangSC-Regular",
	                                    borderRadius:"100px",
	                                    boxShadow: "0 0 5px #aaa",
	                                    textAlign:"center",
	                                    padding:"0"
	                                });
	                                that.map.addOverlay(label);
	                                let infoWindow = new BMap.InfoWindow(label);  // 创建信息窗口对象
	                                label.addEventListener("click", function(e){
										// that.clickType=true;
										// setTimeout(function(){that.clickType=false;},50);
										event.stopPropagation();
	                                    that.clickCity = {};
	                                    if(infoWindow.content.content!=null && infoWindow.content.content!=''){
	                                        that.clickCity.price = infoWindow.content.V.childNodes[0].innerText.substring(1);
	                                        that.clickCity.name = infoWindow.content.V.childNodes[3].textContent;
	                                        for (let i = 0; i < data.data.length; i++) {
	                                        	if (data.data[i].arrCityName == that.clickCity.name) {
	                                        		that.clickCity.code = data.data[i].arrCity;
	                                        		that.clickCity.departDate = data.data[i].flightDailyPriceOfCityDtoList[0].deptDate;
	                                        	}
	                                        }
	                                    }
	                                        
									});
								}
							});
							that.localSearch.search(list[i].name);
									
							if(list.length==1 && getNoticeSource()=="Android"){
								that.localSearch.search(list[i].name);
							}
                            
                        }

                    }
		            
		        },()=>{
		        	this.specialPriceCityNumber=0;
		        });
			},
			dingwei(){
				let that=this;
	            that.map.centerAndZoom(that.fromCity.name,5);
	            that.localSearch.setSearchCompleteCallback(function (searchResult) {
	                let poi = searchResult.getPoi(0);
	                let point = new BMap.Point(poi.point.lng,poi.point.lat);
	                that.map.centerAndZoom(point, 5);
	                that.map.enableScrollWheelZoom(true);
	                let opts = {
	                    position : point,    // 指定文本标注所在的地理位置
	                    offset   : new BMap.Size(-10, -10)    //设置文本偏移量
	                }
	                let label = new BMap.Label("<span></span>", opts);  // 创建文本标注对象
	                label.setStyle({
	                    border:"0",
	                    height : "17px",
	                    width : "17px",
	                    background : "url('//m.lvmama.com/flight/image/map_dw.png') no-repeat",
	                    backgroundSize : "100% 100%",

	                });
	                that.map.addOverlay(label);
	            });
	            that.localSearch.search(that.fromCity.name);
			},
			//搜索机票
			toSearchFlight() {
				let departObj = {
					key: 'departureCity',
					val: this.fromCity
				};
				try{
					this.initData(departObj);
				}catch(e){}
				let arrivalObj = {
					key: 'arrivalCity',
					val: {
						name: this.clickCity.name,
						code: this.clickCity.code
					}
				};
				try{
					this.initData(arrivalObj);
				}catch(e){}
				let dateArr = this.clickCity.departDate.split('-');
				let departDateObj = {
					key: 'departDate',
					val: {
						year: dateArr[0],
						month: deleZero(dateArr[1]),
						date: deleZero(dateArr[2]),
						day: weekFormat(new Date(formatIOSDate(this.clickCity.departDate)).getDay())
					}
				};
				try{
					this.initData(departDateObj);
				}catch(e){}
				setStore("goFlight","map");
				window.location.href="//m.lvmama.com/"+this.$parent.baseUrlPath+"/"+this.fromCity.code+"-"+this.clickCity.code+"?losc=238037&ict=i";
				// this.$router.push(`${this.fromCity.code}-${this.clickCity.code}`);
				let priceObj = {
					key: 'flightMapPrice',
					val: {
						low: 0,
						high: 3000
					}
				};
				try{
					this.initData(priceObj);
				}catch(e){}
			},
			//条件筛选
			toPickCondition() {
				this.$router.push(`/${this.$parent.baseUrlPath}/flightMapSearchCondition`);
			},
		},

		created(){
			
		},

		activated(){
			let that=this;
			this.specialPriceCityNumber = 0;
			this.clickCity = {};
			this.clickType=false;
			this.moren = [
                	{"name":"上海","code":"SHA","price":"--"},
                	{"name":"北京","code":"PEK","price":"--"},
                	{"name":"广州","code":"CAN","price":"--"},
                	{"name":"成都","code":"CTU","price":"--"},
                	{"name":"厦门","code":"XMN","price":"--"},
                	{"name":"西安","code":"XIY","price":"--"},
                	{"name":"三亚","code":"SYX","price":"--"},
                	{"name":"杭州","code":"HGH","price":"--"},
                	{"name":"重庆","code":"CKG","price":"--"},
                	{"name":"南京","code":"NKG","price":"--"},
                	{"name":"青岛","code":"TAO","price":"--"},
                	{"name":"深圳","code":"SZX","price":"--"},
                	{"name":"昆明","code":"KMG","price":"--"},
                	{"name":"大连","code":"DLC","price":"--"},
                	{"name":"哈尔滨","code":"HRB","price":"--"},
                	{"name":"郑州","code":"CGO","price":"--"},
                	{"name":"沈阳","code":"SHE","price":"--"},
                	{"name":"武汉","code":"WUH","price":"--"},
                	{"name":"天津","code":"TSN","price":"--"},
                	{"name":"长沙","code":"CSX","price":"--"},
                	{"name":"珠海","code":"ZUH","price":"--"},
                	{"name":"乌鲁木齐","code":"URC","price":"--"},
                	{"name":"福州","code":"FOC","price":"--"},
                	{"name":"贵阳","code":"KWE","price":"--"},
                	{"name":"丽江","code":"LJG","price":"--"},
                	{"name":"兰州","code":"LHW","price":"--"},
                	{"name":"长春","code":"CGQ","price":"--"},
                	{"name":"海口","code":"HAK","price":"--"},
                	{"name":"太原","code":"TYN","price":"--"},
                	{"name":"济南","code":"TNA","price":"--"},
                	{"name":"合肥","code":"HFE","price":"--"},
                	{"name":"西宁","code":"XNN","price":"--"},
                	{"name":"桂林","code":"KWL","price":"--"},
                	{"name":"南宁","code":"NNG","price":"--"},
                	{"name":"银川","code":"INC","price":"--"},
                	{"name":"宁波","code":"NGB","price":"--"},
                	{"name":"烟台","code":"YNT","price":"--"}
                ];
			this.map = new BMap.Map("allmap",{minZoom:5,maxZoom:7}); // 创建Map实例,设置地图允许的最小/大级别

	        let lu=[{
	            "featureType": "highway",
	            "elementType": "all",
	            "stylers": {
	                "color": "#f3f3f3"
	            }
	        }];

	        this.map.setMapStyle({styleJson: lu });
	        let point = new BMap.Point(116.331398,39.897445);
	        this.map.centerAndZoom(point, 5);
	        this.map.enableScrollWheelZoom(true);
			 
	        // let opts = {
	        //     position : point,    // 指定文本标注所在的地理位置
	        //     offset   : new BMap.Size(30, -30)    //设置文本偏移量
	        // }
	        // let label = new BMap.Label("北京", opts);  // 创建文本标注对象
	        // label.setStyle({
	        //     color : "#000",
	        //     border:"1px solid #fff",
	        //     fontSize : "12px",
	        //     height : "20px",
	        //     lineHeight : "20px",
	        //     fontFamily:"微软雅黑"
	        // });
	        this.localSearch = new BMap.LocalSearch(this.map);
	        
	        this.fromCity = this.departureCity;
	        let themeIndex = -1;
	        for (let i = 0; i < this.flightMapThemes.length; i++) {
		        if (this.flightMapThemes[i].picked) {
		        	themeIndex = i;
		        }
	        }
	        let monthIndex = 0;
	        if (this.flightMapMonth != '') {
		        for (let i = 0; i < this.flightMapMonth.length; i++) {
			        if (this.flightMapMonth[i].picked) {
			        	monthIndex = i;
			        }
		        }
	        }
	        let list = this.moren,
	        	startDate = this.flightMapMonth[monthIndex].start,
	        	endDate = this.flightMapMonth[monthIndex].end,
	        	lowPrice = '',
	        	highPrice = '';
	        if (this.flightMapInputCity != '') {
	        	let arr = [];
	        	arr.push(this.flightMapInputCity);
	        	list = arr;
				// if(list.length==1 &&getStore("reload")!=null && getNoticeSource()=="Android"){
				// 	removeStore("reload");
				// 	window.location.reload();
				// }
	        } else {
		        if (themeIndex != -1) {
		        	list = this.flightMapThemes[themeIndex].cities;
		        };
	        }
	        if (this.flightMapPrice.high != undefined) {
	        	lowPrice = this.flightMapPrice.low;
	        	highPrice = this.flightMapPrice.high;
	        }
			this.showPrice(list,startDate,endDate,lowPrice,highPrice);
			// document.getElementsByClassName("BMap_mask")[0].parentNode.id="BMap_mask";
			// setTimeout(function(){
				// document.getElementsByClassName("BMap_mask")[0].id="BMap_mask";
				// document.getElementById('BMap_mask').addEventListener('click', function () {
				// 	console.log('div');
				// },true)
				// document.getElementById('app').addEventListener('click', function () {
				// 	console.log('div');
				// },true)
			// },2000);
			// setTimeout(function(){
			// 	that.map.removeEventListener("click",function(){});
			// 	that.map.addEventListener("click", function(){
			// 		// if(that.clickType==true){
			// 		// 	return;
			// 		// }
			// 		that.clickCity = {};
			// 	});  
			// },50)
			setTimeout(function(){
				that.map.addEventListener("click", function(){
					that.clickCity = {};
				});
			},50);
			getStatisticsType('探索低价页','flightMap');
		},

		computed: mapState({
			couponList: state => state.couponList,
			coupon: state => state.coupon,
			nowDateStamp: state => state.nowDateStamp,
			allMonthInfos: state => state.allMonthInfos,
			flightMapThemes: state => state.flightMapThemes,
			flightMapMonth: state => state.flightMapMonth,
			flightMapPrice: state => state.flightMapPrice,
			departureCity: state => state.departureCity,
			flightMapInputCity: state => state.flightMapInputCity,
		})
	}
</script>

<style lang="scss" scoped>
	@import '../../style/mixin';
	.flightMap{
		height:100%;
		.all{
			@include wh(100%,100%);
		}
		.searchFoot{
			@include wh(100%,1rem);
			bottom: 0;
			position: absolute;
			background-color: #fff;
			line-height: 1rem;
			.map{
				background: url('//m.lvmama.com/flight/image/map.png') no-repeat;
				@include wh(.26rem,.25rem);
				margin-left: .2rem;
				background-size: 100% 100%;
				display: inline-block;
			}
			.city{
				color: #000;
			}
			.minPriceCity{
				color: #9f9f9f;
			}
		}
		.selected{
			background: url('//m.lvmama.com/flight/image/filter.png') no-repeat;
			position: absolute;
			right: .2rem;
			@include wh(.67rem,.85rem);
			top: 1.14rem;
			-webkit-background-size: 100% 100%; 
			background-size: 100% 100%;
		}
		.dingwei{
			background: url('//m.lvmama.com/flight/image/map_dingwei.png') no-repeat;
			position: absolute;
			@include wh(.67rem,.67rem);
			left: .2rem;
			bottom: 1.2rem;
			-webkit-background-size: 100% 100%; 
			background-size: 100% 100%;
		}
		.search{
			width: 96%;
		    bottom: .2rem;
		    position: absolute;
		    background-color: #fff;
		    border-radius: 6px;
		    margin: 0 2%;
		    .max{
		    	padding: .4rem 0 .4rem .3rem;
		    	.searchDest{
					@include sc(.36rem,#333333);
					position: relative;
					>i {
						@include ct();
						@include wh(.3rem,.08rem);
						background: url('//m.lvmama.com/flight/image/arrowHeader.png') no-repeat;
						-webkit-background-size: 100%;
						background-size: 100%;
						margin-left: .2rem;
					}
					> span:nth-child(3){
						position: absolute;
						left: 1.4rem;
					}
		    	}
		    	.searchDate{
	    		    margin-top: .1rem;
	    		    @include sc(.28rem,#333333);
		    	}
		    	.searchPrice{
		    		@include sc(.4rem,#ff6600);
				    margin-top: .15rem;
				    > span:first-child{
				    	@include sc(.24rem,#ff6600);
						margin-right: -0.1rem;
				    }
				    > span:last-child{
						@include sc(.22rem,#999999);
						margin-left: -0.06rem;
				    }
		    	}
		    	.searchButton{
		    		width:2.45rem;
		    		@include ct();
				    border-radius: 100px;
				    color: #FF9215;
				    text-align: center;
					right: .2rem;
					line-height: .48rem;
					border: 1px #FFCA8E solid;
		    	}
		    }
		}
		
	}
</style>