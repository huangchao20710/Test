 <template>
	<div class="airline_share_container" @click="toNextPage()">
    <!-- 分享图片 -->
        <img v-if="bannerKind == 'KMG'" src="//m.lvmama.com/flight/image/share_banner/KMG.jpg" alt="">
        <img v-if="bannerKind == 'SYX'" src="//m.lvmama.com/flight/image/share_banner/SYX.jpg" alt="">
        <img v-if="bannerKind == 'TAO'" src="//m.lvmama.com/flight/image/share_banner/TAO.jpg" alt="">
        <img v-if="bannerKind == 'XIY'" src="//m.lvmama.com/flight/image/share_banner/XIY.jpg" alt="">
        <img v-if="bannerKind == 'XMN'" src="//m.lvmama.com/flight/image/share_banner/XMN.jpg" alt="">
        

	</div>
</template>

<script>
    export default {
    	data(){
            return{
                
            }
        },
        props: [
            'bannerKind',
            'banner'
        ],
        methods:{
            toNextPage(){
                this.$emit('toNextPage',this.banner);
            }
        },
        mounted(){
        	
        }
    }
</script>

<style lang="scss" scoped>
    .airline_share_container {
        width: 100%;
        // height: 100%;
        height: 3.8rem;
        position: relative;
        img {
            width: 100%;
            height:3.8rem;
            
        }
    }
</style>
