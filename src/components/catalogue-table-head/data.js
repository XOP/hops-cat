export default function (locale) {
    return function () {
        return [
            {
                value: 'status',
                text: locale.tableHops.status,
                align: 'left',
                sortable: false
            },
            {
                value: 'name',
                text: locale.tableHops.name,
                align: 'left',
                sortable: true
            },
            {
                value: 'country',
                text: locale.tableHops.country,
                align: 'right',
                sortable: true
            },
            {
                value: 'usage',
                text: locale.tableHops.usage,
                align: 'right',
                sortable: true
            },
            {
                value: 'shelfLife',
                text: locale.tableHops.shelfLife,
                align: 'right',
                hint: locale.tooltips.shelfLife,
                sortable: true
            },
            {
                value: 'alpha.min',
                text: locale.tableHops.alpha,
                align: 'right',
                hint: locale.tooltips.acid,
                sortable: true
            },
            {
                value: 'beta.min',
                text: locale.tableHops.beta,
                align: 'right',
                hint: locale.tooltips.acid,
                sortable: true
            },
            {
                value: 'co.min',
                text: locale.tableHops.co,
                align: 'right',
                hint: locale.tooltips.acid,
                sortable: true
            },
            {
                value: 'oil.min',
                text: locale.tableHops.oil,
                align: 'right',
                hint: locale.tooltips.totalOil,
                sortable: true
            },
            {
                value: 'myr.min',
                text: locale.tableHops.myr,
                align: 'right',
                hint: locale.tooltips.myr,
                sortable: true
            },
            {
                value: 'hum.min',
                text: locale.tableHops.hum,
                align: 'right',
                hint: locale.tooltips.hum,
                sortable: true
            },
            {
                value: 'car.min',
                text: locale.tableHops.car,
                align: 'right',
                hint: locale.tooltips.car,
                sortable: true
            },
            {
                value: 'far.min',
                text: locale.tableHops.far,
                align: 'right',
                hint: locale.tooltips.far,
                sortable: true
            },
            {
                value: 'aroma',
                text: locale.tableHops.aroma,
                align: 'center',
                sortable: false
            },
            {
                value: 'styles',
                text: locale.tableHops.styles,
                align: 'center',
                hint: locale.tooltips.styles,
                sortable: false
            },
            {
                value: 'notes',
                text: locale.tableHops.notes,
                align: 'center',
                sortable: false
            }
        ];
    };
}
