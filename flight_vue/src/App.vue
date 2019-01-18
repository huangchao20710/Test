<template>
	<div id="down">
		<transition name="slide-in">
      <keep-alive>
          <router-view></router-view>
      </keep-alive>
    </transition>
    <loading v-show="showLoading" :jumpLoading="jumpLoading"></loading>
    <reload-loadings v-show="reloadLoading"></reload-loadings>
    <!-- <remote-js src="https://api.map.baidu.com/api?v=2.0&ak=VIqafisYEvp6E0j0j0DeWkny"></remote-js> -->
  </div>
</template>
    
<script>
  import loading from './components/common/loading-component'
  import reloadLoadings from './components/common/reload-loading'
  import { getBookingSource,setStore,getStore,addZero,isClient,animate,monthFormat,weekFormat,getNoticeSource } from './config/mUtils.js'
  import { lQuery } from './plugins/lQuery' 
  import { getTDK } from './service/getData' 
  import { mapActions,mapState } from 'vuex'
	export default {
    data() {
      return {
        showLoading: false,
        jumpLoading: false,
        reloadLoading: false,
        baseUrlPath: 'flight'//home里面标签跳转要改，mUtils.js里面有一个要改,lowPrice标签,orderForm标签,router里面也有,specialCityList
      }
    },
  	components:{
        loading,reloadLoadings
    },
    created(){
      const Calender = {
            dateInfo: {},
            todayInfo: null, //今日信息
            tomorrowInfo: null,//明日信息
            someMonthsInfo: null, //就近几个月的信息
            monthAmount: 6, //几个月的信息
            validDayNum: 180, //有效天数
            holidayList: [ //节日暂不全
                {
                    "holidaydate": "2019-01-01",
                    "holidayname": "元旦"
                }, {
                    "holidaydate": "2019-01-13",
                    "holidayname": "腊八节"
                }, {
                    "holidaydate": "2019-02-04",
                    "holidayname": "除夕"
                }, {
                    "holidaydate": "2019-02-05",
                    "holidayname": "春节"
                }, {
                    "holidaydate": "2019-02-14",
                    "holidayname": "情人节"
                }, {
                    "holidaydate": "2019-02-19",
                    "holidayname": "元宵节"
                }, {
                    "holidaydate": "2019-03-08",
                    "holidayname": "妇女节"
                }, {
                    "holidaydate": "2019-03-12",
                    "holidayname": "植树节"
                }, {
                    "holidaydate": "2019-04-01",
                    "holidayname": "愚人节"
                }, {
                    "holidaydate": "2019-04-05",
                    "holidayname": "清明节"
                }, {
                    "holidaydate": "2019-05-01",
                    "holidayname": "劳动节"
                }, {
                    "holidaydate": "2019-05-04",
                    "holidayname": "青年节"
                }, {
                    "holidaydate": "2019-05-12",
                    "holidayname": "母亲节"
                }, {
                    "holidaydate": "2019-06-01",
                    "holidayname": "儿童节"
                }, {
                    "holidaydate": "2019-06-07",
                    "holidayname": "端午节"
                }, {
                    "holidaydate": "2019-06-16",
                    "holidayname": "父亲节"
                }, {
                    "holidaydate": "2019-07-01",
                    "holidayname": "建党节"
                }, {
                    "holidaydate": "2019-08-01",
                    "holidayname": "建军节"
                }, {
                    "holidaydate": "2019-08-07",
                    "holidayname": "七夕节"
                }, {
                    "holidaydate": "2019-08-25",
                    "holidayname": "中元节"
                }, {
                    "holidaydate": "2019-09-10",
                    "holidayname": "教师节"
                }, {
                    "holidaydate": "2019-09-13",
                    "holidayname": "中秋节"
                }, {
                    "holidaydate": "2019-10-01",
                    "holidayname": "国庆节"
                }, {
                    "holidaydate": "2019-10-07",
                    "holidayname": "重阳节"
                }
            ],
            xiuday : [
                //国假休息时间暂不准确
                {
                "holidaydate": ["2018", "12", "30"]
                },
                {
                "holidaydate": ["2018", "12", "31"]
                },
                {
                "holidaydate": ["2019", "1", "1"]
                },
                {
                "holidaydate": ["2019", "2", "4"]
                },
                {
                "holidaydate": ["2019", "2", "5"]
                },
                {
                "holidaydate": ["2019", "2", "6"]
                },
                {
                "holidaydate": ["2019", "2", "7"]
                },
                {
                "holidaydate": ["2019", "2", "8"]
                },
                {
                "holidaydate": ["2019", "2", "9"]
                },
                {
                "holidaydate": ["2019", "2", "10"]
                },
                {
                "holidaydate": ["2019", "4", "5"]
                },
                {
                "holidaydate": ["2019", "4", "6"]
                },
                {
                "holidaydate": ["2019", "4", "7"]
                },
                {
                "holidaydate": ["2019", "5", "1"]
                },
                {
                "holidaydate": ["2019", "6", "7"]
                },
                {
                "holidaydate": ["2019", "6", "8"]
                },
                {
                "holidaydate": ["2019", "6", "9"]
                },
                {
                "holidaydate": ["2019", "9", "13"]
                },
                {
                "holidaydate": ["2019", "9", "14"]
                },
                {
                "holidaydate": ["2019", "9", "15"]
                },
                {
                "holidaydate": ["2019", "10", "1"]
                },
                {
                "holidaydate": ["2019", "10", "2"]
                },
                {
                "holidaydate": ["2019", "10", "3"]
                },
                {
                "holidaydate": ["2019", "10", "4"]
                },
                {
                "holidaydate": ["2019", "10", "5"]
                },
                {
                "holidaydate": ["2019", "10", "6"]
                },
                {
                "holidaydate": ["2019", "10", "7"]
                }
            ],
            banday: [
                {
                "bandate": ["2018", "12", "29"]
                },
                {
                "bandate": ["2019", "2", "2"]
                },
                {
                "bandate": ["2019", "2", "3"]
                },
                {
                "bandate": ["2019", "9", "29"]
                },
                {
                "bandate": ["2019", "10", "12"]
                }
            ],
            //星期格式化
            weekFormat(val) {
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
            },

            //判断二月天数
            judgeFebruary(year) {
                let isLeapYear = (year % 4 === 0) && ((year % 100 !== 0) || (year % 400 === 0)) ? true : false;
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
                    return this.judgeFebruary(this.todayInfo.year);
                }
            },
            //判断超过12月的情况
            judgeMonth(month) {
                if (month > 12) {
                    return month - 12;
                } else {
                    return month;
                }
            },
            //获取当天日期信息
            getTodayInfo() {
                const nowDate = new Date();
                // nowDate.setDate(nowDate.getDate() + 30)
                let year = nowDate.getFullYear();
                let month = nowDate.getMonth() + 1;
                let date = nowDate.getDate();
                let day = nowDate.getDay();
                let obj = {
                    year: year,
                    month: month,
                    date: date,
                    day: day
                }
                this.todayInfo = obj;
                // console.log(this.todayInfo);
            },
            //获取当天日期信息
            getTomorrowInfo() {
                const nowDate = new Date();
                nowDate.setDate(nowDate.getDate() + 1)
                let year = nowDate.getFullYear();
                let month = nowDate.getMonth() + 1;
                let date = nowDate.getDate();
                let day = nowDate.getDay();
                let obj = {
                    year: year,
                    month: month,
                    date: date,
                    day: day
                }
                this.tomorrowInfo = obj;
            },
            //根据前一个月算出后一个月的空位个数
            countNull(prevMonthDays, prevMonth, nextMonth, nextMonthDays) {
                let findNull = (obj, num) => {
                    for (let i = 0; i < obj.length; i++) {
                        if (obj[i].number == num) {
                            return i;
                        }
                    }
                }
                let num1 = findNull(prevMonthDays, 1); //上个月前面的空值
                let num2 = this.judgeMonthDays(prevMonth) + num1 - 1; //上月月末所在的位置
                let lines = 5;
                if ((num1 > 5 && this.judgeMonthDays(nextMonth) == 31) || (num1 > 6 && this.judgeMonthDays(nextMonth) == 30)) {
                    lines = 6;
                }
                let a = lines * 7 - 1 - num2;
                let b = 7 - a;
                if (b >= 7) {
                    b = b % 7;
                }
                for (let i = 0; i < b; i++) {
                    let obj = {
                        number: ' ',
                        week: null,
                        able: false,
                        holiday: null,
                        xiu: null,
                        selected: false
                    };
                    nextMonthDays.unshift(obj);
                }
                let all;
                if (nextMonthDays.length < 36) {
                    all = 35;
                } else {
                    all = 42;
                }
                let num3 = all - nextMonthDays.length;
                for (let i = 0; i < num3; i++) {
                    let obj = {
                        number: ' ',
                        week: null,
                        able: false,
                        holiday: null,
                        xiu: null,
                        selected: false
                    };
                    nextMonthDays.push(obj);
                }
            },
            //获取就近的几个月信息
            getMonthsInfo() {
                var endDate = new Date(new Date().getTime() + (this.validDayNum - 1) * 24 * 60 * 60 * 1000); //60天
                var endTime = {
                    year: endDate.getFullYear(),
                    month: endDate.getMonth() + 1,
                    date: endDate.getDate()
                };
                let someMonths = [];
                for (let i = 0; i < this.monthAmount; i++) {
                    let month = this.todayInfo.month + i;
                    let year = this.todayInfo.year;
                    if (month > 12) {
                        year = this.todayInfo.year + 1;
                    }
                    let obj = {
                        year: year,
                        month: this.judgeMonth(month),
                        days: null
                    }
                    someMonths.push(obj);
                };
                
                let days = [];
                for (let i = 0; i < someMonths.length; i++) {
                    let monthDays = [];
                    for (let j = 0; j < Number(this.judgeMonthDays(someMonths[i].month)); j++) {
                        let obj;
                        if ((someMonths[i].year > endTime.year) || (someMonths[i].year == endTime.year && someMonths[i].month > endTime.month) || (someMonths[i].year == this.todayInfo.year && someMonths[i].month == this.todayInfo.month && j + 1 < this.todayInfo.date) || (someMonths[i].year == endTime.year && someMonths[i].month >= endTime.month && j + 1 > endTime.date)) {
                            obj = {
                                number: j + 1,
                                week: null,
                                able: false,
                                holiday: null,
                                xiu: null,
                                selected: false
                            };
                        } else {
                            if (this.tomorrowInfo.year == someMonths[i].year && someMonths[i].month == this.tomorrowInfo.month && j + 1 == this.tomorrowInfo.date) {
                                obj = {
                                    number: j + 1,
                                    week: null,
                                    able: true,
                                    holiday: null,
                                    xiu: false,
                                    selected: true
                                };
                            } else {
                                obj = {
                                    number: j + 1,
                                    week: null,
                                    able: true,
                                    holiday: null,
                                    xiu: false,
                                    selected: false
                                };
                            }
                        }
                        monthDays.push(obj);
                    }
                    someMonths[i].days = monthDays;
                }
                //算出当月1号的位置
                let num = 7 - (Number(this.todayInfo.date) + 6 - Number(this.todayInfo.day)) % 7;
                if (num > 6) {
                    num = num % 7;

                }
                //在当月1号之前插入空值
                for (let i = 0; i < num; i++) {
                    let obj = {
                        number: ' ',
                        week: null,
                        able: false,
                        holiday: null,
                        xiu: null,
                        selected: false
                    };
                    someMonths[0].days.unshift(obj);
                }
                //判断当月占多少行
                let lines = 5;
                let no1;
                for (let i = 0; i < someMonths[0].days.length; i++) {
                    if (someMonths[0].days[i].number == 1) {
                        no1 = i;
                    }
                }
                if ((no1 > 5 && this.judgeMonthDays(someMonths[0].month) == 31) || (no1 > 6 && this.judgeMonthDays(someMonths[0].month) == 30)) {
                    lines = 6;
                }
                //当月后面的空值，在其后补上空值
                let num1 = lines * 7 - someMonths[0].days.length;
                for (let i = 0; i < num1; i++) {
                    let obj = {
                        number: ' ',
                        week: null,
                        able: false,
                        holiday: null,
                        xiu: null,
                        selected: false
                    };
                    someMonths[0].days.push(obj);
                }
                for (let i = 0; i < this.monthAmount - 1; i++) {
                    this.countNull(someMonths[i].days, someMonths[i].month, someMonths[i + 1].month, someMonths[i + 1].days)
                }
                this.someMonthsInfo = someMonths;
            },
            //转换今天明天后天
            turnDay() {
                for (let i = 0; i < this.someMonthsInfo[0].days.length; i++) {
                    if (this.someMonthsInfo[0].days[i].number == this.todayInfo.date) {
                        this.someMonthsInfo[0].days[i].holiday = '今天';
                    }
                }
            },
            //week转化
            turnWeek() {
                for (let i = 0; i < this.someMonthsInfo.length; i++) {
                    for (let j = 0; j < this.someMonthsInfo[i].days.length; j++) {
                        if (this.someMonthsInfo[i].days[j].number != ' ') {
                            this.someMonthsInfo[i].days[j].week = this.weekFormat(j % 7);
                        }
                    }
                }
            },
            //节假日替换
            turnHoliday() {
                for (let j = 0; j < this.holidayList.length; j++) {
                    let arr = this.holidayList[j].holidaydate.split('-');
                    let year = arr[0];
                    let month = arr[1];
                    if (month < 10) {
                        month = month.substr(-1);
                    }
                    let date = arr[2];
                    if (date < 10) {
                        date = date.substr(-1);
                    }
                    for (let i = 0; i < this.someMonthsInfo.length; i++) {
                        if (this.someMonthsInfo[i].year == year && this.someMonthsInfo[i].month == month) {
                            for (let a = 0; a < this.someMonthsInfo[i].days.length; a++) {
                                if (this.someMonthsInfo[i].days[a].number == date) {
                                    // this.someMonthsInfo[i].days[a].holiday = this.holidayList[j].holidayname;
                                    this.someMonthsInfo[i].days[a].holidayname = this.holidayList[j].holidayname;
                                }
                            }
                        }
                    }
                }
            },
            //休息日标记
            markXiu() {
                for (let i = 0; i < this.xiuday.length; i++) {
                    let arr = this.xiuday[i].holidaydate;
                    let year = arr[0];
                    let month = arr[1];
                    let date = arr[2];
                    for (let j = 0; j < this.someMonthsInfo.length; j++) {
                        if (this.someMonthsInfo[j].year == year) {
                            if (this.someMonthsInfo[j].month == month) {
                                for (let a = 0; a < this.someMonthsInfo[j].days.length; a++) {
                                    if (this.someMonthsInfo[j].days[a].number == date) {
                                        this.someMonthsInfo[j].days[a].xiu = true;
                                    }
                                }
                            }
                        }
                    }
                }
            },
            //上班日标记
            markBan() {
                for (let i = 0; i < this.banday.length; i++) {
                    let arr = this.banday[i].bandate;
                    let year = arr[0];
                    let month = arr[1];
                    let date = arr[2];
                    for (let j = 0; j < this.someMonthsInfo.length; j++) {
                        if (this.someMonthsInfo[j].year == year) {
                            if (this.someMonthsInfo[j].month == month) {
                                for (let a = 0; a < this.someMonthsInfo[j].days.length; a++) {
                                    if (this.someMonthsInfo[j].days[a].number == date) {
                                        this.someMonthsInfo[j].days[a].ban = true;
                                    }
                                }
                            }
                        }
                    }
                }
            },
            //初始化
            init() {
                this.getTodayInfo();
                this.getTomorrowInfo();
                this.getMonthsInfo();
                this.turnDay();
                this.turnWeek();
                this.turnHoliday();
                this.markXiu();
                this.markBan();
            }
        };
        Calender.init();
        let allMonthObj = {
            key: 'allMonthInfos',
            val: Calender.someMonthsInfo
        };
        try {
            this.initData(allMonthObj);
        } catch (error) {
            
        }
        let ninetyDaysStamp = new Date().getTime()+90*24*60*60*1000,
            ninetyDaysMonth = new Date(ninetyDaysStamp).getMonth()+1,
            ninetyDaysDate = new Date(ninetyDaysStamp).getDate();
        let tempMapMonth = [],
            monthData = [];
        for (let i = 0; i < Calender.someMonthsInfo.length; i++) {
            if (Calender.someMonthsInfo[i].month == ninetyDaysMonth) {
                monthData = Calender.someMonthsInfo.slice(0,i+1);
            }
        }
        for (let i = 0; i < monthData.length; i++) {
            let tempObj = {};
            tempObj.monthName = monthFormat(monthData[i].month);
            tempObj.picked = false;
            let ableArr = [];
            for (let j = 0; j < monthData[i].days.length; j++) {
                if (i == monthData.length-1) {
                    if (monthData[i].days[j].number <= ninetyDaysDate && monthData[i].days[j].able) {
                        ableArr.push(`${monthData[i].year}-${addZero(monthData[i].month)}-${addZero(monthData[i].days[j].number)}`); 
                    }
                } else {
                    if (monthData[i].days[j].able) {
                        ableArr.push(`${monthData[i].year}-${addZero(monthData[i].month)}-${addZero(monthData[i].days[j].number)}`); 
                    }
                }
                if (i == 0) {
                    tempObj.start = ableArr[1];
                } else {
                    tempObj.start = ableArr[0];
                }
                tempObj.end = ableArr[ableArr.length-1];
            }
            tempMapMonth.push(tempObj);
        };
        let ignoreMonth = {
            monthName: '不限',
            picked: true,
            start: tempMapMonth[0].start,
            end: tempMapMonth[monthData.length-1].end
        };
        this.unlimitedMonth = ignoreMonth;
        tempMapMonth.unshift(ignoreMonth);
        let monthObj = {
            key: 'flightMapMonth',
            val: tempMapMonth
        };
        try {
            this.initData(monthObj);
        } catch (error) {
            
        }
        //将当前时间的时间戳存至store里面
        let nowDateStamp = new Date().getTime();
        let nowTimeStampObj = {
            key: 'nowDateStamp',
            val: nowDateStamp
        };
        try {
            this.initData(nowTimeStampObj);
        } catch (error) {
            
        }
        //初始化出发日期，如果有缓存，拿缓存，下面初始化返程时间同理
        // if (this.departDate == '') {
        if (getStore('departDate')) {
            try{
                let sotreDate = JSON.parse(getStore('departDate'));
                let obj = {
                    key: 'departDate',
                    val: ''
                }
                if (+nowDateStamp > +new Date(`${sotreDate.year}/${sotreDate.month}/${sotreDate.date}`).getTime()) {
                    let tomorrow = new Date(+nowDateStamp + 24 * 60 * 60 * 1000);
                    obj.val = {
                        year: tomorrow.getFullYear(),
                        month: tomorrow.getMonth() + 1,
                        date: tomorrow.getDate(),
                        day: weekFormat(tomorrow.getDay())
                    }
                    console.log(obj.val)
                } else {
                    obj.val = sotreDate;
                }
                try {
                    this.initData(obj);
                } catch (error) {
                    
                }
            }catch(e){
                let tomorrow = new Date(+nowDateStamp + 24 * 60 * 60 * 1000);
                let tomorrowObj = {
                    year: tomorrow.getFullYear(),
                    month: tomorrow.getMonth() + 1,
                    date: tomorrow.getDate(),
                    day: weekFormat(tomorrow.getDay())
                }
                let obj = {
                    key: 'departDate',
                    val: tomorrowObj
                }
                try {
                    this.initData(obj);
                } catch (error) {
                    
                }
            }
        } else {
            let tomorrow = new Date(+nowDateStamp + 24 * 60 * 60 * 1000);
            let tomorrowObj = {
                year: tomorrow.getFullYear(),
                month: tomorrow.getMonth() + 1,
                date: tomorrow.getDate(),
                day: weekFormat(tomorrow.getDay())
            }
            let obj = {
                key: 'departDate',
                val: tomorrowObj
            }
            try {
                this.initData(obj);
            } catch (error) {
                
            }
        };
      // };
      // if (this.backDate == '') {
        this.reloadLoading=false;
        if (getStore('backDate')) {
            try{
                let departDate = JSON.parse(getStore('departDate')),
                    backDate = JSON.parse(getStore('backDate'));
                let departDateStamp = new Date(`${departDate.year}/${departDate.month}/${departDate.date}`).getTime(),
                    backDateStamp = new Date(`${backDate.year}/${backDate.month}/${backDate.date}`).getTime();
                if (backDateStamp < departDateStamp) {
                    let turnBack = new Date(+departDateStamp + 3 * 24 * 60 * 60 * 1000);
                    let backObj = {
                        year: turnBack.getFullYear(),
                        month: turnBack.getMonth() + 1,
                        date: turnBack.getDate(),
                        day: weekFormat(turnBack.getDay())
                    }
                    let obj = {
                        key: 'backDate',
                        val: backObj
                    }
                    try {
                        this.initData(obj);
                    } catch (error) {
                        
                    }
                } else {
                    let obj = {
                        key: 'backDate',
                        val: JSON.parse(getStore('backDate'))
                    }
                    try {
                        this.initData(obj);
                    } catch (error) {
                        
                    }
                }
            }catch(e){
                let turnBack = new Date(+nowDateStamp + 3 * 24 * 60 * 60 * 1000);
                let backObj = {
                    year: turnBack.getFullYear(),
                    month: turnBack.getMonth() + 1,
                    date: turnBack.getDate(),
                    day: weekFormat(turnBack.getDay())
                }
                let obj = {
                    key: 'backDate',
                    val: backObj
                }
                try {
                    this.initData(obj);
                } catch (error) {
                    
                }
            }
        } else {
            let turnBack = new Date(+nowDateStamp + 3 * 24 * 60 * 60 * 1000);
            let backObj = {
                year: turnBack.getFullYear(),
                month: turnBack.getMonth() + 1,
                date: turnBack.getDate(),
                day: weekFormat(turnBack.getDay())
            }
            let obj = {
                key: 'backDate',
                val: backObj
            }
            try {
                this.initData(obj);
            } catch (error) {
                
            }
        }
      // };
        try{
            NativeUtil.lvCommon("lvJSHideNativeNavigationBar");
            NativeUtil.lvCommon("lvJSSetPanGesture",{"banPanGesture":"1"});
        }catch(e){}
        this.$nextTick(() => {
            this.showTDK();
        });
        if(this.$route.path.indexOf('activities') != -1){
            lQuery('#Title').html('驴妈妈火车票');
        }
        let that=this;
        window.onerror = function(msg, url, line, col, error) {
            //没有URL不上报！上报也不知道错误
            // alert(msg+"...."+url);
            if(msg!=null && msg.indexOf("SyntaxError: Unexpected token")!=-1){
                that.reloadLoading=true;
                setTimeout(function(){
                    that.reloadLoading=false;
                    if(isClient()==1){
                        NativeUtil.lvCommon("lvJSRefreshWebView");
                    }else{
                        window.location.reload();
                    }
                },1000);
            }
        }
    },
    methods: {
      ...mapActions([
          'initData',//初始化时间
      ]),
      showTDK(){
        /***************tdk**************/
        let curPath = this.$route.path;
        let reg1 = /\/.{3}-.{3}/;
        let reg2 = /destine/;
        let key = null;
        if(curPath == '/flight/home'){
            key =   'waptdk_flight_index';
        }
        if(reg1.test(curPath)){
            key = 'waptdk_flight_line';
        }
        if(reg2.test(curPath)){
            key = 'waptdk_flight_line_air';
        }
        if (key != null) {
            if(key=='waptdk_flight_index' && `${this.departDate.year}-${this.departDate.month}-${this.departDate.date}` ==`${new Date().getFullYear()}-${new Date().getMonth()+1}-${addZero(new Date().getDate())}` && getStore("tdkindex")!=null){
                let resindex=JSON.parse(getStore('tdkindex'));
                if(resindex.title && resindex.description && resindex.keywords) {
                    lQuery('#Title').html(resindex.title);
                    lQuery('#Description')[0].setAttribute('content', resindex.description);
                    lQuery('#Keywords')[0].setAttribute('content', resindex.keywords);
                }
            }else{
              getTDK(key).then((data) => {
                let res = data.data,
                    fromStr = this.departureCity.name,
                    destStr = this.arrivalCity.name;
                if(res==null){
                    return;
                }
                if(res.key=='waptdk_flight_index'){
                    setStore('tdkindex',JSON.stringify(res));
                }
                if(res.title && res.description && res.keywords) {
                    lQuery('#Title').html(res.title.replace(new RegExp(/{from}/g),fromStr).replace(new RegExp(/{dest}/g),destStr));
                    lQuery('#Description')[0].setAttribute('content', res.description.replace(new RegExp(/{from}/g),fromStr).replace(new RegExp(/{dest}/g),destStr));
                    lQuery('#Keywords')[0].setAttribute('content', res.keywords.replace(new RegExp(/{from}/g),fromStr).replace(new RegExp(/{dest}/g),destStr));
                }
              },(err) => {
                console.log(err)
              });
            }
        }
      }
    },
    mounted() {
      if (getNoticeSource() == 'IOS') {
        if((screen.width==375 && screen.height==812)||(screen.width==414 && screen.height==896)){
            document.getElementById('app').style.paddingTop = '44px';
            document.getElementById('app').style.paddingBottom = '34px';
        }else{
            document.getElementById('app').style.paddingTop = '20px';
        }
        document.getElementById('app').style.boxSizing = 'border-box';
      }
      try{
            NativeUtil.lvCommon("lvJSGetRequestWeiba",function(data){
                // let date=JSON.stringify(data);
                let json = (new Function("return " + data))();
                let equipmentNo=json.returnValue.udid;
                if(equipmentNo==undefined){
                    setStore("equipmentNo","");
                }else{
                    setStore("equipmentNo",equipmentNo.replace(/\"/g,''));
                }
            });
          if(getNoticeSource() == 'IOS'||getNoticeSource() == 'Android'){
                let nua=navigator.userAgent,lvves=0;
                if(getBookingSource()=="LVMAMA_IOS"){
                    lvves=nua.substring(nua.indexOf("LVMM/")+5,nua.length);
                }else if(getBookingSource()=="LVMAMA_ANDROID"){
                    lvves=nua.substring(nua.indexOf("LVMM/")+5,nua.lastIndexOf("(")-1);
                }
                if(lvves!=null && lvves.replace(/\s/g,'').replace(/\./g,'')>=798){
                    NativeUtil.lvCommon("lvJSGetCPSID",function(data){
                        let json = (new Function("return " + data))();
                        // let dat=JSON.stringify(data);
                        let cps=json.returnValue.cpsId;
                        setStore("APPcpsId",cps.replace(/\"/g,''));
                    });
                }
            }

        }catch(e){
        }
    },
    computed:{
      ...mapState([
        'departDate',
        'departureCity',
        'arrivalCity',
        'nowDateStamp'
      ])
    },
    watch: {
      $route(newVal,oldVal) {
        if (newVal != oldVal) {
          this.showTDK();
          this.$nextTick(() => {
            let loadArr = document.querySelectorAll('.loadingSource');
            for (let i = 0; i < loadArr.length; i++) {
              loadArr[i].style.display = 'block';
              loadArr[i].style.left = '-100%';
              animate(loadArr[i],{'left': '0'},Math.floor(Math.random()*500+500),'ease-out',() => {
                loadArr[i].style.display = 'none';
              });
            }
          })
        }
      },
      departureCity(newVal,oldVal) {
        if (newVal.code.length > 3) {
            let obj = {
                key: 'departureCity',
                val: {
                    airportCityCode:"SHA",
                    code:"SHA",
                    firstLetter:"s",
                    hot:1,
                    id:7341,
                    jianPin:"SH",
                    name:"上海",
                    pinYin:"shanghai"
                }
            }
            try {
                this.initData(obj);
            } catch (error) {
                
            }
        }
      },
      arrivalCity(newVal,oldVal) {
        if (newVal.code.length > 3) {
            let obj = {
                key: 'arrivalCity',
                val: {
                    airportCityCode:"PEK",
                    code:"PEK",
                    firstLetter:"b",
                    hot:2,
                    id:7578,
                    jianPin:"BJ",
                    name:"北京",
                    pinYin:"beijing"
                }
            }
            try {
                this.initData(obj);
            } catch (error) {
                
            }
        }
      },
    }
}

</script>

<style lang="scss">
  	@import './style/common';
    .slide-in-enter-active {
        animation: popInRight 0.3s both;
    }

    @-webkit-keyframes popInRight {
        from {
            -webkit-transform: translate3d(100%, 0, 0);
            transform: translate3d(100%, 0, 0);
        }
        to {
            -webkit-transform: translate3d(0, 0, 0);
            transform: translate3d(0, 0, 0);
        }
    }
</style>
