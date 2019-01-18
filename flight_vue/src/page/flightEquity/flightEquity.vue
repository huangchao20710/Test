<template>
  <div class="flight_equity">
      <head-top :depart="depart"></head-top>
      <!-- <div class="equity_user">
        <input type="text" placeholder="请输入优惠券码">
        <span>使用</span>
    </div> -->
    <!-- <div class="equity_invincible" v-if="false">
        <p>无敌券（可多选）</p>
    </div> -->
    <div class="equity_invincible">
        <p>
            <span>{{type | typeFormate}}：¥{{productTypePriceList.totalPrice}}，还需支付¥{{payRemain}}</span>
        </p>
    </div>
    
    <div class="voucher_content">
        <div class="in_content">
            <!-- 无敌券 -->
             <div v-if="type == 'invincible'">
                <ul v-for="(item,index) in totalList" :key="index">
                    <li>
                        <div class="voucher_money">
                            <i>¥</i>
                            <span>{{item.discountAmount}}</span>
                            <em>本单优惠</em>
                        </div>
                        <div class="voucher_name">
                            <p>{{item.couponName}}</p>
                            <p v-if="item.endTime">
                                <span>有效期至{{item.endTime | interception}}</span>
                                <span v-if="item.showLatDate">快过期</span>
                            </p>
                            <em @click="showCouponDetail(item)"></em>
                        </div>
                    </li>
                    <li class="xy_flex" @click="selectVoucher(item,index)">
                         <span class="voucher_select" v-bind:class="{'voucher_change':item.isSelect}"></span>
                    </li>
                </ul>
            </div>
            <!-- 权益券 -->
            <div v-if="type != 'invincible'">
                <ol class="equity_content">
                     <li v-for="(item,index) in totalList" :key="index" v-bind:class="{'isLast':item.showLast,'top_radius':(index==0)||item.showLast,'bottom_radius':(index==totalList.length-1)||item.showPre}">
                        <i class="split_icon" v-if="item.showLast || (index==0)"></i>
                        <i class="isPre" v-if="item.showPre || (index==totalList.length-1)"></i>
                        <div class="equity_left">
                            <div class="voucher_money">
                                <i>¥</i>
                                <span v-if="item.couponRightType=='RIGHT_FAVOUR_WHOLE'">{{item.rightObject}}</span>
                                <span v-if="item.couponRightType=='RIGHT_FAVOUR_FREE'" class="special">全免</span>
                                <span v-if="item.couponRightType=='RIGHT_FAVOUR_QUANTITY'" class="special">免{{item.rightObject}}份</span>
                                <em>本单优惠</em>
                            </div>
                            <div class="voucher_name">
                                <p>{{item.couponName}}</p>
                                <p v-if="item.endTime">
                                    <span>有效期至{{item.endTime | interception}}</span>
                                    <span v-if="item.showLatDate">快过期</span>
                                </p>
                                <em @click="showCouponDetail(item)"></em>
                            </div>
                        </div>
                        <div class="equity_right xy_flex" @click="selectVoucher(item,index)">
                             <span class="voucher_select"  v-bind:class="{'voucher_change':item.isSelect}"></span>
                        </div>
                    </li>
                </ol>
            </div>
           
            <p class="voucher_end">已加载完毕</p>
        </div>
    </div>
    <div class="voucher_btn" @click="selectBtn">确定</div>
    <div class="newNetwork" v-if="isPromit">
        <span>已抵消所有的金额</span>
    </div>
    <detail-panel v-if="showFaq" :coupon="selectCoupon" @closeDetail="closeDetail"></detail-panel>
  </div>
</template>

