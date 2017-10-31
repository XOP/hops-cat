<template>
    <v-toolbar app dark dense class="green darken-1">
        <v-toolbar-title>
            <router-link to="/" tag="span" class="u-cur-pointer">
                <v-avatar size="32px">
                    <img class="logo-img" src="../../assets/images/icon.png" alt="Hops Cat Logo"/>
                </v-avatar>
                <span>Hops Cat</span>
            </router-link>

            <a :href="gitVersionHref" target="_blank" class="u-no-underline u-cur-pointer" :title="'v' + version">
                <v-chip
                    small
                    class="red caption darken-1 white--text u-cur-pointer"
                >
                    {{version}}
                </v-chip>
            </a>

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

    const packageInfo = require('../../../package.json');

    import { GIT_RELEASES_HREF } from '../../constants/system';

    export default {
        name: 'app-header',

        data: function () {
            return {
                version: packageInfo.version,

                showDebug: ALLOW_DEBUG // eslint-disable-line
            };
        },

        beforeMount: function () {
            if (!this.showDebug) {
                this.disableDebugMode();
            }
        },

        computed: {
            ...mapState('user', ['isAuthenticated']),

            gitVersionHref: function () {
                return `${GIT_RELEASES_HREF}/v${this.version}`;
            }
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
    .logo-img {
        filter: invert(100%);
    }
</style>
