<template>
    <div class="low_price_remind">
        <head-top  :depart="depart" :goPage="goPage"></head-top>
        <!-- 未登录 -->
        <div class="no_login" v-if="!isLogin && showLogin">
            <span class="not_login_img"></span>
            <p>您好，登陆后才能查看和添加低价提醒</p>
            <p @click="toLogin">去登录</p>
        </div>
        <!-- 登录后 -->
        <div class="is_login" v-if="isLogin  && showLogin">
            <div class="add_notice"  @click="toAddRemind">
                <div>
                    <span></span>
                    <span>添加提醒</span>
                </div>
            </div>
            <ul class="low_price_list"  v-for="(item,index) in lowPriceNew" :key="index" v-if="lowPriceNew.length>0 && index<20">
                <li class="between_x_flex change_li1"  @click="toPriceMovements(item)" id="change_li" @touchstart="slideDeleteStart($event,item,index)" @touchmove="slideDeleteMove($event,item,index)" @touchend="slideDeleteEnd($event,item,index)">
                    <div v-bind:class="{'grayColor':!item.lapShow}">
                        <p class="lineH">
                            <span>{{item.departName}}</span>
                            <i>-</i>
                            <span>{{item.desttName}}</span>
                        </p>
                        <p>{{item.beginDepDate}}至{{item.endDepDate}}出发</p>
                    </div>
                    <div v-if="item.lapShow"> <!-- v-bind:class="{'grayColorDiv':!item.lapShow}" -->
                        <span v-if="item.actualPrice!=''&&item.actualPrice!=null"><i>&#165;</i>{{item.actualPrice}}</span>
                        <span v-if="item.actualPrice!=''&&item.actualPrice!=null">
                            <i v-if="item.changePrice==0"></i>
                            <i class="t_uplift" v-if="item.changePrice>0"></i>
                            <i class="descend" v-if="item.changePrice<0"></i>
                            <em class="change_price" v-if="item.changePrice>0">上涨</em>
                            <em class="change_price" v-if="item.changePrice<0">下降</em>
                            <em class="uplift" v-if="item.changePrice==0">无变化</em>
                            <em v-if="item.changePrice!=0">&#165;{{item.changePrice | descendPrice}}</em>
                        </span>
                    </div>
                    <div class="grayLater" v-if="!item.lapShow">
                        <span>已过期</span>
                    </div>
                </li>
                <li class="change_li">
                    <span @click="toEdit(item)">编辑</span>
                    <span @click="removeList(item,index)">删除</span>
                </li>
            </ul>
            <p v-if="lowPriceNew.length>0">*向左滑动可编辑、删除单条信息</p>
        </div>
        <alert-tip v-if="showAlertMessage" :tipContent="alertMessage" :leftButton="leftButton"></alert-tip>
    </div>
  
