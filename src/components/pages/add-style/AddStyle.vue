<template>
    <section>
        <h1 class="display-1 mb-2">{{ locale.addStyle.title }}</h1>

        <auth-alert></auth-alert>

        <v-container fluid grid-list-lg class="pa-0 mb-3">
            <v-layout row wrap>
                <v-flex md6 v-if="isAuthenticated">
                    <v-card>
                        <v-card-text>
                            <v-form v-model="isValid" ref="form">
                                <v-text-field
                                    :label="locale.addStyle.form.labels.name"
                                    v-model.trim="newStyle.name"
                                    required
                                    :placeholder="locale.addStyle.form.placeholders.name"
                                    :rules="nameRules"
                                >
                                </v-text-field>

                                <v-text-field
                                    :label="locale.addStyle.form.labels.category"
                                    v-model.trim="newStyle.category"
                                    required
                                    :placeholder="locale.addStyle.form.placeholders.category"
                                    :rules="categoryRules"
                                >
                                </v-text-field>

                                <v-text-field
                                    :label="locale.addStyle.form.labels.category"
                                    v-model.trim="newStyle.family"
                                    required
                                    :placeholder="locale.addStyle.form.placeholders.family"
                                    :rules="familyRules"
                                >
                                </v-text-field>

                                <v-layout row wrap>
                                    <v-flex>
                                        <v-text-field
                                            :label="locale.addStyle.form.labels.code"
                                            v-model.number="newStyle.code"
                                            type="number"
                                            required
                                            :placeholder="locale.addStyle.form.placeholders.code"
                                            :rules="codeRules"
                                        >
                                        </v-text-field>
                                    </v-flex>
                                    <v-flex>
                                        <v-select
                                            v-bind:items="['A', 'B', 'C', 'D', 'E']"
                                            v-model="newStyle.sub_code"
                                            :label="locale.addStyle.form.labels.subCode"
                                            single-line
                                            bottom
                                        ></v-select>
                                    </v-flex>
                                </v-layout>

                                <div>
                                    <v-btn color="primary" @click="addStyle" :disabled="!isValid">
                                        <v-icon left v-text="isStyleUpdated ? 'mode_edit' : 'add'"></v-icon>
                                        <span v-text="isStyleUpdated ? locale.addStyle.form.update : locale.addStyle.form.submit"></span>
                                    </v-btn>

                                    <v-btn color="secondary" @click="clearFields">
                                        <v-icon left>clear_all</v-icon>
                                        <span>{{ locale.addStyle.form.clear }}</span>
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
                        :items="stylesProcessed"
                        :pagination.sync="pagination"
                    >
                        <template slot="items" slot-scope="props">
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
                                <span>{{ locale.addStyle.form.delete }} <span>"{{ selectedStyle.name }}"</span></span>
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

    import AuthAlert from '../../auth-alert';

    import addStyleTableHead from '../../table-head/add-style-head';

    import locale, { translate } from '../../../locale';
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

        components: {
            'auth-alert': AuthAlert
        },

        props: {
            fitScreen: {
                type: Boolean
            }
        },

        data () {
            return {
                locale,

                isValid: false,
                nameRules: [
                    (v) => !!v || locale.addStyle.form.rules.name
                ],
                categoryRules: [
                    (v) => !!v || locale.addStyle.form.rules.category
                ],
                familyRules: [
                    (v) => !!v || locale.addStyle.form.rules.family
                ],
                codeRules: [
                    (v) => !!v || locale.addStyle.form.rules.code
                ],

                newStyle: {
                    name: '',
                    category: '',
                    code: '',
                    sub_code: '',
                    family: ''
                },

                pagination: {
                    rowsPerPage: 10
                },

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

            headers: addStyleTableHead(locale),

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

            translate: translate(locale.addStyle),

            addStyle: function () {
                if (this.isDebugMode) return;

                const newStyle = this.newStyle;
                const newStyleCode = `${newStyle.code}/${newStyle.sub_code}`;

                if (!_find(this.styles, {code: newStyle.code, sub_code: newStyle.sub_code})) {
                    this.$firebaseRefs.dbStyles.push(newStyle).then(() => {
                        this.showNotification({
                            text: this.translate('notification.addSuccess', {style: newStyleCode}),
                            btnText: 'OK',
                            timeout: DURATION.NOTIFICATION_SHORT,
                            btnColor: 'success'
                        });

                        this.clearFields();
                    });
                } else {
                    this.showNotification({
                        text: this.translate('notification.addConflict', {style: newStyleCode}),
                        btnText: locale.addStyle.form.notification.override,
                        btnColor: 'warning',
                        onAction: () => {
                            this.notification.show = false;

                            this.$firebaseRefs.dbStyles
                                .child(this.selectedStyle['.key'])
                                .set({...newStyle}).then(() => {
                                this.showNotification({
                                    text: this.translate('notification.updateSuccess', {style: newStyleCode}),
                                    btnText: locale.addStyle.form.notification.ok,
                                    timeout: DURATION.NOTIFICATION_SHORT,
                                    btnColor: 'success'
                                });

                                this.clearFields();
                            });
                        }
                    });
                }
            },

            removeStyle: function (dbStyle) {
                if (this.isDebugMode) return;

                const key = dbStyle['.key'];

                this.hiddenKeys.push(key);

                const removeTimeout = setTimeout(() => {
                    this.$firebaseRefs.dbStyles.child(key).remove();
                }, DURATION.NOTIFICATION_LONG);

                this.showNotification({
                    text: locale.addStyle.form.notification.deleteSuccess,
                    btnText: locale.addStyle.form.notification.undo,
                    btnColor: 'warning',
                    timeout: DURATION.NOTIFICATION_LONG,
                    onAction: () => {
                        this.hiddenKeys = _without(this.hiddenKeys, key);
                        clearTimeout(removeTimeout);
                    }
                });

                this.clearFields();
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
