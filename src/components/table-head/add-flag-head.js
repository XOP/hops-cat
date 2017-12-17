export default function (locale) {
    return function () {
        return [
            {
                value: 'code',
                text: locale.tableFlags.code,
                align: 'left'
            },
            {
                value: 'name',
                text: locale.tableFlags.name,
                align: 'left'
            }
        ];
    };
}