<script>
    import headTop from '../../components/header/head'
    import detailPanel from '../../components/common/detail-panel'
    import { mapActions,mapState } from 'vuex'
    import { setStore,getStore,formatIOSDate } from '../../config/mUtils'
    const compare = (obj1, obj2) => {
        var val1 = obj1.rightObject;
        var val2 = obj2.rightObject;
        if (val2 < val1) {
            return -1;
        } else if (val2 > val1) {
            return 1;
        } else {
            return 0;
        }
    };
    const compareInvincible = (obj1, obj2) => {
        var val1 = obj1.discountAmount;
        var val2 = obj2.discountAmount;
        if (val2 < val1) {
            return -1;
        } else if (val2 > val1) {
            return 1;
        } else {
            return 0;
        }
    };
    const compareCouponId = (obj1, obj2) => {
        var val1 = obj1.couponId;
        var val2 = obj2.couponId;
        if (val1 < val2) {
            return -1;
        } else if (val1 > val2) {
            return 1;
        } else {
            return 0;
        }
    }
    export default{
        data(){
            return{
                 depart:'',
                 isPromit:false,//弹框
                 type:'',//判断是权益券还是无敌券
                 payRemain:0,//还需支付的金额
                 totalList:[],
                 showFaq:false,
				 selectCoupon:'',
            }
        },

        components:{
            headTop,
            detailPanel,
        },

        methods:{
            ...mapActions([
        	    'initData',
            ]),

            compareCouponList(totalList){
                if(this.type == 'invincible'){
                    var list = totalList.sort(compareInvincible);
                }else{
                    let arr = totalList.sort(compare);
                    let rightFavourFree=[],rightFavourQuantity=[],rightFavourWhole=[];
                    arr.map((item,index) => {
                        if(item.couponRightType == "RIGHT_FAVOUR_FREE"){
                            rightFavourFree.push(item);
                        }else if(item.couponRightType == "RIGHT_FAVOUR_QUANTITY"){
                            rightFavourQuantity.push(item);
                        }else if(item.couponRightType == "RIGHT_FAVOUR_WHOLE"){
                            rightFavourWhole.push(item);
                        }
                    });
                    var list = [];
                    rightFavourFree.map((item) => {
                        list.push(item);
                    });
                    rightFavourQuantity.map((item) => {
                        list.push(item);
                    });
                    rightFavourWhole.map((item) => {
                        list.push(item);
                    });
                }
                let allList=list;
               if(this.type != 'invincible'){
                    allList = list.sort(compareCouponId);
               }
               if(allList.length>0){
                   if(new Date(formatIOSDate(allList[0].endTime)).getTime()-(new Date().getTime())<=7*24*60*60*1000){
                       allList[0].showLatDate = true;
                   }else{
                       allList[0].showLatDate = false;
                   }
               }
               for (let i = 1; i < allList.length; i++) {
                   if(new Date(formatIOSDate(allList[i].endTime)).getTime()-(new Date().getTime())<=7*24*60*60*1000){
                       allList[i].showLatDate = true;
                   }else{
                       allList[i].showLatDate = false;
                   }
                   if(allList[i].couponId!=allList[i-1].couponId){
                       allList[i].showLast = true;
                       allList[i-1].showPre = true;
                   }
               }
                return allList;
            },

            selectVoucher(item,index){
                item.isSelect = !item.isSelect;
                if(this.type == 'invincible'){//无敌券
                    let flag = false;
                    for (let j = 0; j < this.totalList.length; j++) {
                        if(this.totalList[j].isSelect&&index!=j){
                            flag = true;
                            break;
                        }
                    }
                    if(!flag){//没勾选过的自动勾选
                        for (let i = 0; i < this.totalList.length; i++) {
                            if(i!=index){
                                this.totalList[i].isSelect = false;
                            }
                        } 
                        
                        if(item.isSelect){//勾选
                            let amount = 0;
                            for (let i = 0; i < this.totalList.length; i++) {
                                if(this.totalList[i].isSelect){
                                    amount = amount + this.totalList[i].discountAmount;
                                }
                            }
                            this.wholeComputePrice(amount);
                            
                            let isCheckedFlag = false;
                            for (let k = 0; k < this.totalList.length; k++) {
                                if(this.totalList[k].isSelect&&k!=index){
                                    isCheckedFlag = true;//判断无敌券之前是否勾选过
                                    break;
                                }
                            } 
                            if(!isCheckedFlag){
                                for (let j = 0; j < this.totalList.length; j++) {
                                    let num = 0;
                                    if(this.payRemain >0){
                                        if(!this.totalList[j].isSelect&&j!=index){
                                            this.totalList[j].isSelect = true;
                                            for (let i = 0; i < this.totalList.length; i++) {
                                                if(this.totalList[i].isSelect){
                                                    num = num + this.totalList[i].discountAmount;
                                                }
                                            }
                                            this.wholeComputePrice(num); 
                                        }
                                    }else{
                                        this.payRemain = 0;
                                        break;
                                    }

                                }
                            }
                        }else{//取消
                            let num = 0;
                            for (let i = 0; i < this.totalList.length; i++) {
                                if(this.totalList[i].isSelect){
                                    num = num + this.totalList[i].discountAmount;
                                }
                            }
                            this.wholeComputePrice(num);
                        }
                    }else{//勾选过的不自动勾选
                        // for (let i = 0; i < this.totalList.length; i++) {
                        //     if(i!=index){
                        //         this.totalList[i].isSelect = false;
                        //     }
                        // }
                        if(item.isSelect){//勾选
                            if(this.payRemain<=0){
                                this.payRemain = 0;
                                this.isPromit = true;
                                item.isSelect = !item.isSelect;
                                setTimeout(() => {
                                    this.isPromit = false;
                                }, 2000);
                                return;
                            }
                            let amount = 0;
                            for (let i = 0; i < this.totalList.length; i++) {
                                if(this.totalList[i].isSelect){
                                    amount = amount + this.totalList[i].discountAmount;
                                }
                            }
                            this.wholeComputePrice(amount);
                            
                        }else{//取消
                            let num = 0;
                            for (let i = 0; i < this.totalList.length; i++) {
                                if(this.totalList[i].isSelect){
                                    num = num + this.totalList[i].discountAmount;
                                }
                            }
                            this.wholeComputePrice(num);
                        }
                    }
                }else{//权益券
                    let flag = false;
                    for (let j = 0; j < this.totalList.length; j++) {
                        if(this.totalList[j].isSelect&&item.couponId==this.totalList[j].couponId&&index!=j){
                            flag = true;
                            break;
                        }
                    }
                
                    if(!flag){//没勾选过同批次号的自动勾选
                        for (let i = 0; i < this.totalList.length; i++) {
                            if(i!=index&&item.couponId!=this.totalList[i].couponId){
                                this.totalList[i].isSelect = false;
                            }
                        } 
                        if(item.couponRightType == 'RIGHT_FAVOUR_FREE'){//全免
                            for (let i = 0; i < this.totalList.length; i++) {
                                if(i!=index){
                                    this.totalList[i].isSelect = false;
                                }
                            }
                            if(item.isSelect){
                                this.payRemain = 0;
                            }else{
                                this.payRemain = this.productTypePriceList.totalPrice;
                            }
                            if(this.payRemain<=0){
                                this.isPromit = true;
                                setTimeout(() => {
                                    this.isPromit = false;
                                }, 2000);
                                return;
                            }
                        }else if(item.couponRightType == 'RIGHT_FAVOUR_QUANTITY'){//免几份
                            if(item.isSelect){//勾选
                                let amount = 0;
                                for (let i = 0; i < this.totalList.length; i++) {
                                    if(this.totalList[i].isSelect&&this.totalList[i].couponId==item.couponId&&this.totalList[i].couponRightType =='RIGHT_FAVOUR_QUANTITY'){
                                        amount = amount + this.totalList[i].rightObject;
                                    }
                                }
                                this.computePrice(amount);
                                
                                let isCheckedFlag = false;
                                for (let k = 0; k < this.totalList.length; k++) {
                                   if(this.totalList[k].isSelect&&item.couponId==this.totalList[k].couponId&&k!=index){
                                       isCheckedFlag = true;//判断同批次号的权益券之前是否勾选过
                                       break;
                                   }
                                } 
                               if(!isCheckedFlag){
                                    for (let j = 0; j < this.totalList.length; j++) {
                                        let num = 0;
                                        if(this.payRemain >0){
                                            if(!this.totalList[j].isSelect&&j!=index&&this.totalList[j].couponId==item.couponId&&this.totalList[j].couponRightType =='RIGHT_FAVOUR_QUANTITY'){
                                                this.totalList[j].isSelect = true;
                                                for (let i = 0; i < this.totalList.length; i++) {
                                                    if(this.totalList[i].isSelect&&this.totalList[i].couponId==item.couponId&&this.totalList[i].couponRightType =='RIGHT_FAVOUR_QUANTITY'){
                                                        num = num + this.totalList[i].rightObject;
                                                    }
                                                }
                                                this.computePrice(num); 
                                            }
                                        }else{
                                            this.payRemain = 0;
                                            break;
                                        }

                                    }
                               }
                           
                            }else{//取消
                                let num = 0;
                                for (let i = 0; i < this.totalList.length; i++) {
                                    if(this.totalList[i].isSelect&&this.totalList[i].couponId==item.couponId&&this.totalList[i].couponRightType =='RIGHT_FAVOUR_QUANTITY'){
                                        num = num + this.totalList[i].rightObject;
                                    }
                                }
                                this.computePrice(num);   
                              
                            }
                        }else if(item.couponRightType == 'RIGHT_FAVOUR_WHOLE'){//满减
                            if(item.isSelect){//勾选
                                let amount = 0;
                                for (let i = 0; i < this.totalList.length; i++) {
                                    if(this.totalList[i].isSelect&&this.totalList[i].couponId==item.couponId&&this.totalList[i].couponRightType =='RIGHT_FAVOUR_WHOLE'){
                                        amount = amount + this.totalList[i].rightObject;
                                    }
                                }
                                this.wholeComputePrice(amount);
                                
                                let isCheckedFlag = false;
                                for (let k = 0; k < this.totalList.length; k++) {
                                   if(this.totalList[k].isSelect&&item.couponId==this.totalList[k].couponId&&k!=index){
                                       isCheckedFlag = true;//判断同批次号的权益券之前是否勾选过
                                       break;
                                   }
                                } 
                               if(!isCheckedFlag){
                                    for (let j = 0; j < this.totalList.length; j++) {
                                        let num = 0;
                                        if(this.payRemain >0){
                                            if(!this.totalList[j].isSelect&&j!=index&&this.totalList[j].couponId==item.couponId&&this.totalList[j].couponRightType =='RIGHT_FAVOUR_WHOLE'){
                                                this.totalList[j].isSelect = true;
                                                for (let i = 0; i < this.totalList.length; i++) {
                                                    if(this.totalList[i].isSelect&&this.totalList[i].couponId==item.couponId&&this.totalList[i].couponRightType =='RIGHT_FAVOUR_WHOLE'){
                                                        num = num + this.totalList[i].rightObject;
                                                    }
                                                }
                                                this.wholeComputePrice(num); 
                                            }
                                        }else{
                                            this.payRemain = 0;
                                            break;
                                        }

                                    }
                               }
                            }else{//取消
                                let num = 0;
                                for (let i = 0; i < this.totalList.length; i++) {
                                    if(this.totalList[i].isSelect&&this.totalList[i].couponId==item.couponId&&this.totalList[i].couponRightType =='RIGHT_FAVOUR_WHOLE'){
                                        num = num + this.totalList[i].rightObject;
                                    }
                                }
                                this.wholeComputePrice(num);
                            }

                        }

                    }else{//勾选过同批次号的不自动勾选
                        for (let i = 0; i < this.totalList.length; i++) {
                            if(i!=index&&item.couponId!=this.totalList[i].couponId){
                                this.totalList[i].isSelect = false;
                            }
                        }
                        
                        if(item.couponRightType == 'RIGHT_FAVOUR_FREE'){//全免
                            if(this.payRemain<=0){
                                this.payRemain = 0;
                                this.isPromit = true;
                                item.isSelect = !item.isSelect;
                                setTimeout(() => {
                                    this.isPromit = false;
                                }, 2000);
                                return;
                            }
                            for (let i = 0; i < this.totalList.length; i++) {
                                if(i!=index){
                                    this.totalList[i].isSelect = false;
                                }
                            }
                            if(item.isSelect){
                                this.payRemain = 0;
                            }else{
                                this.payRemain = this.productTypePriceList.totalPrice;
                            }
                            if(this.payRemain<=0){
                                this.isPromit = true;
                                setTimeout(() => {
                                    this.isPromit = false;
                                }, 2000);
                                return;
                            }
                        }else if(item.couponRightType == 'RIGHT_FAVOUR_QUANTITY'){//免几份
                            if(item.isSelect){//勾选
                                if(this.payRemain<=0){
                                    this.payRemain = 0;
                                    this.isPromit = true;
                                    item.isSelect = !item.isSelect;
                                    setTimeout(() => {
                                        this.isPromit = false;
                                    }, 2000);
                                    return;
                                }
                                let amount = 0;
                                for (let i = 0; i < this.totalList.length; i++) {
                                    if(this.totalList[i].isSelect&&this.totalList[i].couponId==item.couponId&&this.totalList[i].couponRightType =='RIGHT_FAVOUR_QUANTITY'){
                                        amount = amount + this.totalList[i].rightObject;
                                    }
                                }
                                this.computePrice(amount);
                                
                            }else{//取消
                                let num = 0;
                                for (let i = 0; i < this.totalList.length; i++) {
                                    if(this.totalList[i].isSelect&&this.totalList[i].couponId==item.couponId&&this.totalList[i].couponRightType =='RIGHT_FAVOUR_QUANTITY'){
                                        num = num + this.totalList[i].rightObject;
                                    }
                                }
                                this.computePrice(num);
                            }
                        }else if(item.couponRightType == 'RIGHT_FAVOUR_WHOLE'){//满减
                            if(item.isSelect){//勾选
                                if(this.payRemain<=0){
                                    this.payRemain = 0;
                                    this.isPromit = true;
                                    item.isSelect = !item.isSelect;
                                    setTimeout(() => {
                                        this.isPromit = false;
                                    }, 2000);
                                    return;
                                }
                                let amount = 0;
                                for (let i = 0; i < this.totalList.length; i++) {
                                    if(this.totalList[i].isSelect&&this.totalList[i].couponId==item.couponId&&this.totalList[i].couponRightType =='RIGHT_FAVOUR_WHOLE'){
                                        amount = amount + this.totalList[i].rightObject;
                                    }
                                }
                                this.wholeComputePrice(amount);
                                
                            }else{//取消
                                let num = 0;
                                for (let i = 0; i < this.totalList.length; i++) {
                                    if(this.totalList[i].isSelect&&this.totalList[i].couponId==item.couponId&&this.totalList[i].couponRightType =='RIGHT_FAVOUR_WHOLE'){
                                        num = num + this.totalList[i].rightObject;
                                    }
                                }
                                this.wholeComputePrice(num);
                            }

                        }

                    }
                }
            },

            selectBtn(){
                let list = this.totalList;
                list=JSON.parse(JSON.stringify(list));
                if(this.$route.params.type == 'insurance'){
                   let obj = {
                       key :'rightInsurance',
                       val : list
                   };
                   this.initData(obj);
                }else if(this.$route.params.type == 'transfer'){
                   let obj = {
                       key :'trafficTransfer',
                       val : list
                   };
                   this.initData(obj);
                }else if(this.$route.params.type == 'airportVip'){
                   let obj = {
                       key :'airportVipLounge',
                       val : list
                   };
                   this.initData(obj);
                }else if(this.$route.params.type == 'invincible'){
                   let obj = {
                       key :'invincibleList',
                       val : list
                   };
                   this.initData(obj);
                }
                this.$router.push(`/${this.$parent.baseUrlPath}/orderForm`);
            },

            computePrice(num){
                this.payRemain = this.productTypePriceList.totalPrice;
                let rLength = 0;
                for (let i = 0; i < this.productTypePriceList.priceList.length; i++) {
                    if(this.$route.params.type == 'insurance'){
                        var price = this.productTypePriceList.priceList[i] * this.productTypePriceList.presonsAmount * this.productTypePriceList.flightInfo;//当前总价
                    }else if(this.$route.params.type == 'airportVip'){
                        var price = this.productTypePriceList.priceList[i] * this.productTypePriceList.presonsAmount;//当前总价
                    }else if(this.$route.params.type == 'transfer'){
                        var price = this.productTypePriceList.priceList[i];//当前总价
                    }
                    if(num - rLength<=0){
                        break;
                    }
                    var listPrice = this.productTypePriceList.priceList[i] * (num - rLength);//当前可免总金额
                    if (listPrice <= price) {
                        this.payRemain = this.payRemain - listPrice;
                    } else {
                        this.payRemain = this.payRemain - price;
                    }
                    if(this.$route.params.type == 'insurance'){
                        rLength = rLength + this.productTypePriceList.presonsAmount * this.productTypePriceList.flightInfo;
                    }else if(this.$route.params.type == 'airportVip'){
                        rLength = rLength + this.productTypePriceList.presonsAmount;
                    }else if(this.$route.params.type == 'transfer'){
                        rLength = rLength + 1;
                    }
                    if (this.payRemain <= 0) {
                        this.payRemain = 0;
                        this.isPromit = true;
                        setTimeout(() => {
                            this.isPromit = false;
                        }, 2000);
                        break;
                    }
                }
            },

            wholeComputePrice(num){
                this.payRemain = this.productTypePriceList.totalPrice;
                this.payRemain = this.payRemain - num;
                if (this.payRemain <= 0) {
                    this.payRemain = 0;
                    this.isPromit = true;
                    setTimeout(() => {
                        this.isPromit = false;
                    }, 2000);
                }
            },

            //计算权益券已抵金额
            couponRightPrice(arr,price,type){
                if(type != 'invincible'){
                    let amount = 0,num = 0;
                    for (let i = 0; i < arr.length; i++) {
                        if(arr[i].isSelect && arr[i].couponRightType == 'RIGHT_FAVOUR_FREE'){//全免
                            amount = price;
                            break;
                        }else if(arr[i].isSelect && arr[i].couponRightType == 'RIGHT_FAVOUR_QUANTITY'){//免几份
                            num += (+arr[i].rightObject);
                        }else if(arr[i].isSelect && arr[i].couponRightType == 'RIGHT_FAVOUR_WHOLE'){//满减
                            amount += (+arr[i].rightObject);
                        }
                    }
                    if(num>0){
                        let payMoney = this.computePrices(type,num,this.productTypePriceList.totalPrice,this.productTypePriceList.priceList);
                        amount = +(this.productTypePriceList.totalPrice - payMoney);
                    }
                    return amount;
                }else{
                    let amount = 0;
                    for (let i = 0; i < arr.length; i++) {
                        if(arr[i].isSelect){
                            amount += (+arr[i].discountAmount);
                        }
                    }
                    return amount;
                }
                
            },

            //还需付的金额
            computePrices(type,num,totalPrice,priceList){
                let payRemain = totalPrice;
                let rLength = 0;
                for (let i = 0; i < priceList.length; i++) {
                    if(type == 'insurance'){
                        var price = priceList[i] * this.selectedPersons.length * this.productTypePriceList.flightInfo;//当前总价
                    }else if(type == 'airportVip'){
					    var price = priceList[i] * this.selectedPersons.length;//当前总价
                    }else if(type == 'transfer'){
                        var price = priceList[i];//当前总价
                    }
                    if(num - rLength<=0){
                        break;
                    }
                    var listPrice = priceList[i] * (num - rLength);//当前可免总金额
                    if (listPrice <= price) {
                        payRemain = payRemain - listPrice;
                    } else {
                        payRemain = payRemain - price;
                    }
                    if(type == 'insurance'){
                        rLength = rLength + this.selectedPersons.length * this.productTypePriceList.flightInfo;
                    }else if(type == 'airportVip'){
                        rLength = rLength + this.selectedPersons.length;
                    }else if(type == 'transfer'){
                        rLength = rLength + 1;
                    }
                    if (payRemain <= 0) {
                        payRemain = 0;
                        break;
                    }
                }
                return payRemain;
            },

            showCouponDetail(cp){
				let obj = {
					name:cp.couponName,
					endTime:cp.beginTime.split(" ")[0]+'至'+cp.endTime.split(" ")[0],
					code:cp.couponCode
				};
				this.selectCoupon = obj;
				this.showFaq = true;
			},

			closeDetail(){
				this.showFaq = false;
			}
        },

        computed:{
            ...mapState([
                'invincibleList',//无敌券列表
                'rightInsurance',//保险权益券券列表
                'trafficTransfer',//接送机权益券列表
                'airportVipLounge',//贵宾室权益券列表
                'productTypePriceList',//所选增值产品
                'selectedPersons',//人数
            ])
        },

        activated(){
            this.type = this.$route.params.type;
            if(this.type == 'invincible'){
                this.depart = '选择无敌券';
            }else{
                this.depart = '选择权益券';
            }
            let totalList = [];
            if(this.$route.params.type == 'insurance'){
                totalList = JSON.parse(JSON.stringify(this.rightInsurance));
            }else if(this.$route.params.type == 'transfer'){
                totalList = JSON.parse(JSON.stringify(this.trafficTransfer));
            }else if(this.$route.params.type == 'airportVip'){
                totalList = JSON.parse(JSON.stringify(this.airportVipLounge));
            }else if(this.$route.params.type == 'invincible'){
                totalList = JSON.parse(JSON.stringify(this.invincibleList));
            }
           
            this.totalList = this.compareCouponList(totalList);
            console.log(this.totalList);
            let rightPrice = this.couponRightPrice(this.totalList,this.productTypePriceList.totalPrice,this.type);
            this.payRemain = +(this.productTypePriceList.totalPrice - rightPrice);
            if (this.payRemain <= 0) {
                this.payRemain = 0;
            }
        },
    }
