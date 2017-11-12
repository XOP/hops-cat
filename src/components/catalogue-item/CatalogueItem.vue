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
        <td class="text-xs-right">
            {{oilFormatted}}
        </td>
        <td class="text-xs-right">
            {{myrFormatted}}
        </td>
        <td class="text-xs-right">
            {{humFormatted}}
        </td>
        <td class="text-xs-right">
            {{carFormatted}}
        </td>
        <td class="text-xs-right">
            {{farFormatted}}
        </td>
        <td class="text-xs-left">
            <div v-if="styles.length" class="catalogue-item-styles">
                <small
                    v-for="(item, index) in stylesFormatted"
                    :key="index"
                >
                    <span v-show="index > 0 && index < styles.length">,</span>
                    <span>{{item}}</span>
                </small>
            </div>
            <div v-else class="text-xs-center">
                {{stylesFormatted}}
            </div>
        </td>
        <td class="text-xs-center">
            <v-btn flat icon v-if="notes" @click="handleDetailsClick">
                <v-icon>more_vert</v-icon>
            </v-btn>
        </td>
    </tr>
</template>

<script>
    import cls from 'classnames';
    import emoji from 'node-emoji';
    import { mapState } from 'vuex';

    import _find from 'lodash/find';
    import _isEmpty from 'lodash/isEmpty';

    import db from '../../firebase';

    import { USAGE_MAP, STATUS_MAP } from '../pages/add-hops/hops-schema';

    import { FIREBASE_REFS } from '../../constants/firebase';

    import {
        Styles as mockStyles
    } from '../../fixtures/index';

    const stylesRef = db.ref(FIREBASE_REFS.styles);

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

            // todo: number validation
            oil: {
                type: Object,
                default: function () {
                    return {};
                }
            },

            // todo: number validation
            myr: {
                type: Object,
                default: function () {
                    return {};
                }
            },

            // todo: number validation
            hum: {
                type: Object,
                default: function () {
                    return {};
                }
            },

            // todo: number validation
            car: {
                type: Object,
                default: function () {
                    return {};
                }
            },

            // todo: number validation
            far: {
                type: Object,
                default: function () {
                    return {};
                }
            },

            notes: {
                type: String
            },

            styles: {
                default: function () {
                    return [];
                }
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
            },

            onDetailsClick: {
                type: Function,
                default: function () {
                    return null;
                }
            }
        },

        firebase: () => ({
            dbStyles: stylesRef.orderByKey()
        }),

        data () {
            return {
                isDetailsMode: false
            };
        },

        computed: {
            ...mapState('debug', ['isDebugMode']),

            stylesList: function () {
                return this.isDebugMode ? mockStyles : this.dbStyles;
            },

            componentClassname: function () {
                return cls('catalogue-item', {
                    'amber lighten-4': this.isSelected
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

            stylesFormatted: function () {
                const styleCodes = this.styles;

                if (!styleCodes.length) {
                    return 'NA';
                }

                return styleCodes.map(styleCode => {
                    if (!styleCode) return;

                    let styleName;
                    const styleProps = this.getStyleProps(styleCode);
                    const styles = this.stylesList;
                    const styleObj = _find(styles, styleProps);

                    // find common group name
                    if (!styleProps.sub_code) {
                        styleName = styleObj && styleObj['category'];
                    }

                    // find specific style name
                    if (styleProps.sub_code) {
                        styleName = styleObj && styleObj['name'];
                    }

                    return styleName;
                });
            },

            alphaFormatted: function () {
                return this.formatAcid('alpha');
            },

            betaFormatted: function () {
                return this.formatAcid('beta');
            },

            coFormatted: function () {
                return this.formatAcid('co');
            },

            oilFormatted: function () {
                return this.formatOil('oil');
            },

            myrFormatted: function () {
                return this.formatOil('myr');
            },

            humFormatted: function () {
                return this.formatOil('hum');
            },

            carFormatted: function () {
                return this.formatOil('car');
            },

            farFormatted: function () {
                return this.formatOil('far');
            },

            statusFormatted: function () {
                return STATUS_MAP[this.getStatusInfo(this)];
            }
        },

        methods: {
            getStyleProps: code => {
                const styleProps = {
                    code: ''
                };

                if (code.indexOf('-') > -1) {
                    const codeProcessed = code.split('-');

                    styleProps.code = codeProcessed[0];
                    styleProps.sub_code = codeProcessed[1];
                } else {
                    styleProps.code = code;
                }

                return styleProps;
            },

            average: (min, max) => {
                return ((min + max) / 2).toFixed(1);
            },

            isRangeValid: (obj) => {
                if (_isEmpty(obj)) return false;

                // soft validation, one property can be different from default
                return obj.min !== 0 || obj.max !== 100;
            },

            isCountryValid: (arr) => {
                return Boolean(arr.length);
            },

            isStylesValid: (arr) => {
                return Boolean(arr.length);
            },

            handleClick: function (e) {
                return this.onClick(this.$props, e);
            },

            handleDetailsClick: function (e) {
                e.stopPropagation();

                this.ctx.expanded = !this.ctx.expanded;
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
                    hops.notes &&
                    this.isCountryValid(hops.country) &&
                    this.isStylesValid(hops.styles) &&
                    this.isRangeValid(hops.co)
                ) {
                    status = 2;
                }

                return status;
            },

            formatAcid: function (name) {
                const acid = this[name];

                const min = Number(acid.min);
                const max = Number(acid.max);

                if (!this.isRangeValid(acid)) {
                    return 'NA';
                }

                return this.average(min, max);
            },

            formatOil: function (name) {
                const oil = this[name];

                const min = Number(oil.min);
                const max = Number(oil.max);

                if (!this.isRangeValid(oil)) {
                    return 'NA';
                }

                return this.average(min, max);
            }
        }
    };
</script>

<style lang="scss" scoped>
    @import './catalogue-item.scss';
</style>
