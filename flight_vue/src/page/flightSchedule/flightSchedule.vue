<template>
	<div class="flightSchedule_content">
		<head-top :depart='depart' :goPage="goPage" :backTravelHelper="backTravelHelper"></head-top>
		<div class="reload" v-if="isLogin">
			<span></span>
			<p>您好，登录后才能查看预定的航班动态</p>
			<div @click="toLogin">去登录</div>
		</div>
		<div class="reload toPay" v-if="isPlaceOrder">
			<span></span>
			<p>您还没有下单，请先下单</p>
			<div @click="toPayOrder">去下单</div>
		</div>
		<div class="flightDynamic" v-if="listShow">
			<ul  v-for="item in scheOrderList" @click="toNextPage(item)">
				<li class="between_x_flex">
					<div>
						<div class="flightNo">
							<span>{{item.flightOrderListFlightInfos[0].carrier.name}}</span>
							<span>{{item.flightOrderListFlightInfos[0].flightNo}}</span>
						</div>
						<div class="flightInfor">
							<span>{{item.flightOrderListFlightInfos[0].depTime | filterDepTime}}</span>
							<span>{{item.flightOrderListFlightInfos[0].depName}}-{{item.flightOrderListFlightInfos[0].arrName}}</span>
						</div>
					</div>
					<i></i>
				</li>
			</ul>
		</div>
		<div class="schedule_bottom">
			<span></span>
			<span>仅支持查询当天航班动态</span>
		</div>
		<div class="reload failMontent" v-if="isLoading">
			<span></span>
			<p>数据加载失败</p>
			<div @click="toRepeatLogin">重新加载</div>
		</div>
		<!-- <div class="toPlace" v-if="isPlaceOrder">
			<p>目的地推荐</p>
			<ul>
				<li @click="toIndex('PEK','北京')">北京</li>
				<li @click="toIndex('SHA','上海')">上海</li>
				<li @click="toIndex('CAN','广州')">广州</li>
				<li @click="toIndex('XNN','西宁')">西宁</li>
				<li @click="toIndex('SZX','深圳')">深圳</li>
				<li @click="toIndex('CTU','成都')">成都</li>
				<li @click="toIndex('XIY','西安')">西安</li>
				<li @click="toIndex('CKG','重庆')">重庆</li>
			</ul>
		</div> -->
		<alert-tip :tipContent="message" :leftButton="leftButton" v-if="showAlert" @closeAlert="returnGo"></alert-tip>
	</div>
