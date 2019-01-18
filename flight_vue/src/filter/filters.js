// import Vue from 'vue'
import { weekFormat,addZero } from '../config/mUtils.js'
Vue.filter('addZero',(val)=>{
	if (val != '' && val != null) {
		return val > 9 ? val: `0${val}`;
	}
})

Vue.filter('monthDate',(val)=>{
	if (val!=''&&val!=null) {
		val=val.substring(10,16);
		return val;
	}
})

Vue.filter('mobileFormat',(val)=> {
    if(val!=null && val.length==11){
        val=val.substring(0,3)+" "+val.substring(3,7)+" "+val.substring(7,11);
    }
    return val;
});

Vue.filter('strDate',(val) => {
	if (val!=''&&val!=null) {
		var newDate = new Date(val.replace(/-/g, "/"));
        var month = (newDate.getMonth()+1)>=10 ? (newDate.getMonth()+1) : '0'+(newDate.getMonth()+1);
        var date  =newDate.getDate()>=10 ? newDate.getDate() : '0'+newDate.getDate();
        return month+'月'+date+'日';
	}
})

Vue.filter('monthDay',(val) => {
    if(val!=null && val!=''){
        val = val.substring(5);
    }
    return val;
})

Vue.filter('vasOrderStatus',(input) => {
        if(input=="USED"){
            input = "已使用";
        }else if(input=="DISABLED"){
            input = "已禁用";
        }else if(input=="EXPIRED"){
            input = "已过期";
        }else if(input=="CANCEL_SUCC"){
            input ="已取消";
        }else if(input=="CAN_USE"){
            input ="可使用";
        }else if(input=="BINDING_FAIL"){
            input ="订单异常，请联系客服";
        }else if(input=="CANCEL_FAIL"  || input=="NOT_ACTIVE"){
            input ="出票成功后即可获得";
        }else if(input=="BOOKING_FAIL"){
            input ="下单失败，请联系客服";
        }
        return input;
})

Vue.filter('strTime',(val) => {
	if (val!=''&&val!=null) {
		var newDate = new Date(val.replace(/-/g, "/"));
        var hours = newDate.getHours()>=10 ? newDate.getHours() : '0'+newDate.getHours();
        var minutes = newDate.getMinutes()>=10 ? newDate.getMinutes() : '0'+newDate.getMinutes();
        return hours+':'+minutes;
	}
})

Vue.filter('flyTime',(input) => {
    if(input!="" && input!=null){
        input=input.split(":")[0]+"小时"+input.split(":")[1]+"分";
    }
    return input;
})

Vue.filter('switchDate',(input) => {
	    //强制转换北京时间
        var date=new Date(input);
        var datestr = date.toString();
        var timeZone = 8 - datestr.split(" ")[5].substring(3,6);
        date.setHours(date.getHours() + timeZone);
        var year = date.getFullYear(),
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
        return (year + "-" + month1 + "-" + day1 + " " + weekday + " " + hour1 + ":" + min1);
})

Vue.filter('orderDateFormate',(input) => {
	if (input!=null && input!='') {
       let date=new Date(input),
            year = date.getFullYear(),
            day = date.getDate(),
            day1 = day >= 10 ? day : ("0" + day),
            month = date.getMonth()+ 1,
            month1 = month >= 10 ? month : ("0" + month);
        return (year + "年" + month1 + "月" + day1+'日');
    }
})

Vue.filter('flightMapDateFormate',(input) => {
    if (input!=null && input!='') {
       let arr = input.split('-');
        return (arr[0] + "年" + arr[1] + "月" + arr[2] + '日');
    }
})

Vue.filter('telCardType',(input) => {
	if (input!=''&&input!=null) {
		let numLength = input.length;
        let two = input.substring(0, 3);
        let lastTwo = input.substring(numLength - 4, numLength);
        let xxx = "";
        for (let i = 0; i < numLength - 7; i++) {
            xxx = xxx + "*";
        }
        input = two + xxx + lastTwo;
        return input;
	}
})

Vue.filter('mealType',(val) => {
	if(val==null||val=="" || val=="无"){
        val="无餐食";
    }else if(val=="有"){
        val="有餐食";
    }
    return val;
})
Vue.filter('replaceSymbol',(val) => {
	if(val!=null&&val!=""){
		val = val.replace(","," ");
		return val;
     }
    
})
Vue.filter('passengerType',(val) => {
	if(val=="CHILDREN"){
            val = "儿童";
        }else if(val=="ADULT"){
            val = "成人";
        }
	return val;
});
Vue.filter('cardType',(input) =>  {
    if(input=="ID" || input=="ID_CARD"){
        input = "身份证";
    }else if(input=="PASSPORT" || input=="HUZHAO"){
        input = "护照";
    }else if(input=="GANGAO"){
        input = "港澳通行证";
    }else if(input=="HUIXIANG"){
        input = "回乡证";
    }else if(input=="TAIBAO"){
        input = "台湾通行证";
    }else if(input=="OFFICER"){
        input = "军官证";
    }else if(input=="SOLDIER"){
        input = "士兵证";
    }else if(input=="TAIBAOZHENG"){
        input = "台胞证";
    }else if(input=="OTHER"){
        input = "其他";
    }else if(input=="RPGA"||input=="GANGAORESIDENCE"){
        input = "港澳居民居住证";
    }else if(input=="RPTW"||input=="TAIBAORESIDENCE"){
        input = "台湾居民居住证";
    }else if(input!=null && input!=""){
        input = "请选择证件类型";
    }
    return input;
});
Vue.filter('certificateTypeFilter',(val) => {
	if (val!=null&&val!='') {
		switch(val){
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
	        case 'GANGAO':
	            return '港澳通行证';
	            break;
	        case 'TAIBAO':
	        	return '台湾通行证';
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
	        case 'OTHER':
	            return '其它';
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
	    }
	}
})
//将时间戳转换为显示时间仅用于接送机页面
Vue.filter('showTransferTime',(val) => {
	if(val!=null&&val!=""){
		let nowDate = new Date(val),
	        year = nowDate.getFullYear(),
	        month = nowDate.getMonth() + 1,
	        date = nowDate.getDate(),
	        day = nowDate.getDay(),
	        hour = nowDate.getHours(),
	        minutes = nowDate.getMinutes();
	    return `${year}-${month}-${date} ${weekFormat(day)} ${addZero(hour)}:${addZero(minutes)}`
     }
})

