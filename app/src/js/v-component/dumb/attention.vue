<template>
<g-popup :show='popShow' :closeByShadowClicking='true' :shadow='true' class='loading-popup'>
    <div class="attention">aa</div>
</g-popup>
</template>
<script>
export default {
    data() {
        return {
        }
    },
    props: {
        popShow: true,
    }
}
</script>
<style lang="scss" scoped>
    .attention {
        position: absolute;
        top: 100px;
        width: 100%;
    }
</style>
