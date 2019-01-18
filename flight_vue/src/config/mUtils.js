/**
 * 存储localStorage
 */
export const setStore = (name, content) => {
	if (!name) return;
	if (typeof content !== 'string') {
		content = JSON.stringify(content);
	}
	window.localStorage.setItem(name, content);
}

/**
 * 获取localStorage
 */
export const getStore = name => {
	if (!name) return;
	return window.localStorage.getItem(name);
}

/**
 * 删除localStorage
 */
export const removeStore = (name,that) => {
	if (!name) return;
    try{
        if(that!=null){
            let detail = {
                key: name,
                val: ''
            };
            that.initData(detail);
        }
    }catch(e){
        
    }
    
	window.localStorage.removeItem(name);
}
/**
 * 获取cookie
 */
export const getCookie = (objName) =>{
    let arrStr = document.cookie.split(";");
    for (let i = 0; i < arrStr.length; i++) {
        let temp = arrStr[i].split("=");
        if (trim(temp[0]) == objName) return decodeURIComponent(temp[1]);
    }
}
export const trim = (str) =>{
    return str.replace(/(^\s*)|(\s*$)/g, "");
}
/**
 * 设置cookie
 */
export const setRootCookie = (name, value, domain, path) =>{
    let _domain = domain;
    let _path = path;
    if(_domain){
        _domain=";domain="+_domain;
    }else{
        _domain="";
    }
    if(_path){
        _path=";path="+_path;
    }else{
        _path="";
    }
    let Days = 30; //此 cookie 将被保存 30 天
    let exp = new Date(); //new Date("December 31, 9998");
    exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
    document.cookie = name + "=" + escape(value) +_domain+_path+ ";expires=" + exp.toGMTString();
}
/**
 * 设置cookie
 */
export const setCookie = (name, value) => {
    let Days = 30; //此 cookie 将被保存 30 天
    let exp = new Date(); //new Date("December 31, 9998");
    exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
    document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();
}
/**
 * 删除cookie
 */
export const delRootCookie = (name) => {
    document.cookie = name + "=;domain=.lvmama.com" + ";path=/" + ";expires=" + (new Date(0)).toGMTString();
}
export const delCookie = (name) => {
    document.cookie = name + "=;expires=" + (new Date(0)).toGMTString();
}
/**
 * 2017-01-01 改为01月01日 周一
 */
export const getDataWeek = (val) =>{
    let input=val;
    let da=switchDateFormate(formatIOSDate(val));
    input=da.split("-")[1]+"月"+da.split("-")[2].split(" ")[0]+"日 "+da.split(" ")[1];
    return input;
    ;
}
/**
 * 获取URL参数值
 */
export const getUrlParam = (name) => {
    let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); // 构造一个含有目标参数的正则表达式对象
    let r = window.location.search.substr(1).match(reg); // 匹配目标参数
    if (r != null)
        return unescape(r[2]);
    return null; // 返回参数值
}
/*
 * 获取URL参数放入LIST
 */
export const getRequest = () => {
    let url = location.search,theRequest = new Object(),str,strs;
    if (url.indexOf("?") != -1) {
        str = url.substr(1);
        strs = str.split("&");
        for(var i = 0; i < strs.length; i ++) {
            theRequest[strs[i].split("=")[0]]=decodeURI(strs[i].split("=")[1]);
        }
    }
    return theRequest;
}
/**
 * 判断是否为客户端
 */
export const isClient = () =>{
    let that = this,
        agent = navigator.userAgent,
        wpAgent = window.location.href,
        wp_version = getUrlParam("wpversion"),
        wp_agent = getUrlParam("wpagent");
    if (agent.indexOf("MicroMessenger") != -1) {
        return "3";
    } else if (agent.indexOf("LVMM") > 0) {
        if (agent.indexOf("LVMMPAD") > 0) {
            // if (agent.indexOf(that.nearestVerPad) > 0) {
            //     return "02";
            // }
            return "2";
        }
        //  else if (agent.indexOf(that.nearestVer) > 0) {
        //     return "01";
        // }
        return "1";
    } else if (agent.indexOf("Windows") > 0 && agent.indexOf("Phone") > 0 && wp_agent == "LVMM") {
        //判别来自wp系列
        if (wp_version == that.nearestVerWP) {
            return "04";
        } else {
            return "4";
        }
    }else {
        return "0"; //非客户端
    }
}
/**
 *  跳转登录
 */