</template>
<script>
    import headTop from '../../components/header/head'
    import alertTip from '../../components/common/alertTip'
    import { mapActions,mapState } from 'vuex'
    import { animate,isClient,getLvSessionId,getNoticeSource,jumpLogin,getStore,setStore,standardDate,removeStore,switchDateFormate,formatIOSDate,getBookingSource,getStatisticsType,getElementTag } from '../../config/mUtils'
    import { getLvUser,getLvUserByCookie,LowSubscription,getFlightCities,lowPriceEdit,lowPriceRemove } from '../../service/getData'

    export default {
		data(){
            return{
                depart:"低价提醒",
                goPage:"remindFrom",
                lowPriceNew:[],//低价订阅列表
                isLogin:false,//是否登录
                showLogin:false,
                startX: 0,
                startY: 0,
                endX: 0,
                moveDis: 0,
                maxDis: 0,
                slideDistance: 0,
                duration: 150,
                descend:false,
                showAlertMessage:false,
                alertMessage:'',
                leftButton:'',
               
             
            }
            
        },
        components: {
            headTop,
            alertTip
        },
        computed:{
            ...mapState([
                'departureCity',
                'arrivalCity'
            ])
        },
        methods:{
            ...mapActions([
	            'initData'
            ]),
            toFeedBack(){
            	this.$router.push(`/${this.$parent.baseUrlPath}/feedBack/low_price_remind`);
            },
            lowFun(){
                this.lowPriceNew.map((inItem,inIndex) =>{
                    if(inItem.toDelete){
                        inItem.toDelete=false;
                        animate(
                            document.getElementsByClassName("change_li1")[inIndex],
                            { left: 0},
                            this.duration
                        )
                    }
                })
            },
            slideDeleteStart(e,item,index) {
                this.slideDistance = document.getElementsByClassName('change_li')[0].offsetWidth + 5;
                this.startX = e.targetTouches[0].pageX;
                this.startY = e.targetTouches[0].pageY;
                this.maxDis = 0;
                this.lowPriceNew.map((inItem,inIndex) =>{
                    if(inIndex!=index){
                        inItem.toDelete=false;
                        animate(
                            document.getElementsByClassName("change_li1")[inIndex],
                            { left: 0},
                            this.duration
                        )
                    }
                })
            },
            slideDeleteMove(e,item,index) {
                    this.endX = e.targetTouches[0].pageX;
                    let endY = e.targetTouches[0].pageY;
                    this.moveDis = this.endX - this.startX;
                    if(Math.abs(Math.abs(this.startY) - Math.abs(endY) )<=Math.abs(Math.abs(this.startX) - Math.abs(this.endX) )){
                        if(getNoticeSource()=="Android"){
                            e.preventDefault();
                        }
                    }else{
                        e.returnValue = true;
                        return;
                    }
                    
                    if (Math.abs(this.moveDis) >= this.maxDis) {
                        this.maxDis = Math.abs(this.moveDis);
                    }
                    if (Math.abs(e.currentTarget.offsetLeft) == this.slideDistance) {
                         item.toDelete = true;
                        return;
                    }
                    if (-this.moveDis >= this.slideDistance) {
                        e.currentTarget.style.left = -this.slideDistance + "px";
                        item.toDelete = true;
                        return;
                    } else if (-this.moveDis <= 0) {
                        e.currentTarget.style.left = 0;
                        item.toDelete = false;
                        return;
                    }
                    if(this.moveDis<=-30){
                        e.currentTarget.style.left = this.moveDis + "px";
                    }
                    
                    item.toDelete = true;
                    // console.log(this.moveDis);
                    // if(this.moveDis<=-20){
                        document.getElementsByClassName('is_login')[0].style.overflowY="hidden";
                    // }
                    
                    
            },
            slideDeleteEnd(e,item,index) {
                 e.returnValue = true;
                if (this.moveDis < 0) {
                    if (Math.abs(this.moveDis) < this.maxDis) {
                        animate(e.currentTarget, { left: 0}, this.duration);
                        item.toDelete = false;
                    } else {
                        if (Math.abs(this.moveDis) > this.slideDistance / 3 * 2) {
                            animate(
                            e.currentTarget,
                            { left: -this.slideDistance + "px"},
                            this.duration
                            );
                            item.toDelete = true;
                        } else {
                            animate(e.currentTarget, { left: 0 }, this.duration);
                           
                            item.toDelete = false;
                        }
                    }
                } else {
                    animate(e.currentTarget, { left: 0}, 150);
                    item.toDelete = false;
                }
                document.getElementsByClassName('is_login')[0].style.overflowY="auto";
            },
            toLogin(){
                jumpLogin();
            },
            toAddRemind(){
                console.log(this.lowPriceNew.length);
                if(this.lowPriceNew.length>=20){
                    this.showAlertMessage = true;
                    this.alertMessage = '小驴提醒，低价提醒任务最多只支持20条';
                    setTimeout(() => {
                        this.showAlertMessage = false;
                    },2000);
                    return;
                }
                this.$router.push(`/${this.$parent.baseUrlPath}/addRemind/add`);
            },
            toEdit(item){
                let obj_infor ={
                        key: 'lowPriceInfor',
                        val: {
                            depCity:item.departName,
                            depCode:item.deptCode,
                            areCode:item.arriCode,
                            arriCity:item.desttName,
                            normalDep:item.normalDepDate,
                            normalArr:item.endNormal,
                            depTime:item.beginDepDate,
                            desTime:item.endDepDate,
                            id:item.id,
                            expectationPrice:item.expectedPrice,
                            lapShow:item.lapShow,
                            telNo:item.cellphone
                           
                        }
                    }
                try{
                    this.initData(obj_infor);
                }catch(e){}
                let obj_depat ={
                        key: 'departureCity',
                        val: {
                            airportCityCode:item.deptCode,
                            name:item.departName,
                            code:item.deptCode
                           
                        }
                    }
                try{
                    this.initData(obj_depat);
                }catch(e){}
                 let obj_dest ={
                        key: 'arrivalCity',
                        val: {
                            airportCityCode:item.arriCode,
                            name:item.desttName,
                            code:item.arriCode
                           
                        }
                    }
                try{
                    this.initData(obj_dest);
                }catch(e){}
                
                this.$router.push(`/${this.$parent.baseUrlPath}/addRemind/edit`);
            },
            
            toPriceMovements(item){
                document.getElementsByClassName('is_login')[0].style.overflowY="scroll";
                    for(let i=0;i<this.lowPriceNew.length;i++){
                        let left=document.getElementsByClassName("change_li1")[i].style.left;
                        if(left!=null && left!="" && left!="0px" && left!="0"){
                            for(let j=0;j<this.lowPriceNew.length;j++){
                                this.lowPriceNew[j].toDelete=false;
                                animate(
                                    document.getElementsByClassName("change_li1")[j],
                                    { left: 0},
                                    this.duration
                                )
                            }
                            return;
                        }
                    }
                 let obj ={
                        key: 'lowPriceInfor',
                        val: {
                            depCity:item.departName,
                            arriCity:item.desttName,
                            depCode:item.deptCode,
                            areCode:item.arriCode,
                            normalDep:item.normalDepDate,
                            normalArr:item.endNormal,
                            depTime:item.beginDepDate,
                            desTime:item.endDepDate,
                            id:item.id,
                            expectationPrice:item.expectedPrice,
                            lapShow:item.lapShow,
                            telNo:item.cellphone

                        }
                    }
                try{
                    this.initData(obj);
                }catch(e){}
                let obj_depat ={
                        key: 'departureCity',
                        val: {
                            airportCityCode:item.deptCode,
                            name:item.departName,
                            code:item.deptCode
                           
                        }
                    }
                try{
                    this.initData(obj_depat);
                }catch(e){}
                 let obj_dest ={
                        key: 'arrivalCity',
                        val: {
                            airportCityCode:item.arriCode,
                            name:item.desttName,
                            code:item.arriCode
                           
                        }
                    }
                try{
                    this.initData(obj_dest);
                }catch(e){}
                setStore("toPage",true);
                this.$router.push(`/${this.$parent.baseUrlPath}/priceMovements`);
            },
            //获取城市列表
            async flightCities(){
                try{
                    let res = await getFlightCities();
                    let allCities = res.data.allCitys;
                    if(allCities.length>0){
                        setStore("allCities",allCities);
                    }
                    this.lowSubs();
                }catch(e){

                }
            },
            //低价订阅列表接口
            async lowSubs(){
                try {
                    let res = await LowSubscription();
                    var lowPriceList = res.data;
                    // var lowPriceList = da.data;
                     let flightCites = JSON.parse(getStore('allCities'));
                     for (let i = 0; i < lowPriceList.length;i++) {
                        for (let k = 0; k < flightCites.length; k++) {
                            if(lowPriceList[i].deptCode == flightCites[k].code){
                                lowPriceList[i].departName = flightCites[k].name;
                            }else if(lowPriceList[i].arriCode == flightCites[k].code){
                                lowPriceList[i].desttName = flightCites[k].name;
                            }
                           
                        }
                        lowPriceList[i].toDelete = false;
                        lowPriceList[i].hmDepDate = lowPriceList[i].beginDepDate;
                        lowPriceList[i].hmendDate = lowPriceList[i].endDepDate;
                        lowPriceList[i].normalDepDate = switchDateFormate(formatIOSDate(lowPriceList[i].beginDepDate)).split(' ')[0];
                        lowPriceList[i].endNormal = switchDateFormate(formatIOSDate(lowPriceList[i].endDepDate)).split(' ')[0];
                        lowPriceList[i].beginDepDate = switchDateFormate(formatIOSDate(lowPriceList[i].beginDepDate)).split(' ')[0].substring(5,10);
                        lowPriceList[i].endDepDate = switchDateFormate(formatIOSDate(lowPriceList[i].endDepDate)).split(' ')[0].substring(5,10);
                        lowPriceList[i].changePrice = lowPriceList[i].actualPrice - lowPriceList[i].expectedPrice;
                    }
                    var allPriceList  = lowPriceList;
                        // lapseArr = [],//失效的时间
                        // noLapArr = [],//未失效
                        // allShowList = [];

                    //按最晚时间排序
                    // function sortarr(arr){
                    //     for(let i=0;i<arr.length-1;i++){
                    //         for(let j=0;j<arr.length-1-i;j++){
                    //             if(arr[j].hmendDate>arr[j+1].hmendDate){
                    //                 var temp=arr[j];
                    //                 arr[j]=arr[j+1];
                    //                 arr[j+1]=temp;
                    //             }
                    //         }
                    //     }
                    //     return arr;
                    // }
                    // sortarr(allPriceList);
                    // let nowDate = formatIOSDate(standardDate(new Date().getTime()));
                    for (let k = 0; k < allPriceList.length; k++) {
                        if(allPriceList[k].status == 'VALID'){
                            allPriceList[k].lapShow = true;
                        }else if(allPriceList[k].status == 'INVALID'){
                            allPriceList[k].lapShow = false;
                        }
                        // if(formatIOSDate(allPriceList[k].hmendDate).split(" ")[0] < nowDate){
                        //     allPriceList[k].lapShow = false;
                        // }else{
                        //     allPriceList[k].lapShow = true;
                        // }
                        
                    }
                    // allShowList = noLapArr.concat(lapseArr);
                //    this.lowPriceNew = allShowList;
                    this.lowPriceNew = allPriceList;
                    this.lowPriceNew.map((inItem,inIndex) =>{
                        inItem.toDelete=false;
                        animate(
                            document.getElementsByClassName("change_li1")[inIndex],
                            { left: 0 },
                            this.duration
                        )
                    })
                   document.getElementsByClassName('is_login')[0].style.overflowY="scroll";
                    
                } catch (error) {
                   
                    
                }
                
                
            },
            //删除数据
            removeList(item,index){
                this.$parent.showLoading = true;
                lowPriceRemove(item.id,'DELETED',item.cellphone,item.actualPrice,item.searchTimes,item.noticeTimes,item.noticeTime).then((res) => {
                    this.$parent.showLoading = false;
                    let resCode = res.code,
                        resDate = res.data;
                    if(resCode == '1'){
                        this.lowPriceNew.splice(index,1);
                        this.lowPriceNew.map((inItem,inIndex) =>{
                            inItem.toDelete=false;
                            animate(
                                document.getElementsByClassName("change_li1")[inIndex],
                                { left: 0},
                                this.duration
                            )
                        })
                        document.getElementsByClassName('is_login')[0].style.overflowY="scroll";
                      
                    }

                })
                
            },
           
            
        },
        activated(){
            removeStore("chooseDay");
            this.isLogin = false;
            this.showLogin= false;
            this.lowPriceNew=[];
            // this.lowSubs();
           //判断有没有登录
               this.$parent.showLoading = true;
                if(isClient() == 1){
                    getLvSessionId().then((data) => {
                        if(data==null || data==undefined || data==""){
                             this.$parent.showLoading = false;
                             this.showLogin=true;
                            return;
                        }
                            getLvUser(data).then((res) => {
                                this.$parent.showLoading = false;
                                this.showLogin=true;
                                if(res.code == 1){
                                    this.isLogin = true;
                                    if(getStore('allCities')==null||getStore('allCities')==''){
                                        this.flightCities();
                                    }else{
                                        this.lowSubs();
                                    }
                                }
                            });
                        }, ()=> {
                            this.showLogin=true;
                            this.$parent.showLoading = false;
                        })
                }else{
                    //wap登录
                    getLvUserByCookie().then((res) => {
                        this.$parent.showLoading = false;
                        this.showLogin=true;
                        if(res.code == 1){
                            this.isLogin = true;
                            if(getStore('allCities')==null||getStore('allCities')==''){
                                this.flightCities();
                            }else{
                                this.lowSubs();
                            }
                        }
                    }, ()=> {
                        this.showLogin=true;
                        this.$parent.showLoading = false;
                    }) 
                }
           removeStore("toPage");
            getStatisticsType("机票_低价提醒首页","lowPriceRemind");
        }
    }
