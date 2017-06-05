<template>
    <span
        :class="buttonClassName"
        @click="toggleDebugMode"
    >
        <b-icon icon="bug"></b-icon>
    </span>
</template>

<script>
    import cls from 'classnames';

    export default {
        name: 'debug',

        data () {
            return {
                isDebugMode: false
            };
        },

        beforeMount: function () {

        },

        computed: {
            buttonClassName: function () {
                return cls('button is-small is-success is-outlined', {
                    'is-inverted': this.isDebugMode
                });
            }
        },

        methods: {
            toggleDebugMode: function () {
                this.isDebugMode = !this.isDebugMode;
            }
        }
    };
</script>