</template>
<script>
	import headTop from '../../components/header/head'
	import { getCombinedOrderList,getLvUser,getLvUserByCookie,getDynamicDataList } from '../../service/getData'
	import { isClient,getNoticeSource,getLvSessionId,jumpLogin,getStore,setStore,removeStore } from '../../config/mUtils'
	import alertTip from '../../components/common/alertTip'
	import { mapActions,mapState } from 'vuex'
	export default{
		data(){
			return{
				depart: '航班动态',
				goPage:'travelHelper',
				isLogin:true,//是否登录
				isPlaceOrder:false,//是否下单
				listShow:false,
				scheOrderList:[],//航班动态数据
				message:"仅支持查询当天航班动态，敬请谅解",
				leftButton:"知道了",
				showAlert:false,
				isLoading:false,//数据加载失败
				serviceTime:"",//服务器时间
				flightSchedule:[],//航班动态信息
				userID:'',
				orderNo:'',
				backTravelHelper:true
			}

		},
		components:{
			headTop,
			alertTip
		},
		computed:{
            ...mapState([
                'dynamicsInfor',//航班动态信息
				'businessTravel'
            ])
        },
		methods:{
			...mapActions([
	            'initData'
	        ]),
			getOrder(userID){
				this.$parent.showLoading = true;
				getCombinedOrderList(userID).then((res) => {
					if(res.code == 1){
						this.$parent.showLoading = false;
						if(res.data && res.data.length>0){
							let	dynamicsList = res.data; 
							this.serviceTime = res.serverTime;
							for (let i = 0; i < dynamicsList.length; i++) {
								let dynamicsTime = new Date (dynamicsList[i].flightOrderListVo.flightOrderListFlightInfos[0].depTime.replace(/-/g, "/")).getTime();
								if (dynamicsList[i].combinedOrderStatus == 'ISSUE_SUCC' && (this.serviceTime <= dynamicsTime)) {
				            		this.scheOrderList.push(dynamicsList[i].flightOrderListVo);
				            	}
							};
							if(this.scheOrderList.length>0){
								this.isLoading = false;
								this.isPlaceOrder = false;
								this.listShow = true;
							}else{
								this.isLoading = false;
								this.isPlaceOrder = true;
								this.listShow = false;
							}

						}else{
							this.isLoading = false;
							this.isPlaceOrder = true;
							this.listShow = false;
						}
					}else{
						this.isLoading = true;
						this.isPlaceOrder = false;
						this.listShow = false;
						this.$parent.showLoading = false;
					}
					
            	
            	},() =>{
            		this.isLoading = true;
					this.isPlaceOrder = false;
					this.listShow = false;
            	})
			},
			toLogin(){
				jumpLogin();
			},
			toPayOrder(){
				if(this.businessTravel){
					this.$router.push(`/${this.$parent.baseUrlPath}/home`);
				}else{
					window.location.href="//m.lvmama.com/iflight/main/?hideAppHeader=1";
				}
			},
			returnGo(){
				this.showAlert = false;
			},
			toIndex(cityCode,cityName){
				if(this.businessTravel){
					this.$router.push('/'+this.$parent.baseUrlPath+'/home?destCode='+cityCode+"&dest="+cityName);
				}else{
					window.location.href="//m.lvmama.com/iflight/main/?hideAppHeader=1";
				}
			},
			toNextPage(item){
				let departTime = new Date((item.flightOrderListFlightInfos[0].depTime).replace(/-/g, "/")),
					serviceDepTime = new Date(this.serviceTime);
				if(departTime.getFullYear() == serviceDepTime.getFullYear() && departTime.getMonth() == serviceDepTime.getMonth() && departTime.getDate() == serviceDepTime.getDate()){
					this.$parent.showLoading = true;
					getDynamicDataList(item.orderNo,this.userID).then((res) =>{
						if(res.code == '1'){
							this.$parent.showLoading = false;
							if(res.data[0]){
								let ScheduleInfor = res.data[0];
								this.flightSchedule = ScheduleInfor;
									
	            				let obj ={
				                    key: 'dynamicsInfor',
				                    val: this.flightSchedule
								}
								try{
				                	this.initData(obj);
								}catch(e){}
				                // setStore("toPage",true);
								this.$router.push(`/${this.$parent.baseUrlPath}/flightScheduleDetail`);
							}else{
								this.message = "该航班暂无动态,请稍后再试";
								this.showAlert = true;
								setTimeout(function(){
									this.showAlert = false;
								},2000)
							}
							

						}else{
							this.message = res.errorMessage || res.message;
							this.showAlert = true;
							setTimeout(function(){
								this.showAlert = false;
							},2000);
							this.$parent.showLoading = false;
						}

					})

				}else{
					this.showAlert = true;
				}
				

			},
			toRepeatLogin(){
				this.getOrder();
			}
			

		},
		activated(){
			this.scheOrderList = [];
			this.isPlaceOrder=false;
            //判断有没有登录
            // if(!getStore("toPage")){
            	this.$parent.showLoading = true;
	            if(isClient() == 1){
	                getLvSessionId().then((data) => {
						if(data==null || data==undefined || data==""){
							this.$parent.showLoading = false;
						}else{
							getLvUser(data).then((res) => {
								this.$parent.showLoading = false;
								if(res.code == 1){
									this.isLogin=false;
									let userNo = res.data.userId;
									this.userID = userNo;
									this.getOrder(this.userID);
								}
							});
						}

		            }, ()=> {
		            	this.$parent.showLoading = false;
		            })
	            }else{
	                //wap登录
	               getLvUserByCookie().then((res) => {
	               		this.$parent.showLoading = false;
	                    if(res.code == 1){
	                    	this.isLogin=false;
	                		let userNo = res.data.userId;
	                		this.userID = userNo;
	                		this.getOrder(this.userID);
	                	}
	               }, ()=> {
	               	  this.$parent.showLoading = false;
	               }) 
	            }
            // }
            // removeStore("toPage");
		}
	}
	
