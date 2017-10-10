<template>
    <section>
        <h1 class="display-1">Countries</h1>

        <v-alert v-if="!isAuthenticated" :value="true" color="info" class="mb-3">
            <v-btn to="/auth">
                <v-icon left>lock_open</v-icon>
                Authorize
            </v-btn>

            to add or edit Styles
        </v-alert>

        <v-container fluid grid-list-lg class="pa-0 mb-3">
            <v-layout row wrap>
                <v-flex md6 v-if="isAuthenticated">
                    <v-card>
                        <v-card-text>
                            <v-form v-model="isValid" ref="form" lazy-validation>
                                <v-text-field
                                    label="Name"
                                    v-model.trim="newStyle.name"
                                    required
                                    placeholder="Double IPA"
                                    :rules="nameRules"
                                >
                                </v-text-field>

                                <v-text-field
                                    label="Category"
                                    v-model.trim="newStyle.category"
                                    required
                                    placeholder="Strong American Ale"
                                    :rules="categoryRules"
                                >
                                </v-text-field>

                                <v-text-field
                                    label="Family"
                                    v-model.trim="newStyle.family"
                                    required
                                    placeholder="IPA"
                                    :rules="familyRules"
                                >
                                </v-text-field>

                                <v-layout row wrap>
                                    <v-flex>
                                        <v-text-field
                                            label="Code"
                                            v-model.number="newStyle.code"
                                            type="number"
                                            required
                                            placeholder="22"
                                            :rules="codeRules"
                                        >
                                        </v-text-field>
                                    </v-flex>
                                    <v-flex>
                                        <v-select
                                            v-bind:items="['A', 'B', 'C', 'D', 'E']"
                                            v-model="newStyle.sub_code"
                                            label="Letter Code"
                                            single-line
                                            bottom
                                        ></v-select>
                                    </v-flex>
                                </v-layout>

                                <div>
                                    <v-btn color="primary" @click="addStyle" :disabled="!isValid">
                                        <v-icon left v-text="isStyleUpdated ? 'mode_edit' : 'add'"></v-icon>
                                        <span v-text="isStyleUpdated ? 'Update' : 'Add'"></span>
                                    </v-btn>

                                    <v-btn color="secondary" @click="clearFields">
                                        <v-icon left>clear_all</v-icon>
                                        <span>Clear</span>
                                    </v-btn>
                                </div>
                            </v-form>
                        </v-card-text>
                    </v-card>
                </v-flex>

                <v-flex :md6="isAuthenticated">
                    <v-data-table
                        v-bind:headers="headers"
                        class="elevation-1"
                        hideActions
                        :items="stylesProcessed"
                    >
                        <template slot="items" scope="props">
                            <tr :active="props.item.isSelected" @click="fillFormFields(props.item)">
                                <td>{{ props.item.code }} / {{ props.item.sub_code }}</td>
                                <td>{{ props.item.name }}</td>
                                <td>{{ props.item.category }}</td>
                                <td>{{ props.item.family }}</td>
                            </tr>
                        </template>
                    </v-data-table>

                    <v-card class="elevation-1" tile v-if="isAuthenticated && selectedStyle.code">
                        <v-card-text class="text-xs-center">
                            <v-btn color="error" @click.stop="removeStyle(selectedStyle)">
                                <v-icon left>delete</v-icon>
                                <span>Remove <span>"{{ selectedStyle.name }}"</span></span>
                            </v-btn>
                        </v-card-text>
                    </v-card>
                </v-flex>
            </v-layout>
        </v-container>

        <v-snackbar
            :timeout="notification.timeout"
            v-model="notification.show"
            top
        >
            <span>
                {{ notification.text }}
            </span>
            <v-btn dark :color="notification.btnColor" flat @click.native="notification.onAction">
                {{ notification.btnText }}
            </v-btn>
        </v-snackbar>
    </section>
</template>

