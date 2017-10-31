<template>
    <v-footer app dark class="px-2 py-4 grey darken-4 grey--text text--lighten-4">

        <v-btn small flat dark href="https://github.com/XOP/hops-cat" target="_blank">
            Github
            <v-icon right>open_in_new</v-icon>
        </v-btn>

        <v-spacer></v-spacer>

        <div>
            Hops Cat © {{ new Date().getFullYear() }}
        </div>
    </v-footer>
</template>

<script>
    export default {
        name: 'app-footer'
    };
</script>
