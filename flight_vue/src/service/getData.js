import { fetch,jsonpFetch } from '../config/fetch'
import { getStore } from '../config/mUtils'


//获取所有城市
export const getFlightCities = () => fetch('/client-service/router/rest.do?method=api.com.flight.city.getCitys',{
	city: '上海',
	version: '1.0.0',
	rad: Math.floor(Math.random()*9999)
},'POST');

//获取swiper信息
export const getSwiperInfos = () => fetch(`/bullet/index.php?s=/Api/getInfos&stationCode=SH&channelCode=FJP&tagCodes=FJP_BANNER&rad=${Math.random()}`);

//通知（注：每个页面传参不同）
export const getNotice = (noticePlatform,noticeType,departureDate,departureCity,arrivalCity,carrierCodes) => fetch('/client-service/router/rest.do?method=api.com.flight.search.searchNotice',{
	noticeAmount:3,
	belongsToChannel:'FLIGHT',
	noticePlatform:noticePlatform,//'WAP',
	noticeType:noticeType,//'FLIGHT_INDEX_PAGE',
	departureDate:departureDate,//1503563226087,
	departureCity:departureCity,//SHA,
	arrivalCity:arrivalCity,//PEK,
	carrierCodes:carrierCodes||"",
	version: '1.0.0',
	rad: Math.floor(Math.random()*9999)
},'POST');

//低价日历
export const getFlightDaysPrice = (departureAirportCode,arrivalAirportCode,startDate,endDate) => fetch('/client-service/router/rest.do?method=api.com.flight.price.getdaysprice',{
	arrivalAirportCode:arrivalAirportCode,//PEK,
	departureAirportCode:departureAirportCode,//SHA,
	endDate:endDate,//2017-11-22,
	startDate:startDate,//2017-08-24,
	version: '1.0.0',
	rad: Math.floor(Math.random()*9999)
},'POST');

//航班列表
export const getFlightList = (from,to,departureDate,routeType,flightTripType,bookingSource,equipmentNo,customerId,customerCode,customerName) => fetch('/client-service/router/rest.do?method=api.com.flight.search.searchFlight',{
	from:from,//SHA,
	to:to,//PEK,
	departureDate:departureDate,//2017-08-25,
	//rem=0.1588092522489859,
	facet:true,
	routeType:routeType,//'OW',
	flightTripType:flightTripType,
	bookingSource:bookingSource,//'LVMAMA_WAP',
	version: '1.0.0',
	equipmentNo:equipmentNo,
	customerId:customerId,
	customerCode:customerCode,
	customerName:customerName,
	rad: Math.floor(Math.random()*9999)
},'POST');

//促销活动
export const getPromotionList = (deptDate,deptCity,arriCity,bookingSource) => fetch('/client-service/router/rest.do?method=api.com.flight.promotion.promotionList',{
	deptDate:deptDate,//2017-08-25,
	deptCity:deptCity,//上海,
	arriCity:arriCity,//北京,
	bookingSource:bookingSource,//'LVMAMA_WAP',
	version: '1.0.0',
	rad: Math.floor(Math.random()*9999)
},'POST');

//特价机票
export const getLowestPriceForFlight = (obj,fetchName, callBackName, callBackFunc) => jsonpFetch('//flight.lvmama.com/toFetch/getLowestPriceForFlight',{
	deptCities:obj.deptCities,
	arrCities:obj.arrCities,
	startDate:obj.startDate,
	endDate:obj.endDate,
	topAirLine:obj.topAirLine,
	topDate:obj.topDate,
	priceLowest:obj.priceLowest,
	priceHigest:obj.priceHigest,
	bookingSource:obj.bookingSource,
	version:'1.0.0',
	rad:Math.floor(Math.random()*9999)
},fetchName ,callBackName, callBackFunc);
//特价机票新
export const getLowestPriceNewFlight = (obj) => fetch(`/client-service/router/rest.do?method=api.com.flight.price.getdayspriceNew&deptCities=${obj.deptCities}${obj.arrCities}&deptStartDate=${obj.startDate}&deptEndDate=${obj.endDate}&topDate=${obj.topDate}&priceLowest=${obj.priceLowest || 0}&priceHigest=${obj.priceHigest || 3000}&bookingSource=${obj.bookingSource}&version=1.0.0&rad=${Math.floor(Math.random()*9999)}`,{
},'GET');

//特价机票2
export const lowestPriceForFlight = (obj,fetchName, callBackName, callBackFunc) => jsonpFetch('//flight.lvmama.com/toFetch/getLowestPriceForFlight',{
	deptCities:obj.deptCities,
	arrCities:obj.arrCities,
	startDate:obj.startDate,
	endDate:obj.endDate,
	topAirLine:obj.topAirLine,
	topDate:obj.topDate,
	priceLowest:obj.priceLowest,
	priceHigest:obj.priceHigest,
	bookingSource:obj.bookingSource,
	topAirLine:'20',
	version:'1.0.0',
	rad:Math.floor(Math.random()*9999)
},fetchName ,callBackName, callBackFunc);

