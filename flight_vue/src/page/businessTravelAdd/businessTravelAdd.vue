<template>
	<div class="businessTravelAdd">
		<head-top :depart="title" :goPage="goPage" @rightHandler="toHelper"></head-top><!--@rightHandler="toHelper"-->
		<ul v-if="update==false">
			<li>
				<span>公司码</span>
				<div class="content">
					<input type="text" maxlength="8" v-model="verification" @focus="codeFocus=true" @blur="codeFocus=false" placeholder="请输入公司验证码"/>
					<span class="err" :class="{'errBlack':inputCompany!='公司验证码错误'}" v-if="inputCompany!='' && inputCompany!=null">{{inputCompany}}</span>
					<i class="del" @click="delVerification" v-show="verification!=null && verification!='' && codeFocus"></i>
				</div>
				<i class="slloding" v-if="slloding==true"></i>
				<div class="orderline"></div>
			</li>
			<li>
				<span>员工姓名</span>
				<div class="content">
					<input type="text" placeholder="必填" v-model="employeeName"/>
				</div>
				<div class="orderline"></div>
			</li>
			<li>
				<span>联系电话</span>
				<div class="content">
					<input type="tel" maxlength="11" placeholder="必填" v-model="employeePhone"/>
				</div>
				<div class="orderline"></div>
			</li>
			<li>
				<span>员工号</span>
				<div class="content">
					<input type="text" placeholder="选填" v-model="employeeNo"/>
				</div>
				<div class="orderline"></div>
			</li>
			<li>
				<span>部门</span>
				<div class="content">
					<input type="text" placeholder="选填" v-model="employeeDepartment"/>
				</div>
				<div class="orderline"></div>
			</li>
			<li>
				<span>职务</span>
				<div class="content">
					<input type="text" placeholder="选填" v-model="employeeJob"/>
				</div>
			</li>
		</ul>
		<ul v-if="update==true">
			<li v-if="businessTravelUser.employeeNo=='' || businessTravelUser.employeeNo==null">
				<span>员工号</span>
				<div class="content">
					<input type="text" placeholder="选填" v-model="employeeNo"/>
				</div>
				<div class="orderline"></div>
			</li>
			<li v-if="businessTravelUser.department=='' || businessTravelUser.department==null">
				<span>部门</span>
				<div class="content">
					<input type="text" placeholder="选填" v-model="employeeDepartment"/>
				</div>
				<div class="orderline"></div>
			</li>
			<li v-if="businessTravelUser.position=='' || businessTravelUser.position==null">
				<span>职务</span>
				<div class="content">
					<input type="text" placeholder="选填" v-model="employeeJob"/>
				</div>
			</li>
		</ul>
		<div class="noSubmit" v-if="update==false" :class="{'submit':submit}" @click="submitBusinessTravelInfo">绑定</div>
		<div class="noSubmit" v-if="update==true" :class="{'submit':submitUpdate}" @click="updateBusinessTravelInfo">绑定</div>
		<alert-tip v-if="showMessage" :tipContent="message" :leftButton="leftButton" :rightButton="rightButton" @closeAlert="showMessage=false" ></alert-tip>
	</div>
</template>

