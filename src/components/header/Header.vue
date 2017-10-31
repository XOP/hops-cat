<template>
    <v-toolbar app dark dense class="green darken-1">
        <v-toolbar-title>
            <router-link to="/" tag="span" class="u-cur-pointer">
                <span class="image">
                <img src="../../assets/images/icon.png" alt="Hops Cat Logo"/>
                </span>
                <span>Hops Cat</span>
            </router-link>
        </v-toolbar-title>

        <v-spacer></v-spacer>

        <v-toolbar-items class="hidden-sm-and-down">
            <v-btn flat to="/" exact>
                Catalogue
            </v-btn>
            <v-btn flat to="/add-hops">
                Add Hops
            </v-btn>
        </v-toolbar-items>

        <v-btn icon to="/auth">
            <v-icon v-if="!isAuthenticated">account_box</v-icon>
            <v-icon v-if="isAuthenticated">lock_open</v-icon>
        </v-btn>

        <debug-toggle v-if="showDebug"></debug-toggle>
    </v-toolbar>
</template>

<script>
    import { mapActions, mapState } from 'vuex';

    import Debug from '../debug/index';

    export default {
        name: 'app-header',

        data: function () {
            return {
                showDebug: ALLOW_DEBUG // eslint-disable-line
            };
        },

        beforeMount: function () {
            if (!this.showDebug) {
                this.disableDebugMode();
            }
        },

        computed: {
            ...mapState('user', ['isAuthenticated'])
        },

        components: {
            debugToggle: Debug
        },

        methods: {
            ...mapActions('debug', [
                'disableDebugMode'
            ])
        }
    };
</script>

<style scoped>
    .image {
        display: inline-flex;
        width: 16px;
        height: 16px;
    }

    .image img {
        filter: invert(100%);
        width: 100%;
        height: 100%;
    }
</style>