//获取手机动态码
export const sendTrafficOrderAuthenticationCode = (mobileOrEMail,verifycode,fetchName, callBackName, callBackFunc) => jsonpFetch('//login.lvmama.com/nsso/ajax/message/sendTrafficOrderAuthenticationCode.do',{
	_:Math.random(),
	mobileOrEMail:mobileOrEMail,
	verifycode:verifycode,
},fetchName ,callBackName, callBackFunc);

//注册登录
export const registeredLogin = (mobile,authenticationCode,fetchName, callBackName, callBackFunc) => jsonpFetch('//login.lvmama.com/nsso/ajax/silentLoginWithRegisterByMobileAndAuthenticationCode.do',{
	_:Math.random(),
	mobile:mobile,
	verifycode:'',
	groupId:'GP_ORDER',
	channel:'GP_ORDER_TRAFFIC',
	authenticationCode:authenticationCode
},fetchName ,callBackName, callBackFunc);

//意见反馈
export const feedbackCreate = (content,mobile,problemKind,problemFrom,platFormType,userID,userName) => fetch('/client-service/router/rest.do?method=api.com.flight.traffic.feedbackcreate',{
	content:content,//'哈哈',
	mobile:mobile,//'15111258566',
	problemKind:problemKind,//'FLIGHT_PRICE_PROBLEM'
	problemFrom:problemFrom,//'FLIGHT_WAP_INDEX',
	productStr:'FLIGHT',
	progress:'TO_BE_PROCESSED',
	remark:'',
	operator:'',
	productType:'FLIGHT',
	type:'FEEDBACK',
	platFormType:platFormType,//'WAP',
	userNo:userID,
	userName:userName,
	uname:userName,
	version: '1.0.0',
	rad: Math.floor(Math.random()*9999)
},'POST');

//获取所有机场信息
export const getAirportsOfCountry = () => fetch('/client-service/router/rest.do?method=api.com.flight.md.airportsOfCountry',{
	countryCode:'CN',//CN,
	version: '1.0.0',
	rad: Math.floor(Math.random()*9999)
},'POST');

//天气
export const getWeatherByName = () => fetch('http://www.lvmama.com/weather/api/getWeatherByName?name=上海&version=1.0.0&rad='+Math.floor(Math.random()*9999));

//机场大巴
export const getAirportBuses = (airportCode) => fetch('/client-service/router/rest.do?method=api.com.flight.md.airportBuses',{
	airportCode:airportCode,//SHA,
	version: '1.0.0',
	rad: Math.floor(Math.random()*9999)
},'POST');

//机场服务
export const getAirportServices = (airportCode) => fetch('/client-service/router/rest.do?method=api.com.flight.md.airportServices',{
	airportCode:airportCode,//SHA,
	version: '1.0.0',
	rad: Math.floor(Math.random()*9999)
},'POST');

//舱位
export const getflightInfo = (from,to,flightNo,departureDate,preLowestSalePrice,routeType,bookingSource,flightTripTs,equipmentNo) => fetch('/client-service/router/rest.do?method=api.com.flight.flight.flightInfo',{
	from:from,//SHA,
	to:to,//PEK,
	flightNo:flightNo,//MU5151,
	departureDate:departureDate,//2017-09-03,
	preLowestSalePrice:preLowestSalePrice,//575,
	routeType:routeType,//'OW',
	bookingSource:bookingSource,//'LVMAMA_WAP',
	flightTripType:flightTripTs,
	equipmentNo:equipmentNo,//localStorage.getItem("equipmentNo"),
	version: '1.0.0',
	rad: Math.floor(Math.random()*9999)
},'POST');

//优惠券开关
export const getCouponSwitch = () => fetch('/client-service/router/rest.do?method=api.com.traffic.coupon.couponSwitch',{
	version: '1.0.0',
	rad: Math.floor(Math.random()*9999)
},'POST');

//预定
export const toBooking = (routeType,flightOrderBookingDetailRequests,bookingSource,customerId,customerCode,customerName,uuid,equipmentNo) => fetch('/client-service/router/rest.do?method=api.com.flight.order.toBooking',{
	param:JSON.stringify({
            "routeType": routeType,//orderBookingDetailRequests.length == 2 ? "RT" : "OW",
            "flightOrderBookingDetailRequests": flightOrderBookingDetailRequests,//orderBookingDetailRequests,
            "flightOrderPassengers": [],
            "flightOrderRemarks": [],
            "bookingSource": bookingSource,//cm.getBookingSource(),
            "passengerDetailDtos": [],
            "isRebooking": false,
            "rad": Math.round(Math.random()*9999),
            "allAdultType": true,
            "flightOrderCustomer": {
                "customerId":customerId,//localStorage.getItem('selectuserid'),
                "customerCode":customerCode,//localStorage.getItem('selectid'),
                "customerName":customerName,//localStorage.getItem('selectusername'),
                "customerLevel":null
            },
			"uuid":uuid,
			"equipmentNo":equipmentNo,
        }),
	version: '1.0.0',
	rad: Math.floor(Math.random()*9999)
},'POST');

