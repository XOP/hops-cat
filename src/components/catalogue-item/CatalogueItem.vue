<template>
    <tr :class="componentClassname">
        <td class="table-cell">
            {{index}}
        </td>
        <td class="table-cell">
            {{name}}
        </td>
        <td class="table-cell has-text-centered">
            {{usageFormatted}}
        </td>
        <td class="table-cell has-text-centered">
            {{alphaFormatted}}
        </td>
        <td class="table-cell has-text-centered">
            {{betaFormatted}}
        </td>
    </tr>
</template>

<script>
    import cls from 'classnames';

    export default {
        name: 'catalogue-item',

        props: {
            index: {
                type: Number,
                required: true,
                validator: function (i) {
                    return i > 0;
                }
            },

            name: {
                type: String,
                required: true
            },

            usage: {
                type: Array,
                default: []
            },

            alpha: {
                type: Object,
                default: 'NA'
            },

            beta: {
                type: Object,
                default: 'NA'
            }
        },

        data () {
            return {

            };
        },

        computed: {
            componentClassname: function () {
                return cls('catalogue-item', 'table-row', {});
            },

            usageFormatted: function () {
                const usageArray = this.usage;
                let usage = 'Dual';

                if (!usageArray.length) {
                    usage = 'NA';
                }

                if (usageArray.length === 1) {
                    usage = usageArray[0];
                }

                return usage;
            },

            alphaFormatted: function () {
                // todo: check if empty

                return this.average(this.alpha.min, this.alpha.max);
            },

            betaFormatted: function () {
                // todo: check if empty

                return this.average(this.beta.min, this.beta.max);
            }
        },

        methods: {
            average: (min, max) => {
                return ((min + max) / 2).toFixed(1);
            }
        }
    };
</script>

<style lang="scss" scoped>
    @import './catalogue-item.scss';
</style>
