<template>
	<div class="businessTravelOrderSuccess">
		<head-top :depart="depart" :goPage="goPage"></head-top>
		<div class="orderSuccessContainer">
		    <div></div>
		    <p>恭喜您下单成功</p>
		    <p>您的订单已提交，请在收到预订成功短信提示后，联系贵公司差旅负责人进行支付</p>
		    <div></div>
		    <div class="orderSuccessButton y_flex between_x_flex">
		        <span @click="jumpToOrderDetail">查看订单</span>
		        <span @click="continueOrder">继续下单</span>
		    </div>
		</div>
	</div>
</template>

<script>
	import headTop from '../../components/header/head'
	import { mapActions,mapState } from 'vuex'
	import { getStore,setStore,removeStore,isClient,orderDetailHref } from '../../config/mUtils'
	import {  } from '../../service/getData'

	export default{
		data(){
			return {
				depart:'下单成功',
				goPage:'businessTravelSuccess',
			}
		},

		components:{
			headTop
		},

		methods:{
			jumpToOrderDetail(){
				// orderDetailHref();
				this.$router.push(`/${this.$parent.baseUrlPath}/businessTravelIndex`);
			},

			continueOrder(){
				this.$router.push(`/${this.$parent.baseUrlPath}/businessTravel`);
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import '../../style/mixin';
	.businessTravelOrderSuccess{
		position: relative;
	    @include wh(100%,100%);
	    .orderSuccessContainer{
	    	width: 100%;
		    position: absolute;
		    top: .94rem;
		    left: 0;
		    background-color: #fff;
		    border-top: 1px solid #aaa;
		    > div:first-child {
			    width: 1.1rem;
			    height: 1.1rem;
			    background: url('//m.lvmama.com/flight/image/newSuccess.png') 0 0 no-repeat;
			    background-size: 100%;
			    margin: 0 auto;
			    margin-top: .8rem;
			}
			> p:nth-child(2) {
			    width: 100%;
			    text-align: center;
			    margin: .4rem 0;
			    font-size: .38rem;
			    color: #fe3c71;
			}
			> p:nth-child(3) {
			    width: 100%;
			    text-align: center;
			    margin-bottom: .4rem;
			    font-size: .24rem;
			    color: #000;
			    padding-left: .2rem;
			    padding-right: .2rem;
			    line-height: 0.4rem;
			}
			> div:nth-child(4) {
			    width: 6.9rem;
			    height: 1px;
			    margin: 0 auto;
			    border-top: 1px dashed #ddd;
			}
			.orderSuccessButton {
			    width: 5.4rem;
			    height: 1.4rem;
			    margin: 0 auto;
			    > span {
				    width: 2.5rem;
				    height: .6rem;
				    line-height: .6rem;
				    text-align: center;
				    display: inline-block;
				    font-size: .28rem;
				    border: 1px solid #fe3c71;
				    border-radius: .06rem;
				    color: #fe3c71;
				}
				> span:last-child{
				    background: #fe3c71;
				    color: #fff !important;
				}
			}
	    }
	}
</style>