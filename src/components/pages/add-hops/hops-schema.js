import _transform from 'lodash/transform';

export default {
    name: '',
    alias: [],

    usage: 'AB',

    country: [],

    shelfLife: 0,

    alpha: {
        min: 0.1,
        max: 50
    },
    beta: {
        min: 0.1,
        max: 50
    },
    co: {
        min: 0.1,
        max: 100
    },

    oil: {
        min: 0.1,
        max: 10
    },
    myr: {
        min: 0.1,
        max: 100
    },
    hum: {
        min: 0.1,
        max: 100
    },
    car: {
        min: 0.1,
        max: 100
    },
    far: {
        min: 0.1,
        max: 100
    },

    aroma: {
        primary: [],
        secondary: [],
        extra: []
    },

    notes: '',

    styles: []
};

export const USAGE_MAP = {
    'A': 'Aroma',
    'B': 'Bitter',
    'AB': 'Dual'
};

export const USAGE_VALUES = _transform(USAGE_MAP, (acc, val, key) => {
    acc.push({ value: key, text: val });
}, []);

export const SHELF_LIFE_MAP = {
    1: '1 - Very poor',
    2: '2',
    3: '3 - Poor',
    4: '4',
    5: '5 - Average',
    6: '6',
    7: '7 - Great',
    8: '8',
    9: '9 - Exceptional'
};

export const SHELF_LIFE_VALUES = _transform(SHELF_LIFE_MAP, (acc, val, key) => {
    acc.push({ value: key, text: val });
}, []);

export const STATUS_MAP = {
    0: 'red darken-1',
    1: 'amber darken-1',
    2: 'green darken-1'
};
