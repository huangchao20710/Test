<template>
	<div class="fenxiang">
		<img class="fenxiangIcon" src="https://pics.lvjs.com.cn/mobile/coding/v2/hotel/release/images/share.png"/>
		<div class="activities">
			<div class="activeContent"></div>
			<div class="activeLogin" v-show="showLogin">
				<!-- <img src="//m.lvmama.com/flight/image/redback.jpg"/> -->
				<div class="loginInformation">
					<div>
						<input type="tel" v-model="mobile" maxlength="11" placeholder="请输入手机号码"/>
					</div>
					<div class="loginGraphics">
						<input type="text" maxlength="4" v-model="graphicCode" placeholder="请输入图形验证码"/>
						<img src="" @click="refreshCheckCode" id="imageMobile"/>
					</div>
					<div class="loginMobile">
						<input type="tel" v-model="mobileCode" maxlength="6" placeholder="请输入验证码"/>
						<span id="yzmbutton" @click="achieveCode"><i></i>获取验证码</span>
					</div>
					<p class="theRules"><i v-bind:class="{'yes':checkRules}" @click="changeRules"></i>我已阅读并同意驴妈妈火车票的<span @click="clickRules">【活动规则】</span></p>
					<span @click="submit">立即购票</span>
					<img class="lvmamaIcon" src="//m.lvmama.com/flight/image/lvmamaLogo1.png"/>
				</div>
			</div>
			<div class="luckyDraw" v-if="showCoupon">
				<div class="luckyDrawTitle y_flex x_flex" v-if="notSorry">
					<span></span>
					<p>恭喜获得</p>
					<span></span>
				</div>
				<div class="luckyDrawInformation">
					<div v-if="sorry">
						<div class="sorry xy_flex">
							<span class="cry" v-if="errorMessage!='您已经参与过抽奖哟！' && '恭喜您，中奖了'"></span>
							<span class="smail" v-if="errorMessage=='您已经参与过抽奖哟！' || errorMessage=='恭喜您，中奖了'"></span>
							<span>{{errorMessage}}</span>
							<p v-if="errorMessage=='来迟了，您朋友的红包已被抢完'">手气重要，手速也很重要</p>
							<p v-if="errorMessage=='您已经参与过抽奖哟！'">马上去使用吧~</p>
						</div>
					</div>
					<div v-if="notSorry">
						<div class="notSorry">
							<span></span>
							<div>
								<p>{{result.prizeName}}</p>
								<p>{{result.favorTypeDescription}}</p>
							</div>
							<p>
								<em>&yen;</em>{{result.argumentZ&&result.argumentZ>0 ? result.argumentZ : result.argumentY}}
							</p>
							<!-- <p v-if="result.favorMode == 'DISCOUNT'">
								{{result.argumentY}}<em>折</em>
							</p> -->
						</div>
					</div>
					<div class="periodOfValidity" v-show="result.activityValidInfo">{{result.activityValidInfo}}</div>
					<!-- 有效期至：{{result.activityEndTime.split(' ')[0]}} -->
					
					
				</div>
				<!-- <div class="theTicket" v-if="notSorry" @click="toTrain">立即使用</div>
				<div class="theTicket" v-if="sorry" @click="toTrain">立即购票</div> -->
				<div class="theTicket" v-if="errorMessage=='您已经参与过抽奖哟！' || notSorry" @click="toTrain">立即使用</div>
				<div class="theTicket" v-if="errorMessage!='您已经参与过抽奖哟！' && sorry" @click="toTrain">立即购票</div>
				
				<p @click="clickRules">活动规则>></p>
				<div class="activityPeople">
					<div>
						<span class="left_line"></span>
						<p>谁抢了红包</p>
						<span class="right_line"></span>
					</div>
					<div class="theWinning" v-if="resultList.length>0">
						<p v-for="results in resultList">
							<span>{{results.customerAccount}}</span>
							<span>{{results.prizeInfo}}</span>
						</p>
					</div>
					<img class="lvmamaIcon" src="//m.lvmama.com/flight/image/lvmamaLogo1.png"/>
				</div>
			 </div>
			<div class="activityRules" v-if="showRules">
				<div>
					<div class="activityTitle">活动规则</div>
					<div class="activityInformation">
						<p>1.点击领取红包后，红包将放入手机号对应的驴妈妈账户（未注册的用户，将默认生成手机号对应的驴妈妈账户）</p>
						<p>2.每位用户每天可领取一次红包</p>
						<p>3.领取到的红包，需登录手机号对应的驴妈妈账户方可使用</p>
						<p>4.红包有效期、适用品类等使用规则以红包展示信息和平台规则为准，具体可在“驴妈妈app-我的-优惠券”中查看</p>
						<p>5.使用红包的情况下，若发生订单的退改，红包金额不予退还</p>
						<p>6.若发现参加用户存在不正当行为（包括但不限于恶意套现、恶意刷单等），驴妈妈旅游有权取消其优惠使用资格；</p>
						<p>7.客服服务热线：10106060-1-6</p>
						<p>本活动的最终解释权归驴妈妈旅游所有</p>
					</div>
					<div class="activityEdges"></div>
					<div class="closeActivity"><span @click="clickRules"></span></div>
				</div>
			</div>
		 </div>
		 <alert-tip v-if="showMessage" :tipContent="message" :leftButton="leftButton"></alert-tip>
	</div>
