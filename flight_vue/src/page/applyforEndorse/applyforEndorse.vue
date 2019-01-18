<template>
	<div class="applyforEndorse">
		<head-top :depart="title"></head-top>
		<backtochange-flight v-if="flightDetail!=''" :flightDetail="flightDetail"></backtochange-flight>
		<div class="endorse-container" :style="{'height':ecHeight}">
		    <div class="endorse-item-container" v-if="passagers!=''">
		        <div class="endorse-title">
		            <p class="one">需要改签的乘客</p>
		        </div>
		        <div class="passager-wrap">
		            <ul>
		                <li v-for="(item,index) in passagers" >
		                    <span class="endorse-item-type" v-bind:class="{'hui_type':item.passengerType == '儿童'}">
								<p>{{item.passengerType}}票</p>
								<p>{{index+1}}</p>
							</span>
		                    <span class="endorse-item-info">
		                        <p>{{item.passengerName}}</p>
		                        <p>{{item.passengerIDCardType}} {{item.passengerIDCardNo}}</p>
		                    </span>
		                </li>
		            </ul>
		        </div>
		        <div class="orderline"></div>
		        <div class="endorse-title">
		            <p class="two">联系手机<span>{{flightDetail.contactNumber}}</span></p>
		        </div>
		    </div>

            <div class="endorse-item-container" v-if="flightInfoMsg!=''">    
		        <div class="endorse-title">
		            <p class="one">改签航班 </p>
		        </div>
                <div class="destine-top">
                    <div class="destine-infor">
                        <span class="voyage" :class="{'voyageform':flightDetail.flightTripType=='去程','voyagedesc':flightDetail.flightTripType=='回程'}"></span>
                        <span>{{flightInfoMsg.departureTime | strDate}} {{flightDetail.departureCityName}}-{{flightDetail.arrivalCityName}}</span>
                    </div>
                    <div class="top-container clearfix">
                        <div class="start-place">
                            <p class="time">{{flightInfoMsg.departureTime | strTime}}</p>
                            <p>{{flightInfoMsg.departureAirportName}}{{flightInfoMsg.departureTermainalBuilding}}</p>
                        </div>
                        <div class="middle">
                            <p class="long-time">约{{flightInfoMsg.flyTime}}</p>
                            <p class="jt"></p>
                            <p class="across" v-if="flightInfoMsg.stopType=='STOPPINT'">经停</p>
                        </div>
                        <div class="end-place"> 
                            <p class="time">{{flightInfoMsg.arrivalTime | strTime}}<i class="d30" v-if="flightInfoMsg.departureTime.split(' ')[0]!=flightInfoMsg.arrivalTime.split(' ')[0]">+1</i></p>
                            <p>{{flightInfoMsg.arrivalAirportName}}{{flightInfoMsg.arrivalTerminalBuilding}}</p>
                        </div>
                    </div>
                    <div class="flex-xy">
                        <p class="info-msg">
                            <span class="air-icon"><airlines-logo :logoKind="flightInfoMsg.carrierCode"></airlines-logo></span>
                            <span class="flight-compony">{{flightInfoMsg.carrierName}}{{flightInfoMsg.flightNo}}</span>
                            <span class="flight-compony">{{flightInfoMsg.mealType | mealType}}</span>
                            <span class="small_size">{{flightInfoMsg.airplaneCode}}
                            <i v-if="flightInfoMsg.airplaneType!=null&&flightInfoMsg.airplaneType!=''">({{flightInfoMsg.airplaneType}})</i>  
                            </span>
                            <span class="flight-msg" @click="flightMessage"></span>
                        </p>
                        <p class="xy_flex share-msg" v-if="flightInfoMsg.isCodeShare">
                            <span class="share-icon"></span>
                            <span class="share-air-logo"><airlines-logo :logoKind="flightInfoMsg.shareCarrierCode"></airlines-logo></span>
                            <span class="share">实际乘坐：<i>{{flightInfoMsg.shareCarrierName}}{{flightInfoMsg.shareFlightNo}}</i></span>
                        </p>
                    </div>
                    <div class="xy_flex share-flight" v-if="flightInfoMsg.isCodeShare">
                        <p>本航班为共享航班,请按实际乘坐的航空公司柜台办理值机。</p>
                    </div>
                    <div class="name-flight">
                        <p>{{flightInfoMsg.seatClassName}}</p>
                    </div>
                </div>
		    </div>

		    <div class="endorse-item-container" v-if="flightInfoMsg==''">
		        <div class="endorse-title">
		            <p class="ct">改签日期
		                <span>{{endorseDate}}</span>
		            </p>
		        </div>
		    </div>

		    <div class="endorse-item-container">
		        <div class="endorse-title cost">
		            <p class="one">改签费用</p>
		        </div>
		        <div class="endorse-rule" v-if="flightInfoMsg!=''&&flightInfoMsg.ctmtFee!='null' && flightInfoMsg.ctmtFee!='9999' && flightInfoMsg.ctmtFee!=''&&flightInfoMsg.gapPrice!='null' && flightInfoMsg.gapPrice!=''">
                    <p>
                        <span>改签手续费</span>
                        <span>&yen;{{flightInfoMsg.ctmtFee}} X {{passagers.length}}</span>
                    </p>
                    <p>
                        <span>机票差价</span>
                        <span>&yen;{{flightInfoMsg.gapPrice}} X {{passagers.length}}</span>
                    </p>
                    <p>
                        <span>驴妈妈服务费</span>
                        <span>&yen;0 X {{passagers.length}}</span>
                    </p>
                    <p class="allMoney">
                        <span>总计金额</span>
                        <span>&yen;{{flightInfoMsg.ctmtFee*passagers.length+flightInfoMsg.gapPrice*passagers.length}}</span>
                    </p>
		        </div>
                <div class="endorse-rule" v-else>
                    <p>具体费用以航司审核为准。</p>
		        </div>
		    </div>
            <div class="schedule_bottom" v-if="flightInfoMsg!=''&&flightInfoMsg.ctmtFee!='null' && flightInfoMsg.ctmtFee!='9999' && flightInfoMsg.ctmtFee!=''&&flightInfoMsg.gapPrice!='null' && flightInfoMsg.gapPrice!=''">
                <span></span>
                <p>改签费用为驴妈妈评估，不代表最终费用，具体金额以航司审核为准。</p>
            </div>

		</div>

		<footer class="endorse-footer">
		    <a href="tel:10106060,1,6" v-if="!changePhone" class="contact-service"><span class="contact-service-icon"></span><span class="contact-service-span">客服</span></a>
			<a href="tel:10106060" v-if="changePhone" class="contact-service"><span class="contact-service-icon"></span><span class="contact-service-span">客服</span></a>
			<div class="submit-endorse" @click="submitEndorse()">提交申请</div>
		</footer>

        <!-- 机型说明 -->
        <div class="matte" v-if="isShowMsg" @click="closePop($event)">
			<div class="message-wrap">
				<div class="messageInfo">
					<div class="title">机型信息</div>
					<div class="content">
						<table>
							<tr><td>机型</td><td>{{flightInfoMsg.name.substr(0,2)}}{{flightInfoMsg.airplaneCode}}</td></tr>
							<tr><td>类型</td><td>{{flightInfoMsg.airplaneType}}</td></tr>
							<tr><td>最少座位数</td><td>{{flightInfoMsg.minSeats}}</td></tr>
							<tr><td>最多座位数</td><td>{{flightInfoMsg.maxSeats}}</td></tr>
						</table>
					</div>
				</div>
				<div class="close" @click="closePop($event)">
					<span>确定</span>
				</div>
			</div>
		</div>

		<alert-tip v-if="showAlert" :tipContent="message" :title="alertTitle" :leftButton="leftButton" :rightButton="rightButton" @closeAlert="close" @rightHandler="sure"></alert-tip>
	</div>
