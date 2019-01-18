<template>
	<div class="scheduleDetail">
		<head-top :depart='depart'></head-top>
		<div class="inSchedule">
			<div class="detailTop between_x_flex">
				<div>
					<p>
						<span v-if="dynamicsInfor.flightDeptimeDate">实际</span>
						<span v-if="!dynamicsInfor.flightDeptimeDate">预计</span>
						<span v-if="dynamicsInfor.flightDeptimeDate">{{dynamicsInfor.flightDeptimeDate | filterDepTime}}</span>
						<span v-if="!dynamicsInfor.flightDeptimeDate">{{dynamicsInfor.flightDeptimeReadyDate | filterDepTime}}</span>
					</p>
					<p class="changeFize" v-if="dynamicsInfor.flightDeptimeDate">{{dynamicsInfor.flightDeptimeDate | strTime}}</p>
					<p class="changeFize" v-if="dynamicsInfor.flightDeptimeDate">{{dynamicsInfor.flightDeptimeReadyDate | strTime}}</p>
					<p>计划{{dynamicsInfor.flightDeptimePlanDate | strTime}}</p>
				</div>
				<div>
					<span></span>
					<span>{{dynamicsInfor.flightState | filterState}}</span>
					<span></span>

				</div>
				<div>
					<p>
						<span v-if="dynamicsInfor.flightArrtimeDate">实际</span>
						<span v-if="!dynamicsInfor.flightArrtimeDate">预计</span>
						<span v-if="dynamicsInfor.flightArrtimeDate">{{dynamicsInfor.flightArrtimeDate | filterDepTime}}</span>
						<span v-if="!dynamicsInfor.flightArrtimeDate">{{dynamicsInfor.flightArrtimeReadyDate | filterDepTime}}</span>
					</p>
					<p class="changeFize" v-if="dynamicsInfor.flightArrtimeDate">{{dynamicsInfor.flightArrtimeDate | strTime}}</p>
					<p class="changeFize" v-if="!dynamicsInfor.flightArrtimeDate">{{dynamicsInfor.flightArrtimeReadyDate | strTime}}</p>
					<p>计划{{dynamicsInfor.flightArrtimePlanDate | strTime}}</p>
				</div>
			</div>
			<p class="reference">预计起飞时间仅供参考，值机时间不变</p>
		</div>
		<div class="scheduleContent">
			<div class="isInfor">
				<span></span>
				<div class="departInfor between_x_flex">
					<div>
						<p>起飞机场</p>
						<p v-if="dynamicsInfor.flightDepAirport">{{dynamicsInfor.flightDepAirport}}机场</p>
						<p v-if="!dynamicsInfor.flightDepAirport">--</p>
					</div>
					<div>
						<p>时间</p>
						<p v-if="dynamicsInfor.flightDeptimeDate">{{dynamicsInfor.flightDeptimeDate | filterDepTime}}  {{dynamicsInfor.flightDeptimeDate | strTime}}</p>
						<p v-if="!dynamicsInfor.flightDeptimeDate">{{dynamicsInfor.flightDeptimeReadyDate | filterDepTime}}  {{dynamicsInfor.flightDeptimeReadyDate | strTime}}</p>
						<p v-if="!dynamicsInfor.flightDeptimeDate&&!dynamicsInfor.flightDeptimeReadyDate">--</p>
					</div>
					<div>
						<p>候机楼</p>
						<p v-if="dynamicsInfor.flightHTerminal">{{dynamicsInfor.flightHTerminal}}</p>
						<p v-if="!dynamicsInfor.flightHTerminal">--</p>
					</div>
				</div>
			</div>
			<div class="isInfor arriveInfor" v-if="dynamicsInfor.alternate_info != '' && dynamicsInfor.alternate_info != null">
				<span></span>
				<div class="departInfor between_x_flex">
					<div>
						<p>备降机场</p>
						<p>{{dynamicsInfor.alternate_info[0].alternateDepCity}}</p>
					</div>
					<div>
						<p>时间</p>
						<p>--</p>
					</div>
					<div>
						<p>候机楼</p>
						<p>--</p>
					</div>
				</div>
			</div>
			<div class="isInfor arriveInfor">
				<span></span>
				<div class="departInfor between_x_flex">
					<div>
						<p>降落机场</p>
						<p v-if="dynamicsInfor.flightArrAirport">{{dynamicsInfor.flightArrAirport}}机场</p>
						<p v-if="!dynamicsInfor.flightArrAirport">--</p>
					</div>
					<div>
						<p>时间</p>
						<p v-if="dynamicsInfor.flightArrtimeDate">{{dynamicsInfor.flightArrtimeDate | filterDepTime}}  {{dynamicsInfor.flightArrtimeDate | strTime}}</p>
						<p v-if="!dynamicsInfor.flightArrtimeDate">{{dynamicsInfor.flightArrtimeReadyDate | filterDepTime}}  {{dynamicsInfor.flightArrtimeReadyDate | strTime}}</p>
						<p v-if="!dynamicsInfor.flightArrtimeDate&&!dynamicsInfor.flightArrtimeReadyDate">--</p>
					</div>
					<div>
						<p>接机楼</p>
						<p v-if="dynamicsInfor.flightTerminal">{{dynamicsInfor.flightTerminal}}</p>
						<p v-if="!dynamicsInfor.flightTerminal">--</p>
					</div>
				</div>
			</div>
		</div>
	</div>
	

