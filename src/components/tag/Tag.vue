<template>
    <span :class="className">
        <span :class="slotClassName">
            <slot></slot>
        </span>
        <a class="tag is-delete" v-if="onClose" @click="onClose"></a>
    </span>
</template>

<script>
    import cls from 'classnames';

    export default {
        name: 'tag',

        props: {
            color: {
                type: String,
                default: 'primary'
            },

            onClose: {
                type: Function
            }
        },

        computed: {
            className: function () {
                return cls('tags', {
                    'has-addons': this.onClose
                });
            },

            slotClassName: function () {
                return cls('tag', {
                    [`is-${this.color}`]: this.color
                });
            }
        }
    };
</script>

<style scoped>

</style>
