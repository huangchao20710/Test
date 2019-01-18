<template>
	<div class="couponList">
		 <head-top :depart="title" ></head-top>
		 <div class="scroll">
		 	<div class="select-ticket">
		 		<div class="mp">
		 			<!-- <p class="bbn">使用优惠券</p> -->
		 			<p class="bbn">
		 				<input type="text" v-model="couponCode" placeholder="请输入优惠券码">
		 				<span class="proving-btn" @click="validate(-1)">{{myCoupon.couponCode!=''&&myCoupon.couponCode!=null && myCoupon.discountAmount>0 && myCoupon.couponCode==couponCode?'取消':'验证'}}</span>
		 			</p>
		 		</div>
		 		<p class="block-title">我的优惠券</p>
		 		<p class="nocoupon" v-if="newCouponList.length<=0">您的当前账户没有可用的优惠券</p>
		 		<!-- <div class="coupon-code" v-for="cp in newCouponList">
		 			<p>
		 				优惠券号：
		 				<span>{{cp.couponCode}}</span>
		 				<span class="new" v-if="cp.showNew">new</span>
		 			</p>
		 			<div class="coupons" v-bind:class="{'select':myCoupon!='' && myCoupon.couponCode==cp.couponCode && myCoupon.discountAmount>0}">
		 				<p class="name">{{cp.couponName}}</p>
		 				<p class="money">
		 					优惠金额：
		 					<span>¥ {{cp.discountAmount}}</span>
		 				</p>
		 				<p class="money">有效期：{{cp.expiredDate}}</p>
		 				<span class="wifi" v-if="cp.onlyWireless">无线专享</span>
		 				<span class="botton" v-if="myCoupon=='' || myCoupon.couponCode!=cp.couponCode || myCoupon.discountAmount==null" @click="validate(cp)">使用</span>
		 				<span class="botton" v-if="myCoupon!='' && myCoupon.couponCode==cp.couponCode && myCoupon.discountAmount>0" @click="validate(cp)">取消使用</span>
		 			</div>
		 		</div> -->
				<!-- <div class="no_coupon"><span>不使用优惠券</span><span><em :class="{'act_selected':myCoupon=='' || myCoupon.couponCode!=cp.couponCode || myCoupon.discountAmount==null}"></em></span></div> -->
				<div class="coupons">
					<div class="coupon_list y_flex" v-for="(cp,index) in newCouponList" :key="index" v-show="newCouponList != null && newCouponList !=''">
						<div class="coupon_amount">
							<p><em>¥</em>{{cp.discountAmount}}</p>
							<p>本单优惠</p>
						</div>
						<div class="coupon_desc">
							<p>{{cp.couponName}}</p>
							<p>有效期至{{cp.expiredDate.split('至')[1]}}</p>
							<i @click="showCouponDetail(cp)"></i>
						</div>
						<div class="coupon_select" @click="validate(cp)">
							<span :class="{'act_selected':myCoupon!='' && myCoupon.couponCode==cp.couponCode && myCoupon.discountAmount>0}"></span>
						</div>
					</div>
				</div>
		 	</div>
		 </div>
		 <alert-tip v-if="showMessage" :tipContent="message" :leftButton="leftButton"></alert-tip>
		 <detail-panel v-if="showFaq" :coupon="selectCoupon" @closeDetail="closeDetail"></detail-panel>
	</div>
</template>

