<template>
    <div class="add_remind">
        <head-top :depart="depart"></head-top>
        <div class="add_card">
            <div class="pick_city_container y_flex">
                 <div>
                    <p v-if="departCity!='出发城市'" class="depart_city">出发城市</p>
                    <router-link to="/flight/cityPicker/departureCity/departFrom" class="city_item y_flex" :class="{'left_to_right':isChangeCity,'noFromCity':noFrom}">{{departCity}}</router-link>
                    <div class="orderline_left"></div>
                </div>
                <div class="trip_kind_change_container xy_flex">
                    <div @click="changeCity">
                        <div class="plane_icon"></div>
                        <div class="rotate_icon"></div>
                    </div>
                </div>
                <div>
                    <p v-if="destCity!='到达城市'" class="dest_city">到达城市</p>
                    <router-link to="/flight/cityPicker/arrivalCity/destTo" class="city_item y_flex right_flex" :class="{'right_to_left':isChangeCity,'noToCity':noTo}">{{destCity}}</router-link>
                    <div class="orderline_right"></div>
                </div>
            </div>
             <div class="pick_city_container between_x_flex">
                 <div @click="toDepartDate">
                     <p class="depart_city" v-if="!showBeforeT">最早出发</p>
                    <div v-if="showBeforeT" class="isLeft">最早出发</div>
                    <div v-if="!showBeforeT" class="city_item y_flex">{{departDate.month | addZero}}-{{departDate.date | addZero}}</div>
                </div>
                <div @click="toBackDate">
                    <p  class="dest_city" v-if="!showAfterT">最晚出发</p>
                    <div v-if="showAfterT" class="isRight">最晚出发</div>
                    <div  v-if="!showAfterT" class="city_item y_flex right_flex">{{backDate.month | addZero}}-{{backDate.date | addZero}}</div>
                </div>
                <div class="orderline_line"></div>
            </div>
            <div class="low_price">
                <span>最低价格</span>
                <span>
                    <i>&#165;</i>
                    <!-- <em>当前最低价格为{{}}</em> -->
                    <input type="number" v-model="inputPrice" :placeholder="mumPrice"/>
                </span>
                <div class="orderline_line"></div>
            </div>
            <div class="add_phone">
                <span>联系手机</span>
                <input type="tel" placeholder="请输入您的手机号" maxlength="11" v-model="telNo"/>
            </div>
            <!-- <div class="add_btn" @click="addBtn" v-if="!showBtn">确认添加</div>
            <div class="add_btn" @click="editBtn" v-if="showBtn">保存</div> -->
            <div class="add_btn" @click="addBtn">{{!showBtn ? '确认添加' : '保存'}}</div>
        </div>
        <alert-tip v-if="showAlertMessage" :tipContent="alertMessage" :leftButton="leftButton"></alert-tip>
    </div>
