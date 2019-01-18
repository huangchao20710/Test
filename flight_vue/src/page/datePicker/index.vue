<template>
    <div class="date_picker_container">
        <div class="date_picker_header_container xy_flex">
         <div class="search_back_container xy_flex" @click="goBack">
          <div class="back"></div>
        </div>
        <div>{{dateTitle}}</div>
      </div>
     <div class="trip_date_kind_container y_flex" v-if="isDouble && $route.params.from != 'flightList'"> <!-- &&$route.params.from != 'addRemind' -->
          <div class="trip_date_kind_item xy_flex" @click="toggleTripKind()">
            <div :class="showDepartDate != '' ? 'active' : ''">
              <div class="trip_date_kind_title x_flex" v-if="!showLowPrice">去程日期</div>
              <div class="trip_date_kind_title x_flex" v-if="showLowPrice">最早出发</div>
              <div>{{showDepartDate}}</div>
            </div>
          </div>
          <div class="trip_date_kind_item xy_flex">
            <div :class="showBackDate != '' ? 'active' : ''">
              <div class="trip_date_kind_title x_flex" v-if="!showLowPrice">返程日期</div>
              <div class="trip_date_kind_title x_flex" v-if="showLowPrice">最晚出发</div>
              <div>{{showBackDate}}</div>
            </div>
          </div>
          <div class="active_line"></div>
      </div>
     <div class="date_picker_body_container" :class="isDouble && $route.params.from != 'flightList' ? '' : 'date_picker_body_container_not_double'"> <!-- &&$route.params.from != 'addRemind' ? '' : 'date_picker_body_container_not_double' -->
          <div class="weeek_container">
            <ul class="y_flex">
              <li class="xy_flex">日</li>
              <li class="xy_flex">一</li>
              <li class="xy_flex">二</li>
              <li class="xy_flex">三</li>
              <li class="xy_flex">四</li>
              <li class="xy_flex">五</li>
              <li class="xy_flex">六</li>
            </ul>
          </div>
          <div class="month_location_container xy_flex">
            {{monthLoactionTitle}}
          </div>
          <div class="date_container">
            <ul v-for="(month,index) in allDate" class="big_container clearfix">
              <div class="month_title xy_flex" v-if="index > 0">{{month.year}}年{{month.month}}月</div>
              <li class="date_item left" :class="date.selected ? 'date_selected': ''" v-for="date in month.days" @click="chooseDate(month.year,month.month,date)">
                <span class="rest_icon" :class="{'hxiu':date.able!=true}" v-if="date.xiu&&!date.selected&&date.holidayname==null"></span>
                <span class="rest_icon ban_icon" :class="{'hban':date.able!=true}" v-if="date.ban&&!date.selected&&date.holidayname==null"></span>
                <i class="rest_day" :class="[date.able? '': 'ccc',date.selected ? 'fff': '']">{{date.holidayname}}</i>
                <div class="item_content">
                  <p class="xy_flex" v-if="date.holiday === null" :class="[date.able? '': 'ccc',date.selected ? 'date_selected': '']">{{date.number}}</p>
                  <p class="xy_flex f12" v-else :class="[date.able? '': 'ccc',date.selected ? 'date_selected': '']">{{date.holiday}}</p>
                  <p class="price_container" v-show="date.able && date.todayPrice > 0 && !showLowPrice" :class="{'lowest_price': date.lowestPrice,'date_selected': date.selected}">¥{{date.todayPrice}}起</p>
                </div>  
              </li>
            </ul>
          </div>
          <div class="tip_container y_flex" v-if="!showLowPrice">
              <div class="y_flex">
                  <span></span>因最低价实时变化，请以实际价格为准
              </div>
          </div>
      </div>
    </div>
</template>

<script>
import { lQuery } from '../../plugins/lQuery'

import { mapActions,mapState } from 'vuex'
import { getFlightDaysPrice } from '../../service/getData'
import { getStore,setStore,removeStore,addZero,weekFormat,formatIOSDate } from '../../config/mUtils'