<script>
	import headTop from '../../components/header/head'
	import alertTip from '../../components/common/alertTip'
	import detailPanel from '../../components/common/detail-panel'

	import { mapActions,mapState } from 'vuex'
	import { getStore,addZero } from '../../config/mUtils'
	import { validateCoupon } from '../../service/getData'

	export default{
		data(){
			return{
                title:"使用优惠券",
                showMessage:false,//是否展示弹框
                couponCode:'',//输入的优惠券码
                myCoupon:'',//选中的优惠券
				leftButton:'',
				newCouponList:[],
				message:'',
				showFaq:false,
				selectCoupon:'',
			}
		},
		props:[],

		components:{
			headTop,
			alertTip,
			detailPanel
		},

		methods:{
			 ...mapActions([
                'initData'
            ]),
			dateFormate(data){
				let dateTime = 30*24*60*60*1000,
		    		flag = false;
		    	let nowDate = new Date(),
		    	    dateStr = new Date(data.replace(/-/g, "/"));
		    	let diff = nowDate - dateStr;
		    	if (diff<=dateTime) {
		    		flag = true;
		    	}
		    	return flag;
			},
			showAlert(val){
				let that=this;
				this.showMessage=true;
				this.message=val;
				setTimeout(function(){that.showMessage=false;}, 2000);
			},
			validate(val){
				this.showMessage=false;
				let that=this;
				if(val==-1){
					if(that.myCoupon.couponCode!=''&&that.myCoupon.couponCode!=null && that.myCoupon.discountAmount>0 && that.myCoupon.couponCode==that.couponCode){
						that.couponCode="";
						that.myCoupon="";
						let coupon = {
			                key: 'coupon',
			                val: this.myCoupon
			            };
						try{
							this.initData(coupon);
						}catch(e){}
					}else{
						if(that.couponCode==""){
							that.showAlert("请输入优惠券号");
						}else{
							validateCoupon(that.couponCode,getStore("selectuserid")!=null?getStore("selectuserid"):'',getStore("oughtPayMoney"),this.couponListRequestObj).then((data) => {
								if (data && data.data && data.data.first && data.data.second.youhuiAmount>0) {
					        		//验证通过
					        		let validateCou = {
					        			couponCode:that.couponCode,
					        			discountAmount:data.data.second.youhuiAmount,
					        			quantity: 2,
					        			click:true
					        		}
					        		let coupon = {
						                key: 'coupon',
						                val: validateCou
						            };
									try{
										this.initData(coupon);
									}catch(e){}
				        			this.$router.push(`/${this.$parent.baseUrlPath}/orderForm`);	
					        	}else{
					        		if (data.data.second.value) {
					        			this.showAlert(data.data.second.value);
					        		}else{
					        			this.showAlert("请输入可用优惠券");
					        		}
					        	}

							})
						}
					}
					
				}else{
					if(this.myCoupon!='' && val.couponCode==this.myCoupon.couponCode && this.myCoupon.discountAmount>0){
						that.showAlert("已成功取消使用该优惠券");
						this.myCoupon={
							couponCode:null,
		        			discountAmount:null
						};
						this.myCoupon.click=true;
						let coupon = {
			                key: 'coupon',
			                val: this.myCoupon
			            };
						try{
							this.initData(coupon);
						}catch(e){}
						return;
					}
					this.myCoupon=val;
					this.myCoupon.click=true;
					let coupon = {
		                key: 'coupon',
		                val: this.myCoupon
		            };
					try{
						this.initData(coupon);
					}catch(e){}
		            this.$router.push(`/${this.$parent.baseUrlPath}/orderForm`);				
		        }
			},

			showCouponDetail(cp){
				let obj = {
					name:cp.couponName,
					endTime:cp.expiredDate,
					code:cp.couponCode
				};
				this.selectCoupon = obj;
				this.showFaq = true;
			},

			closeDetail(){
				this.showFaq = false;
			}
		},

		created(){
			
		},

		activated(){
			console.log("active");
			this.newCouponList=JSON.parse(getStore('couponList'))||[];
			console.log(this.newCouponList);
			if(this.newCouponList!='' && this.newCouponList!=null && this.newCouponList.length>0){
				for(let i=0;i<this.newCouponList.length;i++){
					this.newCouponList[i].showNew=this.dateFormate(this.newCouponList[i].gotTime);
				}
			}
			this.myCoupon=JSON.parse(JSON.stringify(this.coupon));
			if(this.myCoupon.quantity==2){
				this.couponCode=this.myCoupon.couponCode;
			}
			
		},

		computed:{
			...mapState([
                'couponList',
				'coupon',
				'couponListRequestObj'
            ])
		}
	}
