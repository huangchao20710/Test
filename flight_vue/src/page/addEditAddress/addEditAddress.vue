<template>
	<div class="add-passenger-wrap">
		<!-- <head-top :depart="depart" :rightMenu="rightMenu" @rightHandler="finish"></head-top> -->
		<head-top :depart="depart"></head-top>
		<div class="add-passenger">
			<div class="add">
				<p class="message up_flex">
					<span class="label y_flex">
						<span class="msg-type">收件人</span>
						<span class="name">
							<input type="text" placeholder="必填" v-model="personName"><i></i>
						</span>
					</span>
				</p>
				<p class="orderline"></p>
				<p class="message up_flex">
					<span class="label y_flex">
						<span class="msg-type">联系手机</span>
						<span class="name">
							<input type="tel" placeholder="必填" v-model.number="personTel" maxlength="11"><i></i>
						</span>
					</span>
				</p>
				<p class="orderline"></p>
				<p class="message up_flex">
					<span class="label y_flex">
						<span class="msg-type">所在地区</span>
						<span class="name" @click="pickAddress">
							<span class="person-type" v-if="areaResult.province != undefined">{{areaResult.province.name}} {{areaResult.city.name}} {{areaResult.area.name}}</span>
							<span class="placeholderStyle" v-if="areaResult.province == undefined">请选择</span>
						</span>
						<span class="point_right_arrow"></span>
					</span>
				</p>
				<p class="orderline"></p>
				<p class="message up_flex">
					<span class="label y_flex">
						<span class="msg-type">详细地址</span>
						<span class="name">
							<input type="text" placeholder="必填" value="" v-model="addressDetail"><i></i>
						</span>
					</span>
				</p>
				<p class="orderline"></p>
				<p class="message up_flex">
					<span class="label y_flex">
						<span class="msg-type">邮政编码</span>
						<span class="name">
							<input type="text" value="" v-model="postCode"><i></i>
						</span>
					</span>
				</p>
			</div>
		</div>
		<!-- 出生日期 -->
		<area-picker :show="areaStatus" :result="areaResult"></area-picker>
		<alert-tip :tipContent="tipContent" :leftButton="leftButton" v-if="isShowPop"></alert-tip>
		<div class="finish_button" @click="finish">完成</div>
	</div>
</template>

