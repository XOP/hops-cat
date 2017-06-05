<template>
    <header class="header">
        <section class="hero is-success is-bold">
            <navi></navi>
        </section>

        <b-notification v-if="isDebugMode" type="is-warning" :closable="false">
            Debug mode
        </b-notification>
    </header>
</template>

<script>
    import { mapState } from 'vuex';

    import Navi from './components/navi';

    export default {
        name: 'app-header',

        computed: {
            ...mapState('debug', ['isDebugMode'])
        },

        components: {
            navi: Navi
        }
    };
</script>
