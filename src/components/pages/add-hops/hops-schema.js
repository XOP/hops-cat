export default {
    name: '',
    alias: [],

    usage: 'AB',

    country: [],

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
    0: 'red darken-1',
    1: 'amber darken-1',
    2: 'green darken-1'
};
