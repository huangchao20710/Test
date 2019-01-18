<template>
	<div class="flight_map_contition_container">
		<head-top :depart="title" ></head-top>
		<div class="pick_condition_container y_flex">
			<div class="condition_item xy_flex" :class="{'picked':addressSearch}" @click="toggleCondition('address')">地址</div>
			<div class="condition_item xy_flex" :class="{'picked':!addressSearch}" @click="toggleCondition('theme')">主题</div>
			<div class="pick_mark" :class="{'picked':!addressSearch}"></div>
		</div>
		<div class="input_direction_container down_flex">
			<div class="input_container clearfix" v-show="addressSearch">
				<div class="pick_title">目的地</div>
				<input type="text" placeholder="请输入目的地" v-model="inputCity">
			</div>
			<div class="common_pick_container" v-show="!addressSearch">
				<ul class="pick_menu_container clearfix">
					<li class="menu_item xy_flex" v-for="item in flightMapThemes" :class="{'menu_picked':item.picked}" @click="pickMenu(item,'theme')">{{item.kind}}</li>
				</ul>
			</div>
		</div>
		<div class="pick_time_container common_pick_container" :class="{'ZT':addressSearch}">
			<div class="pick_title">时间</div>
			<ul class="pick_menu_container clearfix">
				<li class="menu_item xy_flex" v-for="item in flightMapMonth" :class="{'menu_picked':item.picked}" @click="pickMenu(item,'month')">{{item.monthName}}</li>
			</ul>
		</div>
		<div class="pick_money_container">
			<div class="pick_title">预算</div>
			<div class="drag_button_container">
				<div class="reading_number xy_flex"><span>&#165;{{pickPrice}}</span></div>
				<div class="drag_dot" @touchstart="_onTouchStart($event)"></div>
				<div class="drag_wrap" @touchstart="_onTouchStart($event)"></div>
				<div class="drag_wrap2"></div>
				<div class="low">&#165;0</div>
				<div class="high">&#165;{{maxPrice}}</div>
			</div>
		</div>
		<div class="submitButton xy_flex" @click="submitCondition">
			<span>确定</span>
		</div>
		<alert-tip v-if="showMessage" :tipContent="message" :leftButton="leftButton"></alert-tip>
	</div>
</template>

