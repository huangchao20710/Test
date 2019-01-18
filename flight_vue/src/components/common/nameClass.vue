<template>
    <div class="nameClass" @click="close">
        <div>
            <p>乘机人姓名填写须知</p>
            <div>
                <p>
                    <span>1、</span>
                    <span class="span-right-detail">简体中文姓名</span>
                </p>
                <p class="text-indent">包含生僻字，生僻字及生僻字往后的文字请更换为拼音在提交订单。如“巘”为生僻字：</p>
                <p class="text-indent">姓名为“巘张俊”请提交“yan/zhangjun“；</p>
                <p class="text-indent">姓名为“张巘俊”请提交“张yanjun“；</p>
                <p class="text-indent">姓名为“张俊巘”请提交“张俊yan“。</p>
                <p class="text-indent">乘机人姓名中包含“先生，女士，小姐”等名字的请联系客服。</p>
            </div>
            <div>
                <p>
                    <span>2、</span>
                    <span class="span-right-detail">英文姓名</span>
                </p>
                <p class="text-indent">（1）请按照证件上的姓名顺序填写。姓与名中间加”/“，如”Smith/Black“，不区分大小写。</p>
                <p class="text-indent">（2）英文姓名不超过26个字符，如姓名过长请使用缩写，乘客的姓氏不能缩写，名可以缩写。</p>
            </div>
        </div>
    </div>
</template>
<script>
import { lQuery } from '../../plugins/lQuery'
import { mapActions,mapState } from 'vuex'
    export default{
        data(){
            return{
                
            }
        },
         props: [
            
         ],
         methods:{
           close(){
                this.$emit('onNmaeClose',false);
           },
         },
        computed:{
            ...mapState([
              
            ])
        },
        created(){
           
            
        },


    }
</script>
<style lang="scss" scoped>
   @import '../../style/mixin';
   .nameClass{
        @include wh(100%,100%);
        background: #fff;
        position: absolute;
        top: 0;
        left: 0;
        z-index: 100;
        color: #000;
        padding: .3rem;
        >div{
            >p{
                font-size: .36rem;
                position: relative;
                padding-top: 0;
                padding-bottom: .2rem;
                border-bottom: 1px solid #DDD;
            }
            >div{
                font-size: .28rem;
                padding-top: .2rem;
                >p{
                    font-size: .28rem;
                    line-height: .4rem;
                    padding-top: 0;
                    >span{
                        display: inline;
                        vertical-align: top;
                    }
                    >span:first-child{
                        width: .44rem;
                    }
                    .span-right-detail{
                        width: 90%;
                        display: inline-block;
                    }
                } 
                .text-indent{
                    padding-left: .52rem;
                    word-break: break-all;
                }
            }
        }
   }
   
</style>