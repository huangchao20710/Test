<template>
	<div class="choose-passengers-wrap">
		<!-- <head-top :depart="depart" :rightMenu="rightMenu" @rightHandler="goOrderForm"></head-top> -->
		<head-top :depart="depart"></head-top>
		<div class="choose-passengers">
			<div class="add-passenger y_flex" @click="addMailAddress">
				<p class="add">
					<span class="add-icon"></span>
					<span class="official">新增邮寄地址</span>
				</p>
				<!-- <p class="point_right_arrow"></p> -->
			</div>
			<div class="select-passenger" v-if="addressList.length > 0">
				<selected-list :messageListInfo="addressList" :kind="kind"></selected-list>
			</div>
		</div>
		<div v-if="addressList.length == 0" class="info-empty">
			<i></i>
            <span>亲，您还没有邮寄地址信息，<br>请点击上方的“添加邮寄地址”进行添加吧~</span>
        </div>
		<div class="finish_passer" v-if="addressList.length > 0" @click="goOrderForm">完成</div>
	</div>
</template>

<script>
	import { mapActions,mapState } from 'vuex'
	import { getCommonPersonMes } from '../../service/getData'
	import headTop from '../../components/header/head'
	import selectedList from '../../components/common/selected-list-component'

	export default{
		data(){
			return {
				passengersInfo:[],
				depart:'选择邮寄地址',
				// rightMenu:'完成',
				kind: 'address'
			}
		},

		components:{
			headTop,
			selectedList
		},

		props:[],

		created(){
			
		},

		methods:{
			...mapActions([
				'initData'
			]),
			addMailAddress() {
				this.$router.push(`/${this.$parent.baseUrlPath}/addEditAddress/add`);
			},
			//完成按钮
			goOrderForm() {
				let list = this.addressList;
				let chosenIndex = -1;
				for (let i = 0; i < list.length; i++) {
					if (list[i].isChecked) {
						chosenIndex = i;
					}
				};
				let chosenObj = {
					key: 'chosenMailAddress',
					val: ''
				};
				let allObj = {
					key: 'allMailAddress',
					val: list
				};
				if (chosenIndex != -1) {
					chosenObj.val = list[chosenIndex];
				} else {
					chosenObj.val = '';
				}
				try{
					this.initData(chosenObj);
				}catch(e){}
				try{
					this.initData(allObj);
				}catch(e){}
				this.$router.push(`/${this.$parent.baseUrlPath}/orderForm`);
			}
		},

		mounted(){
			
		},
		activated(){
			
		},

		computed: mapState({
			addressList: state => state.allMailAddress
		})
	}
</script>

<style lang="scss" scoped>
	@import '../../style/mixin';
	.choose-passengers-wrap{
		position: relative;
	    @include wh(100%,100%);
		.orderline{
			@include orderline();
		}
		.choose-passengers{
			@include heightByAbsolute(0.9rem,1.4rem);
			margin-top: 0.2rem;
		    overflow: hidden;
		    overflow-y: scroll;
			.add-passenger{
				background: #fff;
			    height: 0.86rem;
			    line-height: 0.86rem;
			    padding-right: 0.2rem;
				.add{
					padding-left: 0.18rem;
					margin: 0 auto;
					.add-icon{
						@include wh(0.3rem,0.34rem);
						background: url('//m.lvmama.com/flight/image/addPera.png') no-repeat;
					    background-size: contain;
					    display: inline-block;
						vertical-align: middle;
						margin-right: -0.06rem;
					}
					.official{
						@include sc(0.28rem,#666666);
						padding-left: 0.1rem;
					}
				}
			}
			.select-passenger{
				background: #fff;
    			padding: 0 .2rem;
    			margin-top: 0.2rem;
				.selected{
					@include sc(0.24rem,#666);
					height: 0.64rem;
				    line-height: 0.64rem;
				}
			}
		}
		.finish_passer{
			@include cl;
			bottom: 0.2rem;
			width: 7.1rem;
			height: 0.88rem;
			line-height: 0.88rem;
			text-align: center;
			@include sc(0.36rem,#fff);
			background-image: linear-gradient(90deg, #FE686C 0%, #FD3C71 100%);
			border-radius: 100px;
		}
		.info-empty{
			@include wh(100%,2rem);
		    background: url('//m.lvmama.com/flight/image/empty.png') no-repeat;
		    background-size: .5rem;
		    background-position: top center;
		    position: relative;
		    top: 2.6rem;
		    text-align: center;
		    >span {
			    position: relative;
			    top: .8rem;
				@include sc(.26rem,#999);
			}
		}
	}
</style>