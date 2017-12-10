import _get from 'lodash/get';

const locale = {
    general: {
        na: 'NA'
    },

    errors: {
        _default: 'Something went wrong',
        nameNotSpecified: 'Name is not specified'
    },

    tooltips: {
        shelfLife: 'Recommended storage conditions observed',
        acid: 'Acid composition, %',
        styles: 'Prevalent usage in beer styles',
        totalOil: 'Total Oil, ml/100g',
        myr: 'Myrcene, % of total oil',
        hum: 'Humulene, % of total oil',
        car: 'Caryophyllene, % of total oil',
        far: 'Farnesene, % of total oil'
    },

    tableHops: {
        name: 'Name',
        usage: 'Usage',
        country: 'Country',
        shelfLife: 'Shelf Life',
        status: 'Status',
        alpha: 'Alpha',
        beta: 'Beta',
        co: 'Co-hum.',
        styles: 'Used in',
        notes: 'Details',
        oil: 'Total Oil',
        myr: 'Myr.',
        hum: 'Hum.',
        car: 'Car.',
        far: 'Far.',
        aroma: 'Aroma Profile'
    },

    header: {
        title: 'Hops Cat',
        logoText: 'Hops Cat Logo'
    },

    footer: {
        githubText: 'Github',
        copyright: 'Hops Cat ©'
    },

    auth: {
        title: 'Authorization',
        authText: 'Authorize',
        toEditText: 'to add or edit items',
        goToCatalogue: 'go to Catalogue'
    },

    catalogue: {
        title: 'Catalogue',
        sorting: 'Apply sorting'
    },

    addHops: {
        title: 'Add Hops'
    },

    addFlag: {
        title: 'Add Countries',
        form: {
            labels: {
                code: 'Code',
                name: 'Name'
            },
            placeholders: {
                code: 'au',
                name: 'Name'
            },
            submit: 'Add',
            update: 'Update',
            clear: 'Clear',
            delete: 'Remove',
            rules: {
                name: 'Name is required',
                code: 'Code is required'
            }
        },
        notification: {
            addSuccess: 'Country {country} successfully added!',
            addConflict: 'Country {country} already exists!',
            updateSuccess: 'Country {country} successfully updated!',
            deleteSuccess: 'Deleted successfully',
            ok: 'OK',
            override: 'Override'
        }
    },

    addStyle: {
        title: 'Add Styles',

        form: {
            labels: {
                name: 'Name',
                category: 'Category',
                family: 'Family',
                code: 'Code',
                subCode: 'Letter Code'
            },
            placeholders: {
                name: 'Double IPA',
                category: 'Strong American Ale',
                family: 'IPA',
                code: '22'
            },
            submit: 'Add',
            update: 'Update',
            clear: 'Clear',
            delete: 'Remove',
            rules: {
                name: 'Name is required',
                category: 'Category is required',
                family: 'Family is required',
                code: 'Code is required'
            }
        },
        notification: {
            addSuccess: 'Style {style} successfully added!',
            addConflict: 'Style {style} already exists!',
            updateSuccess: 'Style {style} successfully updated!',
            deleteSuccess: 'Deleted successfully',
            ok: 'OK',
            override: 'Override',
            undo: 'Undo'
        }
    }
};

export function translate (locale) {
    return (localeKey, data) => {
        let str = _get(locale, localeKey);

        Object.keys(data).forEach(k => {
            str = str.replace(`{${k}}`, data[k]);
        });

        return str;
    };
}

export default locale;