</template>

<script>
	import alertTip from '../../components/common/alertTip'
	import { mapActions,mapState } from 'vuex'
	import { isClient,getLvSessionId,checkMobile,removeBlank,getRedSource,getStatisticsType,getElementTag } from '../../config/mUtils'
	import { sendTrafficOrderAuthenticationCode,getLvUserByTrain,registeredLogin,queryMarketingActivity,getMarketingActivity } from '../../service/getData'

	export default{
		data(){
			return{
				showMessage:false,//是否展示弹框
				message:'',
				leftButton:'',
				user:{},//登录信息
				showLogin:false,//是否需要登录
				checkRules:true,//是否同意规则
				mobile:'',//手机号码
				graphicCode:'',//图形验证码
				mobileCode:'',//手机动态码
				showRules:false,//是否展示活动规则
				showCoupon:false,//是否展示抽奖信息
				notSorry:false,//展示抽中信息
				sorry:false,//展示未中奖信息
				errorMessage:'',//没中奖话术
				resultList:[],//中奖人列表
				result:{},//中奖信息
			}
		},
		props:[],

		components:{
			alertTip,
		},

		methods:{
			 ...mapActions([
                'initData'
			]),
			//初始化
			initData(){
				this.user={};
				this.showLogin=false;
				this.checkRules=true;
				this.mobile='';
				this.graphicCode='';
				this.mobileCode='';
				this.showRules=false;
				this.showMessage=false;
				this.showCoupon=false;
				this.notSorry=false;
				this.sorry=false;
				this.resultList=[];
				this.result={};
			},
			//图形验证码
			refreshCheckCode(){
				document.getElementById('imageMobile').src='//login.lvmama.com/nsso/account/checkcode.htm?_='+Math.random();
			},
			changeRules(){
				this.checkRules=!this.checkRules;
			},
			toTrain(){
				window.location.href="//m.lvmama.com/train/"
			},
			//获取动态码
			achieveCode(){
				if(document.getElementById('yzmbutton').innerHTML.indexOf('重发验证码')!=-1&&document.getElementById('yzmbutton').innerHTML.indexOf('获取验证码')!=-1){
					return;
				}
				if(this.mobile==null||this.mobile==""){
					this.alertDisappear('请输入手机号码');
					return;
				}
				if(!checkMobile(this.mobile)){
					this.alertDisappear('请输入正确的手机号码');
					return;
				}
				if(this.graphicCode==''||this.graphicCode==null){
					this.alertDisappear('请输入图形验证码');
					return;
				}
				let reg=/^[0-9a-zA-Z]+$/;
				if(!reg.test(this.graphicCode)){
					this.alertDisappear('请输入正确的图形验证码格式');
					return;
				}
				this.$parent.showLoading = true;
				sendTrafficOrderAuthenticationCode(this.mobile,this.graphicCode,'jsoncallback','JSON_CALLBACK', (data) => {
					this.$parent.showLoading = false;
					if(data.success==true){
						this.timeout(60000, 1000);
					}else{
						if(data.errorText.indexOf('图片验证码校验不通过')!=-1){
                        	this.alertDisappear('图形验证码错误');
						}else if(data.errorText.indexOf('30分钟')!=-1){
							this.alertDisappear('您发送动态码超过3次,请30分钟后再试');
						}else{
							this.alertDisappear(data.errorText);
						}
						this.refreshCheckCode();
						this.graphicCode='';
						return;
					}      
				},()=>{
					this.$parent.showLoading = false;
				});
			},
			//领红包
			submit(){
				if(this.mobile==null||this.mobile==""){
					this.alertDisappear('请输入手机号码');
					return;
				}
				if(!checkMobile(this.mobile)){
					this.alertDisappear('请输入正确的手机号码');
					return;
				}
				if(this.mobileCode==''||this.mobileCode==null){
					this.alertDisappear('请输入手机验证码');
					return;
				}
				let reg=/^[0-9a-zA-Z]+$/;
				if(!reg.test(this.mobileCode)){
					this.alertDisappear('请输入正确的手机验证码格式');
					return;
				}
				if(this.checkRules==false){
					this.alertDisappear('请阅读并同意驴妈妈火车票活动规则');
					return;
				}
				this.$parent.showLoading = true;
				registeredLogin(removeBlank(this.mobile),this.mobileCode,'jsoncallback','JSON_CALLBACK', (data) => {
					this.$parent.showLoading = false;
					if(data.success==true){
						this.showLogin=false;
						this.checkLogin();
					}else{
						if(data.errorText == '动态密码有误'){
							this.alertDisappear('手机验证码错误');
						}else{
							this.alertDisappear(data.errorText);
						}
					}      
				},()=>{
					this.$parent.showLoading = false;
				});
			},
			timeout(durTime,mill){
				let that=this;
				let timer = setTimeout(function() {
					durTime = durTime - mill;
					let _minute, _second;
					if(durTime >= 0){
						_second = Math.floor(durTime/1000%60);
						that.timeout(durTime, mill);
						if(document.getElementById('yzmbutton')!=undefined && document.getElementById('yzmbutton')!=''){
							document.getElementById('yzmbutton').innerHTML="已发送("+_second+"s)";
						}
					} else {
						if(document.getElementById('yzmbutton')!=undefined && document.getElementById('yzmbutton')!=''){
							document.getElementById('yzmbutton').innerHTML="重发验证码";
							that.graphicCode='';
							that.refreshCheckCode();
						}
					}
				}, mill);
			},
			//是否展示活动规则
			clickRules(){
				this.showRules=!this.showRules;
			},
			//2秒消失弹框
			alertDisappear(input){
				this.message = input;
				this.leftButton = "";
				this.showMessage = true;
				setTimeout(() => {
					this.showMessage = false;
				},2000);
			},

		switchCase(str){
            switch(str){
                case 'a':
                    return 0;
                case 'b':
                    return 1;
                case 'c':
                    return 2;
                case 'd':
                    return 3;
                case 'e':
                    return 4;
                case 'f':
                    return 5;
                case 'g':
                    return 6;
                case 'h':
                    return 7;
                case 'i':
                    return 8;
                case 'j':
                    return 9;
            }
		},
		
        decryption(str){
            var strArr = str.split(""),res = '';
            for (var i = 0; i < strArr.length; i++) {
               var result = this.switchCase(strArr[i]);
               res += String(result);
            }
            return res;
        },
			//抽奖
			marketingActivity(){
				let data = {
					categoryType:'LVTRAIN',
					orderSource:getRedSource(),
					orderScene:'PAYMENT_SUCCESS',
					userType:'ALL',
					customerAccount:this.user.userName,
					receiveCode:this.$route.params.code,
					activityId:this.$route.params.id,
					orderId:this.decryption(this.$route.params.orderId),
					userId:this.user.id,
					mobile:this.user.mobileNumber
				};
				let param = {
					receiveCode:this.$route.params.code,
					activityId:this.$route.params.id,
					userId:this.user.id
				};
				this.$parent.showLoading = true;
				getMarketingActivity(data).then((res) => {
					this.$parent.showLoading = false;
					if(res.code=="1"){
						try{
							if(res.data && res.data.result && res.data.result.activityId!=null){
								this.result=res.data.result;
								
								this.sorry=false;
								this.showCoupon=true;
								this.notSorry=true;
								queryMarketingActivity(param).then((result) => {
									if(result.code == 1){
										if(result.data && result.data.result.length>0){
											let list=result.data.result;
											this.resultList=list;
										}
									}
								});
							}else{
								this.errorMessage=res.message==""?'来迟了，您朋友的红包已被抢完':res.message;
								this.sorry=true;
								this.showCoupon=true;
								this.notSorry=false;
							}
						}catch(e){
							this.errorMessage=res.message==""?'来迟了，您朋友的红包已被抢完':res.message;
							this.sorry=true;
							this.showCoupon=true;
							this.notSorry=false;
						}
					}else{
						this.errorMessage=res.message==""?'来迟了，您朋友的红包已被抢完':res.message;
						this.sorry=true;
						this.showCoupon=true;
						this.notSorry=false;
					}
				},()=>{
					this.$parent.showLoading = false;
					this.errorMessage="来迟了，您朋友的红包已被抢完";
					this.sorry=true;
					this.showCoupon=true;
					this.notSorry=false;
				})
				getElementTag("大交通红包抽奖按钮", "大交通抽奖活动页");
			},
			//查询抽奖记录
			getQueryActivity(){
				let data = {};
				data.receiveCode=this.$route.params.code;
				data.activityId=this.$route.params.id;
				data.userId=this.user.id;
				this.$parent.showLoading = true;
				queryMarketingActivity(data).then((res) => {
					this.$parent.showLoading = false;
					if(res.code == 1){
						if(res.data && res.data.result.length>0){
							let list=res.data.result,flag=false;
							this.resultList=list;
							for(let i=0;i<list.length;i++){
								if(list[i].activityId==data.activityId && list[i].userId==this.user.id){
									this.sorry=true;
									this.showCoupon=true;
									this.errorMessage="您已经参与过抽奖哟！";
									this.notSorry=false;
									flag=true;
									break;
								}
							}
							if(!flag){
								//调用抽奖接口
								this.marketingActivity();
							}
						}else{
							//调用抽奖接口
							this.marketingActivity();
						}
					}else{
						//调用抽奖接口
						this.marketingActivity();
					}
				},()=>{
					this.$parent.showLoading = false;
					//调用抽奖接口
					this.marketingActivity();
				});
			},
			//判断是否登录
			checkLogin(){
				this.$parent.showLoading = true;
				getLvSessionId().then((data) => {
					if(data==null || data=="" || data==undefined){
						this.$parent.showLoading = false;
						this.showLogin=true;
						setTimeout(()=>{		
							this.refreshCheckCode();
						},50)
					}else{
						getLvUserByTrain(data).then((res) => {
							this.$parent.showLoading = false;
							if(res.code == 1){
								if(res.data.userId!=''&&res.data.userId!=null){
									this.user = res.data;
									this.getQueryActivity();
								}else{
									this.showLogin=true;
									setTimeout(()=>{		
										this.refreshCheckCode();
									},50)
								}
							}else{
								this.showLogin=true;
								setTimeout(()=>{		
									this.refreshCheckCode();
								},50)
							}
						},()=>{
							this.$parent.showLoading = false;
							this.showLogin=true;
							setTimeout(()=>{		
								this.refreshCheckCode();
							},50)
						});
					}
				})

			},
			
		},

		created(){
			
		},

		activated(){
			this.initData();
			this.checkLogin();
			getStatisticsType("大交通红包活动页面", "大交通活动页");
		},

		computed:{
			...mapState([
            ])
		}
	}
