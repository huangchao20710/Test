<template>
    <div class="city_container">
        <search-header @get-input="getInput" @get-input-state="getInputState"></search-header>
        <div class="page_location_name page_location_name_special">{{pageLocationName}}</div>
        <ul class="firstLetter_container">
          <li class="lishi" @click="goAnchor('.lishi')">历史</li>
          <li @click="goAnchor('.hot')">热门</li>
          <li class="xy_flex" v-for="item in firstLetters" @click="goAnchor('.'+ item.toLowerCase())">{{item}}</li>
        </ul>
        <div class="city_list_container" ref="scrollContainer">
          <ul class="hot_city_container clearfix">
            <li></li>
            <li class="location_city square_item xy_flex left" v-for="(item,index) in historyCity" @click="chooseCity(item)"><span class="loaction_icon" v-if="index == 0"></span>{{item.name}}</li>
            
          </ul>
          <div class="hot_city_container clearfix">
            <div class="page_location_name hot located">热门城市</div>
            <div class="square_item xy_flex left" v-for="item in hotCities" @click="chooseCity(item)">{{item.name}}</div>
          </div>
          <ul class="all_city_container">
            <ul class="city_fitstLetter_item" v-for="city in showCities">
              <li :class="city.firstLetter.toLowerCase()" class="page_location_name located city_fitstLetter_item">{{city.firstLetter}}</li>
              <li class="city_item" v-for="item in city.cities" @click="chooseCity(item)">{{item.name}}</li>
            </ul>
          </ul> 
        </div>
        <div class="filter_container" v-show="filterCities.length > 0">
          <ul>
            <li class="city_item" v-for="item in filterCities" @click="chooseCity(item)">{{item.name}}</li>
          </ul>
        </div>
        <div class="mask" v-show="isFocus"></div>
        <div class="anchor-pop" v-if="clickAnchor!=''">{{clickAnchor}}</div>
    </div>
</template>

<script>

import { mapActions, mapState } from 'vuex'
import searchHeader from '../../components/common/searchHeader'

import { getStore,setStore,removeStore } from '../../config/mUtils'

import { getFlightCities } from '../../service/getData'

