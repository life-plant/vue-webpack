<template>
    <div class="game">
        <board :stage='mileage' :pageType='pageType' :getRewarded='gameData.is_award' :lshelp='!gameData.is_guide'></board>
        <person :stage='mileage'></person>
        <div class="cow"></div>
        <div class="user-info">
            <div class="avatar"><img :src="gameData.act_head_img"></div>
            <div class="username">{{gameData.act_user_name}}</div>
        </div>
        <pBtn :stage='mileage' @pBtnAction='pBtnAction'></pBtn>
        <btn :stage='mileage' :pageType='pageType' :getRewarded='gameData.is_award' :isGuide='gameData.is_guide' @btnAction="btnAction"></btn>
        <div class="btn-group">
            <div class="btn-xinyun" @click="pop(1, 2)"></div>
            <div class="btn-regular" @click="pop(1, 1)"></div>
            <div class="btn-rank" @click="rankPop" v-if="showRank" ></div>
            <div class="btn-jump-scene" @click="jumpScene"  v-if="pageType == 1">
                回顾场景1
            </div>
        </div>
        <popWrapper :popType='popData.popType' :subPopType='popData.subPopType' :cardNum='popData.cardNum' :rankList='helpList' @hide='hideWrraper' @hasSubWinData='hasSubWinData' @popMsg='popMsg'></popWrapper>
    </div>
</template>
<script>
import utils from 'common/util';
import btn from 'v-component/smart/btn.vue';
import pBtn from 'v-component/smart/press-btn.vue';
import person from 'v-component/smart/person.vue';
import board from 'v-component/smart/board.vue';
import popWrapper from 'v-component/smart/pop-wrapper.vue';
import MShare from "mfex-core/lib/mshare";
import buildUtil from 'build-util';


