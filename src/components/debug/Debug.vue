<template>
    <v-btn
        @click="toggleDebugMode"
        :outline="isDebugMode"
        icon
    >
        <v-icon>bug_report</v-icon>
    </v-btn>
</template>

<script>
    import { mapActions, mapState } from 'vuex';

    export default {
        name: 'debug',

        computed: {
            ...mapState('debug', [
                'isDebugMode'
            ])
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
