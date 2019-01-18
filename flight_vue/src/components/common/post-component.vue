<template>
    <div class="post">
        <div class="header">
            <span class="back" @click="back"></span>
            报销凭证
        </div>
        <div class="post-wrapper" v-if="address!=null">
            <div class="post-content">
                <div class="post-shipping">
                    <p class="shipping">
                        <span class="shipping-title">配送方式</span>
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
                        <span class="shipping-title">邮寄地址</span>
                        <span class="shipping-address" v-if="address.address">{{address.address}}</span>
                    </p>
                </div>

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
                invoice:"",
                address:null,
            }
        },
         props: [
            
         ],
         methods:{
            ...mapActions([
                'initData',//初始化时间
            ]),
           back(){
                this.$parent.showPost=false;
            }
         },
       
        computed:{
            ...mapState([
                'postAddress',
            ])
        },
        created(){ 
            if(this.postAddress!=null){
                if(this.postAddress.flightOrderInvoiceDtoList.length>0){
                   this.invoice="";
                   this.address=JSON.parse(JSON.stringify(this.postAddress));
                    for(let i=0;i<this.address.flightOrderInvoiceDtoList.length;i++){
                        if(this.address.flightOrderInvoiceDtoList[i].invoiceType=="VALUE_ADD_TAX_INVOICE"){
                            this.address.invoice=this.address.flightOrderInvoiceDtoList[i];
                        }
                        if(this.address.flightOrderInvoiceDtoList[i].invoiceType=="TRAVEL_INVOICE"){
                            this.invoice=this.invoice==""?"行程单":this.invoice+"+行程单";
                        }else if(this.address.flightOrderInvoiceDtoList[i].invoiceType=="VALUE_ADD_TAX_INVOICE"){
                            this.invoice=this.invoice==""?"差额发票":this.invoice+"+差额发票";
                        }else if(this.address.flightOrderInvoiceDtoList[i].invoiceType=="QUOTA_INVOICE"){
                            this.invoice=this.invoice==""?"保险定额发票":this.invoice+"+保险定额发票";
                        }
                    }
               }
            }
        },
        activated(){
        },


    }
</script>
<style lang="scss" scoped>
   @import '../../style/mixin';
   .post{
        @include wh(100%,100%);
        background-color: #f1f1f1;
        position: absolute;
        top: 0;
        left: 0;
        z-index: 1000;
        padding-bottom: 0.98rem;
        .header{
            @include wh(100%,.94rem);
            @include sc(.38rem,#000);
            line-height: .74rem;
            text-align: center;
            position: absolute;
            top: 0;
            left: 0;
            z-index: 5;
            padding: .1rem 0;
            background-color: #f8f8f8;
            .back {
                left: 0;
                top: 0;
                background: url('//m.lvmama.com/flight/image/arrow.png') .3rem .28rem no-repeat;
                background-size: .2rem .38rem;
                z-index: 2;
                @include wh(1.6rem,.94rem);
                position: absolute;
            }
        }
        .post-wrapper{
            padding: 0 .2rem;
            margin-top: 1.1rem;
            .post-content{
                background-color: #fff;
                padding: 0 0 0 .2rem;
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
                        }
                        .shipping-placehold{
                            color:#000;
                        }
                    }   
                }
                .orderline{
                    @include orderline();
                }
            }
        }
        
   }
   
</style>