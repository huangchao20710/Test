 <template>
	<div class="airline_share_container">
    <!-- 分享图片 -->
        <img v-if="imgKind == 'XMN'" src="//m.lvmama.com/flight/image/share/XMN.jpg" alt="">
        <img v-if="imgKind == 'CTU'" src="//m.lvmama.com/flight/image/share/CTU.jpg" alt="">
        <img v-if="imgKind == 'SYX'" src="//m.lvmama.com/flight/image/share/SYX.jpg" alt="">
        <img v-if="imgKind == 'XIY'" src="//m.lvmama.com/flight/image/share/XIY.jpg" alt="">
        <img v-if="imgKind == 'TAO'" src="//m.lvmama.com/flight/image/share/TAO.jpg" alt="">
        <img v-if="imgKind == 'KMG'" src="//m.lvmama.com/flight/image/share/KMG.jpg" alt="">
        <img v-if="imgKind == 'CKG'" src="//m.lvmama.com/flight/image/share/CKG.jpg" alt="">
        <img v-if="imgKind == 'CAN'" src="//m.lvmama.com/flight/image/share/CAN.jpg" alt="">

        <img v-if="imgKind == 'KWE'" src="//m.lvmama.com/flight/image/share/KWE.jpg" alt="">
        <img v-if="imgKind == 'CSX'" src="//m.lvmama.com/flight/image/share/CSX.jpg" alt="">
        <img v-if="imgKind == 'WUH'" src="//m.lvmama.com/flight/image/share/WUH.jpg" alt="">

        <img v-if="imgKind == 'DLC'" src="//m.lvmama.com/flight/image/share/DLC.jpg" alt="">
        <img v-if="imgKind == 'PEK'" src="//m.lvmama.com/flight/image/share/PEK.jpg" alt="">
        <img v-if="imgKind == 'ZUH'" src="//m.lvmama.com/flight/image/share/ZUH.jpg" alt="">
        <img v-if="imgKind == 'SZX'" src="//m.lvmama.com/flight/image/share/SZX.jpg" alt="">

        <img v-if="imgKind == 'LYA'" src="//m.lvmama.com/flight/image/share/LYA.jpg" alt="">
        <img v-if="imgKind == 'CGO'" src="//m.lvmama.com/flight/image/share/CGO.jpg" alt="">
        <img v-if="imgKind == 'HAK'" src="//m.lvmama.com/flight/image/share/HAK.jpg" alt="">
        <img v-if="imgKind == 'LJG'" src="//m.lvmama.com/flight/image/share/LJG.jpg" alt="">
        <img v-if="imgKind == 'HRB'" src="//m.lvmama.com/flight/image/share/HRB.jpg" alt="">
        <img v-if="imgKind == 'SHA'" src="//m.lvmama.com/flight/image/share/SHA.jpg" alt="">
        <img v-if="imgKind == 'HGH'" src="//m.lvmama.com/flight/image/share/HGH.jpg" alt="">
        <img v-if="imgKind == 'KWL'" src="//m.lvmama.com/flight/image/share/KWL.jpg" alt="">

        <!-- <img v-if="imgKind == 'SZX'" src="//m.lvmama.com/flight/image/share/SZX.jpg" alt="">
        <img v-if="imgKind == 'DLC'" src="//m.lvmama.com/flight/image/share/DLC.jpg" alt="">
        <img v-if="imgKind == 'HRB'" src="//m.lvmama.com/flight/image/share/HRB.jpg" alt="">
        <img v-if="imgKind == 'WUH'" src="//m.lvmama.com/flight/image/share/WUH.jpg" alt="">
        <img v-if="imgKind == 'LJG'" src="//m.lvmama.com/flight/image/share/LJG.jpg" alt="">
        <img v-if="imgKind == 'HAK'" src="//m.lvmama.com/flight/image/share/HAK.jpg" alt=""> -->
	</div>
</template>

<script>
    export default {
    	data(){
            return{
                
            }
        },
        props: [
            'imgKind'
        ],
        mounted(){
        	
        }
    }
</script>

<style lang="scss" scoped>
    .airline_share_container {
        width: 100%;
        height: 100%;
        img {
            width: 100%;
            border-radius: 0.08rem;
        }
    }
</style>