</template>
<script>
    import headTop from '../../components/header/head'
    import alertTip from '../../components/common/alertTip'
    import { mapActions,mapState } from 'vuex'
    import { lQuery } from '../../plugins/lQuery'
    import { addZero,deleZero,weekFormat,getStore,formatIOSDate,setStore,removeStore,getJudgeMonthDays,getBookingSource } from '../../config/mUtils'
    import { getFlightDaysPrice,lowPriceAdd,lowPriceEdit } from '../../service/getData'
    export default {
        data(){
            return{
                depart:"低价提醒",
                isChangeCity: false,//是否交换出发城市
                rotateNum: 1,//旋转圈数
                isShow:false,
                departCity:'',
                destCity:'',
                departCityCode:'',
                destCityCode:'',
                showAlertMessage:false,
                alertMessage:'',
                leftButton:'',
                firstDay:'',//最早日期
                lastDay:'',//最晚日期
                earliestT:'',
                latestT:'',
                mumPrice:'',//默认最低价
                inputPrice:'',//最低价
                beginT:'',//最早时间
                beginLt:'',//最晚时间
                showBtn:false,
                telNo:'',
                shoType:false,//区分添加和编辑
                showBeforeT:true,
                showAfterT:true,
                noFrom:true,
                noTo:true
               
            }
        },
        components: {
            headTop,
            alertTip,
        },
        computed:{
            ...mapState([
                'departureCity',
                'arrivalCity',
                'departDate',
                'backDate',
                'lowPriceInfor',
                'isDouble'
            ])
        },
        methods:{
            ...mapActions([
	            'initData'
            ]),
            toDepartDate(){
                setStore("fromAdd",true);
                if(this.showBeforeT == true){
                    setStore("haveDate",true);
                }
                if(this.$route.params.kind == 'add'){
                    this.$router.push(`/${this.$parent.baseUrlPath}/datePicker/departDate/addRemind`);
                }else{
                    this.$router.push(`/${this.$parent.baseUrlPath}/datePicker/departDate/editRemind`);
                }
            },
            toBackDate(){
                setStore("fromAdd",true);
                if(this.showAfterT == true){
                    setStore("haveDate",true);
                }
                if(this.$route.params.kind == 'add'){
                    this.$router.push(`/${this.$parent.baseUrlPath}/datePicker/backDate/addRemind`);
                }else{
                    this.$router.push(`/${this.$parent.baseUrlPath}/datePicker/backDate/editRemind`);
                }
            },
            changeCity(){

                this.rotateNum ++;
                lQuery('.rotate_icon').css('transform',`rotateZ(${180*this.rotateNum}deg)`);
                this.isChangeCity = !this.isChangeCity;
                setTimeout(() => {
                    this.isChangeCity = !this.isChangeCity;
                },250);

                if(this.departCity == '出发城市' && this.destCity == '到达城市'){
                    this.departCity = '出发城市';
                    this.destCity = '到达城市';
                    this.departCityCode = "";
                    this.destCityCode = "";
                    this.noFrom = true;
                    this.noTo = true;
                }else if(this.departCity == '出发城市' && this.destCity != '到达城市'){
                    this.departCity = this.arrivalCity.name;
                    this.departCityCode = this.arrivalCity.code;
                    this.destCity = '到达城市';
                    this.destCityCode = "";
                    this.noFrom = false;
                    this.noTo = true;
                }else if(this.departCity != '出发城市' && this.destCity == '到达城市'){
                    this.departCity = '出发城市';
                    this.departCityCode = "";
                    this.destCity = this.departureCity.name;
                    this.destCityCode = this.departureCity.code;
                    this.noFrom = true;
                    this.noTo = false;
                }else{
                    this.departCity = this.arrivalCity.name;
                    this.departCityCode = this.arrivalCity.code;
                    this.destCity = this.departureCity.name;
                    this.destCityCode = this.departureCity.code;
                    this.noFrom = false;
                    this.noTo = false;
                }

                if(this.departCity!='出发城市'&&this.destCity!='到达城市'){
                    let departObj ={
                            key: 'departureCity',
                            val: {
                                'airportCityCode':this.departCityCode,
                                'code':this.departCityCode,
                                'name':this.departCity
                            }
                        }
                
                    try{
                        this.initData(departObj);
                    }catch(e){}
                    let destObj ={
                                key: 'arrivalCity',
                                val: {
                                    'airportCityCode':this.destCityCode,
                                    'code':this.destCityCode,
                                    'name':this.destCity
                                }
                        }
                    
                    try{
                        this.initData(destObj);
                    }catch(e){}
                }
                
                this.getLowPriceDate(this.departCityCode,this.destCityCode,this.beginT,this.beginLt);
                
            },
            addBtn(){
                if(this.departCity == '出发城市' && this.destCity == '到达城市'){
                    this.showAlertMessage = true;
                    this.alertMessage = '请选择出发城市和到达城市';
                    setTimeout(() => {
                        this.showAlertMessage = false;
                    },2000);
                    return;
                }
                if(this.departCity == '出发城市' && this.destCity != '到达城市'){
                    this.showAlertMessage = true;
                    this.alertMessage = '请选择出发城市';
                    setTimeout(() => {
                        this.showAlertMessage = false;
                    },2000);
                    return;
                }
                if(this.departCity != '出发城市' && this.destCity == '到达城市'){
                    this.showAlertMessage = true;
                    this.alertMessage = '请选择到达城市';
                    setTimeout(() => {
                        this.showAlertMessage = false;
                    },2000);
                    return;
                }
                if(this.showBeforeT && this.showAfterT){
                    this.showAlertMessage = true;
                    this.alertMessage = '请选择出发日期';
                    setTimeout(() => {
                        this.showAlertMessage = false;
                    },2000);
                    return;
                }
                if(this.departCity == this.destCity){
                    this.showAlertMessage = true;
                    this.alertMessage = '出发地和目的地不能相同';
                    setTimeout(() => {
                        this.showAlertMessage = false;
                    },2000);
                    return;
                }
                if(this.earliestT > this.latestT){
                    this.showAlertMessage = true;
                    this.alertMessage = '最晚时间不能晚于最早时间';
                    setTimeout(() => {
                        this.showAlertMessage = false;
                    },2000);
                    return;
                }
                if(this.inputPrice == ''){
                    this.showAlertMessage = true;
                    this.alertMessage = '请填写期望价格';
                    setTimeout(() => {
                        this.showAlertMessage = false;
                    },2000);
                    return;
                }else{
                    var re = /^[0-9]+.?[0-9]*$/;
                    if(!re.test(this.inputPrice)){
                         this.showAlertMessage = true;
                         this.alertMessage = '请填写正确的价格';
                         setTimeout(() => {
                            this.showAlertMessage = false;
                         },2000);
                         return;
                     }
                }
                // if(this.telNo ==''){
                //     this.showAlertMessage = true;
                //     this.alertMessage = '请填写手机号';
                //     setTimeout(() => {
                //         this.showAlertMessage = false;
                //     },2000);
                //     return;
                // }else{
                //     var regs = /^\d{11}$/;
                //      if(!regs.test(this.telNo)){
                //          this.showAlertMessage = true;
                //          this.alertMessage = '请填写正确的手机号';
                //          setTimeout(() => {
                //             this.showAlertMessage = false;
                //          },2000);
                //          return;
                //      }
                // }
                if(this.telNo !=''&&this.telNo !=null){
                    var regs = /^\d{11}$/;
                     if(!regs.test(this.telNo)){
                         this.showAlertMessage = true;
                         this.alertMessage = '请填写正确的手机号';
                         setTimeout(() => {
                            this.showAlertMessage = false;
                         },2000);
                         return;
                     }
                }
                 
                //判断是添加还是编辑
                this.$parent.showLoading = true;
                if(this.$route.params.kind == 'add'){
                    //调添加接口
                    lowPriceAdd(this.departCityCode,this.destCityCode,getBookingSource(),this.beginT,this.beginLt,this.inputPrice,this.telNo).then((res) => {
                        this.$parent.showLoading = false;
                        let resCode = res.code;
                        if(resCode == '1'){
                            this.$router.push(`/${this.$parent.baseUrlPath}/lowPriceRemind`);
                        }
                    },()=>{
                        this.$parent.showLoading = false;
                    })

                }else{
                    //调编辑接口
                    lowPriceEdit(this.departCityCode,this.destCityCode,getBookingSource(),this.beginT,this.beginLt,this.inputPrice,this.lowPriceInfor.id,this.telNo).then((res) => {
                        this.$parent.showLoading = false;
                        let resCode = res.code;
                        if(resCode == '1'){
                            this.$router.push(`/${this.$parent.baseUrlPath}/lowPriceRemind`);
                        }

                    },()=>{
                        this.$parent.showLoading = false;
                    })
                }
            },
            //调取低价日历接口
            getLowPriceDate(departureAirportCode,arrivalAirportCode,startDate,endDate){
                this.mumPrice="";
                getFlightDaysPrice(departureAirportCode,arrivalAirportCode,startDate,endDate).then((res) => {
                    try {
                        let datePriceList = res.data.dailPrices,
                            startHm = new Date(startDate).getTime(),
                            endHm = new Date(endDate).getTime();
                           
                            for (let i = 0; i < datePriceList.length; i++) {
                                datePriceList[i].deptDate = new Date(datePriceList[i].deptDate).getTime();
                               if(datePriceList[i].deptDate>=startHm && datePriceList[i].deptDate<=endHm){
                                    this.mumPrice = `当前最低价格为${datePriceList[i].parPrice}`;
                                    break;
                               }
                            }
                    } catch (error) {
                        
                    }
                })
            },
            timeFun(){
                if(new Date(`${this.departDate.year}/${this.departDate.month}/${this.departDate.date}`)>new Date(`${this.backDate.year}/${this.backDate.month}/${this.backDate.date}`)){
                    let  comeBack = `${this.backDate.year}-${this.backDate.month}-${this.backDate.date}`,
                    comeBackT = new Date(formatIOSDate(comeBack)).getTime(),//最晚时间戳
                    frontTime = `${this.departDate.year}-${this.departDate.month}-${this.departDate.date}`,
                    standardTime = new Date(formatIOSDate(frontTime)).getTime(),//最早时间戳
                    laterTime = standardTime+6*24*60*60*1000,
                    standLaterT = new Date(laterTime),
                    standYear = standLaterT.getFullYear(),
                    standMonth = standLaterT.getMonth()+1,
                    standDay = standLaterT.getDate(),
                    standWeek = standLaterT.getDay();
                    let _obj = {
                        key: 'backDate',
                        val: {
                            year: standYear,
                            month: standMonth,
                            date: standDay,
                            day:weekFormat(standWeek)
                        }
                    }
                    try{
                        this.initData(_obj);
                    }catch(e){}
                }
            }

        },
        activated(){
            let obj = {
                key: 'isDouble',
                val: true
            };
            try{
                this.initData(obj);
            }catch(e){}

               
            let  comeBack = `${this.backDate.year}-${this.backDate.month}-${this.backDate.date}`,
                comeBackT = new Date(formatIOSDate(comeBack)).getTime(),//最晚时间戳
                frontTime = `${this.departDate.year}-${this.departDate.month}-${this.departDate.date}`,
                standardTime = new Date(formatIOSDate(frontTime)).getTime(),//最早时间戳
                laterTime = standardTime+7*24*60*60*1000,
                standLaterT = new Date(laterTime),
                standYear = standLaterT.getFullYear(),
                standMonth = standLaterT.getMonth()+1,
                standDay = standLaterT.getDate(),
                standWeek = standLaterT.getDay();
            
            //第一次进添加页显示默认
            if(this.$route.params.kind == 'add'){
               
                if(!getStore("selectDay")){
                     this.showBeforeT = true;
                     this.showAfterT = true;
                }else{
                    this.showBeforeT = false;
                    this.showAfterT = false;
                }

                if(!getStore("isSelectFCity")&&!getStore("isSelectTCity")){
                    this.departCity = "出发城市";
                    this.departCityCode ="";
                    this.destCity = "到达城市";
                    this.destCityCode ="";
                    this.noFrom = true;
                    this.noTo = true;

                }
                if(!getStore("fromAdd")){
                    if(getStore("isSelectFCity") == true || getStore("isSelectFCity") == "true"){
                        this.departCity = this.departureCity.name;
                        this.departCityCode = this.departureCity.code;
                        this.noFrom = false;
                    }

                    if(getStore("isSelectTCity") == true || getStore("isSelectTCity") == "true"){
                        this.destCity = this.arrivalCity.name;
                        this.destCityCode = this.arrivalCity.code;
                        this.noTo = false;
                    }
                }
                
            }else{
                this.departCity = this.departureCity.name;
                this.departCityCode = this.departureCity.code;
                this.destCity = this.arrivalCity.name;
                this.destCityCode = this.arrivalCity.code;
                this.noFrom = false;
                this.noTo = false;
                this.showBeforeT = false;
                this.showAfterT = false;
            }
            removeStore("fromAdd");
            removeStore("haveDate");
            
            this.inputPrice = '';
            this.mumPrice="";
            if(this.$route.params.kind == 'add'){
                this.showBtn = false;
                this.telNo = '';
            }else{
                this.showBtn = true;
                this.inputPrice = this.lowPriceInfor.expectationPrice;
                this.telNo = this.lowPriceInfor.telNo;
            }
            if(!getStore('chooseDay')){
                if(this.$route.params.kind == 'add'){
                    //新增
                    let _obj = {
                        key: 'backDate',
                        val: {
                            year: standYear,
                            month: standMonth,
                            date: standDay,
                            day:weekFormat(standWeek)
                        }
                    }
                    try{
                        this.initData(_obj);
                    }catch(e){}
                    
                }else{
                    //编辑
                    this.inputPrice = this.lowPriceInfor.expectationPrice;
                    let nowDate=new Date().getFullYear()+"/"+(new Date().getMonth()+1)+"/"+new Date().getDate();
                    let obj = {
                        key: 'departDate',
                        val: {
                            year: this.lowPriceInfor.normalDep.split('-')[0],
                            month: deleZero(this.lowPriceInfor.normalDep.split('-')[1]),
                            date: deleZero(this.lowPriceInfor.normalDep.split('-')[2]),
                            day: weekFormat(new Date(formatIOSDate(this.lowPriceInfor.normalDep)).getDay())
                        
                        }
                    }
                    if(new Date(nowDate)> new Date(formatIOSDate(this.lowPriceInfor.normalDep))){
                        obj = {
                            key: 'departDate',
                            val: {
                                year: new Date().getFullYear(),
                                month: new Date().getMonth()+1,
                                date: new Date().getDate(),
                                day: weekFormat(new Date().getDay())
                            
                            }
                        }
                    }

                    try{
                        this.initData(obj);
                    }catch(e){}
                    let _obj = {
                        key: 'backDate',
                        val: {
                            year: this.lowPriceInfor.normalArr.split('-')[0],
                            month: deleZero(this.lowPriceInfor.normalArr.split('-')[1]),
                            date: deleZero(this.lowPriceInfor.normalArr.split('-')[2]),
                            day: weekFormat(new Date(formatIOSDate(this.lowPriceInfor.normalArr)).getDay())
                        
                        }
                    }
                    // let nowTime = this.departDate.year+"/"+this.departDate.month+"/"+this.departDate.date;
                    // let endTime = this.backDate.year+"/"+this.backDate.month+"/"+this.backDate.date;
                    // if(new Date(nowDate)> new Date(formatIOSDate(this.lowPriceInfor.normalArr)) || endTime<nowTime){
                    //      _obj = {
                    //         key: 'backDate',
                    //         val: {
                    //             year: new Date(new Date().getTime()+6*24*60*60*1000).getFullYear(),
                    //             month: new Date(new Date().getTime()+6*24*60*60*1000).getMonth()+1,
                    //             date: new Date(new Date().getTime()+6*24*60*60*1000).getDate(),
                    //             day: weekFormat(new Date(new Date().getTime()+6*24*60*60*1000).getDay())
                            
                    //         }
                    //     }
                    // }
                    try{
                        this.initData(_obj);
                    }catch(e){}
                }
            }
            this.timeFun();
            this.beginT = `${this.departDate.year}-${addZero(this.departDate.month)}-${addZero(this.departDate.date)}`;//最早时间
            this.beginLt = `${this.backDate.year}-${addZero(this.backDate.month)}-${addZero(this.backDate.date)}`;//最晚时间
            this.earliestT = new Date(formatIOSDate(this.beginT)).getTime();
            this.latestT = new Date(formatIOSDate(this.beginLt)).getTime();
            console.log(this.beginT);
            console.log(this.beginLt);
            if(!this.showBeforeT&&!this.showAfterT&&this.departCity.indexOf("城市")==-1&&this.destCity.indexOf("城市")==-1){
                this.getLowPriceDate(this.departCityCode,this.destCityCode,this.beginT,this.beginLt);
            } 

        }
    }
