<template>
    <section>
        <h1 class="title is-3">Add new Style</h1>

        <form>
            <b-field grouped>
                <b-input placeholder="Name" expanded name="name"></b-input>
                <b-input placeholder="Category" expanded name="category"></b-input>
            </b-field>

            <b-field grouped>
                <b-field>
                    <b-input placeholder="Code" name="code"></b-input>
                </b-field>
                <b-field>
                    <b-input placeholder="Letter Code" name="sub_code"></b-input>
                </b-field>
                <b-field expanded>
                    <b-input placeholder="Family" name="family"></b-input>
                </b-field>
            </b-field>

            <b-field grouped>
                <div class="control">
                    <button class="button is-primary">
                        <b-icon icon="plus"></b-icon>
                        <span>Add</span>
                    </button>
                </div>
                <div class="control">
                    <button class="button">
                        <b-icon icon="eraser"></b-icon>
                        <span>Clear</span>
                    </button>
                </div>
            </b-field>
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

        }
    };
</script>

<style lang="scss" scoped>
    @import './add-style.scss';
</style>
