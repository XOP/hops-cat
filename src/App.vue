<template>
    <v-app>
        <app-header></app-header>

        <v-alert v-model="isDebugMode" warning icon="bug_report">
            Debug mode
        </v-alert>

        <main>
            <v-container fluid>
                <router-view></router-view>
            </v-container>
        </main>

        <app-footer></app-footer>
    </v-app>
</template>

<script>
    import { firebaseApp } from './firebase';

    import { mapActions, mapState } from 'vuex';

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
            ])
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
</style>
