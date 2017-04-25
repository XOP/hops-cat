<template>
    <section>
        <h1>Catalogue</h1>

        <section>
            <h2>Add new item</h2>
            <div>
                <input type="text" v-model="newItem.name" />
                <button @click.prevent="addItem">Add Item</button>
            </div>
        </section>

        <section>
            <h2>Existing items</h2>
            <ul>
                <li v-for="item in items">{{ item.name }}</li>
            </ul>
        </section>
    </section>
</template>

<script>
    import Firebase from 'firebase';

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

    const itemsRef = db.ref('items');

    export default {
        name: 'catalogue',

        firebase: {
            items: itemsRef
        },

        data () {
            return {
                newItem: {}
            };
        },

        computed: {

        },

        methods: {
            addItem: function() {
                itemsRef.push(this.newItem);

                this.newItem.name = '';
            }
        }
    };
</script>

<style lang="scss" scoped>
    @import 'catalogue.scss';
</style>