export default {
    data() {
      return {
        allDate: [],
        monthLoactionTitle: '',
        hasChosenGoDate: false,//是否已经选择出发日期
        showDepartDate: '',//头部展示的出发日期
        showBackDate: '',//头部展示的返程日期
        dateTitle: '出发日期',
        startDate: '',//低价日历开始时间
        endDate: '',//低价日历结束时间
        showLowPrice:false,
      }
    },
    components: {
        

    },
    computed: {
        ...mapState([
            'daysPrice',
            'isDouble',
            'departDate',
            'backDate',
            'allMonthInfos',
            'nowDateStamp',
            'arrivalCity',
            'departureCity',
            'endorseInfo'
        ])
    },
    methods: {
      ...mapActions([
        'initData',
        'saveDaysPrice'
      ]),
      //监听滚动位置
      watchScrollLocation(){
        this.scrollLocation = document.querySelector('.date_container').scrollTop;
        let locatedArr = document.querySelectorAll('.month_title');
        for (let i = 0; i < locatedArr.length; i++) {
          if (this.scrollLocation >= locatedArr[i].offsetTop) {
            this.monthLoactionTitle = locatedArr[i].innerHTML;
          } else if (this.scrollLocation === 0) {
            this.monthLoactionTitle = `${this.allDate[0].year}年${this.allDate[0].month}月`;
          }
        }
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
      //选择日期
      chooseDate(year,month,dateObj) {
        if (!dateObj.able || dateObj.number==" ") {
          return;
        }
        let obj = {
          year: year,
          month: month,
          date: dateObj.number,
          day: dateObj.week
        }
        if (this.$route.params.kind === 'departDate') {
            setStore('departDate',JSON.stringify(obj));
        } else {
            setStore('backDate',JSON.stringify(obj));
            setStore('chooseDay',true);
        }
        if(this.$route.params.from === 'editRemind'){
          setStore('chooseDay',true);
        }
        if (this.$route.params.from === 'addRemind') {
          setStore('selectDay',true);
        }
        let _obj = {
          key: this.$route.params.kind,
          val: obj
        }
        try{
          this.initData(_obj);
        }catch(e){}
        let dateArr = this.allDate;
        for (let i = 0; i < dateArr.length; i++) {
            for (let j = 0; j < dateArr[i].days.length; j++) {
                if (dateArr[i].year === year && dateArr[i].month === month && dateArr[i].days[j].number === dateObj.number) {
                    dateArr[i].days[j].selected = true;
                } else {
                    dateArr[i].days[j].selected = false;
                }
            };
        };
        
        this.allDate = dateArr;
        if (this.isDouble && this.$route.params.from === 'home' || this.$route.params.from === 'addRemind') {
            if (this.$route.params.kind === 'departDate') {
                this.$router.replace(`/${this.$parent.baseUrlPath}/datePicker/backDate/${this.$route.params.from}`);
                lQuery('.active_line').css('left','50%');
                this.markBkColor();
                this.showDepartDate = `${this.departDate.month}月${this.departDate.date}号`;
                this.hasChosenGoDate = true;
                let obj = {
                  key: 'daysPrice',
                  departureAirportCode: this.arrivalCity.code,
                  arrivalAirportCode: this.departureCity.code,
                  startDate: this.startDate,
                  endDate: this.endDate
                }
                this.saveDaysPrice(obj);
            } else {
                this.showBackDate = `${this.backDate.month}月${this.backDate.date}号`;
                let obj = {
                    key: 'goFlightList',
                    val: true
                }
                try{
                  this.initData(obj);
                }catch(e){}
                setStore("backHome",true);
                this.setIflightDate();
                this.$router.go(-1);
            }
        } else if(this.$route.params.from === 'endorse'){
          this.setIflightDate();
          this.$router.replace(`/${this.$parent.baseUrlPath}/changeFlightList`);
          // this.$router.replace(`/${this.$parent.baseUrlPath}/applyforEndorse`);
        } else {
            let obj = {
                key: 'goFlightList',
                val: true
            }
            try{
              this.initData(obj);
            }catch(e){}
            setStore("backHome",true);
            this.setIflightDate();
            this.$router.go(-1);
        }
      },
      //选择去返程
      toggleTripKind() {
        lQuery('.active_line').css('left','0');
        this.$router.replace(`/${this.$parent.baseUrlPath}/datePicker/departDate/${this.$route.params.from}`);
        this.showDepartDate = '';
        this.showBackDate = '';
        this.markBkColor();
        let obj = {
          key: 'daysPrice',
          departureAirportCode: this.departureCity.code,
          arrivalAirportCode: this.arrivalCity.code,
          startDate: this.startDate,
          endDate: this.endDate
        }
        this.saveDaysPrice(obj);
      },
      //标记选择的日期背景
      markBkColor() {
        let allDate = this.allDate;
        for (let i = 0; i < allDate.length; i++) {
          if (getStore('departDate') && this.$route.params.kind === 'departDate') {
                let departDate = JSON.parse(getStore('departDate'));
                if (+allDate[i].year <= +departDate.year) {
                  for (let a = 0; a < allDate[i].days.length; a++) {
                    if (!allDate[i].days[a].able && (+allDate[i].year == +new Date(this.nowDateStamp).getFullYear() && +allDate[i].days[a].number >= +new Date(this.nowDateStamp).getDate() && +allDate[i].month === +new Date(this.nowDateStamp).getMonth() + 1) || (+allDate[i].year == +new Date(this.nowDateStamp).getFullYear() && +allDate[i].month > +new Date(this.nowDateStamp).getMonth() + 1) || +allDate[i].year > +new Date(this.nowDateStamp).getFullYear()) {
                      this.$set(this.allDate[i].days[a],'able',true);
                    }
                  }
                }
                for (let j = 0; j < allDate[i].days.length; j++) {
                    if (allDate[i].year == departDate.year && allDate[i].month == departDate.month && allDate[i].days[j].number == departDate.date) {
                        allDate[i].days[j].selected = true;
                    } else {
                        allDate[i].days[j].selected = false;
                    }
                };
          } else if (getStore('backDate') && this.$route.params.kind === 'backDate') {
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
                  backDate = backObj;
                  let obj = {
                      key: 'backDate',
                      val: backObj
                  }
                  try{
                    this.initData(obj);
                  }catch(e){}
                  this.showBackDate = `${backDate.month}月${backDate.date}号`;
                }
                if ((+allDate[i].year == +departDate.year && +allDate[i].month <= +departDate.month)) {
                  for (let a = 0; a < allDate[i].days.length; a++) {
                    if ((+allDate[i].days[a].number < +departDate.date || +allDate[i].month < +departDate.month) && allDate[i].days[a].able) {
                      this.$set(this.allDate[i].days[a],'able',false);
                    }
                  }
                } else {
                  if (+allDate[i].year < +departDate.year && +allDate[i].month > +departDate.month) {
                    for (let a = 0; a < allDate[i].days.length; a++) {
                      if (allDate[i].days[a].able) {
                        this.$set(this.allDate[i].days[a],'able',false);
                      }
                    }
                  }
                }
                for (let j = 0; j < allDate[i].days.length; j++) {
                    if (allDate[i].year == backDate.year && allDate[i].month == backDate.month && allDate[i].days[j].number == backDate.date) {
                        allDate[i].days[j].selected = true;
                    } else {
                        allDate[i].days[j].selected = false;
                    }
                };
          }
        }
        this.allDate = allDate;
      },
      //返回
      goBack(){
        let obj = {
            key: 'goFlightList',
            val: true
        }
        try{
          this.initData(obj);
        }catch(e){}
        setStore("backHome",true);
        if(getStore("haveDate") == true || getStore("haveDate") == "true"){
           removeStore("selectDay");//清空勾选日期的标记
        }
        this.$router.go(-1);
      },
      markPrice() {
        let allDailyPrice = this.daysPrice.dailPrices||[];
        let allDate = JSON.parse(JSON.stringify(this.allDate));
        for (let i = 0; i < allDate.length; i++) {
          let tempArr = [];
          for (let a = 0; a < allDailyPrice.length; a++) {
            if (allDailyPrice[a].deptDate.substring(0,4) == allDate[i].year && allDailyPrice[a].deptDate.substring(5,7) == addZero(allDate[i].month)) {
              tempArr.push(allDailyPrice[a])
            }
          }
          for (let b = 0; b < allDate[i].days.length; b++) {
            allDate[i].days[b].todayPrice="";
          }
          for (let j = 0; j < tempArr.length; j++) {
              let minPrice = tempArr[0].parPrice;
              for (let b = 0; b < allDate[i].days.length; b++) {
                
                if (tempArr[j].deptDate.substring(8,10) == allDate[i].days[b].number) {
                  allDate[i].days[b].todayPrice = Number(tempArr[j].parPrice);
                  if (+tempArr[j].parPrice <= +minPrice) {
                    minPrice = +tempArr[j].parPrice;
                    allDate[i].days[b].lowestPrice = true;
                  }else{
                    allDate[i].days[b].lowestPrice = false;
                  }
                }
              }
          }
        }
        this.allDate = allDate;
        let allMonthObj = {
            key: 'allMonthInfos',
            val: allDate
        };
        try{
          this.initData(allMonthObj);
        }catch(e){}
      }
    },
    created(){
      let that = this;
      
      this.allDate = this.allMonthInfos;
      this.monthLoactionTitle = `${this.allDate[0].year}年${this.allDate[0].month}月`;
      // this.markPrice();
      this.markBkColor();
    },
    mounted() {
      
      
    },
    activated() {
      //判断低价提醒进来 不显示低价日历
      if (this.$route.params.from === 'addRemind' || this.$route.params.from === 'editRemind'||this.$route.params.from === 'endorse'||this.$route.params.from === 'changeFlightList') {
         this.showLowPrice = true;
      }else{
        this.showLowPrice = false;
      }
      this.dateTitle="出发日期";
      if(this.$route.params.from === 'endorse'||this.$route.params.from === 'changeFlightList'){
        this.dateTitle="改签日期";
      }
      this.markBkColor();
      this.monthLoactionTitle = `${this.allDate[0].year}年${this.allDate[0].month}月`;
      let startTimeStamp = +this.nowDateStamp+24*60*60*1000,
            startTime = new Date(startTimeStamp),
            startYear = startTime.getFullYear(),//获取当前年份
            startMonth = startTime.getMonth()+1,//获取当前月份
            startDate = startTime.getDate(),//获取当前日期
            start = `${startYear}-${startMonth}-${startDate}`,
            endTimeStamp = +this.nowDateStamp+90*24*60*60*1000,
            endTime = new Date(endTimeStamp),
            endYear = endTime.getFullYear(),
            endMonth = endTime.getMonth()+1,
            endDate = endTime.getDate(),
            end = `${endYear}-${endMonth}-${endDate}`;//90天以后的日期
      this.startDate = start;
      this.endDate = end;
      // console.log(`${this.departureCity.code}:${this.arrivalCity.code}:${this.startDate}:${this.endDate}`);
      let obj = {
        key: 'daysPrice',
        departureAirportCode: this.departureCity.code,
        arrivalAirportCode: this.arrivalCity.code,
        startDate: start,
        endDate: end
      }
      if (this.$route.params.from != 'endorse' ||this.$route.params.from != 'changeFlightList'){
        this.saveDaysPrice(obj);
      }
        this.markBkColor();
        if (this.isDouble) {
            if (this.$route.params.kind === 'departDate') {
                lQuery('.active_line').css('left','0');
                this.dateTitle = '出发日期';
            } else {
              lQuery('.active_line').css('left','50%');
              this.showDepartDate = `${this.departDate.month}月${this.departDate.date}号`;
              if (this.$route.params.from =='addRemind') {
                 this.dateTitle = '出发日期';
              }else{
                this.dateTitle = '返回日期';
              }
            }
        }
        this.$nextTick(()=>{
        // 这里面获取实时
          setTimeout(() => {
            this.markPrice();
          },300);
            document.querySelector('.date_container').addEventListener('scroll',this.watchScrollLocation)
            
          })
    },
    watch: {
      daysPrice(newVal,oldVal) {
        if (newVal != oldVal) {
          this.markPrice();
        }
      }
    }
}

