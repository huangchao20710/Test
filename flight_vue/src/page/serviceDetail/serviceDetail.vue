<template>
	<div class="service-detail-wrap">
		<div class="serviceDetail">
			<div class="service-detail-banner">
				<home-swiper></home-swiper>
			<div class="back_icon" @click="goBack"></div>
		</div>
		<div class="service-detail"><!-- v-if="serviceDetail" -->
			<div class="serviceContent" v-if="serviceDetail.serviceContent">
		    	<div class="title"><span class="img ser_con"></span><span class="con">服务内容</span></div>
		    	<div class="orderline"></div>
		    	<div class="content">
		            <p v-html="serviceDetail.serviceContent"></p>
		    	</div>
		    </div>

		    <div class="serviceContent">
		    	<div class="title">
			    	<span class="img ser_time"></span>
			    	<span class="con time" v-if="serviceDetail.workTimeRange.startTime && serviceDetail.workTimeRange.endTime">营业时间
			            <i>{{serviceDetail.workTimeRange.startTime | strTime}}-{{serviceDetail.workTimeRange.endTime | strTime}}</i></span>
			        <span class="con time" v-if="serviceDetail.workTimeRange.startTime && !serviceDetail.workTimeRange.endTime">营业时间
			            <i>{{serviceDetail.workTimeRange.startTime | strTime}}-最晚航班</i></span>
			        <span class="con time" v-if="!serviceDetail.workTimeRange.startTime && serviceDetail.workTimeRange.endTime">营业时间
			            <i>最早航班-{{serviceDetail.workTimeRange.endTime | strTime}}</i></span>
			        <span class="con time" v-if="!serviceDetail.workTimeRange.startTime && !serviceDetail.workTimeRange.endTime">营业时间
			            <i>最早航班-最晚航班</i></span>
		    	</div>
		    </div>

		    <div class="serviceContent" v-if="serviceDetail.location">
		    	<div class="title">
			    	<span class="img ser_place"></span>
			    	<span class="con">位置指引</span>
		    	</div>
		    	<div class="orderline"></div>
		    	<div class="content">
		            <p v-html="serviceDetail.location"></p>
		    	</div>
		    </div>

		    <div class="serviceContent" v-if="serviceDetail.tgqRule">
		    	<div class="title">
		    		<span class="img ser_desc"></span>
		    		<span class="con">使用说明</span>
		    	</div>
		    	<div class="orderline"></div>
		    	<div class="content">
		            <p v-html="serviceDetail.tgqRule"></p>
		    	</div>
		    </div>
		</div>
		</div>

	</div>
</template>

<script>
	import homeSwiper from '../../components/common/home-swiper-component'
	import { mapActions,mapState } from 'vuex'
	import { getStore,addZero } from '../../config/mUtils'

	export default{
		data(){
			return{
                
			}
		},
		props:[],

		components:{
			homeSwiper
		},

		methods:{
			goBack(){
				this.$router.go(-1);
			}
		},

		created(){
			
		},

		activated(){
			console.log(this.serviceDetail);
		},

		computed:{
			...mapState([
				'serviceDetail'
			])
		}
	}
</script>

<style lang="scss" scoped>
	@import '../../style/mixin';
	.service-detail-wrap{
		position: relative;
	    @include wh(100%,100%);
	    .serviceDetail{
	    	overflow-y: auto;
	    	position: absolute;
	    	@include wh(100%,auto);
	    	top:0;
	    	bottom:0;
	    	.service-detail-banner{
		    	@include wh(100%,5rem);
	            overflow: hidden;
	            position: relative;
            div:first-child{
            	height: inherit;
            }
            .back_icon{
            	@include wh(0.8rem,0.8rem);
			    background: url('//m.lvmama.com/flight/image/img.png') -2.7rem -4.5rem no-repeat;
			    background-size: 4rem;
			    position: absolute;
			    top: 0;
			    left: 0;
			    z-index: 2;
            }
	    }
		.service-detail{
			width: 100%;
			margin-top: -0.3rem;
			.orderline{
				@include orderline();
			}
			.serviceContent{
				margin-top: 0.2rem;
				padding: 0 0.3rem;
    			background-color: #fff;
    			.title{
    				width: 100%;
				    height: 0.9rem;
				    line-height: 0.9rem;
				    .img{
				    	width: 0.36rem;
					    height: 0.36rem;
					    display: inline-block;
					    margin-right: 0.2rem;
					    position: relative;
					    top: 0.1rem;
				    }
				    .ser_con{
				    	background: url('//m.lvmama.com/flight/image/ser_con.png') no-repeat;
    					background-size: 100%;
				    }
				    .ser_time{
			    	    background: url('//m.lvmama.com/flight/image/ser_time.png') no-repeat;
						background-size: 100%;
				    }
				    .ser_place{
				    	background: url('//m.lvmama.com/flight/image/ser_place.png') no-repeat;
    					background-size: 100%;
    					height: 0.44rem;
				    }
				    .ser_desc{
				    	background: url('//m.lvmama.com/flight/image/ser_desc.png') no-repeat;
    					background-size: 100%;
				    }
				    .con{
				    	font-size: 0.24rem;
    					color: #666;
				    }
				    .time{
				    	color: #000;
    					font-size: 0.28rem;
				    }
    			}
    			.content{
    				font-size: 0.28rem;
				    color: #000;
				    padding: 0.3rem 0;
    			}
			}
		}
	    }
	    
	}
</style>