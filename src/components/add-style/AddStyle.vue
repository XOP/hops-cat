<template>
    <section>
        <h1 class="title is-3">Add new Style</h1>

        <form>
            <b-field grouped>
                <b-input placeholder="Name" expanded name="name" required></b-input>
                <b-input placeholder="Category" expanded name="category" required></b-input>
            </b-field>

            <b-field grouped>
                <b-field expanded>
                    <b-input placeholder="Code" name="code" required></b-input>
                </b-field>
                <b-field expanded>
                    <b-input placeholder="Letter Code" name="sub_code"></b-input>
                </b-field>
                <b-field expanded>
                    <b-input placeholder="Family" name="family" required></b-input>
                </b-field>
            </b-field>

            <div class="columns">
                <div class="column is-half is-offset-one-quarter has-text-centered">
                    <b-field grouped>
                        <div class="control is-expanded">
                            <button class="button is-primary is-fullwidth" @click.prevent="addStyle">
                                <b-icon icon="plus"></b-icon>
                                <span>Add</span>
                            </button>
                        </div>
                        <div class="control is-expanded">
                            <button class="button is-fullwidth" @click.prevent="clearFields">
                                <b-icon icon="eraser"></b-icon>
                                <span>Clear</span>
                            </button>
                        </div>
                    </b-field>
                </div>
            </div>
        </form>
    </section>
</template>

<script>
    export default {
        name: 'add-style',

        props: {

        },

        data () {
            return {

            };
        },

        computed: {

        },

        methods: {
            addStyle: function () {

            },

            clearFields: function () {

            }
        }
    };
</script>

<style lang="scss" scoped>
    @import './add-style.scss';
</style>