export const jumpLogin = () =>{
    let options = {};
    let host = window.location.href;
    options.onsuccess = success;
    options.login_third = "true";
    options.onfail = fail;
   
    if(host.indexOf("destine")!= -1){
        // if(host.indexOf("//")<0) {
            // host = host.substring(0, host.indexOf("/flight")) + "/vflight/index.html#/orderForm";
        // }else{
            host = host.substring(0, host.indexOf("/flight")) + "/flight/orderForm";
        // }
    }
    Login(options,host);
}
export const success = (data) => {
    let lvsessionid = data.sessionId;
    this.setCookie("lvsessionid",data.sessionId);
}
export const fail = () => {
   
}
export const Login = (options, strurl) => {
    let that = this;
    delRootCookie("lvsessionid");
    delCookie("lvsessionid");
    let _optStr = _fetchQueue(options);
    let isClients = isClient();
    let _url = strurl ? strurl : window.location.href,
        hostUrl=location.href.indexOf("//")!=-1?location.href.substring(0,location.href.indexOf("/flight")+1):"//m.lvmama.com/";
    if (isClients.indexOf("1") > -1 || isClients.indexOf("2") > -1) {
        //框内调用登陆台
        window.location.href = (hostUrl + "login.htm?service=" + encodeURIComponent(_url));
        console.log(url+"框内调用登陆台");
    } else if (isClients.indexOf("4") > -1) {
        //WP框内调用登陆台
        let url = "//" + location.host + "Login?" + _optStr;
        window.location.href = url;
        console.log(url+"WP框内调用登陆台");
    } else {
        //框外调用url
        console.log(_url+"框外调用url");
        window.location.href = (hostUrl + "login.htm?service=" + encodeURIComponent(_url));

    }
}
/**
 * json转换为字符串
 */
export const _fetchQueue = (Queue) => {
    let messageQueueString,
        messageQueueArr = [];
    //重组对象
    for (var x in Queue) {
        switch (typeof Queue[x]) {
            case 'string':
                Queue[x] = Queue[x];
                break;
            case 'function':
                Queue[x] = Queue[x].name;
                break;
        }

    }
    messageQueueArr.push(Queue);
    messageQueueString = JSON.stringify(messageQueueArr);
    //返回字符串的JSON格式
    return messageQueueString;
}
/**
 * 获取登录所需LvSessionId
 */
export const getLvSessionId = () => {
    let lvsessionid = "",
        conObj = window.WebViewJavascriptBridge || window.lvmm,
        ua = navigator.userAgent;

    return new Promise((resolve, reject) => {
        if(conObj && conObj.callHandler && ua.indexOf("LVMM") > -1){

            NativeUtil.lvCommon("lvJSGetSessionId",{},function(data){
                if(data.indexOf("returnValue") > -1){
                    lvsessionid = JSON.parse(data).returnValue.sessionId;
                }
                resolve(lvsessionid);
            });
        }else{
            lvsessionid = getCookie("lvsessionid") || "";
            resolve(lvsessionid);
        }
        
    })

}
/**
 * 统计成人儿童
 */
export const statisticsPersonType = () =>{
    let persons,personTypeMessage,ADULTNumber=0,CHILDRENNumber=0;
    persons = JSON.parse(getStore("selectedPersons"))||[];
    for(let i=0; i<persons.length; i++){
        if(persons[i].peopleType=="ADULT"){
            ADULTNumber=ADULTNumber+1;
        }else{
            CHILDRENNumber= CHILDRENNumber+1;
        }
    }
    personTypeMessage="成人"+ADULTNumber+"人 儿童"+CHILDRENNumber+"人";
    setStore("flight_personNumber",{"ADULTNumber":ADULTNumber,"CHILDRENNumber":CHILDRENNumber});
    return personTypeMessage;
}
/**
 * 跳转订单列表
 */
