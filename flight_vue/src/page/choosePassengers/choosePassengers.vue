<template>
	<div class="choose-passengers-wrap">
		<head-top :depart="depart" :goPage="goPage"></head-top>
		<div class="choose-passengers">
			<div class="add-passenger y_flex between_x_flex" @click="addPassenger">
				<p class="add">
					<span class="add-icon"></span>
					<span class="official">添加乘机人</span>
				</p>
			</div>
			<div class="select-passenger" v-if="passengersInfo.length > 0">
				<div class="selected">
					已添加{{adultNum}}位成人，{{childNum}}位儿童
				</div>
				<div class="orderline"></div>
				<selected-list :messageListInfo="passengersInfo" :kind="kind"
					></selected-list>
			</div>
		</div>
		<div class="info-submit" v-if="passengersInfo.length > 0" @click="goOrderForm">
			<span>完 成</span>
		</div>
		<div v-if="passengersInfo.length == 0" class="info-empty">
			<i></i>
            <span>亲，您还没有乘机人信息，<br>请点击上方的“添加乘机人”进行添加吧~</span>
        </div>
		<alert-tip v-if="isShowPop" :tipContent="tipContent" :leftButton="leftButton" :rightButton="rightButton" @closeAlert="closeAlert" @rightHandler="rightHandler"></alert-tip>
	</div>
</template>

