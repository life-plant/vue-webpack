<template>
    <div>
        <swiper :options="swiperOption" id="carrousel" ref="mySwiper" v-if="show">
            <swiper-slide class="slide slide-1">
                <div class="text">
                </div>
                <div class="jump" @click="jumpLast">
                    跳过场景
                </div>
            </swiper-slide>
            <swiper-slide class="slide slide-2">
                <div class="text">
                </div>
                <div class="jump" @click="jumpLast">
                    跳过场景
                </div>
            </swiper-slide>
            <swiper-slide class="slide slide-3">
                <div class="title">
                </div>
                <div class="text">
                </div>
                <btn :btnNum='1' class="btn-toGame" @btnAction="toGame"></btn>
            </swiper-slide>
        </swiper>
    </div>
</template>
<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper';
import buildUtil from 'build-util';
import btn from 'v-component/smart/btn.vue';

export default {
    data() {
        return {
            swiperOption: {
                width: 750,
                autoplay: 4000,
                autoplayDisableOnInteraction: false,
                autoplayStopOnLast: true,
                autoHeight: true,
            },
            indexList: [
                {
                    imgSrc: buildUtil.assetsURL('img/avatar.jpg'),
                }
            ],
            show: false,
        }
    },
    computed: {
        swiper() {
            return this.$refs.mySwiper.swiper;
        }
    },
    components: {
        swiper,
        swiperSlide,
        btn,
    },
    methods: {
        jumpLast() {
            this.swiper.slideTo(2);
        },
        toGame() {
            this.$router.push({
                path: '/game/1',
            })
        }
    },
    mounted() {
        this.show = true;
    },

}
</script>
<style lang="scss" scoped>
@import '~scss/vue';
.slide {
    height: 100%;
    height: 100vh;
    width: 750px;
    min-height: 1185px;
    position: relative;
    .text {
        opacity: 0;
    }
    .jump {
        @include location-item(186px, 50px, 1104px, 544px);
        line-height: 47px;
        font-size: 28px;
        background: rgba(0, 0, 0, 0.5);
        color: #fff;
        text-align: center;
        border-radius: 25px;
    }
    &.swiper-slide-active {
        .text {
            animation: bounceFDown 1s linear 0s 1 forwards;
        }
    }
}
.slide-1 {
    background: assetsURL('img/scene-1.png') no-repeat;
    .text {
        @include location-item(420px, 96px, 1034px, 30px);
        background: assetsURL('img/scene-1-text.png') no-repeat;
    }
}
.slide-2 {
    background: assetsURL('img/scene-2.png') no-repeat;
    .text {
        @include location-item(424px, 99px, 1034px, 30px);
        background: assetsURL('img/scene-2-text.png') no-repeat;
    }
}
.slide-3 {
    background: assetsURL('img/scene-3.png') no-repeat;
    .title {
        @include location-item(496px, 190px, 76px, 142px);
        background: assetsURL('img/scene-3-title.png') no-repeat;
        opacity: 0;
    }
    .text {
        @include location-item(420px, 96px, 876px, 166px);
        background: assetsURL('img/scene-3-text.png') no-repeat;
    }
    &.swiper-slide-active {
        .title {
            animation: bounceFTop 1s linear 0.5s 1 forwards;
        }
        .btn-toGame {
            animation: bounceFDown 1s linear 1s 1 forwards;
        }
    }
    
}
</style>
