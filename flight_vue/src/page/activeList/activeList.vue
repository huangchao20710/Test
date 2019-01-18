<template>
	<div class="activeList">
		<head-top :depart="title" :rightMenu="submit" @rightHandler="finishPick"></head-top>
		<div class="article">
		<div class="activity-infos">
			<p v-for="actives in activesList">
				<span>{{actives.activityName.split("|").length>1?actives.activityName.split("|")[1]:actives.activityName}}</span>
				<span class="icon" @click="showDetail(actives)"></span>
				<span class="multi_picker" v-bind:class="{'single_picked':actives.picked && isActive==true}" @click="checkActive(actives)"></span>
			</p>
			<p>
				<span>不需要</span>
				<span class="multi_picker" v-bind:class="{'single_picked':activeNo}" @click="checkActive()"></span>
			</p>
		</div>
		</div>

		<div class="matteDetail" @click="activeDetail=''" v-if="activeDetail!=''"></div>
		<div class="matteDetailValue" v-if="activeDetail!=''">
			<div class="title">{{activeDetail.activityName.split("|").length>1?activeDetail.activityName.split("|")[1]:activeDetail.activityName}}</div>
			<div class="container">
				<p v-html="activeDetail.descStr"></p>
			</div>
			<div class="buttom">
				<span @click="activeDetail=''">确定</span>
			</div>
		</div>

		<alert-tip v-if="counpAlert==true" :tipContent="message" :leftButton="leftButton" :rightButton="rightButton" @closeAlert="alertNO" @rightHandler="alertOK" ></alert-tip>
	</div>
</template>

<script>
	import headTop from '../../components/header/head'
	import alertTip from "../../components/common/alertTip";
	import { mapActions,mapState } from 'vuex'
	import { getStore,addZero } from '../../config/mUtils'

	export default{
		data(){
			return{
                title:"促销活动",
                submit:"完成",
                counpAlert:false,//是否展示弹框
                activeNo:false,//是否勾选了促销活动
                activeDetail:'',//活动详情
                activesList:[],//活动
                active:"",
				isActive:false,
				message:'该活动不能与优惠券同时享受，是否继续参与此活动？',
				leftButton:'否',
				rightButton:'是',
			}
		},
		props:[],

		components:{
			headTop,alertTip
		},

		methods:{
			 ...mapActions([
                'initData'
            ]),
			//点击完成
			finishPick() {
				this.activesList[0].click=true;
				console.log(this.activesList);
                let active = {
                    key: 'activeList',
                    val: this.activesList 
                };
				try{
					this.initData(active);
				}catch(e){}
                this.$router.push(`/${this.$parent.baseUrlPath}/orderForm`);
            },
            //是否有选中的促销活动
            isCkeckedActive(){
            	if(this.activesList.length>0){
					let flag=false;
					for(let i=0;i<this.activesList.length;i++){
						if(this.activesList[i].picked==true && getStore("pickedActive")==null){
							flag=true;
							break;
						}
					}
					if(!flag){
						this.activeNo=true;
					}else{
						this.activeNo=false;
					}
				}else{
					this.activeNo=true;
				}
            },
            //展示活动详情
            showDetail(item){
            	this.activeDetail=item;
            },
            //选择活动
            checkActive(item){
            	if(item==null){
            		for(let i=0;i<this.activesList.length;i++){
            			this.activesList[i].picked=false;
            		}
            		this.activeNo=true;
            	}else {
            		if(this.coupon!='' && this.coupon.discountAmount>0 && item.exclusive=="Y"){
    					this.counpAlert=true;
    					this.active=item;
    					return;
    				}
            		// for(let i=0;i<this.activesList.length;i++){
            		// 	if(this.activesList[i].id==item.id){
            		// 		if(this.coupon!='' && this.coupon.discountAmount>0 && item.exclusive=="Y"){
            		// 			this.counpAlert=true;
            		// 			this.active=item;
            		// 			return;
            		// 		}
            		// 	}
            		// }
            		for(let i=0;i<this.activesList.length;i++){
            			this.activesList[i].picked=false;
            		}
            		this.isActive=true;
            		this.activeNo=false;
            		item.picked = true;
            	}
            },
            //弹框是
            alertOK(){
            	for(let i=0;i<this.activesList.length;i++){
        			if(this.activesList[i].id==this.active.id){
						this.activesList[i].picked=true;
						this.isActive=true;
        			}else{
        				this.activesList[i].picked=false;
        			}
        			this.activeNo=false;
        		}
        		this.activesList[0].click=true;
        		let active = {
                    key: 'activeList',
                    val: this.activesList 
                };
				try{
					this.initData(active);
				}catch(e){}
                if(this.coupon!=''){
                	let cps=JSON.parse(JSON.stringify(this.coupon));
    				cps.click=false;
    				let cp = {
			          key: 'coupon',
			          val: cps
			      	};
					try{
					this.initData(cp);
					}catch(e){}
                }
                this.$router.push(`/${this.$parent.baseUrlPath}/orderForm`);
            },
            alertNO(){
            	this.counpAlert=false;
            },
		},

		created(){
			
		},

		activated(){
			this.counpAlert=false;
			this.activeDetail = '';
			this.activesList=JSON.parse(JSON.stringify(this.activeList));;
			this.isCkeckedActive();
			if(getStore("pickedActive")==null){
				this.isActive=true;
			}else{
				this.isActive=false;
			}
		},

		computed:{
			...mapState([
                'activeList',
                'coupon'
            ])
		}
	}