//获取收货地址
export const getMailAddress = (userID) => fetch('/client-service/router/rest.do?method=api.com.flight.order.getMailAddress',{
	userNO:userID,
	version: '1.0.0',
	rad: Math.floor(Math.random()*9999)
},'POST');

//校验城市是否支持接送机
export const checkTransferCity = (cityCode) => fetch('/client-service/router/rest.do?method=api.com.flight.transfer.checkTransferCity',{
	cityCode:cityCode,//SHA
	version: '1.0.0',
	rad: Math.floor(Math.random()*9999)
},'POST');

//获取保险
export const getInsurance = (departDate,flightNos,bookingSource,orderAmount,goCabin,returnCabin) => fetch('/client-service/router/rest.do?method=api.com.flight.insurance.getInsurance',{
	departDate:departDate,//2017-09-03,
	flightNos:flightNos,//MU5151,
	bookingSource:bookingSource,//LVMAMA_WAP,
	version: '1.0.0',
	orderAmount:orderAmount,//800
	goCabin:goCabin,
	returnCabin:returnCabin,
	rad: Math.floor(Math.random()*9999)
},'POST');

//机场服务
export const getVasList = (deptDate,airportCode,terminal,bookChannel,orderAmount) => fetch('/client-service/router/rest.do?method=api.com.flight.vas.vasList',{
	deptDate:deptDate,//2017-09-03 08:30
	airportCode:airportCode,//SHA
	terminal:terminal,//T2
	bookChannel:bookChannel,//LVMAMA_WAP
	orderAmount:orderAmount,
	version: '1.0.0',
	rad: Math.floor(Math.random()*9999)
},'POST');

//优惠券发放
export const getVasCouponList = (bookChannel,productLine,orderAmount) => fetch('/client-service/router/rest.do?method=api.com.flight.vas.couponList',{
	bookChannel:bookChannel,//WAP_FLIGHT,
	productLine:productLine,//LVFLIGHT,
	version: '1.0.0',
	orderAmount: orderAmount,
	rad: Math.floor(Math.random()*9999)
},'POST');

//优惠券使用列表
export const getCouponList = (oughtPay,userNo,CouponListRequest) => fetch('/client-service/router/rest.do?method=api.com.traffic.coupon.couponList',{
	trafficType:"FLIGHT",
	platform:"MOBILE",
	oughtPay:oughtPay,
	userNo:userNo,
	quantity:1,
	discountAmount:0,
	bookingSource:CouponListRequest!=null?CouponListRequest.bookingSource:null,
	suppSaleTypes:CouponListRequest!=null?JSON.stringify(CouponListRequest.suppSaleTypes):null,
	couponConfigureRuleList:CouponListRequest!=null?JSON.stringify(CouponListRequest.couponConfigureRuleList):null,
	version: '1.0.0',
	rad: Math.floor(Math.random()*9999)
},'POST');

//优惠券使用列表
export const getCouponListOld = (oughtPay,userNo) => fetch('/client-service/router/rest.do?method=api.com.traffic.coupon.couponList',{
	trafficType:"FLIGHT",
	platform:"MOBILE",
	oughtPay:oughtPay,
	userNo:userNo,
	quantity:1,
	discountAmount:0,
	version: '1.0.0',
	rad: Math.floor(Math.random()*9999)
},'POST');

//验证优惠券
export const validateCoupon = (couponCode,userNo,oughtPay,CouponListRequest) => fetch('/client-service/router/rest.do?method=api.com.traffic.coupon.validateCoupon',{
	trafficType:"FLIGHT",
	couponCode: couponCode,
	platform: "MOBILE",
	userNo: userNo,//"5ad32f1a1cd28093011cd540fcbd7085"
	oughtPay: oughtPay,//支付总金额
	quantity: 1,
	discountAmount: 0,
	bookingSource:CouponListRequest.bookingSource,
	suppSaleTypes:JSON.stringify(CouponListRequest.suppSaleTypes),
	couponConfigureRuleList:JSON.stringify(CouponListRequest.couponConfigureRuleList),
	version: '1.0.0',
	rad: Math.floor(Math.random()*9999)
},'POST');

//算价接口
export const amountCalculator = (param) => fetch('/client-service/router/rest.do?method=api.com.flight.order.amountCalculator',{
	param:JSON.stringify(param),
	version: '1.0.0',
	rad: Math.floor(Math.random()*9999)
},'POST');

//获取车型函数
export const getTransferProducts = (param) => fetch('/client-service/router/rest.do?method=api.com.flight.transfer.queryTransferProducts',{
	param: JSON.stringify(param),
	version: '1.0.0'
},'POST');

