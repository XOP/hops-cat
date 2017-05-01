<template>
    <div class="app">
        <app-header></app-header>

        <main role="main" class="main section">
            <router-view></router-view>
        </main>

        <app-footer></app-footer>
    </div>
</template>

<script>
    import Header from './Header.vue';
    import Footer from './Footer.vue';

    export default {
        name: 'app',

        components: {
            'app-header': Header,
            'app-footer': Footer
        },
    };
</script>

<style scoped>
    .app {
        display: flex;
        flex-flow: column;

        height: 100%;
    }

    header {
        flex: 0 1 auto;
    }

    main {
        flex: 1 0 auto;
    }

    footer {
        flex: 0 1 auto;
    }
</style>
