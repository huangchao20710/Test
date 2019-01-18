 <template>
    <div class="order_detail_container"><!--:bookingData="bookingDate"-->
        <head-top path="/vflight" :depart="depart" type="flightList" :goPage="goPage" :rightMenu="rightMenu" @rightHandler="showTelClick" v-if="!approveTravel"></head-top>
        <head-top path="/vflight" :depart="travelDepart" type="flightList" :goPage="goPage" v-if="approveTravel"></head-top>
        <div class="order_detail_body_container" v-if="orderDetail!=''" v-bind:class="{'shift_Down': approveTravel&&orderDetail.flightOrderStatus == '待支付','new_shift':orderDetail.bookingSource=='LVMAMA_TRAVEL'&&orderDetail.flightOrderStatus == '待支付'&&!approveTravel}">
            <div class="container_common_style order_detail_state_container" :class="{'travel':orderDetail.bookingSource=='LVMAMA_TRAVEL'}">
                <div class="order_detail_state_container_top">
                    <div class="order_state between_x_flex">
                        <!-- <div v-bind:class="{'canceled':orderDetail.flightOrderStatus == '已取消','payed':orderDetail.flightOrderStatus == '已支付'||orderDetail.flightOrderStatus == '已出票', 'changed': orderDetail.flightOrderStatus == '已变更'||orderDetail.flightOrderStatus == '已退票'}">{{orderDetail.flightOrderStatus}}</div> -->
                        <div>{{orderDetail.flightOrderStatus}}</div>
                        <div class="order_total_price_detail" v-if="orderDetail.bookingSource!='LVMAMA_TRAVEL'" @click="showPriceDetail">总额:<i>¥</i><span>{{orderDetail.parPrice}}</span><div class="point_right_arrow point_price_arrow"></div></div>
                        <!-- <div class="order_djstime" v-if="orderDetail.flightOrderStatus == '待支付'">
                            剩余支付时间 
                            <span class="order-time-remain">{{minute1 + ':' + second1}}</span>
                        </div> -->
                    </div>
                    <div class="order_number" v-if="orderDetail.bookingSource!='LVMAMA_TRAVEL'">订单号：{{orderDetail.orderNo}}</div>
                    <div class="order_djstime" v-if="orderDetail.flightOrderStatus == '待支付'">请在<span class="order-time-remain">{{minute1 + ':' + second1}}</span>内完成支付，超时后订单将取消
                    <!-- <span class="order-haveToPay" v-if="payedAmount!='' && payedAmount>0">已支付¥{{payedAmount}}</span> -->
                    </div>
                    <div class="order_number" v-if="orderDetail.bookingSource=='LVMAMA_TRAVEL'&&orderDetail.flightOrderStatus == '已取消'">{{orderDetail.travelCancelReason}}</div>
                </div>
                <div class="order_detail_order_again order_detail_cancel_pay xy_flex" v-if="orderDetail.bookingSource!='LVMAMA_TRAVEL'">
                    <div class="order_detail_cancel" @click="cancelOrder" v-if="orderDetail.flightOrderStatus == '待支付' && orderDetail.bookingSource!='LVMAMA_TRAVEL'">取消订单</div>
                    <div class="order_detail_cancel cancelRight actBackColor" @click="toALLOrderPay" v-if="orderDetail.flightOrderStatus == '待支付' && orderDetail.bookingSource!='LVMAMA_TRAVEL'">去支付</div>
                    <div class="order_detail_cancel" @click="backTripClick" v-if="orderDetail.flightOrderStatus != '待支付' && orderDetail.bookingSource!='LVMAMA_TRAVEL'">返程预订</div>
                    <div class="order_detail_cancel cancelRight" @click="orderingBack" v-if="orderDetail.flightOrderStatus != '待支付' && orderDetail.bookingSource!='LVMAMA_TRAVEL'">{{orderDetail.flightOrderStatus == '已出票'?'继续预订':'重新预订'}}</div>
                </div>
                <!-- <div class="order_detail_order_again y_flex between_x_flex" @click="orderingBack" v-if="orderDetail.flightOrderStatus == '已取消'">
                    <div>再订一张</div>
                    <div class="point_right_arrow"></div>
                </div> -->
                <!-- <div class="order_detail_chat_group y_flex between_x_flex" @click="showVipDetail" v-if="orderDetail.flightOrderStatus == '已取消'">
                    <div>驴妈妈交通VIP用户群</div>
                    <div class="point_right_arrow"></div>
                </div> -->
            </div>
            <div class="theEntrance" @click="toCar"  v-if="orderDetail.bookingSource!='LVMAMA_TRAVEL'">
                <div class="jsz">
                    <i></i>
                    <div>
                        <p>接送机</p>
                        <p>专车接送，伴您出行</p>
                    </div>
                </div>
            </div>
            <!-- 商旅 -->
            <p class="travel_order" v-if="orderDetail.bookingSource=='LVMAMA_TRAVEL'">订单号：{{orderDetail.orderNo}}</p>
            <div class="travel_Infor" v-if="orderDetail.bookingSource=='LVMAMA_TRAVEL'">
                <div class="travel_Infor_name between_x_flex">
                    <span>预订人：{{orderDetail.flightOrderCustomerVo.customerName}}
                        <!-- <a href="tel:302156356" v-if="approveTravel"></a> -->
                        <i @click="callPhone" v-if="approveTravel&&orderDetail.flightOrderCustomerVo.customerCellphone!=''&&orderDetail.flightOrderCustomerVo.customerCellphone!=null"></i>
                    </span>
                    <span v-if="orderDetail.projectNo!=''&&orderDetail.projectNo!=null">项目号：{{orderDetail.projectNo}}</span>
                </div>
                <ul>
                   <li class="y_flex between_x_flex" v-if="orderDetail.adultTotal > 0">
                        <p v-if="orderDetail.saleType!='RoundTripSpecial'">{{packageShow?'成人套餐价':'成人票'}}</p>
                        <p v-if="orderDetail.saleType=='RoundTripSpecial'">成人往返套餐价</p>
                        <p>&#165;{{packageShow?orderDetail.adultPrice-(-packagePrice):orderDetail.adultPrice}}&#215;{{orderDetail.adultTotal}}人</p>
                    </li>
                    <li class="y_flex between_x_flex" v-if="orderDetail.childrenTotal > 0">
                        <p>{{packageShow?'儿童套餐价':'儿童票'}}</p>
                        <p>&#165;{{packageShow?orderDetail.childrenPrice-(-packagePrice):orderDetail.childrenPrice}}&#215;{{orderDetail.childrenTotal}}人</p>
                    </li>
                    <li class="y_flex between_x_flex" v-if="orderDetail.orderDetatil.length > 0">
                        <p>机建+燃油</p>
                        <p>&#165;{{taxTotal}}&#215;{{orderDetail.orderDetatil.length}}人</p>
                    </li>
                    <li class="y_flex between_x_flex" v-for="insurance in orderDetail.insurance" v-if="orderDetail.insurance.length > 0&&packageIn&&insurance.insuranceInfoId!=orderDetail.tagProductId" >
                        <p class="ellipsis">{{insurance.insuranceName}}</p>
                        <p v-if="orderDetail.saleType!='RoundTripSpecial'">&#165;{{insurance.insurancePrice}}&#215;{{orderDetail.orderDetatil.length}}份</p>
                        <p v-if="orderDetail.saleType=='RoundTripSpecial'">&#165;{{insurance.insurancePrice}}&#215;{{orderDetail.orderDetatil.length*2}}份</p>
                    </li>
                    <li class="y_flex between_x_flex" v-if="orderDetail.activityPrice > 0">
                        <p>优惠券<span>(仅抵扣机票金额)</span></p>
                        <p>-&#165;{{orderDetail.activityPrice}}</p>
                    </li>
                     <li class="y_flex between_x_flex" v-if="orderDetail.invinciblePrice > 0">
                        <p>无敌券<span>(仅抵扣机票金额)</span></p>
                        <p>-&#165;{{orderDetail.invinciblePrice}}</p>
                    </li>
                     <li class="y_flex between_x_flex" v-if="orderDetail.rightPrice > 0">
                        <p>权益券</p>
                        <p>-&#165;{{orderDetail.rightPrice}}</p>
                    </li>
                    <li class="y_flex between_x_flex" v-if="orderDetail.vasCouponOrders.length > 0&&packageVas &&item.vasProductId!=orderDetail.tagProductId" v-for="item in orderDetail.vasCouponOrders">
                        <p>{{item.vasProductName}}</p>
                        <p>&#165;{{item.salesPrice}}&#215;1份</p>
                    </li>
                    <li class="y_flex between_x_flex" v-if="orderDetail.expressType.length > 0">
                        <p>配送费</p>
                        <p>&#165;{{orderDetail.expressPrice}}</p>
                    </li>

                    <li class="y_flex between_x_flex sep" v-if="orderDetail.orderDirectReductionAmount.length > 0 && orderDetail.orderDirectReductionAmount > 0"></li>
                    <li class="y_flex between_x_flex" v-if="orderDetail.orderDirectReductionAmount>0">
                        <p>{{orderDetail.promotionActivity.activityName.split("|").length>1?orderDetail.promotionActivity.activityName.split("|")[1]:orderDetail.promotionActivity.activityName || "促销活动"}}</p>
                        <p>-&#165;{{orderDetail.orderDirectReductionAmount}}</p>
                    </li>
                    <li class="y_flex between_x_flex" v-if="orderDetail.flightTripType=='单程' && departure.length>0">
                        <p>{{departure[0].vasProductName}}</p>
                        <p>&#165;{{departure[0].salesPrice}}&#215;{{orderDetail.orderDetatil.length}}份</p>
                    </li>
                    <li class="y_flex between_x_flex" v-if="orderDetail.flightTripType=='去程' && departure.length>0">
                        <p>去程：{{departure[0].vasProductName}}</p>
                        <p>&#165;{{departure[0].salesPrice}}&#215;{{orderDetail.orderDetatil.length}}份</p>
                    </li>
                    <li class="y_flex between_x_flex" v-if="(orderDetail.flightTripType=='回程'|| orderDetail.saleType=='RoundTripSpecial') && returnTrip.length>0">
                        <p>回程：{{returnTrip[0].vasProductName}}</p>
                        <p>&#165;{{returnTrip[0].salesPrice}}&#215;{{orderDetail.orderDetatil.length}}份</p>
                    </li>
                    <li class="y_flex between_x_flex" v-if="transferInfo.length>0" v-for="transfer in transferInfo ">
                        <p>{{transfer.cityName}}{{transfer.transferScene}}</p>
                        <p>&#165;{{transfer.salesPrice}}</p>
                    </li>
                </ul>
                <div class="y_flex between_x_flex travel_parPrice">
                    <p>应付总额</p>
                    <p>&#165;{{orderDetail.parPrice}}</p>
                </div>
            </div>
            <!--改签单信息-->
            <div class="order_detail_info_container container_common_style" v-for="ctmtOrder in orderDetail.ctmtOrderDetails" v-if="ctmtOrder.arrTime!=0 && ctmtOrder.flightNo!=''">
                <div class="flight_detail_title">
                    <span class="title">航班信息</span>
                    <span class="is_new">新</span>
                    <span class="fenxiang" @click="fenxiangClick(ctmtOrder,'ctm')" v-if="isAPP">
                        <span class="fximg"></span>
                    </span> 
                </div>
                <div class="order_detail_info_header y_flex">
                    <!-- <span class="newFlightDetail">现</span> -->
                    <span class="orderType" :class="{'doubleTo':ctmtOrder.flightTripType=='去程','doubleFrom':ctmtOrder.flightTripType!='去程'&&ctmtOrder.flightTripType!='单程'}" ></span>
                    <span class="orderTitle">{{ctmtOrder.departureDate.split(" ")[0] | DepMonthDate}} {{ctmtOrder.departureCityName}}-{{ctmtOrder.arrivalCityName}} {{ctmtOrder.carrierName}}{{ctmtOrder.flightNo}} {{ctmtOrder.seatClassName}}</span>
                    <!-- <span class="fenxiang" @click="fenxiangClick(ctmtOrder,'ctm')" v-if="isAPP">
                        <span class="fximg"></span>
                        分享给好友 
                    </span>    -->
                </div>
                <div class="order_detail_info_body">
                    <div class="order_detail_time_info y_flex">
                        <div class="time_info xy_flex">
                            <div>
                                <div class="time xy_flex">{{ctmtOrder.departureDate.split(" ")[2]}}</div>
                                <div class="airport xy_flex">{{ctmtOrder.departureAirportName}}{{ctmtOrder.departureTerminalCode}}</div>
                            </div>    
                        </div>
                        <div class="flight_time xy_flex">
                            <div>
                                <div>{{ctmtOrder.durTimeStr}}</div>
                                <div class="spend_time_icon"></div>
                                <div v-if="ctmtOrder.stopCount!=null && ctmtOrder.stopCount!=0" class="spend_jt_icon">经停</div>
                            </div>
                        </div>
                        <div class="time_info xy_flex">
                            <div>
                                <div class="time xy_flex">{{ctmtOrder.arrivalDate.split(" ")[2]}}</div>
                                <div class="airport xy_flex">{{ctmtOrder.arrivalAirportName}}{{ctmtOrder.arrivalTerminalCode}}</div>
                            </div>
                        </div>
                    </div>
                    <div class="order_detail_plane_info y_flex" v-if="ctmtOrder.isCodeShare">
                        <!-- <div>
                            <airline-logo :logoKind="ctmtOrder.carrier"></airline-logo>
                        </div>
                        <p>{{ctmtOrder.carrierName}}{{ctmtOrder.flightNo}}</p> -->
                        <p class="codeShare" v-if="ctmtOrder.isCodeShare">实际乘坐：</p>
                        <div v-if="ctmtOrder.isCodeShare">
                            <airline-logo :logoKind="ctmtOrder.shareCarrierCode"></airline-logo>
                        </div>
                        <p v-if="ctmtOrder.isCodeShare">{{ctmtOrder.shareCarrierName}}{{ctmtOrder.shareFlightNo}}</p>
                    </div> 
                    <div class="codeShare_text" v-if="ctmtOrder.isCodeShare">
                            本航班为共享航班,请按实际乘坐的航空公司柜台办理值机。
                    </div>   
                </div>
                <div class="backChange">
                    <!-- <span class="prompt_icon"></span> -->
                    <span class="order_detail_info_footer" @click="showChange"><span></span>退改签<em v-if="orderDetail.ticketRule.luggageDesc!='' && orderDetail.ticketRule.luggageDesc!=null">/行李额</em>说明</span>
                    <!-- <span class="order_detail_info_footer" v-if="orderDetail.ticketRule.luggageDesc!='' && orderDetail.ticketRule.luggageDesc!=null" @click="showChange">行李额说明</span> -->
                    <p v-if="orderDetail.saleType=='RoundTripSpecial'">往返特惠航班须按照顺序说明，退票时若去程未使用，须往返一起退订</p>
                </div>
                <div class="buttoms" v-if="(orderDetail.flightOrderStatus == '已出票'|| orderDetail.flightOrderStatus == '已变更'||orderDetail.flightOrderStatus == '部分变更'||orderDetail.flightOrderStatus == '部分退票'||orderDetail.flightOrderStatus == '部分变更部分退票')&& !timeThree"><!--&& showRCbutton-->
                    <div>
                        <div @click="orderDetailChange('N')" class="noClick">申请改签</div>
                    </div>
                    <div>
                        <div v-if="!ctmtOrder.showRTVT" class="noClick" @click="orderDetailBack('N')">申请退票</div>
                        <div v-if="ctmtOrder.showRTVT" @click="orderDetailBack('Y',ctmtOrder)">申请退票</div>
                    </div>
                    <div>
                        <div @click="scheduleDetailClick(ctmtOrder.orderNo,ctmtOrder.depTime,ctmtOrder.flightNo)">航班动态</div>
                    </div>
                </div>
                <div class="ctmt-info" v-if="(ctmtOrder.orderStopTime > serverTime || ctmtOrder.orderPayStatus == 'PAY_SUCC'|| ctmtOrder.orderPayStatus == 'REFUND_SUCC')&&ctmtOrder.ticketDetatil&&ctmtOrder.ticketDetatil.length>0">
                    <p>改签信息</p>
                    <p>
                        <span>变更费</span>
                        <span v-if="ctmtOrder.ctmtPrice <= 0"><em>免费</em></span>
                        <span class="ctmt-price" v-if="ctmtOrder.ctmtPrice > 0">
                            <em>&#165;</em>{{ctmtOrder.ctmtPrice}}
                            <em>({{ctmtOrder.orderPayStatus == "PAY_SUCC"? "已支付": ctmtOrder.orderPayStatus == "REFUND_SUCC"?"已退款":"待支付"}})</em>
                        </span>
                    </p>
                    <p>
                        <span>改签乘机人</span>
                        <span>
                            <span v-for="(ctmtTicket,index) in ctmtOrder.ticketDetatil">{{ctmtTicket.passengerName}}<span v-if="index!=ctmtOrder.ticketDetatil.length-1">、</span></span>
                        </span>
                    </p>
                    <div class="ctmt-flight-info" @click="jumpCtmtPay(ctmtOrder)" v-if="ctmtOrder.orderPayStatus == 'NOT_PAY' && ctmtOrder.ctmtPrice > 0 &&orderDetail.bookingSource!='LVMAMA_TRAVEL'">支付变更费</div>
                     <div class="ctmt-flight-info" @click="jumpCtmtPay(ctmtOrder)" v-if="ctmtOrder.orderPayStatus == 'NOT_PAY' && ctmtOrder.ctmtPrice > 0 &&orderDetail.bookingSource=='LVMAMA_TRAVEL' &&approveTravel">审批变更费</div>
                </div>
            </div>
            <!--真往返返程改签单信息-->
            <div class="order_detail_info_container container_common_style" v-for="ctmtOrder in orderDetail.returnFlightOrderDetailViewVo.ctmtOrderDetails" v-if="orderDetail.saleType=='RoundTripSpecial'&& orderDetail.returnFlightOrderDetailViewVo&&ctmtOrder.arrTime!=0 && ctmtOrder.flightNo!=''">
                <div class="flight_detail_title">
                    <span class="title">航班信息</span>
                    <span class="is_new">新</span>
                    <span class="fenxiang" @click="fenxiangClick(ctmtOrder,'ctm')" v-if="isAPP">
                        <span class="fximg"></span>
                    </span> 
                </div>
                <div class="order_detail_info_header y_flex">
                    <!-- <span class="newFlightDetail">现</span> -->
                    <span class="orderType" :class="{'doubleTo':ctmtOrder.flightTripType=='去程','doubleFrom':ctmtOrder.flightTripType!='去程'&&ctmtOrder.flightTripType!='单程'}" ></span>
                    <span class="orderTitle">{{(ctmtOrder.departureDate | switchDate).split(" ")[0] | DepMonthDate}} {{ctmtOrder.departureAirportName}}-{{ctmtOrder.arrivalAirportName}} {{ctmtOrder.carrierName}}{{ctmtOrder.flightNo}} {{ctmtOrder.seatClassName}}</span>
                    <!-- <span class="fenxiang" @click="fenxiangClick(ctmtOrder,'ctm')" v-if="isAPP">
                        <span class="fximg"></span>
                    </span>    -->
                </div>
                <div class="order_detail_info_body">
                    <div class="order_detail_time_info y_flex">
                        <div class="time_info xy_flex">
                            <div>
                                <div class="time xy_flex">{{(ctmtOrder.depTime | switchDate).split(" ")[2]}}</div>
                                <div class="airport xy_flex">{{ctmtOrder.departureAirportName}}{{ctmtOrder.departureTerminalCode}}</div>
                            </div>    
                        </div>
                        <div class="flight_time xy_flex">
                            <div>
                                <div>{{ctmtOrder.flyTime | flyTime}}</div>
                                <div class="spend_time_icon"></div>
                                <div v-if="ctmtOrder.stopCount!=null && ctmtOrder.stopCount!=0" class="spend_jt_icon">经停</div>
                            </div>
                        </div>
                        <div class="time_info xy_flex">
                            <div>
                                <div class="time xy_flex">{{(ctmtOrder.arrTime | switchDate).split(" ")[2]}}</div>
                                <div class="airport xy_flex">{{ctmtOrder.arrivalAirportName}}{{ctmtOrder.arrivalTerminalCode}}</div>
                            </div>
                        </div>
                    </div>
                    <div class="order_detail_plane_info y_flex" v-if="ctmtOrder.isCodeShare">
                        <!-- <div>
                            <airline-logo :logoKind="ctmtOrder.carrier"></airline-logo>
                        </div>
                        <p>{{ctmtOrder.carrierName}}{{ctmtOrder.flightNo}}</p> -->
                        <p class="codeShare" v-if="ctmtOrder.isCodeShare">实际乘坐：</p>
                        <div v-if="ctmtOrder.isCodeShare">
                            <airline-logo :logoKind="ctmtOrder.shareCarrierCode"></airline-logo>
                        </div>
                        <p v-if="ctmtOrder.isCodeShare">{{ctmtOrder.shareCarrierName}}{{ctmtOrder.shareFlightNo}}</p>
                    </div> 
                    <div class="codeShare_text" v-if="ctmtOrder.isCodeShare">
                            本航班为共享航班,请按实际乘坐的航空公司柜台办理值机。
                    </div>   
                </div>
                <div class="backChange">
                    <!-- <span class="prompt_icon"></span> -->
                    <span class="order_detail_info_footer" @click="showChange"><span></span>退改签<em v-if="orderDetail.ticketRule.luggageDesc!='' && orderDetail.ticketRule.luggageDesc!=null">/行李额</em>说明</span>
                    <!-- <span class="order_detail_info_footer" v-if="orderDetail.ticketRule.luggageDesc!='' && orderDetail.ticketRule.luggageDesc!=null" @click="showChange">行李额说明</span> -->
                    <p v-if="orderDetail.saleType=='RoundTripSpecial'">往返特惠航班须按照顺序说明，退票时若去程未使用，须往返一起退订</p>
                </div>
                <div class="buttoms" v-if="(orderDetail.flightOrderStatus == '已出票'|| orderDetail.flightOrderStatus == '已变更'||orderDetail.flightOrderStatus == '部分变更'||orderDetail.flightOrderStatus == '部分退票'||orderDetail.flightOrderStatus == '部分变更部分退票')&& !timeThree"><!--&& showRCbutton-->
                    <div>
                        <div @click="orderDetailChange('N')" class="noClick">申请改签</div>
                    </div>
                    <div>
                        <div class="noClick" @click="orderDetailBack('N')">申请退票</div>
                    </div>
                    <div>
                        <div @click="scheduleDetailClick(ctmtOrder.orderNo,ctmtOrder.depTime,ctmtOrder.flightNo)">航班动态</div>
                    </div>
                </div>
                <div class="ctmt-info" v-if="(ctmtOrder.orderStopTime > serverTime || ctmtOrder.orderPayStatus == 'PAY_SUCC'|| ctmtOrder.orderPayStatus == 'REFUND_SUCC')&&ctmtOrder.ticketDetatil&&ctmtOrder.ticketDetatil.length>0">
                    <p>改签信息</p>
                    <p>
                        <span>变更费</span>
                        <span v-if="ctmtOrder.ctmtPrice <= 0"><em>免费</em></span>
                        <span class="ctmt-price" v-if="ctmtOrder.ctmtPrice > 0">
                            <em>&#165;</em>{{ctmtOrder.ctmtPrice}}
                            <em>({{ctmtOrder.orderPayStatus == "PAY_SUCC"? "已支付": ctmtOrder.orderPayStatus == "REFUND_SUCC"?"已退款":"待支付"}})</em>
                        </span>
                    </p>
                    <p>
                        <span>改签乘机人</span>
                        <span>
                            <span v-for="(ctmtTicket,index) in ctmtOrder.ticketDetatil">{{ctmtTicket.passengerName}}<span v-if="index!=ctmtOrder.ticketDetatil.length-1">、</span></span>
                        </span>
                    </p>
                    <div class="ctmt-flight-info" @click="jumpCtmtPay(ctmtOrder)" v-if="ctmtOrder.orderPayStatus == 'NOT_PAY' && ctmtOrder.ctmtPrice > 0&&orderDetail.bookingSource!='LVMAMA_TRAVEL'">支付变更费</div>
                    <div class="ctmt-flight-info" @click="jumpCtmtPay(ctmtOrder)" v-if="ctmtOrder.orderPayStatus == 'NOT_PAY' && ctmtOrder.ctmtPrice > 0&&orderDetail.bookingSource=='LVMAMA_TRAVEL' &&approveTravel">审批变更费</div>
                </div>
            </div>
            <!--原单信息-->
            <div class="order_detail_info_container container_common_style">
                <div class="flight_detail_title">
                    <span class="title">航班信息</span>
                    <span class="fenxiang" @click="fenxiangClick(orderDetail,'order')" v-if="isAPP">
                        <span class="fximg"></span>
                    </span> 
                </div>
                <div class="order_detail_info_header y_flex">
                    <span class="oldFlightDetail" v-if="orderDetail.flightOrderStatus == '已变更'||orderDetail.flightOrderStatus == '部分变更'">原</span>
                    <span class="orderType" :class="{'doubleTo':orderDetail.flightTripType=='去程','doubleFrom':orderDetail.flightTripType!='去程'&&orderDetail.flightTripType!='单程'}" ></span>
                    <span class="orderTitle">{{departureDate.split(" ")[0] | DepMonthDate}} {{orderDetail.departureCityName}}-{{orderDetail.arrivalCityName}} {{orderDetail.carrierName}}{{orderDetail.flightNo}} {{orderDetail.seatClassName}}</span>
                      
                </div>
                <div class="order_detail_info_body">
                    <div class="order_detail_time_info y_flex">
                        <div class="time_info xy_flex">
                            <div>
                                <div class="time xy_flex">{{departureDate.split(" ")[2]}}</div>
                                <div class="airport xy_flex">{{orderDetail.depName}}{{orderDetail.departureTerminalCode}}</div>
                            </div>    
                        </div>
                        <div class="flight_time xy_flex">
                            <div>
                                <div>{{durTimeStr}}</div>
                                <div class="spend_time_icon"></div>
                                <div v-if="orderDetail.stopCount!=null && orderDetail.stopCount!=0" class="spend_jt_icon">经停</div>
                            </div>
                        </div>
                        <div class="time_info xy_flex">
                            <div>
                                <div class="time xy_flex">{{arrivalDate.split(" ")[2]}}</div>
                                <div class="airport xy_flex">{{orderDetail.arrName}}{{orderDetail.arrivalTerminalCode}}</div>
                            </div>
                        </div>
                    </div>
                    <div class="order_detail_plane_info y_flex" v-if="orderDetail.isCodeShare">
                        <!-- <div>
                            <airline-logo :logoKind="orderDetail.carrierCode"></airline-logo>
                        </div>
                        <p>{{orderDetail.carrierName}}{{orderDetail.flightNo}}</p> -->
                        <p class="codeShare" v-if="orderDetail.isCodeShare">实际乘坐：</p>
                        <div v-if="orderDetail.isCodeShare">
                            <airline-logo :logoKind="orderDetail.shareCarrierCode"></airline-logo>
                        </div>
                        <p v-if="orderDetail.isCodeShare">{{orderDetail.shareCarrierName}}{{orderDetail.shareFlightNo}}</p>
                    </div> 
                    <div class="codeShare_text" v-if="orderDetail.isCodeShare">
                            本航班为共享航班,请按实际乘坐的航空公司柜台办理值机。
                    </div>   
                </div>
                <div class="backChange">
                    <!-- <span class="prompt_icon"></span> -->
                    <span class="order_detail_info_footer" @click="showChange"><span></span>退改签<em v-if="orderDetail.ticketRule.luggageDesc!='' && orderDetail.ticketRule.luggageDesc!=null">/行李额</em>说明</span>
                    <!-- <span class="order_detail_info_footer" v-if="orderDetail.ticketRule.luggageDesc!='' && orderDetail.ticketRule.luggageDesc!=null" @click="showChange">行李额说明</span> -->
                    <p v-if="orderDetail.saleType=='RoundTripSpecial'">往返特惠航班须按照顺序说明，退票时若去程未使用，须往返一起退订</p>
                </div>
                <div class="buttoms" v-if="(orderDetail.flightOrderStatus == '已出票'|| orderDetail.flightOrderStatus == '已变更'||orderDetail.flightOrderStatus == '部分变更'||orderDetail.flightOrderStatus == '部分退票'||orderDetail.flightOrderStatus == '部分变更部分退票')&& !timeThree"><!--&& showRCbutton-->
                    <div>
                        <div v-if="!showctbutton||orderDetail.saleType=='RoundTripSpecial'" @click="orderDetailChange('N')" class="noClick">申请改签</div>
                        <div v-if="showctbutton&&orderDetail.saleType!='RoundTripSpecial'" @click="orderDetailChange('Y')">申请改签</div>
                    </div>
                    <div>
                        <div v-if="!showrtbutton||orderDetail.saleType=='RoundTripSpecial'" class="noClick" @click="orderDetailBack('N')">申请退票</div>
                        <div v-if="showrtbutton&&orderDetail.saleType!='RoundTripSpecial'" @click="orderDetailBack('Y')">申请退票</div>
                    </div>
                    <div>
                        <div v-if="orderDetail.flightOrderStatus == '已出票'||orderDetail.flightOrderStatus == '部分变更'||orderDetail.flightOrderStatus == '部分退票'" @click="scheduleDetailClick(orderDetail.orderNo,orderDetail.depTime,orderDetail.flightNo)">航班动态</div>
                        <div v-if="orderDetail.flightOrderStatus != '已出票'&&orderDetail.flightOrderStatus != '部分变更'&&orderDetail.flightOrderStatus != '部分退票'" class="noClick">航班动态</div>
                    </div>
                </div>
            </div>
            <!--真往返返程信息-->
            <div class="order_detail_info_container container_common_style" v-if="orderDetail.saleType=='RoundTripSpecial'&& orderDetail.returnFlightOrderDetailViewVo">
                <!-- <div class="flight_detail_title">
                    <span class="title">航班信息</span>
                    <span class="fenxiang" @click="fenxiangClick(orderDetail.returnFlightOrderDetailViewVo,'order','rflight')" v-if="isAPP">
                        <span class="fximg"></span>
                    </span> 
                </div> -->
                <div class="order_detail_info_header y_flex">
                    <span class="oldFlightDetail" v-if="orderDetail.flightOrderStatus == '已变更'||orderDetail.flightOrderStatus == '部分变更'">原</span>
                    <span class="orderType doubleFrom"></span>
                    <span class="orderTitle">{{zhendepartureDate.split(" ")[0] | DepMonthDate}} {{orderDetail.returnFlightOrderDetailViewVo.departureCityName}}-{{orderDetail.returnFlightOrderDetailViewVo.arrivalCityName}} {{orderDetail.returnFlightOrderDetailViewVo.carrierName}}{{orderDetail.returnFlightOrderDetailViewVo.flightNo}} {{orderDetail.returnFlightOrderDetailViewVo.seatClassName}}</span>
                    <!-- <span class="fenxiang" @click="fenxiangClick(orderDetail.returnFlightOrderDetailViewVo,'order','rflight')" v-if="isAPP">
                        <span class="fximg"></span>
                    </span>    -->
                </div>
                <div class="order_detail_info_body">
                    <div class="order_detail_time_info y_flex">
                        <div class="time_info xy_flex">
                            <div>
                                <div class="time xy_flex">{{zhendepartureDate.split(" ")[2]}}</div>
                                <div class="airport xy_flex">{{orderDetail.returnFlightOrderDetailViewVo.depName}}{{orderDetail.returnFlightOrderDetailViewVo.departureTerminalCode}}</div>
                            </div>    
                        </div>
                        <div class="flight_time xy_flex">
                            <div>
                                <div>{{zhendurTimeStr}}</div>
                                <div class="spend_time_icon"></div>
                                <div v-if="orderDetail.returnFlightOrderDetailViewVo.stopCount!=null && orderDetail.returnFlightOrderDetailViewVo.stopCount!=0" class="spend_jt_icon">经停</div>
                            </div>
                        </div>
                        <div class="time_info xy_flex">
                            <div>
                                <div class="time xy_flex">{{zhenarrivalDate.split(" ")[2]}}</div>
                                <div class="airport xy_flex">{{orderDetail.returnFlightOrderDetailViewVo.arrName}}{{orderDetail.returnFlightOrderDetailViewVo.arrivalTerminalCode}}</div>
                            </div>
                        </div>
                    </div>
                    <div class="order_detail_plane_info y_flex" v-if="orderDetail.returnFlightOrderDetailViewVo.isCodeShare">
                        <!-- <div>
                            <airline-logo :logoKind="orderDetail.returnFlightOrderDetailViewVo.carrierCode"></airline-logo>
                        </div>
                        <p>{{orderDetail.returnFlightOrderDetailViewVo.carrierName}}{{orderDetail.returnFlightOrderDetailViewVo.flightNo}}</p> -->
                        <p class="codeShare" v-if="orderDetail.returnFlightOrderDetailViewVo.isCodeShare">实际乘坐：</p>
                        <div v-if="orderDetail.returnFlightOrderDetailViewVo.isCodeShare">
                            <airline-logo :logoKind="orderDetail.returnFlightOrderDetailViewVo.shareCarrierCode"></airline-logo>
                        </div>
                        <p v-if="orderDetail.returnFlightOrderDetailViewVo.isCodeShare">{{orderDetail.returnFlightOrderDetailViewVo.shareCarrierName}}{{orderDetail.returnFlightOrderDetailViewVo.shareFlightNo}}</p>
                    </div> 
                    <div class="codeShare_text" v-if="orderDetail.returnFlightOrderDetailViewVo.isCodeShare">
                            本航班为共享航班,请按实际乘坐的航空公司柜台办理值机。
                    </div>   
                </div>
                <div class="backChange">
                    <!-- <span class="prompt_icon"></span> -->
                    <span class="order_detail_info_footer" @click="showChange"><span></span>退改签<em v-if="orderDetail.ticketRule.luggageDesc!='' && orderDetail.ticketRule.luggageDesc!=null">/行李额</em>说明</span>
                    <!-- <span class="order_detail_info_footer" v-if="orderDetail.ticketRule.luggageDesc!='' && orderDetail.ticketRule.luggageDesc!=null" @click="showChange">行李额说明</span> -->
                    <p v-if="orderDetail.saleType=='RoundTripSpecial'">往返特惠航班须按照顺序说明，退票时若去程未使用，须往返一起退订</p>
                </div>
                <div class="buttoms" v-if="(orderDetail.flightOrderStatus == '已出票'|| orderDetail.flightOrderStatus == '已变更'||orderDetail.flightOrderStatus == '部分变更'||orderDetail.flightOrderStatus == '部分退票'||orderDetail.flightOrderStatus == '部分变更部分退票')&& !timeThree "><!--&& showRCbutton-->
                    <div>
                        <div v-if="!showctbutton||orderDetail.saleType=='RoundTripSpecial'" @click="orderDetailChange('N')" class="noClick">申请改签</div>
                        <div v-if="showctbutton&&orderDetail.saleType!='RoundTripSpecial'" @click="orderDetailChange('Y')">申请改签</div>
                    </div>
                    <div>
                        <div v-if="!showrtbutton||orderDetail.saleType=='RoundTripSpecial'" class="noClick" @click="orderDetailBack('N')">申请退票</div>
                        <div v-if="showrtbutton&&orderDetail.saleType!='RoundTripSpecial'" @click="orderDetailBack('Y')">申请退票</div>
                    </div>
                    <div>
                        <div v-if="orderDetail.flightOrderStatus == '已出票'||orderDetail.flightOrderStatus == '部分变更'||orderDetail.flightOrderStatus == '部分退票'" @click="scheduleDetailClick(orderDetail.orderNo,orderDetail.depTime,orderDetail.flightNo)">航班动态</div>
                        <div v-if="orderDetail.flightOrderStatus != '已出票'&&orderDetail.flightOrderStatus != '部分变更'&&orderDetail.flightOrderStatus != '部分退票'" class="noClick">航班动态</div>
                    </div>
                </div>
            </div>
            <div class="rtmt-info" v-for="rtvtOrder in orderDetail.rtvtOrderDetails">
                <p>退票信息</p>
                <p>
                    <span>退票费</span>
                    <span>
                        <i>&#165;</i>{{rtvtOrder.rtvtFeeAmount}}
                    </span>
                </p>
                <p>
                    <span>实退金额</span>
                    <span>
                        <i>&#165;</i>{{rtvtOrder.orderRefundedAmount}}
                    </span>
                </p>
                <p>
                    <span>退票乘机人</span>
                    <span class="rtName">
                        <span v-for="(rtvtTicket,index) in rtvtOrder.ticketDetatil">
                            {{rtvtTicket.passengerName}}
                            <span v-if="index!=rtvtOrder.ticketDetatil.length-1">、</span>
                        </span>
                    </span>
                </p>
            </div>
            <div class="order_detail_passengers_container container_common_style" v-bind:class="{'detail-up':showPassDetail==false}">
                <div class="order_title">乘机人</div>
                <div class="order_passengers_container" v-for="(person,index) in orderDetail.orderDetatil" v-if="showPassDetail==true">
                    <div class="passenger_type" v-bind:class="{'change_color':person.passengerType == '儿童'}"><p class="type">{{person.passengerType}}票</p><p class="person_index">{{index+1}}</p></div>
                    <div class="passenger_detail">
                        <div class="y_flex">
                            <!-- <div class="order_title"></div> -->
                            <div class="passenger_name">
                                <div v-bind:class="{'caaa':person.ticketStauts == '退票成功'}">{{person.passengerName}}</div>
                                <span class="status" v-if="orderDetail.saleType!='RoundTripSpecial'&&person.ticketStauts!=null &&person.ticketStauts!=''">{{person.ticketStauts}}</span>
                                <span class="status" v-if="orderDetail.saleType=='RoundTripSpecial'&&person.departureStatus!=null &&person.departureStatus!=''">{{person.departureStatus}}</span>
                                <span class="status" v-if="orderDetail.saleType=='RoundTripSpecial'&&person.returnStatus!=null &&person.returnStatus!=''">{{person.returnStatus}}</span>
                            </div>        
                        </div>
                        <div class="num y_flex">
                            <!-- <div class="order_title"></div> -->
                            <div class="eyes actsc" v-bind:class="{'caaa':person.ticketStauts == '退票成功'}">{{person.passengerIDCardType}} {{person.passengerIDCardNo}}<span @click="showEyes=true"><i></i></span></div>
                        </div>
                        <div class="num y_flex">
                            <!-- <div class="order_title"></div> -->
                            <div class="actsc" v-bind:class="{'caaa':person.ticketStauts == '退票成功'}" v-if="person.ticketNo.length > 0">客票号 <i class="actsc">{{person.ticketNo}}</i></div>
                            <span class="new" v-if="person.ticketStauts == '改签成功'">新</span>
                        </div>
                        <div class="num y_flex" v-for="insuran in person.insurances" v-if="insuran.insuranceNo.length > 0">
                            <!-- <div class="order_title"></div> -->
                            <div class="actsc">{{insuran.insuranceName}}: <i class="actsc">{{insuran.insuranceNo}}</i></div>
                            <span class="new" v-if="person.ticketStauts == '改签成功'">新</span>
                        </div>
                    </div>
                </div>
                <!-- <div class="order_passengers_container y_flex" v-if="showPassDetail==false">
                    <div class="order_title">乘机人</div>
                    <div class="names">
                        <span v-for="(name,index) in orderDetail.orderDetatil">
                            {{name.passengerName}}
                            <span v-if="index!=orderDetail.orderDetatil.length-1">、</span>
                        </span>
                    </div>
                </div> -->
                <div class="order_phone_number y_flex" v-if="showPassDetail==true">
                    <div class="order_title">联系手机</div>
                    <div class="eyes">{{orderDetail.cellphone}}<span @click="showEyes=true"><i></i></span></div>
                </div>
                <!-- <i class="arrow" @click="showPassDetail=!showPassDetail"></i> -->
            </div>
            <div class="order-post" v-if="orderDetail.vasOrders.length>0" v-bind:class="{'detail-up': !showServiceDetail}">
                <div>
                    <span class="title">机场服务</span>
                    <div class="post-info" v-if="!showServiceDetail">
                        <span>{{orderDetail.vasOrders[0].vasProductName}}<span class="i" v-click="showService(orderDetail.vasOrders[0].vasProductId)"></span></span>
                    </div>
                    <div class="post-info" v-if="departure.length>0 && showServiceDetail">
                        <span>{{departure[0].vasProductName}}<span class="i" @click="showService(departure[0].vasProductId)"></span></span>
                        <p style="padding-right: 0px;" v-for="vasOrderGo in departure" >
                            服务编号：{{vasOrderGo.voucher}}
                            <em>({{vasOrderGo.status | vasOrderStatus}})</em>
                        </p>
                    </div>
                    <div class="post-info" v-if="returnTrip.length>0 && showServiceDetail">
                        <span>{{returnTrip[0].vasProductName}}<span class="i" @click="showService(returnTrip[0].vasProductId)"></span></span>
                        <p style="padding-right: 0px;" v-for="vasOrderBack in returnTrip">
                            服务编号：{{vasOrderBack.voucher}}
                            <em>({{vasOrderBack.status | vasOrderStatus}})</em>
                        </p>
                    </div>
                </div>
                <i class="arrow" @click="showServiceDetail=!showServiceDetail" v-if="departure.length>0 && returnTrip.length>0"></i>
            </div>
            <div class="order-post" v-if="orderDetail.vasCouponOrders.length > 0">
                <div>
                    <span class="title">特惠专享</span>
                    <div class="post-info">
                        <div v-for="item in orderDetail.vasCouponOrders">
                            <span>{{item.vasProductName}}</span>
                            <!-- <span>&#165;{{item.salesPrice}}</span> -->
                            <span style="color: #ff8800;">{{item.vasProductDesc}}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="airport-transfer" v-if="transferInfo && transferInfo.length>0">
                <div class="title y_flex">
                    <span>接送机信息</span>
                    <span class="is_show" @click="isShowAll"><i :class="{'hiddenTrans':!showTrans}"></i></span>
                    <!-- <span class="transMsg" v-if="isShowTransferRemark" @click="transferClick(transferInfo)">退改说明</span> -->
                </div>
                <!-- <div class="orderline"></div> -->
                <div class="content" v-if="showTrans">
                    <div class="transfer" v-for="(transfer,index) in transferInfo" :key="index">
                        <div class="meet-airport">
                            <div class="meet meetAct">
                                <p class="meet-cont">
                                    <!-- <span class="meet-song" v-if="orderDetail.flightTripType!='单程' && transfer.sceneType=='SJ'">送</span>
                                    <span class="meet-jie" v-if="orderDetail.flightTripType!='单程' && transfer.sceneType=='JJ'">接</span> -->
                                    <span class="meet-depart">{{transfer.cityName}}{{transfer.transferScene}}</span>
                                    <span class="meet-type">{{transfer.transferType}}</span>
                                </p>
                                <p class="meet-cont">
                                    <span class="place-act">
                                        <span class="meet-placeIcon"><i></i></span>
                                        <span class="meet-time meet-place">{{transfer.deptPlace}}
                                            <em class="trans-line"></em>{{transfer.arrPlace}}
                                        </span>
                                    </span>
                                </p>
                                <p class="meet-cont">
                                    <span class="meet-timeIcon"><i></i></span>
                                    <span class="meet-time">已预约{{transfer.rideTime | strDate}}</span>
                                    <span class="meet-time">{{transfer.rideTime | strTime}}用车</span>
                                </p>
                            </div>
                            <span class="meet-money meetMoneyAct"><em>&yen;</em>{{transfer.salesPrice}}</span>
                        </div>
                        <div class="orderline" v-if="index!=transferInfo.length-1"></div>
                    </div>
                </div>
                <div class="prompt y_flex" v-if="showTrans && isShowTransferRemark">
                    <span class="prompt_icon"></span>
                    <span class="transMsg" v-if="isShowTransferRemark" @click="transferClick(transferInfo)">退改说明</span>
                </div>
            </div>
            <!-- <div class="expense_container container_common_style act_expense" v-if="insurancesPersons.length>0">
                <div class="expense_title">已购保险<span class="point_right_arrow act_point"></span></div>
                <div class="insurance-wrapper" v-if="insurancesPersons!=''">
                    <div class="insur-traffic-con" v-for="(insurance,index) in insurancesPersons" :key="index" v-if="insurance.persons.length>0">
                        <p class="insur-content">
                            <span class="insur-icon"></span>
                            <span>{{insurance.insuranceName}}</span>
                            <span class="insur-amount">{{insurance.persons.length}}份</span>
                        </p>
                        <div class="orderline"></div>
                        <p class="insur-content">
                            <span v-for="(person,index) in insurance.persons" :key="index">{{person}}<em v-if="index!=insurance.persons.length-1">、</em></span>
                        </p>
                    </div>
                </div>
            </div> -->
            <div class="insurance_content"  v-if="insurancesPersons.length>0">
                <div class="top" @click="showInsur">
                    <span>保险信息</span>
                    <span v-bind:class="{'is_down':isDown}"></span>
                </div>
                <div class="is_line" v-bind:class="{'is_have':isDown}"></div>
                <div class="middle"  v-if="insurancesPersons!=''"  v-bind:class="{'is_middle':isDown}">
                    <span>类型</span>
                    <div v-for="(insurance,index) in insurancesPersons" :key="index" v-if="insurance.persons.length>0">
                        <div class="middle_content">
                            <p>{{insurance.insuranceName}}x{{insurance.persons.length}}份</p>
                        </div>
                        <div class="under">
                            <div class="is_line top_line"></div>
                            <span>投保人</span>
                            <span v-for="(person,index) in insurance.persons" :key="index">{{person}}<em v-if="index!=insurance.persons.length-1">、</em></span>
                        </div>
                    </div>
                </div>
                
            </div>
            <div class="expense_container container_common_style act_expense" v-if="orderDetail.expressType.length > 0"><!--@click="orderPostClick"-->
                <div class="expense_title" @click="orderPostClick">报销凭证<span class="point_right_arrow act_point ex_point" :class="{'act_deg':showPost}"></span></div>
                <div class="post-wrapper" v-if="address!=null&&showPost">
                    <div class="post-content">
                        <div class="post-shipping">
                            <p class="shipping">
                                <span class="shipping-title">邮寄方式</span>
                                <span>预计15天内送达</span>
                            </p>
                        </div>
                        <div class="orderline"></div>
                        <div class="post-shipping">
                            <p class="shipping">
                                <span class="shipping-title">配送内容</span>
                                <span>{{invoice}}</span>
                            </p>
                        </div>
                        <div class="orderline" v-if="address.invoice!=null && address.invoice!=''"></div>
                        <div class="post-shipping" v-if="address.invoice!=null && address.invoice!=''">
                            <p class="shipping">
                                <span class="shipping-title">发票抬头</span>
                                <span class="shipping-placehold">{{address.invoice.invoiceTitle}}</span>
                            </p>
                        </div>
                        <div class="orderline"  v-if="address.invoice!=null && address.invoice!=''&&address.invoice.creditCode!=''&&address.invoice.creditCode!=null"></div>
                        <div class="post-shipping" v-if="address.invoice!=null && address.invoice!=''&&address.invoice.creditCode!=''&&address.invoice.creditCode!=null">
                            <p class="shipping">
                                <span class="shipping-title">统一社会信用代码</span>
                                <span class="shipping-placehold">{{address.invoice.creditCode}}</span>
                            </p>
                        </div>
                        <div class="orderline"></div>
                        <div class="post-shipping">
                            <p class="shipping">
                                <span class="shipping-title">配送地址</span>
                                <span class="shipping-address" v-if="address.address">{{address.address}}</span>
                            </p>
                        </div>

                    </div>
                </div>
            </div>
            <div class="common_problem_container container_common_style">
                <div class="problem_title y_flex">
                    常见问题
                </div>
                <div class="problem_list y_flex between_x_flex" @click="toFaq(1)">
                    <div>为什么票价会变？</div>
                    <div class="point_right_arrow"></div>
                </div>
                <div class="problem_list y_flex between_x_flex" @click="toFaq(2)">
                    <div>为什么无法支付？</div>
                    <div class="point_right_arrow"></div>
                </div>
                <div class="problem_list y_flex between_x_flex" @click="toFaq(3)">
                    <div>如何办理登机？</div>
                    <div class="point_right_arrow"></div>
                </div>
                <!-- <div class="problem_footer xy_flex" @click="showTel=true">
                    <div class="y_flex">
                        <div><img src="//m.lvmama.com/flight/image/call-icon.png" alt=""></div>
                        <div>联系客服</div>
                    </div>
                </div>         -->
            </div>
            <!-- <div class="toHotel" @click="toHotel" v-if="orderDetail!=''">
                <div>
                    <p>订酒店 就用驴妈妈</p>
                    <span>同类商品，保证低价</span>
                </div>
            </div> -->

            <!-- <div class="order_time_container container_common_style">
                <div class="order_time y_flex between_x_flex">
                    <div>订单时间</div>
                    <div>{{orderDetail.orderCreatTime | orderDateFormate}}</div>
                </div>
                <div class="order_back y_flex" v-if="orderDetail.flightTripType == '单程'" @click="backTripClick">
                    <div>订返程（{{orderDetail.arrivalCityName}}-{{orderDetail.departureCityName}}）</div>
                    <div class="back_right">
                        <div v-show="lowPrice!=''">￥{{lowPrice}}起</div>
                        <div class="point_right_arrow" style="height: .2rem;"></div>    
                    </div>
                    
                </div>
                <div class="order_detail_order_again y_flex between_x_flex" @click="orderingBack" v-if="orderDetail.flightOrderStatus != '已取消'">
                    <div>再订一张</div>
                    <div class="point_right_arrow"></div>
                </div> -->
                <!-- <div class="order_detail_chat_group y_flex between_x_flex" @click="showVipDetail" v-if="orderDetail.flightOrderStatus != '已取消'">
                    <div>驴妈妈交通VIP用户群</div>
                    <div class="point_right_arrow"></div>
                </div> -->
            <!-- </div> -->
            <div class="order_other_ticket" v-if="tickList!=null && tickList.length>0">
                <div class="ticket-tj">最优推荐</div>
                <!-- <p>
                    <span><i></i>热门景点</span> 
                    <span class="menpiao" @click="stnearby">
                        <span>附近景点</span>
                    </span>
                </p> -->
                <div class="recommend" v-for="(ticket,index) in tickList" :key='index' v-if="index<5">                    
                    <div class="content" @click="ticketClick(ticket,index)">
                        <div class="bgImg"><img :src="ticket.imageUrl"/></div>
                        <div class="introduce">
                            <p class="destination">{{ticket.productName}}</p>
                            <p class="coupon" v-show="tickets.cashBack>0 && tickets.cashBack!=''"><span>优惠</span><span>返&#165;{{tickets.cashBack}}</span></p>
                            <p class="nocoupon" v-show="tickets.cashBack<=0 || tickets.cashBack==''"></p>
                            <p class="satisfy">{{ticket.applauseRate}}满意</p>
                            <p class="satisfy"><span>{{ticket.cityName}}</span><span>{{ticket.provinceName}}</span><span>{{ticket.star}}</span></p>
                        </div>
                        <div class="price">
                            <p><span><i>&#165;</i>{{ticket.sellPrice}}<em>起</em></span></p>
                            <!-- <p class="cost-price">&#165;{{ticket.marketPrice}}</p> -->
                            <p class="range">{{ticket.distance}}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- <div class="footer" v-if="orderDetail!='' && orderDetail.flightOrderStatus == '待支付'&&orderDetail.bookingSource!='LVMAMA_TRAVEL'">
            <span v-bind:class="{'down':downClass}" @click="downClass=!downClass">应付总额：<i>&#165;{{orderDetail.parPrice}}</i></span>
            <button @click="toOrderPay">去支付</button>
        </div> -->
        <!-- 商旅拨打电话开始 -->
        <!-- <div class="alertPhone" v-if="showPhone">
            <div>
                <div class="top">
                    <p>24小时差旅热线</p>
                    <p>
                        <a href=`tel:${orderDetail.customerCellphone}`>{{orderDetail.customerCellphone}}</a>
                    </p>
                </div>
                <div class="under" @click="colsedPhone">
                    <span>取消</span>
                </div>
            </div>
        </div> -->
        <!-- 商旅拨打电话结束 -->
        <!-- 商旅底部开始 -->
         <div class="footer travel_footer y_flex between_x_flex" v-if="approveTravel&&orderDetail.flightOrderStatus == '待支付'">
            <p @click="isReject">拒绝</p>
            <p @click="isSurePass">通过审核</p>
         </div>

         <div class="footer travel_footer submit_travel y_flex between_x_flex" v-if="(orderDetail.bookingSource=='LVMAMA_TRAVEL'&&orderDetail.flightOrderStatus == '待支付'&&(!approveTravel||showTavel))">
            <i>已提交公司审批，通过即可出票</i>
         </div>
         <!-- 商旅底部结束 -->
         <!-- 商旅拒绝弹框开始 -->
         <div class="travel_alert" v-show="showReject">
             <div class="travel_alert_reject">
                 <div class="reject_cause">
                     <span>拒绝原因</span>
                     <i @click="closeReject"></i>
                 </div>
                 <textarea class="cause_content" v-model="improveContent"></textarea>
                 <div class="reject_button">
                     <div @click="sureReject">拒绝</div>
                 </div>
             </div>
         </div>
         <!-- 商旅拒绝弹框结束 -->
         <!-- 商旅通过弹框开始 -->
         <div class="travel_alert" v-show="showPass">
             <div class="alert_pass">
                 <div class="travel_pass">
                     <span>审批通过</span>
                     <i @click="closeSure"></i>
                 </div>
                 <p>确认后系统将自动出票</p>
                 <div class="passButton" @click="confirmPass">确认通过</div>
             </div>
         </div>
         <!-- 商旅通过弹框结束 -->
        <div class="price_detail_container mask" v-if="isShowPriceDetail" @click="showPriceDetail">
            <div class="price_detail_wrap">
                <div class="price_detail_title y_flex between_x_flex">
                    <p>订单总额明细</p>
                    <!-- <div class="price_container">
                        总额<span>&#165;{{orderDetail.parPrice}}</span>
                    </div> -->
                </div>
                <ul class="price_content">
                    <li class="y_flex between_x_flex content-maxTitle">
                        <p class="content-title">机票总价</p>
                        <span class="content-orderline"></span>
                    </li>
                    <li class="y_flex between_x_flex" v-if="orderDetail.adultTotal > 0">
                        <p v-if="orderDetail.saleType!='RoundTripSpecial'">{{packageShow?'成人套餐价':'成人票'}}</p>
                        <p v-if="orderDetail.saleType=='RoundTripSpecial'">成人往返套餐价</p>
                        <p>&#165;{{packageShow?orderDetail.adultPrice-(-packagePrice):orderDetail.adultPrice}}&#215;{{orderDetail.adultTotal}}人</p>
                    </li>
                    <li class="y_flex between_x_flex" v-if="orderDetail.childrenTotal > 0">
                        <p>{{packageShow?'儿童套餐价':'儿童票'}}</p>
                        <p>&#165;{{packageShow?orderDetail.childrenPrice-(-packagePrice):orderDetail.childrenPrice}}&#215;{{orderDetail.childrenTotal}}人</p>
                    </li>
                    <li class="y_flex between_x_flex" v-if="orderDetail.orderDetatil.length > 0">
                        <p>机建+燃油</p>
                        <p>&#165;{{taxTotal}}&#215;{{orderDetail.orderDetatil.length}}人</p>
                    </li>
                    <li class="y_flex between_x_flex content-minTitle" v-if="(orderDetail.insurance.length > 0&&packageIn)||(orderDetail.vasCouponOrders.length > 0&&packageVas)||orderDetail.activityPrice > 0||orderDetail.invinciblePrice > 0||orderDetail.rightPrice > 0||orderDetail.expressType.length > 0||orderDetail.orderDirectReductionAmount>0||(orderDetail.flightTripType=='单程' && departure.length>0)||(orderDetail.flightTripType=='单程' && departure.length>0)||(orderDetail.flightTripType=='去程' && departure.length>0)||((orderDetail.flightTripType=='回程'|| orderDetail.saleType=='RoundTripSpecial') && returnTrip.length>0)||transferInfo.length>0">
                        <p class="content-title">其他</p>
                        <span class="content-orderline"></span>
                    </li>
                    <li class="y_flex between_x_flex" v-for="insurance in orderDetail.insurance" v-if="orderDetail.insurance.length > 0&&packageIn&&insurance.insuranceInfoId!=orderDetail.tagProductId" >
                        <p class="ellipsis">{{insurance.insuranceName}}</p>
                        <p v-if="orderDetail.saleType!='RoundTripSpecial'">&#165;{{insurance.insurancePrice}}&#215;{{orderDetail.orderDetatil.length}}份</p>
                        <p v-if="orderDetail.saleType=='RoundTripSpecial'">&#165;{{insurance.insurancePrice}}&#215;{{orderDetail.orderDetatil.length*2}}份</p>
                    </li>
                    <li class="y_flex between_x_flex" v-if="orderDetail.activityPrice > 0">
                        <p>优惠券<span class="deduction">(仅抵扣机票金额)</span></p>
                        <p>-&#165;{{orderDetail.activityPrice}}</p>
                    </li>
                    <li class="y_flex between_x_flex" v-if="orderDetail.invinciblePrice > 0">
                        <p>无敌券<span class="deduction">(仅抵扣机票金额)</span></p>
                        <p>-&#165;{{orderDetail.invinciblePrice}}</p>
                    </li>
                     <li class="y_flex between_x_flex" v-if="orderDetail.rightPrice > 0">
                        <p>权益券</p>
                        <p>-&#165;{{orderDetail.rightPrice}}</p>
                    </li>
                    <li class="y_flex between_x_flex" v-if="orderDetail.vasCouponOrders.length > 0 && packageVas&&item.vasProductId!=orderDetail.tagProductId" v-for="item in orderDetail.vasCouponOrders">
                        <p>{{item.vasProductName}}</p>
                        <p>&#165;{{item.salesPrice}}&#215;1份</p>
                    </li>
                    <li class="y_flex between_x_flex" v-if="orderDetail.expressType.length > 0">
                        <p>配送费</p>
                        <p>&#165;{{orderDetail.expressPrice}}</p>
                    </li>
                    <!-- <li class="y_flex between_x_flex sepnew" v-if="orderDetail.orderDirectReductionAmount.length > 0 && orderDetail.orderDirectReductionAmount > 0"></li> -->
                    <li class="y_flex between_x_flex" v-if="orderDetail.orderDirectReductionAmount>0">
                        <p>{{orderDetail.promotionActivity.activityName.split("|").length>1?orderDetail.promotionActivity.activityName.split("|")[1]:orderDetail.promotionActivity.activityName || "促销活动"}}</p>
                        <p>-&#165;{{orderDetail.orderDirectReductionAmount}}</p>
                    </li>
                    <li class="y_flex between_x_flex" v-if="orderDetail.flightTripType=='单程' && departure.length>0">
                        <p>{{departure[0].vasProductName}}</p>
                        <p>&#165;{{departure[0].salesPrice}}&#215;{{orderDetail.orderDetatil.length}}份</p>
                    </li>
                    <li class="y_flex between_x_flex" v-if="orderDetail.flightTripType=='去程' && departure.length>0">
                        <p>去程：{{departure[0].vasProductName}}</p>
                        <p>&#165;{{departure[0].salesPrice}}&#215;{{orderDetail.orderDetatil.length}}份</p>
                    </li>
                    <li class="y_flex between_x_flex" v-if="(orderDetail.flightTripType=='回程'|| orderDetail.saleType=='RoundTripSpecial') && returnTrip.length>0">
                        <p>回程：{{returnTrip[0].vasProductName}}</p>
                        <p>&#165;{{returnTrip[0].salesPrice}}&#215;{{orderDetail.orderDetatil.length}}份</p>
                    </li>
                    <li class="y_flex between_x_flex" v-if="transferInfo.length>0" v-for="transfer in transferInfo ">
                        <p>{{transfer.cityName}}{{transfer.transferScene}}</p>
                        <p>&#165;{{transfer.salesPrice}}</p>
                    </li>
                    <li class="content-orderline"></li>
                    <li class="y_flex between_x_flex content-priceTitle">
                        <p>总额</p>
                        <p class="content-allPrice">&#165;{{orderDetail.parPrice}}</p>
                    </li>
                </ul>
            </div>
            <div class="content-close">
                <span></span>
            </div>
        </div>
        
        <div class="transition_state_container" v-if="showState">
            <div class="toggle_title_container y_flex">
                <div class="xy_flex" @click="toggleRefundState(0)" :class="{'mark_picked': showRefundState == refundState[0]}">{{refundState[0].title}}</div>
                <div class="xy_flex" v-show="refundState[1] != '' && refundState[1]!=null" @click="toggleRefundState(1)" :class="{'mark_picked': showRefundState == refundState[1]}">{{refundState[1].title}}</div>
                <div class="xy_flex" v-if="refundState[2]!='' && refundState[2]!=null" @click="toggleRefundState(2)" :class="{'mark_picked': showRefundState == refundState[1]}">{{refundState[2].title}}</div>
                <div class="xy_flex" v-if="refundState[3]!='' && refundState[3]!=null" @click="toggleRefundState(3)" :class="{'mark_picked': showRefundState == refundState[1]}">{{refundState[3].title}}</div>
            </div>
            <div class="refund_state_container" v-if="showRefundState != ''">
                <div class="refund_contant">
                    <div class="refund_item_container" v-for="item in showRefundState.content">
                        <div class="refund_item_title bigSize" :class="{'bigSize':item.title == '预订须知'}">
                            <strong class="bigSize" :class="{'bigSize':item.title == '预订须知'}">{{item.title}}</strong>
                        </div>
                        <div class="refund_item_detail">
                            <span v-html="item.content"></span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="close_refund xy_flex">
                <img src="//m.lvmama.com/flight/image/bigX.png" alt="" @click="showState=false">
            </div>
        </div>


        <div class="matte" v-if="downClass" @click="downClass=false"></div>
        <div class="matte-det"  @click="downClass=false" v-if="orderDetail!=''">
            <div v-bind:class="{'showBottom':downClass}" @click="downClass=false">
                <div>
                    <p v-if="orderDetail.orderDetatil[0].passengerType == '成人'&&orderDetail.saleType!='RoundTripSpecial'">
                        {{packageShow?'成人套餐价':'成人票'}}
                        <span><i>&#215;</i>{{orderDetail.adultTotal}}人</span>
                        <span><i>&#165;</i>{{packageShow?orderDetail.adultPrice-(-packagePrice):orderDetail.adultPrice}}</span>
                    </p>
                    <p v-if="orderDetail.orderDetatil[0].passengerType == '成人'&&orderDetail.saleType=='RoundTripSpecial'">
                        成人往返套餐价
                        <span><i>&#215;</i>{{orderDetail.adultTotal}}人</span>
                        <span><i>&#165;</i>{{orderDetail.adultPrice}}</span>
                    </p>
                    <p v-if="orderDetail.orderDetatil[0].passengerType == '成人'" class="separate">
                        机建+燃油
                        <span><i>&#215;</i>{{orderDetail.adultTotal}}人</span>
                        <span><i>&#165;</i>{{taxTotal}}</span>
                    </p>
                    <p v-if="orderDetail.orderDetatil[0].passengerType == '儿童'">
                        {{packageShow?'儿童套餐价':'儿童票'}}
                        <span><i>&#215;</i>{{orderDetail.childrenTotal}}人</span>
                        <span><i>&#165;</i>{{packageShow?orderDetail.childrenPrice-(-packagePrice):orderDetail.childrenPrice}}</span>
                    </p>
                    <p v-if="orderDetail.orderDetatil[0].passengerType == '儿童'" class="separate">
                        机建+燃油
                        <span><i>&#215;</i>{{orderDetail.childrenTotal}}人</span>
                        <span><i>&#165;</i>{{taxTotal}}</span>
                    </p>
                    <p class="separate separate-p" v-if="orderDetail.orderDetatil[0].passengerType == '成人' && departure.length>0 &&(orderDetail.flightTripType=='去程' || orderDetail.flightTripType=='单程')">
                        {{departure[0].vasProductName}}
                        <span><i>&#215;</i>{{orderDetail.adultTotal}}人</span>
                        <span><i>&#165;</i>{{departure[0].salesPrice}}</span>
                    </p>
                    <p class="separate separate-p" v-if="orderDetail.orderDetatil[0].passengerType == '成人' && returnTrip.length>0 && (orderDetail.flightTripType=='回程'|| orderDetail.saleType=='RoundTripSpecial')">
                        {{returnTrip[0].vasProductName}}
                        <span><i>&#215;</i>{{orderDetail.adultTotal}}人</span>
                        <span><i>&#165;</i>{{returnTrip[0].salesPrice}}</span>
                    </p>
                    <p class="separate separate-p" v-if="orderDetail.orderDetatil[0].passengerType == '儿童' && departure.length>0 &&(orderDetail.flightTripType=='去程' || orderDetail.flightTripType=='单程')">
                        {{departure[0].vasProductName}}
                        <span><i>&#215;</i>{{orderDetail.childrenTotal}}人</span>
                        <span><i>&#165;</i>{{departure[0].salesPrice}}</span>
                    </p>
                    <p class="separate separate-p" v-if="orderDetail.orderDetatil[0].passengerType == '儿童' && returnTrip.length>0 && orderDetail.flightTripType=='回程'">
                        {{returnTrip[0].vasProductName}}
                        <span><i>&#215;</i>{{orderDetail.childrenTotal}}人</span>
                        <span><i>&#165;</i>{{returnTrip[0].salesPrice}}</span>
                    </p>
                </div>
                <div>
                    <p v-if="orderDetail.insurance.length > 0&&orderDetail.saleType!='RoundTripSpecial'&&packageIn&&insurance.insuranceInfoId!=orderDetail.tagProductId" class="separate insurance-price" v-for="insurance in orderDetail.insurance">
                        {{insurance.insuranceName}}
                        <span><i>&#215;</i>{{orderDetail.orderDetatil.length}}份</span>
                        <span><i>&#165;</i>{{insurance.insurancePrice}}</span>
                    </p>
                    <p v-if="orderDetail.insurance.length > 0&&orderDetail.saleType=='RoundTripSpecial'&&packageIn&&insurance.insuranceInfoId!=orderDetail.tagProductId" class="separate insurance-price" v-for="insurance in orderDetail.insurance">
                        {{insurance.insuranceName}}
                        <span><i>&#215;</i>{{orderDetail.orderDetatil.length*2}}份</span>
                        <span><i>&#165;</i>{{insurance.insurancePrice}}</span>
                    </p>
                    <p v-if="orderDetail.activityPrice > 0" class="separate" >
                        优惠券<em style="font-size:0.26rem;color:#ccc;">(仅抵扣机票金额)</em>
                        <span style="position: absolute;right: .2rem;"><i>-&#165;</i>{{orderDetail.activityPrice}}</span>
                    </p>
                    <p v-if="orderDetail.invinciblePrice > 0" class="separate" >
                        无敌券<em style="font-size:0.26rem;color:#ccc;">(仅抵扣机票金额)</em>
                        <span style="position: absolute;right: .2rem;"><i>-&#165;</i>{{orderDetail.invinciblePrice}}</span>
                    </p>
                     <p v-if="orderDetail.rightPrice > 0" class="separate" >
                        权益券
                        <span style="position: absolute;right: .2rem;"><i>-&#165;</i>{{orderDetail.rightPrice}}</span>
                    </p>
                    <p v-if="orderDetail.vasCouponOrders.length > 0&&packageVas&&item.vasProductId!=orderDetail.tagProductId" class="separate"  v-for="item in orderDetail.vasCouponOrders">
                        {{item.vasProductName}}
                        <span><i>&#215;</i>1份</span>
                        <span><i>&#165;</i>{{item.salesPrice}}</span>
                    </p>
                    <p v-if="orderDetail.expressPrice.length > 0" class="separate insurance-price">
                        配送费
                        <span><i>&#165;</i>{{orderDetail.expressPrice}}</span>
                    </p>
                    <p v-if="orderDetail.orderDirectReductionAmount>0" class="separate insurance-price">
                        {{orderDetail.promotionActivity.activityName.split("|").length>1?orderDetail.promotionActivity.activityName.split("|")[1]:orderDetail.promotionActivity.activityName || "促销活动"}}
                        <span><i>-&#165;</i>{{orderDetail.orderDirectReductionAmount}}</span>
                    </p>
                    <p v-for="transfer in transferInfo" class="separate insurance-price">
                        {{transfer.cityName}}{{transfer.transferScene}}
                        <span><i>&#165;</i>{{transfer.salesPrice}}</span>
                    </p>
                </div>
            </div>
        </div>

        <div class="telMes" v-show="showTel"></div>
        <div class="call-tel" v-bind:class="{'telAct':showTel}">
            <a href="tel:10106060,1,6" v-if="!changePhone">拨打10106060-1-6</a>
            <a href="tel:10106060" v-if="changePhone">拨打10106060</a>
            <p @click="showTel=false">取消</p>
        </div>

        <!-- <div class="cancelMes" v-show="showCancel">
            <div></div>
        </div> -->

        <div class="telMes" v-if="showTelAlert||showTelCTMTAlert">
            <div class="price-changing">
                <p>
                    {{showTelCTMTAlert?'您购买的航班舱位不支持改签，如有需要，请联系客服，电话':'如需退改，请联系客服,电话'}}<br>
                    <span>
                        <a href="tel:10106060,1,6" v-if="!changePhone">10106060-1-6</a>
                        <a href="tel:10106060" v-if="changePhone">10106060</a>
                    </span>
                </p>
                <button @click="showTelAlert=false,showTelCTMTAlert=false">取消</button>
                <a href="tel:10106060,1,6" v-if="!changePhone"><i></i> 呼叫</a>
                <a href="tel:10106060" v-if="changePhone"><i></i> 呼叫</a>
            </div>
        </div>
        <div class="telMes" v-if="showEyes">
            <div class="price-changing">
                <p>
                    如需查看完整信息，请致电客服查询，客服电话：
                    <span>
                        <a href="tel:10106060,1,6" v-if="!changePhone">10106060-1-6</a>
                        <a href="tel:10106060" v-if="changePhone">10106060</a>
                    </span>
                </p>
                <button @click="showEyes=false">取消</button>
                <a href="tel:10106060,1,6" v-if="!changePhone"><i></i> 呼叫</a>
                <a href="tel:10106060" v-if="changePhone"><i></i> 呼叫</a>
            </div>
            
        </div>
        <div class="payMes" v-if="showPay">
            <div class="pay_container">
                <div class="pay_title xy_flex">支付提醒</div>
                <div class="pay_text">
                    <p>因您提交订单时，系统自动拆分多张订单</p>
                    <p v-for="(order,index) in orderList.order" :key="index">订单{{index+1}}:{{order.orderNo}} &#165;{{order.receivableAmount}}</p>
                    <p>订单总额为以上订单的应付总和</p>
                    <p>订单总额&#165;{{orderList.price}}，已支付{{orderList.payedPrice}}</p>
                </div>
                <div class="clickPay_button_double y_flex">
                    <div class="xy_flex" @click="showPay=false">取消</div>
                    <div class="xy_flex" @click="toOrderPay">支付&#165;{{orderList.price-orderList.payedPrice}}</div>
                </div>
            </div>
        </div>
        <div class="no-list" v-if="showErr=='1'">
            <span></span>
            <span>您还没有此类订单</span>
        </div>
        <div class="no-wifi an-error" v-if="showErr=='2'">
            <div>
                <p>出错啦，尝试刷新或直接拨打驴妈妈客服热线</p>
                <button @click="refresh()">刷新</button>
                <button class="tel-btn">
                    <a href="tel:10106060,1,6" v-if="!changePhone"><i></i> 拨打客服电话</a>
                    <a href="tel:10106060" v-if="changePhone"><i></i> 拨打客服电话</a>
                </button>
            </div>
        </div>
        <div class="no-wifi" v-if="showErr=='3'">
            <div>
                <p>网络连接失败，尝试刷新或直接拨打驴妈妈客服热线</p>
                <button @click="refresh()">刷新</button>
                <button class="tel-btn">
                    <a href="tel:10106060,1,6" v-if="!changePhone"><i></i> 拨打客服电话</a>
                    <a href="tel:10106060" v-if="changePhone"><i></i> 拨打客服电话</a>
                </button>
            </div>
        </div>
        <div class="tips-p" v-if="showErr=='4'">您的操作过于频繁，请休息一下，稍后再试</div>
        <!-- <vip-component v-if="showVip"></vip-component> -->
        <!-- <faq-component v-if="showFaq" :faqType="faqType"></faq-component> -->
        <!-- <post-component v-if="showPost" ></post-component> -->
        <insurance-component v-if="showInsurance" ></insurance-component>
        <!-- <change-back :ticketRuleDetailListdesc="ticketRuleDetailListdesc" :ticketRuleDetailListdet="ticketRuleDetailListdet" :changeBackClose="showChangeBack"  @onChangeBack="showChangeBack=false"></change-back>
        <luggage-desc v-if="goLuggageDesc!=''" :carrierCode="orderDetail.carrierCode" :goLuggageDesc="goLuggageDesc" :backLuggageDesc="backLuggageDesc" :luggageDescClose="luggageDescClose" :flightInfoLength="false" @onClickLuggage="luggageDescClose=false"></luggage-desc>  -->

        <change-back :ticketRuleDetailListdesc="ticketRuleDetailListdesc" :ticketRuleDetailListdet="ticketRuleDetailListdet" v-if="showChangeBack" :changeBackClose="showChangeBack" :goLuggageDesc="goLuggageDesc" :carrierCode="orderDetail.carrierCode" @onChangeBack="showChangeBack=false"></change-back>

        <alert-tip v-if="showMessage" :title="alertTitle" :tipContent="message" :leftButton="leftButton" :rightButton="rightButton" @closeAlert="closeAlert" @rightHandler="rightHandler" ></alert-tip>
        <detail-panel v-if="showFaq" :faqType="faqType" @closeDetail="closeDetail"></detail-panel>
    </div>
    
