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
                <div class="h-vertical-overflow">

                    <table class="add-style__table table is-narrow">
                        <thead>
                        <tr>
                            <th>Code / Group</th>
                            <th>Name</th>
                            <th>Category</th>
                            <th>Family</th>
                            <th></th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr @click="fillFormFields(style)" v-for="style in stylesProcessed">
                            <td>{{ style.code }} / {{ style.sub_code }}</td>
                            <td>{{ style.name }}</td>
                            <td>{{ style.category }}</td>
                            <td>{{ style.family }}</td>
                            <td>
                                <button class="button add-style__delete">
                                    <b-icon icon="trash-o"></b-icon>
                                </button>
                            </td>
                        </tr>
                        </tbody>
                    </table>

                </div>
            </div>
        </div>
    </section>
</template>

<script>
    import _find from 'lodash/find';

    import db from '../../firebase';

    import local from '../../../local.json';

    import {
        Styles as mockStyles
    } from '../../fixtures';

    const stylesRef = db.ref('styles');

    const firebaseData = local.debug ?
        (() => null) :
        (() => ({
            styles: stylesRef.orderByKey()
        }));

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
            stylesProcessed: function () {
                return this.styles.slice().reverse();
            }
        },

        methods: {
            addStyle: function () {
                const newStyle = this.newStyle;
                const newStyleCode = `${newStyle.code}/${newStyle.sub_code}`;

                if (!_find(this.styles, {code: newStyle.code, sub_code: newStyle.sub_code})) {
                    this.$snackbar.open({
                        message: `Style ${newStyleCode} successfully added!`,
                        actionText: 'OK',
                        position: 'top',
                        duration: 1500
                    });

                    this.$firebaseRefs.styles.push(newStyle).then(() => {
                        this.clearFields();
                    });
                } else {
                    this.$snackbar.open({
                        message: `Style ${newStyleCode} already exists!`,
                        actionText: 'Got it',
                        position: 'top',
                        type: 'is-danger',
                        duration: 1500
                    });
                }
            },

            clearFields: function () {
                this.newStyle.name = '';
                this.newStyle.category = '';
                this.newStyle.code = '';
                this.newStyle.sub_code = '';
                this.newStyle.family = '';
            },

            fillFormFields: function (dbStyle) {
                this.newStyle.name = dbStyle.name;
                this.newStyle.category = dbStyle.category;
                this.newStyle.code = dbStyle.code;
                this.newStyle.sub_code = dbStyle.sub_code;
                this.newStyle.family = dbStyle.family;
            }
        }
    };
</script>

<style lang="scss" scoped>
    @import './add-style.scss';
</style>
