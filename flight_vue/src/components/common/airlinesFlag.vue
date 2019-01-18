<template>
	<div class="airline_flag_container">
    <!-- 航司旗舰店 -->
        <img v-if="flagKind == 'CA'" src="//m.lvmama.com/flight/image/airlineflag_CA.png" alt="">
        <img v-if="flagKind == 'CZ'" src="//m.lvmama.com/flight/image/airlineflag_CZ.png" alt="">
        <img v-if="flagKind == 'Y8'" src="//m.lvmama.com/flight/image/airlineflag_Y8.png" alt="">
        <img v-if="flagKind == 'ZH'" src="//m.lvmama.com/flight/image/airlineflag_ZH.png" alt="">
        <img v-if="flagKind == 'AQ'" src="//m.lvmama.com/flight/image/airlineflag_AQ.png" alt="">
        <img v-if="flagKind == 'GJ'" src="//m.lvmama.com/flight/image/airlineflag_GJ.png" alt="">
        <img v-if="flagKind == 'MU'" src="//m.lvmama.com/flight/image/airlineflag_MU.png?v=1" alt="">
        <img v-if="flagKind == 'FM'" src="//m.lvmama.com/flight/image/airlineflag_MU.png?v=1" alt="">
        <img v-if="flagKind == 'DR'" src="//m.lvmama.com/flight/image/airlineflag_DR.png" alt="">
        <img v-if="flagKind == 'G5'" src="//m.lvmama.com/flight/image/airlineflag_G5.png" alt="">
	</div>
</template>

<script>
	export default{
		data(){
			return{

			}
		},

		props:['flagKind'],

		mounted(){

		}
	}
</script>

<style lang="scss" scoped>
	.airline_flag_container {
        width: 100%;
        height: 100%;
        img {
            width: 100%;
        }
    }
</style>