<script>
	import headTop from '../../components/header/head'
	import alertTip from '../../components/common/alertTip'
	import { mapActions,mapState } from 'vuex'
	import { getStore,addZero,isClient,getLvSessionId,checkMobile,removeBlank,jumpLogin,getUrlParam } from '../../config/mUtils'
	import { getValidateAccount,getLvUser,getLvUserByCookie,getCompanyByAuthCode,submitBindAccount,updateAccount } from '../../service/getData'

	export default{
		data(){
			return{
                title:"绑定员工账号",
                goPage:"businessTravelAdd",
                // company:{},
            	verification:"",//公司码
				inputCompany:"",//公司名称
				employeeName:"",//姓名
				employeeNo:"",//员工号
				employeePhone:"",//手机号
				employeeDepartment:"",//部门
				employeeJob:"",//职务
                // },
                user:{},
                slloding:false,//验证公司码loading图
                codeFocus:false,//是否展示一键清除按钮
                submit:false,//是否可以点击提交
                showMessage:false,//是否展示弹框
                message:'',//弹框内容
                leftButton:'确定',
                rightButton:'',
                update:false,//是否是完善账号
                submitUpdate:false,//完善是否可以点击提交
			}
		},
		props:[],

		components:{
			headTop,alertTip
		},

		methods:{
			 ...mapActions([
                'initData'
            ]),
			//跳转至差旅助手
			toHelper(){
				this.$router.push(`/${this.$parent.baseUrlPath}/businessTravelHelper/service`);
			},
			//公司码清除按钮
			delVerification(){
				setTimeout(function(){
					this.verification="";
					this.inputCompany="";
				}, 50)
				
			},
			companyUpdate(){
				if(this.businessTravelUser.employeeNo=='' || this.businessTravelUser.employeeNo==null){
					if(this.employeeNo!=""){
						this.submitUpdate=true;
					}
				}else{
					this.employeeNo=this.businessTravelUser.employeeNo;
				}
				if(this.businessTravelUser.department=='' || this.businessTravelUser.department==null){
					if(this.employeeDepartment!=""){
						this.submitUpdate=true;
					}
				}else{
					this.employeeDepartment=this.businessTravelUser.department;
				}
				if(this.businessTravelUser.position=='' || this.businessTravelUser.position==null){
					if(this.employeeJob!=""){
						this.submitUpdate=true;
					}
				}else{
					this.employeeJob=this.businessTravelUser.position;
				}
			},
			//填写改变事件
			companyChange(type){
				if(type=="v"){
					this.verification=this.verification.toUpperCase();
					if(this.verification==null || this.verification==''){
						this.inputCompany="";
						return;
					}
					let newReg=/^[A-Z]+$/;
					if(newReg.test(this.verification)&&this.verification.length<=2){
		                this.inputCompany="";
		            }else{
		            	let reg = /^[A-Z]{2}\d+$/;
		            	if(reg.test(this.verification)){
		            		if(this.verification.length==8){
		                        this.slloding=true;
								getCompanyByAuthCode(this.verification).then((data)=>{
									this.slloding=false;
									if(data.data!=null && data.data.companyName !=null){
	                                    this.inputCompany=data.data.companyName;
	                                }else{
	                                    this.inputCompany="公司验证码错误";
	                                }
	                                if (this.inputCompany!=null&&this.inputCompany!=''&&this.inputCompany!='公司验证码错误' && this.employeeName != '' && this.employeePhone != '' && checkMobile(removeBlank(this.employeePhone))) {
										this.submit=true;
									}else{
										this.submit=false;
									}
								},()=>{
									this.slloding=false;
								})
		                    }else{
		                        this.inputCompany="";
		                    }
		            	}else{
		            		this.inputCompany="公司验证码错误";
		            	}
		            }
				}else{
					if (this.inputCompany!=null&&this.inputCompany!=''&&this.inputCompany!='公司验证码错误' && this.employeeName != '' && this.employeePhone != '' && checkMobile(removeBlank(this.employeePhone))) {
						this.submit=true;
					}else{
						this.submit=false;
					}
				}
			},
			//提交
			submitBusinessTravelInfo(){
				if(this.submit==true){
					this.$parent.showLoading = true;
					submitBindAccount(this.user.userId,this.user.userName,this.inputCompany,this.employeeNo,this.verification,this.employeeName,this.employeePhone,this.employeeDepartment,this.employeeJob).then((data)=>{
						this.$parent.showLoading = false;
						if(data.code==1){
							this.$router.push(`/${this.$parent.baseUrlPath}/businessTravelIndex`);
						}else{
							this.message=data.message;
							this.showMessage=true;
						}
					},()=>{
						this.$parent.showLoading = false;
					})
				}
			},
			//修改
			updateBusinessTravelInfo(){
				if(this.submitUpdate==true){
					this.$parent.showLoading = true;
					updateAccount(this.businessTravelUser.id,this.businessTravelUser.staffTel,this.employeeNo,this.employeeDepartment,this.employeeJob).then((data)=>{
						this.$parent.showLoading = false;
						if(data.code==1){
							this.$router.push(`/${this.$parent.baseUrlPath}/businessTravelMy`);
						}else{
							this.message=data.message;
							this.showMessage=true;
						}
					},()=>{
						this.$parent.showLoading = false;
					})
				}
			},
			initadd(){
				this.verification="";
	        	this.inputCompany="";
	        	this.employeeName="";
	        	this.employeeNo="";
	        	this.employeeDepartment="";
	        	this.employeeJob="";
	        	this.employeePhone="";
	        	this.submit=false;
	        	this.showMessage=false;
	        	this.update=false;
			},
			validateAccount(customerId){
				this.$parent.showLoading = true;
				getValidateAccount(customerId).then((data) => {
					this.$parent.showLoading = false;
					if (data.code == '1') {
						this.$router.push(`/${this.$parent.baseUrlPath}/businessTravelIndex`);
                    }else{
						if(getUrlParam("CC")!=null && getUrlParam("CC")!=''){
							this.verification=getUrlParam("CC");
						}
					}
				},()=>{
					this.$parent.showLoading = false;
				})
			}
		},

		created(){
			this.initadd();
		},

		activated(){
        	this.initadd();
			if((getUrlParam("CC")==null || getUrlParam("CC")=='') && JSON.parse(getStore("businessTravelUser"))!='' && JSON.parse(getStore("businessTravelUser"))!=null && this.businessTravelUser!=null){
				this.title="完善员工账号"
				this.update=true;
				this.goPage="businessTravelUpdate";
			}
			let userid="",username="";
			if(isClient() == 1){
	            //app登录
	            getLvSessionId().then((data) => {
					if(data==null || data=="" || data==undefined){
                        jumpLogin();
                        return;
                    }
					this.$parent.showLoading = true;
	                getLvUser(data).then((res) => {
						this.$parent.showLoading = false;
                       if(res.code == 1 && res.data.userId!=''&&res.data.userId!=null){
							this.user=res.data;
							if(this.update==false){
								this.validateAccount(this.user.userId);
							}   
							
                       }else{
                       	 jumpLogin();
                       }
	                },()=>{
						this.$parent.showLoading = false;
					});
	            })
	        }else{
	            this.app=false;
				//wap登录
				this.$parent.showLoading = true;
	           getLvUserByCookie().then((res) => {
				   this.$parent.showLoading = false;
                    if(res.code == 1 && res.data.userId!=''&&res.data.userId!=null){
                        this.user=res.data;
						if(this.update==false){
							this.validateAccount(this.user.userId);
						}  
                   }else{
                       	 jumpLogin();
                       }
	           },()=>{
					this.$parent.showLoading = false;
				}) 
	        }
			
		},
		watch: {
			verification() {
		       this.companyChange('v');
		    },
		    employeePhone() {
		       this.companyChange();
		    },
		    employeeName() {
		       this.companyChange();
		    },
		    employeeNo(){
		    	this.companyUpdate();
		    },
		    employeeDepartment(){
		    	this.companyUpdate();
		    },
		    employeeJob(){
		    	this.companyUpdate();
		    },
	    },
		computed:{
			...mapState([
                'businessTravelUser'
            ])
		}
	}
