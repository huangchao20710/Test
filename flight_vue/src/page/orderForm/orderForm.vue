<template>
	<div class="orderForm"> 
		<head-top path="/orderForm" v-if="flightInfo!=''" :depart="depart" :dest="dest" :rightMenu="rightMenu" :lowPriceName="lowPriceName" :goPage="goPage" @rightHandler="toFeedBack" :showOrderTopMsg="showOrderTopMsg" :flightInfo="flightInfo"  @showSpecial="showSpecial"></head-top>
		<div id="orderForm" class="article" :class="{'overflowH':downClass}">
      <div class="flightInfos" v-if="singleFlight!=null">
        <div @click="showTicketInfo">
          <div class="ticket">
            <div class="first-ch">
              <div :class="{'special':RoundTripSpecial}">
                <span>{{showPackageName?'套餐价':'成人票'}} &#165;{{showPackageName?singleFlight.audltSalePrice-(-packageInfo.tagPrice):singleFlight.audltSalePrice}}</span>
                <span>机建燃油 &#165;{{singleFlight.adultPrice}}</span> 
              </div>
            </div>
            <div class="first-info">
              <div>
                <span>
                  <i :class="{'doubleTo':doubleFlight!=null,'single':doubleFlight==null}"></i>
                  <span>{{headInfo[0].departureDate | monthDay}} {{singleFlight.departureDate.split(" ")[1]}} {{singleFlight.departureTime}}</span>
                </span>
                <span>{{singleFlight.departureAirport.flightName}}{{singleFlight.departureAirport.code}}-{{singleFlight.arrivalAirport.flightName}}{{singleFlight.arrivalAirport.code}} {{singleFlight.seatClassName}}</span>
              </div>
            </div>
          </div>
          <div class="ticket" v-if="doubleFlight!=null">
            <div class="first-ch">
              <div v-if="!RoundTripSpecial">
                <span>成人票 &#165;{{doubleFlight.audltSalePrice}}</span>
                <span>机建燃油 &#165;{{doubleFlight.adultPrice}}</span> 
              </div>
            </div>
            <div class="first-info">
              <div>
                <span>
                  <i class="doubleFrom"></i>
                  <span>{{headInfo[1].departureDate | monthDay}} {{doubleFlight.departureDate.split(" ")[1]}} {{doubleFlight.departureTime}}</span>
                </span>
                <span>{{doubleFlight.departureAirport.flightName}}{{doubleFlight.departureAirport.code}}-{{doubleFlight.arrivalAirport.flightName}}{{doubleFlight.arrivalAirport.code}} {{doubleFlight.seatClassName}}</span>
              </div>
            </div>
          </div>
          <i class="herf_arrow"></i>
        </div>
        <div class="packageTitle" v-if="showPackage==true&&packageInfo!=null &&packageInfo !=''">{{packageInfo.tagdesc}}</div>
        <div class="orderLine"></div>
        <div  @click="clickChangeBack">
          <div class="instructions">
            <p class="itOne">
              <span><i></i><em>退改说明</em></span>
              <span>
                  <i class="children"></i>
                  <em v-if="doubleFlight==null && singleFlight.childrenSalePrice>0">{{showPackageName?'儿童套餐价':'儿童票'}}¥{{showPackageName?singleFlight.childrenSalePrice-(-packageInfo.tagPrice):singleFlight.childrenSalePrice}},暂不支持婴儿票</em>
                  <em v-if="doubleFlight!=null && singleFlight.childrenSalePrice>0 && doubleFlight.childrenSalePrice>0">儿童票¥{{singleFlight.childrenSalePrice}}+¥{{doubleFlight.childrenSalePrice}},暂不支持婴儿票</em>
                  <em v-if="(doubleFlight==null && singleFlight.childrenSalePrice<=0)||(doubleFlight!=null && (singleFlight.childrenSalePrice<=0 || doubleFlight.childrenSalePrice<=0))">不支持儿童，暂不支持婴儿票</em>
              </span>
            </p>
            <p class="itOne" v-if="luggageMemo||invoiceTitle">
              <span v-if="luggageMemo"><i class="luggage"></i><em>{{luggageMemo}}</em></span>
              <span v-if="invoiceTitle||invoiceTitle==false"><i class="trip"></i><em>提供行程单</em></span>
            </p>
            <p v-if="singleFlight != null && singleFlight.saleType=='GWPolicy'||singleFlight.saleType=='OpenPlatform'||singleFlight.saleType=='Special'|| (doubleFlight!=null && (doubleFlight.saleType=='GWPolicy'||doubleFlight.saleType=='OpenPlatform'||doubleFlight.saleType=='Special'))">
              <span><em class="pay">支付成功后，约1小时左右出票，请耐心等待</em></span>
            </p>
            <p v-if="singleFlight != null && singleFlight.saleType=='RoundTripSpecial' &&differentRoundTripSpecialPrice>0"><span><em class="pay">往返特惠航班优惠{{differentRoundTripSpecialPrice}}元，须按照顺序使用，退票时若去程未使用，须往返一起退订</em></span></p>
          </div>
          <i class="herf_arrow"></i>
        </div>
      </div>
			<div class="passenger">
				<p class="notice_container" v-if="noticeArr!=''">
					<notice-swiper :noticeArr="noticeArr"></notice-swiper>
				</p>
				<div class="add">
					<p class="p1 choose-passenger">乘机人 
						<span v-if="inventoryCount>=10"><i>{{personTypeMessage}}</i></span>
						<span v-if="inventoryCount<10">剩<em>{{inventoryCount}}</em>张成人票</span><span></span>
					</p>
					
				</div>
				<!-- <div class="orderline"></div> -->
				<ul class="allPersonsContainer" >
					<li v-for="(item,index) in commonPersonMes" :key="index" v-if="index<7" v-bind:class="{'personIn':item.isChecked==true}" @click="checkChange(index,'orderForm')">
						<i v-if="item.isChecked==-1"></i>
						{{item.receiverName}}
					</li>
					<li class="xy_flex" @click="toPassengerAdd" v-if="commonPersonMes.length<=7">
						新增
					</li>
					<li class="xy_flex" @click="toPassengerList" v-if="commonPersonMes.length>7">
						更多
					</li>
				</ul>
				<div class="oldMessage" v-if="showOldMessage==true">
  					<i class="commin_y"></i>
  					<div>70岁以上老人乘机，建议按航司规定提供医院开具的健康证明，以免影响登机</div>
  					<span class="commin_y" @click="showOldMessage=false"></span>
				</div>
				<div class="pr"><div class="orderline"></div></div>
				<div class="selected" v-for="(person,index) in selectedPersons" :key="index">
					<span  @click="removePerson(index)"></span>
					<div class="per" @click="toPassengerEdit(person)">
						<p>
							{{person.receiverName}}
							<span>{{person.peopleType | passengerType }}</span>
						</p>
						 <p v-if="person.isChecked!=-1">{{person.certType | cardType}}&nbsp;{{person.certNo}}</p>
             <span v-if="person.phone == ''" class="finishPhoneNum">请补充手机号</span>
              <i class="herf_arrow"></i>
          </div>
					<div class="orderlinepess"></div>
				</div>
				<p class="mpn">联系手机
					<input type="tel" maxlength="11" v-model="contactPhone" @change="changeMobile(contactPhone)" placeholder="请输入11位手机号" @focus="phoneFocus" @blur="phoneBlur">
					<span class="iphoneicon" @click="getContacts" v-if="app==true"></span>
					<span class="cancel_icon_container xy_flex" @click="delMobile" v-show="contactPhone!='' && isPhoneFocus==true">
						<em class="cancel_cion_wrap" @click="delMobile"></em>
					</span>
        		</p>
			</div>
			<!-- 康旅入口 -->
      <!-- <div class="insurance kangLv_container" v-if="isKangLvUser && !businessTravel">
          <div @click="toKangLvPicker">
              <p class="insurance-first">
                  <span class="insurance-span">驴行家</span>
                  <span class="kanglv_logo">已加入</span>
                  <span class="insurances pointer"></span>
              </p>
              <p class="kangLv_tip">驴妈妈全程保障您的出行安全，为您提供产品增值服务等权益</p>
          </div>
          <div  class="equityClass" @click="rightFavourClick('insurance')" v-if="insurance.length>0&&rightInsuranceList.length>0">
            <p style="line-height: .86rem;">
            <span>权益券</span>
            <span v-if="insuranceCouponPrice<=0">{{rightInsuranceList.length}}张可用</span>
            <span v-if="insuranceCouponPrice>0">-¥{{insuranceCouponPrice}}</span>
            <span style="right: .4rem;" v-if="insuranceCouponPrice>0">选择权益券<i></i></span>
            </p>
          </div>
      </div> -->
			<!-- <div class="active" v-if="activeList.length>0">
				<router-link to="/flight/activeList">
					<div>
						<p>
							<em v-if="pickedActive!=''">{{pickedActive.activityName.split("|").length>1?pickedActive.activityName.split("|")[1]:pickedActive.activityName || "促销活动"}}</em>
							<em v-if="pickedActive==''">促销活动</em>
							<span v-if="pickedActive!=''">-&#165;{{pickedActive.discountAmount}}元</span>
							<span v-if="pickedActive==''">不使用优惠</span>
							<i class="pointer "></i>
						</p>
					</div>
				</router-link>
			</div> -->
			<div class="specialWorthContainer" v-bind:class="{'equityTrue':((productsGo!=null &&productsGo.picked==true) || (productsBack!=null && productsBack.picked==true)) &&airportVipLoungeList.length>0}" v-if="productsGo!=null || productsBack!=null || (specialWorthInfos!=null && (specialWorthInfos.length>1 || (specialWorthInfos.length==1&&specialWorthInfos[0].show==true)))">
		        <p>特惠专享</p>
		        <ul class="specialWorthWrap">
					      <li class="up_flex" v-if="productsGo" v-bind:class="{'specialWorthItemPickeds':productsGo.picked}">
		                <div @click="pickProductsGo">
		                    <span class="specialWorthItemPicker"></span>
		                    <p class="xy_flex" v-bind:class="{'specialWorthItemPicked':productsGo.picked}"><i v-bind:class="{'specialWorthItemPicked':productsGo.picked}">&#165;</i>{{productsGo.saleChannelPrices[0].channelSalePrice}}</p>
		                    <p class="xy_flex" v-bind:class="{'specialWorthItemPicked':productsGo.picked}"><i v-bind:class="{'specialWorthItemPicked':productsGo.picked}" v-if="doubleFlight!=null">去程</i>贵宾室</p>
		                    <p class="xy_flex">市场价¥{{productsGo.marketPrice}}/人</p>
		                </div>
		                <p class="xy_flex"  @click="productsGoDetail">详情</p>
		            </li>
		            <li class="up_flex" v-if="productsBack" v-bind:class="{'specialWorthItemPickeds':productsBack.picked}">
		                <div @click="pickProductsBack" >
		                    <span class="specialWorthItemPicker"></span>
		                    <p class="xy_flex" v-bind:class="{'specialWorthItemPicked':productsBack.picked}"><i v-bind:class="{'specialWorthItemPicked':productsBack.picked}">&#165;</i>{{productsBack.saleChannelPrices[0].channelSalePrice}}</p>
		                    <p class="xy_flex" v-bind:class="{'specialWorthItemPicked':productsBack.picked}"><i v-bind:class="{'specialWorthItemPicked':productsBack.picked}">返程</i>贵宾室</p>
		                    <p class="xy_flex">市场价¥{{productsBack.marketPrice}}/人</p>
		                </div>
		                <p class="xy_flex"  @click="productsBackDetail">详情</p>
		            </li>
		            <li class="up_flex" v-bind:class="{'specialWorthItemPickeds':specialWorthInfo.picked}" v-for="(specialWorthInfo,index) in specialWorthInfos" :key="index" v-if="specialWorthInfo.show==true">
		                <div @click="pickSpecialWorthItem(specialWorthInfo)">
		                    <span class="specialWorthItemPicker"></span>
		                    <p class="xy_flex" v-bind:class="{'specialWorthItemPicked':specialWorthInfo.picked}"><i v-bind:class="{'specialWorthItemPicked':specialWorthInfo.picked}">&#165;</i>{{specialWorthInfo.saleChannelPrices[0].channelSalePrice}}</p>
		                    <p class="xy_flex" v-bind:class="{'specialWorthItemPicked':specialWorthInfo.picked}">{{specialWorthInfo.productName}}</p>
		                    <p class="xy_flex">{{specialWorthInfo.productDesc}}</p>
		                </div>
		                <p class="xy_flex" @click="showSpecialWorthDetail(specialWorthInfo)">详情</p>
		            </li>
		        </ul>  
				<div class="equityClass equityNewClass" v-if="(((productsGo!=null &&productsGo.picked==true) || (productsBack!=null && productsBack.picked==true)) &&airportVipLoungeList.length>0)" @click="rightFavourClick('airportVip')">
					<p>
						<span>权益券</span>
						<span v-if="airportVipCouponPrice<=0">{{airportVipLoungeList.length}}张可用</span>
						<span v-if="airportVipCouponPrice>0">-¥{{airportVipCouponPrice}}</span>
						<span v-if="airportVipCouponPrice>0">选择权益券<i class="equity_arrow"></i></span>
					</p>
				</div>
		    </div>
			
		    <div class="airport-transfer" v-if="goCityAbleTransfer || arrivalCityAbleTransfer">
		        <div class="title">接送机</div>
		        <div class="content">
					<div class="transfer" v-if="goCityAbleTransfer && transferInfoTemp.goData != undefined" @click="goCityTransfer">
		                <div class="meet-airport">
		                    <img src="//m.lvmama.com/flight/image/songji.png">
		                    <div class="meet">
		                        <p v-if="!transferInfoTemp.goData.send.able" class="meet-cont">
		                            <span class="meet-depart">{{departureCity.name}}<em v-if="isDouble">接</em>送机</span> 
		                        </p>
		                        <p v-if="transferInfoTemp.goData.send.able && transferInfoTemp.goData.send.car != null" class="meet-cont y_flex">
		                        	<!-- <span v-if="isDouble" class="transfer_icon send xy_flex">送</span> -->
		                            <span class="meet-depart">{{departureCity.name}}送机</span>
		                            <span class="car_type">{{transferInfoTemp.goData.send.car.vehicleName}}</span> 
		                        </p>
		                        <p v-if="!transferInfoTemp.goData.send.able" class="meet-cont">
		                            <!-- <span class="meet-timeIcon"></span> -->
		                            <span class="meet-wait">市中心<em v-if="!isDouble" class="singleIcon"></em><em v-else class="doubleIcon"></em>{{transferInfoTemp.goData.send.airportName}}</span>
		                        </p>
		                        <p v-if="transferInfoTemp.goData.send.able && transferInfoTemp.goData.send.car != null" class="car_time y_flex">
		                        	<span class="meet-timeIcon"></span>
                              {{transferInfoTemp.goData.send.poiInfo.name}} <em class="trans-line"></em> {{transferInfoTemp.goData.send.airportName}}
		                        </p>
		                        <p v-if="transferInfoTemp.goData.send.able && transferInfoTemp.goData.send.car != null" class="car_line meet-cont y_flex">
		                            <span class="meet-timeIcon"></span>
		                            <span class="meet-wait">已预约{{transferInfoTemp.goData.send.useTime | showTransferTimeInOrderForm}}用车</span>
		                        </p>
		                    </div>
		                    <span v-if="!transferInfoTemp.goData.send.able" class="meet-not">去预约</span>
		                    <span v-if="transferInfoTemp.goData.send.able && transferInfoTemp.goData.send.car != null" class="meet-not car_price"><em>&#165;</em>{{transferInfoTemp.goData.send.car.salePrice}}</span>
		                    <span class="meet-jt pointer"></span>
		                </div>
		            </div>
		            <div class="transfer" v-if="transferInfoTemp.goData != undefined && isDouble && transferInfoTemp.goData.pick.able" @click="goCityTransfer">
		                <div class="meet-airport">
		                    <img src="//m.lvmama.com/flight/image/jieji.png">
		                    <div class="meet">
		                        <p v-if="transferInfoTemp.goData.pick.car == null" class="meet-cont">
		                           <span class="meet-depart">{{departureCity.name}}<!--<em v-if="isDouble">接</em>-->送机</span> 
		                        </p>
		                        <p v-if="transferInfoTemp.goData.pick.able && transferInfoTemp.goData.pick.car != null" class="meet-cont y_flex">
		                        	<!-- <span v-if="isDouble" class="transfer_icon pick xy_flex">接</span> -->
		                           <span class="meet-depart">{{departureCity.name}}接机</span>
		                           <span class="car_type">{{transferInfoTemp.goData.pick.car.vehicleName}}</span> 
		                        </p>
		                        <p v-if="transferInfoTemp.goData.pick.car == null" class="meet-cont">
		                            <!-- <span class="meet-timeIcon"></span> -->
		                            <span class="meet-wait">{{transferInfoTemp.goData.pick.airportName}}<em v-if="!isDouble" class="singleIcon"></em><em v-else class="doubleIcon"></em>市中心</span>
		                        </p>
		                        <p v-if="transferInfoTemp.goData.pick.able && transferInfoTemp.goData.pick.car != null" class="car_time y_flex">
		                        	<span class="meet-timeIcon"></span>
		                        	{{transferInfoTemp.goData.pick.airportName}} <em class="trans-line"></em> {{transferInfoTemp.goData.pick.poiInfo.name}}
		                        </p>
		                        <p v-if="transferInfoTemp.goData.pick.able && transferInfoTemp.goData.pick.car != null" class="car_line y_flex meet-cont">
		                            <span class="meet-timeIcon"></span>
		                            <span class="meet-wait">已预约{{transferInfoTemp.goData.pick.useTime | showTransferTimeInOrderForm}}用车</span>
		                        </p>
		                    </div>
		                    <span v-if="transferInfoTemp.goData.pick.car == null" class="meet-not">去预约</span>
		                    <span v-if="transferInfoTemp.goData.pick.able && transferInfoTemp.goData.pick.car != null" class="meet-not car_price"><em>&#165;</em>{{transferInfoTemp.goData.pick.car.salePrice}}</span>
		                    <span class="meet-jt pointer"></span>
		                </div>
		            </div>
		            <div class="transfer" v-if="arrivalCityAbleTransfer && transferInfoTemp.arrivalData != undefined" @click="arrivalCityTransfer">
		                <div class="meet-airport">
		                    <img src="//m.lvmama.com/flight/image/jieji.png">
		                    <div class="meet">
		                        <p v-if="!transferInfoTemp.arrivalData.pick.able" class="meet-cont">
		                           <span class="meet-depart">{{arrivalCity.name}}接<em v-if="isDouble">送</em>机</span> 
		                        </p>
		                        <p v-if="transferInfoTemp.arrivalData.pick.able && transferInfoTemp.arrivalData.pick.car != null" class="meet-cont y_flex">
		                        	<!-- <span v-if="isDouble" class="transfer_icon pick xy_flex">接</span> -->
		                            <span class="meet-depart">{{arrivalCity.name}}接机</span>
		                            <span class="car_type">{{transferInfoTemp.arrivalData.pick.car.vehicleName}}</span> 
		                        </p>
		                        <p v-if="!transferInfoTemp.arrivalData.pick.able" class="meet-cont">
		                            <!-- <span class="meet-timeIcon"></span> -->
		                            <span class="meet-wait">{{transferInfoTemp.arrivalData.pick.airportName}}<em v-if="!isDouble" class="singleIcon"></em><em v-else class="doubleIcon"></em>市中心</span>
		                        </p>
		                        <p v-if="transferInfoTemp.arrivalData.pick.able && transferInfoTemp.arrivalData.pick.car != null" class="car_time y_flex">
		                        	<span class="meet-timeIcon"></span>
		                        	{{transferInfoTemp.arrivalData.pick.airportName}} <em class="trans-line"></em> {{transferInfoTemp.arrivalData.pick.poiInfo.name}}
		                        </p>
		                        <p v-if="transferInfoTemp.arrivalData.pick.able && transferInfoTemp.arrivalData.pick.car != null" class="car_line y_flex meet-cont">
		                            <span class="meet-timeIcon"></span>
		                            <span class="meet-wait">已预约{{transferInfoTemp.arrivalData.pick.useTime | showTransferTimeInOrderForm}}用车</span>
		                        </p>
		                    </div>
		                    <span v-if="!transferInfoTemp.arrivalData.pick.able" class="meet-not">去预约</span>
		                    <span v-if="transferInfoTemp.arrivalData.pick.able && transferInfoTemp.arrivalData.pick.car != null" class="meet-not car_price"><em>&#165;</em>{{transferInfoTemp.arrivalData.pick.car.salePrice}}</span>
		                    <span class="meet-jt pointer"></span>
		                </div>
		            </div>
		            <div class="transfer" v-if="transferInfoTemp.arrivalData != undefined && isDouble && transferInfoTemp.arrivalData.send.able" @click="arrivalCityTransfer">
		                <div class="meet-airport">
		                    <img src="//m.lvmama.com/flight/image/songji.png">
		                    <div class="meet">
		                        <p v-if="transferInfoTemp.arrivalData.send.able && transferInfoTemp.arrivalData.send.car != null" class="meet-cont y_flex">
		                        	<!-- <span v-if="isDouble" class="transfer_icon send xy_flex">送</span> -->
		                            <span class="meet-depart">{{arrivalCity.name}}送机</span>
		                            <span class="car_type">{{transferInfoTemp.arrivalData.send.car.vehicleName}}</span> 
		                        </p>
		                        <p v-if="transferInfoTemp.arrivalData.send.car == null" class="meet-cont">
		                            <!-- <span class="meet-timeIcon"></span> -->
		                            <span class="meet-wait">市中心<em v-if="!isDouble" class="singleIcon"></em><em v-else class="doubleIcon"></em>{{transferInfoTemp.arrivalData.send.airportName}}</span>
		                        </p>
		                        <p v-if="transferInfoTemp.arrivalData.send.able && transferInfoTemp.arrivalData.send.car != null" class="car_time y_flex">
		                        	<span class="meet-timeIcon"></span>
		                        	{{transferInfoTemp.arrivalData.send.poiInfo.name}} <em class="trans-line"></em> {{transferInfoTemp.arrivalData.send.airportName}}
		                        </p>
		                        <p v-if="transferInfoTemp.arrivalData.send.able && transferInfoTemp.arrivalData.send.car != null" class="car_line y_flex meet-cont">
		                            <span class="meet-timeIcon"></span>
		                            <span class="meet-wait">已预约{{transferInfoTemp.arrivalData.send.useTime | showTransferTimeInOrderForm}}用车</span>
		                        </p>
		                    </div>
		                    <span v-if="transferInfoTemp.arrivalData.send.car == null" class="meet-not">去预约</span>
		                    <span v-if="transferInfoTemp.arrivalData.send.able && transferInfoTemp.arrivalData.send.car != null" class="meet-not car_price"><em>&#165;</em>{{transferInfoTemp.arrivalData.send.car.salePrice}}</span>
		                    <span class="meet-jt pointer"></span>
		                </div>
		            </div>
		            
		        </div>
		        <div class="prompt">
		            <span><em></em>航班延误免费等</span>
		            <span><em></em>无附加服务费</span>
		        </div>
				<div class="equityClass newEquityClass" v-if="((transferInfoTemp.goData&&transferInfoTemp.goData.send.able && transferInfoTemp.goData.send.car != null) ||(transferInfoTemp.goData&&transferInfoTemp.goData.pick.able && transferInfoTemp.goData.pick.car != null) ||(transferInfoTemp.arrivalData&&transferInfoTemp.arrivalData.pick.able && transferInfoTemp.arrivalData.pick.car != null) ||(transferInfoTemp.arrivalData&&transferInfoTemp.arrivalData.send.able && transferInfoTemp.arrivalData.send.car != null))&&trafficTransferList.length>0" @click="rightFavourClick('transfer')" >
					<p>
						<span>权益券</span>
						<span v-if="transferCouponPrice<=0">{{trafficTransferList.length}}张可用</span>
						<span v-if="transferCouponPrice>0">-¥{{transferCouponPrice}}</span>
						<span v-if="transferCouponPrice>0">选择权益券<i class="equity_arrow"></i></span>
					</p>
				</div>
		    </div>
      <div class="insuranceInformation" v-if="activeList.length>0 || couponSwitch==true ||(couponSwitch==true&&invincibleListArr.length>0&&(personNumber.ADULTNumber>0||personNumber.CHILDRENNumber>0))">
        <p class="title">优惠</p>
        <div class="container" v-if="activeList.length>0" @click="toActiveList">
          <span></span>
          <span v-if="pickedActive!=''" class="preferentialContainer"><em>-&#165;</em><i>{{pickedActive.discountAmount}}</i> {{pickedActive.activityName.split("|").length>1?pickedActive.activityName.split("|")[1]:pickedActive.activityName || "促销活动"}}</span>
          <span v-if="pickedActive==''" class="preferentialContainer">不使用优惠</span>
          <span class="select">选择活动</span>
          <i class="equity_arrow"></i>
        </div>
        <div class="container" v-if="couponSwitch==true"  @click="toCoupon">
          <span class="vouchers"></span>
          <span class="preferentialContainer" v-if="coupon!='' && coupon.discountAmount>0"><em>-&#165;</em><i>{{coupon.discountAmount}}</i></span>
          <span class="preferentialContainer" v-if="coupon=='' || coupon.discountAmount==null|| coupon.discountAmount<=0">请选择优惠券</span>
          <span class="select">选择优惠券</span>
          <i class="equity_arrow"></i>
        </div>
        <div class="container" v-if="couponSwitch==true&&invincibleListArr.length>0&&(personNumber.ADULTNumber>0||personNumber.CHILDRENNumber>0)" @click="rightFavourClick('invincible')">
          <span class="invincible"></span>
          <span class="preferentialContainer invincible" v-if="invincibleCouponPrice>0"><em>-&#165;</em><i>{{invincibleCouponPrice}}</i></span>
          <span class="preferentialContainer invincible" v-if="invincibleCouponPrice<=0">{{invincibleListArr.length}}张可用</span>
          <span class="select">选择无敌券</span>
          <i class="equity_arrow"></i>
        </div>
      </div>
      <div class="insuranceInformation" v-if="insuranceListInfo!=null && insuranceListInfo.length>0">
        <p class="title" v-if="bookingInsuranceShowType!=1">出行保险</p>
        <div class="container insurance" v-if="bookingInsuranceShowType!=1" @click="toInsuranceList">
          <span class="insurance"></span>
          <span v-if="insurance.length>0" class="preferentialContainer insurance">
            <span v-for="(ins,index) in insurance" :key="index">{{ins.insuranceTypeName}}<em v-if="index!=insurance.length-1">、</em></span>
          </span>
          <span v-if="insurance.length==0" class="preferentialContainer insurance">选一份保险，让您一路安心无忧！</span>
          <span class="select">选择保险</span>
          <i class="equity_arrow"></i>
        </div>
        <p class="title" v-if="bookingInsuranceShowType==1" @click="toInsuranceList">
          出行保险
          <span>更多保险</span>
          <i></i>
        </p>
        <ul class="insurance_pick_container" v-if="bookingInsuranceShowType==1">
          <li class="insurance_item y_flex between_x_flex" v-for="(insuranceList,index) in insuranceListInfo" :key="index" v-if="insuranceList.show==true">
            <div class="y_flex">
              <p>{{insuranceList.pickedList.insuranceClass.name}}-{{insuranceList.pickedList.insuranceRemark}}<span class="insurance_ask" @click="showDetail(insuranceList)"></span></p>
            </div>
            <div class="y_flex right_flex">
              <span class="multi_picker" :class="{'multi_picked': insuranceList.pickedList.picked}" @click="pickedInsurance(insuranceList,index)"></span>
              <p v-if="insuranceList.pickedList.insurancePrice != 0 && doubleFlight!=null"><span>￥{{insuranceList.pickedList.insurancePrice}}</span>/份 ×{{selectedPersons.length*2}}</p>
              <p v-if="insuranceList.pickedList.insurancePrice != 0 && doubleFlight==null"><span>￥{{insuranceList.pickedList.insurancePrice}}</span>/份 ×{{selectedPersons.length}}</p>
              <p v-if="insuranceList.pickedList.insurancePrice == 0" class="font">免费赠</p>
            </div>
          </li>
        </ul>
        <div class="equityClass" v-show="insurance.length>0&&rightInsuranceList.length>0" @click="rightFavourClick('insurance')" >
          <p>
            <span>权益券</span>
            <span v-if="insuranceCouponPrice<=0">{{rightInsuranceList.length}}张可用</span>
            <span v-if="insuranceCouponPrice>0">-¥{{insuranceCouponPrice}}</span>
            <span class="insurance" v-if="insuranceCouponPrice>0">选择权益券<i class="equity_arrow"></i></span>
          </p>
        </div>
      </div>
		    <div class="voucher-addr" v-if="reimburse==true && businessTravel!=true">
		        <p class="invoice invoiceHeight">
		            <span>报销凭证</span>
		            <!-- <i v-if="needVoucher">快递&#165;10</i> -->
		            <span class="switch" @click="addressClick" v-bind:class="{'switch-on':needVoucher}">
		                <i class="switch-btn"></i>
		            </span>
		            <span class="sendContent lineHeightNormal" v-if="needVoucher">
		                <em>含:</em>
		                <em v-if="invoiceTitle==false">行程单</em>
		                <em v-if="showInvoice">差额发票</em>
		                <em v-if="invoiceTitle">行程单 + 差额发票</em>
		                <em v-if="insurance.length>0">+ 保险定额发票</em>
                    <em v-if="needVoucher">，快递&#165;10</em>
		                <br/>
		                <!-- <em class="hidden">配送内容:</em> -->
		                <em>预计起飞后15天内送达</em>
		                
		            </span>
                <span class="sendContent lineHeightNormal" v-else>
                  航班起飞后29天内可补开报销凭证；办理登机无需行程单，凭订票使用的有效证件即可
                </span>
		        </p>
		        <div class="orderline" v-if="needVoucher&&(invoiceTitle||showInvoice)"></div>
		        <div class="taitou" v-if="needVoucher&&(invoiceTitle||showInvoice)">
              <!-- <div class="title commin_y">发票抬头</div> -->
              <div class="value">
                  <div class="cons">
                      <!-- <div class="icons" @click="checkTaitou('g')"><i class="icon" v-bind:class="{'checkIcon':taitou.geren==true}"></i><i>个人</i></div> -->
                      <!-- <div class="icons" @click="checkTaitou('q')"><i class="icon" v-bind:class="{'checkIcon':taitou.geren==false}"></i><i>企业</i></div> -->
                      <div class="icons" :class="{'checkIcon':taitou.geren==true}" @click="checkTaitou('g')">个人</div>
                      <div class="icons q" :class="{'checkIcon':taitou.geren==false}" @click="checkTaitou('q')">公司</div>
                  </div>
                  <!-- <div class="orderline"></div> -->
                  <span v-if="taitou.geren==true"><input  @change="changeGeren('g',taitou.gerenVal)" v-model="taitou.gerenVal" type="text" placeholder="请填写个人真实姓名" />
                  </span>
                  <span v-if="taitou.geren==false"><input @change="changeGeren('q',taitou.qiyeVal)" v-model="taitou.qiyeVal" type="text" placeholder="企业抬头，请输入企业名称" />
                  </span>
              </div>
		        </div>
		        <div class="orderline" v-if="needVoucher&&(invoiceTitle||showInvoice)&&taitou.geren==false"></div>
		        <p class="postAddressClass" v-if="needVoucher&&(invoiceTitle||showInvoice)&&taitou.geren==false">
		            <span class="onespan">
		                <input maxlength="18" type="text" @change="changeGeren('c',taitou.xycode)" v-model="taitou.xycode" placeholder="纳税人识别号或统一社会信用代码(必填)" />
		            </span>
		            <span class="twospan" @click="showXyCode">
		                <span></span>
		            </span>
		        </p>

				<div class="orderline" v-if="needVoucher"></div>
				<p class="post" v-if="needVoucher">邮寄地址<span><i class="special" @click="toChooseAddress">
				<span v-if="chosenMailAddress.province == undefined" class="placeholderStyle">选择邮寄地址</span>
				<span v-else>{{chosenMailAddress.province}}{{chosenMailAddress.city}}{{chosenMailAddress.county}}{{chosenMailAddress.address}}</span>
				</i></span>
        <i class="herf_arrow"></i>
        </p>
    		</div>
        <div class="module" v-if="businessTravel==true">
          <span>备注</span> 
          <span><textarea placeholder="如有特殊需要，请在这里留言" @change="changeOrderRemark(orderRemark)" v-model="orderRemark" rows="2" cols="25" ></textarea></span>
        </div>

    		<p class="booking-notes"><i class="multi_picker" v-if="bookingNotes" :class="{'multi_picked':agree==true}" @click="agree=!agree"></i>{{bookingNotes?'已阅读并同意':'订单包含机票、附加选购产品、机建燃油费、税费。点击提交订单表示已阅读并同意'}}
        <span @click="showReservationNotes('LVMM') ">《驴妈妈机票网上预订须知》</span>
				<span @click="showReservationNotes('UO')">、《关于民航乘客携带锂电池及危险品乘机的限制》</span>
				<span @click="showReservationNotes('MZ')">、《航班信息免责声明》</span>

    			<!-- <span @click="openPDF('PN')" v-if="(singleFlight!=null && singleFlight.carrierCode=='PN') || (doubleFlight!=null && doubleFlight.carrierCode=='PN')">、《西部航空旅客、行李国内运输总条件》</span>
          <span @click="openPDF('PNT')" v-if="(singleFlight!=null && singleFlight.carrierCode=='PN') || (doubleFlight!=null && doubleFlight.carrierCode=='PN')">、《特殊旅客说明》</span>
          <span @click="openPDF('PNN')" v-if="(singleFlight!=null && singleFlight.carrierCode=='PN') || (doubleFlight!=null && doubleFlight.carrierCode=='PN')">、《西部航空不正常航班服务》</span>
          <span @click="openPDF('PNG')" v-if="(singleFlight!=null && singleFlight.carrierCode=='PN') || (doubleFlight!=null && doubleFlight.carrierCode=='PN')">、《西部航空乘客告知书》</span>
          <span @click="openPDF('PNH')" v-if="(singleFlight!=null && singleFlight.carrierCode=='PN') || (doubleFlight!=null && doubleFlight.carrierCode=='PN')">、《西部航空国内航线购票须知》</span>

				<span @click="openPDF('AQ')" v-if="(singleFlight!=null && singleFlight.carrierCode=='AQ') || (doubleFlight!=null && doubleFlight.carrierCode=='AQ')">、《九元航空旅客、行李国内运输总条件》</span>
        <span @click="openPDF('HO')" v-if="(singleFlight!=null && singleFlight.carrierCode=='HO') || (doubleFlight!=null && doubleFlight.carrierCode=='HO')">、《吉祥航空旅客、行李国内运输总条件》</span> 
        <span @click="openPDF('BK')" v-if="(singleFlight!=null && singleFlight.carrierCode=='BK') || (doubleFlight!=null && doubleFlight.carrierCode=='BK')">、《奥凯航空有限公司旅客、行李国内运输总条件》</span>
        <span @click="openPDF('JD')" v-if="(singleFlight!=null && singleFlight.carrierCode=='JD') || (doubleFlight!=null && doubleFlight.carrierCode=='JD')">、《北京首都航空有限公司旅客、行李国内运输总条件》</span> 
        <span @click="openPDF('EU')" v-if="(singleFlight!=null && singleFlight.carrierCode=='EU') || (doubleFlight!=null && doubleFlight.carrierCode=='EU')">、《成都航空有限公司旅客、行李国内客运总条件》</span> 
        <span @click="openPDF('3U')" v-if="(singleFlight!=null && singleFlight.carrierCode=='3U') || (doubleFlight!=null && doubleFlight.carrierCode=='3U')">、《川航旅客、国内运输总条件》</span> 
        <span @click="openPDF('9C')" v-if="(singleFlight!=null && singleFlight.carrierCode=='9C') || (doubleFlight!=null && doubleFlight.carrierCode=='9C')">、《春秋航空股份有限公司旅客、行李国内运输总条件》</span> 
        <span @click="openPDF('CN')" v-if="(singleFlight!=null && singleFlight.carrierCode=='CN') || (doubleFlight!=null && doubleFlight.carrierCode=='CN')">、《大新华航空有限公司旅客行李国内运输总条件》</span> 
        <span @click="openPDF('DZ')" v-if="(singleFlight!=null && singleFlight.carrierCode=='DZ') || (doubleFlight!=null && doubleFlight.carrierCode=='DZ')">、《东海航空旅客、行李运输总条件》</span> 
        <span @click="openPDF('MU')" v-if="(singleFlight!=null && singleFlight.carrierCode=='MU') || (doubleFlight!=null && doubleFlight.carrierCode=='MU')">、《东航旅客、行李国内运输总条件》</span> 
        <span @click="openPDF('GY')" v-if="(singleFlight!=null && singleFlight.carrierCode=='GY') || (doubleFlight!=null && doubleFlight.carrierCode=='GY')">、《多彩贵州航空旅客、行李国内运输总条件》</span> 
        <span @click="openPDF('FU')" v-if="(singleFlight!=null && singleFlight.carrierCode=='FU') || (doubleFlight!=null && doubleFlight.carrierCode=='FU')">、《福航旅客、行李运输总条件》</span> 
        <span @click="openPDF('GX')" v-if="(singleFlight!=null && singleFlight.carrierCode=='GX') || (doubleFlight!=null && doubleFlight.carrierCode=='GX')">、《广西北部湾航空有限责任公司旅客、行李国内运输总条件》</span> 
        <span @click="openPDF('GT')" v-if="(singleFlight!=null && singleFlight.carrierCode=='GT') || (doubleFlight!=null && doubleFlight.carrierCode=='GT')">、《桂林航空有限公司旅客、行李国内运输总条件》</span> 
        <span @click="openPDF('HU')" v-if="(singleFlight!=null && singleFlight.carrierCode=='HU') || (doubleFlight!=null && doubleFlight.carrierCode=='HU')">、《海南航空控股股份有限公司旅客行李国内运输总条件》</span> 
        <span @click="openPDF('NS')" v-if="(singleFlight!=null && singleFlight.carrierCode=='NS') || (doubleFlight!=null && doubleFlight.carrierCode=='NS')">、《河北航空旅客、行李运输总条件》</span> 
        <span @click="openPDF('A6')" v-if="(singleFlight!=null && singleFlight.carrierCode=='A6') || (doubleFlight!=null && doubleFlight.carrierCode=='A6')">、《红土航空国内旅客、行李运输总条件》</span> 
        <span @click="openPDF('G5')" v-if="(singleFlight!=null && singleFlight.carrierCode=='G5') || (doubleFlight!=null && doubleFlight.carrierCode=='G5')">、《华夏航空旅客、行李国内运输总条件》</span> 
        <span @click="openPDF('Y8')" v-if="(singleFlight!=null && singleFlight.carrierCode=='Y8') || (doubleFlight!=null && doubleFlight.carrierCode=='Y8')">、《金鹏航空股份有限公司旅客、行李国内运输总条件》</span> 
        <span @click="openPDF('KY')" v-if="(singleFlight!=null && singleFlight.carrierCode=='KY') || (doubleFlight!=null && doubleFlight.carrierCode=='KY')">、《昆明航空有限公司旅客、行李国内运输总条件》</span> 
        <span @click="openPDF('QW')" v-if="(singleFlight!=null && singleFlight.carrierCode=='QW') || (doubleFlight!=null && doubleFlight.carrierCode=='QW')">、《青岛航空股份有限公司旅客、行李国内运输总条件》</span> 
        <span @click="openPDF('DR')" v-if="(singleFlight!=null && singleFlight.carrierCode=='DR') || (doubleFlight!=null && doubleFlight.carrierCode=='DR')">、《瑞丽航空旅客、行李运输总条件》</span> 
        <span @click="openPDF('MF')" v-if="(singleFlight!=null && singleFlight.carrierCode=='MF') || (doubleFlight!=null && doubleFlight.carrierCode=='MF')">、《厦航旅客、行李国内运输总条件》</span> 
        <span @click="openPDF('SC')" v-if="(singleFlight!=null && singleFlight.carrierCode=='SC') || (doubleFlight!=null && doubleFlight.carrierCode=='SC')">、《山东航空股份有限公司旅客、行李国内运输总条件》</span> 
        <span @click="openPDF('FM')" v-if="(singleFlight!=null && singleFlight.carrierCode=='FM') || (doubleFlight!=null && doubleFlight.carrierCode=='FM')">、《上航旅客、行李国内运输总条件》</span> 
        <span @click="openPDF('ZH')" v-if="(singleFlight!=null && singleFlight.carrierCode=='ZH') || (doubleFlight!=null && doubleFlight.carrierCode=='ZH')">、《深航旅客、行李运输总条件》</span> 
        <span @click="openPDF('GS')" v-if="(singleFlight!=null && singleFlight.carrierCode=='GS') || (doubleFlight!=null && doubleFlight.carrierCode=='GS')">、《天津航空有限责任公司旅客、行李国内运输总条件》</span>
        <span @click="openPDF('UQ')" v-if="(singleFlight!=null && singleFlight.carrierCode=='UQ') || (doubleFlight!=null && doubleFlight.carrierCode=='UQ')">、《乌鲁木齐航空有限责任公司旅客、行李国内运输总条件》</span> 
        <span @click="openPDF('TV')" v-if="(singleFlight!=null && singleFlight.carrierCode=='TV') || (doubleFlight!=null && doubleFlight.carrierCode=='TV')">、《西藏航空旅客、行李运输总条件》</span> 
        <span @click="openPDF('8L')" v-if="(singleFlight!=null && singleFlight.carrierCode=='8L') || (doubleFlight!=null && doubleFlight.carrierCode=='8L')">、《祥鹏航空国内旅客、行李运输总条件》</span> 
        <span @click="openPDF('JR')" v-if="(singleFlight!=null && singleFlight.carrierCode=='JR') || (doubleFlight!=null && doubleFlight.carrierCode=='JR')">、《幸福航空旅客、行李运输总条件》</span> 
        <span @click="openPDF('9H')" v-if="(singleFlight!=null && singleFlight.carrierCode=='9H') || (doubleFlight!=null && doubleFlight.carrierCode=='9H')">、《长安航空旅客、行李运输总条件》</span> 
        <span @click="openPDF('GJ')" v-if="(singleFlight!=null && singleFlight.carrierCode=='GJ') || (doubleFlight!=null && doubleFlight.carrierCode=='GJ')">、《长龙航空旅客、行李运输总条件》</span>
        <span @click="openPDF('CA')" v-if="(singleFlight!=null && singleFlight.carrierCode=='CA') || (doubleFlight!=null && doubleFlight.carrierCode=='CA')">、《中国国航旅客、行李运输总条件》</span>
        <span @click="openPDF('CZ')" v-if="(singleFlight!=null && singleFlight.carrierCode=='CZ') || (doubleFlight!=null && doubleFlight.carrierCode=='CZ')">、《中国南方航空股份有限公司旅客、行李运输总条件》</span> -->
        <span v-for="(cad,index) in carrierArticleDto" :key="index" @click="openPDF(cad)">、《{{cad.articleTitle}}》</span>
			</p>
		</div>

    <div class="matteDetail" @click="showSpecialWorthItem=false" v-if="specialWorthItem!=null && showSpecialWorthItem">    </div>
    <div class="matteDetailValue" v-if="specialWorthItem!=null && showSpecialWorthItem">
      <div class="title">{{specialWorthItem.productName}}</div>
      <div class="container">
        <p v-html="specialWorthItem.serviceContent"></p><br>
        <p v-html="specialWorthItem.tgqRule"></p>
      </div>
      <div class="buttom">
        <span @click="showSpecialWorthItem=false">确定</span>
      </div>
    </div>

    <div class="matteDetail" @click="isShowDetail=false" v-if="isShowDetail"></div>
    <div class="matteDetailValue" v-if="isShowDetail">
      <div class="title">{{insuranceDetail.insuranceTypeName}}</div>
      <div class="container">
        <p v-html="insuranceDetail.insuranceDesc"></p><br>
        <p v-if="insuranceDetail.insuranceFile!=null && insuranceDetail.insuranceFile!='' && insuranceDetail.insuranceUrl!=null && insuranceDetail.insuranceUrl!=''" @click="toinsurance">详情请查看<em style="color:#4997e7">{{insuranceDetail.insuranceFile}}</em></p>
      </div>
      <div class="buttom">
        <span @click="closeDetail">确定</span>
      </div>
    </div>

		<div class="matte" v-if="actInfo" @click="showTicketInfo" style="z-index:20"></div>
		<div class="actInfo" v-if="actInfo">
          <div class="title">
            <span>航班详情</span>
            <i @click="showTicketInfo"></i>
          </div>
	        <div class="from-to" v-if="singleFlight!=null">
              <div>
                <i :class="{'single':doubleFlight==null,'doubleTo':doubleFlight!=null}"></i>
                <span>{{headInfo[0].departureDate | strDate}} {{singleFlight.departureDate.split(" ")[1]}} {{singleFlight.seatClassName}}</span>
              </div>
	            <div class="start-place">
                <!-- <span class="span1" :class="{'singleIcon':doubleFlight!=null}"></span> -->
                <!-- <span class="date">{{headInfo[0].departureDate | strDate}}</span> -->
                <span class="time">{{singleFlight.departureTime}}</span>
                <span class="airport">{{singleFlight.departureAirport.flightName}}{{singleFlight.departureAirport.code}}</span>
	            </div>
	            <div class="end-place">
	                <!-- <span class="date">{{headInfo[0].arrivalTime | strDate}}</span> -->
	                <span class="time">{{singleFlight.arrivalTime}}
	                <i v-if="singleFlight.crossDay" class="end-place-span">+<i>1</i></i></span>
	                <span class="airport">{{singleFlight.arrivalAirport.flightName}}{{singleFlight.arrivalAirport.code}}</span>
	            </div>
	            <p class="noline xy_flex">
	                <i><airlines-logo :logoKind="singleFlight.carrierCode"></airlines-logo>
	                </i>
	                <span class="border">{{singleFlight.carrierName}}{{singleFlight.flightNo}}</span>
	                <span class="border">{{singleFlight.mealType | mealType}}</span>
	                <span>{{singleFlight.code}}<em v-if="singleFlight.airplaneType">({{singleFlight.airplaneType}})</em></span>
	                <span class="detail" v-show="singleFlight.name!=null && singleFlight.name!=''" @click="showPlaneTypeMes(singleFlight)"></span>
	            </p>
	            <p class="xy_flex" v-if="singleFlight.isCodeShare">
                    <img class="air-icon" src="//m.lvmama.com/flight/image/change_icon.png">
                    <i><airlines-logo :logoKind="singleFlight.shareCarrierCode"></airlines-logo></i>
                    <span class="shareFlight">实际乘坐&nbsp;:&nbsp;<i style="color:#000;">{{singleFlight.shareCarrierName}}{{singleFlight.shareFlightNo}}</i></span>
            	</p>
	            <span class="flyHour">约{{singleFlight.flytimeHour}}时{{singleFlight.flytimeMinute}}分</span>
	            <span class="arrow">
	            	<span v-if="singleFlight.across">经停</span>
	            </span>
				      <!-- <span class="addDate" v-if="singleFlight.departureTime.split(' ')[0]!=singleFlight.arrivalTime.split(' ')[0]"></span> -->
	        </div>
	        <!-- <div class="orderline" style="height: 0.03rem!important;" v-if="doubleFlight!=null"></div> -->
	        <div class="from-to" v-if="doubleFlight!=null">
              <div>
                <i class="doubleFrom"></i>
                <span>{{headInfo[1].departureDate | strDate}} {{doubleFlight.departureDate.split(" ")[1]}} {{doubleFlight.seatClassName}}</span>
              </div>
	            <div class="start-place">
                  <!-- <span class="span1"  :class="{'doubleIcon':doubleFlight!=null}"></span> -->
                  <!-- <span class="date">{{headInfo[1].departureDate | strDate}}</span> -->
	                <span class="time">{{doubleFlight.departureTime}}</span>
	                <span class="airport">{{doubleFlight.departureAirport.flightName}}{{doubleFlight.departureAirport.code}}</span>
	            </div>
	            <div class="end-place">
	                <!-- <span class="date">{{headInfo[1].arrivalTime | strDate}}</span> -->
	                <span class="time">{{doubleFlight.arrivalTime}}<i v-if="doubleFlight.crossDay" class="end-place-span">+<i>1</i></i></span>
	                <span class="airport">{{doubleFlight.arrivalAirport.flightName}}{{doubleFlight.arrivalAirport.code}}</span>
	            </div>
	            <p class="noline xy_flex">
	                <i><airlines-logo :logoKind="doubleFlight.carrierCode"></airlines-logo></i>
	                <span class="border">{{doubleFlight.carrierName}}{{doubleFlight.flightNo}}</span>
	                <span class="border">{{doubleFlight.mealType | mealType}}</span>
	                <span>{{doubleFlight.code}}<em>({{doubleFlight.airplaneType}})</em></span>
	                <span class="detail" v-show="doubleFlight.name!=null && doubleFlight.name!=''" @click="showPlaneTypeMes(doubleFlight)"></span>
	            </p>
	            <p class="xy_flex" v-if="doubleFlight.isCodeShare">
                    <img class="air-icon" src="//m.lvmama.com/flight/image/change_icon.png">
                    <i><airlines-logo :logoKind="doubleFlight.shareCarrierCode"></airlines-logo></i>
                    <span class="shareFlight">实际乘坐&nbsp;:&nbsp;<i style="color:#000;">{{doubleFlight.shareCarrierName}}{{doubleFlight.shareFlightNo}}</i></span>
            	</p>
	            <span class="flyHour">约{{doubleFlight.flytimeHour}}时{{doubleFlight.flytimeMinute}}分</span>
	            <span class="arrow">
	            	<span v-if="doubleFlight.across">经停</span>
	            </span>
	            <!-- <span v-if="doubleFlight.departureTime.split(' ')[0]!=doubleFlight.arrivalTime.split(' ')[0]" class="addDate"></span> -->
	        </div>
	        <!-- <div class="close"  @click="showTicketInfo"><i class="closeTicket ti"></i><em class="closeTicket tem"></em></div> -->
	    </div>
		<div class="matte x_flex" v-if="typeInfo" @click="showPlaneTypeMes()" style="z-index: 22">
		    <div class="typeInfo">
		        <!-- <span class="flightPopX"></span> -->
		        <div>
		            <h3 class="back-change">机型信息</h3>
                <table>
                  <tr>
                    <td>机型</td>
                    <td>{{planeType.name}}{{planeType.code}}</td>
                  </tr>
                  <tr>
                    <td>类型</td>
                    <td>{{planeType.airplaneType}}</td>
                  </tr>
                  <tr>
                    <td>最少座位数</td>
                    <td>{{planeType.minSeats}}</td>
                  </tr>
                  <tr>
                    <td>最多座位数</td>
                    <td>{{planeType.maxSeats}}</td>
                  </tr>
                </table>
		        </div>
            <div class="closeTypeInfo">确 定</div>
		    </div>
		</div>
		<div class="footer" v-if="!showTravel">
		<!-- v-if="payMoney>0|| (payMoney==0&& coupon.discountAmount > 0)" -->
			<span v-if="selectedPersons.length>0&&(payMoney>0|| (payMoney==0&& coupon!='' && coupon.discountAmount > 0))" @click="showPriceMes()">应付：<em>&#165;</em><i>{{payMoney>0 ? payMoney : 0}}</i><u v-if="preferential>0">已省&#165;{{preferential}}</u><i class="submitIcon" :class="{'newArrow':downClass}"></i></span>
			<!-- && (coupon==null ||coupon.discountAmount==null || coupon.discountAmount=='' || coupon.discountAmount==0) -->
			<span class="payZero" v-if="selectedPersons.length>0&&payMoney<=0&& (coupon=='' ||coupon.discountAmount==null || coupon.discountAmount<=0)">应付：<em>&#165;</em><i>0</i><u v-if="preferential>0">已省&#165;{{preferential}}</u></span>
      <span class="payZero opacity" v-if="selectedPersons.length==0">你还未添加乘机人</span>
			<div class="button" :class="{'opacity':selectedPersons.length==0}" @click="submitOrder(payMoney)">提交订单</div>
		</div>
		<div class="confirm-mask" v-if="showComfirm==true" >
		    <div v-bind:class="{'comfirm-info':showComfirm==true,'dbl-confirm':doubleFlight!=null}" v-if="showComfirm==true">
		        <div class="confirm-go">
		            <p>{{doubleFlight!=null? "请确认去程信息": "请确认机票信息"}}</p>
		            <p class="infos">
		                <span>{{singleFlight.departureAirport.cityName}}-{{singleFlight.arrivalAirport.cityName}}</span>
		                <span></span>
		            </p>
		            <p class="infos">
		                <span>{{headInfo[0].departureDate}}&nbsp;{{headInfo[0].week}}</span>
		                <span></span>
		            </p>
		            <p class="infos">
		                <span><i>{{headInfo[0].flightNo}}</i> <i>{{singleFlight.departureTime}}出发</i></span>
		                <span></span>
		            </p>
		        </div>
		        <div class="confirm-back" v-if="doubleFlight!=null">
		            <p>请确认返程信息</p>
		            <p class="infos">
		                <span>{{doubleFlight.departureAirport.cityName}}-{{doubleFlight.arrivalAirport.cityName}}</span>
		                <span></span>
		            </p>
		            <p class="infos">
		                <span>{{headInfo[1].departureDate}}&nbsp;{{headInfo[1].week}}</span>
		                <span></span>
		            </p>
		            <p class="infos">
		                <span><i>{{headInfo[1].flightNo}}</i> <i>{{doubleFlight.departureTime}}出发</i></span>
		                <span></span>
		            </p>
		        </div>
		        <div class="comfirm-pass">
		            <p>乘机人</p>
		            <p>
		            <span>
		                <span v-for="(person,index) in selectedPersons">{{person.receiverName}}<i v-if="index!=selectedPersons.length-1">、</i></span>
		            </span>
		            <span></span>
		            </p>
		            <i></i>
		        </div>
		        <div class="waiting">
		            <span><i></i></span>
		            <span>正在生成订单</span>
		        </div>
		    </div>
		</div>

		<div class="matte matteBox" v-show="dupClassNew1021">
		    <div class="ticket-infos">
		        <div class="order-form-pop">
		           {{submessages}}
		        </div>
		        <div class="pop-button">
		            <div class="pop-left" @click="newSubChange()">
		                <p class="predeterm">
		                <span>继续预订</span>
		                <span class="order-cancel">(将取消原订单)</span>
		                </p>
		            </div>
		            <div class="pop-right" @click="goOrderList()">
		                <p class="check-order">查看原单</p>
		            </div>
		        </div>

		        <div class="close" @click="dupClassNew1021=false">
		        <i class="closeTicket ti"></i><em class="closeTicket tem"></em>
		        </div>
		    </div>
		</div>

		<div class="matte" @click="downClass=false" v-show="downClass">
			<div class="money">
        <p class="title">费用明细</p>
        <div class="orderLine"></div>
				<div class="det" v-if="singleFlight!=null &&singleFlight.saleType!='RoundTripSpecial'">
					<p class="head" v-if="doubleFlight!=null">去程
             <span><i>&#165;</i>{{parseFloat(personNumber.ADULTNumber*(singleFlight.audltSalePrice+singleFlight.adultPrice))+parseFloat(personNumber.CHILDRENNumber*(singleFlight.childrenSalePrice+singleFlight.childrenPrice))+parseFloat(productsGo!=null && productsGo.picked==true?selectedPersons.length*productsGo.saleChannelPrices[0].channelSalePrice:0)}}</span>
          </p>
          <p class="head" v-if="doubleFlight==null">单程
            <span><i>&#165;</i>{{parseFloat(personNumber.ADULTNumber*(singleFlight.audltSalePrice+singleFlight.adultPrice+parseFloat(showPackageName?packageInfo.tagPrice:0)))+parseFloat(personNumber.CHILDRENNumber*(singleFlight.childrenSalePrice+singleFlight.childrenPrice+parseFloat(showPackageName?packageInfo.tagPrice:0)))+parseFloat(productsGo!=null && productsGo.picked==true?selectedPersons.length*productsGo.saleChannelPrices[0].channelSalePrice:0)}}</span>
          </p>
					<p v-if="singleFlight != null">
						{{showPackageName?'成人套餐价':'成人票'}}
						<span><i>&#215;</i>{{personNumber.ADULTNumber}}</span>
            <span><em>&#165;</em>{{showPackageName?singleFlight.audltSalePrice-(-packageInfo.tagPrice):singleFlight.audltSalePrice}}/人</span>
					</p>
					<p v-if="singleFlight != null" >
						机建+燃油
						<span><i>&#215;</i>{{personNumber.ADULTNumber}}</span>
            <span><em>&#165;</em>{{singleFlight.adultPrice}}/人</span>
					</p>
					<p v-if="personNumber.CHILDRENNumber!=0">
						{{showPackageName?'儿童套餐价':'儿童票'}}
						<span><i>&#215;</i>{{personNumber.CHILDRENNumber}}</span>
            <span><em>&#165;</em>{{showPackageName?singleFlight.childrenSalePrice-(-packageInfo.tagPrice):singleFlight.childrenSalePrice}}/人</span>
					</p>
					<p v-if="personNumber.CHILDRENNumber!=0" >
              机建+燃油
              <span><i>&#215;</i>{{personNumber.CHILDRENNumber}}</span>
              <span><em>&#165;</em>{{singleFlight.childrenPrice}}/人</span>
          </p>
          <p v-if="productsGo!=null && productsGo.picked==true" >
              {{productsGo.productName}}
              <span><i>&#215;</i>{{selectedPersons.length}}</span>
              <span><em>&#165;</em>{{productsGo.saleChannelPrices[0].channelSalePrice}}/份</span>
          </p>
				</div>
        <div class="orderLine" v-if="singleFlight!=null &&singleFlight.saleType!='RoundTripSpecial'"></div>
				<div class="det" v-if="doubleFlight!=null && singleFlight.saleType!='RoundTripSpecial'">
					<p class="head">返程 <span><i>&#165;</i>{{parseFloat(personNumber.ADULTNumber*(doubleFlight.audltSalePrice+doubleFlight.adultPrice))+parseFloat(personNumber.CHILDRENNumber*(doubleFlight.childrenSalePrice+doubleFlight.childrenPrice))+parseFloat(productsBack!=null && productsBack.picked==true?selectedPersons.length*productsBack.saleChannelPrices[0].channelSalePrice:0)}}</span></p>
					<p>
					  成人票
						<span><i>&#215;</i>{{personNumber.ADULTNumber}}</span>
            <span><em>&#165;</em>{{doubleFlight.audltSalePrice}}/人</span>
					</p>
					<p>
						机建+燃油
						<span><i>&#215;</i>{{personNumber.ADULTNumber}}</span>
            <span><em>&#165;</em>{{doubleFlight.adultPrice}}/人</span>
					</p>
					<p v-if="personNumber.CHILDRENNumber!=0">
						儿童票
						<span><i>&#215;</i>{{personNumber.CHILDRENNumber}}</span>
            <span><em>&#165;</em>{{doubleFlight.childrenSalePrice}}/人</span>
					</p>
					<p v-if="personNumber.CHILDRENNumber!=0">
            机建+燃油
            <span><i>&#215;</i>{{personNumber.CHILDRENNumber}}</span>
            <span><em>&#165;</em>{{doubleFlight.childrenPrice}}/人</span>
          </p>
          <p v-if="productsBack!=null && productsBack.picked==true">
              {{productsBack.productName}}
              <span><i>&#215;</i>{{selectedPersons.length}}</span>
              <span><em>&#165;</em>{{productsBack.saleChannelPrices[0].channelSalePrice}}/份</span>
          </p>
				</div>
        <div class="orderLine" v-if="doubleFlight!=null && singleFlight.saleType!='RoundTripSpecial'"></div>
				<div class="det" v-if="singleFlight != null && singleFlight.saleType=='RoundTripSpecial'">
					<p class="head">成人往返套餐价 <span><i>&#165;</i>{{parseFloat(personNumber.ADULTNumber*(singleFlight.audltSalePrice+singleFlight.adultPrice))+parseFloat(personNumber.CHILDRENNumber*(singleFlight.childrenSalePrice+singleFlight.childrenPrice))+parseFloat(productsGo!=null && productsGo.picked==true?selectedPersons.length*productsGo.saleChannelPrices[0].channelSalePrice:0)+parseFloat(productsBack!=null && productsBack.picked==true?selectedPersons.length*productsBack.saleChannelPrices[0].channelSalePrice:0)}}</span></p>
					<p>
						成人往返套餐价
						<span><i>&#215;</i>{{personNumber.ADULTNumber}}</span>
            <span><em>&#165;</em>{{singleFlight.audltSalePrice}}/人</span>
					</p>
					<p>
						机建+燃油
						<span><i>&#215;</i>{{personNumber.ADULTNumber}}</span>
            <span><em>&#165;</em>{{singleFlight.adultPrice}}/人</span>
					</p>
					<p v-if="personNumber.CHILDRENNumber!=0">
						儿童票 
						<span><i>&#215;</i>{{personNumber.CHILDRENNumber}}</span>
            <span><em>&#165;</em>{{singleFlight.childrenSalePrice+doubleFlight.childrenSalePrice}}/人</span>
					</p>
					<p v-if="personNumber.CHILDRENNumber!=0">
              机建+燃油
              <span><i>&#215;</i>{{personNumber.CHILDRENNumber}}</span>
              <span><em>&#165;</em>{{singleFlight.childrenPrice}}/人</span>
          </p>
          <p v-if="productsGo!=null && productsGo.picked==true">
              {{productsGo.productName}}
              <span><i>&#215;</i>{{selectedPersons.length}}</span>
              <span><em>&#165;</em>{{productsGo.saleChannelPrices[0].channelSalePrice}}/份</span>
          </p>
          <p v-if="productsBack!=null && productsBack.picked==true">
              {{productsBack.productName}}
              <span><i>&#215;</i>{{selectedPersons.length}}</span>
              <span><em>&#165;</em>{{productsBack.saleChannelPrices[0].channelSalePrice}}/份</span>
          </p>
				</div>
        <div class="orderLine" v-if="singleFlight != null && singleFlight.saleType=='RoundTripSpecial'"></div>

        <div class="det" v-if="transferMoney>0">
          <p class="head">接送机<span><i>&#165;</i>{{transferMoney}}</span></p>
					<p v-if="transferInfoTemp.goData != undefined && transferInfoTemp.goData.send.able && transferInfoTemp.goData.send.car != null">
						{{transferInfoTemp.goData.send.vasProductName}}
						<span><em>&#165;</em>{{transferInfoTemp.goData.send.car.salePrice}}</span>
					</p>
          <p v-if="transferInfoTemp.goData != undefined && transferInfoTemp.goData.pick.able && transferInfoTemp.goData.pick.car != null">
            {{transferInfoTemp.goData.pick.vasProductName}}
            <span><em>&#165;</em>{{transferInfoTemp.goData.pick.car.salePrice}}</span>
				  </p>
          <p v-if="transferInfoTemp.arrivalData != undefined && transferInfoTemp.arrivalData.send.able && transferInfoTemp.arrivalData.send.car != null">
            {{transferInfoTemp.arrivalData.send.vasProductName}}
            <span><em>&#165;</em>{{transferInfoTemp.arrivalData.send.car.salePrice}}</span>
          </p>
          <p v-if="transferInfoTemp.arrivalData != undefined && transferInfoTemp.arrivalData.pick.able && transferInfoTemp.arrivalData.pick.car != null">
            {{transferInfoTemp.arrivalData.pick.vasProductName}}
            <span><em>&#165;</em>{{transferInfoTemp.arrivalData.pick.car.salePrice}}</span>
          </p>
        </div>
        <div class="orderLine" v-if="transferMoney>0"></div>

        <div class="det" v-if="specialWorthMoney>0&&!hideSpecialWorth">
          <p class="head">特惠专享<span><i>&#165;</i>{{specialWorthMoney}}</span></p>
					<p v-for="special in specialWorthInfos" v-if="special.picked==true&&!(showPackageName==true && packageInfo!=null && packageInfo.businessType=='TICKET'&& packageInfo.id==special.id)">
						{{special.productName}}
						<span><i>&#215;</i>1份</span>
            <span><em>&#165;</em>{{special.saleChannelPrices[0].channelSalePrice}}</span>
					</p>
        </div>
        <div class="orderLine" v-if="specialWorthMoney>0&&!hideSpecialWorth"></div>

        <div class="det" v-if="selectedPersons.length>0&&insurance.length>0&&!(showPackageName==true && packageInfo!=null && packageInfo.businessType=='INSURANCE' && insurance.length==1&& packageInfo.id==insurance[0].insuranceClass.id)">
          <p class="head">保险<span><i>&#165;</i>{{insuranceAllMoney}}</span></p>
					<p v-for="(insurances,i) in insurance" :key="i" v-if="!(showPackageName==true && packageInfo!=null && packageInfo.businessType=='INSURANCE'&& packageInfo.id==insurances.insuranceClass.id)">
						{{insurances.insuranceClass.name}}
						<span><i>&#215;</i>{{selectedPersons.length*flightInfo.length}}份</span>
            <span><em>&#165;</em>{{insurances.insurancePrice}}</span>
					</p>
        </div>
        <div class="orderLine" v-if="selectedPersons.length>0&&insurance.length>0&&!(showPackageName==true && packageInfo!=null && packageInfo.businessType=='INSURANCE' && insurance.length==1&& packageInfo.id==insurance[0].insuranceClass.id)"></div>

        <p class="transferInfoMes" v-if="needVoucher&&reimburse && businessTravel!=true">
          配送费
          <span><em>&#165;</em>10</span>
        </p>
        <div class="orderLine" v-if="needVoucher&&reimburse && businessTravel!=true"></div>

        <div class="det" v-if="(couponSwitch==true && coupon!='' && coupon.discountAmount>0)||(pickedActive!='')||((insuranceCouponPrice+transferCouponPrice+airportVipCouponPrice)>0)||(couponSwitch==true && invincibleCouponPrice>0)||(knockOrReduced==true && ((singleFlight.promotion+(doubleFlight.promotion||0))*personNumber.ADULTNumber)>0)||(singleFlight != null && singleFlight.saleType=='RoundTripSpecial'&& knockOrReduced==true && singleFlight.promotion*personNumber.ADULTNumber>0)">
          <p class="head">优惠<span><i>-&#165;</i>{{preferential}}</span></p>
					<p v-if="couponSwitch==true && coupon!='' && coupon.discountAmount>0"><!--v-if="isShowCoup" -->
						优惠券(仅抵扣机票金额)
            <span><em>-&#165;</em>{{coupon.discountAmount}}</span>
					</p>
          <p v-if="pickedActive!=''">
						{{pickedActive.activityName.split("|").length>1?pickedActive.activityName.split("|")[1]:pickedActive.activityName}}
            <span><em>-&#165;</em>{{pickedActive.discountAmount}}</span>
					</p>
          <p v-if="(insuranceCouponPrice+transferCouponPrice+airportVipCouponPrice)>0">
						权益券
            <span><em>-&#165;</em>{{insuranceCouponPrice+transferCouponPrice+airportVipCouponPrice}}</span>
					</p>
          <p v-if="couponSwitch==true && invincibleCouponPrice>0">
						无敌券
            <span><em>-&#165;</em>{{invincibleCouponPrice}}</span>
					</p>
          <p v-if="knockOrReduced==true && ((singleFlight.promotion+(doubleFlight.promotion||0))*personNumber.ADULTNumber)>0">
						下单立减
            <span><em>-&#165;</em>{{((singleFlight.promotion+doubleFlight.promotion)*personNumber.ADULTNumber)}}</span>
					</p>
          <p v-if="singleFlight != null && singleFlight.saleType=='RoundTripSpecial'&& knockOrReduced==true && singleFlight.promotion*personNumber.ADULTNumber>0">
						下单立减
            <span><em>-&#165;</em>{{singleFlight.promotion*personNumber.ADULTNumber}}</span>
					</p>
        </div>
			</div>
		</div>
		<!-- <change-back :ticketRuleDetailListdesc="ticketRuleDetailListdesc" :changeBackClose="showChangeBack" :ticketRuleDetailListdet="ticketRuleDetailListdet" @onChangeBack="onChangeBack"></change-back> -->
		<!-- <children-price :singleFlight="singleFlight" :doubleFlight="doubleFlight" :childrenPriceClose="childrenPriceClose" @onClickChildren="onClickChildren"></children-price> -->
		<!-- <luggage-desc v-if="luggageDescClose==true" :businessTravel="businessTravel" :goLuggageDesc="goLuggageDesc" :backLuggageDesc="backLuggageDesc" :luggageDescClose="luggageDescClose" :flightInfoLength="flightInfo.length==2?true:false" @onClickLuggage="onClickLuggage"></luggage-desc> -->
		<alert-tip v-if="showMessage" :tipContent="message" :leftButton="leftButton" :rightButton="rightButton" @closeAlert="closeAlert" @rightHandler="rightHandler" ></alert-tip>
		<reservation-notes v-if="showNotes" :tipNotes="notes" @closeNotes="showNotes=false" ></reservation-notes>
		<noticeswiper-detail v-if="noticeDetail!=''"></noticeswiper-detail>
		<name-class v-if="showUrle" @onNmaeClose="showUrle=false"></name-class>
    <form-therules v-if="showChangeBack==true" :ticketRuleDetailListdesc="ticketRuleDetailListdesc" :singleFlight="singleFlight" :doubleFlight="doubleFlight" :showPackageName="showPackageName" :packageInfo="packageInfo" :changeBackClose="showChangeBack" :ticketRuleDetailListdet="ticketRuleDetailListdet" :goLuggageDesc="goLuggageDesc" :backLuggageDesc="backLuggageDesc" @onChangeBack="onChangeBack"></form-therules>

    <!--默认保险弹框-->
    <div class="insurance_matte" v-if="showAlertInsurance">
      <section class="insurance_container">
        <div class="insurance_container_title">
          <i></i>
          驴妈妈提醒您 尚未添加出行保障
        </div>
        <div class="insurance_container_info">
          <div>为使家人<span>更安心</span>，建议购买</div>
          <div>
            <p>{{alertInsurance.insuranceTypeName}}</p>
            <p>¥{{alertInsurance.insurancePrice}}/份</p>
          </div>
          <div class="insurance_container_button">
              <div @click="hideAlertInsurance">我不需要</div>
              <div @click="addAlertInsurance">添加保险</div>
          </div>
        </div>
      </section>
    </div>
		<!-- 商旅拒绝弹框开始 -->
         <div class="travel_alert" v-if="showTravel">
             <div class="travel_alert_reject">
                 <div class="reject_cause">
                     <span>差旅申请号</span>
                     <i @click="closeReject"></i>
                 </div>
                 <textarea class="cause_content" maxlength="30" placeholder="选填" v-model="improveContent"></textarea>
                 <div class="reject_button">
                     <div @click="sureReject">提交订单</div>
                 </div>
             </div>
         </div>
         <!-- 商旅拒绝弹框结束 -->
	</div>
</template>
<script>
import { mapActions, mapState } from "vuex";
import { lQuery } from "../../plugins/lQuery";

import headTop from "../../components/header/head";
import noticeSwiper from "../../components/common/notice-swiper-component";
// import changeBack from "../../components/common/changeBack";
import formTherules from "../../components/common/form-therules";
// import childrenPrice from "../../components/common/childrenPrice";
// import luggageDesc from "../../components/common/luggageDesc";
import alertTip from "../../components/common/alertTip";
import reservationNotes from "../../components/common/reservation-notes";
import noticeswiperDetail from "../../components/common/notice-swiper-detail";
import airlinesLogo from "../../components/common/airlinesLogo";
import nameClass from "../../components/common/nameClass";

import {
  getCityAddressList,
  getNotice,
  getVasCouponList,
  getVasList,
  getInsurance,
  getCommonPersonMes,
  amountCalculator,
  checkTransferCity,
  booking,
  bookinfo,
  getLvUserByCookie,
  getLvUser,
  cancelOrdersByOrderNo,
  getMailAddress,
  getCouponList,
  validateCoupon,
  getRightCouponList,
  checkKangLvUser
} from "../../service/getData";
import {
  setStore,
  getStore,
  getCookie,
  removeStore,
  getBookingSource,
  getNoticeSource,
  formatIOSDate,
  getVascouponSource,
  statisticsPersonType,
  isIDcard,
  checkMobile,
  removeBlank,
  isClient,
  getLvSessionId,
  jumpLogin,
  setRootCookie,
  getStatisticsType,
  getElementTag,
  orderDetailHref
} from "../../config/mUtils";

export default {
  data() {
    return {
      goPage: "toDestine",
      depart: "",
      dest: "",
      flightDate: "",
      noticeArr: "",
      rightMenu: "反馈意见",
      lowPriceName: "",
      headerGoPath: `/${this.$parent.baseUrlPath}/feedBack`,
      flightInfo: "", //所有航班信息
      headInfo: "", //头部信息
      singleFlight: null, //去程航班信息
      doubleFlight: null, //返程航班信息
      RoundTripSpecial: false, //往返特惠
      inventoryCount: 10, //最少座位数
      personTypeMessage: "成人0人 儿童0人",
      personNumber: { ADULTNumber: 0, CHILDRENNumber: 0 },
      ticketRuleDetailListdesc: "", //去程退改签
      ticketRuleDetailListdet: "", //返程退改签
      showChangeBack: false, //展示退改签
      childrenPriceClose: false, //展示儿童价
      goLuggageDesc: null, //去程行李额
      backLuggageDesc: null, //返程行李额
      luggageDescClose: false, //展示行李额说明
      specialWorthInfos: null, //卖券列表
      productsGo: null, //去程贵宾室
      productsBack: null, //返程贵宾室
      maxPrice: 0, //最高票价
      specialWorthItem: null, //卖券详情
      showSpecialWorthItem: false, //是否展示卖券详情
      showOldMessage: "", //是否展示70岁提醒 true 展示 false 客户关闭不展示
      actInfo: false, //展示航班信息
      typeInfo: false, //展示机型信息
      planeType: null, //机型信息单返
      reimburse: true, //是否展示报销凭证
      invoiceTitle: false, //是否展示差额发票+行程单/行程单
      showInvoice: false, //是否展示单独差额发票
      taitou: null, //发票抬头信息
      showMessage: false, //是否展示弹框
      message: "", //弹框信息
      leftButton: "", //弹框左边按钮 或者单按钮
      rightButton: "", //弹框右边按钮 单按钮不需要传
      notes: "", //预订须知类型
      showNotes: false, //是否展示预订须知
      payMoney: 0, //支付总额
      isShowCoup: false, //是否展示只抵扣金额
      insurance: [], //保险列表
      downClass: false, //是否展示金额明细
      transferInfoTemp: "", //临时接送机信息
      rightClickType: "", //弹框右边按钮点击事件类型  判断事件
      leftClickType: "", //弹框左边边按钮点击事件类型  判断事件
      contactPhone: "", //联系手机
      isPhoneFocus: false, //联系手机一件清楚按钮
      couponSwitch: true, //是否展示优惠券入口
      isAcceptTransferPrice: false, //下单接送机是否变价
      suborder: true, //是否正在下单
      JSCprcie: 0, //接送机变价金额
      clbooking: false, //差旅跳转下单完成
      changePrice: 0, //下单变价金额
      goCityAbleTransfer: true, //出发城市可以接送机
      arrivalCityAbleTransfer: true, //到达城市可以接送机
      userid: "", //登录id
      app: false, //是否是APP
      differentRoundTripSpecialPrice: 0, //往返特惠优惠金额
      flight_orderMainId: "", //下单完成接口返回主单ID
      flight_orderNo: "", //下单完成接口返回主单NO
      pickedActive: "", //选中的促销活动
      showUrle: false, //是否展示乘机人姓名填写须知
      showComfirm: false, //是否展示下单动画
      agree: false, //是否阅读须知
      scrollLocation: "",
      specialWorthMoney: 0,//卖券总额
      transferMoney: 0,//接送机总额
      showOrderTopMsg: false,
      dupClassNew1021: false, //下单1021code弹框
      submessages: "", //下单1021code弹框内容
      newChangeId: "", //下单1021code弹框id
      transferPomiseMessage: "", //接送机人数超限提示
      showTravel: false, //商旅项目编号弹框
      improveContent: "", //商旅项目编号
      rightClickTypeNew: null,
      isShowDetail: false, //是否展示保险明细
      clickInsuranceDetail: false,
      couponListRequest: null,
      insuranceDetail: "", //保险说明,
      insuranceCouponPrice: 0, //保险权益券优惠的金额
      transferCouponPrice: 0, //接送机权益券优惠的金额
      airportVipCouponPrice: 0, //贵宾室权益券优惠的金额
      invincibleCouponPrice: 0, //无敌券券优惠的金额
      consumedCouponList: [], //下单权益券相关
      insuranceAllMoney:0,//购买保险总额
      preferential:0,//优惠券总额
      luggageMemo:'',//行李额
      rightInsuranceList: [],
      trafficTransferList: [],
      airportVipLoungeList: [],
      invincibleListArr: [],
      bookingInsuranceShowType:1,//保险外漏类型区分
      showPackage:false,//是否展示产品包
      orderRemark:null,//差旅下单备注
      carrierArticleDto:[],
      bookingNotes:false,//是否需要同意总则
      showPackageName:false,//是否展示套餐价
      hideSpecialWorth:false,//产品位是否隐藏优惠专享明细
      alertInsurance:null,//弹框默认选择保险信息
      showAlertInsurance:false,//是否展示弹框默认选择保险信息
    };
  },
  components: {
    headTop,
    noticeSwiper,
    // changeBack,
    // childrenPrice,
    // luggageDesc,
    airlinesLogo,
    alertTip,
    noticeswiperDetail,
    reservationNotes,
    formTherules
  },
  created() {
    //获取所有城市数据，供城市三级联动选择
    getCityAddressList().then(res => {
      let obj = {
        key: "areaData",
        val: res.data
      };
      try {
        this.initData(obj);
      } catch (e) {}
    });
  },
  mounted() {},
  activated() {
    removeStore('passlength');
    let that = this;
    window.setContact = function(name, phone) {
      that.contactPhone = phone;
    };
    this.insuranceCouponPrice = 0;
    this.transferCouponPrice = 0;
    this.airportVipCouponPrice = 0;
    this.invincibleCouponPrice = 0;
    this.showMessage = false;
    this.dupClassNew1021 = false;
    this.rightClickType = "";
    this.showOrderTopMsg = false;
    this.improveContent = "";
    this.isShowDetail = false;
    this.clickInsuranceDetail = false;
    this.rightClickTypeNew = null;
    this.productsBack = null;
    this.productsGo = null;
    this.specialWorthInfos = null;
    this.showPackage=false;
    this.showPackageName=false;
    this.ticketRuleDetailListdesc="";
    this.ticketRuleDetailListdet="";
    this.goLuggageDesc="";
    this.backLuggageDesc="";
    this.bookingNotes=false;
    this.showAlertInsurance = false;
    this.alertInsurance = null;
    this.carrierArticleDto = [];
    let lvsessionid = getCookie("lvsessionid") || "";
    let localLvsessionid = getStore("lvsessionid");
    if (lvsessionid != localLvsessionid) {
      removeStore("coupon", this);
      removeStore("couponList", this);
      removeStore("taitou", this);
      removeStore("productsGo", this);
      removeStore("productsBack", this);
      removeStore("worthCoupons", this);
      removeStore("flight_addPerson_info", this);
      removeStore("commonPersonMes", this);
      removeStore("selectedPersons", this);
      removeStore("activeList", this);
      removeStore("chosenMailAddress", this);
      removeStore("allMailAddress", this);
      removeStore("invincibleList", this);
      removeStore("rightInsurance", this);
      removeStore("trafficTransfer", this);
      removeStore("airportVipLounge", this);
      removeStore("couponListRequestObj", this);
      let tempKangLvobj = {
        key: "isKangLvUser",
        val: null
      };
      try {
        this.initData(tempKangLvobj);
      } catch (e) {}
    }
    setStore("lvsessionid", lvsessionid);
    setRootCookie("lvsessionid", lvsessionid, ".lvmama.com", "/");

    this.checkedLogin();

    if (getStore("chajia")) {
      this.showNObuttom("价格实时变动，已更新最新价格");
      removeStore("chajia", this);
    }
    if (isClient() == 1) {
      this.app = true;
    }
    this.couponSwitch =
      getStore("getCouponSwitch") != null &&
      getStore("getCouponSwitch") != "undefined"
        ? JSON.parse(getStore("getCouponSwitch"))
        : true;
    if (this.businessTravel == true) {
      this.couponSwitch = false;
    }
    this.flightDate = this.$store.state.departDate;
    this.depart = this.$store.state.departureCity.name;
    this.dest = this.$store.state.arrivalCity.name;
    this.headInfo = JSON.parse(getStore("flight_headInfo"));
    let carrierCodes="";
    if (getStore("flightInfo") != null) {
      this.flightInfo = JSON.parse(getStore("flightInfo"));
      this.singleFlight = this.flightInfo[0];
      carrierCodes=this.singleFlight.carrierCode;
      if(this.singleFlight.bookingNotes!=null && this.singleFlight.bookingNotes!=""){
        this.bookingNotes=true;
      }
      this.singleFlight.adultPrice =
        Number(this.singleFlight.adultTaxs) +
        Number(this.singleFlight.adultFees);
      this.singleFlight.childrenPrice =
        Number(this.singleFlight.childrenTaxs) +
        Number(this.singleFlight.childrenFees);
      if (
        this.singleFlight.ticketRuleSimples[0].remark != null &&
        this.singleFlight.ticketRuleSimples[0].remark != "" &&
        JSON.stringify(
          this.singleFlight.ticketRuleSimples[0].simpleDetails
        ).indexOf("RM") == -1
      ) {
        let remark = {};
        remark.detailFeeDesc = this.singleFlight.ticketRuleSimples[0].remark;
        remark.detailFeeType = "RM";
        remark.detailFeeTypeName = "备注";
        this.singleFlight.ticketRuleSimples[0].simpleDetails.push(remark);
      }
      if (
         JSON.stringify(this.singleFlight.ticketRuleSimples[0].simpleDetails).indexOf("SN") == -1
      ) {
        let seat = {};
            seat.detailFeeDesc = this.singleFlight.seatClassName;
            seat.detailFeeType = "SN";
            seat.detailFeeTypeName = "舱位";
        this.singleFlight.ticketRuleSimples[0].simpleDetails.splice(0,0,seat);
      }
      let goLuggage = {};
      goLuggage.luggageInfo = this.singleFlight.ticketRuleSimples[0].luggageInfo;
      goLuggage.luggageDesc = this.singleFlight.ticketRuleSimples[0].luggageDesc;
      goLuggage.carrierCode = this.singleFlight.carrierCode;
      goLuggage.passengerNum = this.singleFlight.passengerNum;
      goLuggage.flightReimburseType = this.singleFlight.flightReimburseType;

      this.goLuggageDesc = goLuggage;
      this.ticketRuleDetailListdesc = this.singleFlight.ticketRuleSimples[0].simpleDetails;
      this.maxPrice = this.singleFlight.audltSalePrice;
      this.inventoryCount = this.singleFlight.inventoryCount;
      this.changeLuggage();
      this.bookingInsuranceShowType = this.singleFlight.bookingInsuranceShowType;
      this.couponListRequest={};
      this.couponListRequest.bookingSource = getBookingSource();
      this.couponListRequest.suppSaleTypes = [];
      this.couponListRequest.suppSaleTypes.push(this.singleFlight.saleType);
      this.couponListRequest.couponConfigureRuleList = [];
      let couponConfigureRuleList={
        "deptCity":this.singleFlight.departureAirport.cityName,
        "arrivCity":this.singleFlight.arrivalAirport.cityName,
        "airlinesCode":this.singleFlight.carrierCode,
        "flightNo":this.singleFlight.flightNo
      };
      this.couponListRequest.couponConfigureRuleList.push(couponConfigureRuleList);
      if(this.singleFlight.carrierArticleDto!=null && this.singleFlight.carrierArticleDto!=""&& this.singleFlight.carrierArticleDto.length>0){
        this.carrierArticleDto = this.singleFlight.carrierArticleDto;
      }
      if (this.flightInfo.length == 2) {
        this.doubleFlight = this.flightInfo[1];
        // carrierCodes=carrierCodes+","+this.doubleFlight.carrierCode;
        if(this.doubleFlight.bookingNotes!=null && this.doubleFlight.bookingNotes!=""){
          this.bookingNotes=true;
        }
        if (this.doubleFlight.saleType == "RoundTripSpecial") {
          this.RoundTripSpecial = true;
        } else {
          this.RoundTripSpecial = false;
        }
        if(this.doubleFlight.carrierArticleDto!=null && this.doubleFlight.carrierArticleDto!=""&& this.doubleFlight.carrierArticleDto.length>0){
          if(this.carrierArticleDto.length>0){
            if(this.singleFlight.carrierCode!=this.doubleFlight.carrierCode){
              this.carrierArticleDto = this.carrierArticleDto.concat(this.doubleFlight.carrierArticleDto);
            }
          }else{
            this.carrierArticleDto = this.doubleFlight.carrierArticleDto;
          }
        }
        this.couponListRequest.suppSaleTypes.push(this.doubleFlight.saleType);
        let couponConfigureRuleList={
          "deptCity":this.doubleFlight.departureAirport.cityName,
          "arrivCity":this.doubleFlight.arrivalAirport.cityName,
          "airlinesCode":this.doubleFlight.carrierCode,
          "flightNo":this.doubleFlight.flightNo
        };
        this.couponListRequest.couponConfigureRuleList.push(couponConfigureRuleList);
        this.doubleFlight.adultPrice =
          Number(this.doubleFlight.adultTaxs) +
          Number(this.doubleFlight.adultFees);
        this.doubleFlight.childrenPrice =
          Number(this.doubleFlight.childrenTaxs) +
          Number(this.doubleFlight.childrenFees);
        if (
          this.doubleFlight.ticketRuleSimples[0].remark != null &&
          this.doubleFlight.ticketRuleSimples[0].remark != "" &&
          JSON.stringify(
            this.doubleFlight.ticketRuleSimples[0].simpleDetails
          ).indexOf("RM") == -1
        ) {
          let remark = {};
          remark.detailFeeDesc = this.doubleFlight.ticketRuleSimples[0].remark;
          remark.detailFeeType = "RM";
          remark.detailFeeTypeName = "备注";
          this.doubleFlight.ticketRuleSimples[0].simpleDetails.push(remark);
        }
        if (
          JSON.stringify(this.doubleFlight.ticketRuleSimples[0].simpleDetails).indexOf("SN") == -1
        ) {
          let seat = {};
              seat.detailFeeDesc = this.doubleFlight.seatClassName;
              seat.detailFeeType = "SN";
              seat.detailFeeTypeName = "舱位";
          this.doubleFlight.ticketRuleSimples[0].simpleDetails.splice(0,0,seat);
        }
        this.ticketRuleDetailListdet = this.doubleFlight.ticketRuleSimples[0].simpleDetails;
        let backLuggage = {};
        backLuggage.luggageInfo = this.doubleFlight.ticketRuleSimples[0].luggageInfo;
        backLuggage.luggageDesc = this.doubleFlight.ticketRuleSimples[0].luggageDesc;
        backLuggage.carrierCode = this.doubleFlight.carrierCode;
        backLuggage.passengerNum = this.doubleFlight.passengerNum;
        backLuggage.flightReimburseType = this.doubleFlight.flightReimburseType;

        this.backLuggageDesc = backLuggage;
        if (
          Number(this.singleFlight.audltSalePrice) <
          Number(this.doubleFlight.audltSalePrice)
        ) {
          this.maxPrice = this.doubleFlight.audltSalePrice;
        }
        if (
          this.singleFlight.inventoryCount > this.doubleFlight.inventoryCount
        ) {
          this.inventoryCount = this.doubleFlight.inventoryCount;
        }
        if (
          getStore("forJudgeRoundTripSpecialPrice") != null &&
          getStore("forJudgeRoundTripSpecialPrice") != "undefined" &&
          Number(JSON.parse(getStore("forJudgeRoundTripSpecialPrice"))) > 0
        ) {
          this.differentRoundTripSpecialPrice =
            Number(JSON.parse(getStore("forJudgeRoundTripSpecialPrice"))) -
            this.singleFlight.audltSalePrice;
        }
      } else {
        this.doubleFlight = null;
        this.backLuggageDesc = null;
        this.RoundTripSpecial = false;
      }
      let couponListRequestObj = {
          key: "couponListRequestObj",
          val: this.couponListRequest
        };
      try {
        this.initData(couponListRequestObj);
      } catch (e) {}
      this.reimburse = true;
      this.invoiceTitle = null;
      this.showInvoice = false;
      if (this.businessTravel == true) {
        this.reimburse = false;
      } else if (this.singleFlight.flightReimburseType == "NO_REIMBURSE") {
        this.reimburse = false;
      } else if (
        this.flightInfo.length == 2 &&
        this.doubleFlight.flightReimburseType == "NO_REIMBURSE"
      ) {
        this.reimburse = false;
      } else {
        if (this.flightInfo.length == 1) {
          if (
            this.singleFlight.flightReimburseType == "ITINERARY_AND_INVOICE"
          ) {
            this.invoiceTitle = true;
          } else if (this.singleFlight.flightReimburseType == "INVOICE") {
            this.showInvoice = true;
          } else if (this.singleFlight.flightReimburseType == "ITINERARY") {
            this.invoiceTitle = false;
          }
        } else if (this.flightInfo.length == 2) {
          if (
            this.singleFlight.flightReimburseType == "ITINERARY_AND_INVOICE" &&
            this.doubleFlight.flightReimburseType == "ITINERARY_AND_INVOICE"
          ) {
            this.invoiceTitle = true;
          } else if (
            this.singleFlight.flightReimburseType == "INVOICE" &&
            this.doubleFlight.flightReimburseType == "INVOICE"
          ) {
            this.showInvoice = true;
          } else if (
            this.singleFlight.flightReimburseType == "ITINERARY" &&
            this.doubleFlight.flightReimburseType == "ITINERARY"
          ) {
            this.invoiceTitle = false;
          } else if (
            (this.singleFlight.flightReimburseType == "ITINERARY_AND_INVOICE" &&
              this.doubleFlight.flightReimburseType == "INVOICE") ||
            (this.doubleFlight.flightReimburseType == "ITINERARY_AND_INVOICE" &&
              this.singleFlight.flightReimburseType == "INVOICE")
          ) {
            this.showInvoice = true;
          } else if (
            (this.singleFlight.flightReimburseType == "ITINERARY_AND_INVOICE" &&
              this.doubleFlight.flightReimburseType == "ITINERARY") ||
            (this.doubleFlight.flightReimburseType == "ITINERARY_AND_INVOICE" &&
              this.singleFlight.flightReimburseType == "ITINERARY")
          ) {
            this.invoiceTitle = false;
          } else if (
            (this.singleFlight.flightReimburseType == "ITINERARY" &&
              this.doubleFlight.flightReimburseType == "INVOICE") ||
            (this.singleFlight.flightReimburseType == "INVOICE" &&
              this.doubleFlight.flightReimburseType == "ITINERARY")
          ) {
            this.reimburse = false;
          }
        }
      }

      // else if(this.singleFlight.flightReimburseType=='ITINERARY_AND_INVOICE'){
      //     this.invoiceTitle=true;
      //     this.showInvoice=false;
      // }else if(this.flightInfo.length==2 && (this.doubleFlight.flightReimburseType=='ITINERARY_AND_INVOICE')){
      //     this.invoiceTitle=true;
      //     this.showInvoice=false;
      // }else if(this.singleFlight.flightReimburseType=='INVOICE'){
      //     this.showInvoice=true;
      //     this.invoiceTitle=false;
      // }else if(this.flightInfo.length==2 && (this.doubleFlight.flightReimburseType=='INVOICE')){
      //     this.showInvoice=true;
      //     this.invoiceTitle=false;
      // }else{
      //     this.invoiceTitle=false;
      //     this.showInvoice=false;
      // }
      if (getStore("taitou") == null) {
        this.taitou = {
          geren: true,
          gerenVal: null,
          qiyeVal: null,
          xycode: null
        };
      } else {
        this.taitou = JSON.parse(getStore("taitou"));
      }
    }
    this.orderRemark=null;
    if (getStore("orderRemark") != null&&getStore("orderRemark") != "") {
      this.orderRemark=getStore("orderRemark");
    }
    //校验当前城市时候支持接送机
    //接送机隐藏
    this.goCityAbleTransfer = false;
    this.arrivalCityAbleTransfer = false;
    // //出发城市
    // checkTransferCity(this.departureCity.code).then(res => {
    //   if (+res.code === 1) {
    //     this.goCityAbleTransfer = res.data;
    //   }
    // });
    // //到达城市
    // checkTransferCity(this.arrivalCity.code).then(res => {
    //   if (+res.code === 1) {
    //     this.arrivalCityAbleTransfer = res.data;
    //   }
    // });
    if (this.transferInfo == "" || this.transferInfo == undefined) {
      this.transferInfoTemp = {
        //接送机信息
        go: true, //是否为出发城市
        double: false, //是否为往返
        goCity: {
          name: "",
          code: ""
        },
        arrivalCity: {
          name: "",
          code: ""
        },
        goData: {
          send: {
            deptPlace: "", //出发地code
            sceneType: "SJ",
            flightTripType: "DEPARTURE",
            vasProductName: "",
            able: false, // 是否填接送机信息
            locationCode: "", //机场code  如机场id
            terminalCode: "", //航站楼名称
            poiInfo: {
              name: "", //地点名称
              address: "", //详细地址
              longitude: "", //经度
              latitude: "" //纬度
            },
            planeTime: "", //起飞时间
            planeCode: "", //航班号
            useTime: "", //用车时间
            locationType: "AIRPORT", //位置类型，枚举：AIRPORT(机场)，STATION(火车站名)
            airportName: "", //机场名称
            car: null, //车型信息
            needed: false //是否需要接送机
          },
          pick: {
            deptPlace: "", //出发地code
            sceneType: "JJ",
            flightTripType: "RETURN",
            vasProductName: "",
            able: false, //  是否填接送机信息
            locationCode: "", //机场code  如机场id
            terminalCode: "", //航站楼名称
            poiInfo: {
              name: "", //地点名称
              address: "", //详细地址
              longitude: "", //经度
              latitude: "" //纬度
            },
            planeTime: "", //到达时间
            planeCode: "", //航班号
            useTime: "", //用车时间
            locationType: "AIRPORT", //位置类型，枚举：AIRPORT(机场)，STATION(火车站名)
            airportName: "", //机场名称
            car: null, //车型信息
            needed: false //是否需要接送机
          }
        },
        arrivalData: {
          send: {
            deptPlace: "", //出发地code
            sceneType: "SJ",
            flightTripType: "RETURN",
            vasProductName: "",
            able: false, // 是否填接送机信息
            locationCode: "", //机场code  如机场id
            terminalCode: "", //航站楼名称
            poiInfo: {
              name: "", //地点名称
              address: "", //详细地址
              longitude: "", //经度
              latitude: "" //纬度
            },
            planeTime: "", //起飞时间
            planeCode: "", //航班号
            useTime: "", //用车时间
            locationType: "", //位置类型，枚举：AIRPORT(机场)，STATION(火车站名)
            airportName: "", //机场名称
            car: null, //车型信息
            needed: false //是否需要接送机
          },
          pick: {
            deptPlace: "", //出发地code
            sceneType: "JJ",
            flightTripType: "DEPARTURE",
            vasProductName: "",
            able: false, // 是否填接送机信息
            locationCode: "", //机场code  如机场id
            terminalCode: "", //航站楼名称
            poiInfo: {
              name: "", //地点名称
              address: "", //详细地址
              longitude: "", //经度
              latitude: "" //纬度
            },
            planeTime: "", //起飞时间
            planeCode: "", //航班号
            useTime: "", //用车时间
            locationType: "AIRPORT", //位置类型，枚举：AIRPORT(机场)，STATION(火车站名)
            airportName: "", //机场名称
            car: null, //车型信息
            needed: false //是否需要接送机
          }
        }
      };
      this.transferInfoTemp.goCity.name = this.departureCity.name;
      this.transferInfoTemp.goCity.code = this.departureCity.code;
      this.transferInfoTemp.arrivalCity.name = this.arrivalCity.name;
      this.transferInfoTemp.arrivalCity.code = this.arrivalCity.code;
      this.transferInfoTemp.double = this.isDouble;
      if (getStore("flightInfo") != null) {
        //接送机信息录入
        //出发城市送机
        this.transferInfoTemp.goData.send.deptPlace = this.departureCity.code;
        this.transferInfoTemp.goData.send.vasProductName = `${
          this.departureCity.name
        }-送机`;
        this.transferInfoTemp.goData.send.locationCode = this.singleFlight.departureAirport.departureAirportCode;
        this.transferInfoTemp.goData.send.terminalCode = this.singleFlight.departureAirport.code;
        this.transferInfoTemp.goData.send.planeTime = `${
          this.headInfo[0].departureDate
        } ${this.singleFlight.departureTime}`;
        this.transferInfoTemp.goData.send.planeCode = this.singleFlight.flightNo;
        this.transferInfoTemp.goData.send.airportName = this.singleFlight.departureAirport.flightName;
        //出发城市接机
        this.transferInfoTemp.arrivalData.pick.deptPlace = this.arrivalCity.code;
        this.transferInfoTemp.arrivalData.pick.vasProductName = `${
          this.arrivalCity.name
        }-接机`;
        this.transferInfoTemp.arrivalData.pick.locationCode = this.singleFlight.arrivalAirport.arrivalAirportCode;
        this.transferInfoTemp.arrivalData.pick.terminalCode = this.singleFlight.arrivalAirport.code;
        this.transferInfoTemp.arrivalData.pick.planeTime = this.headInfo[0].arrivalTime;
        this.transferInfoTemp.arrivalData.pick.useTime = new Date(
          formatIOSDate(this.headInfo[0].arrivalTime)
        ).getTime();
        this.transferInfoTemp.arrivalData.pick.planeCode = this.singleFlight.flightNo;
        this.transferInfoTemp.arrivalData.pick.airportName = this.singleFlight.arrivalAirport.flightName;

        if (this.flightInfo.length == 2) {
          //接送机信息录入
          //到达城市接机
          this.transferInfoTemp.goData.pick.deptPlace = this.arrivalCity.code;
          this.transferInfoTemp.goData.pick.vasProductName = `${
            this.departureCity.name
          }-接机`;
          this.transferInfoTemp.goData.pick.locationCode = this.doubleFlight.arrivalAirport.arrivalAirportCode;
          this.transferInfoTemp.goData.pick.terminalCode = this.doubleFlight.arrivalAirport.code;
          this.transferInfoTemp.goData.pick.planeTime = this.headInfo[1].arrivalTime;
          this.transferInfoTemp.goData.pick.useTime = new Date(
            formatIOSDate(this.headInfo[1].arrivalTime)
          ).getTime();
          this.transferInfoTemp.goData.pick.planeCode = this.doubleFlight.flightNo;
          this.transferInfoTemp.goData.pick.airportName = this.doubleFlight.arrivalAirport.flightName;
          //到达城市送机
          this.transferInfoTemp.arrivalData.send.deptPlace = this.arrivalCity.code;
          this.transferInfoTemp.arrivalData.send.vasProductName = `${
            this.arrivalCity.name
          }-送机`;
          this.transferInfoTemp.arrivalData.send.locationCode = this.doubleFlight.departureAirport.departureAirportCode;
          this.transferInfoTemp.arrivalData.send.terminalCode = this.doubleFlight.departureAirport.code;
          this.transferInfoTemp.arrivalData.send.planeTime = `${
            this.headInfo[1].departureDate
          } ${this.doubleFlight.departureTime}`;
          this.transferInfoTemp.arrivalData.send.planeCode = this.doubleFlight.flightNo;
          this.transferInfoTemp.arrivalData.send.airportName = this.doubleFlight.departureAirport.flightName;
        }
      }
    } else {
      this.transferInfoTemp = JSON.parse(JSON.stringify(this.transferInfo));
    }
    //乘机人列表
    // if(this.commonPersonMes==null || this.commonPersonMes=="" || this.commonPersonMes.length<=0){
    this.getCommonPerson();
    // }else{
    // this.personNumber=JSON.parse(getStore("flight_personNumber"));
    // this.computePrice();
    // }
    
    //获取通知参数
    getNotice(
      getNoticeSource(),
      "ORDER_FILL_PAGE",
      String(new Date(formatIOSDate(this.headInfo[0].departureDate)).getTime()),
      this.$store.state.departureCity.code,
      this.$store.state.arrivalCity.code,carrierCodes
    ).then(res => {
      if (+res.code === 1 && res.data.length > 0) {
        this.noticeArr = res.data;
      }
    });
    //获取保险列表
    let flightNos, orderAmount;
    if (this.headInfo.length > 1) {
      flightNos = this.headInfo[0].flightNo + "," + this.headInfo[1].flightNo;
      orderAmount =
        Number(this.singleFlight.audltSalePrice) >
        Number(this.doubleFlight.audltSalePrice)
          ? this.singleFlight.audltSalePrice
          : this.doubleFlight.audltSalePrice;
    } else {
      flightNos = this.headInfo[0].flightNo;
      orderAmount = this.singleFlight.audltSalePrice;
    }
    if (this.isKangLvUser == null || !this.isKangLvUser) {
      checkKangLvUser().then(kangLvRes => {
        if (+kangLvRes.code == 1) {
        	let tempKangLv = kangLvRes.data.isUserCard;
        	if (tempKangLv && this.businessTravel) {
        		tempKangLv = false;
        	}
          let tempKangLvobj = {
            key: "isKangLvUser",
            val: tempKangLv
          };
          try {
            this.initData(tempKangLvobj);
          } catch (e) {}
          this.handleInsuranceFunc(
            flightNos,
            orderAmount,
            tempKangLv
          );
          this.handleWorthCouponFunc();
        } else {
          let tempKangLvobj = {
            key: "isKangLvUser",
            val: null
          };
          try {
            this.initData(tempKangLvobj);
          } catch (e) {}
          this.handleInsuranceFunc(
            flightNos,
            orderAmount,
            null
          );
          this.handleWorthCouponFunc();
        }
      },() =>{
        console.log('kanglv fail')
        this.handleInsuranceFunc(flightNos, orderAmount, false);
        this.handleWorthCouponFunc();
      });
    } else {
      this.handleInsuranceFunc(flightNos, orderAmount, true);
      this.handleWorthCouponFunc();
    }

    //获取贵宾室
    if (
      getStore("productsGo") &&
      getStore("productsGo") != "" &&
      getStore("productsGo") != null
    ) {
      this.productsGo = JSON.parse(getStore("productsGo"));
      this.showWorthCouponN();
    } else {
      getVasList(
        this.headInfo[0].departureDate + " " + this.singleFlight.departureTime,
        this.singleFlight.departureAirport.departureAirportCode,
        this.singleFlight.departureAirport.code,
        getBookingSource(),
        this.singleFlight.audltSalePrice
      ).then(res => {
        if (+res.code === 1 && res.data.length > 0) {
          res.data[0].picked = false;
          this.productsGo = res.data[0];
          this.getServiceStorage("go");
        }
      });
    }

    if (this.flightInfo.length == 2) {
      if (
        getStore("productsBack") &&
        getStore("productsBack") != "" &&
        getStore("productsBack") != null
      ) {
        this.productsBack = JSON.parse(getStore("productsBack"));
        this.showWorthCouponN();
      } else {
        getVasList(
          this.headInfo[1].departureDate +
            " " +
            this.doubleFlight.departureTime,
          this.doubleFlight.departureAirport.departureAirportCode,
          this.doubleFlight.departureAirport.code,
          getBookingSource(),
          this.doubleFlight.audltSalePrice
        ).then(res => {
          if (+res.code === 1 && res.data.length > 0) {
            res.data[0].picked = false;
            this.productsBack = res.data[0];
            this.getServiceStorage("back");
          }
        });
      }
    }
    this.personTypeMessage = statisticsPersonType();
    this.personNumber = JSON.parse(getStore("flight_personNumber"));
    getStatisticsType("机票-填写订单页", "FlightFillOrder");
    if (getStore("goFlight") == "share") {
      getStatisticsType("机票_订单填写（特价机票城市列表）", "订单填写");
    }
    this.$nextTick(() => {
      // 这里面获取实时
      lQuery(".article")[0].addEventListener(
        "scroll",
        this.watchScrollLocation
      );
    });
    if (getStore("scrollTop") != null) {
      lQuery(".article")[0].scrollTop = getStore("scrollTop");
    }
    removeStore("scrollTop", this);
    //获取邮寄地址信息
    getMailAddress(this.userid).then(res => {
      if (+res.code === 1) {
        let allMailAddress = res.data;
        for (let i = 0; i < allMailAddress.length; i++) {
          allMailAddress[i].isChecked = false;
        }
        let chosenIndex = -1;
        if (
          this.chosenMailAddress != "" &&
          this.chosenMailAddress != undefined
        ) {
          for (let i = 0; i < allMailAddress.length; i++) {
            if (
              allMailAddress[i].address == this.chosenMailAddress.address &&
              allMailAddress[i].provinceId ==
                this.chosenMailAddress.provinceId &&
              allMailAddress[i].countyId == this.chosenMailAddress.countyId &&
              allMailAddress[i].cityId == this.chosenMailAddress.cityId
            ) {
              chosenIndex = i;
              allMailAddress[i].isChecked = true;
            }
          }
        }
        if (chosenIndex != -1) {
          let chosenObj = {
            key: "chosenMailAddress",
            val: allMailAddress[chosenIndex]
          };
          try {
            this.initData(chosenObj);
          } catch (e) {}
        } else {
          let chosenObj = {
            key: "chosenMailAddress",
            val: ""
          };
          try {
            this.initData(chosenObj);
          } catch (e) {}
        }
        let allMailAddressObj = {
          key: "allMailAddress",
          val: allMailAddress
        };
        try {
          this.initData(allMailAddressObj);
        } catch (e) {}
      }
    });
  },
  methods: {
    ...mapActions([
      "initData" //初始化时间
    ]),
    //监听滚动位置
    watchScrollLocation() {
      setStore("scrollTop", lQuery(".article")[0].scrollTop);
      this.scrollLocation = lQuery("#orderForm")[0].scrollTop;
    },
    //康旅卡保险处理逻辑
    handleKangLvInsurance(arr) {
      let insuranceList = arr;
      insuranceList.map((kindItem, kindIndex) => {
        let zeroIndex = [];
        kindItem.list.map((insuranceItem, insuranceIndex) => {
          if (insuranceItem.insurancePrice == 0) {
            zeroIndex.push(insuranceIndex);
          };
        });
        if (zeroIndex.length > 0) {
          for (let i = zeroIndex.length - 1; i >= 0; i--) {
            kindItem.list.splice(zeroIndex[i], 1);
          }
        }
      });
      this.insurance.map((item,index) => {
        if (item.insurancePrice == 0) {
          this.insurance.splice(index,1);
        }
      });
      insuranceList.map((kindItem, kindIndex) => {
        if (kindItem.title == '意外险') {
          let priceArr = [],defaultIndex = -1;
          kindItem.list.map((item, index) => {
            if (item.defaultRule == 'DEFAULT') {
              defaultIndex = index;
            }
            priceArr.push(item.insurancePrice);
          });
          if (defaultIndex == -1) {
            const NumAscSort = (a,b) => {
              return b - a;
            }
            priceArr = Array.from(new Set(priceArr)).sort(NumAscSort);
            console.log(priceArr)
            if (priceArr.length <= 1) {
              kindItem.list[0].picked = true;
              kindItem.pickedList = kindItem.list[0];
              this.insurance.push(kindItem.list[0]);
            } else {
              for (let i = 0, len = kindItem.list.length; i < len; i++) {
                if (kindItem.list[i].insurancePrice == priceArr[1]) {
                  kindItem.list[i].picked = true;
                  kindItem.pickedList = kindItem.list[i];
                  this.insurance.push(kindItem.list[i]);
                  break;
                }
              }
            }
          }
        }
      });
      this.changeEquity();
      return arr;
    },
    //康旅入口
    toKangLvPicker() {
		setStore("newWorthCoupons", true);
      this.$router.push(`/${this.$parent.baseUrlPath}/kangLvPicker`);
    },
    //保险处理逻辑
    handleInsuranceFunc(flightNos, orderAmount, kangLv) {
      if (this.insuranceListInfo != "" && this.insuranceListInfo.length > 0) {
        let insuranceListInfo = JSON.parse(
          JSON.stringify(this.insuranceListInfo)
        );
        this.insurance = [];
        for (let i = 0; i < insuranceListInfo.length; i++) {
          if (insuranceListInfo[i].list.length > 0) {
            insuranceListInfo[i].pickedList = [];
            for (let j = 0; j < insuranceListInfo[i].list.length; j++) {
              if (insuranceListInfo[i].list[j].picked == true) {
                this.insurance.push(insuranceListInfo[i].list[j]);
                insuranceListInfo[i].pickedList = insuranceListInfo[i].list[j];
              }
            }
          }
          if (insuranceListInfo[i].pickedList.length == 0) {
            insuranceListInfo[i].pickedList = insuranceListInfo[i].list[0];
          }
        }
        if(this.packageInfo!=null && this.packageInfo!=''){
          if(this.packageInfo.businessType=="INSURANCE"){
            let flage=-1;
            for(let i=0;i<insuranceListInfo.length;i++){
              if(insuranceListInfo[i].title == this.packageInfo.insuranceTypeName){
                for(let j=0;j<insuranceListInfo[i].list.length;j++){
                  if(insuranceListInfo[i].list[j].insuranceClass.id==this.packageInfo.id){
                    if(this.packageInfo.vstPrice == 'true'){
                      this.packageInfo.tagPrice = insuranceListInfo[i].list[j].insurancePrice;
                      console.log(this.packageInfo.tagPrice);
                    }
                    flage=j;
                    insuranceListInfo[i].list[j].picked = true;
                    insuranceListInfo[i].pickedList = insuranceListInfo[i].list[j];
                    insuranceListInfo[i].show=false;
                    if(this.insurance.length==0){
                      this.insurance.push(insuranceListInfo[i].pickedList);
                    }else{
                      let fl=false;
                      for(let s=0;s<this.insurance.length;s++){
                        if( this.insurance[s].insuranceTypeName==this.packageInfo.insuranceTypeName){
                          fl=true;
                          break;
                        }
                      }
                      if(!fl){
                        this.insurance.push(insuranceListInfo[i].pickedList);
                      }
                    }
                    this.showPackage = true;
                    if(this.packageInfo.vstPrice == 'true'){
                      this.showPackageName = true;
                      this.couponSwitch = false;
                    }
                    break;
                  }
                }
                break;
              }
            }

            if(flage>=0){
              for(let i=0;i<insuranceListInfo.length;i++){
                if(insuranceListInfo[i].insuranceTypeName == this.packageInfo.insuranceTypeName){
                  for(let j=0;j<insuranceListInfo[i].list.length;j++){
                    if(j!=flage){
                      insuranceListInfo[i].list[j].picked = false;
                    }
                  }
                  break;
                }
              }
            }

          }
        }
        let alertInsurance=false;
        let defaultInsurance=false;
        for(let i=0;i<insuranceListInfo.length;i++){
          for(let j=0;j<insuranceListInfo[i].list.length;j++){
            if(insuranceListInfo[i].list[j].defaultRule == "WINDOW") {
              this.alertInsurance = insuranceListInfo[i].list[j];
            }
            if(insuranceListInfo[i].list[j].defaultRule == "DEFAULT"){
              defaultInsurance = true;
            }
            if(insuranceListInfo[i].list[j].picked == true){
              alertInsurance=true;
            }
          }
        }
        if(alertInsurance||defaultInsurance){
          this.alertInsurance = null;
        }
        let insuranceObj = {
          key: "insuranceListInfo",
          val: insuranceListInfo
        };
        try {
          this.initData(insuranceObj);
        } catch (e) {}
        this.payMoney = this.totalPrices();
      } else {
        getInsurance(
          this.headInfo[0].departureDate,
          flightNos,
          getBookingSource(),
          orderAmount,
          this.singleFlight.seatClassCode,
          this.doubleFlight!=null&&this.doubleFlight!=''?this.doubleFlight.seatClassCode:''
        ).then(res => {
          if (+res.code === 1) {
            let allInsurance = res.data,
              insuranceKinds = [],
              dealedInsuranceList = [];
            this.insurance = [];
            for (let i = 0; i < allInsurance.length; i++) {
              allInsurance[i].picked = false;
              if (allInsurance[i].defaultRule == "DEFAULT") {
                allInsurance[i].picked = true;
              }
            }
            for (let i = 0; i < allInsurance.length; i++) {
              insuranceKinds.push(allInsurance[i].insuranceTypeName);
            }
            insuranceKinds = Array.from(new Set(insuranceKinds));
            for (let i = 0; i < insuranceKinds.length; i++) {
              let obj = {
                title: insuranceKinds[i],
                list: [],
                pickedList: [],
                show: true
              };
              for (let j = 0; j < allInsurance.length; j++) {
                if (allInsurance[j].insuranceTypeName == insuranceKinds[i]) {
                  if (allInsurance[j].picked == true) {
                    this.insurance.push(allInsurance[j]);
                    obj.pickedList = allInsurance[j];
                  }
                  obj.list.push(allInsurance[j]);
                }
              }
              if (obj.pickedList.length == 0) {
                for (let j = 0; j < allInsurance.length; j++) {
                  if (allInsurance[j].insuranceTypeName == insuranceKinds[i]) {
                    obj.pickedList = allInsurance[j];
                    break;
                  }
                }
              }
              dealedInsuranceList.push(obj);
            }
            //康旅卡强绑需放开
            if (kangLv && !this.businessTravel) {
              dealedInsuranceList = this.handleKangLvInsurance(
                dealedInsuranceList
              );
            }
            if(this.packageInfo!=null && this.packageInfo!=''){
              if(this.packageInfo.businessType=="INSURANCE"){
                let flage=-1;
                for(let i=0;i<dealedInsuranceList.length;i++){
                  if(dealedInsuranceList[i].title == this.packageInfo.insuranceTypeName){
                    for(let j=0;j<dealedInsuranceList[i].list.length;j++){
                      if(dealedInsuranceList[i].list[j].insuranceClass.id==this.packageInfo.id){
                        if(this.packageInfo.vstPrice == 'true'){
                          this.packageInfo.tagPrice = dealedInsuranceList[i].list[j].insurancePrice;
                          console.log(this.packageInfo.tagPrice);
                        }
                        flage=j;
                        dealedInsuranceList[i].list[j].picked = true;
                        dealedInsuranceList[i].pickedList = dealedInsuranceList[i].list[j];
                        dealedInsuranceList[i].show=false;
                        if(this.insurance.length==0){
                          this.insurance.push(dealedInsuranceList[i].pickedList);
                        }else{
                          let fl=false;
                          for(let s=0;s<this.insurance.length;s++){
                            if( this.insurance[s].insuranceTypeName==this.packageInfo.insuranceTypeName){
                              fl=true;
                              break;
                            }
                          }
                          if(!fl){
                            this.insurance.push(dealedInsuranceList[i].pickedList);
                          }
                        }
                        this.showPackage = true;
                        if(this.packageInfo.vstPrice == 'true'){
                          this.showPackageName = true;
                          this.couponSwitch = false;
                        }
                        break;
                      }
                    }
                    break;
                  }
                }

                if(flage>=0){
                  for(let i=0;i<dealedInsuranceList.length;i++){
                    if(dealedInsuranceList[i].insuranceTypeName == this.packageInfo.insuranceTypeName){
                      for(let j=0;j<dealedInsuranceList[i].list.length;j++){
                        if(j!=flage){
                          dealedInsuranceList[i].list[j].picked = false;
                        }
                      }
                      break;
                    }
                  }
                }

              }
            }
            let alertInsurance=false;
            for(let i=0;i<dealedInsuranceList.length;i++){
              for(let j=0;j<dealedInsuranceList[i].list.length;j++){
                if(dealedInsuranceList[i].list[j].defaultRule == "WINDOW") {
                  this.alertInsurance = dealedInsuranceList[i].list[j];
                }
                if(dealedInsuranceList[i].list[j].picked == true){
                  alertInsurance=true;
                }
              }
            }
            if(alertInsurance){
              this.alertInsurance = null;
            }
            let insuranceObj = {
              key: "insuranceListInfo",
              val: dealedInsuranceList
            };
            try {
              this.initData(insuranceObj);
            } catch (e) {}
            this.payMoney = this.totalPrices();
          }
        });
      }
    },
    //优惠券处理逻辑
    handleWorthCouponFunc() {
      //获取卖券列表
      if(this.businessTravel){
        return;
      }
      if (
        getStore("worthCoupons") &&
        getStore("worthCoupons") != "" &&
        getStore("worthCoupons") != null &&
        this.couponSwitch
      ) {
        this.worthCoupon(JSON.parse(getStore("worthCoupons")));
      } else {
        getVasCouponList(getVascouponSource(), "LVFLIGHT", this.maxPrice).then(
          res => {
            if (+res.code === 1 && res.data.length > 0) {
              this.worthCoupon(res.data);
            }
          }
        );
      }
    },
    //退改签事件
    clickChangeBack() {
      setStore("flightClick", true);
      getElementTag("订单填写_退改签", "机票订单填写");
      this.showChangeBack = true;
    },
    onChangeBack(data) {
      this.showChangeBack = false;
    },
    //行李额处理
    changeLuggage(){
      this.luggageMemo='';
      if(this.goLuggageDesc!=null && this.goLuggageDesc!='' && this.goLuggageDesc.carrierCode=='9C'){
          if(this.goLuggageDesc.luggageDesc!=null && this.goLuggageDesc.luggageDesc!=""){
            this.luggageMemo=this.goLuggageDesc.luggageDesc;
          }else{
            this.luggageMemo=`无免费托运行李额`;
          }
        }else{
            if(this.goLuggageDesc!=null && this.goLuggageDesc!='' && this.goLuggageDesc.luggageInfo!=null && this.goLuggageDesc.luggageInfo!=""){
                if(this.goLuggageDesc.luggageInfo.freeConsignAmount==0){
                    this.luggageMemo=`无免费托运行李额`;
                }else{
                    this.luggageMemo=`免费托运${this.goLuggageDesc.luggageInfo.freeConsignAmount}${this.goLuggageDesc.luggageInfo.luggageConsignType=='BY_WEIGHT'?'KG':'件'}`;
                }
                // if(this.goLuggageDesc.luggageInfo.freeConsignMemo!=''){
                //     this.luggageMemo=this.luggageMemo+","+this.goLuggageDesc.luggageInfo.freeConsignMemo;
                // }
            }
        }
    },
    //是否支持儿童事件
    clickChildren() {
      setStore("flightClick", true);
      this.childrenPriceClose = true;
    },
    onClickChildren(data) {
      this.childrenPriceClose = false;
    },
    //行李额事件
    clickLuggage() {
      setStore("flightClick", true);
      getElementTag("订单填写_行李额", "机票订单填写");
      this.luggageDescClose = true;
    },
    onClickLuggage(data) {
      this.luggageDescClose = false;
    },
    showTicketInfo() {
      setStore("flightClick", true);
      this.actInfo = !this.actInfo;
    },
    showPlaneTypeMes(flight) {
      this.planeType = flight;
      this.typeInfo = !this.typeInfo;
    },
    // 跳转到反馈意见页
    toFeedBack() {
      getElementTag("订单填写_反馈意见", "订单填写页");
      this.$router.push(`/${this.$parent.baseUrlPath}/feedBack/order`);
    },
    //默认卖券方法
    worthCoupon(worthCoupons, type) {
      for (let i = 0; i < worthCoupons.length; i++) {
        worthCoupons[i].picked = false;
        worthCoupons[i].show = true;
      }
      if (
        getStore("worthCoupons") &&
        getStore("worthCoupons") != "" &&
        getStore("worthCoupons") != null &&
        getStore("newWorthCoupons")
      ) {
        let worthCoupons1 = JSON.parse(getStore("worthCoupons"));
        for (let a = 0; a < worthCoupons1.length; a++) {
          for (let b = 0; b < worthCoupons.length; b++) {
            if (
              worthCoupons1[a].id == worthCoupons[b].id &&
              worthCoupons1[a].picked
            ) {
              worthCoupons[b].picked = true;
              // $scope.specialWorthPicked.push(worthCoupons[b]);
            }
          }
        }
      } else {
        if (this.isKangLvUser && !this.businessTravel) {
          worthCoupons[0].picked = true;
        } else {
	        for (let i = 0; i < worthCoupons.length; i++) {
	          if (worthCoupons[i].defaultRule == "DEFAULT") {
	            worthCoupons[i].picked = true;
	            // $scope.specialWorthPicked.push(worthCoupons[i]);
	          }
	        }
        }
      }
      if(this.packageInfo!=null && this.packageInfo!=''){
        if(this.packageInfo.businessType=="TICKET"){
          for(let i=0;i<worthCoupons.length;i++){
            if(worthCoupons[i].id==this.packageInfo.id){
              worthCoupons[i].picked = true;
              worthCoupons[i].show = false;
              this.showPackage = true;
              if(this.packageInfo.vstPrice == 'true'){
                this.showPackageName = true;
                this.couponSwitch = false;
                this.packageInfo.tagPrice =  worthCoupons[i].saleChannelPrices[0].channelSalePrice;
                console.log(this.packageInfo.tagPrice);
              }
              break;
            }
          }
        }
      }
      this.specialWorthInfos = worthCoupons;
      setStore("worthCoupons", this.specialWorthInfos);
      this.showWorthCouponN();
    },
    //点击卖券方法
    pickSpecialWorthItem(item) {
      setStore("flightClick", true);
      item.picked = !item.picked;
      // for (let i = 0; i < this.specialWorthInfos.length; i++) {
      //     if (this.specialWorthInfos[i].picked) {
      //         $scope.specialWorthPicked.push($scope.specialWorthInfos[i]);
      //     }
      // }
      setStore("worthCoupons", this.specialWorthInfos);
      setStore("newWorthCoupons", true);
      this.payMoney = this.totalPrices();
    },
    //展示卖券详情
    showSpecialWorthDetail(item) {
      setStore("flightClick", true);
      this.specialWorthItem = item;
      this.showSpecialWorthItem = true;
    },
    //默认贵宾室方法
    getServiceStorage(type) {
      if (type == "go") {
        if (
          getStore("productsGo") != "undefined" &&
          getStore("productsGo") != null &&
          getStore("newcheckProductGo")
        ) {
          let _checkProductGo = JSON.parse(getStore("productsGo"));
          if (_checkProductGo.id == this.productsGo.id) {
            this.productsGo.picked = true;
          } else {
            this.productsGo.picked = false;
          }
        } else {
          if (this.productsGo.defaultRule == "DEFAULT") {
            this.productsGo.picked = true;
          } else {
            this.productsGo.picked = false;
          }
        }
        setStore("productsGo", this.productsGo);
      } else if (type == "back") {
        // if(this.productsBack != null){
        if (
          getStore("productsBack") != "undefined" &&
          getStore("productsBack") != null &&
          getStore("newcheckProductBack")
        ) {
          let _checkProductback = JSON.parse(getStore("productsBack"));
          if (_checkProductback.id == this.productsBack.id) {
            this.productsBack.picked = true;
          } else {
            this.productsBack.picked = false;
          }
        } else {
          if (this.productsBack.defaultRule == "DEFAULT") {
            this.productsBack.picked = true;
          } else {
            this.productsBack.picked = false;
          }
        }
        setStore("productsBack", this.productsBack);
        // }
      }
      this.showWorthCouponN();
    },
    //点击去程贵宾室
    pickProductsGo() {
      setStore("flightClick", true);
      this.productsGo.picked = !this.productsGo.picked;
      setStore("productsGo", this.productsGo);
      if (this.productsGo.picked == true && this.oughtPayMoney() > 0) {
        this.changeEquity();
      } else {
        this.payMoney = this.totalPrices();
      }
    },
    //点击返程贵宾室
    pickProductsBack() {
      setStore("flightClick", true);
      this.productsBack.picked = !this.productsBack.picked;
      setStore("productsBack", this.productsBack);
      if (this.productsBack.picked == true && this.oughtPayMoney() > 0) {
        this.changeEquity();
      } else {
        this.payMoney = this.totalPrices();
      }
    },
    //点击返程贵宾室详情
    productsBackDetail() {
      setStore("flightClick", true);
      let serviceDetail = {
        key: "serviceDetail",
        val: this.productsBack
      };
      try {
        this.initData(serviceDetail);
      } catch (e) {}
      this.$router.push(`/${this.$parent.baseUrlPath}/serviceDetail`);
    },
    //点击去程贵宾室详情
    productsGoDetail() {
      setStore("flightClick", true);
      let serviceDetail = {
        key: "serviceDetail",
        val: this.productsGo
      };
      try {
        this.initData(serviceDetail);
      } catch (e) {}
      this.$router.push(`/${this.$parent.baseUrlPath}/serviceDetail`);
    },
    //展示几个卖券
    showWorthCouponN() {
      let sLength = 0,
        gLength = 0,
        bLength = 0;
      sLength =
        this.specialWorthInfos != null
          ? this.specialWorthInfos.length
          : sLength;
      gLength = this.productsGo != null ? 1 : gLength;
      bLength = this.productsBack != null ? 1 : bLength;
      if (sLength + gLength + bLength > 6) {
        this.specialWorthInfos = this.specialWorthInfos.slice(
          0,
          6 - gLength - bLength
        );
        setStore("worthCoupons", this.specialWorthInfos);
      }
      this.payMoney = this.totalPrices();
    },
    //选择发票抬头个人或者企业
    checkTaitou(type) {
      setStore("flightClick", true);
      if (type == "g") {
        this.taitou.geren = true;
      } else {
        this.taitou.geren = false;
      }
      setStore("taitou", this.taitou);
    },
    //选择保险凭证
    addressClick() {
      setStore("flightClick", true);
      let obj = {
        key: "needVoucher",
        val: ""
      };
      if (this.needVoucher) {
        obj.val = false;
      } else {
        obj.val = true;
      }
      try {
        this.initData(obj);
      } catch (e) {}
      this.payMoney = this.totalPrices();
    },
    //展示社会信用代码弹框
    showXyCode() {
      setStore("flightClick", true);
      this.showOKbuttom(
        "统一社会信用代码是一组长度为18位的用于法人和其他组织身份识别的代码。"
      );
    },
    //点击预订须知
    showReservationNotes(type) {
      setStore("flightClick", true);
      this.notes = type;
      this.showNotes = true;
    },
    //打开航司文件
    openPDF(val){
      if (
        navigator.userAgent.indexOf("Mobile") > 0 &&
        (navigator.userAgent.indexOf("iPhone OS") > 0 ||
          navigator.userAgent.indexOf("iPad") > 0) &&
        navigator.userAgent.indexOf("LVMM") > 0
      ){
          NativeUtil.lvCommon("lvJSGoClass",
              {
                  "className":"SystemWebbrower",
                  "url":`https://flight.lvmama.com/${val.fileUrl}`
              }
          )
      }else{
          window.open(`https://flight.lvmama.com/${val.fileUrl}`);
      }
    },
    //保存抬头输入信息
    changeGeren(type, val) {
      if (type == "g") {
        this.taitou.gerenVal = val;
      } else if (type == "q") {
        this.taitou.qiyeVal = val;
      } else if (type == "c") {
        this.taitou.xycode = val;
      }
      setStore("taitou", this.taitou);
    },
    changeOrderRemark(val){
      this.orderRemark=val;
      setStore("orderRemark", this.orderRemark);
    },
    //出发城市跳转接送机
    goCityTransfer() {
      setStore("flightClick", true);
      getElementTag("机票_订单填写页_接送机", "机票订单填写");
      this.transferInfoTemp.go = true;
      let transferObj = {
        key: "transferInfo",
        val: this.transferInfoTemp
      };
      try {
        this.initData(transferObj);
      } catch (e) {}
      this.$router.push(`/${this.$parent.baseUrlPath}/airportTransportation`);
    },
    //到达城市跳转接送机
    arrivalCityTransfer() {
      setStore("flightClick", true);
      getElementTag("机票_订单填写页_接送机", "机票订单填写");
      this.transferInfoTemp.go = false;
      let transferObj = {
        key: "transferInfo",
        val: this.transferInfoTemp
      };
      try {
        this.initData(transferObj);
      } catch (e) {}
      this.$router.push(`/${this.$parent.baseUrlPath}/airportTransportation`);
    },
    //联系人信息拼接
    getCommonPerson() {
      var that = this,
        year,
        month,
        day,
        birthday,
        ifAdultDate,
        headInfo,
        departureDate,
        persons = [],
        isadult = 0,
        commonPersonMes = [];
      getCommonPersonMes().then(res => {
        if (+res.code === 1) {
          commonPersonMes = res.data;
          if (commonPersonMes.length > 0) {
            for (let i = 0; i < commonPersonMes.length; i++) {
              commonPersonMes[i].isChecked = false;
              persons = that.selectedPersons || [];
              if (persons.length != 0) {
                if (persons.length > this.inventoryCount) {
                  persons = persons.slice(0, this.inventoryCount);
                }
                for (let j = 0; j < persons.length; j++) {
                  if (persons[j].receiverId == commonPersonMes[i].receiverId) {
                    commonPersonMes[i].isChecked = true;
                  }
                  if (
                    persons[j].certType == "ID" ||
                    persons[j].certType.replace(/\ /g, "") == "ID_CARD"
                  ) {
                    year = persons[j].certNo.substring(6, 10);
                    month = persons[j].certNo.substring(10, 12);
                    day = persons[j].certNo.substring(12, 14);
                    if (
                      Number(year) +
                        Number(that.singleFlight.minAdultAge || 12) +
                        "-" +
                        month +
                        "-" +
                        day <=
                      that.headInfo[0].departureDate
                    ) {
                      isadult += 1;
                    }
                  } else {
                    if (
                      Number(persons[j].birthday.substring(0, 4)) +
                        Number(that.singleFlight.minAdultAge || 12) +
                        persons[j].birthday.substring(4, 10) <=
                      that.headInfo[0].departureDate
                    ) {
                      isadult += 1;
                    }
                  }
                }
              }
              if (commonPersonMes[i].certType.replace(/\ /g, "") == "ID_CARD") {
                commonPersonMes[i].certType = "ID";
              } else if (
                commonPersonMes[i].certType.replace(/\ /g, "") == "HUZHAO"
              ) {
                commonPersonMes[i].certType = "PASSPORT";
              }
              if (commonPersonMes[i].certType == "ID") {
                year = commonPersonMes[i].certNo.substring(6, 10);
                month = commonPersonMes[i].certNo.substring(10, 12);
                day = commonPersonMes[i].certNo.substring(12, 14);
                birthday = year + "-" + month + "-" + day;
                ifAdultDate =
                  Number(year) +
                  Number(that.singleFlight.minAdultAge || 12) +
                  "-" +
                  month +
                  "-" +
                  day;
                headInfo = that.headInfo;
                departureDate = headInfo[0].departureDate;
                if (ifAdultDate <= departureDate) {
                  commonPersonMes[i].peopleType = "ADULT";
                } else {
                  commonPersonMes[i].peopleType = "CHILDREN";
                }
                commonPersonMes[i].birthday = birthday;
              } else {
                //成人儿童显示错误bug 逻辑修改
                departureDate = that.headInfo[0].departureDate;
                let adultDate =
                  Number(commonPersonMes[i].birthday.substring(0, 4)) +
                  Number(that.singleFlight.minAdultAge || 12) +
                  commonPersonMes[i].birthday.substring(4, 10);
                let childrenDate =
                  Number(commonPersonMes[i].birthday.substring(0, 4)) +
                  Number(that.singleFlight.minChildrenAge || 2) +
                  commonPersonMes[i].birthday.substring(4, 10);
                // let dd = Number(commonPersonMes[i].birthday.substring(8,10))+14;
                // let babyDate = commonPersonMes[i].birthday.substring(0,8)+dd;
                if (adultDate <= departureDate) {
                  commonPersonMes[i].peopleType = "ADULT";
                } else {
                  commonPersonMes[i].peopleType = "CHILDREN";
                }
                commonPersonMes[i].birthday = commonPersonMes[
                  i
                ].birthday.substring(0, 10);
              }
              //新增乘客逻辑
              if (
                getStore("flight_addPerson_info") != null &&
                getStore("flight_addPerson_info") != "undefined"
              ) {
                let addMes = JSON.parse(getStore("flight_addPerson_info")),
                  addAll = JSON.parse(getStore("addALL")) || [];
                if (addMes.peopleType == "CHILD") {
                  addMes.peopleType = "CHILDREN";
                }
                if (
                  addMes.receiverName == commonPersonMes[i].receiverName &&
                  addMes.certNo == commonPersonMes[i].certNo &&
                  addMes.birthday == commonPersonMes[i].birthday
                ) {
                  let childrenDate =
                      Number(addMes.birthday.substring(0, 4)) +
                      Number(that.singleFlight.minChildrenAge || 2) +
                      addMes.birthday.substring(4, 10),
                    oldDate =
                      Number(addMes.birthday.substring(0, 4)) +
                      Number(that.singleFlight.maxAdultAge || 70) +
                      addMes.birthday.substring(4, 10),
                    adultDates =
                      Number(addMes.birthday.substring(0, 4)) +
                      Number(that.singleFlight.minAdultAge || 12) +
                      addMes.birthday.substring(4, 10),
                    departureDate = that.headInfo[0].departureDate;
                  if (
                    childrenDate <= departureDate &&
                    oldDate > departureDate
                  ) {
                    if (adultDates > departureDate && isadult == 0) {
                    } else {
                      commonPersonMes[i].isChecked = true;
                      persons.push(commonPersonMes[i]);
                      addAll.push(commonPersonMes[i]);
                      setStore("addALL", addAll);
                    }
                  }
                  let selectedPersons = {
                    key: "selectedPersons",
                    val: persons
                  };
                  try {
                    that.initData(selectedPersons);
                  } catch (e) {}
                  // setStore("selectedPersons",JSON.stringify(persons));
                  removeStore("flight_addPerson_info", that);
                }
              }
              let reg = /^[a-zA-Z]+$/; //验证是否为字母
              let ter = /^([\u4E00-\u9FA5]+,?)+$/; //验证中文
              let regs = /^[0-9a-zA-Z]+$/; //验证是否是数字加中文
              if (
                commonPersonMes[i].certType == "" ||
                commonPersonMes[i].certNo == "" ||
                commonPersonMes[i].birthday == "" ||
                commonPersonMes[i].receiverName == ""
              ) {
                commonPersonMes[i].isChecked = -1;
              } else if (
                commonPersonMes[i].certType != "ID" &&
                commonPersonMes[i].certType != "ID_CARD" &&
                commonPersonMes[i].certType != "PASSPORT" &&
                commonPersonMes[i].certType != "HUZHAO" &&
                commonPersonMes[i].certType != "GANGAO" &&
                commonPersonMes[i].certType != "HUIXIANG" &&
                commonPersonMes[i].certType != "TAIBAO" &&
                commonPersonMes[i].certType != "OFFICER" &&
                commonPersonMes[i].certType != "SOLDIER" &&
                commonPersonMes[i].certType != "TAIBAOZHENG" &&
                commonPersonMes[i].certType != "OTHER" &&
                commonPersonMes[i].certType != "RPGA" &&
                commonPersonMes[i].certType != "RPTW" &&
                commonPersonMes[i].certType != "GANGAORESIDENCE" &&
                commonPersonMes[i].certType != "TAIBAORESIDENCE"
                
              ) {
                commonPersonMes[i].isChecked = -1;
              } else if (
                commonPersonMes[i].certType == "ID" ||
                commonPersonMes[i].certType == "ID_CARD"
              ) {
                if (!isIDcard(commonPersonMes[i].certNo.toUpperCase())) {
                  commonPersonMes[i].isChecked = -1;
                }
              }else if (
                commonPersonMes[i].certType == "RPTW" ||
                commonPersonMes[i].certType == "RPGA" || commonPersonMes[i].certType == "GANGAORESIDENCE" ||
                commonPersonMes[i].certType == "TAIBAORESIDENCE"
              ) {
                if (commonPersonMes[i].certNo.length!=18) {
                  commonPersonMes[i].isChecked = -1;
                }
              }
              if (
                commonPersonMes[i].receiverName.length > 26 ||
                commonPersonMes[i].receiverName.length < 2
              ) {
                commonPersonMes[i].isChecked = -1;
              } else {
                if (!regs.test(commonPersonMes[i].certNo)) {
                  commonPersonMes[i].isChecked = -1;
                }
              }

              if (commonPersonMes[i].receiverName.indexOf("/") >= 0) {
                if (commonPersonMes[i].receiverName.indexOf("/") == 0) {
                  commonPersonMes[i].isChecked = -1;
                } else {
                  if (
                    !reg.test(
                      commonPersonMes[i].receiverName.replace("/", "")
                    ) ||
                    commonPersonMes[i].receiverName.indexOf("/") ==
                      commonPersonMes[i].receiverName.length - 1
                  ) {
                    commonPersonMes[i].isChecked = -1;
                  }
                }
              } else {
                if (
                  !ter.test(commonPersonMes[i].receiverName) &&
                  !reg.test(
                    commonPersonMes[i].receiverName.replace(
                      /[\u4e00-\u9fa5]/gi,
                      ""
                    )
                  )
                ) {
                  commonPersonMes[i].isChecked = -1;
                }
                if (reg.test(commonPersonMes[i].receiverName)) {
                  commonPersonMes[i].isChecked = -1;
                }
              }
              if (
                commonPersonMes[i].receiverName.indexOf("先生") != -1 ||
                commonPersonMes[i].receiverName.indexOf("女士") != -1 ||
                commonPersonMes[i].receiverName.indexOf("小姐") != -1
              ) {
                commonPersonMes[i].isChecked = -1;
              }
            }
            //判断当前成绩人是否还在常用乘机人列表中
            for (
              var commonPersonMesId = [], n = 0;
              n < commonPersonMes.length;
              n++
            ) {
              commonPersonMesId.push(commonPersonMes[n].receiverId);
            }
            for (var m = 0; m < persons.length; m++) {
              if (commonPersonMesId.indexOf(persons[m].receiverId) == -1) {
                persons.splice(m, 1);
                m--;
              }
            }
          }
          let temp = [],
            addAll = JSON.parse(getStore("addALL"));
          if (addAll) {
            for (let a = 0; a < addAll.length; a++) {
              for (let b = 0; b < commonPersonMes.length; b++) {
                if (
                  addAll[a].receiverName == commonPersonMes[b].receiverName &&
                  addAll[a].certNo == commonPersonMes[b].certNo &&
                  addAll[a].birthday == commonPersonMes[b].birthday
                ) {
                  temp.push(commonPersonMes[b]);
                  commonPersonMes.splice(b, 1);
                }
              }
            }
          }

          for (let c = 0; c < temp.length; c++) {
            commonPersonMes.unshift(temp[c]);
          }
          if (persons.length > 0) {
            for (let i = 0; i < commonPersonMes.length; i++) {
              for (let j = persons.length - 1; j >= 0; j--) {
                if (persons[j].receiverId == commonPersonMes[i].receiverId) {
                  if (commonPersonMes[i].isChecked != -1) {
                    persons[j] = commonPersonMes[i];
                  } else {
                    persons.splice(j, 1);
                  }
                  break;
                }
              }
            }
          }

          // setStore("commonPersonMes",commonPersonMes);
          let commonPerson = {
            key: "commonPersonMes",
            val: commonPersonMes
          };
          try {
            that.initData(commonPerson);
          } catch (e) {}
          let selectedPersons = {
            key: "selectedPersons",
            val: persons
          };
          try {
            that.initData(selectedPersons);
          } catch (e) {}
          // setStore("selectedPersons",persons);
          that.checkPeopleProvisions();
          // that.personTypeMessage=statisticsPersonType();
          // that.personNumber=JSON.parse(getStore("flight_personNumber"));
          // that.computePrice();
          // return commonPersonMes;
        }
      });
    },
    //删除乘机人
    removePerson(index) {
      setStore("flightClick", true);
      var adultNumber = 0;
      var childrenNumber = 0;
      for (var i = 0; i < this.selectedPersons.length; i++) {
        if (this.selectedPersons[i].peopleType == "ADULT") {
          adultNumber++;
        } else {
          childrenNumber++;
        }
      }
      for (var i = 0; i < this.commonPersonMes.length; i++) {
        if (
          this.commonPersonMes[i].receiverId ==
          this.selectedPersons[index].receiverId
        ) {
          if (
            childrenNumber != 0 &&
            adultNumber == 1 &&
            this.selectedPersons[index].peopleType == "ADULT"
          ) {
            this.showOKbuttom("友情提醒：儿童出行需成人陪同");
            return;
          } else {
            this.commonPersonMes[i].isChecked = false;
            this.selectedPersons.splice(index, 1);
          }
          break;
        }
      }
      let commonPerson = {
        key: "commonPersonMes",
        val: this.commonPersonMes
      };
      try {
        this.initData(commonPerson);
      } catch (e) {}
      let selectedPersons = {
        key: "selectedPersons",
        val: this.selectedPersons
      };
      try {
        this.initData(selectedPersons);
      } catch (e) {}
      this.personTypeMessage = statisticsPersonType();
      this.personNumber = JSON.parse(getStore("flight_personNumber"));
      this.computePrice();
    },
    //校验乘机人数量，年龄是否合规
    checkPeopleProvisions() {
      let selectedPersons = this.selectedPersons;
      let departureDate = this.headInfo[0].departureDate,
        number = 0,
        adultNum = 0,
        childNum = 0;
      let flightLastNumber = this.inventoryCount;
      let flag = true;
      if (
        selectedPersons != null &&
        selectedPersons != "" &&
        selectedPersons.length > 0
      ) {
        for (let i = 0; i < selectedPersons.length; i++) {
          if (selectedPersons[i].certType == "ID") {
            let year = selectedPersons[i].certNo.substring(6, 10),
              month = selectedPersons[i].certNo.substring(10, 12),
              day = selectedPersons[i].certNo.substring(12, 14);
            // 出生日期强制按身份证计算
            selectedPersons[i].birthday = year + "-" + month + "-" + day;
          }
          let adultDate =
            Number(selectedPersons[i].birthday.substring(0, 4)) +
            Number(this.singleFlight.minAdultAge || 12) +
            selectedPersons[i].birthday.substring(4, 10);
          let childrenDate =
            Number(selectedPersons[i].birthday.substring(0, 4)) +
            Number(this.singleFlight.minChildrenAge || 2) +
            selectedPersons[i].birthday.substring(4, 10);
          let oldDate =
            Number(selectedPersons[i].birthday.substring(0, 4)) +
            Number(this.singleFlight.maxAdultAge || 70) +
            selectedPersons[i].birthday.substring(4, 10);
          let dd = Number(selectedPersons[i].birthday.substring(8, 10)) + 14;
          let babyDate = selectedPersons[i].birthday.substring(0, 8) + dd;
          if (childrenDate > departureDate && departureDate >= babyDate) {
            //婴儿
            flag = false;
            break;
          }
          if (departureDate < babyDate) {
            flag = false;
            break;
          }
          if (oldDate <= departureDate) {
            flag = false;
            break;
          }
          number = number + 1;
          let adult =
            Number(selectedPersons[i].birthday.substring(0, 4)) +
            Number(this.singleFlight.minAdultAge || 12) +
            selectedPersons[i].birthday.substring(4, 10);
          let child =
            Number(selectedPersons[i].birthday.substring(0, 4)) +
            Number(this.singleFlight.minChildrenAge || 2) +
            selectedPersons[i].birthday.substring(4, 10);

          if (departureDate > adult) {
            adultNum = adultNum + 1;
          }
          if (departureDate >= child && departureDate < adult) {
            childNum = childNum + 1;
          }
        }
        if (
          this.singleFlight.childrenSalePrice == 0 ||
          (this.flightInfo.length == 2 &&
            this.doubleFlight.childrenSalePrice == 0)
        ) {
          if (childNum > 0) {
            flag = false;
          }
        }
        //最多人数
        if (number > this.singleFlight.maxPassenger) {
          flag = false;
        } else if (
          this.doubleFlight != null &&
          number > this.doubleFlight.maxPassenger
        ) {
          flag = false;
        } else if (adultNum > this.singleFlight.maxAdultNumber) {
          //最多成人数
          flag = false;
        } else if (
          this.doubleFlight != null &&
          adultNum > this.doubleFlight.maxAdultNumber
        ) {
          flag = false;
        } else if (childNum > this.singleFlight.maxChildrenNumber) {
          //最多儿童数
          flag = false;
        } else if (
          this.doubleFlight != null &&
          childNum > this.doubleFlight.maxChildrenNumber
        ) {
          flag = false;
        } else if (
          adultNum > 0 &&
          childNum > adultNum * this.singleFlight.childrenNumber
        ) {
          //成人最多携带儿童数量
          flag = false;
        } else if (
          this.doubleFlight != null &&
          adultNum > 0 &&
          childNum > adultNum * this.doubleFlight.childrenNumber
        ) {
          flag = false;
        }
        if (flag == false) {
          for (let i = 0; i < this.commonPersonMes.length; i++) {
            if (this.commonPersonMes[i].isChecked == true) {
              this.commonPersonMes[i].isChecked = false;
            }
          }
          let commonPerson = {
            key: "commonPersonMes",
            val: this.commonPersonMes
          };
          try {
            this.initData(commonPerson);
          } catch (e) {}
          let selectedPersons = {
            key: "selectedPersons",
            val: []
          };
          try {
            this.initData(selectedPersons);
          } catch (e) {}
          this.personTypeMessage = statisticsPersonType();
          this.personNumber = JSON.parse(getStore("flight_personNumber"));
          this.computePrice();
        } else {
          this.personTypeMessage = statisticsPersonType();
          this.personNumber = JSON.parse(getStore("flight_personNumber"));
          this.computePrice();
        }
      } else {
        this.personTypeMessage = statisticsPersonType();
        this.personNumber = JSON.parse(getStore("flight_personNumber"));
        this.computePrice();
      }
    },
    //展示保险详情
    showDetail(item) {
      this.clickInsuranceDetail = true;
      this.insuranceDetail = item.pickedList;
      this.isShowDetail = true;
    },
    closeDetail() {
      this.isShowDetail = false;
    },
    //查看保险文件
    toinsurance() {
      let that = this;
      if (
        navigator.userAgent.indexOf("Mobile") > 0 &&
        (navigator.userAgent.indexOf("iPhone OS") > 0 ||
          navigator.userAgent.indexOf("iPad") > 0) &&
        navigator.userAgent.indexOf("LVMM") > 0
      ) {
        NativeUtil.lvCommon("lvJSGoClass", {
          className: "SystemWebbrower",
          url: that.insuranceDetail.insuranceUrl
        });
      } else {
        window.open(that.insuranceDetail.insuranceUrl);
      }
    },
    //选择乘机人
    checkChange(index, type) {
      setStore("flightClick", true);
      if (this.commonPersonMes[index].isChecked == -1 && type == "orderForm") {
        //跳转至修改乘机人页面
        this.toPassengerEdit(this.commonPersonMes[index]);
        return;
      }
      let departureDate = this.headInfo[0].departureDate,
        number = 0,
        adultNum = 0,
        childNum = 0;
      let flightLastNumber = this.inventoryCount;
      this.commonPersonMes[index].isChecked = !this.commonPersonMes[index]
        .isChecked;
      if (this.commonPersonMes[index].certType == "ID") {
        let year = this.commonPersonMes[index].certNo.substring(6, 10),
          month = this.commonPersonMes[index].certNo.substring(10, 12),
          day = this.commonPersonMes[index].certNo.substring(12, 14);
        // 出生日期强制按身份证计算
        this.commonPersonMes[index].birthday = year + "-" + month + "-" + day;
      }
      let adultDate =
        Number(this.commonPersonMes[index].birthday.substring(0, 4)) +
        Number(this.singleFlight.minAdultAge || 12) +
        this.commonPersonMes[index].birthday.substring(4, 10);
      let childrenDate =
        Number(this.commonPersonMes[index].birthday.substring(0, 4)) +
        Number(this.singleFlight.minChildrenAge || 2) +
        this.commonPersonMes[index].birthday.substring(4, 10);
      let oldDate =
        Number(this.commonPersonMes[index].birthday.substring(0, 4)) +
        Number(this.singleFlight.maxAdultAge || 70) +
        this.commonPersonMes[index].birthday.substring(4, 10);
      let dd =
        Number(this.commonPersonMes[index].birthday.substring(8, 10)) + 14;
      let babyDate = this.commonPersonMes[index].birthday.substring(0, 8) + dd;
      if (childrenDate > departureDate && departureDate >= babyDate) {
        //婴儿
        this.showOKbuttom(
          `友情提示：预订婴儿票（0-${this.singleFlight.minChildrenAge ||
            2}岁），请联系航空公司购票！`
        );
        this.commonPersonMes[index].isChecked = !this.commonPersonMes[index]
          .isChecked;
        return;
      }
      if (departureDate < babyDate) {
        this.showOKbuttom("乘机人年龄不在可售范围内，请选择其他交通方式。");
        this.commonPersonMes[index].isChecked = !this.commonPersonMes[index]
          .isChecked;
        return;
      }
      if (oldDate <= departureDate) {
        this.showOKbuttom(
          `友情提醒：超过${this.singleFlight.maxAdultAge ||
            70}岁的乘机人，请联系航空公司购票！`
        );
        this.commonPersonMes[index].isChecked = !this.commonPersonMes[index]
          .isChecked;
        return;
      }
      for (let i = 0; i < this.commonPersonMes.length; i++) {
        if (this.commonPersonMes[i].isChecked == true) {
          number = number + 1;
          let adult =
            Number(this.commonPersonMes[i].birthday.substring(0, 4)) +
            Number(this.singleFlight.minAdultAge || 12) +
            this.commonPersonMes[i].birthday.substring(4, 10);
          let child =
            Number(this.commonPersonMes[i].birthday.substring(0, 4)) +
            Number(this.singleFlight.minChildrenAge || 2) +
            this.commonPersonMes[i].birthday.substring(4, 10);

          if (departureDate > adult) {
            adultNum = adultNum + 1;
          }
          if (departureDate >= child && departureDate < adult) {
            childNum = childNum + 1;
          }
        }
      }
      if (this.commonPersonMes[index].peopleType == "CHILDREN") {
        if (adultNum == 0) {
          this.showOKbuttom("友情提醒：儿童出行需成人陪同");
          this.commonPersonMes[index].isChecked = !this.commonPersonMes[index]
            .isChecked;
          return;
        } else {
          if (
            this.singleFlight.childrenSalePrice == 0 ||
            (this.flightInfo.length == 2 &&
              this.doubleFlight.childrenSalePrice == 0)
          ) {
            this.showNObuttom("该航班暂不支持儿童票购买！");
            this.commonPersonMes[index].isChecked = !this.commonPersonMes[index]
              .isChecked;
            return;
          }
        }
      } else {
        if (
          this.commonPersonMes[index].isChecked == false &&
          adultNum == 0 &&
          childNum > 0
        ) {
          this.showOKbuttom("友情提醒：儿童出行需成人陪同");
          this.commonPersonMes[index].isChecked = !this.commonPersonMes[index]
            .isChecked;
          return;
        }
      }
      //最多人数
      if (number > this.singleFlight.maxPassenger) {
        this.showNObuttom(`最多可选${this.singleFlight.maxPassenger}名乘客`);
        this.commonPersonMes[index].isChecked = !this.commonPersonMes[index]
          .isChecked;
        return;
      } else if (
        this.doubleFlight != null &&
        number > this.doubleFlight.maxPassenger
      ) {
        this.showNObuttom(`最多可选${this.doubleFlight.maxPassenger}名乘客`);
        this.commonPersonMes[index].isChecked = !this.commonPersonMes[index]
          .isChecked;
        return;
      }
      //最多成人数
      if (adultNum > this.singleFlight.maxAdultNumber) {
        this.showNObuttom(
          `该产品最多可选${this.singleFlight.maxAdultNumber}名成人`
        );
        this.commonPersonMes[index].isChecked = !this.commonPersonMes[index]
          .isChecked;
        return;
      } else if (
        this.doubleFlight != null &&
        adultNum > this.doubleFlight.maxAdultNumber
      ) {
        this.showNObuttom(
          `该产品最多可选${this.doubleFlight.maxAdultNumber}名成人`
        );
        this.commonPersonMes[index].isChecked = !this.commonPersonMes[index]
          .isChecked;
        return;
      }
      //最多儿童数
      if (childNum > this.singleFlight.maxChildrenNumber) {
        this.showNObuttom(
          `该产品最多可选${this.singleFlight.maxChildrenNumber}名儿童`
        );
        this.commonPersonMes[index].isChecked = !this.commonPersonMes[index]
          .isChecked;
        return;
      } else if (
        this.doubleFlight != null &&
        childNum > this.doubleFlight.maxChildrenNumber
      ) {
        this.showNObuttom(
          `该产品最多可选${this.doubleFlight.maxChildrenNumber}名儿童`
        );
        this.commonPersonMes[index].isChecked = !this.commonPersonMes[index]
          .isChecked;
        return;
      }
      //成人最多携带儿童数量
      if (
        adultNum > 0 &&
        childNum > adultNum * this.singleFlight.childrenNumber
      ) {
        this.showNObuttom(
          `该产品1个成人最多带${this.singleFlight.childrenNumber}名儿童`
        );
        this.commonPersonMes[index].isChecked = !this.commonPersonMes[index]
          .isChecked;
        return;
      } else if (
        this.doubleFlight != null &&
        adultNum > 0 &&
        childNum > adultNum * this.doubleFlight.childrenNumber
      ) {
        this.showNObuttom(
          `该产品1个成人最多带${this.doubleFlight.childrenNumber}名儿童`
        );
        this.commonPersonMes[index].isChecked = !this.commonPersonMes[index]
          .isChecked;
        return;
      }
      if (number > flightLastNumber) {
        this.showNObuttom(
          `对不起，当前舱位仅剩${flightLastNumber}张票，请修改乘机人数`
        );
        this.commonPersonMes[index].isChecked = !this.commonPersonMes[index]
          .isChecked;
        return;
      }
      for (let i = 0; i < this.commonPersonMes.length; i++) {
        if (
          index != i &&
          this.commonPersonMes[index].certNo ==
            this.commonPersonMes[i].certNo &&
          this.commonPersonMes[index].certType ==
            this.commonPersonMes[i].certType &&
          this.commonPersonMes[index].isChecked == true &&
          this.commonPersonMes[i].isChecked == true
        ) {
          this.showNObuttom(
            `证件号不能相同:${this.commonPersonMes[index].certNo}`
          );
          this.commonPersonMes[index].isChecked = false;
          return;
        }
      }
      // if (type == 'orderForm') {
      // 	this.finishPassengersChose('noJump');
      // }
      let personList = [];
      for (let i = 0; i < this.commonPersonMes.length; i++) {
        if (this.commonPersonMes[i].isChecked == true) {
          personList.push(this.commonPersonMes[i]);
        }
      }
      let commonPerson = {
        key: "commonPersonMes",
        val: this.commonPersonMes
      };
      try {
        this.initData(commonPerson);
      } catch (e) {}
      let selectedPersons = {
        key: "selectedPersons",
        val: personList
      };
      try {
        this.initData(selectedPersons);
      } catch (e) {}
      this.personTypeMessage = statisticsPersonType();
      this.personNumber = JSON.parse(getStore("flight_personNumber"));
      this.computePrice();
    },
    //算价
    computePrice(equipmentNo, type) {
      let that = this,
        phone = that.contactPhone;
      if (phone != null && phone != "") {
        phone = removeBlank(phone);
      }
      var routeType = "OW",
        flightInfo,
        persons = [],
        headInfo = that.headInfo,
        passengerDetailDtos = [];
      //航班详情
      let orderBookingDetailRequests = [];
      if (
        getStore("orderBookingDetailRequests") != null &&
        getStore("orderBookingDetailRequests") != "undefined"
      ) {
        orderBookingDetailRequests = JSON.parse(
          getStore("orderBookingDetailRequests")
        );
      }
      if (that.flightInfo != null && that.flightInfo != "[]") {
        flightInfo = that.flightInfo;
        if (flightInfo.length == 2) {
          routeType = "RT";
        }
      }
      //乘机人信息
      if (
        that.selectedPersons != null &&
        that.selectedPersons != "[]" &&
        that.selectedPersons.length > 0
      ) {
        persons = that.selectedPersons;
      }
      // else if(JSON.parse(storage.getItem("webpop"))!=null){
      //     persons=JSON.parse(storage.getItem("webpop"));
      // }
      let isadult = 0,
        isCHILDREN = 0;
      try {
        for (let i = 0; i < persons.length; i++) {
          let adultDate =
            Number(persons[i].birthday.substring(0, 4)) +
            12 +
            persons[i].birthday.substring(4, 10);
          if (adultDate <= headInfo[0].departureDate) {
            isadult += 1;
          } else {
            isCHILDREN += 1;
          }
        }
      } catch (e) {}
      if (
        getStore("flight_addPerson_info") != null &&
        getStore("flight_addPerson_info") != "undefined"
      ) {
        let addMes = JSON.parse(getStore("flight_addPerson_info"));
        let childrenDate =
            Number(addMes.birthday.substring(0, 4)) +
            Number(that.singleFlight.minChildrenAge || 2) +
            addMes.birthday.substring(4, 10),
          oldDate =
            Number(addMes.birthday.substring(0, 4)) +
            Number(that.singleFlight.maxAdultAge || 70) +
            addMes.birthday.substring(4, 10),
          adultDates =
            Number(addMes.birthday.substring(0, 4)) +
            Number(this.singleFlight.minAdultAge || 12) +
            addMes.birthday.substring(4, 10),
          departureDate = that.singleFlight.departDate;
        if (childrenDate <= departureDate && oldDate > departureDate) {
          if (adultDates > departureDate && isadult == 0) {
          } else {
            if (addMes.peopleType == "CHILD") {
              addMes.peopleType = "CHILDREN";
            }
            let webpersons = {};
            webpersons.birthday = addMes.birthday;
            webpersons.passengerType = addMes.peopleType;
            webpersons.receiverName = addMes.receiverName;
            webpersons.certNo = addMes.certNo;
            webpersons.cellphone = addMes.mobileNumber;
            persons.push(webpersons);
          }
        }
      }
      if (persons == null || persons.length == 0) {
        let webpersons = {};
        webpersons.birthday = "1990-01-01";
        webpersons.passengerType = "ADULT";
        webpersons.receiverName = "";
        webpersons.certNo = "";
        webpersons.cellphone = "";
        persons.push(webpersons);
      }
      for (var i = 0; i < persons.length; i++) {
        for (var j = 0; j < flightInfo.length; j++) {
          var orderPassenger = {};
          if (j == 0) {
            orderPassenger.flightTripType = "DEPARTURE";
          } else {
            orderPassenger.flightTripType = "RETURN";
          }
          try {
            var adultDate =
              Number(persons[i].birthday.substring(0, 4)) +
              12 +
              persons[i].birthday.substring(4, 10);
            if (adultDate <= headInfo[0].departureDate) {
              orderPassenger.passengerType = "ADULT";
            } else {
              orderPassenger.passengerType = "CHILDREN";
            }
          } catch (e) {
            orderPassenger.passengerType = persons[i].peopleType; //TODO "ADULT"
          }

          /** 保险信息 **/
          var insuranceInfo = that.insurance;
          var inlist = [];
          // if(insuranceInfo!=undefined && insuranceInfo!='') {
          //     for (var a = insuranceInfo.length; a >= 0 ; a--) {
          //         if (insuranceInfo[a] == null) {
          //             insuranceInfo.splice(a, 1);
          //         }
          //     }
          // }
          if (insuranceInfo != undefined && insuranceInfo != "") {
            for (var a = 0; a < insuranceInfo.length; a++) {
              if (insuranceInfo[a] != null) {
                inlist.push({
                  insuranceInfoId: insuranceInfo[a],
                  flightNo: headInfo[j].flightNo
                });
              }
            }
          }
          orderPassenger.insuranceCalculatRequests = inlist;
          var flightSimpleInfo = {},
            flightTicketRequest = {},
            flightTicketPriceDto = {};
          flightTicketPriceDto.passengerType = orderPassenger.passengerType;
          if (flightInfo[0].saleType == "RoundTripSpecial") {
            if (orderPassenger.passengerType == "ADULT") {
              flightTicketPriceDto.salesPrice =
                (flightInfo[j].audltSalePrice + flightInfo[j].adultFees + flightInfo[j].adultTaxs) / 2;
              flightTicketPriceDto.airportFee = flightInfo[j].adultFees / 2;
              flightTicketPriceDto.fuelsurTax = flightInfo[j].adultTaxs / 2;
              flightTicketPriceDto.totalParPrice =
                (flightInfo[j].parPrice + flightInfo[j].adultFees + flightInfo[j].adultTaxs) / 2;
              flightTicketPriceDto.originalSalesPrice =
                (flightInfo[j].audltSalePrice + flightInfo[j].adultFees + flightInfo[j].adultTaxs) / 2;
              flightTicketPriceDto.settlePrice =
                (flightInfo[j].audltSalePrice + flightInfo[j].adultFees + flightInfo[j].adultTaxs) / 2;
              flightTicketPriceDto.profitAmount = 0;
              flightTicketPriceDto.parPrice = flightInfo[j].parPrice / 2;
              flightTicketPriceDto.promotion = flightInfo[j].promotion / 2;
            } else {
              flightTicketPriceDto.salesPrice =
                (flightInfo[j].childrenSalePrice + flightInfo[j].childrenFees + flightInfo[j].childrenTaxs) /
                2;
              flightTicketPriceDto.airportFee = flightInfo[j].childrenFees / 2;
              flightTicketPriceDto.fuelsurTax = flightInfo[j].childrenTaxs / 2;
              flightTicketPriceDto.totalParPrice =
                (flightInfo[j].parPrice + flightInfo[j].childrenFees + flightInfo[j].childrenTaxs) / 2;
              flightTicketPriceDto.originalSalesPrice =
                (flightInfo[j].childrenSalePrice + flightInfo[j].childrenFees + flightInfo[j].childrenTaxs) /
                2;
              flightTicketPriceDto.settlePrice =
                (flightInfo[j].childrenSalePrice + flightInfo[j].childrenFees + flightInfo[j].childrenTaxs) /
                2;
              flightTicketPriceDto.profitAmount = 0;
              flightTicketPriceDto.parPrice =
                (flightInfo[j].childrenSalePrice + flightInfo[j].childrenFees + flightInfo[j].childrenTaxs) /
                2;
              flightTicketPriceDto.promotion = 0;
            }
          } else {
            if (orderPassenger.passengerType == "ADULT") {
              flightTicketPriceDto.salesPrice =
                flightInfo[j].audltSalePrice + flightInfo[j].adultFees + flightInfo[j].adultTaxs;
              flightTicketPriceDto.airportFee = flightInfo[j].adultFees;
              flightTicketPriceDto.fuelsurTax = flightInfo[j].adultTaxs;
              flightTicketPriceDto.totalParPrice =
                flightInfo[j].parPrice + flightInfo[j].adultFees + flightInfo[j].adultTaxs;
              flightTicketPriceDto.originalSalesPrice =
                flightInfo[j].audltSalePrice + flightInfo[j].adultFees + flightInfo[j].adultTaxs;
              flightTicketPriceDto.settlePrice =
                flightInfo[j].audltSalePrice + flightInfo[j].adultFees + flightInfo[j].adultTaxs;
              flightTicketPriceDto.profitAmount = 0;
              flightTicketPriceDto.parPrice = flightInfo[j].parPrice;
              flightTicketPriceDto.promotion = flightInfo[j].promotion;
            } else {
              flightTicketPriceDto.salesPrice =
                flightInfo[j].childrenSalePrice + flightInfo[j].childrenFees + flightInfo[j].childrenTaxs;
              flightTicketPriceDto.airportFee = flightInfo[j].childrenFees;
              flightTicketPriceDto.fuelsurTax = flightInfo[j].childrenTaxs;
              flightTicketPriceDto.totalParPrice =
                flightInfo[j].parPrice + flightInfo[j].childrenFees + flightInfo[j].childrenTaxs;
              flightTicketPriceDto.originalSalesPrice =
                flightInfo[j].childrenSalePrice + flightInfo[j].childrenFees + flightInfo[j].childrenTaxs;
              flightTicketPriceDto.settlePrice =
                flightInfo[j].childrenSalePrice + flightInfo[j].childrenFees + flightInfo[j].childrenTaxs;
              flightTicketPriceDto.profitAmount = 0;
              flightTicketPriceDto.parPrice =
                flightInfo[j].childrenSalePrice + flightInfo[j].childrenFees + flightInfo[j].childrenTaxs;
              flightTicketPriceDto.promotion = 0;
            }
          }

          flightTicketRequest.carrierCode = flightInfo[j].carrierCode;
          flightTicketRequest.seatClassCode =
            orderBookingDetailRequests[j].seatClassCode;
          flightTicketRequest.departureAirportCode =
            flightInfo[j].departureAirport.departureAirportCode;
          flightTicketRequest.arrivalAirportCode =
            flightInfo[j].arrivalAirport.arrivalAirportCode;
          flightTicketRequest.departureDate = new Date(
            headInfo[j].departureDate.replace(/-/g, "/")
          ).getTime();
          flightTicketRequest.bookingSource = getBookingSource();
          flightTicketRequest.flightNo = flightInfo[j].flightNo;
          flightTicketRequest.pricePolicyId =
            orderBookingDetailRequests[j].policyId;
          flightTicketRequest.passengerType = orderPassenger.passengerType;
          flightTicketRequest.saleType = orderBookingDetailRequests[j].saleType;
          if (orderPassenger.passengerType == "ADULT") {
            flightTicketRequest.segmentFlag =
              orderBookingDetailRequests[j].segmentFlag;
          } else {
            flightTicketRequest.segmentFlag =
              orderBookingDetailRequests[j].childSegmentFlag;
          }

          flightTicketRequest.shoppingId =
            orderBookingDetailRequests[j].shoppingId;
          flightTicketRequest.flightTicketPriceDto = flightTicketPriceDto;

          flightSimpleInfo.departureAirportCode =
            flightInfo[j].departureAirport.departureAirportCode;
          flightSimpleInfo.arrivalAirportCode =
            flightInfo[j].arrivalAirport.arrivalAirportCode;
          flightSimpleInfo.departureDate = new Date(
            headInfo[j].departureDate.replace(/-/g, "/")
          ).getTime();
          flightSimpleInfo.carrierCode = flightInfo[j].carrierCode;
          flightSimpleInfo.flightNo = flightInfo[j].flightNo;
          flightSimpleInfo.passengerType = orderPassenger.passengerType;
          flightSimpleInfo.bookingSource = getBookingSource();
          flightSimpleInfo.seatClassCode =
            orderBookingDetailRequests[j].seatClassCode;
          flightSimpleInfo.pricePolicyId =
            orderBookingDetailRequests[j].policyId;
          flightSimpleInfo.flightTicketRequest = flightTicketRequest;
          flightSimpleInfo.flightTicketPriceDto = flightTicketPriceDto;

          orderPassenger.flightSimpleInfo = flightSimpleInfo;

          passengerDetailDtos.push(orderPassenger);
        }
      }
      //快递信息 差旅不用传快递信息 &&window.location.search.indexOf('isBusinessTravel=true') == -1
      var orderExpress = {};
      if (
        getStore("flight_expressMes") != null &&
        getStore("flight_expressMes") != undefined &&
        this.businessTravel != true
      ) {
      } else {
        orderExpress = null;
      }
      //卖券
      var specialWorthPickedID = [];
      if (
        getStore("worthCoupons") &&
        getStore("worthCoupons") != "" &&
        getStore("worthCoupons") != "undefined"
      ) {
        var worthCoupons = JSON.parse(getStore("worthCoupons"));
        for (var i = 0; i < worthCoupons.length; i++) {
          if (worthCoupons[i].picked) {
            specialWorthPickedID.push({
              salesPrice: worthCoupons[i].saleChannelPrices[0].channelSalePrice
            });
          }
        }
      }
      var data = {
        passengerDetailDtos: passengerDetailDtos, //航班信息
        changeSupp: orderExpress == null ? "false" : "true", //是否邮寄
        vasCouponList: specialWorthPickedID, //购买优惠券
        bookingSource: getBookingSource(),
        customerId: getStore("selectuserid"),
        customerCode: getStore("selectid"),
        equipmentNo: getStore("equipmentNo") || "", //设备号
        contactPersonMobile: phone //联系人手机
      };
      if (orderExpress != null) {
        data.expressRequest = orderExpress;
      }
      // var postData={
      //     "param":data
      // }
      this.doAmountCalculator(data);
    },
    //促销活动
    getActive(data) {
      //接口返回活动信息
      let activityList = JSON.parse(data).amountCalculatorDto
        .flightPromotionActivityDtos;
      this.pickedActive = "";
      if (activityList != null && activityList.length > 0) {
        for (let i = 0; i < activityList.length; i++) {
          activityList[i].picked = false;
        }
        //缓存活动信息
        if (
          this.activeList != null &&
          this.activeList != "" &&
          this.activeList.length > 0
        ) {
          let flag = false,
            flage = false;
          for (let i = 0; i < this.activeList.length; i++) {
            for (let j = 0; j < activityList.length; j++) {
              if (
                this.activeList[i].id == activityList[j].id &&
                this.activeList[i].picked == true
              ) {
                activityList[j].picked = true;
                this.pickedActive = activityList[j];
                flag = true;
                break;
              } else {
                activityList[j].picked = false;
              }
            }
            if (flag) {
              break;
            }
          }
          for (let i = 0; i < this.activeList.length; i++) {
            if (this.activeList[i].picked == true) {
              flage = true;
              break;
            }
          }
          if (this.pickedActive != "") {
            if (
              this.activeList[0] &&
              this.activeList[0].click == true &&
              this.pickedActive.exclusive == "Y"
            ) {
              if (this.coupon != "" && this.coupon.discountAmount > 0) {
                if (this.coupon.click != true) {
                  let cps = JSON.parse(JSON.stringify(this.coupon));
                  cps.discountAmount = null;
                  let cp = {
                    key: "coupon",
                    val: cps
                  };
                  try {
                    this.initData(cp);
                  } catch (e) {}
                } else {
                  this.pickedActive = "";
                }
              }
            } else {
              if (
                this.coupon != "" &&
                (this.coupon.discountAmount <= 0 ||
                  this.coupon.discountAmount == null)
              ) {
                if (this.coupon.quantity == 2) {
                  validateCoupon(
                    this.coupon.couponCode,
                    getStore("selectuserid") != null
                      ? getStore("selectuserid")
                      : "",
                    getStore("oughtPayMoney"),this.couponListRequest
                  ).then(data => {
                    if (
                      data &&
                      data.data &&
                      data.data.first &&
                      data.data.second.youhuiAmount > 0
                    ) {
                      let cps = JSON.parse(JSON.stringify(this.coupon));
                      cps.discountAmount = data.data.second.youhuiAmount;
                      let cp = {
                        key: "coupon",
                        val: cps
                      };
                      try {
                        this.initData(cp);
                      } catch (e) {}
                    }
                  });
                } else {
                  for (let i = 0; i < this.couponList.length; i++) {
                    if (
                      this.coupon.couponCode == this.couponList[i].couponCode
                    ) {
                      let cps = JSON.parse(JSON.stringify(this.coupon));
                      cps.discountAmount = this.couponList[i].discountAmount;
                      let cp = {
                        key: "coupon",
                        val: cps
                      };
                      try {
                        this.initData(cp);
                      } catch (e) {}
                      break;
                    }
                  }
                }
                if (
                  this.pickedActive.exclusive == "Y" &&
                  this.coupon.click != true
                ) {
                  let cps = JSON.parse(JSON.stringify(this.coupon));
                  cps.discountAmount = null;
                  let cp = {
                    key: "coupon",
                    val: cps
                  };
                  try {
                    this.initData(cp);
                  } catch (e) {}
                }
              } else if (
                this.coupon != "" &&
                this.coupon.discountAmount > 0 &&
                this.coupon.click == true
              ) {
                if (this.pickedActive.exclusive == "Y") {
                  this.pickedActive = "";
                }
              }
            }
          }
          if (!flag && flage == true) {
            // && this.activeList[0] && this.activeList[0].click!=true
            let max = activityList[0];
            for (let i = 0; i < activityList.length; i++) {
              activityList[i].picked = false;
              if (activityList[i].discountAmount > max.discountAmount) {
                max = activityList[i];
              }
            }
            max.picked = true;
            this.pickedActive = max;
            if (this.coupon != "" && this.coupon.discountAmount > 0) {
              if (this.pickedActive.exclusive == "Y") {
                let cps = JSON.parse(JSON.stringify(this.coupon));
                cps.discountAmount = null;
                let cp = {
                  key: "coupon",
                  val: cps
                };
                try {
                  this.initData(cp);
                } catch (e) {}
              }
            }
          }
          if (this.pickedActive == "") {
            if (
              this.coupon != "" &&
              (this.coupon.discountAmount == null ||
                this.coupon.discountAmount <= 0)
            ) {
              if (this.coupon.quantity == 2) {
                validateCoupon(
                  this.coupon.couponCode,
                  getStore("selectuserid") != null
                    ? getStore("selectuserid")
                    : "",
                  getStore("oughtPayMoney"),this.couponListRequest
                ).then(data => {
                  if (
                    data &&
                    data.data &&
                    data.data.first &&
                    data.data.second.youhuiAmount > 0
                  ) {
                    let cps = JSON.parse(JSON.stringify(this.coupon));
                    cps.discountAmount = data.data.second.youhuiAmount;
                    let cp = {
                      key: "coupon",
                      val: cps
                    };
                    try {
                      this.initData(cp);
                    } catch (e) {}
                  }
                });
              } else {
                for (let i = 0; i < this.couponList.length; i++) {
                  if (this.coupon.couponCode == this.couponList[i].couponCode) {
                    let cps = JSON.parse(JSON.stringify(this.coupon));
                    cps.discountAmount = this.couponList[i].discountAmount;
                    let cp = {
                      key: "coupon",
                      val: cps
                    };
                    try {
                      this.initData(cp);
                    } catch (e) {}
                    break;
                  }
                }
              }
            }
          }
        } else {
          let max = activityList[0];
          for (let i = 0; i < activityList.length; i++) {
            activityList[i].picked = false;
            if (activityList[i].discountAmount > max.discountAmount) {
              max = activityList[i];
            }
          }
          max.picked = true;
          this.pickedActive = max;
          if (this.coupon != "" && this.coupon.discountAmount > 0) {
            if (this.pickedActive.exclusive == "Y") {
              let cps = JSON.parse(JSON.stringify(this.coupon));
              cps.discountAmount = null;
              let cp = {
                key: "coupon",
                val: cps
              };
              try {
                this.initData(cp);
              } catch (e) {}
            }
          }
        }
        if (this.activeList[0] && this.activeList[0].click == true) {
          activityList[0].click = true;
        }
        let active = {
          key: "activeList",
          val: activityList
        };
        try {
          this.initData(active);
        } catch (e) {}
      } else {
        let active = {
          key: "activeList",
          val: []
        };
        try {
          this.initData(active);
        } catch (e) {}
        if (
          this.coupon != "" &&
          (this.coupon.discountAmount == null ||
            this.coupon.discountAmount <= 0)
        ) {
          if (this.coupon.quantity == 2) {
            validateCoupon(
              this.coupon.couponCode,
              getStore("selectuserid") != null ? getStore("selectuserid") : "",
              getStore("oughtPayMoney"),this.couponListRequest
            ).then(data => {
              if (
                data &&
                data.data &&
                data.data.first &&
                data.data.second.youhuiAmount > 0
              ) {
                let cps = JSON.parse(JSON.stringify(this.coupon));
                cps.discountAmount = data.data.second.youhuiAmount;
                let cp = {
                  key: "coupon",
                  val: cps
                };
                try {
                  this.initData(cp);
                } catch (e) {}
              }
            });
          } else {
            for (let i = 0; i < this.couponList.length; i++) {
              if (this.coupon.couponCode == this.couponList[i].couponCode) {
                let cps = JSON.parse(JSON.stringify(this.coupon));
                cps.discountAmount = this.couponList[i].discountAmount;
                let cp = {
                  key: "coupon",
                  val: cps
                };
                try {
                  this.initData(cp);
                } catch (e) {}
                break;
              }
            }
          }
        }
      }
      if (this.pickedActive == "") {
        setStore("pickedActive", true);
      } else {
        removeStore("pickedActive", this);
      }
    },
    doAmountCalculator(data) {
      let that = this;
      that.$parent.showLoading = true;
      amountCalculator(data).then(
        res => {
          if (+res.code === 1 && res.data[0] != null) {
            //活动接口
            that.getActive(res.data);
            var calculator = JSON.parse(res.data).calculatorDetailDtos;
            // var activityList = JSON.parse(storage.getItem("myAct"));
            // if (activityList!=null&&activityList.length>0) {
            //     for (var i = 0; i < activityList.length; i++) {
            //         if(activityList[i].isChecked){
            //             $scope.orderDirectReductionAmount=activityList[i].discountAmount;
            //         }
            //     }
            // }
            // storage.setItem("orderDirectReductionAmount",$scope.orderDirectReductionAmount);
            // 真往返判断条件
            if (that.singleFlight.saleType != "RoundTripSpecial") {
              var orderBooking = JSON.parse(
                getStore("orderBookingDetailRequests")
              );
              for (var i = 0; i < calculator.length; i++) {
                if (calculator[i].flag == that.singleFlight.flightNo) {
                  //去程
                  if (calculator[i].passengerType == "CHILDREN") {
                    //儿童
                    that.singleFlight.childrenSalePrice =
                      +calculator[i].parPrice - +calculator[i].promotion;
                    that.flightInfo[0].childrenSalePrice =
                      +calculator[i].parPrice - +calculator[i].promotion;
                    orderBooking[0].childSalePrice =
                      +calculator[i].parPrice - +calculator[i].promotion;
                    orderBooking[0].childParPrice = calculator[i].parPrice;
                  } else if (calculator[i].passengerType == "ADULT") {
                    //成人
                    that.singleFlight.audltSalePrice =
                      that.showPriceFlag == true
                        ? +calculator[i].parPrice
                        : +calculator[i].parPrice - +calculator[i].promotion;
                    that.flightInfo[0].audltSalePrice =
                      that.showPriceFlag == true
                        ? +calculator[i].parPrice
                        : +calculator[i].parPrice - +calculator[i].promotion;
                   
                    that.singleFlight.promotion = +calculator[i].promotion;
                    that.flightInfo[0].promotion = +calculator[i].promotion;
                    orderBooking[0].salesPrice = calculator[i].salesPrice;
                    orderBooking[0].parPrice = calculator[i].parPrice;
                  }
                } else if (calculator[i].flag == that.doubleFlight.flightNo) {
                  //返程
                  if (calculator[i].passengerType == "CHILDREN") {
                    //儿童
                    that.doubleFlight.childrenSalePrice =
                      +calculator[i].parPrice - +calculator[i].promotion;
                    that.flightInfo[1].childrenSalePrice =
                      +calculator[i].parPrice - +calculator[i].promotion;
                    orderBooking[1].childSalePrice =
                      +calculator[i].parPrice - +calculator[i].promotion;
                    orderBooking[1].childParPrice = calculator[i].parPrice;
                  } else if (calculator[i].passengerType == "ADULT") {
                    //成人
                    that.doubleFlight.audltSalePrice =
                      that.showPriceFlag == true
                        ? +calculator[i].parPrice
                        : +calculator[i].parPrice - +calculator[i].promotion;
                    that.flightInfo[1].audltSalePrice =
                      that.showPriceFlag == true
                        ? +calculator[i].parPrice
                        : +calculator[i].parPrice - +calculator[i].promotion;
                    that.doubleFlight.promotion = +calculator[i].promotion;
                    that.flightInfo[1].promotion = +calculator[i].promotion;
                  }
                }
              }
              //storage.setItem('orderBookingDetailRequests',JSON.stringify(orderBooking));
            }
            setStore("flightInfo", that.flightInfo);
            // that.payMoney=that.totalPrices();
          } else {
            removeStore("activeList", that);
            // that.payMoney=that.totalPrices();
          }
          that.$parent.showLoading = false;
          that.changeEquity();
        },
        () => {
          that.$parent.showLoading = false;
          removeStore("activeList", that);
          // that.payMoney=that.totalPrices();
          that.changeEquity();
        }
      );
    },
    //展示金额明细
    showPriceMes() {
      setStore("flightClick", true);
      this.downClass = !this.downClass;
      getElementTag("订单填写_价格详情", "机票订单填写");
    },
    //支付总额计算
    totalPrices() {
      let flightInfo,
        expressMes,
        expressMoney = 0,
        payMoney,
        persons,
        ADULTNumber = 0,
        CHILDRENNumber = 0,
        couponMoney = 0,
        serviceMoney = 0,
        specialWorthMoney = 0,
        that = this,
        showOld = true;
      persons = that.selectedPersons;
      if (persons.length <= 0) {
        return 0;
      }
      for (var i = 0; i < persons.length; i++) {
        if (persons[i].peopleType == "ADULT") {
          ADULTNumber = ADULTNumber + 1;
        } else {
          CHILDRENNumber = CHILDRENNumber + 1;
        }
        if (
          Number(persons[i].birthday.substring(0, 4)) +
            Number(that.singleFlight.maxAdultAge || 70) +
            persons[i].birthday.substring(4, 10) <=
          that.headInfo[0].departureDate
        ) {
          showOld = false;
        }
      }
      if (showOld == false) {
        if (this.showOldMessage == "") {
          this.showOldMessage = true;
        }
      } else {
        this.showOldMessage == "";
      }
      flightInfo = that.flightInfo;
      //保险凭证
      if (
        that.needVoucher == true &&
        that.reimburse == true &&
        that.businessTravel != true
      ) {
        expressMoney = 10;
      }
      //基建燃油
      let childrenPrice =
        Number(flightInfo[0].childrenTaxs) + Number(flightInfo[0].childrenFees);
      let adultPrice =
        Number(flightInfo[0].adultTaxs) + Number(flightInfo[0].adultFees);
      //保险
      let insuranceInfo = that.insurance,
        insurancePrice = 0,
        showPackageNamePrice = 0;
      if (insuranceInfo != undefined && insuranceInfo != "") {
        for (var i = 0; i < insuranceInfo.length; i++) {
          if (insuranceInfo[i] != null) {
            if(that.showPackageName==true && that.packageInfo!=null && that.packageInfo.businessType=='INSURANCE'&& that.packageInfo.id==insuranceInfo[i].insuranceClass.id){
              showPackageNamePrice=Number(insuranceInfo[i].insurancePrice);
            }
              insurancePrice =insurancePrice + Number(insuranceInfo[i].insurancePrice);
          }
        }
      }
      insurancePrice = insurancePrice * persons.length * flightInfo.length;
      showPackageNamePrice = showPackageNamePrice * persons.length * flightInfo.length;
      that.insuranceAllMoney=insurancePrice-showPackageNamePrice;
      if (insurancePrice > 0) {
        let insuranceRight =
          that.rightInsuranceList.length > 0
            ? that.couponRightPrice(
                that.rightInsurance,
                insurancePrice,
                "insurance"
              )
            : 0;
        that.insuranceCouponPrice = insuranceRight;
        insurancePrice = +(insurancePrice - insuranceRight);
        if (insurancePrice <= 0) {
          insurancePrice = 0;
        }
      }

      //优惠券
      if (
        that.coupon != "" &&
        that.coupon.discountAmount != null &&
        that.couponSwitch == true &&
        persons.length > 0
      ) {
        couponMoney = that.coupon.discountAmount;
      }
      //贵宾室、
      if (that.productsGo != null && that.productsGo.picked == true) {
        serviceMoney =
          Number(that.productsGo.saleChannelPrices[0].channelSalePrice) *
          persons.length;
      }
      if (that.productsBack != null && that.productsBack.picked == true) {
        serviceMoney =
          serviceMoney +
          Number(that.productsBack.saleChannelPrices[0].channelSalePrice) *
            persons.length;
      }
      if (serviceMoney > 0) {
        let serviceRight =
          that.airportVipLoungeList.length > 0
            ? that.couponRightPrice(
                that.airportVipLounge,
                serviceMoney,
                "airportVip"
              )
            : 0;
        that.airportVipCouponPrice = serviceRight;
        serviceMoney = +(serviceMoney - serviceRight);
        if (serviceMoney <= 0) {
          serviceMoney = 0;
        }
      }

      //卖券
      that.specialWorthMoney=0;
      that.hideSpecialWorth=false;
      if (that.specialWorthInfos != null) {
        for (let i = 0; i < that.specialWorthInfos.length; i++) {
          if (that.specialWorthInfos[i].picked == true) {
            if(that.showPackageName==true && that.packageInfo!=null && that.packageInfo.businessType=='TICKET'&& that.packageInfo.id==that.specialWorthInfos[i].id){
              if(that.specialWorthInfos.length==1){
                 that.hideSpecialWorth=true;
              }
            }else{
              specialWorthMoney += +that.specialWorthInfos[i].saleChannelPrices[0].channelSalePrice;
            }
          }
        }
      }
      that.specialWorthMoney=specialWorthMoney;
      //接送机
      var transferInfo = that.transferInfoTemp,
        transferInfoPrice = 0;
      if (transferInfo != "") {
        if (transferInfo.goData.send.able) {
          transferInfoPrice =
            transferInfoPrice + Number(transferInfo.goData.send.car.salePrice);
        }
        if (transferInfo.goData.pick.able) {
          transferInfoPrice =
            transferInfoPrice + Number(transferInfo.goData.pick.car.salePrice);
        }
        if (transferInfo.arrivalData.send.able) {
          transferInfoPrice =
            transferInfoPrice +
            Number(transferInfo.arrivalData.send.car.salePrice);
        }
        if (transferInfo.arrivalData.pick.able) {
          transferInfoPrice =
            transferInfoPrice +
            Number(transferInfo.arrivalData.pick.car.salePrice);
        }
      }
      that.transferMoney=transferInfoPrice;
      if (transferInfoPrice > 0) {
        let transferRight =
          that.trafficTransferList.length > 0
            ? that.couponRightPrice(
                that.trafficTransfer,
                transferInfoPrice,
                "transfer"
              )
            : 0;
        that.transferCouponPrice = transferRight;
        transferInfoPrice = +(transferInfoPrice - transferRight);
        if (transferInfoPrice <= 0) {
          transferInfoPrice = 0;
        }
      }

      //支付总额
      //已减和立减
      if (
        getStore("showPriceFlag") == true ||
        getStore("showPriceFlag") == "true"
      ) {
        payMoney =
          ADULTNumber *
            (Number(flightInfo[0].audltSalePrice) -
              Number(flightInfo[0].promotion) +
              adultPrice) +
          CHILDRENNumber *
            (Number(flightInfo[0].childrenSalePrice) + childrenPrice);
        if (
          flightInfo.length == 2 &&
          flightInfo[0].saleType != "RoundTripSpecial"
        ) {
          var payMoneyTwo =
            ADULTNumber *
              (Number(flightInfo[1].audltSalePrice) -
                Number(flightInfo[1].promotion) +
                adultPrice) +
            CHILDRENNumber *
              (Number(flightInfo[1].childrenSalePrice) + childrenPrice);
          payMoney = payMoney + payMoneyTwo;
        }
      } else {
        payMoney =
          ADULTNumber * (Number(flightInfo[0].audltSalePrice) + adultPrice) +
          CHILDRENNumber *
            (Number(flightInfo[0].childrenSalePrice) + childrenPrice);
        if (
          flightInfo.length == 2 &&
          flightInfo[0].saleType != "RoundTripSpecial"
        ) {
          var payMoneyTwo =
            ADULTNumber * (Number(flightInfo[1].audltSalePrice) + adultPrice) +
            CHILDRENNumber *
              (Number(flightInfo[1].childrenSalePrice) + childrenPrice);
          payMoney = payMoney + payMoneyTwo;
        }
      }
      if (
        flightInfo.length == 2 &&
        flightInfo[0].saleType == "RoundTripSpecial"
      ) {
        var payMoneyTwo =
          CHILDRENNumber *
          (Number(flightInfo[1].childrenSalePrice) + childrenPrice);
        payMoney = payMoney + payMoneyTwo;
      }
      //首单立减
      let orderDirectReductionAmount = 0;
      if (that.pickedActive != "") {
        orderDirectReductionAmount = that.pickedActive.discountAmount;
      }
      if (orderDirectReductionAmount > 0) {
        payMoney =
          payMoney - orderDirectReductionAmount < 0
            ? 0
            : payMoney - orderDirectReductionAmount;
        if (payMoney - couponMoney < 0) {
          payMoney =
            0 +
            expressMoney +
            insurancePrice +
            serviceMoney +
            specialWorthMoney +
            transferInfoPrice;
          that.isShowCoup = true; //展示只抵扣金额
        } else {
          that.isShowCoup = false; //隐藏只抵扣金额
          let invincibleRight =
            that.invincibleList.length > 0
              ? that.couponRightPrice(
                  that.invincibleList,
                  payMoney - couponMoney,
                  "invincible"
                )
              : 0;
          if (payMoney - couponMoney - invincibleRight < 0) {
            payMoney =
              0 +
              expressMoney +
              insurancePrice +
              serviceMoney +
              specialWorthMoney +
              transferInfoPrice;
          } else {
            payMoney =
              payMoney +
              expressMoney +
              insurancePrice -
              couponMoney -
              invincibleRight +
              serviceMoney +
              specialWorthMoney +
              transferInfoPrice;
          }
          that.invincibleCouponPrice = invincibleRight;
          // payMoney=payMoney+expressMoney+insurancePrice-couponMoney+serviceMoney+specialWorthMoney+transferInfoPrice;
        }
      } else {
        if (payMoney - couponMoney < 0) {
          payMoney =
            0 +
            expressMoney +
            insurancePrice +
            serviceMoney +
            specialWorthMoney +
            transferInfoPrice;
          that.isShowCoup = true; //展示只抵扣金额
        } else {
          that.isShowCoup = false; //隐藏只抵扣金额
          let invincibleRight =
            that.invincibleList.length > 0
              ? that.couponRightPrice(
                  that.invincibleList,
                  payMoney - couponMoney,
                  "invincible"
                )
              : 0;
          if (payMoney - couponMoney - invincibleRight < 0) {
            payMoney =
              0 +
              expressMoney +
              insurancePrice +
              serviceMoney +
              specialWorthMoney +
              transferInfoPrice;
          } else {
            payMoney =
              payMoney +
              expressMoney +
              insurancePrice -
              couponMoney -
              invincibleRight +
              serviceMoney +
              specialWorthMoney +
              transferInfoPrice;
          }
          that.invincibleCouponPrice = invincibleRight;
          // payMoney=payMoney+expressMoney+insurancePrice-couponMoney+serviceMoney+specialWorthMoney+transferInfoPrice;
        }
      }
      //计算优惠总额
      that.preferential=0;
      if(that.couponSwitch==true && that.coupon!='' && that.coupon.discountAmount>0){
        that.preferential=that.preferential+parseFloat(that.coupon.discountAmount);
      }
      if(that.pickedActive!=''){
        that.preferential=that.preferential+parseFloat(that.pickedActive.discountAmount);
      }
      if((that.insuranceCouponPrice+that.transferCouponPrice+that.airportVipCouponPrice)>0 ){
        that.preferential=that.preferential+parseFloat(that.insuranceCouponPrice+that.transferCouponPrice+that.airportVipCouponPrice);
      }
      if(that.couponSwitch==true && that.invincibleCouponPrice>0){
        that.preferential=that.preferential+parseFloat(that.invincibleCouponPrice);
      }
      if(that.knockOrReduced==true && ((that.singleFlight.promotion+(that.doubleFlight.promotion||0))*that.personNumber.ADULTNumber)>0){
        that.preferential=that.preferential+parseFloat((that.singleFlight.promotion+(that.doubleFlight.promotion||0))*personNumber.ADULTNumber);
      }
      if(that.singleFlight != null && that.singleFlight.saleType=='RoundTripSpecial'&& that.knockOrReduced==true && that.singleFlight.promotion*that.personNumber.ADULTNumber>0){
        that.preferential=that.preferential+parseFloat(singleFlight.promotion*personNumber.ADULTNumber);
      }
      if (that.preferential.toString().indexOf(".") != -1) {
        that.preferential=parseFloat(that.preferential.toFixed(2));
      } 
      if(that.showPackageName==true&& that.packageInfo!=null && that.packageInfo.businessType=='TICKET'){
        payMoney=payMoney+((CHILDRENNumber+ADULTNumber)*that.packageInfo.tagPrice);
      }
      if (payMoney.toString().indexOf(".") != -1) {
        return parseFloat(payMoney.toFixed(2));
      } else {
        return payMoney;
      }
    },
    //计算权益券已抵金额
    couponRightPrice(arr, price, type) {
      if (type != "invincible") {
        let productPriceList = this.productPriceList(type);
        let amount = 0,
          num = 0;
        for (let i = 0; i < arr.length; i++) {
          if (
            arr[i].isSelect &&
            arr[i].couponRightType == "RIGHT_FAVOUR_FREE"
          ) {
            //全免
            amount = price;
            break;
          } else if (
            arr[i].isSelect &&
            arr[i].couponRightType == "RIGHT_FAVOUR_QUANTITY"
          ) {
            //免几份
            num += +arr[i].rightObject;
          } else if (
            arr[i].isSelect &&
            arr[i].couponRightType == "RIGHT_FAVOUR_WHOLE"
          ) {
            //满减
            amount += +arr[i].rightObject;
          }
        }
        if (num > 0) {
          let payMoney = this.computePrices(
            type,
            num,
            productPriceList.totalPrice,
            productPriceList.priceList
          );
          amount = +(productPriceList.totalPrice - payMoney);
        }
        return amount > price ? price : amount;
      } else {
        let amount = 0;
        for (let i = 0; i < arr.length; i++) {
          if (arr[i].isSelect) {
            amount += +arr[i].discountAmount;
          }
        }
        return amount > price ? price : amount;
      }
    },
    //还需付的金额
    computePrices(type, num, totalPrice, priceList) {
      let payRemain = totalPrice;
      let rLength = 0;
      for (let i = 0; i < priceList.length; i++) {
        if (type == "insurance") {
          var price =
            priceList[i] * this.selectedPersons.length * this.flightInfo.length; //当前总价
        } else if (type == "airportVip") {
          var price = priceList[i] * this.selectedPersons.length; //当前总价
        } else if (type == "transfer") {
          var price = priceList[i]; //当前总价
        }
        if (num - rLength <= 0) {
          break;
        }
        var listPrice = priceList[i] * (num - rLength); //当前可免总金额
        if (listPrice <= price) {
          payRemain = payRemain - listPrice;
        } else {
          payRemain = payRemain - price;
        }
        if (type == "insurance") {
          rLength =
            rLength + this.selectedPersons.length * this.flightInfo.length;
        } else if (type == "airportVip") {
          rLength = rLength + this.selectedPersons.length;
        } else if (type == "transfer") {
          rLength = rLength + 1;
        }
        if (payRemain <= 0) {
          payRemain = 0;
          break;
        }
      }
      return payRemain;
    },
    //点击关闭商旅弹框
    closeReject() {
      this.showTravel = false;
    },
    //提交订单
    submitOrder(payMoney) {
      removeStore("addALL", this);
      this.downClass = false;
      if (
        this.rightClickType == "submitchange" ||
        this.rightClickType == "submit" ||
        this.rightClickType == "submit0016" ||
        this.rightClickType == "submitactive"
      ) {
        getElementTag("订单填写_继续预订", "机票订单填写");
      } else {
        getElementTag("订单填写_去支付", "机票订单填写");
      }
      if (getStore("goFlight") == "share") {
        getElementTag("机票_订单填写页_航班（特价机票城市列表）", "航班列表");
      }
      let that = this,
        headInfo_new = that.headInfo,
        departureDate = headInfo_new[0].departureDate,
        adultNumber = 0,
        childrenNumber = 0,
        babyNumber = 0,
        number = that.selectedPersons.length,
        oldNumber = 0,
        name = "";
      if (this.rightClickType == "submitactive") {
        this.pickedActive = "";
        let active = JSON.parse(JSON.stringify(this.activeList));
        for (let i = 0; i < active.length; i++) {
          active[i].picked = false;
        }
        let actives = {
          key: "activeList",
          val: active
        };
        try {
          this.initData(actives);
        } catch (e) {}
        payMoney = this.totalPrices();
      }
      if (this.rightClickType == "submit0016") {
        let coupon = JSON.parse(JSON.stringify(this.coupon));
        coupon.discountAmount = null;
        let coupons = {
          key: "coupon",
          val: coupon
        };
        try {
          this.initData(coupons);
        } catch (e) {}
        payMoney = this.totalPrices();
      }
      if (
        that.selectedPersons != null &&
        that.selectedPersons != "[]" &&
        that.selectedPersons.length > 1
      ) {
        for (let i = 0; i < that.selectedPersons.length; i++) {
          for (let j = 0; j < that.selectedPersons.length - 1; j++) {
            if (
              that.selectedPersons[i].phone != null &&
              that.selectedPersons[i].phone != "" &&
              that.selectedPersons[j + 1].phone != null &&
              that.selectedPersons[j + 1].phone != ""
            ) {
              if (
                that.selectedPersons[i].phone ==
                  that.selectedPersons[j + 1].phone &&
                i != j + 1
              ) {
                that.selectedPersons[j + 1].phone = "";
              }
            }
          }
        }
        let selectedPersons = {
          key: "selectedPersons",
          val: that.selectedPersons
        };
        try {
          that.initData(that.selectedPersons);
        } catch (e) {}
      }
      for (let i = 0; i < that.selectedPersons.length; i++) {
        if(that.selectedPersons[i].receiverName.indexOf('待填写')>-1){
            that.showNObuttom(`请确认姓名是否正确`);
            return;
        }
        let adultDate =
            Number(that.selectedPersons[i].birthday.substring(0, 4)) +
            Number(this.singleFlight.minAdultAge || 12) +
            that.selectedPersons[i].birthday.substring(4, 10),
          childrenDate =
            Number(that.selectedPersons[i].birthday.substring(0, 4)) +
            Number(that.singleFlight.minChildrenAge || 2) +
            that.selectedPersons[i].birthday.substring(4, 10),
          oldDate =
            Number(that.selectedPersons[i].birthday.substring(0, 4)) +
            Number(that.singleFlight.maxAdultAge || 70) +
            that.selectedPersons[i].birthday.substring(4, 10);
        let dd = Number(that.selectedPersons[i].birthday.substring(8, 10)) + 14,
          babyDate = that.selectedPersons[i].birthday.substring(0, 8) + dd;
        if (adultDate <= departureDate) {
          adultNumber++;
          if (headInfo_new[1] != null) {
            if (oldDate <= headInfo_new[1].departureDate) {
              oldNumber++;
            }
          } else {
            if (oldDate <= departureDate) {
              oldNumber++;
            }
          }
        } else if (adultDate > departureDate && departureDate >= childrenDate) {
          childrenNumber++;
        } else if (childrenDate > departureDate && departureDate >= babyDate) {
          babyNumber++;
        }
        if (
          that.selectedPersons[i].certType == "ID" ||
          that.selectedPersons.certType == "ID_CARD"
        ) {
          if (!isIDcard(that.selectedPersons[i].certNo.toUpperCase())) {
            that.showNObuttom(
              `${that.selectedPersons[i].receiverName}的身份证不正确`
            );
            return;
          }
        } else if (
          that.selectedPersons[i].certType == "GANGAO" ||
          that.selectedPersons[i].certType == "TAIBAO"
        ) {
          that.showNObuttom(
            `暂不支持港澳通行证和台湾通行证下单,请使用其它证件号下单`
          );
          return;
        }
      }
      if (that.selectedPersons.length == 0) {
        that.showNObuttom(`请选择乘机人`);
        return;
      }
      //最少人数
      if (number < that.singleFlight.minPassenger) {
        that.showNObuttom(
          `该产品最少预定人数${that.singleFlight.minPassenger}名`
        );
        return;
      } else if (
        that.doubleFlight != null &&
        number < this.doubleFlight.minPassenger
      ) {
        that.showNObuttom(
          `该产品最少预定人数${that.singleFlight.minPassenger}名`
        );
        return;
      }
      //最多人数
      if (number > that.singleFlight.maxPassenger) {
        that.showNObuttom(`最多可选${that.singleFlight.maxPassenger}名乘客`);
        return;
      } else if (
        that.doubleFlight != null &&
        number > this.doubleFlight.maxPassenger
      ) {
        that.showNObuttom(`最多可选${that.singleFlight.maxPassenger}名乘客`);
        return;
      }
      //最多成人数
      if (adultNumber > that.singleFlight.maxAdultNumber) {
        that.showNObuttom(
          `该产品最多可选${that.singleFlight.maxAdultNumber}名成人`
        );
        return;
      } else if (
        that.doubleFlight != null &&
        adultNumber > that.doubleFlight.maxAdultNumber
      ) {
        that.showNObuttom(
          `该产品最多可选${that.doubleFlight.maxAdultNumber}名成人`
        );
        return;
      }
      //最少成人数
      if (adultNumber < that.singleFlight.minAdultNumber) {
        that.showNObuttom(
          `该产品最少选${that.singleFlight.minAdultNumber}名成人`
        );
        return;
      } else if (
        that.doubleFlight != null &&
        adultNumber < that.doubleFlight.minAdultNumber
      ) {
        that.showNObuttom(
          `该产品最少可选${that.doubleFlight.minAdultNumber}名成人`
        );
        return;
      }
      //最多儿童数
      if (childrenNumber > this.singleFlight.maxChildrenNumber) {
        that.showNObuttom(
          `该产品最多可选${that.singleFlight.maxChildrenNumber}名儿童`
        );
        return;
      } else if (
        that.doubleFlight != null &&
        childrenNumber > that.doubleFlight.maxChildrenNumber
      ) {
        that.showNObuttom(
          `该产品最多可选${that.doubleFlight.maxChildrenNumber}名儿童`
        );
        return;
      }
      //最少儿童数
      if (childrenNumber < this.singleFlight.minChildrenNumber) {
        that.showNObuttom(
          `该产品最少选${that.singleFlight.minChildrenNumber}名儿童`
        );
        return;
      } else if (
        that.doubleFlight != null &&
        childrenNumber < that.doubleFlight.minChildrenNumber
      ) {
        that.showNObuttom(
          `该产品最少选${that.doubleFlight.minChildrenNumber}名儿童`
        );
        return;
      }
      //成人最多携带儿童数量
      if (
        adultNumber > 0 &&
        childrenNumber > adultNumber * that.singleFlight.childrenNumber
      ) {
        that.showNObuttom(
          `该产品1个成人最多带${that.singleFlight.childrenNumber}名儿童`
        );
        return;
      } else if (
        that.doubleFlight != null &&
        adultNumber > 0 &&
        childrenNumber > adultNumber * that.doubleFlight.childrenNumber
      ) {
        that.showNObuttom(
          `该产品1个成人最多带${that.doubleFlight.childrenNumber}名儿童`
        );
        return;
      }
      if (number > that.inventoryCount) {
        that.showNObuttom(
          `对不起，当前舱位仅剩${that.inventoryCount}张票，请修改乘机人数`
        );
        return;
      }
      for (var i = 0; i < that.selectedPersons.length - 1; i++) {
        for (var j = i + 1; j < that.selectedPersons.length; j++) {
          if (
            that.selectedPersons[i].certNo == that.selectedPersons[j].certNo &&
            that.selectedPersons[i].certType == that.selectedPersons[j].certType
          ) {
            that.showNObuttom(
              `证件号不能相同:${that.selectedPersons[i].certNo}`
            );
            return;
          }
          if (
            that.selectedPersons[i].receiverName ==
            that.selectedPersons[j].receiverName
          ) {
            that.showNObuttom(
              `姓名不能相同:${that.selectedPersons[i].receiverName}`
            );
            return;
          }
        }
      }

      if (childrenNumber != 0 && adultNumber == 0) {
        that.showOKbuttom("友情提醒：儿童出行需成人陪同");
        return;
      }
      if (babyNumber > 0) {
        that.showOKbuttom("订单中有婴儿乘客，无法下单！");
        return;
      }
      if (oldNumber > 0) {
        that.showOKbuttom(
          `友情提醒：超过${that.singleFlight.maxAdultAge ||
            70}岁的乘机人，请联系航空公司购票！`
        );
        return;
      }
      if (childrenNumber > 0) {
        if (
          that.singleFlight.childrenSalePrice == 0 ||
          (that.flightInfo.length == 2 &&
            that.doubleFlight.childrenSalePrice == 0)
        ) {
          that.showNObuttom("该航班暂不支持儿童票购买！");
          return;
        }
      }

      name = that.selectedPersons[0].receiverName;
      if (checkMobile(removeBlank(that.contactPhone)) == false) {
        that.showNObuttom("请填写正确的手机号码");
        return;
      }
      if (
        that.needVoucher == true &&
        that.reimburse == true &&
        that.businessTravel != true
      ) {
        //邮件地址
        if (that.chosenMailAddress == "" || that.chosenMailAddress == null) {
          that.showNObuttom("请选择邮寄地址");
          return;
        }
        if (that.needVoucher && (that.invoiceTitle || that.showInvoice)) {
          if (that.taitou.geren == true) {
            if (
              that.taitou.gerenVal == null ||
              removeBlank(that.taitou.gerenVal) == ""
            ) {
              that.showNObuttom("发票抬头请填写个人真实姓名");
              return;
            }
          } else if (that.taitou.geren == false) {
            if (
              that.taitou.qiyeVal == null ||
              removeBlank(that.taitou.qiyeVal) == ""
            ) {
              that.showNObuttom("发票抬头请填写企业名称");
              return;
            } else if (
              that.taitou.xycode == null ||
              removeBlank(that.taitou.xycode) == ""
            ) {
              that.showNObuttom("发票抬头请填写统一社会信用代码");
              return;
            }
          }
        }
      }
      //未同意购票须知
      if (!that.agree&&that.bookingNotes) {
        // that.showNObuttom("请确认已阅读过驴妈妈网上机票预订须知");
        that.rightClickType = "bookingNotes";
        that.leftClickType = "";
        that.showDoubleButtom("请确认已阅读并同意相关预订须知", "取消", "确认");
        return;
      }
      //接送机判断
      let transferInfo = that.transferInfoTemp;
      if (transferInfo != "" && this.rightClickTypeNew != true) {
        if (that.transferPomise(that.selectedPersons.length) == false) {
          that.rightClickType = "transfer";
          that.leftClickType = "";
          that.showDoubleButtom(that.transferPomiseMessage, "更换", "暂不更换");
          return;
        }
      }
      if (this.JSCprcie > 0 && this.rightClickType == "submit2033") {
        let transferInfo = this.transferInfoTemp;
        if (transferInfo != "") {
          this.isAcceptTransferPrice = true;
        }
      }
      //差旅项目新加
      if (that.businessTravel == true) {
        if (!that.showTravel) {
          that.showTravel = true;
          return;
        } else {
          that.showTravel = false;
        }
      } else {
        that.improveContent = "";
      }
      let data = this.submitOrderMes(payMoney);
      let cpsid = getCookie("cpsId") || "";
      if (
        getStore("APPcpsId") != null &&
        getStore("APPcpsId") != "" &&
        getStore("APPcpsId") != "undefined"
      ) {
        cpsid = getStore("APPcpsId");
      }
      if (!that.suborder||data==null) {
        return;
      }
      that.showAlertInsurance=false
      that.suborder = false;
      let flightRopRequest = {};
      if (getStore("flightRopRequest") != null) {
        flightRopRequest = JSON.parse(getStore("flightRopRequest"));
      }
      getElementTag("订单填写_去支付_request", "机票订单填写");
      bookinfo(
        data,
        getStore("equipmentNo") || "",
        cpsid,
        getCookie("oIC") || "",
        getCookie("oUC") || "",
        flightRopRequest.mobileBrand || "",
        flightRopRequest.idfa || "",
        flightRopRequest.idfaappVersion || "",
        flightRopRequest.idfaSource || "",
        flightRopRequest.idfaSourceRemark || "",
        flightRopRequest.activeTime || "",
        flightRopRequest.uuid || ""
      ).then(data => {});
      that.showComfirm = true;

      booking(
        data,
        getStore("equipmentNo") || "",
        cpsid,
        getCookie("oIC") || "",
        getCookie("oUC") || "",
        flightRopRequest.mobileBrand || "",
        flightRopRequest.idfa || "",
        flightRopRequest.idfaappVersion || "",
        flightRopRequest.idfaSource || "",
        flightRopRequest.idfaSourceRemark || "",
        flightRopRequest.activeTime || "",
        flightRopRequest.uuid || ""
      ).then(
        data => {
          that.suborder = true;
          that.showComfirm = false;
          if (data.code == "1") {
            for (let i = 0; i < data.data.orders.length; i++) {
              if (data.data.orders[i].orderStatusCode == "BOOKING_FAIL") {
                that.rightClickType = "feed";
                that.leftClickType = "destine";
                that.showDoubleButtom(
                  "预订失败,请重新查询!",
                  "重新查询",
                  "反馈意见"
                );
                return;
              }
            }
            let orderObj = data.data.orders;
            that.flight_orderMainId = orderObj[0].orderMainId;
            that.flight_orderNo = orderObj[0].orderNo;
            removeStore("worthCoupons", that);
            that.productsGo != null ? (that.productsGo.picked = false) : "";
            that.productsBack != null ? (that.productsBack.picked = false) : "";
            let paySigUrl =
              "//m.lvmama.com/flight?method=goToPay&orderMainId=" +
              data.data.orders[0].orderMainId +
              "&from=fillOrderPage";
            let pMoney = payMoney;
            if (payMoney == 0) {
              pMoney = that.payMoney;
            }
            if (that.rightClickType == "submit0016") {
              data.data.totalSalesPrice =
                data.data.totalSalesPrice - (that.JSCprcie || 0);
            }
            if (
              data.data.bookingSource == "LVMAMA_TRAVEL" &&
              data.data.payMode != "" &&
              data.data.payMode != "FRONT_NORMAL"
            ) {
              that.clbooking = true;
            } else {
              that.clbooking = false;
            }
            if (data.data.totalSalesPrice == pMoney) {
              removeStore("coupon", that);
              removeStore("couponList", that);
              removeStore("taitou", that);
              // cm.shopAction9Tag(null,'飞机票',$scope.personNumber.ADULTNumber+$scope.personNumber.CHILDRENNumber,$scope.singleFlight.audltSalePrice,storage.getItem('flight_userID'),data.data.orderNo,data.data.totalSalesPrice);
              if (
                data.data.bookingSource == "LVMAMA_TRAVEL" &&
                data.data.payMode != "" &&
                data.data.payMode != "FRONT_NORMAL"
              ) {
                this.$router.push(
                  `/${this.$parent.baseUrlPath}/businessTravelOrderSuccess`
                );
              } else if (data.data.totalSalesPrice == 0) {
                this.$router.push(
                  "/" +
                    this.$parent.baseUrlPath +
                    "/orderSuccess/" +
                    data.data.orders[0].orderMainId +
                    "/" +
                    data.data.orders[0].orderId
                );
              } else {
                if (isClient() == 1) {
                  //判断若为ios&android客户端
                  window.location.href = paySigUrl;
                } else {
                  window.location.href =
                    "//m.lvmama.com/nmorderv7/vorder_success.htm?orderId=" +
                    data.data.orders[0].orderMainId +
                    "&queryType=flight&orderMainId=true";
                }
              }
            } else {
              // if(data.data.totalSalesPrice!=null &&data.data.totalSalesPrice!=''){
              if (data.data.totalSalesPrice != pMoney) {
                let totalSalesPrice_cj = data.data.totalSalesPrice - payMoney;
                if (totalSalesPrice_cj > 0) {
                  that.showDoubleButtom(
                    `该订单金额应付金额更新为￥${
                      data.data.totalSalesPrice
                    }差价￥${totalSalesPrice_cj.toFixed(2)}，是否继续支付？`,
                    "返回重新",
                    "继续支付"
                  );
                  that.rightClickType = "toPay";
                  that.leftClickType = "cancelOrder";
                } else if (totalSalesPrice_cj < 0) {
                  removeStore("coupon", that);
                  removeStore("couponList", that);
                  removeStore("taitou", that);
                  // cm.shopAction9Tag(null,'飞机票',$scope.personNumber.ADULTNumber+$scope.personNumber.CHILDRENNumber,$scope.singleFlight.audltSalePrice,storage.getItem('flight_userID'),data.data.orderNo,data.data.totalSalesPrice);
                  if (isClient() == 1) {
                    //判断若为ios&android客户端
                    window.location.href = paySigUrl;
                  } else {
                    window.location.href =
                      "//m.lvmama.com/nmorderv7/vorder_success.htm?orderId=" +
                      data.data.orders[0].orderMainId +
                      "&queryType=flight&orderMainId=true";
                  }
                  return;
                }

                // cm.shopAction9Tag(null,'飞机票',$scope.personNumber.ADULTNumber+$scope.personNumber.CHILDRENNumber,$scope.singleFlight.audltSalePrice,storage.getItem('flight_userID'),data.data.orderNo,data.data.totalSalesPrice);
              }
              // }
            }
          } else {
            that.submitCode(data);
          }
        },
        () => {
          that.showComfirm = false;
          that.suborder = true;
          this.showDoubleButtom(
            "网络出了点小状况,请再尝试一次",
            "重新查询",
            "再次尝试"
          );
          this.leftClickType = "destine";
          this.rightClickType = "submit";
          getElementTag("订单填写_去支付_error", "机票订单填写");
        }
      );
    },
    //商旅弹框提交订单
    sureReject() {
      this.submitOrder(this.payMoney);
      // if(this.improveContent!='' && this.improveContent!=null){
      // 	this.submitOrder(this.payMoney);
      // }
    },
    //接送机人数校验
    transferPomise(num) {
      let transferInfo = this.transferInfoTemp,
        transferArr = [];
      if (transferInfo) {
        if (
          transferInfo.goData.pick.able ||
          transferInfo.goData.send.able ||
          transferInfo.arrivalData.pick.able ||
          transferInfo.arrivalData.send.able
        ) {
          if (transferInfo.goData.pick.able) {
            var transfer = {
              transferType: transferInfo.goData.pick.car.vehicleInfo.name,
              passengerNumber: Number(
                transferInfo.goData.pick.car.vehicleInfo.passengerNumber
              )
            };
            transferArr.push(transfer);
          }
          if (transferInfo.goData.send.able) {
            var transfer = {
              transferType: transferInfo.goData.send.car.vehicleInfo.name,
              passengerNumber: Number(
                transferInfo.goData.send.car.vehicleInfo.passengerNumber
              )
            };
            transferArr.push(transfer);
          }
          if (transferInfo.arrivalData.pick.able) {
            var transfer = {
              transferType: transferInfo.arrivalData.pick.car.vehicleInfo.name,
              passengerNumber: Number(
                transferInfo.arrivalData.pick.car.vehicleInfo.passengerNumber
              )
            };
            transferArr.push(transfer);
          }
          if (transferInfo.arrivalData.send.able) {
            var transfer = {
              transferType: transferInfo.arrivalData.send.car.vehicleInfo.name,
              passengerNumber: Number(
                transferInfo.arrivalData.send.car.vehicleInfo.passengerNumber
              )
            };
            transferArr.push(transfer);
          }

          var min = transferArr[0];
          for (var i = 0; i < transferArr.length; i++) {
            if (transferArr[i].passengerNumber < min.passengerNumber) {
              min = transferArr[i];
            }
          }

          if (num > min.passengerNumber) {
            this.transferPomiseMessage =
              "您选的" +
              min.transferType +
              "车最大载客数少于乘机人，是否更换其他车型？";
            return false;
          }
        }
      }
      return true;
    },
    //下单失败code
    submitCode(data) {
      getElementTag("订单填写_去支付_error", "机票订单填写");
      if (data.code == "-2" || data.code == "0002" || data.code == "0015") {
        this.showOnebuttom("舱位售尽，请重新查询！", "返回重选");
        this.leftClickType = "destine";
      } else if (data.code == "1904") {
        let copchangePrice = data.data[0].backTotalSalesAmount;
        //优惠券
        // if(this.coupon!=null &&this.coupon.discountAmount!=null && this.coupon.discountAmount!='' && $scope.coupon.discountAmount!=0){
        //        $copchangePrice=data.data[0].backTotalSalesAmount-this.coupon.discountAmount;
        //    }
        this.changePrice = data.data[0].backTotalSalesAmount;
        this.showDoubleButtom(
          `该订单应付总额更新为￥${copchangePrice}，是否继续预订？`,
          "返回重选",
          "继续预订"
        );
        this.leftClickType = "destine";
        this.rightClickType = "submitchange";
      } else if (data.code == "2001") {
        this.showOnebuttom("您的未支付订单过多，请先去支付或取消订单", "确定");
        this.leftClickType = "orderList";
      } else if (data.code == "1011") {
        this.showDoubleButtom("预订失败，请重新查询！", "重新查询", "反馈意见");
        this.leftClickType = "destine";
        this.rightClickType = "feed";
      } else if (
        data.code == "1020" ||
        data.code == "1025" ||
        data.code == "2014" ||
        data.code == "1019" ||
        data.code == "5100009" ||
        data.code == "5100012" ||
        data.code == "5100013" ||
        data.code == "5100022" ||
        data.code == "1110007" ||
        data.code == "5100032"
      ) {
        this.showOnebuttom(data.message, "确定");
        this.leftClickType = "";
      } else if (data.code == "1034") {
        this.showOnebuttom(
          "您所选择的机场服务库存不足，请您重新选择！",
          "确定"
        );
        this.leftClickType = "";
      } else if (data.code == "1029" || data.code == "1030") {
        this.showOnebuttom(data.message, "查看订单");
        this.leftClickType = "orderList";
      } else if (data.code == "0016") {
        this.showDoubleButtom(data.message, "取消", "继续预订");
        this.leftClickType = "";
        this.rightClickType = "submit0016";
      } else if (
        data.code == "5100021" ||
        data.code == "5170016" ||
        data.code == "1110003" ||
        data.code == "1110004"
      ) {
        this.showOnebuttom(data.message, "重新查询");
        this.leftClickType = "destine";
      } else if (
        data.code == "5100026" ||
        data.code == "5170015" ||
        data.code == "5100030" ||
        data.code == "5170007" ||
        data.code == "5170010" ||
        data.code == "1110009"
      ) {
        this.showDoubleButtom(data.message, "取消", "查看规则");
        this.leftClickType = "";
        this.rightClickType = "urle";
      } else if (
        data.code == "1035" ||
        data.code == "1039" ||
        data.code == "1042"
      ) {
        let submessage = data.message;
        if (data.code == "1039" || data.code == "1042") {
          if (data.code == "1042" && submessage != "") {
            submessage = data.message.replace(/【/g, "").replace(/】/g, "");
            submessage = submessage.replace(
              submessage.split("，")[1] + "，",
              ""
            );
          }
        } else {
          submessage = "乘客已经下单，如需继续下单，请取消之前订单！";
        }
        this.showOnebuttom(submessage, "查看订单");
        this.leftClickType = "orderList";
      } else if (
        data.code == "3100001" ||
        data.code == "3001" ||
        data.code == "2031" ||
        data.code == "2032" ||
        data.code == "0027"
      ) {
        let submessage = data.message;
        if (data.code == "0027") {
          submessage.submessage = "系统繁忙，请稍后再试";
        }
        this.showOKbuttom(submessage);
      } else if (data.code == "1038") {
        this.showOKbuttom("您选的优惠券产品库存不足，请选择其他产品。");
      } else if (data.code == "2033") {
        this.JSCprcie = data.message
          .split("，")[0]
          .substring(data.message.split("，")[0].indexOf("为") + 1);
        this.showDoubleButtom(data.message, "返回重选", "继续预订");
        this.leftClickType = "";
        this.rightClickType = "submit2033";
      } else if (data.code == "0028") {
        this.showDoubleButtom(data.message, "返回重选", "继续支付");
        this.leftClickType = "";
        this.rightClickType = "submitactive";
      } else if (data.code == "1021") {
        if (data.message != "") {
          let submessage = data.message.replace(/【/g, "").replace(/】/g, "");
          this.newChangeId = submessage
            .split("，")[1]
            .substring(3, submessage.split("，")[1].length);
          this.submessages = submessage.replace(
            submessage.split("，")[1] + "，",
            ""
          );
        }
        this.dupClassNew1021 = true;
      } else if (data.code == "2048") {
        this.showOnebuttom(data.message, "知道了");
        this.leftClickType = "";
      } else {
        this.showDoubleButtom("预订失败，请重新查询！", "重新查询", "反馈意见");
        this.leftClickType = "destine";
        this.rightClickType = "feed";
      }
    },
    //单按钮弹框
    showOnebuttom(mess, name) {
      this.message = mess;
      this.showMessage = true;
      this.leftButton = name;
      this.rightButton = "";
    },
    //单确定弹框
    showOKbuttom(mess) {
      this.message = mess;
      this.showMessage = true;
      this.leftButton = "知道了";
      this.rightButton = "";
      this.leftClickType = "";
      this.rightClickType = "";
    },
    //无按钮弹框
    showNObuttom(mess) {
      let that = this;
      this.message = mess;
      this.showMessage = true;
      this.leftButton = "";
      this.rightButton = "";
      setTimeout(function() {
        that.showMessage = false;
      }, 2000);
    },
    //双按钮弹框
    showDoubleButtom(mess, left, right) {
      this.message = mess;
      this.showMessage = true;
      this.leftButton = left;
      this.rightButton = right;
    },
    //查看原单
    goOrderList() {
      this.dupClassNew1021 = false;
      orderDetailHref();
    },
    //取消原单并下单
    newSubChange() {
      this.$parent.showLoading = true;
      cancelOrdersByOrderNo(this.newChangeId).then(data => {
        this.$parent.showLoading = false;
        this.dupClassNew1021 = false;
        this.submitOrder(this.payMoney);
      });
    },
    //保险弹框下单
    hideAlertInsurance(){
      // this.showAlertInsurance=false;
      this.alertInsurance = null;
      let insuranceListInfo = JSON.parse(JSON.stringify(this.insuranceListInfo));
      for(let i=0;i<insuranceListInfo.length;i++){
        if(insuranceListInfo[i].pickedList.defaultRule=="WINDOW"){
          insuranceListInfo[i].pickedList.defaultRule = 'NOT_DEFAULT';
        }
        for (let j = 0; j < insuranceListInfo[i].list.length; j++) {
          if(insuranceListInfo[i].list[j].defaultRule=="WINDOW"){
            insuranceListInfo[i].list[j].defaultRule = 'NOT_DEFAULT';
          }
        }
      }
      let insuranceObj = {
        key: "insuranceListInfo",
        val: insuranceListInfo
      };
      try {
        this.initData(insuranceObj);
      } catch (e) {}
      this.submitOrder(this.payMoney);
    },
    //添加保险
    addAlertInsurance(){
      let insuranceListInfo = JSON.parse(JSON.stringify(this.insuranceListInfo));
      for(let i=0;i<insuranceListInfo.length;i++){
        for (let j = 0; j < insuranceListInfo[i].list.length; j++) {
          if(insuranceListInfo[i].list[j].defaultRule=="WINDOW"){
            insuranceListInfo[i].list[j].defaultRule = 'NOT_DEFAULT';
          }
          if (insuranceListInfo[i].list[j].id == this.alertInsurance.id) {
            insuranceListInfo[i].list[j].picked = true;
            insuranceListInfo[i].pickedList = insuranceListInfo[i].list[j];
            // break;
          }
        }
      }
      let insuranceObj = {
        key: "insuranceListInfo",
        val: insuranceListInfo
      };
      try {
        this.initData(insuranceObj);
      } catch (e) {}
      this.insurance = [];
      for (let i = 0; i < insuranceListInfo.length; i++) {
        if (insuranceListInfo[i].list.length > 0) {
          for (let j = 0; j < insuranceListInfo[i].list.length; j++) {
            if (insuranceListInfo[i].list[j].picked == true) {
              this.insurance.push(insuranceListInfo[i].list[j]);
            }
          }
        }
      }
      this.payMoney = this.totalPrices();
      this.showAlertInsurance = false;
      this.alertInsurance = null;
    },
    //弹框右边按钮回调
    rightHandler() {
      if (this.rightClickType == "destine") {
        this.$router.push(`/${this.$parent.baseUrlPath}/destine`);
      } else if (this.rightClickType == "toPay") {
        this.toPayUrl();
      } else if (this.rightClickType == "submitchange") {
        getElementTag("订单填写_继续支付", "机票订单填写");
        this.submitOrder(this.changePrice);
      } else if (
        this.rightClickType == "submit" ||
        this.rightClickType == "submit2033"
      ) {
        this.submitOrder(this.payMoney);
      } else if (this.rightClickType == "transfer") {
        this.rightClickTypeNew = true;
        this.submitOrder(this.payMoney);
      } else if (this.rightClickType == "submit0016") {
        //优惠券
        this.submitOrder(
          Number(this.payMoney) + Number(this.coupon.discountAmount)
        );
      } else if (this.rightClickType == "submitactive") {
        //促销活动
        this.submitOrder(
          Number(this.payMoney) + Number(this.pickedActive.discountAmount)
        );
      } else if (this.rightClickType == "urle") {
        //查看规则
        this.showUrle = true;
      } else if (this.rightClickType == "feed") {
        this.$router.push(`/${this.$parent.baseUrlPath}/feedBack/popup`);
      } else if (this.rightClickType == "goCoupon") {
        this.$router.push(`/${this.$parent.baseUrlPath}/couponList`);
      }else if(this.rightClickType == "bookingNotes"){
        this.agree=true;
        this.submitOrder(this.payMoney);
      }
      this.showMessage = false;
    },
    //弹框左边按钮回调
    closeAlert() {
      if (this.leftClickType == "feed") {
        this.$router.push(`/${this.$parent.baseUrlPath}/feedBack/popup`);
      } else if (this.leftClickType == "cancelOrder") {
        this.cancelOrder(this.flight_orderNo);
      } else if (this.leftClickType == "destine") {
        this.$router.push(`/${this.$parent.baseUrlPath}/destine`);
      } else if (this.leftClickType == "orderList") {
        orderDetailHref();
      }
      // if(this.rightClickType=="transfer"){
      this.rightClickType = "";
      // }
      this.showMessage = false;
    },
    showSpecial() {
      if (getStore("flightClick") != null) {
        if (new Date().getTime() - Number(getStore("formTime")) > 60000) {
          this.showDoubleButtom(
            `当前有${parseInt(
              Math.random() * (35 - 15 + 1) + 15,
              10
            )}个人在看此航班，是否确定离开当前页面？`,
            "返回重选",
            "继续预订"
          );
          this.leftClickType = "destine";
          this.rightClickType = "";
        } else {
          this.showDoubleButtom(
            "您的订单尚未填写完成，是否确定离开当前页面？",
            "返回重选",
            "继续预订"
          );
          this.leftClickType = "destine";
          this.rightClickType = "";
        }
      } else {
        this.$router.push(`/${this.$parent.baseUrlPath}/destine`);
      }
    },
    //跳转支付
    toPayUrl() {
      removeStore("coupon", this);
      removeStore("couponList", this);
      removeStore("taitou", this);
      //差旅
      if (this.clbooking == true && this.businessTravel == true) {
        //修改 跳转至差旅下单完成页
        this.$router.push(
          `/${this.$parent.baseUrlPath}/businessTravelOrderSuccess`
        );
      } else {
        if (isClient() == 1) {
          //判断若为ios&android客户端
          window.location.href =
            "//m.lvmama.com/flight?method=goToPay&orderMainId=" +
            this.flight_orderMainId +
            "&from=fillOrderPage";
        } else {
          window.location.href =
            "https://m.lvmama.com/lvwappay/vorder_success.htm?orderId=" +
            this.flight_orderMainId +
            "&queryType=flight&orderMainId=true";
        }
      }
    },
    //取消订单
    cancelOrder(orderNo, type) {
      let that = this;
      that.$parent.showLoading = true;
      cancelOrdersByOrderNo(orderNo).then(data => {
        that.$parent.showLoading = false;
        if (type == "submit") {
          that.submitOrder(that.payMoney);
        } else {
          that.$router.push(`/${this.$parent.baseUrlPath}/destine`);
        }
      });
    },
    //价格排序
    compare(obj1, obj2) {
      var val1 = obj1;
      var val2 = obj2;
      if (val2 < val1) {
        return -1;
      } else if (val2 > val1) {
        return 1;
      } else {
        return 0;
      }
    },
    //反选权益券
    checkedEquity(type, amount, equityPriceList, theQuantity) {
      //类型，总价，单价数组，可减份数
      let arrAmout = amount;
      if (theQuantity > 0) {
        for (let i = 0; i < equityPriceList.length; i++) {
          let price =
            equityPriceList[i] *
            (this.personNumber.CHILDRENNumber ||
              0 + this.personNumber.ADULTNumber ||
              0) *
            type; //当前总价
          let listPrice = equityPriceList[i] * theQuantity; //当前可免总金额
          if (listPrice < price) {
            arrAmout = arrAmout - listPrice;
          } else {
            arrAmout = arrAmout - price;
            theQuantity =
              theQuantity -
              (this.personNumber.CHILDRENNumber ||
                0 + this.personNumber.ADULTNumber ||
                0) *
                type;
          }
          if (arrAmout <= 0) {
            arrAmout = 0;
            return true;
          }
          if (theQuantity <= 0) {
            return true;
          }
        }
        return false;
      }
    },
    //下单入参拼接
    submitOrderMes(payMoney) {
      let routeType = "OW",
        flightInfo,
        orderPassengers = [],
        persons,
        headInfo = this.headInfo,
        contactName = "",
        flightRopRequest;
      //券信息
      this.consumedCouponList = [];
      if (
        getStore("flightInfo") != null &&
        getStore("flightInfo") != "undefined"
      ) {
        flightInfo = JSON.parse(getStore("flightInfo"));
        if (flightInfo.length == 2) {
          routeType = "RT";
        }
      }
      if (!(this.insurance.length > 0)&& this.alertInsurance!=null && this.alertInsurance!='' && this.showAlertInsurance==false) {
        this.showAlertInsurance = true;
        return;
      }
      if (
        this.selectedPersons != null &&
        this.selectedPersons != "[]" &&
        this.selectedPersons.length > 0
      ) {
        persons = this.selectedPersons;
        for (let i = 0; i < persons.length; i++) {
          let orderPassenger = {};
          orderPassenger.orderMainId = null;
          orderPassenger.passengerName = persons[i].receiverName.replace(
            "//",
            "/"
          );
          try {
            let adultDate =
              Number(persons[i].birthday.substring(0, 4)) +
              Number(this.singleFlight.minAdultAge || 12) +
              persons[i].birthday.substring(4, 10);
            if (adultDate <= headInfo[0].departureDate) {
              orderPassenger.passengerType = "ADULT";
            } else {
              orderPassenger.passengerType = "CHILDREN";
            }
          } catch (e) {
            orderPassenger.passengerType = persons[i].peopleType; //TODO "ADULT"
          }
          orderPassenger.gender = "MALE"; //TODO 性别 男：MALE 女：FEMALE
          if (persons[i].certType == "HUZHAO") {
            orderPassenger.passengerIDCardType = "PASSPORT";
          } else if (persons[i].certType == "ID_CARD") {
            orderPassenger.passengerIDCardType = "ID";
          } else if (persons[i].certType == "GANGAORESIDENCE") {
            orderPassenger.passengerIDCardType = "RPGA";
          } else if (persons[i].certType == "TAIBAORESIDENCE") {
            orderPassenger.passengerIDCardType = "RPTW";
          } else {
            orderPassenger.passengerIDCardType = persons[i].certType;
          }
          orderPassenger.passengerIDCardNo = removeBlank(persons[i].certNo);
          orderPassenger.passengerBirthday = persons[i].birthday;
          orderPassenger.cellphone = removeBlank(persons[i].phone);
          orderPassenger.telphone = null;
          /** 保险信息 **/
          if (this.insurance.length > 0) {
            if (routeType == "OW") {
              let inlist = [];
              for (let a = 0; a < this.insurance.length; a++) {
                // if(this.showPackageName==true && this.packageInfo!=null && this.packageInfo.businessType=='INSURANCE' && this.packageInfo.id==this.insurance[a].id&& orderPassengers.length>1){
                //   for(let o=0;o<orderPassengers.length;o++){
                //     inlist.push({
                //       insuranceInfoId: this.insurance[a].id,
                //       flightNo: headInfo[0].flightNo
                //     });
                //   }
                // }else{
                  inlist.push({
                    insuranceInfoId: this.insurance[a].id,
                    flightNo: headInfo[0].flightNo
                  });
                // }
              }
              try {
                orderPassenger.flightOrderInsurances = inlist;
              } catch (e) {
                orderPassenger.flightOrderInsurances = null;
              }
            } else {
              let inlist = [];
              for (let a = 0; a < this.insurance.length; a++) {
                inlist.push({
                  insuranceInfoId: this.insurance[a].id,
                  flightNo: headInfo[0].flightNo
                });
              }
              for (let a = 0; a < this.insurance.length; a++) {
                inlist.push({
                  insuranceInfoId: this.insurance[a].id,
                  flightNo: headInfo[1].flightNo
                });
              }
              try {
                orderPassenger.flightOrderInsurances = inlist;
              } catch (e) {
                orderPassenger.flightOrderInsurances = null;
              }
            }
          } else {
            orderPassenger.flightOrderInsurances = null;
          }
          orderPassengers.push(orderPassenger);
        }
        for (let i = 0; i < persons.length; i++) {
          if (persons[i].peopleType == "ADULT") {
            contactName = persons[i].receiverName;
            break;
          }
        }
      }
      if (
        this.rightInsurance.length > 0 &&
        this.insurance.length > 0 &&
        this.rightInsuranceList.length > 0
      ) {
        let rightInsurance = JSON.parse(JSON.stringify(this.rightInsurance)),
          insuranceAllPrice = 0, //保险总价
          airportLength = 0, //免几份份数
          isTrue = false, //是否已满足
          insuranceOWPrice = [], //单价数组
          airportPrice = 0; //已减金额
        for (let f = 0; f < this.insurance.length; f++) {
          insuranceAllPrice =
            insuranceAllPrice +
            this.insurance[f].insurancePrice *
              orderPassengers.length *
              flightInfo.length;
        }
        let insurancesType = ["意外险", "延误险", "旅游意外险", "组合险"];
        let insurancePriceList = [],
          checkedInsurance = JSON.parse(JSON.stringify(this.insurance));
        for (let i = 0; i < insurancesType.length; i++) {
          for (let j = 0; j < checkedInsurance.length; j++) {
            if (insurancesType[i] == checkedInsurance[j].insuranceTypeName) {
              insurancePriceList.push(checkedInsurance[j].insurancePrice);
              checkedInsurance.splice(j, 1);
            }
          }
        }
        if (checkedInsurance.length > 0) {
          checkedInsurance.map(item => {
            insurancePriceList.push(item.insurancePrice);
          });
        }
        insurancePriceList = insurancePriceList.sort(this.compare);
        for (let i = 0; i < rightInsurance.length; i++) {
          if (
            rightInsurance[i].isSelect == true &&
            insuranceAllPrice > airportPrice
          ) {
            if (rightInsurance[i].couponRightType == "RIGHT_FAVOUR_FREE") {
              airportPrice = airportPrice + insuranceAllPrice;
            } else if (
              rightInsurance[i].couponRightType == "RIGHT_FAVOUR_WHOLE"
            ) {
              airportPrice = airportPrice + rightInsurance[i].rightObject;
            } else if (
              rightInsurance[i].couponRightType == "RIGHT_FAVOUR_QUANTITY"
            ) {
              airportLength = airportLength + rightInsurance[i].rightObject;
              isTrue = this.checkedEquity(
                2,
                insuranceAllPrice,
                insurancePriceList,
                airportLength
              ); //是否需要计算航班数量(1 不需要 2 需要 *2)，总价，单价数组，可减份数
            }
            let consumedCoupon = {};
            consumedCoupon.couponCode = rightInsurance[i].couponCode;
            consumedCoupon.couponNo = rightInsurance[i].couponId;
            consumedCoupon.couponName = rightInsurance[i].couponName;
            consumedCoupon.couponType = "RIGHT";
            consumedCoupon.rightCouponType = "RIGHT_INSURANCE";
            this.consumedCouponList.push(consumedCoupon);
            if (isTrue != false) {
              break;
            }
          }
        }
      }
      /*** 订单快递信息 差旅 ***/
      let orderExpress = {},
        taitou = {};
      if (
        this.needVoucher == true &&
        this.reimburse == true &&
        this.businessTravel != true
      ) {
        orderExpress.orderMainId = null;
        orderExpress.expressStatus = null;
        orderExpress.expressType = "EXPRESS";
        if (
          this.chosenMailAddress != null &&
          this.chosenMailAddress != "undefined" &&
          this.chosenMailAddress != ""
        ) {
          let address = this.chosenMailAddress;
          orderExpress.address =
            address.province + address.city + address.county + address.address;
          orderExpress.recipient = address.recipientName;
          orderExpress.telephone = null;
          orderExpress.cellphone = address.mobileNumber;
          orderExpress.postCode = address.postCode;
          orderExpress.expressPrice = null;
          orderExpress.expressFileNo = null;
        }
        if (this.invoiceTitle || this.showInvoice) {
          taitou = this.taitou;
        }
      } else {
        orderExpress = null;
      }
      /*** 航班详情 ***/
      let orderBookingDetailRequests = [];
      if (
        getStore("orderBookingDetailRequests") != null &&
        getStore("orderBookingDetailRequests") != "undefined"
      ) {
        orderBookingDetailRequests = JSON.parse(
          getStore("orderBookingDetailRequests")
        );
      }
      let bookingSource = getBookingSource();
      let tagBusinessType='',
          tagProductId='';
      if(this.showPackageName==true){
        tagBusinessType=this.packageInfo.businessType;
        tagProductId=this.packageInfo.id;
        if(this.packageInfo.businessType=="INSURANCE"){
          for(let i=0;i<this.insurance.length;i++){
            if(this.insurance[i].insuranceClass.id == this.packageInfo.id){
              tagProductId=this.insurance[i].id;
              break;
            }
          }
        }
      }
      //优惠券
      let coupon = JSON.parse(JSON.stringify(this.coupon));
      let discountAmount =
        this.coupon != "" && this.coupon != null
          ? this.coupon.discountAmount
          : 0;
      let money = 0;
      let couponCode = null;
      if (coupon != "" && discountAmount > 0) {
        if (this.couponSwitch == true) {
          money = coupon.discountAmount;
          couponCode = coupon.couponCode;
          let consumedCoupon = {};
          consumedCoupon.couponCode = coupon.couponCode;
          consumedCoupon.couponNo = coupon.couponId;
          consumedCoupon.couponName = coupon.couponName;
          consumedCoupon.couponType = "ACTIVITY";
          this.consumedCouponList.push(consumedCoupon);
        }
      }
      //促销活动
      let activityId = null;
      if (this.pickedActive != "" && this.pickedActive != null) {
        activityId = this.pickedActive.id;
      }
      if (this.invincibleList.length > 0) {
        let oughtPayMoney = this.oughtPayMoney();
        if (activityId != null) {
          oughtPayMoney = oughtPayMoney - this.pickedActive.discountAmount;
        }
        if (couponCode != null) {
          oughtPayMoney = oughtPayMoney - coupon.discountAmount;
        }
        if (oughtPayMoney > 0) {
          let invincibleList = JSON.parse(JSON.stringify(this.invincibleList)),
            invinciblePrice = 0;
          for (let i = 0; i < invincibleList.length; i++) {
            if (
              invincibleList[i].isSelect == true &&
              oughtPayMoney > invinciblePrice
            ) {
              invinciblePrice =
                invinciblePrice + invincibleList[i].discountAmount;
              let consumedCoupon = {};
              consumedCoupon.couponCode = invincibleList[i].couponCode;
              consumedCoupon.couponNo = invincibleList[i].couponId;
              consumedCoupon.couponName = invincibleList[i].couponName;
              consumedCoupon.couponType = "INVINCIBLE";
              this.consumedCouponList.push(consumedCoupon);
            }
          }
        }
      }
      //贵宾室
      let flightOrderVasRequests = [],
        flightOrderVasPrice = [];
      if (this.productsGo != null && this.productsGo.picked == true) {
        flightOrderVasRequests.push({ vasProductId: this.productsGo.id });
        flightOrderVasPrice.push(
          this.productsGo.saleChannelPrices[0].channelSalePrice
        );
      }
      if (this.productsBack != null && this.productsBack.picked == true) {
        flightOrderVasRequests.push({ vasProductId: this.productsBack.id });
        flightOrderVasPrice.push(
          this.productsBack.saleChannelPrices[0].channelSalePrice
        );
      }
      if (
        this.airportVipLounge.length > 0 &&
        flightOrderVasPrice.length > 0 &&
        this.airportVipLoungeList.length > 0
      ) {
        let airportVipLounge = JSON.parse(
            JSON.stringify(this.airportVipLounge)
          ),
          airportVipAllPrice = 0, //贵宾室总价
          airportLength = 0, //免几份份数
          isTrue = false, //是否已满足
          airportPrice = 0; //已减金额
        for (let f = 0; f < flightOrderVasPrice.length; f++) {
          airportVipAllPrice =
            airportVipAllPrice +
            flightOrderVasPrice[f] * orderPassengers.length;
        }
        flightOrderVasPrice = flightOrderVasPrice.sort(this.compare);
        for (let i = 0; i < airportVipLounge.length; i++) {
          if (
            airportVipLounge[i].isSelect == true &&
            airportVipAllPrice > airportPrice
          ) {
            if (airportVipLounge[i].couponRightType == "RIGHT_FAVOUR_FREE") {
              airportPrice = airportPrice + airportVipAllPrice;
            } else if (
              airportVipLounge[i].couponRightType == "RIGHT_FAVOUR_WHOLE"
            ) {
              airportPrice = airportPrice + airportVipLounge[i].rightObject;
            } else if (
              airportVipLounge[i].couponRightType == "RIGHT_FAVOUR_QUANTITY"
            ) {
              airportLength = airportLength + airportVipLounge[i].rightObject;
              isTrue = this.checkedEquity(
                1,
                airportVipAllPrice,
                flightOrderVasPrice,
                airportLength
              ); //是否需要计算航班数量(1 不需要 2 需要 *2)，总价，单价数组，可减份数
            }
            let consumedCoupon = {};
            consumedCoupon.couponCode = airportVipLounge[i].couponCode;
            consumedCoupon.couponNo = airportVipLounge[i].couponId;
            consumedCoupon.couponName = airportVipLounge[i].couponName;
            consumedCoupon.couponType = "RIGHT";
            consumedCoupon.rightCouponType = "AIRPORT_VIP_LOUNGE";
            this.consumedCouponList.push(consumedCoupon);
            if (isTrue != false) {
              break;
            }
          }
        }
      }
      //特惠券
      let specialWorthPickedID = [];
      if (this.specialWorthInfos != null) {
        for (let i = 0; i < this.specialWorthInfos.length; i++) {
          if (this.specialWorthInfos[i].picked == true) {
            if(this.showPackageName==true && this.packageInfo!=null && this.packageInfo.businessType=='TICKET' && this.packageInfo.id==this.specialWorthInfos[i].id&& orderPassengers.length>1){
              for(let o=0;o<orderPassengers.length;o++){
                specialWorthPickedID.push({
                  vasProductId: this.specialWorthInfos[i].id
                });
              }
            }else{
              specialWorthPickedID.push({
                vasProductId: this.specialWorthInfos[i].id
              });
            }
          }
        }
        
      }
      //接送机
      let flightVasTransferDtoList = [],
        transferInfoPrice = 0;
      let transferInfo = this.transferInfoTemp;
      if (transferInfo != "") {
        if (transferInfo.goData.send.able) {
          let transfer = {
            deptPlace: transferInfo.goData.send.deptPlace || "",
            rideTime: transferInfo.goData.send.useTime || "",
            sceneType: transferInfo.goData.send.sceneType || "",
            flightTripType: transferInfo.goData.send.flightTripType || "",
            suppCode: transferInfo.goData.send.car.suppCode || "",
            vehicleCode: transferInfo.goData.send.car.vehicleCode || "",
            vendorCode: transferInfo.goData.send.car.vendorCode || "",
            addressName: transferInfo.goData.send.poiInfo.name || "",
            addressInfo: transferInfo.goData.send.poiInfo.address || "",
            longitude: transferInfo.goData.send.poiInfo.longitude || "",
            latitude: transferInfo.goData.send.poiInfo.latitude || "",
            type: "",
            vasProductName:
              transferInfo.goData.send.vasProductName != "" &&
              transferInfo.goData.send.car.vehicleName != ""
                ? transferInfo.goData.send.vasProductName +
                  "-" +
                  transferInfo.goData.send.car.vehicleName
                : "",
            salesPrice: +transferInfo.goData.send.car.salePrice || "",
            earliestBooking: transferInfo.goData.send.car.earliestBooking
          };
          flightVasTransferDtoList.push(transfer);
          transferInfoPrice =
            transferInfoPrice +
            (parseFloat(transferInfo.goData.send.car.salePrice) || 0);
        }
        if (transferInfo.goData.pick.able) {
          var transfer = {
            deptPlace: transferInfo.goData.pick.deptPlace || "",
            rideTime: transferInfo.goData.pick.useTime || "",
            sceneType: transferInfo.goData.pick.sceneType || "",
            flightTripType: transferInfo.goData.pick.flightTripType || "",
            suppCode: transferInfo.goData.pick.car.suppCode || "",
            vehicleCode: transferInfo.goData.pick.car.vehicleCode || "",
            vendorCode: transferInfo.goData.pick.car.vendorCode || "",
            addressName: transferInfo.goData.pick.poiInfo.name || "",
            addressInfo: transferInfo.goData.pick.poiInfo.address || "",
            longitude: transferInfo.goData.pick.poiInfo.longitude || "",
            latitude: transferInfo.goData.pick.poiInfo.latitude || "",
            type: "",
            vasProductName:
              transferInfo.goData.pick.vasProductName != "" &&
              transferInfo.goData.pick.car.vehicleName != ""
                ? transferInfo.goData.pick.vasProductName +
                  "-" +
                  transferInfo.goData.pick.car.vehicleName
                : "",
            salesPrice: +transferInfo.goData.pick.car.salePrice || "",
            earliestBooking: transferInfo.goData.pick.car.earliestBooking
          };
          flightVasTransferDtoList.push(transfer);
          transferInfoPrice =
            transferInfoPrice +
            (parseFloat(transferInfo.goData.pick.car.salePrice) || 0);
        }
        if (transferInfo.arrivalData.send.able) {
          var transfer = {
            deptPlace: transferInfo.arrivalData.send.deptPlace || "",
            rideTime: transferInfo.arrivalData.send.useTime || "",
            sceneType: transferInfo.arrivalData.send.sceneType || "",
            flightTripType: transferInfo.arrivalData.send.flightTripType || "",
            suppCode: transferInfo.arrivalData.send.car.suppCode || "",
            vehicleCode: transferInfo.arrivalData.send.car.vehicleCode || "",
            vendorCode: transferInfo.arrivalData.send.car.vendorCode || "",
            addressName: transferInfo.arrivalData.send.poiInfo.name || "",
            addressInfo: transferInfo.arrivalData.send.poiInfo.address || "",
            longitude: transferInfo.arrivalData.send.poiInfo.longitude || "",
            latitude: transferInfo.arrivalData.send.poiInfo.latitude || "",
            type: "",
            vasProductName:
              transferInfo.arrivalData.send.vasProductName != "" &&
              transferInfo.arrivalData.send.car.vehicleName != ""
                ? transferInfo.arrivalData.send.vasProductName +
                  "-" +
                  transferInfo.arrivalData.send.car.vehicleName
                : "",
            salesPrice: +transferInfo.arrivalData.send.car.salePrice || "",
            earliestBooking: transferInfo.arrivalData.send.car.earliestBooking
          };
          flightVasTransferDtoList.push(transfer);
          transferInfoPrice =
            transferInfoPrice +
            (parseFloat(transferInfo.arrivalData.send.car.salePrice) || 0);
        }
        if (transferInfo.arrivalData.pick.able) {
          var transfer = {
            deptPlace: transferInfo.arrivalData.pick.deptPlace || "",
            rideTime: transferInfo.arrivalData.pick.useTime || "",
            sceneType: transferInfo.arrivalData.pick.sceneType || "",
            flightTripType: transferInfo.arrivalData.pick.flightTripType || "",
            suppCode: transferInfo.arrivalData.pick.car.suppCode || "",
            vehicleCode: transferInfo.arrivalData.pick.car.vehicleCode || "",
            vendorCode: transferInfo.arrivalData.pick.car.vendorCode || "",
            addressName: transferInfo.arrivalData.pick.poiInfo.name || "",
            addressInfo: transferInfo.arrivalData.pick.poiInfo.address || "",
            longitude: transferInfo.arrivalData.pick.poiInfo.longitude || "",
            latitude: transferInfo.arrivalData.pick.poiInfo.latitude || "",
            type: "",
            vasProductName:
              transferInfo.arrivalData.pick.vasProductName != "" &&
              transferInfo.arrivalData.pick.car.vehicleName != ""
                ? transferInfo.arrivalData.pick.vasProductName +
                  "-" +
                  transferInfo.arrivalData.pick.car.vehicleName
                : "",
            salesPrice: +transferInfo.arrivalData.pick.car.salePrice || "",
            earliestBooking: transferInfo.arrivalData.pick.car.earliestBooking
          };
          flightVasTransferDtoList.push(transfer);
          transferInfoPrice =
            transferInfoPrice +
            (parseFloat(transferInfo.arrivalData.pick.car.salePrice) || 0);
        }
        if (
          this.trafficTransfer.length > 0 &&
          this.trafficTransferList.length > 0
        ) {
          //接送机权益券
          let airportVipLounge = JSON.parse(
              JSON.stringify(this.trafficTransfer)
            ),
            airportVipAllPrice = transferInfoPrice, //贵宾室总价
            airportLength = 0, //免几份份数
            airportPrice = 0; //已减金额
          for (let i = 0; i < airportVipLounge.length; i++) {
            if (
              airportVipLounge[i].isSelect == true &&
              (airportVipAllPrice > airportPrice ||
                airportLength < flightVasTransferDtoList.length)
            ) {
              if (airportVipLounge[i].couponRightType == "RIGHT_FAVOUR_FREE") {
                airportPrice = airportPrice + airportVipAllPrice;
              } else if (
                airportVipLounge[i].couponRightType == "RIGHT_FAVOUR_WHOLE"
              ) {
                airportPrice = airportPrice + airportVipLounge[i].rightObject;
              } else if (
                airportVipLounge[i].couponRightType == "RIGHT_FAVOUR_QUANTITY"
              ) {
                airportLength = airportLength + airportVipLounge[i].rightObject;
              }
              let consumedCoupon = {};
              consumedCoupon.couponCode = airportVipLounge[i].couponCode;
              consumedCoupon.couponNo = airportVipLounge[i].couponId;
              consumedCoupon.couponName = airportVipLounge[i].couponName;
              consumedCoupon.couponType = "RIGHT";
              consumedCoupon.rightCouponType = "TRAFFIC_TRANSFER";
              this.consumedCouponList.push(consumedCoupon);
            }
          }
        }
      }
      let orderRemarks=null;
      if(this.businessTravel&&this.orderRemark!=null && this.orderRemark!=""){
        orderRemarks=[];
        let orderRemark={};
        orderRemark.remarkType="TRAVEL_FRONT";
        orderRemark.remark=this.orderRemark;
        orderRemarks.push(orderRemark);
      }
      let uuid =
        getStore("bookinguuid") != null &&
        getStore("bookinguuid") != "undefined" &&
        getStore("bookinguuid") != ""
          ? getStore("bookinguuid")
          : "";
      let data = {
        routeType: routeType,
        totalSalesAmount: parseFloat(payMoney) + money - transferInfoPrice + "",
        isRebooking: false,
        orderCustomer: {
          customerId: getStore("selectuserid"),
          customerCode: getStore("selectid"),
          customerName: getStore("selectusername"),
          customerLevel: null
        },
        orderContacter: {
          name: contactName,
          cellphone: removeBlank(this.contactPhone),
          orderMainId: null,
          telphone: null,
          email: null,
          confirmType: null,
          emergencyContactName: null,
          emergencyCellphone: null,
          emergencyTelphone: null,
          emergencyEmail: null
        },
        orderBookingDetailRequests: orderBookingDetailRequests,
        orderPassengers: orderPassengers,
        orderExpress: orderExpress,
        invoiceCategory: taitou.geren == true ? "PERSONAL" : "COMPANY",
        invoiceTitle: taitou.geren == true ? taitou.gerenVal : taitou.qiyeVal,
        creditCode: taitou.xycode,
        orderOper: null,
        orderRemarks: orderRemarks,
        bookingSource: bookingSource,
        promotions: [],
        couponCode: couponCode,
        flightOrderVasRequests: flightOrderVasRequests,
        flightOrderVasCouponRequests: specialWorthPickedID,
        flightVasTransferDtoList: flightVasTransferDtoList,
        isAcceptTransferPrice: this.isAcceptTransferPrice, //接送机是否变价
        promotionActivityId: activityId,
        uuid: uuid,
        transDfp:getCookie("BSFIT_DEVICEID")||null,
        projectNo: this.improveContent,
        consumedCouponList: this.consumedCouponList
      };
      if(tagBusinessType!=""&&tagProductId!=""){
        data.tagBusinessType=tagBusinessType;
        data.tagProductId=tagProductId;
      }
      // console.log(data);
      return JSON.stringify(data);
    },
    //缓存手机号
    changeMobile(mobile, type) {
      setStore("flightClick", true);
      //     	if(type=='del'){
      //     		this.contactPhone="";
      // removeStore('contactPhone',this);
      //     	}else{
      this.contactPhone = mobile;
      setStore("contactPhone", mobile);
      // }
    },
    phoneFocus() {
      this.isPhoneFocus = true;
    },
    phoneBlur() {
      let that = this;
      setTimeout(function() {
        that.isPhoneFocus = false;
      }, 50);
    },
    delMobile() {
      this.isPhoneFocus = false;
      this.contactPhone = "";
      removeStore("contactPhone", this);
    },
    //app获取手机
    getContacts() {
      setStore("flightClick", true);
      getElementTag("机票_订单填写_手机通讯录", "FlightFillOrder");
      try {
        NativeUtil.lvCommon("lvJSOpenContacts", {});
      } catch (e) {
        window.location.href =
          "//m.lvmama.com/" +
          this.$parent.baseUrlPath +
          "/ticket/?method=openAddressBook";
      }
    },
    //获取登录信息
    checkedLogin() {
      let that = this;
      if (isClient() == 1) {
        getLvSessionId().then(res => {
          if (res == null || res == undefined || res == "") {
            removeStore("selectuserid", that);
            removeStore("selectusername", that);
            removeStore("selectid", that);
            jumpLogin();
            return;
          }
          getLvUser(res).then(data => {
            that.userid = data.data.userId;
            if (that.userid != "" && that.userid != null) {
              setStore("selectuserid", that.userid);
              let userIdObj = {
                key: "userId",
                val: that.userid
              };
              try {
                that.initData(userIdObj);
              } catch (e) {}
              setStore("selectusername", data.data.userName);
              setStore("selectid", data.data.id);
              if (
                getStore("contactPhone") == null ||
                JSON.parse(getStore("contactPhone")) == "" ||
                checkMobile(removeBlank(getStore("contactPhone"))) == false
              ) {
                that.contactPhone = data.data.mobileNumber;
              } else {
                that.contactPhone = getStore("contactPhone");
              }
            } else {
              removeStore("selectuserid", that);
              removeStore("selectusername", that);
              removeStore("selectid", that);
              jumpLogin();
            }
          });
        });
      } else {
        getLvUserByCookie().then(data => {
          that.userid = data.data.userId;
          if (that.userid != "" && that.userid != null) {
            setStore("selectuserid", that.userid);
            let userIdObj = {
              key: "userId",
              val: that.userid
            };
            try {
              that.initData(userIdObj);
            } catch (e) {}
            setStore("selectusername", data.data.userName);
            setStore("selectid", data.data.id);
            if (
              getStore("contactPhone") == null ||
              JSON.parse(getStore("contactPhone")) == "" ||
              checkMobile(removeBlank(getStore("contactPhone"))) == false
            ) {
              that.contactPhone = data.data.mobileNumber;
            } else {
              that.contactPhone = getStore("contactPhone");
            }
          } else {
            removeStore("selectuserid", that);
            removeStore("selectusername", that);
            removeStore("selectid", that);
            jumpLogin();
          }
        });
      }
    },
    //跳转选择乘机人
    toPassengerList() {
      setStore("flightClick", true);
      this.$router.push(`/${this.$parent.baseUrlPath}/choosePassenger`);
    },
    //跳转新增乘机人
    toPassengerAdd() {
      setStore("flightClick", true);
      this.$router.push(`/${this.$parent.baseUrlPath}/addEditPassenger`);
    },
    //跳转编辑乘机人
    toPassengerEdit(item) {
      setStore("flightClick", true);
      let editPersonMes = {
        key: "editPersonMes",
        val: item
      };
      try {
        this.initData(editPersonMes);
      } catch (e) {}
      this.$router.push(`/${this.$parent.baseUrlPath}/addEditPassenger`);
    },
    //获取票面价
    oughtPayMoney() {
      let oughtPayMoney = 0,
        payMoney = 0;
      oughtPayMoney =
        this.personNumber.ADULTNumber * this.singleFlight.audltSalePrice +
        this.personNumber.ADULTNumber * this.singleFlight.adultPrice +
        this.personNumber.CHILDRENNumber * this.singleFlight.childrenSalePrice +
        this.personNumber.CHILDRENNumber * this.singleFlight.childrenPrice;
      if (
        this.doubleFlight != null &&
        this.singleFlight.saleType != "RoundTripSpecial"
      ) {
        payMoney =
          this.personNumber.ADULTNumber * this.doubleFlight.audltSalePrice +
          this.personNumber.ADULTNumber * this.doubleFlight.adultPrice +
          this.personNumber.CHILDRENNumber *
            this.doubleFlight.childrenSalePrice +
          this.personNumber.CHILDRENNumber * this.doubleFlight.childrenPrice;
        oughtPayMoney = oughtPayMoney + payMoney;
      }
      if (
        this.doubleFlight != null &&
        this.singleFlight.saleType == "RoundTripSpecial"
      ) {
        payMoney =
          this.personNumber.CHILDRENNumber *
            this.doubleFlight.childrenSalePrice +
          this.personNumber.CHILDRENNumber * this.doubleFlight.childrenPrice;
        oughtPayMoney = oughtPayMoney + payMoney;
      }
      setStore("oughtPayMoney", oughtPayMoney);
      return oughtPayMoney;
    },
    //跳转至优惠券页面
    toCoupon() {
      setStore("flightClick", true);
      if (
        this.pickedActive != "" &&
        this.pickedActive != null &&
        this.pickedActive.exclusive == "Y"
      ) {
        this.showDoubleButtom(
          "优惠券不能与活动同时享受，是否继续使用优惠券？",
          "否",
          "是"
        );
        this.leftClickType = "";
        this.rightClickType = "goCoupon";
      } else {
        this.$router.push(`/${this.$parent.baseUrlPath}/couponList`);
      }
    },
    //跳转活动
    toActiveList() {
      this.$router.push(`/${this.$parent.baseUrlPath}/activeList`);
    },
    //跳转保险
    toInsuranceList() {
      console.log("111");
      if (this.clickInsuranceDetail == true) {
        this.clickInsuranceDetail = false;
        return;
      }
      setStore("flightClick", true);
      setStore("passlength", this.selectedPersons.length);
      this.$router.push(`/${this.$parent.baseUrlPath}/insuranceList`);
      getElementTag("机票_订单填写页_保险", "机票订单填写");
    },
    //选择保险
    pickedInsurance(item, index) {
      item.pickedList.picked = !item.pickedList.picked;
      let flag = false,
        insuranceListInfo = JSON.parse(JSON.stringify(this.insuranceListInfo));
      // for(let i=0;i<insuranceListInfo.lenght;i++){
      for (let j = 0; j < insuranceListInfo[index].list.length; j++) {
        if (insuranceListInfo[index].list[j].id == item.pickedList.id) {
          insuranceListInfo[index].list[j].picked = item.pickedList.picked;
          insuranceListInfo[index].pickedList = item.pickedList;
          flag = true;
          break;
        }
      }
      // if(flag==true){
      // 	break;
      // }
      // }
      let insuranceObj = {
        key: "insuranceListInfo",
        val: insuranceListInfo
      };
      try {
        this.initData(insuranceObj);
      } catch (e) {}
      this.insurance = [];
      for (let i = 0; i < insuranceListInfo.length; i++) {
        if (insuranceListInfo[i].list.length > 0) {
          for (let j = 0; j < insuranceListInfo[i].list.length; j++) {
            if (insuranceListInfo[i].list[j].picked == true) {
              this.insurance.push(insuranceListInfo[i].list[j]);
            }
          }
        }
      }
      this.payMoney = this.totalPrices();
    },
    changeEquity() {
      if(this.businessTravel == true){
        this.payMoney = this.totalPrices();
        return;
      }
      let invincibleList = [],
        rightInsurance = [],
        trafficTransfer = [],
        airportVipLounge = [];
      let param = {
        userId: getStore("selectid") != null ? getStore("selectid") : "",
        rightCouponTypes: []
      };
      if (this.insurance.length > 0) {
        let prices = [],
          price = 0;
        for (let i = 0; i < this.insurance.length; i++) {
          prices.push(this.insurance[i].insurancePrice);
          price += +this.insurance[i].insurancePrice;
        }
        let obj = {
          productType: "RIGHT_INSURANCE",
          quantity:
            this.insurance.length *
            this.selectedPersons.length *
            this.flightInfo.length,
          totalPrice:
            price * this.selectedPersons.length * this.flightInfo.length,
          prices: prices
        };
        param.rightCouponTypes.push(obj);
      }
      if (
        (this.transferInfoTemp.goData != undefined &&
          this.transferInfoTemp.goData.send.able &&
          this.transferInfoTemp.goData.send.car != null) ||
        (this.transferInfoTemp.goData != undefined &&
          this.transferInfoTemp.goData.pick.able &&
          this.transferInfoTemp.goData.pick.car != null) ||
        (this.transferInfoTemp.arrivalData != undefined &&
          this.transferInfoTemp.arrivalData.send.able &&
          this.transferInfoTemp.arrivalData.send.car != null) ||
        (this.transferInfoTemp.arrivalData != undefined &&
          this.transferInfoTemp.arrivalData.pick.able &&
          this.transferInfoTemp.arrivalData.pick.car != null)
      ) {
        let prices = [],
          price = 0;
        if (
          this.transferInfoTemp.goData != undefined &&
          this.transferInfoTemp.goData.send.able &&
          this.transferInfoTemp.goData.send.car != null
        ) {
          prices.push(this.transferInfoTemp.goData.send.car.salePrice);
          price += +this.transferInfoTemp.goData.send.car.salePrice;
        }
        if (
          this.transferInfoTemp.goData != undefined &&
          this.transferInfoTemp.goData.pick.able &&
          this.transferInfoTemp.goData.pick.car != null
        ) {
          prices.push(this.transferInfoTemp.goData.pick.car.salePrice);
          price += +this.transferInfoTemp.goData.pick.car.salePrice;
        }
        if (
          this.transferInfoTemp.arrivalData != undefined &&
          this.transferInfoTemp.arrivalData.send.able &&
          this.transferInfoTemp.arrivalData.send.car != null
        ) {
          prices.push(this.transferInfoTemp.arrivalData.send.car.salePrice);
          price += +this.transferInfoTemp.arrivalData.send.car.salePrice;
        }
        if (
          this.transferInfoTemp.arrivalData != undefined &&
          this.transferInfoTemp.arrivalData.pick.able &&
          this.transferInfoTemp.arrivalData.pick.car != null
        ) {
          prices.push(this.transferInfoTemp.arrivalData.pick.car.salePrice);
          price += +this.transferInfoTemp.arrivalData.pick.car.salePrice;
        }
        let obj = {
          productType: "TRAFFIC_TRANSFER",
          quantity: prices.length,
          totalPrice: price,
          prices: prices
        };
        param.rightCouponTypes.push(obj);
      }
      if (
        (this.productsGo != null && this.productsGo.picked == true) ||
        (this.productsBack != null && this.productsBack.picked == true)
      ) {
        let prices = [],
          price = 0;
        if (this.productsGo != null && this.productsGo.picked == true) {
          prices.push(this.productsGo.saleChannelPrices[0].channelSalePrice);
          price += +this.productsGo.saleChannelPrices[0].channelSalePrice;
        }
        if (this.productsBack != null && this.productsBack.picked == true) {
          prices.push(this.productsBack.saleChannelPrices[0].channelSalePrice);
          price += +this.productsBack.saleChannelPrices[0].channelSalePrice;
        }
        let obj = {
          productType: "AIRPORT_VIP_LOUNGE",
          quantity: prices.length * this.selectedPersons.length,
          totalPrice: price * this.selectedPersons.length,
          prices: prices
        };
        param.rightCouponTypes.push(obj);
      }
      if (param.rightCouponTypes.length > 0 && this.oughtPayMoney() > 0) {
        this.$parent.showLoading = true;
        getRightCouponList(JSON.stringify(param)).then(
          result => {
            this.$parent.showLoading = false;
            if (result && result.data && result.data.length > 0) {
              result.data.map((item, index) => {
                if (item.productType == "RIGHT_INSURANCE") {
                  rightInsurance = this.isSelected(
                    item.unionUserCoupon,
                    this.rightInsurance
                  );
                  this.rightInsuranceList = rightInsurance;
                } else if (item.productType == "TRAFFIC_TRANSFER") {
                  trafficTransfer = this.isSelected(
                    item.unionUserCoupon,
                    this.trafficTransfer
                  );
                  this.trafficTransferList = trafficTransfer;
                } else if (item.productType == "AIRPORT_VIP_LOUNGE") {
                  airportVipLounge = this.isSelected(
                    item.unionUserCoupon,
                    this.airportVipLounge
                  );
                  this.airportVipLoungeList = airportVipLounge;
                }
              });
              rightInsurance = JSON.parse(JSON.stringify(rightInsurance));
              let rightInsuranceObj = {
                key: "rightInsurance",
                val: rightInsurance
              };
              this.initData(rightInsuranceObj);
              trafficTransfer = JSON.parse(JSON.stringify(trafficTransfer));
              let trafficTransferObj = {
                key: "trafficTransfer",
                val: trafficTransfer
              };
              this.initData(trafficTransferObj);
              airportVipLounge = JSON.parse(JSON.stringify(airportVipLounge));
              let airportVipLoungeObj = {
                key: "airportVipLounge",
                val: airportVipLounge
              };
              this.initData(airportVipLoungeObj);
            } else {
              this.rightInsuranceList = [];
              this.trafficTransferList = [];
              this.airportVipLoungeList = [];
            }
            this.payMoney = this.totalPrices();
          },
          () => {
            this.$parent.showLoading = false;
          }
        );
      } else {
        this.payMoney = this.totalPrices();
      }
    },
    //优惠券
    validate(val, param) {
      if (this.coupon != "" && this.coupon.couponCode != null) {
        if (this.coupon.quantity == 2) {
          validateCoupon(
            this.coupon.couponCode,
            getStore("selectuserid") != null ? getStore("selectuserid") : "",
            val,this.couponListRequest
          ).then(res => {
            let coupons = JSON.parse(JSON.stringify(this.coupon));
            if (
              res &&
              res.data &&
              res.data.first &&
              res.data.second.youhuiAmount > 0
            ) {
              coupons.couponCode = res.data.second.couponCode;
              coupons.discountAmount = res.data.second.youhuiAmount;
              if (this.pickedActive != "" && this.pickedActive != null) {
                if (this.pickedActive.exclusive == "Y") {
                  if (coupons.click == true) {
                    this.pickedActive = "";
                  } else {
                    coupons != "" ? (coupons.discountAmount = null) : "";
                  }
                }
              }
            } else {
              coupons != "" ? (coupons.discountAmount = null) : "";
            }
            let coupon = {
              key: "coupon",
              val: coupons
            };
            try {
              this.initData(coupon);
            } catch (e) {}
            this.payMoney = this.totalPrices();
            if (this.pickedActive == "") {
              setStore("pickedActive", true);
            } else {
              removeStore("pickedActive", this);
            }
          });
        } else {
          getCouponList(
            val,
            getStore("selectuserid") != null ? getStore("selectuserid") : "",
            this.couponListRequest
          ).then(res => {
            let data = [],
              coupons = JSON.parse(JSON.stringify(this.coupon));
            let invincibleList = [],
              rightInsurance = [],
              trafficTransfer = [],
              airportVipLounge = [];
            if (res && res.code == 1 && res.data && res.data.length > 0) {
              //	调最优权益券接口
              // if(param.rightCouponTypes.length>0){
              // 	getRightCouponList(JSON.stringify(param)).then((result) => {
              // 		if(result && result.data && result.data.length>0){
              // 			result.data.map((item,index) => {
              // 				if(item.productType == 'RIGHT_INSURANCE'){
              // 					rightInsurance = this.isSelected(item.unionUserCoupon,this.rightInsurance);
              // 					this.rightInsuranceList = rightInsurance;
              // 				}else if(item.productType == 'TRAFFIC_TRANSFER'){
              // 					trafficTransfer = this.isSelected(item.unionUserCoupon,this.trafficTransfer);
              // 					this.trafficTransferList = trafficTransfer;
              // 				}else if(item.productType == 'AIRPORT_VIP_LOUNGE'){
              // 					airportVipLounge = this.isSelected(item.unionUserCoupon,this.airportVipLounge);
              // 					this.airportVipLoungeList = airportVipLounge;
              // 				}
              // 			})
              // 			rightInsurance=JSON.parse(JSON.stringify(rightInsurance));
              // 			let rightInsuranceObj = {
              // 				key: 'rightInsurance',
              // 				val: rightInsurance
              // 			};
              // 			this.initData(rightInsuranceObj);
              // 			trafficTransfer=JSON.parse(JSON.stringify(trafficTransfer));
              // 			let trafficTransferObj = {
              // 				key: 'trafficTransfer',
              // 				val: trafficTransfer
              // 			};
              // 			this.initData(trafficTransferObj);
              // 			airportVipLounge=JSON.parse(JSON.stringify(airportVipLounge));
              // 			let airportVipLoungeObj = {
              // 				key: 'airportVipLounge',
              // 				val: airportVipLounge
              // 			};
              // 			this.initData(airportVipLoungeObj);
              // 		}else {
              // 			this.rightInsuranceList = [];
              // 			this.trafficTransferList = [];
              // 			this.airportVipLoungeList = [];
              // 		}
              // 	});
              // }
              this.changeEquity();
              if (res && res.data && res.data.length > 0) {
                res.data.map((item, index) => {
                  if (item.couponCategory == "ACTIVITY") {
                    data.push(item);
                  } else if (item.couponCategory == "INVINCIBLE") {
                    invincibleList.push(item);
                  }
                });
                data = JSON.parse(JSON.stringify(data));
                let couponList = {
                  key: "couponList",
                  val: data
                };
                this.initData(couponList);
                invincibleList = JSON.parse(
                  JSON.stringify(
                    this.isSelected(invincibleList, this.invincibleList)
                  )
                );
                this.invincibleListArr = invincibleList;
                let invincible = {
                  key: "invincibleList",
                  val: invincibleList
                };
                this.initData(invincible);
                if (data.length > 0) {
                  if (coupons.click == true) {
                    for (let i = 0; i < data.length; i++) {
                      if (data[i].couponCode == coupons.couponCode) {
                        coupons = JSON.parse(JSON.stringify(data[i]));
                        coupons.click = true;
                        if (
                          this.pickedActive != "" &&
                          this.pickedActive != null
                        ) {
                          if (this.pickedActive.exclusive == "Y") {
                            this.pickedActive = "";
                          }
                        }
                        break;
                      } else {
                        coupons != "" ? (coupons.discountAmount = null) : "";
                      }
                    }
                  } else {
                    let max = data.length > 0 ? data[0].discountAmount : 0,
                      index = 0;
                    for (let i = 0; i < data.length; i++) {
                      if (data[i].discountAmount > max) {
                        max = data[i].discountAmount;
                        index = i;
                      }
                    }
                    coupons = JSON.parse(JSON.stringify(data[index]));
                    if (this.pickedActive != "" && this.pickedActive != null) {
                      if (this.pickedActive.exclusive == "Y") {
                        coupons != "" ? (coupons.discountAmount = null) : "";
                      }
                    }
                  }
                } else {
                  removeStore("couponList", this);
                  coupons != "" ? (coupons.discountAmount = null) : "";
                }
              } else {
                removeStore("couponList", this);
                coupons != "" ? (coupons.discountAmount = null) : "";
                this.rightInsuranceList = [];
                this.trafficTransferList = [];
                this.airportVipLoungeList = [];
                this.invincibleListArr = [];
              }
            } else {
              removeStore("couponList", this);
              coupons != "" ? (coupons.discountAmount = null) : "";
              this.rightInsuranceList = [];
              this.trafficTransferList = [];
              this.airportVipLoungeList = [];
              this.invincibleListArr = [];
            }

            let coupon = {
              key: "coupon",
              val: coupons
            };
            try {
              this.initData(coupon);
            } catch (e) {}
            this.payMoney = this.totalPrices();
            if (this.pickedActive == "") {
              setStore("pickedActive", true);
            } else {
              removeStore("pickedActive", this);
            }
          });
        }
      } else {
        getCouponList(
          val,
          getStore("selectuserid") != null ? getStore("selectuserid") : "",
          this.couponListRequest
        ).then(res => {
          let data = [],
            coupons = JSON.parse(JSON.stringify(this.coupon));
          let invincibleList = [],
            rightInsurance = [],
            trafficTransfer = [],
            airportVipLounge = [];
          if (res && res.code == 1 && res.data && res.data.length > 0) {
            //	调最优权益券接口
            // if(param.rightCouponTypes.length>0){
            // 	getRightCouponList(JSON.stringify(param)).then((result) => {
            // 		if(result && result.data && result.data.length>0){
            // 			result.data.map((item,index) => {
            // 				if(item.productType == 'RIGHT_INSURANCE'){
            // 					rightInsurance = this.isSelected(item.unionUserCoupon,this.rightInsurance);
            // 					this.rightInsuranceList = rightInsurance;
            // 				}else if(item.productType == 'TRAFFIC_TRANSFER'){
            // 					trafficTransfer = this.isSelected(item.unionUserCoupon,this.trafficTransfer);
            // 					this.trafficTransferList = trafficTransfer;
            // 				}else if(item.productType == 'AIRPORT_VIP_LOUNGE'){
            // 					airportVipLounge = this.isSelected(item.unionUserCoupon,this.airportVipLounge);
            // 					this.airportVipLoungeList = airportVipLounge;
            // 				}
            // 			})
            // 			rightInsurance=JSON.parse(JSON.stringify(rightInsurance));
            // 			let rightInsuranceObj = {
            // 				key: 'rightInsurance',
            // 				val: rightInsurance
            // 			};
            // 			this.initData(rightInsuranceObj);
            // 			trafficTransfer=JSON.parse(JSON.stringify(trafficTransfer));
            // 			let trafficTransferObj = {
            // 				key: 'trafficTransfer',
            // 				val: trafficTransfer
            // 			};
            // 			this.initData(trafficTransferObj);
            // 			airportVipLounge=JSON.parse(JSON.stringify(airportVipLounge));
            // 			let airportVipLoungeObj = {
            // 				key: 'airportVipLounge',
            // 				val: airportVipLounge
            // 			};
            // 			this.initData(airportVipLoungeObj);
            // 		}else{
            // 			this.rightInsuranceList = [];
            // 			this.trafficTransferList = [];
            // 			this.airportVipLoungeList = [];
            // 		}
            // 	});
            // }
            this.changeEquity();
            if (res && res.data && res.data.length > 0) {
              res.data.map((item, index) => {
                if (item.couponCategory == "ACTIVITY") {
                  data.push(item);
                } else if (item.couponCategory == "INVINCIBLE") {
                  invincibleList.push(item);
                }
              });
              data = JSON.parse(JSON.stringify(data));
              let couponList = {
                key: "couponList",
                val: data
              };
              this.initData(couponList);
              invincibleList = JSON.parse(
                JSON.stringify(
                  this.isSelected(invincibleList, this.invincibleList)
                )
              );
              this.invincibleListArr = invincibleList;
              let invincible = {
                key: "invincibleList",
                val: invincibleList
              };
              this.initData(invincible);
              if (data.length > 0) {
                let max = data.length > 0 ? data[0].discountAmount : 0,
                  index = 0;
                for (let i = 0; i < data.length; i++) {
                  if (data[i].discountAmount > max) {
                    max = data[i].discountAmount;
                    index = i;
                  }
                }
                coupons = data[index] || "";
                if (this.pickedActive != "" && this.pickedActive != null) {
                  if (this.pickedActive.exclusive == "Y") {
                    coupons != "" ? (coupons.discountAmount = null) : "";
                  }
                }
              } else {
                removeStore("couponList", this);
                coupons != "" ? (coupons.discountAmount = null) : "";
              }
            } else {
              removeStore("couponList", this);
              coupons != "" ? (coupons.discountAmount = null) : "";
              this.rightInsuranceList = [];
              this.trafficTransferList = [];
              this.airportVipLoungeList = [];
              this.invincibleListArr = [];
            }
          } else {
            removeStore("couponList", this);
            coupons != "" ? (coupons.discountAmount = null) : "";
            this.rightInsuranceList = [];
            this.trafficTransferList = [];
            this.airportVipLoungeList = [];
            this.invincibleListArr = [];
          }
          coupons!=""?coupons.quantity = 1:"";
          let coupon = {
            key: "coupon",
            val: coupons
          };
          try {
            this.initData(coupon);
          } catch (e) {}

          this.payMoney = this.totalPrices();
        });
      }
    },
    isSelected(newArr, oldArr) {
      if (newArr.length > 0) {
        if (oldArr.length > 0) {
          for (let i = 0; i < newArr.length; i++) {
            let flag = false;
            for (let j = 0; j < oldArr.length; j++) {
              if (
                newArr[i].couponCode == oldArr[j].couponCode &&
                oldArr[j].isSelect
              ) {
                newArr[i].isSelect = true;
                flag = true;
                break;
              }
            }
            if (!flag) {
              newArr[i].isSelect = false;
            }
          }
        } else {
          for (let i = 0; i < newArr.length; i++) {
            newArr[i].isSelect = false;
          }
        }
      }
      return newArr;
    },

    //获取所选增值产品的单价list
    productPriceList(type) {
      let productTypePriceList = "";
      if (type == "insurance") {
        let insurancesType = ["意外险", "延误险", "旅游意外险", "组合险"];
        let insurancePriceList = [],
          checkedInsurance = JSON.parse(JSON.stringify(this.insurance)),
          totalPrice = 0;
        if (checkedInsurance && checkedInsurance.length > 0) {
          for (let i = 0; i < insurancesType.length; i++) {
            for (let j = 0; j < checkedInsurance.length; j++) {
              if (insurancesType[i] == checkedInsurance[j].insuranceTypeName) {
                insurancePriceList.push(checkedInsurance[j].insurancePrice);
                totalPrice += +checkedInsurance[j].insurancePrice;
                checkedInsurance.splice(j, 1);
              }
            }
          }
          if (checkedInsurance.length > 0) {
            checkedInsurance.map(item => {
              totalPrice += +item.insurancePrice;
              insurancePriceList.push(item.insurancePrice);
            });
          }

          productTypePriceList = {
            totalPrice:
              totalPrice * this.selectedPersons.length * this.flightInfo.length,
            priceList:
              insurancePriceList.length > 0
                ? insurancePriceList.sort(this.compare)
                : [],
            presonsAmount: this.selectedPersons.length,
            flightInfo: this.flightInfo.length
          };
        }
      } else if (type == "transfer") {
        let transferPriceList = [],
          totalPrice = 0;
        if (
          this.transferInfoTemp.goData != undefined &&
          this.transferInfoTemp.goData.send.able &&
          this.transferInfoTemp.goData.send.car != null
        ) {
          transferPriceList.push(
            this.transferInfoTemp.goData.send.car.salePrice
          );
          totalPrice += +this.transferInfoTemp.goData.send.car.salePrice;
        }
        if (
          this.transferInfoTemp.goData != undefined &&
          this.transferInfoTemp.goData.pick.able &&
          this.transferInfoTemp.goData.pick.car != null
        ) {
          transferPriceList.push(
            this.transferInfoTemp.goData.pick.car.salePrice
          );
          totalPrice += +this.transferInfoTemp.goData.pick.car.salePrice;
        }
        if (
          this.transferInfoTemp.arrivalData != undefined &&
          this.transferInfoTemp.arrivalData.send.able &&
          this.transferInfoTemp.arrivalData.send.car != null
        ) {
          transferPriceList.push(
            this.transferInfoTemp.arrivalData.send.car.salePrice
          );
          totalPrice += +this.transferInfoTemp.arrivalData.send.car.salePrice;
        }
        if (
          this.transferInfoTemp.arrivalData != undefined &&
          this.transferInfoTemp.arrivalData.pick.able &&
          this.transferInfoTemp.arrivalData.pick.car != null
        ) {
          transferPriceList.push(
            this.transferInfoTemp.arrivalData.pick.car.salePrice
          );
          totalPrice += +this.transferInfoTemp.arrivalData.pick.car.salePrice;
        }
        productTypePriceList = {
          totalPrice: totalPrice,
          priceList:
            transferPriceList.length > 0
              ? transferPriceList.sort(this.compare)
              : [],
          presonsAmount: this.selectedPersons.length,
          flightInfo: this.flightInfo.length
        };
      } else if (type == "airportVip") {
        let airportVipPriceList = [],
          totalPrice = 0;
        if (this.productsGo != null && this.productsGo.picked == true) {
          airportVipPriceList.push(
            this.productsGo.saleChannelPrices[0].channelSalePrice
          );
          totalPrice += +this.productsGo.saleChannelPrices[0].channelSalePrice;
        }
        if (this.productsBack != null && this.productsBack.picked == true) {
          airportVipPriceList.push(
            this.productsBack.saleChannelPrices[0].channelSalePrice
          );
          totalPrice += +this.productsBack.saleChannelPrices[0]
            .channelSalePrice;
        }
        productTypePriceList = {
          totalPrice: totalPrice * this.selectedPersons.length,
          priceList:
            airportVipPriceList.length > 0
              ? airportVipPriceList.sort(this.compare)
              : [],
          presonsAmount: this.selectedPersons.length,
          flightInfo: this.flightInfo.length
        };
      } else if (type == "invincible") {
        //	无敌券
        let totalPrice = 0;
        totalPrice = this.oughtPayMoney();

        productTypePriceList = {
          totalPrice: totalPrice
        };
      }
      return productTypePriceList;
    },
    //点击去权益券列表
    rightFavourClick(type) {
      let productTypePriceList = this.productPriceList(type);
      productTypePriceList = JSON.parse(JSON.stringify(productTypePriceList));
      let obj = {
        key: "productTypePriceList",
        val: productTypePriceList
      };
      this.initData(obj);
      this.$router.push(`/${this.$parent.baseUrlPath}/flightEquity/${type}`);
    },
    //监控价格变化
    priceWatch(curVal, oldVal) {
      let oldPayMoney = this.oldPayMoney,
        oughtPayMoney = this.oughtPayMoney();
      let param = {
        userId: getStore("selectid") != null ? getStore("selectid") : "",
        rightCouponTypes: []
      };
      if (this.insurance.length > 0) {
        let prices = [],
          price = 0;
        for (let i = 0; i < this.insurance.length; i++) {
          prices.push(this.insurance[i].insurancePrice);
          price += +this.insurance[i].insurancePrice;
        }
        let obj = {
          productType: "RIGHT_INSURANCE",
          quantity:
            this.insurance.length *
            this.selectedPersons.length *
            this.flightInfo.length,
          totalPrice:
            price * this.selectedPersons.length * this.flightInfo.length,
          prices: prices
        };
        param.rightCouponTypes.push(obj);
      }
      if (
        (this.transferInfoTemp.goData != undefined &&
          this.transferInfoTemp.goData.send.able &&
          this.transferInfoTemp.goData.send.car != null) ||
        (this.transferInfoTemp.goData != undefined &&
          this.transferInfoTemp.goData.pick.able &&
          this.transferInfoTemp.goData.pick.car != null) ||
        (this.transferInfoTemp.arrivalData != undefined &&
          this.transferInfoTemp.arrivalData.send.able &&
          this.transferInfoTemp.arrivalData.send.car != null) ||
        (this.transferInfoTemp.arrivalData != undefined &&
          this.transferInfoTemp.arrivalData.pick.able &&
          this.transferInfoTemp.arrivalData.pick.car != null)
      ) {
        let prices = [],
          price = 0;
        if (
          this.transferInfoTemp.goData != undefined &&
          this.transferInfoTemp.goData.send.able &&
          this.transferInfoTemp.goData.send.car != null
        ) {
          prices.push(this.transferInfoTemp.goData.send.car.salePrice);
          price += +this.transferInfoTemp.goData.send.car.salePrice;
        }
        if (
          this.transferInfoTemp.goData != undefined &&
          this.transferInfoTemp.goData.pick.able &&
          this.transferInfoTemp.goData.pick.car != null
        ) {
          prices.push(this.transferInfoTemp.goData.pick.car.salePrice);
          price += +this.transferInfoTemp.goData.pick.car.salePrice;
        }
        if (
          this.transferInfoTemp.arrivalData != undefined &&
          this.transferInfoTemp.arrivalData.send.able &&
          this.transferInfoTemp.arrivalData.send.car != null
        ) {
          prices.push(this.transferInfoTemp.arrivalData.send.car.salePrice);
          price += +this.transferInfoTemp.arrivalData.send.car.salePrice;
        }
        if (
          this.transferInfoTemp.arrivalData != undefined &&
          this.transferInfoTemp.arrivalData.pick.able &&
          this.transferInfoTemp.arrivalData.pick.car != null
        ) {
          prices.push(this.transferInfoTemp.arrivalData.pick.car.salePrice);
          price += +this.transferInfoTemp.arrivalData.pick.car.salePrice;
        }
        let obj = {
          productType: "TRAFFIC_TRANSFER",
          quantity: prices.length,
          totalPrice: price,
          prices: prices
        };
        param.rightCouponTypes.push(obj);
      }
      if (
        (this.productsGo != null && this.productsGo.picked == true) ||
        (this.productsBack != null && this.productsBack.picked == true)
      ) {
        let prices = [],
          price = 0;
        if (this.productsGo != null && this.productsGo.picked == true) {
          prices.push(this.productsGo.saleChannelPrices[0].channelSalePrice);
          price += +this.productsGo.saleChannelPrices[0].channelSalePrice;
        }
        if (this.productsBack != null && this.productsBack.picked == true) {
          prices.push(this.productsBack.saleChannelPrices[0].channelSalePrice);
          price += +this.productsBack.saleChannelPrices[0].channelSalePrice;
        }
        let obj = {
          productType: "AIRPORT_VIP_LOUNGE",
          quantity: prices.length * this.selectedPersons.length,
          totalPrice: price * this.selectedPersons.length,
          prices: prices
        };
        param.rightCouponTypes.push(obj);
      }

      if (this.couponSwitch == true && this.businessTravel != true) {
        if (oldPayMoney != oughtPayMoney) {
          this.validate(oughtPayMoney, param);
        }
      }

      this.oldPayMoney = oughtPayMoney;
    },
    //跳转邮寄地址选择
    toChooseAddress() {
      setStore("flightClick", true);
      this.$router.push(`/${this.$parent.baseUrlPath}/chooseAddress`);
    }
  },

  computed: {
    ...mapState([
      "insuranceListInfo",
      "departureCity",
      "arrivalCity",
      "isDouble",
      "noticeDetail",
      "commonPersonMes",
      "selectedPersons",
      "knockOrReduced",
      "transferInfo",
      "activeList",
      "coupon",
      "couponList",
      "chosenMailAddress",
      "needVoucher",
      "businessTravel",
      "invincibleList",
      "rightInsurance",
      "trafficTransfer",
      "airportVipLounge",
      "isKangLvUser",
      "packageInfo",
    ])
  },
  watch: {
    payMoney: "priceWatch",
    scrollLocation(newVal, oldVal) {
      if (newVal > 100) {
        this.showOrderTopMsg = true;
      } else {
        this.showOrderTopMsg = false;
      }
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../../style/mixin";
.orderForm {
  @include wh(100%,100%);
  background-color: #eeeef5;
  position: relative;
  .orderline {
    @include orderline();
  }
  .herf_arrow{
    @include wh(0.16rem,0.26rem);
    @include ct();
    background: url("//m.lvmama.com/flight/image/detail_arrow.png") no-repeat;
    background-size: 100%;
    right: .2rem;
  }
  .equity_arrow{
    @include wh(0.09rem,0.152rem);
    @include ct();
    background: url("//m.lvmama.com/flight/image/herf_arrow.png") no-repeat;
    background-size: 100% 100%;
    right: 0;
  }
  i.single{
    @include wh(.52rem,.28rem);
    @include ct();
    background: url(//m.lvmama.com/flight/image/oneway.png) no-repeat;
    background-size: 100%;
  }
  i.doubleTo{
    @include wh(.52rem,.28rem);
    @include ct();
    background: url(//m.lvmama.com/flight/image/doubleGo.png) no-repeat;
    background-size: 100%;
  }
  i.doubleFrom{
    @include wh(.52rem,.28rem);
    @include ct();
    background: url(//m.lvmama.com/flight/image/doubleFrom.png) no-repeat;
    background-size: 100%;
  }
  > div.overflowH {
    overflow: hidden;
  }
  .equityClass.equityNewClass {
    margin-left: -0.2rem;
    width: 106%;
    top: .1rem;
    position: relative;
  }
  .equityClass.newEquityClass{
    margin-left: -0.2rem;
    top: 0px;
    width: 103%;
    position: relative;
  }
  .equityClass {
    background-color: #f6f6fa;
    // margin-left: -0.26rem;
    border-radius: 0 0 6px 6px;
    height: 0.86rem;
    line-height: 0.86rem;
  }
  .equityClass > p {
    > span:first-child {
      font-size: 0.22rem;
      border: 1px #bbb solid;
      padding: 0 0.1rem;
      border-radius: 2px;
      color: #666;
      margin-right: 0.1rem;
      margin-left: 0.26rem;
    }
    > span:nth-child(2) {
      font-size: 0.26rem;
    }
    > span:nth-child(3) {
      font-size: 0.24rem;
      right: 0.4rem;
      position: absolute;
      color: #999;
      > i {
        right: -0.2rem;
      }
    }
    > span:nth-child(3).insurance {
     right:.6rem;
    }
  }
  .article {
    @include heightByAbsolute(0.9rem,0);
    overflow-y: scroll;
    padding: 0 0.2rem;
    .pointer {
      display: inline-block;
      @include wh(0.16rem,0.26rem);
      background: url("//m.lvmama.com/flight/image/detail_arrow.png") no-repeat;
      background-size: 100%;
    }
    > div {
      margin-top: 0.2rem;
    }
    .flightInfos{
      width: 100%;
      overflow: hidden;
      margin-top: 0.2rem;
      background-color: #fff;
      border-radius: 6px;
      box-shadow: 0 2px 6px 0 rgba(0,0,0,0.05);
      >div{
         position: relative;
      }
      .packageTitle{
        @include sc(.24rem,#FF8800);
        margin: 0 .2rem .2rem;
      }
      .ticket{
        .first-ch{
          @include wh(32%,1.32rem);
          display: inline-block;
          .special{
              height: 2.04rem;
              position: absolute;
              padding-top: 9%;
              >span:first{
                margin: 40% .4rem 0 0;
              }
          }
          >div{
            margin: .25rem 0 .25rem .2rem;
            border-right: 1px #ddd solid;
            >span{
              display: block;
            }
            >span:nth-child(1){
              font-weight: 600;
            }
            >span:nth-child(2){
              @include sc(.24rem,#999);
              margin-top: .1rem;
            }
          }
        }
        .first-info{
          display: inline-block;
          @include wh(67%,1.32rem);
          position: absolute;
          >div{
            margin: .25rem;
            >span{
              display: block;
              position: relative;
              >span{
                margin-left: .62rem;
                font-weight: 600;
              }
            }
            >span:nth-child(2){
              margin-top: .1rem;
              font-size: .24rem;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
            }
          }
        }
      }
      .ticket:nth-child(2){
          margin-top: -.2rem;
      }
      .instructions{
        margin: .2rem;
        >p{
          display: inline-block;
          width: 100%;
          margin-top:0.04rem;
          >span{
            position: relative;
            padding-left: 0.02rem;
          }
        }
        >p.itOne{
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          width: 96%;
          color: #999;
        }
        // >p:first-child{
        //   margin-bottom:.05rem;
        // }
        i{
          @include wh(0.26rem,0.29rem);
          @include ct();
          background: url("//m.lvmama.com/flight/image/prompt1.png") no-repeat center;
          background-size: 0.25rem;
        }
        i.children{
          background: url("//m.lvmama.com/flight/image/children.png") no-repeat center;
          background-size: 0.25rem;
        }
        i.luggage{
          background: url("//m.lvmama.com/flight/image/luggage.png") no-repeat center;
          background-size: 0.25rem;
        }
        i.trip{
          background: url("//m.lvmama.com/flight/image/trip.png") no-repeat center;
          background-size: 0.25rem;
        }
        em{
          @include sc(.24rem,#999);
          margin-left: .3rem;
          margin-right: .2rem;
        }
        em.pay{
          margin-left: 0;
        }
      }
      .orderLine{
        @include orderline();
        margin: 0 3% !important;
        width: 94%;  
      }
    }
    .ticketInfos {
      width: 100%;
      overflow: hidden;
      margin-top: 0.2rem;
      background-color: #fff;
      border-radius: 6px;
      box-shadow: 0.04rem 0.04rem 0.04rem rgba(0, 0, 0, 0.1);
      .ticket {
        position: relative;
        @include sc(0.3rem,$c00);
        .first-ch {
          position: relative;
          padding-left: 0.25rem;
          margin: 0.3rem 0;
          .singleIcon {
            position: absolute;
            @include wh(0.4rem,0.4rem);
            background: url("//m.lvmama.com/flight/image/img.png") no-repeat -4.54rem -6.36rem;
            background-size: 6rem;
          }
          .doubleIcon {
            position: absolute;
            @include wh(0.4rem,0.4rem);
            background: url("//m.lvmama.com/flight/image/img.png") no-repeat -4.54rem -5.62rem;
            background-size: 6rem;
          }
          .actDate {
            padding-left: 0.6rem;
          }
          .chSpan1 {
            padding-left: 0.1rem;
          }
          .chSpan2 {
            padding-left: 0.15rem;
            display: inline-block;
            width: 3.2rem;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
          .chSpan2_ {
            width: auto;
          }
        }
        .ion:after {
          content: "";
          @include wh(0.16rem,0.16rem);
          @include ctr(-45deg);
          border-right: 1px solid #aaa;
          border-bottom: 1px solid #aaa;
          right: 0.2rem;
        }
      }

      .price-show {
        line-height: 0.44rem;
        font-size: 0.22rem;
        padding: 0.2rem 0;
        position: relative;
        border: none;
        > p {
          padding-left: 0.25rem;
          > span {
            @include sc(0.26rem,$c00);
            line-height: 0.44rem;
            text-align: left;
            position: relative;
            display: inline-block;
            margin-right: 0.3rem;
          }
        }
      }
      .new_endorse {
        width: 100%;
        line-height: 0.4rem;
        @include sc(0.28rem,#4997e7);
        padding: 0.2rem 0.25rem;
        box-sizing: border-box;
        > span {
          display: inline-block;
          width: 32%;
          color: #4997e7;
        }
        > p {
          line-height: normal;
          @include sc(0.24rem,#9f9f9f);
          margin-top: 0.1rem;
        }
      }
    }
    .passenger {
      background-color: #fff;
      border-radius: 6px;
      padding-left: 0.26rem;
      > div {
        @include sc(0.28rem,#000);
        background-color: #fff;
        line-height: 0.5rem;
        padding: 0.18rem 0 0.09rem 0;
        position: relative;
      }
      .orderline {
        @include orderline();
      }
      .notice_container {
        @include wh(auto,0.6rem);
        box-sizing: border-box;
        @include sc(0.28rem,#666);
        overflow: hidden;
        margin-left: -0.26rem;
        border-radius: 6px;
      }
      .add {
        border-radius: 6px;
        padding-left: 0;
        border-bottom: none;
        padding-bottom: 0;
        > p {
          @include sc(0.28rem,#333);
          font-weight: 600;
          height: 0.46rem;
          line-height: 0.39rem;
          padding-left: 0;
          > span {
            @include sc(0.22rem,#aaa);
            // padding-left: 0.2rem;
            > em {
              color: #ff5f42;
            }
            > i {
              @include sc(0.2rem,#999);
              margin-left: 0.1rem;
            }
          }
        }
      }
      .oldMessage {
        height: auto;
        padding-bottom: 0.1rem;
        box-sizing: border-box;
        overflow: hidden;
        position: relative;
        margin: 0 0.1rem 0 0;
        padding: 0 0 0.1rem 0;
        > i {
          display: block;
          @include wh(0.32rem,0.32rem);
          @include ct();
          background: url("//m.lvmama.com/flight/image/tanhao.png") 0 0
            no-repeat;
          background-size: 100% 100%;
          margin-left: 0.1rem;
        }
        > div {
          @include sc(0.24rem,#c4873e);
          width: 100%;
          padding: 0.1rem 0.5rem;
          background-color: #fffcdc;
          line-height: 0.35rem;
        }
        > span {
          @include wh(0.32rem,0.32rem);
          @include ct();
          display: block;
          background: url("//m.lvmama.com/flight/image/cancle.png") 0 0
            no-repeat;
          background-size: 100% 100%;
          right: 0.1rem;
        }
      }
      .allPersonsContainer {
        // padding-top: 0.1rem;
        padding-bottom: 0.3rem;
        box-sizing: border-box;
        overflow: hidden;
        > li {
          @include wh(1.48rem,0.56rem);
          line-height: 0.56rem;
          border: 1px solid #f0f0f0;
          border-radius: 0.04rem;
          float: left;
          margin-top: 0.2rem;
          margin-right: 0.2rem;
          position: relative;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          font-size: .24rem;
          text-align: center;
        }
        > li:last-child {
          color: #666;
        }
        > li > i {
          display: inline-block;
          @include wh(0.24rem,0.24rem);
          background: url("//m.lvmama.com/flight/image/redpoint.png") 0 0
            no-repeat;
          background-size: 100% 100%;
          // margin-right: 0.1rem;
        }
        .personIn {
          background: url("//m.lvmama.com/flight/image/picked1.png") 0 0
            no-repeat;
          background-size: 100% 100%;
          border: none;
        }
      }
      .pr{
          padding-right: .2rem;
      }
      .mpn {
        @include sc(0.28rem,#333);
        font-weight: 600;
        overflow: hidden;
        line-height: 0.86rem;
        position: relative;
        > input {
          height: 0.5rem;
          margin-left: 0.52rem;
          @include sc(0.28rem,#000);
          border: none;
          width: 45%;
        }
        > span.iphoneicon {
          @include wh(.75rem,0.86rem);
          @include ct();
          right: 0;
           background: url("//m.lvmama.com/flight/image/addressbook.png") no-repeat center;
          -webkit-background-size: .3rem;
          background-size: .3rem;
          display: inline-block;
        }
        .cancel_icon_container {
          display: inline-block;
          @include wh(0.6rem,100%);
          position: absolute;
          top: 0;
          right: 1rem;
          .cancel_cion_wrap {
            display: inline-block;
            @include wh(14px,14px);
            background: url("//m.lvmama.com/flight/image/cancle.png") 0 0
              no-repeat;
            background-size: 100%;
          }
        }
      }
      .selected {
        color: #000;
        padding :0;
        border-bottom: none;
        padding-right: .2rem;
        > span {
          @include ct();
          @include wh(0.37rem,0.4rem);
          background: url("//m.lvmama.com/flight/image/delpeople.png") no-repeat center;
          background-size: 80%;
          display: inline-block;
          left: 0;
        }
        .per {
          padding: 0.2rem 0 .13rem .54rem;
          >p {
            font-size: .24rem;
            >span{
              font-size: .26rem;
              margin-left: .5rem;
            }
          }
          >p:first-child{
            font-size: .3rem;
          }
          .finishPhoneNum {
            @include ct();
            @include sc(.24rem,#999);
            right: .5rem;
          }
          // .finishPhoneNum:after {
          //   content: "";
          //   @include wh(0.16rem,0.16rem);
          //   margin-left: 0.1rem;
          //   border-right: 1px solid #aaa;
          //   border-bottom: 1px solid #aaa;
          //   position: absolute;
          //   right: 0.2rem;
          //   top: 50%;
          //   transform: rotate(-45deg) translateY(-50%);
          // }
        }
        .orderlinepess {
          display: block;
          background: url("//m.lvmama.com/flight/image/orderline.png") 0 bottom
            repeat-x #fff;
          background-size: auto 0.2rem;
          margin: 0 !important;
          width: 100%;
          height: 1px !important;
          padding: 0 !important;
          border-bottom: none !important;
        }
      }
    }
    .kangLv_container {
      .insurance-span {
        font-size: 0.3rem;
        color: #000;
        height: 0.6rem;
        line-height: 0.6rem;
        padding-right: 0.1rem !important;
      }
      .kanglv_logo {
        width: auto;
        padding: .01rem 0.1rem;
        background: #cea548;
        color: #fff;
        font-size: 0.2rem;
        border-radius: 0.05rem;
      }
      .kangLv_tip {
        color: #000;
        font-size: 0.24rem;
        padding-bottom: 0.2rem;
      }
    }
    .active {
      background-color: #fff;
      @include sc(0.3rem,#272727);
      border-radius: 6px;
      padding: 0.2rem 0 0.2rem 0.26rem;
      position: relative;
      margin-top: 0.2rem;
      > a > div {
        > p {
          > span {
            right: 0.5rem;
            position: absolute;
            color: #d00375;
            padding-left: 0.64rem;
          }
          .pointer {
            right: 0.2rem;
            background: url("//m.lvmama.com/flight/image/pointer.png") 0 0
              no-repeat;
            background-size: 100%;
            display: inline-block;
            @include wh(0.18rem,0.3rem);
            @include ct();
          }
        }
      }
    }
    .specialWorthContainer.equityTrue {
      padding: .15rem 0.2rem 0;
    }
    .specialWorthContainer {
      background: #fff;
      border-radius: 6px;
      padding: .15rem 0.2rem 0.1rem;
      box-sizing: border-box;
      > p {
        @include sc(0.3rem,#333);
        font-weight: 600;
      }
      .specialWorthWrap {
        @include wh(100%,auto);
        margin-top: 0.2rem;
        overflow: hidden;
        .specialWorthItemPicked {
          border-color: #f80;
          color: #f80 !important;
        }
        .specialWorthItemPickeds{
          background: url('//m.lvmama.com/flight/image/specialPicked.png') 0 0 no-repeat;
          background-size: 100% 100%;
          border-radius: 0;
          border: none;
        }
        > li {
          @include wh(31.5%,1.92rem);
          border: 1px solid #f0f0f0;
          border-radius: 0.1rem;
          position: relative;
          float: left;
          margin-right: 0.17rem;
          margin-bottom: 0.2rem;
          overflow: hidden;
          .specialWorthItemPickerPicked {
            background: #f80 !important;
          }
          .specialWorthItemPickerPicked:after {
            border-right: 1px solid #fff;
            border-bottom: 1px solid #fff;
          }

          .specialWorthItemPicker {
            @include wh(0.6rem,0.6rem);
            border-radius: .2rem 0 0;
            position: absolute;
            top: -.3rem;
            left: -.3rem;
            transform: rotateZ(45deg);
          }
          // .specialWorthItemPicker:after {
          //   content: "";
          //   @include wh(0.1rem,0.2rem);
          //   position: absolute;
          //   top: 0.15rem;
          //   left: 0.4rem;
          // }
          > div > p {
            display: block;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow-x: hidden;
          }
          > div > p:nth-child(2) {
            @include wh(90%,0.45rem);
            margin: 0.2rem auto 0;
            font-size: 0.32rem;
            text-align: center;
            -webkit-align-items: baseline;
            -moz-align-items: baseline;
            -ms-align-items: baseline;
            -o-align-items: baseline;
            align-items: baseline;
          }
          > div > p:nth-child(3) {
            @include sc(0.24rem,#666);
            height: 0.4rem;
            text-align: center;
          }
          > div > p:nth-child(4) {
            @include sc(0.2rem,#666);
            @include wh(1.75rem,0.4rem);
            margin: 0 auto;
            border-bottom: 1px solid #f0f0f0;
            text-align: center;
          }
          > p {
            @include sc(0.22rem,#f80);
            line-height: 0.5rem;
          }
        }
        > li:nth-child(3n) {
          margin-right: 0 !important;
        }
      }
    }
    .airport-transfer {
      background-color: #fff;
      border-radius: 6px;
      padding-left: 0.2rem;
      overflow: hidden;
      .title {
        @include sc(0.3rem,#333);
        height: 0.9rem;
        line-height: 0.9rem;
        font-weight: 600;
      }
      .transfer:last-child{
        border-bottom: 0px solid #e4e4e4;
      }
      .transfer {
        // border-bottom: 1px solid #e4e4e4;
        @include bottomline();
        .meet-airport {
          position: relative;
          width: 100%;
          padding-left: 0.1rem;
          img {
            @include wh(.86rem,0.8rem);
            @include ct();
          }
          .meet {
            position: relative;
            left: 1.3rem;
            width: 4.5rem;
            padding: 0.2rem 0;
            > p:nth-child(1) {
              padding-bottom: 0.1rem;
            }
            .meet-cont {
              .transfer_icon {
                @include wh(0.34rem,0.34rem);
                @include borderRadius(0.06rem);
                @include sc(0.2rem,#fff);
                margin-right: 0.1rem;
              }
              .send {
                background: #44bcea;
              }
              .pick {
                background: #0c6;
              }
              .car_type {
                @include sc(0.2rem,#999);
                margin-left: 0.15rem;
              }
            }
            > p:nth-child(2) {
              padding-bottom: 0.05rem;
              .meet-timeIcon {
                background: url("//m.lvmama.com/flight/image/check_icon.png")
                  no-repeat bottom;
                background-size: 0.2rem;
                -webkit-background-size: 0.2rem;
                display: inline-block;
                @include wh(0.2rem,0.24rem);
                position: relative;
              }
              .meet-wait {
                @include sc(0.24rem,#333);
                position: relative;
                top: -0.03rem;
                .singleIcon {
                  display: inline-block;
                  @include wh(0.25rem,0.2rem);
                  background: url("//m.lvmama.com/flight/image/singlejt.png")
                    no-repeat;
                  background-size: 100%;
                  margin: 0 0.1rem;
                }
                .doubleIcon {
                  display: inline-block;
                  @include wh(0.25rem,0.2rem);
                  background: url("//m.lvmama.com/flight/image/doublejt.png")
                    no-repeat;
                  background-size: 100%;
                  margin: 0 0.1rem;
                }
              }
            }
            .car_time {
              @include sc(0.24rem,#333);
              .meet-timeIcon {
                margin-right: .2rem;
              }
            }
            .car_line {
              @include sc(0.24rem,#333);
              .meet-timeIcon {
                background: url("//m.lvmama.com/flight/image/check_icon.png")
                  no-repeat bottom;
                background-size: 0.2rem;
                -webkit-background-size: 0.2rem;
                display: inline-block;
                @include wh(0.2rem,0.24rem);
                position: relative;
                margin-right: .2rem;
              }
            }
            .meet-depart {
              @include sc(0.3rem,#333);
            }
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
          .meet-not {
            right: 0.48rem;
            transform: translateY(-50%);
            @include sc(0.24rem,#999);
            @include ct();
          }
          .car_price {
            @include sc(0.28rem,#333);
            em {
              @include sc(0.28rem,#333);
            }
          }
          .pointer {
            @include ct();
            right: 0.2rem;
          }
        }
      }
      .prompt {
        @include sc(0.24rem,#000);
        height: 0.84rem;
        line-height: 0.84rem;
        span {
          @include sc(0.2rem,#666);
          position: relative;
          padding-right: 0.3rem;
          padding-left: .2rem;
          em {
            background: url("//m.lvmama.com/flight/image/check_icon.png") no-repeat center;
            background-size: 0.2rem;
            -webkit-background-size: 0.2rem;
            display: inline-block;
            @include wh(.4rem,.4rem);
            position: relative;
            vertical-align: middle;
          }
        }
        >span:first-child{
          padding-left: 0;
        }
      }
    }
    .insuranceInformation{
      background-color: #fff;
      border-radius: 6px;
      .title{
        line-height: .44rem;
        font-weight: 600;
        padding: .15rem .2rem 0;
        position: relative;
        >span{
          @include sc(.24rem,#999);
          right: .4rem;
          @include ct();
        }
        >i{
          @include wh(0.09rem,0.152rem);
          @include ct();
          right: .2rem;
          background: url('//m.lvmama.com/flight/image/herf_arrow.png') no-repeat;
          background-size: 100% 100%;
        }
      }
      .container:last-child{
        border-bottom: 0px #e4e4e4 solid;
      }
      .container.insurance{
        border-bottom: 0px #e4e4e4 solid;
        padding-left: 0;
      }
      .container{
        height: .9rem;
        line-height: .9rem;
        margin:  0 .2rem;
        position: relative;
        color: #333;
        // border-bottom: 1px #e4e4e4 solid;
        @include bottomline();
        >span:first-child{
          @include ct();
          @include wh(.5rem,.5rem);
          background: url('//m.lvmama.com/flight/image/reduction.png') no-repeat center;
          background-size: .32rem;
        }
        >span:first-child.vouchers{
          background: url('//m.lvmama.com/flight/image/vouchers.png') no-repeat center;
          background-size: .32rem;
        }
        >span:first-child.invincible{
          width: .9rem;
          background: url('//m.lvmama.com/flight/image/invincible.png') no-repeat center;
          background-size: .74rem .32rem;
        }
        >span:first-child.insurance{
          display: none;
        }
        .preferentialContainer{
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          width: 65%;
          display: inline-block;
          margin-left: .5rem;
          font-size: .26rem;
          >em{
            font-size: .24rem;
          }
          >i{
            font-size: .28rem;
          }
        }
        .preferentialContainer.insurance{
          margin-left: 0;
          padding-left: 0; 
        }
        .preferentialContainer.invincible{
          margin-left: .92rem;
        }
        .select{
          @include sc(.24rem,#999);
          right: 0;
          position: absolute;
          padding-right: .2rem;
        }
      }
    }
    // .insurance {
    //   @include sc(0.3rem,#000);
    //   font-size: 0.3rem;
    //   color: #000;
    //   background-color: #fff;
    //   border-radius: 6px;
    //   padding-left: 0.26rem;
    //   p:first-child {
    //     line-height: 0.8rem;
    //     position: relative;
    //     .insurances {
    //       right: 0.2rem;
    //       @include wh(0.18rem,0.3rem);
    //       @include ct();
    //     }
    //     .insurance-span {
    //       display: inline-block;
    //       padding-right: 0.4rem;
    //     }
    //   }
    //   .unit-price {
    //     float: right;
    //     font-size: 0.3rem;
    //     width: 4.55rem;
    //     text-align: right;
    //     overflow: hidden;
    //     text-overflow: ellipsis;
    //     white-space: nowrap;
    //     margin-right: 0.5rem;
    //   }
    // }
    .insurance_pick_container {
      margin: .2rem;
      margin-top: .15rem;
      // padding-bottom: .2rem;
      .insurance_item {
        @include wh(100%,auto);
        padding: .2rem 0;
        // border-bottom: 1px solid #e4e4e4;
        @include bottomline();
        line-height: .4rem;
        > div:first-child {
          width: 68%;
          > p {
            @include sc(0.26rem,#666);
          }
        }
        > div:nth-child(2) {
          width: 32%;
          > p {
            @include sc(0.2rem,#666);
            span {
              @include sc(0.24rem,#333);
            }
          }
          .font{
            font-size: .24rem;
          }
        }
        .insurance_ask {
          @include wh(0.24rem,0.24rem);
          display: inline-block;
          background: url("//m.lvmama.com/bus/image/insuranceAsk.png") 0
            0 no-repeat;
          background-size: 100% 100%;
          margin-left: 0.1rem;
          margin-bottom: -.02rem;
        }
      }
      .insurance_item:last-child {
        border: none;
        padding-bottom: .1rem;
      }
    }
    .coupon {
      @include sc(0.3rem,#272727);
      background-color: #fff;
      border-radius: 6px;
      height: 0.8rem;
      line-height: 0.8rem;
      padding-left: 0.2rem;
      position: relative;
      .couponMoney {
        color: #fe3c71;
      }
      p > span {
        color: #aaa;
        padding-left: 0.64rem;
      }
      p > i {
        right: 0.2rem;
        @include ct();
        @include wh(0.18rem,0.3rem);
      }
    }
    .voucher-addr {
      @include sc(0.28rem,#666);
      line-height: 0.86rem;
      background-color: #fff;
      border-radius: 6px;
      padding-left: 0.26rem;
      .orderline{
        width: 96% !important;
      }
      > p {
        padding-right: 1.2rem;
        position: relative;
      }

      .invoiceHeight {
        height: auto;
        span:first-child {
          font-size: .28rem;
          font-weight: 600;
          width: 1.88rem;
          display: inline-block;
        }
        // i {
        //   @include sc(0.3rem,#000);
        //   padding-left: 0;
        // }
        .switch {
          @include wh(1rem,0.6rem);
          border-radius: 1rem;
          border: 1px solid #ccc;
          background-color: #fff;
          -webkit-transition: 0.2s background-color;
          transition: 0.2s background-color;
          right: .2rem;
          @include ct();
          .switch-btn {
            @include wh(0.64rem,0.60rem);
            border-radius: 50%;
            position: absolute;
            top: -1px;
            left: 0;
            border: 1px solid #ccc;
            background-color: #fff;
            box-shadow: 1px 0 4px #ccc;
            -webkit-transition: 0.2s left;
            transition: 0.2s left;
          }
        }
        .switch-on {
          background-color: #f80;
          border: 1px solid #f80;
          .switch-btn {
            border: 1px solid #f80;
            box-shadow: 0 0 0 #ccc;
            right: 0;
            left: 34%;
          }
        }
        .sendContent {
          @include sc(0.24rem,#999);
          display: block;
          margin-top: -0.2rem;
          padding-bottom: 0.2rem;
          line-height: normal;
          >em{
            color: #999;
          }
          .hidden {
            visibility: hidden;
          }
        }
      }
      .taitou {
        position: relative;
        height: 1.72rem;
        // .title {
        //   @include sc(0.3rem,#000);
        //   @include ct();
        //   width: 24%;
        // }
        .value {
          position: absolute;
          width: 100%;
          top: 0;
          right: 0;
          .cons {
            // @include sc(0.3rem,#000);
            height: 1rem;
            position: relative;
            .icons.q{
              margin-left: 1.4rem;
            }
            .icons {
              @include wh(1.2rem,.56rem);
              @include ct();
              float: left;
              border-radius: 2px;
              border: 1px #ccc solid;
              line-height: .56rem;
              text-align: center;
              font-size: .24rem;
              > i:last-child {
                margin-left: 0.1rem;
              }
              .icon {
                @include wh(0.34rem,0.34rem);
                border-radius: 50%;
                margin: 0.04rem 0 0.02rem;
                border: 1px solid #aaa;
                float: left;
                position: relative;
                top: 0.2rem;
              }
              .icon:after {
                @include wh(0.08rem,0.14rem);
                left: 0.1rem;
                top: 0.04rem;
                border-bottom: 2px solid #aaa;
                border-right: 2px solid #aaa;
                content: "";
                position: absolute;
                transform: rotate(45deg);
                -webkit-transform: rotate(45deg);
              }
            }
            .checkIcon {
              background: url('//m.lvmama.com/flight/image/picked1.png')no-repeat;
              background-size: 100% 100%;
              border: none;
              color: #f80;
              height: .55rem;
            }
          }
          > span{
            margin-top: -.2rem;
            position: absolute;
            width: 95%;
            > input {
              border: none;
              width: 95%;
            }
          } 
        }
      }
      .postAddressClass {
        @include sc(0.3rem,#272727);
        .onespan {
          position: inherit;
          width: 100%;
          display: inline-block;
          > input {
            border: none;
            width: 95%;
          }
        }
        .twospan {
          @include wh(1rem,0.86rem);
          > span {
            @include wh(12px,12px);
            @include ct();
            right: 0.18rem;
            display: inline-block;
            background: url("//m.lvmama.com/flight/image/wenhao4.png") no-repeat;
            background-size: 100%;
            margin-right: 0.1rem;
          }
        }
      }
      .post {
        @include sc(0.28rem,#666);
        > span {
          line-height: 0.86rem;
          color: #666;
          position: absolute;
          left: 1.96rem;
          right: 0.6rem;
          > i {
            display: -webkit-box;
            overflow: hidden;
            height: 0.86rem;
            text-align: left;
            color: #000;
            >span{
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              width: 100%;
              position: absolute;
            }
          }
        }
      }
      // .post:after {
      //   content: "";
      //   @include wh(0.2rem,0.2rem);
      //   border-right: 1px solid #666;
      //   border-bottom: 1px solid #666;
      //   position: absolute;
      //   right: 0.18rem;
      //   top: 50%;
      //   -webkit-transform: rotate(-45deg) translateY(-50%);
      //   transform: rotate(-45deg) translateY(-50%);
      // }
    }
    .module{
      margin-bottom: .2rem;
      background: #fff;
      border-radius: .1rem;
      padding: 0.02rem .2rem;
      margin-top: .2rem;
      height: 1rem;
      position: relative;
      >span:first-child{
        font-weight: 600;
        vertical-align: .36rem;
      }
      textarea{
        border: 0;
        width: 90%;
        line-height: .44rem;
        height: 100%;
        color: #333;
        padding: .26rem 0 .24rem .5rem;
      }
    }
    .booking-notes {
      @include sc(0.24rem,#999);
      margin: 0.2rem 0 1.6rem;
      > i {
        // @include wh(0.34rem,0.34rem);
        // border-radius: 50%;
        // margin: 0.04rem 0.16rem 0.02rem 0.13rem;
        // border: 1px solid #aaa;
        margin: 0 .1rem 0 0;
        float: left;
        position: relative;
      }
      // > i:after {
      //   left: 0.1rem;
      //   top: 0.04rem;
      //   border-bottom: 2px solid #aaa;
      //   border-right: 2px solid #aaa;
      //   content: "";
      //   position: absolute;
      //   @include wh(0.08rem,0.14rem);
      //   transform: rotate(45deg);
      //   -webkit-transform: rotate(45deg);
      // }
      // > i.confirm-mes {
      //   border-color: #32c671;
      //   background-color: #32c671;
      // }
      // > i.confirm-mes:after {
      //   border-color: #fff;
      // }
      > span {
        @include sc(0.24rem,#151515);
      }
    }
  }
  .matteDetail{
    @include wh(100%,100%);
    background-color: rgba(0, 0, 0, 0.5);
    position: fixed;
    top: 0;
    left: 0;
    z-index: 20;
  }
  .matteDetailValue{
    @include wh(100%,10.68rem);
    bottom: 0;
    position: absolute;
    overflow-y: scroll;
    left: 0;
    z-index: 20;
    background-color: #fff;
    transition: all 0.2s ease-in 0s;
    border-radius: 5px 5px 0 0;
      .title{
        @include sc(.32rem,#333);
        margin: .38rem 0;
        text-align: center;
      }
      .container{
        height: 9.5rem;
        overflow-y: auto;
        position: relative;
        padding: 0 .4rem 2.56rem;
        text-align: left;
        >p{
          @include sc(.24rem,#666);
          display: initial;
        }
      }
      .buttom{
        height: 2.56rem;
        width: 100%;
        position: absolute;
        bottom: 0;
        background: linear-gradient(-180deg,rgba(255,255,255,0) 0,#FFF 50%);
        >span{
          bottom: .28rem;
          text-align: center;
          position: absolute;
          left: 2.5%;
          line-height: .88rem;
          background: linear-gradient(90deg,#FE686C 0,#FD3C71 100%);
          border-radius: 100px;
          @include sc(.36rem,#fff);
          @include wh(95%,.88rem);
        }
      }
    }
  // .vasCounpDetail {
  //   @include wh(100%,100%);
  //   background-color: rgba(0, 0, 0, 0.5);
  //   position: fixed;
  //   top: 0;
  //   left: 0;
  //   z-index: 20;
  //   padding-top: 0.94rem;
  //   padding-bottom: 0.98rem;
  //   .main-content {
  //     @include wh(6.8rem,auto);
  //     padding: 0.4rem 0.3rem;
  //     box-sizing: border-box;
  //     background: #fff;
  //     color: #000;
  //     border-radius: 0.1rem;
  //     position: relative;
  //     > div {
  //       .main-name {
  //         @include sc(0.36rem,inherit);
  //         line-height: 0.38rem;
  //         font-weight: 400;
  //         padding-bottom: 0.2rem;
  //       }
  //       .plane-info {
  //         border-top: 1px solid #ddd;
  //         > p {
  //           margin-top: 0.3rem;
  //           font-size: 0.28rem;
  //           > span:first-child {
  //             width: 1.7rem;
  //             color: #666;
  //             align-items: flex-start;
  //             float: left;
  //             display: inline-block;
  //           }
  //           > span:nth-child(2) {
  //             width: 4.4rem;
  //             color: #000;
  //             display: inline-block;
  //           }
  //         }
  //       }
  //     }
  //   }
  // }
  .confirm-mask {
    position: absolute;
    @include wh(100%,100%);
    z-index: 99800;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.5);
    .comfirm-info {
      @include center();
      width: 5.2rem;
      background-color: #ffffff;
      border-radius: 6px;
      z-index: 99900;
      padding-top: 0.1rem;
      > div {
        padding-top: 0.2rem;
        padding-left: 0.3rem;
        position: relative;
        > p {
          color: #000000;
          padding-left: 0.2rem;
          > span:first-child {
            display: inline-block;
            width: 3.6rem;
            line-height: 0.5rem;
            font-size: 0.26rem;
            opacity: 0;
            transform: translateY(0.1rem);
            -webkit-transform: translateY(0.1rem);
            animation: showInfo 0.5s linear 0s 1 forwards;
            -webkit-animation: showInfo 0.5s linear 0s 1 forwards;
            -moz-animation: showInfo 0.5s linear 0s 1 forwards;
            -o-animation: showInfo 0.5s linear 0s 1 forwards;
          }
          > span:last-child {
            @include wh(0.6rem,0.5rem);
            position: relative;
            display: inline-block;
            vertical-align: bottom;
            line-height: 0.5rem;
            font-size: 0.26rem;
            opacity: 0;
            transform: translateY(0);
            -webkit-transform: translateY(0);
            animation: toggle 0.5s linear 0s 1 forwards;
            -webkit-animation: toggle 0.5s linear 0s 1 forwards;
            -moz-animation: toggle 0.5s linear 0s 1 forwards;
            -o-animation: toggle 0.5s linear 0s 1 forwards;
          }
        }
        > p.infos {
          > span:last-child:after {
            content: "";
            @include wh(0.14rem,0.28rem);
            position: absolute;
            top: 42%;
            right: 0.1rem;
            border-left: 2px solid #fe3c71;
            border-top: 2px solid #fe3c71;
            -webkit-transform: translateY(-50%) rotate(-135deg);
            transform: translateY(-50%) rotate(-135deg);
          }
        }
        > p:first-child {
          @include sc(0.22rem,#666);
          padding-left: 0;
          opacity: 0;
          transform: translateY(0.1rem);
          -webkit-transform: translateY(0.1rem);
          animation: showInfo 0.5s linear 0s 1 forwards;
          -webkit-animation: showInfo 0.5s linear 0s 1 forwards;
          -moz-animation: showInfo 0.5s linear 0s 1 forwards;
          -o-animation: showInfo 0.5s linear 0s 1 forwards;
        }
      }
      > div.confirm-go > p:nth-child(2) > span:first-child {
        -webkit-animation-delay: 0.5s;
        -moz-animation-delay: 0.5s;
        -o-animation-delay: 0.5s;
        animation-delay: 0.5s;
      }

      > div.confirm-go > p:nth-child(2) > span:last-child {
        -webkit-animation-delay: 1s;
        -moz-animation-delay: 1s;
        -o-animation-delay: 1s;
        animation-delay: 1s;
      }

      > div.confirm-go > p:nth-child(3) > span:first-child {
        -webkit-animation-delay: 1.5s;
        -moz-animation-delay: 1.5s;
        -o-animation-delay: 1.5s;
        animation-delay: 1.5s;
      }

      > div.confirm-go > p:nth-child(3) > span:last-child {
        -webkit-animation-delay: 2s;
        -moz-animation-delay: 2s;
        -o-animation-delay: 2s;
        animation-delay: 2s;
      }

      > div.confirm-go > p:nth-child(4) > span:first-child {
        -webkit-animation-delay: 2.5s;
        -moz-animation-delay: 2.5s;
        -o-animation-delay: 2.5s;
        animation-delay: 2.5s;
      }

      > div.confirm-go > p:nth-child(4) > span:last-child {
        -webkit-animation-delay: 3s;
        -moz-animation-delay: 3s;
        -o-animation-delay: 3s;
        animation-delay: 3s;
      }

      > div.comfirm-pass > p:first-child {
        -webkit-animation-delay: 3.5s;
        -moz-animation-delay: 3.5s;
        -o-animation-delay: 3.5s;
        animation-delay: 3.5s;
      }

      > div.comfirm-pass > p:nth-child(2) > span {
        -webkit-animation-delay: 4s;
        -moz-animation-delay: 4s;
        -o-animation-delay: 4s;
        animation-delay: 4s;
      }
      > div.confirm-back > p:first-child {
        -webkit-animation-delay: 3.5s;
        -moz-animation-delay: 3.5s;
        -o-animation-delay: 3.5s;
        animation-delay: 3.5s;
      }

      > div.confirm-back > p:nth-child(2) > span:first-child {
        -webkit-animation-delay: 4s;
        -moz-animation-delay: 4s;
        -o-animation-delay: 4s;
        animation-delay: 4s;
      }

      > div.confirm-back > p:nth-child(2) > span:last-child {
        -webkit-animation-delay: 4.5s;
        -moz-animation-delay: 4.5s;
        -o-animation-delay: 4.5s;
        animation-delay: 4.5s;
      }

      > div.confirm-back > p:nth-child(3) > span:first-child {
        -webkit-animation-delay: 5s;
        -moz-animation-delay: 5s;
        -o-animation-delay: 5s;
        animation-delay: 5s;
      }

      > div.confirm-back > p:nth-child(3) > span:last-child {
        -webkit-animation-delay: 5.5s;
        -moz-animation-delay: 5.5s;
        -o-animation-delay: 5.5s;
        animation-delay: 5.5s;
      }

      > div.confirm-back > p:nth-child(4) > span:first-child {
        -webkit-animation-delay: 6s;
        -moz-animation-delay: 6s;
        -o-animation-delay: 6s;
        animation-delay: 6s;
      }

      > div.confirm-back > p:nth-child(4) > span:last-child {
        -webkit-animation-delay: 6.5s;
        -moz-animation-delay: 6.5s;
        -o-animation-delay: 6.5s;
        animation-delay: 6.5s;
      }
      > div.comfirm-pass {
        padding-bottom: 0.3rem;
        > p:first-child {
          -webkit-animation-delay: 3.5s;
          -moz-animation-delay: 3.5s;
          -o-animation-delay: 3.5s;
          animation-delay: 3.5s;
        }
        > p:nth-child(2) > span {
        }
        > i {
          @include wh(0.18rem,0.32rem);
          position: absolute;
          top: 54%;
          right: 0.52rem;
          border-left: 2px solid #fe3c71;
          border-top: 2px solid #fe3c71;
          -webkit-transform: translateY(-50%) rotate(-135deg);
          transform: translateY(-50%) rotate(-135deg);
          opacity: 0;
          animation: showInfon 0.5s linear 4.5s 1 forwards;
          -webkit-animation: showInfon 0.5s linear 4.5s 1 forwards;
          -moz-animation: showInfon 0.5s linear 4.5s 1 forwards;
          -o-animation: showInfon 0.5s linear 4.5s 1 forwards;
        }
      }
      > div.waiting {
        @include wh(100%,0.88rem);
        border-top: 1px solid #ddd;
        text-align: center;
        padding-left: 0;
        padding-top: 0;
        > span {
          line-height: 0.88rem;
          padding-left: 0.3rem;
          > i {
            @include wh(0.4rem,0.4rem);
            position: absolute;
            top: 0.24rem;
            left: 1.5rem;
            background: url("//m.lvmama.com/flight/image/order-loading.png")
              no-repeat;
            background-size: 0.4rem;
            -webkit-background-size: 0.4rem;
            animation: loading 1s linear 0s infinite;
            -webkit-animation: loading 1s linear 0s infinite;
            -moz-animation: loading 1s linear 0s infinite;
            -o-animation: loading 1s linear 0s infinite;
          }
        }
      }
    }
    .dbl-confirm > div.comfirm-pass > p:first-child {
      -webkit-animation-delay: 7s;
      -moz-animation-delay: 7s;
      -o-animation-delay: 7s;
      animation-delay: 7s;
    }

    .dbl-confirm > div.comfirm-pass > p:nth-child(2) > span {
      -webkit-animation-delay: 7.5s;
      -moz-animation-delay: 7.5s;
      -o-animation-delay: 7.5s;
      animation-delay: 7.5s;
    }
    .dbl-confirm > div.comfirm-pass > i {
      -webkit-animation-delay: 8s;
      -moz-animation-delay: 8s;
      -o-animation-delay: 8s;
      animation-delay: 8s;
    }
  }
  @keyframes loading {
    from {
      transform: rotate(0);
      -webkit-transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
      -webkit-transform: rotate(360deg);
    }
  }

  @-webkit-keyframes loading {
    from {
      -webkit-transform: rotate(0);
      transform: rotate(0);
    }
    to {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }
  @keyframes showInfo {
    from {
      opacity: 0;
      transform: translateY(0.1rem);
      -webkit-transform: translateY(0.1rem);
    }
    to {
      opacity: 1;
      transform: translateY(0);
      -webkit-transform: translateY(0);
    }
  }

  @-webkit-keyframes showInfo {
    from {
      -webkit-transform: translateY(0.1rem);
      opacity: 0;
      transform: translateY(0.1rem);
    }
    to {
      -webkit-transform: translateY(0);
      opacity: 1;
      transform: translateY(0);
    }
  }
  @keyframes showInfon {
    from {
      opacity: 0;
      transform: translateY(-50%) rotate(-135deg);
      -webkit-transform: translateY(-50%) rotate(-135deg);
    }
    to {
      opacity: 1;
      transform: translateY(-50%) rotate(-135deg);
      -webkit-transform: translateY(-50%) rotate(-135deg);
    }
  }

  @-webkit-keyframes showInfon {
    from {
      -webkit-transform: translateY(-50%) rotate(-135deg);
      transform: translateY(-50%) rotate(-135deg);
      opacity: 0;
    }
    to {
      -webkit-transform: translateY(-50%) rotate(-135deg);
      transform: translateY(-50%) rotate(-135deg);
      opacity: 1;
    }
  }
  @keyframes toggle {
    from {
      opacity: 0;
      transform: translateY(0);
      -webkit-transform: translateY(0);
    }
    to {
      opacity: 1;
      transform: translateY(0);
      -webkit-transform: translateY(0);
    }
  }

  @-webkit-keyframes toggle {
    from {
      opacity: 0;
      transform: translateY(0);
      -webkit-transform: translateY(0);
    }
    to {
      opacity: 1;
      transform: translateY(0);
      -webkit-transform: translateY(0);
    }
  }
  .footer {
    @include sc(0.3rem,#fff);
    @include wh(100%,0.98rem);
    position: absolute;
    bottom: 0;
    left: 0;
    z-index: 17;
    background-color: #fff;
    line-height: 0.98rem;
    box-shadow: 0 0 8px 0 rgba(0,0,0,0.10);
    .opacity{
      opacity: .5;
    }
    > span {
      @include sc(0.24rem,#666);
      width: 61.3%;
      float: left;
      padding-left: 0.2rem;
      position: relative;
      > i {
        @include sc(0.44rem,#ff6600);
        font-weight: 600;
      }
      > em {
        @include sc(0.24rem,#ff6600);
      }
    }
    .submitIcon{
      @include wh(.26rem,0.16rem);
      @include ct();
      display: inline-block;
      background: url('//m.lvmama.com/flight/image/up_arrow.png') no-repeat;
      background-size: 100% 100%;
      right: .2rem;
    }
    .submitIcon.newArrow{
      -webkit-transform: rotate(180deg) translateY(25%);
      -moz-transform: rotate(180deg) translateY(25%);
      -ms-transform: rotate(180deg) translateY(25%);
      -o-transform: rotate(180deg) translateY(25%);
      transform: rotate(180deg) translateY(25%);
    }
    u{
      text-decoration: inherit;
      @include sc(.2rem,#999);
      margin-left: .2rem;
    }
    // > span:first-child:after {
    //   content: "";
    //   position: absolute;
    //   top: 54%;
    //   right: 0.2rem;
    //   transform: translateY(-50%) rotate(-45deg);
    //   @include wh(0.2rem,0.2rem);
    //   border-top: 1px solid #fff;
    //   border-right: 1px solid #fff;
    // }
    > span.payZero{
       @include sc(0.24rem,#ccc);
    }
    // > span.down:first-child:after {
    //   transform: translateY(-50%) rotate(135deg);
    //   top: 44%;
    // }
    .button {
      @include wh(38.7%,100%);
      @include sc(0.32rem,#fff);
      border: none;
      float: right;
      background: linear-gradient(156deg, #FF7F6A 0%, #FD3C71 100%);
      text-align: center;
      transform: translateZ(0);
    }
  }
  .matte {
    @include wh(100%,100%);
    background-color: rgba(0, 0, 0, 0.5);
    position: absolute;
    top: 0;
    left: 0;
    z-index: 12;
    padding-top: 0.94rem;
    padding-bottom: 0.98rem;
  }
  .matte.matteBox {
    z-index: 18;
    padding: 0 0.3rem 0 0.3rem;
    .ticket-infos {
      width: 100%;
      background-color: #fff;
      border-radius: 6px;
      box-shadow: 0.04rem 0.04rem 0.04rem rgba(0, 0, 0, 0.1);
      position: relative;
      top: 50%;
      transform: translateY(-50%);
      -webkit-transform: translateY(-50%);
      margin-top: 0;
      overflow: initial;
      .order-form-pop {
        padding: 0.8rem 0.8rem 0.5rem 0.8rem;
        font-size: 0.34rem;
        text-align: center;
        line-height: 0.6rem;
      }
      .pop-button {
        padding: 0 0.3rem 0.3rem 0.3rem;
        position: relative;
        .pop-left {
          width: 45%;
          display: block;
          height: 0.8rem;
          line-height: 0.8rem;
          font-size: 0.34rem;
          text-align: center;
          background-color: #fe3c71;
          color: #fff;
          .predeterm {
            position: relative;
            > span {
              position: relative;
              top: -0.16rem;
              color: #fff;
            }
            .order-cancel {
              font-size: 0.2rem;
              position: absolute;
              top: 75%;
              left: 50%;
              transform: translate(-50%, -50%);
              -webkit-transform: translate(-50%, -50%);
              width: 2rem;
            }
          }
        }
        .pop-right {
          width: 45%;
          display: block;
          height: 0.8rem;
          line-height: 0.8rem;
          font-size: 0.34rem;
          position: absolute;
          text-align: center;
          top: 0;
          right: 0.3rem;
          border: 1px solid #eee;
          color: #333333;
        }
      }
      .close {
        width: 0.7rem;
        height: 0.7rem;
        border-radius: 50%;
        background-color: #fff;
        position: absolute;
        top: -0.25rem;
        right: -0.15rem;
        border: 3px solid rgba(0, 0, 0, 0.5);
        .closeTicket {
          display: inline-block;
          width: 1px;
          height: 0.4rem;
          border: 1px solid #32c671;
          position: absolute;
          top: 50%;
          left: 50%;
        }
        .closeTicket.ti {
          transform: translate(-50%, -50%) rotate(45deg);
          -webkit-transform: translate(-50%, -50%) rotate(45deg);
        }
        .closeTicket.tem {
          transform: translate(-50%, -50%) rotate(-45deg);
          -webkit-transform: translate(-50%, -50%) rotate(-45deg);
        }
      }
    }
  }
  .money {
    @include wh(100%,9.68rem);
    bottom: 0.95rem;
    position: absolute;
    overflow-y: scroll;
    left: 0;
    background-color: #fff;
    transition: all 0.2s ease-in 0s;
    border-radius: 5px 5px 0 0;
    .orderLine{
      @include orderline();
      margin: 0 2.5%!important;
      width: 95%;
    }
    .title{
      @include sc(.28rem,#999);
      text-align: left;
      padding: 0 .2rem;
    }
    .det {
      padding: 0.14rem 0;
      p.head {
        @include sc(0.28rem,#333);
        padding-top: 0.1rem;
        padding: 0 0.2rem;
        font-weight: 600;
        > span:nth-child(1) {
          font-size: 0.28rem;
          clear: right;
        }
      }
      > p {
        line-height: 0.56rem;
        padding-bottom: 0.14rem;
        padding: 0 0.2rem;
        @include sc(0.24rem,#666);
        > span {
          font-size: 0.24rem;
          float: right;
          color: #666;
          > i {
            font-size: 0.24rem;
          }
          > em {
            @include sc(0.24rem,#666);
          }
        }
        > span:nth-child(1) {
          font-size: 0.20rem;
          clear: right;
          padding-left: .2rem;
        }
        // > span:last-child {
        //   color: #d30775;
        // }
      }
      .separate {
        border-bottom: 1px solid #ddd;
      }
    }
    > p {
      padding: 0 0.2rem;
      @include sc(0.28rem,#666);
      line-height: 0.88rem;
      height: 0.88rem;
      > span {
        font-size: 0.28rem;
        float: right;
        > i {
          font-size: 0.24rem;
        }
        > em {
          @include sc(0.24rem,#333);
        }
      }
      > span.info{
        font-size: .2rem;
        margin-left: .2rem;
      }
      > i {
        width: 70%;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        display: inline-block;
        color: #666;
      }
      > span:nth-child(1) {
        clear: right;
      }
      > span:last-child {
        color: #333;
      }
    }
    .transferInfoMes {
      // border-bottom: 1px solid #ddd;
      color: #333;
      line-height: .44rem;
      height: .44rem;
      margin: .2rem 0;
      font-weight: 600;
      > em {
        @include sc(0.26rem,#ccc);
      }
      .specialClass {
        float: right;
        > span:nth-child(1) {
          color: #fe3c71;
          > em {
            color: #fe3c71;
          }
        }
      }
    }
    .specialInfor{
      position: relative;
    }
    .specialInfor span{
      position: absolute;
      right: 0.2rem;
    }

  }
  .actInfo {
    position: absolute;
    background-color: #fff;
    border-radius: 15px 15px 0 0;
    z-index: 21;
    bottom: 0;
    width: 100%;
    overflow: hidden;
    .title{
      margin: .3rem 0 .3rem .3rem;
      position: relative;
      span{
        font-weight: 600;
      }
      i{
        @include wh(.594rem,.594rem);
        @include ct();
        background: url("//m.lvmama.com/flight/image/alertclose.png") no-repeat center;
        background-size:60%;
        right: .2rem;
      }
    }
    .from-to:last-child{
      margin-bottom: .2rem;
    }
    .from-to {
      position: relative;
      background-color: #fff;
      overflow: hidden;
      padding-bottom: 0.4rem;
      // padding-top: 0.3rem;
      // border-radius: 0.12rem;
      > div > span {
        display: block;
        @include sc(0.22rem,#000);
        line-height: 0.56rem;
        text-align: center;
      }
      >div:first-child{
        position: relative;
        margin: 0 .4rem;
        > span{
          text-align: left;
          margin-left: .6rem;
          @include sc(0.24rem,#666);
        }
      }
      // > div > span:first-child {
      //   left: 0.15rem;
      // }
      // .date {
      //   @include sc(0.26rem,#000);
      //   line-height: 0.36rem;
      //   padding-bottom: 0.1rem;
      // }
      .time {
        @include sc(0.48rem,#333);
        line-height: 0.6rem;
        position: relative;
      }
      .airport {
        @include sc(0.24rem,#666);
        line-height: 0.36rem;
        margin-top: 0.05rem;
      }
      .start-place {
        width: 30%;
        text-align: left;
        padding: 0.16rem 0;
        float: left;
        margin-left: 0.6rem;

        // .singleIcon {
        //   @include wh(0.4rem,0.4rem);
        //   position: absolute;
        //   background: url("//m.lvmama.com/flight/image/img.png") -4.54rem -6.36rem
        //     no-repeat;
        //   -webkit-background-size: 6rem;
        //   background-size: 6rem;
        // }
        // .doubleIcon {
        //   position: absolute;
        //   @include wh(0.4rem,0.4rem);
        //   background: url("//m.lvmama.com/flight/image/img.png") -4.54rem -5.62rem
        //     no-repeat;
        //   -webkit-background-size: 6rem;
        //   background-size: 6rem;
        // }
      }
      .end-place {
        width: 30%;
        text-align: right;
        padding: 0.16rem 0;
        float: right;
        margin-right: 0.6rem;
        .end-place-span {
          @include sc(0.24rem,#000);
          position: absolute;
          > i {
            @include sc(0.24rem,#000);
          }
        }
      }
      // .start-place.actClass {
      //   margin-left: 0.55rem;
      // }
      // .end-place.actClass {
      //   margin-right: 0.55rem;
      // }
      > p:last-child {
        padding-top: 0.05rem;
      }
      > p.xy_flex {
        width: 100%;
        float: left;
        text-align: center;
        @include sc(0.24rem,#666);
        line-height: 0.4rem;
        position: relative;
        padding-top: 0.2rem;
        > span {
          margin-left: 0.2rem;
          color: #666;
          >em{
            color: #666;
          }
        }
        > i {
          @include wh(0.28rem,0.28rem);
          margin-left: 0.1rem;
          display: inline-block;
        }
        > span:nth-child(2) {
          margin-left: 0.1rem;
        }
        > span:nth-child(2):after,
        > span:nth-child(3):after {
          content: "";
          display: inline-block;
          @include wh(0.2rem,0.16rem);
          border-right: 1px solid #ddd;
        }
        .detail {
          display: inline-block;
          @include wh(0.28rem,0.28rem);
          background: url("//m.lvmama.com/flight/image/planeTypeIcon.png")
            no-repeat;
          -webkit-background-size: 0.26rem 0.26rem;
          background-size: 0.26rem 0.26rem;
          margin-left: 0.1rem;
          line-height: 0.4rem;
        }
        .air-icon {
          @include wh(0.2rem,0.2rem);
          margin-left: -0.9rem;
          display: inline-block;
        }
      }
      .flyHour {
        @include sc(0.2rem,#999);
        position: absolute;
        left: 50%;
        top: 39%;
        -webkit-transform: translate(-50%, -50%);
        transform: translate(-50%, -50%);
        z-index: 4;
      }
      .arrow {
        @include wh(1.5rem,0.28rem);
        position: absolute;
        left: 50%;
        top: 49%;
        -webkit-transform: translate(-50%, -50%);
        transform: translate(-50%, -50%);
        z-index: 4;
        background: url("//m.lvmama.com/flight/image/newjiantou.png") no-repeat;
        background-size: 100%;
        > span {
          @include sc(0.2rem,#999);
          display: block;
          margin-top: 0.2rem;
          text-align: center;
        }
      }
    }
    // .close {
    //   @include wh(0.7rem,0.7rem);
    //   border-radius: 50%;
    //   background-color: #fff;
    //   position: absolute;
    //   top: -0.25rem;
    //   right: -0.15rem;
    //   border: 3px solid rgba(0, 0, 0, 0.5);
    //   .closeTicket {
    //     @include wh(1px,0.4rem);
    //     display: inline-block;
    //     border: 1px solid #32c671;
    //     position: absolute;
    //     top: 50%;
    //     left: 50%;
    //   }
    //   .ti {
    //     transform: translate(-50%, -50%) rotate(45deg);
    //     -webkit-transform: translate(-50%, -50%) rotate(45deg);
    //   }
    //   .tem {
    //     transform: translate(-50%, -50%) rotate(-45deg);
    //     -webkit-transform: translate(-50%, -50%) rotate(-45deg);
    //   }
    // }
  }
  .typeInfo {
    @include wh(100%,50%);
    padding: 0.4rem 0.3rem;
    box-sizing: border-box;
    background: #fff;
    color: #000;
    border-radius: 15px 15px 0 0;
    overflow: hidden;
    @include cl;
    bottom: 0;
    // .flightPopX {
    //   @include wh(0.66rem,0.66rem);
    //   display: inline-block;
    //   position: absolute;
    //   top: -0.2rem;
    //   right: -0.2rem;
    //   background: url("//m.lvmama.com/flight/image/x.png") no-repeat;
    //   background-size: 0.54rem 0.54rem;
    //   border-radius: 50%;
    //   border: 3px solid rgba(0, 0, 0, 0.5);
    // }
    h3 {
      font-size: 0.32rem;
      line-height: 0.38rem;
      padding: .2rem 0 0.4rem;
      text-align: center;
    }
    table{
      border-collapse: collapse;
      width: 100%;
      border: 1px #E4E4E4 solid;
    }
    tr,td{
      border: 1px #E4E4E4 solid;
    }
    tr{
      height: .6rem;
      td:first-child{
        width:25%;
        font-size: .24rem;
        text-align: center;
      }
      td:nth-child(2){
        padding-left: .2rem;
      }
    }
    .closeTypeInfo{
      @include sc(.36rem,#fff);
      line-height: .88rem;
      background-image: linear-gradient(90deg, #FE686C 0%, #FD3C71 100%);
      border-radius: 100px;
      text-align: center;
      bottom: .3rem;
      width: 92%;
      position: absolute;
    }
    // p {
    //   font-size: 0.28rem;
    //   margin-top: 0.3rem;
    //   > span:first-child {
    //     width: 1.7rem;
    //     color: #666;
    //     align-items: flex-start;
    //     display: inline-block;
    //   }
    //   > span:nth-child(2) {
    //     width: 4.4rem;
    //     display: inline-block;
    //   }
    // }
  }
  .travel_alert {
    @include wh(100%,100%);
    background: rgba(0, 0, 0, 0.5);
    position: absolute;
    top: 0;
    bottom: 0;
    z-index: 11;
    .travel_alert_reject {
      @include wh(100%,6.65rem);
      background: #fff;
      position: fixed;
      bottom: 0;
      border-radius: 20px 20px 0 0;
      padding: 0 0.4rem;
      .reject_cause {
        @include wh(100%,1.36rem);
        text-align: center;
        line-height: 1.36rem;
        border-bottom: 1px dashed #ddd;
        position: relative;
        span {
          @include sc(0.38rem,#000);
        }
        i {
          display: inline-block;
          @include wh(0.24rem,0.24rem);
          background: url("//m.lvmama.com/flight/image/travelClose.png")
            no-repeat;
          @include ct;
          right: 0;
          background-size: 100%;
        }
      }
      .cause_content {
        @include wh(100%,2.94rem);
        margin-top: 0.3rem;
        resize: none;
        color: #000;
      }
      .reject_button {
        border-top: 1px dashed #ddd;
        padding: 0.4rem 0;
        div {
          @include wh(100%,1.11rem);
          background: -webkit-linear-gradient(left, #fe686c, #fd3c71);
          border-radius: 40px;
          text-align: center;
          @include sc(0.3rem,#fff);
          line-height: 1.11rem;
        }
      }
    }
  }
  .insurance_detail_container {
    @include wh(100%,100%);
    position: absolute;
    top: 0;
    left: 0;
    background: #fff;
    padding: 0 5%;
    padding-top: 20px;
    z-index: 20;
    box-sizing: border-box;
    .insurance_title {
      @include sc(0.36rem,#000);
      line-height: 0.38rem;
      border-bottom: 1px solid #ddd;
      padding-bottom: 0.2rem;
    }
    .close_detail {
      width: 100%;
      height: 2rem;
      position: absolute;
      bottom: 0;
      left: 0;
      img {
        @include wh(1rem,1rem);
      }
    }
  }
  .insurance_matte{
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 100;
    background: rgba(0,0,0,.6);
    .insurance_container{
      @include wh(5.72rem,auto);
      @include center;
      .insurance_container_title{
        @include wh(100%,1.56rem);
        @include sc(0.28rem,#5CA2F8);
        background: url("//m.lvmama.com/flight/image/insurance_container.png") no-repeat;
        background-size: 100%;
        text-align: center;
        line-height: 2.2rem;
        >i{
          @include wh(0.48rem,0.56rem);
          @include cl;
          margin-top: .2rem;
          background: url("//m.lvmama.com/flight/image/insurance_container_logo.png") no-repeat;
          background-size: 100%;
          display: inline-block;
        }
      }
      .insurance_container_info{
        @include wh(100%,3.04rem);
        background-color: #fff;
        border-radius: 0 0 .28rem .28rem;
        >div:first-child{
          @include sc(0.3rem,#333);
          text-align: center;
          line-height: .3rem;
          padding-top: .4rem;
          >span{
            color: #F80;
          }
        }
        >div:nth-child(2){
          @include sc(0.24rem,#666);
          text-align: center;
          margin-top: .2rem;
          >p:first-child{
            @include sc(0.36rem,#333);
            margin-bottom: .1rem;
          }
        }
        .insurance_container_button{
          @include sc(0.24rem,#666);
          @include wh(100%,.84rem);
          line-height: .84rem;
          @include topline;
          text-align: center;
          bottom: 0;
          position: absolute;
          >div{
            @include wh(50%,100%);
            display: inline-block;
            float: left;
          }
          >div:last-child{
            @include leftline;
            color:#F80;
          }
        }
      }
    }
  }
}
</style>