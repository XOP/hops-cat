<template>
    <section>
        <h1 class="display-1 mb-2">
            {{ locale.catalogue.title }}

            <v-btn v-if="isAuthenticated" to="/add-hops" class="amber lighten-1">{{ locale.addHops.title }}</v-btn>
        </h1>

        <v-card class="mb-2 elevation-1">
            <v-card-title class="py-1">
                {{ locale.catalogue.sorting }}:

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
            hideActions
            v-bind:headers="headers"
            :items="itemsProcessed"
            item-key=".key"
        >
            <template slot="headerCell" slot-scope="props">
                <v-tooltip top v-if="props.header.hint">
                    <span slot="activator" class="u-t-pseudo">{{ props.header.text }}</span>
                    <span>{{ props.header.hint }}</span>
                </v-tooltip>
                <span v-else>
                    {{ props.header.text }}
                </span>
            </template>
            <template slot="items" slot-scope="props">
                <catalogue-item
                    :key="props.item.key"
                    :name="props.item.name"
                    :alias="props.item.alias"
                    :country="props.item.country"
                    :usage="props.item.usage"
                    :shelfLife="props.item.shelfLife"
                    :alpha="props.item.alpha"
                    :beta="props.item.beta"
                    :co="props.item.co"
                    :oil="props.item.oil"
                    :myr="props.item.myr"
                    :hum="props.item.hum"
                    :car="props.item.car"
                    :far="props.item.far"
                    :aroma="props.item.aroma"
                    :notes="props.item.notes"
                    :styles="props.item.styles"
                    :onClick="handleHopsClick"
                    :ctx="props"
                >
                </catalogue-item>
            </template>
            <template slot="expand" slot-scope="props">
                <v-card flat class="grey lighten-4">
                    <v-card-text class="px-4">
                        {{ props.item.notes }}
                    </v-card-text>
                </v-card>
            </template>
        </v-data-table>
    </section>

</template>

<script>
    import { mapState } from 'vuex';

    import db from '../../../firebase';

    import CatalogueItem from '../../catalogue-item';

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
            'catalogue-item': CatalogueItem
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
            },

            handleHopsClick: function (hops) {
                const { ctx } = hops;

                if (hops.notes) {
                    ctx.expanded = !ctx.expanded;
                }
            }
        }
    };
</script>

<style lang="scss" scoped>
    @import 'catalogue';
</style>