export default {
    data() {
        return {
            pageType: parseInt(this.$route.params.id), // 1表示游戏发起人页，2表示助力页
            popData: {
                popType: 0,
                subPopType: 0,
                cardNum: 0,
            },
            uid: this.$route.query.uid,
            permitClick: true,
            mileage: 0,
            showRank: false,
            gameData: {
                // act_uid: 79096598,
                // act_user_name: "tret34",
                // act_head_img: "http://avatar.mama.cn/060/31/91/97_avatar_middle.jpg?201843",
                // login_uid: 60319197,
                // login_uname: "Fanfanmog",
                // mileage: 0, // 阶段
                // is_login_routine: false,
                // is_award: false,
                // is_guide: true, // 判断登录用户是否还有资格为她护航 ,
                // is_end: true
            },
            helpList: new Array(),
        }
    },
    components: {
        btn,
        pBtn,
        person,
        board,
        popWrapper,
    },
    created() {
        this.initPage();
    },
    methods: {
        initPage() {
            // 游戏页
            // if (utils.checkLogin()) {
                if (this.pageType == 1) {
                    // 游戏页-发起者视觉
                    this.initData({})
                } else if (this.pageType == 2){
                    this.initData({uid: this.uid})
                } else {
                    this.$router.push({
                        path: '/fail',
                    })
               // }
            }
        },
        rankPop() {
            if (this.helpList.length == 0) {
                if (this.pageType == 2) {
                    this.pop(2, 4)
                } else {
                    this.pop(2, 3)
                }
            } else {
                this.pop(4, 0)
            }
        },
        btnAction() {
            if (this.pageType == 1){
                if (this.mileage == 0) {
                    this.pop(2, 3);
                } else if (this.mileage > 0 && this.gameData.mileage < 5) {
                    this.pop(2, 2);
                } else if (this.mileage == 5) {
                    if (this.gameData.is_award) {
                        // 未抽奖
                        this.pop(2, 1);
                    } else {
                        // 已抽奖
                        this.pop(3, 1);
                    }
                }
            } else if (this.pageType == 2) {
                if (this.gameData.is_guide && this.mileage != 5) {
                    // 有资格助力 去助力
                    this.toHelp()
                } else {
                    var commonData = this.$store.state.common.commonData;
                    if (commonData.initiator_status == 1) {
                        // 已参加活动
                        this.jumpGame1()
                    } else if (commonData.initiator_status == 2) {
                        // 未参加活动
                        this.$router.push({
                            path: '/',
                        })
                    }
                }
            }
        },
        jumpGame1(){
            // 不刷新页面跳转自个儿页面
            this.pageType = 1;
            this.$router.push({
                path: '/game/1',
            })
            this.initPage();
        },
        pBtnAction(value) {
            this.pop(5, value);
        },
        pop(type, subType, cardNum){
            this.popData.popType = type;
            this.popData.subPopType = subType;
            this.popData.cardNum = cardNum;
        },
        jumpScene() {
            this.$router.push({
                path: '/',
            })
        },
        popMsg(msg) {
            this.$emit('popMsg', {
                text: msg,
            })
        },
        hideWrraper() {
            this.popData.popType = 0;
        },
        hasSubWinData() {
            // 提交抽奖信息成功后, 更新数据;
            this.hideWrraper();
            this.initData({});
            this.popMsg('提交成功');
        },
        initData(data) {
            this.initCommon().then((code)=>{
                if (code == 0) {
                    // 获得数据
                    this.gameData = this.$store.state.game.gameData;
                    this.mileage = parseInt(this.gameData.mileage);
                    if (this.gameData.is_login_routine && this.pageType == 2) {
                        this.jumpGame1();
                    }
                    if (this.pageType == 1){
                        const MSHARE_CONFIG = {
                            title: `${this.gameData.act_user_name}正在参与守护孕程之旅，pick尊贵孕爱好礼！`,
                            desc: 'Hi，我的孕程之旅开始啦，快来助我赢孕爱礼盒吧，你也可以参与领奖哟~~',
                            link: `http://act.mama.cn/subject/index-id-pregnancy.html#/game/2?uid=${this.gameData.login_uid}`,
                            imgUrl: buildUtil.assetsURL('img/wxshare.jpg'),
                        };
                        new MShare(MSHARE_CONFIG);
                    }
                    this.getHelpList({uid: this.gameData.act_uid});
                } else if (code == 6010403){
                    // 未发起活动 去发起
                    this.toInvoke();
                } else if (code == 10002){
                    // 缺少参数，当前用户未登录
                    utils.checkLogin(true);
                }
            }).catch(() => {
                // this.$emit('loadShow', -1)
            });
        },
        initCommon() {
            return new Promise((resolve, reject) => {
                $.get({
                    url: config.API.getCommon,
                }).then(res => {
                    if (res.data.code == 0) {
                        commit(types.COMMON.SET_DATA, res.data.data);
                        resolve();
                    } else {
                        reject(res.data.msg);
                    }
                }).catch(err => {
                    reject(-1);
                });
            });
        },
        toInvoke() {
            this.$store.dispatch('game/toInvoke').then((respData)=> {
                if (respData.code == 0) {
                    this.initData({})
                } else if (respData.code == 11001) {
                    // 未登录
                    utils.checkLogin(true);
                } else {
                    this.popMsg(respData.msg);
                }
            })
        },
        toHelp() {
            this.$store.dispatch('game/toHelp', {uid: this.uid}).then((respData)=> {
                if (respData.code == 0) {
                    if (respData.data.card_num > 0) {
                        // 助力成功 弹出助力成功的窗
                        this.pop(6, 1, respData.data.card_num);
                        this.initData({uid: this.uid});
                    } else if (respData.data.card_num == 0){
                        // 助力失败
                        this.pop(6, 2, respData.data.card_num);
                        this.initData({uid: this.uid});
                    }
                } else if (respData.code == 11001) {
                    // 未登录
                    utils.checkLogin(true);
                }
            }).catch((e) => {
                if (e.msg) {
                    this.popMsg(e.msg);
                }
            });
        },
        getHelpList(data) {
            this.$store.dispatch('game/getHelpList', data).then((respData)=> {
                if (respData.code == 0) {
                    this.helpList = respData.data.list;
                    this.showRank = true;
                } else if (respData.code == 11001) {
                    // 未登录
                    utils.checkLogin(true);
                }
            })
        }
    },
}
</script>
<style lang="scss" scoped>
@import '~scss/vue';
.game {
    height: 100%;
    height: 100vh;
    min-height: 1185px;
    background: assetsURL('img/game-bg.png') no-repeat;
}
.cow {
    @include location-item(132px, 87px, 896px, 12px);
    background: assetsURL('img/cow.png') no-repeat;
}
.user-info {
    display: flex;
    align-items: center;
    @include location-item(219px, 68px, 8px, 458px);
    .avatar {
        width: 68px;
        height: 68px;
        border-radius: 50%;
        background: assetsURL('img/avatar-bg-2.png') no-repeat;
        overflow: hidden;
        img {
            width: 100%;
            height: 100%;
            padding: 6px;
            border-radius: 50%;
        }
    }

    .username {
        width: 145px;
        color: #fff;
        display: inline-block;
        @include ellipsis;
        vertical-align: top;
        max-width: 162px;
        font-size: 26px;
        margin-left: 5px;
    }
}
.btn-group {
    .btn-xinyun {
        @include location-item(125px, 96px, 833px, 606px);
        background: assetsURL('img/btn-xinyun.png') no-repeat;
    }
    .btn-regular {
        @include location-item(128px, 96px, 944px, 613px);
        background: assetsURL('img/btn-regular.png') no-repeat;
    }
    .btn-rank {
        @include location-item(130px, 96px, 1060px, 606px);
        background: assetsURL('img/btn-rank.png') no-repeat;
    }
    .btn-jump-scene {
        @include location-item(150px, 50px, 1129px, 15px);
        line-height: 47px;
        font-size: 28px;
        background: rgba(0, 0, 0, 0.5);
        color: #fff;
        text-align: center;
        border-radius: 25px;
    }
}
</style>
