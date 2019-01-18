<template>
    <div class="ProvCityBoxWarp">
        <div class="fadeIn ProvCityBoxBg" v-show="show" @click="close" @touchmove="_stopDef" @mousewheel="_stopDef"></div>
        <transition name="from-bottom">
            <div class="linear slideInUp ProvCityBox" v-show="show" @mousewheel="_stopDef">
                <div class="ProvCityHeader">
                    <div class="ProvCityHeaderCancle" @click="close(false)">{{cancel}}</div>
                    {{title}}
                    <div class="ProvCityHeaderConfirm" @click="submit">{{confirm}}</div>
                </div>
                <div class="orderLine"></div>
                <div class="f-flex f-flext ProvCityContent">
                    <div class="f-flex1 f-tac f-oh ProvCityContentList">
                        <ul :class="{'province_dragging': provinceState.dragging}" @touchstart="_onTouchStart('province', $event)" @mousedown="_onTouchStart('province', $event)" :style="{'transform' : 'translate3d(0,' + provinceState.translateY + 'px, 0)'}">
                            <li></li>
                            <li class="f-toe xy_flex ellipsis" v-for="(item, index) in provinceState.data" :data-name="item.name" :data-id="item.code" :data-parentid="item.parentid" :class="{
                                        'current': +item.code === +provinceState.selectedId,
                                        'node1':  Math.abs(index - provinceState.index) == 1,
                                        'node2':  Math.abs(index - provinceState.index) == 2,
                                        'node3':  Math.abs(index - provinceState.index) >= 3
                                    }">{{item.name}}</li>
                            <li></li>
                        </ul>
                    </div>
                </div>
                <div class="netTitle" v-if="showTitle">温馨提示：如申请病退,请直接联系客服,电话10106060-1-6。病退需在航班起飞前提出退票申请,并提供国内二级甲等以上医院或国外诊所或医院（医疗中心）出具的诊断说明书、病历等。<span v-if="flightDetail!='' &&flightDetail.carrierCode=='MU'" @click="showDetail">东航病退说明</span></div>
                <div class="netTitle" v-else></div>
                <div class="netMonitor"></div>
            </div>
        </transition>
    </div>
