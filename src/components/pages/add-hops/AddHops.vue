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
                            </b-field>

                            <b-field :addons="false">
                                <div class="label">Countries of origin</div>
                                <div class="columns">
                                    <div class="column is-narrow">

                                        <b-field>
                                            <p class="control">
                                                <b-dropdown v-model="newHops.country[0]">
                                                    <button class="button" type="button" slot="trigger">
                                                        <span v-text="getFlagNameByCode(newHops.country[0]) || 'Select'"></span>
                                                        <b-icon icon="caret-down" size="is-small"></b-icon>
                                                    </button>

                                                    <b-dropdown-item value="us">USA</b-dropdown-item>
                                                    <b-dropdown-item value="de">Germany</b-dropdown-item>
                                                    <b-dropdown-item value="nz">New Zealand</b-dropdown-item>
                                                </b-dropdown>
                                            </p>
                                            <p class="control" v-if="newHops.country[0]">
                                                <button class="button is-warning" type="button">
                                                    <b-icon icon="times" size="is-small"></b-icon>
                                                </button>
                                            </p>
                                        </b-field>

                                    </div>

                                    <div class="column is-narrow" v-if="newHops.country.length > 0">

                                        <b-field>
                                            <p class="control">
                                                <b-dropdown v-model="newHops.country[1]">
                                                    <button class="button" type="button" slot="trigger">
                                                        <span v-text="getFlagNameByCode(newHops.country[1]) || 'Select'"></span>
                                                        <b-icon icon="caret-down" size="is-small"></b-icon>
                                                    </button>

                                                    <b-dropdown-item value="us">USA</b-dropdown-item>
                                                    <b-dropdown-item value="de">Germany</b-dropdown-item>
                                                    <b-dropdown-item value="nz">New Zealand</b-dropdown-item>
                                                </b-dropdown>
                                            </p>
                                            <p class="control" v-if="newHops.country[1]">
                                                <button class="button is-warning" type="button">
                                                    <b-icon icon="times" size="is-small"></b-icon>
                                                </button>
                                            </p>
                                        </b-field>

                                    </div>

                                    <div class="column is-narrow" v-if="newHops.country.length > 1">

                                        <b-field>
                                            <p class="control">
                                                <b-dropdown v-model="newHops.country[2]">
                                                    <button class="button" type="button" slot="trigger">
                                                        <span v-text="getFlagNameByCode(newHops.country[2]) || 'Select'"></span>
                                                        <b-icon icon="caret-down" size="is-small"></b-icon>
                                                    </button>

                                                    <b-dropdown-item value="us">USA</b-dropdown-item>
                                                    <b-dropdown-item value="de">Germany</b-dropdown-item>
                                                    <b-dropdown-item value="nz">New Zealand</b-dropdown-item>
                                                </b-dropdown>
                                            </p>
                                            <p class="control" v-if="newHops.country[2]">
                                                <button class="button is-warning" type="button">
                                                    <b-icon icon="times" size="is-small"></b-icon>
                                                </button>
                                            </p>
                                        </b-field>

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
                                        <b-icon icon="eraser"></b-icon>
                                        <span>Clear Fields</span>
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
                    <thead>
                    <tr>
                        <th class="table-cell --w-min has-text-centered">
                            <b-icon icon="bar-chart"></b-icon>
                        </th>
                        <th class="table-cell --w-min has-text-centered">#</th>
                        <th class="table-cell --w-max">Name</th>
                        <th class="table-cell --w-min has-text-centered">Country</th>
                        <th class="table-cell --w-min has-text-centered">Usage</th>
                        <th class="table-cell --w-min has-text-centered">alpha, %</th>
                        <th class="table-cell --w-min has-text-centered">beta, %</th>
                    </tr>
                    </thead>
                    <tbody>
                    <catalogue-item
                        v-for="(hops, index) in hopsProcessed"
                        :key="hops.key"
                        :index="index + 1"
                        :name="hops.name"
                        :country="hops.country"
                        :usage="hops.usage"
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
    import _find from 'lodash/find';
    import _without from 'lodash/without';

    import db from '../../../firebase';

    import CatalogueItem from '../../catalogue-item';
    import Tag from '../../tag';

    import hopsSchema from './hops-schema';
    import locale from './locale';

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
            'tag': Tag
        },

        props: {
        },

        data () {
            return {
                newHops: {},

                selectedHops: {},

                hiddenKeys: []
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

            hops: function () {
                return this.isDebugMode ? mockHops : this.dbHops;
            },

            hopsProcessed: function () {
                return this.hops
                    .slice()
                    .reverse()
                    .filter(i => this.hiddenKeys.indexOf(i['.key']) === -1);
            },

            isHopsSelected: function () {
                return !_isEmpty(this.selectedHops);
            },

            isHopsUpdated: function () {
                // todo: updated state

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

                const newHops = this.newHops;
                const newHopsName = newHops.name;

                const currentHops = _find(this.hops, {name: newHopsName});
                const transformedHops = this.transformHops(newHops);

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
                        message: `Hops ${newHopsName} already exists!`,
                        actionText: 'Override',
                        position: 'is-top',
                        type: 'is-warning',
                        duration: DURATION.NOTIFICATION_NORMAL,
                        onAction: () => {
                            this.$firebaseRefs.dbHops
                                .child(currentHops['.key'])
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
                // fixme: universal selection method
                // this.selectedHops = _find(this.hops, {name: hops.name});

                this.selectedHops = {...hops};

                // debug
                console.info('selected: ', this.selectedHops);

                // general
                this.newHops.name = this.selectedHops.name;
                this.newHops.country = this.selectedHops.country;
                this.newHops.usage = this.selectedHops.usage;

                // chemistry
                this.newHops.alpha = clone(this.selectedHops.alpha);
                this.newHops.beta = clone(this.selectedHops.beta);
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
                this.newHops = clone(hopsSchema);
                this.selectedHops = {};
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
                return hops;
            },

            removeFlag: function (flag, e) {
                console.log(flag, e);
            },

            getFlagNameByCode: function (code) {
                const flag = _find(this.flags, { code });

                if (flag) {
                    return flag['name'];
                }
            }
        }
    };
</script>

<style lang="scss" scoped>
    @import 'add-hops';
</style>
