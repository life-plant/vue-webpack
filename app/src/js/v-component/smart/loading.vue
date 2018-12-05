<template>
<g-popup :show='true' :closeByShadowClicking='false' :shadow='false' class='loading-popup'>
    <div class='loading'>
        <!-- <div class='loading-person'>
            <div></div>
        </div> -->
        <div class='loading-bar'>
            <div :style="{left: load * 488 - 488 + 'px'}"></div>
        </div>
        <div class='loading-title'></div>
    </div>
</g-popup>
</template>

<script>
export default {
    props: {
        load: {
            type: Number,
            default: 0
        }
    }
};
</script>

<style lang="scss">
    @import '~scss/vue';
    .loading {
        position: absolute;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        top: 715px;
        left: 50%;
        transform: translate(-50%, -50%);
        &-popup {
            background: #d7f3ff assetsURL('img/loading.png') no-repeat center 288px;
        }
        &-person {
            position: relative;
            width: 95px;
            height: 182px;
            background: assetsURL('img/loading-person-01.png') no-repeat;
            z-index: 2;
            div {
                position: absolute;
                top: -20px;
                left: 50px;
                width: 62px;
                height: 105px;
                background: assetsURL('img/loading-person-02.png') no-repeat;
                animation: shakeIt linear 1s infinite;
                transform-origin: 0 100%;
                z-index: 1;
            }
        }
        &-bar {
            position: relative;
            width: 490px;
            height: 54px;
            background: #fff;
            box-sizing: content-box;
            box-shadow: 0 0 0 3px #80d2fd;
            border: 3px solid #fff;
            border-radius: 30px;
            overflow: hidden;
            box-sizing: border-box;
            div {
                position: absolute;
                width: 488px;
                height: 54px;
                border-radius: 25px;
                background: linear-gradient(to top, #7fd2fd, #92d7fb);
                transition: .2s;
                left: 0;
            }
        }
        &-title {
            margin-top: 25px;
            width: 284px;
            height: 93px;
            background: assetsURL('img/loading.gif') no-repeat;
        }
    }
</style>