export const orderDetailHref = () => {
    if(isClient()==1) {
        if(navigator.userAgent.indexOf('Android')!=-1){
             NativeUtil.goClass("MineOrderList",{"needLogin":"0","orderType":"FLIGHT","comeFrom":"h5"})
         }else{
             NativeUtil.goClass("MineOrderList",{"needLogin":"1","orderType":"FLIGHT","comeFrom":"h5"})
         }
     }else {
        // if(location.search.indexOf('flag=flight')!=-1){
        //     window.location.href="//m.lvmama.com/user/pages/orders.html";
        // }else if(location.search.indexOf('flag=waitPay')!=-1){
        //     window.location.href="//m.lvmama.com/user/pages/pending_audit.html?type=waitPay";
        // }else if(location.search.indexOf('flag=waitPerform')!=-1){
        //     window.location.href="//m.lvmama.com/user/pages/pending_audit.html?type=waitPerform";
        // }else if(location.search.indexOf('flag=waitReview')!=-1){
        //     window.location.href="//m.lvmama.com/user/pages/pending_audit.html?type=waitReview";
        // }else if(location.search.indexOf('flag=member')!=-1){
        //     location.href="//m.lvmama.com/my/";
        // }else{
        //     window.location.href="//m.lvmama.com/user/pages/flight.html";
        // }
        if(location.search.indexOf('fromMy=true')!=-1){
            window.history.go(-1);
        }else{
            window.location.href="//m.lvmama.com/static/webapp/busi/my/orderList/#/flight";
        }
     }
     
}
/*
    wap 返回订单列表
*/
export const wapHref = () => {
    // if(location.search.indexOf('flag=flight')!=-1){
    //     window.location.href="//m.lvmama.com/user/pages/orders.html";
    // }else if(location.search.indexOf('flag=waitPay')!=-1){
    //     window.location.href="//m.lvmama.com/user/pages/pending_audit.html?type=waitPay";
    // }else if(location.search.indexOf('flag=waitPerform')!=-1){
    //     window.location.href="//m.lvmama.com/user/pages/pending_audit.html?type=waitPerform";
    // }else if(location.search.indexOf('flag=waitReview')!=-1){
    //     window.location.href="//m.lvmama.com/user/pages/pending_audit.html?type=waitReview";
    // }else if(location.search.indexOf('flag=member')!=-1){
    //     location.href="//m.lvmama.com/my/";
    // }else{
    //     window.location.href="//m.lvmama.com/user/pages/flight.html";
    // }
    if(location.search.indexOf('fromMy=true')!=-1){
        window.history.go(-1);
    }else{
        window.location.href="//m.lvmama.com/static/webapp/busi/my/orderList/#/flight";
    }
     
}
/**
 * 跟换manifest js
 */
// export const manifestJS = () => {
//     for(let i=0;i<document.scripts.length;i++){
//         if(document.scripts[i].src.indexOf("manifest")!=-1){
//             document.scripts[i].src="//m.lvmama.com/flight/static/js/manifest.js?v="+Math.floor(Math.random()*9999);
//         }
//     }    
// }
/**
 * 详情返回
 */
export const orderDetailHrefNew = () =>{
    if(isClient()==1) {
         location.href="//m.lvmama.com/flight?method=backToOrderList&isFresh=true";
     }else {
        // if(location.search.indexOf('flag=flight')!=-1){
        //     window.location.href="//m.lvmama.com/user/pages/orders.html";
        // }else if(location.search.indexOf('flag=waitPay')!=-1){
        //     window.location.href="//m.lvmama.com/user/pages/pending_audit.html?type=waitPay";
        // }else if(location.search.indexOf('flag=waitPerform')!=-1){
        //     window.location.href="//m.lvmama.com/user/pages/pending_audit.html?type=waitPerform";
        // }else if(location.search.indexOf('flag=waitReview')!=-1){
        //     window.location.href="//m.lvmama.com/user/pages/pending_audit.html?type=waitReview";
        // }else if(location.search.indexOf('flag=member')!=-1){
        //     location.href="//m.lvmama.com/my/";
        // }else{
        //     window.location.href="//m.lvmama.com/user/pages/flight.html";
        // }
        if(location.search.indexOf('fromMy=true')!=-1){
            window.history.go(-1);
        }else{
            window.location.href="//m.lvmama.com/static/webapp/busi/my/orderList/#/flight";
        }
     }
}
/**
 * 校验手机号码格式
 */