</script>
<style lang="scss" scoped>
@import '../../style/mixin';
.add_remind{
     @include wh(100%,100%);
     position: relative;
     .add_card{
        width: 97.3%;
        margin: .1rem .1rem 0;
        background: #fff;
        -webkit-box-shadow: 0 0 10px rgba(191, 181, 181, 0.75);
        box-shadow: 0 0 10px rgba(191, 181, 181, 0.75);
        border-radius: 0.1rem;
        padding: 0 .2rem;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        .orderline_line{
            @include orderline;
            position: absolute;
            left: 0;
            bottom:0;
        }
        .low_price{
             @include wh(100%,0.88rem);
             position: relative;
             span{
                 line-height: 0.88rem;
                 @include sc(.28rem,#666666);
             }
             span:nth-child(1){
                 margin-right: 0.2rem;
             }
             span:nth-child(2){
                 em{
                     color:#9f9f9f;
                 }
                 input{
                     font-size: 0.28rem;
                     margin-left: 4%;
                 }
                 i{
                     @include ct;
                 }
             }
           
        }
        .add_phone{
            width:100%;
            line-height: 0.88rem;
            position: relative;
            span{
                font-size: 0.28rem;
                color:#666666;
                margin-right: 0.2rem;
            }
            input{
                 font-size: 0.28rem;
            }
        }
        .add_btn{
            @include wh(7.1rem,0.88rem);
            background-image: linear-gradient(90deg, #FE686C 0%, #FD3C71 100%);
            @include sc(.36rem,#fff);
            text-align: center;
            line-height: 0.88rem;
            border-radius: 100px;
            @include cl;
            bottom: 0.4rem;
            
        }
        .pick_city_container {
            position: relative;
            @include wh(100%,auto);
            @include sc(.4rem,#000);
            padding: 0.3rem 0;
            .depart_city,.dest_city{
                  @include sc(.24rem,#9f9f9f);
            }
            .orderline_left,.orderline_right{
                @include orderline;
                width: 35%;
                position: absolute;
                bottom:0;
            }
            .orderline_line{
                @include orderline;
                position: absolute;
                bottom:0;
                left:0;
            }
            .dest_city{
               text-align: right;
            }
            .isRight{
                text-align: right;
                font-size: 0.36rem;
                color:#aaaaaa;
            }
            .isLeft{
                color:#aaaaaa;
            }
               
            > div {
                @include wh(35%,inherit);
                font-size: 0.36rem;
                   
                 .city_item {
                        @include wh(100%,inherit);
                        margin-top:0.2rem;
                        font-size: 0.36rem;
                }
                .noFromCity{
                    color:#aaaaaa;
                }
                .noToCity{
                    color:#aaaaaa;
                }
            }
            .left_to_right {
               transform: translateX(6.1rem);
               transition-duration: .3s;
            }
             .right_to_left {
                transform: translateX(-6.1rem);
                transition-duration: .3s;
            }
            .trip_kind_change_container {
                @include wh(30%,inherit);
                border: none;
                position: relative;
                // .plane_icon {
                //     @include wh(.4rem,.4rem);
                //     @include center;
                //     background: url('//m.lvmama.com/flight/image/img.png') no-repeat -3.67rem -16.16rem;
                //     background-size: 6rem;
                // }
                .rotate_icon {
                    @include wh(.52rem,.52rem);
                    background: url('//m.lvmama.com/flight/image/trainChange.png') no-repeat;
                    background-size: 100% 100%;
                    transition-duration: .7s;
                }
                    
            }
                
        }
     }
}
</style>
