 <template>
    <div class="alet_container">
	    <section class="tip_text_container">
            <div class="tip_title xy_flex" v-if="title != ''">{{title}}</div>
            <div class="tip_text xy_flex" v-html="tipContent">
            </div>
            <div class="click_button_double y_flex" :class="{'click_button_single':rightButton == ''}" v-if="leftButton != '' || rightButton != ''">
                <div class="xy_flex" @click="closeTip">{{leftButton}}</div>
                <div class="xy_flex" v-if="rightButton != ''" @click="rightHandler">{{rightButton}}</div>
            </div>
        </section>
    </div>
</template>

<script>
    export default {
    	data(){
            return{
                
            }
        },
        mounted(){
            
        },
        props: {
            'title': {
                type: String,
                default: ''
            },
            'tipContent': {
                type: String,
            },
            'leftButton': {
                type: String,
                default: '知道了'
            },
            'rightButton': {
                type: String,
                default: ''
            }
        },
        methods: {
            closeTip() {
                this.$emit('closeAlert');
            },
            rightHandler() {
                this.$emit('rightHandler');
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import '../../style/mixin';
    .alet_container{
    	position: absolute;
    	top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 100;
        background: rgba(0,0,0,.6);
        .tip_text_container{
            @include center;
            width: 5.4rem;
            height: auto;
            background: #fff;
            @include borderRadius(.28rem);
            .tip_title {
                @include sc(.3rem,#333);
                font-weight: 600;
                padding-top: .2rem;
            }
            .tip_text {
                line-height: .5rem;
                padding: .3rem .2rem .3rem;
                box-sizing: border-box;
                color: #666;
                text-align: center;
            }
            .click_button_double {
                width: 100%;
                height: .9rem;
                font-size: .32rem;
                border-top: 1px solid #ddd;
                > div {
                    @include wh(50%,inherit);
                    color: #FF8800;
                }
                > div:first-child {
                    border-right: 1px solid #ddd;
                    color: #999;
                }
            }
            .click_button_single {
                > div {
                    @include wh(100%,inherit);
                    color: #FF8800 !important;
                }
                > div:first-child {
                    border-right: none;
                }
            }
        }
    }
    
</style>

<!-- <alert-tip :title="title" v-show="showTip" @closeAlert="showTip = false"></alert-tip> 
title：弹框标题，非必传
tipContent：弹框内容，必传
leftButton：左边按钮，非必传
rightButton：右边按钮，非必传

-->