export const checkMobile = (val) => {
    let valRE = /^\d{11}$/;
    if(valRE.test(val)){
        return true;
    }
    return false;
}
/**
 * 格式化星期
 */
export const weekFormat = (val) => {
    switch (val) {
        case 1:
            return '周一';
            break;
        case 2:
            return '周二';
            break;
        case 3:
            return '周三';
            break;
        case 4:
            return '周四';
            break;
        case 5:
            return '周五';
            break;
        case 6:
            return '周六';
            break;
        case 0:
            return '周日';
            break;
    }
};
/**
 * 格式化时间
 */
export const switchDateFormate = (MS) => {
    //强制转换北京时间
    let date=new Date(MS);
    let datestr = date.toString();
    let timeZone = 8 - datestr.split(" ")[5].substring(3,6);
    date.setHours(date.getHours() + timeZone);
    let year = date.getFullYear(),
        day = date.getDate(),
        day1 = day >= 10 ? day : ("0" + day),
        month = date.getMonth()+ 1,
        month1 = month >= 10 ? month : ("0" + month),
        hour = date.getHours(),
        hour1 = hour >= 10? hour: ("0" + hour),
        min = date.getMinutes(),
        min1 = min >= 10? min: ("0" + min),
        weekday;
        switch(date.toDateString().substr(0,3)){
            case "Mon":
                weekday = "周一";
                break;
            case "Tue":
                weekday = "周二";
                break;
            case "Wed":
                weekday = "周三";
                break;
            case "Thu":
                weekday = "周四";
                break;
            case "Fri":
                weekday = "周五";
                break;
            case "Sat":
                weekday = "周六";
                break;
            case "Sun":
                weekday = "周日";
                break;
        }
        // console.log(year + "-" + month1 + "-" + day1 + " " + weekday + " " + hour1 + ":" + min1);
    return (year + "-" + month1 + "-" + day1 + " " + weekday + " " + hour1 + ":" + min1);
}
/**
 * 数字转中文月份
 */
export const monthFormat = (val) => {
    switch (val) {
        case 1:
            return '一月';
            break;
        case 2:
            return '二月';
            break;
        case 3:
            return '三月';
            break;
        case 4:
            return '四月';
            break;
        case 5:
            return '五月';
            break;
        case 6:
            return '六月';
            break;
        case 7:
            return '七月';
            break;
        case 8:
            return '八月';
            break;
        case 9:
            return '九月';
            break;
        case 10:
            return '十月';
            break;
        case 11:
            return '十一月';
            break;
        case 12:
            return '十二月';
            break;
    }
};

   /*
    *证件类型
   */
export const typeFormat = (type) => {
    switch(type){
        case 'ID_CARD':
                return '身份证';
                break;
        case 'ID':
            return '身份证';
            break;
        case 'PASSPORT':
            return '护照';
            break;
        case 'HUZHAO':
            return '护照';
            break;
        case 'TAIBAOZHENG':
            return '台胞证';
            break;
        case 'HUIXIANG':
            return '回乡证';
            break;
        case 'OFFICER':
            return '军官证';
            break;
        case 'SOLDIER':
            return '士兵证';
            break;
        case 'RPGA':
            return '港澳居民居住证';
            break;
        case 'RPTW':
            return '台湾居民居住证';
            break;
        case 'GANGAORESIDENCE':
            return '港澳居民居住证';
            break;
        case 'TAIBAORESIDENCE':
            return '台湾居民居住证';
            break;
        case 'OTHER':
            return '其它';
            break;
    }
};

/**
*获取时分
*/
export const getTimes = (val) => {
    if (val!=''&&val!=null) {
        var newDate = new Date(val.replace(/-/g, "/"));
        var hours = newDate.getHours()>=10 ? newDate.getHours() : '0'+newDate.getHours();
        var minutes = newDate.getMinutes()>=10 ? newDate.getMinutes() : '0'+newDate.getMinutes();
        return hours+':'+minutes;
    }
};

/**
 * 小于10补零
 */
export const addZero = (num) => {
    return +num > 9 ? num : `0${num}`
};

/**
 * 大于10补零
 */
