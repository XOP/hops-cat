<template>
    <section>
        <h1 class="display-1">Countries</h1>

        <v-alert v-if="!isAuthenticated" :value="true" color="info" class="mb-3">
            <v-btn to="/auth">
                <v-icon left>lock_open</v-icon>
                Authorize
            </v-btn>

            to add or edit Countries
        </v-alert>

        <v-container fluid grid-list-lg class="pa-0 mb-3">
            <v-layout row wrap>
                <v-flex md6 v-if="isAuthenticated">
                    <v-card>
                        <v-card-text>
                            <v-form v-model="isValid" ref="form" lazy-validation>
                                <v-text-field
                                    label="Code"
                                    v-model="newFlag.code"
                                    required
                                    placeholder="au"
                                    :rules="codeRules"
                                >
                                </v-text-field>

                                <v-text-field
                                    label="Name"
                                    v-model="newFlag.name"
                                    required
                                    placeholder="Australia"
                                    :rules="nameRules"
                                >
                                </v-text-field>

                                <div>
                                    <v-btn color="primary" @click="addFlag" :disabled="!isValid">
                                        <v-icon left v-text="isFlagUpdated ? 'mode_edit' : 'add'"></v-icon>
                                        <span v-text="isFlagUpdated ? 'Update' : 'Add'"></span>
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
                        :items="flagsProcessed"
                    >
                        <template slot="items" scope="props">
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
                                <span>Remove <span>"{{ selectedFlag.name }}"</span></span>
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

    import { DURATION } from '../../../constants/ui';

    import {
        Flags as mockFlags
    } from '../../../fixtures/index';

    const flagsRef = db.ref('flags');

    export default {
        name: 'add-flag',

        firebase: () => ({
            dbFlags: flagsRef.orderByKey()
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
                codeRules: [
                    (v) => !!v || 'Code is required',
                ],

                newFlag: {
                    name: '',
                    code: ''
                },

                headers: [
                    {
                        text: 'Code',
                        align: 'left',
                        value: 'code'
                    },
                    {
                        text: 'Name',
                        align: 'left',
                        value: 'name'
                    }
                ],

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

            addFlag: function () {
                if (this.isDebugMode) return;

                if (!this.$refs.form.validate()) return;

                const newFlag = this.newFlag;

                if (!_find(this.flags, {code: newFlag.code})) {
                    this.$firebaseRefs.dbFlags.push(newFlag).then(() => {
                        this.showNotification({
                            text: `Country "${newFlag.name}" successfully added!`,
                            btnText: 'OK',
                            timeout: DURATION.NOTIFICATION_SHORT
                        });

                        this.clearFields();
                    });
                } else {
                    this.showNotification({
                        text: `Country ${newFlag.name} already exists!`,
                        btnText: 'Override',
                        btnColor: 'error',
                        onAction: () => {
                            this.notification.show = false;

                            this.$firebaseRefs.dbFlags
                                .child(this.selectedFlag['.key'])
                                .set({...newFlag}).then(() => {
                                this.showNotification({
                                    text: `Country "${newFlag.name}" successfully updated!`,
                                    btnText: 'OK',
                                    timeout: DURATION.NOTIFICATION_SHORT
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
                        text: `Deleted successfully`,
                        btnText: 'OK',
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
