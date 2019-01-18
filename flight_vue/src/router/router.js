import App from '../App'

const home = r => require.ensure([], () => r(require('../page/home/home')), 'flight')
const datePicker = r => require.ensure([], () => r(require('../page/datePicker/index')), 'datePicker')
const flightList = r => require.ensure([], () => r(require('../page/flightList/flightList')), 'flightList')
const cityPicker = r => require.ensure([], () => r(require('../page/cityPicker/index')), 'cityPicker')
const destine = r => require.ensure([], () => r(require('../page/destine/destine')),'destine')
const orderForm = r => require.ensure([], () => r(require('../page/orderForm/orderForm')), 'orderForm')
const feedBack = r => require.ensure([], () => r(require('../page/feedBack/feedBack')), 'feedBack')
const orderDetail = r => require.ensure([], () => r(require('../page/orderDetail/orderDetail')), 'orderDetail')
const travelHelper = r => require.ensure([], () => r(require('../page/travelHelper/travelHelper')), 'travelHelper')
const choosePassenger = r => require.ensure([], () => r(require('../page/choosePassengers/choosePassengers')),'choosePassenger')
const airportInfos = r => require.ensure([], () => r(require('../page/airportInfos/airportInfos')), 'airportInfos')
const searchAirport = r => require.ensure([], () => r(require('../page/searchAirport/searchAirport')), 'searchAirport')
const airportBusDetail = r => require.ensure([], () => r(require('../page/airportBusDetail/airportBusDetail')), 'airportBusDetail')
const addEditPassenger = r => require.ensure([], () => r(require('../page/addEditPassengers/addEditPassengers')),'addEditPassenger')
const insuranceList = r => require.ensure([], () => r(require('../page/insuranceList/insuranceList')), 'insuranceList')
const airportTransportation = r => require.ensure([], () => r(require('../page/airportTransportation/airportTransportation')), 'airportTransportation')
const transferAddressSearch = r => require.ensure([], () => r(require('../page/transferAddressSearch/transferAddressSearch')), 'transferAddressSearch')
const lowPrice = r => require.ensure([], () => r(require('../page/lowPrice/lowPrice')), 'lowPrice')
const transferCarType = r => require.ensure([], () => r(require('../page/transferCarType/transferCarType')), 'transferCarType')
const addEditAddress = r => require.ensure([], () => r(require('../page/addEditAddress/addEditAddress')), 'addEditAddress')
const chooseAddress = r => require.ensure([], () => r(require('../page/chooseAddress/chooseAddress')), 'chooseAddress')
const flightSchedule = r => require.ensure([], () => r(require('../page/flightSchedule/flightSchedule')), 'flightSchedule')
const serviceDetail = r => require.ensure([], () => r(require('../page/serviceDetail/serviceDetail')), 'serviceDetail')
const flightScheduleDetail = r => require.ensure([], () => r(require('../page/flightScheduleDetail/flightScheduleDetail')), 'flightScheduleDetail')
const activeList = r => require.ensure([], () => r(require('../page/activeList/activeList')), 'activeList')
const couponList = r => require.ensure([], () => r(require('../page/couponList/couponList')), 'couponList')
const orderSuccess = r => require.ensure([], () => r(require('../page/orderSuccess/orderSuccess')), 'orderSuccess')
const flightMap = r => require.ensure([], () => r(require('../page/flightMap/flightMap')), 'flightMap')
const flightShare = r => require.ensure([], () => r(require('../page/flightShare/flightShare')), 'flightShare')
const specialCityList = r => require.ensure([], () => r(require('../page/specialCityList/specialCityList')), 'specialCityList')
const flightMapSearchCondition = r => require.ensure([], () => r(require('../page/flightMapSearchCondition/flightMapSearchCondition')), 'flightMapSearchCondition')
const endorse = r => require.ensure([], () => r(require('../page/endorse/endorse')), 'endorse')
const businessTravelIndex = r => require.ensure([], () => r(require('../page/businessTravelIndex/businessTravelIndex')), 'businessTravelIndex')
const businessTravelMy = r => require.ensure([], () => r(require('../page/businessTravelMy/index')), 'businessTravelMy')
const businessTravelAdd = r => require.ensure([], () => r(require('../page/businessTravelAdd/businessTravelAdd')), 'businessTravelAdd')
const businessTravelOrderSuccess = r => require.ensure([], () => r(require('../page/businessTravelOrderSuccess/businessTravelOrderSuccess')), 'businessTravelOrderSuccess')
const businessTravelApprove = r => require.ensure([], () => r(require('../page/businessTravelApprove/businessTravelApprove')), 'businessTravelApprove')
const businessTravelAllOrders = r => require.ensure([], () => r(require('../page/businessTravelAllOrders/businessTravelAllOrders')), 'businessTravelAllOrders')
const businessTravelHelper = r => require.ensure([], () => r(require('../page/businessTravelHelper/businessTravelHelper')), 'businessTravelAllOrders')
const businessTravelQuery = r => require.ensure([], () => r(require('../page/businessTravelQuery/businessTravelQuery')), 'businessTravelQuery')
const lowPriceRemind = r => require.ensure([], () => r(require('../page/lowPriceRemind/lowPriceRemind')), 'lowPriceRemind')
const addRemind = r => require.ensure([], () => r(require('../page/addRemind/addRemind')), 'addRemind')
const priceMovements = r => require.ensure([], () => r(require('../page/priceMovements/priceMovements')), 'priceMovements')
const flightEquity = r => require.ensure([], () => r(require('../page/flightEquity/flightEquity')), 'flightEquity')
const activities = r => require.ensure([], () => r(require('../page/activities/activities')), 'activities')
const kangLvPicker = r => require.ensure([], () => r(require('../page/kangLvPicker/index')), 'kangLvPicker')
const applyforEndorse = r => require.ensure([], () => r(require('../page/applyforEndorse/applyforEndorse')), 'applyforEndorse')
const activitie = r => require.ensure([], () => r(require('../page/activitie/activitie')), 'activitie')
const changeFlightList = r => require.ensure([], () => r(require('../page/changeFlightlist/changeFlightlist')), 'changeFlightList')