</script>
<style lang="scss" scoped>
@import '../../style/mixin';
	.flightSchedule_content{
		@include wh(100%,100%);
	    position: relative;
	    .header .centerTitle>p>span{
	    	color:#000 !important;
	    }
	    .centerTitle>p>span{
	    	color:#000;
	    }
		.reload{
			@include center;
			text-align: center;
			span{
				display: inline-block;
				@include wh(4.6rem,4.6rem);
				background:url("//m.lvmama.com/flight/image/sche_noLogin.png") no-repeat;
                background-size: 100%;

			}
			>p{
				@include sc(0.28rem,#666);
			    padding-top: 0.52rem;
			}
			div{
				@include wh(6.7rem,0.9rem);
			    line-height: 0.9rem;
			    background-image: linear-gradient(90deg, #FE686C 0%, #FD3C71 100%);
			    @include sc(0.3rem,#fff);
			    border-radius: 100px;
			    margin-top: 0.95rem;
			    text-align: center;
			}
		}
		.toPay{
			top:40%;
			span{
				display: inline-block;
				@include wh(4.6rem,4.4rem);
				background:url("//m.lvmama.com/flight/image/sche_noOrder.png") no-repeat;
                background-size: 100%;

			}
		}
		.flightDynamic{
			@include heightByAbsolute(1.0rem,0.8rem);
			overflow-y:auto;
			ul{
				margin:0 0.1rem;
				background:#fff;
				padding:0.2rem;
				border-radius: 0.06rem;
				position:relative;
				margin-top: 0.1rem;
				.flightNo{
					padding-bottom: 0.04rem;
					@include sc(0.28rem,#333333);
				    
				}
				.flightInfor span{
					@include sc(0.24rem,#999999);
				}
			}
			i{
				display: inline-block;
				@include wh(0.14rem,0.3rem);
    			@include ct;
				right: .2rem;
				background: url(//m.lvmama.com/flight/image/pointer.png) 0 0 no-repeat;
				background-size: 100%;
			}
		}
		.schedule_bottom{
			position: absolute;
    		bottom: 0rem;
    		@include wh(100%,0.7rem);
    		line-height: 0.7rem;
    		background:#f8f8f8;
    		span:nth-child(1){
    			display: inline-block;
    			@include wh(0.28rem,0.28rem);
    			background: url("//m.lvmama.com/flight/image/bottom_img.png");
	    		background-size: 100% 100%;
	    		@include ct;
	    		left:0.3rem;
    		}
    		span:nth-child(2){
    			@include sc(0.22rem,#999999);
    			margin-left: 0.7rem;
    		}
		}
		.failMontent{
			span:nth-child(1){
    			display: inline-block;
    			@include wh(0.5rem,0.56rem);
    			background: url("//m.lvmama.com/flight/image/content_icon.png") no-repeat;
	    		background-size: 100%;
    		}
    		p{
    			@include sc(0.28rem,#9f9f9f);
    			padding-top: 0;
    		}
    		div{
    			@include wh(3.6rem,0.8rem);
    			background-color: transparent;
    			border:1px solid #fe3c71;
    			border-radius: 0.1rem;
    			@include sc(0.3rem,#fe3c71);
    			line-height: 0.8rem;
    			margin-top: 0.35rem;
    		}
		}
		.toPlace{
			position: absolute;
    		top: 72%;
    		p{
    			@include sc(0.24rem,#9f9f9f);
    			margin-bottom: .16rem;
    			padding-left: .2rem;
    		}
    		li{
    			@include wh(1.6rem,0.8rem);
    			line-height: 0.8rem;
    			background:#fff;
    			border-radius: 0.1rem;
    			float: left;
    			margin-left: 0.2rem;
    			text-align: center;
    			margin-bottom: 0.2rem;
    		}
		}
	}
</style>