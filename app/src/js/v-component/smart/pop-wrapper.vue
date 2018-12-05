<template>
    <g-popup :show='popType>0' :closeByShadowClicking='true' :shadow='true' :class="'general-popup general-popup-'+popType" @hide='hideWrraper'>
        <div :class="'pop-'+popType+' pop-'+popType+'-'+subPopType" v-if="popType == 1 || popType == 2 || popType == 5 || popType == 6">
            <div class="close-btn" @click="hideWrraper"></div>
            <div class="arrow" v-if="popType == 2"></div>
            <div class="scroll-box">
                <img :src='popImg'>
                <div class="stage-text" v-if="popType == 6 && subPopType == 1">
                    超给力~<br>
                    感谢你助我进阶<span>{{stageText}}</span><br>
                    你也来参加，一起赢取<br>
                    <span>海普诺凯1897孕爱礼盒</span>吧！
                </div>
            </div>
        </div>
        <!-- <div :class="'pop-'+popType" v-if="popType == 2 || popType == 5">
            <div class="close-btn" @click="hideWrraper"></div>
            <div class="scroll-box">
                <img :src='popImg'>
            </div>
        </div> -->
        <div :class="'pop-3'" v-if="popType == 3">
            <div class="close-btn" @click="hideWrraper"></div>
            <div class="scroll-box">
                <form>
                    <input v-model='winData.realName' placeholder="请输入姓名"/>
                    <input v-model='winData.phone' placeholder="请输入电话"/>
                    <textarea v-model='winData.address' placeholder="请输入地址"></textarea>
                </form>
                <div class="submit-btn" @click='toSubWinData'></div>
            </div>
        </div>
        <div :class="'pop-4'" v-if="popType == 4">
            <div class="close-btn" @click="hideWrraper"></div>
            <div class="scroll-box">
                <div class="rank-item" v-for="(item, index) in rankList">
                    <div class="avatar"><img :src="item.head_img"></div>
                    <div class="rank-text"><span class='username'>{{item.friend_uname}}</span><span class="text-2">为好友助力护航</span></div>
                </div>
            </div>
        </div>
        <div :class="'pop-7'" v-if="popType == 7">
            <div class="close-btn" @click="hideWrraper"></div>
            <div class="scroll-box" @scroll="loadEmit($event)">
                <div class="inside-box" ref='insideBox'>
                    <div class="rank-item" v-for="(item, index) in winResult">
                        <div class="name">{{item.user_name}}</div>
                        <div class=""><span class='username'>{{item.phone}}</span></div>
                    </div>
                    <div class="load-more">{{permitQuery?'下拉加载更多':''}}</div>
                </div>
            </div>
        </div>
    </g-popup>
