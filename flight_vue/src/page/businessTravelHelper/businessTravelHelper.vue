<template>
	<div class="businessTravelHelper">
		<head-top :depart="title"   :goPage='goPage' @rightHandler="rightHandler"></head-top>
		<div class="titleHelper ">
			<span :class="{'weight':helperTitle==0}" @click="helperTitle=0">平台使用<i></i></span>
			<span class="center" :class="{'weight':helperTitle==1}" @click="helperTitle=1">预订产品及售后<i></i></span>
			<span :class="{'weight':helperTitle==2}" @click="helperTitle=2">客户服务<i></i></span>
		</div>
		<div class="particulars" v-if="helperTitle==0">
			<div v-for="detail in helperBD">
				<div class="detailTitle" @click="detail.click=!detail.click">{{detail.title}}</div>
				<div class="orderline_t"></div>
				<div v-if="detail.click==true">
					<div class="detailValue" v-html="detail.value"></div>
					<div class="orderline"></div>
				</div>
				
			</div>
		</div>
		<div class="particulars" v-if="helperTitle==2">
			<div v-for="detail in helperSP">
				<div class="detailTitle" @click="detail.click=!detail.click">{{detail.title}}</div>
				<div class="orderline_t"></div>
				<div v-if="detail.click==true">
					<div class="detailValue" v-html="detail.value"></div>
					<div class="orderline"></div>
				</div>
				
			</div>
		</div>
		<div class="particulars" v-if="helperTitle==1">
			<div class="detail">
				<span class="train"></span>
				<span class="title">火车票</span>
			</div>
			<div class="orderline"></div>
			<div v-for="detail in helperT">
				<div class="detailTitle" @click="detail.click=!detail.click">{{detail.title}}</div>
				<div class="orderline_t"></div>
				<div v-if="detail.click==true">
					<div class="detailValue" v-html="detail.value"></div>
					<div class="orderline"></div>
				</div>
				
			</div>
			<div class="spacing"></div>
			<div class="detail">
				<span class="flight"></span>
				<span class="title">飞机票</span>
			</div>
			<div class="orderline"></div>
			<div v-for="detail in helperF">
				<div class="detailTitle" @click="detail.click=!detail.click">{{detail.title}}</div>
				<div class="orderline_t"></div>
				<div v-if="detail.click==true">
					<div class="detailValue" v-html="detail.value"></div>
					<div class="orderline"></div>
				</div>
				
			</div>
		</div>
		<div class="mate" v-if="showMobile==true">
			<div>
				<div class="up" @click="callPhone">
					<p>24小时差旅热线</p>
					<div class="orderline"></div>
					<p>400-1161-808</p>
				</div>
				<div class="top" @click="showMobile=false">
					取消
				</div>
			</div>
			
		</div>
	</div>
</template>

