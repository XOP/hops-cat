<template>
    <section>
        <h1 class="display-1">Add new Hops</h1>

        <v-alert v-if="!isAuthenticated" :value="true" color="info" class="mb-3">
            <v-btn to="/auth">
                <v-icon left>lock_open</v-icon>
                Authorize
            </v-btn>

            to add hops or

            <v-btn to="/" exact>Go to Catalogue</v-btn>
        </v-alert>

        <div v-if="isAuthenticated">
            <v-container fluid grid-list-lg class="pa-0 mb-3">
                <v-layout row wrap>
                    <v-flex d-flex md8>

                        <v-card>
                            <v-card-text>
                                <v-form v-model="isValid" ref="form" lazy-validation>
                                    <v-layout row wrap>
                                        <v-flex md6>
                                            <v-text-field
                                                label="Name"
                                                v-model.trim="newHops.name"
                                                required
                                                placeholder="Cascade"

                                            >
                                            </v-text-field>
                                        </v-flex>
                                        <v-flex md6>

                                            <b-field :addons="false">
                                                <div class="label">Alias</div>
                                                <div class="columns">
                                                    <div class="column is-narrow">
                                                        <b-input placeholder="X133" name="alias" value=""
                                                                 @keydown.native.enter.prevent="handleAddAlias"
                                                                 ref="input-alias"
                                                        ></b-input>
                                                    </div>
                                                    <div class="column">
                                                        <b-field grouped>
                                                            <div
                                                                    class="control"
                                                                    v-for="(alias, index) in newHops.alias"
                                                            >
                                                                <b-tag
                                                                        size="is-medium"
                                                                        attached
                                                                        closable
                                                                        @close="removeAlias(alias)"
                                                                        :key="index"
                                                                >
                                                                    {{alias}}
                                                                </b-tag>
                                                            </div>
                                                        </b-field>
                                                    </div>
                                                </div>
                                            </b-field>

                                        </v-flex>
                                    </v-layout>

                                    <v-layout row wrap>
                                        <v-flex md6>
                                            <v-select
                                                :items="usageValues"
                                                v-model="newHops.usage"
                                                label="Usage"
                                                hint="Usage"
                                                persistentHint
                                                single-line
                                                bottom
                                            ></v-select>
                                        </v-flex>
                                        <v-flex md6>
                                            <v-select
                                                :items="shelfLifeValues"
                                                v-model="newHops.shelfLife"
                                                hint="Shelf life"
                                                persistentHint
                                                placeholder="NA"
                                                single-line
                                                bottom
                                            ></v-select>
                                        </v-flex>
                                    </v-layout>


                                    <b-field :addons="false" grouped>
                                        <b-field :addons="false">
                                            <div class="label">Countries of origin</div>
                                            <div class="columns">
                                                <div class="column is-narrow">
                                                    <select-tag
                                                            :id="0"
                                                            :value="newHops.country[0]"
                                                            :label="getFlagNameByCode(newHops.country[0])"
                                                            :items="flagsProcessed"
                                                            :itemsMap="countryItemMap"
                                                            @remove="removeFlag"
                                                            @select="selectFlag"
                                                    ></select-tag>
                                                </div>

                                                <div class="column is-narrow" v-if="newHops.country[0]">
                                                    <select-tag
                                                            :id="1"
                                                            :value="newHops.country[1]"
                                                            :label="getFlagNameByCode(newHops.country[1])"
                                                            :items="flagsProcessed"
                                                            :itemsMap="countryItemMap"
                                                            @remove="removeFlag"
                                                            @select="selectFlag"
                                                    ></select-tag>
                                                </div>

                                                <div class="column is-narrow" v-if="newHops.country[1]">
                                                    <select-tag
                                                            :id="2"
                                                            :value="newHops.country[2]"
                                                            :label="getFlagNameByCode(newHops.country[2])"
                                                            :items="flagsProcessed"
                                                            :itemsMap="countryItemMap"
                                                            @remove="removeFlag"
                                                            @select="selectFlag"
                                                    ></select-tag>
                                                </div>
                                            </div>
                                        </b-field>
                                    </b-field>


                                    <label class="body-2">Acid, %</label>
                                    <v-layout row wrap>
                                        <v-flex md4>
                                            <label class="body-1">Alpha</label>
                                            <v-layout column nowrap>
                                                <v-flex>
                                                    <v-text-field label="min" required v-model.number="newHops.alpha.min" type="number"></v-text-field>
                                                </v-flex>
                                                <v-flex>
                                                    <v-text-field label="max" required v-model.number="newHops.alpha.max" type="number"></v-text-field>
                                                </v-flex>
                                            </v-layout>
                                        </v-flex>

                                        <v-flex md4>
                                            <label class="body-1">Beta</label>
                                            <v-layout column nowrap>
                                                <v-flex>
                                                    <v-text-field label="min" required v-model.number="newHops.beta.min" type="number"></v-text-field>
                                                </v-flex>
                                                <v-flex>
                                                    <v-text-field label="max" required v-model.number="newHops.beta.max" type="number"></v-text-field>
                                                </v-flex>
                                            </v-layout>
                                        </v-flex>

                                        <v-flex md4>
                                            <label class="body-1">Co-Humulone</label>
                                            <v-layout column nowrap>
                                                <v-flex>
                                                    <v-text-field label="min" required v-model.number="newHops.co.min" type="number"></v-text-field>
                                                </v-flex>
                                                <v-flex>
                                                    <v-text-field label="max" required v-model.number="newHops.co.max" type="number"></v-text-field>
                                                </v-flex>
                                            </v-layout>
                                        </v-flex>
                                    </v-layout>

                                    <v-alert :value="true" color="info" class="my-2" dismissible v-model="isDefaultPropsNotification">
                                        Some fields were changed to new hops defaults
                                        <!--@click="hideDefaultPropsNotification"-->
                                    </v-alert>

                                    <v-layout row wrap>
                                        <v-flex>
                                            <v-btn color="primary" @click="addHops" :disabled="!isValid">
                                                <v-icon left v-text="isHopsUpdated ? 'mode_edit' : 'add'"></v-icon>
                                                <span v-text="isHopsUpdated ? 'Update' : 'Add'"></span>
                                            </v-btn>

                                            <v-btn color="secondary" @click="clearFields">
                                                <v-icon left v-text="isHopsSelected ? 'select_all' : 'clear_all'"></v-icon>
                                                <span v-text="isHopsSelected ? 'Deselect' : 'Clear Fields'"></span>
                                            </v-btn>
                                        </v-flex>

                                        <v-spacer></v-spacer>

                                        <v-flex text-md-right>
                                            <v-btn color="error" @click="removeHops" :disabled="!isHopsSelected">
                                                <v-icon left>delete</v-icon>
                                                <span>Delete</span>
                                            </v-btn>
                                        </v-flex>
                                    </v-layout>

                                </v-form>
                            </v-card-text>
                        </v-card>

                    </v-flex>

                    <v-flex d-flex md4>

                        <v-card class="grey lighten-4">
                            <v-card-text>
                                <pre><code class="d-block">{{ JSON.stringify(transformHops(newHops), null, 2) }}</code></pre>
                            </v-card-text>
                        </v-card>

                    </v-flex>
                </v-layout>
            </v-container>

            <v-data-table
                class="elevation-1"
                hideActions
                v-bind:headers="headers"
                :items="hopsProcessed"
            >
                <template slot="headerCell" scope="props">
                    <v-tooltip top v-if="props.header.hint">
                        <span slot="activator" class="u-t-pseudo">{{ props.header.text }}</span>
                        <span>{{ props.header.hint }}</span>
                    </v-tooltip>
                    <span v-else>
                        {{ props.header.text }}
                    </span>
                </template>
                <template slot="items" scope="props">
                    <catalogue-item
                        :key="props.item.key"
                        :dbKey="props.item['.key']"
                        :isSelected="props.item.isSelected"
                        :name="props.item.name"
                        :alias="props.item.alias"
                        :country="props.item.country"
                        :usage="props.item.usage"
                        :shelfLife="props.item.shelfLife"
                        :alpha="props.item.alpha"
                        :beta="props.item.beta"
                        :co="props.item.co"
                        :onClick="selectHops"
                    >
                    </catalogue-item>
                </template>
            </v-data-table>

        </div>

    </section>
