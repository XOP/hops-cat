<template>
    <section>
        <h1 class="title is-3">Storage</h1>

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
            return {};
        },

        computed: {
            ...mapState('simple', [
                'itemsCount'
            ]),
            ...mapGetters('simple', [
                'isCatEmpty'
            ])
        },

        methods: {
            ...mapActions('simple', [
                'addItem',
                'addItemAsync',
                'removeItem'
            ])
        }
    };
</script>

<style lang="scss" scoped>
    @import './storage.scss';
</style>
