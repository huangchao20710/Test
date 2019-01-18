<template>
	<div class="add-passenger-wrap">
		<head-top :depart="depart" :rightMenu="rightMenu"></head-top>
		<div class="add-passenger">
			<div class="add">
				<div class="message y_flex" @click="showNameMes">
					<span class="ask_icon"></span>
					<p>乘机人姓名填写须知</p>
				</div>
				<p class="orderline"></p>
				<div class="message">
					<div class="label">
						<span class="msg-type y_flex">姓名
						</span>
						<div class="name">
							<span class="errorMsg" v-if="nameErr">请填写正确的姓名</span>
							<input type="text" placeholder="请填写乘机人姓名" v-model="personName" @focus="getFocus('name')" @blur="getBlur('name')">
							<span class="clearCon" v-if="isClearName&&personName" @click="clearCon('name')"><i></i></span>
						</div>
					</div>
				</div>
				<p class="orderline"></p>
				<div class="message"> <!-- up_flex -->
					<div class="label">
						<span class="msg-type">证件类型</span>
						<div class="name" @click="showCertificateType"><span class="person-type">{{personCardType.value}}</span>
						</div>
						<span class="point_right_arrow tt_arrow"></span>
					</div>
				</div>
				<p class="orderline"></p>
				<div class="message">
					<div class="label">
						<span class="msg-type y_flex">证件号码
							<!-- <i class="type-icon" @click="showCardMes"></i> -->
						</span>
						<div class="name">
							<span class="errorMsg" v-if="cardErr">请填写正确的证件号码</span>
							<input type="text" placeholder="有效证件且与乘机人证件号码一致" maxlength="18" value="" v-model="personCard" @focus="getFocus('cardNo')" @blur="getBlur('cardNo')">
							<span class="clearCon" v-if="isClearCard&&personCard" @click="clearCon('cardNo')"><i></i></span>
						</div>
					</div>
				</div>
				<p class="orderline"></p>
				<div class="message" v-if="personCardType.type!='ID_CARD' && personCardType.type!='ID'">
					<div class="label">
						<span class="msg-type">出生日期</span>
						<div class="name" @click="showDatePicker">
							<span class="errorMsg" v-if="birthdayerr">请选择出生日期</span>
							<input type="text" v-if="!showTime" value="" placeholder="请选择出生日期" readonly="readonly">
							<span class="person-type" v-if="showTime">{{setTime.year}}-{{setTime.month}}-{{setTime.day}}</span></div>
						<span class="point_right_arrow tt_arrow"></span>
					</div>
				</div>
				<p class="orderline" v-if="personCardType.type!='ID_CARD' && personCardType.type!='ID'"></p>
				<div class="message">
					<div class="label">
						<span class="msg-type">手机号码</span>
						<div class="name">
							<span class="errorMsg" v-if="telErr">请填写正确的手机号码</span>
							<input type="tel" value="" placeholder="选填，用于接收航变信息" v-model="personTel" maxlength="11" @focus="getFocus('tel')" @blur="getBlur('tel')">
							<span class="clearCon" v-if="isClearTel&&personTel" @click="clearCon('tel')"><i></i></span>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="submit_button_container xy_flex">
			<div class="submit_button xy_flex" @click="rightHandler()">完成</div>
		</div>
		<div class="child-ticket">
			<p @click="showChildrenPrice">儿童婴儿购票说明<span></span></p>
		</div>
		<!-- 出生日期 -->
		<date-picker :show="dateTimeStatus" :defaultTime="setTime" :startYear="new Date().getFullYear()-100" :yearRange="100" :minTime="minTime" :maxTime="maxTime"></date-picker>
		<!-- 证件类型 -->
		<certificate-type :showType="certificateTypeState" :personCardType="personCardType"></certificate-type>
		<alert-tip :tipContent="tipContent" :leftButton="leftButton" @closeAlert="closeAlert" @rightHandler="sureAlert" v-if="isShowPop"></alert-tip>
		<children-price :singleFlight="singleFlight" :doubleFlight="doubleFlight" :childrenPriceClose="childrenPriceClose" @onClickChildren="onClickChildren"></children-price>
		<div class="mask" v-show="errorMesClass || childrenPriceClose" @click="hideAlert"></div>
		<div class="matte-2" v-show="errorMesClass">
		    <div class="ticket-know" v-show="nameMesClass">
		        <div>
		            <p>乘机人姓名填写须知</p>
		            <div>
		                <p>
		                    <span>1、</span>
		                    <span class="span-right-detail">简体中文姓名</span>
		                </p>
		                <p class="text-indent">包含生僻字，生僻字及生僻字往后的文字请更换为拼音在提交订单。如“巘”为生僻字：</p>
		                <p class="text-indent">姓名为“巘张俊”请提交“yan/zhangjun“；</p>
		                <p class="text-indent">姓名为“张巘俊”请提交“张yanjun“；</p>
		                <p class="text-indent">姓名为“张俊巘”请提交“张俊yan“。</p>
		                <p class="text-indent">乘机人姓名中包含“先生，女士，小姐”等名字的请联系客服。</p>
		            </div>
		            <div>
		                <p>
		                    <span>2、</span>
		                    <span class="span-right-detail">英文姓名</span>
		                </p>
		                <p class="text-indent">（1）请按照证件上的姓名顺序填写。姓与名中间加”/“，如”Smith/Black“，不区分大小写。</p>
		                <p class="text-indent">（2）英文姓名不超过26个字符，如姓名过长请使用缩写，乘客的姓氏不能缩写，名可以缩写。</p>
		            </div>
		        </div>
		    </div>
		    <div class="ticket-know" v-show="cardMesClass" @click="hideAlert">
		        <div>
		            <p>证件号码填写须知</p>
		            <div>
		                <p>
		                    <span>1、</span>
		                    <span class="span-right-detail">登机证件必须为有效证件原件</span>
		                </p>
		                <p>
		                    <span>2、</span>
		                    <span class="span-right-detail">儿童或婴儿如使用”户口薄“、”出生证明“及”其他“有效证件登机时，有效证件上面的”证件号码“栏如无身份证号可以选择出生年月日，格式为：20080808</span>
		                </p>
		            </div>
		        </div>
		    </div>
		   	<div class="submit_button_container xy_flex">
				<div class="submit_button xy_flex" @click="hideAlert">确定</div>
			</div>
		</div>
	</div>