//将时间戳转换为显示时间仅用于订单填写
Vue.filter('showTransferTimeInOrderForm',(val) => {
	if(val!=null&&val!=""){
		let nowDate = new Date(val),
	        year = nowDate.getFullYear(),
	        month = nowDate.getMonth() + 1,
	        date = nowDate.getDate(),
	        hour = nowDate.getHours(),
	        minutes = nowDate.getMinutes();
	    return `${year}-${month}-${date} ${addZero(hour)}:${addZero(minutes)}`
     }
})

Vue.filter('activityType',(val) => {
	if (val!=null && val!='') {
       if (val=="NOTICE") {
            val="通知";
       }else if(val=="IMMEDIATELY_FAVORABLE"){
            val="立减";
       }else if(val=="MORE_ORDER_MORE_FAVORABLE"){
            val="多订多惠";
       }else if(val=="TEHUI"){
           val="特惠";
       }
    }
    return val;
})

Vue.filter('filterDepTime',(val) => {
	if (val!=null && val!='') {
       let newDate = new Date(val.replace(/-/g, "/")),
           month = newDate.getMonth()+1,
           date  =newDate.getDate();
       return month+'月'+date+'日';
    }
   
})
// 2018-04-16=>4月16日
Vue.filter('DepMonthDate',(val) => {
	if (val!=null && val!='') {
        let month = val.substring(5,7),
        date = val.substring(8,10);
        if(month.substring(0,1)==0){
            month=month.substring(1,2);
        }
        if(date.substring(0,1)==0){
            date=date.substring(1,2);
        }
       return month+'月'+date+'日';
    }  
})

Vue.filter('filterState',(val) => {
	if (val!=null && val!=''&& val=='计划') {
		return '正常';
    }
   return val;
})
Vue.filter('weekFilter',(val) => {
    if(val!=null){
        if(val==1){
            return "周一"
        }else if(val==2){
            return "周二"
        }else if(val==3){
            return "周三"
        }else if(val==4){
            return "周四"
        }else if(val==5){
            return "周五"
        }else if(val==6){
            return "周六"
        }else if(val=='0'){
            return "周日"
        }
    }
   return val;
})
Vue.filter('businessDateFormate',(val) => {
    if (val!=null && val!='') {
       let newDate = new Date(val.replace(/-/g, "/")),
           month = newDate.getMonth()+1,
           date = newDate.getDate();
       return addZero(month)+'/'+addZero(date);
    }
})
Vue.filter('descendPrice', (val) => {
    if (val != null && val != '') {
        return Math.abs(val);
    }
})
Vue.filter('interception', (val) => {
    if (val != null && val != '') {
        if(String(val).indexOf('-')!=-1){
            var newDate = new Date(val.replace(/-/g, "/"));
        }else{
            var newDate = new Date(val);
        }
        let year = newDate.getFullYear(),
            month = (newDate.getMonth()+1)>=10 ? (newDate.getMonth()+1) : '0'+(newDate.getMonth()+1),
            date  =newDate.getDate()>=10 ? newDate.getDate() : '0'+newDate.getDate();
        return year+"."+month+"."+date;
    }
})
Vue.filter('typeFormate', (val) => {
    if (val != null && val != '') {
        if(val == 'insurance'){
            val = '保险';
        }else if(val == 'airportVip'){
            val = '贵宾室';
        }else if(val == 'transfer'){
            val = '接送机';
        }else if(val == 'invincible'){
            val = '票面总金额';
        }
        return val;
    }
})

Vue.filter('kangLvInsuranceNameFilter', (val) => {
    switch (+val) {
        case 0:
            val = '一';
            break;
        case 1:
            val = '二';
            break;
        case 2:
            val = '三';
            break;
        case 3:
            val = '四';
            break;
        case 4:
            val = '五';
            break;
        case 5:
            val = '六';
            break;
        case 6:
            val = '七';
            break;
        case 7:
            val = '八';
            break;
        case 8:
            val = '九';
            break;
        case 9:
            val = '十';
            break;
    }
    return val;
})
