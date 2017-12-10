<template>
    <section>
        <h1 class="display-1 mb-2">{{ locale.auth.title }}</h1>

        <v-container fluid class="pa-0">
            <v-layout row justify-space-around>
                <v-flex d-flex xs12 sm6>

                    <v-card>
                        <v-card-text>

                            <form v-if="!isAuthenticated">
                                <v-text-field
                                    :label="locale.auth.form.labels.email"
                                    v-model="email"
                                    required
                                    :placeholder="locale.auth.form.placeholders.email"
                                    :rules="emailRules"
                                ></v-text-field>

                                <v-text-field
                                    :label="locale.auth.form.labels.pass"
                                    v-model="pass"
                                    required
                                    type="password"
                                ></v-text-field>

                                <div class="text-xs-center">
                                    <v-btn color="primary" large @click.prevent="signIn">
                                        <v-icon left>storage</v-icon>
                                        <span>{{ locale.auth.form.login }}</span>
                                    </v-btn>
                                </div>
                            </form>

                            <form v-if="isAuthenticated">
                                <v-text-field
                                    :label="locale.auth.form.labels.email"
                                    v-model="user.email"
                                    disabled
                                ></v-text-field>

                                <div class="text-xs-center">
                                    <v-btn color="primary" large @click.prevent="signOut">
                                        <v-icon left>lock_open</v-icon>
                                        <span>{{ locale.auth.form.logout }}</span>
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
                <v-card-text>
                    <v-layout row wrap justify-space-around>
                        <v-flex xs12 md3>
                            <v-btn large to="/add-hops" color="success" block>
                                {{ locale.auth.addHops }}
                            </v-btn>
                        </v-flex>
                        <v-flex xs12 md3>
                            <v-btn large to="/add-flag" block>
                                {{ locale.auth.addFlag }}
                            </v-btn>
                        </v-flex>
                        <v-flex xs12 md3>
                            <v-btn large to="/add-style" block>
                                {{ locale.auth.addStyle }}
                            </v-btn>
                        </v-flex>
                    </v-layout>
                </v-card-text>
            </v-card>
        </v-container>

    </section>
</template>

<script>
    import { firebaseApp } from '../../../firebase';

    import { mapState } from 'vuex';

    import locale, { translate } from '../../../locale';
    import { DURATION } from '../../../constants/ui';

    export default {
        name: 'auth',

        data () {
            return {
                locale,

                email: '',
                pass: '',

                emailRules: [
                    (v) => !!v || locale.auth.form.rules.email,
                    (v) => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v) || locale.auth.form.rules.emailValid
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
            translate: translate(locale.auth),

            signIn: function () {
                firebaseApp
                    .auth()
                    .signInWithEmailAndPassword(this.email, this.pass)
                    .then(() => {
                        this.notification.text = this.translate('notification.success', { email: this.email });
                        this.notification.btnText = locale.auth.notification.ok;
                        this.notification.show = true;

                        this.email = '';
                        this.pass = '';
                    })
                    .catch((error) => {
                        this.notification.text = this.translate('notification.error', { error });
                        this.notification.btnText = locale.auth.notification.oh;

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
