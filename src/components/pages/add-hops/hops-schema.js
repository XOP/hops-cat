export default {
    name: '',
    alias: [],

    usage: 'AB',

    country: [null, null, null],

    shelfLife: 0,

    alpha: {
        min: 0,
        max: 100
    },

    beta: {
        min: 0,
        max: 100
    },

    co: {
        min: 0,
        max: 100
    },
};

export const USAGE_MAP = {
    'A': 'Aroma',
    'B': 'Bitter',
    'AB': 'Dual'
};

export const STATUS_MAP = {
    1: 'ok',
    2: 'warning'
};