<script>
	import { mapActions,mapState } from 'vuex'
	import { getCommonPersonMes } from '../../service/getData'
	import headTop from '../../components/header/head'
	import selectedList from '../../components/common/selected-list-component'
	import alertTip from '../../components/common/alertTip'
	import { setStore,getStore,removeStore,statisticsPersonType,isIDcard } from '../../config/mUtils'

	export default{
		data(){
			return {
				goPage:'toOrderForm',
				passengersInfo:[],
				depart:'选择乘机人',
				rightMenu:'完成',
				tipContent:'',
				leftButton:'',
				rightButton:'',
				isShowPop:false,
				kind:'passenger',
				flightInfo:'',
				headInfo:'',
				adultNum:0,
				childNum:0
			}
		},

		components:{
			headTop,
			selectedList,
			alertTip
		},

		props:[],

		created(){
			
		},

		methods:{
			...mapActions([
				'initData'
			]),

			addPassenger(){
				this.$router.push(`/${this.$parent.baseUrlPath}/addEditPassenger`);
			},

			getCommonPerson(){
	        	var that=this,year,month,day,birthday,ifAdultDate,headInfo,departureDate,persons=[],isadult=0,commonPersonMes=[];
	        	getCommonPersonMes().then((res) => {
		        	if (+res.code === 1) {
		            	commonPersonMes=res.data;
		            	if(commonPersonMes.length>0){
		            		for(let i=0;i<commonPersonMes.length;i++){
		            			commonPersonMes[i].isChecked=false;
		            			persons=that.selectedPersons||[];
	                            if(persons.length!=0){
	                                for(let j=0;j<persons.length;j++){
	                                    if(persons[j].receiverId==commonPersonMes[i].receiverId){
	                                        commonPersonMes[i].isChecked=true;
	                                    }
	                                    if(persons[j].certType=="ID"||persons[j].certType.replace(/\ /g,'')=="ID_CARD"){
	                                        year = persons[j].certNo.substring(6, 10);
	                                        month = persons[j].certNo.substring(10, 12);
	                                        day = persons[j].certNo.substring(12, 14);
	                                        if(Number(year)+Number(that.flightInfo[0].minAdultAge || 12)+ "-" + month + "-" + day<=that.headInfo[0].departureDate){
	                                            isadult+=1;
	                                        }
	                                    }else{
	                                        if(Number(persons[j].birthday.substring(0,4))+Number(that.flightInfo[0].minAdultAge || 12)+persons[j].birthday.substring(4,10)<=that.headInfo[0].departureDate){
	                                            isadult+=1;
	                                        }
	                                    }
	                                }
	                            }
	                          	if(commonPersonMes[i].certType.replace(/\ /g,'')=="ID_CARD"){
	                                commonPersonMes[i].certType="ID"
	                            }else if(commonPersonMes[i].certType.replace(/\ /g,'')=="HUZHAO"){
	                                commonPersonMes[i].certType="PASSPORT"
	                            }
	                            if(commonPersonMes[i].certType=="ID"){
	                                year = commonPersonMes[i].certNo.substring(6, 10);
	                                month = commonPersonMes[i].certNo.substring(10, 12);
	                                day = commonPersonMes[i].certNo.substring(12, 14);
	                                birthday = year + "-" + month + "-" + day;
	                                ifAdultDate=Number(year)+Number(that.flightInfo[0].minAdultAge || 12)+ "-" + month + "-" + day;
	                                headInfo=that.headInfo;
	                                departureDate=headInfo[0].departureDate;
	                                if(ifAdultDate<=departureDate){
	                                    commonPersonMes[i].peopleType = "ADULT";
	                                }else{
	                                    commonPersonMes[i].peopleType = "CHILDREN";
	                                }
	                                commonPersonMes[i].birthday=birthday;
	                            }else{
	                                //成人儿童显示错误bug 逻辑修改
	                                departureDate = that.headInfo[0].departureDate;
	                                let adultDate = Number(commonPersonMes[i].birthday.substring(0,4))+Number(that.flightInfo[0].minAdultAge || 12)+commonPersonMes[i].birthday.substring(4,10);
	                                let childrenDate = Number(commonPersonMes[i].birthday.substring(0,4))+Number(that.flightInfo[0].minChildrenAge || 2)+commonPersonMes[i].birthday.substring(4,10);
	                                // let dd = Number(commonPersonMes[i].birthday.substring(8,10))+14;
	                                // let babyDate = commonPersonMes[i].birthday.substring(0,8)+dd;
	                                if(adultDate<=departureDate){
	                                    commonPersonMes[i].peopleType = "ADULT";
	                                }else{
	                                    commonPersonMes[i].peopleType = "CHILDREN";
	                                }
	                                commonPersonMes[i].birthday=commonPersonMes[i].birthday.substring(0,10);
	                            }
	                            //新增乘客逻辑
	                             if(getStore("flight_addPerson_info")!=null && getStore("flight_addPerson_info")!='undefined'){
	                                let addMes=JSON.parse(getStore("flight_addPerson_info")),addAll=JSON.parse(getStore("addALL"))||[];
	                                if(addMes.peopleType=="CHILD"){
	                                    addMes.peopleType="CHILDREN";
	                                }
	                                if(addMes.receiverName==commonPersonMes[i].receiverName && addMes.certNo==commonPersonMes[i].certNo && addMes.birthday==commonPersonMes[i].birthday){
	                                    let childrenDate=Number(addMes.birthday.substring(0,4)) + Number(that.flightInfo[0].minChildrenAge || 2) + addMes.birthday.substring(4,10),
	                                        oldDate=Number(addMes.birthday.substring(0,4))+Number(that.flightInfo[0].maxAdultAge || 70)+addMes.birthday.substring(4,10),
	                                        adultDates = Number(addMes.birthday.substring(0,4))+Number(that.flightInfo[0].minAdultAge || 12)+addMes.birthday.substring(4,10),
	                                        departureDate = that.headInfo[0].departureDate;
	                                        if(childrenDate <= departureDate && oldDate>departureDate) {
	                                            if(adultDates>departureDate && isadult==0){

	                                            }else{
	                                                commonPersonMes[i].isChecked = true;
	                                                persons.push(commonPersonMes[i]);
	                                                addAll.push(commonPersonMes[i]);
	                                                setStore("addALL",addAll);
	                                            }

	                                        }
	                                        let selectedPersons = {
								              key: 'selectedPersons',
								              val: persons
								          	};
											try{
												that.initData(selectedPersons);
											}catch(e){}  
	                                    // setStore("selectedPersons",JSON.stringify(persons));
	                                	removeStore("flight_addPerson_info");
	                                }

	                            }
	                            let reg=/^[a-zA-Z]+$/;//验证是否为字母
	                            let ter=/^([\u4E00-\u9FA5]+,?)+$/;//验证中文
	                            let regs=/^[0-9a-zA-Z]+$/;//验证是否是数字加中文
	                            if(commonPersonMes[i].certType=="" || commonPersonMes[i].certNo=="" || commonPersonMes[i].birthday=="" || commonPersonMes[i].receiverName == '' ){
	                               commonPersonMes[i].isChecked=-1;
	                            }else if(commonPersonMes[i].certType!="ID" && commonPersonMes[i].certType!="ID_CARD" && commonPersonMes[i].certType!="PASSPORT" && commonPersonMes[i].certType!="HUZHAO" && commonPersonMes[i].certType!="GANGAO" && commonPersonMes[i].certType!="HUIXIANG" && commonPersonMes[i].certType!="TAIBAO" && commonPersonMes[i].certType!="OFFICER"&& commonPersonMes[i].certType!="SOLDIER"&& commonPersonMes[i].certType!="TAIBAOZHENG"&&commonPersonMes[i].certType!="OTHER"&&commonPersonMes[i].certType!="RPGA"&&commonPersonMes[i].certType!="RPTW"&&commonPersonMes[i].certType!="GANGAORESIDENCE"&&commonPersonMes[i].certType!="TAIBAORESIDENCE"){
	                                commonPersonMes[i].isChecked=-1;
	                            }else if(commonPersonMes[i].certType=="ID" || commonPersonMes[i].certType=="ID_CARD"){
	                            	if(!isIDcard(commonPersonMes[i].certNo.toUpperCase())){
	                                	commonPersonMes[i].isChecked=-1;
	                                }
	                            }else if(commonPersonMes[i].certType=='RPGA'||commonPersonMes[i].certType=='RPTW'||commonPersonMes[i].certType=='GANGAORESIDENCE'||commonPersonMes[i].certType=='TAIBAORESIDENCE'){
									if(commonPersonMes[i].certNo.length!=18){
										commonPersonMes[i].isChecked=-1;
									}
								}
								if(commonPersonMes[i].receiverName.length>26 || commonPersonMes[i].receiverName.length<2){
	                            	commonPersonMes[i].isChecked=-1;
	                            }else{
	                            	 if(!regs.test(commonPersonMes[i].certNo)){
				                         commonPersonMes[i].isChecked=-1;
				                     }
	                            }

	                            if(commonPersonMes[i].receiverName.indexOf("/")>=0){
	                                if(commonPersonMes[i].receiverName.indexOf("/")==0){
	                                    commonPersonMes[i].isChecked=-1;
	                                }else{
	                                    if(!reg.test(commonPersonMes[i].receiverName.replace("/","")) || commonPersonMes[i].receiverName.indexOf("/")==commonPersonMes[i].receiverName.length-1){
	                                        commonPersonMes[i].isChecked=-1;
	                                    }
	                                }
	                            }else{
	                                if(!ter.test(commonPersonMes[i].receiverName) && !reg.test(commonPersonMes[i].receiverName.replace(/[\u4e00-\u9fa5]/gi,""))){
	                                    commonPersonMes[i].isChecked=-1;
	                                }
	                                if(reg.test(commonPersonMes[i].receiverName)){
	                                    commonPersonMes[i].isChecked=-1;
	                                }
	                            }
	                            if(commonPersonMes[i].receiverName.indexOf('先生')!=-1||commonPersonMes[i].receiverName.indexOf('女士')!=-1||commonPersonMes[i].receiverName.indexOf('小姐')!=-1){
					                commonPersonMes[i].isChecked=-1;
					            }
		            		}
	            			//判断当前成绩人是否还在常用乘机人列表中
	                        for(var commonPersonMesId=[],n=0;n<commonPersonMes.length;n++){
	                            commonPersonMesId.push(commonPersonMes[n].receiverId);
	                        }
	                        for(var m=0;m<persons.length;m++){
	                            if(commonPersonMesId.indexOf(persons[m].receiverId) == -1){
	                                persons.splice(m,1);
	                                m--;
	                            }
	                        }

	                        if (persons.length!=0) {
	                        	var adultAmount = 0,childAmount = 0;
		                        for(var i=0; i<persons.length;i++){
					                if(persons[i].isChecked==true){
					                    var adult = Number(persons[i].birthday.substring(0,4))+Number(that.flightInfo[0].minAdultAge || 12)+
					                    	persons[i].birthday.substring(4,10);
					                    var child = Number(persons[i].birthday.substring(0,4))+Number(that.flightInfo[0].minChildrenAge || 2)+persons[i].birthday.substring(4,10);

					                    if (departureDate>adult) {
					                        adultAmount=adultAmount+1;
					                        that.adultNum = adultAmount;
					                    }
					                    if (departureDate>=child&&departureDate<adult) {
					                        childAmount=childAmount+1;
					                        that.childNum = childAmount;
					                    }
					                }
					            }
					        }
			            }
		            	let temp = [],addAll=JSON.parse(getStore("addALL"));
	                    if(addAll){
	                        for(let a=0;a<addAll.length;a++){
	                            for (let b = 0; b < commonPersonMes.length; b++) {
	                                if (addAll[a].receiverName==commonPersonMes[b].receiverName && addAll[a].certNo==commonPersonMes[b].certNo && addAll[a].birthday==commonPersonMes[b].birthday) {
	                                    temp.push(commonPersonMes[b]);
	                                    commonPersonMes.splice(b,1);
	                                }
	                            }
	                        }
	                    } 

	                    for (var c = 0; c < temp.length; c++) {
	                        commonPersonMes.unshift(temp[c]);
	                    }
	                    // setStore("commonPersonMes",commonPersonMes);
	                    let commonPerson = {
			              key: 'commonPersonMes',
			              val: commonPersonMes
			          	};
						try{
							that.initData(commonPerson);
						}catch(e){}  
	          			let selectedPersons = {
			              key: 'selectedPersons',
			              val: persons
			          	};
						try{
							that.initData(selectedPersons);
						}catch(e){}  
	                    // setStore("selectedPersons",persons);
	                    that.personTypeMessage=statisticsPersonType();
	                    this.personNumber=JSON.parse(getStore("flight_personNumber"));
	                    // this.computePrice();
	                    // return commonPersonMes;
	                    this.passengersInfo = commonPersonMes;
		          	}
	        	});
        	},

			goOrderForm(){
				var selectedPersons = [];
				for (var i = 0; i < this.passengersInfo.length; i++) {
					if(this.passengersInfo[i].isChecked==true){
						selectedPersons.push(this.passengersInfo[i]);
					}
				}
				let obj = {
					key:'selectedPersons',
					val: selectedPersons
				};
				try{
					this.initData(obj);
				}catch(e){}

				let commonPersonMes = {
					key:'commonPersonMes',
					val:this.passengersInfo
				}
				try{
					this.initData(commonPersonMes);
				}catch(e){}
				this.$router.push(`/${this.$parent.baseUrlPath}/orderForm`);
			}
			
		},

		mounted(){
			
		},
		activated(){
			this.headInfo=JSON.parse(getStore("flight_headInfo"));
			this.flightInfo=JSON.parse(getStore('flightInfo'));
			this.getCommonPerson();

			this.adultNum=0;
			this.childNum=0;
		},

		computed:{
			...mapState([
				'selectedPersons',
				'commonPersonMes'
			])
		}
	}