//获取退改说明函数
export const getTransferProductDetail = (param) => fetch('/client-service/router/rest.do?method=api.com.flight.transfer.queryTransferProductDetail',{
	param: JSON.stringify(param),
	version: '1.0.0',
	rad: Math.floor(Math.random()*9999)
},'POST');

//商旅
export const getValidateAccount = (userID) => fetch('/client-service/router/rest.do?method=api.com.flight.travel.validateAccount',{
	customerId: userID,
	version: '1.0.0',
	rad: Math.floor(Math.random()*9999)
},'POST');

//获取公司信息
export const getAllCompany = () => fetch('/client-service/router/rest.do?method=api.com.flight.travel.getAllCompany',{
	version: '1.0.0',
	rad: Math.floor(Math.random()*9999)
},'POST');

//根据authCode获取公司信息
export const getCompanyByAuthCode = (authCode) => fetch('/client-service/router/rest.do?method=api.com.flight.travel.getCompanyByAuthCode',{
	authCode:authCode,
	version: '1.0.0',
	rad: Math.floor(Math.random()*9999)
},'POST');

//提交绑定商旅信息
export const submitBindAccount = (userID,userName,companyName,employeeNo,authCode,staffName,staffTel,department,position) => fetch('/client-service/router/rest.do?method=api.com.flight.travel.bindAccount',{
	customerId: userID,
    customerName: userName,
    companyName: companyName,
    employeeNo: employeeNo,
    authCode:authCode,
    staffName: staffName,
    staffTel: staffTel,
    department: department,
    position: position,
	version: '1.0.0',
	rad: Math.floor(Math.random()*9999)
},'POST');

//完善商旅信息
export const updateAccount = (id,staffTel,employeeNo,department,position) => fetch('/client-service/router/rest.do?method=api.com.flight.travel.updateAccount ',{
	id: id,
    staffTel: staffTel,
    employeeNo: employeeNo,
    department: department,
    position:position,
	version: '1.0.0',
	rad: Math.floor(Math.random()*9999)
},'POST');
//获取改签退票手续费信息
export const getFlightTicketRuleCharge = (orderId) => fetch('/client-service/router/rest.do?method=api.com.flight.order.flightTicketRuleCharge',{
	orderId:orderId,
	version: '1.0.0',
	rad: Math.floor(Math.random()*9999)
},'POST');

//获取订单详情信息
export const orderCombinedDetail = (orderId,orderMainId) => fetch('/client-service/router/rest.do?method=api.com.flight.order.orderCombinedDetail',{
	orderId:orderId,
    orderMainId:orderMainId,
	version: '1.0.0',
	rad: Math.floor(Math.random()*9999)
},'POST');
//根据主单号获取订单详情信息
export const orderMainIdByorderDetail = (orderMainId) => fetch('/client-service/router/rest.do?method=api.com.flight.order.getOrderStatics',{
    orderMainId:orderMainId,
	version: '1.0.0',
	rad: Math.floor(Math.random()*9999)
},'POST');
//获取商旅订单详情信息
export const travelCombinedDetail = (orderId,orderMainId) => fetch('/client-service/router/rest.do?method=api.com.flight.travel.orderCombinedDetail',{ 
	orderId:orderId,
    orderMainId:orderMainId,
	version: '1.0.0',
	rad: Math.floor(Math.random()*9999)
},'POST');

//改签
export const ctmtapply = (param) => fetch('/client-service/router/rest.do?method=api.com.flight.order.ctmtapply',{
	param:param,
	version: '1.0.0',
	rad: Math.floor(Math.random()*9999)
},'POST');

//退票
export const RTVTApply = (orderId,orderDetailIds,userName,applyRefundType,endorseReason,fee) => fetch('/client-service/router/rest.do?method=api.com.flight.order.RTVTApply',{
	orderId: orderId,//
	orderDetailIds: orderDetailIds,
	applySource: 'LVMAMA_H5',
	operApply: userName,
	applyRefundType: applyRefundType,
	remark: endorseReason,
	fee: fee,
	version: '1.0.0',
	rad: Math.floor(Math.random()*9999)
},'POST');

//获取订单列表
export const getCombinedOrderList = (userID) => fetch('/client-service/router/rest.do?method=api.com.flight.order.queryCombinedOrderList',{
	customerId:userID,
	version: '1.0.0',
	rad: Math.floor(Math.random()*9999)
},'POST');

//获取航班动态
export const getDynamicDataList = (orderNo,userId) => fetch('/client-service/router/rest.do?method=api.com.flight.dynamic.dynamicDataList',{
	orderNo:orderNo,//121704201000031
	customerId:userId,//yuzhibing22
	version: '1.0.0',
	rad: Math.floor(Math.random()*9999)
},'POST');

//取消订单（根据主单取消）
export const cancelOrdersByOrderNo = (orderNo) => fetch('/client-service/router/rest.do?method=api.com.flight.order.cancelOrdersByOrderNo',{
	orderNo:orderNo,
	version: '1.0.0',
	rad: Math.floor(Math.random()*9999)
},'POST');

