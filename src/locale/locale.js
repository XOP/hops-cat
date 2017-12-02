export default {
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
        toEditText: 'to add or edit Countries'
    },

    catalogue: {
        title: 'Catalogue'
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
        title: 'Add Styles'
    }

};
