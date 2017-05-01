<template>
    <header class="header">
        <section class="hero is-success is-bold">
            <navi></navi>
        </section>
    </header>
</template>

<script>
    import Navi from './Navi.vue';

    export default {
        name: 'app-header',

        components: {
            navi: Navi
        }
    };
</script>