</script>

<style lang="scss" scoped>
	@import '../../style/mixin';
	.choose-passengers-wrap{
		position: relative;
	    @include wh(100%,100%);
		.orderline{
			@include orderline();
		}
		.choose-passengers{
			@include heightByAbsolute(0.9rem,0);
			margin-top: 0.2rem;
		    overflow: hidden;
		    overflow-y: scroll;
			.add-passenger{
				background: #fff;
			    height: 0.86rem;
			    line-height: 0.86rem;
			    padding-right: 0.2rem;
				box-shadow: 0 0 4px 0 rgba(0,0,0,0.03);
				border-radius: 5px;
				margin: 0 .2rem;
				.add{
					@include cl();
					.add-icon{
						@include wh(0.3rem,0.3rem);
						background: url('//m.lvmama.com/flight/image/addPera.png') no-repeat;
					    background-size: 100%;
					    display: inline-block;
						top: 50%;
						position: absolute;
						transform: translateY(-47%);
					}
					.official{
						@include sc(0.28rem,#666);
						padding-left: 0.4rem;
					}
				}
			}
			.select-passenger{
				background: #fff;
    			padding-left: 0.2rem;
    			padding: 0 .2rem;
				box-shadow: 0 2px 6px 0 rgba(0,0,0,0.05);
				border-radius: 5px;
				margin: .2rem .2rem 1.3rem;
				.selected{
					@include sc(0.24rem,#333);
					height: 0.64rem;
				    line-height: 0.64rem;
					position: relative;
    				margin-left: .4rem;
					>i{
						@include wh(0.24rem,.24rem);
						@include ct();
						margin-left: -0.4rem;
						background: url('//m.lvmama.com/flight/image/prompt.png') no-repeat;
					    background-size: 100%;
					}
				}
			}
		}
		.info-submit{
			@include wh(100%,1.3rem);
			bottom: 0;
			position: absolute;
			background-color: #eeeef5;
			>span{
				@include sc(.36rem,#fff);
				@include wh(95%,.88rem);
				line-height: .88rem;
				margin: .2rem;
				background-image: linear-gradient(90deg, #FE686C 0%, #FD3C71 100%);
				border-radius: 100px;
				bottom: 0;
				position: absolute;
				text-align: center;
			}
		}
		.info-empty{
			@include wh(100%,2rem);
		    background: url('//m.lvmama.com/flight/image/passengerIcon.png') no-repeat;
		    background-size: .5rem;
		    background-position: top center;
		    position: relative;
		    top: 2.6rem;
		    text-align: center;
		    >span {
			    position: relative;
			    top: .8rem;
				@include sc(.26rem,#999);
			}
		}
	}
</style>