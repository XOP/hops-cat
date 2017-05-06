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
            }
        }
    };
</script>

<style lang="scss" scoped>
    @import './catalogue-item.scss';
</style>
