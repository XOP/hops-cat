<template>
    <nav class="nav">
        <div class="nav-left">
            <span class="nav-item">
                <span class="title is-3">
                    <router-link to="/">
                        <span>Hops Cat</span>
                    </router-link>
                </span>
            </span>
        </div>

        <div class="nav-center">
            <div class="nav-item">
                <div class="image is-24x24">
                    <img src="../../assets/images/icon.png" alt="Hops Cat Logo" />
                </div>
            </div>
        </div>

        <span class="nav-toggle">
            <span></span>
            <span></span>
            <span></span>
          </span>

        <div class="nav-right nav-menu">
            <span class="nav-item">
                <router-link to="/">Catalogue</router-link>
            </span>
            <span class="nav-item">
                <router-link to="/storage">Storage</router-link>
            </span>
            <span  class="nav-item">
                <router-link to="/auth">
                    <b-icon v-if="!isAuthenticated" icon="sign-in"></b-icon>
                    <b-icon v-if="isAuthenticated" icon="sign-out"></b-icon>
                </router-link>
            </span>
            <span class="nav-item">
                <debug-toggle></debug-toggle>
            </span>
        </div>
    </nav>
</template>

<script>
    import { mapState } from 'vuex';

    import Debug from '../debug';

    export default {
        name: 'navi',

        computed: {
            ...mapState('user', ['isAuthenticated'])
        },

        components: {
            debugToggle: Debug
        }
    };
</script>

<style scoped>
    .image img {
        filter: invert(100%);
    }
</style>
