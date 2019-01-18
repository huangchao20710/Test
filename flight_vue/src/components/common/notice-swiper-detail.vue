<template>
	<div class="swiper-container-detail">
    <div class="rulesMask" @click="close"></div>
    <div class="matteDetailValue">
      <div class="title">详情</div>
      <div class="container">
        <p v-html="noticeDetail.noticeContent"></p>
      </div>
      <div class="buttom">
        <span @click="close">确定</span>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapActions,mapState } from 'vuex'
  	export default {
      data(){
        return {
          
        }
      },
      props: [
      ],
      methods:{
         ...mapActions([
            'initData',//初始化时间
        ]),
        close(){
           let noticeDetail = {
              key: 'noticeDetail',
              val: ''
          };
          try{
            this.initData(noticeDetail);
          }catch(e){}
        }
      },
      computed:{
        ...mapState([
          'noticeDetail'
        ])
      },
      created(){
      },
      mounted() {
        
      },
      activated() {

      },


  		
  	}

</script>

<style  lang="scss" scoped>
@import "../../style/mixin";
  .swiper-container-detail {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    z-index: 999;
    font-size: .3rem;
    .rulesMask{
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
}
</style>