</script>

<style lang="scss" scoped>
	@import '../../style/mixin';
	.activeList{
		.article{
		    height: 100%;
		    -webkit-overflow-scrolling: touch;
		    overflow-scrolling: touch;
		    position: relative;
		    overflow-y: auto;
		    .activity-infos{
		    	padding-left: 0.3rem;
		        margin-top: 0px;
			    background-color: #fff;
				@include sc(0.28rem,#666);
				margin: .2rem;
    			border-radius: .12rem;
			    > p{
		    	    font-size: 0.28rem;
					padding: 0.3rem 0;
					position: relative;
					// border-top: 1px solid #ddd;
					@include topline();
					height: 1rem;
					> span.icon{
						@include wh(.3rem,.3rem);
						@include ct();
						background: url('//m.lvmama.com/flight/image/tanhao.png') center no-repeat;
						background-size: .26rem .26rem;
						margin-left: 0.1rem;
						position: absolute;
					}
					> span:last-child{
						@include ct();
					    right: 0.2rem;
					}
				}
				>p:first-child{
					border: 0;
				}
		    }
		}
		.matteDetail{
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
		.matte{
		    @include wh(100%,100%);
		    background-color: rgba(0, 0, 0, 0.5);
		    position: fixed;
		    top: 0;
		    left: 0;
		    z-index: 8;
		    .price-changing{
		    	@include wh(5.4rem,2.56rem);
			    @include sc(0.28rem,#000);
			    @include center();
			    background-color: #fff;
			    border-radius: 5px;
			    > p{
		    	    height: 1.66rem;
					border-bottom: 1px solid #ddd;
				    text-align: center;
				    line-height: 0.5rem;
				    padding-top: 0.3rem;
				    padding-left: 0.2rem;
				    padding-right: 0.2rem;
			    }
			    > button{
		    	    font-weight: bold;
				    background: none;
				    border: none;
				    text-align: center;
				    line-height: 0.9rem;
				    width: 2.7rem;
				    @include sc(0.32rem,#007aff);
			    }
			    > button:first-of-type{
				    border-right: 1px solid #ddd;
				    position: absolute;
				    bottom: 0;
				    left: 0;
			    }
			    > button:last-child{
			    	width: 2.7rem;
				    position: absolute;
				    bottom: 0;
				    right: 0;
			    }
		    }
		}
	}
</style>