<script>
	import headTop from '../../components/header/head'
	import areaPicker from '../../components/common/area-picker-component'
	import certificateType from '../../components/common/certificate-type-component'
	import alertTip from '../../components/common/alertTip'
	import { typeFormat,isIDcard,ischeckCard,setStore,getStore } from '../../config/mUtils'
	import { addMailAddress,updateMailAddress } from '../../service/getData'
	import { mapActions,mapState } from 'vuex'

	export default{
		data(){
			return {
				depart: '',
				// rightMenu: '完成',
				personName:'',//收件人姓名
				personTel:'',//收件人手机号码
				addressDetail: '',//详细地址
				tipContent:'',
				leftButton:'',
				areaStatus:false,
				areaResult: {},
				chosenAddress: '',//选择的地址
				postCode: '',//邮政编码
				isShowPop: false
			}
		},

		props:[],

		components:{
			headTop,
			areaPicker,
			alertTip
		},

		methods:{
			...mapActions([
				'initData'
			]),
			//三级联动地址选择
			pickAddress() {
				this.areaStatus = true;
			},
			addAddress() {
				addMailAddress(this.userId,this.personTel,this.personName,this.areaResult.province.code,this.areaResult.province.name,this.areaResult.city.code,this.areaResult.city.name,this.addressDetail,this.areaResult.area.code,this.areaResult.area.name,this.postCode).then((res) => {
						if (+res.code === 1) {
							let chosenObj = {
								key: 'chosenMailAddress',
								val: {
						            "address": this.addressDetail,
						            "addressNo": "",
						            "city": this.areaResult.city.name,
						            "cityId": this.areaResult.city.code,
						            "county": this.areaResult.area.name,
						            "countyId": this.areaResult.area.code,
						            "mobileNumber": this.personTel,
						            "postCode": this.postCode,
						            "province": this.areaResult.province.name,
						            "provinceId": this.areaResult.province.code,
						            "recipientName": this.personName,
						            "isChecked": true
						        }
							};
							try{
								this.initData(chosenObj);
							}catch(e){}
							this.$router.push(`/${this.$parent.baseUrlPath}/orderForm`);
						}
				});
			},
			editAddress() {
				this.$parent.showLoading = true;
				updateMailAddress(this.userId,this.editMailAddress.addressNo,this.personTel,this.personName,this.areaResult.province.code,this.areaResult.province.name,this.areaResult.city.code,this.areaResult.city.name,this.addressDetail,this.areaResult.area.code,this.areaResult.area.name,this.postCode).then((res) => {
						this.$parent.showLoading = false;
						if (+res.code === 1) {
							let chosenObj = {
								key: 'chosenMailAddress',
								val: {
						            "address": this.addressDetail,
						            "addressNo": "",
						            "city": this.areaResult.city.name,
						            "cityId": this.areaResult.city.code,
						            "county": this.areaResult.area.name,
						            "countyId": this.areaResult.area.code,
						            "mobileNumber": this.personTel,
						            "postCode": this.postCode,
						            "province": this.areaResult.province.name,
						            "provinceId": this.areaResult.province.code,
						            "recipientName": this.personName,
						            "isChecked": true
						        }
							};
							try{
								this.initData(chosenObj);
							}catch(e){}
							this.$router.push(`/${this.$parent.baseUrlPath}/orderForm`);
						} else {
							this.showAlert(res.message);
						}
				});
			},
			showAlert(content) {
				this.tipContent = content;
				this.isShowPop = true;
				setTimeout(() => {
					this.isShowPop = false;
				},2000);
			},
			//完成选择
			finish() {
				let telReg = /^\d{11}$/;
				if (this.personName != '') {
					this.personName = this.personName.replace(/\s/g,'');
				}
				if (this.personTel != '') {
					this.personTel = String(this.personTel).replace(/\s/g,'');
				}
				if (this.addressDetail != '') {
					this.addressDetail = this.addressDetail.replace(/\s/g,'');
				}
				if (this.personName == '' || this.personName.length > 26 || this.personName.length < 2) {
					this.showAlert('请填写正确的姓名');
					return;
				}
				if(this.areaResult.province == null || this.areaResult.province == ""){
					this.showAlert('请选择所在地区');
					return;
				}
				if (!telReg.test(this.personTel)) {
					this.showAlert('请填写正确的手机号码');
					return;
				}
				if (this.addressDetail == '') {
					this.showAlert('请填写正确的详细地址');
					return;
				}
				if (this.$route.params.operateType === 'add') {
					this.addAddress();
				} else {
					this.editAddress();
				}
			}
		},

		created(){

		},

		activated(){
			if (this.$route.params.operateType === 'add') {
				this.depart = '添加邮寄地址';
				this.personName = '';
				this.personTel = '';
				this.postCode = '';
				this.addressDetail = '';
				this.areaResult = {};
			} else {
				this.depart = '编辑邮寄地址';
				this.personName = this.editMailAddress.recipientName;
				this.personTel = this.editMailAddress.mobileNumber;
				this.postCode = this.editMailAddress.postCode;
				this.addressDetail = this.editMailAddress.address;
				this.areaResult = {
					province: {
						name: this.editMailAddress.province,
						code: this.editMailAddress.provinceId
					},
					city: {
						name: this.editMailAddress.city,
						code: this.editMailAddress.cityId
					},
					area: {
						name: this.editMailAddress.county,
						code: this.editMailAddress.countyId
					}
				};
			}
		},
		mounted(){

		},

		computed: mapState({
			commonPersonMes: state => state.commonPersonMes,
			editPersonMes: state => state.editPersonMes,
			editMailAddress: state => state.editMailAddress,
			userId: state => state.userId,
		}),
		watch: {
			
		}
	}
</script>

<style lang="scss" scoped>
	@import '../../style/mixin';
	.add-passenger-wrap{
		position: relative;
	    @include wh(100%,100%);
		.add-passenger{
			background: #fff;
    		margin-top: 0.2rem;
			.add{
				padding:0 0.2rem;
				.orderline{
					@include orderline();
				}
				.message{
					width: 100%;
					padding: 0.2rem 0;
					box-sizing: border-box;
					span {
						display: inline-block;
					}
					.label{
						@include sc(0.28rem,#000);
	    				width: 100%;
						.msg-type{
							@include sc(0.28rem,#666666);
							width: 21%;
	    				}
	    				.name{
	    					width: 70%;
    						input{
    							@include wh(100%,0.5rem);
    							line-height: 0.5rem;
    						}
    						.person-type{
    							@include wh(100%,0.5rem);
    							display: inline-block;
    							line-height: 0.5rem;
    						}
    					}
					}
    				.type-value{
    					margin-left: 2.1rem;
    					.errorMsg{
    						@include sc(0.28rem,#ff5f42);
    					}
    				}
				}
			}
		}
		.finish_button{
			@include wh(7.1rem,0.88rem);
			@include sc(0.36rem,#ffffff);
			line-height: 0.88rem;
			text-align: center;
			position: absolute;
			bottom:0.4rem;
			left:50%;
			transform: translateX(-50%);
			background-image: linear-gradient(90deg, #FE686C 0%, #FD3C71 100%);
			border-radius: 100px;
		}
	}
</style>