</template>

<script>
    /* eslint-disable */

    import { mapState } from 'vuex';

    import clone from 'clone';

    import _isEmpty from 'lodash/isEmpty';
    import _isEqual from 'lodash/isEqual';
    import _find from 'lodash/find';
    import _without from 'lodash/without';

    import db from '../../../firebase';

    import CatalogueItem from '../../catalogue-item';
    import SelectTag from '../../select-tag';

    import catalogueTableHeadData from '../../catalogue-table-head/data';

    import hopsSchema from './hops-schema';

    import locale from '../../../locale';
    import { DURATION } from '../../../constants/ui';

    import {
        Flags as mockFlags,
        Items as mockHops
    } from '../../../fixtures/index';

    const itemsRef = db.ref('items');
    const flagsRef = db.ref('flags');

    export default {
        name: 'add-hops',

        firebase: () => ({
            dbHops: itemsRef.orderByKey(),
            dbFlags: flagsRef.orderByKey()
        }),

        components: {
            'catalogue-item': CatalogueItem,
            'select-tag': SelectTag
        },

        props: {
        },

        data () {
            return {
                locale,

                isValid: false,

                newHops: {},
                selectedHops: {},

                hiddenKeys: [],
                isDefaultPropsNotification: false,
                predefinedProps: [
                    'alias',
                    'usage',
                    'shelfLife',
                    'alpha',
                    'beta',
                    'country'
                ],

                countryItemMap: {
                    value: 'code',
                    name: 'name',
                    disabled: 'isSelected'
                },

                usageValues: [
                    { value: 'AB', text: 'Dual' },
                    { value: 'A', text: 'Aroma' },
                    { value: 'B', text: 'Bitter' }
                ],

                shelfLifeValues: [
                    { value: 1, text: '1 - Very poor' },
                    { value: 2, text: '2' },
                    { value: 3, text: '3 - Poor' },
                    { value: 4, text: '4' },
                    { value: 5, text: '5 - Average' },
                    { value: 6, text: '6' },
                    { value: 7, text: '7 - Great' },
                    { value: 8, text: '8' },
                    { value: 9, text: '9 - Exceptional' }
                ]
            };
        },

        beforeMount: function () {
            this.clearFields();
        },

        beforeDestroy: function () {
        },

        computed: {
            ...mapState('debug', ['isDebugMode']),
            ...mapState('user', ['isAuthenticated']),

            headers: catalogueTableHeadData(locale),

            flags: function () {
                return this.isDebugMode ? mockFlags : this.dbFlags;
            },

            flagsProcessed: function () {
                const flagsSelected = this.newHops.country;
                const isFlagSelected = flag => {
                    return flagsSelected.indexOf(flag.code) > -1;
                };

                return this.flags
                    .slice(0)
                    .map(flag => (
                        Object.assign({}, flag, {
                            isSelected: isFlagSelected(flag)
                        })
                    ));
            },

            hops: function () {
                return this.isDebugMode ? mockHops : this.dbHops;
            },

            hopsProcessed: function () {
                const isHopsSelected = hops => {
                    return _isEqual(this.selectedHops, hops);
                };

                return this.hops
                    .slice(0)
                    .reverse()
                    .map(hops => (
                        Object.assign({}, hops, {
                            isSelected: isHopsSelected(hops)
                        })
                    ))
                    .filter(i => this.hiddenKeys.indexOf(i['.key']) === -1);
            },

            isHopsSelected: function () {
                return !_isEmpty(this.selectedHops);
            },

            isHopsUpdated: function () {
                if (_isEmpty(this.selectedHops)) return false;

                const selected = this.selectedHops;
                const edited = this.newHops;

                if (
                    selected['.key'] &&
                    (
                        selected.name !== edited.name ||
                        selected.usage !== edited.usage ||
                        selected.shelfLife !== edited.shelfLife ||
                        !_isEqual(selected.alias, edited.alias) ||
                        !_isEqual(selected.country, edited.country) ||
                        !_isEqual(selected.alpha, edited.alpha) ||
                        !_isEqual(selected.beta, edited.beta) ||
                        !_isEqual(selected.co, edited.co)
                    )
                ) {
                    return true;
                }

                return false;
            },

            isFormValid: function () {
                // todo: proper validation

                return this.newHops.name.trim();
            }
        },

        watch: {
            isDebugMode: function () {
                this.$forceUpdate();
            }
        },

        methods: {
            addHops: function () {
                if (this.isDebugMode) return;

                if (!this.isFormValid) {
                    this.throwError(locale.errors.nameNotSpecified);

                    return;
                }

                // new hops data
                const newHops = this.newHops;
                const newHopsName = newHops.name;

                // check if selected / modified
                // fixme: selectedHops?
                const currentKey = newHops['.key'];
                const currentHops = _find(this.hops, {'.key': currentKey});

                // enhance if needed
                const transformedHops = this.transformHops(newHops);

                // delete db key to prevent firebase conflict
                if (currentKey) {
                    delete transformedHops['.key'];
                }

                if (!currentHops) {
                    this.$firebaseRefs.dbHops.push(transformedHops).then(() => {
                        this.$snackbar.open({
                            message: `Hops ${newHopsName} successfully added!`,
                            actionText: 'OK',
                            position: 'is-top',
                            duration: DURATION.NOTIFICATION_SHORT
                        });

                        this.clearFields();
                    });
                } else {
                    this.$snackbar.open({
                        message: `Confirm new data for ${newHopsName}!`,
                        actionText: 'Override',
                        position: 'is-top',
                        type: 'is-warning',
                        duration: DURATION.NOTIFICATION_NORMAL,
                        onAction: () => {
                            this.$firebaseRefs.dbHops
                                .child(currentKey)
                                .set({...transformedHops}).then(() => {
                                this.$snackbar.open({
                                    message: `Hops ${newHopsName} successfully updated!`,
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

            selectHops: function (hops) {

                // clear previous selection and notifications
                this.clearFields();

                this.selectedHops = _find(this.hops, {['.key']: hops.dbKey});

                // debug
                console.info('selected: ', this.selectedHops);

                this.newHops = {...this.newHops, ...this.selectedHops};

                // backwards compatibility
                const newHops = this.newHops;

                this.predefinedProps.forEach(key => {
                    if (!newHops[key]) {
                        this.isDefaultPropsNotification = true;

                        // assign default value
                        newHops[key] = clone(hopsSchema[key]);
                    }
                });
            },

            removeHops: function () {
                if (this.isDebugMode) return;

                const currentHops = _find(this.hops, {name: this.selectedHops.name});
                const key = currentHops['.key'];

                this.hiddenKeys.push(key);

                const removeTimeout = setTimeout(() => {
                    this.$firebaseRefs.dbHops.child(key).remove();
                }, DURATION.NOTIFICATION_LONG);

                this.clearFields();

                this.$snackbar.open({
                    message: `Deleted successfully`,
                    type: 'is-warning',
                    position: 'is-top',
                    duration: DURATION.NOTIFICATION_LONG,
                    actionText: 'Undo',
                    onAction: () => {
                        this.hiddenKeys = _without(this.hiddenKeys, key);
                        clearTimeout(removeTimeout);
                    }
                });
            },

            transformHops: hops => {
                const transformedHops = clone(hops);

                return Object.assign({}, {}, transformedHops);
            },

            throwError: function (message) {
                this.$toast.open({
                    duration: DURATION.NOTIFICATION_SHORT,
                    message: message || locale.errors._default,
                    position: 'is-top',
                    type: 'is-danger'
                })
            },

            clearFields: function () {
                this.selectedHops = {};
                this.newHops = clone(hopsSchema);

                // clear non-model fields
                this.clearAliasField();

                // remove notifications and errors
                this.hideDefaultPropsNotification();
            },

            removeFlag: function (idx) {
                const updatedFlags = this.newHops.country.slice(0);

                updatedFlags[idx] = null;
                updatedFlags.sort((a, b) => {
                    if (a === null) return 1;
                    if (b === null) return -1;
                });

                this.newHops.country = updatedFlags;
            },

            selectFlag: function (value, idx) {
                if (!value) return;

                const updatedFlags = this.newHops.country.slice(0);

                updatedFlags[idx] = value;

                this.newHops.country = updatedFlags;
            },

            getFlagNameByCode: function (code) {
                const flag = _find(this.flags, { code });

                if (flag) {
                    return flag['name'];
                }
            },

            handleAddAlias: function () {
                const input = this.$refs['input-alias'].$refs.input;
                const alias = input.value;

                if (this.newHops.alias.indexOf(alias) === -1) {
                    this.addAlias(alias);
                    this.clearAliasField();
                } else {
                    // todo: throw notification
                }
            },

            addAlias: function (value) {
                this.newHops.alias.push(value);
            },

            clearAliasField: function () {
                if (!this.$refs['input-alias']) return;

                const input = this.$refs['input-alias'].$refs.input;

                setTimeout(() => {
                    input.value = '';
                }, 0);
            },

            removeAlias: function (value) {
                this.newHops.alias = _without(this.newHops.alias.slice(0), value);
                this.clearAliasField();
            },

            hideDefaultPropsNotification: function () {
                this.isDefaultPropsNotification = false;
            }
        }
    };
</script>

<style lang="scss" scoped>
    @import 'add-hops';
</style>
