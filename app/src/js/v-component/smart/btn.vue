<template>
    <div :class="'btn-'+btnNum" @click="clickBtn"></div>
</template>
<script>
    export default {
        data() {
            return {
            }
        },
        props: {
            pageType: {
                type: Number,
                default: 0,
            },
            stage: {
                type: Number,
                stage: 0,
            },
            getRewarded: {
                type: Boolean,
                default: false,
            },
            isGuide: {
                type: Boolean,
                default: true,
            },
        },
        computed: {
            // 游戏页： stage=0 邀请好友护航-6；  stage=1~4 邀请好友参与-5； stage=5&&未领取奖品 领取奖品-2； stage=5&&已领取奖品 邀请好友参与-5
            // 助力页： 未助力 为TA护航-4；  已助力 马上参加-3
            btnNum() {
                if (this.pageType == 1) {
                    if (this.stage >= 0 && this.stage <= 4) {
                        return 6;
                    } else if (this.stage == 5){
                        return this.getRewarded ? 5 : 2;
                    } else {
                        console.log('get-btnNum-err');
                    }
                } else if (this.pageType == 2) {
                    if (this.isGuide && this.stage != 5) {
                        return 4;
                    } else {
                        return 3;
                    }
                } else {
                    return 1;
                }
            }
        },
        methods: {
            clickBtn() {
                this.$emit('btnAction');
            }
        }

    }
</script>
<style lang="scss">
@import '~scss/vue';
.btn-1 {
    @include location-item(455px, 146px, 1002px, 152px);
    background: assetsURL('img/css-sprites.png') no-repeat;
    background-position: center -10px;
    opacity: 0;
}
.btn-2 {
    @include location-item(455px, 146px, 1002px, 152px);
    background: assetsURL('img/css-sprites.png') no-repeat;
    background-position: center -176px;
}
.btn-3 {
    @include location-item(455px, 146px, 1002px, 152px);
    background: assetsURL('img/css-sprites.png') no-repeat;
    background-position: center -342px;
}
.btn-4 {
    @include location-item(455px, 146px, 1002px, 152px);
    background: assetsURL('img/css-sprites.png') no-repeat;
    background-position: center -508px;
}
.btn-5 {
    @include location-item(455px, 146px, 1002px, 152px);
    background: assetsURL('img/css-sprites.png') no-repeat;
    background-position: center -674px;
}
.btn-6 {
    @include location-item(455px, 146px, 1002px, 152px);
    background: assetsURL('img/css-sprites.png') no-repeat;
    background-position: center -840px;
}
</style>