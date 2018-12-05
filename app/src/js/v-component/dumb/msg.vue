<template>
    <div class="g-msg">
        <div class="g-msg-text" v-html="msg"></div>
        <div class="g-msg-sure-btn" @click="sureAction">确定</div>
    </div>
</template>
<script>
export default {
    data() {
        return {}
    },
    props: {
        msg: {
            type: String,
            default: '',
        }
    },
    methods: {
        sureAction() {
            this.$emit('sureAction')
        }
    }
}
</script>
<style lang="scss">
@import '~scss/vue';
.g-msg {
    width: 278px;
    @include location-item(370px, auto, 333px, 50%);
    transform: translateX(-50%);
    background: #fff;
    border-radius: 10px;
    padding: 40px 20px 28px;
    z-index: 4000;
    box-shadow: 0 0 23px rgba(0, 0, 0, 0.4);

    &-text {
        font-size: 32px;
        text-align: center;
        margin-bottom: 20px;
    }
    &-sure-btn {
        width: 120px;
        margin: 0 auto;
        text-align: center;
        background: #5ed268;
        height: 48px;
        font-size: 28px;
        line-height: 48px;
        border-radius: 10px;
        color: #fff;
    }
}
</style>

