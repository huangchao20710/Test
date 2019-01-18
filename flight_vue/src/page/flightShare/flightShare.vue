<template>
	<div class="flightShareContent">
		<div class="share_header" id="shareHeight" v-bind:class="{'scroll_bg':isScroll}">
			<div class="addArear" @click="leaveShare">
				<span class="share_back" ></span>
			</div>
			<div class="add">
				<div class="share_search"><!-- fatherDiv -->
					<span @click="selectDepart" class="city_name">
						<i>{{departureCity.name}}</i>
						<u></u>
					</span>
					<div class="input_container">
						<em></em>
						<input type="text" readonly="readonly" placeholder="输入目的地信息" @click="selectCity" /><!-- class="childDiv" -->
					</div>
				</div>
			</div>
			
			<!-- <span class="fenxiang"  v-if="showFenXiang" @click="shareClick"></span> -->
			<span class="Map"  @click="shareMap"></span>
		</div>
		
		<div class="shareScroll" id="judgmentScroll">
			<swiper :options="swiperOption" ref="mySwiper" id="isSwiper">
				<!-- slides -->
				<swiper-slide v-for="(item,index) in imgUrl"  :key="index">
					<!-- <div @click="toNextPage(item)"> -->
						<share-banner :bannerKind="item.toCode"></share-banner>
					<!-- </div> -->
					<div class="toPlace" @click="toNextPage(item)">
						<p  v-if="item.toCode=='KMG'">
							<span>昆明</span><i></i><span>山 水 画 廊，四 季 如 春</span>
						</p>
						<p v-if="item.toCode=='TAO'">
							<span>青岛</span><i></i><span>红 瓦 绿 树，碧 海 蓝 天</span>
						</p>
						<p v-if="item.toCode=='XIY'">
							<span>西安</span><i></i><span>盛 世 文 明，荣 耀 西 安</span>
						</p>
						<p v-if="item.toCode=='XMN'">
							<span>厦门</span><i></i><span>一 城 海 韵，十 足 花 园</span>
						</p>
						<p v-if="item.toCode=='SYX'">
							<span>三亚</span><i></i><span>天 涯 芳 草，海 角 明 珠</span>
						</p>
						<div class="toPlacePrice" v-if="item.price!=''&&item.price!=null" @click="toNextPage(item)">
							<span>
								<em>&#165;</em>
								<em>{{item.price}}起</em>
							</span>
							<!-- <span v-if="item.activityName!=''&&item.activityName!=null">
								{{item.activityName}}
							</span> -->
						</div>
					</div>
				</swiper-slide>
				<!-- Optional controls -->
				<div class="swiper-pagination"  slot="pagination"></div>
			</swiper>
			
		    <!-- 热门地区 -->
		    <div class="hot_place">
		    	<div>
		    		<p>热门地区</p>
		    		<p @click="changePlace">
		    			<span>换一换</span>
		    			<span></span>
		    		</p>
		    	</div>
	    		<ul class="In_hot" v-if="exchange">
	    			<li v-for="(hot,index) in hotCode" :key="index" @click="toNextPage(hot,'rmd')">
	    				<share-picture :imgKind="hot.toCode"></share-picture>
	    				<div class="center_content">
	    					<span>{{hot.toCity}}</span>
	    					<span v-if="hot.price"><u>&#165;</u>{{hot.price}}<em>起</em></span>
	    					<span v-if="hot.price==''||hot.price==null">--</span>
	    				</div>
	    			</li>
	    		</ul>
	    		<ul class="In_hot" v-if="!exchange">
	    			<li v-for="(ativeHot,index) in alternativeHot" :key="index" @click="toNextPage(ativeHot,'rmd')">
	    				<share-picture :imgKind="ativeHot.toCode"></share-picture>
	    				<div class="center_content">
	    					<span>{{ativeHot.toCity}}</span>
	    					<span v-if="ativeHot.price!=''&&ativeHot.price!=null"><u>&#165;</u>{{ativeHot.price}}<em>起</em></span>
	    					<span v-if="ativeHot.price==''||ativeHot.price==null">--</span>
	    				</div>
	    			</li>
	    		</ul>
		    	
		    </div>
		    <!-- 地图探索 -->
		    <div class="addMap">
		    	<div>
		    		<p>地图上探索低价航线</p>
		    		<p>看看我的预算能到哪些地方</p>
		    	</div>
		    	<div class="mapShare" @click="toMap"></div>
		    </div>
		    

		    <!-- 热门推荐 -->
		    <div class="recommend">
		    	<p>热门推荐</p>
		    	<div class="recommend_wrap">
			    	<ul class="y_flex">
			    		<li @click="chooseType('food')" v-bind:class="{'selectTypeBackColor': selectType=='food'}">
			    			<div>
			    				<div class="fristDiv">
			    					<p>美食之都</p>
			    					<p>吃货天堂</p>
			    				</div>
			    			</div>
			    			<div></div>
			    		</li>
			    		<li @click="chooseType('paradise')" v-bind:class="{'selectTypeBackColor': selectType=='paradise'}">
			    			<div>
			    				<div>
			    					<p>乐园寻趣</p>
			    					<p>乐而忘返</p>
			    				</div>
			    			</div>
			    			<div></div>
			    		</li>
			    		<li @click="chooseType('capital')" v-bind:class="{'selectTypeBackColor': selectType=='capital'}">
			    			<div>
			    				<div>
			    					<p>历史古都</p>
			    					<p>悠久历史</p>
			    				</div>
			    			</div>
			    			<div></div>
			    		</li>
			    		<li @click="chooseType('beach')" v-bind:class="{'selectTypeBackColor': selectType=='beach'}">
			    			<div>
			    				<div>
			    					<p>阳光沙滩</p>
			    					<p>碧海青天</p>
			    				</div>
			    			</div>
			    			<div></div>
			    		</li>
			    		<li @click="chooseType('graduate')" v-bind:class="{'selectTypeBackColor': selectType=='graduate'}">
			    			<div>
			    				<div>
			    					<p>毕业旅行</p>
			    					<p>为青春落幕</p>
			    				</div>
			    			</div>
			    			<div></div>
			    		</li>
			    	</ul>
		    	</div>
		    	<!-- 美食 -->
		    	<div class="recommend_pic" v-if="selectType=='food' && spotFood!=''">
		    		<div class="pic_left pic_food" v-if="spotFood[0].toCode=='CAN'" @click="toNextPage(spotFood[0],'rm')">
		    			<img src="//m.lvmama.com/flight/image/share/chang_guangzhou.jpg" />
		    			<div class="pic_content">
		    				<span>广州</span>
		    				<span v-if="spotFood[0].price"><u>&#165;</u>{{spotFood[0].price}}<em>起</em></span>
		    				<span v-if="spotFood[0].price==''||spotFood[0].price==null">--</span>
		    			</div>
		    		</div>
		    		<div class="pic_left pic_food" v-if="spotFood[0].toCode=='KMG'" @click="toNextPage(spotFood[0],'rm')">
		    			<img src="//m.lvmama.com/flight/image/share/chang_kunming.jpg" />
		    			<div class="pic_content">
		    				<span>昆明</span>
		    				<span v-if="spotFood[0].price"><u>&#165;</u>{{spotFood[0].price}}<em>起</em></span>
		    				<span v-if="spotFood[0].price==''||spotFood[0].price==null">--</span>
		    			</div>
		    		</div>
		    		
		    		<ul class="pic_right" v-if="spotFood[0].toCode=='CAN'">
		    			<li v-for="(food,index) in spotFood" :key="index" v-if="'CAN'!=food.toCode" @click="toNextPage(food,'rm')">
		    				<share-picture :imgKind="food.toCode"></share-picture>
		    				<div class="pic_content">
			    				<span>{{food.toCity}}</span>
			    				<span v-if="food.price"><u>&#165;</u>{{food.price}}<em>起</em></span>
			    				<span v-if="food.price==''||food.price==null">--</span>
			    			</div>
		    			</li>
		    		</ul>
		    		<ul class="pic_right" v-if="spotFood[0].toCode!='CAN'">
		    			<li v-for="(food,index) in spotFood" :key="index" v-if="departureCity.code!=food.toCode && food.toCode!='KMG'" @click="toNextPage(food,'rm')">
		    				<share-picture :imgKind="food.toCode"></share-picture>
		    				<div class="pic_content">
			    				<span>{{food.toCity}}</span>
			    				<span v-if="food.price"><u>&#165;</u>{{food.price}}<em>起</em></span>
			    				<span v-if="food.price==''||food.price==null">--</span>
			    			</div>
		    			</li>
		    		</ul>
		    		
		    		
		    	</div>
		    	<!-- 乐园 -->
		    	<div class="recommend_pic" v-if="selectType=='paradise'">
		    		<div class="pic_left" v-if="spotFun[0].toCode=='CAN'" @click="toNextPage(spotFun[0],'rm')">
		    			<img src="//m.lvmama.com/flight/image/share/chang_guangzhou.jpg" />
		    			<div class="pic_content">
		    				<span>广州</span>
		    				<span v-if="spotFun[0].price"><u>&#165;</u>{{spotFun[0].price}}<em>起</em></span>
		    				<span v-if="spotFun[0].price==''||spotFun[0].price==null">--</span>
		    			</div>
		    		</div>
		    		<div class="pic_left" v-if="spotFun[0].toCode=='DLC'" @click="toNextPage(spotFun[0],'rm')">
		    			<img src="//m.lvmama.com/flight/image/share/chang_dalian.jpg" />
		    			<div class="pic_content">
		    				<span>大连</span>
		    				<span v-if="spotFun[0].price"><u>&#165;</u>{{spotFun[0].price}}<em>起</em></span>
		    				<span v-if="spotFun[0].price==''||spotFun[0].price==null">--</span>
		    			</div>
		    		</div>
		    		
		    		<ul class="pic_right" v-if="spotFun[0].toCode=='CAN'">
		    			<li v-for="(spot,index) in spotFun" :key="index" v-if="spot.toCode!='CAN'" @click="toNextPage(spot,'rm')">
		    				<share-picture :imgKind="spot.toCode"></share-picture>
		    				<div class="pic_content">
			    				<span>{{spot.toCity}}</span>
			    				<span v-if="spot.price"><u>&#165;</u>{{spot.price}}<em>起</em></span>
			    				<span v-if="spot.price==''||spot.price==null">--</span>
			    			</div>
		    			</li>
		    		</ul>
		    		<ul class="pic_right" v-if="spotFun[0].toCode!='CAN'">
		    			<li v-for="(spot,index) in spotFun" :key="index" v-if="departureCity.code!=spot.toCode && spot.toCode!='DLC'" @click="toNextPage(spot,'rm')">
		    				<share-picture :imgKind="spot.toCode"></share-picture>
		    				<div class="pic_content">
			    				<span>{{spot.toCity}}</span>
			    				<span v-if="spot.price"><u>&#165;</u>{{spot.price}}<em>起</em></span>
			    				<span v-if="spot.price==''||spot.price==null">--</span>
			    			</div>
		    			</li>
		    		</ul>
		    		
		    	</div>
		    	<!-- 古都 -->
		    	<div class="recommend_pic" v-if="selectType=='capital'">
		    		<div class="pic_left" v-if="spotCity[0].toCode=='NKG'" @click="toNextPage(spotCity[0],'rm')">
		    			<img src="//m.lvmama.com/flight/image/share/chang_nanjing.jpg" />
		    			<div class="pic_content">
		    				<span>南京</span>
		    				<span v-if="spotCity[0].price"><u>&#165;</u>{{spotCity[0].price}}<em>起</em></span>
		    				<span v-if="spotCity[0].price==''||spotCity[0].price==null">--</span>
		    			</div>
		    		</div>
		    		<div class="pic_left" v-if="spotCity[0].toCode=='HGH'" @click="toNextPage(spotCity[0],'rm')">
		    			<img src="//m.lvmama.com/flight/image/share/chang_hangzhou.jpg" />
		    			<div class="pic_content">
		    				<span>杭州</span>
		    				<span v-if="spotCity[0].price"><u>&#165;</u>{{spotCity[0].price}}<em>起</em></span>
		    				<span v-if="spotCity[0].price==''||spotCity[0].price==null">--</span>
		    			</div>
		    		</div>
		    		<ul class="pic_right" v-if="spotCity[0].toCode=='NKG'">
		    			<li v-for="(city,index) in spotCity" :key="index" v-if="city.toCode!='NKG'" @click="toNextPage(city,'rm')">
		    				<share-picture :imgKind="city.toCode"></share-picture>
		    				<div class="pic_content">
			    				<span>{{city.toCity}}</span>
			    				<span v-if="city.price"><u>&#165;</u>{{city.price}}<em>起</em></span>
			    				<span v-if="city.price==''||city.price==null"></span>
			    			</div>
		    			</li>
		    		</ul>
		    		<ul class="pic_right" v-if="spotCity[0].toCode!='NKG'">
		    			<li v-for="(city,index) in spotCity" :key="index" v-if="departureCity.code!=city.toCode && city.toCode!='HGH'" @click="toNextPage(city,'rm')">
		    				<share-picture :imgKind="city.toCode"></share-picture>
		    				<div class="pic_content">
			    				<span>{{city.toCity}}</span>
			    				<span v-if="city.price"><u>&#165;</u>{{city.price}}<em>起</em></span>
			    				<span v-if="city.price==''||city.price==null">--</span>
			    			</div>
		    			</li>
		    		</ul>
		    	</div>
		    	<!-- 沙滩 -->
		    	<div class="recommend_pic" v-if="selectType=='beach'">
		    		<div class="pic_left" v-if="spotSunshine[0].toCode=='BPE'" @click="toNextPage(spotSunshine[0],'rm')">
		    			<img src="//m.lvmama.com/flight/image/share/chang_qinhuangdao.jpg" />
		    			<div class="pic_content">
		    				<span>秦皇岛</span>
		    				<span v-if="spotSunshine[0].price"><u>&#165;</u>{{spotSunshine[0].price}}<em>起</em></span>
		    				<span v-if="spotSunshine[0].price==''||spotSunshine[0].price==null">--</span>
		    			</div>
		    		</div>
		    		<div class="pic_left" v-if="spotSunshine[0].toCode=='YNT'" @click="toNextPage(spotSunshine[0],'rm')">
		    			<img src="//m.lvmama.com/flight/image/share/chang_yantai.jpg" />
		    			<div class="pic_content">
		    				<span>烟台</span>
		    				<span v-if="spotSunshine[0].price"><u>&#165;</u>{{spotSunshine[0].price}}<em>起</em></span>
		    				<span v-if="spotSunshine[0].price==''||spotSunshine[0].price==null">--</span>
		    			</div>
		    		</div>
		    		<ul class="pic_right" v-if="spotSunshine[0].toCode=='BPE'">
		    			<li v-for="(sunshine,index) in spotSunshine" :key="index" v-if="sunshine.toCode!='BPE'" @click="toNextPage(sunshine,'rm')">
		    				<share-picture :imgKind="sunshine.toCode"></share-picture>
		    				<div class="pic_content">
			    				<span>{{sunshine.toCity}}</span>
			    				<span v-if="sunshine.price"><u>&#165;</u>{{sunshine.price}}<em>起</em></span>
			    				<span v-if="sunshine.price==''||sunshine.price==null">--</span>
			    			</div>
		    			</li>
		    		</ul>
		    		<ul class="pic_right" v-if="spotSunshine[0].toCode!='BPE'">
		    			<li v-for="(sunshine,index) in spotSunshine" :key="index" v-if="departureCity.code!=sunshine.toCode && sunshine.toCode!='YNT'" @click="toNextPage(sunshine,'rm')">
		    				<share-picture :imgKind="sunshine.toCode"></share-picture>
		    				<div class="pic_content">
			    				<span>{{sunshine.toCity}}</span>
			    				<span v-if="sunshine.price"><u>&#165;</u>{{sunshine.price}}<em>起</em></span>
			    				<span v-if="sunshine.price==''||sunshine.price==null">--</span>
			    			</div>
		    			</li>
		    		</ul>
		    	</div>
		    	<!-- 旅行 -->
		    	<div class="recommend_pic" v-if="selectType=='graduate'">
		    		<div class="pic_left" v-if="spotTravel[0].toCode=='LXA'" @click="toNextPage(spotTravel[0],'rm')">
		    			<img src="//m.lvmama.com/flight/image/share/chang_lasa.jpg" />
		    			<div class="pic_content">
		    				<span>拉萨</span>
		    				<span v-if="spotTravel[0].price"><u>&#165;</u>{{spotTravel[0].price}}<em>起</em></span>
		    				<span v-if="spotTravel[0].price==''||spotTravel[0].price==null">--</span>
		    			</div>
		    		</div>
		    		<div class="pic_left" v-if="spotTravel[0].toCode=='KWL'" @click="toNextPage(spotTravel[0],'rm')">
		    			<img src="//m.lvmama.com/flight/image/share/chang_guilin.jpg" />
		    			<div class="pic_content">
		    				<span>桂林</span>
		    				<span v-if="spotTravel[0].price"><u>&#165;</u>{{spotTravel[0].price}}<em>起</em></span>
		    				<span v-if="spotTravel[0].price==''||spotTravel[0].price==null">--</span>
		    			</div>
		    		</div>
		    		<ul class="pic_right" v-if="spotTravel[0].toCode=='LXA'">
		    			<li v-for="(travel,index) in spotTravel" :key="index" v-if="travel.toCode!='LXA'" @click="toNextPage(travel,'rm')">
		    				<share-picture :imgKind="travel.toCode"></share-picture>
		    				<div class="pic_content">
			    				<span>{{travel.toCity}}</span>
			    				<span v-if="travel.price"><u>&#165;</u>{{travel.price}}<em>起</em></span>
			    				<span v-if="travel.price==''||travel.price==null">--</span>
			    			</div>
		    		    </li>
		    			
		    		</ul>
		    		<ul class="pic_right" v-if="spotTravel[0].toCode!='LXA'">
		    			<li v-for="(travel,index) in spotTravel" :key="index" v-if="departureCity.code!=travel.toCode && travel.toCode!='KWL'" @click="toNextPage(travel,'rm')">
		    				<share-picture :imgKind="travel.toCode"></share-picture>
		    				<div class="pic_content">
			    				<span>{{travel.toCity}}</span>
			    				<span v-if="travel.price"><u>&#165;</u>{{travel.price}}<em>起</em></span>
			    				<span v-if="travel.price==''||travel.price==null">--</span>
			    			</div>
		    		    </li>
		    			
		    		</ul>
		    	</div>
		    </div>

		    <!-- 低价特惠 -->
		    <div class="preferential">
		    	<p>低价特惠</p>
		    	<ul>
		    		<li v-for="(low,index) in orderLowPrice" :key="index" v-if="low.price!=''&&low.price!=null" @click="toFlightList(low)">
		    			<div class="prefer_left">
		    				<p>
		    					<span>{{departureCity.name}}</span>
		    					<i></i>
		    					<span>{{low.toCity}}</span>
		    				</p>
		    				<p>{{low.mDay}}</p>
		    				<span>{{low.weekDay | weekFilter}}</span>
		    			</div>
		    			<div class="prefer_right">
		    				<i>&#165;</i>
		    				<span>{{low.price}}</span>
							<span class="low_price">低价</span>
		    			</div>
		    		</li>
		    		
		    	</ul>
		    </div>
		</div>
		
		<!-- 定位切换弹框 -->
		<alert-tip  v-if="showAlert" :tipContent="alertMessage" :leftButton="leftButton"  :rightButton="rightButton" @closeAlert="closeTip" @rightHandler="selectTip"></alert-tip>


		
	</div>
	
