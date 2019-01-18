<template>
	<div class="flightList">
		<head-top path="/flight" :depart="depart" :dest="dest" :rightMenu="rightMenu" :lowPriceName="lowPriceName" @lowHandler="toLowPrice" @rightHandler="toFeedBack" :goPage="goPage"></head-top>
		<div class="panels y_flex between_x_flex"><!--v-bind:class="{'haveGoStrip':chosenBackTrip}"-->
			<div class="timeLeft" @click="prevClick" v-bind:class="{'gray': prevChangeColor}">
				<span>前一天</span>
				<span v-if="!prevChangeColor">&#165;{{dayBeforePrice}}</span>
				<span v-if="prevChangeColor">--</span>
			</div> 
			<!-- <router-link to='/vflight/datePicker/departDate/flightList' class="datePicker"> -->
			<div class="timeContent" @click="toSelectDate">
					<span v-if="!chosenBackTrip">{{departDate.month | addZero}}-{{departDate.date | addZero}}</span>
					<span v-if="chosenBackTrip">{{backDate.month | addZero}}-{{backDate.date | addZero}}</span>
					<span v-if="!chosenBackTrip">{{departDate.day}}</span>
					<span v-if="chosenBackTrip">{{backDate.day}}</span>
					<span v-if="price!=''&&price!=null"><i>&#165;</i>{{price}}</span>
					<span v-if="price==''||price==null">--</span>
			</div>
			<!-- </router-link> -->
			<div class="timeRight" @click="nextClick" v-bind:class="{'nextGray': nextChangeColor}">
				<span>后一天</span>
				<span v-if="!nextChangeColor">&#165;{{dayAfterPrice}}</span>
				<span v-if="nextChangeColor">--</span>
			</div>
		</div>
		<div class="goStrip" v-if="chosenBackTrip">
			<span class="stripImg">去</span>
			<p>
				<span>{{departDate.month}}-{{departDate.date}} {{departDate.day}}</span>
				<span v-show="flightInformationGo!=''">{{flightInformationGo.departureTime}}-{{flightInformationGo.arrivalTime}}</span>
				<span v-show="flightInformationGo!=''">{{flightInformationGo.carrierName}}</span>
				<span>&#165;{{selectSalesPrice}}</span>
			</p>
		</div>
		<div class="isScroll" v-bind:class="{'shiftDown': chosenBackTrip,'showTransParent':isShowFilter}">
			<div class="notice_container"  v-if="!chosenBackTrip && noticeArr.length>0">
				<notice-swiper :noticeArr="noticeArr"></notice-swiper>
			</div>
			<div class="flight_list_content">
				<common-list v-for="item in flightList" :flightList="item" :knockOrReduced="knockOrReduced" :flightArrList="flightList"></common-list>
				<div class="add_tranvel" @click="toCarTran" v-if="flightList != '' && flightList != null">
					<div class="left"></div>
					<div class="right">
						<p>没找到想要的？</p>
						<span>填写出行需求单，由客服为您提供定制服务</span>
					</div>
					<i></i>
				</div>
			</div>
		</div>
		<footer class="footer_contanier" v-if="showFooter"><!-- flightListInfor.length>0 -->
			<div class="clearfix">
				<div @click="chooseScreen" class="act_line xy_flex">
					<!-- <i class="choose" v-if="!changeColor"></i> -->
					<!-- <i class="choose screeningIcon" v-if="changeColor"></i> -->
					<span>筛选</span>
					<i class="choose" v-if="changeColor"></i>
				</div>
				<div @click="chooseTime('1')" class="act_line xy_flex">
					<!-- <i class="changeTime"  v-if="!timeFilterWord"></i>
					<i class="SoonerLater" v-if="timeIsPositive&&timeFilterWord"></i>
					<i class="nightEarly"  v-if="!timeIsPositive&&timeFilterWord"></i> -->
					<span v-if="!timeFilterWord">出发</span>
					<span v-if="timeIsPositive&&timeFilterWord">出发 早-晚</span>
					<span v-if="!timeIsPositive&&timeFilterWord">出发 晚-早</span>
				</div>
				<div @click="choosePrice('1')" class="xy_flex">
					<!-- <i class="saslePrice" v-if="!priceFilterWord"></i>
					<i class="isPrice"    v-if="priceIsPositive&&priceFilterWord"></i>
					<i class="Low_to_high" v-if="!priceIsPositive&&priceFilterWord"></i> -->
					<span v-if="!priceFilterWord">价格</span>
                	<span v-if="priceIsPositive&&priceFilterWord">价格 低-高</span>
                	<span v-if="!priceIsPositive&&priceFilterWord">价格 高-低</span>
				</div>
			</div>
		</footer>
		<div class="transAlert" v-if="isShowFilter" @click="isCancle">
		</div>
		<p class="result" v-if="isShowFilter">共{{resultLength}}条结果</p>
		<div class="flightListAnimate" v-bind:class="{transInfor: isShowFilter }">
			<div class="AnimateTop">
				<span @click="isCancle">取消</span>
				<span @click="clearSelect" v-bind:class="{'clearColor':changeColor}">清空筛选</span>
				<span @click="determine">确定</span>
			</div>
			<div class="AnimateUnder between_x_flex">
				<div class="leftContent">
					<span @click="selectType('departureTime')" v-bind:class="{'selectTypeBackColor': optionShow=='departureTime'}">起飞时间<i v-if="markingTime"></i></span>
					<span @click="selectType('airfield')" v-bind:class="{'selectTypeBackColor': optionShow=='airfield'}">机场<i v-if="markingAirport||arrivalAirport"></i></span>
					<span @click="selectType('models')" v-bind:class="{'selectTypeBackColor': optionShow=='models'}">机型<i v-if="markingAirModels"></i></span>
					<span @click="selectType('shippingSpace')" v-bind:class="{'selectTypeBackColor': optionShow=='shippingSpace'}">舱位<i v-if="markingSeat"></i></span>
					<span @click="selectType('airlines')" v-bind:class="{'selectTypeBackColor': optionShow=='airlines'}">航空公司<i v-if="markingCarrierName"></i></span>
				</div>
				<div class="rightContent">
					<ul class="contentList" v-show="optionShow=='departureTime'" >
						<li class="filter_type">起飞时间</li>
						<li class="content between_x_flex" v-bind:class="{'selectedLi':!markingTime}" @click="isSelectType('departureTime')">
							<span>不限</span>
							<i v-if="!markingTime"></i>
							<!-- <i v-bind:class="{'selectTGreen':!markingTime}"></i> -->
						</li>
						<li class="content between_x_flex" v-bind:class="{'selectedLi':item.isChecked}" v-for="(item,index) in departureAirportCode" :key="index" @click="isSelectType('departureTime',item)">
							<span>{{item.fieldDesc | replaceSymbol}}</span>
							<i v-if="item.isChecked"></i>
							<!-- <i v-bind:class="{'selectTGreen':item.isChecked}"></i> -->
						</li>
						
					</ul>
					<ul class="contentList airfield" v-if="optionShow=='airfield'">
						<li class="between_x_flex" style="margin-bottom:0;">
							<span class="especialColor">起飞机场</span>
						</li>
						<ul>
							<li class="content" v-bind:class="{'selectedLi':!markingAirport}" @click="isSelectType('airfield',null,'takeOff')">
								<span>不限</span>
								<i v-if="!markingAirport"></i>
								<!-- <i  v-bind:class="{'selectTGreen':!markingAirport}"></i> -->
							</li>
							<li class="content" v-bind:class="{'selectedLi':item.isChecked}" v-for="(item,index) in departureAirportName" :key="index" @click="isSelectType('airfield',item,'takeOff')">
								<span>{{item.fieldDesc}}</span>
								<i v-if="item.isChecked"></i>
								<!-- <i v-bind:class="{'selectTGreen':item.isChecked}"></i> -->
							</li>
							
						</ul>
						<li class="between_x_flex topOrder" style="margin-bottom:0;">
							<span class="especialColor">降落机场</span>
						</li>
						<ul>
							<li class="content" v-bind:class="{'selectedLi':!arrivalAirport}" @click="isSelectType('airfield',null,'landing')">
								<span>不限</span>
								<i v-if="!arrivalAirport"></i>
								<!-- <i v-bind:class="{'selectTGreen':!arrivalAirport}"></i> -->
							</li>
							<li class="content" v-bind:class="{'selectedLi':item.isChecked}" v-for="item in arrivalAirportName" @click="isSelectType('airfield',item,'landing')">
								<span>{{item.fieldDesc}}</span>
								<i v-if="item.isChecked"></i>
								<!-- <i v-bind:class="{'selectTGreen':item.isChecked}"></i> -->
							</li>
							
						</ul>
					</ul>
					<ul class="contentList" v-if="optionShow=='models'">
						<li class="filter_type">机型</li>
						<li class="content between_x_flex" v-bind:class="{'selectedLi':!markingAirModels}" @click="isSelectType('models')">
							<span>不限</span>
							<i v-if="!markingAirModels"></i>
							<!-- <i v-bind:class="{'selectTGreen':!markingAirModels}"></i> -->
						</li>
						<li class="content between_x_flex" v-bind:class="{'selectedLi':item.isChecked}" v-for="item in AirModels" @click="isSelectType('models',item)">
							<span>{{item.flightModels}}型机</span>
							<i v-if="item.isChecked"></i>
							<!-- <i v-bind:class="{'selectTGreen':item.isChecked}"></i> -->
						</li>
						
						
					</ul>
					<ul class="contentList" v-if="optionShow=='shippingSpace'">
						<li class="filter_type">舱位</li>
						<li class="content between_x_flex" v-bind:class="{'selectedLi':!markingSeat}" @click="isSelectType('shippingSpace')">
							<span>不限</span>
							<i v-if="!markingSeat"></i>
							<!-- <i v-bind:class="{'selectTGreen':!markingSeat}"></i> -->
						</li>
						<li class="content between_x_flex" v-bind:class="{'selectedLi':item.isChecked}" v-for="item in seatClassType" @click="isSelectType('shippingSpace',item)">
							<span>{{item.fieldDesc}}</span>
							<i v-if="item.isChecked"></i>
							<!-- <i v-bind:class="{'selectTGreen':item.isChecked}"></i> -->
						</li>
						
					</ul>
					<ul class="contentList shippingDepartment" v-if="optionShow=='airlines'">
						<li class="filter_type">航空公司</li>
						<li class="content between_x_flex" v-bind:class="{'selectedLi':!markingCarrierName}" @click="isSelectType('airlines')">
							<span>不限</span>
							<i v-if="!markingCarrierName"></i>
							<!-- <i v-bind:class="{'selectTGreen':!markingCarrierName}"></i> -->
						</li>
						<li class="content between_x_flex" v-bind:class="{'selectedLi':item.isChecked}" v-for="item in carrierName" @click="isSelectType('airlines',item)">
							<em>
								<airlines-logo :logoKind="item.value"></airlines-logo>
							</em>
							<span class="special">{{item.fieldDesc}}</span>
							<i v-if="item.isChecked"></i>
							<!-- <i v-bind:class="{'selectTGreen':item.isChecked}"></i> -->
						</li>
						
						
					</ul>
				</div>
			</div>
		</div>
		<noticeswiper-detail v-if="noticeDetail!=''"></noticeswiper-detail>
		 <div class="networkError" v-if="showNetwork">
			<div class="errorTop">
				<i></i>
				<p>网络链接异常，请检查网络设置</p>
			</div>
			<div class="errorUnder">
				<span @click="refresh">重新加载</span>
				<!-- <span><a href="tel:10106060,1,6"><i></i>拨打客服热线</a></span> -->
			</div>
		</div>
		<div class="noFlight" v-if="showNoFlight && flightList.length < 1">
			<div class="errorTop">
				<i></i>
				<p>很抱歉，今天没有{{depart}}直飞{{dest}}的航班</p>
				<span @click="toChangeDate">返回重选</span>
			</div>
			
		</div>
		 <div class="noResult" v-if="noResult">
			<span></span>
			<p>很抱歉，没有找到符合筛选条件的结果</p>
		</div>
		<div class="flight_transer" v-if="addSuccess">
			<div class="content_box">
				<div class="top">
					<p>低价提醒设置成功</p>
					<p>
						<span>{{depart}}-{{dest}}</span>
						<span>低于<i>￥{{inputPrice}}</i></span>
					</p>
					<p>{{departDate.month | addZero}}月{{departDate.date | addZero}}日-{{backDate.month | addZero}}月{{backDate.date | addZero}}日起飞</p>
					<p>发现低价第一时间通知您</p>
				</div>
				<div class="under">
					<span @click="know">我知道了</span>
					<span @click="goSee">去看看</span>
				</div>
			</div>
		</div>
		<alert-tip v-if="showMessage" :tipContent="message" :leftButton="leftButton"></alert-tip>
	</div>
	