export const deleZero = (num) => {
    return +num > 9 ? num : num.substring(1);
};
/**
 * 将时间格式规范为2017-8-31
 */

 export const standardDate = (time) => {
        //强制转换北京时间
        var date=new Date(time);
        var year = date.getFullYear(),
            day = date.getDate(),
            day1 = day >= 10 ? day : ("0" + day),
            month = date.getMonth()+ 1,
            month1 = month >= 10 ? month : ("0" + month);        
        return (year + "-" + month1 + "-" + day1);
};
/**
 * 将时间格式2017-8-31转为2017/8/31
 */

 export const formatIOSDate = (time) => {
    return String(time).replace(/-/g,'/');
};
/**
 * 去除所有空格 手机号码 身份证号码
 */

 export const removeBlank = (input) => {
    return input.replace(/\s/g,"");
};

/*
    根据年月 计算出月份的天数
*/
 export const getJudgeMonthDays = (year, month) => {
     if (month == 1 || month == 3 || month == 5 || month == 7 || month == 8 || month == 10 || month == 12) {
         return 31;
     } else if (month == 4 || month == 6 || month == 9 || month == 11) {
         return 30;
     } else {
         let isLeapYear = (year % 4 === 0) && ((year % 100 !== 0) || (year % 400 === 0)) ? true : false;
         if (isLeapYear) {
             return 29;
         } else {
             return 28;
         }
     }
 }
/**
 * 用于自动关闭弹框
 */

 export const autoCloseAlert = (item) => {
    setTimeout(() => {
        item = false;
    },2000);
 }

/**
 * 获取style样式
 */
export const getStyle = (element, attr, NumberMode = 'int') => {
    let target;
    // scrollTop 获取方式不同，没有它不属于style，而且只有document.body才能用
    if (attr === 'scrollTop') { 
        target = element.scrollTop;
    }else if(element.currentStyle){
        target = element.currentStyle[attr]; 
    }else{ 
        target = document.defaultView.getComputedStyle(element,null)[attr]; 
    }
    //在获取 opactiy 时需要获取小数 parseFloat
    return  NumberMode == 'float'? parseFloat(target) : parseInt(target);
} 
/*
 *获取提交订单来源
 */
export const getBookingSource = () =>{
    let agent=navigator.userAgent;
    if(getStore("businessTravel")==true || getStore("businessTravel")=="true"){
        return "LVMAMA_TRAVEL";
    }else{
        if(agent.indexOf('Mobile') > 0 && agent.indexOf('Android') > 0 && agent.indexOf('LVMM')>0){
            return "LVMAMA_ANDROID";
        }else if((agent.indexOf('Mobile') > 0 || agent.indexOf('MOBILE') > 0) && (agent.indexOf('iPhone OS') > 0 || agent.indexOf('IPHONE OS') > 0 || agent.indexOf('iPad') > 0) && agent.indexOf('LVMM') > 0){
            return "LVMAMA_IOS";
        }else if(agent.indexOf('Mobile') > 0 && agent.indexOf('Windows Phone') > 0){
            return "LVMAMA_WINPHONE";
        }else{
            return "LVMAMA_WAP";
        }
    }
    
}
/**
 * 发红包枚举
*/
export const getRedSource = () =>{
    let agent=navigator.userAgent;
    if(getStore("businessTravel")==true || getStore("businessTravel")=="true"){
        return "B2G";
    }
    if (agent.indexOf('Mobile') > 0 && (agent.indexOf('iPhone OS') > 0 || agent.indexOf('iPad') > 0) && agent.indexOf('LVMM') > 0) {
        return "IOS";
    } else if (agent.indexOf('Mobile') > 0 && agent.indexOf('Android') > 0 && agent.indexOf('LVMM') > 0) {
        return "ANDROID";
    } else if (agent.match(/MicroMessenger/i) == "MicroMessenger") {
        return "WEIXIN";
    } else if(agent.indexOf('Mobile') > 0 && agent.indexOf('Windows Phone') > 0){
        return "WINPHONE";
    } else{
        return "WAP";
    }
}
/*
 * 获取通知入参枚举
 */
