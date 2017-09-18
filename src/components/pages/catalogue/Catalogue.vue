<template>
    <section>
        <h1 class="display-1">
            Catalogue
            <v-btn v-if="isAuthenticated" to="/add-hops" class="amber lighten-1">Add Hops</v-btn>
        </h1>

        <section>
            <v-card>
                <v-card-title>
                    Apply sorting:

                    <v-btn
                        icon
                        @click="toggleSortingOrderAz"
                    >
                        <v-icon>sort_by_alpha</v-icon>
                    </v-btn>

                    <v-btn
                        v-if="!defaultOrder"
                        icon
                        @click="setDefaultOrder"
                    >
                        <v-icon>restore</v-icon>
                    </v-btn>
                </v-card-title>
            </v-card>

            <v-data-table
                class="elevation-1"
                v-bind:headers="headers"
                :items="itemsProcessed"
            >
                <template slot="headerCell" scope="props">
                    <span v-if="props.header.hint" v-tooltip:bottom="{ 'html': props.header.hint }">
                        <span class="u-t-pseudo">{{ props.header.text }}</span>
                    </span>
                    <span v-else>
                        {{ props.header.text }}
                    </span>
                </template>
                <template slot="items" scope="props">
                    <catalogue-item
                        :key="props.item.key"
                        :name="props.item.name"
                        :country="props.item.country"
                        :usage="props.item.usage"
                        :shelfLife="props.item.shelfLife"
                        :alpha="props.item.alpha"
                        :beta="props.item.beta"
                        :co="props.item.co"
                    >
                    </catalogue-item>
                </template>
            </v-data-table>
        </section>
    </section>
</template>

<script>
    import { mapState } from 'vuex';

    import db from '../../../firebase';

    import CatalogueItem from '../../catalogue-item';
    import CatalogueTableHead from '../../catalogue-table-head';

    import catalogueTableHeadData from '../../catalogue-table-head/data';

    import {
        Items as mockHops
    } from '../../../fixtures/index';

    import locale from '../../../locale';

    const itemsRef = db.ref('items');

    export default {
        name: 'catalogue',

        firebase: () => ({
            dbHops: itemsRef
        }),

        components: {
            'catalogue-item': CatalogueItem,
            'catalogue-table-head': CatalogueTableHead
        },

        data () {
            return {
                locale,

                defaultOrder: true,
                sortingOrderAZ: 1
            };
        },

        computed: {
            ...mapState('debug', ['isDebugMode']),
            ...mapState('user', ['isAuthenticated']),

            headers: catalogueTableHeadData(locale),

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