</template>
<script>
	import headTop from '../../components/header/head'
	import { getDynamicDataList } from '../../service/getData'
	import { mapActions,mapState } from 'vuex'
	export default{
		data(){
			return{
				depart:"",
			}
		},
		components:{
			headTop,
			
		},
		computed:{
            ...mapState([
                'dynamicsInfor'//航班动态信息

            ])
        },
		methods:{

		},
		activated(){
			if(this.dynamicsInfor !=''&& this.dynamicsInfor !=null){
				this.depart = this.dynamicsInfor.flightNo;
			}
			
		}
	}
</script>

<style lang="scss" scoped>
@import '../../style/mixin';
.scheduleDetail{
	.inSchedule{
		@include wh(7.5rem,3.9rem);
		background:url("//m.lvmama.com/flight/image/order_finish_bg.png") no-repeat;
        background-size: 100%;
        .detailTop{
        	padding:0.7rem 10% 0.3rem 10%;
        	p,span{
        		@include sc(0.24rem,rgba(255,255,255,0.6));
        	}
        	.changeFize{
        		@include sc(0.66rem,#fff);
        	}
        	div:nth-child(2){
        		padding-top: 8%;
        		span:nth-child(2){
        			@include sc(0.32rem,#fff);
        			display: inline-block;
        			margin:0 2px;
        		}
        		span:nth-child(1),span:nth-child(3){
        			display: inline-block;
        			@include wh(0.46rem,0.08rem);
        			background:url("//m.lvmama.com/flight/image/sche_left.png") no-repeat;
        			background-size: 100%;
        			vertical-align: middle;
        		}
        		span:nth-child(3){
        			background:url("//m.lvmama.com/flight/image/sche_right.png") no-repeat;
        			background-size: 100%;
        		}
        	}
        	
        }
        .reference{
        	text-align: center;
        	@include sc(0.24rem,#fff);
        }
	}
	.scheduleContent{
		@include wh(97%,66%);
		background:#fff;
		position:absolute;
		margin:-0.6rem 0.1rem 0 0.1rem;
		border-radius: 0.1rem;
		.isInfor{
			margin:0.5rem 0.4rem;
			>span{
				display: inline-block;
				@include wh(0.3rem,0.22rem);
				background:url("//m.lvmama.com/flight/image/depart_icon.png") no-repeat;
        		background-size: 100%;
        		margin-bottom: 0.09rem;
			}
			.departInfor{
				div>p:nth-child(1){
					@include sc(0.24rem,#9f9f9f);
					padding-bottom: 0.05rem;
				}
				div>p:nth-child(2){
					@include sc(0.3rem,#000);
				}
			}
		}
		.arriveInfor{
			>span{
				@include wh(0.29rem,0.27rem);
				background:url("//m.lvmama.com/flight/image/arrive_icon.png") no-repeat;
        		background-size: 100%;
        		margin-bottom: 0.09rem;
			}
		}
	}
}
	
</style>