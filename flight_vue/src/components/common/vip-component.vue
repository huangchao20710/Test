<template>
	<div class="vip-group">
		<div class="header">
			<span class="back" @click="back"></span>
			驴妈妈交通VIP用户群
		</div>
		<div class="content">
			<p>一个用户与用户之间，用户与驴妈妈之间的交流群</p>
			<div class="remark">
				<div class="title">提示</div>
				<div class="con">
					<p>1.截取当前屏幕</p>
					<p>2.点击QQ扫一扫功能,选择右上角的相册</p>
					<p>3.选择截屏图片,识别图片中二维码</p>
					<p>4.加入QQVIP用户群（661267001）</p>
				</div>
			</div>
			<div class="backgroundImg">
				<div>
					<div></div>
				</div>
				<p>特别提醒：群内每逢佳节有促销</p>
			</div>		
		</div>
	</div>
</template>
<script>
    export default {
        data(){
            return{
                
            }
        },
        props: [
            
        ],
        components: {
            
        },
        created() {

        },
        mounted(){
            
        },
        methods: {
        	back(){
        		this.$parent.showVip=false;
        	}
        },
        activated() {
            
        }
    }
</script>

<style lang="scss" scoped>
    @import '../../style/mixin';
	.vip-group{
		@include wh(100%,100%);
	    position: absolute;
	    top: 0;
	    background-color: #f1f1f1;
	    font-size: .3rem;
	    z-index:100;
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
			    width: 1.6rem;
			    height: .94rem;
			    position: absolute;
			}
	    }
	    .content {
		    @include wh(90%,87%);
		    background-color: #fff;
		    border-radius: 10px;
		    position: absolute;
		    top: 50%;
		    left: 50%;
		    transform: translate(-50%,-50%);
		    -webkit-transform: translate(-50%,-50%);
		    margin-top: .4rem;
		    overflow: hidden;
		    >p {
			    font-size: .28rem;
			    padding-top: .3rem;
			    color: #000;
			    padding-left: .3rem;
			}
			.remark {
			    padding: .3rem 0 .2rem .3rem;
			    background-color: #fff;
			    z-index: 10;
			    .title {
				    text-align: left;
				    font-size: .3rem;
				    color: #000;
				}
				.con {
				    padding: .2rem 0 0 .36rem;
				    >p {
					    margin-bottom: .06rem;
					    color: #000;
					    font-size: .28rem;
					}
				}
			}
			.backgroundImg {
				@include wh(100%,66%);
			    background: url('//m.lvmama.com/flight/image/background.jpg');
			    background-size: 100% 100%;
			    position: absolute;
			    bottom: 0;
			    z-index: -1;
			    >div{
			    	@include wh(3.6rem,3.6rem);
				    position: relative;
				    margin: 1.4rem auto .3rem;
				    border-radius: 10px;
				    background-color: #fff;
				    >div{
				    	background: url('//m.lvmama.com/flight/image/vip.png');
					    background-size: 100% 100%;
					    width: 80%;
					    height: 80%;
					    position: absolute;
					    top: 30%;
					    left: 50%;
					    -webkit-transform: translate(-50%,-25%);
					    transform: translate(-50%,-25%);
					    background-size: 100% 100%;
				    }
			    }
			    p {
					    font-size: .24rem;
					    width: 3.64rem;
					    text-align: center;
					    margin: 0 auto;
					}
			}
		}
	}
</style>
