<template>
    <section>
        <h1 class="title is-3">Add new Hops</h1>

        <b-notification v-if="!isAuthenticated" type="is-info" :closable="false" :hasIcon="true">
            <router-link to="/auth">Authorization</router-link> required to edit database

            <hr>

            <router-link to="/">Go to Hops Catalogue</router-link>
        </b-notification>

        <div v-if="isAuthenticated">

            <section class="add-hops__form">
                <form>
                    <h4 class="title is-4">Selected: {{newHops.name}}</h4>

                    <b-field grouped>
                        <b-field label="Name" expanded>
                            <b-input placeholder="Cascade" name="name" required v-model="newHops.name"></b-input>
                        </b-field>

                        <b-field label="Usage">
                            <b-select required expanded v-model="newHops.usage">
                                <option value="AB">Dual</option>
                                <option value="A">Aroma</option>
                                <option value="B">Bitter</option>
                            </b-select>
                        </b-field>
                    </b-field>

                    <b-field :addons="false">
                        <div class="label">Acid, %</div>

                        <div class="columns">

                            <div class="column">
                                <div class="label">Alpha</div>

                                <b-field :addons="false" grouped>
                                    <b-field expanded>
                                        <b-input placeholder="Min" type="number" name="alphaMin" required v-model="newHops.alpha.min"></b-input>
                                    </b-field>
                                    <b-field>-</b-field>
                                    <b-field expanded>
                                        <b-input placeholder="Max" type="number" name="alphaMax" required v-model="newHops.alpha.max"></b-input>
                                    </b-field>
                                </b-field>
                            </div>

                            <div class="column">
                                <div class="label">Beta</div>

                                <b-field :addons="false" grouped>
                                    <b-field expanded>
                                        <b-input placeholder="Min" type="number" name="betaMin" v-model="newHops.beta.min"></b-input>
                                    </b-field>
                                    <b-field>-</b-field>
                                    <b-field expanded>
                                        <b-input placeholder="Max" type="number" name="betaMax" v-model="newHops.beta.max"></b-input>
                                    </b-field>
                                </b-field>
                            </div>

                        </div>
                    </b-field>

                    <hr>

                    <b-field grouped>
                        <div class="control is-expanded">
                            <button class="button is-primary is-fullwidth" @click.prevent="addHops">
                                <b-icon icon="plus"></b-icon>
                                <span>Add Hops</span>
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

            <section class="add-hops__section">
                <table class="add-hops__table table is-narrow is-fullwidth is-narrow">
                    <thead>
                    <tr>
                        <th class="table-cell --w-min has-text-centered">
                            <b-icon icon="bar-chart"></b-icon>
                        </th>
                        <th class="table-cell --w-min has-text-centered">#</th>
                        <th class="table-cell --w-max">Name</th>
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

    import hopsSchema from './hops-schema';

    import { DURATION } from '../../../constants/ui';

    import {
        Items as mockHops
    } from '../../../fixtures/index';

    const itemsRef = db.ref('items');

    export default {
        name: 'add-hops',

        firebase: () => ({
            dbHops: itemsRef.orderByKey()
        }),

        components: {
            'catalogue-item': CatalogueItem
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

                const newHops = this.newHops;
                const newHopsName = newHops.name;

                const currentHops = _find(this.hops, {name: newHopsName});

                if (!currentHops) {
                    this.$firebaseRefs.dbHops.push(newHops).then(() => {
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
                                .set({...newHops}).then(() => {
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
                this.newHops.usage = this.selectedHops.usage;

                // chemistry
                this.newHops.alpha = clone(this.selectedHops.alpha);
                this.newHops.beta = clone(this.selectedHops.beta);
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
            }
        }
    };
</script>

<style lang="scss" scoped>
    @import 'add-hops';
</style>
