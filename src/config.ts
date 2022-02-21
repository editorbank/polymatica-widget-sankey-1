import {
    block,
    Config,
    DataQueryFunction,
    DataQueryMethod,
    drilldown,
    filter,
    sort,
} from 'ptnl-constructor-sdk/config';
import { ColumnType } from 'ptnl-constructor-sdk/data';
import { EBlockKey } from './enum';

export const config: Config = {
    label: {
        ru: 'Санкей диаграмма (ChartJS)',
        en: 'Sankey diagram (ChartJS)',
    },
    icon: 'icon.svg',

    dataSettings: {
        method: DataQueryMethod.Aggregate,
        blocks: [
            block({
                dataQueryFunction: DataQueryFunction.Group,
                key: EBlockKey.FROM,
                label: {
                    ru: 'Поток от',
                    en: 'Flow from',
                },
                columnTypes: [ColumnType.String, ColumnType.Number, ColumnType.Date],
                max: 1,
            }),
            block({
                key: EBlockKey.TO,
                dataQueryFunction: DataQueryFunction.Group,
                label: {
                    ru: 'Поток до',
                    en: 'Flow to',
                },
                columnTypes: [ColumnType.String, ColumnType.Number, ColumnType.Date],
                max: 1,
            }),
            block({
                key: EBlockKey.FLOW,
                dataQueryFunction: DataQueryFunction.Sum,
                label: {
                    ru: 'Величина потока',
                    en: 'Flow volume',
                },
                columnTypes: [ColumnType.Number]
            }),
            // filter(),
            // sort(),
            // drilldown({
                // source: EBlockKey.X,
                // additionalFilterSources: [EBlockKey.SERIES],
            // }),
        ],
        validation: {
            requiredEvery: [EBlockKey.FROM, EBlockKey.TO],
        },
    },
};