export const getNoticeSource = () =>{
    let agent=navigator.userAgent;
    if(agent.indexOf('Mobile') > 0 && agent.indexOf('Android') > 0 && agent.indexOf('LVMM')>0){
        return "Android";
    }else if((agent.indexOf('Mobile') > 0 || agent.indexOf('MOBILE') > 0) && (agent.indexOf('iPhone OS') > 0 || agent.indexOf('IPHONE OS') > 0 || agent.indexOf('iPad') > 0) && agent.indexOf('LVMM') > 0){
        return "IOS";
    }else{
        return "WAP";
    }
}
/*
 * 获取智能推荐枚举
 */
export const getZNSource = () =>{
    let agent=navigator.userAgent;
    if(agent.indexOf('Mobile') > 0 && agent.indexOf('Android') > 0 && agent.indexOf('LVMM')>0){
        return "ANDROID";
    }else if((agent.indexOf('Mobile') > 0 || agent.indexOf('MOBILE') > 0) && (agent.indexOf('iPhone OS') > 0 || agent.indexOf('IPHONE OS') > 0 || agent.indexOf('iPad') > 0) && agent.indexOf('LVMM') > 0){
        return "IPHONE";
    }else{
        return "TOUCH";
    }
}
/**
 * 校验是否为iphoneX
 */
export const isIphoneX = () => {
    if(getNoticeSource()=="IOS" && ((screen.width==375 && screen.height==812)||(screen.width==414 && screen.height==896))){
        return true;
    }
    return false;
}
/**
 * cm统计 页面流量
 */
export const getStatisticsType = (PageID,CategoryID) =>{
    statisticsUtil.execStatis('page',{
        pi:PageID,
        cg: CategoryID
    })
}
/**
 * cm统计 事件流量
 */
export const getElementTag = (PageID,CategoryID) =>{
    statisticsUtil.execStatis('element',{
        eid:PageID,
        ecat:CategoryID
    })
}
/**
 * 下单流量
 */
export const shopAction9Tag = (Product_ID,Name,Quality,Price,customer_ID,Order_ID,Order_Subtotal) =>{
    statisticsUtil.execStatis('shop',{
        pr:'',
        pm:Name,
        qt:Quality,
        bp:Price,
        cg:"_AbraodDetail",
        on:Order_ID,
        tr:Order_Subtotal,
        cd:customer_ID
    })
}
/*
 * 特惠券来源
 */
export const getVascouponSource = () =>{
    let agent=navigator.userAgent;
    if(getStore("businessTravel")==true || getStore("businessTravel")=="true"){
        return "LVMAMA_TRAVEL";
    }else{
         if (agent.indexOf('Mobile') > 0 && agent.indexOf('Android') > 0 && agent.indexOf('LVMM') > 0) {
            return "ANDROID_FLIGHT";
        } else if((agent.indexOf('Mobile') > 0 || agent.indexOf('MOBILE') > 0) && (agent.indexOf('iPhone OS') > 0 || agent.indexOf('IPHONE OS') > 0 || agent.indexOf('iPad') > 0) && agent.indexOf('LVMM') > 0) {
            return "IOS_FLIGHT";
        } else {
            return "WAP_FLIGHT";
        }
    }
}
/**
 * 页面到达底部，加载更多
 */
export const loadMore = (element, callback) => {
	let windowHeight = window.screen.height;
	let height;
	let setTop;
	let paddingBottom;
	let marginBottom;
    let requestFram;
    let oldScrollTop;

    document.body.addEventListener('scroll',() => {
       loadMore();
    }, false)
    //运动开始时获取元素 高度 和 offseTop, pading, margin
	element.addEventListener('touchstart',() => {
        height = element.offsetHeight;
        setTop = element.offsetTop;
        paddingBottom = getStyle(element,'paddingBottom');
        marginBottom = getStyle(element,'marginBottom');
    },{passive: true})

    //运动过程中保持监听 scrollTop 的值判断是否到达底部
    element.addEventListener('touchmove',() => {
       loadMore();
    },{passive: true})

    //运动结束时判断是否有惯性运动，惯性运动结束判断是非到达底部
    element.addEventListener('touchend',() => {
       	oldScrollTop = document.body.scrollTop;
       	moveEnd();
    },{passive: true})
    
    const moveEnd = () => {
        requestFram = requestAnimationFrame(() => {
            if (document.body.scrollTop != oldScrollTop) {
                oldScrollTop = document.body.scrollTop;
                loadMore();
                moveEnd();
            }else{
            	cancelAnimationFrame(requestFram);
            	//为了防止鼠标抬起时已经渲染好数据从而导致重获取数据，应该重新获取dom高度
            	height = element.offsetHeight;
                loadMore();
            }
        })
    }

    const loadMore = () => {
        if (document.body.scrollTop + windowHeight >= height + setTop + paddingBottom + marginBottom) {
            callback();
        }
    }
}

