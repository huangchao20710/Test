<template>
	<div class="businessTravelMy">
		 <head-top :depart="title" :goPage="goPage" @rightHandler="toHelper"></head-top>
		 <div class="myName">
		 	<div class="portrait"></div>
		 	<div class="information">
		 		<p class="name">{{company.staffName}}</p>
		 		<p class="company">{{company.companyName}}</p>
		 	</div>
		 </div>
		 <ul>
		 	<li>
		 		<span class="title">联系电话</span>
		 		<span class="content" v-if="company.staffTel!=null && company.staffTel!=''">{{company.staffTel | mobileFormat}}</span>
		 		<!-- <span class="content perfect" v-if="company.staffTel==null || company.staffTel==''">去完善</span> -->
		 		<div class="orderline"></div>
		 	</li>
		 	<li v-if="company.employeeNo!=null && company.employeeNo!=''">
		 		<span class="title">员工号</span>
		 		<span class="content" >{{company.employeeNo}}</span>
		 		<div class="orderline"></div>
		 	</li>
		 	<li v-if="company.employeeNo==null || company.employeeNo==''" @click="toAdd">
		 		<span class="title">员工号</span>
		 		<span class="content perfect" >去完善</span>
		 		<i class="perfectIcon"></i>
		 		<div class="orderline"></div>
		 	</li>
		 	<li v-if="company.department!=null && company.department!=''">
		 		<span class="title">部门</span>
		 		<span class="content" >{{company.department}}</span>
		 		<div class="orderline"></div>
		 	</li>
		 	<li v-if="company.department==null || company.department==''" @click="toAdd">
		 		<span class="title">部门</span>
		 		<span class="content perfect" >去完善</span>
		 		<i class="perfectIcon"></i>
		 		<div class="orderline"></div>
		 	</li>
		 	<li v-if="company.position!=null && company.position!=''">
		 		<span class="title">职务</span>
		 		<span class="content" >{{company.position}}</span>
		 	</li>
		 	<li v-if="company.position==null || company.position==''" @click="toAdd">
		 		<span class="title">职务</span>
		 		<span class="content perfect" >去完善</span>
		 		<i class="perfectIcon"></i>
		 	</li>
		 </ul>
		 <div class="trick">如需修改已绑定信息，请联系公司负责人</div>
	</div>
</template>

<script>
	import headTop from '../../components/header/head'
	import { mapActions,mapState } from 'vuex'
	import { getStore,addZero,isClient,getLvSessionId,jumpLogin } from '../../config/mUtils'
	import { getValidateAccount,getLvUser,getLvUserByCookie } from '../../service/getData'

	export default{
		data(){
			return{
                title:"驴妈妈企业账户",
                goPage:"businessTravelMy",
                company:{},
			}
		},
		props:[],

		components:{
			headTop
		},

		methods:{
			 ...mapActions([
                'initData'
            ]),
			setBusinessTravelUser(businessTravel){
				let businessTravelUser = {
	                    key: 'businessTravelUser',
	                    val: ''
	                };
				if(businessTravel!=''&&businessTravel!=null){
					businessTravelUser.val=businessTravel;
				}
				try{
					this.initData(businessTravelUser);
				}catch(e){}
			},
			toAdd(){
				this.$router.push(`/${this.$parent.baseUrlPath}/businessTravelAdd`);
			},
			validateAccount(customerId){
				this.$parent.showLoading = true;
				getValidateAccount(customerId).then((data) => {
					this.$parent.showLoading = false;
					if (data.code == '1') {
						this.company=data.data;
						this.setBusinessTravelUser(this.company);
                        console.log(data);
                    }else{
                    	this.setBusinessTravelUser('');
                    }
				},()=>{
					this.$parent.showLoading = false;
					this.setBusinessTravelUser('');
				})
			},
			//跳转至差旅助手
			toHelper(){
				this.$router.push(`/${this.$parent.baseUrlPath}/businessTravelHelper/service`);
			},
			
		},

		created(){
			
		},

		activated(){
			let userid="";
			this.company={};
			this.setBusinessTravelUser('');
			if(isClient() == 1){
	            //app登录
	            getLvSessionId().then((data) => {
					if(data==null || data=="" || data==undefined){
                        jumpLogin();
                        return;
                    }
					this.$parent.showLoading = true;
	                getLvUser(data).then((res) => {
						this.$parent.showLoading = false;
                       if(res.code == 1 && res.data.userId!=''&&res.data.userId!=null){
                            userid = res.data.userId;
                            this.validateAccount(userid);
                       }else{
                       	 jumpLogin();
                       }
	                },()=>{
						this.$parent.showLoading = false;
					});
	            })
	        }else{
	            this.app=false;
				//wap登录
				this.$parent.showLoading = true;
	           getLvUserByCookie().then((res) => {
				   this.$parent.showLoading = false;
                    if(res.code == 1 && res.data.userId!=''&&res.data.userId!=null){
                        userid = res.data.userId;
                        this.validateAccount(userid);
                   }else{
                   		jumpLogin();
                   }
	           },()=>{
				   this.$parent.showLoading = false;
			   }) 
	        }
			
		},

		computed:{
			...mapState([
                
            ])
		}
	}
</script>

<style lang="scss" scoped>
	@import '../../style/mixin';
	.businessTravelMy{
		position: relative;
	    @include wh(100%,100%);
	    .myName{
	    	@include wh(100%,1.5rem);
		    background-color: #fff;
		    margin: .2rem 0;
		    position:relative;
		    .portrait{
		    	@include ct();
		    	@include wh(1.1rem,1.1rem);
			    margin: 0 .3rem;
			    background: url('//m.lvmama.com/flight/image/businessTravel_portrait.png') no-repeat;
			    background-size: 100%;
		    }
		    .information{
		    	@include ct();
		    	left: 20%;
				.name{
					@include sc(.28rem,#000);
    				margin-bottom: .1rem;
				}
				.company{
					@include sc(.24rem,#000);
				}
		    }
	    }
	    ul{
		    background-color: #fff;
		    width: 100%;
		    >li{
		    	height: .8rem;
    			line-height: .8rem;
    			position: relative;
    			>span{
    				@include sc(.28rem,#000);
    			}
    			.title{
				    margin-left: .3rem;
    			}
    			.content{
					right: .3rem;
    				position: absolute;
    			}
    			.content.perfect{
    				right:.5rem;
    				@include sc(.24rem,#aaa);
    			}
    			.perfectIcon{
    				@include wh(.14rem,.25rem);
    				display: inline-block;
				    background: url('//m.lvmama.com/flight/image/pointer.png') 0 0 no-repeat;
				    background-size: 100%;
				    margin-left: .1rem;
				    position: absolute;
				    right: .3rem;
				    top: 50%;
				    margin-top: .03rem;
				    transform: translateY(-50%);
    			}
    			// .content.perfect:after{
				   //  content: "";
				   //  @include wh(.16rem,.16rem);
				   //  position: absolute;
				   //  top: 50%;
				   //  transform: translateY(-50%) rotate(-45deg);
				   //  border-right: 1px solid #aaa;
				   //  border-bottom: 1px solid #aaa;
				   //  // right: .2rem;
    			// }
    			.orderline{
				    left: .3rem;
					position: absolute;
					@include orderline();
    			}
		    }
	    }
	    .trick{
	    	@include sc(.24rem,#aaa);
	    	text-align: center;
    	    margin-top: .2rem;
	    }
	}
</style>