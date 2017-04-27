<template>
    <div class="app">
        <header class="header hero is-dark is-bold">
            <div class="hero-body">
                <div class="container">
                    <h1 class="title is-2">Hops Cat</h1>
                </div>
            </div>
        </header>

        <main role="main" class="main section">
            <router-view></router-view>
        </main>

        <footer class="footer">
            <div class="content has-text-centered">
                <a href="https://github.com/XOP/hops-cat" target="_blank">
                    <b-icon icon="github"></b-icon> Github
                </a>
                <hr />
                Hops Cat <b-icon icon="copyright"></b-icon> 2017
            </div>
        </footer>
    </div>
</template>

<script>
    export default {
        name: 'app'
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

<style>
    html {
        height: 100%;
    }

    body {
        display: flex;
        flex-flow: column;

        height: 100%;
    }
</style>
