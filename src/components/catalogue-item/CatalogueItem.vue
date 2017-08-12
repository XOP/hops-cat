<template>
    <tr
        :class="componentClassname"
        @click="handleClick"
    >
        <td class="table-cell">
            <div :class="'catalogue-item__status' + ' ' + statusFormatted">
                <b-icon icon="bar-chart"></b-icon>
            </div>
        </td>
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

    import _isEmpty from 'lodash/isEmpty';

    import { USAGE_MAP, STATUS_MAP } from '../pages/add-hops/hops-schema';

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
                type: String,
                default: 'NA'
            },

            // todo: number validation
            alpha: {
                type: Object,
                default: function () {
                    return {};
                }
            },

            // todo: number validation
            beta: {
                type: Object,
                default: function () {
                    return {};
                }
            },

            status: {
                type: Number,
                default: 2
            },

            onClick: {
                type: Function
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
                return USAGE_MAP[this.usage];
            },

            alphaFormatted: function () {
                if (_isEmpty(this.alpha)) {
                    return 'NA';
                }

                return this.average(+this.alpha.min, +this.alpha.max);
            },

            betaFormatted: function () {
                if (_isEmpty(this.beta)) {
                    return 'NA';
                }

                return this.average(+this.beta.min, +this.beta.max);
            },

            statusFormatted: function () {
                return STATUS_MAP[this.getStatusInfo(this)];
            }
        },

        methods: {
            average: (min, max) => {
                return ((min + max) / 2).toFixed(1);
            },

            handleClick: function (e) {
                return this.onClick(this.$props, e);
            },

            getStatusInfo: hops => {
                if (
                    hops.name &&
                    hops.usage &&
                    !_isEmpty(hops.alpha) &&
                    !_isEmpty(hops.beta)
                ) {
                    return 1;
                } else {
                    return 2;
                }
            }
        }
    };
</script>

<style lang="scss" scoped>
    @import './catalogue-item.scss';
</style>
