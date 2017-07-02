<template>
    <section>
        <h1 class="title is-3">Add new Country</h1>

        <b-notification v-if="!isAuthenticated" type="is-info" :closable="false" :hasIcon="true">
            <router-link to="/auth">Authorization</router-link> required to edit database
        </b-notification>

        <div class="columns">
            <div v-if="isAuthenticated" class="column is-half">

                <form>
                    <b-field grouped>
                        <b-field label="Name" expanded>
                            <b-input placeholder="Australia" name="name" required v-model="newFlag.name"></b-input>
                        </b-field>
                        <b-field label="Code" expanded>
                            <b-input placeholder="au" name="category" required v-model="newFlag.code"></b-input>
                        </b-field>
                    </b-field>

                    <b-field grouped>
                        <div class="control is-expanded">
                            <button class="button is-primary is-fullwidth" @click.prevent="addFlag">
                                <b-icon :icon="isFlagUpdated ? 'wrench' : 'plus'"></b-icon>
                                <span v-text="isFlagUpdated ? 'Update' : 'Add'"></span>
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

            <div :class="`column ${isAuthenticated ? 'is-half' : ''}`">
                <div class="is-auto-overflow-vertical">

                    <table class="add-flag__table table is-narrow">
                        <thead>
                        <tr>
                            <th>Code</th>
                            <th>Name</th>
                            <th v-if="isAuthenticated"></th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr @click="fillFormFields(flag)" v-for="flag in flagsProcessed">
                            <td>{{ flag.code }}</td>
                            <td>{{ flag.name }}</td>
                            <td v-if="isAuthenticated">
                                <button class="button add-flag__delete" @click.stop="removeFlag(flag)">
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
    import { mapActions, mapState } from 'vuex';

    import _isEmpty from 'lodash/isEmpty';
    import _find from 'lodash/find';

    import db from '../../firebase';

    import {
        Flags as mockFlags
    } from '../../fixtures';

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
                newFlag: {
                    name: '',
                    code: ''
                },

                selectedFlag: {}
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
                return this.flags.slice().reverse();
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

                const newFlag = this.newFlag;

                if (!_find(this.flags, {code: newFlag.code})) {
                    this.$firebaseRefs.dbFlags.push(newFlag).then(() => {
                        this.$snackbar.open({
                            message: `Country ${newFlag.name} successfully added!`,
                            actionText: 'OK',
                            position: 'is-top',
                            duration: 1500
                        });

                        this.clearFields();
                    });
                } else {
                    this.$snackbar.open({
                        message: `Country ${newFlag.name} already exists!`,
                        actionText: 'Override',
                        position: 'is-top',
                        type: 'is-warning',
                        duration: 2500,
                        onAction: () => {
                            this.$firebaseRefs.dbFlags
                                .child(this.selectedFlag['.key'])
                                .set({...newFlag}).then(() => {
                                    this.$snackbar.open({
                                        message: `Country ${newFlag.name} successfully updated!`,
                                        actionText: 'OK',
                                        position: 'is-top',
                                        duration: 1500
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
                    this.$snackbar.open({
                        message: `Deleted successfully`,
                        type: 'is-warning',
                        position: 'is-top',
                        duration: 1500
                    });
                });
            },

            selectFlag: function (dbFlag) {
                this.selectedFlag = {...dbFlag};
            },

            clearSelected: function () {
                this.selectedFlag = {};
            },

            clearFields: function () {
                this.clearSelected();

                this.newFlag.name = '';
                this.newFlag.code = '';
            },

            fillFormFields: function (dbFlag) {
                this.selectFlag(dbFlag);

                this.newFlag.name = dbFlag.name;
                this.newFlag.code = dbFlag.code;
            }
        }
    };
</script>

<style lang="scss" scoped>
    @import 'add-flag';
</style>
