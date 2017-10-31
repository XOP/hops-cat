<template>
    <v-footer app dark class="px-2 py-4 grey darken-4 grey--text text--lighten-4">

        <a class="white--text u-no-underline" :href="gitHref" target="_blank">
            Github
            <v-icon class="grey--text text--lighten-4">open_in_new</v-icon>
        </a>

        <v-spacer></v-spacer>

        <div>
            Hops Cat © {{ new Date().getFullYear() }}
        </div>
    </v-footer>
</template>

<script>
    import { GIT_HREF } from '../../constants/system';

    export default {
        name: 'app-footer',

        data: function () {
            return {
                gitHref: GIT_HREF
            };
        }
    };
</script>
