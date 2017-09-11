<template>
    <thead>
    <tr>
        <th rowspan="2" class="table-cell --w-min has-text-centered">
            <b-icon icon="bar-chart"></b-icon>
        </th>

        <th rowspan="2" class="table-cell --w-min has-text-centered">
            #
        </th>

        <th rowspan="2" class="table-cell --w-max">
            Name
        </th>

        <th rowspan="2" class="table-cell --w-min has-text-centered">
            Country
        </th>

        <th rowspan="2" class="table-cell --w-min has-text-centered">
            Usage
        </th>

        <th rowspan="2" class="table-cell --w-min has-text-centered">
            <b-tooltip :label="locale.tooltips.shelfLife">
                <b-icon icon="question-circle" size="is-small"/>
            </b-tooltip>

            <span class="u-t-nowrap">Shelf life</span>
        </th>

        <th colspan="3" class="table-cell has-text-centered">
            Acid composition, %
        </th>
    </tr>
    <tr>
        <th class="table-cell --w-min has-text-centered">
            <span class="u-t-nowrap">alpha</span>
        </th>

        <th class="table-cell --w-min has-text-centered">
            <span class="u-t-nowrap">beta</span>
        </th>

        <th class="table-cell --w-min has-text-centered">
            <span class="u-t-nowrap">co-hum</span>
        </th>
    </tr>
    </thead>
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