</script>

<style lang="scss" scoped>
	@import '../../style/mixin';
	.businessTravelAdd{
		position: relative;
	    @include wh(100%,100%);
	    >ul{
	    	margin-top: .2rem;
	    	background-color: #fff;
		    width: 100%;
		    >li:first-child{
	    	    padding: .21rem 0;
    			line-height: inherit;
    			>div{
    				>input{
    					display: block;
    				}
    			}
    			.orderline{
    				margin-top: .2rem !important;
    			}
		    }
		    >li{
    			line-height: .8rem;
    			position: relative;
    			>span:first-child{
		    	    position: absolute;
	    			margin-left: .3rem;
	    			color: #000;
			    }
			    .content{
			    	display: block;
			    	margin-left: 2rem;
			    	>input{
			    		width: 4rem;
		    		    color: #000;
			    	}
			    	>span{
			    		margin: .1rem 0 0;
    					display: inline-block;
    					color:#000;
			    	}
			    	>span.err{
			    		color:#fe3c71;
			    	}
			    	>span.err.errBlack{
			    		color:#000;
			    	}
			    	.del{
			    		@include wh(.32rem,.32rem);
		    	        position: absolute;
		    	        top: .25rem;
					    display: block;
					    background: url('//m.lvmama.com/flight/image/cancle.png') 0 0 no-repeat;
					    background-size: 100% 100%;
					    right: 1.1rem;
			    	}
			    }
			    .orderline{
			    	left: .3rem;
					position: absolute;
					@include orderline();
			    }
			    .slloding{
			    	@include wh(.52rem,.52rem);
			    	top:15%;
				    position: absolute;
				    right: .3rem;
				    background: url('//m.lvmama.com/flight/image/slLoding.png') 0 0 no-repeat;
				    background-size: 100%;
				    animation: slzhuan 1s linear 0s infinite;
				    -webkit-animation: slzhuan 1s linear 0s infinite;
				    -moz-animation: slzhuan 1s linear 0s infinite;
			    }
			    @keyframes slzhuan {
				    from {
				        -webkit-transform: rotate(0deg);
				        transform:  rotate(0deg);
				    }
				    to {
				        -webkit-transform:  rotate(360deg);
				        transform: rotate(360deg);
				    }
				}

				@-webkit-keyframes slzhuan {
				    from {
				        -webkit-transform: rotate(0deg);
				        transform:  rotate(0deg);
				    }
				    to {
				        -webkit-transform: rotate(360deg);
				        transform:  rotate(360deg);
				    }
				}

				@-moz-keyframes slzhuan {
				    from {
				        -webkit-transform: rotate(0deg);
				        transform: rotate(0deg);
				    }
				    to {
				        -webkit-transform: rotate(360deg);
				        transform:  rotate(360deg);
				    }
				}
		    }
	    }
	    >div.submit{
		    background: -webkit-gradient(left, #fe686c, #fd3c71);
		    background: -webkit-linear-gradient(left, #fe686c, #fd3c71);
		    // background: linear-gradient(left, #fe686c, #fd3c71);
	    }
	    .noSubmit{
			@include wh(92%,1rem);
    	    @include sc(.3rem,#fff);
		    background: -webkit-gradient(left, #545464, #363640);
		    background: -webkit-linear-gradient(left, #545464, #363640);
		    // background: linear-gradient(left, #545464, #363640);
		    text-align: center;
		    line-height: 1rem;
	        margin: .3rem 4%;
    		border-radius: 30px;
	    }
	}
</style>