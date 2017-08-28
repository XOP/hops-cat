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
            <div v-if="country.length" class="u-t-nowrap">
                <span class="content is-large" v-for="flag in countryFormatted">{{flag}}</span>
            </div>
            <div v-else>
                {{countryFormatted}}
            </div>
        </td>
        <td class="table-cell has-text-centered">
            {{usageFormatted}}
        </td>
        <td class="table-cell has-text-centered">
            {{shelfLifeFormatted}}
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
    import emoji from 'node-emoji';

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

            dbKey: {
                type: String
            },

            name: {
                type: String,
                required: true
            },

            usage: {
                type: String,
                default: 'NA'
            },

            country: {
                type: Array,
                default: function () {
                    return [];
                }
            },

            shelfLife: {
                type: Number
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

            shelfLifeFormatted: function () {
                return Number(this.shelfLife) || 'NA';
            },

            countryFormatted: function () {
                const flagCodes = this.country;

                if (!flagCodes.length) {
                    return 'NA';
                }

                return flagCodes.map(flagCode => {
                    if (!flagCode) return;

                    return emoji.emojify(`:flag-${flagCode.toLowerCase()}:`);
                });
            },

            alphaFormatted: function () {
                const min = Number(this.alpha.min);
                const max = Number(this.alpha.max);

                if (!this.isRangeValid(this.alpha)) {
                    return 'NA';
                }

                return this.average(min, max);
            },

            betaFormatted: function () {
                const min = Number(this.beta.min);
                const max = Number(this.beta.max);

                if (!this.isRangeValid(this.beta)) {
                    return 'NA';
                }

                return this.average(min, max);
            },

            statusFormatted: function () {
                return STATUS_MAP[this.getStatusInfo(this)];
            }
        },

        methods: {
            average: (min, max) => {
                return ((min + max) / 2).toFixed(1);
            },

            isRangeValid: (obj) => {
                if (_isEmpty(obj)) return false;

                // soft validation, one property can be different from default
                return obj.min !== 0 || obj.max !== 100;
            },

            handleClick: function (e) {
                return this.onClick(this.$props, e);
            },

            getStatusInfo: function (hops) {
                if (
                    hops.name &&
                    hops.usage &&
                    this.isRangeValid(hops.alpha) &&
                    this.isRangeValid(hops.beta)
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