<script>
	import headTop from '../../components/header/head'
	import { mapActions,mapState } from 'vuex'
	import { getStore,setStore,addZero,trim } from '../../config/mUtils'
	import alertTip from '../../components/common/alertTip'
	import { getLowestPriceForFlight,getFlightCities } from '../../service/getData'

	export default{
		data(){
			return{
                title:"搜索条件",
                showMessage:false,//是否展示弹框
                leftButton:'',
                message:'',
                target: '',
                slideEls: null,
                maxPrice: 3000,//最高价
                pickPrice: 3000,//定位价格
                addressSearch: true,//地址搜索
                allCities: '',//所有城市
                inputCity: '',//输入搜索的城市
			}
		},
		props:[],

		components:{
			headTop,
			alertTip
		},

		methods:{
			 ...mapActions([
                'initData'
            ]),
			toggleCondition(kind) {
				if (kind === 'address') {
					this.addressSearch = true;
					for (let i = 0; i < this.flightMapThemes.length; i++) {
						this.flightMapThemes[i].picked = false;
					}
					let themeObj = {
						key: 'flightMapThemes',
						val: this.flightMapThemes
					};
					try{
						this.initData(themeObj);
					}catch(e){}
				} else {
					this.addressSearch = false;
					let inputObj = {
						key: 'flightMapInputCity',
						val: ''
					};
					try{
						this.initData(inputObj);
					}catch(e){}
				}
			},
	        _onTouchStart(e) {
	            // console.log(e.changedTouches[0].pageX)
	            // console.log(this)
	            let leftDis = e.changedTouches[0].pageX - document.querySelectorAll('.drag_dot')[0].clientWidth;
	            document.querySelectorAll('.drag_dot')[0].style.left = `${leftDis}px`;
				 document.querySelectorAll('.reading_number')[0].style.left = `${leftDis - document.querySelectorAll('.reading_number')[0].clientWidth/3.4}px`;
				 document.querySelectorAll('.drag_wrap2')[0].style.width = `${leftDis}px`;
	            this.pickPrice = Math.round(parseFloat(leftDis/document.querySelectorAll('.drag_wrap')[0].clientWidth).toFixed(1)*this.maxPrice);
	            document.addEventListener('touchmove', this._onTouchMove, false);
	            document.addEventListener('touchend', this._onTouchEnd, false);
	            document.addEventListener('mousemove', this._onTouchMove, false);
	            document.addEventListener('mouseup', this._onTouchEnd, false);
	        },
	        _onTouchMove(e) {
	        	let leftDis = e.changedTouches[0].pageX - document.querySelectorAll('.drag_dot')[0].clientWidth;
	        	if (leftDis < 0) {
	        		leftDis = 0;
	        	} else if (leftDis >= document.querySelectorAll('.drag_wrap')[0].clientWidth) {
	        		leftDis = document.querySelectorAll('.drag_wrap')[0].clientWidth;
	        	};
	        	let a = Math.round(leftDis/10);
	        	leftDis = a * 10;
	            document.querySelectorAll('.drag_dot')[0].style.left = `${leftDis}px`;
				document.querySelectorAll('.reading_number')[0].style.left = `${leftDis - document.querySelectorAll('.reading_number')[0].clientWidth/3.4}px`;
				document.querySelectorAll('.drag_wrap2')[0].style.width = `${leftDis}px`;
	            this.pickPrice = Math.round(parseFloat(leftDis/document.querySelectorAll('.drag_wrap')[0].clientWidth*this.maxPrice).toFixed(0)/100)*100;
	        },
	        _onTouchEnd(e) {
	            
	            document.removeEventListener('touchmove', this._onTouchMove);
	            document.removeEventListener('touchend', this._onTouchEnd);
	            document.removeEventListener('mousemove', this._onTouchMove);
	            document.removeEventListener('mouseup', this._onTouchEnd);
	        },
	        _stopDef(e) {
	            e.preventDefault()
	        },
			pickMenu(item,kind) {
				if (kind === 'theme') {
					if (item.picked) {
						item.picked = false;
					} else {
						for (let i = 0; i < this.flightMapThemes.length; i++) {
							this.flightMapThemes[i].picked = false;
						}
						item.picked = true;
					}
				} else {
					for (let i = 0; i < this.flightMapMonth.length; i++) {
						this.flightMapMonth[i].picked = false;
					}
					item.picked = !item.picked;
				}
			},
			submitCondition() {
				if (this.addressSearch) {
					if (this.inputCity != '') {
						this.inputCity = trim(this.inputCity);
						let findIndex = -1;
						for (let i = 0; i < this.allCities.length; i++) {
							if (this.inputCity == this.allCities[i].name) {
								findIndex = i;
								let inputObj = {
									key: 'flightMapInputCity',
									val: this.allCities[i]
								};
								try{
									this.initData(inputObj);
								}catch(e){}
							}
						}
						if (findIndex === -1) {
							this.message = `抱歉，小驴未查到${this.inputCity}城市`;
							this.showMessage = true;
							setTimeout(() => {
								this.showMessage = false;
							},2000);
							return;
						}
						setStore("reload",true);
					} else {
						let inputObj = {
							key: 'flightMapInputCity',
							val: ''
						};
						try{
							this.initData(inputObj);
						}catch(e){}
					}
				} else {
					let pickIndex = -1;
					for (let i = 0; i < this.flightMapThemes.length; i++) {
						if (this.flightMapThemes[i].picked) {
							pickIndex = i;
						}
					}
					if (pickIndex != -1) {
						let themeObj = {
							key: 'flightMapThemes',
							val: this.flightMapThemes
						};
						try{
							this.initData(themeObj);
						}catch(e){}
					} else {
						this.message = `请选择你想要的主题`;
						this.showMessage = true;
						setTimeout(() => {
							this.showMessage = false;
						},2000);
						return;
					}
				}
				let monthObj = {
					key: 'flightMapMonth',
					val: this.flightMapMonth
				};
				try{
					this.initData(monthObj);
				}catch(e){}
				let priceObj = {
					key: 'flightMapPrice',
					val: {
						low: 0,
						high: this.pickPrice
					}
				};
				try{
					this.initData(priceObj);
				}catch(e){}
				this.$router.push(`/${this.$parent.baseUrlPath}/flightMap`);
			}
		},

		created(){
			getFlightCities().then((res) => {
	            this.allCities = res.data.allCitys;
	        });
			this._onTouchMove = this._onTouchMove.bind(this);
        	this._onTouchEnd = this._onTouchEnd.bind(this);
		},

		activated(){
			
		},
		deactivated() {
			this.inputCity = '';
		},
		computed:mapState({
			flightMapThemes: state => state.flightMapThemes,
			flightMapMonth: state => state.flightMapMonth,
		})
	}
</script>