//取消订单（根据子单取消）
export const cancelOrder = (orderId) => fetch('/client-service/router/rest.do?method=api.com.flight.order.cancelOrder',{
	orderId:orderId,
	version: '1.0.0',
	rad: Math.floor(Math.random()*9999)
},'POST');

//booking
export const booking = (data,equipmentNo,cpsid,oIC,oUC,mobileBrand,idfa,idfaappVersion,idfaSource,idfaSourceRemark,activeTime,uuid) => fetch('/client-service/router/rest.do?method=api.com.flight.order.booking',{
	param:data,
    equipmentNo: equipmentNo,
    cpsId:cpsid,
    oic:oIC,
    ouc:oUC,
    mobileBrand:mobileBrand,
    idfa:idfa,
    idfaappVersion:idfaappVersion,
    idfaSource:idfaSource,
    idfaSourceRemark:idfaSourceRemark,
    activeTime:activeTime,
    uuid:uuid,
	version: '1.0.0',
	rad: Math.floor(Math.random()*9999)
},'POST');

//bookinfo
export const bookinfo = (data,equipmentNo,cpsid,oIC,oUC,mobileBrand,idfa,idfaappVersion,idfaSource,idfaSourceRemark,activeTime,uuid) => fetch('/client-service/router/rest.do?method=api.com.flight.order.save.bookinfo',{
	param:data,
    equipmentNo: equipmentNo,
    cpsId:cpsid,
    oic:oIC,
    ouc:oUC,
    mobileBrand:mobileBrand,
    idfa:idfa,
    idfaappVersion:idfaappVersion,
    idfaSource:idfaSource,
    idfaSourceRemark:idfaSourceRemark,
    activeTime:activeTime,
    uuid:uuid,
	version: '1.0.0',
	rad: Math.floor(Math.random()*9999)
},'POST');

//新增乘机人
export const addContact = (receiverName,receiverGender,certType,certNo,birthday,peopleType,cellphone,mobileNumber) => fetch('/client-service/router/rest.do?method=api.com.flight.other.addContact',{
	receiverName:receiverName,
    receiverGender:receiverGender,//"MALE",//TODO 默认男。
    certType:certType,
    certNo:certNo,
    birthday:birthday,
    peopleType:peopleType,
    cellphone:cellphone,
    mobileNumber:mobileNumber,
	version: '1.0.0',
	rad: Math.floor(Math.random()*9999)
},'POST');

//编辑乘机人
export const editContact = (name,receiverGender,type,card,date,passengerType,tel,receiverId) => fetch('/client-service/router/rest.do?method=api.com.flight.other.editContact',{
	receiverName:name,
    receiverGender:receiverGender,//"MALE",//TODO 默认男
    certType:type,
    certNo:card,
    birthday:date,
    peopleType:passengerType,
    mobileNumber:tel,
    receiverId:receiverId,
	version: '1.0.0',
	rad: Math.floor(Math.random()*9999)
},'POST');

//获取城市地址列表
export const getCityAddressList = () => fetch('/client-service/router/rest.do?method=api.com.flight.order.getCityAddressList',{
	version: '1.0.0',
	rad: Math.floor(Math.random()*9999)
},'POST');

//新增地址
export const addMailAddress = (userID,mobileNumber,recipientName,provinceId,province,cityId,city,address,countyId,county,postCode) => fetch('/client-service/router/rest.do?method=api.com.flight.order.addMailAddress',{
	userNo:userID,
    mobileNumber:mobileNumber,
    recipientName:recipientName,
    provinceId: provinceId,
    province: province,
    cityId: cityId,
    city: city,
    address:address,
    countyId: countyId,
    county:county,
    postCode:postCode,
	version: '1.0.0',
	rad: Math.floor(Math.random()*9999)
},'POST');

//编辑地址
export const updateMailAddress = (userID,addressNo,mobileNumber,recipientName,provinceId,province,cityId,city,address,countyId,county,postCode) => fetch('/client-service/router/rest.do?method=api.com.flight.order.updateMailAddress',{
	userNo:userID,
	addressNo: addressNo,
    mobileNumber:mobileNumber,
    recipientName:recipientName,
    provinceId: provinceId,
    province: province,
    cityId: cityId,
    city: city,
    address:address,
    countyId: countyId,
    county:county,
    postCode:postCode,
	version: '1.0.0',
	rad: Math.floor(Math.random()*9999)
},'POST');

//删除订单
export const deleteOrder = (orderId) => fetch('/client-service/router/rest.do?method=api.com.flight.order.deleteOrder',{
	orderId:orderId,
	version:'1.0.0',
	rad: Math.floor(Math.random()*9999)
},'POST');