export default [{
    path: '/flight',
    component: App, //顶层路由，对应index.html
    children: [ //二级路由。对应App.vue
        //地址为空时跳转home页面
        {
            path: '',
            redirect: '/flight/home'
        },
        
        //首页城市列表页
        {
            path: '/flight/home',
            component: home,
            children: [
                
            ]
        },
        {
            path: 'home',
            component: home
        },
        {
            path: '/flight/businessTravel',
            component: home
        },
        {
            path: '/flight/businessTravelold',
            component: home
        },
        //日历
        {
            path: 'datePicker/:kind/:from',
            component: datePicker
        },
        // {
        //     path: 'flightList/:goCityCode/:backCityCode/',
        //     component: flightList
        // },
        {
            path: ':goCityCode-:backCityCode',
            component: flightList
        },
        // {
        //     path: 'flightList/:goCityCode/:backCityCode/:date',
        //     component: flightList
        // },
        {
            path: ':goCityCode-:backCityCode/:date',
            component: flightList
        },
        {
            path: 'cityPicker/:kind/:from',
            component: cityPicker
        },
        {
            path: 'destine',
            component:destine
        },
        {
            path: 'orderForm',
            component: orderForm
        },
        {
            path: 'feedBack/:from',
            component: feedBack
        },
        {
            path: 'orderDetail/:orderMainId/:orderId',
            component: orderDetail
        },
        // {
        //     path: '#/orderDetail/:orderMainId/:orderId',
        //     component: orderDetail
        // },
        {
            path: 'orderDetail/:orderMainId/:orderId/travel',
            component: orderDetail
        },
        {
            path: 'travelHelper',
            component: travelHelper,
        },
        {
            path: 'choosePassenger',
            component: choosePassenger
        },
        {
            path: 'airportInfos',
            component: airportInfos
        },
        {
            path: 'searchAirport',
            component: searchAirport
        },
        {
            path: 'airportBusDetail',
            component: airportBusDetail
        },
        {
            path: 'addEditPassenger',
            component: addEditPassenger
        },
        {
            path: 'insuranceList',
            component: insuranceList
        },
        {
            path: 'airportTransportation',
            component: airportTransportation
        },
        {
            path: 'transferAddressSearch/:kind/:dressKind',
            component: transferAddressSearch
        },
        {
            path: 'lowPrice',
            component: lowPrice
        },
        {
            path: 'transferCarType/:kind',
            component: transferCarType
        },{
            path: 'flightSchedule',
            component: flightSchedule
        },
        {
            path: 'addEditAddress/:operateType',
            component: addEditAddress
        },
        {
            path: 'chooseAddress',
            component: chooseAddress
        },
        {
            path: 'serviceDetail',
            component: serviceDetail
        },
        {
            path: 'flightScheduleDetail',
            component: flightScheduleDetail
        },
        {
            path: 'activeList',
            component: activeList
        },
        {
            path: 'couponList',
            component: couponList
        },
        {
            path: 'orderSuccess/:orderId',
            component: orderSuccess
        },
        {
            path: 'orderSuccess/:orderId/:orderMainId',
            component: orderSuccess
        },
        {
            path: 'flightMap',
            component: flightMap
        },
        {
            path: 'flightShare',
            component: flightShare
        },
        {
            path: 'specialCityList',
            component: specialCityList
        },
        {
            path: 'flightMapSearchCondition',
            component: flightMapSearchCondition
        },
        {
            path: 'endorse/:orderMainId/:orderId/:type',
            component: endorse           
        },
        {
            path: 'businessTravelIndex',
            component: businessTravelIndex           
        },
        {
            path: 'businessTravelMy',
            component: businessTravelMy           
        },
        {
            path: 'businessTravelAdd',
            component: businessTravelAdd           
        },
        {
            path: 'businessTravelOrderSuccess',
            component: businessTravelOrderSuccess  
        },
        {
            path: 'businessTravelApprove',
            component: businessTravelApprove
        },
        {
            path: 'businessTravelAllOrders',
            component: businessTravelAllOrders
        },
        {
            path: 'businessTravelHelper',
            component: businessTravelHelper
        },
        {
            path: 'businessTravelHelper/:type',
            component: businessTravelHelper
        },
        {
            path: 'businessTravelQuery',
            component: businessTravelQuery
        },
        {
            path: 'lowPriceRemind',
            component: lowPriceRemind
        },
        {
            path: 'addRemind/:kind',
            component: addRemind
        },
        {
            path: 'priceMovements',
            component: priceMovements
        },
        {
            path: 'flightEquity/:type',
            component: flightEquity
        },
        {
            path: 'activities/:code/:id/:orderId',
            component: activities
        },
        {
            path: 'activitie/:code/:id/:orderId',
            component: activitie
        },
        {
            path: 'applyforEndorse',
            component: applyforEndorse
        },
        {
            path: 'kangLvPicker',
            component: kangLvPicker
        },
        {
            path:'changeFlightList',
            component:changeFlightList
        }

    ]
}]