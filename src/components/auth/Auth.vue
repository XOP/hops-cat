<template>
    <section>
        <h1 class="title is-3">DB Auth</h1>

        <div class="columns">
            <div class="column is-4 is-offset-4">

                <form v-if="!isAuthenticated">
                    <b-field label="E-mail" expanded>
                        <b-input type="email" placeholder="user@email.com" name="email" required v-model="email"></b-input>
                    </b-field>

                    <b-field label="Pass" expanded>
                        <b-input type="password" name="pass" required v-model="pass"></b-input>
                    </b-field>

                    <b-field>
                        <div class="control">
                            <button class="button is-primary is-fullwidth" @click.prevent="signIn">
                                <b-icon icon="database"></b-icon>
                                <span>DB Authorize</span>
                            </button>
                        </div>
                    </b-field>
                </form>

                <form v-if="isAuthenticated">
                    <b-field>
                        <div class="control">
                            <button class="button is-primary is-fullwidth" @click.prevent="signOut">
                                <b-icon icon="sign-out"></b-icon>
                                <span>Log out</span>
                            </button>
                        </div>
                    </b-field>
                </form>

            </div>

        </div>
    </section>
</template>

<script>
    import { firebaseApp } from '../../firebase';

    import { mapState } from 'vuex';

    export default {
        name: 'auth',

        data () {
            return {
                email: '',
                pass: ''
            };
        },

        computed: {
            ...mapState('user', ['isAuthenticated'])
        },

        methods: {
            signIn: function () {
                firebaseApp
                    .auth()
                    .signInWithEmailAndPassword(this.email, this.pass)
                    .then(() => {
                        this.$snackbar.open({
                            message: `User ${this.email} is now authorized!`,
                            actionText: 'OK',
                            position: 'top'
                        });

                        this.email = '';
                        this.pass = '';
                    })
                    .catch((error) => {
                        this.$snackbar.open({
                            message: `Sorry, something is wrong: ${error}`,
                            actionText: 'Ouch!',
                            type: 'is-danger',
                            position: 'top'
                        });

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
    @import 'auth.scss';
</style>
