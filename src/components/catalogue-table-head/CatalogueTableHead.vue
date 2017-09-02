<template>
    <thead>
    <tr>
        <th class="table-cell --w-min has-text-centered">
            <b-icon icon="bar-chart"></b-icon>
        </th>

        <th class="table-cell --w-min has-text-centered">
            #
        </th>

        <th class="table-cell --w-max">
            Name
        </th>

        <th class="table-cell --w-min has-text-centered">
            Country
        </th>

        <th class="table-cell --w-min has-text-centered">
            Usage
        </th>

        <th class="table-cell --w-min has-text-centered">
            <span class="u-t-nowrap">Shelf life</span>
            <b-tooltip :label="locale.tooltips.shelfLife">
                <b-icon icon="question-circle" size="is-small"/>
            </b-tooltip>
        </th>

        <th class="table-cell --w-min has-text-centered">
            alpha, %
        </th>

        <th class="table-cell --w-min has-text-centered">
            beta, %
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