</template>

<script>
    import { mapActions,mapState } from 'vuex'

    import headTop from '../../components/header/head'
    import airlineLogo from '../../components/common/airlinesLogo'
    // import vipComponent from '../../components/common/vip-component'

    import insuranceComponent from '../../components/common/insurance-component'
    import postComponent from '../../components/common/post-component'
    // import faqComponent from '../../components/common/faq-component'
    import changeBack from '../../components/common/changeBackDest'
    // import luggageDesc from '../../components/common/luggageDesc'
    import alertTip from '../../components/common/alertTip'
    import detailPanel from '../../components/common/detail-panel'

    import { orderCombinedDetail,getLvUser,getLvUserByCookie,getLowPrice,searchTicket,showService,getDynamicDataList,queryApplyPayAmount,orderDetailChange,toOrderReturn,travelCancelOrder,travelPassOrder,travelCombinedDetail,orderListByOrderMainId,cancelOrdersByOrderNo,smartRecForBigTraffic,getFlightCities,recfeedback } from '../../service/getData'
    import { isClient,getLvSessionId,standardDate,getNoticeSource,formatIOSDate,jumpLogin,switchDateFormate,removeStore,setStore,getStore,weekFormat,getStatisticsType,getElementTag,getRequest,getZNSource,getCookie } from '../../config/mUtils'

    export default {
        data(){
            return{
                depart: '订单详情',
                goPage:'orderDetail',
                rightMenu:'客服',
                travelDepart:'',
                approveTravel:false,//区分待我审批和普通订单
                showTavel:false,
                logoKind: '9C',
                isShowPriceDetail: false,//是否显示总额详情
                showVip: false,//vip是否显示
                tickList:'',
                tickets:'',
                showFaq: false,//常见问题明细是否展示
                showPost: false,//报销凭证明细
                showInsurance: false,//保险明细
                showState:false,//接送机退改详情
                refundState:[],//接送机退改详情列表
                showRefundState:'',
                faqType: 1,//常见问题明细类别
                orderDetail:'',//订单详情
                lowPrice:'',//返程推荐价格
                insurancesPersons:[],//已购保险详情
                isShowTransferRemark:false,//是否展示接送机
                departure:[],//去程贵宾室
                returnTrip : [],//返程贵宾室
                departureDate : "2017-10-01 08:00:00",//出发时间
                arrivalDate : "2017-10-01 20:00:00",//到达时间
                zhendepartureDate : "2017-10-01 08:00:00",//返程出发时间
                zhenarrivalDate : "2017-10-01 20:00:00",//返程到达时间
                bookingDate : null,//下单时间
                taxTotal : "",//基建燃油费
                zhendurTimeStr : "",//返程飞行时间
                durTimeStr : "",//飞行时间
                scheServerTime : "",//服务器时间
                serverTime : "",//服务器时间毫秒数
                timeThree : false,//三天后的时间
                showRCbutton : false,//是否可退改
                showctbutton : false,//是否可以改签
                showrtbutton : false,//是否可以退票
                minute1 : "00",//倒计时 分
                second1 : "00",//倒计时 秒
                showErr : 0,//详情接口请求失败内容展示 0 未失败 1 没有此类订单 2 出错了 3 网络连接失败 4 操作频繁
                orderId : "",//子单ID
                orderMainId : "",//主单ID
                showPassDetail : true,//是否展示乘机人明细
                showTel : false,//是否展示打电话弹框
                // showCancel : false,//是否展示订单取消结果
                ticketRuleDetailListdesc: "",//退改签信息
                ticketRuleDetailListdet:"",
                showChangeBack:false,//是否展示退改签
                luggageDescClose:false,//是否展示行李额
                goLuggageDesc:'',//去程行李额
                backLuggageDesc:'',//返程行李额
                showTelAlert:false,//退改打电话弹框
                showTelCTMTAlert:false,//退改打电话弹框
                isAPP:false,//是否为APP
                transferInfo:[],//接送机信息
                showServiceDetail:true,//机场服务编号是否展示
                downClass:false,//是否展示去支付明细
                showMessage:false,//是否展示弹框
                message:'',//弹框内容
                leftButton:'',//弹框左边按钮话术
                rightButton:'',//弹框右边按钮话术
                messType:'',//弹框事件类型
                userId:'',//登录ID
                showReject:false,//拒绝弹框
                showPass:false,//通过弹框
                improveContent:'',//拒绝内容
                showPhone:false,
                beforeLength:'',
                payOrderId:"",//支付ID
                payedAmount:"",//订单已支付金额
                orderList:{},//主单下所有子单信息
                alertTitle:"",//弹框提示TITLE
                showPay:false,//是否展示支付弹框
                showEyes:false,//是否展示查看内容弹框
                showTrans:true,//是否展开接送机信息
                invoice:"",
                address:null,
                changePhone:false,
                isDown:false,
                packageShow:false,
                packageVas:true,
                packagePrice:null,
                packageIn:true,
                locationInfo:'',
            }
        },
        props: [
            
        ],
        components: {
            headTop,
            airlineLogo,
            // vipComponent,
            // faqComponent,
            postComponent,
            insuranceComponent,
            changeBack,
            // luggageDesc,
            alertTip,
            detailPanel
        },
        computed:{
            ...mapState([
                'businessWaitOrders',//所有的待我审批订单

            ])
        },
        mounted(){
            
        },
        methods: {
            ...mapActions([
                'initData',//初始化时间
            ]),
            isShowAll(){
                this.showTrans = !this.showTrans;
            },
            showPriceDetail() {
                this.isShowPriceDetail = !this.isShowPriceDetail;
            },
            showVipDetail(){
                this.showVip = !this.showVip;
            },
            searchTicketMes(cityName){
                let that=this;
                getFlightCities().then((res)=>{
                    let allCities = res.data.allCitys;
                    try {
                        if(allCities.length>0){
                            for(let i=0;i<allCities.length;i++){
                                if(cityName == allCities[i].code){
                                    let changeFlightCity=getRequest();
                                    let info ={};
                                        info.userNo=this.userId;
                                        info.udid=changeFlightCity["udid"]!=null?changeFlightCity["udid"]:'';
                                        info.customerId=getStore("selectid");
                                        info.destId=allCities[i].destId;
                                        info.channelCode='TRAFFICPAYED';
                                        info.firstChannel=getZNSource();
                                        info.globalLatitude=this.locationInfo!=''?this.locationInfo.latitude:'';
                                        info.globalLongitude=this.locationInfo!=''?this.locationInfo.longitude:'';
                                        info.recCategoryId='00';
                                    smartRecForBigTraffic(info).then((res)=>{
                                        if (+res.code === 1) {
                                            let tickets=res.data;
                                            if (tickets.recommendList!=null && tickets.recommendList.length>0) {
                                                for(let i=0;i<tickets.recommendList.length;i++){
                                                    tickets.recommendList[i].recBatchId=tickets.recBatchId;
                                                }
                                                this.tickList = tickets.recommendList;
                                            }
                                        }
                                    })
                                    break;
                                }
                            }
                        }
                    } catch (error) {
                        
                    }
                })
                
            },
            // 接送机跳转
            toCar(){
                getElementTag("机票_接送机","机票详情页");
                removeStore('isFlightSend',this);
                removeStore('isTrainSend',this);
                removeStore('locationInfo',this);
                removeStore('sendMachineArrderss',this);
                removeStore('pickUpArrderss',this);
                removeStore('sendMach',this);
                removeStore('pickUp',this);
                removeStore('takeoffCity',this);
                removeStore('LandingCity',this);
                removeStore('nowDateStamp',this);
                removeStore('theAirport',this);
                removeStore('theDeliveryStation',this);
                removeStore('thePickupStation',this);
                removeStore('chooseDate',this);
                removeStore('selectedFlight',this);
                removeStore('selectedType',this);
                removeStore('userCarInfor',this);
                if(isClient()==1) {
                    let nua=navigator.userAgent,lvves=0;
                    if(navigator.userAgent.indexOf('Android')!=-1){
                        lvves=nua.substring(nua.indexOf("LVMM/")+5,nua.lastIndexOf("(")-1);
                    }else{
                        lvves=nua.substring(nua.indexOf("LVMM/")+5,nua.length);
                    }
                    if(lvves!=null && lvves.replace(/\s/g,'').split('.')[0]>7&& (lvves.replace(/\s/g,'').split('.')[1]>0 || lvves.replace(/\s/g,'').split('.')[2]>=7)){
                        setStore("goin",'flight');
                        window.location.href="//m.lvmama.com/car/flightIndex?goin=flight&hideAppHeader=1";
                    }else{
                        this.messType="";
                        this.showButton("小驴提醒：您的版本较低，请将驴妈妈APP版本升级到最新版本8.0.7，即可使用接送机功能哦！","知道了");
                        return;
                    }
                } else {
                    setStore("goin",'flight');
                    window.location.href="//m.lvmama.com/car/flightIndex?goin=flight&hideAppHeader=1";
                }
            },
            //展示常见问题明细
            toFaq(type){
                getElementTag('机票_订单详情页_常见问题','机票详情页');
                this.faqType=type;
                this.showFaq=true;
            },
            //点击关闭常见问题
            closeDetail(){
                this.showFaq=false;
            },
            //点击分享
            fenxiangClick(orderDetail,type,rflight){
                getElementTag('机票_订单详情页_航班分享','机票详情页');
                let newTime=orderDetail.depTime,
                    fromTime=standardDate(newTime),
                    url,str;
                // if(new Date().getTime()>=newTime){
                    // if(rflight=="rflight"){
                    //     url="https://m.lvmama.com/"+this.$parent.baseUrlPath+"/"+orderDetail.arrivalCityCode+"-"+orderDetail.departureCityCode;
                    // }else{
                        // url="https://m.lvmama.com/"+this.$parent.baseUrlPath+"/"+orderDetail.departureCityCode+"-"+orderDetail.arrivalCityCode;
                    // }
                // }else{
                    // if(rflight=="rflight"){
                    //     url="https://m.lvmama.com/"+this.$parent.baseUrlPath+"/"+orderDetail.arrivalCityCode+"-"+orderDetail.departureCityCode;
                    // }else{
                        // url="https://m.lvmama.com/"+this.$parent.baseUrlPath+"/"+orderDetail.departureCityCode+"-"+orderDetail.arrivalCityCode;
                    // }
                // }
                if (type=='order') {
                    str = orderDetail.depName+orderDetail.departureTerminalCode+"-"+orderDetail.arrName+orderDetail.arrivalTerminalCode;
                    url="https://m.lvmama.com/"+this.$parent.baseUrlPath+"/"+orderDetail.departureCityCode+"-"+orderDetail.arrivalCityCode;
                }else if(type=='ctm'){
                    str = orderDetail.departureAirportName+orderDetail.departureTerminalCode+"-"+orderDetail.arrivalAirportName+orderDetail.arrivalTerminalCode;
                    url="https://m.lvmama.com/"+this.$parent.baseUrlPath+"/"+orderDetail.departureAirportCode+"-"+orderDetail.arrivalAirportCode;
                }
                let date = switchDateFormate(orderDetail.depTime);
                NativeUtil.lvCommon("lvJSShowShareWithDetail",{
                        "shareContent" : "用驴妈妈app买机票最高立减30，还在等什么！",
                        "shareTitle" : date+" "+str,
                        "shareImageUrl" : "https://pics.lvjs.com.cn/mobile/coding/v2/hotel/release/images/share.png",
                        //"shareImageUrl" : "https://m.lvmama.com/train/summerTrain/happy51/share1.jpg",
                        "shareLinkurl" : url,
                        "shortMessageShareContent" : "",
                        "notNeedShow":"0"//“1” 为不需要显示,   "0"或者没有这个字段，在设置分享对象的时候显示（在用native头上的分享按钮时，如果meta里没有，需要提前设置分享对象）
                });
            
            },
            //点击改签
            orderDetailChange(type){
                this.showTelAlert = false;
                this.showTelCTMTAlert = false;
                if(type=="Y"){
                    orderDetailChange(this.orderDetail.orderId,this.orderDetail.orderMainId).then((res) => {
                        if(res.code!="1"){
                            if(res.message.indexOf('00:00-00:00')!=-1 || res.message.indexOf('请于提交')!=-1){
                                this.showTelAlert = true;
                            }else if(res.code=='-2'){
                                 this.messType="call";
                                 this.showButton('如需改签，请联系客服，电话10106060-1-6',"取消","呼叫");
                            }else{
                                this.messType="";
                                this.showButton(res.message,"确定");
                                return;
                            }

                        }else{
                            //跳转改签页
                            this.setGoPage();
                            this.$router.push("/"+this.$parent.baseUrlPath+"/endorse/"+ this.orderDetail.orderMainId + "/" + this.orderDetail.orderId+"/ct");
                        }
                    })
                }else{
                    this.showTelCTMTAlert=true;
                }
            },
            //点击退票
            orderDetailBack(type,ctmtOrder){
                this.showTelAlert = false;
                this.showTelCTMTAlert = false;
                let orderId=this.orderDetail.orderId;
                let orderMainId=this.orderDetail.orderMainId;
                if(ctmtOrder!=null){
                    orderId=ctmtOrder.orderId;
                }
                if(type=="Y"){
                    toOrderReturn(orderId,orderMainId).then((res) => {
                        if(res.code!="1"){
                            if(res.message.indexOf('00:00-00:00')!=-1 || res.message.indexOf('请于提交')!=-1){
                                this.showTelAlert = true;
                            }else if(res.code=='-2'){
                                this.messType="call";
                                this.showButton('如需退票，请联系客服，电话10106060-1-6',"取消","呼叫");
                            }else{
                                this.messType="";
                                this.showButton(res.message,"确定");
                                return;
                            }

                        }else{
                            //跳转退票页
                            this.setGoPage();
                            if(ctmtOrder!=null){
                                this.$router.push("/"+this.$parent.baseUrlPath+"/endorse/" + this.orderDetail.orderMainId + "/" + ctmtOrder.orderId+"/rtz");
                            }else{
                                this.$router.push("/"+this.$parent.baseUrlPath+"/endorse/" + this.orderDetail.orderMainId + "/" + this.orderDetail.orderId+"/rt");
                            }
                        }
                    })
                }else{
                    this.showTelAlert=true;
                }
            },
            //点击报销凭证
            orderPostClick(){
                // let address={
                //     "address":this.orderDetail.address,
                //     "saleType":this.orderDetail.saleType,
                //     "carrierCode":this.orderDetail.carrierCode,
                //     "flightOrderInvoiceDtoList":this.orderDetail.flightOrderInvoiceDtoList
                // }
                // let postAddress = {
                //     key: 'postAddress',
                //     val: address
                // };
                // try{
                //     this.initData(postAddress);
                // }catch(e){}
                this.showPost=!this.showPost;
            },
            //点击保险
            insuranceDetailClick(){
                let that=this;
                let insuranceDetail = {
                    key: 'insurancesDetail',
                    val: that.insurancesPersons
                };
                try{
                    this.initData(insuranceDetail);
                }catch(e){}
                this.showInsurance=true;
            },
            //点击航班动态
            scheduleDetailClick(orderNo,depTime,flightNo){
                let depart = new Date(depTime);
                let today = this.scheServerTime;
                if (depart.getFullYear() == today.getFullYear() && depart.getMonth() == today.getMonth() && depart.getDate() == today.getDate()) {
                    this.$parent.showLoading = true;
                    getDynamicDataList(orderNo,this.userId).then((response) => {
                        this.$parent.showLoading = false;
                        let flightSchedule=null;
                        if (response.code == 1) {
                            if (response.data[0]) {
                                if(response.data.length>1){
                                    for(let i=0;i<response.data.length;i++){
                                        if(response.data[i].flightNo==flightNo){
                                            flightSchedule = response.data[i];
                                            break;
                                        }
                                    }
                                }else{
                                    if(response.data[0].flightNo!=flightNo){
                                        this.messType="";
                                        this.showButton("仅支持查询当天航班动态,敬请谅解","知道了");
                                        return;
                                    }
                                    flightSchedule = response.data[0];
                                }

                                
                                let dynamicsInfor = {
                                    key: 'dynamicsInfor',
                                    val: flightSchedule
                                };
                                try{
                                    this.initData(dynamicsInfor);
                                }catch(e){}
                                this.setGoPage();
                                this.$router.push(`/${this.$parent.baseUrlPath}/flightScheduleDetail`);
                            }else{
                                this.messType="";
                                this.showButton("该航班暂无动态,请稍后再试","知道了");
                            }
                        }else{
                            this.messType="";
                            this.showButton(response.errorMessage || response.message,"知道了");
                        }
                    });
                }else{
                    this.messType="";
                    this.showButton("仅支持查询当天航班动态,敬请谅解","知道了");
                    return;
                }
            },
            //机场服务退改说明
            transferClick(){
                console.log('111');
                this.refundState=[];
                for(let i=0;i<this.transferInfo.length;i++){
                    let refund={};
                    refund.title=this.transferInfo[i].cityName+this.transferInfo[i].transferScene;
                    refund.content=this.transferInfo[i].flightVasTransferRemarkDtoList;
                    this.refundState.push(refund);
                }
                this.showRefundState = this.refundState[0];
                this.showState=true;
            },
            //接送机说明切换
            toggleRefundState(index){
                this.showRefundState = this.refundState[index];
            },
            //刷新
            refresh(){
                if(isClient()==1){
                    NativeUtil.lvCommon("lvJSRefreshWebView");
                }else{
                    window.location.reload();
                }
            },
            setGoPage(){
                if(this.goPage == 'backIndex'){
                    setStore('backBusinessIndex',true);
                }else if(this.goPage == 'waitIndex'){
                    setStore('backBusinessApprove',true);
                }else if(this.goPage == 'allIndex'){
                    setStore('backBusinessAllOrders',true);
                }
            },
            //跳转机场服务详情
            showService(id){
                this.$parent.showLoading = true;
                showService(id).then((res) => {
                    this.$parent.showLoading = false;
                    if (res && res.data) {
                        let serviceDetail = {
                        key: 'serviceDetail',
                        val: res.data
                    };
                    try{
                        this.initData(serviceDetail);
                    }catch(e){}
                    this.setGoPage();
                    this.$router.push(`/${this.$parent.baseUrlPath}/serviceDetail`);
                   }
                },()=>{
                    this.$parent.showLoading = false;
                })
            },
            //行李额说明
            showLuggage(){
                this.goLuggageDesc=this.orderDetail.ticketRule.luggageDesc;
                this.luggageDescClose=true;
            },
            //退改签信息
            showChange(){
                this.ticketRuleDetailListdesc=[];
                let rt={};
                rt.detailFeeDesc=this.orderDetail.ticketRule.RT;
                rt.detailFeeType="RT";
                rt.detailFeeTypeName="退票费";
                this.ticketRuleDetailListdesc.push(rt);
                let ct={};
                ct.detailFeeDesc=this.orderDetail.ticketRule.CT;
                ct.detailFeeType="CT";
                ct.detailFeeTypeName="改期费";
                this.ticketRuleDetailListdesc.push(ct);
                let mt={};
                mt.detailFeeDesc=this.orderDetail.ticketRule.MT;
                mt.detailFeeType="MT";
                mt.detailFeeTypeName="签转";
                this.ticketRuleDetailListdesc.push(mt);
                if(this.orderDetail.ticketRule.remark!=null && this.orderDetail.ticketRule.remark!=""){
                    let remark={};
                    remark.detailFeeDesc=this.orderDetail.ticketRule.remark;
                    remark.detailFeeType="RM";
                    remark.detailFeeTypeName="备注";
                    this.ticketRuleDetailListdesc.push(remark);
                }
                this.goLuggageDesc=this.orderDetail.ticketRule.luggageDesc;
                // this.luggageDescClose=true;
                this.showChangeBack=true;
            },
            //再订一张
            orderingBack(){
                getElementTag('机票_订单详情页_再订一张','机票详情页');
                let newTime=this.orderDetail.depTime;
                let fromTime=standardDate(newTime);
                this.setGoPage();
                let newObj = {
		            key: 'isDouble',
		            val:false
	            }
                try{
                    this.initData(newObj);
                }catch(e){}
                let backTripObj = {
                    key: 'chosenBackTrip',
                    val: false
                };
                try{
                    this.initData(backTripObj);
                }catch(e){}
                if(new Date().getTime()>=newTime){
                    window.location.href="//m.lvmama.com/"+this.$parent.baseUrlPath+"/"+this.orderDetail.departureCityCode+"-"+this.orderDetail.arrivalCityCode+"/"+standardDate(new Date());
                    // this.$router.push("/"+this.$parent.baseUrlPath+"/"+this.orderDetail.departureCityCode+"-"+this.orderDetail.arrivalCityCode+"/"+standardDate(new Date()));
                }else{
                    window.location.href="//m.lvmama.com/"+this.$parent.baseUrlPath+"/"+this.orderDetail.departureCityCode+"-"+this.orderDetail.arrivalCityCode+"/"+fromTime;
                    // this.$router.push("/"+this.$parent.baseUrlPath+"/"+this.orderDetail.departureCityCode+"-"+this.orderDetail.arrivalCityCode+"/"+fromTime);
                }
            },
            //取消订单
            cancelOrder(){
                if(this.orderList.order.length>0){
                    if(this.orderList.cancelNo!="" && this.orderList.cancelNo!=null){
                        let message=`取消本单同时会取消关联订单${this.orderList.cancelNo}确认取消吗?`;
                        this.messType="cancel";
                        this.showButton(message,"点错了","取消订单","提示");
                    }else{
                        this.messType="cancel";
                        let message=`确定要取消本订单吗?`;
                        this.showButton(message,"点错了","取消订单");
                    }
                }else{
                    this.asyncGetByOrderMainId('cancel');
                }
                
            },
            //点击去支付
            toALLOrderPay(){
                if(this.orderList.order.length>0){
                    if(this.orderList.cancelNo!="" && this.orderList.cancelNo!=null){
                        this.showPay=true;
                    }else{
                        this.toOrderPay();
                    }
                }else{
                    this.asyncGetByOrderMainId('pay');
                }
            },
            //去支付
            toOrderPay(){
                if(this.orderDetail.bookingSource=="LVMAMA_TRAVEL"){
                    this.messType="";
                    this.showButton("差旅订单，请联系贵公司差旅负责人进行支付。谢谢","确定");
                    return;
                }
                 if (isClient() == 1) {
                    window.location.href= "//m.lvmama.com/flight?method=goToPay&orderMainId="+this.orderDetail.orderMainId+"&from=fillOrderPage";
                } else {
                    window.location.href = "https://m.lvmama.com/lvwappay/vorder_success.htm?orderId="+this.orderDetail.orderMainId+"&queryType=flight&orderMainId=true";
                }
                // if(isClient()==1&&navigator.userAgent.indexOf('Android')!=-1){
                //     this.setGoPage();
                //     window.location.href= "//m.lvmama.com/flight?method=goToPay&orderId="+this.orderDetail.orderId;
                // }else{
                //     let paySigUrl="",_paySigUrl="";
                //     this.$parent.showLoading = true;
                //     queryApplyPayAmount(this.orderDetail.orderMainId).then((response) => {
                //         this.$parent.showLoading = false;
                //         if(response.code==1){
                //             let mainPrice = response.data.applyPayAmount;
                //             let applyPayOrderCount = response.data.applyPayOrderCount;
                //             if(applyPayOrderCount>1){
                //                 if (mainPrice <= 2000) {
                //                     paySigUrl = "//m.lvmama.com/flight?method=goToPay&orderMainId="+this.orderDetail.orderMainId+"&from=fillOrderPage";
                //                     _paySigUrl = "https://m.lvmama.com/lvwappay/vorder_success.htm?orderId="+this.orderDetail.orderMainId+"&queryType=flight&orderMainId=true";
                //                 } else if (mainPrice > 2000 && mainPrice <= 5000) {
                //                     this.messType="pay";
                //                     this.showButton(`您有多张订单，合计￥${mainPrice}是否一起支付？`,'支付当前订单','一起支付');
                //                     return;
                //                 } else if (mainPrice > 5000){
                //                     paySigUrl = "//m.lvmama.com/flight?method=goToPay&orderId="+this.orderDetail.orderId;
                //                     _paySigUrl = "https://m.lvmama.com/lvwappay/vorder_success.htm?orderId="+this.orderDetail.orderId+"&queryType=flight";
                //                 }
                //             }else{
                //                 paySigUrl = "//m.lvmama.com/flight?method=goToPay&orderId="+this.orderDetail.orderId;
                //                 _paySigUrl = "https://m.lvmama.com/lvwappay/vorder_success.htm?orderId="+this.orderDetail.orderId+"&queryType=flight";
                //             }
                //             this.setGoPage();
                //             if (isClient() == 1) {
                //                 window.location.href= paySigUrl;
                //             } else {
                //                 window.location.href = _paySigUrl;
                //             }
                //         }
                //     },()=>{
                //         this.$parent.showLoading = false;
                //     })
                   
                // }

            },
            //支付变更费
            jumpCtmtPay(ctmtOrder){
                this.payOrderId=ctmtOrder.orderId;
                //如果是待我审批进来的
                if(this.approveTravel){
                    this.showPass=true;
                }else{
                    if(this.orderDetail.bookingSource=="LVMAMA_TRAVEL"){
                        this.messType="";
                        this.showButton("差旅订单，请联系贵公司差旅负责人进行支付。谢谢","确定");
                        return;
                    }
                    setStore("flight_orderDetailID",this.orderDetail.orderId);
                    this.setGoPage();
                    if (isClient() == 1) {
                        window.location.href="//m.lvmama.com/flight?method=goToPay&orderId="+ctmtOrder.orderId;
                    } else {
                        window.location.href = "https://m.lvmama.com/lvwappay/vorder_success.htm?orderId="+ctmtOrder.orderId+"&queryType=flight";
                    }

                }
            },
            //展示弹框
            showButton(message,leftButton,rightButton,title){
                if(title!=null && title!=""){
                    this.alertTitle=title;
                }else{
                    this.alertTitle="";
                }
                this.message=message;
                this.leftButton=leftButton || "";
                this.rightButton=rightButton || "";
                this.showMessage=true;
            },
            //弹框左按钮事件
            closeAlert(){
                this.showMessage=false;
                if(this.messType=="pay"){
                    this.setGoPage();
                    if (isClient() == 1) {//判断若为ios&android客户端
                        window.location.href = "//m.lvmama.com/flight?method=goToPay&orderId=" + this.orderDetail.orderId;
                    } else {
                        window.location.href = "https://m.lvmama.com/lvwappay/vorder_success.htm?orderId="+this.orderDetail.orderId+"&queryType=flight";
                    }
                }
                
            },
            //弹框右按钮事件
            rightHandler(){
                this.showMessage=false;
                if(this.messType=="pay"){
                    this.setGoPage();
                    if (isClient() == 1) {//判断若为ios&android客户端
                        window.location.href = "//m.lvmama.com/flight?method=goToPay&orderMainId=" + this.orderDetail.orderMainId+ "&from=fillOrderPage";
                    } else {
                        window.location.href = "https://m.lvmama.com/lvwappay/vorder_success.htm?orderId="+this.orderDetail.orderMainId+"&queryType=flight&orderMainId=true";
                    }
                }else if(this.messType=="cancel"){
                    //调用取消全部订单接口
                    this.getCancelOrdersByOrderNo();
                }else if(this.messType=="call"){
                    window.location.href = "tel:10106060,1,6";
                }
                
            },
            //拨打客服
            showTelClick(){
                let message = "机票在线客服热线<br>10106060-1-6",
                    leftButton = "取消",
                    rightButton = "呼叫",
                    title = "";
                this.messType = "call";
                this.showButton(message,leftButton,rightButton);
            },
            //获取返程最低价
            getDestLowPrice(){
                let newTime=this.orderDetail.depTime+24*60*60*3*1000,
                    fromTime=standardDate(newTime);
                getLowPrice(this.orderDetail.arrivalCityCode,this.orderDetail.departureCityCode,isClient()==1?"APP" : "WAP",fromTime).then((res) => {
                    if (res.data.length>0 && res.data[0].flightDailyPriceOfCityDtoList.length>0) {
                        this.lowPrice = res.data[0].flightDailyPriceOfCityDtoList[0].parPrice;
                    }
                })
            },
            //获取保险列表
            getInsurancePersons(){
                let insurances = [],falg=false;
                let orderDetatil = this.orderDetail.orderDetatil;
                if (orderDetatil.length>0) {
                    for (let i = 0; i < orderDetatil.length; i++) {
                        if(orderDetatil[i].insurances.length>0){ 
                            for (let j = 0; j < orderDetatil[i].insurances.length; j++) {
                                if (insurances.length>0) {
                                    for (let k = 0; k < insurances.length; k++) {
                                        if (insurances[k].insuranceName==orderDetatil[i].insurances[j].insuranceName &&orderDetatil[i].insurances[j].insuranceNo!="") {
                                            falg=true;
                                        }
                                    }
                                    if(falg==false){
                                       insurances.push(orderDetatil[i].insurances[j]); 
                                    }
                                }else{
                                    insurances.push(orderDetatil[i].insurances[j]);
                                }
                            }
                        }
                    }
                }

                if (insurances.length>0) {
                    for (let i = 0; i < insurances.length; i++) {
                        insurances[i].persons = [];
                    }

                    if (orderDetatil.length>0) {
                        for (let i = 0; i < orderDetatil.length; i++) {
                            if(orderDetatil[i].insurances.length>0){ 
                                for (let j = 0; j < orderDetatil[i].insurances.length; j++) {
                                    for (let k = 0; k < insurances.length; k++) {
                                        if (orderDetatil[i].insurances[j].insuranceName==insurances[k].insuranceName && orderDetatil[i].insurances[j].insuranceNo!="") {
                                            insurances[k].persons.push(orderDetatil[i].passengerName);
                                        }
                                    }
                                }
                            }
                        }
                    }
                }

                this.insurancesPersons=insurances;
            },
            //倒计时
            noPayTimeout(durTime, mill){
                let that=this;
                setTimeout(function() {
                    durTime = durTime - mill;
                    let _minute, _second;
                    if(durTime >= 0){
                        _minute = Math.floor(durTime/1000/60%60);
                        _second = Math.floor(durTime/1000%60);
                        that.minute1 = _minute >= 10 ? _minute : ("0" + _minute);
                        that.second1 = _second >= 10 ? _second : ("0" + _second);
                        if(location.href.indexOf("orderDetail")!=-1){
                            that.noPayTimeout(durTime, mill);
                        }
                        
                    } else {
                        that.orderDetail.flightOrderStatus = "已取消";
                    }
                }, mill);
            },
            //门票跳转
            ticketClick(id,index){
                this.setGoPage();
                getElementTag('机票_订单详情页_门票','机票详情页');
                 let info={};
                    info.user_id=this.userId;
                    info.product_id=id.productId;
                    info.scene_type='rec_traffic_pated';
                    info.device_id=getCookie('BSFIT_DEVICEID');
                    info.cid=getStore("selectid");
                    info.mobile_flag=getZNSource();
                    info.rec_banner=index;
                    info.rec_batch_id=id.recBatchId;
                    info.token='F72DC6DE0E60476E98F87E3CCD5B2925';

                recfeedback(info).then((res)=>{
                    
                })
                window.location.href = id.h5DetailUrl;
                // if(isClient()==1){
                //     try {
                //         let toAPPName="TicketDetailActivity";
                //         if(getNoticeSource()=="IOS"){
                //             toAPPName="PlaceDetailViewController";
                //         }
                //         NativeUtil.lvCommon("lvJSGoClass",
                //             {
                //                 "className":toAPPName,
                //                 "productId":id
                //             }
                //         )
                //     } catch (error) {
                //         NativeUtil.goClass("Place",{"animate":"1","tabClassName":"","tabAnimate":"1","needLogin":"0"});
                //     }
                   
                // }else{
                //     window.location.href = "//m.lvmama.com/ticket/piao-"+id+'?losc=230900';
                // }
                
            },
            //附近景点
            stnearby(){
                this.setGoPage();
                if(isClient()==1){
                     try {
                        if(getNoticeSource()=="IOS"){
                             NativeUtil.lvCommon("lvJSGoClass",
                                {
                                    "className":"AroundViewController",
                                    "arroundType":'1',
                                    "comeForm":"PlaceViewController"
                                }
                            )
                        }else{
                            window.location.href = "//m.lvmama.com/ticket/stnearby";
                        }
                    } catch (error) {
                        window.location.href = "//m.lvmama.com/ticket/stnearby";
                    }
                }else{
                    window.location.href = "//m.lvmama.com/ticket/stnearby";
                }
            },
            //酒店跳转
            toHotel(){
                this.setGoPage();
                window.location.href = "//m.lvmama.com/hotel/?hideAppHeader=1&losc=230900";
            },
            //拼接所有订单信息
            addOrderlist(res){
                let orderLists=res.data,cancel="",price=0,payedPrice=0;
                this.orderList.order=[];
                for(let i=0;i<orderLists.length;i++){
                    if(orderLists[i].orderId==this.orderDetail.orderId){
                        this.payedAmount=orderLists[i].payedAmount;
                    }
                    if(orderLists[i].orderStatus=="待支付" && orderLists[i].orderId!=this.orderDetail.orderId){
                        cancel=cancel+orderLists[i].orderNo+"，";
                    }
                    let order={
                        orderNo:orderLists[i].orderNo,
                        receivableAmount:orderLists[i].receivableAmount
                    }
                    this.orderList.order.push(order);
                    price=price+Number(orderLists[i].receivableAmount);
                    payedPrice=payedPrice+Number(orderLists[i].payedAmount);
                }
                this.orderList.cancelNo=cancel;//可取消订单NO字符串
                this.orderList.price=price;//订单总额
                this.orderList.payedPrice=payedPrice;//订单已支付金额
                console.log(this.orderList);
            },
            //获取主单下所有子单信息
            getByOrderMainId(){
                let orderMainId=this.orderDetail.orderMainId;
                this.$parent.showLoading = true;
                orderListByOrderMainId(orderMainId).then((res) => {
                    this.$parent.showLoading = false;
                    if(res.code==1 && res.data.length>0){
                        this.addOrderlist(res);
                    }
                },() => {
                     this.$parent.showLoading = false;
                })
            },
            //点击取消订单和去支付查询主单下所有子单信息
            async asyncGetByOrderMainId(type) {
                this.$parent.showLoading = true;
                let orderMainId=this.orderDetail.orderMainId;
                try{
                    let res=await orderListByOrderMainId(orderMainId);
                    this.$parent.showLoading = false;
                    if(res.code==1 && res.data.length>0){
                        this.addOrderlist(res);
                        if(type=="cancel"){
                            if(this.orderList.cancelNo!="" && this.orderList.cancelNo!=null){
                                let message=`取消本单同时会取消关联订单${this.orderList.cancelNo}确认取消吗?`;
                                this.messType="cancel";
                                this.showButton(message,"点错了","取消订单")
                            }else{
                                this.messType="cancel";
                                let message=`确定要取消本订单吗?`;
                                this.showButton(message,"点错了","取消订单")
                            }
                        }else{
                            if(this.orderList.cancelNo!=null && this.orderList.cancelNo!=""){
                                this.showPay=true;
                            }else{
                                this.toOrderPay();
                            }
                        }
                       
                    }else{
                        this.messType="";
                        let message=`网络繁忙，请再试一次`;
                        this.showButton(message,"知道了");
                    }
                }catch(e){
                    this.$parent.showLoading = false;
                    this.messType="";
                    let message=`网络繁忙，请再试一次`;
                    this.showButton(message,"知道了");
                }
            },
            //根据orderNo取消订单
            async getCancelOrdersByOrderNo(){
                let that=this;
                this.$parent.showLoading = true;
                try{
                    let res=await cancelOrdersByOrderNo(this.orderDetail.orderNo);
                    this.$parent.showLoading = false;
                    if(res.code=="1"){
                        this.message="取消订单成功";
                        this.leftButton="";
                        this.rightButton="";
                        this.showMessage=true;
                        setTimeout(function(){
                            that.showMessage=false;
                            that.orderDetail.flightOrderStatus = "已取消";
                        },2000)
                    }else{
                        this.message="取消订单失败,请稍后再试";
                        this.leftButton="";
                        this.rightButton="";
                        this.showMessage=true;
                        setTimeout(function(){
                            that.showMessage=false;
                        },2000)
                    }
                }catch(e){
                    this.$parent.showLoading = false;
                }
            },
            //拼接订单详情信息
            searchDetailRespone(res){
                let that=this;
                that.$parent.showLoading = false;
                let servertimes=res.serverTime,//服务器时间
                    code=res.code;
                that.scheServerTime = new Date(servertimes);
                that.serverTime = new Date(servertimes).getTime();
                if(code == 1){
                    that.orderDetail = res.data;
                    // that.depart = "订单号"+that.orderDetail.orderNo;
                    that.getDestLowPrice();
                    that.getInsurancePersons();
                    that.searchTicketMes(that.orderDetail.arrivalCityCode); 
                    if(that.orderDetail.flightOrderStatus=='待支付'){
                        that.getByOrderMainId();
                    }
                    //报销凭证
                    let postAddress={
                        "address":that.orderDetail.address,
                        "saleType":that.orderDetail.saleType,
                        "carrierCode":that.orderDetail.carrierCode,
                        "flightOrderInvoiceDtoList":that.orderDetail.flightOrderInvoiceDtoList
                    }
                    if(postAddress!=null){
                        if(postAddress.flightOrderInvoiceDtoList.length>0){
                            that.invoice="";
                            that.address=postAddress;
                            for(let i=0;i<that.address.flightOrderInvoiceDtoList.length;i++){
                                if(that.address.flightOrderInvoiceDtoList[i].invoiceType=="VALUE_ADD_TAX_INVOICE"){
                                    that.address.invoice=that.address.flightOrderInvoiceDtoList[i];
                                }
                                if(that.address.flightOrderInvoiceDtoList[i].invoiceType=="TRAVEL_INVOICE"){
                                    that.invoice=that.invoice==""?"行程单":that.invoice+"+行程单";
                                }else if(that.address.flightOrderInvoiceDtoList[i].invoiceType=="VALUE_ADD_TAX_INVOICE"){
                                    that.invoice=that.invoice==""?"差额发票":that.invoice+"+差额发票";
                                }else if(that.address.flightOrderInvoiceDtoList[i].invoiceType=="QUOTA_INVOICE"){
                                    that.invoice=that.invoice==""?"保险定额发票":that.invoice+"+保险定额发票";
                                }
                            }
                        }
                    }
                   
                    //接送机信息
                    that.transferInfo = that.orderDetail.flightVasTransferDtoList || [];
                    for(let i=0;i<that.transferInfo.length;i++){
                        let arr = that.transferInfo[i].vasProductName.split("-");
                        that.transferInfo[i].cityName = arr[0];
                        that.transferInfo[i].transferScene = arr[1];
                        that.transferInfo[i].transferType = arr[2];
                        if (that.transferInfo[i].flightVasTransferRemarkDtoList.length>0) {
                            that.isShowTransferRemark = true;
                        }
                    }
                    //保险信息
                    let insuranceindex=[];
                    for (let a = 0; a < that.orderDetail.insurance.length; a++) {
                        for (let b = a+1; b < that.orderDetail.insurance.length; b++) {
                            if (that.orderDetail.insurance[b].insurancePrice == that.orderDetail.insurance[a].insurancePrice && that.orderDetail.insurance[b].insuranceName == that.orderDetail.insurance[a].insuranceName) {
                                insuranceindex.push(b);
                            }
                        }
                    }
                    if(insuranceindex.length>0){
                        let removeDup3 = function(data){
                            let result = [],obj = {};
                            for(let i = 0; i < data.length; i++){
                                if(!obj[data[i]]){
                                    result.push(data[i]);
                                    obj[data[i]] = 1;
                                }
                            }

                            return result;
                        }

                        insuranceindex=removeDup3(insuranceindex);
                        let quickSort = function(arr) {
                            if (arr.length <= 1) { return arr; }
                            let pivotIndex = Math.floor(arr.length / 2),
                                pivot = arr.splice(pivotIndex, 1)[0],
                                left = [],
                                right = [];
                            for (let i = 0; i < arr.length; i++){
                                if (arr[i] < pivot) {
                                    left.push(arr[i]);
                                } else {
                                    right.push(arr[i]);
                                }
                            }
                            return quickSort(left).concat([pivot], quickSort(right));
                        };
                        insuranceindex=quickSort(insuranceindex);
                        insuranceindex.reverse();
                        let inres = [insuranceindex[0]];
                        for(let i = 1; i < insuranceindex.length; i++){
                            if(insuranceindex[i] !== inres[inres.length - 1]){
                                inres.push(insuranceindex[i]);
                            }
                        }
                        for(let q=0;q<inres.length;q++){
                            that.orderDetail.insurance.splice(inres[q],1);
                        }
                    }
                    //套餐价逻辑处理
                    if(that.orderDetail.tagBusinessType=="TICKET"){
                        that.packageVas=false;
                        for(let i=0;i<that.orderDetail.vasCouponOrders.length;i++){
                            if(that.orderDetail.vasCouponOrders[i].vasProductId==that.orderDetail.tagProductId){
                                that.packageShow=true;
                                that.packagePrice=that.orderDetail.vasCouponOrders[i].salesPrice;
                            }else{
                                that.packageVas=true;
                            }
                        }
                    }else if(that.orderDetail.tagBusinessType=="INSURANCE"){
                        that.packageIn=false;
                        for(let i=0;i<that.orderDetail.insurance.length;i++){
                            if(that.orderDetail.insurance[i].insuranceInfoId==that.orderDetail.tagProductId){
                                that.packageShow=true;
                                that.packagePrice=that.orderDetail.insurance[i].insurancePrice;
                            }else{
                                that.packageIn=true;
                            }
                        }
                    }
                    //贵宾室信息
                    if (that.orderDetail.vasOrders && that.orderDetail.vasOrders.length>0) {
                        that.departure=[];
                        that.returnTrip = [];
                        for (let i = 0; i < that.orderDetail.vasOrders.length; i++) {
                            if (that.orderDetail.vasOrders[i].flightTripType=='DEPARTURE') {
                                that.departure.push(that.orderDetail.vasOrders[i]);
                            }else if (that.orderDetail.vasOrders[i].flightTripType=='RETURN') {
                                that.returnTrip.push(that.orderDetail.vasOrders[i]);
                            }
                        }
                    }
                    
                    if(that.orderDetail.orderOpCommands.length>0){
                        that.orderDetail.orderOpCommands.sort();
                    }
                    if(that.orderDetail.orderNo == undefined ||that.orderDetail.orderNo== null || that.orderDetail.orderNo == ""){
                        that.showErr=1;
                    }else{
                        that.departureDate = switchDateFormate(that.orderDetail.depTime);
                        that.arrivalDate = switchDateFormate(that.orderDetail.arrTime);
                        that.bookingDate = switchDateFormate(that.orderDetail.orderCreatTime).split(" ")[0];
                        that.taxTotal = parseInt(that.orderDetail.airportTax) + parseInt(that.orderDetail.fuelTax);
                        if(that.orderDetail.saleType=='RoundTripSpecial'&& that.orderDetail.returnFlightOrderDetailViewVo){
                            that.zhendepartureDate = switchDateFormate(that.orderDetail.returnFlightOrderDetailViewVo.depTime);
                            that.zhenarrivalDate = switchDateFormate(that.orderDetail.returnFlightOrderDetailViewVo.arrTime);
                            let zdurMs = that.orderDetail.returnFlightOrderDetailViewVo.arrTime - that.orderDetail.returnFlightOrderDetailViewVo.depTime,
                                zdurMin = Math.floor(zdurMs/1000/60)%60,
                                zdurHour = Math.floor(zdurMs/1000/60/60);
                            that.zhendurTimeStr = zdurHour + "小时" + zdurMin + "分";
                        }
                        let durMs = that.orderDetail.arrTime - that.orderDetail.depTime,
                            durMin = Math.floor(durMs/1000/60)%60,
                            durHour = Math.floor(durMs/1000/60/60);
                        that.durTimeStr = durHour + "小时" + durMin + "分";
                    }
                    let date3=standardDate(that.orderDetail.depTime+3*24*60*60*1000);//3天后的出发时间
                    let overdate=new Date(servertimes).getTime();//系统当前时间
                    if(new Date(formatIOSDate(overdate)).getTime()>=new Date(formatIOSDate(date3)).getTime()){
                        that.timeThree=true;
                    }else{
                        that.timeThree=false;
                    }
                    //初始化退票乘机人数组  原单是否展示退改按钮
                    for(let i = 0; i < that.orderDetail.orderDetatil.length; i++){
                        // let  rtvtCheck[i] = null;
                        if(that.orderDetail.orderDetatil[i].isCanCTMT || that.orderDetail.orderDetatil[i].isCanRTVT){
                            that.showRCbutton=true;
                            if(that.orderDetail.orderDetatil[i].isCanCTMT){
                                that.showctbutton=true;
                            }
                            if(that.orderDetail.orderDetatil[i].isCanRTVT){
                                that.showrtbutton=true;
                            }
                        }
                    }
                    //待支付订单倒计时
                    if(that.orderDetail.flightOrderStatus=='待支付' && that.orderDetail.orderOpCommands[0] != 'HIDDEN'){
                        that.noPayTimeout(that.orderDetail.orderStopTime - new Date(servertimes).getTime(),1000);
                    }
                    //改签单是否可退改信息
                    if(that.orderDetail.ctmtOrderDetails.length > 0){
                        for(let i = 0; i < that.orderDetail.ctmtOrderDetails.length; i++){
                            let date3=standardDate(that.orderDetail.ctmtOrderDetails[i].depTime+3*24*60*60*1000);//3天后的出发时间
                            if(new Date(formatIOSDate(overdate)).getTime()>=new Date(formatIOSDate(date3)).getTime()){
                                that.orderDetail.ctmtOrderDetails[i].timethree=true;
                            }
                            for(let j=0;j<that.orderDetail.ctmtOrderDetails[i].ticketDetatil.length;j++){
                                if(that.orderDetail.ctmtOrderDetails[i].ticketDetatil[j].isCanRTVT){
                                    that.orderDetail.ctmtOrderDetails[i].showRTVT=true;
                                }
                            }
                            that.orderDetail.ctmtOrderDetails[i].departureDate=switchDateFormate(that.orderDetail.ctmtOrderDetails[i].depTime);
                            that.orderDetail.ctmtOrderDetails[i].arrivalDate=switchDateFormate(that.orderDetail.ctmtOrderDetails[i].arrTime);
                            let durMs = that.orderDetail.ctmtOrderDetails[i].arrTime - that.orderDetail.ctmtOrderDetails[i].depTime,
                                durMin = Math.floor(durMs/1000/60)%60,
                                durHour = Math.floor(durMs/1000/60/60);
                            that.orderDetail.ctmtOrderDetails[i].durTimeStr=durHour + "小时" + durMin + "分";

                        }
                    }
                    //判断展示商旅底
                    if(this.orderDetail.ctmtOrderDetails.length>0 && !this.approveTravel){
                        let ctmAllOrder = this.orderDetail.ctmtOrderDetails;
                        for (let i = 0; i < ctmAllOrder.length; i++) {
                            if(ctmAllOrder[i].orderPayStatus == 'NOT_PAY' && ctmAllOrder[i].ctmtPrice>0){
                                this.showTavel = true;
                                break;
                            }
                            
                        };

                    }
                    
                }else if(code==4){
                    that.showErr=4;
                }else{
                    that.showErr=2;
                }
            },

            //查询订单详情
            searchDetail(orderMainId,orderId){
                let that=this;
                that.$parent.showLoading = true;
                that.showRCbutton=false;
                that.showctbutton=false;
                that.showrtbutton=false;
                that.orderDetail='';
                if(!that.approveTravel){
                    orderCombinedDetail(orderId,orderMainId).then((res) => {
                        that.orderDetail='';
                        that.searchDetailRespone(res);
                    },() => {
                        that.$parent.showLoading = false;
                        that.showErr=3;
                    })
                }else{
                    travelCombinedDetail(orderId,orderMainId).then((res) => {
                        that.orderDetail='';
                        that.searchDetailRespone(res);
                    },() => {
                        that.$parent.showLoading = false;
                        that.showErr=3;
                    })
                }
                
            },
            //订返程
            backTripClick() {
                getElementTag('机票_订单详情页_定返程','机票详情页');
                let backDepartCode = this.orderDetail.arrivalCityCode;
                let backArrivalCode = this.orderDetail.departureCityCode;
                let tempDepartObj = {
                    key: 'departureCity',
                    val: {
                        code: this.orderDetail.arrivalCityCode,
                        name: this.orderDetail.arrivalCityName
                    }
                };
                try{
                    this.initData(tempDepartObj);
                }catch(e){}
                let tempArrivalObj = {
                    key: 'arrivalCity',
                    val: {
                        code: this.orderDetail.departureCityCode,
                        name: this.orderDetail.departureCityName
                    }
                };
                try{
                    this.initData(tempArrivalObj);
                }catch(e){}
                let departDateStamp = this.orderDetail.depTime;
                let turnBack = new Date(+departDateStamp + 3 * 24 * 60 * 60 * 1000);
                let backObj = {
                    year: turnBack.getFullYear(),
                    month: turnBack.getMonth() + 1,
                    date: turnBack.getDate(),
                    day: weekFormat(turnBack.getDay())
                }
                let obj = {
                    key: 'departDate',
                    val: backObj
                }
                try{
                    this.initData(obj);
                }catch(e){}
                let newObj = {
		            key: 'isDouble',
		            val:false
	            }
                try{
                    this.initData(newObj);
                }catch(e){}
                let backTripObj = {
                    key: 'chosenBackTrip',
                    val: false
                };
                try{
                    this.initData(backTripObj);
                }catch(e){}
                this.setGoPage();
                window.location.href="//m.lvmama.com/"+this.$parent.baseUrlPath+"/"+backDepartCode+"-"+backArrivalCode;
                // this.$router.push(`/${this.$parent.baseUrlPath}/${backDepartCode}-${backArrivalCode}`);
            },
            //点击拒绝出现拒绝弹框
            isReject(){
                this.showReject = true;
            },
            //关闭拒绝原因弹框
            closeReject(){
                this.showReject = false;
            },
            //确认拒绝
            sureReject(){
                //拒绝审批接口
                this.$parent.showLoading = true;
                let that = this;
                // if(that.improveContent!=''&&that.improveContent!=null){
                travelCancelOrder(that.orderId,that.improveContent).then((res) => {
                    this.$parent.showLoading = false;
                    if(res.code == '1'){
                        if(res.data == true){
                            that.showReject = false;

                            if(this.goPage == 'backIndex' || location.search.indexOf("backBusinessAllOrders")!=-1){
                               that.$router.push(`/${this.$parent.baseUrlPath}/businessTravelIndex`);
                            }else if(this.goPage == 'waitIndex' || location.search.indexOf("backBusinessApprove")!=-1){
                                that.$router.push(`/${this.$parent.baseUrlPath}/businessTravelApprove`);
                            }else if(this.goPage == 'allIndex' || location.search.indexOf("backBusinessAllOrders")!=-1){
                                that.$router.push(`/${this.$parent.baseUrlPath}/businessTravelAllOrders`);
                            }else{
                                that.$router.push(`/${this.$parent.baseUrlPath}/businessTravelApprove`);
                             }

                        }else{
                            that.showReject = false;
                            that.showMessage = true;
                            that.leftButton ="";
                            that.rightButton ="";
                            that.message = "取消订单失败";
                            setTimeout(function() {
                                that.showMessage = false;
                            }, 2000);
                        }

                    }else{
                        that.showReject = false;
                        that.showMessage = true;
                        that.leftButton ="";
                        that.rightButton ="";
                        that.message = "取消订单失败";
                        setTimeout(function() {
                            that.showMessage = false;
                        }, 2000);
                    }
                })

                // }

            },
            //商旅通过弹框
            isSurePass(){
                this.payOrderId=this.orderId;
                this.showPass = true;
            },
            closeSure(){
               this.showPass = false; 
            },
            //确认通过
            confirmPass(){
                //审批通过接口
                let that = this;
                this.$parent.showLoading = true;
                travelPassOrder(that.payOrderId).then((res) => {
                     this.$parent.showLoading = false;
                    if(res.code == '1'){
                        if(res.data){
                            let tarvelOrder = res.data;
                            if(tarvelOrder.paymentStatus == 'SUCCESS'){
                                that.showPass = false;

                                if(this.goPage == 'backIndex' || location.search.indexOf("backBusinessIndex")!=-1){
                                   that.$router.push(`/${this.$parent.baseUrlPath}/businessTravelIndex`);
                                }else if(this.goPage == 'waitIndex' || location.search.indexOf("backBusinessApprove")!=-1){
                                    that.$router.push(`/${this.$parent.baseUrlPath}/businessTravelApprove`);
                                }else if(this.goPage == 'allIndex' || location.search.indexOf("backBusinessAllOrders")!=-1){
                                    that.$router.push(`/${this.$parent.baseUrlPath}/businessTravelAllOrders`);
                                }else{
                                    that.$router.push(`/${this.$parent.baseUrlPath}/businessTravelApprove`);
                                 }
                                
                            }

                        }
                    }else{
                        that.showPass = false;
                        that.showMessage = true;
                        that.leftButton ="";
                        that.rightButton ="";
                        that.message = '支付失败，请联系相关负责人';
                        setTimeout(function() {
                            that.showMessage = false;
                        }, 2000);
                    }
                })
            },
            callPhone(){
                window.location.href = 'tel:' + this.orderDetail.flightOrderCustomerVo.customerCellphone;
            },
            showInsur(){
                this.isDown = !this.isDown;
            }
           
        },
        activated() {
            removeStore('goin',this);
            setStore('passengerIdTicketNo',[]);
            this.orderDetail='';
            this.packageShow=false;
            this.packageVas=true;
            this.packagePrice=null;
            this.packageIn=true;
            this.locationInfo='';
            //判断到订单详情页区分调老接口还是新接口
            if(location.pathname.indexOf('travel')!=-1){
                this.approveTravel = true;
                let travelLength =  this.businessWaitOrders.length,
                    travelName = '待我审批';
                this.beforeLength = 0;
                for (let  i = 0; i < this.businessWaitOrders.length; i++) {
                   if(this.$route.params.orderId == this.businessWaitOrders[i].orderId){
                        this.beforeLength = i+1;
                        break;
                   }
                };

                //商旅头部新加
                this.travelDepart = `${travelName}${this.beforeLength}/${travelLength}`;
            }else{
                this.approveTravel = false;
            }
            
            positionUtil.getLocalPosition((position) => {
                this.locationInfo=position;
            })
            if(getStore('backBusinessIndex') != null){
                this.goPage = 'backIndex';
            }else if(getStore('backBusinessApprove') != null){
                this.goPage = 'waitIndex';
            }else if(getStore('backBusinessAllOrders') != null){
                this.goPage = 'allIndex';
            }
            
            removeStore('backBusinessIndex');
            removeStore('backBusinessApprove');
            removeStore('backBusinessAllOrders');
            removeStore('backHome');
            removeStore('goFlight');
            
            this.improveContent="";
            this.userId="";
            this.showErr=0;
            this.payedAmount="";
            this.orderList={};
            this.orderId = this.$route.params.orderId;
            this.orderMainId = this.$route.params.orderMainId;
            this.minute1 = "";
            this.second1 = "";
            this.$parent.showLoading = true;
            this.depart = "订单详情";
            this.showPay=false;
            this.showEyes=false;
            if(isClient() == 1){
                this.isAPP=true;
                getLvSessionId().then((data) => {
                    if(data==null || data=="" || data==undefined){
                        removeStore("selectuserid");
                        removeStore("selectusername");
                        removeStore("selectid");
                        jumpLogin();
                        return;
                    }
                    getLvUser(data).then((res) => {
                        this.$parent.showLoading = false;
                        this.userId=res.data.userId;
                        if(res.data.userId!=null && res.data.userId!=undefined && res.data.userId!=""){
                            setStore("selectuserid",this.userId);
                            setStore("selectusername",res.data.userName);
                            setStore("selectid",res.data.id);
                            this.searchDetail(this.orderMainId,this.orderId);
                        }else{
                            removeStore("selectuserid");
                            removeStore("selectusername");
                            removeStore("selectid");
                            jumpLogin();
                        }
                    });
                },()=>{
                    removeStore("selectuserid");
                    removeStore("selectusername");
                    removeStore("selectid");
                    this.$parent.showLoading = false;
                    this.showErr=3;
               })
            }else{
                this.isAPP=false;
                //wap登录
                getLvUserByCookie().then((res) => {
                    this.$parent.showLoading = false;
                    this.userId=res.data.userId;
                    if(res.data.userId!=null && res.data.userId!=undefined && res.data.userId!=""){
                        setStore("selectuserid",this.userId);
                        setStore("selectusername",res.data.userName);
                        setStore("selectid",res.data.id);
                        this.searchDetail(this.orderMainId,this.orderId);
                    }else{
                        removeStore("selectuserid");
                        removeStore("selectusername");
                        removeStore("selectid");
                        jumpLogin();
                    }
                },()=>{
                    removeStore("selectuserid");
                    removeStore("selectusername");
                    removeStore("selectid");
                    this.$parent.showLoading = false;
                    this.showErr=3;
                }) 
            }
            this.changePhone=false;
			if(new Date().getHours()<9||new Date().getHours()>=20){
				this.changePhone=true;
			}
            getStatisticsType('机票订单-详情','FlightOrderDetail');

        },
    }