</template>
<script>
import buildUtil from 'build-util';
import utils from 'common/util';
export default {
    data() {
        return {
            // rankList: [
            //     {
            //         avatar: '//10.254.254.1:5334/asset/img/close-btn.png?v=NXgU3NW',
            //         username: 'username'
            //     },
            // ],
            // winResult: [
            //     {
            //         user_name: 'user',
            //         phone: 15521141204
            //     }, {
            //         user_name: 'usernamemmmmmmmm',
            //         phone: 15521141204
            //     }
            // ],
            winData: {
                realName: '',
                phone: '',
                address: '',
            }
        }
    },
    props: {
        popType: {
            type: Number,
            default: 0,
        },
        subPopType: {
            type: Number,
            default: 0,
        },
        cardNum: {
            type: Number,
            default: 0,
        },
        rankList: {
            type: Array,
            default: function () {
                return []
            },
        },
        winResult: {
            type: Array,
            default: function () {
                return []
            },
        },
        permitQuery: {
            type: Boolean,
            default: true,
        }
    },
    computed: {
        popImg() {
            if (this.popType == 1) {
                // 规则滚动类弹窗
                switch (this.subPopType) {
                    case 1:
                        return buildUtil.assetsURL('img/regular-content.png');
                    case 2:
                        return buildUtil.assetsURL('img/xinyun-content.png');
                    default:
                        return '';
                }
            } if (this.popType == 2) {
                // 发起人-点击按钮弹窗
                switch (this.subPopType) {
                    case 1:
                        return buildUtil.assetsURL('img/pop-2-img-1.png'); // 恭喜成功获得礼盒
                    case 2:
                        return buildUtil.assetsURL('img/pop-2-img-2.png'); // 邀请好友护航
                    case 3:
                        return buildUtil.assetsURL('img/pop-2-img-3.png'); // 还没有好友护航，邀请
                    case 4:
                        return buildUtil.assetsURL('img/pop-2-img-4.png'); // 还没有好友护航，好友视角
                    default:
                        return '';
                }
            } if (this.popType == 5) {
                // 点击孕期阶段按钮弹窗
                switch (this.subPopType) {
                    case 1:
                        return buildUtil.assetsURL('img/pop-5-1.png'); // 孕早期
                    case 2:
                        return buildUtil.assetsURL('img/pop-5-2.png'); // 孕早中期
                    case 3:
                        return buildUtil.assetsURL('img/pop-5-3.png'); // 孕中期
                    case 4:
                        return buildUtil.assetsURL('img/pop-5-4.png'); // 孕中晚期
                    case 5:
                        return buildUtil.assetsURL('img/pop-5-5.png'); // 孕晚期
                    default:
                        return '';
                }
            } if (this.popType == 6) {
                // 好友点击按钮弹窗, 根据cardNum来反应
                switch (this.subPopType) {
                    case 1:
                        return buildUtil.assetsURL('img/pop-6-1.png'); // 助力成功
                    case 2:
                        return buildUtil.assetsURL('img/pop-6-2.png'); // 助力失败
                }
            }
            return '';
        },
        stageText() {
            if (this.popType == 6 && this.subPopType == 1) {
                switch (this.cardNum) {
                    case 1:
                        return '孕早期'; // 孕早期
                    case 2:
                        return '孕早中期'; // 孕早中期
                    case 3:
                        return '孕中期'; // 孕中期
                    case 4:
                        return '孕中晚期'; // 孕中晚期
                    case 5:
                        return '孕晚期'; // 孕晚期
                    default:
                        return '';
                }
            }
            return '';
        }
    },
    methods: {
        hideWrraper() {
            this.$emit('hide');
        },
        toSubWinData() {
            // action
            if (this.getValid()){
                this.$store.dispatch('game/toSubWinData', this.winData).then((respData)=> {
                    if (respData.code == 0) {
                        this.$emit('hasSubWinData');
                    } else if (respData.code == 11001) {
                        // 未登录
                        utils.checkLogin(true);
                    } else {
                        // 弹出错误信息
                        this.$emit('popMsg', {
                            text: respData.msg
                        })
                    }
                }).catch((e) => {
                    if (e.msg) {
                        this.popMsg(e.msg);
                    }
                });
            }
        },
        getValid() {
            if (this.winData.realName.trim() == '' || this.winData.phone.trim() == '' || this.winData.address.trim() == '') {
                this.$emit('popMsg', '您还有信息未完善<br>请完善所有资料哦~')
                return false;
            }
            if (!/^1[345789]\d{9}$/.test(this.winData.phone)) {
                this.$emit('popMsg', '您输入的手机号格式<br>不正确，请重新输入~')
                return false;
            }
            return true;
        },
        loadEmit(event) {
            var boxHeight = 496;
            var insideBoxHeight = parseInt(window.getComputedStyle(this.$refs.insideBox).height);
            var scrollHeight = event.target.scrollTop;
            if (insideBoxHeight - scrollHeight <= boxHeight) {
                this.$emit('loadEmit');
            }
        }
    },
}
</script>
<style lang="scss">
@import '~scss/vue';
.general-popup {
    &.general-popup-3 {
        position: absolute !important;
    }
    .close-btn {
        @include location-item(92px, 91px, 0, auto);
        background: assetsURL('img/close-btn.png') no-repeat;
    }
    
    .pop-1,
    .pop-7 {
        @include location-item(658px, 972px, 35px, 50%);
        transform: translateX(-50%);
        .close-btn {
            top: 102px;
            right: -13px;
        }
        .scroll-box {
            width: 553px;
            height: 702px;
            margin: 239px auto 0;
            overflow-y: scroll;
            text-align: center;
        }
    }
    .pop-1 {
        .scroll-box {
            width: 575px;
            img {
                padding-bottom: 68px;
            }
        }
    }
    .pop-1-1 {
        background: assetsURL('img/pop-1-1.png') no-repeat;
    }
    .pop-1-2 {
        background: assetsURL('img/pop-1-2.png') no-repeat;
    }
    .pop-7 {
        background: assetsURL('img/pop-7.png') no-repeat;
        .scroll-box {
            margin-top: 372px;
            height: 496px;
        }

        .rank-item {
            display: flex;
            align-items: center;
            width: 448px;
            margin: 0 auto 40px;
            font-size: 26px;
            color: #1ba5eb;

            .name {
                width: 188px;
                overflow: hidden;
                text-overflow: ellipsis;
                margin-right: 87px;
                text-align: left;
            }
        }

        .load-more {
            color: #1ba5eb;
            font-size: 26px;
            padding-bottom: 40px;
        }
    }

    .pop-2,
    .pop-5,
    .pop-6 {
        @include location-item(658px, auto, 247px, 50%);
        transform: translateX(-50%);
        .close-btn {
            top: -13px;
            right: -13px;
        }
        .scroll-box {
            width: 658px;
            margin: 0 auto;
            text-align: center;
        }
    }
    .pop-2 {
        .arrow {
            @include location-item(60px, 83px, -162px, auto);
            right: -10px;
            background: assetsURL('img/arrow.png') no-repeat;
        }   
    }
    .pop-5 {
        .close-btn {
            top: 60px;
        }
    }
    .pop-6 {
        .stage-text {
            position: absolute;
            text-align: center;
            width: 100%;
            font-size: 40px;
            top: 69px;
            left: 0;
            line-height: 59px;
            font-weight: bold;
            color: #0bb8ee;
            text-shadow: 1px 1px 3px #fff;
            span {
                color: #b93636;
            }
        }
    }
    
    .pop-3 {
        @include location-item(658px, 1032px, 35px, 50%);
        transform: translateX(-50%);
        background: assetsURL('img/pop-3.png') no-repeat;
        .close-btn {
            top: 102px;
            right: -13px;
        }
        .scroll-box {
            width: 658px;
            margin: 380px auto 0;
            text-align: center;
            form {
                padding: 0 100px 0 180px;
            }
            input,
            textarea {
                display: block;
                width: 383px;
                height: 90px;
                border: 10px solid transparent;
                margin-bottom: 28px;
                background: transparent;
                font-size: 28px;
                line-height: 38px;
                color: #69c8f9;
            }
            textarea {
                height: 166px;
            }
            .submit-btn {
                width: 332px;
                height: 118px;
                margin: 124px auto 0;
            }
        }

    }

    .pop-4 {
        @include location-item(658px, 767px, 210px, 50%);
        transform: translateX(-50%);
        background: assetsURL('img/pop-4.png') no-repeat;
        .close-btn {
            top: -13px;
            right: -13px;
        }
        .scroll-box {
            width: 553px;
            height: 560px;
            margin: 134px auto 0;
            overflow-y: scroll;
            text-align: center;
        }

        .rank-item {
            display: flex;
            align-items: center;
            width: 525px;
            margin: 0 auto;
            .avatar {
                width: 104px;
                height: 104px;
                border-radius: 50%;
                background: assetsURL('img/avatar-bg.png') no-repeat;
                overflow: hidden;
                margin-bottom: 9px;
                img {
                    width: 100%;
                    height: 100%;
                    padding: 8px;
                    border-radius: 50%;
                }
            }

            .rank-text {
                font-size: 28px;
                background: assetsURL('img/pop-4-text.png') no-repeat;
                width: 399px;
                height: 89px;
                line-height: 89px;
                margin-left: 15px;
                .username {
                    color: #80af2a;
                    display: inline-block;
                    @include ellipsis;
                    vertical-align: top;
                    max-width: 162px;
                }
                .text-2 {
                    color: #1ba5eb;
                    display: inline-block;
                    width: 197px;
                    vertical-align: top;
                }
                
            }
        }
    }
    .g-popup__shadow {
        background: rgba(0, 0, 0, .6);
    }
}
</style>
