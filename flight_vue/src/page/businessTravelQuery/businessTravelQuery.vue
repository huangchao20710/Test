<template>
	<div class="businessTravelQuery">
		 <head-top :depart="title" :goPage="goPage"></head-top>
		 <div class="businessTravelQueryContainer">
		    <div></div>
		    <div>此入口为机票差旅查询入口，需要登录驴妈妈账号并通过对应的公司员工号验证身份信息。</div>
		    <div class="flex-xy" @click="jumpToIndex()">
		    	<p>走错了，前往非差旅入口</p>
		    </div>
		    <div class="flex-xy" @click="jumpToBusinessTravelInfo()">
		    	<p v-if="shouldLogin">我是差旅用户，登录并验证身份信息</p>
		    	<p v-if="!shouldLogin">我是差旅用户，现在去验证身份信息</p>
		    </div>
		    <div class="businessphone">企业差旅业务,请联系:<a href="tel:400-1161-808">400-1161-808</a></div>
		</div>
		<alert-tip v-if="showMessage" :tipContent="message" :leftButton="leftButton"  @closeAlert="showMessage=false" ></alert-tip>
	</div>
</template>

<script>
	import headTop from '../../components/header/head'
	import { mapActions,mapState } from 'vuex'
	import { getStore,addZero,removeStore,isClient,getLvSessionId,jumpLogin } from '../../config/mUtils'
	import { getValidateAccount,getLvUser,getLvUserByCookie } from '../../service/getData'

	export default{
		data(){
			return{
                title:"机票企业差旅",
                goPage:"businessTravelQuery",
                shouldLogin:false,
                showMessage:false,
                leftButton:'',
                rightButton:'',
                message:'',
				userid:"",
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
			jumpToIndex(){
				this.$router.push(`/${this.$parent.baseUrlPath}/home`);
			},
			jumpToBusinessTravelInfo(){
				if(this.shouldLogin == true){
					jumpLogin();
				}else{
					this.validateAccount();
				}
			},
			validateAccount(type){
				this.$parent.showLoading = true;
				getValidateAccount(this.userid).then((data) => {
					this.$parent.showLoading = false;
					if (data.code == '1') {
						if(type!="back"){
							this.$router.push(`/${this.$parent.baseUrlPath}/businessTravelold`);
						}
                    }else if(data.code == '-3'){
                    	this.alertMe("您的账户暂时无法正常使用，请与贵公司相关负责人进行确认");
                    }else if(data.code == '-2'){
                    	this.alertMe(data.message);
                    }else{
                    	let businessTravelUser = {
                                key: 'businessTravelUser',
                                val: ''
							};
						try{
							this.initData(businessTravelUser);
						}catch(e){}
                        
						removeStore("businessTravelUser",this);
                        this.$router.push(`/${this.$parent.baseUrlPath}/businessTravelAdd`);
                    }
				},()=>{
					this.$parent.showLoading = false;
				})
			},
			alertMe(val){
				this.message=val;
            	this.showMessage=true;
            	this.leftButton="知道了";
			},
			
		},

		created(){
			
		},

		activated(){
			this.userid="";
			this.showMessage=false;
			if(isClient() == 1){
	            //app登录
	            getLvSessionId().then((data) => {
					this.$parent.showLoading = true;
	                getLvUser(data).then((res) => {
						this.$parent.showLoading = false;
                       if(res.code == 1 && res.data.userId!=''&&res.data.userId!=null){
							this.userid = res.data.userId;
							if(location.href.indexOf("?type=back")!=-1){
								this.validateAccount("back");
							}else{
								this.validateAccount();
							}
                       }else{
                       	 this.shouldLogin = true;
                       }
	                },()=>{
						this.$parent.showLoading = false;
					});
	            })
	        }else{
				//wap登录
				this.$parent.showLoading = true;
	           getLvUserByCookie().then((res) => {
				    this.$parent.showLoading = false;
                    if(res.code == 1 && res.data.userId!=''&&res.data.userId!=null){
                        this.userid = res.data.userId;
                       if(location.href.indexOf("?type=back")!=-1){
							this.validateAccount("back");
						}else{
							this.validateAccount();
						}
                   }else{
                   		this.shouldLogin = true;
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
	.businessTravelQuery{
		position: relative;
	    @include wh(100%,100%);
	    .businessTravelQueryContainer{
    	    width: 100%;
		    position: absolute;
		    top: .94rem;
		    left: 0;
		    bottom: 0;
		    background-color: #fff;
		    border-top: 1px solid #aaa;
		    .fff{
		    	color:#fff;
		    }
		    > div:first-child{
	    	    width: 3.5rem;
			    height: 3.5rem;
			    margin: 0 auto;
			    margin-top: .8rem;
			    background: url('//m.lvmama.com/flight/image/shanglv.png') 0 0 no-repeat;
			    background-size: 100%;
		    }
		    > div:nth-child(2){
			    width: 5.54rem;
			    margin: 0 auto;
			    margin-top: .5rem;
			    margin-bottom: .4rem;
			    text-align: center;
			    color: #000;
			    font-size: .24rem;
			}
			> div:nth-child(3),> div:nth-child(4){
			    width: 6.9rem;
			    height: .9rem;
			    margin: 0 auto;
			    border: 1px solid #fe3c71;
			    border-radius: .1rem;
			    margin-bottom: .4rem;
			    font-size: .3rem;
			    line-height: .9rem;
    			text-align: center;
			}
			> div:nth-child(3){
				>p{
					color:#fff;
				}
			}
			> div:nth-child(3) {
			    background: #fe3c71;
			    color: #fff;
			}
			 > div:nth-child(4) {
			    color: #fe3c71;
			}
	    }
	    .businessphone{
		    height: 1rem;
		    width: 100%;
		    text-align: center;
		    color: #000;
		    line-height: 1rem;
		    position: absolute;
		    >a{
		    	color: blue;
		    	text-decoration: underline;
		    }
		}
	}
</style>