</script>

<style lang="scss" scoped>
@import '../../style/mixin';
.order_detail_container {
    position: relative;
    @include wh(100%,100%);
    .order_detail_body_container {
        @include heightByAbsolute(.9rem,0);
        overflow-y: scroll;
        .container_common_style {
            background: #fff;
            @include borderRadius(.06rem);
            padding: .24rem .2rem 0;
            box-sizing: border-box;
            margin: .2rem;
        }
        .travel{
            padding: .24rem .2rem !important;
        }
        .order_detail_state_container {
            color: #666;
            border-top: 1px solid #efefef;
            border-radius: inherit;
            margin: 0;
            >div.order_detail_cancelPay{
                border-bottom: 0 solid #efefef;
                padding-bottom: 0;
            }
            .order_detail_state_container_top {
                // border-bottom: 1px solid #efefef;
                // padding-bottom: .2rem;
                .order_state {
                    border-bottom: 1px solid #efefef;
                    line-height: .54rem;
                    >div.canceled:first-child{
                        color:#666;
                    }
                    >div.payed:first-child{
                        color:#7bc730;
                    }
                    >div.changed:first-child{
                        color:#5598dc;
                    }
                    > div:first-child {
                        @include sc(.3rem,#333333);
                        font-weight: bold;
                    }
                    >div.order_total_price_detail {
                        @include sc(.26rem,#666);
                        > i {
                            @include sc(.24rem,#FF6600);
                            margin-left: .1rem;
                        }
                        > span {
                            @include sc(.4rem,#FF6600);
                            font-weight: bold;
                        } 
                        >div.point_price_arrow{
                            position: relative;
                            background: url('//m.lvmama.com/flight/image/detail_arrow.png') 0 0 no-repeat;
                            background-size: 100%;
                        }
                    }
                }
                .order_number {
                    @include sc(.24rem,#999999);
                    padding-top: 0.2rem;
                }
                .order_djstime{
                    @include sc(.24rem,#666);
                    margin-top: 0.1rem;
                }
                >div{
                    .order-time-remain {
                        @include sc(.24rem,#333333);
                        font-weight:bold;
                        // padding-left: 0.36rem;
                        // background: url('//m.lvmama.com/flight/image/clock.png') no-repeat left 0.02rem;
                        // background-size: 0.3rem;
                        // -webkit-background-size: 0.3rem;
                    }
                    .order-haveToPay{
                        @include sc(.24rem,#666);
                        right: .2rem;
                        position: absolute;
                    }  
                }
            }
            .order_detail_order_again {
                @include wh(100%,.72rem);
                font-size: .3rem;
                border-bottom: 1px solid #efefef;
            }
            >div.order_detail_cancel_pay{
                height: 1.3rem;
                position: relative;
                .order_detail_cancel{
                    // @include wh(2.2rem,.6rem);
                    // line-height: .6rem;
                    // color: #d30775;
                    // border-radius: 5px;
                    // border: 1px #d30775 solid;
                    // text-align: center;
                    // right: 2.4rem;
                    // @include ct();
                    width: 3.3rem;
                    height: 0.6rem;
                    line-height: 0.6rem;
                    border: 1px solid #efefef;
                    border-radius: 0.6rem;
                    color: #666666;
                    font-size: 0.26rem;
                    text-align: center;
                }
                .cancelRight{
                    margin-left: 0.2rem;
                }
                .actBackColor{
                    background-image: linear-gradient(90deg, #FF7F6A 0%, #FD3C71 100%);
                    border: none;
                    color: #ffffff;
                }
                .order_detail_pay{
                    @include wh(2.2rem,.6rem);
                    line-height: .6rem;
                    color: #FFF;
                    border-radius: 5px;
                    background-color: #FF6600;
                    text-align: center;
                    right: 0;
                    @include ct();
                }
            }
            .order_detail_chat_group {
                @include wh(100%,.72rem);
                font-size: .3rem;
            }
        }
        .theEntrance{
            height: 1.2rem;
            @include borderRadius(0.08rem);
            @include sc(0,#333);
            background-color: #fff;
            position: relative;
            margin:.2rem;
            .jsz{
                width: 50%;
                display: inline-block;
                font-size: .3rem;
                position: relative;
                height: 100%;
                >i{
                    @include wh(0.54rem,0.5rem);
                    @include ct;
                    display: inline-block;
                    left: .3rem;
                    background: url("//m.lvmama.com/flight/image/jsj.png") no-repeat center;
                    background-size: 100%;
                }
                >div {
                    @include ct;
                    margin-left: 1.2rem;
                    display: inline-block;
                    >p:nth-of-type(2) {
                        @include sc(.22rem,#999);
                    }
                }
            }
        }
        .travel_order{
            @include sc(.32rem,#000000);
            margin-bottom: 0.2rem;
            margin-left: 0.2rem;
        }
        .travel_Infor{
            @include wh(100%,auto);
            background: #fff;
            margin-bottom: 0.2rem;
            padding: 0 0.2rem;
            border-radius: 3px;
            .travel_Infor_name{
                @include wh(100%,auto);
                // line-height: 0.88rem;
                padding: 0.2rem 0;
                border-bottom: 1px solid #ccc;
                span{
                    @include sc(.28rem,#000000);
                }
                span:nth-child(1){
                    // float: left;
                    i{
                        display: inline-block;
                        @include wh(0.32rem,0.32rem);
                        background: url('//m.lvmama.com/flight/image/travelPhone.png') no-repeat;
                        background-size: 100%;
                        margin-left: 0.1rem;
                        vertical-align: middle;
                        margin-top: -0.1rem;
                    }
                }
                span:nth-child(2){
                    word-break: break-all;
                }
            }
            ul{
                padding: 0.3rem 0;
                li{
                    margin-bottom: 0.3rem;
                }
                li:last-child{
                     margin-bottom: 0;
                }
            }
            .travel_parPrice{
                 @include wh(100%,0.88rem);
                 border-top: 1px solid #ccc;
            }
        }

        .order_detail_info_container {
            padding-top: 0;
            .flight_detail_title{
                position: relative;
                padding-top: 0.2rem;
                .title{
                    font-size: 0.28rem;
                    color: #333333;
                    font-weight: 600;
                }
                .is_new{
                    display: inline-block;
                    @include wh(0.34rem,0.34rem);
                    background-image: linear-gradient(90deg, #FE9393 0%, #FF5F5F 100%);
                    border-radius: 3px;
                    line-height: 0.34rem;
                    text-align: center;
                    @include sc(0.24rem,#fff);
                }
                .fenxiang{
                    // @include ct();
                    position: absolute;
                    right: 0;
                    color: #FF6600;
                }
                .fximg{
                    background: url('//m.lvmama.com/flight/image/fenxiang_new.png') no-repeat;
                    background-size: 100%;
                    -webkit-background-size: 100%;
                    display: inline-block;
                    @include wh(.36rem,.35rem);
                }
            }
            .order_detail_info_header {
                @include wh(100%,.62rem);
                // border-bottom: 1px solid #ddd;
                font-size: .24rem;
                color: #666;
                position: relative;
                .fenxiang{
                    @include ct();
                    right: 0;
                    color: #FF6600;
                }
                .fximg{
                    background: url('//m.lvmama.com/flight/image/fenxiang_new.png') no-repeat;
                    background-size: 100%;
                    -webkit-background-size: 100%;
                    display: inline-block;
                    @include wh(.36rem,.35rem);
                }
                .oldFlightDetail{
                    @include wh(.32rem,.3rem);
                    @include sc(.22rem,#FF6600);
                    background-color: #aaa;
                    padding: 0 .04rem;
                    display: inline-block;
                    line-height: .3rem;
                    margin-right: .1rem;
                }
                .newFlightDetail{
                    @include wh(.32rem,.3rem);
                    @include sc(.22rem,#FF6600);
                    background-color: #FF6600;
                    padding: 0 .04rem;
                    display: inline-block;
                    line-height: .3rem;
                    margin-right: .1rem;
                }
                .orderType{
                    // padding: 0;
                    // @include sc(.22rem,#FF6600);
                    // border: 1px solid #FF6600;
                    // border-radius: 2px;
                    // line-height: .28rem;
                    @include wh(.52rem,.28rem);
                    @include ct();
                    background: url(//m.lvmama.com/flight/image/oneway.png) no-repeat;
                    background-size: 100%;
                }
                .orderType.doubleTo{
                    @include wh(.52rem,.28rem);
                    @include ct();
                    background: url(//m.lvmama.com/flight/image/doubleGo.png) no-repeat;
                    background-size: 100%;
                }
                .orderType.doubleFrom{
                    @include wh(.52rem,.28rem);
                    @include ct();
                    background: url(//m.lvmama.com/flight/image/doubleFrom.png) no-repeat;
                    background-size: 100%;
                }
                .orderTitle{
                    @include sc(.26rem,#666);
                    margin-left: .6rem;
                }
            }
            .backChange{
                margin: .15rem .1rem .3rem;
                margin-left: 0;
                position: relative;
                > p{
                    padding-bottom: .2rem;
                    @include sc(.24rem,#666);
                }
            }
            .buttoms{
                overflow: hidden;
                > div{
                    @include wh(33.3%,100%);
                    float: left;
                    border: none;
                    border-radius: 0;
                    margin: 0;
                    padding: 0 .2rem .2rem 0;
                    > div{
                        width:100%;
                        border: 1px solid #efefef;
                        line-height: .48rem;
                        text-align: center;
                        border-radius: 100px;
                        color: #666;
                    }
                    > div.noClick{
                        opacity: 0.5;
                    }
                }
            }
            .ctmt-info{
                padding: .3rem .2rem;
                position: relative;
                >p:first-child{
                    color: #666;
                }
                >p{
                    >span{
                        color: #000;
                        display: inline-block;
                        width: 2rem;
                        vertical-align: top;
                    }
                    >span.ctmt-price{
                        @include sc(.36rem,#FF6600);
                        >em{
                            @include sc(.22rem,#FF6600);
                        }
                        >em:last-child{
                            color: #000;
                        }
                    }
                }
                .ctmt-flight-info{
                    @include wh(1.8rem,.6rem);
                    position: absolute;
                    right: .2rem;
                    bottom: .3rem;
                    line-height: .6rem;
                    background-color: #FF6600;
                    border-radius: 4px;
                    text-align: center;
                    color: #fff;
                }
            }
            .order_detail_info_body {
                // border-bottom: 1px solid #ddd;
                .order_detail_time_info {
                    @include wh(100%,1rem);

                    > div {
                        @include wh(33%,inherit);

                    }
                    .time_info {
                        
                        .time {
                            @include sc(.48rem,#333);
                        }
                        .airport {
                            @include sc(.28rem,#666);
                        }
                    }
                    .flight_time {
                        @include sc(.22rem,#999 !important);
                        text-align: center;
                        .spend_time_icon {
                            @include wh(1.5rem,.28rem);
                            background: url('//m.lvmama.com/flight/image/jiantou.png') no-repeat;
                            background-size: 100%;
                        }
                        .spend_jt_icon{
                            @include sc(.2rem,#9f9f9f);
                            display: block;
                            margin-top: -.12rem;
                            padding: 0 .04rem;
                        }
                    }
                }
                .order_detail_plane_info {
                    height: .58rem;
                    > div {
                        @include wh(.3rem,.3rem);
                        margin-right: .1rem;
                    }
                    .codeShare{
                        padding-left:.1rem;
                    }
                }
                .codeShare_text{
                    font-size: .24rem;
                    border-top: 1px dashed #ccc;
                    padding: .15rem .15rem .15rem 0;
                    margin-right: .2rem;
                }
                

            }
            .prompt_icon{
                display: inline-block;
                @include wh(.24rem,.24rem);
                @include ct();
                background: url('//m.lvmama.com/flight/image/wenhao4.png') no-repeat;
                background-size: 100%;
            }
            .order_detail_info_footer {
                @include sc(.24rem,#999);
                line-height: .5rem;
                margin-right: .1rem;
                margin-left: .3rem;
                position: relative;
                >span{
                    display: inline-block;
                    @include wh(.24rem,.24rem);
                    @include ct();
                    background: url('//m.lvmama.com/flight/image/wenhao4.png') no-repeat;
                    background-size: 100%;
                    margin-left: -.3rem;
                }
                >em{
                    @include sc(.24rem,#999);
                }
            }
        }
        .rtmt-info{
            padding: .3rem .2rem;
            // width: 100%;
            margin: .2rem;
            background-color: #fff;
            overflow: hidden;
            border-radius: 6px;
            position: relative;
            > p:first-child{
                color: #666;
            }
            >p{
                >span:first-child{
                    color: #000;
                    display: inline-block;
                    width: 2rem;
                    vertical-align: top;
                }
                >span:last-child{
                    @include sc(.36rem,#FF6600);
                    width: 35%;
                    display: inline-block;
                    >i{
                        @include sc(.22rem,#FF6600);
                    }
                }
                >span:last-child.rtName{
                    font-size: 0.28rem;
                }
            }
        }
        .order_detail_passengers_container {
            position: relative;
            .order_title {
                width: 1.2rem;
                margin-right: .1rem;
                font-size: 0.28rem;
                color: #333;
                font-weight: 600;
            }
            .eyes{
                position: relative;
                >span{
                    @include wh(.28rem,.28rem);
                    @include ct();
                    margin-left: .2rem;
                    >i{
                        background: url('//m.lvmama.com/flight/image/eyes.png') no-repeat;
                        background-size: 100%;
                        @include wh(100%,50%);
                        @include ct();
                    }
                }
            }
            .names{
                padding-top: 0;
                padding-right: 1.2rem;
                position: relative;
            }
            .cfff{
                color:#fff;
                visibility: hidden;
            }
            .new{
                @include sc(.2rem,#007aff);
                border: 1px solid #007aff;
                padding: 0 .04rem;
                margin-left: .04rem;
                border-radius: 2px;
                background-color: #fff;
            }
            .passenger_name{
                >div{
                    float: left;
                    position: relative;
                }
                >div:first-child{
                    font-size: 0.28rem;
                    color: #333;
                }
                >span{
                    font-size: 0.24rem;
                }
                .status {
                    font-size: .2rem;
                    color: #ff5465;
                    border: 1px solid #ffa5ae;
                    border-radius: 3px;
                    padding: 0 .1rem;
                    margin-left: .1rem;
                }
            }
            .order_passengers_container {
                padding-top: 0.24rem;
                padding-bottom: .24rem;
                overflow: hidden;
                .passenger_type{
                    width: 1rem;
                    height: 0.96rem;
                    text-align: center;
                    border-radius: 0.06rem;
                    border: 1px solid #D8EAFF;
                    float: left;
                    .type{
                        background-color: #5CA2F8;
                        border-top-left-radius: initial;
                        border-top-right-radius: initial;
                        color: #fff;
                        font-size: 0.2rem;
                        height: 0.36rem;
                        line-height: 0.36rem;
                    }
                    .person_index{
                        height: 0.6rem;
                        line-height: 0.6rem;
                        font-size: 0.28rem;
                        color: #5CA2F8;
                    }
                }
                .change_color{
                    border: 1px solid #ff8800;
                    .type{
                        background: #ff6600;
                    }
                    .person_index{
                        color:#ff6600;
                    }
                }
                .passenger_detail{
                    margin-left: 0.2rem;
                    float: left;
                    .num{
                        .actsc{
                            font-size: 0.26rem;
                            color: #999;
                        }
                    }
                    >div:nth-of-type(2){
                        margin-top: .12rem;
                    }
                }
            }
            .caaa{
                color:#aaa !important;
                >i{
                    color:#aaa !important;
                    font-size: .24rem;
                    text-decoration: line-through;
                }
            }
            .order_phone_number {
                // border-top: 1px solid #ddd;
                @include topline();
                height: .9rem;
            }
            .arrow {
                @include wh(1rem,.88rem);
                @include allcover();
            }
            .arrow:after {
                content: "";
                right: .2rem;
                @include wh(.2rem,.2rem);
                border-top: 1px solid #666;
                border-right: 1px solid #666;
                position: absolute;
                top: .38rem;
                -webkit-transform: rotate(-45deg);
                transform: rotate(-45deg);
            }

        }
        .detail-up{
            .arrow:after {
                top: .28rem;
                -webkit-transform: rotate(135deg);
                transform: rotate(135deg);
            }
        }
        .expense_container {
            padding-top: 0;
            height: .9rem;
            .post-wrapper{
                .post-content{
                    background-color: #fff;
                    // padding: 0 0 0 .2rem;
                    border-radius: .1rem;
                    .post-shipping{
                        padding: .2rem 0;
                        color: #000;
                        font-size: .28rem;
                        position: relative;
                        .shipping{
                            position: relative;
                            .shipping-title{
                                padding-right: .2rem;
                                font-size: 0.28rem;
                                color: #666;
                            }
                            .shipping-placehold{
                                color:#000;
                            }
                            >span:nth-child(2){
                                font-size: 0.28rem;
                                color: #333;
                            }
                        }   
                    }
                    .orderline{
                        @include orderline();
                    }
                }
            }
            .insurance-wrapper{
                // padding: 0 0.2rem;
                // margin-top: 1.1rem;
                .insur-traffic-con{
                    @include sc(.3rem,#333);
                    background-color: #fff;
                    margin-bottom: 0.2rem;
                    // padding-left: 0.2rem;
                    border-radius: 0.1rem; 
                    .insur-content{
                        height: 0.8rem;
                        line-height: 0.8rem;
                        position: relative;
                        .insur-icon{
                            @include wh(.35rem,.4rem);
                            display: inline-block;
                            background: url('//m.lvmama.com/flight/image/insurance-icon.png') no-repeat;
                            background-size: 100%;
                            -webkit-background-size: 100%;
                            position: relative;
                            top: 0.1rem;
                            margin-right: 0.1rem;
                        }
                        .insur-amount{
                            @include sc(.3rem,#666);
                            position: absolute;
                            right: 0.2rem;
                        }
                    }
                    .orderline{
                        @include orderline();
                    }
                }
            }
        }
        .insurance_content{
            height: auto;
            background: #fff;
            margin: 0.2rem;
            padding: 0 .2rem;
            border-radius: .06rem;
            .top{
                height: 0.9rem;
                line-height: 0.9rem;
                position: relative;
                span:nth-child(1){
                    @include sc(0.28rem,#333333);
                    font-weight: 600;
                }
                span:nth-child(2){
                    display: inline-block;
                    width: .14rem;
                    height: .25rem;
                    background: url("//m.lvmama.com/flight/image/pointer.png") 0 0 no-repeat;
                    background-size: 100%;
                    position: absolute;
                    right: 0;
                    top: 50%;
                    transform: translateY(-50%) rotate(-90deg);
                    -webkit-transform: translateY(-50%) rotate(-90deg);
                }
                .is_down{
                    display: inline-block;
                    width: .14rem;
                    height: .25rem;
                    background: url("//m.lvmama.com/flight/image/pointer.png") 0 0 no-repeat;
                    background-size: 100%;
                    position: absolute;
                    right: 0;
                    top: 50%;
                    transform: translateY(-50%) rotate(-90deg) !important;
                    -webkit-transform: translateY(-50%) rotate(90deg) !important;
                }
            }
            .middle{
                padding: 0.2rem 0;
                position: relative;
                display: none;
                >span{
                    float: left;
                    @include sc(0.28rem,#666666);
                }
                .middle_content{
                    display: inline-block;
                    margin-left: 0.5rem;
                    padding-bottom: 0.2rem;
                    p{
                        @include sc(0.28rem,#333333);
                    }
                }
                .under{
                        height: 0.7rem;
                        line-height: 0.9rem;
                        position:relative;
                        span:nth-child(1){
                            @include sc(0.28rem,#666666);
                        }
                        span:nth-child(2){
                            @include sc(0.28rem,#666);
                            margin-right: .2rem;
                        }
                        .top_line{
                            display: block;
                            position:absolute;
                            top:0;
                            @include orderlineFFF;
                        }
                    }
            }
            .is_middle{
                display: block;
            }
            
            .is_line{
                @include orderlineFFF;
                display: none;
            }
            .is_have{
                @include orderlineFFF;
                display: block;
            }
        }
        .act_expense{
            height: auto;
            position: relative;
            .expense_title{
                position: relative;
                height: 0.88rem;
                line-height: 0.88rem;
                font-size: 0.28rem;
                color: #333;
            }
            .act_point{
                position: absolute;
                right: 0;
                top: 50%;
                transform: translateY(-50%);
            }
            .ex_point{
                transform: translateY(-50%) rotate(90deg);
            }
            .act_deg{
                transform: translateY(-50%) rotate(-90deg);
            }
        }
        .detail-up{
            >i.arrow{
                @include allcover();
                @include wh(1rem,.88rem);
            }
            >i.arrow:after{
                top: .28rem;
                -webkit-transform: rotate(135deg);
                transform: rotate(135deg);
            }
        }
        .order-post{
            padding:.24rem 0 .24rem .2rem;
            margin: .2rem;
            background-color: #fff;
            overflow: hidden;
            border-radius: .06rem;
            position: relative;
            .title{
                padding-bottom: 0.2rem;
                font-size: 0.28rem;
                color: #333;
            }
            .arrow{
                @include allcover();
                @include wh(1rem,.88rem);
            }
            .arrow:after{
                content: "";
                right: .2rem;
                @include wh(.2rem,.2rem);
                border-top: 1px solid #666;
                border-right: 1px solid #666;
                position: absolute;
                top: .38rem;
                -webkit-transform: rotate(-45deg);
                transform: rotate(-45deg);
            }
            >div{
                position: relative;
                >span{
                    position: absolute;
                    top: 0;
                    left: 0;
                }
                .post-info{
                    padding-left: 1.5rem;
                    @include sc(.24rem,#000);
                    >div{
                        >span:last-child{
                            color: #ff8800;
                        }
                    }
                    >span{
                        position: relative;
                        >span.i{
                            @include wh(.24rem,.24rem);
                            @include ct();
                            display: inline-block;
                            background: url(//m.lvmama.com/flight/image/wenhao4.png) center no-repeat;
                            background-size: 100%;
                            margin-left: .1rem;
                        }
                    }
                }
            }
        }
        .airport-transfer{
            // width: 100%;
            padding-left: .2rem;
            margin: .2rem;
            background-color: #fff;
            overflow: hidden;
            border-radius: 6px;
            position: relative;
            .orderline{
                @include orderline();
            }
            .title{
                position: relative;
                height: .8rem;
                line-height: .8rem;
                @include sc(.3rem,#000);
                // .transMsg{
                //     @include sc(.26rem,#4997E7);
                //     position: absolute;
                //     right: .2rem;
                // }
                >span:first-child{
                    font-size: 0.28rem;
                    color: #333;
                    font-weight: 600;
                }
                .is_show{
                    position: absolute;
                    display: inline-block;
                    width: 0.5rem;
                    height: 0.5rem;
                    right: 0;
                    i{
                        display: block;
                        content: "";
                        width: 0.15rem;
                        height: 0.15rem;
                        border-bottom: 1px solid #A8A8A8;
                        border-right: 1px solid #A8A8A8;
                        transform: translateY(-46%) rotate(-135deg);
                        position: absolute;
                        top: 46%;
                        right: 0.2rem;
                    }
                    .hiddenTrans{
                        transform: rotate(45deg);
                    }
                }
                
            }
            
            .content{
                .transfer{
                    .meet-airport{
                        position: relative;
                        width: 100%;
                        padding-left: .1rem;
                        .meet-money{
                            @include sc(.28rem,#333);
                            @include ct();
                            right: .48rem;
                            > em{
                                @include sc(.24rem,#333);
                                padding-right: .05rem;
                                position: relative;
                                bottom: .03rem;
                            }
                        }
                        .meet-money.meetMoneyAct{
                            right: .2rem;
                        }
                        .meet{
                            position: relative;
                            left: 1.3rem;
                            width: 3.9rem;
                            padding: .1rem 0;
                            .meet-cont{
                                .meet-song{
                                    @include wh(.34rem,.34rem);
                                    display: inline-block;
                                    line-height: .34rem;
                                    background-color: #44BCEA;
                                    border-radius: .06rem;
                                    @include sc(.2rem,#fff);
                                    text-align: center;
                                }
                                .meet-jie{
                                    display: inline-block;
                                    @include wh(.34rem,.34rem);
                                    line-height: .34rem;
                                    background-color: #0C6;
                                    border-radius: .06rem;
                                    @include sc(.2rem,#fff);
                                    text-align: center;
                                }
                                .meet-depart{
                                    @include sc(.3rem,#000);
                                }
                                .meet-type{
                                    @include sc(.2rem,#999);
                                    padding-left: .15rem;
                                }
                                .meet-timeIcon{
                                    // background: url('//m.lvmama.com/flight/image/shijian_icon.png') no-repeat;
                                    // background-size: cover;
                                    // -webkit-background-size: cover;
                                    // @include wh(.28rem,.28rem);
                                    display: inline-block;
                                    @include wh(.25rem,.25rem);
                                    position: relative;
                                    border: 1px solid #666;
                                    border-radius: 50%;
                                    i{
                                        display: inline-block;
                                        width: 0.1rem;
                                        height: 0.15rem;
                                        border-bottom: 1px solid #666;
                                        border-right: 1px solid #666;
                                        transform: translateX(-50%) rotate(45deg);
                                        position: absolute;
                                        left: 50%;
                                    }
                                }
                                .meet-time{
                                    @include sc(.24rem,#333);
                                    padding-left: .1rem;
                                }
                                .place-act{
                                    position: relative;
                                    display: block;
                                    .meet-placeIcon{
                                        // background: url('//m.lvmama.com/flight/image/dizhi_icon.png') no-repeat;
                                        // background-size: 100%;
                                        display: inline-block;
                                        @include wh(.25rem,.25rem);
                                        position: absolute;
                                        top: 0;
                                        border: 1px solid #666;
                                        border-radius: 50%;
                                        i{
                                            display: inline-block;
                                            width: 0.1rem;
                                            height: 0.15rem;
                                            border-bottom: 1px solid #666;
                                            border-right: 1px solid #666;
                                            transform: translateX(-50%) rotate(45deg);
                                            position: absolute;
                                            left: 50%;
                                        }
                                    }
                                    .meet-time{
                                        @include sc(.24rem,#333);
                                        padding-left: .1rem;
                                        .trans-line{
                                            margin: 0 0.06rem;
                                            display: inline-block;
                                            background-color: pink;
                                            background: url(//m.lvmama.com/flight/image/arrow_list.png) no-repeat;
                                            background-size: contain;
                                            width: 0.28rem;
                                            height: 0.14rem;
                                        }
                                    }
                                    .meet-time.meet-place{
                                        width: 5rem;
                                        left: .35rem;
                                        position: relative;
                                        top: -.03rem;
                                        display: inline-block;
                                    }
                                }
                            }
                        }
                        .meet.meetAct{
                            left: 0;
                            >p:first-child{
                                padding-bottom: 0.08rem;
                            }
                            >p:nth-child(2){
                                padding-bottom: 0.05rem;
                            }
                        }
                    }
                }
            }
            .prompt{
                position: relative;
                height: 0.6rem;
                .prompt_icon{
                    // position: relative;
                    // display: inline-block;
                    // width: 0.28rem;
                    // height: 0.28rem;
                    // background-color:#DCDFE5;
                    // border-radius: 50%; 
                    display: inline-block;
                    width: .24rem;
                    height: .24rem;
                    @include ct();
                    background: url('//m.lvmama.com/flight/image/wenhao4.png') no-repeat;
                    background-size: 100%;
                    i{
                        font-size: 0.2rem;
                        color: #f7f8f9;
                        position: absolute;
                        left: 50%;
                        transform: translateX(-50%);
                    }
                }
                .transMsg{
                    @include sc(.24rem,#999);
                    margin-left: 0.3rem;
                }
            }
        }
        .common_problem_container {
            padding-top: 0;
            .problem_title {
                height: .88rem;
                @include sc(.3rem,#333);
                font-weight: 600;
                // border-bottom: 1px solid #efefef;
                @include bottomline();
            }
            .problem_list {
                height: .88rem;
                // border-bottom: 1px solid #efefef;
                @include bottomline();
                >div{
                    color:#666;
                }
            }
            .problem_footer {
                height: .8rem;
                div {
                    @include sc(.3rem,#4997E7);
                    > div:first-child {
                        @include wh(.4rem,.3rem);
                        margin-right: .15rem;
                    }
                }
            }
        }
        .toHotel{
            display: block;
            height: 1.24rem;
            margin: .2rem;
            background: #92aeff url('//m.lvmama.com/flight/image/hotel.jpg') no-repeat left center;
            background-size:1.16rem;
            border-radius:0.1rem;
            font-size:0.3rem;
            line-height: 0.35rem;
            position: relative;
            >div{
                position: absolute;
                top: 50%;
                transform: translateY(-50%);
                left: 1.6rem;
                // width: 77%;
                >p{
                    color:#fff;
                    >i{
                        font-weight: bold;
                        color:#fff;
                    }
                }
                >span{
                    color:#fff;
                    font-size:0.2rem;
                }
            }
            :after{
                content: "";
                width: .14rem;
                height: .14rem;
                border-top: 1px solid #fff;
                border-right: 1px solid #fff;
                -webkit-transform: translateY(-50%) rotate(45deg);
                -ms-transform: translateY(-50%) rotate(45deg);
                transform: translateY(-50%) rotate(45deg);
                position: absolute;
                top: 50%;
                right: -2.8rem;
            }
        }
        .order_time_container {
            padding-top: 0;
            > div:last-child {
                border-bottom: 0px solid #efefef;
            }
            > div {
                border-bottom: 1px solid #efefef;
                height: .7rem;
                line-height: .7rem;
            }
            .order_back{
                position: relative;
                .back_right{
                    position: absolute;
                    right: 0;
                    > div:first-child {
                        float: left;
                    }
                    > div:last-child{
                        margin-top :.1rem;
                    }
                }
            }
        }
        .order_other_container {
            padding-top: 0;
            .order_other_title {
                height: .9rem;
                @include sc(.3rem,#000);
                border-bottom: 1px solid #efefef;
            }
            .order_other_content {
                height: 2.2rem;
                .order_other_icon {
                    @include wh(.8rem,.8rem);
                }
            }
        }
        .order_other_ticket{
            background-color:#fff;
            border-radius: 0.06rem;
            margin: 0 .2rem .98rem;
            .ticket-tj {
                padding: .2rem .1rem .2rem .3rem;
                @include sc(.3rem,#000);
                margin-top: .2rem;
                // border-bottom: 1px solid #efefef;
                @include bottomline();
            }
            >p{
                @include sc(.24rem,#666);
                overflow: hidden;
                line-height: .45rem;
                padding: .2rem .2rem 0;
                >span{
                    float: left;
                    >i{
                        display: inline-block;
                        @include wh(.06rem,.3rem);
                        background-color: #ff6600;
                        vertical-align: middle;
                        margin-right: 0.12rem;
                    }
                }
                .menpiao{
                    float: initial;
                    >span{
                        float: right;
                        position: relative;
                        padding-right: .2rem;
                        color: #ff6600;
                    }
                    >span:after {
                        content: "";
                        @include wh(.12rem,.12rem);
                        border-top: 1px solid #ff6600;
                        border-right: 1px solid #ff6600;
                        -webkit-transform: translateY(-50%) rotate(45deg);
                        transform: translateY(-50%) rotate(45deg);
                        position: absolute;
                        top: 50%;
                        right: 0;
                    }
                }
            }
            .recommend {
                padding: 0 .1rem;
                position: relative;
                @include w(100%);
                margin-top: .3rem;
                >div{
                    padding: 0 .1rem .2rem;
                    // border-bottom: 1px solid #efefef;
                    @include bottomline();
                    .bgImg{
                        img{
                            @include wh(1.9rem,1.6rem);
                        }
                    }
                    .introduce {
                        position: absolute;
                        top: .12rem;
                        left: 2.4rem;
                        width: 4.5rem;
                        .destination {
                            @include sc(.28rem,#333);
                            overflow: hidden;
                            text-overflow: ellipsis;
                            white-space: nowrap;
                            width: 100%;
                        }
                        .coupon {
                            padding: .08rem 0;
                            >span{
                                display: inline-block;
                                @include sc(.24rem,#ff6600);
                                @include wh(.72rem,.36rem);
                                line-height: .32rem;
                                border: 1px solid #ff6600;
                                text-align: center;
                            }
                            >span:last-child {
                                width: 1rem;
                                margin-left: .1rem;
                            }
                        }
                        .nocoupon{
                            @include wh(.8rem,.36rem);
                            background: #fff;
                            margin: 0.1rem 0;
                        }
                        .satisfy {
                            @include sc(.24rem,#aaa);
                            >span {
                                padding-right: .1rem;
                                color: #aaa;
                            }
                        }
                    }
                    .price {
                        position: absolute;
                        top: .5rem;
                        right: .3rem;
                        >p>span {
                            @include sc(.4rem,#FF6600);
                            font-weight: bold;
                            display: inherit;
                            text-align: right;
                            >i {
                                @include sc(.24rem,#FF6600);
                                font-weight: normal;
                            }
                            >em {
                                @include sc(.22rem,#999);
                                padding-left: .04rem;
                                font-weight: normal;
                            }
                        }
                        .cost-price {
                            @include sc(.24rem,#aaa);
                            text-decoration: line-through;
                            text-align: right;
                            padding: .04rem 0;
                        }
                        .range {
                            @include sc(.24rem,#aaa);
                            text-align: right;
                        }
                    }
                }
            }
        }
    }
    .shift_Down{
        bottom:1.11rem;
    }
    .new_shift{
        bottom:1.11rem;
    }
    .footer{
        background-color: #3c3c3c;
        z-index: 11;
        @include sc(.3rem,#fff);
        @include wh(100%,.95rem);
        line-height: .98rem;
        position: absolute;
        bottom: 0;
        left: 0;
        >span{
            width: 60%;
            float: left;
            padding-left: .2rem;
            position: relative;
            color: #fff;
            >i{
                color:#ff6600;
            }
        }
        >span:first-child:after{
            @include wh(.2rem,.2rem);
            content: "";
            position: absolute;
            top: 54%;
            right: .2rem;
            -webkit-transform: translateY(-50%) rotate(-45deg);
            transform: translateY(-50%) rotate(-45deg);
            border-top: 1px solid #fff;
            border-right: 1px solid #fff;
        }
        >span.down:first-child:after{
            -webkit-transform: translateY(-50%) rotate(135deg);
            transform: translateY(-50%) rotate(135deg);
            top: 44%;
        }
        >button{
            @include sc(.3rem,#fff);
            width: 40%;
            float: right;
            background-color: #ff6600;
            transform: translateZ(0);
            border: none;
            height: 100%;
            text-align: center;
        }
    }
    .alertPhone{
        @include wh(100%,100%);
        background: rgba(0,0,0,0.5);
        position: fixed;
        top: 0;
        z-index: 10;
        >div{
            @include wh(93%,3.56rem);
            position: absolute;
            bottom: 0.4rem;
            box-sizing: border-box;
            margin: 0 0.2rem;
            .top{
                @include wh(100%,2rem);
                background: #fff;
                border-radius: 0.2rem;
                p:nth-child(1){
                    height: 0.8rem;
                    line-height: 0.8rem;
                    text-align: center;
                    @include sc(0.24rem,#666666);
                    border-bottom: 1px solid #ccc;
                }
                p:nth-child(2){
                    height: 1.2rem;
                    line-height: 1.2rem;
                    text-align: center;
                    a{
                        @include sc(0.36rem,#fe1d10);
                    }
                }
            }
            .under{
                @include wh(100%,1.02rem);
                line-height: 1.02rem;
                background: #fff;
                border-radius: 10px;
                margin-top: 0.4rem;
                text-align: center;
                >span{
                    @include sc(0.28rem,#107cff);
                }
            }
        }
    }
    .travel_footer{
        @include wh(100%,1.11rem);
        p{
            @include wh(50%,1.11rem);
            background: #fff;
            line-height: 1.11rem;
            text-align: center;
            @include sc(0.3rem,#000);
            
        }
        p:nth-child(2){
            background: -webkit-linear-gradient(left, #fe686c , #fd3c71);
            color:#fff;
        }
    }
    .submit_travel{
        @include wh(100%,1.11rem);
        background:#e6e6e6;
        line-height: 1.1rem;
        text-align: center;
        >i{
            @include sc(0.3rem,#aaaaaa);
            margin: 0 auto;
        }
    }
    .travel_alert{
        @include wh(100%,100%);
        background: rgba(0,0,0,0.5);
        position: absolute;
        top: 0;
        bottom: 0;
        z-index: 11;
        .travel_alert_reject{
            @include wh(100%,6.65rem);
            background: #fff;
            position: fixed;
            bottom: 0;
            border-radius: 20px 20px 0 0;
            padding:0 0.4rem;
            .reject_cause{
                @include wh(100%,1.36rem);
                text-align: center;
                line-height: 1.36rem;
                border-bottom: 1px dashed #ddd;
                position:relative;
                span{
                     @include sc(0.38rem,#000);
                }
                i{
                    display: inline-block;
                    @include wh(0.24rem,0.24rem);
                    background:url('//m.lvmama.com/flight/image/travelClose.png') no-repeat;
                    @include ct;
                    right: 0;
                    background-size: 100%;
                }
            }
            .cause_content{
                @include wh(100%,2.94rem);
                margin-top: 0.3rem;
                resize: none;
                overflow-y: auto;
            }
            .reject_button{
                border-top: 1px dashed #ddd;
                padding: 0.4rem 0;
                div{
                    @include wh(100%,1.11rem);
                    background: -webkit-linear-gradient(left, #fe686c , #fd3c71);
                    border-radius: 40px;
                    text-align: center;
                    @include sc(.3rem,#fff);
                    line-height: 1.11rem;
                }
            }
        }
        .alert_pass{
            @include wh(100%,4.6rem);
            background: #fff;
            position: fixed;
            bottom: 0;
            border-radius: 20px 20px 0 0;
            text-align: center;
            .travel_pass{
                @include wh(100%,1.1rem);
                text-align: center;
                position: relative;
                line-height: 1.1rem;
                >span{
                     @include sc(0.38rem,#000000);
                }
                i{
                    display: inline-block;
                    @include wh(0.24rem,0.24rem);
                    background:url('//m.lvmama.com/flight/image/travelClose.png') no-repeat;
                    @include ct;
                    right: 0.4rem;
                    background-size: 100%;
                }
            }
            >p{
                @include sc(0.28rem,#000000);
            }
            .passButton{
                margin: 0.8rem 0.4rem 0 0.4rem;
                height: 1.1rem;
                background: -webkit-linear-gradient(left, #fe686c , #fd3c71);
                line-height: 1.1rem;
                border-radius: 40px;
                @include sc(0.3rem,#fff);
            }
        }

    }
    .price_detail_container {
        padding-top: .68rem;
        background: #fff;
        .content-close{
            @include wh(100%,2rem);
            position: absolute;
            bottom: 0;
            >span{
                @include wh( 1rem,1rem);
                @include center();
                background: url('//m.lvmama.com/flight/image/bigX.png') 0 0 no-repeat;
                background-size: 1rem 1rem;
                display: inline-block;
            }
        }
        .price_detail_wrap {
            height: 100%;
            padding: .1rem .36rem 1.2rem;
            overflow-y: scroll;
            .price_detail_title {
                margin-bottom: .2rem;
                > p {
                    @include sc(.38rem,#000);
                }
                .price_container {
                    @include sc(.36rem,#fff);
                    span {
                        padding-left: .2rem;
                        @include sc(.36rem,#ff6600);
                    }
                }
            }
            .price_content {
                width: 100%;
                padding-bottom: .2rem;
                border-top: 1px solid #fff;
                border-bottom: 1px solid #fff;
                > li {
                    height: .48rem;
                    > p{
                        color: #000;
                        width: 50%;
                        >span{
                            @include sc(.28rem,#000);
                        }
                        >span.deduction{
                            @include sc(.26rem,#ccc);
                        }
                    }
                    > p.content-title{
                        color: #666;
                        width:20%;
                    }
                    > p.content-allPrice{
                        color:#ff6600;
                    }
                    .content-orderline{
                        @include orderlineFFF();
                        // margin-top: .1rem !important;
                        width: 80%;
                    }
                }
                >li.content-maxTitle{
                    margin-bottom: .1rem;
                }
                >li.content-minTitle{
                    margin-bottom: .1rem;
                    margin-top: .56rem;
                    > p.content-title{
                        color: #666;
                        width:15%;
                    }
                    .content-orderline{
                        @include orderlineFFF();
                        margin-top: .1rem !important;
                        width: 90%;
                    }
                }
                >li.content-priceTitle{
                    margin-top: .48rem;
                }
                >li.content-orderline{
                        @include orderlineFFF();
                        margin-top: .48rem!important;
                    }
                >li.sep{
                    margin-top: .3rem;
                }
                >li.sepnew{
                    margin-top: -.3rem;
                }
            }
        }
    }
    .matte{
        @include wh(100%,100%);
        background-color: rgba(0,0,0,.5);
        position: fixed;
        top: 0;
        left: 0;
        z-index: 6;
        padding-top: .94rem;
        padding-bottom: .98rem;
    }
    .matte-det{
        background-color: rgba(0,0,0,.9);
        z-index: 4;
        >div{
            position: absolute;
            z-index: 10;
            bottom: -6.9rem;
            max-height: 6.9rem;
            overflow-y: scroll;
            left: 0;
            background-color: #fff;
            width: 100%;
            transition: all .2s ease-in 0s;
            -webkit-transition: all .2s ease-in 0s;
            -moz-transition: all .2s ease-in 0s;
            -ms-transition: all .2s ease-in 0s;
            -o-transition: all .2s ease-in 0s;
            >div:first-child{
                padding-top: .14rem;
            }
            >div{
                >p{
                    padding: 0 .2rem;
                    @include sc(.28rem,#666);
                    line-height: .8rem;
                    >span{
                        font-size: .28rem;
                        float: right;
                        >i{
                            font-size: .24rem;
                        }
                    }
                    >span:first-child{
                        clear: right;
                    }
                    >span:last-child{
                        color: #ff6600;
                        >i{
                            color: #ff6600;
                        }
                    }
                }
                >p.separate{
                    border-bottom: 1px solid #ddd;
                }
                >p.separate-p{
                    height: .88rem !important;
                    line-height: .88rem !important;
                }
                >p.insurance-price{
                    @include sc(.28rem,#666);
                    padding-top: 0;
                    line-height: .8rem;
                }
            }
        }
        >div.showBottom{
            bottom: .9rem;
        }
    }
    .no-list{
        @include center();
        text-align: center;
        color: #aaa;
        margin: 0;
        background: none;
        border: none;
        >span:first-child{
            display: block;
            margin: 0 auto;
            @include wh(1.28rem,1.28rem);
            background: url('//m.lvmama.com/flight/image/logo.png') no-repeat center center;
            background-size: 100%;
        }
    }
    .tips-p{
        @include ct();
        @include sc(.24rem,#aaa);
        left: 0;
        width: 100%;
        text-align: center;
    }
    .no-wifi{
        @include center();
        text-align: center;
        background: url('//m.lvmama.com/flight/image/no-wifi.png') no-repeat center top;
        padding-top: 1.4rem;
        background-size: 1.62rem;
        width: 100%;
        >div{
            >p{
                @include sc(.24rem,#666);
                line-height: 0.6rem;
            }
            > button{
                @include wh(1.7rem,.6rem);
                background-color: #d9d9d9;
                border-radius: 5px;
                border: none;
                color: #666;
                >a{
                    color: #666;
                    line-height: 0.6rem;
                    >i{
                        display: inline-block;
                        @include wh(.3rem,.3rem);
                        background: url('//m.lvmama.com/flight/image/tel.png') no-repeat center center;
                        background-size: 0.3rem;
                        vertical-align: middle;
                    }
                }
            }
            >button.tel-btn {
                width: 3.26rem;
                margin-left: 0.2rem;
            }
        }
    }
    .no-wifi.an-error {
        background: url('//m.lvmama.com/flight/image/error.png') no-repeat center top;
        background-size: 1.26rem;
    }
    .cancelMes{
        @include wh(100%,100%);
        background-color: rgba(0,0,0,0);
        position: fixed;
        top: 0;
        left: 0;
        z-index: 20;
    }
    .payMes{
        @include wh(100%,100%);
        background-color: rgba(0,0,0,.5);
        position: fixed;
        top: 0;
        left: 0;
        z-index: 20;
        .pay_container{
            @include center;
            width: 5.4rem;
            height: auto;
            background: #fff;
            @include borderRadius(.1rem);
            .pay_title{
                @include sc(.3rem,#000);
                font-weight: 600;
                padding-top: .2rem;
            }
            .pay_text {
                line-height: .5rem;
                padding: .3rem .2rem .3rem;
                box-sizing: border-box;
                color: #000;
                text-align: center;
                border-bottom: 1px solid #ddd;
            }
            .clickPay_button_double {
                width: 100%;
                height: .9rem;
                font-size: .32rem;
                > div {
                    @include wh(50%,inherit);
                    color: #999;
                }
                > div:first-child {
                    border-right: 1px solid #ddd;
                }
                > div:nth-child(2) {
                    color:#ff8800;
                }
            }
        }
    }
    .telMes{
        @include wh(100%,100%);
        background-color: rgba(0,0,0,.5);
        position: fixed;
        top: 0;
        left: 0;
        z-index: 20;
        .price-changing{
            @include wh(5.4rem,2.56rem);
            @include sc(.28rem,#000);
            @include center();
            background-color: #fff;
            border-radius: .28rem;
            > p{
                height: 1.66rem;
                border-bottom: 1px solid #ddd;
                line-height: .5rem;
                padding-left: .2rem;
                padding-right: .2rem;
                padding-top: .3rem;
                text-align: center;
                >span{
                    color: #3b87e3;
                }
            }
            >button{
                @include sc(.28rem,#999);
                border-right: 1px solid #ddd;
                position: absolute;
                bottom: 0;
                left: 0;
                font-weight: 700;
                background: 0 0;
                text-align: center;
                line-height: .9rem;
                width: 2.7rem;
            }
            > a{
                position: absolute;
                bottom: 0;
                right: 0;
                font-weight: 700;
                background: 0 0;
                border: none;
                text-align: center;
                line-height: .9rem;
                width: 2.7rem;
                @include sc(.28rem,#FF8800);
            }
        }
    }
    .transition_state_container {
            @include wh(100%,100%);
            position: absolute;
            left: 0;
            top: 0;
            background: #fff;
            padding: 0 .2rem;
            padding-top: 1rem;
            box-sizing: border-box;
            z-index:12;
            .toggle_title_container {
                @include wh(100%,.6rem);
                position: relative;
                border-bottom: 1px solid #f1f1f1;
                > div {
                    margin-right: .2rem;
                    padding-bottom: .2rem;
                }
                .mark_picked {
                    border-bottom: 2px solid #ff6600;
                    color:#ff6600;
                }
                .mark_underline {
                    display: block;
                    @include wh(1rem,2px);
                    background: #ff6600;
                    position: absolute;
                    left: 0;
                    bottom: 0;
                }
            }
            .refund_state_container {
                @include wh(100%,80%);
                overflow-y: scroll;
                padding-top: .5rem;
                .refund_title {
                    @include sc(.38rem,#000);
                    margin: .2rem 0;
                }
                .refund_contant {
                    .refund_item_container {
                        padding-bottom: .5rem;
                        padding-left: .1rem;
                        .bigSize {
                            font-size: .38rem;
                            margin-bottom: .2rem;
                        }
                        .refund_item_title {
                        }
                        .refund_item_detail {

                        }
                    }
                }
            }
            .close_refund {
                @include wh(100%,20%);
                > img {
                    @include wh(1rem,1rem);
                }
            }
        }
    >div.telAct{
            bottom: 0; 
            transition: all .2s linear;
            -webkit-transition: all .2s linear;
            -moz-transition: all .2s linear;
            -o-transition: all .2s linear;
        }
        .call-tel{
            z-index:21;
            position: fixed;
            bottom: -4.5rem;
            background-color: #fff;
            @include wh(100%,2.5rem);
            padding: .3rem;
            > a{
                @include sc(.3rem,#fff);
                background-color: #ff6600;
                display: inherit;
                height: .8rem;
                line-height: .8rem;
                text-align: center;
                border-radius: .1rem;
            }
            >a.telAct{
                bottom: 0;
                transition: all .2s linear;
                -webkit-transition: all .2s linear;
                -moz-transition: all .2s linear;
                -o-transition: all .2s linear;
            }
            > p{
                @include sc(.3rem,#fff);
                background-color: #aaa;
                margin-top: .3rem;
                height: .8rem;
                line-height: .8rem;
                text-align: center;
                border-radius: .1rem;
            }
        }
}
    
</style>
