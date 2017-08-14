<template>
    <section>
        <h1 class="title is-3">Catalogue</h1>

        <b-notification v-if="isAuthenticated" type="is-info" :closable="false">
            <router-link to="/add-hops">Add Hops here</router-link>
        </b-notification>

        <section>
            <div class="box">
                Sort:

                <button
                    class="button is-small is-warning"
                    @click="setDefaultOrder"
                >
                    Reset
                </button>

                <button
                    class="button is-small is-info"
                    @click="toggleSortingOrderAz"
                >
                    <b-icon
                        size="is-small"
                        :icon="sortingOrderAZ > 0 ? 'sort-alpha-asc' : 'sort-alpha-desc'">
                    </b-icon>
                </button>
            </div>

            <table class="catalogue__table table is-fullwidth is-narrow">
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
                        v-for="(item, index) in itemsProcessed"
                        :key="item.key"
                        :index="index + 1"
                        :name="item.name"
                        :usage="item.usage"
                        :alpha="item.alpha"
                        :beta="item.beta"
                    >
                    </catalogue-item>
                </tbody>
            </table>
        </section>
    </section>
</template>

<script>
    import { mapState } from 'vuex';

    import db from '../../../firebase';

    import CatalogueItem from '../../catalogue-item';

    import {
        Items as mockHops
    } from '../../../fixtures/index';

    const itemsRef = db.ref('items');

    export default {
        name: 'catalogue',

        firebase: () => ({
            dbHops: itemsRef
        }),

        components: {
            'catalogue-item': CatalogueItem
        },

        data () {
            return {
                defaultOrder: true,
                sortingOrderAZ: 1
            };
        },

        computed: {
            ...mapState('debug', ['isDebugMode']),
            ...mapState('user', ['isAuthenticated']),

            items: function () {
                return this.isDebugMode ? mockHops : this.dbHops;
            },

            itemsKeys: function () {
                return this.items.slice().map((item, key) => ({...item, key}));
            },

            itemsProcessed: function () {
                let items = this.itemsKeys;

                if (this.defaultOrder) {
                    return items;
                }

                items = items.slice().sort((a, b) => {
                    const nameA = a.name;
                    const nameB = b.name;

                    const nameAfirstLetter = nameA[0];
                    const nameBfirstLetter = nameB[0];

                    return (
                        nameAfirstLetter === nameBfirstLetter ? 0
                            : nameAfirstLetter > nameBfirstLetter ? 1 : -1
                    ) * this.sortingOrderAZ;
                });

                return items;
            }
        },

        methods: {
            addItem: function () {
                itemsRef.push(this.newItem);

                this.newItem.name = '';
            },

            setDefaultOrder: function () {
                this.defaultOrder = true;
            },

            toggleSortingOrderAz: function () {
                if (this.defaultOrder) {
                    this.defaultOrder = false;

                    return;
                }

                this.sortingOrderAZ = this.sortingOrderAZ * -1;
            }
        }
    };
</script>

<style lang="scss" scoped>
    @import 'catalogue';
</style>