//申请订单变更
export const orderDetailChange = (orderId,orderMainId) => fetch('/client-service/router/rest.do?method=api.com.flight.order.canCTMTApply',{
	version: '1.0.0',
	orderId: orderId,
    orderMainId: orderMainId,
	rad: Math.floor(Math.random()*9999)
},'POST');

//申请退票
export const toOrderReturn = (orderId,orderMainId) => fetch('/client-service/router/rest.do?method=api.com.flight.order.canRTVTApply',{
	version: '1.0.0',
	orderId: orderId,
    orderMainId: orderMainId,
	rad: Math.floor(Math.random()*9999)
},'POST');

//获取返程最低价
export const getLowPrice = (deptCities,arrCities,bookingSource,fromTime) => fetch('/client-service/router/rest.do?method=api.com.flight.price.getdayspriceNew',{
	deptCities:deptCities,//城市Code
    arrCities:arrCities,
    bookingSource:bookingSource,//cm.isClient()==1 ? "APP" : "WAP",
    deptStartDate:fromTime,
    deptEndDate:fromTime,
	version: '1.0.0',
	rad: Math.floor(Math.random()*9999)
},'POST');

//提交退票申请
export const submitRTVTApply = (orderId,orderDetailIds) => fetch('/client-service/router/rest.do?method=api.com.flight.order.RTVTApply',{
	orderId: orderId,
    orderDetailIds: orderDetailIds,
	version: '1.0.0',
	rad: Math.floor(Math.random()*9999)
},'POST');

//
export const queryApplyPayAmount = (orderId) => fetch('/client-service/router/rest.do?method=api.com.flight.order.queryApplyPayAmount',{
	orderId:orderId,
	version: '1.0.0',
	rad: Math.floor(Math.random()*9999)
},'POST');

//服务详情
export const showService = (vasId) => fetch('/client-service/router/rest.do?method=api.com.flight.vas.info',{
	vasId:vasId,
	version: '1.0.0',
	rad: Math.floor(Math.random()*9999)
},'POST');

//wiki
export const wiki = (orderId,orderMainId) => fetch('/client-service/router/rest.do?method=api.com.flight.order.orderDetail',{
	orderId:orderId,
    orderMainId:orderMainId,
	version: '1.0.0',
	rad: Math.floor(Math.random()*9999)
},'POST');

//orderBackChange
export const orderBackChange = (orderId,orderMainId) => fetch('/client-service/router/rest.do?method=api.com.flight.order.orderBackChange',{
	orderId: orderId,
    orderMainId: orderMainId,
	version: '1.0.0',
	rad: Math.floor(Math.random()*9999)
},'POST');

//支付
export const goPay = (orderId) => fetch('/client-service/router/rest.do?method=api.com.flight.pay.validateByOrderId',{
	orderId:orderId,
	version: '1.0.0',
	rad: Math.floor(Math.random()*9999)
},'POST');

//搜索门票
export const searchTicket = (cityName) => fetch('/api/router/rest.do?method=api.com.ticket.search.searchTicket',{
	lvversion:'7.4.0',
    keyword:cityName,
	version: '1.0.0',
	rad: Math.floor(Math.random()*9999)
},'POST');
//智能推荐
export const smartRecForBigTraffic = (info) => fetch('//m.lvmama.com/nsearch/router/rest.do?method=api.com.csa.intelligent.smartRecForBigTraffic',{
	userNo:info.userNo,
	udid:info.udid,
	customerId:info.customerId,
	destId:info.destId,
	channelCode:info.channelCode,
	firstChannel:info.firstChannel,
	globalLatitude:info.globalLatitude,
	globalLongitude:info.globalLongitude,
	recCategoryId:info.recCategoryId,
	version: '1.0.0',
	rad: Math.floor(Math.random()*9999)
},'POST');
//点击只能推荐
export const recfeedback = (info) => fetch('//ai.lvmama.com/ds/rec/recfeedback/recFeedbackCollecter',{
	user_id:info.user_id,
	product_id:info.product_id,
	scene_type:info.scene_type,
	device_id:info.device_id,
	cid:info.cid,
	mobile_flag:info.mobile_flag,
	rec_banner:info.rec_banner,
	rec_batch_id:info.rec_batch_id,
	token:info.token,
	version: '1.0.0',
	rad: Math.floor(Math.random()*9999)
},'POST');
//调取返程优惠券接口
export const sendCoupon = (couponId) => fetch('/new/api/router/rest.do?method=api.com.train.coupon.sendCoupon',{
	couponId:'7621',//'10296'
	version: '1.0.0',
	rad: Math.floor(Math.random()*9999)
},'POST');

//请求最低价火车票
export const searchCheap = (traindeparcode,traindestcode) => fetch('/client-service/router/rest.do?method=api.com.train.trains.searchCheap',{
	fromStationCode:traindeparcode,
    toStationCode:traindestcode,
	version: '1.0.0',
	rem: Math.floor(Math.random()*9999)
},'POST');

