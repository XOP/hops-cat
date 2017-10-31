<template>
    <tr
        :class="componentClassname"
        @click="handleClick"
    >
        <td class="text-xs-left">
            <v-icon :color="statusFormatted">insert_chart</v-icon>
        </td>
        <td class="text-xs-left">
            <div>{{name}}</div>
            <div class="caption" v-if="aliasFormatted">({{aliasFormatted}})</div>
        </td>
        <td class="text-xs-right">
            <div v-if="country.length" class="u-t-nowrap u-lh-reset">
                <span class="title" v-for="flag in countryFormatted">{{flag}}</span>
            </div>
            <div v-else>
                {{countryFormatted}}
            </div>
        </td>
        <td class="text-xs-right">
            {{usageFormatted}}
        </td>
        <td class="text-xs-right">
            {{shelfLifeFormatted}}
        </td>
        <td class="text-xs-right">
            {{alphaFormatted}}
        </td>
        <td class="text-xs-right">
            {{betaFormatted}}
        </td>
        <td class="text-xs-right">
            {{coFormatted}}
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
            isSelected: {
                type: Boolean
            },

            ctx: {
                type: Object
            },

            dbKey: {
                type: String
            },

            name: {
                type: String,
                required: true
            },

            alias: {
                type: Array,
                default: function () {
                    return [];
                }
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

            // todo: number validation
            co: {
                type: Object,
                default: function () {
                    return {};
                }
            },

            notes: {
                type: String
            },

            status: {
                type: Number,
                default: 2
            },

            onClick: {
                type: Function,
                default: function () {
                    return null;
                }
            }
        },

        data () {
            return {

            };
        },

        computed: {
            componentClassname: function () {
                return cls('catalogue-item', 'table-row', {
                    'is-selected': this.isSelected
                });
            },

            usageFormatted: function () {
                return USAGE_MAP[this.usage];
            },

            aliasFormatted: function () {
                const aliases = this.alias;

                if (!aliases.length) return null;

                return aliases.join(',');
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

            coFormatted: function () {
                const min = Number(this.co.min);
                const max = Number(this.co.max);

                if (!this.isRangeValid(this.co)) {
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

            isCountryValid: (arr) => {
                if (!arr.length) return false;

                return arr[0] !== null;
            },

            handleClick: function (e) {
                return this.onClick(this.$props, e);
            },

            getStatusInfo: function (hops) {
                let status = 0;

                if (
                    hops.name &&
                    hops.usage &&
                    this.isRangeValid(hops.alpha) &&
                    this.isRangeValid(hops.beta)
                ) { status = 1; }

                if (
                    status === 1 &&
                    this.isCountryValid(hops.country) &&
                    this.isRangeValid(hops.co)
                ) {
                    status = 2;
                }

                return status;
            }
        }
    };
</script>

<style lang="scss" scoped>
    @import './catalogue-item.scss';
</style>