</script>

<style lang="scss" scoped>
	@import '../../style/mixin';
	.couponList{
	    @include wh(100%,100%);
	    position: relative;
		.scroll{
			@include heightByAbsolute(.9rem,0);
		    overflow: auto;
		    height: 100%;
		    -webkit-overflow-scrolling: touch;
		    padding-bottom: 1rem;
		    .select-ticket{
	    	    
	    	    .block-title{
    	    	    padding: .21rem .2rem .17rem;
				    font-size: 0.28rem;
	    	    }
	    	    .nocoupon{
    	    	    margin-top: 0.2rem;
    	    	    padding-left: 0.4rem;
	    	    }
	    	    // .select{
	    	    // 	border: 1px solid #d30775!important;
	    	    // }
	    	    // .coupon-code{
    	    	//     border-left: 1px solid #fff;
    			// 	border-right: 1px solid #fff;
    			// 	> p{
				// 	    padding-right: 0.2rem;
				// 	    border-bottom: 1px solid #ddd;
				// 	    position: relative;
				// 	    padding-left: 0.2rem;
				//         color: #000;
			    //         line-height: 0.86rem;
			    //         .new{
			    //         	background-color: #D30775;
				// 		    border-radius: 3px;
				// 		    padding: 0px 0.06rem 0.04rem 0.06rem;
				// 		    margin-left: 0.06rem;
				// 		    @include sc(0.24rem,#fff);
			    //         }
    			// 	}
    			// 	.coupons{
				// 	    border-bottom: none;
				// 	    padding-right: 0.2rem;
				// 	    border-bottom: 1px solid #ddd;
				// 	    position: relative;
				//         line-height: 0.48rem;
			    //         padding:0.1rem 0 0.1rem 0.2rem;
			    //         .name{
			    //         	width: 4rem;
			    //         }
			    //         .money{
			    //         	padding:.1rem 0;
			    //         	> span{
			    //         		color: #D30775;
			    //         	}
			    //         }
			    //         .wifi{
			    //         	top: 24%!important;
				// 		    @include sc(0.24rem,#fff);
				// 		    line-height: 0.32rem;
				// 		    padding-left: 0.01rem;
				// 		    padding-right: 0.01rem;
				// 		    background-color: rgb(83, 152, 221);
				// 		    right: 0.3rem!important;
				// 		    position: absolute !important;
				// 		    left: auto!important;
				// 		    -webkit-transform: translateY(-50%);
				// 		    -moz-transform: translateY(-50%);
				// 		    transform: translateY(-50%);
			    //         }
			    //         .botton{
			    //         	@include wh(1.3rem,0.6rem);
				// 		    line-height: 0.6rem;
				// 		    color: #fff;
				// 		    text-align: center;
				// 		    background-color: #D30775;
				// 		    border-radius: 3px;
				// 		    position: absolute !important;
				// 		    top: 50%!important;
				// 		    right: 0.2rem!important;
				// 		    left: auto!important;
				// 		    -webkit-transform: translateY(-50%);
				// 		    -moz-transform: translateY(-50%);
				// 		    transform: translateY(-50%);
			    //         }
    			// 	}
				// }
				.no_coupon{
					height: 1rem;
					line-height: 1rem;
					margin: 0 0.2rem 0.2rem 0.2rem;
					border-radius: 0.1rem;
					background-color: #fff;
					padding: 0 0.2rem;
					font-size: 0.28rem;
					color: #666;
					>span:nth-child(2){
						display: inline-block;
						width: 20%;
						height: 1rem;
						position: absolute;
						right: 0;
						em{
							display: inline-block;
							width: 0.3rem;
							height: 0.3rem;
							border: 1px solid #ccc;
							border-radius: 50%;
							position: absolute;
							top: 50%;
							left: 50%;
							transform: translate(-50%,-50%);
						}
						.act_selected{
							background: url(//m.lvmama.com/flight/image/singlePicked.png) 0 0 no-repeat;
                        	background-size: 100% 100%;
						}
					}
				}
				.coupons{
					margin: 0 0.1rem;
					.coupon_list{
						background: url('//m.lvmama.com/flight/image/couponBg.png') no-repeat;
						background-size: cover;
						height: 1.8rem;
						width: 100%;
						position: relative;
						.coupon_amount{
							width: 28%;
							text-align: center;
							>p:nth-child(1){
								font-size: 0.6rem;
								color: #FF6600;
								line-height: 0.5rem;
								font-weight: bold;
								em{
									font-size: 0.24rem;
									color: #FF6600;
								}
							}
							>p:nth-child(2){
								font-size: 0.24rem;
								color: #FF6600;
							}
						}
						.coupon_desc{
							width: 42%;
							>p:nth-child(1){
								font-size: 0.3rem;
								color: #333;
								overflow: hidden;
								white-space: nowrap;
								text-overflow: ellipsis;
							}
							>p:nth-child(2){
								font-size: 0.24rem;
    							color: #999;
							}
							i{
								display: inline-block;
								width: 0.16rem;
								height: 0.16rem;
								border-top: 1px solid #ababab;
								border-right: 1px solid #ababab;
								transform: translateY(-50%) rotate(45deg);
								-webkit-transform:  translateY(-50%) rotate(45deg);
								position: absolute;
								top: 50%;
								right: 1.9rem;
							}
						}
						.coupon_select{
						    width: 20%;
						    height: 1.6rem;
						    position: relative;
						    right: -0.68rem;
							>span{
								@include wh(0.36rem,0.36rem);
								// @include center;
								display: block;
								background: url("//m.lvmama.com/flight/image/multiUnPicked.png") 0 0 no-repeat;
								background-size: 100% 100%;
								position: absolute;
							    top: 27%;
							    left: 45%;
							    -webkit-transform: translate(-27%,45%);
							    transform: translate(-27%,45%);
							}
							.act_selected{
								background: url("//m.lvmama.com/flight/image/singlePicked.png") 0 0 no-repeat;
                        		background-size: 100% 100%;
							}
						}
					}
				}
				.act_selected{
					background: url("//m.lvmama.com/flight/image/singlePicked.png") 0 0 no-repeat;
                    background-size: 100% 100%;
				}
	    	    > div{
				    position: relative;
				    > p{
			    	    padding-right: 0.2rem;
					    position: relative;
					    padding-left: 0.2rem;
					    > input{
					    	padding-left: 0.2rem;
					    	@include wh(70%,0.6rem);
						    line-height: 0.6rem;
						    border: 1px solid #ddd;
						    border-radius: 3px;
					        outline: none;
						    font-size: 0.28rem;
							border: none;
					    }
						>input::input-placeholder{
							color: #BBB;
						}
						>input::-webkit-input-placeholder{
							color: #BBB;
						}
						>input::-moz-placeholder{
							color: #BBB;
						}
						>input::-ms-placeholder{
							color: #BBB;
						}
						>input::-o-placeholder{
							color: #BBB;
						}
					    .proving-btn {
					    	@include wh(1.4rem,0.6rem);
						    line-height: 0.6rem;
						    color: #fff;
						    text-align: center;
						    border-radius: 0.5rem;
						    float: right;
						    padding-right: 0px;
							position: absolute;
							right: 0.2rem;
							top: 50%;
							transform: translateY(-50%);
							background-image: linear-gradient(90deg, #FF8800 0%, #FF6600 98%);
					    }
				    }
				    > p:first-child{
						height: 1rem;
						line-height:1rem!important;
						background-color: #fff;
				    }
				    .bbn{
						position: relative;
			    	    border-bottom: none!important;
				    }
	    	    }
	    	    .mp{
					margin-top: 0!important;
					@include topline();
	    	    }
		    }
		}
	}
</style>