//获得购票须知信息
export const getFlightTicketRule = (flightNo,carrierCode,seatClassCode,departureDate,deptAirportCode,destAirportCode,policyId,saletype,segmentFlag) => fetch('/client-service/router/rest.do?method=api.com.flight.order.flightTicketRule',{
	flightNo : flightNo,
    carrierCode : carrierCode,
    seatClassCode : seatClassCode,
    departureDate : departureDate,
    from:deptAirportCode,
    to:destAirportCode,
    policyId : policyId,
    saleType : saletype,
    segmentFlag : segmentFlag,
	version: '1.0.0',
	rad: Math.floor(Math.random()*9999)
},'POST');

//
export const CTMTSearch = (from,to,departureDate,orderId,carrierCode,bookingSource) => fetch('/client-service/router/rest.do?method=api.com.flight.search.CTMTSearch',{
	from:from,
    to: to,
	departureDate: departureDate,
	orderId:orderId,
    facet: true,
    isCarrier: true,
	carrierCode: carrierCode,
	bookingSource: bookingSource,
	version: '1.0.0',
	rad: Math.floor(Math.random()*9999)
},'POST');

//verifyseatandprice
export const verifyseatandprice = (flightNo,destineDate,departCode,destCode,seatClassCode,policyId) => fetch('/client-service/router/rest.do?method=api.com.flight.booking.verifyseatandprice',{
	flightNo : flightNo,
    departureDate : destineDate,
    departureAirportCode : departCode,
    arrivalAirportCode : destCode,
    seatClassCode : seatClassCode,
    policyId : policyId,
	version: '1.0.0',
	rad: Math.floor(Math.random()*9999)
},'POST');

//根据sessionid获取用户信息
export const getLvUser = (lvsessionid) => fetch('/client-service/router/rest.do?method=api.com.flight.other.getLvUser',{
	lvsessionid:lvsessionid,
	version: '1.0.0',
	rad: Math.floor(Math.random()*9999)
},'POST');

//获取用户信息
export const getLvUserByCookie = () => fetch('/client-service/router/rest.do?method=api.com.flight.other.getLvUserByCookie',{
	version: '1.0.0',
	rad: Math.floor(Math.random()*9999)
},'POST');

//火车票获取用户信息
export const getLvUserByTrain = (lvsessionid) => fetch('/new/api/router/rest.do?method=api.com.train.other.getLvUser',{
	lvsessionid: lvsessionid,
	version: '1.0.0',
	rad: Math.floor(Math.random()*9999)
},'POST');

//是否使用下单立减
export const getShowPriceFlag = () => fetch('/client-service/router/rest.do?method=api.com.flight.price.getShowPriceFlag',{
	version: '1.0.0',
	rad: Math.floor(Math.random()*9999)
},'POST');

//获取常用乘机人接口数据
export const getCommonPersonMes = () => fetch('/client-service/router/rest.do?method=api.com.flight.other.contacts',{
	version: '1.0.0',
	rad: Math.floor(Math.random()*9999)
},'POST');

//接送机获取地址百度接口
export const getTransferAddress = (inputLocation,fetchName, callBackName, callBackFunc) => jsonpFetch('//map.baidu.com/su',{
	wd: inputLocation,
	cid: '',
	type: 0,
	t: new Date().getTime(),
	from: 'jsapi'
},fetchName ,callBackName, callBackFunc);

//TDK
export const getTDK = (key) => fetch(`/api/router/rest.do?method=api.com.tdk.queryTdkRule&version=1.0.0&debug=false&format=json&key=${key}`,{
	
},'GET');

//商旅我的订单获取机票
export const getFlightBusinessTravel = (customerId,page,rows) => fetch(`/client-service/router/rest.do?method=api.com.flight.travel.order.getList&rad=${Math.floor(Math.random()*9999)}&version=1.0.0&customerId=${customerId}&page=${page}&rows=${rows}`,{
	
},'GET');

//商旅待我审核订单获取机票
export const getFlightWaitBusinessTravel = (customerId,page,rows) => fetch(`/client-service/router/rest.do?method=api.com.flight.travel.getAuditOrderlist&rad=${Math.floor(Math.random()*9999)}&version=1.0.0&customerId=${customerId}&page=${page}&rows=${rows}`,{
	
},'GET');

//商旅待我审核订单获取火车票
export const getTrainWaitBusinessTravel = (customerId) => fetch(`/new/api/router/rest.do?method=api.com.train.order.travelUnPayOrder&version=1.0.0&rad=${Math.floor(Math.random()*9999)}&userNo=${customerId}`,{
	
},'GET');

//商旅我的订单获取火车票
export const getTrainBusinessTravel = (customerId,page,rows) => fetch(`/new/api/router/rest.do?method=api.com.train.order.myTravelOrder&version=1.0.0&rad=${Math.floor(Math.random()*9999)}&userNo=${customerId}&pageIndex=${page}&pageSize=${rows}`,{
	
},'GET');

