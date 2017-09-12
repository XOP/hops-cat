<template>
    <v-app>
        <app-header></app-header>

        <v-alert v-model="isDebugMode" warning hide-icon>
            Debug mode
        </v-alert>

        <!--
        <main role="main" :class="mainClassname">
            <router-view></router-view>
        </main>

        <app-footer></app-footer>
        -->
    </v-app>
</template>

<script>
    import { firebaseApp } from './firebase';

    import { mapActions, mapState } from 'vuex';

    import cls from 'classnames';

    import Header from './Header.vue';
    import Footer from './Footer.vue';

    export default {
        name: 'app',

        created () {
            firebaseApp.auth().onAuthStateChanged(user => {
                if (user) {
                    this.signIn({ email: user.email });
                } else {
                    this.signOut();
                }
            });
        },

        components: {
            'app-header': Header,
            'app-footer': Footer
        },

        computed: {
            ...mapState('debug', ['isDebugMode']),

            ...mapState('helpers', [
                'fitScreen'
            ]),

            mainClassname: function () {
                return cls('main section', {
                    'is-fit-screen': this.fitScreen
                });
            }
        },

        methods: {
            ...mapActions('user', [
                'signIn',
                'signOut'
            ]),
        }
    };
</script>

<style scoped>
    .app {
        display: flex;
        flex-flow: column;

        height: 100%;
    }

    header {
        flex: 0 1 auto;
    }

    main {
        flex: 1 0 auto;
    }

    footer {
        flex: 0 1 auto;
    }
</style>