export default {
    name: 'cityPicker',
    components: {
      searchHeader
    },
    data(){
      return {
        allCities: [],//所有城市
        hotCities: [],//热门城市
        hotCitiesArr: [],//所有热门城市
        currentCities: [],//当前定位城市
        firstLetters: [],//首字母
        filterCities: [],//筛选后的城市
        showCities: [],//用于展示的城市数据
        pageLocationName: '定位/历史城市',
        scrollLocation: 0,
        isFocus: false,
        historyCity: [],//历史城市
        clickAnchor:'',
      }
    },
    computed: {
      ...mapState([
          'searchHistoryArr'
        ])
    },
    methods: {
      ...mapActions([
        'initData'
      ]),
      goAnchor(selector){//字母索引跳转函数
        let that=this;
        let anchor = this.$el.querySelector(selector);
        if (anchor.innerHTML === '历史') {
          this.clickAnchor='历史';
          document.querySelector('.city_list_container').scrollTop = 0;
        } else {
          
          this.pageLocationName = anchor.innerHTML;
          if(this.pageLocationName=="热门城市"){
            document.querySelector('.city_list_container').scrollTop = anchor.offsetTop + anchor.clientHeight - 5;
            this.clickAnchor="热门";
          }else{
            document.querySelector('.city_list_container').scrollTop = anchor.offsetTop + anchor.clientHeight;
            this.clickAnchor=this.pageLocationName;
          }
          
        }
        setTimeout(function(){that.clickAnchor=false}, 1000);
      },
      //监听滚动位置
      watchScrollLocation(){
        this.scrollLocation = document.querySelector('.city_list_container').scrollTop;
        let locatedArr = document.querySelectorAll('.located');
        for (let i = 0; i < locatedArr.length; i++) {
          if (this.scrollLocation >= locatedArr[i].offsetTop) {
            this.pageLocationName = locatedArr[i].innerHTML;
          } else if (this.scrollLocation === 0) {
            this.pageLocationName = '定位/历史城市';
          }
        }
      },
      //获取input的聚焦失焦值
      getInputState(bool){
        this.isFocus = bool;
      },
      compare(obj1, obj2) {
        let val1 = obj1.searchCount;
        let val2 = obj2.searchCount;
        if (val1 > val2) {
            return -1;
        } else if (val1 < val2) {
            return 1;
        } else {
            return 0;
        }            
      },
      //获取input输入框的内容进行删选城市
      getInput(val) {
        if (val != '') {
          this.filterCities = [];
          if(/^[\x00-\xff]/.test(val)){//如果是字母
            let filterList = [];
            for (let i = 0; i < this.allCities.length; i++) {
              if (this.allCities[i].jianPin.toLowerCase().indexOf(val.toLowerCase()) ==0 || this.allCities[i].pinYin.toLowerCase().indexOf(val.toLowerCase()) == 0) {
                filterList.push(this.allCities[i])
              }
            }
            if(filterList.length>0 && this.hotCitiesArr.length>0){
              // let hotFilter = [],noHotFilter = [];
              // for(let i=0;i<filterList.length;i++){
              //   let flag=false;
              //   for(let j=0;j<this.hotCitiesArr.length;j++){
              //     if(this.hotCitiesArr[j].name==filterList[i].name){
              //       flag=true;
              //       filterList[i].hot=this.hotCitiesArr[j].hot;
              //       hotFilter.push(filterList[i]);
              //       break;
              //     }
              //   }
              //   if(flag==false){
              //     noHotFilter.push(filterList[i]);
              //   }
              // }
              // if(hotFilter.length>0){
              //   hotFilter=hotFilter.sort(this.compare);
              // }
              // this.filterCities = hotFilter.concat(noHotFilter);
              this.filterCities=filterList.sort(this.compare);
            }else{
              this.filterCities=filterList;
            }
          }else{
              let filterList = [];
              for (let i = 0; i < this.allCities.length; i++) {
                if (this.allCities[i].name.indexOf(val) != -1) {
                  filterList.push(this.allCities[i])
                }
              }
              let checkArr=[],noCheckArr=[];
              for(let j=0;j<filterList.length;j++){
                if(filterList[j].name.indexOf(val) ==0){
                  checkArr.push(filterList[j]);
                }else{
                  noCheckArr.push(filterList[j]);
                }
              }
              let hotFilterArr=[],noHotFilterArr = [];
              if(checkArr.length>0){
                // let hotFilter = [],noHotFilter = [];
                // for(let i=0;i<checkArr.length;i++){
                //   let flag=false;
                //   for(let j=0;j<this.hotCitiesArr.length;j++){
                //     if(checkArr[i].name==this.hotCitiesArr[j].name){
                //       checkArr[i].hot=this.hotCitiesArr[j].hot;
                //       hotFilter.push(checkArr[i]);
                //       flag=true;
                //       break;
                //     }
                //   }
                //   if(flag==false){
                //     noHotFilter.push(checkArr[i]);
                //   }
                // }
                // if(hotFilter.length>0){
                //   hotFilter=hotFilter.sort(this.compare);
                // }
                // hotFilterArr = hotFilter.concat(noHotFilter);
                hotFilterArr = checkArr.sort(this.compare);
              }
              if(noCheckArr.length>0){
                // let hotFilter = [],noHotFilter = [];
                // for(let i=0;i<noCheckArr.length;i++){
                //   let flag=false;
                //   for(let j=0;j<this.hotCitiesArr.length;j++){
                //     if(noCheckArr[i].name==this.hotCitiesArr[j].name){
                //       noCheckArr[i].hot=this.hotCitiesArr[j].hot;
                //       hotFilter.push(noCheckArr[i]);
                //       flag=true;
                //       break;
                //     }
                //   }
                //   if(flag==false){
                //     noHotFilter.push(noCheckArr[i]);
                //   }
                // }
                // if(hotFilter.length>0){
                //   hotFilter=hotFilter.sort(this.compare);
                // }
                // noHotFilterArr = hotFilter.concat(noHotFilter);
                noHotFilterArr = noCheckArr.sort(this.compare);
              }
               this.filterCities=hotFilterArr.concat(noHotFilterArr);
          }
          // this.filterCities = [];
          // for (let i = 0; i < this.allCities.length; i++) {
          //   if (this.allCities[i].jianPin.toLowerCase().indexOf(val.toLowerCase()) != -1 || this.allCities[i].pinYin.toLowerCase().indexOf(val.toLowerCase()) != -1 || this.allCities[i].name.indexOf(val) != -1) {
          //     this.filterCities.push(this.allCities[i])
          //   }
          // }
        } else {
          this.filterCities = [];
        }
      },
      //选择城市
      chooseCity(item) {
        let obj = {
            key: this.$route.params.kind,
            val: item
        };
        try{
          this.initData(obj);
        }catch(e){}

         if(this.$route.params.from == 'departFrom'){
           setStore("isSelectFCity",true);
        }else if(this.$route.params.from == 'destTo'){
          setStore("isSelectTCity",true);
        }
        
        if(this.$route.params.from == 'flightShare2'){
            this.$router.push(`/${this.$parent.baseUrlPath}/specialcityList`);

        }else{
           this.$router.go(-1);
        }
        console.log(this.$route.params.from);
        
      }
    },
    created(){
 
    },
    
    mounted() {
      
      
    },
    watch: {
      
    },
    activated(){
      this.$parent.showLoading = true;
      this.pageLocationName='定位/历史城市';
      getFlightCities().then((res) => {
          let allCities = res.data.allCitys,
            firstLetters = [];
            this.allCities = allCities;
            try {
              if(allCities.length>0){
                setStore("flightAllCities",allCities);
              }
            } catch (error) {
              
            }
          this.hotCitiesArr = res.data.hotCitys;
          this.hotCities = res.data.hotCitys.slice(0,9);
          for (let i = 0; i < allCities.length; i++) {
            firstLetters.push(allCities[i].firstLetter.toUpperCase());
          }
          firstLetters = Array.from(new Set(firstLetters)).sort();
          this.firstLetters = firstLetters;
          for (let i = 0; i < firstLetters.length; i++) {
            let obj = {
              firstLetter: firstLetters[i],
              cities: []
            }
            for (let j = 0; j < allCities.length; j++) {
              if (allCities[j].firstLetter.toUpperCase() === firstLetters[i]) {
                obj.cities.push(allCities[j])
              }
            }
            this.showCities.push(obj)
          }
          this.$parent.showLoading = false;
      });
      this.$nextTick(()=>{
        // 这里面获取实时
      document.querySelector('.city_list_container').addEventListener('scroll',this.watchScrollLocation);
        
      });
      let tempHisory = this.searchHistoryArr;
      let tempCityArr = [];
      for (let i = 0; i < tempHisory.length; i++) {
        tempCityArr.push(tempHisory[i].departureCity);
        tempCityArr.push(tempHisory[i].arrivalCity);
      }
      let tempCode = [];
      for (let i = 0; i < tempCityArr.length; i++) {
        tempCode.push(tempCityArr[i].code);
      }
      tempCode = Array.from(new Set(tempCode));
      let finalTemp = [];
      for (let i = 0; i < tempCode.length; i++) {
        for (let j = 0; j < tempCityArr.length; j++) {
          if (tempCode[i] == tempCityArr[j].code) {
            finalTemp.push(tempCityArr[j]);
            break;
          }
        }
      }
      for (let i = 0; i < finalTemp.length; i++) {
        if (finalTemp[i].code == 'SHA') {
          finalTemp.splice(i,1);
        }
      }
      
      let shObj = {
        airportCityCode:"SHA",
        code:"SHA",
        firstLetter:"s",
        hot:1,
        id:7341,
        jianPin:"SH",
        name:"上海",
        pinYin:"shanghai"
      };
      finalTemp.unshift(shObj);
      if (finalTemp.length > 5) {
        finalTemp.splice(5,1);
      }
      this.historyCity = finalTemp;
    }

}
</script>

