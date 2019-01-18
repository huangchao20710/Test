<template>
    <div class="backtochange">
        <div class="destine-time">
            <i class="voyage" :class="{'voyageform':flightDetail.flightTripType=='去程','voyagedesc':flightDetail.flightTripType=='回程'}"></i>
            <span>{{flightDetail.depTime|strDate}} {{new Date(flightDetail.depTime.replace(/-/g, "/")).getDay()|weekFilter}}  {{flightDetail.depTime|strTime}}</span>
        </div>
        <div class="destine-info">
            <span>{{flightDetail.depName}}{{flightDetail.departureTerminalCode}}</span>
            <i></i>
            <p>{{flightDetail.arrName}}{{flightDetail.arrivalTerminalCode}} <em>{{flightDetail.seatClassName}}</em></p>
        </div>
    </div>
</template>

<script>
  	export default {
      data(){
        return {

        }
      },
      props: [
        'flightDetail'
      ],
      methods:{
       
      },
      computed: {
        
      },
      created(){
        
      },
      components: { },
      mounted() {
      },
      activated() {
      },
      deactivated() {
       
      }
  	}

</script>

<style  lang="scss" scoped>
@import '../../style/mixin';
    .backtochange{
        position: relative;
        @include wh(100%,1.44rem);
        background-color: #fff;
        padding: .3rem;
        @include topline;
        .destine-time{
            position: relative;
            text-align: left;
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
            >span{
                @include sc(.26rem,#666);
                margin-left: .6rem;
            }
        }
        .destine-info{
            position: relative;
            margin-top: .1rem;
            >span{
                font-size: .3rem;
            }
            >i{
                @include wh(1.314rem,0.2rem);
                @include ct;
                background: url('//m.lvmama.com/flight/image/newjiantou.png') no-repeat;
                background-size: 100%;
                margin: .05rem .1rem 0;
            }
            >p{
                display: inline-block;
                margin-left: 1.6rem;
                font-size: .3rem;
                >em{
                    @include sc(.26rem,#3F3F3F);
                }
            }
            
        }
    }

</style>
