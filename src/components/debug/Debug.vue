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

    import { mapActions, mapState } from 'vuex';

    export default {
        name: 'debug',

        beforeMount: function () {

        },

        computed: {
            ...mapState('debug', [
                'isDebugMode'
            ]),

            buttonClassName: function () {
                return cls('button is-small is-success is-outlined', {
                    'is-inverted': this.isDebugMode
                });
            }
        },

        methods: {
            ...mapActions('debug', [
                'enableDebugMode',
                'disableDebugMode'
            ]),

            toggleDebugMode: function () {
                if (this.isDebugMode) {
                    this.disableDebugMode();
                } else {
                    this.enableDebugMode();
                }
            }
        }
    };
</script>
