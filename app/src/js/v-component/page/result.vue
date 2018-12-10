<template>
    <div class="result">
        11aa
        <div class="user-info">
            <div class="avatar"><img :src="commonData.head_img"></div>
            <div class="username">{{commonData.uname}}</div>
        </div>
        <div class="result-btn" v-if="showResultBtn" @click="seeResult"></div>
        <popWrapper :popType='popData.popType' :subPopType='popData.subPopType' :winResult='winResult' @hide='hideWrraper' @loadEmit='getWinResult' :permitQuery='permitQuery'></popWrapper>
    </div>
</template>
<script>
import utils from 'common/util';
import popWrapper from 'v-component/smart/pop-wrapper.vue';
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
            pageInfo: {
                pageSize: 10,
                page: 1,
            },
            mileage: 0,
            userInfo: {},
            winResult: [],
            showResultBtn: false,
            permitQuery: true,
        }
    },
    props: {
        commonData: {
            type: Object,
            default: function() {
                return {}
            }
        }
    },
    components: {
        popWrapper,
    },
    created() {
        // if (utils.checkLogin()){
            this.getWinResult();
        // }
    },
    methods: {
        hideWrraper() {
            this.popData.popType = 0;
        },
        pop(type, subType, cardNum){
            this.popData.popType = type;
            this.popData.subPopType = subType;
            this.popData.cardNum = cardNum;
        },
        seeResult() {
            this.pop(7);
        },
        getWinResult() {
            if (this.permitQuery) {
                this.getWinPageResult()
            }
        },
        getWinPageResult() {
            this.permitQuery = false;
            this.$store.dispatch('result/getWinResult', this.pageInfo).then((respData)=> {
                if (respData.code == 0) {
                    if (respData.data.list.length > 0) {
                        this.winResult.push(...respData.data.list);
                        this.permitQuery = true;
                    } else {
                        this.permitQuery = false;
                    }
                    if (this.pageInfo.page == 1) {
                        this.showResultBtn = true;
                    }
                    this.pageInfo.page++;
                } else if (respData.code == 11001) {
                    // 未登录
                    // utils.checkLogin(true);
                } else if (respData.code == 6010409) {
                    // 结果未公布
                    this.$emit('popMsg', {
                        text: respData.msg,
                    });
                }
            }).catch((e)=>{
            })
        }
        // getWinPageResult() {
        //     this.$store.dispatch('result/getWinResult').then((respData)=> {
        //         if (respData.code == 0) {
        //             this.winResult = respData.data.list;
        //             this.showResultBtn = true;
        //         } else if (respData.code == 11001) {
        //             // 未登录
        //             utils.checkLogin(true);
        //         } else if (respData.code == 6010409) {
        //             // 结果未公布
        //             this.$emit('popMsg', {
        //                 text: respData.msg,
        //             });
        //         }
        //     }).catch((e)=>{
        //     })
        // }
    }
}
</script>
<style lang="scss" scoped>
@import '~scss/vue';
.result {
    height: 100%;
    height: 100vh;
    min-height: 1185px;
    background: assetsURL('img/result-bg-1.png') no-repeat;

    .result-btn {
        @include location-item(455px, 146px, 996px, 148px);
        background: assetsURL('img/see-result-bg.png') no-repeat;
    }
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

</style>
