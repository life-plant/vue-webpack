<template>
<div class="app">
    <g-loading :load='loadPercent' v-if="loadShow==0"></g-loading>
    <router-view v-show="loadShow==1" @loadShow='changeLoadShow' @popMsg='changePopMsg' :commonData='commonData'></router-view>
    <g-music-component :msrc="musicSrc" className='music'></g-music-component>
    <g-net-err v-if="loadShow==-1"></g-net-err>
    <g-msg v-if="popMsg.show" :msg='popMsg.text' @sureAction='closeMsg'></g-msg>
</div>
</template>
<script>
import buildUtil from 'build-util';
import netErr from 'v-component/smart/net-err.vue';
import createjs from 'preload-js';
import types from 'v-store/mutation-type';
import extend from 'node.extend';
import MShare from "mfex-core/lib/mshare";
import utils from 'common/util';

export default {
    data() {
        return {
            musicSrc: buildUtil.assetsURL('music/music.mp3'),
            loadImgNum: 0,
            loadTotal: 22,
            loadShow: 0,
            popMsg: {
                show: false,
                text: ''
            },
            commonData: {
            }
        };
    },
    computed: {
        loadPercent() {
            let self = this;
            let load = self.loadImgNum;
            return load / self.loadTotal;
        }
    },
    created() {
        const MSHARE_CONFIG = {
            title: '为全孕程护航，守护贵族式孕期旅程！',
            desc: '贵族式孕期旅程开始啦，速来完成进阶赢孕爱礼盒~~',
            link: `http://act.mama.cn/subject/index-id-pregnancy.html#/`,
            imgUrl: buildUtil.assetsURL('img/wxshare.jpg'),
        };
        new MShare(MSHARE_CONFIG);
        this.loadPage();
        this.loadData();
    },
    methods: {
        loadPage() {
            let imgs = [
                'img/avatar-bg-2.png',
                'img/btn-rank.png',
                'img/btn-red.png',
                'img/btn-regular.png',
                'img/btn-xinyun.png',
                'img/btn-yellow.png',
                'img/cow.png',
                'img/css-sprites.png',
                'img/game-bg.png',
                'img/music.png',
                'img/music-close.png',
                'img/p-btn.png',
                'img/p-btn-active.png',
                'img/scene-1.png',
                'img/scene-1-text.png',
                'img/scene-2.png',
                'img/scene-2-text.png',
                'img/scene-3.png',
                'img/scene-3-text.png',
                'img/scene-3-title.png',
                'img/woman.png',
                'img/result-bg-1.png',
            ]
            this.preloadImg(imgs);
        },
        preloadImg(arr) {
            var self = this;
            var images = [];
            arr.forEach(function (item, index) {
                images.push(buildUtil.assetsURL(item));
            })
            var queue = new createjs.LoadQueue(true);
            queue.on("fileload", function() {
                self.loadImgNum++
            }, this);
            queue.on("complete", function() {
                self.loadShow = 1;
            }, this);
            queue.loadManifest(images);
        },
        loadData() {
            var self = this;
            if (this.$route.name == 'gamePage' && this.$route.params.id == 2) {
                // 进入好友参与页 必须登陆
                utils.checkLogin();
            }
            this.$store.dispatch('common/initCommon').then(()=>{
                this.commonData = this.$store.state.common.commonData;
                var commonData = this.commonData;
                if (commonData.act_status == 0 || commonData.act_status == 1) {
                    if (commonData.initiator_status == 1) {
                        // 用户已经参与活动
                        if (this.$route.name == 'indexPage') {
                            // 首页
                            self.$router.push({
                                path: '/game/1',
                            })
                        }
                        // self.$router.push({
                        //     path: '/game/1',
                        //     query: {
                        //         uid: '652345'
                        //     }
                        // })
                    } else if (commonData.initiator_status == 2) {
                        // 用户未参加活动，不能跳game/1
                    } else if (commonData.initiator_status == 0) {
                        // 获取不到登录状态
                        self.$router.push({
                            path: '/',
                        })
                    }
                } else if (commonData.act_status == 2) {
                    // 活动结束进入活动结果页
                    self.$router.push({
                        path: '/result',
                    })
                }
            }).catch(() =>{
                self.loadShow = -1;
            })
        },
        changeLoadShow(value) {
            this.loadShow = value;
        },
        closeMsg() {
            this.popMsg.show = false;
        },
        changePopMsg(data) {
            this.popMsg.show = true;
            this.popMsg = extend(this.popMsg, data);
        }
    }
}
</script>
<style lang="scss" scoped>
    @import '~scss/vue';
    .app {
        height: 100vh;
        min-height: 1185px;
    }
</style>