//商旅订单详情取消订单
export const travelCancelOrder = (orderId,reason) => fetch('/client-service/router/rest.do?method=api.com.flight.travel.order.cancel',{
	orderId:orderId,
	reason:reason,
	version: '1.0.0',
	rad: Math.floor(Math.random()*9999)
},'POST');

//商旅订单详情审批通过
export const travelPassOrder = (objectId) => fetch('/client-service/router/rest.do?method=api.com.flight.travel.order.pay',{
	objectId:objectId,
	version: '1.0.0',
	rad: Math.floor(Math.random()*9999)
},'POST');

//查询主单下所有子单信息
export const orderListByOrderMainId = (orderMainId) => fetch('/client-service/router/rest.do?method=api.com.flight.order.orderListByOrderMainId',{
	orderMainId:orderMainId,
	version: '1.0.0',
	rad: Math.floor(Math.random()*9999)
},'POST');
//低价订阅列表
export const LowSubscription = () => fetch('/client-service/router/rest.do?method=api.com.flight.subscriptLowPrice.query', {
	version: '1.0.0',
	rad: Math.floor(Math.random() * 9999)
}, 'POST');
//低价订阅添加
export const lowPriceAdd = (deptCode, arriCode, bookingSource, beginDepDate, endDepDate, expectedPrice, mobileNumber) => fetch('/client-service/router/rest.do?method=api.com.flight.subscriptLowPrice.add', {
	deptCode: deptCode,
	arriCode: arriCode,
	bookingSource: bookingSource,
	beginDepDate: beginDepDate,//最早时间
	endDepDate: endDepDate,//最晚时间
	expectedPrice: expectedPrice,//期望价格
	mobileNumber: mobileNumber,
	version: '1.0.0',
	rad: Math.floor(Math.random() * 9999)
}, 'POST');
//低价订阅修改
export const lowPriceEdit = (deptCode, arriCode, bookingSource, beginDepDate, endDepDate, expectedPrice, id, mobileNumber) => fetch('/client-service/router/rest.do?method=api.com.flight.subscriptLowPrice.update', {
	deptCode: deptCode,
	arriCode: arriCode,
	bookingSource: bookingSource,
	beginDepDate: beginDepDate,
	endDepDate: endDepDate,
	expectedPrice: expectedPrice,
	id:id,
	mobileNumber: mobileNumber,
	version: '1.0.0',
	rad: Math.floor(Math.random() * 9999)
}, 'POST');
//低价订阅删除
export const lowPriceRemove = (id, status, mobileNumber, actualPrice, searchTimes, noticeTimes, noticeTime) => fetch('/client-service/router/rest.do?method=api.com.flight.subscriptLowPrice.update', {
	id: id,
	status: status,
	mobileNumber: mobileNumber,
	actualPrice: actualPrice,
	searchTimes: searchTimes,
	noticeTimes: noticeTimes,
	noticeTime: noticeTime,
	version: '1.0.0',
	rad: Math.floor(Math.random() * 9999)
}, 'POST');
//最优权益券列表
export const getRightCouponList = (param) => fetch('/client-service/router/rest.do?method=api.com.traffic.coupon.optimalRightCoupon', {
	param:param,
	version: '1.0.0',
	rad: Math.floor(Math.random() * 9999)
}, 'POST');
//查询抽奖记录接口
export const queryMarketingActivity = (param) => fetch('//m.lvmama.com/new/api/router/rest.do?method=api.com.train.activity.queryMarketingActivityPrizeRecord', {
	receiveCode:param.receiveCode,
	activityId:param.activityId,
	userId:param.userId,
	version: '1.0.0',
	rad: Math.floor(Math.random() * 9999)
}, 'POST');
//抽奖
export const getMarketingActivity = (param) => fetch('//m.lvmama.com/new/api/router/rest.do?method=api.com.train.activity.getMarketingActivityPrize', {
	categoryType:param.categoryType,
	orderSource:param.orderSource,
	orderScene:param.orderScene,
	userType:param.userType,
	customerAccount:param.customerAccount,
	receiveCode:param.receiveCode,
	activityId:param.activityId,
	orderId:param.orderId,
	userId:param.userId,
	mobile:param.mobile,
	version: '1.0.0',
	rad: Math.floor(Math.random() * 9999)
}, 'POST');
//康旅用户校验接口
export const checkKangLvUser = () => fetch('/client-service/router/rest.do?method=api.com.flight.user.lvmamaCard', {
	version: '1.0.0',
	rad: Math.floor(Math.random() * 9999)
}, 'POST');
//接口耗時查詢
export const saveRecordTime = (indexId,pageUsedTime,backUsedTime) => fetch('/client-service/router/rest.do?method=api.com.flight.search.saveRecordTime',{
	indexId:indexId,
	pageUsedTime:pageUsedTime,
	backUsedTime:backUsedTime,
	version: '1.0.0',
	rad: Math.floor(Math.random() * 9999)
}, 'POST');


