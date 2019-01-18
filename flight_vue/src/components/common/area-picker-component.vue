<template>
    <div class="ProvCityBoxWarp">
        <div class="fadeIn ProvCityBoxBg" v-show="show" @click="$parent.areaStatus = false" @touchmove="_stopDef" @mousewheel="_stopDef"></div>
        <transition name="from-bottom">
            <div class="linear slideInUp ProvCityBox" v-show="show" @mousewheel="_stopDef">
                <div class="ProvCityHeader">
                    <div class="ProvCityHeaderCancle" @click="$parent.areaStatus = false">{{cancel}}</div>
                    {{title}}
                    <div class="ProvCityHeaderConfirm" @click="submit">{{confirm}}</div>
                </div>
                <div class="orderLine"></div>
                <div class="f-flex f-flext ProvCityContent">
                    <div class="f-flex1 f-tac f-oh ProvCityContentList">
                        <ul :class="{'province_dragging': provinceState.dragging}" @touchstart="_onTouchStart('province', $event)" @mousedown="_onTouchStart('province', $event)" :style="{'transform' : 'translate3d(0,' + provinceState.translateY + 'px, 0)'}">
                            <li></li>
                            <li></li>
                            <li class="f-toe xy_flex ellipsis" v-for="(item, index) in provinceState.data" :data-name="item.name" :data-id="item.code" :data-parentid="item.parentid" :class="{
                                        'current': +item.code === +provinceState.selectedId,
                                        'node1':  Math.abs(index - provinceState.index) == 1,
                                        'node2':  Math.abs(index - provinceState.index) == 2,
                                        'node3':  Math.abs(index - provinceState.index) >= 3
                                    }">{{item.name}}</li>
                            <li></li>
                            <li></li>
                        </ul>
                    </div>
                    <div class="f-flex1 f-tac f-oh ProvCityContentList">
                        <ul :class="{'city_dragging': cityState.dragging}" @touchstart="_onTouchStart('city', $event)" @mousedown="_onTouchStart('city', $event)" :style="{'transform' : 'translate3d(0,' + cityState.translateY + 'px, 0)'}">
                            <li></li>
                            <li></li>
                            <li class="f-toe xy_flex ellipsis" v-for="(item, index) in cityState.data" :data-name="item.name" :data-id="item.code" :data-parentid="item.parentid" :class="{
                                        'current': +item.code === +cityState.selectedId,
                                        'node1':  Math.abs(index - cityState.index) == 1,
                                        'node2':  Math.abs(index - cityState.index) == 2,
                                        'node3':  Math.abs(index - cityState.index) >= 3
                                }">{{item.name}}</li>
                            <li></li>
                            <li></li>
                        </ul>
                    </div>
                    <div class="f-flex1 f-tac f-oh ProvCityContentList">
                        <ul :class="{'area_dragging': areaState.dragging}" @touchstart="_onTouchStart('area', $event)" @mousedown="_onTouchStart('area', $event)" :style="{'transform' : 'translate3d(0,' + areaState.translateY + 'px, 0)'}">
                            <li></li>
                            <li></li>
                            <li class="f-toe xy_flex ellipsis"  v-for="(item, index) in areaState.data" :data-name="item.name" :data-id="item.code" :data-parentid="item.parentid" :class="{
                                'current': +item.code === +areaState.selectedId,
                                'node1':  Math.abs(index - areaState.index) == 1,
                                'node2':  Math.abs(index - areaState.index) == 2,
                                'node3':  Math.abs(index - areaState.index) >= 3
                            }">{{item.name}}</li>
                            <li></li>
                            <li></li>
                        </ul>
                    </div>
                </div>
                <!-- <hr class="ProvCitySelectedTop">
                <hr class="ProvCitySelectedBottom"> -->
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
                dragging: false
            },
            cityState: {
                data: null,
                selectedId: null,
                index: 0,
                startPos: null,
                translateY: 0,
                startTranslateY: 0,
                dragging: false
            },
            areaState: {
                data: null,
                selectedId: null,
                index: 0,
                startPos: null,
                translateY: 0,
                startTranslateY: 0,
                dragging: false
            },
            delta: 0,
            slideEls: null,
            allList: '',
        }
    },
    computed: {
        ...mapState([
            'areaData'
        ])
    },
    created() {
        this.allList = this.areaData;
        this.init();
        this._onTouchMove = this._onTouchMove.bind(this);
        this._onTouchEnd = this._onTouchEnd.bind(this);
    },
    activated(){

    },
    methods: {
        ...mapActions([
            'setAreaStatus'
        ]),
        init() {
            let province = [];
            for (var i = 0; i < this.allList.length; i++) {
                let obj = {
                    code: this.allList[i].key,
                    name: this.allList[i].value,
                    pinYin: this.allList[i].pinYin
                }
                province.push(obj);
            }
            this.provinceState.data = province;
            this.provinceState.selectedId = 13; //北京市  省
            this.cityState.selectedId = 13; //市辖区  市
            this.areaState.selectedId = 783; //东城区  区
            this.filterCity();
            this.filterArea();
        },
        submit() {
            let areaResult = {
                'province': this.provinceState.data[this.provinceState.index],
                'city': this.cityState.data[this.cityState.index],
                'area': this.areaState.data[this.areaState.index]
            };
            console.log(areaResult)
            this.$parent.areaResult = areaResult;
            this.$parent.areaStatus = false;
        },
        filterCity() {
            let tempCity = [];
            for (let i = 0; i < this.allList.length; i++) {
                if (this.provinceState.selectedId == this.allList[i].key) {
                    tempCity = this.allList[i].list;
                }
            }
            for (let i = 0; i < tempCity.length; i++) {
                tempCity[i].name = tempCity[i].value;
                tempCity[i].code = tempCity[i].key;
                tempCity[i].pinYin = tempCity[i].pinYin;
            }
            this.cityState.data = tempCity;
            this.cityState.selectedId = this.cityState.data[0] && this.cityState.data[0].code;
            this.cityState.translateY = 0;
            this.cityState.index = 0;
        },
        filterArea() {
            let tempArea = [];
            for (var i = 0; i < this.allList[this.provinceState.index].list.length; i++) {
                if (this.cityState.selectedId == this.allList[this.provinceState.index].list[i].key) {
                    tempArea = this.allList[this.provinceState.index].list[i].list;
                }
            }
            for (let i = 0; i < tempArea.length; i++) {
                tempArea[i].name = tempArea[i].value;
                tempArea[i].code = tempArea[i].key;
                tempArea[i].pinYin = tempArea[i].pinYin;
            }
            this.areaState.data = tempArea;
            this.areaState.selectedId = this.areaState.data[0] && this.areaState.data[0].code;
            this.areaState.translateY = 0;
            this.areaState.index = 0;
        },
        getSelectedData(index) {
            let target = this.target;
            let thisData = this[target + 'State'];
            thisData.selectedId = thisData.data[index].code;
            if (target === 'province') {
                this.filterCity();
                this.filterArea();
            }
            if (target === 'city') {
                this.filterArea();
            }
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
            default: '请选择省份和城市'
        },
        'confirm': {
            type: String,
            default: '确定'
        },
        'cancel': {
            type: String,
            default: '取消'
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
    color: #666666;
    font-size: .28rem;
}
.ProvCityHeaderCancle {
    float: left;
    padding: 0 .5rem;
    color: #333333;
    font-size: .28rem;
}
.ProvCityHeaderConfirm {
    float: right;
    padding: 0 .5rem;
    color: #333333;
    font-size: .28rem;
}
.ProvCityContent {
    width: 100%;
    margin: 0 auto;
    background: transparent;
    overflow: hidden;
    height: 175px;
    overflow: hidden;
}
.ProvCityContentList {
    width: 33%;
    float: left;
}
.ProvCityContentList ul {
    -webkit-transition: all .4s ease;
    transition: all .4s ease;
}
.ProvCityContentList ul.province_dragging,
.ProvCityContentList ul.city_dragging,
.ProvCityContentList ul.area_dragging {
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
    font-size: .32rem;
    color:#888888;
    opacity: .7;
    // transform: rotateX(20deg) skewX(5deg);
}
.ProvCityContentList li.node2 {
    font-size: .32rem;
    color:#888888;
    opacity: .5;
    // transform: rotateX(30deg) skewX(10deg);
}
.ProvCityContentList li.node3 {
    font-size: .32rem;
    color:#888888;
    opacity: .3;
    // transform: rotateX(0) skewX(-5deg);
}
.ProvCitySelectedTop {
    width: 100%;
    border: none;
    border-top: 1px solid #BDC1D2;
    position: absolute;
    bottom: 2.1rem;
    margin: 0;
    height: 0;
}
.ProvCitySelectedBottom {
    width: 100%;
    border: none;
    border-top: 1px solid #E4E4E4;
    position: absolute;
    bottom: 2.8rem;
    margin: 0;
    height: 0;
}
.netMonitor {
    width: 100%;
    height: 35px;
    border-top: 1px solid #E4E4E4;
    border-bottom: 1px solid #E4E4E4;
    position: absolute;
    bottom: 70px;
    background: #FFF;
    z-index: -1;
}
</style>
<!-- <area-picker :show="areaStatus" :result="areaResult" ref="vueArea"></area-picker> -->