/**
 * 显示返回顶部按钮，开始、结束、运动 三个过程中调用函数判断是否达到目标点
 */
export const showBack = callback => {
    let requestFram;
    let oldScrollTop;

    document.addEventListener('scroll',() => {
       showBackFun();
    }, false)
    document.addEventListener('touchstart',() => {
       showBackFun();
    },{passive: true})

    document.addEventListener('touchmove',() => {
       showBackFun();
    },{passive: true})

    document.addEventListener('touchend',() => {
        oldScrollTop = document.body.scrollTop;
        moveEnd();
    },{passive: true})
    
    const moveEnd = () => {
        requestFram = requestAnimationFrame(() => {
            if (document.body.scrollTop != oldScrollTop) {
                oldScrollTop = document.body.scrollTop;
                moveEnd();
            }else{
                cancelAnimationFrame(requestFram);
            }
            showBackFun();
        })
    }

    //判断是否达到目标点
    const showBackFun = () => {
        if (document.body.scrollTop > 500) {
            callback(true);
        }else{
            callback(false);
        }
    }
}
/**
 * 判断身份证是否正确
 */
export const isIDcard = (data) => {
    if(data.length == 18){
        data = data.split('');
        //加权因子
        let factor = [ 7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2 ];
        //校验位
        let parity = [ 1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2 ];
        let sum = 0;
        let ai = 0;
        let wi = 0;
        for (let i = 0; i < 17; i++){
            ai = data[i];
            wi = factor[i];
            sum += ai * wi;
        }
        if(parity[sum % 11] != data[17]){
           return false;
        }
        return true;
    }else{
        return false;
    }
}
/**
 * 判断其他证件类型
 */
export const ischeckCard = (data) => {
    let regs=/^[0-9a-zA-Z]+$/;//验证是否是数字加中文
    if(data==null || data==""){
        return false;
    }
    if(regs.test(data)){
        return true;
    }else{
        return false;
    }
}
/**
 * 月份汉字表示
 */
export const monthStr = (data) => {
    if(data && data.length>0){
        var arr =[];
        for (var i = 0; i < data.length; i++) {
            if(data[i]==0){
                var month = {
                    "key":0,
                    "value":"不限"
                };
                arr.push(month);
            }else if (data[i]==1) {
                var month = {
                    "key":1,
                    "value":"一月"
                };
                arr.push(month);
            }else if(data[i]==2){
                var month = {
                    "key":2,
                    "value":"二月"
                };
                arr.push(month);
            }else if(data[i]==3){
                var month = {
                    "key":3,
                    "value":"三月"
                };
                arr.push(month);
            }else if(data[i]==4){
                var month = {
                    "key":4,
                    "value":"四月"
                };
                arr.push(month);
            }else if(data[i]==5){
                var month = {
                    "key":5,
                    "value":"五月"
                };
                arr.push(month);
            }else if(data[i]==6){
                var month = {
                    "key":6,
                    "value":"六月"
                };
                arr.push(month);
            }else if(data[i]==7){
                var month = {
                    "key":7,
                    "value":"七月"
                };
                arr.push(month);
            }else if(data[i]==8){
               var month = {
                    "key":8,
                    "value":"八月"
                };
                arr.push(month);
            }else if(data[i]==9){
                var month = {
                    "key":9,
                    "value":"九月"
                };
                arr.push(month);
            }else if(data[i]==10){
                var month = {
                    "key":10,
                    "value":"十月"
                };
                arr.push(month);
            }else if(data[i]==11){
                var month = {
                    "key":11,
                    "value":"十一月"
                };
                arr.push(month);
            }else if(data[i]==12){
                var month = {
                    "key":12,
                    "value":"十二月"
                };
                arr.push(month);
            }
        }
        return arr;
    }
    return data;
}
/**
 * 运动效果
 * @param {HTMLElement} element   运动对象，必选
 * @param {JSON}        target    属性：目标值，必选
 * @param {number}      duration  运动时间，可选
 * @param {string}      mode      运动模式，可选
 * @param {function}    callback  可选，回调函数，链式动画
 */
