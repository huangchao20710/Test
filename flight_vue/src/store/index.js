// import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './action'
import getters from './getters'
import {setStore, getStore} from '../config/mUtils'

Vue.use(Vuex)

const state = {
	isDouble:  JSON.parse(getStore('isDouble')) || false,//是否是往返
	departDate: JSON.parse(getStore('departDate')) || '',//出发日期
	backDate: JSON.parse(getStore('backDate')) || '',//返程日期
	daysPrice: JSON.parse(getStore('daysPrice')) || '',//机票低价日历价格
	chosenGoTrip: JSON.parse(getStore('chosenGoTrip')) || true,//有没有选择去程
	chosenBackTrip: JSON.parse(getStore('chosenBackTrip')) || false,//有没有选择返程
	departureCity: JSON.parse(getStore('departureCity')) || {
		airportCityCode:"SHA",
		code:"SHA",
		firstLetter:"s",
		hot:1,
		id:7341,
		jianPin:"SH",
		name:"上海",
		pinYin:"shanghai"
	},//出发城市
	arrivalCity: JSON.parse(getStore('arrivalCity')) || {
		airportCityCode:"PEK",
		code:"PEK",
		firstLetter:"b",
		hot:2,
		id:7578,
		jianPin:"BJ",
		name:"北京",
		pinYin:"beijing"
	},//到达城市
	flightInformation: JSON.parse(getStore('flightInformation')) || '',//航班列表信息
	nowDateStamp: JSON.parse(getStore('nowDateStamp')) || '',//当前时间戳
	allMonthInfos: JSON.parse(getStore('allMonthInfos')) || '' ,//所有date信息
	areaData: JSON.parse(getStore('areaData')) || '',//三级联动城市数据
	allAirportsInfo: JSON.parse(getStore('allAirportsInfo')) || '',//行程助手中所有机场信息
	travelHelperChosenAirport: JSON.parse(getStore('travelHelperChosenAirport')) || '',//行程助手信息展示的机场信息
	airportBusDetail: JSON.parse(getStore('airportBusDetail')) || '',//机场大巴详情
	locationInfo: JSON.parse(getStore('locationInfo')) || '',//获取当前位置的信息
	insuranceListInfo: JSON.parse(getStore('insuranceListInfo')) || '',//所有机票保险信息
	transferAboveAddress: '',//接送机上半部分地址
	transferBelowAddress: '',//接送机下半部分地址
	transferAboveSelectedCar: null,//接送机上半部分选择的车型
	transferBelowSelectedCar: null,//接送机下半部分选择的车型
	selectedPersons : JSON.parse(getStore('selectedPersons')) || [],//已选择的乘机人
	commonPersonMes : JSON.parse(getStore('commonPersonMes')) || [],//所有乘机人
	transferAboveCars: JSON.parse(getStore('transferAboveCars')) || '',//接送机上半部分车型
	transferBelowCars: JSON.parse(getStore('transferBelowCars')) || '',//接送机下半部分车型
	noticeDetail: '',
	transferInfo: JSON.parse(getStore('transferInfo')) || '',//接送机所有信息
	editPersonMes:JSON.parse(getStore('editPersonMes')) || '',//编辑的乘机人
	promotionList:JSON.parse(getStore('promotionList')) || '',//促销活动
	searchHistoryArr: JSON.parse(getStore('searchHistoryArr')) || [],//历史搜索记录
	allMailAddress: JSON.parse(getStore('allMailAddress')) || [],//所有的邮寄地址信息，接口返回的
	editMailAddress: JSON.parse(getStore('editMailAddress')) || '',//
	chosenMailAddress: JSON.parse(getStore('chosenMailAddress')) || '',//
	knockOrReduced:JSON.parse(getStore('knockOrReduced')) || false,//区分已减和立减 true为立减
	userId: JSON.parse(getStore('userId')) || '',
	knockOrReduced:JSON.parse(getStore('knockOrReduced')) || false,//区分已减和立减 true为立减
	serviceDetail:JSON.parse(getStore('serviceDetail')) || null,//展示贵宾室详情
	activeList:JSON.parse(getStore('activeList')) || [],//促销活动列表
	coupon:JSON.parse(getStore('coupon')) || '',//选中的优惠券
	couponList:JSON.parse(getStore('couponList')) || [],//优惠券列表
	needVoucher: JSON.parse(getStore('needVoucher')) || false,//是否需要报销凭证
	dynamicsInfor:JSON.parse(getStore('dynamicsInfor')) || [],//航班动态信息
	postAddress:JSON.parse(getStore('postAddress')) || null,//详情报销凭证
	insurancesDetail:JSON.parse(getStore('insurancesDetail')) || null,//详情保险
	flightMapThemes: [
		{
			kind: '阳光沙滩',
			picked: false,
			cities: [
				{"name":"青岛","code":"TAO","price":"--"},
				{"name":"大连","code":"DLC","price":"--"},
				{"name":"海口","code":"HAK","price":"--"},
				{"name":"北海","code":"BHY","price":"--"},
				{"name":"三亚","code":"SYX","price":"--"},
				{"name":"深圳","code":"SZX","price":"--"},
				{"name":"烟台","code":"YNT","price":"--"},
				{"name":"秦皇岛","code":"BPE","price":"--"},
				{"name":"厦门","code":"XMN","price":"--"}
			]
		},
		{
			kind: '美食之都',
			picked: false,
			cities: [
				{"name":"昆明","code":"KMG","price":"--"},
				{"name":"重庆","code":"CKG","price":"--"},
				{"name":"贵阳","code":"KWE","price":"--"},
				{"name":"广州","code":"CAN","price":"--"},
				{"name":"合肥","code":"HFE","price":"--"},
				{"name":"武汉","code":"WUH","price":"--"},
				{"name":"天津","code":"TSN","price":"--"},
				{"name":"丽江","code":"LJG","price":"--"},
				{"name":"长沙","code":"CSX","price":"--"}
			]
		},
		{
			kind: '乐园寻趣',
			picked: false,
			cities: [
				{"name":"上海","code":"SHA","price":"--"},
				{"name":"广州","code":"CAN","price":"--"},
				{"name":"珠海","code":"ZUH","price":"--"},
				{"name":"大连","code":"DLC","price":"--"},
				{"name":"深圳","code":"SZX","price":"--"},
				{"name":"北京","code":"PEK","price":"--"}
			]
		},
		{
			kind: '毕业旅行',
			picked: false,
			cities: [
				{"name":"青岛","code":"TAO","price":"--"},
				{"name":"成都","code":"CTU","price":"--"},
				{"name":"厦门","code":"XMN","price":"--"},
				{"name":"呼和浩特","code":"HET","price":"--"},
				{"name":"敦煌","code":"DNH","price":"--"},
				{"name":"秦皇岛","code":"BPE","price":"--"},
				{"name":"大理","code":"DLU","price":"--"},
				{"name":"昆明","code":"KMG","price":"--"},
				{"name":"拉萨","code":"LXA","price":"--"},
				{"name":"桂林","code":"KWL","price":"--"}
			]
		},
		{
			kind: '历史古都',
			picked: false,
			cities: [
				{"name":"北京","code":"PEK","price":"--"},
				{"name":"南京","code":"NKG","price":"--"},
				{"name":"西安","code":"XIY","price":"--"},
				{"name":"洛阳","code":"LYA","price":"--"},
				{"name":"杭州","code":"HGH","price":"--"},
				{"name":"郑州","code":"CGO","price":"--"},
				{"name":"大同","code":"DAT","price":"--"}
			]
		},
		{
			kind: '消暑圣地',
			picked: false,
			cities: [
				{"name":"桂林","code":"KWL","price":"--"},
				{"name":"丽江","code":"LJG","price":"--"},
				{"name":"青岛","code":"TAO","price":"--"},
				{"name":"大连","code":"DLC","price":"--"},
				{"name":"秦皇岛","code":"BPE","price":"--"},
				{"name":"贵阳","code":"KWE","price":"--"},
				{"name":"烟台","code":"YNT","price":"--"}
			]
		}
	],//地图探索主题
	flightMapMonth: JSON.parse(getStore('flightMapMonth')) || '',//地图探索时间月份
	flightMapPrice: JSON.parse(getStore('flightMapPrice')) || '',//地图探索价格区间
	flightMapInputCity: JSON.parse(getStore('flightMapInputCity')) || '',//地图探索输入城市
	allCityLowPrice:JSON.parse(getStore('allCityLowPrice')) || '',
	businessTravelUser:JSON.parse(getStore('businessTravelUser')) || '',//差旅用户信息
	selectSalesPrice:JSON.parse(getStore('selectSalesPrice')) || '',//选择的去程价格
	businessTravel:JSON.parse(getStore('businessTravel')) || false,//是否是差旅下单
	businessOrders:JSON.parse(getStore('businessOrders')) || [],//差旅订单
	businessWaitOrders:JSON.parse(getStore('businessWaitOrders')) || [],//待我审批订单
	goFlightList:false,//是否从航班列表页跳过去又回航班列表页
	lowPriceInfor: JSON.parse(getStore('lowPriceInfor')) || [],//低价订阅的头部信息
	invincibleList: JSON.parse(getStore('invincibleList')) || [],//无敌券列表
	rightInsurance: JSON.parse(getStore('rightInsurance')) || [],//保险权益券券列表
	trafficTransfer: JSON.parse(getStore('trafficTransfer')) || [],//接送机权益券列表
	airportVipLounge: JSON.parse(getStore('airportVipLounge')) || [],//贵宾室权益券列表
	productTypePriceList: JSON.parse(getStore('productTypePriceList')) || [],//所选增值产品
	isKangLvUser: JSON.parse(getStore('isKangLvUser')) || false,//是不是康旅卡用户
	packageInfo: JSON.parse(getStore('packageInfo')) || false,//绑定产品包
	couponListRequestObj: JSON.parse(getStore('couponListRequestObj')) || null,//优惠券接口入参
	endorseInfo: JSON.parse(getStore('endorseInfo')) || null,//改签信息
	// isKangLvUser: JSON.parse(getStore('isKangLvUser')) || null,//是不是康旅卡用户
}

export default new Vuex.Store({
	state,
	getters,
	actions,
	mutations,
})