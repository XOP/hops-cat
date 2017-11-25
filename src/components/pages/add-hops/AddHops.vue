<template>
    <section>
        <h1 class="display-1">Add new Hops</h1>

        <v-alert v-if="!isAuthenticated" :value="true" color="info" class="mb-3">
            <v-btn to="/auth">
                <v-icon left>lock_open</v-icon>
                Authorize
            </v-btn>
            <span>to add hops or</span>
            <v-btn to="/" exact>Go to Catalogue</v-btn>
        </v-alert>

        <div v-if="isAuthenticated">
            <v-container fluid grid-list-lg class="pa-0 mb-3">
                <v-layout row wrap>
                    <v-flex d-flex md8>
                        <v-card>
                            <v-card-text>

                                <v-form v-model="isValid" ref="form">
                                    <label class="title">Common information</label>
                                    <v-layout row wrap>
                                        <v-flex sm6>
                                            <v-text-field
                                                label="Name"
                                                v-model.trim="newHops.name"
                                                required
                                                placeholder="Cascade"
                                                :rules="nameRules"
                                            >
                                            </v-text-field>
                                        </v-flex>
                                        <v-flex sm6>
                                            <v-select
                                                label="Alias"
                                                tags
                                                chips
                                                appendIcon=""
                                                v-model="newHops.alias"
                                                hint="Duplicated values are not allowed"
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
                                                label="Usage"
                                                hint="Usage"
                                                persistentHint
                                                single-line
                                                bottom
                                            ></v-select>
                                        </v-flex>
                                        <v-flex sm6>
                                            <v-select
                                                :items="shelfLifeValues"
                                                v-model="newHops.shelfLife"
                                                hint="Shelf life"
                                                persistentHint
                                                placeholder="NA"
                                                single-line
                                                bottom
                                            ></v-select>
                                        </v-flex>
                                    </v-layout>

                                    <div class="title">Aroma Profile</div>

                                    <v-select
                                        label="Primary"
                                        chips
                                        tags
                                        :items="aromaTags"
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
                                    </v-select>
                                    <v-select
                                        label="Secondary"
                                        chips
                                        tags
                                        :items="aromaTags"
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
                                    </v-select>
                                    <v-select
                                        label="Extra"
                                        chips
                                        tags
                                        :items="aromaTags"
                                        appendIcon=""
                                        prependIcon="looks_3"
                                        v-model="newHops.aroma.extra"
                                        autocomplete
                                        maxHeight="400"
                                    ></v-select>

                                    <div class="title">Chemistry</div>

                                    <label class="subheading">Acid, %</label>
                                    <v-layout row wrap>
                                        <v-flex md4>
                                            <label class="body-1">Alpha</label>
                                            <v-layout column nowrap>
                                                <v-flex>
                                                    <v-text-field :rules="acidRules" label="min" required v-model.number="newHops.alpha.min" type="number"></v-text-field>
                                                </v-flex>
                                                <v-flex>
                                                    <v-text-field :rules="acidRules" label="max" required v-model.number="newHops.alpha.max" type="number"></v-text-field>
                                                </v-flex>
                                            </v-layout>
                                        </v-flex>

                                        <v-flex md4>
                                            <label class="body-1">Beta</label>
                                            <v-layout column nowrap>
                                                <v-flex>
                                                    <v-text-field label="min" v-model.number="newHops.beta.min" type="number"></v-text-field>
                                                </v-flex>
                                                <v-flex>
                                                    <v-text-field label="max" v-model.number="newHops.beta.max" type="number"></v-text-field>
                                                </v-flex>
                                            </v-layout>
                                        </v-flex>

                                        <v-flex md4>
                                            <label class="body-1">Co-Humulone</label>
                                            <v-layout column nowrap>
                                                <v-flex>
                                                    <v-text-field label="min" v-model.number="newHops.co.min" type="number"></v-text-field>
                                                </v-flex>
                                                <v-flex>
                                                    <v-text-field label="max" v-model.number="newHops.co.max" type="number"></v-text-field>
                                                </v-flex>
                                            </v-layout>
                                        </v-flex>
                                    </v-layout>

                                    <label class="subheading">Oil, ml/100g</label>
                                    <v-layout row wrap>
                                        <v-flex md4>
                                            <label class="body-1">Total</label>
                                            <v-layout column nowrap>
                                                <v-flex>
                                                    <v-text-field :rules="oilRules" label="min" v-model.number="newHops.oil.min" type="number"></v-text-field>
                                                </v-flex>
                                                <v-flex>
                                                    <v-text-field :rules="oilRules" label="max" v-model.number="newHops.oil.max" type="number"></v-text-field>
                                                </v-flex>
                                            </v-layout>
                                        </v-flex>

                                        <v-flex md2>
                                            <label class="body-1">Myrcene</label>
                                            <v-layout column nowrap>
                                                <v-flex>
                                                    <v-text-field :rules="oilRules" label="min" v-model.number="newHops.myr.min" type="number"></v-text-field>
                                                </v-flex>
                                                <v-flex>
                                                    <v-text-field :rules="oilRules" label="max" v-model.number="newHops.myr.max" type="number"></v-text-field>
                                                </v-flex>
                                            </v-layout>
                                        </v-flex>

                                        <v-flex md2>
                                            <label class="body-1">Humulene</label>
                                            <v-layout column nowrap>
                                                <v-flex>
                                                    <v-text-field :rules="oilRules" label="min" v-model.number="newHops.hum.min" type="number"></v-text-field>
                                                </v-flex>
                                                <v-flex>
                                                    <v-text-field :rules="oilRules" label="max" v-model.number="newHops.hum.max" type="number"></v-text-field>
                                                </v-flex>
                                            </v-layout>
                                        </v-flex>

                                        <v-flex md2>
                                            <label class="body-1">Caryophyllene</label>
                                            <v-layout column nowrap>
                                                <v-flex>
                                                    <v-text-field :rules="oilRules" label="min" v-model.number="newHops.car.min" type="number"></v-text-field>
                                                </v-flex>
                                                <v-flex>
                                                    <v-text-field :rules="oilRules" label="max" v-model.number="newHops.car.max" type="number"></v-text-field>
                                                </v-flex>
                                            </v-layout>
                                        </v-flex>

                                        <v-flex md2>
                                            <label class="body-1">Farnesene</label>
                                            <v-layout column nowrap>
                                                <v-flex>
                                                    <v-text-field :rules="oilRules" label="min" v-model.number="newHops.far.min" type="number"></v-text-field>
                                                </v-flex>
                                                <v-flex>
                                                    <v-text-field :rules="oilRules" label="max" v-model.number="newHops.far.max" type="number"></v-text-field>
                                                </v-flex>
                                            </v-layout>
                                        </v-flex>
                                    </v-layout>

                                    <label class="title">Supplementary information</label>
                                    <v-select
                                        label="Countries of origin"
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
                                        label="Most used in"
                                        multiple
                                        :items="stylesProcessed"
                                        appendIcon=""
                                        v-model="newHops.styles"
                                        autocomplete
                                        maxHeight="400"
                                    ></v-select>

                                    <v-text-field
                                        multi-line
                                        label="Description"
                                        v-model.trim="newHops.notes"
                                        hint="General notes and special observations"
                                        persistent-hint
                                    >
                                    </v-text-field>

                                    <v-alert :value="true" color="info" class="my-2" dismissible v-model="isDefaultPropsNotification">
                                        <div>
                                            Some fields were changed to new hops defaults
                                        </div>
                                        <v-btn color="secondary" outline @click="hideDefaultPropsNotification" class="ml-0">
                                            Don't show again
                                        </v-btn>
                                    </v-alert>

                                    <v-layout row wrap text-xs-center text-md-left>
                                        <v-flex>
                                            <v-btn color="primary" @click="addHops" :disabled="!isValid">
                                                <v-icon left v-text="isHopsUpdated ? 'mode_edit' : 'add'"></v-icon>
                                                <span v-text="isHopsUpdated ? 'Update' : 'Add'"></span>
                                            </v-btn>

                                            <v-btn color="secondary" @click="clearFields">
                                                <v-icon left v-text="isHopsSelected ? 'select_all' : 'clear_all'"></v-icon>
                                                <span v-text="isHopsSelected ? 'Deselect' : 'Clear Fields'"></span>
                                            </v-btn>
                                        </v-flex>

                                        <v-flex text-md-right>
                                            <v-btn color="error" @click="removeHops" :disabled="!isHopsSelected">
                                                <v-icon left>delete</v-icon>
                                                <span>Delete</span>
                                            </v-btn>
                                        </v-flex>
                                    </v-layout>
                                </v-form>

                            </v-card-text>
                        </v-card>
                    </v-flex>

                    <v-flex d-flex md4>
                        <v-card class="grey lighten-4">
                            <v-card-text style="max-height: 80vh; overflow: auto;">

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
                        :onClick="handleHopsClick"
                        :ctx="props"
                    >
                    </catalogue-item>
                </template>
                <template slot="expand" slot-scope="props">
                    <v-card flat class="grey lighten-4">
                        <v-card-text class="px-4">
                            {{ props.item.notes }}
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
    import _find from 'lodash/find';
    import _transform from 'lodash/transform';
    import _without from 'lodash/without';
    import _uniq from 'lodash/uniq';

    import db from '../../../firebase';

    import CatalogueItem from '../../catalogue-item';
    import InputChip from '../../input-chip';

    import catalogueTableHeadData from '../../catalogue-table-head/data';

    import hopsSchema, { USAGE_VALUES, SHELF_LIFE_VALUES } from './hops-schema';

    import locale from '../../../locale';
    import { DURATION } from '../../../constants/ui';
    import { FIREBASE_REFS } from '../../../constants/firebase';

    import {
        Flags as mockFlags,
        Items as mockHops,
        Styles as mockStyles
    } from '../../../fixtures/index';

    const itemsRef = db.ref(FIREBASE_REFS.hops);
    const flagsRef = db.ref(FIREBASE_REFS.flags);
    const stylesRef = db.ref(FIREBASE_REFS.styles);

    export default {
        name: 'add-hops',

        firebase: () => ({
            dbHops: itemsRef.orderByKey(),
            dbFlags: flagsRef.orderByKey(),
            dbStyles: stylesRef.orderByKey()
        }),

        components: {
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
                    (v) => !!v || 'Name is required'
                ],
                acidRules: [
                    (v) => !!v || 'Value is required'
                ],
                oilRules: [
                    (v) => !!v || 'Value is required'
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
                    'oil',
                    'myr',
                    'hum',
                    'car',
                    'far',
                    'country'
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

            headers: catalogueTableHeadData(locale),

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

            aromaTags: function () {
                return [
                    'citrus',
                    'wood',
                    'tropical',
                    'orange',
                    'lime',
                    'herbal',
                    'floral',
                    'flower'
                ];
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
                        !_isEqual(selected.alpha, edited.alpha) ||
                        !_isEqual(selected.beta, edited.beta) ||
                        !_isEqual(selected.co, edited.co) ||
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

            'newHops.alias': function (alias) {
                if (alias.length < 2) {
                    return false;
                }

                // checking if new value is a duplicate
                if (alias.length !== _uniq(alias).length) {
                    this.newHops.alias.pop();
                }
            }
        },

        methods: {
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
                            text: `Hops ${newHopsName} successfully added!`,
                            btnText: 'OK',
                            timeout: DURATION.NOTIFICATION_SHORT,
                            btnColor: 'success'
                        });

                        this.clearFields();
                    });
                } else {
                    this.showNotification({
                        text: `Confirm new data for ${newHopsName}!`,
                        btnText: 'Override',
                        btnColor: 'warning',
                        onAction: () => {
                            this.notification.show = false;

                            this.$firebaseRefs.dbHops
                                .child(currentKey)
                                .set({...transformedHops}).then(() => {
                                this.showNotification({
                                    text: `Hops ${newHopsName} successfully updated!`,
                                    btnText: 'OK',
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
                    text: `Deleted successfully`,
                    btnText: 'Undo',
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
                    btnText: 'Oh :(',
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
            }
        }
    };
</script>

<style lang="scss" scoped>
    @import 'add-hops';
</style>
