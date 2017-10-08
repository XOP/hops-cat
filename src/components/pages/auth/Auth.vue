<template>
    <section>
        <h1 class="display-1">
            DB Auth
        </h1>

        <v-container fluid class="pa-0">
            <v-layout row justify-space-around>
                <v-flex d-flex md4>

                    <v-card>
                        <v-card-text>

                            <form v-if="!isAuthenticated">
                                <v-text-field
                                    label="E-mail"
                                    v-model="email"
                                    required
                                    placeholder="user@email.com"
                                    :rules="emailRules"
                                ></v-text-field>

                                <v-text-field
                                    label="Pass"
                                    v-model="pass"
                                    required
                                    type="password"
                                ></v-text-field>

                                <div class="text-xs-center">
                                    <v-btn color="primary" large @click.prevent="signIn">
                                        <v-icon left>storage</v-icon>
                                        <span>DB Authorize</span>
                                    </v-btn>
                                </div>
                            </form>

                            <form v-if="isAuthenticated">
                                <v-text-field
                                    label="E-mail"
                                    v-model="user.email"
                                    disabled
                                ></v-text-field>

                                <div class="text-xs-center">
                                    <v-btn color="primary" large @click.prevent="signOut">
                                        <v-icon left>lock_open</v-icon>
                                        <span>Log out</span>
                                    </v-btn>
                                </div>
                            </form>

                        </v-card-text>
                    </v-card>

                    <v-snackbar
                        :timeout="notification.timeout"
                        v-model="notification.show"
                        top
                    >
                        <span>
                            {{ notification.text }}
                        </span>
                        <v-btn dark flat @click.native="notification.show = false">
                            {{ notification.btnText }}
                        </v-btn>
                    </v-snackbar>
                </v-flex>
            </v-layout>
        </v-container>

        <v-container class="pa-0 mt-4" v-if="isAuthenticated">
            <v-card>
                <v-card-text class="text-xs-center">
                    <v-btn large to="/add-hops" color="success">
                        Add Hops
                    </v-btn>

                    <v-btn large to="/add-flag">
                        Add Countries
                    </v-btn>

                    <v-btn large to="/add-style">
                        Add Styles
                    </v-btn>
                </v-card-text>
            </v-card>
        </v-container>

    </section>
</template>

<script>
    import { firebaseApp } from '../../../firebase';

    import { mapState } from 'vuex';

    import { DURATION } from '../../../constants/ui';

    export default {
        name: 'auth',

        data () {
            return {
                email: '',
                pass: '',

                emailRules: [
                    (v) => !!v || 'E-mail is required',
                    (v) => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
                ],

                notification: {
                    show: false,
                    text: '',
                    btnText: '',
                    timeout: DURATION.NOTIFICATION_NORMAL
                }
            };
        },

        computed: {
            ...mapState('user', ['isAuthenticated', 'user'])
        },

        methods: {
            signIn: function () {
                firebaseApp
                    .auth()
                    .signInWithEmailAndPassword(this.email, this.pass)
                    .then(() => {
                        this.notification.text = `User ${this.email} is now authorized!`;
                        this.notification.btnText = 'OK';
                        this.notification.show = true;

                        this.email = '';
                        this.pass = '';
                    })
                    .catch((error) => {
                        this.notification.text = `Sorry, something is wrong: ${error}`;
                        this.notification.btnText = 'Ouch!';

                        this.pass = '';
                    });
            },

            signOut: function () {
                firebaseApp
                    .auth()
                    .signOut();
            }
        }
    };
</script>

<style lang="scss" scoped>
    @import 'auth';
</style>
