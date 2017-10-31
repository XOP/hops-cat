<template>
    <span class="input-chip">
        <v-chip
            close
            @input="handleCloseClick"
            :selected="selected"
        >
            <slot>{{ item }}</slot>
        </v-chip>
    </span>
</template>

<script>
    export default {
        name: 'input-chip',

        props: {
            item: {
                type: String,
                required: true
            },

            onClose: {
                type: Function,
                required: true
            },

            selected: {
                type: Boolean,
                default: false
            }
        },

        methods: {
            handleCloseClick: function () {
                this.onClose(this.item);
            }
        }
    };
</script>

<style scoped>
    .input-chip .chip {
        height: 30px;

        margin: 0;
        padding: 0;

        background: transparent;
        box-shadow: none !important;
    }

    .input-chip {
        margin-right: 8px;
    }

    .input-chip .chip--active:not(.chip--disabled),
    .input-chip .chip:focus:not(.chip--disabled) {
        font-weight: bold;
    }
</style>

<style>
    .input-chip .chip .chip__close {
        margin-left: 0;
    }
</style>
