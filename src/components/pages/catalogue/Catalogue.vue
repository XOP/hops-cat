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
                <template slot="items" scope="props">
                    <catalogue-item
                        :key="props.item.key"
                        :index="props.item.index"
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

            <!--<table class="catalogue__table table is-fullwidth is-narrow">-->
                <!--<catalogue-table-head />-->
                <!--<tbody>-->
                    <!--<catalogue-item-->
                        <!--v-for="(item, index) in itemsProcessed"-->
                        <!--:key="item.key"-->
                        <!--:index="index + 1"-->
                        <!--:name="item.name"-->
                        <!--:country="item.country"-->
                        <!--:usage="item.usage"-->
                        <!--:shelfLife="item.shelfLife"-->
                        <!--:alpha="item.alpha"-->
                        <!--:beta="item.beta"-->
                    <!--&gt;-->
                    <!--</catalogue-item>-->
                <!--</tbody>-->
            <!--</table>-->
        </section>
    </section>
</template>

<script>
    import { mapState } from 'vuex';

    import db from '../../../firebase';

    import CatalogueItem from '../../catalogue-item';
    import CatalogueTableHead from '../../catalogue-table-head';

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

            headers: function () {
                return [
                    {
                        value: 'status',
                        text: 'Status',
                        align: 'left'
                    },
                    {
                        value: 'name',
                        text: 'Name',
                        align: 'left',
                        hint: ''
                    },
                    {
                        value: 'country',
                        text: 'Country',
                        align: 'center',
                        hint: ''
                    },
                    {
                        value: 'usage',
                        text: 'Usage',
                        align: 'center',
                        hint: ''
                    },
                    {
                        value: 'shelfLife',
                        text: 'Shelf Life',
                        align: 'center',
                        hint: locale.tooltips.shelfLife
                    },
                    {
                        value: 'alpha',
                        text: 'Alpha',
                        align: 'center',
                        hint: 'Acid composition, %'
                    },
                    {
                        value: 'beta',
                        text: 'Beta',
                        align: 'center',
                        hint: 'Acid composition, %'
                    },
                    {
                        value: 'co',
                        text: 'Co-hum',
                        align: 'center',
                        hint: 'Acid composition, %'
                    }
                ];
            },

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
