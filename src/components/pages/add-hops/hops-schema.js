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

    notes: '',

    styles: []
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
