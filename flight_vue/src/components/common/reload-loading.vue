 <template>
    <div class="reload_loading xy_flex">
        <div class="loading_http_container y_flex">
            <div class="loading_text">数据已失效，正努力获取最新数据</div>
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
    .reload_loading {
        width: 100%;
        height: 100%;
        position: fixed;
        top: 0;
        left: 0;
        background: rgba(0,0,0,0);
        z-index: 100;
        .loading_http_container {
            width: 5rem;
            height: 1rem;
            padding: .15rem .15rem;
            box-sizing: border-box;
            @include borderRadius(.1rem);
            background: rgba(0,0,0,.5);
            position: relative;
            .loading_text {
                color: #fff;
                margin-left: .1rem;
            }
        }
    }
</style>
