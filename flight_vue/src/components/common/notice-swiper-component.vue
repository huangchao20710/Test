<template>
	<swiper :options="swiperOption" ref="mySwiper" class="swiper-container-notice">
    <swiper-slide v-for="(item, index) in noticeArr" :key="index">
      <div class="notice_content">
          <div>
            <span class="noticeTag"></span>
            <span class="boticeTitle">{{item.noticeTag}}：{{item.noticeTitle}}</span>
          </div>
          <span class="point_right_arrow_notice"></span>
        </div>
    </swiper-slide>
  </swiper>

</template>

<script>
    import { mapActions,mapState } from 'vuex'
    import '../../style/swiper.min.css'
    import { getNotice } from '../../service/getData'
    import { swiper, swiperSlide } from "vue-awesome-swiper";
  	export default {
      data(){
        return {
          swiperOption: {
            //以下配置不懂的，可以去swiper官网看api，链接http://www.swiper.com.cn/api/
            // notNextTick是一个组件自有属性，如果notNextTick设置为true，组件则不会通过NextTick来实例化swiper，也就意味着你可以在第一时间获取到swiper对象，<br>　　　　　　　　假如你需要刚加载遍使用获取swiper对象来做什么事，那么这个属性一定要是true
            notNextTick: true,
            // swiper configs 所有的配置同swiper官方api配置
            autoplay: 5000,
            autoplayDisableOnInteraction : false,
            direction: "vertical",
            grabCursor: true,
            setWrapperSize: true,
            autoHeight: true,
            paginationClickable: true,
            mousewheelControl: true,
            observeParents: true,
            loop: true,
            // 如果自行设计了插件，那么插件的一些配置相关参数，也应该出现在这个对象中，如下debugger
            debugger: true,
            onClick: (mySwiper) => {
              let a = mySwiper.activeIndex - 1;
              if (a == this.noticeArr.length || a<0) {
                  a = 0;
              }
              if(this.noticeArr[a]!=null && this.noticeArr[a].noticeUrl!=null &&this.noticeArr[a].noticeUrl!=''){
                  location.href=this.noticeArr[a].noticeUrl;
              }else{
                let noticeDetail = {
                  key: 'noticeDetail',
                  val: this.noticeArr[a]
                };
                try {
                  this.initData(noticeDetail);
                } catch (e) {}
                
              }
            },
          }
        }
      },
      props: [
        'noticeArr'
      ],
      methods:{
         ...mapActions([
            'initData',//初始化时间
        ]),
      },
      computed: {
        
      },
      created(){
       

      },
      components: { swiper, swiperSlide },
      mounted() {
      },
      activated() {
      },
      deactivated() {
        this.$parent.noticeArr = [];
      }
  	}

</script>

<style  lang="scss" scoped>
  .swiper-container-notice {
    width: 100%;
    height: inherit;
    background: #FFFBEB;
    padding: 0 .2rem;
    .swiper-wrapper {
      height: inherit;
      .swiper-slide {
        width: 100%;
        height: inherit;
        .notice_content {
          width: 100%;
          height: 100%;
          font-size: .24rem;
          padding-right: .2rem;
          box-sizing: border-box;
          position: relative;
          .point_right_arrow_notice{
            display: inline-block;
            width: 0.12rem;
            height: 0.2rem;
            background: url('//m.lvmama.com/flight/image/notice_arrow.png') no-repeat;
            -webkit-background-size: 100% 100%;
            background-size: 100% 100%;
            position: absolute;
            top: 50%;
            right: 0;
            -webkit-transform: translateY(-50%);
            -moz-transform: translateY(-50%);
            -ms-transform: translateY(-50%);
            -o-transform: translateY(-50%);
            transform: translateY(-50%);
          }
          >div{
            width: 100%;
            position: absolute;
            top: 50%;
            -webkit-transform: translateY(-50%);
            -moz-transform: translateY(-50%);
            -ms-transform: translateY(-50%);
            -o-transform: translateY(-50%);
            transform: translateY(-50%);
          }
          .noticeTag {
            display: inline-block;
            width: .22rem;
            height: .22rem;
            background: url('//m.lvmama.com/flight/image/new_laba.png') no-repeat;
            -webkit-background-size: 100% 100%;
            background-size: 100% 100%;
            margin-right: .1rem;
            vertical-align: middle;
          }
          .boticeTitle{
            font-size: .22rem;
            color: #9E8052;
            width: 90%;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            display: inline-block;
            text-align: left;
            margin-top: 1px;
            vertical-align: text-top;
          }
        }
      }
    }
  }

</style>
