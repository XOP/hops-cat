<template>
    <v-footer app dark class="px-2 py-4 grey darken-4 grey--text text--lighten-4">

        <a class="white--text u-no-underline" :href="gitHref" target="_blank">
            <span>{{ locale.footer.githubText }}</span>
            <v-icon class="grey--text text--lighten-4">open_in_new</v-icon>
        </a>

        <v-spacer></v-spacer>

        <div>
            <span>{{ locale.footer.copyright }}</span>
            <span>&emsp;</span>
            {{ new Date().getFullYear() }}
        </div>
    </v-footer>
</template>

<script>
    import { GIT_HREF } from '../../constants/system';
    import locale from '../../locale';

    export default {
        name: 'app-footer',

        data: function () {
            return {
                locale: locale,

                gitHref: GIT_HREF
            };
        }
    };
</script>