</script>
<style lang="scss" scoped>
@import "../../style/mixin";
.low_price_remind {
  @include wh(100%,100%);
  position: relative;
  .no_login {
    @include center;
    text-align: center;
    .not_login_img {
      display: inline-block;
      @include wh(4.6rem,4.6rem);
      background: url("//m.lvmama.com/flight/image/sche_noLogin.png") no-repeat;
      background-size: 100%;
    }
    p:nth-child(2) {
      @include sc(0.28rem,#666);
      padding-top: 0.52rem;
    }
    p:nth-child(3) {
      @include wh(6.7rem,0.88rem);
      line-height: 0.88rem;
      background-image: linear-gradient(90deg, #FE686C 0%, #FD3C71 100%);
      @include sc(0.3rem,#fff);
      border-radius: 100px;
      margin-top: 0.95rem;
      text-align: center;
    }
  }
  .is_login {
    > p {
      @include sc(0.22rem,#999999);
      padding-left: .2rem;
    }
    @include heightByAbsolute(0.9rem,0);
    overflow-y: auto;
    padding: 0 0.1rem;
    margin-top: 0.1rem;
    padding-bottom: 0.4rem;
    .add_notice {
      @include wh(100%,1.1rem);
      background: #fff;
      position: relative;
      border-radius: 0.1rem;
      div {
        @include center;
        height: 1.1rem;
        span:nth-child(1) {
          display: inline;
          @include wh(0.3rem,0.3rem);
          background: url("//m.lvmama.com/flight/image/addPer.png") no-repeat;
          background-size: 100%;
          @include ct;
        }
        span:nth-child(2) {
          display: inline-block;
          margin-left: 0.4rem;
          line-height: 1.08rem;
          color:#FF8800;
        }
      }
    }
    .low_price_list {
      @include wh(100%,1.28rem);
      margin: 0.1rem 0;
      position: relative;
      li {
        @include wh(100%,1.28rem);
        padding: 0.2rem 0.2rem;
        background: #ffffff;
        position: absolute;
        border-radius: 0.1rem;
        z-index: 10;
        .lineH{
            line-height: .5rem;
        }
        div:nth-child(1) {
            
            span {
                @include sc(0.28rem,#333333);
            }
            p:nth-child(2) {
                @include sc(0.24rem,#999999);
            }
        }
        div.grayColor{
             span {
                @include sc(0.3rem,#9f9f9f);
                color:#9f9f9f !important;
            }
            i{
                color:#9f9f9f !important;
            }
            p:nth-child(2) {
                @include sc(0.24rem,#9f9f9f);
            }
        }
        div.grayLater{
            span{
                @include ct;
                font-size: 0.3rem !important;
                color:#9f9f9f !important;
                width: 1.2rem;
                right: 0;
            }
        }
        div:nth-child(2) {
          position: relative;
          span {
            display: block;
            text-align: right;
            @include sc(0.4rem,#ff6600);
            position: relative;
            i {
              @include sc(0.24rem,#ff6600);
            }
          }
          span:nth-child(2) {
            //   margin-top: 0.2rem;
            i {
              display: inline;
              @include wh(0.16rem,0.09rem);
              background: url("//m.lvmama.com/flight/image/sign.png") no-repeat;
              background-size: 100%;
              position: absolute;
              bottom: 27%;
              left: -28%;
            }
            .t_uplift {
              @include wh(0.27rem,0.19rem);
              background: url("//m.lvmama.com/flight/image/uplift.png") no-repeat;
              background-size: 100%;
            }
            .change_price{
                 @include sc(0.24rem,#9f9f9f);
            }
            .descend {
              @include wh(0.28rem,0.17rem);
              background: url("//m.lvmama.com/flight/image/descend.png") no-repeat;
              background-size: 100%;
            }
            em {
              @include sc(0.24rem,#9f9f9f);
            }
            .uplift {
              //   margin-right: -4%;
            }
          }
        }
        div.grayColorDiv{
            span{
                color:#9f9f9f;
                i{
                    color:#9f9f9f;
                }
            }
            
        }
      }
      .change_li {
        width: initial;
        position: absolute;
        right: 0rem;
        height: 1.28rem;
        top: 0;
        padding: 0;
        z-index: 9;
        background: #f1f1f1;
        span {
          display: inline-block;
          @include wh(1.32rem,1.28rem);
          border-radius: 0.1rem;
          background-image: linear-gradient(90deg, #85D3FF 0%, #4DBEFF 100%);
          color: #fff;
          text-align: center;
          line-height: 1.28rem;
        }
        span:nth-child(2) {
          background-image: linear-gradient(90deg, #FE686C 0%, #FE3C71 100%);
        }
      }
    }
  }
}
</style>