</script>

<style lang="scss" scoped>
	@import '../../style/mixin';
	.fenxiang{
		position: relative;
		@include wh(100%,100%);
		.activities{
			position: absolute; 
			@include wh(100%,100%);
			overflow-y: auto;
	    	top:0;
			bottom:0;
			.activeContent{
				@include wh(100%,37.5%);
				background-color: #000;
				// background: url('//m.lvmama.com/flight/image/fenxiangBanner.jpg') no-repeat;
				background: url('//m.lvmama.com/flight/image/hongbao.jpg') no-repeat;
				background-size: 100%;
			}
			.activeLogin{
				height: 62.5%;
				// background: url('//m.lvmama.com/flight/image/redback.jpg') 0 0 no-repeat;
				// background:#a4a4a4;
				// background-size: 100%;
				position: relative;
				
				.loginInformation{
					@include wh(100%,100%);
					position: absolute;
					top: 0;
					overflow: hidden;
					.lvmamaIcon{
						@include cl();
						@include wh(1.68rem,.54rem);
						position: relative;
						// margin-top: 20%;
						margin-top: 13%;
					}
					>div{
						@include wh(80%,auto);
						position: relative;
						margin: 0.3rem 10%;
						background-color: #fff;
						overflow: hidden;
						border-radius: 100px;	
						z-index: 1;
						box-shadow: 0 0 10px hsla(0,7%,73%,.55);
						>input{
							line-height: .9rem;
							width: 80%;
							margin-left: .5rem;
						}
					}
					>div:first-child{
						margin-top: .4rem;
					}
					>div.loginGraphics{
						>input{
							width: 60%;
						}
						>img{
							@include wh(1rem,.5rem);
							@include ct();
							right: .3rem;
							border: 1px #333 solid;
						}
					}
					>div.loginMobile{
						#yzmbutton{
							i{
								display: block;
								width: 1px;
								height: 20px;
								background: #a4a4a4;
								@include ct;
								left: 0;
								
							}
						}
						>input{
							width: 52%;
						}
						>span{
							display: inline-block;
							@include wh(40%,.9rem);
							@include sc(.3rem,#fff);
							position: absolute;
							line-height: .9rem;
							text-align: center;
							color: #fec82c;
							font-size: .3rem;
							// background-image: linear-gradient(245deg, #ff9d1b, #fed130);
							top: 0;
							right: 0;
							border-radius: 0 100px 100px 0;
							-webkit-border-radius: 0 100px 100px 0;
							z-index: 2;
						}
					}
					.theRules{
						@include sc(.28rem,#a4a4a4);
						text-align: center;
						position: relative;
						padding-left: 0.3rem;
						>span{
							color:#a4a4a4;
							text-decoration: underline;
						}
						>i{
							@include wh(.28rem,.28rem);
							@include ct();
							display: inline-block;
							border: 1px #a4a4a4 solid;
							border-radius: 100px;
							left: .7rem;
						}
						>i.yes:before{
							content: "";
							@include wh(.08rem,.12rem);
							@include ctr(45deg);
							border-right: 1px solid #a4a4a4;
							border-bottom: 1px solid #a4a4a4;
							border-right: 1px solid #a4a4a4;
							left: .06rem;
							margin-top: -0.02rem;
						}
					}
					>span{
						display: block;
						@include wh(80%,0.9rem);
						background:linear-gradient(137deg,#FE686C,#FD3C71);
						border-radius: 100px;
						position: relative;
						left: 50%;
						top:0.2rem;
						-webkit-transform: translateX(-50%);
						transform: translateX(-50%);
						text-align: center;
						line-height: 0.9rem;
						@include sc(0.4rem,#fff);
						box-shadow: 0 0 10px hsla(0,7%,73%,.55);

					}
				}
			}
			.activityRules{
				@include wh(100%,100%);
				background: rgba(0, 0, 0, 0.6);
				position: fixed;
				top: 0;
				left: 0;
				z-index: 5;
				overflow: hidden;
				>div{
					@include wh(80%,auto);
					@include center();
					border-radius: 10px 10px 0 0;
					.activityTitle{
						height: .82rem;
						position: relative;
						// background-color: #fa3041;
						background: linear-gradient(137deg,#FE686C,#FD3C71);
						line-height: .82rem;
						text-align: center;
						@include sc(.32rem,#fff);
						border-radius: 10px 10px 0 0;
					}
					.activityInformation{
						height: 6.56rem;
						padding: .5rem;
						background-color: #fff;
						overflow-y: auto;
						>p{
							@include sc(.3rem,#666);
							margin-bottom: .1rem;
						}
					}
					.activityEdges{
						@include wh(100%,.3rem);
						background: url('//m.lvmama.com/flight/image/edges.png') no-repeat;
						background-size: 100%;
						// @include center();
						position: absolute;;
						margin-top: -.05rem;
					}
					.closeActivity{
						height: 2rem;
						position: relative;
						>span{
							@include wh(.56rem,.58rem);
							background: url('//m.lvmama.com/flight/image/close.png') no-repeat;
							background-size: 100%;
							@include center();
						}
					}
				}
			}
			.luckyDraw{
				// background-color: #e61a38;
				@include wh(100%,auto);
				position: absolute;
				min-height: 62.5%;
				.luckyDrawTitle{
					// @include sc(.32rem,#fff);
					// line-height: .82rem;
					// text-align: center;
					@include wh(100%,0.82rem);
					
					span{
						display: inline-block;
						@include wh(0.35rem,0.36rem);
						background: url('//m.lvmama.com/flight/image/star.png') no-repeat;
						background-size: 100%;
					}
					p{
						display: inline-block;
						@include sc(.32rem,#666);
						margin:0 0.1rem;

					}
				}
				.luckyDrawInformation{
					height: 2.57rem;
					margin: .2rem .2rem 0;
					// background: url('//m.lvmama.com/flight/image/redbackBG.png') no-repeat;
					background: url('//m.lvmama.com/flight/image/redbackBg_g.png') no-repeat;
					background-size: 100%;
					position: relative;
					>div:first-child{
						height: 1.8rem;
						margin: 0 .5rem;
						.sorry{
							height: 100%;
							position: relative;
							>span{
								// @include ct();
							}
							.cry{
								display: inline-block;
								@include wh(.56rem,.54rem);
								background: url('//m.lvmama.com/flight/image/cry.png') no-repeat;
								background-size: 100%;
								// margin-left: .5rem;
							}
							.smail{
								display: inline-block;
								@include wh(.64rem,.64rem);
								background: url('//m.lvmama.com/flight/image/smile.png') no-repeat;
								background-size: 100%;
								// margin-left: .5rem;
							}
							>span:nth-child(2){
								margin-left: 0.2rem;
								@include sc(.3rem,#000);
							}
							p{
								display: block;
								width: 100%;
								position: absolute;
								bottom: 15%;
								left: 0;
								text-align: center;
								// transform: translateX(-50%);
								color: #afafaf;
							}
						}
						.notSorry{
							height: 100%;
							position: relative;
							>span{
								@include ct();
							}
							>span:first-child{
								@include wh(.93rem,.93rem);
								background: url('//m.lvmama.com/flight/image/present1.png') no-repeat;
								background-size: 100%;
							}
							>div{
								width: 58%;
								display: inline-block;
								@include ct();
								left: 1rem;
								>p:first-child{
									@include sc(.3rem,#5a5a5a);
									white-space: nowrap;
									overflow: hidden;
									text-overflow: ellipsis;
									width: 100%;
								}
								>p:nth-child(2){
									@include sc(.28rem,#afafaf);
									margin-top: .05rem;
									margin-left: .25rem;
								}
							}
							>p{
								font-size: .92rem;
								right: 0;
								position: absolute;
								line-height: 1.8rem;
								>em{
									font-size: .48rem;
								}
							}
						}
					}
					.periodOfValidity{
						line-height: .75rem;
						margin: 0 .6rem;
						color: #afafaf;
					}
					
				}
				.theTicket{
					line-height: .9rem;
					margin: .3rem .3rem;
					@include sc(.3rem,#fff);
					text-align: center;
					border-radius: 100px;
					// background-image: linear-gradient(245deg, #ffac3f, #fed130);
					background: linear-gradient(137deg,#FE686C,#FD3C71);
				}
				>p{
					color: #a4a4a4;
					margin-right: .3rem;
					text-align: right;
					text-decoration: underline;
				}
				.activityPeople{
					margin-top: .3rem;
					>div:first-child{
						margin: 0 .3rem;
						height: 0.38rem;
						// border-top: 1px #fff solid;
						position: relative;
						>p{
							text-align: center;
							line-height: .38rem;
							display: inline-block;
							width: 2rem;
							@include cl();
							// background-color: #e61a38;
							color: #a4a4a4;
							top: -.2rem;
						}
						.left_line{
							display: inline-block;
							width: 37%;
							border-top: 1px solid #a4a4a4;
							position: absolute;
							top: 0;
							left: 0;
						}
						.right_line{
							display: inline-block;
							width: 37%;
							border-top: 1px solid #a4a4a4;
							position: absolute;
							top: 0;
							right: 0;
						}
					}
					.theWinning{
						position: relative;
						margin: 0 .3rem .3rem;
						>p{
							margin-bottom: .2rem;
							>span{
								color:#a4a4a4;
							}
							>span:nth-child(2){
								right: 0;
								position: absolute;
								width: 50%;
								text-overflow: ellipsis;
								white-space: nowrap;
								overflow: hidden;
								text-align: right;
							}
						}
					}
					.lvmamaIcon{
						@include cl();
						margin-bottom: .5rem;
						@include wh(1.68rem,.54rem);
						position: relative;
					}
				}
			}
		}
		.fenxiangIcon{
			position: absolute;
			width: 0;
			height: 0;
		}
	}
</style>