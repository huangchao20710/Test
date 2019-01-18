 <template>
	<div class="airline_logo_container">
    <!-- 航司logo图 -->
        <img v-if="logoKind == '3U'" src="//m.lvmama.com/flight/image/airline-icons/3U.png" alt="">
        <img v-if="logoKind == '8L'" src="//m.lvmama.com/flight/image/airline-icons/8L.png" alt="">
        <img v-if="logoKind == '9C'" src="//m.lvmama.com/flight/image/airline-icons/9C.png" alt="">
        <img v-if="logoKind == '9H'" src="//m.lvmama.com/flight/image/airline-icons/9H.png" alt="">
        <img v-if="logoKind == 'A6'" src="//m.lvmama.com/flight/image/airline-icons/A6.png" alt="">
        <img v-if="logoKind == 'AQ'" src="//m.lvmama.com/flight/image/airline-icons/AQ.png" alt="">
        <img v-if="logoKind == 'BK'" src="//m.lvmama.com/flight/image/airline-icons/BK.png" alt="">
        <img v-if="logoKind == 'CA'" src="//m.lvmama.com/flight/image/airline-icons/CA.png" alt="">
        <img v-if="logoKind == 'CN'" src="//m.lvmama.com/flight/image/airline-icons/CN.png" alt="">
        <img v-if="logoKind == 'CZ'" src="//m.lvmama.com/flight/image/airline-icons/CZ.png" alt="">
        <img v-if="logoKind == 'DR'" src="//m.lvmama.com/flight/image/airline-icons/DR.png" alt="">
        <img v-if="logoKind == 'DZ'" src="//m.lvmama.com/flight/image/airline-icons/DZ.png" alt="">
        <img v-if="logoKind == 'EU'" src="//m.lvmama.com/flight/image/airline-icons/EU.png" alt="">
        <img v-if="logoKind == 'FM'" src="//m.lvmama.com/flight/image/airline-icons/FM.png" alt="">
        <img v-if="logoKind == 'FU'" src="//m.lvmama.com/flight/image/airline-icons/FU.png" alt="">
        <img v-if="logoKind == 'G5'" src="//m.lvmama.com/flight/image/airline-icons/G5.png" alt="">
        <img v-if="logoKind == 'GJ'" src="//m.lvmama.com/flight/image/airline-icons/GJ.png" alt="">
        <img v-if="logoKind == 'GS'" src="//m.lvmama.com/flight/image/airline-icons/GS.png" alt="">
        <img v-if="logoKind == 'GX'" src="//m.lvmama.com/flight/image/airline-icons/GX.png" alt="">
        <img v-if="logoKind == 'GY'" src="//m.lvmama.com/flight/image/airline-icons/GY.png" alt="">
        <img v-if="logoKind == 'HO'" src="//m.lvmama.com/flight/image/airline-icons/HO.png?v=1" alt="">
        <img v-if="logoKind == 'HU'" src="//m.lvmama.com/flight/image/airline-icons/HU.png" alt="">
        <img v-if="logoKind == 'JD'" src="//m.lvmama.com/flight/image/airline-icons/JD.png" alt="">
        <img v-if="logoKind == 'JR'" src="//m.lvmama.com/flight/image/airline-icons/JR.png" alt="">
        <img v-if="logoKind == 'KN'" src="//m.lvmama.com/flight/image/airline-icons/KN.png" alt="">
        <img v-if="logoKind == 'KY'" src="//m.lvmama.com/flight/image/airline-icons/KY.png" alt="">
        <img v-if="logoKind == 'MF'" src="//m.lvmama.com/flight/image/airline-icons/MF.png" alt="">
        <img v-if="logoKind == 'MU'" src="//m.lvmama.com/flight/image/airline-icons/MU.png?v=1" alt="">
        <img v-if="logoKind == 'NS'" src="//m.lvmama.com/flight/image/airline-icons/NS.png" alt="">
        <img v-if="logoKind == 'OQ'" src="//m.lvmama.com/flight/image/airline-icons/OQ.png" alt="">
        <img v-if="logoKind == 'PN'" src="//m.lvmama.com/flight/image/airline-icons/PN.png" alt="">
        <img v-if="logoKind == 'QW'" src="//m.lvmama.com/flight/image/airline-icons/QW.png" alt="">
        <img v-if="logoKind == 'SC'" src="//m.lvmama.com/flight/image/airline-icons/SC.png" alt="">
        <img v-if="logoKind == 'TV'" src="//m.lvmama.com/flight/image/airline-icons/TV.png" alt="">
        <img v-if="logoKind == 'UQ'" src="//m.lvmama.com/flight/image/airline-icons/UQ.png" alt="">
        <img v-if="logoKind == 'Y8'" src="//m.lvmama.com/flight/image/airline-icons/Y8.png" alt="">
	    <img v-if="logoKind == 'ZH'" src="//m.lvmama.com/flight/image/airline-icons/ZH.png" alt="">
	</div>
</template>

<script>
    export default {
    	data(){
            return{
                
            }
        },
        props: [
            'logoKind'
        ],
        mounted(){
        	
        }
    }
</script>

<style lang="scss" scoped>
    .airline_logo_container {
        width: 100%;
        height: 100%;
        img {
            width: 100%;
        }
    }
</style>