</template>
<script>
import {
    mapActions,
    mapState
} from 'vuex';
export default {
    data: function() {
        return {
            areaResult: null,
            target: '',
            provinceState: {
                data: null,
                selectedId: null,
                index: 0,
                startPos: null,
                translateY: 0,
                startTranslateY: 0,
                dragging: false,
                showTitle:true
            },
            delta: 0,
            slideEls: null,
        }
    },
    computed: {
        ...mapState([
            
        ])
    },
    created() {
        // this.allList = this.areaData;
        this.showTitle=true;
        if(this.$route.path.indexOf('feedBack')>=0){
            this.showTitle=false;
        }
        this.init();
        this._onTouchMove = this._onTouchMove.bind(this);
        this._onTouchEnd = this._onTouchEnd.bind(this);
    },
    activated(){

    },
    methods: {
        ...mapActions([
            
        ]),
        setReasonPickerState(type) {
            this.show = type;
        },
        init() {
            this.provinceState.data = this.optionsContent;
        },
        close() {
            this.$parent.reasonStatus = false;
        },
        submit() {
            var areaResult =  this.provinceState.data[this.provinceState.index];
            this.$parent.areaResult = areaResult;
            this.$parent.reasonStatus = false;
        },
        getSelectedData(index) {
            let target = this.target;
            let thisData = this[target + 'State'];
            thisData.selectedId = thisData.data[index].code;
        },
        showDetail(){
            this.$parent.showMUdetail = true;
        },
        setPage() {
            let target = this.target;
            let thisData = this[target + 'State'];
            // let clientHeight = this.slideEls[0]['clientHeight'];
            let clientHeight = 35;
            try{
                clientHeight = this.slideEls[0]['clientHeight'];
            }catch(e){}
            let total = thisData.data.length;
            let goPage = Math.round((thisData.translateY / clientHeight).toFixed(1));
            if (goPage > 0) {
                goPage = 0;
            }
            goPage = total - 1 >= Math.abs(goPage) ? goPage : -(total - 1);
            let index = Math.abs(goPage);
            thisData.index = index;
            this.getSelectedData(index);
            thisData.translateY = goPage * clientHeight;
        },
        _getTouchPos(e) {
            return e.changedTouches ? e.changedTouches[0]['pageY'] : e['pageY'];
        },
        _getElem(e) {
            // console.log(e.currentTarget.children);
            // console.log(Array.from(e.currentTarget.children).slice(3, -3));
            return Array.from(e.currentTarget.children).slice(3, -3);
        },
        _onTouchStart(target, e) {
            let thisData = this[target + 'State'];
            this.target = target;
            this.slideEls = this._getElem(e);
            this.delta = 0;
            thisData.startPos = this._getTouchPos(e);
            thisData.startTranslateY = thisData.translateY;
            thisData.dragging = true;
            document.addEventListener('touchmove', this._onTouchMove, false);
            document.addEventListener('touchend', this._onTouchEnd, false);
            document.addEventListener('mousemove', this._onTouchMove, false);
            document.addEventListener('mouseup', this._onTouchEnd, false);
        },
        _onTouchMove(e) {
            let target = this.target;
            let thisData = this[target + 'State'];
            this.delta = this._getTouchPos(e) - thisData.startPos;
            // console.log('delta:' + this.delta);
            thisData.translateY = thisData.startTranslateY + this.delta;
            if (Math.abs(this.delta) > 0) {
                e.preventDefault();
            }
        },
        _onTouchEnd(e) {
            let target = this.target;
            let thisData = this[target + 'State'];
            thisData.dragging = false;
            this.setPage();
            document.removeEventListener('touchmove', this._onTouchMove);
            document.removeEventListener('touchend', this._onTouchEnd);
            document.removeEventListener('mousemove', this._onTouchMove);
            document.removeEventListener('mouseup', this._onTouchEnd);
        },
        _stopDef(e) {
            e.preventDefault()
        }
    },
    props: {
        'result': {
            type: Object,
            default: null
        },
        'show': Boolean,
        'title': {
            type: String,
            default: '请选择退票原因'
        },
        'confirm': {
            type: String,
            default: '确定'
        },
        'cancel': {
            type: String,
            default: '取消'
        },
        'optionsContent': {
            type: Array
        },
        'flightDetail':{
            type: Object,
            default: ''
        }
    }
}
</script>
<style lang="scss" scoped>
.orderLine{
    display: block;
    background: url('//m.lvmama.com/flight/image/orderline.png') 0 bottom repeat-x #fff;
    background-size: auto .2rem;
    margin: 0 !important;
    width: 100%;
    height: 1px !important;
    padding: 0 !important;
    border-bottom: none !important;
}
.ProvCityBoxBg {
    background: rgba(0, 0, 0, .7);
    z-index: 200;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
}
.ProvCityBox {
    position: fixed;
    z-index: 300;
    background: #fff;
    bottom: 0;
    left: 0;
    right: 0;
    border-radius: 10px 10px 0 0;
    overflow: hidden;
}
.ProvCityHeader {
    background: #fff;
    height: .84rem;
    line-height: .84rem;
    overflow: hidden;
    text-align: center;
    color: #666;
}
.ProvCityHeaderCancle {
    float: left;
    padding: 0 .5rem;
}
.ProvCityHeaderConfirm {
    float: right;
    padding: 0 .5rem;
}
.ProvCityContent {
    width: 100%;
    margin: 0 auto;
    background: transparent;
    overflow: hidden;
    height: 140px;
    overflow: hidden;
}
.ProvCityContentList {
    width: 100%;
    float: left;
}
.ProvCityContentList ul {
    -webkit-transition: all .4s ease;
    transition: all .4s ease;
}
.ProvCityContentList ul.province_dragging {
    -webkit-transition: none;
    transition: none;
}
.ProvCityContentList li {
    line-height: 35px;
    height: 35px;
    font-size: .28rem;
}
.ProvCityContentList li.current {
    font-size: .32rem;
    font-weight: bold;
    transform: translateX(-.06rem);
}
.ProvCityContentList li.node1 {
    font-size: .3rem;
    opacity: .7;
    // transform: rotateX(20deg) skewX(5deg);
}
.ProvCityContentList li.node2 {
    font-size: .28rem;
    opacity: .5;
    // transform: rotateX(30deg) skewX(10deg);
}
.ProvCityContentList li.node3 {
    font-size: .24rem;
    opacity: .3;
    // transform: rotateX(0) skewX(-5deg);
}
.netMonitor {
    width: 100%;
    height: 35px;
    border-top: 1px solid #f4f3f3;
    border-bottom: 1px solid #f4f3f3;
    position: absolute;
    bottom: 131px;
    background: #fff;
    z-index: -1;
}
.netTitle{
    height: .84rem;
    color: #999;
    font-size: .24rem;
    margin: 10px .3rem;
}
</style>
