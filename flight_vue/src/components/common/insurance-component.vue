<template>
    <div class="insuranceDetail">
        <div class="header">
            <span class="back" @click="back"></span>
            保险
        </div>
        <div class="insurance-wrapper" v-if="insurances!=''">
            <div class="insur-traffic-con" v-for="insurance in insurances" v-if="insurance.persons.length>0">
                <p class="insur-content">
                    <span class="insur-icon"></span>
                    <span>{{insurance.insuranceName}}</span>
                    <span class="insur-amount">{{insurance.persons.length}}份</span>
                </p>
                <div class="orderline"></div>
                <p class="insur-content">
                    <span v-for="(person,index) in insurance.persons">{{person}}<em v-if="index!=insurance.persons.length-1">、</em></span>
                </p>
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
                insurances:"",
            }
        },
         props: [
            
         ],
         methods:{
            ...mapActions([
                'initData',//初始化时间
            ]),
           back(){
                this.$parent.showInsurance=false;
            }
         },
       
        computed:{
            ...mapState([
                'insurancesDetail',
            ])
        },
        created(){
            this.insurances=JSON.parse(JSON.stringify(this.insurancesDetail));
        },
        activated(){
        },


    }
</script>
<style lang="scss" scoped>
   @import '../../style/mixin';
   .insuranceDetail{
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
        .insurance-wrapper{
            padding: 0 0.2rem;
            margin-top: 1.1rem;
            .insur-traffic-con{
                @include sc(.3rem,#000);
                background-color: #fff;
                margin-bottom: 0.2rem;
                padding-left: 0.2rem;
                border-radius: 0.1rem;
                .insur-content{
                    height: 0.8rem;
                    line-height: 0.8rem;
                    position: relative;
                    .insur-icon{
                        @include wh(.35rem,.4rem);
                        display: inline-block;
                        background: url('//m.lvmama.com/flight/image/insurance-icon.png') no-repeat;
                        background-size: 100%;
                        -webkit-background-size: 100%;
                        position: relative;
                        top: 0.1rem;
                        margin-right: 0.1rem;
                    }
                    .insur-amount{
                        @include sc(.3rem,#666);
                        position: absolute;
                        right: 0.2rem;
                    }
                }
                .orderline{
                    @include orderline();
                }
            }
        }
    }
   
</style>