</template>
<script>
	import shareBanner from '../../components/common/share-banner'
	import sharePicture from '../../components/common/share-picture'
    import '../../style/swiper.min.css'
	import { mapActions,mapState } from 'vuex'
	import { getLowestPriceNewFlight,getPromotionList,getFlightCities } from '../../service/getData'
	import { getStore,setStore,removeStore,getBookingSource,isClient,getStatisticsType,getElementTag } from '../../config/mUtils'
	import alertTip from '../../components/common/alertTip'
	import { swiper, swiperSlide } from "vue-awesome-swiper";
	
	export default{
		data(){
			return{
				imgUrl:'',
				hotCode:'',
				firstDate:'',
				lastDate:'',
				newHotCode:'',
				spotFood:'',
				spotFun:'',
				spotCity:'',
				spotSunshine:'',
				spotTravel:'',
				alternativeHot:'',
				activeDate:'',
				activeName:[],
				LowPrice:'',
				selectType:'food',
				exchange:true,
				alertMessage:"",
				leftButton:"否",
				rightButton:"是",
				showAlert:false,
				postionCity:'',
				allCitys:'',
				allImgUrl:'',//所有的城市
				isScroll:false,
				changeScroll:0,
				allCityLow:'',//所有城市最低价
				qq:true,
				swiperOption: {
					//以下配置不懂的，可以去swiper官网看api，链接http://www.swiper.com.cn/api/
					// notNextTick是一个组件自有属性，如果notNextTick设置为true，组件则不会通过NextTick来实例化swiper，也就意味着你可以在第一时间获取到swiper对象，<br>　　　　　　　　假如你需要刚加载遍使用获取swiper对象来做什么事，那么这个属性一定要是true
					// notNextTick: true,
					// swiper configs 所有的配置同swiper官方api配置
					autoplay: 3000,
					autoplayDisableOnInteraction : false,
					direction: "horizontal",
					grabCursor: true,
					setWrapperSize: true,
					autoHeight: true,
					pagination: ".swiper-pagination",
					paginationClickable: true,
					mousewheelControl: true,
					observeParents: true,
					loop: false,
					// 如果自行设计了插件，那么插件的一些配置相关参数，也应该出现在这个对象中，如下debugger
					debugger: true
				}
				
			}
		},
		components:{
			sharePicture,
			shareBanner,
			alertTip,
			swiper, 
			swiperSlide

		},
		computed:{
			...mapState([
                'departureCity',//出发城市
                'arrivalCity',//到达城市
                'flightMapThemes'
            ]),
            orderLowPrice() {
            	if (this.LowPrice == '') {
            		return this.LowPrice;
            	} else {
				    return this.LowPrice.sort((a,b) => {
				    	return a.price - b.price;
				    })
            	}
			}
		},
		methods:{
			...mapActions([
	            'initData'
	        ]),
	        watchScrollLocation(){
		        this.changeScroll = document.getElementById("judgmentScroll").scrollTop;

		    },
		addClassFunc(obj, cls) {
          try{
            let obj_class = obj.className,//获取 class 内容.
            blank = (obj_class != '') ? ' ' : '';//判断获取到的 class 是否为空, 如果不为空在前面加个'空格'.
            let added = obj_class + blank + cls;//组合原来的 class 和需要添加的 class.
            obj.className = added;//替换原来的 class.
          }catch(e){}
          
        },

        removeClassFunc(obj, cls) {
          try{
            let obj_class = ' '+obj.className+' ';//获取 class 内容, 并在首尾各加一个空格. ex) 'abc    bcd' -> ' abc    bcd '
            obj_class = obj_class.replace(/(\s+)/gi, ' ');//将多余的空字符替换成一个空格. ex) ' abc    bcd ' -> ' abc bcd '
            let removed = obj_class.replace(' '+cls+' ', ' ');//在原来的 class 替换掉首尾加了空格的 class. ex) ' abc bcd ' -> 'bcd '
            removed = removed.replace(/(^\s+)|(\s+$)/g, '');//去掉首尾空格. ex) 'bcd ' -> 'bcd'
            obj.className = removed;//替换原来的 class.
           }catch(e){}
        },
			// 低价接口
			priceFun(arr,type){
				var code = [];
				for (let i = 0; i < arr.length; i++) {
					code.push(arr[i].toCode);
				};
				var codes = code.join(",");
				let urlStr = '';
				for (let i = code.length - 1; i >= 0; i--) {
					urlStr += `&arrCities=${code[i]}`
				};
		       	var priceObj = {
		            	deptCities:this.departureCity.code,
		            	arrCities:urlStr,
		            	startDate:this.firstDate,
		            	endDate:this.lastDate,
		            	topDate:1,
		            	priceLowest:'',
		            	priceHigest:'',
		            	bookingSource:(navigator.userAgent.indexOf('Mobile') > 0&& navigator.userAgent.indexOf('LVMM')>0)?'APP':'WAP',
		            }
		             this.$parent.showLoading = true;
				getLowestPriceNewFlight(priceObj).then((res) => {
					this.$parent.showLoading = false;
					if(res.data){
						let rows=res.data,
							arrPrice = [];
						for (let i = 0; i < arr.length; i++) {
							for (let k = 0; k< rows.length; k++) {
								arrPrice.push(rows[k].flightDailyPriceOfCityDtoList[0].parPrice);
								if(arr[i].toCode == rows[k].arrCity){
									arr[i].price = rows[k].flightDailyPriceOfCityDtoList[0].parPrice;
                                	arr[i].mDay =  rows[k].flightDailyPriceOfCityDtoList[0].deptDate;
                                	var month=arr[i].mDay.substring(5,7);
	                                var day=arr[i].mDay.substring(8,10);
	                                arr[i].mDay = month+'月'+day+'日';
	                                arr[i].time = rows[k].flightDailyPriceOfCityDtoList[0].deptDate;
	                                var Day=new Date(arr[i].time);
	                                arr[i].weekDay=Day.getDay();
								}
							};
							
						};

						arrPrice.sort(function(a,b){
                            return a-b
                        });
                        
                        this.allCityLow = arrPrice[0];
						let obj ={
			                    key: 'allCityLowPrice',
			                    val: this.allCityLow
			                }
			               
						try{	
							this.initData(obj);	
						}catch(e){}
						this.showPrice();
					}
				})
	            	

				
			},
			showPrice(){
				//获取当前时间
				var nowDate = new Date();
				var nowYear = nowDate.getFullYear();
				var nowMonth = nowDate.getMonth()+1;
				var nowDay = nowDate.getDate();
				var currentDay = `${nowYear}-${nowMonth}-${nowDay}`;
				// banner图
				for (let i = 0; i < this.allImgUrl.length; i++) {
					for (let k = 0; k < this.imgUrl.length; k++) {
						if(this.allImgUrl[i].toCode == this.imgUrl[k].toCode){
							this.imgUrl[k].price = this.allImgUrl[i].price;
							this.imgUrl[k].mDay = this.allImgUrl[i].mDay;
							this.imgUrl[k].time = this.allImgUrl[i].time;

						}

					};

				};

				for (let i = 0; i < this.imgUrl.length; i++) {
					this.activeDate = this.imgUrl[i].time;
					var activeToCity = this.imgUrl[i].toCity;
					// if(this.activeDate){
						// getPromotionList(currentDay,this.departureCity.name,activeToCity,'LVMAMA_WAP').then((res) => {
						// 	if(res.code == 1){
						// 		if(res.data&&res.data.length>0){
						// 			var activeList = res.data[0];
						// 			if(activeList.activityName.indexOf('|')!=-1){
						// 				this.imgUrl[i].activityName = activeList.activityName.split("|")[0];
										
						// 			}
						// 			// else{
						// 			// 	this.imgUrl[i].activityName = '促销活动';
						// 			// }
									
						// 		}
						// 		// else{
						// 		// 	this.imgUrl[i].activityName = '促销活动';
						// 		// }
								
						// 	}

						// })
					// }

				};

				// 热门城市
				for (let i = 0; i < this.allImgUrl.length; i++) {
					for (let k = 0; k < this.hotCode.length; k++) {
						if(this.allImgUrl[i].toCode == this.hotCode[k].toCode){
							this.hotCode[k].price = this.allImgUrl[i].price;
							this.hotCode[k].mDay = this.allImgUrl[i].mDay;

						}
					};
				};

				// 热门城市换一换
				for (let i = 0; i < this.allImgUrl.length; i++) {
					for (let k = 0; k < this.alternativeHot.length; k++) {
						if(this.allImgUrl[i].toCode == this.alternativeHot[k].toCode){
							this.alternativeHot[k].price = this.allImgUrl[i].price;
							this.alternativeHot[k].mDay = this.allImgUrl[i].mDay;

						}
					};
				};


		   		//热门推荐美食之都
		   		for (let i = 0; i < this.allImgUrl.length; i++) {
					for (let k = 0; k < this.spotFood.length; k++) {
						if(this.allImgUrl[i].toCode == this.spotFood[k].toCode){
							this.spotFood[k].price = this.allImgUrl[i].price;
							this.spotFood[k].mDay = this.allImgUrl[i].mDay;

						}
					};
				};

				//热门推荐乐园寻趣
		   		for (let i = 0; i < this.allImgUrl.length; i++) {
					for (let k = 0; k < this.spotFun.length; k++) {
						if(this.allImgUrl[i].toCode == this.spotFun[k].toCode){
							this.spotFun[k].price = this.allImgUrl[i].price;
							this.spotFun[k].mDay = this.allImgUrl[i].mDay;

						}
					};
				};

				//热门推荐历史古都
		   		for (let i = 0; i < this.allImgUrl.length; i++) {
					for (let k = 0; k < this.spotCity.length; k++) {
						if(this.allImgUrl[i].toCode == this.spotCity[k].toCode){
							this.spotCity[k].price = this.allImgUrl[i].price;
							this.spotCity[k].mDay = this.allImgUrl[i].mDay;

						}
					};
				};

				//热门推荐阳光沙滩
		   		for (let i = 0; i < this.allImgUrl.length; i++) {
					for (let k = 0; k < this.spotSunshine.length; k++) {
						if(this.allImgUrl[i].toCode == this.spotSunshine[k].toCode){
							this.spotSunshine[k].price = this.allImgUrl[i].price;
							this.spotSunshine[k].mDay = this.allImgUrl[i].mDay;

						}
					};
				};

				//热门推荐毕业旅行
		   		for (let i = 0; i < this.allImgUrl.length; i++) {
					for (let k = 0; k < this.spotTravel.length; k++) {
						if(this.allImgUrl[i].toCode == this.spotTravel[k].toCode){
							this.spotTravel[k].price = this.allImgUrl[i].price;
							this.spotTravel[k].mDay = this.allImgUrl[i].mDay;

						}
					};
				};

				// 低价特惠城市

				for (let i = 0; i < this.allImgUrl.length; i++) {
					for (let k = 0; k < this.LowPrice.length; k++) {
						if(this.allImgUrl[i].toCode == this.LowPrice[k].toCode){
							this.LowPrice[k].price = this.allImgUrl[i].price;
							this.LowPrice[k].mDay = this.allImgUrl[i].mDay;
							this.LowPrice[k].time = this.allImgUrl[i].time;
							this.LowPrice[k].weekDay = this.allImgUrl[i].weekDay;
						}
					};
				};
				for (let i = this.LowPrice.length-1; i > 0; i--) {
					if (this.LowPrice[i].price == '' || this.LowPrice[i].price == null) {
						this.LowPrice.splice(i,1);
					};
				}
				if(this.LowPrice.length%2 != 0){
					this.LowPrice.splice(this.LowPrice.length-1,1);
				} 
			},
			//城市接口
			getCityFun(){
				getFlightCities().then((res) => {
					if(res.code == '1'){
						if(res.data){
							this.allCitys = res.data.allCitys;
						}

					}
				})
			},
			leaveShare(){
				if(getStore("homeTo")=="1"){
					// this.$router.push(`/${this.$parent.baseUrlPath}/home`);
					window.location.href="//m.lvmama.com/iflight/main/?hideAppHeader=1";
				}else{
					if (NativeUtil.isLVMM && NativeUtil.isGreaterThan('7.10.5')  && document.cookie.indexOf('closeMultipleWebView=true') === -1) {
						NativeUtil.lvCommon('lvJSBackPage', { 'animate': '1' })    
					} else {
						if (isClient() == 1) {
							window.location.href = "//m.lvmama.com/flight?method=backToAppIndex";
						} else {
							window.location.href = "//m.lvmama.com";
						}
					}
				}
			},
			selectDepart(){
				getElementTag("机票_特价机票_出发地输入框","机票特价机票页");
				this.$router.push(`/${this.$parent.baseUrlPath}/cityPicker/departureCity/flightShare`);
			},
			selectCity(){
				getElementTag("机票_特价机票_目的地输入框","机票特价机票页")
				this.$router.push(`/${this.$parent.baseUrlPath}/cityPicker/arrivalCity/flightShare2`);
			},
			chooseType(type){
				this.selectType = type;
			},
			changePlace(){
				this.exchange =!this.exchange;
			},
			closeTip(){
				this.showAlert = false;
			},
			toMap(){
				this.$router.push(`/${this.$parent.baseUrlPath}/flightMap`);
				let obj = {
					key: 'flightMapInputCity',
					val: ''
				};
				try{	
					this.initData(obj);
				}catch(e){}
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
				getElementTag("特价机票_探索","机票特价机票页");
			},
			shareMap(){
				getElementTag("特价机票_探索地图","机票特价机票页");
				this.$router.push(`/${this.$parent.baseUrlPath}/flightMap`);
			},
			selectTip(){
				this.departureCity.name = this.postionCity;
				for (let i = 0; i < this.allCitys.length; i++) {
					if(this.postionCity == this.allCitys[i].name){
						this.departureCity.code = this.allCitys[i].code;
						let obj ={
		                    key: 'departureCity',
		                    val: {
		                    	'airportCityCode':this.departureCity.code,
		                    	'code':this.departureCity.code,
		                    	'name':this.departureCity.name
		                    }
		                }
					 try{
	 
						 this.initData(obj);
					 }catch(e){}  
					}
				};
				
				this.priceFun(this.allImgUrl);
				this.showAlert = false;
			},
			toNextPage(item,type){
				if(type=="rm"){
					getElementTag("机票_特价机票_热门推荐","机票特价机票页");
				}else if(type=="rmd"){
					getElementTag("机票_特价机票_热门地区","机票特价机票页");
				}
               let obj ={
                    key: 'arrivalCity',
                    val: {
                    	'airportCityCode':item.toCode,
                    	'code':item.toCode,
                    	'name':item.toCity
                    }
                }
              
			 try{
	 
				 this.initData(obj);
			 }catch(e){}  
               this.$router.push(`/${this.$parent.baseUrlPath}/specialcityList`);

			},
			toFlightList(item){
				let departCode =  this.departureCity.code,
					arriveCode = item.toCode,
					toArriveCity = item.toCity,
					departDate = item.time;
				setStore("goFlight","share");
				getElementTag("机票_特价机票_低价特惠","机票特价机票页");
				window.location.href="//m.lvmama.com/"+this.$parent.baseUrlPath+"/"+departCode+"-"+arriveCode+"/"+departDate+"?losc=238037&ict=i";
				


			}
			
		},
		activated(){
			this.isScroll = false;
			//定位城市
			let that = this,
				departCity = this.departureCity.name;
            positionUtil.getLocalPosition(function(position){
            	
                that.postionCity = position.cityName;
                that.alertMessage = "当前定位城市"+that.postionCity+'，'+"是否切换";
                if(position.cityName != departCity && getStore("formHome")=="1"){
                	that.showAlert = true;
                }
               removeStore("formHome");
                
            })

           
	        let one=new Date().getTime()+24*60*60*1000,
	        	dd=new Date(one),
	       		sy = dd.getFullYear(),
	        	sm = dd.getMonth()+1,//获取当前月份的日期
	        	sd = dd.getDate(),
	        	startdate = `${sy}-${sm}-${sd}`,

	       		thirty=new Date().getTime()+90*24*60*60*1000,
	       		ee=new Date(thirty),
	        	ey = ee.getFullYear(),
	        	em = ee.getMonth()+1,//获取当前月份的日期
	        	ed = ee.getDate(),
	       		enddate= `${ey}-${em}-${ed}`;
	       	this.firstDate = startdate;
	       	this.lastDate = enddate;

	       	//所有的城市
	   		this.allImgUrl = [
	   			{'toCity':'三亚','toCode':'SYX','price':'','mDay':'','weekDay':''},
				{'toCity':'昆明','toCode':'KMG','price':'','mDay':'','weekDay':''},
				{'toCity':'西安','toCode':'XIY','price':'','mDay':'','weekDay':''},
				{'toCity':'厦门','toCode':'XMN','price':'','mDay':'','weekDay':''},
				{'toCity':'青岛','toCode':'TAO','price':'','mDay':'','weekDay':''},
				{'toCity':'成都','toCode':'CTU','price':'','mDay':'','weekDay':''},
				{'toCity':'重庆','toCode':'CKG','price':'','mDay':'','weekDay':''},
				{'toCity':'深圳','toCode':'SZX','price':'','mDay':'','weekDay':''},
				{'toCity':'大连','toCode':'DLC','price':'','mDay':'','weekDay':''},
				{'toCity':'哈尔滨','toCode':'HRB','price':'','mDay':'','weekDay':''},
				{'toCity':'武汉','toCode':'WUH','price':'','mDay':'','weekDay':''},
				{'toCity':'丽江','toCode':'LJG','price':'','mDay':'','weekDay':''},
				{'toCity':'海口','toCode':'HAK','price':'','mDay':'','weekDay':''},
				{'toCity':'广州','toCode':'CAN','price':'','mDay':'','weekDay':''},
				{'toCity':'贵阳','toCode':'KWE','price':'','mDay':'','weekDay':''},
				{'toCity':'长沙','toCode':'CSX','price':'','mDay':'','weekDay':''},
				{'toCity':'上海','toCode':'SHA','price':'','mDay':'','weekDay':''},
				{'toCity':'北京','toCode':'PEK','price':'','mDay':'','weekDay':''},
				{'toCity':'珠海','toCode':'ZUH','price':'','mDay':'','weekDay':''},
				{'toCity':'南京','toCode':'NKG','price':'','mDay':'','weekDay':''},
				{'toCity':'洛阳','toCode':'LYA','price':'','mDay':'','weekDay':''},
				{'toCity':'郑州','toCode':'CGO','price':'','mDay':'','weekDay':''},
				{'toCity':'拉萨','toCode':'LXA','price':'','mDay':'','weekDay':''},
				{'toCity':'桂林','toCode':'KWL','price':'','mDay':'','weekDay':''},
				{'toCity':'杭州','toCode':'HGH','price':'','mDay':'','weekDay':''},
				{'toCity':'沈阳','toCode':'SHE','price':'','mDay':'','weekDay':''},
				{'toCity':'天津','toCode':'TSN','price':'','mDay':'','weekDay':''},
				{'toCity':'秦皇岛','toCode':'BPE','price':'','mDay':'','weekDay':''}
				
	   		];

	       	// banner图
	   		this.imgUrl = [
	   			{'toCity':'三亚','toCode':'SYX','price':'','mDay':'','time':'','weekDay':'','activityName':''},
				{'toCity':'昆明','toCode':'KMG','price':'','mDay':'','time':'','weekDay':'','activityName':''},
				{'toCity':'西安','toCode':'XIY','price':'','mDay':'','time':'','weekDay':'','activityName':''},
				{'toCity':'厦门','toCode':'XMN','price':'','mDay':'','time':'','weekDay':'','activityName':''}
				
	   		];
	   		

	   		//banner图城市去重
	   		var bannerOne={'toCity':'青岛','toCode':'TAO','price':''};
	   		for (let i = 0; i < this.imgUrl.length; i++) {
	   			if(this.departureCity.name == this.imgUrl[i].toCity){
	   				this.imgUrl[i] = bannerOne;

	   			}
	   		};

	   		// 热门城市
			this.hotCode = [
				{'toCity':'三亚','toCode':'SYX','price':'','mDay':'','weekDay':''},
				{'toCity':'昆明','toCode':'KMG','price':'','mDay':'','weekDay':''},
				{'toCity':'西安','toCode':'XIY','price':'','mDay':'','weekDay':''},
				{'toCity':'厦门','toCode':'XMN','price':'','mDay':'','weekDay':''},
				{'toCity':'成都','toCode':'CTU','price':'','mDay':'','weekDay':''},
				{'toCity':'青岛','toCode':'TAO','price':'','mDay':'','weekDay':''}
			];
			// 热门城市去重
			var alternativeOne={'toCity':'重庆','toCode':'CKG','price':''};
	   		for (let i = 0; i < this.hotCode.length; i++) {
	   			if(this.departureCity.name == this.hotCode[i].toCity){
	   				this.hotCode[i] = alternativeOne;

	   			}
	   		};
			// 热门城市换一换
			this.alternativeHot = [
				{'toCity':'深圳','toCode':'SZX','price':'','mDay':'','weekDay':''},
				{'toCity':'大连','toCode':'DLC','price':'','mDay':'','weekDay':''},
				{'toCity':'哈尔滨','toCode':'HRB','price':'','mDay':'','weekDay':''},
				{'toCity':'武汉','toCode':'WUH','price':'','mDay':'','weekDay':''},
				{'toCity':'丽江','toCode':'LJG','price':'','mDay':'','weekDay':''},
				{'toCity':'海口','toCode':'HAK','price':'','mDay':'','weekDay':''}
			];
			// 热门城市换一换去重
			var alternativeTwo={'toCity':'重庆','toCode':'CKG','price':''};
	   		for (let i = 0; i < this.alternativeHot.length; i++) {
	   			if(this.departureCity.name == this.alternativeHot[i].toCity){
	   				this.alternativeHot[i] = alternativeTwo;

	   			}
	   		};

	   		//热门推荐美食之都
	   		this.spotFood = [
	   			{'toCity':'广州','toCode':'CAN','price':'','mDay':'','weekDay':''},
				{'toCity':'重庆','toCode':'CKG','price':'','mDay':'','weekDay':''},
				{'toCity':'贵阳','toCode':'KWE','price':'','mDay':'','weekDay':''},
				{'toCity':'长沙','toCode':'CSX','price':'','mDay':'','weekDay':''},
				{'toCity':'武汉','toCode':'WUH','price':'','mDay':'','weekDay':''}
				
			];
			//美食之都城市去重
			var spotFoodChange={'toCity':'昆明','toCode':'KMG','price':''};
	   		for (let i = 0; i < this.spotFood.length; i++) {
	   			if(this.departureCity.name == this.spotFood[i].toCity){
	   				this.spotFood[i] = spotFoodChange;

	   			}
	   		};
			//热门推荐乐园寻趣
	   		this.spotFun = [
	   			{'toCity':'广州','toCode':'CAN','price':'','mDay':'','weekDay':''},
				{'toCity':'上海','toCode':'SHA','price':'','mDay':'','weekDay':''},
				{'toCity':'北京','toCode':'PEK','price':'','mDay':'','weekDay':''},
				{'toCity':'珠海','toCode':'ZUH','price':'','mDay':'','weekDay':''},
				{'toCity':'深圳','toCode':'SZX','price':'','mDay':'','weekDay':''}
				
			];
			//乐园寻趣城市去重
			var spotFunChange={'toCity':'大连','toCode':'DLC','price':''};
	   		for (let i = 0; i < this.spotFun.length; i++) {
	   			if(this.departureCity.name == this.spotFun[i].toCity){
	   				this.spotFun[i] = spotFunChange;

	   			}
	   		};
			//热门推荐历史古都
	   		this.spotCity = [
	   			{'toCity':'南京','toCode':'NKG','price':'','mDay':'','weekDay':''},
				{'toCity':'北京','toCode':'PEK','price':'','mDay':'','weekDay':''},
				{'toCity':'西安','toCode':'XIY','price':'','mDay':'','weekDay':''},
				{'toCity':'洛阳','toCode':'LYA','price':'','mDay':'','weekDay':''},
				{'toCity':'郑州','toCode':'CGO','price':'','mDay':'','weekDay':''}
				
			];
			//历史古都城市去重
			var spotCityChange={'toCity':'杭州','toCode':'HGH','price':''};
	   		for (let i = 0; i < this.spotFun.length; i++) {
	   			if(this.departureCity.name == this.spotCity[i].toCity){
	   				this.spotCity[i] = spotCityChange;

	   			}
	   		};
			//热门推荐阳光沙滩
	   		this.spotSunshine = [
	   			{'toCity':'秦皇岛','toCode':'BPE','price':'','weekDay':''},
				{'toCity':'青岛','toCode':'TAO','price':'','weekDay':''},
				{'toCity':'海口','toCode':'HAK','price':'','weekDay':''},
				{'toCity':'厦门','toCode':'XMN','price':'','weekDay':''},
				{'toCity':'深圳','toCode':'SZX','price':'','weekDay':''}
				
				
			];
			//阳光沙滩城市去重
			var spotCityChange={'toCity':'烟台','toCode':'YNT','price':''};
	   		for (let i = 0; i < this.spotSunshine.length; i++) {
	   			if(this.departureCity.name == this.spotSunshine[i].toCity){
	   				this.spotSunshine[i] = spotCityChange;

	   			}
	   		};
			//热门推荐毕业旅行
	   		this.spotTravel = [
	   			{'toCity':'拉萨','toCode':'LXA','price':'','weekDay':''},
				{'toCity':'青岛','toCode':'TAO','price':'','weekDay':''},
				{'toCity':'成都','toCode':'CTU','price':'','weekDay':''},
				{'toCity':'厦门','toCode':'XMN','price':'','weekDay':''},
				{'toCity':'昆明','toCode':'KMG','price':'','weekDay':''}
				
				
			];
			//毕业旅行城市去重
			var spotTravelChange={'toCity':'桂林','toCode':'KWL','price':''};
	   		for (let i = 0; i < this.spotTravel.length; i++) {
	   			if(this.departureCity.name == this.spotTravel[i].toCity){
	   				this.spotTravel[i] = spotTravelChange;

	   			}
	   		};

			// 低价特惠城市
			this.LowPrice = [
				{'toCity':'上海','toCode':'SHA','price':'','mDay':'','time':'','weekDay':''},
				{'toCity':'北京','toCode':'PEK','price':'','mDay':'','time':'','weekDay':''},
				{'toCity':'广州','toCode':'CAN','price':'','mDay':'','time':'','weekDay':''},
				{'toCity':'成都','toCode':'CTU','price':'','mDay':'','time':'','weekDay':''},
				{'toCity':'厦门','toCode':'XMN','price':'','mDay':'','time':'','weekDay':''},
				{'toCity':'西安','toCode':'XIY','price':'','mDay':'','time':'','weekDay':''},
				{'toCity':'三亚','toCode':'SYX','price':'','mDay':'','time':'','weekDay':''},
				{'toCity':'杭州','toCode':'HGH','price':'','mDay':'','time':'','weekDay':''},
				{'toCity':'重庆','toCode':'CKG','price':'','mDay':'','time':'','weekDay':''},
				{'toCity':'南京','toCode':'NKG','price':'','mDay':'','time':'','weekDay':''},
				{'toCity':'青岛','toCode':'TAO','price':'','mDay':'','time':'','weekDay':''},
				{'toCity':'深圳','toCode':'SZX','price':'','mDay':'','time':'','weekDay':''},
				{'toCity':'昆明','toCode':'KMG','price':'','mDay':'','time':'','weekDay':''},
				{'toCity':'大连','toCode':'DLC','price':'','mDay':'','time':'','weekDay':''},
				{'toCity':'哈尔滨','toCode':'HRB','price':'','mDay':'','time':'','weekDay':''},
				{'toCity':'郑州','toCode':'CGO','price':'','mDay':'','time':'','weekDay':''},
				{'toCity':'沈阳','toCode':'SHE','price':'','mDay':'','time':'','weekDay':''},
				{'toCity':'天津','toCode':'TSN','price':'','mDay':'','time':'','weekDay':''},
				{'toCity':'长沙','toCode':'CSX','price':'','mDay':'','time':'','weekDay':''},
				{'toCity':'珠海','toCode':'ZUH','price':'','mDay':'','time':'','weekDay':''}
			]
			// 低价特惠城市去重
			var LowPriceChange={'toCity':'武汉','toCode':'WUH','price':''};
	   		for (let i = 0; i < this.LowPrice.length; i++) {
	   			if(this.departureCity.name == this.LowPrice[i].toCity){
	   				this.LowPrice[i] = LowPriceChange;

	   			}
	   		};
	   		
			// this.$nextTick(() => {
	  //         setTimeout(function(){
			// 		new Swiper('.swiper-container', {
			//               pagination: '.swiper-pagination',
			//               loop: true,
			//               autoplay: 3000,
			//               initialSlide:0,
			//               observer:true,//修改swiper自己或子元素时，自动初始化swiper
		 //                  observeParents:true,//修改swiper的父元素时，自动初始化swiper
		 //                  autoplayDisableOnInteraction: false

			//           });
			// 	},0)
	  //       })

			// this.priceFun(this.imgUrl,"banner");//轮播图区域调接口
			this.getCityFun();
			this.priceFun(this.allImgUrl);

			this.$nextTick(()=>{
	        // 这里面获取实时
	        document.getElementById("judgmentScroll").addEventListener('scroll',this.watchScrollLocation);
	        
	      })
			
			getStatisticsType('机票特价机票页','FlightShare');
	       let priceObj = {
				key: 'flightMapPrice',
				val: {
					low: 0,
					high: 3000
				}
			};
			try{	
				this.initData(priceObj);
			}catch(e){}
			
		},
		created(){

		},
		watch:{
			changeScroll(newVal,oldVal){
				let headerHeight = document.getElementById("shareHeight").clientHeight;
				var bannerHeight = document.getElementById("isSwiper").offsetHeight;
				if(newVal>oldVal){
					this.isScroll = true;
				}else if(newVal<oldVal&&newVal<=bannerHeight){
					this.isScroll = false;
				}
				
				
			}
		}
	}
