import _get from 'lodash/get';

const locale = {
    general: {
        na: 'NA',
        min: 'min',
        max: 'max'
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

    tableStyles: {
        code: 'Code / Group',
        name: 'Name',
        category: 'Category',
        family: 'Family'
    },

    tableFlags: {
        code: 'Code',
        name: 'Name',
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
        goToCatalogue: 'go to Catalogue',
        addHops: 'Add Hops',
        addFlag: 'Add Countries',
        addStyle: 'Add Styles',
        form: {
            labels: {
                email: 'E-mail',
                pass: 'Pass'
            },
            placeholders: {
                email: 'user@email.com'
            },
            login: 'DB Authorize',
            logout: 'Log out',
            rules: {
                email: 'E-mail is required',
                emailValid: 'E-mail must be valid'
            }
        },
        notification: {
            ok: 'OK',
            oh: 'Ouch!',
            success: 'User {email} is now authorized!',
            error: 'Sorry, something is wrong: {error}'
        }
    },

    catalogue: {
        title: 'Catalogue',
        sorting: 'Apply sorting'
    },

    addHops: {
        title: 'Add Hops',
        alert: {
            text: 'Some fields were changed to new hops defaults',
            dismiss: 'Don\'t show again'
        },
        form: {
            titles: {
                common: 'Common information',
                aroma: 'Aroma Profile',
                chem: 'Chemistry',
                acid: 'Acid, %',
                oil: 'Oil, ml/100g',
                other: 'Supplementary information'
            },
            labels: {
                name: 'Name',
                alias: 'Alias',
                usage: 'Usage',
                primary: 'Primary',
                secondary: 'Secondary',
                extra: 'Extra',
                alpha: 'Alpha',
                beta: 'Beta',
                cohum: 'Co-Humulone',
                total: 'total',
                myr: 'Myrcene',
                hum: 'Humulene',
                car: 'Caryophyllene',
                far: 'Farmesene',
                countries: 'Countries of origin',
                usedIn: 'Most used in',
                notes: 'Description'
            },
            placeholders: {
                name: 'Cascade',
                shelfLife: 'NA'
            },
            hints: {
                alias: 'Duplicated values are not allowed',
                usage: 'Usage',
                shelfLife: 'Shelf life',
                notes: 'General notes and special observations'
            },
            submit: 'Add',
            update: 'Update',
            clear: 'Clear Fields',
            deselect: 'Deselect',
            delete: 'Delete',
            rules: {
                name: 'Name is required',
                acid: 'Value is required',
                oil: 'Value is required'
            }
        },
        notification: {
            addSuccess: 'Hops {name} successfully added!',
            addConflict: 'Confirm new data for {name}!',
            updateSuccess: 'Hops {name} successfully updated!',
            deleteSuccess: 'Deleted successfully',
            ok: 'OK',
            override: 'Override',
            oh: 'Ouch!',
            undo: 'Undo'
        }
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
            ok: 'OK'
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
