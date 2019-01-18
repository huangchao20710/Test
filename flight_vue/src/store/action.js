import {
	getFlightDaysPrice
} from '../service/getData'
import {
	SET_INITIALIZE_STATE,
} from './mutation-types.js'

export default {
	//将接口返回的日历价格存至state
	saveDaysPrice({
		commit,
		state
	},obj) {
		getFlightDaysPrice(obj.departureAirportCode,obj.arrivalAirportCode,obj.startDate,obj.endDate).then((res) => {
			if (res.code == '1') {
				let obj1 = {
					key: obj.key,
					val: res.data
				}
				commit('SET_INITIALIZE_STATE', obj1)
			}else{
				let obj1 = {
					key: obj.key,
					val: []
				}
				commit('SET_INITIALIZE_STATE', obj1)
			}
		});
	},
	//初始化数据
	initData({commit,state},dateObj) {
		commit('SET_INITIALIZE_STATE', dateObj);
	},
	//初始化无缓存数据
	initNoStorageData({commit,state},dateObj) {
		commit('SET_NO_STORAGE_STATE', dateObj);
	}
}