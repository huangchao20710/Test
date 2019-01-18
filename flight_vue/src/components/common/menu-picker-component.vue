 <template>
	<div class="menu_picker_container">
        <div class="menu_picker_container_header y_flex between_x_flex">
            <div class="y_flex">取消</div>
            <div class="y_flex">请选择出生日期</div>
            <div class="y_flex">确认</div>
        </div>
        <div class="menu_picker_container_body">
            <div class="view_container"></div>
            <ul class="menuA_wrap">
                <li class="xy_flex menuaA_item" v-for="(item,index) in menuA" :key="index">{{item.val}}</li>
            </ul>
        </div>
	</div>
</template>

<script>
    export default {
    	data(){
            return{
                menuA: [
                    {
                        id: 1,
                        val: 1
                    },
                    {
                        id: 2,
                        val: 2
                    },
                    {
                        id: 3,
                        val: 3
                    },
                    {
                        id: 4,
                        val: 4
                    },
                    {
                        id: 5,
                        val: 5
                    },
                    {
                        id: 6,
                        val: 6
                    },
                    {
                        id: 7,
                        val: 7
                    },
                    {
                        id: 8,
                        val: 8
                    },
                    {
                        id: 9,
                        val: 9
                    }
                ]
            }
        },
        props: [
            
        ],
        mounted(){
        	
        }
    }
</script>

<style lang="scss" scoped>
    @import '../../style/mixin';
    .menu_picker_container {
        @include wh(100%,100%);
        background: #fff;
        position: relative;
        .menu_picker_container_header {
            @include wh(100%,.84rem);
            padding: .16rem;
            box-sizing: border-box;
            background: #f5f5f5;
            > div {
                height: inherit;
                margin: 0 .2rem;
                color: #fe3c71;
            }
            > div:nth-child(2) {
                @include sc(.24rem,#222);
            }
        }
        .menu_picker_container_body {
            @include heightByAbsolute(.84rem,0);
            > ul {
                width: 33%;
                height: 100%;
                overflow-y: scroll;
                .active {
                    font-weight: 400;
                    font-size: .4rem;
                    color: #000;
                }
                .unactive0 {
                    color: rgba(0,0,0,.8);
                    transform: rotateX(0) skewX(5deg);
                }
                .unactive1 {

                }
                .unactive2 {
                    
                }
                .unactive3 {
                    color: rgba(0,0,0,.8);
                    transform: rotateX(20deg) skewX(-5deg);
                }
                .unactive4 {
                    color: rgba(0,0,0,.6);
                    transform: rotateX(30deg) skewX(-10deg);
                }
                .unactive2 {
                    color: rgba(0,0,0,.6);
                    transform: rotateX(40deg) skewX(-15deg) translateX(-.1rem);
                }
                > li {
                    width: 100%;
                    height: .6rem;
                }
            }
            .menuA_wrap {
                
            }
            .view_container {
                position: absolute;
                top: 50%;
                transform: translateY(-50%);
                width: 100%;
                height: .6rem;
                border-top: 1px solid #ddd;
                border-bottom: 1px solid #ddd;
            }
        }
    }
</style>
