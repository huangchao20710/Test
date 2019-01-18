<template>
	<div class="certificateTypeWarp">
		<div class="fadeIn certificateTypeBoxBg" @click="close" v-show="showType"></div>
		<transition name="from-bottom">
			<div class="linear slideInUp certificateTypeBox" v-show="showType">
				<div class="certificateType">
					<ul>
						<li v-bind:class="{'selected':personCardType.type=='ID' || personCardType.type=='ID_CARD'}" @click="checkPersonCardType(1)">身份证</li>
						<li v-bind:class="{'selected':personCardType.type=='PASSPORT' || personCardType.type=='HUZHAO'}" @click="checkPersonCardType(2)">护照</li>
						<li v-bind:class="{'selected':personCardType.type=='HUIXIANG'}" @click="checkPersonCardType(4)">回乡证</li>
						<li v-bind:class="{'selected':personCardType.type=='OFFICER'}" @click="checkPersonCardType(5)">军官证</li>
						<li v-bind:class="{'selected':personCardType.type=='SOLDIER'}" @click="checkPersonCardType(6)">士兵证</li>
						<li v-bind:class="{'selected':personCardType.type=='TAIBAOZHENG'}" @click="checkPersonCardType(3)">台胞证</li>
						<li v-bind:class="{'selected':personCardType.type=='RPGA'||personCardType.type=='GANGAORESIDENCE'}" @click="checkPersonCardType(8)">港澳居民居住证</li>
						<li v-bind:class="{'selected':personCardType.type=='RPTW'||personCardType.type=='TAIBAORESIDENCE'}" @click="checkPersonCardType(9)">台湾居民居住证</li>
						<li v-bind:class="{'selected':personCardType.type=='OTHER'}" @click="checkPersonCardType(7)">其它</li>
					</ul>
				</div>
			</div>
		</transition>
	</div>
</template>

<script>
	export default{
		data(){
			return {

			}
		},

		props:{
			'showType': Boolean,
			'personCardType':{
				type:Object,
				default: null
			}
		},

		methods:{
	        close(){
	        	this.$parent.certificateTypeState = false;
	        },
	        checkPersonCardType(type){
	        	switch(type){
	        		case 1:
	        			this.$parent.personCardType.type = 'ID_CARD' || 'ID';
	        			this.$parent.personCardType.value = '身份证';
	        			this.$parent.certificateTypeState = false;
	        			break;
	        		case 2:
	        			this.$parent.personCardType.type = 'PASSPORT' || 'HUZHAO';
	        			this.$parent.personCardType.value = '护照';
	        			this.$parent.certificateTypeState = false;
	        			break;
	        		case 3:
	        			this.$parent.personCardType.type = 'TAIBAOZHENG';
	        			this.$parent.personCardType.value = '台胞证';
	        			this.$parent.certificateTypeState = false;
	        			break;
	        		case 4:
	        			this.$parent.personCardType.type = 'HUIXIANG';
	        			this.$parent.personCardType.value = '回乡证';
	        			this.$parent.certificateTypeState = false;
	        			break;
	        		case 5:
	        			this.$parent.personCardType.type = 'OFFICER';
	        			this.$parent.personCardType.value = '军官证';
	        			this.$parent.certificateTypeState = false;
	        			break;
	        		case 6:
	        			this.$parent.personCardType.type = 'SOLDIER';
	        			this.$parent.personCardType.value = '士兵证';
	        			this.$parent.certificateTypeState = false;
	        			break;
	        		case 7:
	        			this.$parent.personCardType.type = 'OTHER';
	        			this.$parent.personCardType.value = '其它';
	        			this.$parent.certificateTypeState = false;
						break;
					case 8:
						this.$parent.personCardType.type = 'GANGAORESIDENCE';
	        			this.$parent.personCardType.value = '港澳居民居住证';
	        			this.$parent.certificateTypeState = false;
						break;
					case 9:
						this.$parent.personCardType.type = 'TAIBAORESIDENCE';
	        			this.$parent.personCardType.value = '台湾居民居住证';
	        			this.$parent.certificateTypeState = false;
						break;
	        	}
	        }
		}
	}
</script>

<style lang="scss" scoped>
@import '../../style/mixin';
.certificateTypeWarp{
	.certificateTypeBoxBg {
	    background: rgba(0, 0, 0, .7);
	    z-index: 200;
	    position: absolute;
	    top: 0;
	    bottom: 0;
	    left: 0;
	    right: 0;
	}
	.certificateTypeBox {
	    position: fixed;
	    z-index: 300;
	    background: #fff;
	    bottom: 0;
	    left: 0;
	    right: 0;
		border-top-left-radius: 5px;
		border-top-right-radius: 5px;
		overflow: hidden;
	    .certificateType{
	    	width: 100%;
		    margin: 0 auto;
		    background: transparent;
		    overflow: hidden;
		    overflow: hidden;
		    color: #2D3859;
		    ul{
		    	li{
		    		@include sc(0.28rem,#666);
		    		height: 0.88rem;
				    line-height: 0.88rem;
					border-bottom: 1px solid #E4E4E4;
				    padding: 0 0.2rem;
					position: relative;
					text-align: center;
		    	}
		    	.selected{
		    		color: #FF8800;
		    	}
		    	// .selected:after{
		    	// 	content: "";
				//     position: absolute;
				//     width: 0.12rem;
				//     height: 0.22rem;
				//     border-bottom: 1px solid #d30775;
				//     border-right: 1px solid #d30775;
				//     transform: rotate(45deg) translateY(-50%);
				//     right: 0.3rem;
				//     top: 50%;
		    	// }
		    }
	    }
	}
}
</style>