</script>

<style lang="scss" scoped>
@import '../../style/mixin';

.flight_equity{
    position: relative;
    @include wh(100%,100%);
    .equity_user{
        width:100%;
        height:1rem;
        background:#fff;
        position: relative;
        input{
            display: inline-block;
            width:75%;
            height: 1rem;
            padding-left: 0.5rem;
            color:#bbbbbb;
            font-size: 0.28rem;
        }
        span{
            display: inline-block;
            width:1.66rem;
            height:0.8rem;
            background: url('//m.lvmama.com/flight/image/user_btn.png') no-repeat;
            background-size: 100%;
            position: absolute;
            top:50%;
            transform: translateY(-50%);
            right:0.2rem;
            text-align: center;
            color: #fff;
            line-height: 0.8rem;
        }
    }
    .equity_invincible{
        width: 100%;
        height: 0.8rem;
        line-height: 0.8rem;
        padding-left: 0.2rem;
        > p{
            > span{
                font-size: 0.24rem;
                color: #999999;
            }
        }
    }
    .voucher_content{
        width: 100%;
        height:100%;
        position: relative;
        .in_content{
            width: 100%;
            position: absolute;
            top: 0;
            left: 0;
            bottom: 28%;
            -webkit-overflow-scrolling: touch;
            overflow: hidden;
            overflow-y: scroll;
            ul{
                width: 7.1rem;
                height: 1.6rem;
                background: url('//m.lvmama.com/flight/image/invincible_bg.png') no-repeat;
                background-size: 100%;
                margin: 0 0.2rem;
                margin-bottom: 0.2rem;
                li:nth-child(1){
                    width: 5.74rem;
                    height: 1.6rem;
                    float: left;
                    position: relative;
                    .voucher_money{
                        width:1.84rem;
                        position: absolute;
                        top: 50%;
                        transform: translateY(-50%);
                        left: 0.06rem;
                        text-align: center;
                        i{
                            color:#ff6600;
                            font-size: 0.24rem;
                        }
                        span{
                            font-size: 0.6rem;
                            color:#ff6600;
                        }
                        .special{
                            font-size: 0.4rem;
                        }
                        em{
                            display: block;
                            color:#ff6600;
                            font-size: 0.24rem;
                        }
                    }
                    .voucher_name{
                        width:3.68rem;
                        position: absolute;
                        top: 50%;
                        transform: translateY(-50%);
                        left: 33%;
                        p:nth-child(1){
                            font-size: 0.3rem;
                            color: #333333;
                            width: 3.4rem;
                            overflow: hidden;
                            text-overflow: ellipsis;
                            white-space: nowrap;
                        }
                        p:nth-child(2){
                            span{
                                font-size: 0.24rem;
                                color: #999999;
                            }
                        }
                        em{
                            display: inline-block;
                            width:0.16rem;
                            height:0.26rem;
                            background: url('//m.lvmama.com/flight/image/herf_arrow.png') no-repeat;
                            background-size: 100%;
                            position: absolute;
                            top:50%;
                            transform: translateY(-50%);
                            -webkit-transform: translateY(-50%);
                            right:0.1rem;
                        }
                    }
                }
                li:nth-child(2){
                    width: 1.36rem;
                    height: 1.6rem;
                    float: right;
                    position: relative;
                    .voucher_select{
                        @include wh(0.36rem,0.36rem);
                        display: block;
                        background: url(//m.lvmama.com/flight/image/multiUnPicked.png) 0 0 no-repeat;
                        background-size: 100% 100%;
                    }
                    .voucher_change{
                        background: url(//m.lvmama.com/flight/image/multiPicked.png) 0 0 no-repeat;
                        background-size: 100% 100%;
                    }
                }
            }
            .equity_content{
                width:7.1rem;
                height:auto;
                background:#f1f1f1;
                border-radius: 3px;
                margin: 0 0.2rem;
                margin-bottom: 0.2rem;
                padding: 0;
                li:nth-child(1){
                    border-top:0;
                }
                li{
                    position: relative;
                    width:7.1rem;
                    height:1.6rem;
                    border-top: 1px dashed #e5e5e5;
                    background: #fff;
                    .split_icon{
                        display: inherit;
                        width: 0.25rem;
                        height: 0.25rem;
                        position: absolute;
                        right: 1.3rem;
                        background: #f1f1f1;
                        border-radius: 50%;
                        top: -7px;
                    }
                    .isPre{
                        display: inherit;
                        width: 0.25rem;
                        height: 0.25rem;
                        position: absolute;
                        right: 1.3rem;
                        background: #f1f1f1;
                        border-radius: 50%;
                        bottom: -7px;
                    }
                    .equity_left{
                        width: 5.74rem;
                        height: 1.6rem;
                        float: left;
                        position: relative;
                        .voucher_money{
                            width:1.84rem;
                            position: absolute;
                            top: 50%;
                            transform: translateY(-50%);
                            left: 0.06rem;
                            text-align: center;
                            i{
                                color:#ff6600;
                                font-size: 0.24rem;
                            }
                            span{
                                font-size: 0.6rem;
                                color:#ff6600;
                            }
                            .special{
                                font-size: 0.4rem;
                            }
                            em{
                                display: block;
                                color:#ff6600;
                                font-size: 0.24rem;
                            }
                        }
                        .voucher_name{
                            width:3.68rem;
                            position: absolute;
                            top: 50%;
                            transform: translateY(-50%);
                            left: 33%;
                            p:nth-child(1){
                                font-size: 0.3rem;
                                color: #333333;
                                width: 3.4rem;
                                overflow: hidden;
                                text-overflow: ellipsis;
                                white-space: nowrap;
                            }
                            p:nth-child(2){
                                span{
                                    font-size: 0.24rem;
                                    color: #999999;
                                }
                            }
                            em{
                                display: inline-block;
                                width:0.16rem;
                                height:0.26rem;
                                background: url('//m.lvmama.com/flight/image/herf_arrow.png') no-repeat;
                                background-size: 100%;
                                position: absolute;
                                top:50%;
                                transform: translateY(-50%);
                                right:0.1rem;
                            }
                        }
                    }
                    .equity_right{
                        width: 1.36rem;
                        height: 1.6rem;
                        float: right;
                        position: relative;
                        .voucher_select{
                            @include wh(0.36rem,0.36rem);
                            display: block;
                            background: url(//m.lvmama.com/flight/image/multiUnPicked.png) 0 0 no-repeat;
                            background-size: 100% 100%;
                        }
                        .voucher_change{
                            background: url(//m.lvmama.com/flight/image/multiPicked.png) 0 0 no-repeat;
                            background-size: 100% 100%;
                        }
                    }
                }
                .isLast{
                    margin-top: 10px;
                    border-top: 0;
                }
                .top_radius{
                    border-top-left-radius: 0.1rem;
                    border-top-right-radius: 0.1rem;
                }
                .bottom_radius{
                    border-bottom-left-radius: 0.1rem;
                    border-bottom-right-radius: 0.1rem;
                }
            }
            .voucher_end{
                font-size: 0.24rem;
                color:#999999;
                text-align: center;
            }
        }
    }
    .voucher_btn{
        width:7.02rem;
        height:1rem;
        background-image: linear-gradient(156deg, #FF7F6A 0%, #FD3C71 100%);
        position: absolute;
        bottom: 0.3rem;
        margin: 0 0.2rem;
        font-size: 0.36rem;
        color: #fff;
        text-align: center;
        line-height: 1rem;
        border-radius: 0.9rem;
    }
    .newNetwork{
        width: 100%;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
        z-index: 1000;
        text-align: center;
        line-height: 0.88rem;
        height: 0.88rem;
        >span{
            display: inline-block;
            height: 100%;
            max-width: 80%;
            min-width: 50%;
            font-size: .24rem;
            background: rgba(0,0,0,.5);
            border-radius: 14px;
            padding: 0 .2rem;
            color: #fff;
            text-align: center;
            margin: 0 auto;
        }
    }
}
</style>