<style lang="scss" scoped>
	@import '../../style/mixin';
	.flight_map_contition_container{
		@include wh(100%,100%);
		background-color: #eeeef5;
		position: relative;
		.pick_condition_container {
			@include wh(100%,.78rem);
			position: relative;
			// border-bottom: 1px solid #ddd;
			background-color: #fff;
			.condition_item {
				@include wh(28%,inherit);
				color: #333333;
				font-size: 0.3rem;
			}
			.condition_item:first-child {
				margin-left: 22%;
			}
			.pick_mark {
				@include wh(.74rem,2px);
				background-image: linear-gradient(90deg, #FF7F6A 0%, #FD3C71 100%);
				position: absolute;
				bottom: 0;
				left: 31%;
				transition-duration: .4s;
			}
			.picked {
				color: #333333;
				left: 59%; 
				font-size: 0.3rem;
				font-weight: 600;
			}
		}
		.input_direction_container {
			@include wh(100%,auto);
			padding: 0 .2rem;
			box-sizing: border-box;
			.common_pick_container {
				padding: 0;
			}
			.input_container {
				@include wh(100%,.7rem);
				border-bottom: 1px solid #ddd;
				// margin-top: .8rem;
				.pick_title {
					// float: left;
					margin-top: .15rem;
					font-size: 0.24rem;
					color:#666666;
				}
				> input {
					background: transparent;
					// float: left;
					margin-top: .15rem;
					@include wh(100%,.88rem);
					background: #ffffff;
					border-radius: 0.1rem;
					padding-left: 0.1rem;
					box-shadow: 0 2px 6px 0 rgba(0,0,0,0.05);
				} 
			}
		}
		.pick_time_container{

		}
		.common_pick_container.ZT{
			padding-top: .8rem;
		}
		.common_pick_container {
			@include wh(100%,auto);
			padding: 0 .3rem;
			box-sizing: border-box;
			margin-top: .3rem; 
			.pick_menu_container {
				@include wh(100%,auto);
				margin-top: 0.2rem;
				.menu_item {
					@include wh(2.16rem,.8rem);
					@include sc(.24rem,#333);
					@include borderRadius(3px);
					// border: 1px solid #dfdfdf;
					margin-right: .2rem;
					float: left;
					background-color: #fff;
				}
				.menu_item:nth-child(3n) {
					margin-right: 0;
				}
				.menu_item:nth-child(n+4) {
					margin-top: .2rem;
				}
				.menu_picked {
					// border: 1px solid #FF6600;
					@include wh(2.15rem,.8rem);
					background: url('//m.lvmama.com/flight/image/picked1.png') no-repeat;
					background-size: 100% 100%;
				}
			}
		}
		.pick_money_container {
			@include wh(100%,auto);
			padding: 0 .3rem;
			padding-top: .3rem;
			box-sizing: border-box;
			.drag_button_container {
				@include wh(100%,1.36rem);
				margin: 0 auto;
				margin-top: .2rem;
				position: relative;
				.reading_number {
					@include wh(.98rem,.72rem);
					background: url('//m.lvmama.com/flight/image/readingContainer.png') 0 0 no-repeat;
					background-size: 100% 100%;
					position: absolute;
					left: 86.1%;
					top: 0;
					z-index: 2;
					> span {
						margin-bottom: .15rem;
						font-size: 0.24rem;
						color:#333;
					}
				}
				.drag_dot {
					@include wh(.54rem,.54rem);
					background: url('//m.lvmama.com/flight/image/dragingDot.png') 0 0 no-repeat;
					background-size: 100% 100%;
					position: absolute;
					left: 92%;
					bottom: 0;
					z-index: 2;
				}
				.drag_wrap {
					@include wh(92.2%,.06rem);
					@include borderRadius(.04rem);
					// background: -webkit-linear-gradient(left,#f75b53, #ec3d9b); 
					// background: -o-linear-gradient(right,#f75b53, #ec3d9b);
					// background: -moz-linear-gradient(right,#f75b53, #ec3d9b);
					// background: linear-gradient(to right,#f75b53, #ec3d9b);
					background-color: #D8D8D8;
					position: absolute;
					bottom: .26rem;
					left: 3.9%;
					z-index: 1;
				}
				.drag_wrap2 {
					@include wh(92.2%,.06rem);
					@include borderRadius(.04rem);
					background-image: linear-gradient(-90deg, #FE3C71 0%, #FE686C 100%);
					// background: -webkit-linear-gradient(left,#f75b53, #ec3d9b); 
					// background: -o-linear-gradient(right,#f75b53, #ec3d9b);
					// background: -moz-linear-gradient(right,#f75b53, #ec3d9b);
					// background: linear-gradient(to right,#f75b53, #ec3d9b);
					position: absolute;
					bottom: .26rem;
					left: 3.9%;
					z-index: 1;
				}
				.low {
					@include wh(1rem,.3rem);
					position: absolute;
					bottom: -.3rem;
					left: 0;
					font-size: .24rem;
				}
				.high {
					@include wh(1rem,.3rem);
					position: absolute;
					bottom: -.3rem;
					right: 0;
					font-size: .24rem;
				}
			}
		}	
		.pick_title {
			@include sc(.24rem,#666);
			margin-right: .3rem;
		}
		.submitButton {
			@include wh(94%,.9rem);
			background-image: linear-gradient(90deg, #FE686C 0%, #FD3C71 100%);
			border-radius: 100px;
			position: absolute;
			left: 0;
			bottom: 0.4rem;
			margin: 0 3%;
			> span {
				color: #fff;
			}
		}
	}
</style>