</template>
<script>
	import headTop from '../../components/header/head'
	import { mapState,mapActions } from 'vuex'
	import { getStore,setStore,addZero,switchDateFormate,formatIOSDate} from '../../config/mUtils'
	import { getFlightTicketRuleCharge,ctmtapply,RTVTApply} from '../../service/getData'
	import alertTip from '../../components/common/alertTip'
    import backtochangeFlight from '../../components/common/backtochange-flight-component'
    import airlinesLogo from '../../components/common/airlinesLogo'

	export default {
        data(){
            return{
                title: '申请改签',
                flightDetail:'',
                ecHeight:'',
                changePhone:false,
                endorseDate:'',
                passagers:'',
                flightInfoMsg:'',
                showAlert:false,
                message:'',
                alertTitle:'',
                leftButton:'',
                rightButton:'',
                isShowMsg:false,
                // flytimeHour:'',
				// flytimeMinute:'',
				
            }
        },
        components: {
            headTop,
			alertTip,
            backtochangeFlight,
            airlinesLogo
        },
        created() {
        },
        mounted(){
        	
        },
        methods: {
        	...mapActions([
	        	'initData',//初始化时间
            ]),
            closePop(e){
            	e.stopPropagation();
            	this.isShowMsg = false;
            },
            flightMessage(){
                this.isShowMsg = true;
            },
            getOrderDetailIds(obj) {//改签orderId获取函数
	        	var arr = [];	
	        	for (var i = 0; i < obj.length; i++) {
	        		var a = {'orderDetailId': obj[i].orderDetailId};
	        		arr.push(a);
	        	}
	        	return arr;
	        },
            submitEndorse(){
                this.showAlert=true;
                this.message='将对您选中乘客的机票进行改签，确定改签吗？';
                this.alertTitle='';
                this.leftButton='取消';
                this.rightButton='确定';
            },
            //弹框左按钮事件
            close(){
                this.showAlert=false;
                if(this.leftButton=='知道了'){
                    this.$router.push(`/${this.$parent.baseUrlPath}/orderDetail/${this.flightDetail.orderMainId}/${this.flightDetail.orderId}`);
                }
                this.message='';
                this.alertTitle='';
                this.leftButton='';
                this.rightButton='';
            },
            //弹框右按钮事件
            sure(){
                if(this.rightButton = '确定'){
                    this.submitClick();
                }else{
                    window.location.href = "tel:10106060,1,6";
                }
            },
            submitClick(){
                let userName = getStore('selectusername');
                let endorseDate=new Date(`${this.endorseInfo.year}/${this.endorseInfo.month}/${this.endorseInfo.date}`).getTime();
                let flightOrderTicketCTMTVoList=JSON.stringify(this.getOrderDetailIds(this.passagers));
                let flightOrderTicketCTMTVo=JSON.parse(flightOrderTicketCTMTVoList);
                let param = {
                    'orderId':this.flightDetail.orderId,
                    'applySource': 'LVMAMA_H5',
                    'operApply': userName,
                    'ctmtDepartureDate': endorseDate,
                    'remark': '',
                    'flightOrderTicketCTMTVoList': flightOrderTicketCTMTVo,
                };
                if(this.flightInfoMsg!='' && this.flightInfoMsg!=null){
                    param.ctmtOrderFlightNo=this.flightInfoMsg.flightNo;
                    param.ctmtReason='';
                    param.ctmtDepartureDate=this.flightInfoMsg.departureTime.split(" ")[0];
                    param.ctmtSeatClassCode=this.flightInfoMsg.seatClassCode;
                    param.poundageAmount=this.flightInfoMsg.gapPrice!='null'&&this.flightInfoMsg.ctmtFee!='9999'&&this.flightInfoMsg.ctmtFee!='null'?this.flightInfoMsg.gapPrice-(-this.flightInfoMsg.ctmtFee):'';
                }
                param=JSON.stringify(param).replace(/\\"/g,"'");
                this.close();
                this.$parent.showLoading = true;
                ctmtapply(param).then((res) => {
                    this.$parent.showLoading = false;
                    if (res.code == '1') {
                        this.alertTitle='提交成功！';
                        this.message = '请保持联系手机畅通，客服会尽快联系您';
                        this.showAlert=true;
                        this.leftButton='知道了';
                        this.rightButton='';
                    } else {
                        this.alertTitle='';
                        this.message = '如需退改，请联系客服10106060-1-6';
                        this.showAlert=true;
                        this.leftButton='取消';
                        this.rightButton='呼叫';
                    }
                })
            }
        	
        },
        activated() {
			this.changePhone=false;
			if(new Date().getHours()<9||new Date().getHours()>=20){
				this.changePhone=true;
            }
            this.ecHeight='';
            this.flightDetail=this.endorseInfo.flightDetail;
            this.passagers=this.endorseInfo.pickedPassagers;
            this.flightInfoMsg=this.endorseInfo.changeInfo;
            this.endorseDate = `${this.departDate.month}月${this.departDate.date}号 航班待定`;
            // this.flytimeHour = parseInt(this.flightInfoMsg.flytime / 60);
            // this.flytimeMinute = this.flightInfoMsg.flytime % 60;
            this.$nextTick(() => {
                let H=document.querySelectorAll('body')[0].clientHeight- document.querySelectorAll('.endorse-footer')[0].clientHeight - document.querySelectorAll('.header')[0].clientHeight - document.querySelectorAll('.backtochange')[0].clientHeight;
                this.ecHeight= H -30 + 'px';
            });
	    },
        computed:{
	        ...mapState([
                'endorseInfo',
                'departDate'
	        ])
        }
    }
</script>
<style lang="scss" scoped>
    @import '../../style/mixin';
	.applyforEndorse{
		width: 100%;
	    height: 100%;
		position: relative;
		.orderline {
		    display: block;
		    background: url('//m.lvmama.com/flight/image/orderline.png') 0 bottom repeat-x #fff;
		    background-size: auto 0.2rem;
		    margin: 0 3%;
		    width: 94%;
		    height: 1px !important;
		    padding: 0!important;
		    border-bottom: none!important;
		}
		>.endorse-container{
			width: 100%;
		    position: absolute;
		    left: 0;
		    // top: 0.94rem;
		    overflow-y: auto;
		    .endorse-item-container {
			    margin: 0 .2rem;
			    background: #fff;
			    border-radius: 3px;
			    margin-top: 0.2rem;
				.endorse-title {
				    width: 100%;
				    height: 0.84rem;
				    line-height: 0.84rem;
				    padding-left: 0.2rem;
				    color: #666;
					font-size: 0.24rem;
					position: relative;
					.ct{
						font-size: .3rem;
					}
					.one{
						color: #333;
						font-size: .28rem;
						font-family: PingFang-SC-Medium;
						font-weight: 600;
					}
					.two{
						color:#666;
						>span{
							font-size: .28rem;
						}
					}
				    span {
                        font-size: .28rem;
                        margin-left: 0.3rem;
                        color:#666;
					}
					.endorse-arrow {
					   @include ct();
					    right: .2rem;
					}
					
                }
                .cost{
                    height: .6rem;
                }
				.passager-wrap{
					li{
						width: 100%;
					    height: 1.14rem;
					    padding: 0.15rem 0;
						position: relative;
						padding-left: 0.2rem;
					    > span {
						    display: block;
						    float: left;
						    height: 100%;
						    >i{
						    	@include wh(0.4rem,0.4rem);
								@include center;
								display: block;
								background: url('//m.lvmama.com/flight/image/multiUnPicked.png') no-repeat center;
								background-size: .36rem .36rem;
						    }
						    >.picked {
							    background: url('//m.lvmama.com/flight/image/multiPicked.png') no-repeat center;
                        		background-size: .36rem .36rem;
							}				    
						}
						.endorse-item-info {
						    width: 70%;
						    color: #000;
						    >p:first-child {
							    font-size: 0.28rem;
							}
							>p:last-child {
								font-size: 0.26rem;
								color:#999;
								margin-top: .1rem;
							}
						}
						.endorse-item-type {
							width: 13%;
							text-align: center;
							border: 1px solid #5CA2F8;
							border-radius: 0.06rem;
							margin-right: 0.2rem;
							height: 0.8rem;
							>p:nth-child(1){
								background: #5CA2F8;
								color: #fff;
								font-size: 0.2rem;
								border-top-left-radius: initial;
								border-top-right-radius: initial;
							}
							>p:nth-child(2){
								color: #5CA2F8;
								margin-top: 6%;
							}
						}
						.hui_type{
							border:1px solid #FF8800;
							p:nth-child(1){
								background: #FF8800;
							}
							p:nth-child(2){
								color: #FF8800;
								margin-top: 6%;
							}
						}
					}
				}
				.endorse-rule {
				    color: #333;
				    font-size: 0.28rem;
                    padding: 0.2rem .2rem 0;
				    >p{
                        color: #666;
                        font-size: 0.26rem;
                        padding-bottom: .2rem;
                        >span{
                            color: #666;
                            font-size: 0.26rem;
                        }
                        >span:nth-child(2){
                            float: right;
                        }
                    }
                    >p.allMoney{
                        padding: .2rem 0;
                        @include topline;
                    }
                }
                .destine-top{
                    @include borderRadius(0.1rem);
                    background: #fff;
                    font-size: 0.26rem;
                    padding: 0 0 .2rem 0;
                    text-align: center;
                    .destine-infor{
                        text-align: left;
                        padding: 0 .2rem;
                        position: relative;
                        .voyage{
                            @include wh(.52rem,.28rem);
                            @include ct();
                            background: url('//m.lvmama.com/flight/image/oneway.png') no-repeat;
                            background-size: 100%;
                        }
                        .voyageform{
                            @include wh(.52rem,.28rem);
                            @include ct();
                            background: url('//m.lvmama.com/flight/image/doubleGo.png') no-repeat;
                            background-size: 100%;
                        }
                        .voyagedesc{
                            @include wh(.52rem,.28rem);
                            @include ct();
                            background: url('//m.lvmama.com/flight/image/doubleFrom.png') no-repeat;
                            background-size: 100%;
                        }
                        >span:last-child{
                            margin-left: .6rem;
                        }
                    }
                    .top-container{
                        @include w(100%);
                        padding: .2rem .2rem 0;
                        > div {
                            float: left;
                        }
                        .start-place{
                            width: 30%;
                            .time{
                                font-size: 0.48rem;
                            }
                            p:nth-child(1){
                                @include sc(0.48rem,#333333);
                            }
                            p:nth-child(2){
                                @include sc(0.24rem,#666666);
                                margin-top: .1rem;
                            }
                        }
                        .middle{
                            width: 37%;
                            margin-top: 0.15rem;
                            position: relative;
                            .long-time{
                                @include sc(0.2rem,#999999);
                            }
                            .jt{
                                @include wh(1.6rem,0.2rem);
                                @include cl;
                                background: url('//m.lvmama.com/flight/image/newjiantou.png') no-repeat;
                                background-size: 100%;
                            }
                            .across{
                                @include sc(0.2rem,#999);
                                padding-top: 0.2rem;
                            }
                        }
                        .end-place{
                            width: 30%;
                            .time{
                                font-size: 0.48rem;
                                position: relative;
                                .d30{
                                    @include sc(0.24rem,#666666);
                                    @include ct;
                                }
                            }
                            p:nth-child(1){
                                @include sc(0.48rem,#333333);
                            }
                            p:nth-child(2){
                                @include sc(0.24rem,#666666);
                                margin-top: .1rem;
                            }
                        }
                    }
                    .flex-xy{
                        font-size: 0.26rem;
                        padding-top: 0.2rem;
                        .info-msg{
                            .air-icon{
                                @include wh(0.26rem,0.26rem);
                                display: inline-block;
                                margin-right: 0.1rem;
                                vertical-align: -.03rem;
                            }
                            .flight-compony{
                                display: inline-block;
                                padding-right: 0.2rem;
                                @include sc(0.24rem,#666666);
                            }
                            .small_size{
                                @include sc(0.24rem,#666666);
                            }
                            .flight-compony:after{
                                @include wh(0.2rem,0.16rem);
                                content: "";
                                display: inline-block;
                                border-right: 1px solid #ddd;
                            }
                            .flight-msg{
                                @include wh(0.3rem,0.26rem);
                                background: url('//m.lvmama.com/flight/image/planeTypeIcon.png')
                                    no-repeat bottom left;
                                background-size: 0.24rem;
                                display: inline-block;
                                margin-left: 0.1rem;
                                vertical-align: -.03rem;
                            }

                        }
                        .share-msg{
                            font-size: 0.24rem;
                            padding-top: 0.2rem;
                            .share-icon{
                                @include wh(0.2rem,0.2rem);
                                background: url('//m.lvmama.com/flight/image/change_icon.png')
                                    no-repeat;
                                background-size: 100%;
                                display: inline-block;
                                margin-right:0.1rem; 
                            }
                            .share-air-logo{
                                @include wh(0.26rem,0.26rem);
                                display: inline-block;
                                margin-right: 0.1rem;
                            }
                            .share{
                                color: #9f9f9f;
                                > i{
                                    color: #666;
                                }
                            }
                        }
                    }
                    .share-flight{
                        @include sc(0.24rem,#666666);
                        padding-top: 0.2rem;
                        margin-top: 0.2rem;
                        border-top: 1px dashed #ccc;
                    }
                    .name-flight{
                        @include topline;
                        @include sc(0.26rem,#666);
                        margin-top: .2rem;
                        padding-top: .2rem;
                        text-align: left;
                        padding-left: .2rem;
                        >p{
                            color: #666;
                            font-size: .26rem;
                            display: inline-block;
                        }
                    }
                }
            }
            .schedule_bottom{
                position: relative;
                margin: .2rem;
                span:nth-child(1){
                    width: .3rem;
                    height: .3rem;
                    display: inline-block;
                    background: url("//m.lvmama.com/flight/image/bottom_img.png") no-repeat;
                    background-size: .28rem .28rem;
                    vertical-align: top;
                    margin-top: .05rem;
                }
                p{
                    @include sc(0.24rem,#999);
                    width: 90%;
                    display: inline-block;
                }
            }
		}
		.endorse-footer {
		    position: absolute;
		    left: 0;
		    bottom: 0;
		    width: 100%;
		    height: 1rem;
		    font-size: 0.34rem;
		    > a,>div {
			    display: block;
			    float: left;
			    text-align: center;
			    height: 1rem;
			    display: -webkit-box;
			    display: -moz-box;
			    display: -ms-flexbox;
			    display: -webkit-flex;
			    display: flex;
			    -webkit-box-pack: center;
			    -moz-justify-content: center;
			    -webkit-justify-content: center;
			    justify-content: center;
			    -webkit-box-align: center;
			    -moz-align-items: center;
			    -webkit-align-items: center;
			    align-items: center;
			    color: #fff;
			    .contact-service-icon {
				    display: inline-block;
				    width: 0.36rem;
				    height: 0.32rem;
				    background: url('//m.lvmama.com/flight/image/contact.png?v=1') no-repeat;
				    background-size: 0.36rem 0.32rem;
					top: .2rem;
                    @include cl();
				}
				.contact-service-span {
					@include cl();
					bottom: .1rem;
					color: #888;
					font-size: .24rem;
				}
			}
			.contact-service {
			    width: 20%;
			    background: #FFF;
                position: relative;
			}
			.submit-endorse {
			    width: 80%;
				background-image: linear-gradient(90deg,#FE686C ,#FD3C71);
			}
        }
        .matte{
	    	width: 100%;
		    height: 100%;
		    background-color: rgba(0,0,0,0.5);
		    position: fixed;
		    top: 0;
		    left: 0;
		    z-index: 8;
	    	.message-wrap{
	    		width: 100%;
				height:6.68rem;
	    		background-color: #fff;
			    border-radius: 6px 6px 0 0;
			    position: absolute;
			    bottom: 0;
			    margin-top: 0;
			    overflow: initial;
	    		.messageInfo{
	    			position: relative;
				    background-color: #fff;
				    overflow: hidden;
				    padding: 0.3rem;
				    border-radius: 0.12rem;
	    			.title{
	    				padding: .2rem 0 .3rem;
						color: inherit;
						font-size: .32rem;
						font-weight: 400;
						text-align: center;
	    			}
	    			.content{
						table{
							height: .6rem;
							line-height: .6rem;
							border-collapse: collapse;
							width: 100%;
							border: 1px solid #e4e4e4;
							margin: 0 0 .2rem;
							>tr{
								border: 1px solid #f3f3f3;
								@include sc(0.28rem,#666);
								>td:first-child{
									width: 30%;
									text-align: center;
									border: 1px solid #f3f3f3;
								}
								>td:last-child{
									border: 1px solid #f3f3f3;
									width: 70%;
									padding-left: .2rem;
								}
							}
							
							
						}
	    			}
	    		}
	    	}
			.close{
				width: 6.9rem;
				height: 0.88rem;
				text-align: center;
				line-height: 0.88rem;
				border-radius: 100px;
				background: linear-gradient(137deg, #FE686C, #FD3C71);
				position: absolute;
				bottom: 0.25rem;
				left:50%;
				transform: translateX(-50%);
				span{
					@include sc(0.36rem,#fff);
				}
			}
	    }
	}
</style>