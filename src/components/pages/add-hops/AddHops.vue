<template>
    <section>
        <h1 class="display-1 mb-2">{{ locale.addHops.title }}</h1>

        <auth-alert></auth-alert>

        <div v-if="isAuthenticated">
            <v-container fluid grid-list-lg class="pa-0 mb-3">
                <v-layout row wrap>
                    <v-flex d-flex md8>
                        <v-card>
                            <v-card-text>

                                <v-form v-model="isValid" ref="form">
                                    <label class="title">{{ locale.addHops.form.titles.common }}</label>
                                    <v-layout row wrap>
                                        <v-flex sm6>
                                            <v-text-field
                                                :label="locale.addHops.form.labels.name"
                                                v-model.trim="newHops.name"
                                                required
                                                :placeholder="locale.addHops.form.placeholders.name"
                                                :rules="nameRules"
                                            >
                                            </v-text-field>
                                        </v-flex>
                                        <v-flex sm6>
                                            <v-select
                                                :label="locale.addHops.form.labels.alias"
                                                tags
                                                chips
                                                appendIcon=""
                                                v-model="newHops.alias"
                                                :hint="locale.addHops.form.hints.alias"
                                            >
                                                <template slot="selection" slot-scope="data">
                                                    <input-chip
                                                        :item="data.item"
                                                        :onClose="removeAlias"
                                                        :selected="data.selected"
                                                    >
                                                    </input-chip>
                                                </template>
                                            </v-select>
                                        </v-flex>
                                    </v-layout>

                                    <v-layout row wrap>
                                        <v-flex sm6>
                                            <v-select
                                                :items="usageValues"
                                                v-model="newHops.usage"
                                                :label="locale.addHops.form.labels.usage"
                                                :hint="locale.addHops.form.hints.usage"
                                                persistentHint
                                                single-line
                                                bottom
                                            ></v-select>
                                        </v-flex>
                                        <v-flex sm6>
                                            <v-select
                                                :items="shelfLifeValues"
                                                v-model="newHops.shelfLife"
                                                :hint="locale.addHops.form.hints.shelfLife"
                                                persistentHint
                                                :placeholder="locale.addHops.form.placeholders.shelfLife"
                                                single-line
                                                bottom
                                            ></v-select>
                                        </v-flex>
                                    </v-layout>

                                    <div class="title">{{ locale.addHops.form.titles.aroma }}</div>

                                    <v-select
                                        item-value="value"
                                        :label="locale.addHops.form.labels.primary"
                                        chips
                                        tags
                                        :items="aromasPrimary"
                                        appendIcon=""
                                        prependIcon="looks_one"
                                        v-model="newHops.aroma.primary"
                                        autocomplete
                                        maxHeight="400"
                                    >
                                        <template slot="selection" slot-scope="data">
                                            <v-chip
                                                :key="JSON.stringify(data.item)"
                                                color="light-green"
                                            >
                                                {{ data.item }}
                                            </v-chip>
                                        </template>
                                        <template slot="item" slot-scope="data">
                                            <v-list-tile-action>
                                                <v-checkbox
                                                    v-model="data.item.selected"
                                                    :disabled="!data.item.isSelected"
                                                ></v-checkbox>
                                            </v-list-tile-action>
                                            <v-list-tile-content>
                                                <v-list-tile-title>{{ data.item.text }}</v-list-tile-title>
                                            </v-list-tile-content>
                                        </template>
                                    </v-select>

                                    <v-select
                                        item-value="value"
                                        :disabled="isAroma2Disabled"
                                        :label="locale.addHops.form.labels.secondary"
                                        chips
                                        tags
                                        :items="aromasSecondary"
                                        appendIcon=""
                                        prependIcon="looks_two"
                                        v-model="newHops.aroma.secondary"
                                        autocomplete
                                        maxHeight="400"
                                    >
                                        <template slot="selection" slot-scope="data">
                                            <v-chip
                                                :key="JSON.stringify(data.item)"
                                                color="amber"
                                            >
                                                {{ data.item }}
                                            </v-chip>
                                        </template>
                                        <template slot="item" slot-scope="data">
                                            <v-list-tile-action>
                                                <v-checkbox
                                                    v-model="data.item.selected"
                                                    :disabled="!data.item.isSelected"
                                                ></v-checkbox>
                                            </v-list-tile-action>
                                            <v-list-tile-content>
                                                <v-list-tile-title>{{ data.item.text }}</v-list-tile-title>
                                            </v-list-tile-content>
                                        </template>
                                    </v-select>

                                    <v-select
                                        item-value="value"
                                        :disabled="isAroma3Disabled"
                                        :label="locale.addHops.form.labels.extra"
                                        chips
                                        tags
                                        :items="aromasExtra"
                                        appendIcon=""
                                        prependIcon="looks_3"
                                        v-model="newHops.aroma.extra"
                                        autocomplete
                                        maxHeight="400"
                                    >
                                        <template slot="item" slot-scope="data">
                                            <v-list-tile-action>
                                                <v-checkbox
                                                    v-model="data.item.selected"
                                                    :disabled="!data.item.isSelected"
                                                ></v-checkbox>
                                            </v-list-tile-action>
                                            <v-list-tile-content>
                                                <v-list-tile-title>{{ data.item.text }}</v-list-tile-title>
                                            </v-list-tile-content>
                                        </template>
                                    </v-select>

                                    <div class="title">{{ locale.addHops.form.titles.chem }}</div>

                                    <label class="subheading">{{ locale.addHops.form.titles.acid }}</label>
                                    <v-layout row wrap>
                                        <v-flex md4>
                                            <label class="body-1">{{ locale.addHops.form.labels.alpha }}</label>
                                            <v-layout column nowrap>
                                                <v-flex>
                                                    <v-text-field :rules="acidRules" :label="locale.general.min" required v-model.number="newHops.alpha.min" type="number"></v-text-field>
                                                </v-flex>
                                                <v-flex>
                                                    <v-text-field :rules="acidRules" label="locale.general.max" required v-model.number="newHops.alpha.max" type="number"></v-text-field>
                                                </v-flex>
                                            </v-layout>
                                        </v-flex>

                                        <v-flex md4>
                                            <label class="body-1">{{ locale.addHops.form.labels.beta }}</label>
                                            <v-layout column nowrap>
                                                <v-flex>
                                                    <v-text-field :label="locale.general.min" v-model.number="newHops.beta.min" type="number"></v-text-field>
                                                </v-flex>
                                                <v-flex>
                                                    <v-text-field :label="locale.general.max" v-model.number="newHops.beta.max" type="number"></v-text-field>
                                                </v-flex>
                                            </v-layout>
                                        </v-flex>

                                        <v-flex md4>
                                            <label class="body-1">{{ locale.addHops.form.labels.cohum }}</label>
                                            <v-layout column nowrap>
                                                <v-flex>
                                                    <v-text-field :label="locale.general.min" v-model.number="newHops.co.min" type="number"></v-text-field>
                                                </v-flex>
                                                <v-flex>
                                                    <v-text-field :label="locale.general.max" v-model.number="newHops.co.max" type="number"></v-text-field>
                                                </v-flex>
                                            </v-layout>
                                        </v-flex>
                                    </v-layout>

                                    <label class="subheading">{{ locale.addHops.form.titles.oil }}</label>
                                    <v-layout row wrap>
                                        <v-flex md4>
                                            <label class="body-1">{{ locale.addHops.form.labels.total }}</label>
                                            <v-layout column nowrap>
                                                <v-flex>
                                                    <v-text-field :rules="oilRules" :label="locale.general.min" v-model.number="newHops.oil.min" type="number"></v-text-field>
                                                </v-flex>
                                                <v-flex>
                                                    <v-text-field :rules="oilRules" :label="locale.general.max" v-model.number="newHops.oil.max" type="number"></v-text-field>
                                                </v-flex>
                                            </v-layout>
                                        </v-flex>

                                        <v-flex md2>
                                            <label class="body-1">{{ locale.addHops.form.labels.myr }}</label>
                                            <v-layout column nowrap>
                                                <v-flex>
                                                    <v-text-field :rules="oilRules" :label="locale.general.min" v-model.number="newHops.myr.min" type="number"></v-text-field>
                                                </v-flex>
                                                <v-flex>
                                                    <v-text-field :rules="oilRules" :label="locale.general.max" v-model.number="newHops.myr.max" type="number"></v-text-field>
                                                </v-flex>
                                            </v-layout>
                                        </v-flex>

                                        <v-flex md2>
                                            <label class="body-1">{{ locale.addHops.form.labels.hum }}</label>
                                            <v-layout column nowrap>
                                                <v-flex>
                                                    <v-text-field :rules="oilRules" :label="locale.general.min" v-model.number="newHops.hum.min" type="number"></v-text-field>
                                                </v-flex>
                                                <v-flex>
                                                    <v-text-field :rules="oilRules" :label="locale.general.max" v-model.number="newHops.hum.max" type="number"></v-text-field>
                                                </v-flex>
                                            </v-layout>
                                        </v-flex>

                                        <v-flex md2>
                                            <label class="body-1">{{ locale.addHops.form.labels.car }}</label>
                                            <v-layout column nowrap>
                                                <v-flex>
                                                    <v-text-field :rules="oilRules" :label="locale.general.min" v-model.number="newHops.car.min" type="number"></v-text-field>
                                                </v-flex>
                                                <v-flex>
                                                    <v-text-field :rules="oilRules" :label="locale.general.max" v-model.number="newHops.car.max" type="number"></v-text-field>
                                                </v-flex>
                                            </v-layout>
                                        </v-flex>

                                        <v-flex md2>
                                            <label class="body-1">{{ locale.addHops.form.labels.far }}</label>
                                            <v-layout column nowrap>
                                                <v-flex>
                                                    <v-text-field :rules="oilRules" :label="locale.general.min" v-model.number="newHops.far.min" type="number"></v-text-field>
                                                </v-flex>
                                                <v-flex>
                                                    <v-text-field :rules="oilRules" :label="locale.general.max" v-model.number="newHops.far.max" type="number"></v-text-field>
                                                </v-flex>
                                            </v-layout>
                                        </v-flex>
                                    </v-layout>

                                    <label class="title">{{ locale.addHops.form.titles.other }}</label>
                                    <v-select
                                        :label="locale.addHops.form.labels.countries"
                                        chips
                                        multiple
                                        :items="flagsProcessed"
                                        appendIcon=""
                                        item-text="name"
                                        item-value="code"
                                        v-model="newHops.country"
                                        autocomplete
                                        maxHeight="400"
                                    >
                                        <template slot="selection" slot-scope="data">
                                            <v-chip
                                                close
                                                @input="removeFlag(data.item.code)"
                                                :selected="data.selected"
                                            >
                                                <v-avatar class="secondary">
                                                    {{ data.item.code.toUpperCase() }}
                                                </v-avatar>
                                                {{ data.item.name }}
                                            </v-chip>
                                        </template>
                                    </v-select>

                                    <v-select
                                        :label="locale.addHops.form.labels.usedIn"
                                        multiple
                                        :items="stylesProcessed"
                                        appendIcon=""
                                        v-model="newHops.styles"
                                        autocomplete
                                        maxHeight="400"
                                    ></v-select>

                                    <v-select
                                        :label="locale.addHops.form.labels.similar"
                                        multiple
                                        :items="similarHopsProcessed"
                                        appendIcon=""
                                        v-model="newHops.similar"
                                        autocomplete
                                        maxHeight="400"
                                    ></v-select>

                                    <v-text-field
                                        multi-line
                                        :label="locale.addHops.form.labels.notes"
                                        v-model.trim="newHops.notes"
                                        :hint="locale.addHops.form.hints.notes"
                                        persistent-hint
                                    >
                                    </v-text-field>

                                    <v-alert :value="true" color="info" class="my-2" dismissible v-model="isDefaultPropsNotification">
                                        <div>
                                            {{ locale.addHops.alert.text }}
                                        </div>
                                        <v-btn color="secondary" outline @click="hideDefaultPropsNotification" class="ml-0">
                                            {{ locale.addHops.alert.dismiss }}
                                        </v-btn>
                                    </v-alert>

                                    <v-layout row wrap text-xs-center text-md-left>
                                        <v-flex>
                                            <v-btn color="primary" @click="addHops" :disabled="!isValid">
                                                <v-icon left v-text="isHopsUpdated ? 'mode_edit' : 'add'"></v-icon>
                                                <span v-text="isHopsUpdated ?
                                                locale.addHops.form.update :
                                                locale.addHops.form.submit"></span>
                                            </v-btn>

                                            <v-btn color="secondary" @click="clearFields">
                                                <v-icon left v-text="isHopsSelected ? 'select_all' : 'clear_all'"></v-icon>
                                                <span v-text="isHopsSelected ? locale.addHops.form.deselect : locale.addHops.form.clear"></span>
                                            </v-btn>
                                        </v-flex>

                                        <v-flex text-md-right>
                                            <v-btn color="error" @click="removeHops" :disabled="!isHopsSelected">
                                                <v-icon left>delete</v-icon>
                                                <span>{{ locale.addHops.form.delete }}</span>
                                            </v-btn>
                                        </v-flex>
                                    </v-layout>
                                </v-form>

                            </v-card-text>
                        </v-card>
                    </v-flex>

                    <v-flex d-flex md4>
                        <v-card class="grey lighten-4">
                            <v-card-text style="overflow: auto;">

                                <pre><code class="d-block">{{ JSON.stringify(transformHops(newHops), null, 2) }}</code></pre>

                            </v-card-text>
                        </v-card>
                    </v-flex>
                </v-layout>
            </v-container>

            <v-data-table
                class="elevation-1"
                hideActions
                v-bind:headers="headers"
                :items="hopsProcessed"
                item-key=".key"
            >
                <template slot="headerCell" slot-scope="props">
                    <v-tooltip top v-if="props.header.hint">
                        <span slot="activator" class="u-t-pseudo">{{ props.header.text }}</span>
                        <span>{{ props.header.hint }}</span>
                    </v-tooltip>
                    <span v-else>
                        {{ props.header.text }}
                    </span>
                </template>
                <template slot="items" slot-scope="props">
                    <catalogue-item
                        :key="props.item.key"
                        :dbKey="props.item['.key']"
                        :isSelected="props.item.isSelected"
                        :name="props.item.name"
                        :alias="props.item.alias"
                        :country="props.item.country"
                        :usage="props.item.usage"
                        :shelfLife="props.item.shelfLife"
                        :alpha="props.item.alpha"
                        :beta="props.item.beta"
                        :co="props.item.co"
                        :oil="props.item.oil"
                        :myr="props.item.myr"
                        :hum="props.item.hum"
                        :car="props.item.car"
                        :far="props.item.far"
                        :aroma="props.item.aroma"
                        :notes="props.item.notes"
                        :styles="props.item.styles"
                        :similar="props.item.similar"
                        :onClick="handleHopsClick"
                        :ctx="props"
                    >
                    </catalogue-item>
                </template>
                <template slot="expand" slot-scope="props">
                    <v-card flat class="grey lighten-4">
                        <v-card-text class="px-4">
                            <div class="catalogue-item-notes">
                                {{ props.item.notes }}
                            </div>
                        </v-card-text>
                    </v-card>
                </template>
            </v-data-table>

        </div>

        <v-snackbar
            :timeout="notification.timeout"
            v-model="notification.show"
            top
        >
            <span>
                {{ notification.text }}
            </span>
            <v-btn dark :color="notification.btnColor" flat @click.native="notification.onAction">
                {{ notification.btnText }}
            </v-btn>
        </v-snackbar>

    </section>
