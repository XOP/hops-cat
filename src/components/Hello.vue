<template>
    <section>
        <h1>{{ msg }}</h1>

        <dl>
            <dt>items count</dt>
            <dd>{{ itemsCount }}</dd>

            <dt>catalog is empty</dt>
            <dd>{{ isCatEmpty }}</dd>
        </dl>

        <hr>

        <button @click.prevent="addItem">Add Item</button>
        <button @click.prevent="addItemAsync">Add Item Async</button>
        <button @click.prevent="removeItem">Remove Item</button>
    </section>
</template>

<script>
    import { mapState, mapGetters, mapActions } from 'vuex';

    export default {
        name: 'hello',

        data () {
            return {
                msg: 'Hops Cat'
            };
        },

        computed: {
            ...mapState([
                'itemsCount'
            ]),
            ...mapGetters([
                'isCatEmpty'
            ])
        },

        methods: {
            ...mapActions([
                'addItem',
                'addItemAsync',
                'removeItem'
            ])
        }
    };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
    @import 'hello.scss';
</style>
