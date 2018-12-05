<template>
    <div class="empty" v-if='loadStatus'>
        <img class="empty-icon" :src="emptyImg" alt="">
        <span class="text">{{ emptyText }}</span>
        <div @click="reload" class="reload">
            刷新页面
        </div>
    </div>
</template>
<script>
import buildUtil from 'build-util';
export default {
    data() {
        return {
            emptyImg: buildUtil.assetsURL('img/fail.png'),
            emptyText: '网络不佳，检查网络设置后刷新',
        }
    },
    computed: {
        loadStatus() {
            return this.$store.state.common.loadStatus;
        }
    },
    methods: {
        reload() {
            window.location.reload();
        }
    }
}
</script>
<style lang="scss" scoped>
    .empty {
        min-height: 100px;
        line-height: 100px;
        font-size: 24px;
        text-align: center;
        font-size: 32px;
        color: #999;
    }
    .empty-icon {
        margin: 350px auto 30px;
        display: block;
    }
    .reload {
        display: block;
        width: 300px;
        height: 90px;
        font-size: 32px;
        color: #fff;
        line-height: 90px;
        background: linear-gradient(90deg, rgba(244, 222, 192, 1), rgba(238, 193, 160, 1));
        margin: 30px auto;
        border-radius: 6px;
    }
</style>


