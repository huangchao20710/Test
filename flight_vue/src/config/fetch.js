import {
	baseUrl
} from './env'

export const jsonpFetch = (url, data, fetchName, callback, succFun) => {
	if (typeof data == 'string') {
      callback = data;
      data = {};
    }
    let callbackParam = url.indexOf('?') > -1 ? '&' : `?${fetchName}=${callback}`
    url += callbackParam;
    let params = '';
    for (let i in data) {

      params += '&' + i + '=' + data[i]
    }
    url += params;
    window[callback] = succFun;
    let script = document.createElement('script');
    script.setAttribute('src', url);
    document.querySelector('head').appendChild(script);
}

export const fetch = (url = '', data = {}, type = 'GET') => {
	type = type.toUpperCase();
	url = baseUrl + url;
	//键值对装换为字符串
    const params = (data) => {
        let arr = [];
        for (let i in data) {
        	try{
        		data[i]=data[i].replace(/\+/g,"%2B");
        		data[i] = data[i].replace(/\&/g,"%26");  
        	}catch(e){}
        	
            arr.push((i) + '=' + (data[i]));
        }
        return arr.join('&');
    };
	
	if (type == 'GET') {
		let dataStr = ''; //数据拼接字符串
		Object.keys(data).forEach(key => {
			try{
        		data[key]=data[key].replace(/\+/g,"%2B");
				data[key] = data[key].replace(/\&/g,"%26");  
        	}catch(e){}
			dataStr += key + '=' + data[key] + '&';
		})

		if (dataStr !== '') {
			dataStr = dataStr.substr(0, dataStr.lastIndexOf('&'));
			url = url + '?' + dataStr;
		}
	}

	return new Promise((resolve, reject) => {
		let requestObj;
		if (window.XMLHttpRequest) {
			requestObj = new XMLHttpRequest();
		} else {
			requestObj = new ActiveXObject;
		}

		let sendData = '';
		if (type == 'POST') {
			sendData = params(data);
		}

		requestObj.open(type, url, true);
		requestObj.setRequestHeader("Content-type", "application/x-www-form-urlencoded;charset=UTF-8");
		requestObj.setRequestHeader("Accept", "application/json, text/plain, */*");
		if (url.indexOf('tdk') != -1 || url.indexOf('smartRecForBigTraffic') != -1) {
			requestObj.setRequestHeader("signal", "ab4494b2-f532-4f99-b57e-7ca121a137ca");
		}
		requestObj.send(sendData);
		requestObj.onreadystatechange = () => {

			if (requestObj.readyState == 4) {
				if (requestObj.status == 200) {
					let obj = requestObj.response;
					let serverTime = new Date(requestObj.getResponseHeader("Date")).getTime();
					if (typeof obj !== 'object') {
						obj = JSON.parse(obj);
					}
					obj.serverTime = serverTime;
					resolve(obj)
				} else {
					reject(requestObj)
				}
			}
		}
	})
	
}