</template>
<script>
	import headTop from '../../components/header/head'
	import alertTip from '../../components/common/alertTip'
	import { lQuery } from '../../plugins/lQuery'
	import { addZero,weekFormat,getStore,setStore,removeStore,getBookingSource,getNoticeSource,formatIOSDate,getStatisticsType,getElementTag,isClient,getLvSessionId,jumpLogin,getRequest } from '../../config/mUtils'
	import commonList from '../../components/commonList/commonList'
	import noticeSwiper from '../../components/common/notice-swiper-component'
	import { getFlightList,getNotice,getShowPriceFlag,getPromotionList,getFlightDaysPrice,getFlightCities,LowSubscription,getLvUser,getLvUserByCookie,lowPriceAdd,saveRecordTime } from '../../service/getData'
	import { mapActions,mapState } from 'vuex'
	import airlinesLogo from '../../components/common/airlinesLogo'
	import noticeswiperDetail from '../../components/common/notice-swiper-detail'
	
	const compare = (arr, property, isPositive) => {
              let arr1 = [], propertyTime = '', propertyPrice='';
            arr = JSON.parse(JSON.stringify(arr))
              if (property == 'fromtime') { 
                for (let i = 0; i < arr.length; i++) {
                  propertyTime = arr[i].departureTime.substring(11, 16);
                  let a = propertyTime.split(':');
                  let b = `${a[0]}${a[1]}`;
                  arr1.push(b);
                }
              } else {
                
                for (let i = 0; i < arr.length; i++) {
					if(arr[i].showMax==true){
						propertyPrice = arr[i].lowSeats.superSeat.salesParPrice;
					}else{
						propertyPrice = arr[i].lowSeats.LowSeat.salesParPrice;
					}
                  arr1.push(propertyPrice);
                }
              }

              function sequence(a, b) {
                return a - b;
              }
              arr1 = arr1.sort(sequence);
              if (!isPositive) {
                arr1 = arr1.reverse()
              }
              let arr2 = [];
              for (let i = 0; i < arr1.length; i++) {
                if (arr2.indexOf(arr1[i]) == -1) {
                  arr2.push(arr1[i]);
                }
              }
              let newArr = [];
              if (property == 'fromtime') {
                for (let i = 0; i < arr2.length; i++) {
                  for (let j = 0; j < arr.length; j++) {
					propertyTime = arr[j].departureTime.substring(11, 16);
                    let a = propertyTime.split(':');
                    let b = `${a[0]}${a[1]}`;
                    if (b == arr2[i]) {
                      newArr.push(arr[j]);
                    }
                  }
                }
              } else {
                for (let i = 0; i < arr2.length; i++) {
                  for (let j = 0; j < arr.length; j++) {
					  if(arr[j].showMax==true){
						    propertyPrice = arr[j].lowSeats.superSeat.salesParPrice;
						}else{
							propertyPrice = arr[j].lowSeats.LowSeat.salesParPrice;
						}
                   
                    if (propertyPrice == arr2[i]) {
                      newArr.push(arr[j]);
                    }
                  }
                }
              }
              return newArr;
    }
	export default{
		data(){
			return{
				goPage:'isFlightList',
				depart:"",
				dest:"",
				lowPrice:"",
				flightList:[],
				flightListInfor:[],
				allNewList:[],
                price:"",
                tripInfo:"去程",
                timeFilterWord: false,//时间排序
                timeIsPositive: false,//时间从早到晚
                isclick:false,
                priceFilterWord:true,
                priceIsPositive: true, //费用从少到多
                dayBeforePrice:"--",//前一天的价格
                dayAfterPrice:"--",//后一天的价格
                routeType: 'OW',//单程
                flightTripType: '',//往返程
                prevChangeColor:false,
                nextChangeColor:false,
                scrollLocation: '',//滚动位置
                ninetyYear:"",
                noticeArr:[],
                optionShow:'departureTime',
                isShowFilter:false,
                departureAirportCode:[],//起飞时间
                departureAirportName:[],//起飞机场
                arrivalAirportName:[],//到达机场
                seatClassType:[],//舱位
                carrierName:[],//航司
                AirModels:[],//机型
                rightMenu: '反馈意见',
				lowPriceName:'低价提醒',
                headerGoPath: `/${this.$parent.baseUrlPath}/feedBack`,
                noType:true,//不限
                markingTime:false,//标记起飞时间
				markingAirport:false,//标记起飞机场
				arrivalAirport:false,//标记降落机场
                markingAirModels:false,//标记机型
                markingSeat:false,//标记舱位
                markingCarrierName:false,//标记航司
                resultLength:"",
                changeColor:false,
                isTime:'',
                knockOrReduced:false,//区分立减和已减 true为立减
                showNetwork:false,//网络出错显示
                showNoFlight:false,//无航班显示
                noResult:false,
                msDay:'',//前一天
                nextDay:'',//后一天
                daysPrice:[],//低价
                showFooter:false,
                flightInformationGo:"",//去程航班信息
				isLogin:false,//是否登录
				inputPrice:'',//期望价格
				telNo:'',//手机号
				addSuccess:false,
				begTime:'',
				endBegTime:'',
				showMessage:false,
				message:'',
				leftButton:'',
				lowListLength:'',
				indexId:'',
				pageTime:'',
				backTime:'',
				nowTime:'',
				changePhone:false,
			}
		},
		components: {
  			headTop,
  			commonList,
  			noticeSwiper,
  			airlinesLogo,
  			noticeswiperDetail,
			alertTip,
  		},
  		computed:{
            ...mapState([
                'isDouble',
                'departDate',
                'backDate',
                'departureCity',
                'arrivalCity',
                'chosenGoTrip',//是否选了去程,去程为true
                'nowDateStamp',//当前时间戳
                'allMonthInfos',
                'flightInformation',//去程信息
                'chosenBackTrip',
                'noticeDetail',
                'selectSalesPrice',
                'goFlightList',
				'businessTravel'
            ])
        },
  		methods:{

  			...mapActions([
	            'initData'
			]),
			toCarTran(){
				getElementTag("搜索列表页引入","需求单填写页");
				setStore("goin",'flight');
				window.location.href="//m.lvmama.com/car/TravelDemand/flight/?goin=flight&hideAppHeader=1";
			},
  			//监听滚动位置
		      watchScrollLocation(){
		        this.scrollLocation = lQuery('.isScroll')[0].scrollTop;
		        // setStore("isScrollTop",lQuery('.isScroll')[0].scrollTop);
		      },
  			
  			//查詢耗時
			  getRecordTime(indexId,pageUsedTime,backUsedTime){
				saveRecordTime(indexId,pageUsedTime,backUsedTime).then((res) => {
					
				})
			  },

  			getFlightListInfo(fromCode,toCode,departureDate,routeType,flightTripType,bookingSource) {
	           	  this.$parent.showLoading = true;
	           	  this.price = "";
	           	  this.flightList = [];
	           	  this.showFooter = false;
                getFlightList(fromCode,toCode,departureDate,routeType,flightTripType,bookingSource, getStore("equipmentNo") || "",getStore('selectuserid') || "",getStore('selectid') || "",getStore('selectusername') || "").then((res) => {
                	this.indexId = res.data.queryKey;
					this.backTime = new Date().getTime();
					
                	this.$parent.showLoading = false;
                	this.flightList = [];
                	this.flightListInfor = [];
                	this.showNetwork = false;
                	this.showNoFlight = false;
                    if (res.code == '1') {
                    	this.allNewList = res.data.flightSearchFlightInfos;
                        let allList = res.data.flightSearchFlightInfos,
                        	// newAllList = res.data.flightSearchFlightInfos,
                        	departureSegment = res.data.searchFilter.departureTimeSegment.filters,//起飞时间
                        	takeAirport = res.data.searchFilter.departureAirportNameCode.filters,//起飞机场
                        	arriveAirport = res.data.searchFilter.arrivalAirportNameCode.filters,//到达机场
                        	shippingSpace = res.data.searchFilter.seatClassType.filters,//舱位
                        	shippingDepartment = res.data.searchFilter.carrierNameCode.filters,//航司
                            isArr = [],
                            airplaneType = [],
							arrPrice = [];
							if(shippingSpace.length>1&&JSON.stringify(shippingSpace).indexOf('公务舱')>-1&&JSON.stringify(shippingSpace).indexOf('头等舱')>-1){
								for(let i=shippingSpace.length-1;i>=0;i--){
									if(shippingSpace[i].fieldDesc=="头等舱"||shippingSpace[i].fieldDesc=="公务舱"){
										shippingSpace.splice(i,1);
									}
								}
								let filter={
									count:0,
									fieldDesc:'公务/头等舱',
									value:'C/F'
								}
								shippingSpace.push(filter);
							}
                        // let priceSum=0;
                        if(allList && allList.length > 0){
                          setStore("bookinguuid",res.data.uuid);
                            for (let i = 0; i < allList.length; i++) {
								// priceSum=priceSum-(-allList[i].lowSeats.LowSeat.salePrice);
                            	allList[i].isShowItem = true;
                               isArr.push(allList[i].lowSeats);
                               //机型
                               if(airplaneType.length==0 && allList[i].airplaneType!=''&&allList[i].airplaneType!=null){
                                	airplaneType.push(allList[i].airplaneType);
	                            }else{
	                                if(airplaneType.indexOf(allList[i].airplaneType)==-1&& allList[i].airplaneType!=''&&allList[i].airplaneType!=null){
	                                    airplaneType.push(allList[i].airplaneType);
	                                }
	                            }
                            };
							// console.log(priceSum/allList.length);
                        }

                        for (let k = 0; k < isArr.length; k++) {
                        	if(!this.knockOrReduced){
                        		//已减的价格
                        		arrPrice.push(isArr[k].LowSeat.salesParPrice);
                        	}else{
                        		//立减的价格
                        		arrPrice.push(isArr[k].LowSeat.salesParPrice-(-isArr[k].LowSeat.promotion));
                        	}
                           
                        };
                        arrPrice.sort(function(a,b){
                            return a-b
                        });

                        //判断返程如果是当天需要展示的数据
                        let newList = [],
                        	goTime = new Date(this.flightInformation.arrivalTime).getTime()+2*1000*60*60;

                        if(this.chosenBackTrip){
                        	if(this.departDate.year == this.backDate.year && this.departDate.month == this.backDate.month && this.departDate.date == this.backDate.date){
                        		for (let i = 0; i < allList.length; i++) {
                        			var hmDepartTime = new Date(allList[i].departureTime).getTime();
                        			if(hmDepartTime >= goTime){
                        				newList.push(allList[i]);
                        			}
                        		};
                        		this.flightList = newList;
                        		this.flightListInfor = newList;

                        	}else{
                        		this.flightList = allList;
                        		this.flightListInfor = allList;
                        	}

                        }else{
                        	this.flightList = allList;
                        	this.flightListInfor = allList;
                        }
                        this.showFooter = true;
                        // this.flightList = allList;
                        // this.flightListInfor = allList;

						this.price = arrPrice[0];
						if(this.inputPrice == '' || this.inputPrice == null){
							this.inputPrice = this.price-1;
						}
						if(getStore('departureAirportCode')){
							let departureAirportCode=JSON.parse(getStore('departureAirportCode'));
							for(let i=0;i<departureAirportCode.length;i++){
								for(let j=0;j<departureSegment.length;j++){
									if(departureSegment[j].fieldDesc==departureAirportCode[i].fieldDesc){
										departureSegment[j].isChecked=departureAirportCode[i].isChecked||false;
										break;
									}
								}
							}
						}
						if(getStore('departureAirportName')){
							let departureAirportName=JSON.parse(getStore('departureAirportName'));
							for(let i=0;i<departureAirportName.length;i++){
								for(let j=0;j<takeAirport.length;j++){
									if(takeAirport[j].fieldDesc==departureAirportName[i].fieldDesc){
										takeAirport[j].isChecked=departureAirportName[i].isChecked||false;
										break;
									}
								}
							}
						}
						if(getStore('arrivalAirportName')){
							let arrivalAirportName=JSON.parse(getStore('arrivalAirportName'));
							for(let i=0;i<arrivalAirportName.length;i++){
								for(let j=0;j<arriveAirport.length;j++){
									if(arriveAirport[j].fieldDesc==arrivalAirportName[i].fieldDesc){
										arriveAirport[j].isChecked=arrivalAirportName[i].isChecked||false;
										break;
									}
								}
							}
						}
						if(getStore('seatClassType')){
							let seatClassType=JSON.parse(getStore('seatClassType'));
							for(let i=0;i<seatClassType.length;i++){
								for(let j=0;j<shippingSpace.length;j++){
									if(shippingSpace[j].fieldDesc==seatClassType[i].fieldDesc){
										shippingSpace[j].isChecked=seatClassType[i].isChecked||false;
										break;
									}
								}
							}
						}
						if(getStore('carrierName')){
							let carrierName=JSON.parse(getStore('carrierName'));
							for(let i=0;i<carrierName.length;i++){
								for(let j=0;j<shippingDepartment.length;j++){
									if(shippingDepartment[j].fieldDesc==carrierName[i].fieldDesc){
										shippingDepartment[j].isChecked=carrierName[i].isChecked||false;
										break;
									}
								}
							}
						}
						// if(getStore('AirModels')){
						// 	let AirModels=JSON.parse(getStore('AirModels'));
						// 	for(let i=0;i<AirModels.length;i++){
						// 		for(let j=0;j<airplaneType.length;j++){
						// 			if(airplaneType[j].flightModels==AirModels[i].flightModels){
						// 				airplaneType[j].isChecked=AirModels[i].isChecked||false;
						// 				break;
						// 			}
						// 		}
						// 	}
						// }
						this.departureAirportCode = departureSegment;//起飞时间
                        this.departureAirportName = takeAirport;//起飞机场
                        this.arrivalAirportName = arriveAirport;//到达机场
                        this.seatClassType = shippingSpace;//舱位
                        this.carrierName = shippingDepartment;//航司
                        // this.AirModels = airplaneType;//机型
                        // this.departureAirportCode = getStore('departureAirportCode')?JSON.parse(getStore('departureAirportCode')):departureSegment;//起飞时间
                        // this.departureAirportName = getStore('departureAirportName')?JSON.parse(getStore('departureAirportName')):takeAirport;//起飞机场
                        // this.arrivalAirportName = getStore('arrivalAirportName')?JSON.parse(getStore('arrivalAirportName')):arriveAirport;//到达机场
                        // this.seatClassType = getStore('seatClassType')?JSON.parse(getStore('seatClassType')):shippingSpace;//舱位
                        // this.carrierName = getStore('carrierName')?JSON.parse(getStore('carrierName')):shippingDepartment;//航司
                        this.AirModels = getStore('AirModels')?JSON.parse(getStore('AirModels')):airplaneType;//机型
                        this.flightList = compare(this.flightList, 'price', true);
                        this.flightListInfor = compare(this.flightList, 'price', true);
                        
                        //从舱位页进来选返程清空筛选条件
                        if(getStore('sureBack')!=null){
                        	this.priceIsPositive = true;
				  			this.timeFilterWord = false;
				  			this.choosePrice();
                        	this.clearSelect();
	                    }
               			
                        let arr =[];
                        for (let i = 0; i<this.AirModels.length; i++) {
                    		let obj = {
                        		flightModels:this.AirModels[i].flightModels==null?this.AirModels[i]:this.AirModels[i].flightModels,
                        		isChecked:this.AirModels[i].isChecked==true?true:false
                        	}
                        	
                        	arr.push(obj);
                        };
                        this.AirModels = arr;
                       	this.determine();

                       	//活动展示
						for (let i = 0; i < this.flightList.length; i++) {
							let salesPromotion=[];
							let isPromotionList=this.flightList[i].tagMains;
							for (let k = 0; k < isPromotionList.length; k++) {
								// if(isPromotionList[k].tagContent.indexOf('|')>0){
									salesPromotion.push(isPromotionList[k].tagContent);
									this.flightList[i].promotionList = salesPromotion;
								// }
							};
						};
						for (let i = 0; i < this.flightListInfor.length; i++) {
							let salesPromotion=[];
							let isPromotionList=this.flightListInfor[i].tagMains;
							for (let k = 0; k < isPromotionList.length; k++) {
								// if(isPromotionList[k].tagContent.indexOf('|')>0){
									salesPromotion.push(isPromotionList[k].tagContent);
									this.flightListInfor[i].promotionList = salesPromotion;
								// }
							};
						};
                    //    let isPromotionList = JSON.parse(getStore('active'));
                    //    if(isPromotionList!=null&&isPromotionList.length>0){
                    //    		for (let i = 0; i < this.flightList.length; i++) {
              		// 			var salesPromotion=[];
              		// 			for (let k = 0; k < isPromotionList.length; k++) {
              		// 				if(isPromotionList[k].activityName.indexOf('|')>0){
              		// 					if(isPromotionList[k].allAirlineValid == false&&isPromotionList[k].activityRuleDto.length>0){
              		// 						if(JSON.stringify(isPromotionList[k].activityRuleDto).indexOf(this.flightList[i].carrierName)!=-1){
					// 							// if(isPromotionList[k].activityRuleDto[0].flightNo!=null&&isPromotionList[k].activityRuleDto[0].flightNo!=''){
					// 							// 	if(isPromotionList[k].activityRuleDto[0].flightNo.indexOf(this.flightList[i].flightNo)!=-1){
					// 							// 		salesPromotion.push(isPromotionList[k].activityName.split("|")[0]);
                    //                             //       	this.flightList[i].promotionList = salesPromotion;
					// 							// 	}
					// 							// }else{
                    //                             //     salesPromotion.push(isPromotionList[k].activityName.split("|")[0]);
					// 							// 	this.flightList[i].promotionList = salesPromotion;
					// 							// }
					// 							let flightNo="";
					// 							for(let j=0;j<isPromotionList[k].activityRuleDto.length;j++){
					// 								if(isPromotionList[k].activityRuleDto[j].flightNo!=null&&isPromotionList[k].activityRuleDto[j].flightNo!=''){
					// 									flightNo=flightNo+isPromotionList[k].activityRuleDto[j].flightNo;
					// 								}else{
					// 									flightNo="";
					// 									continue;
					// 								}
					// 							}
					// 							if(flightNo==""){
					// 								salesPromotion.push(isPromotionList[k].activityName.split("|")[0]);
					// 								this.flightList[i].promotionList = salesPromotion;
					// 							}else{
					// 								if(flightNo.indexOf(this.flightList[i].flightNo)!=-1){
					// 									salesPromotion.push(isPromotionList[k].activityName.split("|")[0]);
					// 									this.flightList[i].promotionList = salesPromotion;
					// 								}
					// 							}
                    //                           }

              		// 					}else{
              		// 						salesPromotion.push(isPromotionList[k].activityName.split("|")[0]);
              		// 						this.flightList[i].promotionList = salesPromotion;
              		// 					}

              		// 				}
              		// 			};
					// 		};
					// 		for (let i = 0; i < this.flightListInfor.length; i++) {
            		// 			var salesPromotion=[];
            		// 			for (let k = 0; k < isPromotionList.length; k++) {
            		// 				if(isPromotionList[k].activityName.indexOf('|')>0){
            		// 					if(isPromotionList[k].allAirlineValid == false&&isPromotionList[k].activityRuleDto.length>0){
            		// 						if(JSON.stringify(isPromotionList[k].activityRuleDto).indexOf(this.flightListInfor[i].carrierName)!=-1){
					// 							// if(isPromotionList[k].activityRuleDto[0].flightNo!=null&&isPromotionList[k].activityRuleDto[0].flightNo!=''){
					// 							// 	if(isPromotionList[k].activityRuleDto[0].flightNo.indexOf(this.flightListInfor[i].flightNo)!=-1){
					// 							// 		salesPromotion.push(isPromotionList[k].activityName.split("|")[0]);
					// 							// 		this.flightListInfor[i].promotionList = salesPromotion;
					// 							// 	}
					// 							// }else{
                    //                             //     salesPromotion.push(isPromotionList[k].activityName.split("|")[0]);
					// 							// 	this.flightListInfor[i].promotionList = salesPromotion;
					// 							// }
					// 							let flightNo="";
					// 							for(let j=0;j<isPromotionList[k].activityRuleDto.length;j++){
					// 								if(isPromotionList[k].activityRuleDto[j].flightNo!=null&&isPromotionList[k].activityRuleDto[j].flightNo!=''){
					// 									flightNo=flightNo+isPromotionList[k].activityRuleDto[j].flightNo;
					// 								}else{
					// 									flightNo="";
					// 									continue;
					// 								}
					// 							}
					// 							if(flightNo==""){
					// 								salesPromotion.push(isPromotionList[k].activityName.split("|")[0]);
					// 								this.flightListInfor[i].promotionList = salesPromotion;
					// 							}else{
					// 								if(flightNo.indexOf(this.flightListInfor[i].flightNo)!=-1){
					// 									salesPromotion.push(isPromotionList[k].activityName.split("|")[0]);
					// 									this.flightListInfor[i].promotionList = salesPromotion;
					// 								}
					// 							}
                    //                         }

            		// 					}else{
            		// 						salesPromotion.push(isPromotionList[k].activityName.split("|")[0]);
            		// 						this.flightListInfor[i].promotionList = salesPromotion;
            								
            		// 					}

            		// 				}
            		// 			};
            		// 		};
                    //    	}
                       	// JSON.parse(JSON.stringify(this.flightList));
                    }else if(res.code == '-1' || res.code == '5'){
                    	this.showNetwork = true;

                    }else if(res.code == '-2'){
                    	this.showNoFlight = true;
                    }
                    this.$nextTick(() => {
						this.pageTime = new Date().getTime();
						
						let pageUsedTime = this.pageTime - this.nowTime,
							backUsedTime = this.backTime - this.nowTime;
						if(this.indexId){
							this.getRecordTime(this.indexId,pageUsedTime,backUsedTime);
						}
					});

           //          if(getStore("isScrollTop")!=null && getStore("backHome")!=null){
			        // 	lQuery('.isScroll')[0].scrollTop=getStore("isScrollTop");
			        // }
			        // removeStore("isScrollTop");
                },()=>{
                	this.$parent.showLoading = false;
                	this.flightList = [];
                	this.flightListInfor = [];
                })
				
            },
            //通知
            noticeList(noticePlatform,noticeType,departureDate,departureCity,arrivalCity){
            	getNotice(noticePlatform,noticeType,departureDate,departureCity,arrivalCity).then((res) => {
            		
            		if(res.code == '1'){
            			this.noticeArr = res.data;
            			
            		}

            	})
            },
            //城市接口
			getCityFun(){
				getFlightCities().then((res) => {
					if(res.code == '1'){
						if(res.data){
							let postionCity = res.data.allCitys,
								newDepartCode = this.$route.params.goCityCode,
								newArriveCode = this.$route.params.backCityCode;

							for (let i = 0; i < postionCity.length; i++) {
								if(newDepartCode == postionCity[i].code){
									this.depart = postionCity[i].name;
								}
								if(newArriveCode == postionCity[i].code){
									this.dest = postionCity[i].name;

								}
							};

							let departObj ={
			                    key: 'departureCity',
			                    val: {
			                    	'airportCityCode':newDepartCode,
			                    	'code':newDepartCode,
			                    	'name':this.depart
			                    }
			                }
						 try{
							 this.initData(departObj);
						}  catch(e){}

			               let destObj ={
			                    key: 'arrivalCity',
			                    val: {
			                    	'airportCityCode':newArriveCode,
			                    	'code':newArriveCode,
			                    	'name':this.dest
			                    }
			                }
						 try{
							 this.initData(destObj);
						}  catch(e){}
						}

					}
				})
			},

            //活动接口
            activeDate(deptDate,deptCity,arriCity,bookingSource){
            	getPromotionList(deptDate,deptCity,arriCity,bookingSource).then((res) => {
            		if(res.code == '1'){
            			let isPromotionList = res.data;
            			setStore('active',JSON.stringify(isPromotionList));
            			if(this.flightList!=null&&this.flightList.length>0){
            				for (let i = 0; i < this.flightList.length; i++) {
            					var salesPromotion=[];
            					for (let k = 0; k < isPromotionList.length; k++) {
            						if(isPromotionList[k].activityName.indexOf('|')>0){
            							if(isPromotionList[k].allAirlineValid == false&&isPromotionList[k].activityRuleDto.length>0){
            								if(JSON.stringify(isPromotionList[k].activityRuleDto).indexOf(this.flightList[i].carrierName)!=-1){
													let flightNo="";
													for(let j=0;j<isPromotionList[k].activityRuleDto.length;j++){
														if(isPromotionList[k].activityRuleDto[j].flightNo!=null&&isPromotionList[k].activityRuleDto[j].flightNo!=''){
															flightNo=flightNo+isPromotionList[k].activityRuleDto[j].flightNo;
														}else{
															flightNo="";
															continue;
														}
													}
													if(flightNo==""){
														salesPromotion.push(isPromotionList[k].activityName.split("|")[0]);
														this.flightList[i].promotionList = salesPromotion;
													}else{
														if(flightNo.indexOf(this.flightList[i].flightNo)!=-1){
															salesPromotion.push(isPromotionList[k].activityName.split("|")[0]);
															this.flightList[i].promotionList = salesPromotion;
														}
													}
												// 	if(isPromotionList[k].activityRuleDto[0].flightNo!=null&&isPromotionList[k].activityRuleDto[0].flightNo!=''){
												// 		if(isPromotionList[k].activityRuleDto[0].flightNo.indexOf(this.flightList[i].flightNo)!=-1){
												// 			salesPromotion.push(isPromotionList[k].activityName.split("|")[0]);
												// 			this.flightList[i].promotionList = salesPromotion;
												// 		}
												// 	}else{
												// 		salesPromotion.push(isPromotionList[k].activityName.split("|")[0]);
												// 		this.flightList[i].promotionList = salesPromotion;
												// 	}
												
                                            }

            							}else{
            								salesPromotion.push(isPromotionList[k].activityName.split("|")[0]);
            								this.flightList[i].promotionList = salesPromotion;
            								
            							}

            						}
            					};
            				};


            				for (let i = 0; i < this.flightListInfor.length; i++) {
            					var salesPromotion=[];
            					for (let k = 0; k < isPromotionList.length; k++) {
            						if(isPromotionList[k].activityName.indexOf('|')>0){
            							if(isPromotionList[k].allAirlineValid == false&&isPromotionList[k].activityRuleDto.length>0){
            								if(JSON.stringify(isPromotionList[k].activityRuleDto).indexOf(this.flightListInfor[i].carrierName)!=-1){
												// if(isPromotionList[k].activityRuleDto[0].flightNo!=null&&isPromotionList[k].activityRuleDto[0].flightNo!=''){
												// 	if(isPromotionList[k].activityRuleDto[0].flightNo.indexOf(this.flightListInfor[i].flightNo)!=-1){
												// 		salesPromotion.push(isPromotionList[k].activityName.split("|")[0]);
												// 		this.flightListInfor[i].promotionList = salesPromotion;
												// 	}
												// }else{
                                                //     salesPromotion.push(isPromotionList[k].activityName.split("|")[0]);
												// 	this.flightListInfor[i].promotionList = salesPromotion;
												// }
												let flightNo="";
												for(let j=0;j<isPromotionList[k].activityRuleDto.length;j++){
													if(isPromotionList[k].activityRuleDto[j].flightNo!=null&&isPromotionList[k].activityRuleDto[j].flightNo!=''){
														flightNo=flightNo+isPromotionList[k].activityRuleDto[j].flightNo;
													}else{
														flightNo="";
														continue;
													}
												}
												if(flightNo==""){
													salesPromotion.push(isPromotionList[k].activityName.split("|")[0]);
													this.flightListInfor[i].promotionList = salesPromotion;
												}else{
													if(flightNo.indexOf(this.flightListInfor[i].flightNo)!=-1){
														salesPromotion.push(isPromotionList[k].activityName.split("|")[0]);
														this.flightListInfor[i].promotionList = salesPromotion;
													}
												}
                                            }

            							}else{
            								salesPromotion.push(isPromotionList[k].activityName.split("|")[0]);
            								this.flightListInfor[i].promotionList = salesPromotion;
            								
            							}

            						}
            					};
            				};

            				// this.flightListInfor = JSON.parse(JSON.stringify(this.flightList));
            				// console.log(this.flightListInfor);
            				// this.flightListInfor = this.allNewList;
            			}

            				let obj ={
			                    key: 'promotionList',
			                    val: isPromotionList
			                }
			               
							try{
								this.initData(obj);
							}catch(e){}
            		}
            		

            	})
            },
            //低价接口
        	getDayPrice(departureAirportCode,arrivalAirportCode,startDate,endDate){
           		getFlightDaysPrice(departureAirportCode,arrivalAirportCode,startDate,endDate).then((res) => {
        			if(res.code == "1"){
        				if(res.data&&res.data.dailPrices.length>0){
        					this.daysPrice = res.data;
	        				for (let i = 0; i < this.daysPrice.dailPrices.length;i++) {
			           	   		if(this.daysPrice.dailPrices[i].deptDate == this.msDay){
			           	   			this.dayBeforePrice = this.daysPrice.dailPrices[i].parPrice;
			           	   			
			           	   		}else if(this.daysPrice.dailPrices[i].deptDate == this.nextDay){
			           	   			this.dayAfterPrice = this.daysPrice.dailPrices[i].parPrice;
			           	   		}
			           	   }
        				}
        			}
        		})
			   },
			   //低价日历接口
			   getLowPriceDate(departureAirportCode,arrivalAirportCode,startDate,endDate){
				   this.inputPrice = "";
					getFlightDaysPrice(departureAirportCode,arrivalAirportCode,startDate,endDate).then((res) => {
						try {
							let datePriceList = res.data.dailPrices,
								startHm = new Date(formatIOSDate(startDate)).getTime(),
								endHm = new Date(formatIOSDate(endDate)).getTime();
							
								for (let i = 0; i < datePriceList.length; i++) {
									// console.log(datePriceList[i].parPrice);
									datePriceList[i].deptDate = new Date(formatIOSDate(datePriceList[i].deptDate)).getTime();
									if(datePriceList[i].deptDate>=startHm && datePriceList[i].deptDate<=endHm){
										this.inputPrice = datePriceList[i].parPrice -1;
										break;
									}
								}
						} catch (error) {
							this.inputPrice = "";
						}
					})
			   },
			
            
            //前一天后一天方法
            preNextDay(type){
            	if(!this.chosenBackTrip){
            		 var currentTime = `${this.departDate.year}-${this.departDate.month}-${this.departDate.date}`;

            	}else{
            		var currentTime = `${this.backDate.year}-${this.backDate.month}-${this.backDate.date}`;
            	}
	           // let currentTime = `${this.departDate.year}-${this.departDate.month}-${this.departDate.date}`,
	           	let formattingTime = new Date(formatIOSDate(currentTime)),
	           	   msTime = formattingTime.getTime(),
	           	   beforeTime = msTime - 1 * 24 * 60 * 60 * 1000,//前一天的毫秒数
	           	   afterTime = msTime + 1 * 24 * 60 * 60 * 1000,//后一天的毫秒数
	           	   // afterDate =	new Date(afterTime),//后一天的时间
	           	   afterDate =	new Date(afterTime),
	           	   afterYear = afterDate.getFullYear(),
	           	   afterMonth = afterDate.getMonth() + 1,
	           	   afterDay = afterDate.getDate(),
	           	   afterWeek = weekFormat(afterDate.getDay()),
	           	   // this.nextDay = `${afterYear}-${addZero(afterMonth)}-${addZero(afterDay)}`,
	           	  

	           	   // beforeDate = new Date(beforeTime),//前一天的时间
	           	   beforeDate = new Date(beforeTime),
	           	   beforeYear = beforeDate.getFullYear(),
	           	   beforeMonth = beforeDate.getMonth()+1,
	           	   beforeDay = beforeDate.getDate(),
	           	   beforeWeek = weekFormat(beforeDate.getDay()),

	           	   // this.msDay = `${beforeYear}-${addZero(beforeMonth)}-${addZero(beforeDay)}`,
	           	   
	           	  
	           	   nowDate = new Date(this.nowDateStamp),
	           	   nowDateYear = nowDate.getFullYear(),
	           	   nowDateMonth = nowDate.getMonth()+1,
	           	   nowDateDay = nowDate.getDate(),
	           	   nowNewDate = `${nowDateYear}-${nowDateMonth}-${nowDateDay}`;
	           	  
	           	   // this.nextDay = `${afterYear}-${addZero(afterMonth)}-${addZero(afterDay)}`;
	           	   // this.msDay = `${beforeYear}-${addZero(beforeMonth)}-${addZero(beforeDay)}`;
	           	  


	           	 
	           	  if(type=="prev"){
	           	  	if(!this.chosenBackTrip){
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
	           	  	}else{

	           	  		let newObj = {
				            key: 'backDate',
				            val:{
				            	year: beforeYear,
						        month: beforeMonth,
						        date: beforeDay,
						        day: beforeWeek
				            }
			            }
						try{
							this.initData(newObj);
						}catch(e){}
	           	  	}
		        
	           	   }else if(type=="next"){
	           	   		if(!this.chosenBackTrip){
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
	           	   		}else{
	           	   			let newObj = {
					            key: 'backDate',
					            val:{
					            	year: afterYear,
							        month: afterMonth,
							        date: afterDay,
							        day: afterWeek
					            }
				            }
							try{
								this.initData(newObj);
							}catch(e){}
	           	   		}
			            
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
	           	 	
	           	 		this.showNextPrice();
	           	   
        		
            },
            showNextPrice(){
            	if(!this.chosenBackTrip){
            		 var currentTime = `${this.departDate.year}-${this.departDate.month}-${this.departDate.date}`;

            	}else{
            		var currentTime = `${this.backDate.year}-${this.backDate.month}-${this.backDate.date}`;
            	}
            	// let currentTime = `${this.departDate.year}-${this.departDate.month}-${this.departDate.date}`,
	           	let formattingTime = new Date(formatIOSDate(currentTime)),
	           	   msTime = formattingTime.getTime(),
	           	   beforeTime = msTime - 1 * 24 * 60 * 60 * 1000,//前一天的毫秒数
	           	   afterTime = msTime + 1 * 24 * 60 * 60 * 1000,//后一天的毫秒数
	           	   // afterDate =	new Date(afterTime),//后一天的时间
	           	   afterDate =	new Date(afterTime),
	           	   afterYear = afterDate.getFullYear(),
	           	   afterMonth = afterDate.getMonth() + 1,
	           	   afterDay = afterDate.getDate(),
	           	   afterWeek = weekFormat(afterDate.getDay()),
	           	   // this.nextDay = `${afterYear}-${addZero(afterMonth)}-${addZero(afterDay)}`,
	           	  

	           	   // beforeDate = new Date(beforeTime),//前一天的时间
	           	   beforeDate = new Date(beforeTime),
	           	   beforeYear = beforeDate.getFullYear(),
	           	   beforeMonth = beforeDate.getMonth()+1,
	           	   beforeDay = beforeDate.getDate(),
	           	   beforeWeek = weekFormat(beforeDate.getDay()),

	           	   // this.msDay = `${beforeYear}-${addZero(beforeMonth)}-${addZero(beforeDay)}`,
	           	   
	           	  
	           	   nowDate = new Date(this.nowDateStamp),
	           	   nowDateYear = nowDate.getFullYear(),
	           	   nowDateMonth = nowDate.getMonth()+1,
	           	   nowDateDay = nowDate.getDate(),
	           	   nowNewDate = `${nowDateYear}-${nowDateMonth}-${nowDateDay}`;
	           	  
	           	   this.nextDay = `${afterYear}-${addZero(afterMonth)}-${addZero(afterDay)}`;
	           	   this.msDay = `${beforeYear}-${addZero(beforeMonth)}-${addZero(beforeDay)}`;
	           	 //页面展示低价调取接口
	           	let daysPrice = this.daysPrice.dailPrices||[];
	           	   for (let i = 0; i < daysPrice.length;i++) {
	           	   		if(daysPrice[i].deptDate == this.msDay){
	           	   			this.dayBeforePrice = daysPrice[i].parPrice;
	           	   			
	           	   		}else if(daysPrice[i].deptDate == this.nextDay){
	           	   			this.dayAfterPrice = daysPrice[i].parPrice;
	           	   		}
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
				let departcityCode = this.$route.params.goCityCode;
				let arrivalCityCode = this.$route.params.backCityCode;
	            if (this.isDouble && this.chosenGoTrip) {
	                // this.flightTripType = "DEPARTURE";
	                this.isTime = `${this.departDate.year}-${this.departDate.month}-${this.departDate.date}`;
	                // var departcityCode = this.departureCity.code;
	            	// var arrivalCityCode = this.arrivalCity.code;
	            }else if(!this.isDouble){
	            	this.isTime = `${this.departDate.year}-${this.departDate.month}-${this.departDate.date}`;
	            	// var departcityCode = this.departureCity.code;
	            	// var arrivalCityCode = this.arrivalCity.code;
	            }
	            if (this.isDouble && this.chosenBackTrip) {
	                // this.routeType = "RT";
	                // this.flightTripType = "RETURN";
	                this.isTime = `${this.backDate.year}-${this.backDate.month}-${this.backDate.date}`;
	                // var departcityCode = this.arrivalCity.code;
	            	// var arrivalCityCode = this.departureCity.code;
				};
            	this.getFlightListInfo(departcityCode,arrivalCityCode,this.isTime,this.routeType,this.flightTripType,getBookingSource());
  
            	this.noticeList(getNoticeSource(),"AIRLINE_LIST_PAGE",new Date(formatIOSDate(this.isTime)).getTime(),departcityCode,arrivalCityCode);

				// this.activeDate(this.isTime,this.departureCity.name,this.arrivalCity.name,getBookingSource());
				if(!this.chosenBackTrip){
					this.getCityFun();
				}
				if(!this.isDouble){
					let frontTime = `${this.departDate.year}-${this.departDate.month}-${this.departDate.date}`,
					standardTime = new Date(formatIOSDate(frontTime)).getTime(),//最早时间戳
					laterTime = standardTime+6*24*60*60*1000,
					standLaterT = new Date(laterTime),
					standYear = standLaterT.getFullYear(),
					standMonth = standLaterT.getMonth()+1,
					standDay = standLaterT.getDate(),
					standWeek = standLaterT.getDay(),
					endTime = `${standYear}-${standMonth}-${standDay}`;
					this.begTime = frontTime;
					this.endBegTime = endTime;
					let _obj = {
						key: 'backDate',
						val: {
							year: standYear,
							month: standMonth,
							date: standDay,
							day:weekFormat(standWeek)
						}
					}
					try{
						this.initData(_obj);
					}catch(e){}
					this.getLowPriceDate(departcityCode,arrivalCityCode,frontTime,endTime);
				}
				if(this.isLogin&&!this.isDouble&& !this.businessTravel){
					this.showLowType();
				}
            	this.setIflightDate();
            	
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
	            if (this.isDouble && this.chosenGoTrip) {
	                // this.flightTripType = "DEPARTURE";
	                this.isTime = `${this.departDate.year}-${this.departDate.month}-${this.departDate.date}`;
	                // var departcityCode = this.departureCity.code;
	            	// var arrivalCityCode = this.arrivalCity.code;
	            }else if(!this.isDouble){
	            	this.isTime = `${this.departDate.year}-${this.departDate.month}-${this.departDate.date}`;
	            	// var departcityCode = this.departureCity.code;
	            	// var arrivalCityCode = this.arrivalCity.code;
	            }
	            if (this.isDouble && this.chosenBackTrip) {
	                // this.routeType = "RT";
	                // this.flightTripType = "RETURN";
	                this.isTime = `${this.backDate.year}-${this.backDate.month}-${this.backDate.date}`;
	                // var departcityCode = this.arrivalCity.code;
	            	// var arrivalCityCode = this.departureCity.code;
	            };

            	this.getFlightListInfo(departcityCode,arrivalCityCode,this.isTime,this.routeType,this.flightTripType,getBookingSource());

	            this.noticeList(getNoticeSource(),"AIRLINE_LIST_PAGE",new Date(formatIOSDate(this.isTime)).getTime(),departcityCode,arrivalCityCode);

				// this.activeDate(this.isTime,this.departureCity.name,this.arrivalCity.name,getBookingSource());
				if(!this.chosenBackTrip){
					this.getCityFun();
				}
				if(!this.isDouble){
					let frontTime = `${this.departDate.year}-${this.departDate.month}-${this.departDate.date}`,
					standardTime = new Date(formatIOSDate(frontTime)).getTime(),//最早时间戳
					laterTime = standardTime+6*24*60*60*1000,
					standLaterT = new Date(laterTime),
					standYear = standLaterT.getFullYear(),
					standMonth = standLaterT.getMonth()+1,
					standDay = standLaterT.getDate(),
					standWeek = standLaterT.getDay(),
					endTime = `${standYear}-${standMonth}-${standDay}`;
					this.begTime = frontTime;
					this.endBegTime = endTime;
					let _obj = {
						key: 'backDate',
						val: {
							year: standYear,
							month: standMonth,
							date: standDay,
							day:weekFormat(standWeek)
						}
					}
					try{
						this.initData(_obj);
					}catch(e){}
					this.getLowPriceDate(departcityCode,arrivalCityCode,frontTime,endTime);
				}
				if(this.isLogin&&!this.isDouble&& !this.businessTravel){
					this.showLowType();
				}
            	this.setIflightDate();
            },
			//同步国际时间
			setIflightDate(){
				if(getStore('iFlight_chosen_sig')!=null && getStore('iFlight_chosen_sig')!=''){
					let iFlight = JSON.parse(getStore('iFlight_chosen_sig'));
					let d=`${this.departDate.year}-${this.departDate.month<10?'0'+this.departDate.month:this.departDate.month}-${this.departDate.date<10?'0'+this.departDate.date:this.departDate.date}`;
					iFlight.goDate.date=this.departDate.date;
					iFlight.goDate.dateStr=d.replace(/-/g, "");
					iFlight.goDate.day=new Date(formatIOSDate(d)).getDay();
					iFlight.goDate.month=this.departDate.month;
					iFlight.goDate.year=this.departDate.year;
					if(iFlight.backDate!=null && iFlight.backDate!=''){
						//判断往返去程日期大于返程日期
						let goTimeHm = new Date(`${this.departDate.year}/${this.departDate.month}/${this.departDate.date}`).getTime(),
							toTimeHm = new Date(`${this.backDate.year}/${this.backDate.month}/${this.backDate.date}`).getTime();
						if(goTimeHm > toTimeHm){
							let afterTime = goTimeHm + 4 * 24 * 60 * 60 * 1000,//后一天的毫秒数
								afterDate =	new Date(afterTime),
								afterYear = afterDate.getFullYear(),
								afterMonth = afterDate.getMonth() + 1,
								afterDay = afterDate.getDate(),
								afterWeek = weekFormat(afterDate.getDay());
								let newObj = {
									key: 'backDate',
									val:{
										year: afterYear,
										month: afterMonth,
										date: afterDay,
										day: afterWeek
									}
								}
								try{
									this.initData(newObj);
								}catch(e){}
							}
						let d=`${this.backDate.year}-${this.backDate.month<10?'0'+this.backDate.month:this.backDate.month}-${this.backDate.date<10?'0'+this.backDate.date:this.backDate.date}`;
						iFlight.backDate.date=this.backDate.date;
						iFlight.backDate.dateStr=d.replace(/-/g, "");
						iFlight.backDate.day=new Date(formatIOSDate(d)).getDay();
						iFlight.backDate.month=this.backDate.month;
						iFlight.backDate.year=this.backDate.year;
					}
					setStore('iFlight_chosen_sig',iFlight);
				}
			},
            chooseScreen(){
            	this.isShowFilter=true;
            	this.setChange();
            	this.markingCommon();
            	getElementTag("航班列表_筛选","机票航班列表");
            },
            //跳转日期页
            toSelectDate(){
            	if(this.chosenBackTrip){
            		this.$router.push(`/${this.$parent.baseUrlPath}/datePicker/backDate/flightList`);
            	}else{
            		this.$router.push(`/${this.$parent.baseUrlPath}/datePicker/departDate/flightList`);
				}
            	getElementTag("航班列表_切换日期","机票航班列表页");
            },
            //转化时间格式
            timeToInt(str) {
			    let sub = [], 
			    	subChild = [];
			    if (str.length > 0) {
			      sub = str.split(",")[1];
			    }
			    if (sub[0] != null) {
			      sub = sub.split('-');

			      subChild[0] = sub[0].split(':');
			      subChild[1] = sub[1].split(':');
			      subChild[0] = parseInt(subChild[0][0] + "" + subChild[0][1]);
			      subChild[1] = parseInt(subChild[1][0] + "" + subChild[1][1]);
			    } else {
			      subChild[0] = str;
			      subChild[1] = null;
			    }
			    return subChild;
			    
			 },
			 //筛选函数
			 allFliter(seltype, select,flights){
			 	if(seltype == 'changeTime'){
			 		if(select.length>0){
			 			let getTime = [],
        				    setTime = [],
        				    count = 0,
        				    lemo = [];
        				    for (let i = 0; i < flights.length; i++) {
        				    	let getTimeFromJson = [];
        				    	lemo = flights[i].departureTime.split(' ');
        				    	getTimeFromJson = lemo[1].split(':');
          						getTime[i] = parseInt(getTimeFromJson[0] + "" + getTimeFromJson[1]);
        				    };
        				    for (var i = 0; i < flights.length; i++) {
					          if (getTime[i] >= select[0] && getTime[i] < select[1]) {
					            setTime[count] = flights[i];
					            count++;
					          }
					        }
					        return setTime;
			 		}else{
			 			return flights;
			 		}

			 	}else if(seltype == 'changeDep'){
			 		if (select.length > 0) {
			 			 let setChipping = [],
        					 count = 0;
        				for (var i = 0; i < flights.length; i++) {
				          if (select == flights[i].departureAirportName) {
				            setChipping[count] = flights[i];
				            count++;
				          }
				        }
				        return setChipping;
			 		}else{
			 			return flights;
			 		}

			 	}else if(seltype == 'changeArr'){

			 		if(select.length > 0){
				 		let setChipping = [],
	        				count = 0;
        					for (var i = 0; i < flights.length; i++) {
					          if (select == flights[i].arrivalAirportName) {
					            setChipping[count] = flights[i];
					            count++;
					          }
					        }
					       return setChipping; 
        				}else{
        					return flights;
        				}
			 	}else if(seltype == 'changeType'){
			 		 if (select.length > 0) {
			 		 	var setChipping = [],
        					count = 0;
        				for (var i = 0; i < flights.length; i++) {
				          if (select.indexOf(flights[i].airplaneType) >= 0 && flights[i].airplaneType!="") {
				            setChipping[count] = flights[i];
				            count++;
				          }
				        }
				        return setChipping;
			 		 }else{
			 		 	return flights;
			 		 }
			 	}else if(seltype == 'changeSeat'){
			 		if (select.length > 0) {
			 			var setChipping = [],
        					count = 0;
        				for (var i = 0; i < flights.length; i++) {
							if(select.indexOf("/")>-1){
								let selects=select.split("/");
								if (flights[i].lowSeats.LowSeat.seatClassName.indexOf(selects[0]) >= 0||flights[i].lowSeats.LowSeat.seatClassName.indexOf(selects[1]) >= 0) {
									setChipping[count] = flights[i];
									count++;
								}else if(flights[i].lowSeats.superSeat!=null&&(flights[i].lowSeats.superSeat.seatClassName.indexOf(selects[0]) >= 0||flights[i].lowSeats.superSeat.seatClassName.indexOf(selects[1]) >= 0)){
									flights[i].showMax=true;
									setChipping[count] = flights[i];
									count++;
								}
							}else{
								if (flights[i].lowSeats.LowSeat.seatClassName.indexOf(select) >= 0) {
									setChipping[count] = flights[i];
									count++;
								}else if(flights[i].lowSeats.superSeat!=null&&flights[i].lowSeats.superSeat.seatClassName.indexOf(select) >= 0){
									flights[i].showMax=true;
									setChipping[count] = flights[i];
									count++;
								}
							}
				        }
				        return setChipping;
			 		}else{
			 			return flights;
			 		}
			 	}else if(seltype == 'changeCom'){
			 		if (select.length > 0) {
			 			var setChipping = [],
        					count = 0;
        				for (var i = 0; i < flights.length; i++) {
				          if (select == flights[i].carrierName) {
				                setChipping[count] = flights[i];
				                count++;
				              }
				        }
				         return setChipping;
			 		}else{
			 			return flights;
			 		}
			 	}



			 },
			 //确定筛选
            determine(type){
            	 let changeTime = [], changeDep = [], changeArr = [], changeType = [], changeSeat = [], changeCom = [];
    			let  result = [], result1 = [], result2 = [], result3 = [], result4 = [], result5 = [];
    			//起飞时间
    			for (let i = 0; i < this.departureAirportCode.length; i++) {
    				if(this.departureAirportCode[i].isChecked == true){
    					changeTime.push(this.departureAirportCode[i].fieldDesc);
    				}
    			};
    			if(changeTime.length == 0){
    				result = this.flightListInfor;
    			}else {
    				for (let k = 0; k < changeTime.length; k++) {
    					if(k == 0){
    						 result = this.allFliter('changeTime', this.timeToInt(changeTime[k]), this.flightListInfor);
    					}else{
    						let results = this.allFliter('changeTime', this.timeToInt(changeTime[k]), this.flightListInfor);
    						for (var j = 0; j <results.length; j++) {
    							result.push(results[j]);
    						};
    					}
    				};
    				
    			}
    			
    			//出发机场
    			for (let i = 0; i < this.departureAirportName.length; i++) {
			      if (this.departureAirportName[i].isChecked == true) {
			        changeDep.push(this.departureAirportName[i].fieldDesc);
			      }
			    }
			    if(changeDep.length == 0) {
			    	result1 = result;
			    }else{
			    	for(let k = 0; k < changeDep.length; k++) {
			    		if(k === 0){
			    			result1 = this.allFliter('changeDep',changeDep[k], result);
			    			
			    		}else{
			    			var result1s = this.allFliter('changeDep', changeDep[k], result);
			    			for(var j = 0; j < result1s.length; j++) {
					            result1.push(result1s[j]);
					        }
			    		}
			    	};
			    }
    			

    			//到达机场
    			
    			for (var i = 0; i < this.arrivalAirportName.length; i++) {
			      if (this.arrivalAirportName[i].isChecked == true){
			          changeArr.push( this.arrivalAirportName[i].fieldDesc);
			      }
			    }
			     if (changeArr.length == 0) {
			     	result2 = result1;
			     }else{
			     	for (var i = 0; i < changeArr.length; i++) {
			     		if(i == 0){
			     			result2 = this.allFliter('changeArr', changeArr[i], result1);
			     		}else{
			     			var result2s = this.allFliter('changeArr', changeArr[i], result1);
			     			for (var j = 0; j < result2s.length; j++) {
					            result2.push(result2s[j]);
					        }
			     		}
			     	}
			     }

    			 //机型
    			
    			for (var i = 0; i < this.AirModels.length; i++) {
			        if (this.AirModels[i].isChecked == true) {
			        	changeType.push(this.AirModels[i].flightModels);

			        }
			    }
			    if (changeType.length == 0){
			    	result3 = result2;
			    }else{
			    	for (var i = 0; i < changeType.length; i++) {
			    		if (i == 0) {
			    			result3 = this.allFliter('changeType', changeType[i], result2);
			    		}else{
			    			var result3s = this.allFliter('changeType', changeType[i], result2);
			    			for (var j = 0; j < result3s.length; j++) {
					            result3.push(result3s[j]);
					        }
			    		}
			    	}
			    }
			    

    			//舱位

    			 for (var i = 0; i < this.seatClassType.length; i++) {
				      if (this.seatClassType[i].isChecked == true) {
				        	changeSeat.push(this.seatClassType[i].fieldDesc);
				      }
			     }
				for(let i=0;i<result3.length;i++){
					result3[i].showMax=false;
					result3[i].checkType=null;
				}
			    if (changeSeat.length == 0){
			    	 result4 = result3;
			    }else{
			    	//  for (var i = 0; i < changeSeat.length; i++) {
			    	//  	if(i == 0){
			    	//  		result4 = this.allFliter('changeSeat', changeSeat[i], result3);
			    	//  	}else{
			    	//  		var result4s = this.allFliter('changeSeat', changeSeat[i], result3);
					//         for (var j = 0; j < result4s.length; j++) {
					//             result4.push(result4s[j]);
					//         }
			    	//  	}
					//  }
					for(let i=0;i<result3.length;i++){
						result3[i].checkType=changeSeat[0];
					}
					result4 = this.allFliter('changeSeat', changeSeat[0], result3);
			    }

			  

    			//航司
    			for (var i = 0; i < this.carrierName.length; i++) {
			      if (this.carrierName[i].isChecked == true) {
			        changeCom.push(this.carrierName[i].fieldDesc);
			      }
			    }
			    if (changeCom.length == 0) {
			    	 result5 = result4;
			    }else{
			    	for (var i = 0; i < changeCom.length; i++) {
			    		if (i == 0) {
			    			 result5 = this.allFliter('changeCom', changeCom[i], result4);
			    		}else{
			    			var result5s = this.allFliter('changeCom', changeCom[i], result4);
			    			for (var j = 0; j < result5s.length; j++) {
					            result5.push(result5s[j]);
					        }
			    		}
			    	}
			    }
			    this.resultLength = result5.length;
			    if(type == "results"){
			    	return;
			    }
			      this.setChange();
			      this.flightList = result5;
		      	  // for (let i = 0; i < this.flightList.length; i++) {
	          //       let that=this;
	          //         ((i) => {
	          //         	setTimeout(() => {
	          //             that.$set(that.flightList[i],'isShowItem',true);
	          //         	},80 * i);
	          //         })(i);
	          //      }
                   let that=this;
                   setTimeout(function(){
                   	 that.isShowFilter=false;
                   },50)
    			  
    			  this.isclick=false;

    			 let selectTrue = this.whetherSelect();
            	 this.changeColor = selectTrue;

            	 if(this.timeFilterWord){
				     this.chooseTime();
				 }else if (this.priceFilterWord){
				     this.choosePrice();
				 }

    			  if(this.resultLength == 0){
    			  		this.noResult = true;
    			  }else{
    			  	   this.noResult = false;
    			  }
            },

            
            //选择筛选类型
            selectType(type){
            	this.optionShow = type;
            },
            //勾选条件
            isSelectType(type,item,airportType){
            	//起飞时间
            	if(type == 'departureTime'){
            		// let flag = false;
            		if(item == null){
            			// this.noType = true;
            			this.markingTime = false;
            			for (let i = 0; i<this.departureAirportCode.length; i++) {
            				this.departureAirportCode[i].isChecked = false;
            			};
            		}else{
            			item.isChecked = !item.isChecked;
            			this.markingTime = false;
            			for (let i = 0; i<this.departureAirportCode.length; i++) {
            				if(this.departureAirportCode[i].isChecked == true){
            					this.markingTime = true;
            				}
            			};
            		}
            		
	            }else if(type == 'airfield'){
	            	//选择机场
	            	if(airportType == 'takeOff'){
	            		//起飞机场
	            		if(item == null){
	            			this.markingAirport = false;
	            			for (let i = 0; i<this.departureAirportName.length; i++) {
            					this.departureAirportName[i].isChecked = false;
            				};
	            		}else{
	            			this.markingAirport = false;
	            			item.isChecked = !item.isChecked;
	            			for (let i = 0; i<this.departureAirportName.length; i++) {
	            				if(this.departureAirportName[i].isChecked == true){
	            					
	            					this.markingAirport = true;
	            				}
            					
            				};

	            		}
	            	}else if(airportType == 'landing'){
	            		//降落机场
	            		if(item == null){
	            			this.arrivalAirport = false;
	            			for (let i = 0; i<this.arrivalAirportName.length; i++) {
            					this.arrivalAirportName[i].isChecked = false;
            				};
	            		}else{
	            			this.arrivalAirport = false;
	            			item.isChecked = !item.isChecked;
	            			for (let i = 0; i<this.arrivalAirportName.length; i++) {
	            				if(this.arrivalAirportName[i].isChecked == true){
	            					this.arrivalAirport = true;
	            				}
            					
            				};

	            		}

	            	}

	            }else if(type == 'models'){
	            	//选择机型
            		if(item == null){
            			this.markingAirModels = false;
            			for (let i = 0; i<this.AirModels.length; i++) {
            				this.AirModels[i].isChecked = false;
            			};
            		}else{
            			item.isChecked = !item.isChecked;
            			this.markingAirModels = false;
            			for (let i = 0; i<this.AirModels.length; i++) {
            				if(this.AirModels[i].isChecked == true){
            					this.markingAirModels = true;
            				}
            			};
            		}
	            }else if(type == 'shippingSpace'){
	            	
	            	//选择舱位
            		if(item == null){
            			this.markingSeat = false;
            			for (let i = 0; i<this.seatClassType.length; i++) {
            				this.seatClassType[i].isChecked = false;
            			};
            		}else{
            			item.isChecked = !item.isChecked;
            			this.markingSeat = false;
            			for (let i = 0; i<this.seatClassType.length; i++) {
            				if(this.seatClassType[i].isChecked == true){
            					this.markingSeat = true;
							}
							if(item.isChecked==true&&this.seatClassType[i].fieldDesc!=item.fieldDesc){
								this.seatClassType[i].isChecked=false;
							}
            			};
            			
            		}
	            }else if(type == 'airlines'){
	            	//选择航司
            		if(item == null){
            			this.markingCarrierName = false;
            			for (let i = 0; i<this.carrierName.length; i++) {
            				this.carrierName[i].isChecked = false;
            			};
            		}else{
            			item.isChecked = !item.isChecked;
            			this.markingCarrierName = false;
            			for (let i = 0; i<this.carrierName.length; i++) {
            				if(this.carrierName[i].isChecked == true){
            					this.markingCarrierName = true;
            				}
            			};
            		}


	            }

	            let selectTrue = this.whetherSelect();
            	this.changeColor = selectTrue;
            	this.determine('results');
            	
            	
            },

            //缓存筛选信息
            setChange(){
            	setStore('departureAirportCode',this.departureAirportCode)//起飞时间
            	setStore('departureAirportName',this.departureAirportName)//出发机场
            	setStore('arrivalAirportName',this.arrivalAirportName)//到达机场
            	setStore('AirModels',this.AirModels)//机型
            	setStore('seatClassType',this.seatClassType)//舱位
            	setStore('carrierName',this.carrierName)//航司

            },
            //回到上一次勾选的筛选信息缓存
            delChange(){
            	this.departureAirportCode = JSON.parse(getStore('departureAirportCode'));
            	this.departureAirportName = JSON.parse(getStore('departureAirportName'));
            	this.arrivalAirportName = JSON.parse(getStore('arrivalAirportName'));
            	this.AirModels = JSON.parse(getStore('AirModels'));
            	this.seatClassType = JSON.parse(getStore('seatClassType'));
            	this.carrierName = JSON.parse(getStore('carrierName'));
            	let selectTrue = this.whetherSelect();
            	this.changeColor = selectTrue;

            },
            //是否有选中的筛选条件
            whetherSelect(){
            	for (let i = 0; i< this.departureAirportCode.length; i++) {
            		if(this.departureAirportCode[i].isChecked == true){
            			return true;
            		}
            	};

            	for (let i = 0; i< this.departureAirportName.length; i++) {
            		if(this.departureAirportName[i].isChecked == true){
            			return true;
            		}
            	};
            	for (let i = 0; i< this.arrivalAirportName.length; i++) {
            		if(this.arrivalAirportName[i].isChecked == true){
            			return true;
            		}
            	};
            	for (let i = 0; i< this.AirModels.length; i++) {
            		if(this.AirModels[i].isChecked == true){
            			return true;
            		}
            	};
            	for (let i = 0; i< this.seatClassType.length; i++) {
            		if(this.seatClassType[i].isChecked == true){
            			return true;
            		}
            	};
            	for (let i = 0; i< this.carrierName.length; i++) {
            		if(this.carrierName[i].isChecked == true){
            			return true;
            		}
            	};
            	 return false;
            },
            //取消筛选
            isCancle(){
            	this.resultLength = this.flightList.length;
            	this.isShowFilter = false;
            	this.delChange();
            	this.markingCommon();
            },
            markingCommon(){
            	this.markingTime = false;//标记起飞时间
				this.markingAirport = false;//标记起飞机场
				this.arrivalAirport = false;//标记降落机场
                this.markingAirModels = false;//标记机型
                this.markingSeat = false;//标记舱位
                this.markingCarrierName = false;//标记航司
            	for (let i = 0; i< this.departureAirportCode.length; i++) {
            		if(this.departureAirportCode[i].isChecked == true){
            			this.markingTime = true;
            		}
            	};
            	for (let i = 0; i< this.departureAirportName.length; i++) {
            		if(this.departureAirportName[i].isChecked == true){
            			this.markingAirport = true;
            		}
            	};
            	for (let i = 0; i< this.arrivalAirportName.length; i++) {
            		if(this.arrivalAirportName[i].isChecked == true){
            			this.arrivalAirport = true;
            		}
            	};
            	for (let i = 0; i< this.AirModels.length; i++) {
            		if(this.AirModels[i].isChecked == true){
            			this.markingAirModels = true;
            		}
            	};
            	for (let i = 0; i< this.seatClassType.length; i++) {
            		if(this.seatClassType[i].isChecked == true){
            			this.markingSeat = true;
            		}
            	};
            	for (let i = 0; i< this.carrierName.length; i++) {
            		if(this.carrierName[i].isChecked == true){
            			this.markingCarrierName = true;
            		}
            	};
            },
            //清空筛选
            clearSelect(){
            	for (let i = 0; i< this.departureAirportCode.length; i++) {
            		this.departureAirportCode[i].isChecked = false;
            	};

            	for (let i = 0; i< this.departureAirportName.length; i++) {
            		this.departureAirportName[i].isChecked = false;
            	};

            	for (let i = 0; i< this.arrivalAirportName.length; i++) {
            		this.arrivalAirportName[i].isChecked = false;
            	};

            	for (let i = 0; i< this.AirModels.length; i++) {
            		this.AirModels[i].isChecked = false;
            	};

            	for (let i = 0; i< this.seatClassType.length; i++) {
            		this.seatClassType[i].isChecked = false;
            	};

            	for (let i = 0; i< this.carrierName.length; i++) {
            		this.carrierName[i].isChecked = false;
            	};

            	 let selectTrue = this.whetherSelect();
            	 this.changeColor = selectTrue;

            	this.markingTime = false;//时间
				this.markingAirport = false;//机场
				this.arrivalAirport = false;
                this.markingAirModels = false;//机型
                this.markingSeat = false;//舱位
                this.markingCarrierName = false;//航司
                this.noResult = false;
                this.resultLength = this.flightListInfor.length;
                // this.resultLength = this.allNewList.length;
            },
            //点击时间
            chooseTime(type){
            	let list = this.flightList;
            	if(type!=null){
            		this.timeIsPositive=!this.timeIsPositive;
            		if(this.timeIsPositive == true){
            			this.flightList = compare(list, 'fromtime', true);
	            	}else{
	            		this.flightList = compare(list, 'fromtime', false);
	            	}
	            	getElementTag("航班列表_时间排序","机票航班列表");
            	}else{
            		if(this.timeIsPositive == true){
            			this.flightList = compare(list, 'fromtime', true);
	            	}else{
	            		this.flightList = compare(list, 'fromtime', false);
	            	}
            	}

                this.priceIsPositive=false;
             	this.priceFilterWord=false;
                this.timeFilterWord=true;


            },
            //点击价格
            choosePrice(type){
            	let list = this.flightList;
            	if(type!=null){
            		this.priceIsPositive=!this.priceIsPositive;
            		if(this.priceIsPositive == true){
            			this.flightList = compare(list, 'price', true);
	            	}else{
	            		this.flightList = compare(list, 'price', false);
	            	}
	            	getElementTag("航班列表_价格排序","机票航班列表");
            	}else{
            		if(this.priceIsPositive == true){
            			this.flightList = compare(list, 'price', true);
	            	}else{
	            		this.flightList = compare(list, 'price', false);
	            	}
            	}

                 this.priceFilterWord=true;
                 this.timeFilterWord=false;
                 this.timeIsPositive=false;
            },
            toFeedBack() {
            	getElementTag("航班列表_反馈意见","航班列表页");
            	this.$router.push(`/${this.$parent.baseUrlPath}/feedBack/flight_list`);
            },
            // 刷新
            refresh(){
            	if(isClient()==1){
                    NativeUtil.lvCommon("lvJSRefreshWebView");
                }else{
                    window.location.reload();
                }
            },
            //没有航班
            toChangeDate(){
            	// if(this.chosenBackTrip){
            	// 	this.$router.push(`/${this.$parent.baseUrlPath}/datePicker/backDate/flightList`);
            	// }else{
            	// 	this.$router.push(`/${this.$parent.baseUrlPath}/datePicker/departDate/flightList`);
				// }
				if(getStore('iFlightJumpType')!=null){
					 window.location.href="//m.lvmama.com/iflight/main/?hideAppHeader=1";
				}else{
					this.$router.push(`/${this.$parent.baseUrlPath}/home`);
				}
            },
			//判断显示低价提醒还是我的提醒
			 async showLowType(){
				 try {
					 let res = await LowSubscription();
					 var lowPriceList = res.data;
					 this.lowListLength = lowPriceList.length;
					 let departTime = `${this.departDate.year}-${addZero(this.departDate.month)}-${addZero(this.departDate.date)}`,
							standardTime = new Date(formatIOSDate(departTime)).getTime(),//最早时间戳
							laterTime = standardTime+6*24*60*60*1000,
							standLaterT = new Date(laterTime),
							standYear = standLaterT.getFullYear(),
							standMonth = standLaterT.getMonth()+1,
							standDay = standLaterT.getDate(),
							standWeek = standLaterT.getDay(),
							laterDay = `${standYear}-${standMonth}-${standDay}`;
					 
					 for (let i = 0; i < lowPriceList.length; i++) {
						 lowPriceList[i].beginDepDate = lowPriceList[i].beginDepDate.split(' ')[0];
						 lowPriceList[i].endDepDate = lowPriceList[i].endDepDate.split(' ')[0];
						//  console.log(lowPriceList[i].deptCode+"--"+this.departureCity.code+"--"+lowPriceList[i].arriCode+"--"+this.arrivalCity.code+"--"+departTime+"--"+lowPriceList[i].beginDepDate+"--"+lowPriceList[i].endDepDate);
						 if(lowPriceList[i].deptCode == this.departureCity.code && lowPriceList[i].arriCode == this.arrivalCity.code &&departTime>=lowPriceList[i].beginDepDate && departTime<=lowPriceList[i].endDepDate){
							this.lowPriceName = '我的提醒';
							break;
						 }else{
							 this.lowPriceName = '低价提醒';
						 }
					 }
					 
				 } catch (error) {
					 
				 }

			 },
			//点击添加提价提醒
			 toLowPrice(){
				if(this.isLogin){
					 if(this.lowPriceName == '低价提醒'){
						//低价提醒添加接口
						if(this.inputPrice !='' && this.inputPrice !=null){
							if(this.lowListLength >= 20){
								this.message = "小驴提醒，低价提醒任务最多只支持20条";
								this.showMessage = true;
								setTimeout(() => {
									this.showMessage = false;
								},2000);
								return;
							}
							lowPriceAdd(this.departureCity.code,this.arrivalCity.code,getBookingSource(),this.begTime,this.endBegTime,this.inputPrice,this.telNo).then((res) => {
								this.$parent.showLoading = false;
								let resCode = res.code;
								if(resCode == '1'){
									this.addSuccess = true;
								}
							},()=>{
								this.$parent.showLoading = false;
							})
						}else{
							this.message = `抱歉，没有${this.depart}到${this.dest}的航班`;
							this.showMessage = true;
							setTimeout(() => {
								this.showMessage = false;
							},2000);
						}
						
					 }else if(this.lowPriceName == '我的提醒'){
						 let isTime = `${this.departDate.year}-${this.departDate.month}-${this.departDate.date}`,
						     herfUrl = `${this.departureCity.code}-${this.arrivalCity.code}/${isTime}`;
						 setStore('remindFrom',herfUrl);
						 this.$router.push(`/${this.$parent.baseUrlPath}/lowPriceRemind`);
					 }
				}else{
					jumpLogin();
				}

			 },
			 know(){
				 this.addSuccess = false;
				 this.lowPriceName = '我的提醒';
			 },
			 goSee(){
				 this.addSuccess = false;
				 let isTime = `${this.departDate.year}-${this.departDate.month}-${this.departDate.date}`,
					herfUrl = `${this.departureCity.code}-${this.arrivalCity.code}/${isTime}`;
				 setStore('remindFrom',herfUrl);
				 this.$router.push(`/${this.$parent.baseUrlPath}/lowPriceRemind`);
			 }

  		},
  		created(){

  		},
  		activated(){
			let changeFlightCity=getRequest();
			if(changeFlightCity["firstChannel"]!=null){
				var ropRequest={};
				ropRequest.mobileBrand=changeFlightCity["firstChannel"];
				ropRequest.idfa=changeFlightCity["lvidfa"];
				ropRequest.idfaappVersion=changeFlightCity["lvversion"];
				ropRequest.idfaSource='';
				ropRequest.idfaSourceRemark='';
				ropRequest.activeTime=changeFlightCity["clientTimestamp"];
				ropRequest.uuid=changeFlightCity["udid"];
				setStore("flightRopRequest",ropRequest);
			}else{
				removeStore("flightRopRequest");
			}
			if(changeFlightCity["jumpType"]=="iFlight"&&getStore('iFlightClick')==null){
				setStore("iFlightJumpType",true);
				setStore('iFlightClick',true);
				// try{
				// 	window.history.pushState({}, 0, window.location.href.replace('jumpType=iFlight&', ""));
				// }catch(e){}
				if(changeFlightCity["depDate"]!=null && changeFlightCity["depDate"]!=''){
					removeStore("goFlight");
					//单程/去程时间
					let depDate=changeFlightCity["depDate"];
					depDate = `${depDate.substring(0,4)}-${depDate.substring(4,6)}-${depDate.substring(6,8)}`;
					let departDate = {
						date:parseInt(depDate.split("-")[2]),
						day:weekFormat(new Date(formatIOSDate(depDate)).getDay()),
						month:parseInt(depDate.split("-")[1]),
						year:depDate.split("-")[0],
					};
					let departDateObj={
						key:'departDate',
						val: departDate
					}
					try{
						this.initData(departDateObj);
					}catch(e){}
					let obj = {
						key: 'isDouble',
						val: false
					};
					//返程时间
					if(changeFlightCity["backDepDate"]!=null && changeFlightCity["backDepDate"]!=''){
						let backDepDate=changeFlightCity["backDepDate"];
						backDepDate = `${backDepDate.substring(0,4)}-${backDepDate.substring(4,6)}-${backDepDate.substring(6,8)}`
						let backDate = {
							date:parseInt(backDepDate.split("-")[2]),
							day:weekFormat(new Date(formatIOSDate(backDepDate)).getDay()),
							month:parseInt(backDepDate.split("-")[1]),
							year:backDepDate.split("-")[0],
						};
						let backDateObj={
							key:'backDate',
							val: backDate
						}
						try{
							this.initData(backDateObj);
						}catch(e){}
						obj.val=true;
					}
					try{
						this.initData(obj);
					}catch(e){}
					//获取出发城市
					let departureCity = {
						airportCityCode:this.$route.params.goCityCode,
						code:this.$route.params.goCityCode,
						name:changeFlightCity['depCity'],
					};
					let departureCityObj={
						key:'departureCity',
						val: departureCity
					}
					//获取到达城市
					let arrivalCityCity = {
						airportCityCode:this.$route.params.backCityCode,
						code:this.$route.params.backCityCode,
						name:changeFlightCity['arrCity'],
					};
					let arrivalCityObj={
						key:'arrivalCity',
						val: arrivalCityCity
					}
					let chosenGoTrip ={
						key:'chosenGoTrip',
						val: true
					};
					let backTripObj = {
						key: 'chosenBackTrip',
						val: false
					};
					try{
						this.initData(backTripObj);
						this.initData(chosenGoTrip);
						this.initData(departureCityObj);
						this.initData(arrivalCityObj);
					}catch(e){}
				}else if(getStore('iFlight_chosen_sig')!=null && getStore('iFlight_chosen_sig')!=''){
					removeStore("goFlight");
					let iFlight=JSON.parse(getStore('iFlight_chosen_sig'));
					let obj = {
						key: 'isDouble',
						val: false
					};
					if(iFlight.tabIndex===1){
						//往返
						obj.val=true;
					}
					//获取出发时间
					let departDate = {
						date:iFlight.goDate.date,
						day:weekFormat(iFlight.goDate.day),
						month:iFlight.goDate.month,
						year:iFlight.goDate.year,
					};
					let departDateObj={
						key:'departDate',
						val: departDate
					}
					try{
						this.initData(departDateObj);
					}catch(e){}
					//获取到达时间
					if(iFlight.backDate!=null && iFlight.backDate!=''){
						let backDate = {
							date:iFlight.backDate.date,
							day:weekFormat(iFlight.backDate.day),
							month:iFlight.backDate.month,
							year:iFlight.backDate.year,
						};
						let backDateObj={
							key:'backDate',
							val: backDate
						}
						try{
							this.initData(backDateObj);
						}catch(e){}
					}
					//获取出发城市
					let departureCity = {
						airportCityCode:this.$route.params.goCityCode,
						code:this.$route.params.goCityCode,
						name:iFlight.depCity["type"] && iFlight.depCity["type"]==5?iFlight.depCity.cityName:iFlight.depCity.name,
					};
					let departureCityObj={
						key:'departureCity',
						val: departureCity
					}
					//获取到达城市
					let arrivalCityCity = {
						airportCityCode:this.$route.params.backCityCode,
						code:this.$route.params.backCityCode,
						name:iFlight.arrCity["type"] && iFlight.arrCity["type"]==5?iFlight.arrCity.cityName:iFlight.arrCity.name,
					};
					let arrivalCityObj={
						key:'arrivalCity',
						val: arrivalCityCity
					}
	
					let chosenGoTrip ={
						key:'chosenGoTrip',
						val: true
					};
					let backTripObj = {
						key: 'chosenBackTrip',
						val: false
					};
					try{
						this.initData(obj);
						this.initData(backTripObj);
						this.initData(chosenGoTrip);
						this.initData(departureCityObj);
						this.initData(arrivalCityObj);
					}catch(e){}
				}
			}
  			let nowTime = new Date().getTime();
			this.nowTime = nowTime;
			this.daysPrice=[];
			this.inputPrice = "";
  			//从舱位页进来选返程清空筛选条件
  			if(!getStore("backHome")){
  				this.priceIsPositive = true;
	  			this.timeFilterWord = false;
	  			this.choosePrice();
  			}
  			this.dayBeforePrice="--";
            this.dayAfterPrice="--";
  			//判断往返去程日期大于返程日期
  			let goTimeHm = new Date(`${this.departDate.year}/${this.departDate.month}/${this.departDate.date}`).getTime(),
   	  			toTimeHm = new Date(`${this.backDate.year}/${this.backDate.month}/${this.backDate.date}`).getTime();
   	  		if(goTimeHm > toTimeHm){
   	  		   let afterTime = goTimeHm + 4 * 24 * 60 * 60 * 1000,//后一天的毫秒数
	           	   afterDate =	new Date(afterTime),
	           	   afterYear = afterDate.getFullYear(),
	           	   afterMonth = afterDate.getMonth() + 1,
	           	   afterDay = afterDate.getDate(),
	           	   afterWeek = weekFormat(afterDate.getDay());
	           	   let newObj = {
			            key: 'backDate',
			            val:{
			            	year: afterYear,
					        month: afterMonth,
					        date: afterDay,
					        day: afterWeek
			            }
		            }
					try{
						this.initData(newObj);
					}catch(e){}
           	}



  			removeStore("transferInfo",this);
  			let transferInfo = {
                key: "transferInfo",
                val: ''
            };
			try{
				this.initData(transferInfo);
			}catch(e){}
            
  			this.showNetwork = false;
            this.showNoFlight = false;
            this.noResult = false;
            if(getStore("flight_headInfo_go")!=null && getStore("flight_headInfo_go")!='' && getStore("flight_headInfo_go")!='undefined'){
            	let flightInformationGo=JSON.parse(getStore("flight_headInfo_go"));
            	this.flightInformationGo={};
            	this.flightInformationGo.departureTime=String(flightInformationGo.departureTime).substring(11,16);
            	this.flightInformationGo.arrivalTime=String(flightInformationGo.arrivalTime).substring(11,16);
            	this.flightInformationGo.carrierName=flightInformationGo.carrierName;
            	this.flightInformationGo.flightNo=flightInformationGo.flightNo;
            	
            }

  			//判断是返程的时候交换头部
  			if(this.chosenBackTrip == true){
  				this.depart = this.arrivalCity.name;
  				this.dest = this.departureCity.name;
  			}else{
  				this.depart = this.departureCity.name;
  				this.dest = this.arrivalCity.name;
  			}
  			
  			let currentTime = `${this.departDate.year}-${this.departDate.month}-${this.departDate.date}`,
           	    formattingTime = new Date(formatIOSDate(currentTime)),
           	    msTime = formattingTime.getTime();
           	 let departcityCode="";
           	 let arrivalCityCode="";
  			//航班列表接口参数
            if (this.isDouble && this.chosenGoTrip) {
                this.flightTripType = "DEPARTURE";

               this.isTime = `${this.departDate.year}-${this.departDate.month}-${this.departDate.date}`;
            //    departcityCode = this.departureCity.code;
            //    arrivalCityCode = this.arrivalCity.code;
            }else if(!this.isDouble){
            	this.isTime = `${this.departDate.year}-${this.departDate.month}-${this.departDate.date}`;
            	// departcityCode = this.departureCity.code;
            	// arrivalCityCode = this.arrivalCity.code;
            }
            if (this.isDouble && this.chosenBackTrip) {
                this.routeType = "RT";
                this.flightTripType = "RETURN";
                this.isTime = `${this.backDate.year}-${this.backDate.month}-${this.backDate.date}`;
                // departcityCode = this.arrivalCity.code;
            	// arrivalCityCode = this.departureCity.code;
            };
	        
            //判断路由里面有没有日期
            // var getUrl = getStore('getUrl');
            
            departcityCode = this.$route.params.goCityCode;
        	arrivalCityCode = this.$route.params.backCityCode;
  			if(this.$route.params.date != '' && this.$route.params.date != null &&this.goFlightList!=true ){
  				var deleatUrl = "";
  				this.isTime = this.$route.params.date;
            	this.routeType = "OW";
            	let newObj = {
		            key: 'isDouble',
		            val:false
	            }
				try{
					this.initData(newObj);
				}catch(e){}
	            let year = this.isTime.split('-')[0],
	            	month = this.isTime.split('-')[1],
	            	date = this.isTime.split('-')[2],
	            	day = weekFormat(new Date(formatIOSDate(this.isTime)).getDay());
	            	
	            if(month.indexOf('0')!=-1){
	            	month = month.replace(/^0+/,"");
	            }
	            if(date.indexOf('0')!=-1){
	            	date = date.replace(/^0+/,"");
	            }

	            let dateObj = {
		            key: 'departDate',
		            val:{
		            	year:year,
		            	month:month,
		            	date:date,
		            	day:day
		            }
	            }
				try{
					this.initData(dateObj);
				}catch(e){}
	            var isDateUrl = location.pathname.split('/');
	                deleatUrl = isDateUrl.pop();
	                // setStore('getUrl',deleatUrl);
  			}

  			//计算出低价日历九十天以后的日期
  			let one=new Date().getTime()+24*60*60*1000,
	            dd=new Date(one),
	            sy = dd.getFullYear(),
	            sm = dd.getMonth()+1,//获取当前月份的日期
	            sd = dd.getDate(),
	            startdate = `${sy}-${sm}-${sd}`,
	       
	            thirty=new Date().getTime()+90*24*60*60*1000,
	            ee=new Date(thirty),
	            ey = ee.getFullYear(),
	            em = ee.getMonth()+1,//获取当前月份的日期
	            ed = ee.getDate(),
	            enddate= `${ey}-${em}-${ed}`;
			
			
			this.getFlightListInfo(departcityCode,arrivalCityCode,this.isTime,this.routeType,this.flightTripType,getBookingSource());
			
            this.preNextDay();
            this.noticeList(getNoticeSource(),"AIRLINE_LIST_PAGE",msTime,this.departureCity.code,this.arrivalCity.code);
			this.getDayPrice(departcityCode,arrivalCityCode,startdate,enddate);//低价
			
			if(!this.isDouble){
				//低价提醒日历
				let frontTime = `${this.departDate.year}-${this.departDate.month}-${this.departDate.date}`,
					standardTime = new Date(formatIOSDate(frontTime)).getTime(),//最早时间戳
					laterTime = standardTime+6*24*60*60*1000,
					standLaterT = new Date(laterTime),
					standYear = standLaterT.getFullYear(),
					standMonth = standLaterT.getMonth()+1,
					standDay = standLaterT.getDate(),
					standWeek = standLaterT.getDay(),
					endTime = `${standYear}-${standMonth}-${standDay}`;
					this.begTime = frontTime;
					this.endBegTime = endTime;
					let _obj = {
						key: 'backDate',
						val: {
							year: standYear,
							month: standMonth,
							date: standDay,
							day:weekFormat(standWeek)
						}
					}
					try{
						this.initData(_obj);
					}catch(e){}
				this.getLowPriceDate(departcityCode,arrivalCityCode,frontTime,endTime);
			}
           
           this.$nextTick(()=>{
	        // 这里面获取实时
	        lQuery('.isScroll')[0].addEventListener('scroll',this.watchScrollLocation)
	        
	      })

          //判断显示立减还是已减
          getShowPriceFlag().then((res) => {
          	 if(this.data == true){
          	 	this.knockOrReduced = true;//立减
          	 }else{
          	 	this.knockOrReduced = false;//已减
          	 }
          	 let distinguish ={
                key: 'knockOrReduced',
                val: this.knockOrReduced
              }
			try{
				this.initData(distinguish);
			}catch(e){}

          })


         if(!this.chosenBackTrip){
          	this.getCityFun();
		  }

		//   this.activeDate(`${this.departDate.year}-${this.departDate.month}-${this.departDate.date}`,this.departureCity.name,this.arrivalCity.name,getBookingSource());
		 
		//判断有没有登录
			//app
			if(isClient() == 1){
					getLvSessionId().then((data) => {
						if(data==null || data==undefined || data==""){
						return;
					}
						getLvUser(data).then((res) => {
							if(res.code == 1){
								this.isLogin = true;
								 if(!this.isDouble && !this.businessTravel){
									this.showLowType();
								}
							}else{
								this.isLogin = false;
							}
						});
					},()=>{
						this.isLogin = false;
					})
					
				}else{
					//wap登录
					getLvUserByCookie().then((res) => {
						if(res.code == 1){
							this.isLogin = true;
							 if(!this.isDouble && !this.businessTravel){
								this.showLowType();
							}
						}else{
							this.isLogin = false;
						}
					}, ()=> {
						this.isLogin = false;
					}) 
			}
          getStatisticsType('机票-航班列表页','FlightList');
         
			this.changePhone=false;
			if(new Date().getHours()<9||new Date().getHours()>=20){
				this.changePhone=true;
			}
			this.setIflightDate();
  		},
  		mounted(){
           
        },
        watch:{
        	scrollLocation(newVal,oldVal){
        		if (newVal > oldVal) {
        			lQuery('.footer_contanier').css('bottom', '-.98rem');
        			setTimeout(() => {
        				lQuery('.footer_contanier').css('bottom', '0rem');
        			},1000);
        		}
        	}
            
        }
	}
</script>
<style lang="scss" scoped>
@import '../../style/mixin';
.flightList{
	@include wh(100%,100%);
	position: relative;
	.notice_container{
        @include wh(100%,.6rem);
        box-sizing: border-box;
        @include sc(.28rem,#666);
        overflow: hidden;
        margin-top: .98rem;
    }
    .goStrip{
    	height: 0.7rem;
	    background: #fff;
	    margin: 0 0.1rem;
	    border-radius: 6px;
	    margin-top: 0.1rem;
	    margin-bottom: 0.1rem;
		position:relative;
		top: 0.98rem;
	    span{
	    	@include sc(0.26rem,#333);
	    	line-height: 0.7rem;
	    	display: inline-block;
    		margin-right: 0.08rem;
	    }
	    p{
	    	display: inline-block;
	    	float: left;
	    }
	    .stripImg{
	    	@include wh(0.32rem,0.32rem);
	    	// background: url("//m.lvmama.com/flight/image/go_img.png");
	    	// background-size: 100% 100%;
	    	float: left;
	    	margin-top: 0.17rem;
			margin-left: 0.2rem;
			line-height: 0.3rem;
			text-align: center;
			border: 1px solid #70AEF9;
			border-radius: 0.04rem;
			color: #70AEF9;
			font-size: 0.2rem;
	    	/*@include ct;
	    	left:0.1rem;*/
	    	
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
    		padding-bottom: .98rem;
			margin-top: 0.1rem;
			.add_tranvel{
				height:1.38rem;
				background: #fff;
				margin:0 0.1rem;
				position: relative;
				margin-top: 0.2rem;
				border-radius: 3px;
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
    .showTransParent{
    	overflow-y: hidden;
    }
    .shiftDown{
    	@include heightByAbsolute(2.7rem,0);
    }
	.panels{
		@include wh(100%,0.98rem);
		@include heightByAbsolute(0.9rem,0);
	    padding: 0 0.2rem;
	    background-color: #ffffff;
	    margin-top: 0;
	    z-index: 2;
		// border-top: 1px solid #efefef;
		@include topline();
	    .datePicker{
	    	@include cl;
	    }
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
			> span:last-child{
				font-size: .2rem;
				color: #666;
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
		.timeContent{
			background: url('//m.lvmama.com/flight/image/date_icon.png') no-repeat;
			background-size: 100%;
	        position: relative;
			line-height: 0.56rem;
		    @include wh(3.1rem,0.56rem);
		    margin: 0.14rem auto;
		    > span:first-child{
				    display: inline;
					font-size: 0.24rem;
					color: #ffffff;
					line-height: 0.56rem;
					padding-left: 0.2rem;
		    }
		    .tripDay{
	    	    display: inline;
			    font-size: 0.24rem;
			    color: $c00;
			    line-height: 0.7rem;
			    position: relative;
		    }
			>span:nth-child(2){
				font-size: 0.24rem;
				color: #ffffff;
				line-height: 0.56rem;
			}
		    > span:last-child{
				    display: inline;
				    position: absolute;
				    right: 0.58rem;
					font-size: 0.24rem;
					color: #ffffff;
					line-height: 0.56rem;
					margin-left: 0.2rem;
					>i{
						font-size: 0.24rem;
    					color: #ffffff;
					}
		    }
		}
		.timeContent:after {
			content: "";
			position: absolute;
			top: .165rem;
			width: 0.12rem;
			height: 0.12rem;
			right: 0.3rem;
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
			> span:last-child{
				font-size: .2rem;
				color: #666666;
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
		.nextGray{
			>span{
				color:#aaa;
			}
		}
		.nextGray:before{
			border-right: 1px solid #aaa;
		    border-bottom: 1px solid #aaa;
		}
	}
	// .haveGoStrip{
	// 	top:1.7rem;
	// }
	.footer_contanier {
		@include wh(100%,0.98rem);
		background:#363640;
		opacity: 0.9;
		position:absolute;
		left: 0;
		bottom:0;
		transition-duration: .5s;
		>div{
			@include wh(100%,0.98rem);
			>div{
				// display: inline-block;
				@include wh(33.33%,inherit);
    			text-align: center;
    			position: relative;
				float: left;
				>span{
					color:#fff;
					// display: block;
    				// margin-top: 0.5rem;
				}
				// >i{
				// 	display:block;
				// 	@include wh(0.38rem,0.38rem);
				// 	@include cl;
				// 	top: 0.12rem;
				// }
				
			}
			.act_line:after{
				content: "";
				width: 0px;
				height: 0.3rem;
				border-right: 1px solid #fff;
				position: absolute;
				right: 0;
				top: 50%;
    			transform: translateY(-50%);
			}
			.brightColor{
				color:#f80 !important;
			}
			
		}
		.choose{
			background: url("//m.lvmama.com/flight/image/filter_icon.png") no-repeat;
			background-size: 100%;
			width: 0.15rem;
			height: 0.15rem;
			display: inline-block;
			margin-left: 0.1rem;
		}
		.screeningIcon{
			background: url("//m.lvmama.com/flight/image/brightColor.png") no-repeat;
			background-size: 100%;
		}
		.changeTime{
			background: url("//m.lvmama.com/flight/image/time.png") no-repeat;
			background-size: 100%;
		}
		.SoonerLater{
			background: url("//m.lvmama.com/flight/image/Sooner_later.png") no-repeat;
			background-size: 100%;
		}
		.nightEarly{
			background: url("//m.lvmama.com/flight/image/later_Sooner.png") no-repeat;
			background-size: 100%;
		}
		.saslePrice{
			background: url("//m.lvmama.com/flight/image/isSell.png") no-repeat;
			background-size: 100%;
		}
		.isPrice{
			@include wh(0.4rem,0.38rem);
			background: url("//m.lvmama.com/flight/image/isPrice.png") no-repeat;
			background-size: 100%;
		}
		.Low_to_high{
			@include wh(0.4rem,0.38rem);
			background: url("//m.lvmama.com/flight/image/Low_to_high.png") no-repeat;
			background-size: 100%;
		}
	}
	.transAlert{
		@include wh(100%,100%);
		background:rgba(0, 0, 0, 0.5);
		@include center;
		z-index: 3;
	}
	.result{
		@include cl;
		bottom:5.6rem;
		color:#fff;
		z-index: 4;
	}
	.flightListAnimate{
		@include wh(100%,0);
		position: absolute;
		left:0;
		bottom:0;
		background:#fff;
		z-index: 4;
		transition: all .5s ease-out;
		.AnimateTop{
			padding:0 0.4rem;
			height: .9rem;
			background:#f5f5f5;
			position: relative;
			span{
				display: inline-block;
				line-height: 0.9rem;
				color:#333333;
				font-size: 0.28rem;
			}
			span:nth-child(2){
				color:#a9a9a9;
				@include center;
			}
			.clearColor{
				color:#000 !important;
			}
			span:nth-child(3) {
				float: right;
			}
		}
		.AnimateUnder{
			height: 4.54rem;
			.leftContent{
				@include wh(25%,4.54rem);
				background:#f5f5f5;
				span{
					display: block;
					text-align: center;
					line-height: 0.9rem;
					position:relative;
					font-size: 0.26rem;
					color: #333333;
				}
				i{
					display: inline-block;
				    border: 3px solid #f80;
				    border-radius: 50%;
				    @include ct;
				    right: 8%;
				}
			}
			.selectTypeBackColor{
				background:#fff;
			}
			.rightContent{
				@include wh(75%,4.54rem);
				left: inherit;
				overflow-y:auto;
				overflow-x:hidden;
				.contentList{
					@include wh(100%,auto);
					margin-left: 0.2rem;
					li{
						display: block;
						@include wh(100%,0.88rem);
						line-height: 0.88rem;
						// border-bottom: 1px solid #dfdfdf;
						position:relative;
						float: left;
						margin-right: 0.2rem;
						margin-bottom: 0.2rem;
						i{
							display: block;
							@include wh(0.38rem,0.38rem);
							position: absolute;
							right: 0;
    						bottom: 0;
							z-index: 5;
							background: url("//m.lvmama.com/flight/image/selected_icon.png") no-repeat;
							background-size: 100%;
						}
						// i:before{
						// 	content: "";
						// 	@include wh(0.08rem,0.16rem);
						// 	border-right: 2px solid #e3e3e3;
    					// 	border-bottom: 2px solid #e3e3e3;
						//     position: absolute;
						//     left: 45%;
						//     top: 45%;
						//     transform: translate(-50%,-50%) rotate(45deg);
						// }
						em{
							@include ct;
							top:21%;
							left: 15%;
						}
						.special{
							margin-left: 10%;
						}
						.selectTGreen{
							border: 1px solid #32c671;
							background:#32c671;
						}
						.selectTGreen:before{
							content: "";
							border-right: 2px solid #fff;
    						border-bottom: 2px solid #fff;
						}
					}
					.content{
						width: 2.44rem;
						height: 0.8rem;
						line-height: 0.8rem;
						border: 1px solid #ccc;
						border-radius: 0.12rem;
						text-align: center;
						position: relative;
					}
					.selectedLi{
						border: 1px solid #FF8800;
					}
					.filter_type{
						font-size: 0.24rem;
						color: #666666;
						margin-bottom: 0;
					}
					li.topOrder{
					    border-top: 1px solid #dfdfdf;
					}
					// li:last-child{
					// 	border-bottom: none;
					// }

				}
				.airfield{
					li:nth-child{
						color:#9f9f9f;
						font-size: 0.24rem;
					}
					.especialColor{
						font-size: 0.24rem;
    					color: #666666;
					}
				}
				.shippingDepartment{
					em{
						display: inline-block;
						@include wh(0.28rem,0.28rem);
						margin-right: 0.12rem;


					}
				}
			}
		}
	}
	.transInfor{
		height:5.44rem;
        z-index: 3;
        transition: all .5s ease-out;
        
	}
	.networkError{
		@include center;
		z-index: 3;
		width: 100%;
    	text-align: center;
		.errorTop{
			i{
				display: inline-block;
				@include wh(0.78rem,0.88rem);
				background: url("//m.lvmama.com/flight/image/not_wifi.png") no-repeat;
				background-size: 100%;
			}
			p{
				margin: 0.3rem -9%;
				font-size: 0.28rem;
				color: #333333;
			}
		}
		
		.errorUnder span{
			display: inline-block;
			@include wh(1.9rem,0.48rem);
			line-height: 0.48rem;
			border:0px solid #cccccc;
			text-align: center;
			font-size: 0.24rem;
			color: #666666;
		    border-radius: 0.6rem;
			padding:0 0.2rem;
			background: #ffffff;
		    i{
		    	display: inline-block;
		    	@include wh(0.3rem,0.3rem);
		    	background: url("//m.lvmama.com/flight/image/tel.png") no-repeat;
				background-size: 100%;
				margin-right: 0.06rem;
		    }
		}
		.errorUnder span:nth-child(2){
			border:1px solid #aaaaaa;
		}

	}
	.noFlight{
		width: 100%;
		@include center;
		z-index: 3;
		text-align: center;
		i{
			display: inline-block;
			@include wh(0.68rem,0.88rem);
			background: url("//m.lvmama.com/flight/image/search_not_res.png") no-repeat;
			background-size: 100%;
		}
		p{
			@include sc(0.28rem,#333);
			margin: 0.2rem auto;
		}
		span{
			display: inline-block;
			@include wh(1.9rem,0.48rem);
		    @include sc(0.24rem,#666666);
		    border: 0px solid #cccccc;
		    line-height: 0.48rem;
		    text-align: center;
			border-radius: 0.6rem;
			background: #fff;
			padding:0 0.2rem;
		}
	}
	.noResult{
		width:100%;
		@include center;
		text-align: center;
		span{
			display: inline-block;
			@include wh(0.68rem,0.88rem);
			background: url("//m.lvmama.com/flight/image/search_not_res.png") no-repeat;
			background-size: 100%;
		}
		p{
			@include sc(0.28rem,#333);
			margin-top: 0.2rem;
		}
	}
	.flight_transer{
		@include wh(100%,100%);
		background: rgba(0, 0, 0, 0.5);
		position: absolute;
		top:0;
		left: 0;
		z-index: 10;
		.content_box{
			@include wh(5.5rem,3.33rem);
			background:#fff;
			border-radius: 6px;
			 position: absolute;
			left: 50%;
			top: 50%;
			transform: translate(-50%,-50%);
			.top{
				 width: 100%;
				height: 2.5rem;
				text-align: center;
				padding-top: 8%;
				p:nth-child(1){
					font-size: 16px;
					color: #000;
					margin-bottom: 5px;
				}
				i{
					color: #ff6600;
				}
				p:nth-child(4){
					font-size: 12px;
					color: #aaaaaa;
					margin-top: 5px;
				}
			}
			.under{
				width: 100%;
				height: 0.83rem;
				line-height: 0.83rem;
				border-top: 1px solid #ccc;
				span{
					display: inline-block;
					width: 49%;
					text-align: center;
				}
				span:nth-child(1){
					border-right: 1px solid #ccc;
				}
				span:nth-child(2){
					color: #ff8800;
				}
			}
		}

	}

}
	
</style>