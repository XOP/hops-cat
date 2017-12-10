<template>
    <v-alert v-if="!isAuthenticated" :value="true" color="info" class="mb-3">
        <v-btn to="/auth">
            <v-icon left>lock_open</v-icon>
            {{ locale.auth.authText }}
        </v-btn>

        {{ locale.auth.toEditText }}

        <span>or</span>
        <v-btn to="/" exact>{{ locale.auth.goToCatalogue }}</v-btn>
    </v-alert>
</template>

<script>
    import { mapState } from 'vuex';

    import locale from '../../locale';

    export default {
        name: 'auth-alert',

        data: function () {
            return {
                locale
            };
        },

        computed: {
            ...mapState('user', ['isAuthenticated'])
        },

        components: {
        },

        methods: {
        }
    };
</script>
