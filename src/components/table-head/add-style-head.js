export default function (locale) {
    return function () {
        return [
            {
                value: 'code',
                text: locale.tableStyles.code,
                align: 'left'
            },
            {
                value: 'name',
                text: locale.tableStyles.name,
                align: 'left'
            },
            {
                value: 'category',
                text: locale.tableStyles.category,
                align: 'left'
            },
            {
                value: 'family',
                text: locale.tableStyles.family,
                align: 'left'
            }
        ];
    };
}
