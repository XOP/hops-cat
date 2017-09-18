export default function (locale) {
    return function () {
        return [
            {
                value: 'status',
                text: 'Status',
                align: 'left',
                sortable: false
            },
            {
                value: 'name',
                text: 'Name',
                align: 'left',
                sortable: true
            },
            {
                value: 'country',
                text: 'Country',
                align: 'right',
                sortable: true
            },
            {
                value: 'usage',
                text: 'Usage',
                align: 'right',
                sortable: true
            },
            {
                value: 'shelfLife',
                text: 'Shelf Life',
                align: 'right',
                hint: locale.tooltips.shelfLife,
                sortable: true
            },
            {
                value: 'alpha.min',
                text: 'Alpha',
                align: 'right',
                hint: 'Acid composition, %',
                sortable: true
            },
            {
                value: 'beta.min',
                text: 'Beta',
                align: 'right',
                hint: 'Acid composition, %',
                sortable: true
            },
            {
                value: 'co.min',
                text: 'Co-hum',
                align: 'right',
                hint: 'Acid composition, %',
                sortable: true
            }
        ];
    };
}