<script>
    import { mapActions, mapState } from 'vuex';

    import _isEmpty from 'lodash/isEmpty';
    import _find from 'lodash/find';
    import _without from 'lodash/without';

    import db from '../../../firebase';

    import { DURATION } from '../../../constants/ui';

    import {
        Styles as mockStyles
    } from '../../../fixtures/index';

    const stylesRef = db.ref('styles');

    export default {
        name: 'add-style',

        firebase: () => ({
            dbStyles: stylesRef.orderByKey()
        }),

        props: {
            fitScreen: {
                type: Boolean
            }
        },

        data () {
            return {
                isValid: false,
                nameRules: [
                    (v) => !!v || 'Name is required'
                ],
                categoryRules: [
                    (v) => !!v || 'Category is required'
                ],
                familyRules: [
                    (v) => !!v || 'Family is required'
                ],
                codeRules: [
                    (v) => !!v || 'Code is required'
                ],

                newStyle: {
                    name: '',
                    category: '',
                    code: '',
                    sub_code: '',
                    family: ''
                },

                headers: [
                    {
                        text: 'Code / Group',
                        align: 'left',
                        value: 'code'
                    },
                    {
                        text: 'Name',
                        align: 'left',
                        value: 'name'
                    },
                    {
                        text: 'Category',
                        align: 'left',
                        value: 'category'
                    },
                    {
                        text: 'Family',
                        align: 'left',
                        value: 'family'
                    }
                ],

                selectedStyle: {},

                hiddenKeys: [],

                notification: {
                    show: false
                },

                notificationDefaults: {
                    text: '',
                    btnText: '',
                    onAction: () => this.notification.show = false,
                    timeout: DURATION.NOTIFICATION_NORMAL
                }
            };
        },

        beforeMount: function () {
            if (this.fitScreen) {
                this.enableFitScreen();
            } else {
                this.disableFitScreen();
            }
        },

        beforeDestroy: function () {
            this.disableFitScreen();
        },

        computed: {
            ...mapState('debug', ['isDebugMode']),
            ...mapState('user', ['isAuthenticated']),

            styles: function () {
                return this.isDebugMode ? mockStyles : this.dbStyles;
            },

            isStyleUpdated: function () {
                if (_isEmpty(this.selectedStyle)) return false;

                const selected = this.selectedStyle;
                const edited = this.newStyle;

                if (
                    selected.code === edited.code &&
                    selected.sub_code === edited.sub_code &&
                    (
                        selected.name !== edited.name ||
                        selected.category !== edited.category ||
                        selected.family !== edited.family
                    )
                ) {
                    return true;
                }
            },

            stylesProcessed: function () {
                const selectedStyle = this.selectedStyle;

                return this.styles
                    .slice(0)
                    .reverse()
                    .map(style => (
                        Object.assign({}, style, {
                            isSelected:
                                selectedStyle.code === style.code &&
                                selectedStyle.sub_code === style.sub_code
                        })
                    ))
                    .filter(i => this.hiddenKeys.indexOf(i['.key']) === -1);
            }
        },

        watch: {
            isDebugMode: function () {
                this.$forceUpdate();
            }
        },

        methods: {
            ...mapActions('helpers', [
                'enableFitScreen',
                'disableFitScreen'
            ]),

            addStyle: function () {
                if (this.isDebugMode) return;

                const newStyle = this.newStyle;
                const newStyleCode = `${newStyle.code}/${newStyle.sub_code}`;

                if (!_find(this.styles, {code: newStyle.code, sub_code: newStyle.sub_code})) {
                    this.$firebaseRefs.dbStyles.push(newStyle).then(() => {
                        this.$snackbar.open({
                            message: `Style ${newStyleCode} successfully added!`,
                            actionText: 'OK',
                            position: 'is-top',
                            duration: DURATION.NOTIFICATION_SHORT
                        });

                        this.clearFields();
                    });
                } else {
                    this.$snackbar.open({
                        message: `Style ${newStyleCode} already exists!`,
                        actionText: 'Override',
                        position: 'is-top',
                        type: 'is-warning',
                        duration: DURATION.NOTIFICATION_NORMAL,
                        onAction: () => {
                            this.$firebaseRefs.dbStyles
                                .child(this.selectedStyle['.key'])
                                .set({...newStyle}).then(() => {
                                    this.$snackbar.open({
                                        message: `Style ${newStyleCode} successfully updated!`,
                                        actionText: 'OK',
                                        position: 'is-top',
                                        duration: DURATION.NOTIFICATION_SHORT
                                    });

                                    this.clearFields();
                            });
                        }
                    });
                }
            },

            removeStyle: function (dbStyle) {
                if (this.isDebugMode) return;

                const styleKey = dbStyle['.key'];

                this.hiddenKeys.push(styleKey);

                const removeTimeout = setTimeout(() => {
                    this.$firebaseRefs.dbStyles.child(styleKey).remove();
                }, DURATION.NOTIFICATION_LONG);

                this.$snackbar.open({
                    message: `Deleted successfully`,
                    type: 'is-warning',
                    position: 'is-top',
                    duration: DURATION.NOTIFICATION_LONG,
                    actionText: 'Undo',
                    onAction: () => {
                        this.hiddenKeys = _without(this.hiddenKeys, styleKey);
                        clearTimeout(removeTimeout);
                    }
                });
            },

            selectStyle: function (dbStyle) {
                this.selectedStyle = {...dbStyle};
            },

            clearSelected: function () {
                this.selectedStyle = {};
            },

            clearFields: function () {
                this.clearSelected();

                this.$refs.form.reset();
            },

            fillFormFields: function (dbStyle) {
                this.selectStyle(dbStyle);

                this.newStyle.name = dbStyle.name;
                this.newStyle.category = dbStyle.category;
                this.newStyle.code = dbStyle.code;
                this.newStyle.sub_code = dbStyle.sub_code;
                this.newStyle.family = dbStyle.family;
            },

            showNotification: function (props) {
                this.notification = {
                    ...this.notificationDefaults,
                    ...props,
                    show: true
                };
            }
        }
    };
</script>

<style lang="scss" scoped>
    @import 'add-style';
</style>