<script>
	import headTop from '../../components/header/head'
	import { mapActions,mapState } from 'vuex'
	import { getStore,addZero,isClient,getLvSessionId,jumpLogin } from '../../config/mUtils'
	import { getValidateAccount,getLvUser,getLvUserByCookie } from '../../service/getData'

	export default{
		data(){
			return{
                title:"驴妈妈差旅助手",
                company:{},
                helperTitle:0,//头部
                helperT:[],//预订产品及售后火车票
				helperF:[],//预订产品及售后机票
                helperBD:0,//平台使用
                helperSP:0,//客户服务
				goPage:"businessTravelHelper",
				showMobile:false,
			}
		},
		props:[],

		components:{
			headTop
		},

		methods:{
			 ...mapActions([
                'initData'
            ]),
			callPhone(){
				window.location.href = 'tel:400-1161-808';
			},
			rightHandler(){
				this.showMobile=true;
			}
			
		},

		created(){
			
		},

		activated(){
			this.showMobile=false;
			this.helperTitle=0;
			if(this.$route.params.type=="index"){
				this.helperTitle=1;
			}else if(this.$route.params.type=="service"){
				this.helperTitle=2;
			}
			this.helperBD=[
				{
					"title":"怎么访问企业差旅平台？",
					"value":"驴妈妈APP -》更多 -》企业差旅；驴妈妈提供公司二维码扫码；",
					"click":false
				},{
					"title":"平台支持哪些业务？",
					"value":"企业差旅用户管理；<br>国内机票、火车票预订；<br>企业差旅订单查询；<br>审批员工订单；",
					"click":false
				},{
					"title":"APP怎么审批订单？",
					"value":"1）与商务负责人确认需要开通APP审批（支付）功能 ；<br>2）指定一名或多名“默认审批人”<br>3）确认不同员工的上级审批人；<br>4）预订产品后，系统会主动以短信、邮件的形式联系您对应的审批人；<br>5）默认审批人或指定上级审批人收到审批消息；<br>6）打开APP差旅页面，查找订单；<br>7）确认审批or拒绝审批；",
					"click":false
				}
			]
			this.helperSP=[
				{
					"title":"如何成为驴妈妈企业差旅客户？",
					"value":"线下拨打商务合作电话，客户主动发起您的合作意向；",
					"click":false
				},{
					"title":"注册为驴妈妈会员？",
					"value":"填写手机直接注册、第三方合作注册（QQ、微信、微博、支付宝）",
					"click":false
				},{
					"title":"已是驴妈妈会员，怎么进行员工信息绑定？",
					"value":"1）填写公司验证码（公司提供）、员工姓名、联系电话、员工号、部门、职务信息；<br>2）点击确认，系统进入审核状态；<br>3）后台管理人员对您的信息进行审核确认；<br>4）正常使用平台功能；",
					"click":false
				},{
					"title":"怎么修改个人信息？",
					"value":"联系商务合作负责人，通过后台进行修改；",
					"click":false
				}
			]
			this.helperT=[
				{
					"title":"支持的购票方式？",
					"value":"自取票（可通过有效证件和取票码去车站或代售点自行取票的购票方式）、送票上门（客人可选座座位，实体票可寄送至客人手上）、抢票（车次已开售但是无票的情况下，为客人提供的增值服务，必须先支付）、预约抢票（车次未开售的情况，客人可提前下单，到开售时间后，系统自动为客人购票）",
					"click":false
				},{
					"title":"支持的下单流程？",
					"value":"自取票：下单（用户）-》占座（系统）-》支付（审批人）-》出票（系统）<br>抢票、预约抢票、送票上门：下单（用户）-》支付（审批人）-》占座（系统）-》出票（系统）",
					"click":false
				},{
					"title":"下单时限？",
					"value":"24小时内均可在APP进行下单；<br>6:00-23:00为12306工作时间，即时完成出票；<br>23:00-6:00的订单，客人需先支付，系统自动在早上6：15分左右自动发起预订；",
					"click":false
				},{
					"title":"预订须知 - 购票？",
					"value":"火车票线上购票预售期为30天，送票上门的购票预售期为28天；<br>每张订单最多可下5位乘客，儿童不能单独下单；<br>下单时，如果包含儿童，儿童票价先按成人票价显示，占座成功后，显示实际的票价，多余支付的票款自动退回；<br>卧铺票，下单时显示为下铺价格，占座成功后，订单内显示实际的票价，多余支付的票款自动退回；<br>可购买距离发车时间40分钟以上的车次；",
					"click":false
				},{
					"title":"预订须知 - 抢票、预约抢票？",
					"value":"一张抢票订单最多可选择5个车次；每个账号最多可以有5张抢票单同时进行；<br>如需抢票服务，需在票价的基础上额外支付“抢票服务费” ；<br>如果在距离发车时间2小时还未抢票成功，系统自动取消抢票订单 ；<br>正在抢票中的订单可以随时取消，取消后会全额退款给客人；<br>抢票失败时，也会全额退款给客人 ；<br>抢票成功后，如果客人提交退票，则抢票服务费不退回 ；<br>未开售的车次，可进行预约抢票 ；<br>距离发车时间150分钟以上的车次可以通过抢票方式下单；",
					"click":false
				},{
					"title":"预订须知 - 送票上门？",
					"value":"送票上门购票方式的预售期为28天 ；<br>送票上门购票方式客人可选择座位，如下铺、中铺、靠窗等 ；",
					"click":false
				},{
					"title":"支付（审批）有效时间？",
					"value":"距离发车时间2小时以上车次，支付等待时 间为25分钟，距离发车时间2小时以内的车次，支付等待时间为5分钟；",
					"click":false
				},{
					"title":"预订的自取票，如何才能取到票？",
					"value":"自取票代购成功后，需在发车前携带购票时所使用的有效身份证件原件和电子订单号到火车站或代售点取票（电子订单号会在购票成功后以短信的方式发送到订单中联系人的手机上）。当地火车站有自动取票机的话就可以直接用二代身份证去取票。如在代售点取票，需支付5元/张手续费。",
					"click":false
				},{
					"title":"自取票如何退票？",
					"value":"客人距离发车时间35分钟之前提交退票申请 ；<br>退票 处理时间为6：00-23：00，其他时间无法提交退票申请 ；<br>订单中含有儿童，必须先将儿童票退票成功后，才能退成人票 ；<br> 退票时每次只能提交一位乘客 ； <br>如果客人已换取纸质车票，则无法进行在线申请退票，只能去车站售票窗口办理退票 ；<br>在线退票成功后，系统自动退款，退款会在1-15个工作日退回至客人交易账户 ；<br>进藏或者途径西藏等地区的部分车次被铁道部限制的情况下无法再网上办理退票和改签业务；<br>",
					"click":false 
				},{
					"title":"如何改签？",
					"value":"改签服务时间为6:00-23:00，其他时间办理改签需至火车站窗口办理 ；<br>距离发车时间1小时以上且未换取纸质车票的订单可在火车票“订单详情” 页中申请改签 ；<br>开车前48小时（不含）以上，可改签预售期内的其他车次 ；开车前48小时以内的， 可改签至票面日期当日24：00之间的其他列车，不能办理票面日期次日以后的车次 改签 ；<br>发车之后，旅客可以改签票面日期当天24点前其他有票车次，但只能在票面发站办理 改签 ；<br>改签时，如果票价高于原车次票价，则需支付新票价全部费用，改签成功后，系统自 动退回原票款 ；<br>改签时，如果票价低于原车次票价，系统自动退回差额 ；<br>每次只能提交一位乘客改签，儿童允许单独改签 ；<br>改签时，无法更改出发城市和到达城市，但是可以更改同城市的不同站点 ；",
					"click":false 
				},{
					"title":"能不能保证一定能订到票？",
					"value":"很遗憾，由于驴妈妈进行的为火车票代售，所以不能保证所有车次的车票都可以成功订购，个别热门、紧张车次，代购成功率会较低，建议您尽量提早预订。",
					"click":false 
				},{
					"title":"我同时订很多张车票，能把我们的座位安排在一起吗？",
					"value":"会尽量帮您代购相邻座位(铺位)号的票。但由于车站售票是随机的，不允许挑选，所以无法保证座位(铺位)一定是相邻的",
					"click":false 
				}
			]
			this.helperF=[
				{
					"title":"支持的航程类型？",
					"value":"直飞（经停）；",
					"click":false
				},{
					"title":"支持的乘客类型？",
					"value":"成人、儿童（2-12周岁）；",
					"click":false
				},{
					"title":"预订流程？",
					"value":"1）进入航班查询界面，在各信息栏中正确填写相应信息，点击“查询航班”；<br>2)点击“预订”，选择您所需要的航班； <br>3)在确认机票信息无误后，准确填写“乘机人信息”、“联系信息”并选择报销凭证的配送方式；<br>4)点击“提交”，差旅项目编号可选择填写；<br>5）等待支付（审核）确认；",
					"click":false
				},{
					"title":"下单时限？",
					"value":"我们将为您提供24小时全天服务，节假日照常。",
					"click":false
				},{
					"title":"机票预订为什么票价会变？",
					"value":"机票的供需关系、时间因素等均影响着机票的价格，在一分钟内都是有可能发生变化。尤其是活动的低价票，由于抢购的人较多，市场调整价格的速度跟不上页面的更新。导致用户看到的价格与实际需要支付的价格有些区别，建议您在下单后尽快支付。以免价格的变化。",
					"click":false
				},{
					"title":"机票预订为什么会失败？",
					"value":"预定失败的常见原因：系统繁忙、网络不稳定等，建议您在网络稳定的环境中预定，系统繁忙时，请您尝试返回重新预定。",
					"click":false
				},{
					"title":"支付（审批）有效时间？",
					"value":"已最终的驴妈妈短信通知的提示时间为准；",
					"click":false
				},{
					"title":"如何退票、改签？",
					"value":"如需改期可联系大交通差旅运营团队（微信）；具体的退票规则请查询APP订单详情进行查看。",
					"click":false
				}
			]
		},

		computed:{
			...mapState([
                
            ]),
		}
	}