</script>

<style  lang="scss" scoped>
     @import '../../style/mixin';
    .date_picker_container {
      @include wh(100%,100%);
      padding-top: .9rem;
      box-sizing: border-box;
      position: relative;
      .date_picker_header_container {
        width: 100%;
        height: .9rem;
        box-sizing: border-box;
        position: absolute;
        top: 0;
        left: 0;
        background: #fff;
        font-size: .36rem;
        box-shadow: 0 0 3px 1px rgba(0,0,0,0.10);
      }
      .trip_date_kind_container {
        @include wh(100%,.75rem);
        background: #fff;
        position: relative;
        .trip_date_kind_item {
            @include wh(50%,inherit);
            color: #666;
            .trip_date_kind_title {
                color: #FE3C71;
            }
            .active {
                > div:first-child {
                    font-size: .22rem;
                }
            }
        }
        .active_line {
            @include wh(50%,.04rem);
            background: linear-gradient(90deg, #FF6E6C 0%, #FD3C71 100%);
            position: absolute;
            left: 0;
            bottom: 0;
            transition-duration: .3s;
        }
      }
      .search_back_container {
          width: .65rem;
          height: 100%;
          position: absolute;
          top: 0;
          left: 0;
        }

        .back {
          @include wh(.2rem,.38rem);
          display: block;
          background: url('//m.lvmama.com/flight/image/arrow.png') no-repeat;
          background-size: 100%;
        }
        .date_picker_body_container {
        @include heightByAbsolute(1.65rem,0); 
          .weeek_container {
           @include wh(100%,.48rem);
            ul {
               @include wh(100%,100%);
              background-color: #f4f4f7;
              li {
                @include wh(14.5%,100%);
                @include sc(.26rem,#666);
              }
              li:last-child,li:first-child{
                color: #FE3C71;
              }
            }
          }
          .month_location_container {
            @include wh(100%,.6rem);
            background: #fff;
          }
          .date_container {
            @include heightByAbsolute(1.06rem,.48rem); 
            background: #fff;
            overflow-y: scroll;
            overflow-x: hidden;
            .big_container {
              // border-bottom: 1px solid #f1f1f1;
              @include bottomline();
              padding-bottom: .3rem;
              box-sizing: border-box;
              .month_title {
                width: 100%;
                height: .7rem;

              }
              .date_item {
                @include wh(14.2%,1.08rem);
                font-size: .32rem;
                text-align: center;
                position: relative;
                .price_container {
                  @include sc(.18rem,#333);
                  padding-bottom: 0.1rem;
                }
                .lowest_price {
                  color: #ee7b33;
                }
                .rest_day{
                  @include sc(.22rem,#000);
                  width: 100%;
                  @include cl();
                  margin-top: .05rem;
                }
                .rest_icon {
                  @include wh(.24rem,.24rem);
                  background: url('//m.lvmama.com/flight/image/rxiu.png');
                  background-size: 100% 100%;
                  top: .05rem;
                  @include cl();
                }
                .rest_icon_selected {
                  background: url('//m.lvmama.com/flight/image/xiuSelect.png');
                  background-size: 100% 100%;
                }
                .ban_icon {
                  background: url('//m.lvmama.com/flight/image/ban.png?v=1');
                  background-size: 100% 100%;
                }
                .ban_icon_selected {
                  background: url('//m.lvmama.com/flight/image/banSelect.png');
                  background-size: 100% 100%;
                }
                .hban{
                  @include wh(.24rem,.24rem);
                  background: url('//m.lvmama.com/flight/image/hban.png');
                  background-size: 100% 100%;
                  position: absolute;
                  top: .05rem;
                  left: .05rem;
                }
                .hxiu{
                  @include wh(.24rem,.24rem);
                  background: url('//m.lvmama.com/flight/image/hxiu.png');
                  background-size: 100% 100%;
                  position: absolute;
                  top: .05rem;
                  left: .05rem;
                }
                .item_content {
                  // margin-top: .3rem;
                  margin-top: 0.35rem;
                }
              }
              .date_selected {
                color: #fff !important;
                background: linear-gradient(90deg, #FF6E6C 0%, #FD3C71 100%);
                border-radius: 3px;
              }
              .f12{
                font-size:.30rem;
                // margin-bottom: .05rem;
              }
            }
          }
          .tip_container {
            width: 100%;
            height: .48rem;
            position: absolute;
            bottom: 0rem;
            left: 0;
            @include sc(.24rem,#999);
            div{
              color: #999;
            }
            span {
                @include wh(.24rem,.24rem);
                display: inline-block;
                background: url('//m.lvmama.com/flight/image/prompt.png?v=1') no-repeat center;
                background-size: 100%;
                margin: 0 .1rem;
            }
          }
      }
        .date_picker_body_container_not_double {
            @include heightByAbsolute(.9rem,0);
        }
    }

</style>
