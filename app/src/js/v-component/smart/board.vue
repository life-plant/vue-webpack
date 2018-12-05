<template>
<div>
    <div class="board" >
        <div class="borad-text" v-html="boardText">
        </div>
    </div>
</div>
    
</template>
<script>
    export default {
        data() {
            return {
                textList: ['5快点击右上角,邀请好友为你护航吧', '5恭喜你成功到达孕程终点', '0快点击右上角,邀请好友为你护航吧']
            }
        },
        props: {
            stage: {
                type: Number,
                default: 0,
            },
            pageType: {
                type: Number,
            },
            getRewarded: {
                type: Boolean,
            },
            lshelp: {
                type: Boolean,
            },
        },
        computed: {
            // 游戏页： stage=0 邀请好友护航-6；  stage=1~4 邀请好友参与-5； stage=5&&未领取奖品 领取奖品-2； stage=5&&已领取奖品 邀请好友参与-5
            // 助力页： 未助力 为TA护航-4；  已助力 马上参加-3
            boardText() {
                console.log()
                if (this.pageType == 1) {
                    if (this.stage == 0) {
                        return '快点击右上<br>角,邀请好友<br>为你护航吧';
                    } else if (this.stage >= 1 && this.stage <= 4) {
                        return '继续邀请好友<br>护航吧，终点<br>就在前方！';
                    } else if (this.stage == 5){
                        return '恭喜你<br>成功到达<br>孕程终点'
                    } else {
                        console.log('get-boardText-err');
                        return '';
                    }
                } else if (this.pageType == 2) {
                    if (this.stage == 5) {
                        return '我已成功领取<br>礼盒啦，快来<br>参加试试'
                    }
                    if (this.lshelp) {
                        return '多谢你的一<br>臂之力，你也<br>来参加吧！';
                    } else {
                        return '点击下方按<br>钮为我的孕<br>程护航吧~';
                    }
                } else {
                    console.log('get-boardText-err');
                    return '';
                }
            },
            // stage1() {
            //     console.log('store', this.$store.state.stage)
            //     return this.$store.state.stage;
            // }
        },
    }
</script>
<style lang="scss">
@import '~scss/vue';
.board {
    @include location-item(198px, 196px, 302px, 365px);
    animation: rotate1 2s linear 0s infinite forwards;
    background: assetsURL('img/board-bg.png') no-repeat;
    position: relative;
    padding: 25px 16px 0;
    transform-origin: center bottom;
    .borad-text {
        width: 150px;
        transform: rotate(6deg);
        font-size: 25px;
        line-height: 32px;
        color: #fff3c3;
        font-weight: bold;
        text-shadow: 1px 1px 5px rgba(0, 0, 0, 0.6);
        text-align: center;
    }
}
</style>