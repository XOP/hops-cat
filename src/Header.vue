<template>
    <v-toolbar dense class="dark green-1">
        <v-toolbar-title>
            <span class="image is-32x32">
                <img src="./assets/images/icon.png" alt="Hops Cat Logo"/>
            </span>
            <span>Hops Cat</span>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items class="hidden-sm-and-down">
            <v-btn flat to="/">Catalogue</v-btn>
            <v-btn flat to="/add-hops">Add Hops</v-btn>
        </v-toolbar-items>
    </v-toolbar>

    <!--<v-toolbar dense dark>-->

        <!--<v-spacer></v-spacer>-->

        <!--<nav class="nav">-->
            <!--<div class="nav-right nav-menu">-->
                <!--<span class="nav-item">-->
                    <!--<router-link to="/">Catalogue</router-link>-->
                <!--</span>-->
                    <!--<span class="nav-item">-->
                    <!--<router-link to="/storage">Storage</router-link>-->
                <!--</span>-->
                    <!--<span  class="nav-item">-->
                    <!--<router-link to="/auth">-->
                        <!--<b-icon v-if="!isAuthenticated" icon="sign-in"></b-icon>-->
                        <!--<b-icon v-if="isAuthenticated" icon="sign-out"></b-icon>-->
                    <!--</router-link>-->
                <!--</span>-->
                    <!--<span class="nav-item">-->
                    <!--<debug-toggle></debug-toggle>-->
                <!--</span>-->
            <!--</div>-->
        <!--</nav>-->

    <!--</v-toolbar>-->
</template>

<script>
    import { mapState } from 'vuex';

    import Debug from './components/debug';

    export default {
        name: 'app-header',

        computed: {
            ...mapState('user', ['isAuthenticated'])
        },

        components: {
            debugToggle: Debug
        }
    };
</script>

<style scoped>
    .image {
        display: inline-block;
        vertical-align: middle;
    }

    .image img {
        filter: invert(100%);
    }
</style>
