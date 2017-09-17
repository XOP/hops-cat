<template>
    <tr>
        <th class="">
            <v-icon>insert_chart</v-icon>
        </th>

        <th class="">
            Name
        </th>

        <th class="">
            Country
        </th>

        <th class="">
            Usage
        </th>

        <th class="">
            <b-tooltip :label="locale.tooltips.shelfLife">
                <b-icon icon="question-circle" size="is-small"/>
            </b-tooltip>

            <span class="u-t-nowrap">Shelf life</span>
        </th>

        <th class="">
            <span class="u-t-nowrap">alpha</span>
        </th>

        <th class="">
            <span class="u-t-nowrap">beta</span>
        </th>

        <th class="">
            <span class="u-t-nowrap">co-hum</span>
        </th>
    </tr>
</template>

<script>
    import locale from '../../locale';

    export default {
        name: 'catalogue-table-head',

        data: function () {
            return {
                locale
            };
        },

        computed: {

        },

        methods: {

        }
    };
</script>

<style scoped>
    th.table-cell {
        vertical-align: bottom;
    }
</style>
