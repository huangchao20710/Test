<template>
  <div class="bus_detail_container">
  	<head-top path="/orderForm" :depart="depart"></head-top>
    <div class="bus_detail_scroll_container">
      <div class="bus_infos_container common_style">
        <p class="specialFont">起点站：{{airportBusDetail.startingStation}}</p>
        <p class="specialFont">终点站：{{airportBusDetail.terminalStation}}</p>
        <p>线路：{{airportBusDetail.routeName}}</p>
        <p>票价：{{airportBusDetail.priceInfo}}</p>
        <p v-if="airportBusDetail.serviceTimeInfo.indexOf('0.') == -1">运营时间：{{airportBusDetail.serviceTimeInfo}}</p>
        <p>间隔时间：{{airportBusDetail.intervalInfo}}</p>
      </div>
      <div class="bus_route_container common_style">
        <div class="bus_station_name y_flex">
          <div class="location_icon"></div>
          <div>停靠站点</div>
        </div>
        <ul class="routes_container">
          <li class="route_item y_flex" v-for="item in airportBusDetail.busStations">
            <span></span>
            <span>{{item}}</span>
            <span></span>
          </li>
        </ul>
      </div>
      <div class="tip">*温馨提示：内容仅供参考，请以实际运营情况为准</div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex' 
import headTop from '../../components/header/head'
export default {
    data(){
      return {
        depart: '机场大巴详情'
      }
    },
    props: [],
    computed: {
      ...mapState([
        'airportBusDetail'
      ])
    },
    components: {
      headTop,
    },

    created(){

    },
    methods: {
     
      
    },
    mounted() {
      
    }
}
</script>

<style lang="scss" scoped>
    @import '../../style/mixin';
    .bus_detail_container {
      @include wh(100%,100%);
      .bus_detail_scroll_container {
        width: 100%;
        @include heightByAbsolute(.9rem,0);
        padding: 0 0.2rem;
        overflow-y: scroll;
        background-color: #eeeef5;
        .common_style {
            width: 100%;
            padding: 0 .2rem .22rem;
            box-sizing: border-box;
            background: #fff;
            margin-top: .2rem;
            border-radius: 0.1rem;
            box-shadow: 0 2px 6px 0 rgba(0,0,0,0.05);
        }
        .bus_infos_container {
          width: 100%;
          padding-top: .3rem;
          padding-bottom: .2rem;
          padding-right: .3rem;
          line-height: 0.46rem;
          font-size:0.24rem;
          p{
            color: #666666;
          }         
          .specialFont {
            @include sc(.28rem,#333);
          }
        }
        .bus_route_container {
          width: 100%;
          .bus_station_name {
            @include wh(100%,.66rem);
            border-bottom: 1px solid #E4E4E4;
            .location_icon {
              @include wh(.24rem,.28rem);
              background: url('//m.lvmama.com/flight/image/dingwei.png') no-repeat;
              background-size: 100% 100%;
              margin-right: .2rem;
            }
            > div:last-child {
              @include sc(.24rem,#666);
            }
          }
          .routes_container {
            .route_item {
              width: 95%;
              min-height: .7rem;
              margin-left: 5%;
              padding: 0 .05rem ;
              box-sizing: border-box;
              > span:first-child {
                @include wh(.12rem,.7rem);
                display: block;
                background: url('//m.lvmama.com/flight/image/locationPass.png') 0 -.55rem no-repeat;
                background-size: .12rem 1.9rem;
                margin-right: .3rem;
                margin-left: -.2rem;
              }
            }
            .route_item:first-child {
              > span:first-child {
                background: url('//m.lvmama.com/flight/image/locationStart.png') 0 .3rem no-repeat;
                background-size: .12rem 1.9rem;
              }
            }
            .route_item:last-child {
              border-bottom: none;
              > span:first-child {
                background: url('//m.lvmama.com/flight/image/locationEnd.png') 0 -1.47rem no-repeat;
                background-size: .12rem 1.9rem;
              }
            }
          }
        }
        .tip {
          @include sc(.22rem,#999999);
          padding: .15rem .3rem;
        }
      }
    }
    
</style>
