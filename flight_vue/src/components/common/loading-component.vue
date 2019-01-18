 <template>
    <div class="loading_container xy_flex">
        <div class="text_container xy_flex" v-show="!jumpLoading">
            <!-- <div class="loadingOut"><img src="//m.lvmama.com/flight/image/loadingNew.gif" alt=""></div> -->
            <!-- <div class="loadingLogo"></div> -->
            <div class="dataLoading">
                <i></i><i></i>
                <span>加载中...</span>
            </div>
        </div>
        <div class="text_container xy_flex"  v-show="jumpLoading">
            <!-- <div class="loadingOut_container">
                <div class="loadingOut"><img src="//m.lvmama.com/flight/image/loading2-animate.png" alt=""></div>
                <div class="loadingLogo"></div>
            </div>
            <div class="loading_text">加载中</div> -->
             <div class="dataLoading">
                <i></i><i></i>
                <span>加载中...</span>
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
        props: {
            jumpLoading: {
                type: Boolean,
                default: false
            }
        },
        components: {
            
        },
        created() {

        },
        mounted(){
            
        },
        methods: {

        },
        activated() {
            
        }
    }
</script>

<style lang="scss" scoped>
    @import '../../style/mixin';
    .loading_container {
        width: 100%;
        height: 100%;
        position: fixed;
        top: 0;
        left: 0;
        background: rgba(0,0,0,0);
        z-index: 100;
        .text_container {
            width: .7rem;
            height: .7rem;
            position: relative;
            .loadingOut {
                width: .7rem;
                height: .7rem;
                // animation: rotateLoading .9s linear infinite;
            }
        }
        .dataLoading{
            position: absolute; top: 50%; left: 50%;
            width:1.5rem;
            height: 1.5rem;
            border-radius: 0.2rem;
            background: rgba(0,0,0,.6);color: #ffffff;
            -webkit-transform: translate(-50%, -50%);
            -moz-transform: translate(-50%, -50%);
            -ms-transform: translate(-50%, -50%);
            -o-transform: translate(-50%, -50%);
            transform: translate(-50%, -50%);
            white-space: nowrap;
            z-index: 900;
        }
        .dataLoading i:nth-of-type(1){
            position: absolute;
            left: 0.4rem;
            width: 0.7rem;
            height: 0.7rem;
            margin-top: 0.1rem;
            background: url('//m.lvmama.com/train/static/img/loading.png') center center no-repeat;
            background-size: 0.4rem;
        }
        .dataLoading i:nth-of-type(2){
            width: .7rem;
            height: .7rem;
            position: absolute;
            left: .4rem;
            top: 0;
            margin-top: 0.1rem;
            background: url('//m.lvmama.com/train/static/img/loading-animate.png') center center no-repeat;
            background-size: .7rem;
            animation: rotateLoading .9s linear infinite;
        }
        .dataLoading span{
            position: absolute;
            bottom: .26rem;
            font-size: 0.26rem;
            left: .25rem;
            color: #fff;
        }
        // .loadingLogo {
        //     width: .42rem;
        //     height: .44rem;
        //     background: url('//m.lvmama.com/flight/image/loading2.png') 0 0 no-repeat;
        //     background-size: 100% 100%;
        //     @include center;
        // }
        .loading_http_container {
            width: 2rem;
            height: 1rem;
            padding: .15rem .15rem;
            box-sizing: border-box;
            @include borderRadius(.1rem);
            background: rgba(0,0,0,.5);
            position: relative;
            .loadingOut_container {
                width: .7rem;
                height: .7rem;
                position: relative;
                .loadingOut {
                    width: .7rem;
                    height: .7rem;
                    animation: rotateLoading .9s linear infinite;
                }
            }
            .loading_text {
                color: #fff;
                margin-left: .1rem;
            }
        }
    }
    @keyframes rotateLoading {
        from {
            transform: rotate(0deg);
        }
        to {
            transform: rotate(360deg);
        }
    }
    @-webkit-keyframes rotateLoading {
        from {
            transform: rotate(0deg);
        }
        to {
            transform: rotate(360deg);
        }
    }
</style>
