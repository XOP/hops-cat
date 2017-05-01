<template>
    <section>
        <h1 class="title is-3">Catalogue</h1>

        <section class="section">
            <h2 class="title is-4">Add new item</h2>
            <div>
                <input type="text" v-model="newItem.name" />
                <button @click.prevent="addItem">Add Item</button>
            </div>
        </section>

        <section class="section">
            <h2 class="title is-4">Existing items</h2>

            <div class="field">
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

            <ul>
                <li v-for="item in itemsProcessed">{{ item.name }}</li>
            </ul>
        </section>
    </section>
</template>

<script>
    import Firebase from 'firebase';

    const auth = require('../../../auth.json');

    const config = {
        apiKey: "AIzaSyAclic4voJf-mjs_dLwlpYqjzG9n_LvA7g",
        authDomain: "hops-cat.firebaseapp.com",
        databaseURL: "https://hops-cat.firebaseio.com",
        projectId: "hops-cat",
        storageBucket: "hops-cat.appspot.com",
        messagingSenderId: "64878387063"
    };

    const firebaseApp = Firebase.initializeApp(config);
    const db = firebaseApp.database();

    firebaseApp
        .auth()
        .signInWithEmailAndPassword(auth.email, auth.pass)
        .catch((error) => console.error(error));

    const itemsRef = db.ref('items');

    export default {
        name: 'catalogue',

        firebase: function () {
            return {
                items: itemsRef
            };
        },

        data () {
            return {
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