</script>

<style lang="scss" scoped>
	@import '../../style/mixin';
	.businessTravelHelper{
		position: relative;
	    @include wh(100%,100%);
		.mate{
			@include wh(100%,100%);
		    background-color: rgba(0,0,0,.5);
		    position: absolute;
		    top: 0;
		    left: 0;
		    z-index: 12;
			>div{
				bottom: 0;
				position: absolute;
				width: 100%;
				text-align: center;
				.up{
					@include wh(94%,1.6rem);
					background-color: #fff;
					border-radius: 6px;
					margin: 0 3%;
					>p{
						height: .8rem;
    					line-height: .8rem;
					}
					>p:first-child{
						@include sc(.24rem,#666);
					}
					>p:last-child{
						@include sc(.36rem,#fe1d10);
					}
				}
				.top{
					@include wh(94%,1.02rem);
					background-color: #fff;
					line-height: 1.02rem;
					@include sc(.28rem,#107cff);
					border-radius: 6px;
					margin: .14rem 3%;
				}
			}
		}
	    .orderline{
	    	@include orderline();
	    }
	    .orderline_t{
	    	@include orderline();
	    	margin-left: .3rem !important;
	    }
	    .titleHelper{
    	    padding: 0 10%;
			background-color: #fff;
	    	>span{
	    		@include sc(.3rem,#000);
	    		height:.5rem;
	    		position: relative;
				display: inline-block;
	    	}
			>span.center{
				margin: 0 10%;
			}
	    	>span.weight{
    		    font-weight: bolder;
    		    >i{
				    position: absolute;
				    background: -webkit-linear-gradient(left, #fe686c, #fd3c71);
				    background: -webkit-gradient(left, #fe686c, #fd3c71);
				    width: 100%;
				    height: 2px;
				    bottom: 0;
				    left: 0;
	    		}
	    	}
	    }
	    .particulars{
    	    @include wh(100%,85%);
    	    overflow: scroll;
    		position: relative;
    		top: .2rem;
    		background-color: #fff;
			.spacing{
				@include wh(100%,.2rem);
				background-color: #f1f1f1;
			}
    		.detail{
    			@include wh(100%,1.24rem);
    			background-color: #fff;
    			position: relative;
    			.train{
    				@include wh(.6rem,.6rem);
    				@include ct();
                    background: url('//m.lvmama.com/flight/image/businessKind.png') -.6rem 0 no-repeat;
                    background-size: 1.2rem .6rem;
                    margin-left: .3rem;
    			}
				.flight{
					@include wh(.6rem,.6rem);
    				@include ct();
                    background: url('//m.lvmama.com/flight/image/businessKind.png') 0rem 0 no-repeat;
                    background-size: 1.2rem .6rem;
                    margin-left: .3rem;
				}
    			.title{
    				@include ct();
    				@include sc(.28rem,#000);
    				margin-left: 1rem;
    			}
    		}
    		>div{
    			.detailTitle{
    				@include wh(100%,1rem);
    				@include sc(.28rem,#000);
				    position: relative;
				    background-color: #fff;
				    line-height: 1rem;
				    padding-left: .3rem;
    			}
    			.detailValue{
    				position: relative;
				    margin-top: -.15rem;
				    color: #666;
				    font-size: .24rem;
				    background-color: #fff;
				    padding: 0 .3rem .2rem;
    			}
    		}
	    }
	}
</style>