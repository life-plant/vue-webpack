<template>
<div>
    <div :class="'person person-'+stage" @click="clickBtn"></div>
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
            clickBtn() {
                this.$emit('btnAction');
            }
        }

    }
</script>
<style lang="scss">
@import '~scss/vue';
.person {
    position: absolute;
    width: 83px;
    height: 305px;
    background-image: assetsURL('img/woman-2.png');
    background-repeat: no-repeat;
}
.person-0 {
    top: 652px;
    left: 58px;
    background-image: assetsURL('img/woman.png');
}
.person-1 {
    top: 678px;
    left: 388px;
}
.person-2 {
    top: 576px;
    left: 630px;
}
.person-3 {
    top: 382px;
    left: 572px;
}
.person-4 {
    top: 402px;
    left: 374px;
}
.person-5 {
    top: 174px;
    left: 208px;
}
</style>