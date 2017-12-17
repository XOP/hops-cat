<template>
    <section>
        <h1 class="display-1 mb-2">{{ locale.addFlag.title }}</h1>

        <auth-alert></auth-alert>

        <v-container fluid grid-list-lg class="pa-0 mb-3">
            <v-layout row wrap>
                <v-flex md6 v-if="isAuthenticated">
                    <v-card>
                        <v-card-text>
                            <v-form v-model="isValid" ref="form">
                                <v-text-field
                                    :label="locale.addFlag.form.labels.code"
                                    v-model="newFlag.code"
                                    required
                                    :placeholder="locale.addFlag.form.placeholders.code"
                                    :rules="codeRules"
                                >
                                </v-text-field>

                                <v-text-field
                                    :label="locale.addFlag.form.placeholders.name"
                                    v-model="newFlag.name"
                                    required
                                    :placeholder="locale.addFlag.form.placeholders.name"
                                    :rules="nameRules"
                                >
                                </v-text-field>

                                <div>
                                    <v-btn color="primary" @click="addFlag" :disabled="!isValid">
                                        <v-icon left v-text="isFlagUpdated ? 'mode_edit' : 'add'"></v-icon>
                                        <span v-text="isFlagUpdated ? locale.addFlag.form.update : locale.addFlag.form.submit"></span>
                                    </v-btn>

                                    <v-btn color="secondary" @click="clearFields">
                                        <v-icon left>clear_all</v-icon>
                                        <span>{{locale.addFlag.form.clear}}</span>
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
                        :items="flagsProcessed"
                    >
                        <template slot="items" slot-scope="props">
                            <tr :active="props.item.isSelected" @click="fillFormFields(props.item)">
                                <td>{{ props.item.code }}</td>
                                <td>{{ props.item.name }}</td>
                            </tr>
                        </template>
                    </v-data-table>

                    <v-card class="elevation-1" tile v-if="isAuthenticated && selectedFlag.code">
                        <v-card-text class="text-xs-center">
                            <v-btn color="error" @click.stop="removeFlag(selectedFlag)">
                                <v-icon left>delete</v-icon>
                                <span>{{ locale.addFlag.form.delete }} <span>"{{ selectedFlag.name }}"</span></span>
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

    import db from '../../../firebase';

    import AuthAlert from '../../auth-alert';

    import addFlagTableHead from '../../table-head/add-flag-head';

    import locale, { translate } from '../../../locale';
    import { DURATION } from '../../../constants/ui';
    import { FIREBASE_REFS } from '../../../constants/firebase';

    import {
        Flags as mockFlags
    } from '../../../fixtures/index';

    const flagsRef = db.ref(FIREBASE_REFS.flags);

    export default {
        name: 'add-flag',

        firebase: () => ({
            dbFlags: flagsRef.orderByKey()
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
                    (v) => !!v || locale.addFlag.form.rules.name
                ],
                codeRules: [
                    (v) => !!v || locale.addFlag.form.rules.code
                ],

                newFlag: {
                    name: '',
                    code: ''
                },

                selectedFlag: {},

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

            headers: addFlagTableHead(locale),

            flags: function () {
                return this.isDebugMode ? mockFlags : this.dbFlags;
            },

            isFlagUpdated: function () {
                if (_isEmpty(this.selectedFlag)) return false;

                const selected = this.selectedFlag;
                const edited = this.newFlag;

                if (selected.code === edited.code && selected.name !== edited.name) {
                    return true;
                }
            },

            flagsProcessed: function () {
                const selectedFlag = this.selectedFlag;

                return this.flags
                    .slice(0)
                    .reverse()
                    .map(flag => (
                        Object.assign({}, flag, {
                            isSelected: selectedFlag.code === flag.code
                        })
                    ));
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

            translate: translate(locale.addFlag),

            addFlag: function () {
                if (this.isDebugMode) return;

                if (!this.$refs.form.validate()) return;

                const newFlag = this.newFlag;

                if (!_find(this.flags, {code: newFlag.code})) {
                    this.$firebaseRefs.dbFlags.push(newFlag).then(() => {
                        this.showNotification({
                            text: this.translate('notification.addSuccess', {country: newFlag.name}),
                            btnText: locale.addFlag.notification.ok,
                            timeout: DURATION.NOTIFICATION_SHORT,
                            btnColor: 'success'
                        });

                        this.clearFields();
                    });
                } else {
                    this.showNotification({
                        text: this.translate('notification.addConflict', {country: newFlag.name}),
                        btnText: locale.addFlag.notification.override,
                        btnColor: 'error',
                        onAction: () => {
                            this.notification.show = false;

                            this.$firebaseRefs.dbFlags
                                .child(this.selectedFlag['.key'])
                                .set({...newFlag}).then(() => {
                                this.showNotification({
                                    text: this.translate('notification.updateSuccess', {country: newFlag.name}),
                                    btnText: locale.addFlag.notification.ok,
                                    timeout: DURATION.NOTIFICATION_SHORT,
                                    btnColor: 'success'
                                });

                                this.clearFields();
                            });
                        }
                    });
                }
            },

            removeFlag: function (dbFlag) {
                if (this.isDebugMode) return;

                this.$firebaseRefs.dbFlags.child(dbFlag['.key']).remove().then(() => {
                    this.showNotification({
                        text: locale.addFlag.notification.deleteSuccess,
                        btnText: locale.addFlag.notification.ok,
                        timeout: DURATION.NOTIFICATION_SHORT
                    });
                });

                this.clearFields();
            },

            selectFlag: function (dbFlag) {
                this.selectedFlag = {...dbFlag};
            },

            clearSelected: function () {
                this.selectedFlag = {};
            },

            clearFields: function () {
                this.clearSelected();

                this.$refs.form.reset();
            },

            fillFormFields: function (dbFlag) {
                this.selectFlag(dbFlag);

                this.newFlag.name = dbFlag.name;
                this.newFlag.code = dbFlag.code;
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
    @import 'add-flag';
</style>
