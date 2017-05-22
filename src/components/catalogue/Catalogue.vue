<template>
    <section>
        <h1 class="title is-3">Catalogue</h1>

        <section class="section" v-if="!debug">
            <h2 class="title is-4">Add new item</h2>
            <div>
                <input type="text" v-model="newItem.name" />
                <button @click.prevent="addItem">Add Item</button>
            </div>
        </section>

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

            <table class="catalogue__table table">
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
    import Firebase from 'firebase';

    import CatalogueItem from '../catalogue-item';

    import { FIREBASE_CFG } from '../../constants/firebase';

    const auth = require('../../../auth.json');
    const local = require('../../../local.json');

    import {
        Items as mockItems,
        Styles as mockStyles
    } from '../../fixtures';

    const firebaseApp = Firebase.initializeApp(FIREBASE_CFG);
    const db = firebaseApp.database();

    firebaseApp
        .auth()
        .signInWithEmailAndPassword(auth.email, auth.pass)
        .catch((error) => console.error(error));

    const itemsRef = db.ref('items');
    const stylesRef = db.ref('styles');

    const firebaseData = local.debug ?
        (() => null) :
        (() => {
            return {
                items: itemsRef,
                styles: stylesRef
            };
        });

    export default {
        name: 'catalogue',

        firebase: firebaseData,

        components: {
            'catalogue-item': CatalogueItem
        },

        data () {
            return {
                debug: local.debug,

                items: local.debug ? mockItems : null,
                styles: local.debug ? mockStyles : null,

                newItem: {},

                defaultOrder: true,
                sortingOrderAZ: 1
            };
        },

        computed: {
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
    @import './catalogue.scss';
</style>
