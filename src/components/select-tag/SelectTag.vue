<template>
    <b-field>
        <p class="control">
            <b-dropdown
                v-model="model"
                @change="handleSelect"
            >
                <button class="button" type="button" slot="trigger">
                    <span v-text="label"></span>
                    <b-icon icon="caret-down" size="is-small"></b-icon>
                </button>

                <b-dropdown-item
                    v-for="(item, index) in items"
                    :key="index"
                    :disabled="item[itemsMap.disabled]"
                    :value="item[itemsMap.value]"
                >
                    {{ item[itemsMap.name] }}
                </b-dropdown-item>
            </b-dropdown>
        </p>
        <p class="control" v-if="value">
            <button @click.prevent="handleRemoveClick" class="button is-warning" type="button">
                <b-icon icon="times" size="is-small"></b-icon>
            </button>
        </p>
    </b-field>
</template>

<script>
    export default {
        name: 'select-tag',

        props: {
            // unique key
            id: {
                type: [Number, String]
            },

            value: {
                type: String
            },

            label: {
                type: String,
                required: true,
                default: 'Select'
            },

            items: {
                type: Array,
                required: true
            },

            itemsMap: {
                type: Object,
                required: true,
                default: function () {
                    return {
                        name: 'name',
                        value: 'value',
                        disabled: 'isSelected'
                    };
                }
            }
        },

        data: function () {
            return {
                model: ''
            };
        },

        computed: {
        },

        watch: {
            // value will take precedence
            // this is needed when values are removed
            // or changed externally
            value: function () {
                this.model = this.value;
            }
        },

        methods: {
            handleRemoveClick: function () {
                this.$emit('remove', this.id);
            },

            handleSelect: function () {
                this.$emit('select', this.model, this.id);
            }
        }
    };
</script>
