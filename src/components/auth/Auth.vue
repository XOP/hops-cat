<template>
    <section>
        <h1 class="title is-3">DB Auth</h1>

        <div class="columns">
            <div class="column is-4 is-offset-4">

                <form>
                    <b-field label="E-mail" expanded>
                        <b-input type="email" placeholder="user@email.com" name="email" required v-model="email"></b-input>
                    </b-field>

                    <b-field label="Pass" expanded>
                        <b-input type="password" name="pass" required v-model="pass"></b-input>
                    </b-field>

                    <b-field>
                        <div class="control">
                            <button class="button is-primary is-fullwidth" @click.prevent="authUser">
                                <b-icon icon="database"></b-icon>
                                <span>DB Authorize</span>
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

    export default {
        name: 'auth',

        data () {
            return {
                email: '',
                pass: ''
            };
        },

        methods: {
            authUser: function () {
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
            }
        }
    };
</script>

<style lang="scss" scoped>
    @import 'auth.scss';
</style>
