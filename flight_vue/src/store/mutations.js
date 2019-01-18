import {
	SET_INITIALIZE_STATE,
	SET_NO_STORAGE_STATE
} from './mutation-types.js'

import {setStore, getStore} from '../config/mUtils'

import {localapi, proapi} from 'src/config/env'

export default {
	// 录入有缓存基础信息状态
	[SET_INITIALIZE_STATE](state,obj) {
		state[obj.key] = obj.val
		setStore(obj.key,JSON.stringify(obj.val));
	},
	// 录入无缓存基础信息状态
	[SET_NO_STORAGE_STATE](state,obj) {
		state[obj.key] = obj.val
	}

}