export const animate = (element, target, duration = 400, mode = 'ease-out', callback) => {
    clearInterval(element.timer);

    //判断不同参数的情况
    if (duration instanceof Function) {
        callback = duration;
        duration = 400;
    }else if(duration instanceof String){
        mode = duration;
        duration = 400;
    }

    //判断不同参数的情况
    if (mode instanceof Function) {
        callback = mode;
        mode = 'ease-out';
    }

    //获取dom样式
    const attrStyle = attr => {
        if (attr === "opacity") { 
            return Math.round(getStyle(element, attr, 'float') * 100);
        } else {
            return getStyle(element, attr);
        }
    }
    //根字体大小，需要从此将 rem 改成 px 进行运算
    const rootSize = parseFloat(document.documentElement.style.fontSize);

    const unit = {};
    const initState = {};

    //获取目标属性单位和初始样式值
    Object.keys(target).forEach(attr => {
        if (/[^\d^\.]+/gi.test(target[attr])) {
            unit[attr] = target[attr].match(/[^\d^\.]+/gi)[0] || 'px';
        }else{
            unit[attr] = 'px';
        }
        initState[attr] = attrStyle(attr);
    });

    //去掉传入的后缀单位
    Object.keys(target).forEach(attr => {
        if (unit[attr] == 'rem') {
            target[attr] = Math.ceil(+target[attr].replace(/rem/g,'')*rootSize);
        }else{
            target[attr] = parseInt(target[attr]);
        }
    });


    let flag = true; //假设所有运动到达终点
    const remberSpeed = {};//记录上一个速度值,在ease-in模式下需要用到
    element.timer = setInterval(() => {
        Object.keys(target).forEach(attr => {
            let iSpeed = 0;  //步长
            let status = false; //是否仍需运动
            let iCurrent = attrStyle(attr) || 0; //当前元素属性址
            let speedBase = 0; //目标点需要减去的基础值，三种运动状态的值都不同
            let intervalTime; //将目标值分为多少步执行，数值越大，步长越小，运动时间越长
            switch(mode){
                case 'ease-out': 
                    speedBase = iCurrent;
                    intervalTime = duration*5/400;
                    break;
                case 'linear':
                    speedBase = initState[attr];
                    intervalTime = duration*20/400;
                    break;
                case 'ease-in':
                    let oldspeed = remberSpeed[attr] || 0;
                    iSpeed = oldspeed + (target[attr] - initState[attr])/duration;
                    remberSpeed[attr] = iSpeed
                    break;
                default:
                    speedBase = iCurrent;
                    intervalTime = duration*5/400; 
            }
            if (mode !== 'ease-in') {
                iSpeed = (target[attr] - speedBase) / intervalTime;
                iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);
            }
            //判断是否达步长之内的误差距离，如果到达说明到达目标点
            switch(mode){
                case 'ease-out': 
                    status = iCurrent != target[attr]; 
                    break;
                case 'linear':
                    status = Math.abs(Math.abs(iCurrent) - Math.abs(target[attr])) > Math.abs(iSpeed);
                    break;
                case 'ease-in':
                    status = Math.abs(Math.abs(iCurrent) - Math.abs(target[attr])) > Math.abs(iSpeed);
                    break;
                default:
                    status = iCurrent != target[attr]; 
            }

            if (status) {
                flag = false; 
                //opacity 和 scrollTop 需要特殊处理
                if (attr === "opacity") {
                    element.style.filter = "alpha(opacity:" + (iCurrent + iSpeed) + ")";
                    element.style.opacity = (iCurrent + iSpeed) / 100;
                } else if (attr === 'scrollTop') {
                    element.scrollTop = iCurrent + iSpeed;
                }else{
                    element.style[attr] = iCurrent + iSpeed + 'px';
                }
            } else {
                flag = true;
            }

            if (flag) {
                clearInterval(element.timer);
                if (callback) {
                    callback();
                }
            }
        })
    }, 20);
}
