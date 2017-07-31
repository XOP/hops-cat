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
                    New Hops: {{newHops.usage}}
                    <hr>

                    <b-field grouped>
                        <b-field label="Name" expanded>
                            <b-input placeholder="Cascade" name="name" required v-model="newHops.name"></b-input>
                        </b-field>

                        <b-field label="Usage">
                            <b-select expanded v-model="newHopsUsage">
                                <option value="dual">Dual</option>
                                <option value="aroma">Aroma</option>
                                <option value="bitter">Bitter</option>
                            </b-select>
                        </b-field>
                    </b-field>


                </form>
            </section>

            <section class="add-hops__section">
                <table class="add-hops__table table is-narrow">
                    <thead>
                    <tr>
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
    import { mapState } from 'vuex';

//    import _isEmpty from 'lodash/isEmpty';
//    import _find from 'lodash/find';
//    import _without from 'lodash/without';

    import db from '../../../firebase';

    import CatalogueItem from '../../catalogue-item';

//    import { DURATION } from '../../../constants/ui';

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
                newHops: {
                    usage: {}
                },

                newHopsUsage: 'dual',

                selectedHops: {}
            };
        },

        beforeMount: function () {
            this.newHops.usage = this._newHopsUsage;
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
                    .reverse();
            },

            _newHopsUsage: function () {
                const usage = {
                    aroma: true,
                    bitter: true
                };

                if (this.newHopsUsage === 'aroma') {
                    usage.bitter = false;
                } else if (this.newHopsUsage === 'bitter') {
                    usage.aroma = false;
                }

                return usage;
            }
        },

        watch: {
            isDebugMode: function () {
                this.$forceUpdate();
            },

            _newHopsUsage: function () {
                this.newHops.usage = this._newHopsUsage;
            }
        },

        methods: {
            selectHops: function (hops) {
                this.selectedHops = {...hops};
            }
        }
    };
</script>

<style lang="scss" scoped>
    @import 'add-hops';
</style>