</template>

<script>
	import headTop from '../../components/header/head'
	import datePicker from '../../components/common/date-picker-component'
	import certificateType from '../../components/common/certificate-type-component'
	import alertTip from '../../components/common/alertTip'
	import childrenPrice from '../../components/common/childrenPrice'
	import { typeFormat,isIDcard,ischeckCard,setStore,getStore,removeStore,addZero } from '../../config/mUtils'
	import { addContact,editContact } from '../../service/getData'
	import { mapActions,mapState } from 'vuex'

	export default{
		data(){
			return {
				flightInfo: '',
				dateTimeStatus: false,
				certificateTypeState: false,
				depart: '',
				rightMenu: '',
				setTime: {
					year:'1990',
					month:'01',
					day:'01'
				},
				minTime: {
					Y: '1918',
					M: '01',
					D: '01'
				},
				maxTime: {
					Y: new Date().getFullYear(),
					M: addZero(new Date().getMonth()+1),
					D: addZero(new Date().getDate())
				},
				personCardType: {
					type:'ID_CARD',
					value:'身份证'
				},
				personName:'',
				personCard:'',
				personTel:'',
				personId:'',
				tipContent:'',
				leftButton:'',
				birthErr:false,
		        cardErr:false,
		        nameErr:false,
		        telErr:false,
		        isShowPop:false,
		        errorMesClass:false,
		        nameMesClass:false,
		        cardMesClass:false,
		        singleFlight:'',
		        doubleFlight:'',
		        childrenPriceClose:false,
		        isClearName:false,
		        isClearCard:false,
				isClearTel:false,
				showTime:false,
				birthdayerr:false,
			}
		},

		props:[],

		components:{
			headTop,
			datePicker,
			certificateType,
			alertTip,
			childrenPrice
		},

		methods:{
			...mapActions([
					'initData'
				]),

			showDatePicker(){
				this.dateTimeStatus = true;
			},
			showCertificateType(){
				this.certificateTypeState = true;
			},

			//校验乘机人数量，年龄是否合规
	        checkPeopleProvisions(addMes){
	        	if(addMes.peopleType=="CHILD"){
                    addMes.peopleType="CHILDREN";
                }
	        	let selectedPersons=this.selectedPersons;
	        	let number=0,adultNum=0,childNum=0;
	        	let headInfo=JSON.parse(localStorage.getItem("flight_headInfo"));
		        let departureDate=headInfo[0].departureDate;
		        let flightLastNumber= this.singleFlight.inventoryCount;
		        if(this.singleFlight.inventoryCount>this.doubleFlight.inventoryCount){
					flightLastNumber = this.doubleFlight.inventoryCount;
				}
	            let flag=true;
	            if(selectedPersons!=null && selectedPersons!='' && selectedPersons.length>0){
	            	selectedPersons.push(addMes);
	            	if (selectedPersons.length<=flightLastNumber) {
		            	for(let i=0;i<selectedPersons.length;i++){
		            		if(selectedPersons[i].certType=="ID"){
				                let year =selectedPersons[i].certNo.substring(6, 10),
				                    month = selectedPersons[i].certNo.substring(10, 12),
				                    day = selectedPersons[i].certNo.substring(12, 14);
				                // 出生日期强制按身份证计算
				                selectedPersons[i].birthday=year+"-"+month+"-"+day;
				            }
				            let adultDate=Number(selectedPersons[i].birthday.substring(0,4))+Number(this.singleFlight.minAdultAge || 12)+selectedPersons[i].birthday.substring(4,10);
				            let childrenDate=Number(selectedPersons[i].birthday.substring(0,4))+Number(this.singleFlight.minChildrenAge || 2)+selectedPersons[i].birthday.substring(4,10);
				            let oldDate=Number(selectedPersons[i].birthday.substring(0,4))+Number(this.singleFlight.maxAdultAge || 70)+selectedPersons[i].birthday.substring(4,10);
				            let dd=Number(selectedPersons[i].birthday.substring(8,10))+14;
				            let babyDate=selectedPersons[i].birthday.substring(0,8)+dd;
				            if(childrenDate>departureDate&&departureDate>=babyDate){//婴儿
								flag=false;
				                break;
				            }
				            if(departureDate<babyDate){
				                flag=false;
				                break;
				            }
				            if(oldDate<=departureDate){
				                flag=false;
				                break;
				            }
				            number=number+1;
		                    let adult = Number(selectedPersons[i].birthday.substring(0,4))+Number(this.singleFlight.minAdultAge || 12)+selectedPersons[i].birthday.substring(4,10);
		                    let child = Number(selectedPersons[i].birthday.substring(0,4))+Number(this.singleFlight.minChildrenAge || 2)+selectedPersons[i].birthday.substring(4,10);

		                    if (departureDate>adult) {
		                        adultNum=adultNum+1;
		                    }
		                    if (departureDate>=child&&departureDate<adult) {
		                        childNum=childNum+1;
		                    }
		            	}
		            	//最多人数
			            if(number>this.singleFlight.maxPassenger){
							flag=false;
			            }else if(this.doubleFlight!=null && number>this.doubleFlight.maxPassenger){
			            	flag=false;
			            }else if(adultNum>this.singleFlight.maxAdultNumber){//最多成人数
			            	flag=false;
			            }else if(this.doubleFlight!=null && adultNum>this.doubleFlight.maxAdultNumber){
							flag=false;
			            }else if(childNum>this.singleFlight.maxChildrenNumber){//最多儿童数
			            	flag=false;
			            }else if(this.doubleFlight!=null && childNum>this.doubleFlight.maxChildrenNumber){
							flag=false;
			            }else if(adultNum>0&&childNum>adultNum*this.singleFlight.childrenNumber){//成人最多携带儿童数量
			            	flag=false;
			            }else if(this.doubleFlight!=null && adultNum>0&&childNum>adultNum*this.doubleFlight.childrenNumber){
			            	flag=false;
			            }else if((this.doubleFlight==null && this.singleFlight.childrenSalePrice<=0)||(this.doubleFlight!=null && (this.singleFlight.childrenSalePrice<=0 || this.doubleFlight.childrenSalePrice<=0))&&childNum>0){
			            	flag=false;
			            }
		            	if(flag==false){
		            		
		            	}else{
		            		setStore('flight_addPerson_info',JSON.stringify(addMes));
		            	}
		            }
		        }else{
		            setStore('flight_addPerson_info',JSON.stringify(addMes));
	            }
	        },

			//添加-编辑乘机人
			rightHandler(){
				this.birthErr=false;
		        this.cardErr=false;
		        this.nameErr=false;
				this.telErr=false;
				this.birthdayerr=false;

				let that = this,
					id = this.personId,
					peopleType="",
					birthday,
					cellPhone,
					gender = 'MALE',
					cardType = this.personCardType.type,
					cardNo = this.personCard,
					name = this.personName,
					mobileNumber = this.personTel;
				var editPersonMes = JSON.parse(getStore('editPersonMes'));
				
				if (this.personCardType.type != 'ID_CARD' && this.personCardType.type != 'ID') {
					if(!that.showTime){
						that.birthdayerr=true;
					}
					birthday = `${this.setTime.year}-${this.setTime.month}-${this.setTime.day}`;
				}else{
					var year = cardNo.substring(6, 10);
		            var month = cardNo.substring(10, 12);
		            var day = cardNo.substring(12, 14);

					birthday = `${year}-${month}-${day}`;
				}
		
		       if(name!=null){
		           name=name.replace(/\s/g,"");
		       }
		       if(cardType!=null){
		           cardType=cardType.replace(/\s/g,"");
		       }else{
		           cardType="ID";
		       }
		       if(cardNo!=null){
		           cardNo=cardNo.replace(/\s/g,"");
		       }else{
		           cardNo="";
		       }
		       if(mobileNumber!=null){
		           mobileNumber= mobileNumber.replace(/\s/g,'');
		       }
		       
		       //此处模拟数据库信息操作，应添加判断是否为同一乘客操作。
		       if (this.commonPersonMes.length>0) {
			       for (let i = 0; i < this.commonPersonMes.length; i++) {
			            if (editPersonMes) {
			            	if (this.commonPersonMes[i].certNo == cardNo && this.commonPersonMes[i].certType == cardType && this.commonPersonMes[i].receiverId != editPersonMes.receiverId) {
				                this.tipContent = `证件号不能相同:${this.commonPersonMes[i].certNo}`;
				                this.isShowPop = true;
			                    setTimeout(() => {
			                   		this.isShowPop = false;
			                    },2000);
				                return;
				            }
				           	if (cardType == 'HUZHAO' || cardType == 'PASSPORT') {
				               if (this.commonPersonMes[i].certNo == cardNo && (this.commonPersonMes[i].certType == 'HUZHAO' || this.commonPersonMes[i].certType == 'PASSPORT') && this.commonPersonMes[i].receiverId != editPersonMes.receiverId) {
				                   this.tipContent = `证件号不能相同:${this.commonPersonMes[i].certNo}`;
				                   this.isShowPop = true;
				                   setTimeout(() => {
				                   		this.isShowPop = false;
				                   },2000);
				                   return;
				                }
				            }
				            if (cardType == 'ID_CARD' || cardType == 'ID') {
				                if (this.commonPersonMes[i].certNo == cardNo && (this.commonPersonMes[i].certType == 'ID_CARD' || this.commonPersonMes[i].certType == 'ID') && this.commonPersonMes[i].receiverId != editPersonMes.receiverId) {
				               	    this.tipContent = `证件号不能相同:${this.commonPersonMes[i].certNo}`;
				                    this.isShowPop = true;
				                    setTimeout(() => {
				                   		this.isShowPop = false;
				                    },2000);
				                    return;
				                }
				            }
			            }else{
			            	if (this.commonPersonMes[i].certNo == cardNo && this.commonPersonMes[i].certType == cardType) {
				                this.tipContent = `证件号不能相同:${this.commonPersonMes[i].certNo}`;
				                this.isShowPop = true;
			                    setTimeout(() => {
			                   		this.isShowPop = false;
			                    },2000);
				                return;
				            }
				           	if (cardType == 'HUZHAO' || cardType == 'PASSPORT') {
				               if (this.commonPersonMes[i].certNo == cardNo && (this.commonPersonMes[i].certType == 'HUZHAO' || this.commonPersonMes[i].certType == 'PASSPORT')) {
				                   this.tipContent = `证件号不能相同:${this.commonPersonMes[i].certNo}`;
				                   this.isShowPop = true;
				                   setTimeout(() => {
				                   		this.isShowPop = false;
				                   },2000);
				                   return;
				               }
				           }
				           if (cardType == 'ID_CARD' || cardType == 'ID') {
				               if (this.commonPersonMes[i].certNo == cardNo && (this.commonPersonMes[i].certType == 'ID_CARD' || this.commonPersonMes[i].certType == 'ID')) {
				               	   this.tipContent = `证件号不能相同:${this.commonPersonMes[i].certNo}`;
				                   this.isShowPop = true;
				                   setTimeout(() => {
				                   		this.isShowPop = false;
				                   },2000);
				                   return;
				               }
				           }

			           }
			        }
		    	}

		       let valRE = /^\d{11}$/;
		       let reg=/^[a-zA-Z]+$/;//验证是否为字母
		       let ter=/^([\u4E00-\u9FA5]+,?)+$/;//验证中文
		       if(name==null||name==""){
		          this.nameErr=true;
		       }else{
		           if(name.length>26 || name.length<2){
		               this.nameErr=true;
		           }else if(name.indexOf("/")>=0){
		               if(name.indexOf("/")==0){
		                   this.nameErr=true;
		               }else{
		                   if(!reg.test(name.replace("/","")) || name.indexOf("/")==name.length-1){
		                       this.nameErr=true;
		                   }
		               }
		           }else{
		               if(!ter.test(name) && !reg.test(name.replace(/[\u4e00-\u9fa5]/gi,""))){
		                   this.nameErr=true;
		               }
		               if(reg.test(name)){
		                   this.nameErr=true;
		               }
		           }
		           if(name.indexOf('先生')!=-1||name.indexOf('女士')!=-1||name.indexOf('小姐')!=-1){
		               this.nameErr=true;
		           }
		       }

		       if (mobileNumber!=null && mobileNumber!='') {
		           if (!valRE.test(mobileNumber.replace(/\s/g,''))) {
		               this.telErr=true;
		           }
		       }
		       //var IDValRE = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
		       var IDValRE=/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[0|1|2])(0[1-9]|[1|2]\d|3[0|1])\d{3}(\d|X)$/;
		       if(cardType=='ID' || cardType == 'ID_CARD'){
		           cardType = 'ID_CARD';
		           cardNo=cardNo.toLocaleUpperCase();
		           if(!IDValRE.test(cardNo.toLocaleUpperCase()) || !isIDcard(cardNo.toLocaleUpperCase())){
		               this.cardErr=true;
		           }
		       }else if(cardType=='PASSPORT'){
		           cardType = 'HUZHAO';
		       }else if(cardType=='RPGA'||cardType=='RPTW'||cardType=='GANGAORESIDENCE'||cardType=='TAIBAORESIDENCE'){
				   if(cardNo.length!=18){
					   this.cardErr=true;
				   }
			   }
		       
		        if(!ischeckCard(cardNo)){
		           this.cardErr=true;
		        }
		       
		       var dateValRE = /^((?:19|20)\d\d)-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/;//出生日期验证
		       var adultDate,childrenDate,babyDate,oldDate;
		       var headInfo=JSON.parse(localStorage.getItem("flight_headInfo"));
		       var departureDate=headInfo[0].departureDate;
		       if(cardType=="ID" || cardType=="ID_CARD"){
		           var year = cardNo.substring(6, 10);
		           var month = cardNo.substring(10, 12);
		           var day = cardNo.substring(12, 14);
		           var date = year + "-" + month + "-" + day;
		           adultDate=Number(year)+Number(this.singleFlight.minAdultAge || 12)+ "-" + month + "-" + day;
		           childrenDate=Number(year)+Number(this.singleFlight.minChildrenAge || 2)+ "-" + month + "-" + day;
				   oldDate=Number(year)+Number(this.singleFlight.maxAdultAge || 70)+ "-" + month + "-" + day;
				   var dd=Number(date.substring(8,10))+14;
				   babyDate=date.substring(0,8)+dd;
		       }else{
		           if(!dateValRE.test(birthday)){
		               this.birthErr=true;
		           }else{
		               adultDate=Number(birthday.substring(0,4))+Number(this.singleFlight.minAdultAge || 12)+birthday.substring(4,10);
					   childrenDate=Number(birthday.substring(0,4))+Number(this.singleFlight.minChildrenAge || 2)+birthday.substring(4,10);
					   oldDate=Number(birthday.substring(0,4))+Number(this.singleFlight.maxAdultAge || 70)+birthday.substring(4,10);
					   var dd=Number(birthday.substring(8,10))+14;
					   babyDate=birthday.substring(0,8)+dd;
		           }
		       }
		       if(adultDate<=departureDate){
		           peopleType='ADULT';
		       }else{
		           peopleType='CHILD';
		       }
		       if (editPersonMes) {
			       	if (oldDate<=departureDate) {//老人
			            this.tipContent = `友情提醒：超过${this.singleFlight.maxAdultAge || 70}岁的乘机人，请联系航空公司购票！`;
			            this.leftButton="确定";
						this.isShowPop = true;
			            return;
			        }

			        if (childrenDate>departureDate&&departureDate>=babyDate) {//婴儿
			            this.tipContent = `友情提示：预订婴儿票（0-${this.singleFlight.minChildrenAge || 2}岁），请联系航空公司购票！`;
			            this.leftButton="确定";
						this.isShowPop = true;
			            return;
			        }
		       }
		       // if (peopleType == 'CHILD' && $rootScope.notSupportChildren) {
		       //      $scope.showErrorMessage('该航班暂不支持儿童票购买！');
		       //      return;
		       //  };
		       if(this.birthErr||this.cardErr||this.nameErr || this.telErr || this.birthdayerr){
		           return;
		       }
		       	
		       if (this.personId) {
		       		//编辑乘机人
		       		console.log(111);
		       		editContact(name,gender,cardType,cardNo,birthday,peopleType,mobileNumber,id).then((res) => {
		       			removeStore("editPersonMes");
		       			if (res.code==1) {
		       				this.$router.go(-1);
		       				// that.$router.push("/vflight/choosePassenger");
		       			}
		       		})
		       }else{
		       		//新增乘机人
		       		console.log(222);
		       		addContact(name,gender,cardType,cardNo,birthday,peopleType,cellPhone,mobileNumber).then((res) => {
						let addPersonObj = {
		                    "receiverName":name,
		                    "receiverGender":gender,//TODO 默认男。
		                    "certType":cardType,
		                    "certNo":cardNo,
		                    "birthday":birthday,
		                    "peopleType":peopleType,
		                    "mobileNumber":mobileNumber
						};
						if (res.code==1) {
							// setStore('flight_addPerson_info',JSON.stringify(addPersonObj));
							this.checkPeopleProvisions(addPersonObj);
							this.$router.go(-1);
		       				// that.$router.push("/vflight/choosePassenger");
		       			}
					})
		       }
		       

			},

			showNameMes(){
				this.errorMesClass=true;
		        this.nameMesClass=true;
			},

			showCardMes(){
				this.errorMesClass=true;
		        this.cardMesClass=true;
			},

			hideAlert(){
				this.errorMesClass=false;
		        this.nameMesClass=false;
				this.cardMesClass=false;
				this.childrenPriceClose = false;
			},

			onClickChildren(){
				this.childrenPriceClose = false;
			},

			showChildrenPrice(){
				this.childrenPriceClose = true;
			},

			getFocus(type){
				if (type=='name') {
					this.isClearName=true;
				}else if(type=='cardNo'){
					this.isClearCard=true;
				}else if(type=='tel'){
					this.isClearTel=true;
				}
			},

			getBlur(type){
				if (type=='name') {
					setTimeout(() => {
						this.isClearName=false;
					},50);
				}else if(type=='cardNo'){
					setTimeout(() => {
						this.isClearCard=false;
					},50);
				}else if(type=='tel'){
					setTimeout(() => {
						this.isClearTel=false;
					},50);
				}
			},

			clearCon(type){
				if (type=='name') {
					this.isClearName=false;
					this.personName = '';
				}else if(type=='cardNo'){
					this.isClearCard=false;
					this.personCard = '';
				}else if(type=='tel'){
					this.isClearTel=false;
					this.personTel = '';
				}
			},

			closeAlert(){
				this.isShowPop = false;
			},

			sureAlert(){

			}
		},

		created(){
		
		},

		activated(){
			this.birthErr=false;
			this.cardErr=false;
			this.nameErr=false;
			this.telErr=false;
			this.birthdayerr=false;
			this.flightInfo = JSON.parse(getStore('flightInfo'));
			this.depart = JSON.parse(getStore("editPersonMes")) ? '编辑乘机人' : '新增乘机人';
			this.singleFlight = this.flightInfo[0];
			if (this.flightInfo.length == 2) {
				this.doubleFlight = this.flightInfo[1];
			}

			let editPersonMes = JSON.parse(getStore("editPersonMes"));
			if (editPersonMes) {
				switch(editPersonMes.certType){
					case 'ID_CARD':
						this.personCardType = {
							type:editPersonMes.certType,
							value:'身份证'
						};
						break;
					case 'ID':
						this.personCardType = {
							type:editPersonMes.certType,
							value:'身份证'
						};
						break;
					case 'PASSPORT':
						this.personCardType = {
							type:editPersonMes.certType,
							value:'护照'
						};
						break;
					case 'HUZHAO':
						this.personCardType = {
							type:editPersonMes.certType,
							value:'护照'
						};
						break;
					case 'TAIBAOZHENG':
						this.personCardType = {
							type:editPersonMes.certType,
							value:'台胞证'
						};
						break;
					case 'HUIXIANG':
						this.personCardType = {
							type:editPersonMes.certType,
							value:'回乡证'
						};
						break;
					case 'OFFICER':
						this.personCardType = {
							type:editPersonMes.certType,
							value:'军官证'
						};
						break;
					case 'SOLDIER':
						this.personCardType = {
							type:editPersonMes.certType,
							value:'士兵证'
						};
						break;
					case 'OTHER':
						this.personCardType = {
							type:editPersonMes.certType,
							value:'其它'
						};
						break;
					case 'RPGA':
						this.personCardType = {
							type:editPersonMes.certType,
							value:'港澳居民居住证'
						};
						break;
					case 'RPTW':
						this.personCardType = {
							type:editPersonMes.certType,
							value:'台湾居民居住证'
						};
					case 'GANGAORESIDENCE':
						this.personCardType = {
							type:editPersonMes.certType,
							value:'港澳居民居住证'
						};
						break;
					case 'TAIBAORESIDENCE':
						this.personCardType = {
							type:editPersonMes.certType,
							value:'台湾居民居住证'
						};
						break;
				}
				if (editPersonMes.certType!='ID_CARD' && editPersonMes.certType!= 'ID') {
					if (editPersonMes.birthday) {
						this.setTime = {
							year:editPersonMes.birthday.substring(0,4),
							month:editPersonMes.birthday.substring(5,7),
							day:editPersonMes.birthday.substring(8,10)
						}
						this.showTime=true;
					}else{
						this.setTime = {
							year:'1990',
							month:'01',
							day:'01'
						}
						this.showTime=false;
					}
				}

				this.personName = editPersonMes.receiverName;
				this.personCard = editPersonMes.certNo;
				this.personTel = editPersonMes.phone;
				this.personId = editPersonMes.receiverId;
				if(editPersonMes.isChecked==-1){
					this.rightHandler();
				}
				
			}else{
				this.personName = '';
				this.personCard = '';
				this.personId = '';
				this.personTel = '';
				this.personCardType = {
					type:'ID_CARD',
					value:'身份证'
				};
				this.setTime = {
					year: '1990',
					month: '01',
					day: '01'
				};
				this.showTime=false;
			}
		},

		mounted(){

		},

		computed:{
			...mapState([
					'commonPersonMes',
					'selectedPersons'
				])
		}

		
	}