<style lang="scss" scoped>
    @import '../../style/mixin';
    .city_container {
      @include wh(100%,100%);
      position: relative;
      padding-top: 1rem;
      box-sizing: border-box;
      background: #eeeef5;
      .page_location_name {
        width: 100%;
        color: #666;
        font-size: .22rem;
        padding: .05rem 0;
        padding-left: .2rem;
        border: none;
      }
      .page_location_name_special {
        position: absolute;
        top: 1.1rem;
        left: 0;
        z-index: 2;
      }
      .firstLetter_container {
        @include sc(.2rem,#666);
        width: .6rem;
        position: absolute;
        right: 0rem;
        top: 1.1rem;
        text-align: center;
        z-index: 3;
        >li{
          margin-top: .1rem;
        }
      }
      .city_list_container {
        width: 100%;
        padding: .15rem 0;
        @include heightByAbsolute(1.45rem,0);
        z-index: 1;
        overflow-x: hidden;
        overflow-y: scroll;
        .history_city_container {
           > li:first-child {
            margin-right: .26rem !important;
           }
            
        }
        .square_item {
          width: 21%;
          height: .58rem;
          border-radius: 3px;
          background-color: #fff;
          .loaction_icon {
            width: .24rem;
            height: .28rem;
            background: url('//m.lvmama.com/flight/image/dingwei_new.png') 0 0 no-repeat;
            background-size: 100% 100%;
            margin-right: .05rem;
          }
        }
        .page_location_name {
          padding-left: 0;
          padding-bottom: .2rem;
        }
        .hot_city_container {
          width:95%;
          padding-left: .2rem;
          .location_city{
            font-family: PingFangSC-Regular;
            font-size: 0.26rem;
          }
          .location_city:nth-child(2){
            color: #FE3C71;
          }
          .square_item {
            margin-right: .26rem;
            margin-bottom: .26rem;
          }
          // .square_item:nth-child(3n+1) {
          //   margin-right: 0;
          // }
          
        }
        .all_city_container{
          background-color: #fff;
          .city_fitstLetter_item {

            .city_fitstLetter_item {
              background-color: #eeeef5;
              padding-left: .2rem;
            }
            
          }
        }
      }
      .anchor-pop{
          @include wh(.9rem,.9rem);
          @include sc(.28rem,#fff);
          @include center();
          line-height: .9rem;
          text-align: center;
          border-radius: 4px;
          z-index: 4;
          background-color: rgba(0,0,0,.5);
      }
      .filter_container {
        width: 100%;
        position: absolute;
        top: 1rem;
        left: 0;
        bottom: 0;
        overflow-x: hidden;
        overflow-y: scroll;
        background: #fff;
        z-index: 11;
        padding-left: .2rem;
        box-sizing: border-box;
      }
      .city_item {
        height: .82rem;
        line-height: .82rem;
        // border-bottom: 1px solid #f1f1f1;
        @include bottomline();
        margin-left: .2rem;
        font-size: .26rem;
      }
    }
</style>

