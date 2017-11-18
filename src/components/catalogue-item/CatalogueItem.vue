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
            <div v-if="isAromaFormatted" class="catalogue-item-aroma">
                <small
                    v-for="(item, index) in aromaFormatted"
                    :key="index"
                >
                    <span v-show="index > 0 && index < aromaFormatted.length">,</span>
                    <b v-if="item.type === 'primary'" class="light-green--text text--darken-2">{{item.text}}</b>
                    <span v-else-if="item.type === 'secondary'" class="grey--text text--darken-4">{{item.text}}</span>
                    <span v-else-if="item.type === 'extra'" class="grey--text text--darken-1">{{item.text}}</span>
                </small>
            </div>
            <div v-else class="text-xs-center">
                {{aromaFormatted}}
            </div>
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
    import _isArray from 'lodash/isArray';
    import _isEmpty from 'lodash/isEmpty';
    import _isObject from 'lodash/isObject';
    import _isNumber from 'lodash/isNumber';

    import db from '../../firebase';

    import hopsSchema, { USAGE_MAP, STATUS_MAP } from '../pages/add-hops/hops-schema';

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

            alpha: {
                validator: function (o) {
                    return _isObject(o) && _isNumber(o.min) && _isNumber(o.max);
                },
                required: true
            },

            beta: {
                type: Object,
                default: function () {
                    return {};
                }
            },

            co: {
                type: Object,
                default: function () {
                    return {};
                }
            },

            oil: {
                type: Object,
                default: function () {
                    return {};
                }
            },

            myr: {
                type: Object,
                default: function () {
                    return {};
                }
            },

            hum: {
                type: Object,
                default: function () {
                    return {};
                }
            },

            car: {
                type: Object,
                default: function () {
                    return {};
                }
            },

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

            aroma: {
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

            aromaFormatted: function () {
                const aroma = this.aroma;
                const formatted = [];

                if (aroma.primary && aroma.primary.length) {
                    aroma.primary.forEach(i => {
                        formatted.push({
                            text: i,
                            type: 'primary'
                        });
                    });
                }

                if (aroma.secondary && aroma.secondary.length) {
                    aroma.secondary.forEach(i => {
                        formatted.push({
                            text: i,
                            type: 'secondary'
                        });
                    });
                }

                if (aroma.extra && aroma.extra.length) {
                    aroma.extra.forEach(i => {
                        formatted.push({
                            text: i,
                            type: 'extra'
                        });
                    });
                }

                if (!formatted.length) {
                    return 'NA';
                }

                return formatted;
            },

            isAromaFormatted: function () {
                return _isArray(this.aromaFormatted);
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

            isRangeValid: (obj, defaultObj = { min: 0, max: 100 }) => {
                if (_isEmpty(obj)) return false;

                // soft validation, one property can be different from default
                return obj.min >= defaultObj.min && obj.max <= defaultObj.max;
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
                    this.isRangeValid(hops.alpha, hopsSchema.alpha) &&
                    this.isRangeValid(hops.beta, hopsSchema.beta)
                ) {
                    status = 1;
                }

                if (
                    status === 1 &&
                    this.isCountryValid(hops.country) &&
                    this.isStylesValid(hops.styles) &&
                    this.isRangeValid(hops.co, hopsSchema.co) &&
                    this.isRangeValid(hops.oil, hopsSchema.oil) &&
                    this.isRangeValid(hops.myr, hopsSchema.myr) &&
                    this.isRangeValid(hops.hum, hopsSchema.hum) &&
                    this.isRangeValid(hops.car, hopsSchema.car) &&
                    this.isRangeValid(hops.far, hopsSchema.far)
                ) {
                    status = 2;
                }

                return status;
            },

            formatAcid: function (name) {
                const acid = this[name];
                const acidDefaults = hopsSchema[name];

                const min = Number(acid.min);
                const max = Number(acid.max);

                if (!this.isRangeValid(acid, acidDefaults)) {
                    return 'NA';
                }

                return this.average(min, max);
            },

            formatOil: function (name) {
                const oil = this[name];
                const oilDefaults = hopsSchema[name];

                const min = Number(oil.min);
                const max = Number(oil.max);

                if (!this.isRangeValid(oil, oilDefaults)) {
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