</script>

<style lang="scss" scoped>
	@import '../../style/mixin';
	.add-passenger-wrap{
		position: relative;
	    @include wh(100%,100%);
		.add-passenger{
			background: #fff;
			width: 94.7%;
			margin: 0 auto;
    		margin-top: 0.2rem;
			box-shadow: 0 2px 6px 0 rgba(0,0,0,0.05);
			border-radius: 5px;
			.ask_icon {
				@include wh(.32rem,.32rem);
				display: inline-block;
				background: url('//m.lvmama.com/flight/image/illustrate_icon.png') no-repeat;
				background-size: 100%;
				margin-right: .1rem;
			}
			.ask_icon + p{
				display: inline-block;
				font-family: PingFangSC-Regular;
				font-size: .28rem;
				color: #666666;
			}
			.add{
				padding: 0 0.2rem;
				.orderline{
					@include orderline();
				}
				.message{
					width: 100%;
					padding: 0.2rem 0;
					box-sizing: border-box;
					position:relative;
					.label{
						@include sc(0.28rem,#000);
	    				width: 100%;
						.msg-type{
							@include sc(0.28rem,#000);
							width: 1.3rem;
							position: relative;
							font-family: PingFangSC-Regular;
							font-size: .28rem;
							color: #666666;
							display: inline-block;
							margin-right: 0.1rem;
	    					.type-icon{
	    						@include wh(0.34rem,0.34rem);
		    					display: inline-block;
							    background: url('//m.lvmama.com/flight/image/illustrate_icon.png') no-repeat;
							    background-size: 100%;
							    margin-left: 0.1rem;
								position: absolute;
								top: 50%;
								transform: translateY(-50%);
		    				}
	    				}
	    				.name{
							display: inline-block;
							// margin-left: 4%;
	    					// margin-left: 0.3rem;
	    					width: 69%;
    						input{
    							width: 100%;
    							height: inherit;
								line-height: 0.5rem;
    						}
    						.clearCon{
								   @include ct;
    							    width: 0.5rem;
									height: inherit;
									line-height: 0.5rem;
									right: 0;	
									top:55%;							
							    > i {
				                    display: inline-block;
				                    @include wh(0.28rem,0.28rem);
				                    background:url("//m.lvmama.com/flight/image/cancle.png") no-repeat;
				                    background-size: 100%;
				                }
    						}
    						.person-type{
    							@include wh(100%,0.5rem);
    							// display: inline-block;
								line-height: 0.5rem;
    						}
						}
						.tt_arrow{
							@include ct;
							right:0.2rem;
						}
					}
					.errorMsg{
						@include sc(0.2rem,#FF5465);
						// float: left;
						line-height: .2rem;
					}
				}
			}
		}
		.child-ticket{
			margin-top: 0.2rem;
			position: relative;
    		text-align: right;
			p{
				@include sc(0.22rem,#4997e7);
				padding-right: .3rem;
				font-family: PingFangSC-Light;
				font-size: .24rem;
				color: #999999;
				span{
					background: url('//m.lvmama.com/flight/image/illustrate_icon.png') no-repeat;
					background-size: 100%;
					display: inline-block;
					// margin-left: 0.1rem;
					// margin-right: 0.1rem;
					width: 0.32rem;
					height: 0.32rem;
					position:absolute;
					right: 31%;
					top: -3%;
				}
			}
		}
		.matte-2{ 
			width: 100%;
		    height: 75%;
		    position: fixed;
		    top: 25%;
		    left: 0;
		    z-index: 6;
		    padding-top: 0.5rem;
		    padding-bottom: 0.98rem;
			background: #fff;
			border-top-left-radius: 5px;
			border-top-right-radius: 5px;
			.ticket-know{
				width: 100%;
    			padding: 0 .3rem;
    			>div>p{
    				font-size: 0.36rem;
    				color: #333;
				    position: relative;
				    padding-top: 0;
				    padding-bottom: 0.2rem;
					text-align: center;
    			}
    			>div>div{
    				font-size: 0.28rem;
    				color: #666;
    				padding-top: 0.2rem;
    			}
    			>div>div>p{
    				font-size: 0.28rem;
    				color: #666;
				    line-height: 0.4rem;
				    padding-top: 0;
				    .span-right-detail {
					    width: 90%;
					    display: inline-block;
					    font-size: 0.28rem;
				    	color: #666;
					}
    			}
    			>div>div>p>span{
    				display: inline;
    				vertical-align: top;
    				font-size: 0.28rem;
				    color: #666;
    			}
    			>div>div>p>span:first-child{
    				width: 0.44rem;
    			}
    			>div>div>p>span.span-right-detail {
				    width: 90%;
				    display: inline-block;
				    font-size: 0.28rem;
				    color: #666;
				}
				.text-indent {
				    padding-left: 0.52rem;
				    word-break: break-all;
				    font-size: 0.28rem;
				    color: #666;
				}
			}
		}
	}
</style>