<template>
    <section>
        <h1 class="title is-3">Add new Style</h1>

        <div class="columns">
            <div class="column is-half">

                <form>
                    <b-field grouped>
                        <b-field label="Name" expanded>
                            <b-input placeholder="Double IPA" name="name" required v-model="newStyle.name"></b-input>
                        </b-field>
                        <b-field label="Category" expanded>
                            <b-input placeholder="Strong American Ale" name="category" required v-model="newStyle.category"></b-input>
                        </b-field>
                        <b-field label="Family" expanded>
                            <b-input placeholder="IPA" name="family" required v-model="newStyle.family"></b-input>
                        </b-field>
                    </b-field>

                    <b-field grouped>
                        <b-field label="Code" expanded>
                            <b-input placeholder="22" name="code" required v-model="newStyle.code"></b-input>
                        </b-field>
                        <b-field label="Letter Code" expanded>
                            <b-input placeholder="A" name="sub_code" v-model="newStyle.sub_code"></b-input>
                        </b-field>

                    </b-field>

                    <b-field grouped>
                        <div class="control is-expanded">
                            <button class="button is-primary is-fullwidth" @click.prevent="addStyle">
                                <b-icon icon="plus"></b-icon>
                                <span>Add</span>
                            </button>
                        </div>
                        <div class="control">
                            <button class="button is-fullwidth" @click.prevent="clearFields">
                                <b-icon icon="eraser"></b-icon>
                                <span>Clear</span>
                            </button>
                        </div>
                    </b-field>
                </form>

            </div>

            <div class="column is-half">
                <ul>
                    <li v-for="style in styles">
                        <b>
                            {{ style.code }}{{ style.sub_code }}
                        </b>
                        {{ style.name }}
                    </li>
                </ul>
            </div>
        </div>
    </section>
</template>

<script>
    import db from '../../firebase';

    import local from '../../../local.json';

    import {
        Styles as mockStyles
    } from '../../fixtures';

    const stylesRef = db.ref('styles');

    const firebaseData = local.debug ?
        (() => null) :
        (() => {
            return {
                styles: stylesRef
            };
        });

    export default {
        name: 'add-style',

        firebase: firebaseData,

        props: {

        },

        data () {
            return {
                styles: local.debug ? mockStyles : null,

                newStyle: {
                    name: '',
                    category: '',
                    code: '',
                    sub_code: '',
                    family: ''
                }
            };
        },

        computed: {

        },

        methods: {
            addStyle: function () {
                stylesRef.push(this.newStyle);

                this.clearFields();
            },

            clearFields: function () {
                this.newStyle.name = '';
                this.newStyle.category = '';
                this.newStyle.code = '';
                this.newStyle.sub_code = '';
                this.newStyle.family = '';
            }
        }
    };
</script>

<style lang="scss" scoped>
    @import './add-style.scss';
</style>
