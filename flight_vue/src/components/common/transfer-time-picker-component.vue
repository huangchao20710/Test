<template>
    <div class="ProvCityBoxWarp">
        <div class="fadeIn ProvCityBoxBg" @click="closePicker" @touchmove="_stopDef" @mousewheel="_stopDef"></div>
        <transition name="from-bottom">
            <div class="linear slideInUp ProvCityBox" @mousewheel="_stopDef">
                <div class="ProvCityHeader">
                    <div class="ProvCityHeaderCancle" @click="closePicker">{{cancel}}</div>
                    {{title}}
                    <div class="ProvCityHeaderConfirm" @click="submit">{{confirm}}</div>
                </div>
                <div class="f-flex f-flext ProvCityContent">
                    <div class="f-flex1 f-tac f-oh ProvCityContentList list1">
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
                    <div class="f-flex1 f-tac f-oh ProvCityContentList list2">
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
                    <div class="f-flex1 f-tac f-oh ProvCityContentList list3">
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
import { formatIOSDate,weekFormat,addZero } from '../../config/mUtils.js'
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
        // this.allList = this.areaData;
        this.init();
        this._onTouchMove = this._onTouchMove.bind(this);
        this._onTouchEnd = this._onTouchEnd.bind(this);
    },
    activated(){
        this.$nextTick(() => {
            this.init();
        });
    },
    methods: {
        ...mapActions([
            
        ]),
        createDate (count) {
            let arr1 = String(this.startTime).split(' '),
                arr2 = String(arr1[0]).split('-'),//年月日
                arr3 = String(arr1[1]).split(':');//时分
            let planetime = `${arr2[0]}/${arr2[1]}/${arr2[2]} ${arr1[1]}`;
            let yeart = arr2[0],
                montht = arr2[1],
                datet = arr2[2],
                hourt = arr3[0],
                minutest = arr3[1];
            let timet = new Date(formatIOSDate(planetime)).getTime(),
                dayt = weekFormat(new Date(timet).getDay());
            let timel = timet - count * 60 * 60 * 1000;
            if (minutest >= 55) {
                timel = timet - (count - 1) * 60 * 60 * 1000;
            }
            let yearl = new Date(timel).getFullYear(),
                monthl = new Date(timel).getMonth() + 1,
                datel = new Date(timel).getDate(),
                dayl = weekFormat(new Date(timel).getDay()),
                hourl = new Date(timel).getHours(),
                minutesl = new Date(timel).getMinutes();
            let _yearList = [];
            let _hourList = [];
            let _dayList = ['00','10','20','30','40','50'];
            if (+datet != +datel) {
                let objn = {
                    code: 0,
                    name: `${yearl}年${addZero(monthl)}月${addZero(datel)} ${dayl}`,
                    hourList: [],
                };
                for (let a = +hourl; a < 24; a++) {
                    let obj = {
                        code: a - (+hourl),
                        name: addZero(a),
                        minutesList: []
                    }
                    objn.hourList.push(obj);
                    for (let i = 0; i < _dayList.length; i++) {
                        if (obj.code == 0) {
                            if (+_dayList[i] >= minutesl) {
                                let obj1 = {
                                    code: i,
                                    name: _dayList[i],
                                };
                                obj.minutesList.push(obj1);
                            }
                        } else {
                            let obj1 = {
                                code: i,
                                name: _dayList[i],
                            };
                            obj.minutesList.push(obj1);
                        }
                    }
                }
                _yearList.push(objn);
                let objt = {
                    code: 1,
                    name: `${arr2[0]}年${arr2[1]}月${arr2[2]}日 ${dayt}`,
                    hourList: [],
                };
                for (let b = 0; b < +hourt; b++) {
                    let obj = {
                        code: b,
                        name: addZero(b),
                        minutesList: []
                    }
                    objt.hourList.push(obj);
                }
                for (let i = 0; i < _dayList.length; i++) {
                    for (let j = 0; j < objt.hourList.length; j++) {
                        if (objt.hourList[j].code == objt.hourList.length - 1) {
                            if (+_dayList[i] < minutesl) {
                                let obj1 = {
                                    code: i,
                                    name: _dayList[i],
                                };
                                objt.hourList[j].minutesList.push(obj1);
                            }
                        } else {
                            let obj1 = {
                                code: i,
                                name: _dayList[i],
                            };
                            objt.hourList[j].minutesList.push(obj1);
                        }
                        
                    }
                }
            _yearList.push(objt);
            } else {
                let objn = {
                    code: 0,
                    name: `${arr1[0]} ${dayt}`,
                    hourList: [],
                }; 
                for (let i = +hourl; i < +hourt; i++) {
                    let obj = {
                        code: i - (+hourl),
                        name: addZero(i),
                        minutesList: []
                    }
                    objn.hourList.push(obj);
                }
                for (let j = 0; j < _dayList.length; j++) {
                    for (let i = 0; i < objn.hourList.length; i++) {
                        if (objn.hourList[i].code == 0) {
                            if (+_dayList[j] >= minutesl) {
                                let obj1 = {
                                    code: j,
                                    name: _dayList[j],
                                };
                                objn.hourList[i].minutesList.push(obj1);
                            }
                        } else if (objn.hourList[i].code == objn.hourList.length - 1) {
                            if (+_dayList[j] <= minutesl) {
                                let obj1 = {
                                    code: j,
                                    name: _dayList[j],
                                };
                                objn.hourList[i].minutesList.push(obj1);
                            }
                        } else {
                            let obj1 = {
                                code: j,
                                name: _dayList[j],
                            };
                            objn.hourList[i].minutesList.push(obj1);
                        }
                    }
                }
                _yearList.push(objn);
            }
            for (let i = 0; i < _yearList[0].hourList.length; i++) {
                if (_yearList[0].hourList[i].minutesList.length <= 0) {
                    _yearList[0].hourList.splice(i,1);
                }
            }
            return _yearList;

        },
        init() {
            this.allList = this.createDate(5);
            this.provinceState.data = this.allList;
            this.provinceState.selectedId = 0; 
            this.cityState.selectedId = 0; 
            this.areaState.selectedId = 0; 
            this.filterCity();
            this.filterArea();
        },
        closePicker() {
            this.$parent.timePickerStatus = false;
        },
        submit() {
            var timeResult = {
                'date': this.provinceState.data[this.provinceState.index].name,
                'hour': this.cityState.data[this.cityState.index].name,
                'minutes': this.areaState.data[this.areaState.index].name
            };
            this.$parent.timeResult = timeResult;
            this.$parent.timePickerStatus = false;
        },
        filterCity() {
            let tempCity = [];
            for (let i = 0; i < this.allList.length; i++) {
                if (this.provinceState.selectedId == this.allList[i].code) {
                    tempCity = this.allList[i].hourList;
                }
            }
            this.cityState.data = tempCity;
            this.cityState.selectedId = this.cityState.data[0] && this.cityState.data[0].code;
            this.cityState.translateY = 0;
            this.cityState.index = 0;
        },
        filterArea() {
            let tempArea = [];
            for (var i = 0; i < this.allList[this.provinceState.index].hourList.length; i++) {
                if (this.cityState.selectedId == this.allList[this.provinceState.index].hourList[i].code) {
                    tempArea = this.allList[this.provinceState.index].hourList[i].minutesList;
                }
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
            default: '请选择'
        },
        'confirm': {
            type: String,
            default: '确定'
        },
        'cancel': {
            type: String,
            default: '取消'
        },
        'startTime': {
            type: String
        }
    },
    watch: {
        startTime(newVal,oldVal){
            if (newVal != oldVal) {
                this.init();
            }
        }
    }
}
</script>
<style lang="scss" scoped>
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
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    overflow: hidden;
    box-shadow: 0 0 6px 0 rgba(0,0,0,0.08);
}
.ProvCityHeader {
    background: #f2f2f2;
    height: .84rem;
    line-height: .84rem;
    overflow: hidden;
    text-align: center;
    font-family: PingFangSC-Regular;
    color: #666666;
    font-size: .28rem;
}
.ProvCityHeaderCancle {
    float: left;
    padding: 0 .2rem;
    font-family: PingFangSC-Regular;
    font-size: .28rem;
    color: #333333;
}
.ProvCityHeaderConfirm {
    float: right;
    padding: 0 .2rem;
    font-family: PingFangSC-Regular;
    font-size: .28rem;
    color: #333333;
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
    float: left;
}
.list1 {
    width: 60%;
}
.list2 {
    width: 20%;
}
.list3 {
    width: 20%;
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
    border-top: 1px solid #BDC1D2;
    border-bottom: 1px solid #BDC1D2;
    position: absolute;
    bottom: 70px;
    background: #F7F9FB;
    z-index: -1;
}
</style>
