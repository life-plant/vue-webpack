<template>
    <transition name="g-popup-transition" duration="0">
        <div class="g-popup" v-show="show">
            <div class="g-popup__shadow" @click="shadowClick" v-if="shadow"></div>
            <div class="g-popup__content">
                <slot>
                    <div class="g-popup__default-slot"></div>
                </slot>
            </div>
        </div>
    </transition>
</template>
<script>
    export default {
        data() {
            return {
                displayLayer: false
            }
        },
        props: {
            show: {
                type: Boolean,
                default: false
            },
            closeByShadowClicking: {
                type: Boolean,
                default: true
            },
            shadow: {
                type: Boolean,
                default: true
            }
        },
        watch: {
            show(after) {
                this.displayLayer = !!after;
            }
        },
        methods: {
            shadowClick() {
                if (this.closeByShadowClicking) {
                    this.hideLayer();
                }
            },
            hideLayer() {
                this.$emit('hide');
            },
            showLayer() {
                this.$emit('show');
            }
        },
        mounted() {
            if (this.show) {
                this.showLayer();
            } else {
                this.hideLayer();
            }
        }
    }
</script>
<style lang="scss">
    .g-popup-transition {
        &-leave-to,
        &-enter {
            opacity: 0;
        }
        &-leave,
        &-enter-to {
            opacity: 1;
        }
        &-leave-active,
        &-enter-active {
            transition: opacity .2s ease;
        }
    }
    .g-popup {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 3000;
        &__default-slot {
            width: 400px;
            height: 200px;
            background: #fff;
        }
        &__shadow {
            position: fixed;
            width: 100%;
            height: 100%;
            top: 0;
            left: 0;
            background: rgba(0, 0, 0, .7);
        }
    }
</style>