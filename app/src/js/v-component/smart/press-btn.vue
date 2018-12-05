<template>
<div>
    <div :class="'p-btn p-btn-1 ' + (stage>0?'active':'') + (stage==1?' active-curr':'')" @click="clickPBtn(1)"></div>
    <div :class="'p-btn p-btn-2 ' + (stage>1?'active':'') + (stage==2?' active-curr':'')" @click="clickPBtn(2)"></div>
    <div :class="'p-btn p-btn-3 ' + (stage>2?'active':'') + (stage==3?' active-curr':'')" @click="clickPBtn(3)"></div>
    <div :class="'p-btn p-btn-4 ' + (stage>3?'active':'') + (stage==4?' active-curr':'')" @click="clickPBtn(4)"></div>
    <div :class="'p-btn p-btn-5 ' + (stage>4?'active':'') + (stage==5?' active-curr':'')" @click="clickPBtn(5)"></div>
</div>
    
</template>
<script>
    export default {
        data() {
            return {
            }
        },
        props: {
            stage: {
                type: Number,
                default: 0,
            }
        },
        methods: {
            clickPBtn(value) {
                this.$emit('pBtnAction', value);
            }
        }

    }
</script>
<style lang="scss">
@import '~scss/vue';
.p-btn {
    position: absolute;
    width: 116px;
    height: 97px;
    background-image: assetsURL('img/p-btn.png');
    background-repeat: no-repeat;
    &.active {
        background-image: assetsURL('img/p-btn-active.png');
    }
    // &.active:last-child {
    //     animation: bounce 2s linear 0s infinite forwards; // 不兼容手机端
    // }
    &.active-curr {
        animation: bounce 2s linear 0s infinite forwards;
    }
}
.p-btn-1 {
    top: 864px;
    left: 270px;
    background-position: center -10px;
}
.p-btn-2 {
    top: 775px;
    left: 496px;
    background-position: center -127px;
}
.p-btn-3 {
    top: 584px;
    left: 466px;
    background-position: center -244px;
}
.p-btn-4 {
    top: 527px;
    left: 246px;
    background-position: center -361px;
}
.p-btn-5 {
    top: 382px;
    left: 100px;
    background-position: center -478px;
}
</style>