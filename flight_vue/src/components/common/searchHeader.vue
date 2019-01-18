<template>
  	<div class="search_header_container y_flex">
      <div class="search_box y_flex">
        <div class="search_back_container xy_flex" @click="goBack">
          <div class="back" ></div>
        </div> 
        <div class="search_wrap y_flex" :class="{'search_wrap_focus': isFocus}">
          <div class="search_icon"></div>
          <input :class="{'search_wrap_focus_input':isFocus}" :placeholder="placeholderContent" v-model="inputContent" @focus="getFocus" @blur="getBlur"/>
          <div class="cancel_icon_container xy_flex" v-show="isFocus && inputContent != ''" @click="deleInputContent">
            <span class="cancel_cion_wrap"></span>
          </div>
        </div>
        <div class="cancel_word" v-show="isFocus" @click="calcelInput">取消</div>
      </div>
    </div>
</template>

<script>
import { mapActions } from 'vuex' 

export default {
    props: {
      'placeholderContent': {
        type: String,
        default: '请输入（如：上海/shanghai/sh/sha）'
      }
    },
  	components: {
      
  	},
    data(){
      return {
        inputContent: '',
        isFocus: false
      }
    },

    created(){

    },
    methods: {
     
      goBack(){
        this.$router.go(-1);
      },
      getFocus() {
        this.isFocus = true;
      },
      getBlur() {
        let that = this;
        setTimeout(function(){
           that.isFocus = false;
        },50);
        
      },
      deleInputContent() {
        this.inputContent = '';
        this.isFocus = true;
      },
      calcelInput() {
        this.inputContent = '';
        this.isFocus = false;
      }
    },
    deactivated() {
      this.inputContent = '';
    },
    watch: {
      inputContent() {
        this.$emit('get-input', this.inputContent);
      },
      isFocus() {
        this.$emit('get-input-state',this.isFocus);
      }
    }

}
</script>

<style lang="scss" scoped>
    @import '../../style/mixin';
    .search_header_container {
      width: 100%;
      height: 1rem;
      box-sizing: border-box;
      position: absolute;
      top: 0;
      left: 0;
      background: #fff;
      border-bottom: 1px solid #ddd;
      z-index: 11;
      box-shadow: 0 0 3px 1px rgba(0,0,0,0.10);
      .back {
        @include wh(0.2rem,0.38rem);
        background: url('//m.lvmama.com/flight/image/arrow.png') no-repeat;
        background-size: 100%;
      }
      .search_box {
        width: 100%;
        height: 100%;
        .search_back_container {
          @include wh(9.3%,inherit);
        }
        .search_wrap {
          width: 88%;
          height: .5rem;
          border-radius: .5rem;
          position: relative;
          background: #EEEEF5;
          overflow: hidden;
          .search_icon {
            width: .326rem;
            height: .326rem;
            background: url('//m.lvmama.com/flight/image/magnifire.png') 0 0 no-repeat;
            background-size: .326rem;
            margin: 0 0.05rem 0 .15rem;
          }
          .cancel_icon_container {
            @include wh(.6rem,inherit);
            position: absolute;
            top: 0;
            right: 0;
            .cancel_cion_wrap {
              @include wh(.28rem,.28rem);
              display: block;
              background: url('//m.lvmama.com/flight/image/cancle.png') 0 0 no-repeat;
              background-size: 100%;
            }
          }
          input {
            width: 100%;
            display: block;
            background: #EEEEF5;
            @include sc(.24rem,#333);
          }
          .search_wrap_focus_input {
            width: 80%;
          }
        }
        .search_wrap_focus {
          width: 78%;
        }
        .cancel_word {
          margin-left: .2rem;
          font-size: .24rem;
        }
      }
    }
</style>
