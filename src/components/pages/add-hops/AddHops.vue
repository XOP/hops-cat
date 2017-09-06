<template>
    <section>
        <h1 class="title is-3">Add new Hops</h1>

        <b-notification v-if="!isAuthenticated" type="is-info" :closable="false" :hasIcon="true">
            <router-link to="/auth">Authorization</router-link> required to edit database

            <hr>

            <router-link to="/">Go to Hops Catalogue</router-link>
        </b-notification>

        <div v-if="isAuthenticated">

            <div class="columns">
                <div class="column is-8-desktop">

                    <section class="add-hops__form">
                        <form>
                            <b-field grouped>
                                <b-field label="Name" expanded>
                                    <b-input placeholder="Cascade" name="name" required v-model.trim="newHops.name"></b-input>
                                </b-field>

                                <b-field label="Usage">
                                    <b-select expanded v-model="newHops.usage">
                                        <option value="AB">Dual</option>
                                        <option value="A">Aroma</option>
                                        <option value="B">Bitter</option>
                                    </b-select>
                                </b-field>

                                <b-field label="Shelf life">
                                    <b-input placeholder="0 - 10" type="number" name="shelfLife" v-model.number="newHops.shelfLife"></b-input>
                                </b-field>
                            </b-field>

                            <b-field :addons="false">
                                <div class="label">Alias</div>
                                <div class="columns">
                                    <div class="column is-narrow">
                                        <b-input placeholder="X133" name="alias" value=""
                                             @keydown.native.enter.prevent="handleAddAlias"
                                        ></b-input>
                                    </div>
                                    <div class="column">
                                        <b-taglist>
                                            <b-tag
                                                size="is-medium"
                                                type="is-info"
                                                v-for="(alias, index) in newHops.alias"
                                                :key="index"
                                            >
                                                {{alias}}
                                            </b-tag>
                                        </b-taglist>
                                    </div>
                                </div>
                            </b-field>

                            <b-field :addons="false">
                                <div class="label">Countries of origin</div>
                                <div class="columns">
                                    <div class="column is-narrow">
                                        <select-tag
                                            :id="0"
                                            :value="newHops.country[0]"
                                            :label="getFlagNameByCode(newHops.country[0])"
                                            :items="flagsProcessed"
                                            :itemsMap="{
                                                value: 'code',
                                                name: 'name',
                                                disabled: 'isSelected'
                                            }"
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
                                            :itemsMap="{
                                                value: 'code',
                                                name: 'name',
                                                disabled: 'isSelected'
                                            }"
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
                                            :itemsMap="{
                                                value: 'code',
                                                name: 'name',
                                                disabled: 'isSelected'
                                            }"
                                            @remove="removeFlag"
                                            @select="selectFlag"
                                        ></select-tag>
                                    </div>
                                </div>
                            </b-field>

                            <b-field :addons="false">
                                <div class="label">Acid, %</div>

                                <div class="columns">

                                    <div class="column">
                                        <div class="label">Alpha</div>

                                        <b-field :addons="false" grouped>
                                            <b-field expanded>
                                                <b-input placeholder="Min" type="number" name="alphaMin" required v-model.number="newHops.alpha.min"></b-input>
                                            </b-field>
                                            <b-field>-</b-field>
                                            <b-field expanded>
                                                <b-input placeholder="Max" type="number" name="alphaMax" required v-model.number="newHops.alpha.max"></b-input>
                                            </b-field>
                                        </b-field>
                                    </div>

                                    <div class="column">
                                        <div class="label">Beta</div>

                                        <b-field :addons="false" grouped>
                                            <b-field expanded>
                                                <b-input placeholder="Min" type="number" name="betaMin" v-model.number="newHops.beta.min"></b-input>
                                            </b-field>
                                            <b-field>-</b-field>
                                            <b-field expanded>
                                                <b-input placeholder="Max" type="number" name="betaMax" v-model.number="newHops.beta.max"></b-input>
                                            </b-field>
                                        </b-field>
                                    </div>

                                </div>
                            </b-field>

                            <hr>

                            <b-notification
                                :active.sync="isDefaultPropsNotification"
                                @click="hideDefaultPropsNotification"
                            >
                                Some fields were changed to new hops defaults
                            </b-notification>

                            <b-field grouped>
                                <div class="control is-expanded">
                                    <button class="button is-primary is-fullwidth" @click.prevent="addHops">
                                        <span v-if="isHopsUpdated">
                                            <b-icon icon="wrench"></b-icon>
                                            <span>Update Hops</span>
                                        </span>
                                        <span v-else>
                                            <b-icon icon="plus"></b-icon>
                                            <span>Add Hops</span>
                                        </span>
                                    </button>
                                </div>
                                <div class="control">
                                    <button class="button is-fullwidth" @click.prevent="clearFields">
                                        <span v-if="isHopsSelected">
                                            <b-icon icon="times"></b-icon>
                                            <span>Deselect</span>
                                        </span>
                                        <span v-else>
                                            <b-icon icon="eraser"></b-icon>
                                            <span>Clear Fields</span>
                                        </span>
                                    </button>
                                </div>
                                <div class="control" v-if="isHopsSelected">
                                    <button class="button is-fullwidth is-danger" @click.prevent="removeHops">
                                        <b-icon icon="trash"></b-icon>
                                        <span>Delete</span>
                                    </button>
                                </div>
                            </b-field>

                        </form>
                    </section>

                </div>
                <div class="column">

                    <pre><code>{{ JSON.stringify(transformHops(newHops), null, 2) }}</code></pre>

                </div>
            </div>

            <section class="add-hops__section">
                <table class="add-hops__table table is-narrow is-fullwidth is-narrow">
                    <catalogue-table-head />
                    <tbody>
                    <catalogue-item
                        v-for="(hops, index) in hopsProcessed"
                        :key="index"
                        :dbKey="hops['.key']"
                        :index="index + 1"
                        :isSelected="hops.isSelected"
                        :name="hops.name"
                        :alias="hops.alias"
                        :country="hops.country"
                        :usage="hops.usage"
                        :shelfLife="hops.shelfLife"
                        :alpha="hops.alpha"
                        :beta="hops.beta"
                        :onClick="selectHops"
                    ></catalogue-item>
                    </tbody>
                </table>
            </section>

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
    import CatalogueTableHead from '../../catalogue-table-head';
    import SelectTag from '../../select-tag';
    import Tag from '../../tag';

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
            'catalogue-table-head': CatalogueTableHead,
            'select-tag': SelectTag,
            'tag': Tag
        },

        props: {
        },

        data () {
            return {
                locale,

                newHops: {},
                selectedHops: {},

                hiddenKeys: [],
                isDefaultPropsNotification: false,
                predefinedProps: [
                    'usage',
                    'shelfLife',
                    'alpha',
                    'beta',
                    'country'
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
                        !_isEqual(selected.country, edited.country) ||
                        !_isEqual(selected.alpha, edited.alpha) ||
                        !_isEqual(selected.beta, edited.beta)
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
                // remove notifications and errors
                this.hideDefaultPropsNotification();

                this.selectedHops = _find(this.hops, {['.key']: hops.dbKey});

                // debug
                console.info('selected: ', this.selectedHops);

                this.newHops = clone(this.selectedHops);

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

                // remove notifications and errors
                this.hideDefaultPropsNotification();
            },

            removeHops: function () {
                if (this.isDebugMode) return;

                const currentHops = _find(this.hops, {name: this.selectedHops.name});
                const key = currentHops['.key'];

                this.hiddenKeys.push(key);

                const removeTimeout = setTimeout(() => {
                    this.$firebaseRefs.dbHops.child(key).remove();
                }, DURATION.NOTIFICATION_LONG);

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

                // remove redundant props
                delete transformedHops._alias;

                return Object.assign({}, {}, transformedHops);
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

            handleAddAlias: function (e) {
                const alias = e.target.value;

                if (this.newHops.alias.indexOf(alias) === -1) {
                    this.addAlias(alias);
                    this.clearAliasField(e.target);
                } else {
                    // todo: throw notification
                }
            },

            addAlias: function (value) {
                this.newHops.alias.push(value);
            },

            clearAliasField: (input) => {
                setTimeout(() => {
                    input.value = '';
                }, 0);
            },

            removeAlias: function (value) {

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