</script>
<style lang="scss" scoped>
@import '../../style/mixin';
.flightShareContent{
	@include wh(100%,100%);
	position: relative;
	overflow-x:hidden;
	.share_header{
		@include wh(100%,1rem);
		position:relative;
		z-index: 10;
		top:0;
		background:transparent;
		padding-top: 0.2rem;
		.addArear{
			@include wh(0.8rem,0.8rem);
			position: absolute;
			left: 0.2rem;
			.share_back {
				display: inline-block;
				@include wh(0.6rem,0.6rem);
				background:url("//m.lvmama.com/flight/image/back_button.png") no-repeat;
				background-size: 100%;
			}
		}
		
		.add{
			@include wh(100%,0.6rem);
			display: -webkit-flex;
			display: flex;
			-webkit-align-items: center;
			align-items: center;
			-webkit-justify-content: center;
			justify-content: center;
		}
		.share_search{
			@include wh(70%,0.6rem);
		    // position: absolute;
		    // left: 50%;
		    // transform: translateX(-50%);
		    margin:0 auto;
		    z-index: 20;
		    overflow: hidden;
		    display: -webkit-box;
		    display: -moz-box;
		    display: -webkit-flex;
		    display: -ms-box;
		    display: flex;
		    > span{
		    	display: block;
		    	@include wh(auto,0.6rem);
			    line-height: .6rem;
			    // border: 1px solid #ccc;
			    border-radius: .3rem 0 0 .3rem;
			    background: #fff;
			    z-index: 2;
			    position: relative;
			    padding: 0 .2rem;
			    box-sizing: border-box;
			    > i{
			    	display: inline-block;
				    @include sc(0.28rem,#666);
			    }
			    > u{
			    	display: inline-block;
			    	@include wh(0.13rem,0.22rem);
			    	background:url("//m.lvmama.com/flight/image/detail_arrow.png") no-repeat;
                	background-size: 100%;
                	transform: rotate(90deg);
					margin-left: 0.1rem;
			    }
		    }
			.city_name:after {
				display: inline-block;
				content: "";
				width: 1px;
				height: 0.3rem;
				border-right: 1px solid #efefef;
				position: absolute;
				top: 50%;
				left: 94%;
				transform: translateY(-50%);
				-webkit-transform: translateY(-50%);
				padding-left: 0.03rem;
			}
		    .input_container {
		    	display: inline-block;
		    	height:0.6rem;
		    	line-height: .6rem;
		    	border-radius: 0 .3rem .3rem 0;
				// border: 1px solid #ccc;
				-webkit-flex-grow: 1;
			    -moz-flex-grow: 1;
			    -ms-flex-grow: 1;
			    -o-flex-grow: 1;
			    flex-grow: 1;
			    background-color: #fff;
			    position: relative;
			    margin-left: -1px;
			    input{
			    	background: transparent;
			    	display: inline-block;
			    	margin-left: 14%;
			    }
			    em{
			    	display: inline-block;
			    	@include wh(0.32rem,0.32rem);
			    	background:url("//m.lvmama.com/flight/image/magnifire.png") no-repeat;
	                background-size: 100%;
	                @include ct;
	                margin-left: 4%;
			    }
		    }
		}
        .Map{
        	display: inline-block;
            @include wh(0.48rem,0.48rem);
            background: url('//m.lvmama.com/flight/image/toMap_new.png') no-repeat;
            -webkit-background-size: 100%;
            position: absolute;
    		right: 0.2rem;
    		top: .26rem;
        }
	}
	.scroll_bg{
		background: #fff;
	}
	.shareScroll{
		.swiper-pagination-bullet-active{
			background: #fff;
		}
		@include wh(100%,100%);
		@include heightByAbsolute(0,0.4rem);
		overflow-y:auto;
		.swiper-container{
			@include wh(100%,3.8rem);
			// width:100%;
			// height:29%;
			overflow: hidden;
			position:relative;
			// .swiper-container{
			// 	@include wh(100%,2.34rem);
			// }
			.toPlace{
				position:absolute;
				z-index: 11;
				height: 3.8rem;
				width: 100%;
				top: 0;
				>p{
					position: absolute;
					bottom: 41%;
					left: 0.4rem;
				}
				span{
					@include sc(0.36rem,#fff);
					display: inline-block;
					margin-right: 0.1rem; 
				}
				span:nth-child(3){
					margin-left: 0.16rem;
				}
				i{
					display: inline-block;
					@include wh(0.1rem,0.1rem);
					background:#fff;
					border-radius: 50%;
					@include ct;

				}
				.toPlacePrice{
					margin-top: 0.3rem;
					position: absolute;
					bottom: 20%;
					left: .4rem;
					span:nth-child(1){
						@include wh(1.4rem,0.48rem);
						background: #FD3C71;
						border-radius: 3px;
						padding-left: 0.15rem;
					}
					span{
						margin-left: 2%;
						em{
							display: inline-block;
							@include sc(0.24rem,#fff);
						}
						em:nth-child(2){
							margin-left: -10%;
							font-size: 0.32rem;
						}
					}
					span:nth-child(2){
						display: inline-block;
						width: 1.5rem;
						height: 0.48rem;
						background:#fff;
						border-radius: 0 3px 3px 0;
						text-align: center;
						line-height: 0.48rem;
						@include sc(0.22rem,#000);
						@include ct;
						left:28%;
					}
					
				}
			}
		}
		.hot_place{
			@include wh(100%,auto);
			background:#fff;
			margin-top: 0.2rem;
			>div{
				padding:0.3rem 0.2rem;
				p{
					float:left;
					margin-bottom: 0.3rem;
				}
				p:nth-child(2){
					float:right;
					 span{
					 	@include sc(0.24rem,#999999);
					 }
					span:nth-child(2){
						display: inline-block;
						@include wh(0.22rem,0.24rem);
						background:url("//m.lvmama.com/flight/image/changeCity.png") no-repeat;
                        background-size: 100%;
                        vertical-align: middle;

					}
				}
			}
			.In_hot{
				@include wh(100%,auto);
				flex-wrap: wrap;
				padding:0 0.15rem;
				overflow-x:hidden;
				li{
					@include wh(2.26rem,1.6rem);
					margin-right: 0.2rem;
					margin-bottom: 0.2rem;
					position: relative;
					float: left;
					img{
						@include wh(2.26rem,1.6rem);
					}
				}
				li:nth-child(3){
					margin-right:0;
				}
				li:last-child{
					margin-right:0;
				}
				.center_content{
					@include wh(2.26rem,auto);
					@include center;
					text-align: center;
					span{
						display: block;
						@include sc(0.32rem,#fff);
					}
					span:nth-child(2){
						margin-top:0.1rem;
					}
					u,em{
						@include sc(0.24rem,#fff);
						text-decoration: inherit;
					}
				}
			}
		}
		.addMap{
			@include wh(100%,auto);
			background:#fff;
			text-align: center;
			padding: .2rem .2rem 0 .2rem;
			p{
				@include sc(0.28rem,#333);
			}
			p:nth-child(2){
				@include sc(0.2rem,#999);
				margin-bottom: 0.3rem;
				margin-top: 0.1rem;
			}
			.mapShare{
				@include wh(100%,2.69rem);
				background:url("//m.lvmama.com/flight/image/tansuo_new.png") no-repeat;
	            background-size: 100%;
			}
		}
		
		.recommend{
			@include wh(100%,auto);
			background:#fff;
			margin-top: 0.2rem;
			padding:0.3rem 0.2rem 0.2rem 0.2rem;
			>p{
				margin-bottom: 0.3rem;
				@include sc(0.28rem,#333333);
			}
			.recommend_wrap {
				@include wh(100%,1.06rem);
				overflow-x: scroll; 
				overflow-y: hidden;
				position: relative;
			    top: 0;
			    z-index: 9;
				>ul{
					@include wh(10.8rem,1.06rem);
					overflow-y: hidden;
					li{
						@include wh(2.08rem,1.06rem);
						background:#F5F5F5;
						margin-right:0.2rem;
						border-radius: 0.06rem;
						position:relative;
						>div{
							// @include wh(2.08rem,1.06rem);
							>div{
								@include ct;
								left:4%;
								p{
									@include sc(0.24rem,#333333);
								}
								p:nth-child(2){
									@include sc(0.24rem,#999999);
									transform: scale(0.85);
	    							margin-left: -7%;
								}
							}
						}
						>div:nth-child(2){
							@include wh(0.6rem,0.5rem);
							background:url("//m.lvmama.com/flight/image/food.png") no-repeat;
	                    	background-size: 100%;
	                    	position:absolute;
	                    	right:0.04rem;
	                    	top:23%;
						}
					}
					li:nth-child(2){
						>div:nth-child(2){
							@include wh(0.68rem,0.58rem);
							background:url("//m.lvmama.com/flight/image/paradise.png") no-repeat;
	                    	background-size: 100%;
						}
					}
					li:nth-child(3){
						>div:nth-child(2){
							@include wh(0.52rem,0.64rem);
							background:url("//m.lvmama.com/flight/image/capital.png") no-repeat;
	                    	background-size: 100%;
						}
					}
					li:nth-child(4){
						>div:nth-child(2){
							@include wh(0.6rem,0.64rem);
							background:url("//m.lvmama.com/flight/image/sunshine.png") no-repeat;
	                    	background-size: 100%;
						}
					}
					li:nth-child(5){
						>div:nth-child(2){
							@include wh(0.6rem,0.46rem);
							background:url("//m.lvmama.com/flight/image/graduate.png") no-repeat;
	                    	background-size: 100%;
						}
					}
					.selectTypeBackColor{
						@include wh(2.08rem,1.06rem);
						background:url("//m.lvmama.com/flight/image/bg_color.png") 0 0 no-repeat;
	     				background-size: 100% 100%;
	     				>div{
	     					>div{
	     						p{
	     							color:#fff;
	     						}
	     						p:nth-child(2){
	     							color:#fff;
	     						}
	     					}
	     				}
					}
				}
			}
			.recommend_pic{
				@include wh(100%,auto);
				margin-top: 0.2rem;
				display: -webkit-box;
			    display: -moz-box;
			    display: -ms-flexbox;
			    display: -webkit-flex;
			    display: flex;
				.pic_left{
					position:relative;
					@include wh(2.26rem,3.36rem);
					// margin-right: 0.1rem;
					//  -webkit-box-flex: 1;
					//  -moz-box-flex: 1;
					//  -webkit-flex: 1;
					// -ms-flex: 1;
					// flex: 1;
					>img{
						@include wh(2.26rem,3.36rem);
						border-radius: 0.08rem;
					}
					    
				}
				.pic_right{
					width: 4.8rem;
					// -webkit-box-flex: 2;
				 //    -moz-box-flex: 2;
				 //    -webkit-flex: 2;
				 //    -ms-flex: 2;
				 //    flex: 2;

					li{
						@include wh(2.25rem,1.6rem);
						background:#ccc;
						float: left;
						margin-left: 0.15rem;
						position:relative;
						border-radius: 0.08rem;
					}
					li:nth-child(3),li:nth-child(4){
						margin-top: 0.2rem;
					}
				}
				.pic_content{
						@include wh(2.26rem,auto);
						@include center;
						text-align: center;
						span{
							display: block;
							@include sc(0.32rem,#fff);
							u{
								text-decoration: inherit;
								@include sc(0.24rem,#fff);
							}
							em{
								@include sc(0.24rem,#fff);
							}
						}
						span:nth-child(2){
							margin-top: 0.1rem;
						}
					}
			}
		}
		.preferential{
			@include wh(100%,auto);
			background:#fff;
			margin-top: 0.2rem;
			padding: 0.3rem 0.2rem 0 0.2rem;
			>p{
				margin-bottom: 0.3rem;
			}
			>ul{
				overflow: hidden;
				>li{
					@include wh(3.48rem,1.3rem);
					background:url("//m.lvmama.com/flight/image/li_bg.png") no-repeat;
                   	background-size: 100%;
                   	float:left;
                   	position:relative;
                   	margin-bottom: 0.2rem;
                   	.prefer_left{
                   		@include ct;
                   		left:0.2rem;
                   		>p{
                   			position:relative;
                   			span{
                   				display: inline-block;
                   				margin-right:0.08rem;
                   				@include sc(0.26rem,#333333);
                   			}
                   			span:nth-child(3){
                   				margin-left:0.4rem;
                   			}
                   		}
                   		i{
                   			display: inline-block;
                   			@include wh(0.28rem,0.08rem);
							background:url("//m.lvmama.com/flight/image/arrow_list.png") no-repeat;
		                   	background-size: 100%;
		                   	@include ct;
                   		}
                   		p:nth-child(2){
                   			@include sc(0.24rem,#999999);
                   			display: inline-block;
                   		}
                   		>span{
                   			@include sc(0.24rem,#999999);
                   		}
                   	}
                   	.prefer_right{
                   		@include ct;
                   		right:5%;
                   		i{
                   			@include sc(0.24rem,#fff);
							padding-right: 0.05rem;
                   		}
                   		span{
                   			@include sc(0.32rem,#fff);
                   			margin-left: -0.1rem;
                   		}
						.low_price{
							display: block;
							font-size: 0.24rem;
							color: rgba(255,255,255,0.5);
							text-align: center;
							padding-left: 0.1rem;
						}
                   	}
				}
				li:nth-child(2n+1){
					margin-right:0.1rem;
				}
			}
		}
	}
	
	
}	
</style>