</template>

<script>
    /* eslint-disable */

    import { mapState } from 'vuex';

    import clone from 'clone';

    import _isEmpty from 'lodash/isEmpty';
    import _isEqual from 'lodash/isEqual';
    import _filter from 'lodash/filter';
    import _find from 'lodash/find';
    import _transform from 'lodash/transform';
    import _without from 'lodash/without';
    import _uniq from 'lodash/uniq';

    import db from '../../../firebase';

    import AuthAlert from '../../auth-alert';
    import CatalogueItem from '../../catalogue-item';
    import InputChip from '../../input-chip';

    import catalogueTableHead from '../../table-head/catalogue-head';

    import hopsSchema, { USAGE_VALUES, SHELF_LIFE_VALUES } from './hops-schema';

    import locale, { translate } from '../../../locale';
    import { DURATION } from '../../../constants/ui';
    import { FIREBASE_REFS } from '../../../constants/firebase';

    import {
        Aromas as mockAromas,
        Flags as mockFlags,
        Items as mockHops,
        Styles as mockStyles
    } from '../../../fixtures/index';

    const itemsRef = db.ref(FIREBASE_REFS.hops);
    const flagsRef = db.ref(FIREBASE_REFS.flags);
    const stylesRef = db.ref(FIREBASE_REFS.styles);
    const aromasRef = db.ref(FIREBASE_REFS.aromas);

    export default {
        name: 'add-hops',

        firebase: () => ({
            dbHops: itemsRef.orderByKey(),
            dbFlags: flagsRef.orderByKey(),
            dbStyles: stylesRef.orderByKey(),
            dbAromas: aromasRef.orderByChild('name')
        }),

        components: {
            'auth-alert': AuthAlert,
            'catalogue-item': CatalogueItem,
            'input-chip': InputChip
        },

        props: {
        },

        data () {
            return {
                locale,

                isValid: false,

                nameRules: [
                    (v) => !!v || locale.addHops.form.rules.name
                ],
                acidRules: [
                    (v) => !!v || locale.addHops.form.rules.acid
                ],
                oilRules: [
                    (v) => !!v || locale.addHops.form.rules.oil
                ],

                newHops: {},
                selectedHops: {},

                hiddenKeys: [],
                isDefaultPropsNotification: false,
                predefinedProps: [
                    'alias',
                    'usage',
                    'shelfLife',
                    'alpha',
                    'beta',
                    'co',
                    'aroma',
                    'oil',
                    'myr',
                    'hum',
                    'car',
                    'far',
                    'country',
                    'styles',
                    'similar'
                ],

                usageValues: USAGE_VALUES,

                shelfLifeValues: SHELF_LIFE_VALUES,

                notification: {
                    show: false
                },

                notificationDefaults: {
                    text: '',
                    btnText: '',
                    onAction: () => this.notification.show = false,
                    timeout: DURATION.NOTIFICATION_NORMAL
                }
            };
        },

        beforeMount: function () {
            this.clearSelected();
        },

        beforeDestroy: function () {
        },

        computed: {
            ...mapState('debug', ['isDebugMode']),
            ...mapState('user', ['isAuthenticated']),

            headers: catalogueTableHead(locale),

            flags: function () {
                return this.isDebugMode ? mockFlags : this.dbFlags;
            },

            flagsProcessed: function () {
                return this.flags.slice(0);
            },

            styles: function () {
                return this.isDebugMode ? mockStyles : this.dbStyles;
            },

            stylesProcessed: function () {
                return this.styles.slice(0)
                    .map(style => {
                        const styleValue = style.code + (style.sub_code && `-${style.sub_code}`);

                        return {
                            text: `${style.name} (${style.code}${style.sub_code})`,
                            value: styleValue
                        };
                    });
            },

            aromas: function () {
                return this.isDebugMode ? mockAromas : this.dbAromas;
            },

            aromasProcessed: function () {
                const aromaTags = this.newHops.aroma;

                return this.aromas.slice(0)
                    .map(aroma => {
                        const isSelected = aromaTags.primary.indexOf(aroma.name) > -1 ||
                            aromaTags.secondary.indexOf(aroma.name) > -1 ||
                            aromaTags.extra.indexOf(aroma.name) > -1;

                        return {
                            value: aroma.name,
                            text: aroma.name,
                            selected: isSelected
                        };
                    });
            },

            aromasPrimary: function () {
                const aromasPrimary = this.newHops.aroma.primary;

                return this.aromasProcessed.slice(0)
                    .map(aroma => {
                        const isSelected = aromasPrimary.indexOf(aroma.value) > -1;

                        return {...aroma, isSelected};
                    });
            },

            aromasSecondary: function () {
                const aromasSecondary = this.newHops.aroma.secondary;

                return this.aromasProcessed.slice(0)
                    .map(aroma => {
                        const isSelected = aromasSecondary.indexOf(aroma.value) > -1;

                        return {...aroma, isSelected};
                    });
            },

            aromasExtra: function () {
                const aromasExtra = this.newHops.aroma.extra;

                return this.aromasProcessed.slice(0)
                    .map(aroma => {
                        const isSelected = aromasExtra.indexOf(aroma.value) > -1;

                        return {...aroma, isSelected};
                    });
            },

            isAroma2Disabled: function () {
                return !this.newHops.aroma.primary.length;
            },

            isAroma3Disabled: function () {
                return !this.newHops.aroma.secondary.length;
            },

            hops: function () {
                return this.isDebugMode ? mockHops : this.dbHops;
            },

            hopsProcessed: function () {
                const isHopsSelected = hops => {
                    return _isEqual(this.selectedHops, hops);
                };

                return this.hops
                    .slice(0)
                    .reverse()
                    .map(hops => (
                        Object.assign({}, hops, {
                            isSelected: isHopsSelected(hops)
                        })
                    ))
                    .filter(i => this.hiddenKeys.indexOf(i['.key']) === -1);
            },

            similarHopsProcessed: function () {
                return this.hopsProcessed.slice(0)
                    .filter(hops => hops.name !== this.selectedHops.name)
                    .map(hops => {
                        const alias = hops.alias && hops.alias.length ? hops.alias[0] : null;
                        let name = hops.name;

                        if (alias) {
                            name += ` (${alias})`;
                        }

                        return {
                            text: name,
                            value: hops.name
                        };
                    });
            },

            isHopsSelected: function () {
                return !_isEmpty(this.selectedHops);
            },

            isHopsUpdated: function () {
                if (_isEmpty(this.selectedHops)) return false;

                const selected = this.selectedHops;
                const edited = this.newHops;

                if (
                    selected['.key'] &&
                    (
                        selected.name !== edited.name ||
                        selected.notes !== edited.notes ||
                        selected.usage !== edited.usage ||
                        selected.shelfLife !== edited.shelfLife ||
                        !_isEqual(selected.alias, edited.alias) ||
                        !_isEqual(selected.country, edited.country) ||
                        !_isEqual(selected.styles, edited.styles) ||
                        !_isEqual(selected.similar, edited.similar) ||
                        !_isEqual(selected.alpha, edited.alpha) ||
                        !_isEqual(selected.beta, edited.beta) ||
                        !_isEqual(selected.co, edited.co) ||
                        !_isEqual(selected.aroma, edited.aroma) ||
                        !_isEqual(selected.oil, edited.oil) ||
                        !_isEqual(selected.myr, edited.myr) ||
                        !_isEqual(selected.hum, edited.hum) ||
                        !_isEqual(selected.car, edited.car) ||
                        !_isEqual(selected.far, edited.far)
                    )
                ) {
                    return true;
                }

                return false;
            }
        },

        watch: {
            isDebugMode: function () {
                this.$forceUpdate();
            },

            // checking if new value is a duplicate
            // if it is - revert to previous state
            'newHops.alias': function (alias) {
                if (alias.length < 2) {
                    return false;
                }

                if (alias.length !== _uniq(alias).length) {
                    this.newHops.alias.pop();
                }
            },

            // selection automatically applies to the current list
            // we have to ensure deselection in other lists
            // with the exception of at least 1 item in the preceding list
            // if only 1 item remains in current list
            // prevent from deselecting if subsequent lists are not empty
            'newHops.aroma.primary': function (aroma, prevAroma) {
                if (aroma.length === 0 && prevAroma && prevAroma.length === 1) {
                    const lastValue = prevAroma[0];
                    const isSelected = this.findSelectedInAromaCategories();

                    if (isSelected) {
                        this.selectAroma('primary', lastValue);
                    }

                    return;
                }

                const lastValue = aroma[aroma.length - 1];
                const isSelected = this.getAromaCategoryByValue('primary', { value: lastValue });

                if (isSelected) {
                    this.deselectAroma(isSelected.category, lastValue)
                }
            },
            'newHops.aroma.secondary': function (aroma, prevAroma) {
                if (aroma.length === 0 && prevAroma && prevAroma.length === 1) {
                    const lastValue = prevAroma[0];
                    const isSelected = this.findSelectedInAromaCategories();

                    if (isSelected.extra) {
                        this.selectAroma('secondary', lastValue);
                    }

                    return;
                }

                const lastValue = aroma[aroma.length - 1];
                const isSelected = this.getAromaCategoryByValue('secondary', { value: lastValue });

                if (isSelected) {
                    const category = isSelected.category;

                    if (category === 'primary') {
                        if (isSelected.safeToDeselect) {
                            this.deselectAroma(category, lastValue);
                        } else {
                            this.deselectAroma('secondary', lastValue);
                        }
                    } else {
                        this.deselectAroma(category, lastValue);
                    }
                }
            },
            'newHops.aroma.extra': function (aroma) {
                const lastValue = aroma[aroma.length - 1];
                const isSelected = this.getAromaCategoryByValue('extra', { value: lastValue });

                if (isSelected) {
                    const category = isSelected.category;

                    if (category === 'primary' || category === 'secondary') {
                        if (isSelected.safeToDeselect) {
                            this.deselectAroma(category, lastValue);
                        } else {
                            this.deselectAroma('extra', lastValue);
                        }
                    } else {
                        this.deselectAroma(category, lastValue);
                    }
                }
            }
        },

        methods: {
            translate: translate(locale.addHops),

            addHops: function () {
                if (this.isDebugMode) return;

                // new hops data
                const newHops = this.newHops;
                const newHopsName = newHops.name;

                // check if selected / modified
                // fixme: selectedHops?
                const currentKey = newHops['.key'];
                const currentHops = _find(this.hops, {'.key': currentKey});

                // enhance if needed
                const transformedHops = this.transformHops(newHops);

                // delete db key to prevent firebase conflict
                if (currentKey) {
                    delete transformedHops['.key'];
                }

                if (!currentHops) {
                    this.$firebaseRefs.dbHops.push(transformedHops).then(() => {
                        this.showNotification({
                            text: this.translate('notification.addSuccess', {name: newHopsName}),
                            btnText: locale.addHops.notification.ok,
                            timeout: DURATION.NOTIFICATION_SHORT,
                            btnColor: 'success'
                        });

                        this.clearFields();
                    });
                } else {
                    this.showNotification({
                        text: this.translate('notification.addConflict', {name: newHopsName}),
                        btnText: locale.addHops.notification.override,
                        btnColor: 'warning',
                        onAction: () => {
                            this.notification.show = false;

                            this.$firebaseRefs.dbHops
                                .child(currentKey)
                                .set({...transformedHops}).then(() => {
                                this.showNotification({
                                    text: this.translate('notification.updateSuccess', {name: newHopsName}),
                                    btnText: locale.addHops.notification.ok,
                                    timeout: DURATION.NOTIFICATION_SHORT,
                                    btnColor: 'success'
                                });

                                this.clearFields();
                            });
                        }
                    });
                }
            },

            handleHopsClick: function (hops) {
                const { ctx } = hops;

                // close all others
                ctx.expanded = false;

                if (!hops.isSelected) {
                    this.selectHops(hops);

                    // expand if notes present
                    if (hops.notes) {
                        ctx.expanded = true;
                    }
                }
            },

            selectHops: function (hops) {
                // clear previous selection and notifications
                this.clearFields();

                this.selectedHops = _find(this.hops, {['.key']: hops.dbKey});

                // debug
                console.info('selected: ', this.selectedHops);

                this.newHops = {...this.newHops, ...this.selectedHops};

                // backwards compatibility
                const newHops = this.newHops;

                this.predefinedProps.forEach(key => {
                    if (!newHops[key]) {
                        this.isDefaultPropsNotification = true;

                        // assign default value
                        newHops[key] = clone(hopsSchema[key]);
                    }
                });
            },

            removeHops: function () {
                if (this.isDebugMode) return;

                const currentHops = _find(this.hops, {name: this.selectedHops.name});
                const key = currentHops['.key'];

                this.hiddenKeys.push(key);

                const removeTimeout = setTimeout(() => {
                    this.$firebaseRefs.dbHops.child(key).remove();
                }, DURATION.NOTIFICATION_LONG);

                this.showNotification({
                    text: locale.addHops.notification.deleteSuccess,
                    btnText: locale.addHops.notification.undo,
                    btnColor: 'warning',
                    timeout: DURATION.NOTIFICATION_LONG,
                    onAction: () => {
                        this.hiddenKeys = _without(this.hiddenKeys, key);
                        clearTimeout(removeTimeout);
                    }
                });

                this.clearFields();
            },

            transformHops: hops => {
                const transformedHops = clone(hops);

                return Object.assign({}, {}, transformedHops);
            },

            throwError: function (message) {
                this.showNotification({
                    text: message || locale.errors._default,
                    btnText: locale.addHops.notification.oh,
                    btnColor: 'error',
                    timeout: DURATION.NOTIFICATION_SHORT
                });
            },

            clearSelected: function () {
                this.selectedHops = {};
                this.newHops = clone(hopsSchema);
            },

            clearFields: function () {
                // fixme: causes null values in alpha fields
                // this.$refs.form.reset();

                this.clearSelected();

                // remove notifications and errors
                this.hideDefaultPropsNotification();
                this.notification.show = false;
            },

            removeFlag: function (flag) {
                this.newHops.country = _without(this.newHops.country.slice(0), flag);
            },

            removeAlias: function (value) {
                this.newHops.alias = _without(this.newHops.alias.slice(0), value);
            },

            hideDefaultPropsNotification: function () {
                this.isDefaultPropsNotification = false;
            },

            showNotification: function (props) {
                this.notification = {
                    ...this.notificationDefaults,
                    ...props,
                    show: true
                };
            },

            getAromasByCategory: function (name) {
                switch (name) {
                    case 'primary':
                        return this.aromasPrimary;
                        break;
                    case 'secondary':
                        return this.aromasSecondary;
                        break;
                    case 'extra':
                        return this.aromasExtra;
                        break;
                    default:
                        return null;
                }
            },

            findSelectedInAromaCategories: function (obj = {}) {
                const primary = this.getAromasByCategory('primary');
                const secondary = this.getAromasByCategory('secondary');
                const extra = this.getAromasByCategory('extra');

                const inPrimary = _find(primary, { ...obj, isSelected: true });
                const inSecondary = _find(secondary, { ...obj, isSelected: true });
                const inExtra = _find(extra, { ...obj, isSelected: true });

                if (!inPrimary && !inSecondary && !inExtra) {
                    return false;
                }

                return {
                    primary: inPrimary,
                    secondary: inSecondary,
                    extra: inExtra
                };
            },

            getAromaCategoryByValue: function (category, obj = {}) {
                const primary = this.getAromasByCategory('primary');
                const secondary = this.getAromasByCategory('secondary');
                const extra = this.getAromasByCategory('extra');

                const inPrimary = _find(primary, { ...obj, isSelected: true });
                const inSecondary = _find(secondary, { ...obj, isSelected: true });
                const inExtra = _find(extra, { ...obj, isSelected: true });

                if (inPrimary && category !== 'primary') {
                    return {
                        category: 'primary',
                        safeToDeselect: _filter(primary, { isSelected: true }).length > 1
                    };
                } else if (inSecondary && category !== 'secondary') {
                    return {
                        category: 'secondary',
                        safeToDeselect: _filter(secondary, { isSelected: true }).length > 1
                    };
                } else if (inExtra && category !== 'extra') {
                    return {
                        category: 'extra',
                        safeToDeselect: true
                    }
                } else {
                    return false;
                }
            },

            selectAroma: function (category, value) {
                _find(this.getAromasByCategory(category), { value }).isSelected = true;
                this.newHops.aroma[category] = [...this.newHops.aroma[category], ...[value]];
            },

            deselectAroma: function (category, value) {
                _find(this.getAromasByCategory(category), { value }).isSelected = false;
                this.newHops.aroma[category] = _without(this.newHops.aroma[category], value);
            }
        }
    };
</script>

<style lang="scss" scoped>
    @import 'add-hops';
</style>
