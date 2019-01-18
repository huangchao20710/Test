 <template>
    <div class="search_airport_container city_container">
        <search-header @get-input="getInput" @get-input-state="getInputState" :placeholderContent="placeholderContent"></search-header>
        <ul class="firstLetter_container">
          <!-- <li class="xy_flex" v-for="item in firstLetters" @click="goAnchor('.'+ item.toLowerCase())">{{item}}</li> -->
          <a class="xy_flex" v-for="item in firstLetters" @click="goAnchor('.'+ item.toLowerCase())">{{item}}</a>
        </ul>
        <div class="city_list_container" ref="scrollContainer">
          <ul class="all_city_container">
            <ul class="city_fitstLetter_item" v-for="airport in showAirportsInfo">
              <li :id="airport.firstLetter.toLowerCase()" class="page_location_name located">{{airport.firstLetter}}</li>
              <li class="city_item" id="item.cityCode" v-for="item in airport.airports" @click="chooseAirport(item)">{{item.name}}</li>
            </ul>
          </ul> 
        </div>
        <div class="filter_container" v-if="filterAirports.length > 0">
          <ul>
            <li class="city_item" v-for="item in filterAirports" @click="chooseAirport(item)">{{item.name}}</li>
          </ul>
        </div>
        <div class="mask" v-show="isFocus"></div>
    </div>
</template>
<script>
    import searchHeader from '../../components/common/searchHeader'
    import { mapActions,mapState } from 'vuex'
    export default {
        data(){
            return{
                placeholderContent:'请输入机场名或机场所在城市名',
                firstLetters: '',//机场拼音首字母
                showAirportsInfo: '',//处理后展示的所有机场数据
                isFocus: false,
                filterAirports: [],//筛选后的机场
                anchorLetter: 'a'
            }
        },
        props: [
            
        ],
        components: {
            searchHeader,
        },
        computed: {
            ...mapState([
                'allAirportsInfo'
            ]),
        },
        methods: {
            ...mapActions([
                'initData'
            ]),
            dealAllAirports() {
                let allAirportsInfo = this.allAirportsInfo,
                    words = [],
                    dealedAirports = [];
                for (let i = 0; i < allAirportsInfo.length; i++) {
                    if (words.indexOf(allAirportsInfo[i].pinYin.substr(0,1).toUpperCase()) == -1) {
                        words.push(allAirportsInfo[i].pinYin.substr(0,1).toUpperCase());
                    }
                };
                words = words.sort();
                this.firstLetters = words;

                for (let a = 0; a < words.length; a++) {
                    var obj = {
                        firstLetter: words[a],
                        airports: []
                    }
                    for (let b = 0; b < allAirportsInfo.length; b++) {
                        if (words[a] == allAirportsInfo[b].pinYin.substr(0,1).toUpperCase()) {
                            obj.airports.push(allAirportsInfo[b]);
                        }
                    }
                    dealedAirports.push(obj);
                }
                this.showAirportsInfo = dealedAirports;
            },
            //获取input的聚焦失焦值
            getInputState(bool){
                this.isFocus = bool;
            },
            getInput(val) {
                if (val != '') {
                    let allAirportsInfo = this.allAirportsInfo,
                        filterAirports = [];
                    for (let i = 0; i < allAirportsInfo.length; i++) {
                        if (allAirportsInfo[i].pinYin.indexOf(val.toUpperCase()) == 0 || allAirportsInfo[i].name.indexOf(val) == 0 || allAirportsInfo[i].city.name.indexOf(val) == 0) {
                            filterAirports.push(allAirportsInfo[i]);
                        }
                    };
                    this.filterAirports = filterAirports;
                } else {
                    this.filterAirports = [];
                }
            },
            goAnchor(selector){//字母索引跳转函数
                // let anchor = this.$el.querySelector(selector);
                // let scrollHeight = anchor.offsetTop;
                // setTimeout(() => {
                //     document.querySelector('.city_list_container').scrollTop = scrollHeight;
                // },50);
                document.getElementById(String(selector).substring(1)).scrollIntoView();
                return false;
            },
            chooseAirport(item) {
                let obj = {
                    key: 'travelHelperChosenAirport',
                    val: item
                };
                try{
                    this.initData(obj);
                }catch(e){}
                this.$router.go(-1);
            },
        },
        created() {
            this.dealAllAirports();
        },
        mounted(){
            
        }
    }
</script>

<style lang="scss" scoped>
    @import '../../style/mixin';
     .city_container {
      @include wh(100%,100%);
      position: relative;
      padding-top: 1rem;
      box-sizing: border-box;
      .firstLetter_container {
        width: .6rem;
        position: absolute;
        right: 0;
        top: 1.1rem;
        z-index: 10;
        > a {
            display: block;
            text-align: center;
            font-size: .2rem;
            color: #666;
            margin-top: .1rem;
        }
      }
      .city_list_container {
        @include heightByAbsolute(1rem,0);
        width: 100%;
        padding: 0 .2rem;
        box-sizing: border-box;
        z-index: 1;
        background: #fff;
        overflow-x: hidden;
        overflow-y: scroll;
        -webkit-overflow-scrolling: touch;
        .square_item {
            width: 30%;
            height: .8rem;
            //border: 1px solid #ddd;
            @include bottomline();
            border-radius: .1rem;
        }
        .located{
            @include sc(.2rem,#666)
        }
      }
      .filter_container {
        width: 100%;
        position: absolute;
        top: 1rem;
        left: 0;
        bottom: 0;
        overflow-x: hidden;
        overflow-y: scroll;
        background: #fff;
        z-index: 11;
        padding-left: .2rem;
        box-sizing: border-box;
      }
      .city_item {
        width: 97%;
        height: .88rem;
        line-height: .88rem;
        // border-bottom: 1px solid #ddd;
        @include bottomline();
      }
    }  
</style>
